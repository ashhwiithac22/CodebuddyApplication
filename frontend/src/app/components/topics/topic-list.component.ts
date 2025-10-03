//frontend/src/app/components/topics/topic-list.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { TopicService, Topic } from '../../services/topic.service';
import { TestService } from '../../services/test.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../layout/navbar.component'; 

interface TopicWithStats extends Topic {
  bestScore?: number;
  totalAttempts?: number;
  hasTest?: boolean;
}

@Component({
  selector: 'app-topic-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {
  topics: TopicWithStats[] = [];
  filteredTopics: TopicWithStats[] = [];
  searchText = '';
  selectedCategory = 'all';
  categories = ['all', 'DSA', 'SQL', 'Python'];
  isLoading = true;

  constructor(
    private topicService: TopicService,
    @Inject(TestService) private testService: TestService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadTopicsWithTestData();
  }

  loadTopicsWithTestData() {
    this.isLoading = true;
    
    this.topicService.getTopics().subscribe(
      (data: Topic[]) => {
        this.topics = this.enrichTopicsWithTestInfo(data);
        this.filteredTopics = this.topics;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error loading topics:', error);
        this.topics = this.createTopicsFromTestService();
        this.filteredTopics = this.topics;
        this.isLoading = false;
      }
    );
  }

  enrichTopicsWithTestInfo(topics: Topic[]): TopicWithStats[] {
    return topics.map(topic => {
      const bestScore = this.testService.getBestScore(topic.id);
      const topicResults = this.testService.getTopicTestResults(topic.id);
      const totalAttempts = topicResults.length;

      return {
        ...topic,
        bestScore: bestScore,
        totalAttempts: totalAttempts,
        hasTest: true
      } as TopicWithStats;
    });
  }

  createTopicsFromTestService(): TopicWithStats[] {
    const testTopics: TopicWithStats[] = [
      {
        id: '1',
        name: 'Arrays & Lists',
        description: 'Master array operations, sorting, searching, and common algorithms',
        category: 'DSA',
        hints: [],
        commonProblems: ['Two Sum', 'Maximum Subarray', 'Merge Intervals'],
        bestScore: this.testService.getBestScore('1'),
        totalAttempts: this.testService.getTopicTestResults('1').length,
        hasTest: true
      },
      {
        id: '2',
        name: 'HashSets',
        description: 'Learn HashSet operations, collision handling, and practical applications',
        category: 'DSA',
        hints: [],
        commonProblems: ['Contains Duplicate', 'Intersection of Arrays'],
        bestScore: this.testService.getBestScore('2'),
        totalAttempts: this.testService.getTopicTestResults('2').length,
        hasTest: true
      },
      // Add other topics here...
    ];
    return testTopics;
  }

  filterTopics() {
    this.filteredTopics = this.topics.filter(topic => {
      const matchesSearch = topic.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
                           topic.description.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesCategory = this.selectedCategory === 'all' || topic.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  viewTopicDetails(topic: TopicWithStats) {
    console.log('Navigating to topic details:', topic.id);
    this.router.navigate(['/topics', topic.id]).then(success => {
      console.log('Navigation successful:', success);
      if (!success) {
        console.error('Failed to navigate to topic details');
      }
    }).catch(error => {
      console.error('Navigation error:', error);
    });
  }

  takeTest(topic: TopicWithStats) {
    console.log('Taking test for topic:', topic.id);
    this.router.navigate(['/test', topic.id]).then(success => {
      console.log('Test navigation successful:', success);
      if (!success) {
        console.error('Failed to navigate to test');
      }
    }).catch(error => {
      console.error('Test navigation error:', error);
    });
  }

  getScoreColor(score: number): string {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-danger';
  }

  hasTestResults(topic: TopicWithStats): boolean {
    return (topic.totalAttempts ?? 0) > 0;
  }
}