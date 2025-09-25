// frontend/src/app/components/topics/topic-test.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopicService, Topic, Problem } from '../../services/topic.service';
import { Judge0Service } from '../../services/judge0.service';
import { ProgressService } from '../../services/progress.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topic-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './topic-test.component.html',
  styleUrls: ['./topic-test.component.css']
})
export class TopicTestComponent implements OnInit {
  topicId: number = 0;
  topic: Topic | null = null;
  problems: Problem[] = [];
  currentProblem: Problem | null = null;
  currentProblemIndex: number = 0;
  userCode: string = '';
  selectedLanguage: string = 'python';
  output: string = '';
  isLoading: boolean = true;
  testResults: any[] = [];
  isSolved: boolean = false;
  userId: string = '';

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private judge0Service: Judge0Service,
    private progressService: ProgressService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.topicId = +this.route.snapshot.paramMap.get('id')!;
    
    // Fix: Use getCurrentUser() instead of getCurrentUserId()
    const currentUser = this.authService.getCurrentUser();
    this.userId = currentUser?.id || '';
    
    this.loadTopicAndProblems();
  }

  loadTopicAndProblems() {
    this.topicService.getTopics().subscribe(topics => {
      this.topic = topics.find(t => t.id === this.topicId) || null;
      
      // Load problems for this topic
      this.topicService.getProblems(this.topicId).subscribe(problems => {
        this.problems = problems;
        if (this.problems.length > 0) {
          this.currentProblem = this.problems[0];
          this.userCode = this.currentProblem.defaultCode[this.selectedLanguage] || '';
        }
        this.isLoading = false;
      });
    });
  }

  runTests() {
    if (!this.currentProblem) return;
    
    this.output = 'Running tests...';
    this.testResults = [];
    this.isLoading = true;
    
    const testCases = this.currentProblem.testCases;
    let passed = 0;
    
    testCases.forEach((testCase: any, index: number) => {
      const sourceCode = this.userCode;
      const languageId = this.getLanguageId(this.selectedLanguage);
      const stdin = testCase.input;
      
      this.judge0Service.submitCode(sourceCode, languageId, stdin).subscribe(
        (response: any) => {
          if (response.stdout) {
            const output = response.stdout.trim();
            const expected = testCase.output.trim();
            const isCorrect = output === expected;
            
            if (isCorrect) passed++;
            
            this.testResults.push({
              testCase: index + 1,
              input: testCase.input,
              expected: testCase.output,
              output: output,
              passed: isCorrect
            });
            
            // Check if all tests passed
            if (this.testResults.length === testCases.length) {
              this.isSolved = passed === testCases.length;
              
              if (this.isSolved && this.topic) {
                // Update progress
                this.progressService.updateProgress({
                  difficulty: this.currentProblem!.difficulty.toLowerCase(),
                  score: 5,
                  topic: {
                    id: this.topicId,
                    name: this.topic.name
                  },
                  problemId: this.currentProblem!.id
                }).subscribe(() => {
                  this.output += `\n🎉 +5 points earned for solving "${this.currentProblem!.title}"!`;
                  
                  // Check if all problems are solved
                  if (this.currentProblemIndex === this.problems.length - 1) {
                    this.awardTopicCompletion();
                  }
                });
              }
              
              this.isLoading = false;
            }
          } else if (response.stderr) {
            this.testResults.push({
              testCase: index + 1,
              input: testCase.input,
              expected: testCase.output,
              output: `Error: ${response.stderr}`,
              passed: false
            });
            
            if (this.testResults.length === testCases.length) {
              this.isLoading = false;
            }
          }
        },
        (error: any) => {
          this.testResults.push({
            testCase: index + 1,
            input: testCase.input,
            expected: testCase.output,
            output: 'Error: ' + error.message,
            passed: false
          });
          
          if (this.testResults.length === testCases.length) {
            this.isLoading = false;
          }
        }
      );
    });
  }

  awardTopicCompletion() {
    if (this.topic) {
      this.output += `\n\n🏆 Congratulations! You've completed all problems in ${this.topic.name}!`;
      this.output += `\n🎖️ You've earned the ${this.topic.name} Master badge!`;
      this.output += `\n➕ 25 points for topic completion!`;
      
      // Update progress with topic completion
      this.progressService.completeTopic(this.topicId, this.topic.name).subscribe();
    }
  }

  nextProblem() {
    if (this.currentProblemIndex < this.problems.length - 1) {
      this.currentProblemIndex++;
      this.currentProblem = this.problems[this.currentProblemIndex];
      this.userCode = this.currentProblem.defaultCode[this.selectedLanguage] || '';
      this.testResults = [];
      this.isSolved = false;
      this.output = '';
    }
  }

  previousProblem() {
    if (this.currentProblemIndex > 0) {
      this.currentProblemIndex--;
      this.currentProblem = this.problems[this.currentProblemIndex];
      this.userCode = this.currentProblem.defaultCode[this.selectedLanguage] || '';
      this.testResults = [];
      this.isSolved = false;
      this.output = '';
    }
  }

  onLanguageChange() {
    if (this.currentProblem) {
      this.userCode = this.currentProblem.defaultCode[this.selectedLanguage] || '';
    }
  }

  getLanguageId(language: string): number {
    const languages: { [key: string]: number } = {
      'python': 71,
      'java': 62,
      'javascript': 63,
      'cpp': 54
    };
    return languages[language.toLowerCase()] || 71; // Default to Python
  }

  getPassedCount(): number {
    return this.testResults.filter(result => result.passed).length;
  }

  getTotalTestCases(): number {
    return this.currentProblem ? this.currentProblem.testCases.length : 0;
  }

  isLastProblem(): boolean {
    return this.currentProblemIndex === this.problems.length - 1;
  }
}