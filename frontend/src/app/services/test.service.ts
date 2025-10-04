//frontend/src/app/services/test.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Question {
  id: number;
  type: 'mcq' | 'fillblank';
  question: string;
  options?: string[];
  correctAnswer: string;
  userAnswer?: string;
  isAnswered?: boolean;
  isCorrect?: boolean;
  points?: number;
}

export interface TestResult {
  topicId: string;
  topicName: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: Date;
  questions: Question[];
  timeSpent: string;
}

export interface TestProgress {
  topicId: string;
  currentQuestionIndex: number;
  score: number;
  answeredQuestions: number;
  startTime: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private readonly STORAGE_KEY = 'testResults';
  private readonly PROGRESS_KEY = 'testProgress';

  constructor() { }

  getTopicQuestions(topicId: string): Observable<Question[]> {
    const questions = this.generateTopicQuestions(topicId);
    return of(questions).pipe(delay(500));
  }

  saveTestResult(result: TestResult): Observable<{ success: boolean; message: string }> {
    try {
      const existingResults = this.getStoredTestResults();
      existingResults.push(result);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingResults));
      return of({ success: true, message: 'Test results saved successfully' });
    } catch (error) {
      return of({ success: false, message: 'Failed to save test results' });
    }
  }

  getTestResults(): TestResult[] {
    return this.getStoredTestResults();
  }

  getTopicTestResults(topicId: string): TestResult[] {
    const allResults = this.getStoredTestResults();
    return allResults.filter(result => result.topicId === topicId);
  }

  getBestScore(topicId: string): number {
    const topicResults = this.getTopicTestResults(topicId);
    if (topicResults.length === 0) return 0;
    return Math.max(...topicResults.map(result => result.score));
  }

  saveTestProgress(progress: TestProgress): void {
    localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(progress));
  }

  getTestProgress(): TestProgress | null {
    const progress = localStorage.getItem(this.PROGRESS_KEY);
    return progress ? JSON.parse(progress) : null;
  }

  clearTestProgress(): void {
    localStorage.removeItem(this.PROGRESS_KEY);
  }

  calculateTimeSpent(startTime: Date, endTime: Date): string {
    const timeDiff = endTime.getTime() - startTime.getTime();
    const minutes = Math.floor(timeDiff / 60000);
    const seconds = Math.floor((timeDiff % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  }

  private getStoredTestResults(): TestResult[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      const results = JSON.parse(stored);
      return results.map((result: any) => ({
        ...result,
        completedAt: new Date(result.completedAt)
      }));
    } catch (error) {
      console.error('Error reading test results from storage:', error);
      return [];
    }
  }

  private generateTopicQuestions(topicId: string): Question[] {
    const questionGenerators: { [key: string]: () => Question[] } = {
      '1': () => this.getArrayQuestions(),
      '2': () => this.getHashSetQuestions(),
      '3': () => this.getHashMapQuestions(),
      '4': () => this.getStringQuestions(),
      '5': () => this.getLinkedListQuestions(),
      '6': () => this.getStackQuestions(),
      '7': () => this.getQueueQuestions(),
      '8': () => this.getTreeQuestions(),
      '9': () => this.getGraphQuestions(),
      '10': () => this.getHeapQuestions(),
      '11': () => this.getSortingQuestions(),
      '12': () => this.getSearchingQuestions(),
      '13': () => this.getDynamicProgrammingQuestions(),
      '14': () => this.getGreedyQuestions(),
      '15': () => this.getBacktrackingQuestions()
    };
    return questionGenerators[topicId]?.() || this.getDefaultQuestions();
  }

  // Arrays & Lists - 25 Questions
  private getArrayQuestions(): Question[] {
    return [
      {
        id: 1, type: 'mcq', points: 2,
        question: 'What is the time complexity of accessing an element by index in an array?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 'O(1)'
      },
      {
        id: 2, type: 'fillblank', points: 2,
        question: 'The algorithm used to find the maximum subarray sum in O(n) time is called __________.',
        correctAnswer: 'Kadane\'s Algorithm'
      },
      {
        id: 3, type: 'mcq', points: 2,
        question: 'What is the worst-case time complexity of searching in an unsorted array',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctAnswer: 'O(n)'
      },
      {
        id: 4, type: 'mcq', points: 2,
        question: 'Which technique helps rearrange positive and negative numbers alternatively in O(n) time?',
        options: ['sorting', 'Two Pointer', 'Hashing', 'Divide and Conquer'],
        correctAnswer: 'Two Pointer'
      },
      {
        id: 5, type: 'fillblank', points: 2,
        question: 'To detect duplicates in an array efficiently, the best approach is _',
        correctAnswer: 'HashSet'
      },
      {
        id: 6, type: 'mcq', points: 2,
        question: 'You have an array [0,1,0,2,1,0,1,3,2,1,2,1]. Which algorithm is typically used to compute trapped rainwater?',
        options: ['Two Pointers','Stack','Dynamic Programming','All of the above'],
        correctAnswer: 'All of the above'
      },
      {
        id: 7, type: 'fillblank', points: 2,
        question: 'The Dutch National Flag problem is solved using __________ partitioning.',
        correctAnswer: 'three-way'
      },
      {
        id: 8, type: 'mcq', points: 2,
        question: 'How do you find the majority element (appears > n/2 times) in an array efficiently?',
        options: ['Brute Force Count', 'Sorting', 'Boyer-Moore Voting Algorithm', 'Binary Search'],
        correctAnswer: 'Boyer-Moore Voting Algorithm'
      },
      {
        id: 9, type: 'fillblank', points: 2,
        question: 'The __________ technique is used to find the smallest subarray with sum ≥ target.',
        correctAnswer: 'sliding window'
      },
      {
        id: 10, type: 'mcq', points: 2,
        question: 'Find first missing positive integer”, which approach is efficient?',
        options: ['Hashing', 'Sorting','In-place marking','Both A and C'],
        correctAnswer: 'Both A and C'
      },
      {
        id: 11, type: 'fillblank', points: 2,
        question: 'The __________ problem involves finding the maximum profit from stock prices.',
        correctAnswer: 'best time to buy and sell stock'
      },
      {
        id: 12, type: 'mcq', points: 2,
        question: 'How do you merge two sorted arrays into a sorted array efficiently?',
        options: ['Brute force insert', 'Two Pointers', 'Sorting the combined array', 'Recursion'],
        correctAnswer: 'Sorting the combined array'
      },
      {
        id: 13, type: 'fillblank', points: 2,
        question: 'The __________ method is used to solve the "Product of Array Except Self" problem.',
        correctAnswer: 'prefix and suffix products'
      },
      {
        id: 14, type: 'mcq', points: 2,
        question: 'You are given an array of heights. Which approach computes water trapped between bars using O(n) space?',
        options: ['Brute Force','Prefix-Suffix max arrays', 'Stack', 'Two Pointers'],
        correctAnswer: 'Stack'
      },
      {
        id: 15, type: 'fillblank', points: 2,
        question: '________is used to solve subarray product less than k.',
        correctAnswer: 'Sliding Window'
      },
      {
        id: 16, type: 'mcq', points: 2,
        question: 'For "Buy and Sell Stock once", which approach is optimal?',
        options: ['Brute force O(n²)', 'Track min and max while traversing', 'Sorting', 'Sliding window'],
        correctAnswer: 'Sorting'
      },
      {
        id: 17, type: 'fillblank', points: 2,
        question: 'The __________ technique is used to find the container with most water.',
        correctAnswer: 'two-pointer'
      },
      {
        id: 18, type: 'mcq', points: 2,
        question: 'You need largest sum of contiguous subarray. Which approach?',
        options: ['Kadane\'s Algorithm', 'Sliding Window', 'Hash Map', 'Stack'],
        correctAnswer: 'Kadane\'s Algorithm'
      },
      {
        id: 19, type: 'fillblank', points: 2,
        question: 'To rearrange positives and negatives alternatively, ________ approach works.',
        correctAnswer: 'Two Pointer'
      },
      {
        id: 20, type: 'mcq', points: 2,
        question: 'For Longest Increasing Subsequence, which approach is efficient?',
        options: ['DP O(n²)', 'Binary search + DP O(n log n)', 'Sorting', 'Brute force'],
        correctAnswer: 'Binary search + DP O(n log n)'
      },
      {
        id: 21, type: 'fillblank', points: 2,
        question: 'To find peak element,_______can be applied.',
        correctAnswer: 'Binary Search'
      },
      {
        id: 22, type: 'mcq', points: 2,
        question: 'For "Stock buy and sell multiple transactions", which approach?',
        options: ['DP', 'Greedy', 'Nested loops', 'All of the above'],
        correctAnswer: 'Greedy'
      },
      {
        id: 23, type: 'fillblank', points: 2,
        question: ' _______is often used to count frequency of elements in an array.',
        correctAnswer: 'HashMap'
      },
      {
        id: 24, type: 'mcq', points: 2,
        question: 'What is the time complexity of finding all triplets that sum to zero?',
        options: ['O(n)', 'O(n²)', 'O(n³)', 'O(n log n)'],
        correctAnswer: 'O(n²)'
      },
      {
        id: 25, type: 'fillblank', points: 2,
        question: 'The __________ technique is used for subarray sum equals k problem.',
        correctAnswer: 'prefix sum'
      }
    ];
  }

  // HashSet - 25 Questions
  private getHashSetQuestions(): Question[] {
    return [
      {
        id: 1, type: 'mcq', points: 2,
        question: 'What is the worst-case time complexity for finding the longest consecutive sequence using HashSet?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'],
        correctAnswer: 'O(n)'
      },
      {
        id: 2, type: 'fillblank', points: 2,
        question: 'To check Sudoku validity using HashSet, the space complexity is __________.',
        correctAnswer: 'O(1)'
      },
      {
        id: 3, type: 'mcq', points: 2,
        question: 'Which approach is best for finding duplicate elements in an array?',
        options: ['Sorting', 'HashSet', 'Nested loops', 'Binary Search'],
        correctAnswer: 'HashSet'
      },
      {
        id: 4, type: 'fillblank', points: 2,
        question: 'A HashSet does not allow __________ elements.',
        correctAnswer: 'duplicate'
      },
      {
        id: 5, type: 'mcq', points: 2,
        question: 'What is the average case time complexity for insertion in HashSet?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctAnswer: 'O(1)'
      },
      {
        id: 6, type: 'fillblank', points: 2,
        question: 'The __________ method checks if an element exists in HashSet.',
        correctAnswer: 'contains'
      },
      {
        id: 7, type: 'mcq', points: 2,
        question: 'Which data structure is HashSet typically built upon?',
        options: ['Array', 'Linked List', 'Hash Table', 'Tree'],
        correctAnswer: 'Hash Table'
      },
      {
        id: 8, type: 'fillblank', points: 2,
        question: 'The __________ problem uses HashSet to find unique elements.',
        correctAnswer: 'intersection of two arrays'
      },
      {
        id: 9, type: 'mcq', points: 2,
        question: 'What is the worst-case time complexity for HashSet operations?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 'O(n)'
      },
      {
        id: 10, type: 'fillblank', points: 2,
        question: 'The __________ number problem uses HashSet for cycle detection.',
        correctAnswer: 'happy'
      },
      {
        id: 11, type: 'mcq', points: 2,
        question: 'Which method removes all elements from HashSet?',
        options: ['clear()', 'removeAll()', 'delete()', 'empty()'],
        correctAnswer: 'clear()'
      },
      {
        id: 12, type: 'fillblank', points: 2,
        question: 'The __________ jewels problem uses HashSet for O(1) lookups.',
        correctAnswer: 'jewels and stones'
      },
      {
        id: 13, type: 'mcq', points: 2,
        question: 'What is the load factor in HashSet?',
        options: ['Ratio of elements to capacity', 'Hash function', 'Collision rate', 'Memory usage'],
        correctAnswer: 'Ratio of elements to capacity'
      },
      {
        id: 14, type: 'fillblank', points: 2,
        question: 'The __________ method returns the size of HashSet.',
        correctAnswer: 'size'
      },
      {
        id: 15, type: 'mcq', points: 2,
        question: 'Which collision resolution technique is commonly used in HashSet?',
        options: ['Chaining', 'Linear Probing', 'Quadratic Probing', 'All of the above'],
        correctAnswer: 'All of the above'
      },
      {
        id: 16, type: 'fillblank', points: 2,
        question: 'The __________ problem finds if a number is in HashSet.',
        correctAnswer: 'contains duplicate'
      },
      {
        id: 17, type: 'mcq', points: 2,
        question: 'What is the default initial capacity of HashSet in Java?',
        options: ['10', '16', '32', '64'],
        correctAnswer: '16'
      },
      {
        id: 18, type: 'fillblank', points: 2,
        question: 'The __________ method adds an element to HashSet.',
        correctAnswer: 'add'
      },
      {
        id: 19, type: 'mcq', points: 2,
        question: 'Which interface does HashSet implement?',
        options: ['Set', 'List', 'Map', 'Collection'],
        correctAnswer: 'Set'
      },
      {
        id: 20, type: 'fillblank', points: 2,
        question: 'The __________ problem uses HashSet to distribute candies.',
        correctAnswer: 'distribute candies'
      },
      {
        id: 21, type: 'mcq', points: 2,
        question: 'What happens when HashSet reaches its load factor?',
        options: ['It resizes', 'It stops accepting elements', 'It throws an error', 'It slows down'],
        correctAnswer: 'It resizes'
      },
      {
        id: 22, type: 'fillblank', points: 2,
        question: 'The __________ method removes an element from HashSet.',
        correctAnswer: 'remove'
      },
      {
        id: 23, type: 'mcq', points: 2,
        question: 'Which is faster for membership testing: Array or HashSet?',
        options: ['HashSet', 'Array', 'Same speed', 'Depends on size'],
        correctAnswer: 'HashSet'
      },
      {
        id: 24, type: 'fillblank', points: 2,
        question: 'The __________ problem finds missing number using HashSet.',
        correctAnswer: 'missing number'
      },
      {
        id: 25, type: 'mcq', points: 2,
        question: 'What is the time complexity to convert an array to HashSet?',
        options: ['O(n)', 'O(1)', 'O(n²)', 'O(log n)'],
        correctAnswer: 'O(n)'
      }
    ];
  }

  private getHashMapQuestions(): Question[] {
    return [
      {
        id: 1, type: 'mcq', points: 2,
        question: 'What is the average time complexity of accessing an element in a HashMap?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 'O(1)'
      },
      {
        id: 2, type: 'fillblank', points: 2,
        question: 'A __________ function is used to compute the index in a hash table.',
        correctAnswer: 'hash'
      },
      {
        id: 3, type: 'mcq', points: 2,
        question: 'Which collision resolution technique uses linked lists?',
        options: ['Chaining', 'Open Addressing', 'Linear Probing', 'Double Hashing'],
        correctAnswer: 'Chaining'
      },
      {
        id: 4, type: 'fillblank', points: 2,
        question: 'The __________ ratio is the number of elements divided by number of buckets.',
        correctAnswer: 'load'
      },
      {
        id: 5, type: 'mcq', points: 2,
        question: 'Which of the following is NOT a valid hashing technique?',
        options: ['Chaining', 'Linear Probing', 'Quadratic Probing', 'Binary Search'],
        correctAnswer: 'Binary Search'
      },
      {
        id: 6, type: 'fillblank', points: 2,
        question: 'The __________ method resolves collision by searching next empty slot.',
        correctAnswer: 'linear probing'
      },
      {
        id: 7, type: 'mcq', points: 2,
        question: 'What happens when the load factor of a HashMap exceeds the threshold?',
        options: ['Rehashing', 'Deletion', 'Overflow', 'Sorting'],
        correctAnswer: 'Rehashing'
      },
      {
        id: 8, type: 'fillblank', points: 2,
        question: 'In __________ hashing, the table size is doubled and elements are reinserted.',
        correctAnswer: 'rehashing'
      },
      {
        id: 9, type: 'mcq', points: 2,
        question: 'Which collision resolution uses a secondary hash function?',
        options: ['Linear Probing', 'Quadratic Probing', 'Double Hashing', 'Chaining'],
        correctAnswer: 'Double Hashing'
      },
      {
        id: 10, type: 'fillblank', points: 2,
        question: 'A __________ dictionary maps keys to values in constant average time.',
        correctAnswer: 'hash'
      },
      {
        id: 11, type: 'mcq', points: 2,
        question: 'Which key property must hash functions satisfy?',
        options: ['Deterministic', 'Random', 'Unique for all inputs', 'None of these'],
        correctAnswer: 'Deterministic'
      },
      {
        id: 12, type: 'fillblank', points: 2,
        question: 'The __________ problem occurs when two keys map to the same index.',
        correctAnswer: 'collision'
      },
      {
        id: 13, type: 'mcq', points: 2,
        question: 'Which is a real-world application of HashMaps?',
        options: ['Database indexing', 'Caching', 'Symbol tables', 'All of the above'],
        correctAnswer: 'All of the above'
      },
      {
        id: 14, type: 'fillblank', points: 2,
        question: 'The __________ probing method reduces primary clustering.',
        correctAnswer: 'quadratic'
      },
      {
        id: 15, type: 'mcq', points: 2,
        question: 'What is the worst-case time complexity of searching in a HashMap?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 'O(n)'
      },
      {
        id: 16, type: 'fillblank', points: 2,
        question: 'A __________ map preserves insertion order in some languages.',
        correctAnswer: 'linked hash'
      },
      {
        id: 17, type: 'mcq', points: 2,
        question: 'Which factor influences hash table performance?',
        options: ['Load factor', 'Hash function', 'Collision handling', 'All of the above'],
        correctAnswer: 'All of the above'
      },
      {
        id: 18, type: 'fillblank', points: 2,
        question: 'The __________ map stores keys in sorted order.',
        correctAnswer: 'tree'
      },
      {
        id: 19, type: 'mcq', points: 2,
        question: 'Which operation has O(1) average complexity in a HashMap?',
        options: ['Insert', 'Delete', 'Search', 'All of the above'],
        correctAnswer: 'All of the above'
      },
      {
        id: 20, type: 'fillblank', points: 2,
        question: 'A __________ attack happens when many keys hash to the same bucket.',
        correctAnswer: 'hash collision'
      },
      {
        id: 21, type: 'mcq', points: 2,
        question: 'Which data structure underlies Python dictionaries?',
        options: ['Binary Tree', 'Hash Table', 'Array', 'Graph'],
        correctAnswer: 'Hash Table'
      },
      {
        id: 22, type: 'fillblank', points: 2,
        question: 'The __________ hash function ensures uniform distribution of keys.',
        correctAnswer: 'universal'
      },
      {
        id: 23, type: 'mcq', points: 2,
        question: 'What is the typical default load factor in Java HashMap?',
        options: ['0.5', '0.65', '0.75', '1.0'],
        correctAnswer: '0.75'
      },
      {
        id: 24, type: 'fillblank', points: 2,
        question: 'The __________ dictionary in Python maintains insertion order (3.7+).',
        correctAnswer: 'dict'
      },
      {
        id: 25, type: 'mcq', points: 2,
        question: 'Which operation is costly in a HashMap compared to a TreeMap?',
        options: ['Insert', 'Search', 'Iteration in sorted order', 'Delete'],
        correctAnswer: 'Iteration in sorted order'
      }
    ];
  }

    private getHashmapQuestions(): Question[] {
    return [
      {
        id: 1, type: 'mcq', points: 2,
        question: 'What is the average time complexity of accessing an element in a HashMap?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 'O(1)'
      },
      {
        id: 2, type: 'fillblank', points: 2,
        question: 'A __________ function is used to compute the index in a hash table.',
        correctAnswer: 'hash'
      },
      {
        id: 3, type: 'mcq', points: 2,
        question: 'Which collision resolution technique uses linked lists?',
        options: ['Chaining', 'Open Addressing', 'Linear Probing', 'Double Hashing'],
        correctAnswer: 'Chaining'
      },
      {
        id: 4, type: 'fillblank', points: 2,
        question: 'The __________ ratio is the number of elements divided by number of buckets.',
        correctAnswer: 'load'
      },
      {
        id: 5, type: 'mcq', points: 2,
        question: 'Which of the following is NOT a valid hashing technique?',
        options: ['Chaining', 'Linear Probing', 'Quadratic Probing', 'Binary Search'],
        correctAnswer: 'Binary Search'
      },
      {
        id: 6, type: 'fillblank', points: 2,
        question: 'The __________ method resolves collision by searching next empty slot.',
        correctAnswer: 'linear probing'
      },
      {
        id: 7, type: 'mcq', points: 2,
        question: 'What happens when the load factor of a HashMap exceeds the threshold?',
        options: ['Rehashing', 'Deletion', 'Overflow', 'Sorting'],
        correctAnswer: 'Rehashing'
      },
      {
        id: 8, type: 'fillblank', points: 2,
        question: 'In __________ hashing, the table size is doubled and elements are reinserted.',
        correctAnswer: 'rehashing'
      },
      {
        id: 9, type: 'mcq', points: 2,
        question: 'Which collision resolution uses a secondary hash function?',
        options: ['Linear Probing', 'Quadratic Probing', 'Double Hashing', 'Chaining'],
        correctAnswer: 'Double Hashing'
      },
      {
        id: 10, type: 'fillblank', points: 2,
        question: 'A __________ dictionary maps keys to values in constant average time.',
        correctAnswer: 'hash'
      },
      {
        id: 11, type: 'mcq', points: 2,
        question: 'Which key property must hash functions satisfy?',
        options: ['Deterministic', 'Random', 'Unique for all inputs', 'None of these'],
        correctAnswer: 'Deterministic'
      },
      {
        id: 12, type: 'fillblank', points: 2,
        question: 'The __________ problem occurs when two keys map to the same index.',
        correctAnswer: 'collision'
      },
      {
        id: 13, type: 'mcq', points: 2,
        question: 'Which is a real-world application of HashMaps?',
        options: ['Database indexing', 'Caching', 'Symbol tables', 'All of the above'],
        correctAnswer: 'All of the above'
      },
      {
        id: 14, type: 'fillblank', points: 2,
        question: 'The __________ probing method reduces primary clustering.',
        correctAnswer: 'quadratic'
      },
      {
        id: 15, type: 'mcq', points: 2,
        question: 'What is the worst-case time complexity of searching in a HashMap?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 'O(n)'
      },
      {
        id: 16, type: 'fillblank', points: 2,
        question: 'A __________ map preserves insertion order in some languages.',
        correctAnswer: 'linked hash'
      },
      {
        id: 17, type: 'mcq', points: 2,
        question: 'Which factor influences hash table performance?',
        options: ['Load factor', 'Hash function', 'Collision handling', 'All of the above'],
        correctAnswer: 'All of the above'
      },
      {
        id: 18, type: 'fillblank', points: 2,
        question: 'The __________ map stores keys in sorted order.',
        correctAnswer: 'tree'
      },
      {
        id: 19, type: 'mcq', points: 2,
        question: 'Which operation has O(1) average complexity in a HashMap?',
        options: ['Insert', 'Delete', 'Search', 'All of the above'],
        correctAnswer: 'All of the above'
      },
      {
        id: 20, type: 'fillblank', points: 2,
        question: 'A __________ attack happens when many keys hash to the same bucket.',
        correctAnswer: 'hash collision'
      },
      {
        id: 21, type: 'mcq', points: 2,
        question: 'Which data structure underlies Python dictionaries?',
        options: ['Binary Tree', 'Hash Table', 'Array', 'Graph'],
        correctAnswer: 'Hash Table'
      },
      {
        id: 22, type: 'fillblank', points: 2,
        question: 'The __________ hash function ensures uniform distribution of keys.',
        correctAnswer: 'universal'
      },
      {
        id: 23, type: 'mcq', points: 2,
        question: 'What is the typical default load factor in Java HashMap?',
        options: ['0.5', '0.65', '0.75', '1.0'],
        correctAnswer: '0.75'
      },
      {
        id: 24, type: 'fillblank', points: 2,
        question: 'The __________ dictionary in Python maintains insertion order (3.7+).',
        correctAnswer: 'dict'
      },
      {
        id: 25, type: 'mcq', points: 2,
        question: 'Which operation is costly in a HashMap compared to a TreeMap?',
        options: ['Insert', 'Search', 'Iteration in sorted order', 'Delete'],
        correctAnswer: 'Iteration in sorted order'
      }
    ];
  }
    private getStringQuestions(): Question[] {
    return [
      {
        id: 1, type: 'mcq', points: 2,
        question: 'Which of the following is an immutable class in Java?',
        options: ['String', 'StringBuilder', 'StringBuffer', 'CharArray'],
        correctAnswer: 'String'
      },
      {
        id: 2, type: 'fillblank', points: 2,
        question: 'The __________ algorithm is used to find the longest common subsequence between two strings.',
        correctAnswer: 'dynamic programming'
      },
      {
        id: 3, type: 'mcq', points: 2,
        question: 'What is the time complexity of checking if two strings are anagrams?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'],
        correctAnswer: 'O(n log n)'
      },
      {
        id: 4, type: 'fillblank', points: 2,
        question: 'The __________ algorithm is commonly used for pattern matching in strings.',
        correctAnswer: 'KMP (Knuth-Morris-Pratt)'
      },
      {
        id: 5, type: 'mcq', points: 2,
        question: 'Which string algorithm finds the longest prefix that is also a suffix?',
        options: ['KMP', 'Rabin-Karp', 'Z Algorithm', 'Naive'],
        correctAnswer: 'KMP'
      },
      {
        id: 6, type: 'fillblank', points: 2,
        question: 'A __________ string reads the same forwards and backwards.',
        correctAnswer: 'palindrome'
      },
      {
        id: 7, type: 'mcq', points: 2,
        question: 'Which algorithm is efficient for multiple pattern searching in a string?',
        options: ['KMP', 'Rabin-Karp', 'Aho-Corasick', 'Naive'],
        correctAnswer: 'Aho-Corasick'
      },
      {
        id: 8, type: 'fillblank', points: 2,
        question: 'The __________ algorithm uses rolling hash for string matching.',
        correctAnswer: 'Rabin-Karp'
      },
      {
        id: 9, type: 'mcq', points: 2,
        question: 'What is the time complexity of reversing a string of length n?',
        options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
        correctAnswer: 'O(n)'
      },
      {
        id: 10, type: 'fillblank', points: 2,
        question: 'The __________ algorithm is used to compress strings using frequency of characters.',
        correctAnswer: 'Huffman coding'
      },
      {
        id: 11, type: 'mcq', points: 2,
        question: 'Which string algorithm constructs a suffix array efficiently?',
        options: ['Radix Sort', 'Manber-Myers', 'Naive Sorting', 'KMP'],
        correctAnswer: 'Manber-Myers'
      },
      {
        id: 12, type: 'fillblank', points: 2,
        question: 'The __________ problem finds the longest substring without repeating characters.',
        correctAnswer: 'sliding window'
      },
      {
        id: 13, type: 'mcq', points: 2,
        question: 'What is the space complexity of a trie storing n strings of length m?',
        options: ['O(n)', 'O(m)', 'O(n·m)', 'O(1)'],
        correctAnswer: 'O(n·m)'
      },
      {
        id: 14, type: 'fillblank', points: 2,
        question: 'The __________ algorithm is used to find the longest palindromic substring in linear time.',
        correctAnswer: 'Manacher’s'
      },
      {
        id: 15, type: 'mcq', points: 2,
        question: 'Which method compares strings lexicographically in Java?',
        options: ['equals()', 'compare()', 'compareTo()', 'isEqual()'],
        correctAnswer: 'compareTo()'
      },
      {
        id: 16, type: 'fillblank', points: 2,
        question: 'A __________ substring problem finds common characters in all substrings.',
        correctAnswer: 'longest common substring'
      },
      {
        id: 17, type: 'mcq', points: 2,
        question: 'Which data structure is best for implementing autocomplete?',
        options: ['Array', 'Trie', 'Stack', 'Queue'],
        correctAnswer: 'Trie'
      },
      {
        id: 18, type: 'fillblank', points: 2,
        question: 'The __________ distance measures how many edits are required to transform one string into another.',
        correctAnswer: 'Levenshtein (edit)'
      },
      {
        id: 19, type: 'mcq', points: 2,
        question: 'Which algorithm finds all occurrences of a pattern using prefix function?',
        options: ['Rabin-Karp', 'KMP', 'Z Algorithm', 'Aho-Corasick'],
        correctAnswer: 'KMP'
      },
      {
        id: 20, type: 'fillblank', points: 2,
        question: 'The __________ algorithm uses Z-array to search for a pattern in linear time.',
        correctAnswer: 'Z Algorithm'
      },
      {
        id: 21, type: 'mcq', points: 2,
        question: 'Which of the following is NOT a valid string matching algorithm?',
        options: ['Naive', 'Suffix Array', 'AVL Search', 'KMP'],
        correctAnswer: 'AVL Search'
      },
      {
        id: 22, type: 'fillblank', points: 2,
        question: 'The __________ problem finds smallest window in a string containing all characters of another string.',
        correctAnswer: 'minimum window substring'
      },
      {
        id: 23, type: 'mcq', points: 2,
        question: 'Which encoding is variable length and supports all Unicode characters?',
        options: ['ASCII', 'UTF-8', 'UTF-16', 'ISO-8859-1'],
        correctAnswer: 'UTF-8'
      },
      {
        id: 24, type: 'fillblank', points: 2,
        question: 'The __________ algorithm is used in bioinformatics for sequence alignment.',
        correctAnswer: 'Smith-Waterman'
      },
      {
        id: 25, type: 'mcq', points: 2,
        question: 'Which data structure is used for fast substring search in suffix trees?',
        options: ['Heap', 'Trie', 'Suffix Tree', 'Queue'],
        correctAnswer: 'Suffix Tree'
      }
    ];
  }

    private getLinkedListQuestions(): Question[] {
    return [
      {
        id: 1, type: 'mcq', points: 2,
        question: 'Which of the following operations is efficient in a linked list compared to an array?',
        options: ['Random access', 'Insertion/Deletion', 'Binary search', 'Index lookup'],
        correctAnswer: 'Insertion/Deletion'
      },
      {
        id: 2, type: 'fillblank', points: 2,
        question: 'In a __________ linked list, the last node points back to the first node.',
        correctAnswer: 'circular'
      },
      {
        id: 3, type: 'mcq', points: 2,
        question: 'What is the time complexity of inserting a node at the head of a singly linked list?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctAnswer: 'O(1)'
      },
      {
        id: 4, type: 'fillblank', points: 2,
        question: 'A __________ linked list has nodes with both next and previous pointers.',
        correctAnswer: 'doubly'
      },
      {
        id: 5, type: 'mcq', points: 2,
        question: 'Which algorithm is commonly used to detect a cycle in a linked list?',
        options: ['DFS', 'Floyd’s cycle detection', 'KMP', 'Dijkstra'],
        correctAnswer: 'Floyd’s cycle detection'
      },
      {
        id: 6, type: 'fillblank', points: 2,
        question: 'The __________ pointer in a linked list is used to indicate the first node.',
        correctAnswer: 'head'
      },
      {
        id: 7, type: 'mcq', points: 2,
        question: 'What is the space complexity of a singly linked list storing n elements?',
        options: ['O(n)', 'O(1)', 'O(n²)', 'O(log n)'],
        correctAnswer: 'O(n)'
      },
      {
        id: 8, type: 'fillblank', points: 2,
        question: 'In a linked list, the last node contains a __________ pointer.',
        correctAnswer: 'null'
      },
      {
        id: 9, type: 'mcq', points: 2,
        question: 'Which of the following is NOT an application of linked lists?',
        options: ['Dynamic memory allocation', 'Implementing queues', 'Binary search trees', 'Direct index lookup'],
        correctAnswer: 'Direct index lookup'
      },
      {
        id: 10, type: 'fillblank', points: 2,
        question: 'To reverse a linked list, we need to change the direction of the __________ pointers.',
        correctAnswer: 'next'
      },
      {
        id: 11, type: 'mcq', points: 2,
        question: 'What is the time complexity of searching an element in a singly linked list?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctAnswer: 'O(n)'
      },
      {
        id: 12, type: 'fillblank', points: 2,
        question: 'A __________ linked list allows traversal in both forward and backward directions.',
        correctAnswer: 'doubly'
      },
      {
        id: 13, type: 'mcq', points: 2,
        question: 'Which pointer in a doubly linked list can help in reverse traversal?',
        options: ['head', 'next', 'prev', 'tail'],
        correctAnswer: 'prev'
      },
      {
        id: 14, type: 'fillblank', points: 2,
        question: 'The __________ pointer in a linked list is used to indicate the last node.',
        correctAnswer: 'tail'
      },
      {
        id: 15, type: 'mcq', points: 2,
        question: 'Which linked list is best suited for implementing a deque?',
        options: ['Singly linked list', 'Doubly linked list', 'Circular singly linked list', 'Array'],
        correctAnswer: 'Doubly linked list'
      },
      {
        id: 16, type: 'fillblank', points: 2,
        question: 'In a linked list, deleting the last node requires traversal until the __________ node.',
        correctAnswer: 'second last'
      },
      {
        id: 17, type: 'mcq', points: 2,
        question: 'Which of the following problems can be solved efficiently using linked lists?',
        options: ['Reversing elements', 'Random access', 'Binary search', 'Direct indexing'],
        correctAnswer: 'Reversing elements'
      },
      {
        id: 18, type: 'fillblank', points: 2,
        question: 'A __________ linked list saves memory by storing multiple data items in a single node.',
        correctAnswer: 'multilinked'
      },
      {
        id: 19, type: 'mcq', points: 2,
        question: 'What is the main disadvantage of linked lists over arrays?',
        options: ['Fixed size', 'Extra memory for pointers', 'Easy insertion', 'Easy deletion'],
        correctAnswer: 'Extra memory for pointers'
      },
      {
        id: 20, type: 'fillblank', points: 2,
        question: 'The __________ algorithm is used to find the middle of a linked list.',
        correctAnswer: 'slow and fast pointer'
      },
      {
        id: 21, type: 'mcq', points: 2,
        question: 'Which operation is more efficient in a linked list compared to an array?',
        options: ['Random access', 'Insertion at arbitrary position', 'Index lookup', 'Binary search'],
        correctAnswer: 'Insertion at arbitrary position'
      },
      {
        id: 22, type: 'fillblank', points: 2,
        question: 'In a circular linked list, the __________ pointer of the last node points to the head.',
        correctAnswer: 'next'
      },
      {
        id: 23, type: 'mcq', points: 2,
        question: 'Which variant of a linked list reduces memory usage by storing XOR of previous and next?',
        options: ['Circular linked list', 'XOR linked list', 'Doubly linked list', 'Skip list'],
        correctAnswer: 'XOR linked list'
      },
      {
        id: 24, type: 'fillblank', points: 2,
        question: 'A __________ list stores nodes with multiple forward pointers at different levels.',
        correctAnswer: 'skip'
      },
      {
        id: 25, type: 'mcq', points: 2,
        question: 'What is the average time complexity of deleting a node when the pointer to it is given in a singly linked list?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctAnswer: 'O(1)'
      }
    ];
  }

    private getStackQuestions(): Question[] {
    return [
      {
        id: 1, type: 'mcq', points: 2,
        question: 'What principle does a stack follow?',
        options: ['FIFO', 'LIFO', 'FILO', 'None of the above'],
        correctAnswer: 'LIFO'
      },
      {
        id: 2, type: 'fillblank', points: 2,
        question: 'The __________ operation adds an element to the top of a stack.',
        correctAnswer: 'push'
      },
      {
        id: 3, type: 'mcq', points: 2,
        question: 'Which operation removes the top element of a stack?',
        options: ['insert()', 'delete()', 'pop()', 'remove()'],
        correctAnswer: 'pop()'
      },
      {
        id: 4, type: 'fillblank', points: 2,
        question: 'The __________ operation returns the top element without removing it.',
        correctAnswer: 'peek'
      },
      {
        id: 5, type: 'mcq', points: 2,
        question: 'Which of the following can be used to implement a stack?',
        options: ['Array', 'Linked List', 'Both A and B', 'Queue'],
        correctAnswer: 'Both A and B'
      },
      {
        id: 6, type: 'fillblank', points: 2,
        question: 'A stack is also known as a __________ list.',
        correctAnswer: 'Last-In-First-Out (LIFO)'
      },
      {
        id: 7, type: 'mcq', points: 2,
        question: 'Which application uses stacks?',
        options: ['Recursion', 'Function calls', 'Expression evaluation', 'All of the above'],
        correctAnswer: 'All of the above'
      },
      {
        id: 8, type: 'fillblank', points: 2,
        question: 'Infix to postfix conversion uses a __________ data structure.',
        correctAnswer: 'stack'
      },
      {
        id: 9, type: 'mcq', points: 2,
        question: 'What is the time complexity of push operation in a stack?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 'O(1)'
      },
      {
        id: 10, type: 'fillblank', points: 2,
        question: 'The __________ error occurs when we try to pop from an empty stack.',
        correctAnswer: 'underflow'
      },
      {
        id: 11, type: 'mcq', points: 2,
        question: 'Which of the following is an application of stack?',
        options: ['Undo operation', 'Job scheduling', 'Load balancing', 'Paging'],
        correctAnswer: 'Undo operation'
      },
      {
        id: 12, type: 'fillblank', points: 2,
        question: 'The __________ error occurs when we try to push onto a full stack.',
        correctAnswer: 'overflow'
      },
      {
        id: 13, type: 'mcq', points: 2,
        question: 'Which of the following traversal uses a stack?',
        options: ['Level order', 'Inorder', 'Preorder', 'Both Inorder and Preorder'],
        correctAnswer: 'Both Inorder and Preorder'
      },
      {
        id: 14, type: 'fillblank', points: 2,
        question: 'Stacks are often used in implementing __________ in compilers.',
        correctAnswer: 'syntax parsing'
      },
      {
        id: 15, type: 'mcq', points: 2,
        question: 'Which algorithm for maze solving uses a stack?',
        options: ['BFS', 'DFS', 'Dijkstra', 'Kruskal'],
        correctAnswer: 'DFS'
      },
      {
        id: 16, type: 'fillblank', points: 2,
        question: 'The stack pointer (SP) register in CPU points to the __________ element of the stack.',
        correctAnswer: 'top'
      },
      {
        id: 17, type: 'mcq', points: 2,
        question: 'Which of the following is NOT an application of stacks?',
        options: ['Function calls', 'Expression evaluation', 'Memory management', 'Direct index lookup'],
        correctAnswer: 'Direct index lookup'
      },
      {
        id: 18, type: 'fillblank', points: 2,
        question: 'In a recursive function, the function call details are stored in a __________.',
        correctAnswer: 'stack'
      },
      {
        id: 19, type: 'mcq', points: 2,
        question: 'What is the space complexity of a stack with n elements?',
        options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
        correctAnswer: 'O(n)'
      },
      {
        id: 20, type: 'fillblank', points: 2,
        question: 'Stacks are often used for __________ checking in expressions.',
        correctAnswer: 'parentheses'
      },
      {
        id: 21, type: 'mcq', points: 2,
        question: 'What is the worst-case time complexity of searching an element in a stack?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctAnswer: 'O(n)'
      },
      {
        id: 22, type: 'fillblank', points: 2,
        question: 'The __________ stack is used in browsers for navigating back and forth between pages.',
        correctAnswer: 'history'
      },
      {
        id: 23, type: 'mcq', points: 2,
        question: 'Which of the following problems can be solved using stacks?',
        options: ['Balancing symbols', 'Tower of Hanoi', 'Reversing elements', 'All of the above'],
        correctAnswer: 'All of the above'
      },
      {
        id: 24, type: 'fillblank', points: 2,
        question: 'A __________ stack uses two stacks to implement queue operations.',
        correctAnswer: 'queue using stacks'
      },
      {
        id: 25, type: 'mcq', points: 2,
        question: 'Which operation decreases the stack size by 1?',
        options: ['push()', 'pop()', 'peek()', 'insert()'],
        correctAnswer: 'pop()'
      }
    ];
  }

    private getQueueQuestions(): Question[] {
    return [
      {
        id: 1, type: 'mcq', points: 2,
        question: 'What principle does a queue follow?',
        options: ['FIFO', 'LIFO', 'FILO', 'None of the above'],
        correctAnswer: 'FIFO'
      },
      {
        id: 2, type: 'fillblank', points: 2,
        question: 'The __________ queue is used in CPU scheduling.',
        correctAnswer: 'ready'
      },
      {
        id: 3, type: 'mcq', points: 2,
        question: 'What is the time complexity of enqueue operation in a simple queue?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 'O(1)'
      },
      {
        id: 4, type: 'fillblank', points: 2,
        question: 'A __________ queue connects two processes running asynchronously.',
        correctAnswer: 'message'
      },
      {
        id: 5, type: 'mcq', points: 2,
        question: 'Which data structure can implement a queue?',
        options: ['Array', 'Linked List', 'Both A and B', 'None of the above'],
        correctAnswer: 'Both A and B'
      },
      {
        id: 6, type: 'fillblank', points: 2,
        question: 'The __________ queue allows insertion and deletion at both ends.',
        correctAnswer: 'deque'
      },
      {
        id: 7, type: 'mcq', points: 2,
        question: 'Which type of queue is used for breadth-first search (BFS)?',
        options: ['Stack', 'Priority Queue', 'Simple Queue', 'Deque'],
        correctAnswer: 'Simple Queue'
      },
      {
        id: 8, type: 'fillblank', points: 2,
        question: 'A __________ queue is used to manage requests by priority.',
        correctAnswer: 'priority'
      },
      {
        id: 9, type: 'mcq', points: 2,
        question: 'What is the time complexity of dequeue operation in a simple queue?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 'O(1)'
      },
      {
        id: 10, type: 'fillblank', points: 2,
        question: 'The __________ queue avoids wastage of space by wrapping around.',
        correctAnswer: 'circular'
      },
      {
        id: 11, type: 'mcq', points: 2,
        question: 'Which application of queue is used in printers?',
        options: ['Task scheduling', 'Load balancing', 'Job scheduling', 'Buffering'],
        correctAnswer: 'Job scheduling'
      },
      {
        id: 12, type: 'fillblank', points: 2,
        question: 'The __________ queue is used in operating systems for disk scheduling.',
        correctAnswer: 'priority'
      },
      {
        id: 13, type: 'mcq', points: 2,
        question: 'Which operation returns the front element of a queue without removing it?',
        options: ['peek()', 'front()', 'Both A and B', 'None of the above'],
        correctAnswer: 'Both A and B'
      },
      {
        id: 14, type: 'fillblank', points: 2,
        question: 'A __________ queue is used in caching and paging algorithms.',
        correctAnswer: 'deque'
      },
      {
        id: 15, type: 'mcq', points: 2,
        question: 'What is the space complexity of a queue with n elements?',
        options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
        correctAnswer: 'O(n)'
      },
      {
        id: 16, type: 'fillblank', points: 2,
        question: 'The __________ queue is used in handling requests of varying importance.',
        correctAnswer: 'priority'
      },
      {
        id: 17, type: 'mcq', points: 2,
        question: 'Which queue is commonly used in Round-Robin scheduling?',
        options: ['Circular Queue', 'Priority Queue', 'Double-ended Queue', 'Stack'],
        correctAnswer: 'Circular Queue'
      },
      {
        id: 18, type: 'fillblank', points: 2,
        question: 'A __________ queue is used in real-time systems for fairness.',
        correctAnswer: 'circular'
      },
      {
        id: 19, type: 'mcq', points: 2,
        question: 'What is the time complexity of searching an element in a queue?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 'O(n)'
      },
      {
        id: 20, type: 'fillblank', points: 2,
        question: 'The __________ queue supports operations at both ends with restrictions.',
        correctAnswer: 'input/output restricted deque'
      },
      {
        id: 21, type: 'mcq', points: 2,
        question: 'Which operation adds an element to a queue?',
        options: ['enqueue()', 'add()', 'insert()', 'All of the above'],
        correctAnswer: 'enqueue()'
      },
      {
        id: 22, type: 'fillblank', points: 2,
        question: 'The __________ queue is implemented in operating systems for process scheduling.',
        correctAnswer: 'ready'
      },
      {
        id: 23, type: 'mcq', points: 2,
        question: 'What is the maximum number of elements in a queue of capacity n?',
        options: ['n', 'n-1', 'n+1', '2n'],
        correctAnswer: 'n'
      },
      {
        id: 24, type: 'fillblank', points: 2,
        question: 'The __________ queue is used in simulation of resource allocation.',
        correctAnswer: 'priority'
      },
      {
        id: 25, type: 'mcq', points: 2,
        question: 'Which scheduling uses multiple queues based on priority?',
        options: ['Multilevel Queue Scheduling', 'Round Robin', 'SJF', 'FCFS'],
        correctAnswer: 'Multilevel Queue Scheduling'
      }
    ];
  }

  private getTreeQuestions(): Question[] {
  return [
    {
      id: 1, type: 'mcq', points: 2,
      question: 'Which traversal visits left subtree, root, then right subtree?',
      options: ['Preorder', 'Inorder', 'Postorder', 'Level-order'],
      correctAnswer: 'Inorder'
    },
    {
      id: 2, type: 'fillblank', points: 2,
      question: 'A __________ tree has at most two children per node.',
      correctAnswer: 'binary'
    },
    {
      id: 3, type: 'mcq', points: 2,
      question: 'Height of a tree with 1 node is?',
      options: ['0', '1', 'Depends', 'Undefined'],
      correctAnswer: '0'
    },
    {
      id: 4, type: 'fillblank', points: 2,
      question: 'A __________ tree is a binary tree where all leaves are at the same level.',
      correctAnswer: 'perfect'
    },
    {
      id: 5, type: 'mcq', points: 2,
      question: 'Which traversal uses a queue?',
      options: ['DFS', 'BFS', 'Inorder', 'Postorder'],
      correctAnswer: 'BFS'
    },
    {
      id: 6, type: 'fillblank', points: 2,
      question: 'The __________ traversal is also known as depth-first traversal.',
      correctAnswer: 'preorder'
    },
    {
      id: 7, type: 'mcq', points: 2,
      question: 'Which tree is used for database indexing?',
      options: ['Binary Tree', 'AVL Tree', 'B-tree', 'Red-Black Tree'],
      correctAnswer: 'B-tree'
    },
    {
      id: 8, type: 'fillblank', points: 2,
      question: 'A __________ tree is a self-balancing binary search tree.',
      correctAnswer: 'AVL'
    },
    {
      id: 9, type: 'mcq', points: 2,
      question: 'In a binary search tree (BST), the left child is?',
      options: ['Greater', 'Smaller', 'Equal', 'Random'],
      correctAnswer: 'Smaller'
    },
    {
      id: 10, type: 'fillblank', points: 2,
      question: 'The __________ traversal of a BST gives sorted order of elements.',
      correctAnswer: 'inorder'
    },
    {
      id: 11, type: 'mcq', points: 2,
      question: 'Which tree has maximum height?',
      options: ['Full Binary Tree', 'Skewed Tree', 'AVL Tree', 'Complete Binary Tree'],
      correctAnswer: 'Skewed Tree'
    },
    {
      id: 12, type: 'fillblank', points: 2,
      question: 'A __________ tree maintains black height property.',
      correctAnswer: 'Red-Black'
    },
    {
      id: 13, type: 'mcq', points: 2,
      question: 'Which traversal is used in expression trees to get postfix?',
      options: ['Preorder', 'Inorder', 'Postorder', 'Level-order'],
      correctAnswer: 'Postorder'
    },
    {
      id: 14, type: 'fillblank', points: 2,
      question: 'The __________ traversal is used to construct prefix expression.',
      correctAnswer: 'preorder'
    },
    {
      id: 15, type: 'mcq', points: 2,
      question: 'Minimum number of nodes in AVL tree of height h?',
      options: ['2^h', 'h', 'h+1', 'Fibonacci sequence'],
      correctAnswer: 'Fibonacci sequence'
    },
    {
      id: 16, type: 'fillblank', points: 2,
      question: 'A __________ tree is used in Huffman coding.',
      correctAnswer: 'binary'
    },
    {
      id: 17, type: 'mcq', points: 2,
      question: 'Which tree balancing uses rotations?',
      options: ['B-tree', 'Heap', 'AVL', 'Trie'],
      correctAnswer: 'AVL'
    },
    {
      id: 18, type: 'fillblank', points: 2,
      question: 'The __________ traversal is used in heapify operation.',
      correctAnswer: 'postorder'
    },
    {
      id: 19, type: 'mcq', points: 2,
      question: 'Which traversal prints root before its children?',
      options: ['Preorder', 'Inorder', 'Postorder', 'Level-order'],
      correctAnswer: 'Preorder'
    },
    {
      id: 20, type: 'fillblank', points: 2,
      question: 'A __________ tree has all levels completely filled except possibly the last.',
      correctAnswer: 'complete binary'
    },
    {
      id: 21, type: 'mcq', points: 2,
      question: 'Which is faster for searching sorted data?',
      options: ['BST', 'AVL Tree', 'Red-Black Tree', 'B-tree'],
      correctAnswer: 'AVL Tree'
    },
    {
      id: 22, type: 'fillblank', points: 2,
      question: 'The __________ property ensures logarithmic height in AVL.',
      correctAnswer: 'balance factor'
    },
    {
      id: 23, type: 'mcq', points: 2,
      question: 'Which data structure is used in Morris Traversal?',
      options: ['Stack', 'Queue', 'Threading', 'Deque'],
      correctAnswer: 'Threading'
    },
    {
      id: 24, type: 'fillblank', points: 2,
      question: 'The __________ traversal is commonly implemented recursively using stack.',
      correctAnswer: 'DFS'
    },
    {
      id: 25, type: 'mcq', points: 2,
      question: 'Which is true for Red-Black Trees?',
      options: ['Strictly balanced', 'Approximately balanced', 'Unbalanced', 'None'],
      correctAnswer: 'Approximately balanced'
    }
  ];
}
private getGraphQuestions(): Question[] {
  return [
    {
      id: 1, type: 'mcq', points: 2,
      question: 'Which graph traversal uses a queue?',
      options: ['DFS', 'BFS', 'Dijkstra', 'Prim'],
      correctAnswer: 'BFS'
    },
    {
      id: 2, type: 'fillblank', points: 2,
      question: 'A __________ graph has no cycles.',
      correctAnswer: 'acyclic'
    },
    {
      id: 3, type: 'mcq', points: 2,
      question: 'Which graph traversal uses a stack or recursion?',
      options: ['DFS', 'BFS', 'Kruskal', 'Dijkstra'],
      correctAnswer: 'DFS'
    },
    {
      id: 4, type: 'fillblank', points: 2,
      question: 'A __________ graph has edges with directions.',
      correctAnswer: 'directed'
    },
    {
      id: 5, type: 'mcq', points: 2,
      question: 'Which algorithm is used to find the shortest path in a weighted graph without negative weights?',
      options: ['Prim’s', 'Kruskal’s', 'Dijkstra’s', 'Floyd–Warshall'],
      correctAnswer: 'Dijkstra’s'
    },
    {
      id: 6, type: 'fillblank', points: 2,
      question: 'A graph with all possible edges is called a __________ graph.',
      correctAnswer: 'complete'
    },
    {
      id: 7, type: 'mcq', points: 2,
      question: 'Which algorithm is used for Minimum Spanning Tree (MST)?',
      options: ['Kruskal’s', 'Dijkstra’s', 'DFS', 'BFS'],
      correctAnswer: 'Kruskal’s'
    },
    {
      id: 8, type: 'fillblank', points: 2,
      question: 'In a weighted graph, edges have associated __________.',
      correctAnswer: 'weights'
    },
    {
      id: 9, type: 'mcq', points: 2,
      question: 'Which algorithm works for negative weight edges but not negative cycles?',
      options: ['Dijkstra’s', 'Bellman-Ford', 'Prim’s', 'Kruskal’s'],
      correctAnswer: 'Bellman-Ford'
    },
    {
      id: 10, type: 'fillblank', points: 2,
      question: 'A __________ graph is used to represent social networks.',
      correctAnswer: 'undirected'
    },
    {
      id: 11, type: 'mcq', points: 2,
      question: 'Which algorithm finds shortest paths between all pairs of vertices?',
      options: ['Dijkstra’s', 'Bellman-Ford', 'Floyd–Warshall', 'Prim’s'],
      correctAnswer: 'Floyd–Warshall'
    },
    {
      id: 12, type: 'fillblank', points: 2,
      question: 'In an adjacency matrix, a graph with V vertices uses __________ space.',
      correctAnswer: 'V^2'
    },
    {
      id: 13, type: 'mcq', points: 2,
      question: 'Which traversal is useful for detecting cycles in a graph?',
      options: ['BFS', 'DFS', 'Prim’s', 'Kruskal’s'],
      correctAnswer: 'DFS'
    },
    {
      id: 14, type: 'fillblank', points: 2,
      question: 'A graph is __________ if all vertices are connected by some path.',
      correctAnswer: 'connected'
    },
    {
      id: 15, type: 'mcq', points: 2,
      question: 'Which algorithm is a greedy algorithm for MST?',
      options: ['Prim’s', 'Kruskal’s', 'Both', 'None'],
      correctAnswer: 'Both'
    },
    {
      id: 16, type: 'fillblank', points: 2,
      question: 'In a __________ graph, edges connect a vertex to itself.',
      correctAnswer: 'self-loop'
    },
    {
      id: 17, type: 'mcq', points: 2,
      question: 'Topological sorting applies to which type of graph?',
      options: ['Directed Acyclic Graph', 'Undirected Graph', 'Weighted Graph', 'Bipartite Graph'],
      correctAnswer: 'Directed Acyclic Graph'
    },
    {
      id: 18, type: 'fillblank', points: 2,
      question: 'A __________ graph can be colored using only two colors.',
      correctAnswer: 'bipartite'
    },
    {
      id: 19, type: 'mcq', points: 2,
      question: 'Which is true about adjacency list representation?',
      options: ['Uses more space', 'Efficient for sparse graphs', 'Inefficient for sparse graphs', 'Same as matrix'],
      correctAnswer: 'Efficient for sparse graphs'
    },
    {
      id: 20, type: 'fillblank', points: 2,
      question: 'A graph traversal that explores neighbors level by level is __________.',
      correctAnswer: 'BFS'
    },
    {
      id: 21, type: 'mcq', points: 2,
      question: 'Which algorithm detects strongly connected components in a graph?',
      options: ['Kruskal’s', 'Kosaraju’s', 'Dijkstra’s', 'Prim’s'],
      correctAnswer: 'Kosaraju’s'
    },
    {
      id: 22, type: 'fillblank', points: 2,
      question: 'In BFS, vertices are stored in a __________.',
      correctAnswer: 'queue'
    },
    {
      id: 23, type: 'mcq', points: 2,
      question: 'Which algorithm finds articulation points and bridges?',
      options: ['DFS-based algorithm', 'Dijkstra’s', 'Prim’s', 'Bellman-Ford'],
      correctAnswer: 'DFS-based algorithm'
    },
    {
      id: 24, type: 'fillblank', points: 2,
      question: 'In DFS, vertices are stored in a __________.',
      correctAnswer: 'stack'
    },
    {
      id: 25, type: 'mcq', points: 2,
      question: 'Which of these is NOT a graph representation?',
      options: ['Adjacency Matrix', 'Adjacency List', 'Incidence Matrix', 'Heap Tree'],
      correctAnswer: 'Heap Tree'
    }
  ];
}

 private getHeapQuestions(): Question[] {
  return [
    {
      id: 1, type: 'mcq', points: 2,
      question: 'Which data structure is used to implement a heap?',
      options: ['Stack', 'Array', 'Linked List', 'Graph'],
      correctAnswer: 'Array'
    },
    {
      id: 2, type: 'fillblank', points: 2,
      question: 'A __________ heap is a complete binary tree where each parent is smaller than its children.',
      correctAnswer: 'Min'
    },
    {
      id: 3, type: 'mcq', points: 2,
      question: 'What is the time complexity of inserting an element into a heap?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
      correctAnswer: 'O(log n)'
    },
    {
      id: 4, type: 'fillblank', points: 2,
      question: 'A __________ heap is a complete binary tree where each parent is greater than its children.',
      correctAnswer: 'Max'
    },
    {
      id: 5, type: 'mcq', points: 2,
      question: 'Which algorithm uses heaps for efficient implementation?',
      options: ['Merge Sort', 'Quick Sort', 'Heap Sort', 'Radix Sort'],
      correctAnswer: 'Heap Sort'
    },
    {
      id: 6, type: 'fillblank', points: 2,
      question: 'The __________ operation removes the root element of a heap.',
      correctAnswer: 'extract'
    },
    {
      id: 7, type: 'mcq', points: 2,
      question: 'What is the time complexity of building a heap from n elements?',
      options: ['O(n log n)', 'O(n)', 'O(log n)', 'O(n²)'],
      correctAnswer: 'O(n)'
    },
    {
      id: 8, type: 'fillblank', points: 2,
      question: 'The __________ function restores the heap property after insertion or deletion.',
      correctAnswer: 'heapify'
    },
    {
      id: 9, type: 'mcq', points: 2,
      question: 'Which type of heap is used in Dijkstra’s algorithm?',
      options: ['Binary Heap', 'Fibonacci Heap', 'Binomial Heap', 'Max Heap'],
      correctAnswer: 'Fibonacci Heap'
    },
    {
      id: 10, type: 'fillblank', points: 2,
      question: 'A heap is always a __________ binary tree.',
      correctAnswer: 'complete'
    },
    {
      id: 11, type: 'mcq', points: 2,
      question: 'Which operation has O(log n) time complexity in a heap?',
      options: ['Insert', 'Delete', 'Extract-Max/Min', 'All of the above'],
      correctAnswer: 'All of the above'
    },
    {
      id: 12, type: 'fillblank', points: 2,
      question: 'The __________ of a node in an array representation of a heap is at index 2*i + 1.',
      correctAnswer: 'left child'
    },
    {
      id: 13, type: 'mcq', points: 2,
      question: 'Which heap supports the fastest decrease-key operation?',
      options: ['Binary Heap', 'Binomial Heap', 'Fibonacci Heap', 'Ternary Heap'],
      correctAnswer: 'Fibonacci Heap'
    },
    {
      id: 14, type: 'fillblank', points: 2,
      question: 'The __________ child of a node in an array representation of a heap is at index 2*i + 2.',
      correctAnswer: 'right'
    },
    {
      id: 15, type: 'mcq', points: 2,
      question: 'What is the time complexity of finding the maximum element in a max heap?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      correctAnswer: 'O(1)'
    },
    {
      id: 16, type: 'fillblank', points: 2,
      question: 'In a heap, the __________ node is always the maximum or minimum depending on type.',
      correctAnswer: 'root'
    },
    {
      id: 17, type: 'mcq', points: 2,
      question: 'Which priority queue implementation is the most efficient for large datasets?',
      options: ['Stack', 'Array', 'Heap', 'Linked List'],
      correctAnswer: 'Heap'
    },
    {
      id: 18, type: 'fillblank', points: 2,
      question: 'Heap sort has a time complexity of __________ in the worst case.',
      correctAnswer: 'O(n log n)'
    },
    {
      id: 19, type: 'mcq', points: 2,
      question: 'Which property differentiates a heap from a binary search tree (BST)?',
      options: ['Completeness', 'Heap property', 'Ordering of elements', 'Both A and B'],
      correctAnswer: 'Both A and B'
    },
    {
      id: 20, type: 'fillblank', points: 2,
      question: 'The __________ heap allows efficient merge operations compared to binary heap.',
      correctAnswer: 'Fibonacci'
    },
    {
      id: 21, type: 'mcq', points: 2,
      question: 'What is the height of a heap with n elements?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
      correctAnswer: 'O(log n)'
    },
    {
      id: 22, type: 'fillblank', points: 2,
      question: 'In a heap, the __________ parent of a node at index i is located at index (i-1)/2.',
      correctAnswer: 'parent'
    },
    {
      id: 23, type: 'mcq', points: 2,
      question: 'Which is true about heaps?',
      options: ['They are always sorted', 'They are always complete', 'They are always balanced', 'They are both complete and balanced'],
      correctAnswer: 'They are always complete'
    },
    {
      id: 24, type: 'fillblank', points: 2,
      question: 'The __________ operation is used to insert an element into the heap while maintaining heap property.',
      correctAnswer: 'sift-up'
    },
    {
      id: 25, type: 'mcq', points: 2,
      question: 'Which application commonly uses heaps?',
      options: ['Graph algorithms', 'Priority queues', 'Scheduling', 'All of the above'],
      correctAnswer: 'All of the above'
    }
  ];
}

  private getSortingQuestions(): Question[] {
  return [
    {
      id: 1, type: 'mcq', points: 2,
      question: 'Which sorting algorithm has the best average-case time complexity?',
      options: ['Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Selection Sort'],
      correctAnswer: 'Merge Sort'
    },
    {
      id: 2, type: 'fillblank', points: 2,
      question: 'The __________ sort algorithm works by repeatedly swapping adjacent elements if they are in the wrong order.',
      correctAnswer: 'Bubble'
    },
    {
      id: 3, type: 'mcq', points: 2,
      question: 'Which sorting algorithm is not comparison-based?',
      options: ['Merge Sort', 'Heap Sort', 'Counting Sort', 'Quick Sort'],
      correctAnswer: 'Counting Sort'
    },
    {
      id: 4, type: 'fillblank', points: 2,
      question: 'In __________ sort, the array is divided into two halves and sorted recursively.',
      correctAnswer: 'Merge'
    },
    {
      id: 5, type: 'mcq', points: 2,
      question: 'Which sorting algorithm works by selecting the minimum element and placing it in the correct position?',
      options: ['Bubble Sort', 'Selection Sort', 'Quick Sort', 'Insertion Sort'],
      correctAnswer: 'Selection Sort'
    },
    {
      id: 6, type: 'fillblank', points: 2,
      question: 'The __________ sort algorithm is efficient for small or partially sorted datasets.',
      correctAnswer: 'Insertion'
    },
    {
      id: 7, type: 'mcq', points: 2,
      question: 'Which algorithm is based on the divide and conquer paradigm?',
      options: ['Bubble Sort', 'Quick Sort', 'Insertion Sort', 'Selection Sort'],
      correctAnswer: 'Quick Sort'
    },
    {
      id: 8, type: 'fillblank', points: 2,
      question: 'The pivot element is chosen in __________ sort.',
      correctAnswer: 'Quick'
    },
    {
      id: 9, type: 'mcq', points: 2,
      question: 'Which sorting algorithm is considered stable?',
      options: ['Quick Sort', 'Merge Sort', 'Heap Sort', 'Selection Sort'],
      correctAnswer: 'Merge Sort'
    },
    {
      id: 10, type: 'fillblank', points: 2,
      question: 'The __________ sort algorithm uses a binary heap data structure.',
      correctAnswer: 'Heap'
    },
    {
      id: 11, type: 'mcq', points: 2,
      question: 'Which sorting algorithm has O(n log n) worst-case time complexity?',
      options: ['Merge Sort', 'Heap Sort', 'Quick Sort', 'Both A and B'],
      correctAnswer: 'Both A and B'
    },
    {
      id: 12, type: 'fillblank', points: 2,
      question: 'The __________ sort algorithm can be used when elements are within a known range.',
      correctAnswer: 'Counting'
    },
    {
      id: 13, type: 'mcq', points: 2,
      question: 'Which sorting algorithm is efficient for linked lists?',
      options: ['Merge Sort', 'Quick Sort', 'Heap Sort', 'Bubble Sort'],
      correctAnswer: 'Merge Sort'
    },
    {
      id: 14, type: 'fillblank', points: 2,
      question: 'The __________ sort algorithm distributes elements into buckets and sorts them individually.',
      correctAnswer: 'Bucket'
    },
    {
      id: 15, type: 'mcq', points: 2,
      question: 'Which sorting algorithm is best suited for sorting strings with fixed length?',
      options: ['Quick Sort', 'Radix Sort', 'Heap Sort', 'Selection Sort'],
      correctAnswer: 'Radix Sort'
    },
    {
      id: 16, type: 'fillblank', points: 2,
      question: 'The __________ sort algorithm repeatedly extracts the maximum element and rebuilds the heap.',
      correctAnswer: 'Heap'
    },
    {
      id: 17, type: 'mcq', points: 2,
      question: 'Which sorting algorithm is adaptive and stable?',
      options: ['Insertion Sort', 'Selection Sort', 'Heap Sort', 'Quick Sort'],
      correctAnswer: 'Insertion Sort'
    },
    {
      id: 18, type: 'fillblank', points: 2,
      question: 'The average-case time complexity of Quick Sort is __________.',
      correctAnswer: 'O(n log n)'
    },
    {
      id: 19, type: 'mcq', points: 2,
      question: 'Which sorting algorithm works in-place and is not stable?',
      options: ['Quick Sort', 'Merge Sort', 'Counting Sort', 'Bucket Sort'],
      correctAnswer: 'Quick Sort'
    },
    {
      id: 20, type: 'fillblank', points: 2,
      question: 'The __________ sort algorithm has the worst-case complexity of O(n²) but performs well on nearly sorted data.',
      correctAnswer: 'Insertion'
    },
    {
      id: 21, type: 'mcq', points: 2,
      question: 'Which algorithm divides the array into sorted and unsorted parts?',
      options: ['Selection Sort', 'Merge Sort', 'Insertion Sort', 'Heap Sort'],
      correctAnswer: 'Insertion Sort'
    },
    {
      id: 22, type: 'fillblank', points: 2,
      question: 'The __________ sort algorithm is often taught as the simplest sorting technique.',
      correctAnswer: 'Bubble'
    },
    {
      id: 23, type: 'mcq', points: 2,
      question: 'Which sorting algorithm is inefficient for large datasets due to O(n²) complexity?',
      options: ['Merge Sort', 'Quick Sort', 'Bubble Sort', 'Heap Sort'],
      correctAnswer: 'Bubble Sort'
    },
    {
      id: 24, type: 'fillblank', points: 2,
      question: 'The __________ sort algorithm repeatedly selects the smallest element and swaps it into place.',
      correctAnswer: 'Selection'
    },
    {
      id: 25, type: 'mcq', points: 2,
      question: 'Which algorithm is considered the fastest in practice for large random datasets?',
      options: ['Quick Sort', 'Heap Sort', 'Merge Sort', 'Insertion Sort'],
      correctAnswer: 'Quick Sort'
    }
  ];
}

 private getSearchingQuestions(): Question[] {
  return [
    {
      id: 1, type: 'mcq', points: 2,
      question: 'What is the time complexity of linear search in the worst case?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correctAnswer: 'O(n)'
    },
    {
      id: 2, type: 'fillblank', points: 2,
      question: 'Binary search requires the array to be __________.',
      correctAnswer: 'sorted'
    },
    {
      id: 3, type: 'mcq', points: 2,
      question: 'What is the best-case time complexity of binary search?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      correctAnswer: 'O(1)'
    },
    {
      id: 4, type: 'fillblank', points: 2,
      question: 'In linear search, the target element is compared __________.',
      correctAnswer: 'sequentially'
    },
    {
      id: 5, type: 'mcq', points: 2,
      question: 'Which searching algorithm divides the array into halves each step?',
      options: ['Linear Search', 'Binary Search', 'Jump Search', 'Interpolation Search'],
      correctAnswer: 'Binary Search'
    },
    {
      id: 6, type: 'fillblank', points: 2,
      question: '__________ search works well when elements are uniformly distributed.',
      correctAnswer: 'Interpolation'
    },
    {
      id: 7, type: 'mcq', points: 2,
      question: 'What is the time complexity of jump search?',
      options: ['O(√n)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correctAnswer: 'O(√n)'
    },
    {
      id: 8, type: 'fillblank', points: 2,
      question: '__________ search is an improvement over linear search using fixed block jumps.',
      correctAnswer: 'Jump'
    },
    {
      id: 9, type: 'mcq', points: 2,
      question: 'Exponential search is useful for __________ arrays.',
      options: ['Sorted', 'Unsorted', 'Small', 'Sparse'],
      correctAnswer: 'Sorted'
    },
    {
      id: 10, type: 'fillblank', points: 2,
      question: 'Binary search has a worst-case time complexity of __________.',
      correctAnswer: 'O(log n)'
    },
    {
      id: 11, type: 'mcq', points: 2,
      question: 'Which search algorithm is best for linked lists?',
      options: ['Binary Search', 'Linear Search', 'Jump Search', 'Exponential Search'],
      correctAnswer: 'Linear Search'
    },
    {
      id: 12, type: 'fillblank', points: 2,
      question: '__________ search combines exponential range finding and binary search.',
      correctAnswer: 'Exponential'
    },
    {
      id: 13, type: 'mcq', points: 2,
      question: 'Which search algorithm is the most efficient for balanced binary search trees?',
      options: ['Linear Search', 'Binary Search', 'Hashing', 'DFS'],
      correctAnswer: 'Binary Search'
    },
    {
      id: 14, type: 'fillblank', points: 2,
      question: 'In hashing-based search, the average time complexity is __________.',
      correctAnswer: 'O(1)'
    },
    {
      id: 15, type: 'mcq', points: 2,
      question: 'Which algorithm works better than binary search when distribution is uniform?',
      options: ['Jump Search', 'Interpolation Search', 'Exponential Search', 'Linear Search'],
      correctAnswer: 'Interpolation Search'
    },
    {
      id: 16, type: 'fillblank', points: 2,
      question: 'Linear search has a best-case time complexity of __________.',
      correctAnswer: 'O(1)'
    },
    {
      id: 17, type: 'mcq', points: 2,
      question: 'Which search technique is optimal when data is stored in a hash table?',
      options: ['Binary Search', 'Linear Search', 'Hash Search', 'Jump Search'],
      correctAnswer: 'Hash Search'
    },
    {
      id: 18, type: 'fillblank', points: 2,
      question: '__________ search is preferred for infinite or unbounded arrays.',
      correctAnswer: 'Exponential'
    },
    {
      id: 19, type: 'mcq', points: 2,
      question: 'What is the auxiliary space used by binary search?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
      correctAnswer: 'O(1)'
    },
    {
      id: 20, type: 'fillblank', points: 2,
      question: 'In binary search, the middle element index is calculated as __________.',
      correctAnswer: '(low + high) / 2'
    },
    {
      id: 21, type: 'mcq', points: 2,
      question: 'Which search method is used in skip lists?',
      options: ['Linear Search', 'Jump Search', 'Binary Search', 'Hash Search'],
      correctAnswer: 'Jump Search'
    },
    {
      id: 22, type: 'fillblank', points: 2,
      question: '__________ search is inefficient for unsorted data structures like linked lists.',
      correctAnswer: 'Binary'
    },
    {
      id: 23, type: 'mcq', points: 2,
      question: 'Which algorithm has O(log log n) complexity on average in certain cases?',
      options: ['Jump Search', 'Interpolation Search', 'Binary Search', 'Exponential Search'],
      correctAnswer: 'Interpolation Search'
    },
    {
      id: 24, type: 'fillblank', points: 2,
      question: 'Searching an element in a balanced BST takes __________ time complexity.',
      correctAnswer: 'O(log n)'
    },
    {
      id: 25, type: 'mcq', points: 2,
      question: 'Which search algorithm can adaptively reduce the range using exponential steps?',
      options: ['Linear Search', 'Jump Search', 'Exponential Search', 'Hash Search'],
      correctAnswer: 'Exponential Search'
    }
  ];
}

 private getDynamicProgrammingQuestions(): Question[] {
  return [
    { id: 1, type: 'mcq', points: 2, question: 'Dynamic programming is mainly used to optimize problems with __________.', options: ['Greedy choice property', 'Overlapping subproblems', 'Divide and conquer', 'Backtracking'], correctAnswer: 'Overlapping subproblems' },
    { id: 2, type: 'fillblank', points: 2, question: 'In dynamic programming, we store intermediate results in a __________.', correctAnswer: 'table' },
    { id: 3, type: 'mcq', points: 2, question: 'Which technique avoids recomputation of subproblems?', options: ['Memoization', 'Recursion', 'Iteration', 'Sorting'], correctAnswer: 'Memoization' },
    { id: 4, type: 'fillblank', points: 2, question: '__________ is the bottom-up approach of dynamic programming.', correctAnswer: 'Tabulation' },
    { id: 5, type: 'mcq', points: 2, question: 'The time complexity of a DP solution is usually proportional to __________.', options: ['Number of subproblems', 'Number of loops', 'Input size', 'Recursion depth'], correctAnswer: 'Number of subproblems' },
    { id: 6, type: 'fillblank', points: 2, question: 'The Fibonacci sequence can be efficiently solved using __________ programming.', correctAnswer: 'dynamic' },
    { id: 7, type: 'mcq', points: 2, question: 'Which of the following problems is NOT typically solved by dynamic programming?', options: ['Knapsack Problem', 'Longest Common Subsequence', 'Binary Search', 'Matrix Chain Multiplication'], correctAnswer: 'Binary Search' },
    { id: 8, type: 'fillblank', points: 2, question: 'In DP, the solution of a problem is built using solutions of __________ problems.', correctAnswer: 'smaller' },
    { id: 9, type: 'mcq', points: 2, question: 'Top-down dynamic programming approach is also known as __________.', options: ['Recursion', 'Memoization', 'Tabulation', 'Greedy'], correctAnswer: 'Memoization' },
    { id: 10, type: 'fillblank', points: 2, question: 'The subset sum problem can be solved using __________ programming.', correctAnswer: 'dynamic' },
    { id: 11, type: 'mcq', points: 2, question: 'Which DP problem is used to find the minimum number of coins for a given amount?', options: ['Coin Change Problem', 'Knapsack Problem', 'Rod Cutting', 'Matrix Chain Multiplication'], correctAnswer: 'Coin Change Problem' },
    { id: 12, type: 'fillblank', points: 2, question: 'In the knapsack problem, the table is usually of size __________ x __________.', correctAnswer: 'number of items, capacity' },
    { id: 13, type: 'mcq', points: 2, question: 'Longest Increasing Subsequence (LIS) can be solved using DP with a time complexity of __________.', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], correctAnswer: 'O(n²)' },
    { id: 14, type: 'fillblank', points: 2, question: 'Dynamic programming is applicable if a problem exhibits optimal __________ property.', correctAnswer: 'substructure' },
    { id: 15, type: 'mcq', points: 2, question: 'Which of these is a space-optimized DP technique?', options: ['Using rolling arrays', 'Using recursion', 'Using extra recursion stack', 'Greedy approach'], correctAnswer: 'Using rolling arrays' },
    { id: 16, type: 'fillblank', points: 2, question: 'Rod cutting problem can be solved using __________ programming approach.', correctAnswer: 'dynamic' },
    { id: 17, type: 'mcq', points: 2, question: 'The edit distance problem computes the minimum number of __________ required to convert one string to another.', options: ['operations', 'comparisons', 'substrings', 'loops'], correctAnswer: 'operations' },
    { id: 18, type: 'fillblank', points: 2, question: 'Matrix Chain Multiplication problem is an example of __________ programming.', correctAnswer: 'dynamic' },
    { id: 19, type: 'mcq', points: 2, question: 'Dynamic programming is most efficient when overlapping subproblems are __________.', options: ['frequent', 'rare', 'irrelevant', 'sequential'], correctAnswer: 'frequent' },
    { id: 20, type: 'fillblank', points: 2, question: 'Catalan numbers can be calculated using __________ programming.', correctAnswer: 'dynamic' },
    { id: 21, type: 'mcq', points: 2, question: 'Which DP problem involves choosing intervals optimally?', options: ['Activity Selection', 'Longest Common Subsequence', '0-1 Knapsack', 'Fibonacci'], correctAnswer: 'Activity Selection' },
    { id: 22, type: 'fillblank', points: 2, question: 'Dynamic programming reduces the __________ of recursive solutions.', correctAnswer: 'time complexity' },
    { id: 23, type: 'mcq', points: 2, question: 'The DP solution of 0-1 Knapsack uses a table of size __________.', options: ['n x W', 'W x n', 'n x n', 'W x W'], correctAnswer: 'n x W' },
    { id: 24, type: 'fillblank', points: 2, question: 'Minimum path sum in a grid can be computed using __________ programming.', correctAnswer: 'dynamic' },
    { id: 25, type: 'mcq', points: 2, question: 'Which approach is preferred for large input sizes in DP?', options: ['Bottom-up (Tabulation)', 'Top-down (Memoization)', 'Naive Recursion', 'Brute Force'], correctAnswer: 'Bottom-up (Tabulation)' }
  ];
}

private getGreedyQuestions(): Question[] {
  return [
    { id: 1, type: 'mcq', points: 2, question: 'Greedy algorithms build a solution __________.', options: ['step by step', 'all at once', 'recursively', 'randomly'], correctAnswer: 'step by step' },
    { id: 2, type: 'fillblank', points: 2, question: 'Greedy algorithms are useful when the problem exhibits __________ property.', correctAnswer: 'greedy choice' },
    { id: 3, type: 'mcq', points: 2, question: 'Which of the following is a classic greedy problem?', options: ['Fractional Knapsack', '0-1 Knapsack', 'Matrix Chain Multiplication', 'Longest Common Subsequence'], correctAnswer: 'Fractional Knapsack' },
    { id: 4, type: 'fillblank', points: 2, question: 'In greedy algorithms, the local optimum leads to the __________ solution.', correctAnswer: 'global optimum' },
    { id: 5, type: 'mcq', points: 2, question: 'Which sorting technique is often used as a preprocessing step in greedy algorithms?', options: ['Quick Sort', 'Merge Sort', 'Heap Sort', 'All of the above'], correctAnswer: 'All of the above' },
    { id: 6, type: 'fillblank', points: 2, question: 'Activity selection problem can be solved efficiently using __________ algorithm.', correctAnswer: 'greedy' },
    { id: 7, type: 'mcq', points: 2, question: 'Which algorithm selects the largest value per unit weight in knapsack problems?', options: ['0-1 Knapsack', 'Fractional Knapsack', 'Dynamic Programming', 'Backtracking'], correctAnswer: 'Fractional Knapsack' },
    { id: 8, type: 'fillblank', points: 2, question: 'Huffman coding uses a __________ approach to minimize total cost.', correctAnswer: 'greedy' },
    { id: 9, type: 'mcq', points: 2, question: 'Which of these problems cannot always be solved optimally using greedy?', options: ['Fractional Knapsack', '0-1 Knapsack', 'Huffman Coding', 'Activity Selection'], correctAnswer: '0-1 Knapsack' },
    { id: 10, type: 'fillblank', points: 2, question: 'In minimum spanning tree algorithms, greedy choice is based on __________ edges.', correctAnswer: 'minimum weight' },
    { id: 11, type: 'mcq', points: 2, question: 'Kruskal’s algorithm is a greedy algorithm used for __________.', options: ['Shortest Path', 'Minimum Spanning Tree', 'Topological Sort', 'Max Flow'], correctAnswer: 'Minimum Spanning Tree' },
    { id: 12, type: 'fillblank', points: 2, question: 'Prim’s algorithm selects the next vertex based on the __________ edge connecting to the tree.', correctAnswer: 'minimum weight' },
    { id: 13, type: 'mcq', points: 2, question: 'Which of these problems uses greedy by selecting earliest finish time?', options: ['Activity Selection', 'Coin Change', 'Huffman Coding', 'Matrix Chain Multiplication'], correctAnswer: 'Activity Selection' },
    { id: 14, type: 'fillblank', points: 2, question: 'Greedy algorithms do not always guarantee an __________ solution.', correctAnswer: 'optimal' },
    { id: 15, type: 'mcq', points: 2, question: 'Dijkstra’s algorithm is a greedy algorithm used for __________.', options: ['Minimum Spanning Tree', 'Single Source Shortest Path', 'All Pairs Shortest Path', 'Topological Sort'], correctAnswer: 'Single Source Shortest Path' },
    { id: 16, type: 'fillblank', points: 2, question: 'Coin change problem has a greedy solution only if the coin denominations are __________.', correctAnswer: 'canonical' },
    { id: 17, type: 'mcq', points: 2, question: 'Which of these properties is required for a greedy solution to be optimal?', options: ['Optimal substructure', 'Overlapping subproblems', 'Divide and Conquer', 'Backtracking'], correctAnswer: 'Optimal substructure' },
    { id: 18, type: 'fillblank', points: 2, question: 'Greedy algorithms make decisions based on __________.', correctAnswer: 'current best choice' },
    { id: 19, type: 'mcq', points: 2, question: 'Job sequencing with deadlines can be solved using __________ algorithm.', options: ['Dynamic Programming', 'Greedy', 'Backtracking', 'DFS'], correctAnswer: 'Greedy' },
    { id: 20, type: 'fillblank', points: 2, question: 'Huffman coding uses a priority queue to select __________ frequency nodes.', correctAnswer: 'minimum' },
    { id: 21, type: 'mcq', points: 2, question: 'In greedy algorithms, a problem with optimal substructure can be solved by __________.', options: ['making locally optimal choices', 'trying all combinations', 'recursion', 'sorting only'], correctAnswer: 'making locally optimal choices' },
    { id: 22, type: 'fillblank', points: 2, question: 'Prim’s and Kruskal’s algorithms are examples of __________ algorithms.', correctAnswer: 'greedy' },
    { id: 23, type: 'mcq', points: 2, question: 'Which of the following is used in greedy for interval scheduling?', options: ['Earliest start time', 'Earliest finish time', 'Longest duration', 'Random selection'], correctAnswer: 'Earliest finish time' },
    { id: 24, type: 'fillblank', points: 2, question: 'Greedy approach is faster than dynamic programming but may not always produce __________ solutions.', correctAnswer: 'optimal' },
    { id: 25, type: 'mcq', points: 2, question: 'Which data structure is commonly used in greedy Huffman coding?', options: ['Stack', 'Queue', 'Priority Queue', 'Linked List'], correctAnswer: 'Priority Queue' }
  ];
}

private getBacktrackingQuestions(): Question[] {
  return [
    { id: 1, type: 'mcq', points: 2, question: 'Backtracking is mainly used to solve __________ problems.', options: ['Optimization', 'Constraint Satisfaction', 'Sorting', 'Searching'], correctAnswer: 'Constraint Satisfaction' },
    { id: 2, type: 'fillblank', points: 2, question: 'In backtracking, we __________ choices when they lead to an invalid solution.', correctAnswer: 'undo' },
    { id: 3, type: 'mcq', points: 2, question: 'Which problem is a classic example of backtracking?', options: ['N-Queens', 'Fibonacci', 'Binary Search', 'Dijkstra'], correctAnswer: 'N-Queens' },
    { id: 4, type: 'fillblank', points: 2, question: 'Backtracking is a refinement of the __________ algorithm.', correctAnswer: 'brute force' },
    { id: 5, type: 'mcq', points: 2, question: 'Which of the following problems can be solved using backtracking?', options: ['Maze solving', 'Knapsack', 'Matrix Chain Multiplication', 'Greedy Coin Change'], correctAnswer: 'Maze solving' },
    { id: 6, type: 'fillblank', points: 2, question: 'In backtracking, the process of abandoning a partial solution is called __________.', correctAnswer: 'pruning' },
    { id: 7, type: 'mcq', points: 2, question: 'Sudoku solver is an example of __________ technique.', options: ['Backtracking', 'Dynamic Programming', 'Greedy', 'Divide and Conquer'], correctAnswer: 'Backtracking' },
    { id: 8, type: 'fillblank', points: 2, question: 'The recursion tree in backtracking explores __________ solutions.', correctAnswer: 'all possible' },
    { id: 9, type: 'mcq', points: 2, question: 'Which search strategy is used in backtracking?', options: ['Depth-first search', 'Breadth-first search', 'Best-first search', 'Binary search'], correctAnswer: 'Depth-first search' },
    { id: 10, type: 'fillblank', points: 2, question: 'In the N-Queens problem, backtracking ensures that no two queens are in the same __________.', correctAnswer: 'row, column, or diagonal' },
    { id: 11, type: 'mcq', points: 2, question: 'Subset generation problems are solved using which technique?', options: ['Backtracking', 'Greedy', 'Dynamic Programming', 'Sorting'], correctAnswer: 'Backtracking' },
    { id: 12, type: 'fillblank', points: 2, question: 'In backtracking, each recursive call represents a __________ in the solution space.', correctAnswer: 'decision' },
    { id: 13, type: 'mcq', points: 2, question: 'Which problem involves placing numbers in a grid while satisfying constraints?', options: ['Sudoku', 'Fibonacci', 'Fractional Knapsack', 'Activity Selection'], correctAnswer: 'Sudoku' },
    { id: 14, type: 'fillblank', points: 2, question: 'Backtracking systematically searches through all possible __________.', correctAnswer: 'configurations' },
    { id: 15, type: 'mcq', points: 2, question: 'The major advantage of backtracking is __________.', options: ['Efficient pruning of invalid solutions', 'Lowest time complexity', 'Always iterative', 'No recursion'], correctAnswer: 'Efficient pruning of invalid solutions' },
    { id: 16, type: 'fillblank', points: 2, question: 'The Hamiltonian cycle problem is commonly solved using __________.', correctAnswer: 'backtracking' },
    { id: 17, type: 'mcq', points: 2, question: 'Which of these is NOT a backtracking problem?', options: ['N-Queens', 'Graph Coloring', 'Merge Sort', 'Sudoku Solver'], correctAnswer: 'Merge Sort' },
    { id: 18, type: 'fillblank', points: 2, question: 'Backtracking explores the solution space in a __________ manner.', correctAnswer: 'depth-first' },
    { id: 19, type: 'mcq', points: 2, question: 'Which technique combines recursion and constraint checking?', options: ['Backtracking', 'Greedy', 'Dynamic Programming', 'Divide and Conquer'], correctAnswer: 'Backtracking' },
    { id: 20, type: 'fillblank', points: 2, question: 'Crossword puzzle solving can be implemented using __________ algorithm.', correctAnswer: 'backtracking' },
    { id: 21, type: 'mcq', points: 2, question: 'Which problem involves coloring a graph with minimum colors so that adjacent nodes are different?', options: ['Graph Coloring', 'Fibonacci', 'Activity Selection', 'Rod Cutting'], correctAnswer: 'Graph Coloring' },
    { id: 22, type: 'fillblank', points: 2, question: 'Backtracking is effective when the solution space is __________.', correctAnswer: 'large but can be pruned' },
    { id: 23, type: 'mcq', points: 2, question: 'Which of the following is used to revert a partial solution in backtracking?', options: ['Undo step', 'Greedy choice', 'Memoization', 'Sorting'], correctAnswer: 'Undo step' },
    { id: 24, type: 'fillblank', points: 2, question: 'In backtracking, the process of exploring different possibilities is called __________.', correctAnswer: 'search' },
    { id: 25, type: 'mcq', points: 2, question: 'Which of these problems is solved using backtracking by trying all permutations?', options: ['Traveling Salesman Problem', 'Fractional Knapsack', 'Matrix Chain Multiplication', 'Longest Common Subsequence'], correctAnswer: 'Traveling Salesman Problem' }
  ];
}

  private getDefaultQuestions(): Question[] {
    return this.generateDefaultQuestions('Data Structures');
  }

  private generateDefaultQuestions(topicName: string): Question[] {
    const questions: Question[] = [];
    
    // Add 25 questions
    for (let i = 1; i <= 25; i++) {
      if (i % 2 === 0) {
        questions.push({
          id: i, type: 'mcq', points: 2,
          question: `Which algorithm is best for ${topicName} problem ${i}?`,
          options: ['Algorithm A', 'Algorithm B', 'Algorithm C', 'Algorithm D'],
          correctAnswer: 'Algorithm B'
        });
      } else {
        questions.push({
          id: i, type: 'fillblank', points: 2,
          question: `The key operation in ${topicName} for problem ${i} is __________.`,
          correctAnswer: 'optimization'
        });
      }
    }
    
    return questions;
  }
}