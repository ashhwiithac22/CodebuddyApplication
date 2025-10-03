import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopicService, Topic, Hint } from '../../services/topic.service';
import { NavbarComponent } from '../layout/navbar.component';

@Component({
  selector: 'app-topic-detail',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {
  topic: Topic | null = null;
  isLoading: boolean = true;
  activeHintIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private topicService: TopicService
  ) {}

  ngOnInit() {
    const topicId = this.route.snapshot.paramMap.get('id');
    console.log('Loading topic details for ID:', topicId);
    if (topicId) {
      this.loadTopic(topicId);
    } else {
      console.error('No topic ID found in route');
      this.isLoading = false;
    }
  }

  loadTopic(topicId: string) {
    this.isLoading = true;
    this.topicService.getTopicById(topicId).subscribe(
      (topic: Topic | undefined) => {
        console.log('Topic loaded:', topic);
        if (topic) {
          this.topic = topic;
        } else {
          this.createMockTopic(topicId);
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error loading topic:', error);
        this.createMockTopic(topicId);
        this.isLoading = false;
      }
    );
  }

  createMockTopic(topicId: string) {
    const topicNames: { [key: string]: string } = {
      '1': 'Arrays & Lists', '2': 'HashSets', '3': 'HashMaps & Dictionaries',
      '4': 'Strings', '5': 'Linked Lists', '6': 'Stacks', '7': 'Queues',
      '8': 'Trees', '9': 'Graphs', '10': 'Heaps', '11': 'Sorting Algorithms',
      '12': 'Searching Algorithms', '13': 'Dynamic Programming',
      '14': 'Greedy Algorithms', '15': 'Backtracking'
    };
    
    this.topic = {
      id: topicId,
      name: topicNames[topicId] || 'Data Structures',
      description: 'Master this topic with comprehensive learning materials and practice tests',
      category: 'DSA',
      commonProblems: [
        'Problem 1: Basic operations and fundamentals',
        'Problem 2: Advanced algorithms and optimizations',
        'Problem 3: Real-world applications and use cases'
      ],
      hints: [
        {
          title: 'Key Concept',
          description: 'Understand the fundamental principles and time complexities',
          codeSnippet: '// Example code snippet\nfunction example() {\n  return "Hello World";\n}',
          language: 'javascript'
        },
        {
          title: 'Optimization Tip',
          description: 'Learn how to optimize your solutions for better performance',
          codeSnippet: '// Optimized approach\nconst optimized = data => data.filter(x => x > 0);',
          language: 'javascript'
        }
      ]
    };
  }

  takeTest() {
    console.log('Taking test for topic:', this.topic?.id);
    if (this.topic) {
      this.router.navigate(['/test', this.topic.id]).then(success => {
        console.log('Navigation to test successful:', success);
      }).catch(error => {
        console.error('Navigation to test failed:', error);
      });
    }
  }

  get activeHint(): Hint | null {
    return this.topic && this.topic.hints && this.topic.hints.length > 0 
      ? this.topic.hints[this.activeHintIndex] 
      : null;
  }

  nextHint() {
    if (this.topic && this.topic.hints) {
      this.activeHintIndex = (this.activeHintIndex + 1) % this.topic.hints.length;
    }
  }

  previousHint() {
    if (this.topic && this.topic.hints) {
      this.activeHintIndex = this.activeHintIndex === 0 
        ? this.topic.hints.length - 1 
        : this.activeHintIndex - 1;
    }
  }

  copyCode(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      console.log('Code copied to clipboard');
    });
  }
}