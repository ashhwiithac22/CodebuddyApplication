//frontend/src/app/components/topics/topic-list.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { TopicService, Topic } from '../../services/topic.service';
import { TestService } from '../../services/test.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../layout/navbar.component'; 

// Extended interface for the component
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
    
    // Load topics from topic service
    this.topicService.getTopics().subscribe(
      (data: Topic[]) => {
        this.topics = this.enrichTopicsWithTestInfo(data);
        this.filteredTopics = this.topics;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error loading topics:', error);
        // If topic service fails, create topics with test data
        this.topics = this.createTopicsFromTestService();
        this.filteredTopics = this.topics;
        this.isLoading = false;
      }
    );
  }

  enrichTopicsWithTestInfo(topics: Topic[]): TopicWithStats[] {
    return topics.map(topic => {
      // Get test data from test service
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
    // Create topics based on available tests in test service
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
      {
        id: '3',
        name: 'HashMaps & Dictionaries',
        description: 'Understand key-value pairs, hash functions, and real-world use cases',
        category: 'DSA',
        hints: [],
        commonProblems: ['Two Sum', 'Group Anagrams', 'First Unique Character'],
        bestScore: this.testService.getBestScore('3'),
        totalAttempts: this.testService.getTopicTestResults('3').length,
        hasTest: true
      },
      {
        id: '4',
        name: 'Strings',
        description: 'String manipulation, pattern matching, and advanced string algorithms',
        category: 'DSA',
        hints: [],
        commonProblems: ['Longest Substring', 'Valid Palindrome', 'String Compression'],
        bestScore: this.testService.getBestScore('4'),
        totalAttempts: this.testService.getTopicTestResults('4').length,
        hasTest: true
      },
      {
        id: '5',
        name: 'Linked Lists',
        description: 'Singly/doubly linked lists, cycle detection, and pointer manipulation',
        category: 'DSA',
        hints: [],
        commonProblems: ['Reverse Linked List', 'Detect Cycle', 'Merge Two Lists'],
        bestScore: this.testService.getBestScore('5'),
        totalAttempts: this.testService.getTopicTestResults('5').length,
        hasTest: true
      },
      {
        id: '6',
        name: 'Stacks',
        description: 'LIFO data structure for various algorithms',
        category: 'DSA',
        hints: [],
        commonProblems: ['Valid Parentheses', 'Min Stack', 'Next Greater Element'],
        bestScore: this.testService.getBestScore('6'),
        totalAttempts: this.testService.getTopicTestResults('6').length,
        hasTest: true
      },
      {
        id: '7',
        name: 'Queues',
        description: 'FIFO data structure for BFS and scheduling',
        category: 'DSA',
        hints: [],
        commonProblems: ['Sliding Window', 'Circular Queue', 'BFS Implementation'],
        bestScore: this.testService.getBestScore('7'),
        totalAttempts: this.testService.getTopicTestResults('7').length,
        hasTest: true
      },
      {
        id: '8',
        name: 'Trees',
        description: 'Hierarchical data structures with nodes and edges',
        category: 'DSA',
        hints: [],
        commonProblems: ['Tree Traversal', 'BST Validation', 'LCA Problem'],
        bestScore: this.testService.getBestScore('8'),
        totalAttempts: this.testService.getTopicTestResults('8').length,
        hasTest: true
      },
      {
        id: '9',
        name: 'Graphs',
        description: 'Networks of interconnected nodes',
        category: 'DSA',
        hints: [],
        commonProblems: ['BFS/DFS', 'Shortest Path', 'Cycle Detection'],
        bestScore: this.testService.getBestScore('9'),
        totalAttempts: this.testService.getTopicTestResults('9').length,
        hasTest: true
      },
      {
        id: '10',
        name: 'Heaps',
        description: 'Priority queue implementations',
        category: 'DSA',
        hints: [],
        commonProblems: ['Kth Largest', 'Top K Elements', 'Median Finder'],
        bestScore: this.testService.getBestScore('10'),
        totalAttempts: this.testService.getTopicTestResults('10').length,
        hasTest: true
      },
      {
        id: '11',
        name: 'Sorting Algorithms',
        description: 'Comparison and non-comparison sorts',
        category: 'DSA',
        hints: [],
        commonProblems: ['Quick Sort', 'Merge Sort', 'Heap Sort'],
        bestScore: this.testService.getBestScore('11'),
        totalAttempts: this.testService.getTopicTestResults('11').length,
        hasTest: true
      },
      {
        id: '12',
        name: 'Searching Algorithms',
        description: 'Binary search and search variations',
        category: 'DSA',
        hints: [],
        commonProblems: ['Binary Search', 'Search Rotated Array', 'Find Peak'],
        bestScore: this.testService.getBestScore('12'),
        totalAttempts: this.testService.getTopicTestResults('12').length,
        hasTest: true
      },
      {
        id: '13',
        name: 'Dynamic Programming',
        description: 'Memoization, tabulation, and optimization',
        category: 'DSA',
        hints: [],
        commonProblems: ['Fibonacci', 'Knapsack', 'LCS'],
        bestScore: this.testService.getBestScore('13'),
        totalAttempts: this.testService.getTopicTestResults('13').length,
        hasTest: true
      },
      {
        id: '14',
        name: 'Greedy Algorithms',
        description: 'Local optimization strategies',
        category: 'DSA',
        hints: [],
        commonProblems: ['Activity Selection', 'Coin Change', 'Huffman Coding'],
        bestScore: this.testService.getBestScore('14'),
        totalAttempts: this.testService.getTopicTestResults('14').length,
        hasTest: true
      },
      {
        id: '15',
        name: 'Backtracking',
        description: 'Recursive exploration and constraint satisfaction',
        category: 'DSA',
        hints: [],
        commonProblems: ['N-Queens', 'Sudoku', 'Permutations'],
        bestScore: this.testService.getBestScore('15'),
        totalAttempts: this.testService.getTopicTestResults('15').length,
        hasTest: true
      }
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
    this.router.navigate(['/topics', topic.id]);
  }

  takeTest(topic: TopicWithStats) {
    console.log('Taking test for topic:', topic.name, 'ID:', topic.id);
    this.router.navigate(['/test', topic.id]);
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