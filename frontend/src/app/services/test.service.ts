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
        question: 'For “Buy and Sell Stock once”, which approach is optimal?',
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
        options: ['Kadane’s Algorithm', 'Sliding Window', 'Hash Map', 'Stack'],
        correctAnswer: 'Kadane’s Algorithm'
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
        question: 'For “Stock buy and sell multiple transactions”, which approach?',
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

  // Add similar complete implementations for other topics...
  private getHashMapQuestions(): Question[] { 
    return this.getHashSetQuestions(); // Using same questions for demo
  }
  private getStringQuestions(): Question[] { 
    return this.getHashSetQuestions(); // Using same questions for demo
  }
  private getLinkedListQuestions(): Question[] { 
    return this.getHashSetQuestions(); // Using same questions for demo
  }
  private getStackQuestions(): Question[] { 
    return this.getHashSetQuestions(); // Using same questions for demo
  }
  private getQueueQuestions(): Question[] { 
    return this.getHashSetQuestions(); // Using same questions for demo
  }
  private getTreeQuestions(): Question[] { 
    return this.getHashSetQuestions(); // Using same questions for demo
  }
  private getGraphQuestions(): Question[] { 
    return this.getHashSetQuestions(); // Using same questions for demo
  }
  private getHeapQuestions(): Question[] { 
    return this.getHashSetQuestions(); // Using same questions for demo
  }
  private getSortingQuestions(): Question[] { 
    return this.getHashSetQuestions(); // Using same questions for demo
  }
  private getSearchingQuestions(): Question[] { 
    return this.getHashSetQuestions(); // Using same questions for demo
  }
  private getDynamicProgrammingQuestions(): Question[] { 
    return this.getHashSetQuestions(); // Using same questions for demo
  }
  private getGreedyQuestions(): Question[] { 
    return this.getHashSetQuestions(); // Using same questions for demo
  }
  private getBacktrackingQuestions(): Question[] { 
    return this.getHashSetQuestions(); // Using same questions for demo
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

  private getDefaultQuestions(): Question[] {
    return this.generateDefaultQuestions('Data Structures');
  }
}