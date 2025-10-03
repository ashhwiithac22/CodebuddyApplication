//frontend/src/app/services/topic.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Topic {
  id: string;
  name: string;
  category: string;
  description: string;
  hints: Hint[];
  commonProblems: string[];
  bestScore?: number;
  totalAttempts?: number;
  hasTest?: boolean;
}

export interface Hint {
  title: string;
  description: string;
  codeSnippet: string;
  language: string;
}

export interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  defaultCode: { [key: string]: string };
  testCases: TestCase[];
}

export interface TestCase {
  input: string;
  output: string;
}

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getTopics(): Observable<Topic[]> {
    return of(this.getComprehensiveTopics()).pipe(delay(100));
  }

  getTopicById(id: string): Observable<Topic | undefined> {
    const topic = this.getComprehensiveTopics().find(t => t.id === id);
    return of(topic);
  }

  getTopicsWithFallback(): Observable<Topic[]> {
    return of(this.getComprehensiveTopics()).pipe(delay(100));
  }
  
  private getComprehensiveTopics(): Topic[] {
    return [
      {
        id: '1',
        name: 'Arrays & Lists',
        category: 'DSA',
        description: 'Master array manipulation and list operations',
        hints: this.getArrayHints(),
        commonProblems: [
          'Two Sum - Find indices of two numbers that add to target',
          'Maximum Subarray - Kadane\'s algorithm for maximum sum',
          'Merge Intervals - Combine overlapping intervals',
          'Product of Array Except Self - Without division',
          'Find Missing Number - Using sum or XOR',
          'Rotate Array - In-place rotation',
          'Container With Most Water - Two pointer approach',
          '3Sum - Find triplets that sum to zero',
          'Best Time to Buy/Sell Stock - Maximum profit',
          'Next Permutation - Rearrange numbers'
        ]
      },
      {
        id: '2',
        name: 'HashSets',
        category: 'DSA',
        description: 'Unordered collections for unique elements with O(1) operations',
        hints: this.getHashSetHints(),
        commonProblems: [
          'Contains Duplicate - Check if array has duplicates',
          'Longest Substring Without Repeating Characters',
          'Intersection of Two Arrays',
          'Happy Number - Cycle detection',
          'Jewels and Stones - Count jewels in stones',
          'Distribute Candies - Maximum unique types',
          'Missing Number - Using set difference',
          'Valid Sudoku - Check row/col/box duplicates',
          'First Missing Positive - Using set for existence',
          'Group Anagrams - Using sorted key in map'
        ]
      },
      {
        id: '3',
        name: 'HashMaps & Dictionaries',
        category: 'DSA',
        description: 'Key-value stores for efficient lookups and frequency counting',
        hints: this.getHashMapHints(),
        commonProblems: [
          'Two Sum - Classic hashmap problem',
          'Group Anagrams - Group words by sorted key',
          'Longest Substring Without Repeating Characters',
          'Subarray Sum Equals K - Prefix sum with hashmap',
          'Top K Frequent Elements - Bucket sort with frequency map',
          'Valid Anagram - Character frequency comparison',
          'First Unique Character - Frequency then iteration',
          'Word Pattern - Pattern matching with bijection',
          'Ransom Note - Character frequency check',
          'Isomorphic Strings - Character mapping validation'
        ]
      },
      {
        id: '4',
        name: 'Strings',
        category: 'DSA',
        description: 'Text manipulation and pattern matching algorithms',
        hints: this.getStringHints(),
        commonProblems: [
          'Valid Palindrome - Two pointers from ends',
          'Longest Palindromic Substring - Expand around center',
          'String to Integer (atoi) - careful parsing',
          'Valid Parentheses - Stack-based validation',
          'Longest Substring Without Repeating Characters',
          'Minimum Window Substring - Sliding window',
          'Decode String - Stack-based decoding',
          'Letter Combinations of Phone Number - Backtracking',
          'Valid Anagram - Frequency counting',
          'Implement strStr() - String searching'
        ]
      },
      {
        id: '5',
        name: 'Linked Lists',
        category: 'DSA',
        description: 'Pointer manipulation and node-based structures',
        hints: this.getLinkedListHints(),
        commonProblems: [
          'Reverse Linked List - Iterative and recursive',
          'Detect Cycle in Linked List - Floyd\'s algorithm',
          'Merge Two Sorted Lists',
          'Remove Nth Node From End - Two pointers',
          'Add Two Numbers - Digit by digit addition',
          'Copy List with Random Pointer - Mapping approach',
          'LRU Cache - Linked list + hashmap',
          'Palindrome Linked List - Reverse half',
          'Intersection of Two Linked Lists',
          'Sort List - Merge sort for O(n log n)'
        ]
      },
      {
      id: '6',
      name: 'Stacks',
      category: 'DSA',
      description: 'LIFO data structure for various algorithms',
      hints: this.getStackHints(),
      commonProblems: [
  'Valid Parentheses - Check if brackets are properly nested and closed',
  'Min Stack - Design stack that supports push, pop, top, and retrieving minimum element',
  'Next Greater Element - Find next greater element for each array element',
  'Daily Temperatures - Find how many days until warmer temperature for each day',
  'Evaluate Reverse Polish Notation - Evaluate postfix expression using stack',
  'Implement Stack using Queues - Implement LIFO stack using FIFO queues',
  'Remove All Adjacent Duplicates - Remove consecutive duplicate characters',
  'Asteroid Collision - Simulate asteroid collisions where larger asteroids destroy smaller ones',
  'Decode String - Decode encoded string with repetition patterns',
  'Basic Calculator - Evaluate basic arithmetic expressions with parentheses'
]
    },

      {
      id: '7',
      name: 'Queues',
      category: 'DSA',
      description: 'FIFO data structure for BFS and scheduling',
      hints: this.getQueueHints(),
      commonProblems:[
  'Implement Queue using Stacks - Implement FIFO queue using LIFO stacks',
  'Sliding Window Maximum - Find maximum in each sliding window of size k',
  'Number of Recent Calls - Count requests in recent time intervals',
  'Design Circular Queue - Efficient circular buffer implementation',
  'First Unique Character in Stream - Find first non-repeating character in stream',
  'Rotting Oranges - Simulate rotting process in grid using BFS',
  'Open the Lock - Minimum turns to reach target combination avoiding deadends',
  'Perfect Squares - Least number of perfect square numbers that sum to n',
  'Course Schedule - Check if course prerequisites form valid DAG',
  'Binary Tree Level Order Traversal - BFS traversal level by level'
]
    },
    {
      id: '8',
      name: 'Trees',
      category: 'DSA',
      description: 'Hierarchical data structures with nodes and edges',
      hints: this.getTreeHints(),
      commonProblems: [
  'Binary Tree Inorder Traversal - Recursive and iterative traversal methods',
  'Validate Binary Search Tree - Check if tree satisfies BST properties',
  'Maximum Depth of Binary Tree - Find longest path from root to leaf',
  'Binary Tree Level Order Traversal - BFS traversal level by level',
  'Serialize and Deserialize Binary Tree - Convert tree to string and back',
  'Construct Binary Tree from Preorder and Inorder - Rebuild tree from traversals',
  'Lowest Common Ancestor - Find common ancestor of two nodes in BST',
  'Kth Smallest Element in BST - Find k-th smallest element in binary search tree',
  'Binary Tree Maximum Path Sum - Find maximum path sum between any nodes',
  'Same Tree - Check if two binary trees are identical in structure and values'
] 
    },

    {
      id: '9',
      name: 'Graphs',
      category: 'DSA',
      description: 'Networks of interconnected nodes',
      hints: this.getGraphHints(),
      commonProblems: [
  'Number of Islands - Count connected components in grid using DFS/BFS',
  'Course Schedule - Detect cycles in directed graph for prerequisite ordering',
  'Clone Graph - Deep copy graph with neighbors using BFS/DFS',
  'Word Ladder - Shortest transformation sequence between words using BFS',
  'Pacific Atlantic Water Flow - DFS from oceans to find cells that flow to both',
  'Graph Valid Tree - Check if undirected graph is valid tree (connected, no cycles)',
  'Number of Connected Components - Count connected components in undirected graph',
  'Alien Dictionary - Topological sort to reconstruct language order from words',
  'Cheapest Flights Within K Stops - Dijkstra/Bellman-Ford with constraint',
  'Walls and Gates - Multi-source BFS to find distances to nearest gate'
]
    },
      {
      id: '10',
      name: 'Heaps',
      category: 'DSA',
      description: 'Priority queue implementations',
      hints: this.getHeapHints(),
     commonProblems: [
  'Kth Largest Element in Array - Find k-th largest element using min-heap',
  'Top K Frequent Elements - Most frequent elements using frequency heap',
  'Merge K Sorted Lists - Merge multiple sorted lists using min-heap',
  'Find Median from Data Stream - Median maintenance using two heaps',
  'Task Scheduler - Schedule tasks with cooldown using max-heap',
  'K Closest Points to Origin - Nearest points using max-heap of distances',
  'Maximum Performance Team - Greedy with heap for maximum efficiency',
  'Sliding Window Median - Median in sliding window using two heaps',
  'Ugly Number II - Generate ugly numbers using min-heap',
  'Reorganize String - Rearrange string so no adjacent same characters using max-heap'
] 
      },
       {
      id: '11',
      name: 'Sorting Algorithms',
      category: 'Algorithms',
      description: 'Efficient data organization techniques',
      hints: this.getSortingHints(),
      commonProblems: [
  'Sort Colors - Dutch national flag problem (three-way partitioning)',
  'Merge Intervals - Merge overlapping intervals after sorting',
  'Largest Number - Custom sort to form largest number from array',
  'Kth Largest Element - Quickselect or heap for k-th largest',
  'Meeting Rooms II - Minimum rooms needed using chronological ordering',
  'Non-overlapping Intervals - Greedy interval removal after sorting',
  'H-Index - Research impact metric calculation using sorting',
  'Wiggle Sort - Arrange elements in alternating peak-valley pattern',
  'Count of Smaller Numbers After Self - Merge sort with inversion counting',
  'Maximum Gap - Bucket sort for maximum consecutive difference'
]
    },
     {
      id: '12',
      name: 'Searching Algorithms',
      category: 'Algorithms',
      description: 'Finding elements in data structures efficiently',
      hints: this.getSearchingHints(),
      commonProblems: [
  'Search in Rotated Sorted Array - Binary search in rotated array',
  'Find Minimum in Rotated Sorted Array - Binary search for pivot point',
  'Search a 2D Matrix - Binary search in row and column sorted matrix',
  'Find First and Last Position - Binary search for target range',
  'Koko Eating Bananas - Binary search for minimum eating speed',
  'Capacity To Ship Packages - Binary search for minimum ship capacity',
  'Word Search - Backtracking/DFS in character grid',
  'Number of Islands - DFS/BFS for connected components',
  'Shortest Path in Binary Matrix - BFS for unweighted grid path',
  'Cut Off Trees for Golf Event - BFS with priority for multiple targets'
]
    },
     {
      id: '13',
      name: 'Dynamic Programming',
      category: 'Algorithms',
      description: 'Solving problems by breaking them into subproblems',
      hints: this.getDynamicProgrammingHints(),
      commonProblems: [
  'Climbing Stairs',
  'House Robber',
  'House Robber II',
  'Coin Change',
  'Coin Change II',
  'Longest Common Subsequence',
  'Edit Distance',
  'Unique Paths',
  'Partition Equal Subset Sum',
  'Maximum Subarray'
]

    },
     {
      id: '14',
      name: 'Greedy Algorithms',
      category: 'Algorithms',
      description: 'Making locally optimal choices for global optimization',
      hints: this.getGreedyAlgorithmHints(),
     commonProblems: [
  'Activity Selection',
  'Interval Scheduling',
  'Jump Game',
  'Jump Game II',
  'Gas Station',
  'Candy Distribution',
  'Meeting Rooms II',
  'Task Scheduler',
  'Minimum Arrows to Burst Balloons',
  'Non-overlapping Intervals'
]

    },
     {
      id: '15',
      name: 'Backtracking',
      category: 'Algorithms',
      description: 'Systematic trial and error approach to problem solving',
      hints: this.getBacktrackingHints(),
      commonProblems: [
  'N-Queens',
  'Sudoku Solver',
  'Word Search',
  'Rat in a Maze',
  'Generate Parentheses',
  'Subsets',
  'Subsets II',
  'Permutations',
  'Combination Sum',
  'Palindrome Partitioning'
]

    }
    ];
  }

  private getTopicProblems(topicId: number): Problem[] {
    // Sample problems for each topic
    const problems: { [key: number]: Problem[] } = {
      1: [
        {
          id: 1,
          title: 'Two Sum',
          description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
          difficulty: 'Easy',
          defaultCode: {
            'python': 'def twoSum(nums, target):\n    # Your code here\n    pass',
            'java': 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n    }\n}',
            'javascript': 'function twoSum(nums, target) {\n    // Your code here\n}',
            'cpp': 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Your code here\n    }\n};'
          },
          testCases: [
            { input: '[2,7,11,15], 9', output: '[0,1]' },
            { input: '[3,2,4], 6', output: '[1,2]' }
          ]
        }
      ],
      2: [
        {
          id: 1,
          title: 'Contains Duplicate',
          description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
          difficulty: 'Easy',
          defaultCode: {
            'python': 'def containsDuplicate(nums):\n    # Your code here\n    pass',
            'java': 'class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        // Your code here\n    }\n}',
            'javascript': 'function containsDuplicate(nums) {\n    // Your code here\n}',
            'cpp': 'class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        // Your code here\n    }\n};'
          },
          testCases: [
            { input: '[1,2,3,1]', output: 'true' },
            { input: '[1,2,3,4]', output: 'false' }
          ]
        }
      ]
    };

    return problems[topicId] || [];
  }

  private getArrayHints(): Hint[] {
    return [
      {
        title: 'Two Pointer Technique',
          "description": "Hint: Use two pointers, 'left' starting at the beginning and 'right' at the end of the array. Move the pointers towards each other. At each step, check the elements at the pointers based on your problem. For pair sum, check if arr[left] + arr[right] equals the target. For palindrome, check if arr[left] == arr[right]. For sliding window problems, check if the current window satisfies your condition. Move 'left' forward if the condition is met, else move 'right' backward.",
        codeSnippet: `# Two pointers moving towards each other
left, right = 0, len(arr)-1 
while left < right: 
    # Process elements at pointers
    if condition_met:
        left += 1
    else:
        right -= 1`,
        language: 'python'
      },
      {
        title: 'Sliding Window Pattern',
          "description": "Hint: Instead of recalculating the sum for every subarray, keep a running total. Add the new element when the window expands and remove the first element when the window slides forward. This way, you only update what changes, making it much faster.",
        codeSnippet: `window_start = 0
max_sum = 0
window_sum = 0

for window_end in range(len(arr)):
    window_sum += arr[window_end]  # Add the next element
    
    # Slide the window if condition met
    if window_end >= K - 1:
        max_sum = max(max_sum, window_sum)
        window_sum -= arr[window_start]  # Remove first element
        window_start += 1  # Slide window ahead`,
        language: 'python'
      },
      {
        title: 'Prefix Sum Array',
         "description": "Hint: Store the running total of elements in a new array (prefix). This lets you quickly find the sum of any range by subtracting two prefix values, instead of adding each element again. It makes range sum queries much faster.",
        codeSnippet: `# Create prefix sum array
prefix = [0] * (len(arr) + 1)
for i in range(len(arr)):
    prefix[i+1] = prefix[i] + arr[i]

# Query sum from index i to j (inclusive)
range_sum = prefix[j+1] - prefix[i]`,
        language: 'python'
      },
      {
        title: 'Kadane\'s Algorithm',
         "description": "Hint: Keep track of the maximum sum ending at the current index. At each step, decide whether to start a new subarray from the current element or extend the previous one. Update the overall maximum as you go. This gives the largest subarray sum in O(n) time.",
        codeSnippet: `max_ending_here = arr[0]
max_so_far = arr[0]

for i in range(1, len(arr)):
    max_ending_here = max(arr[i], max_ending_here + arr[i])
    max_so_far = max(max_so_far, max_ending_here)`,
        language: 'python'
      },
      {
        title: 'Dutch National Flag Algorithm',
      "description": "Hint: Use three pointers (low, mid, high) to sort the array in one pass. 'low' tracks the position for 0s, 'high' for 2s, and 'mid' moves through the array. When you see 0, swap it with 'low' and move both forward. When you see 1, just move 'mid'. When you see 2, swap it with 'high' and move 'high' backward. This way, all 0s come first, then 1s, then 2s in O(n) time.",
        codeSnippet: `low, mid, high = 0, 0, len(arr)-1

while mid <= high:
    if arr[mid] == 0:
        arr[low], arr[mid] = arr[mid], arr[low]
        low += 1
        mid += 1
    elif arr[mid] == 1:
        mid += 1
    else:
        arr[mid], arr[high] = arr[high], arr[mid]
        high -= 1`,
        language: 'python'
      },
      {
        title: 'Cyclic Sort Pattern',
       "description": "Hint: Place each number at its correct index (value - 1). Start from the first element, and if the current number is not at its right position, swap it with the number at its correct index. If it’s already correct, move forward. This way, the array gets sorted in one pass without extra space.",
        codeSnippet: `i = 0
while i < len(arr):
    correct_index = arr[i] - 1
    if arr[i] != arr[correct_index]:
        arr[i], arr[correct_index] = arr[correct_index], arr[i]
    else:
        i += 1`,
        language: 'python'
      },
      {
  title: 'Binary Search in Arrays',
  description: "Hint: Binary search works only if the array is sorted...",
  codeSnippet: `def binary_search(arr, target):
    low, high = 0, len(arr)-1
    
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
  language: 'python'
},      {
        title: 'Find Missing Number',
          "description": "Hint: The XOR trick works because numbers cancel out when XORed with themselves. First, XOR all numbers from 1 to N. Then, XOR all elements in the given array. The common numbers cancel each other, and the only number left will be the missing one.",
        codeSnippet: `def find_missing_number(arr):
    n = len(arr)
    xor_all = 0
    
    # XOR all numbers from 1 to n
    for i in range(1, n+2):
        xor_all ^= i
        
    # XOR with all array elements
    for num in arr:
        xor_all ^= num
        
    return xor_all`,
        language: 'python'
      },
      {
        title: 'Find All Duplicates',
          "description": "Hint: Use the array’s own indexes to track visited numbers. For each number, go to its index (num - 1). If the value there is already negative, it means the number has been seen before, so it’s a duplicate. Otherwise, mark it as visited by making it negative. This way, you find duplicates in O(n) time without extra space.",
        codeSnippet: `def find_duplicates(arr):
    duplicates = []
    for num in arr:
        index = abs(num) - 1
        if arr[index] < 0:
            duplicates.append(abs(num))
        else:
            arr[index] = -arr[index]
    return duplicates`,
        language: 'python'
      },
      {
        title: 'Container With Most Water',
          "description": "Hint: Start with two pointers at the ends of the array. The area is determined by the shorter line times the distance between the lines. Move the pointer pointing to the shorter line inward, because moving the taller one won’t increase the area. Keep checking and updating the maximum area until the pointers meet.",
        codeSnippet: `def max_area(height):
    left, right = 0, len(height)-1
    max_area = 0
    
    while left < right:
        width = right - left
        current_area = min(height[left], height[right]) * width
        max_area = max(max_area, current_area)
        
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
            
    return max_area`,
        language: 'python'
      },
      {
        title: 'Trapping Rain Water',
          "description": "Hint: Water can only be trapped if there are taller bars on both sides of a bar. Keep track of the maximum height seen from the left and right. At each step, the trapped water depends on the shorter side’s max height minus the current bar’s height.",
        codeSnippet: `def trap_rain_water(height):
    if not height:
        return 0
        
    left, right = 0, len(height)-1
    left_max = right_max = 0
    water = 0
    
    while left <= right:
        if height[left] <= height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                water += right_max - height[right]
            right -= 1
            
    return water`,
        language: 'python'
      },
      {
        title: 'Merge Intervals',
        "description": "Hint: Sort intervals by start time first. If the current interval overlaps with the last merged one, merge them by updating the end time. Otherwise, add it as a new interval.",
        codeSnippet: `def merge_intervals(intervals):
    if not intervals:
        return []
        
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    
    for current in intervals[1:]:
        last = merged[-1]
        if current[0] <= last[1]:
            last[1] = max(last[1], current[1])
        else:
            merged.append(current)
            
    return merged`,
        language: 'python'
      },
      {
        title: 'Insert Interval',
        "description": "Hint: First add all intervals ending before the new one. Then merge all overlapping intervals with the new one. Finally, add the remaining intervals.",
        codeSnippet: `def insert_interval(intervals, new_interval):
    result = []
    i = 0
    n = len(intervals)
    
    # Add all intervals before new_interval
    while i < n and intervals[i][1] < new_interval[0]:
        result.append(intervals[i])
        i += 1
        
    # Merge overlapping intervals
    while i < n and intervals[i][0] <= new_interval[1]:
        new_interval[0] = min(new_interval[0], intervals[i][0])
        new_interval[1] = max(new_interval[1], intervals[i][1])
        i += 1
        
    result.append(new_interval)
    
    # Add remaining intervals
    while i < n:
        result.append(intervals[i])
        i += 1
        
    return result`,
        language: 'python'
      },
      {
        title: 'Rotate Array',
          "description": "Hint: Reverse the whole array, then reverse the first k elements, and finally reverse the rest to rotate in-place.",
        codeSnippet: `def rotate_array(arr, k):
    n = len(arr)
    k = k % n
    
    def reverse(start, end):
        while start < end:
            arr[start], arr[end] = arr[end], arr[start]
            start += 1
            end -= 1
            
    reverse(0, n-1)      # Reverse entire array
    reverse(0, k-1)      # Reverse first k elements
    reverse(k, n-1)      # Reverse remaining elements`,
        language: 'python'
      },
      {
        title: 'Product of Array Except Self',
      "description": "Hint: First calculate product of all elements to the left of each index, then multiply with product of elements to the right.",
        codeSnippet: `def product_except_self(arr):
    n = len(arr)
    result = [1] * n
    
    # Left products
    left_product = 1
    for i in range(n):
        result[i] = left_product
        left_product *= arr[i]
    
    # Right products
    right_product = 1
    for i in range(n-1, -1, -1):
        result[i] *= right_product
        right_product *= arr[i]
        
    return result`,
        language: 'python'
      },
      {
        title: 'Find First Missing Positive',
       "description": "Hint: Place each number at its correct index (value 1 at index 0, value 2 at index 1, etc.). Then scan the array to find the first index where number doesn’t match (that index+1 is the missing positive).",
        codeSnippet: `def first_missing_positive(arr):
    n = len(arr)
    
    # Place numbers in their correct positions
    for i in range(n):
        while 1 <= arr[i] <= n and arr[i] != arr[arr[i]-1]:
            # Swap arr[i] with arr[arr[i]-1]
            correct_pos = arr[i] - 1
            arr[i], arr[correct_pos] = arr[correct_pos], arr[i]
    
    # Find first missing positive
    for i in range(n):
        if arr[i] != i + 1:
            return i + 1
            
    return n + 1`,
        language: 'python'
      },
      {
        title: '3Sum Problem',
        "description": "Hint: Sort the array first. Fix one number and then use two pointers (left & right) to find pairs that sum with it to zero. Skip duplicates to avoid repeating triplets.",
        codeSnippet: `def three_sum(arr):
    arr.sort()
    result = []
    n = len(arr)
    
    for i in range(n-2):
        # Skip duplicates
        if i > 0 and arr[i] == arr[i-1]:
            continue
            
        left, right = i+1, n-1
        while left < right:
            total = arr[i] + arr[left] + arr[right]
            if total == 0:
                result.append([arr[i], arr[left], arr[right]])
                # Skip duplicates
                while left < right and arr[left] == arr[left+1]:
                    left += 1
                while left < right and arr[right] == arr[right-1]:
                    right -= 1
                left += 1
                right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1
                
    return result`,
        language: 'python'
      },
      {
        title: 'Maximum Product Subarray',
          "description": "Hint: Track both maximum and minimum products at each step because a negative number can flip the result. Swap max and min when encountering a negative number, then update the result.",
        codeSnippet: `def max_product_subarray(arr):
    if not arr:
        return 0
        
    max_so_far = min_so_far = result = arr[0]
    
    for i in range(1, len(arr)):
        num = arr[i]
        if num < 0:
            max_so_far, min_so_far = min_so_far, max_so_far
            
        max_so_far = max(num, max_so_far * num)
        min_so_far = min(num, min_so_far * num)
        result = max(result, max_so_far)
        
    return result`,
        language: 'python'
      },
      {
        title: 'Search in Rotated Sorted Array',
        "description": "Hint: Even though the array is rotated, one half is always sorted. Check which half is sorted, and decide whether to search in the left or right half using binary search logic.",
        codeSnippet: `def search_rotated_array(arr, target):
    left, right = 0, len(arr)-1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
            
        # Left half is sorted
        if arr[left] <= arr[mid]:
            if arr[left] <= target < arr[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Right half is sorted
        else:
            if arr[mid] < target <= arr[right]:
                left = mid + 1
            else:
                right = mid - 1
                
    return -1`,
        language: 'python'
      },
      {
        title: 'Find Minimum in Rotated Sorted Array',
      "description":"Hint: Use binary search. Compare mid element with the rightmost element to determine which half is unsorted. The minimum lies in the unsorted half.",
        codeSnippet: `def find_min_rotated(arr):
    left, right = 0, len(arr)-1
    
    while left < right:
        mid = (left + right) // 2
        if arr[mid] > arr[right]:
            left = mid + 1
        else:
            right = mid
            
    return arr[left]`,
        language: 'python'
      },
      {
        title: 'Next Permutation',
        "description": "Hint: Find the first decreasing element from the right. Then find the element just larger than it to swap. Finally, reverse the suffix to get the next permutation.",
        codeSnippet: `def next_permutation(arr):
    n = len(arr)
    i = n - 2
    
    # Find first decreasing element from right
    while i >= 0 and arr[i] >= arr[i+1]:
        i -= 1
        
    if i >= 0:
        j = n - 1
        # Find element just larger than arr[i]
        while j >= 0 and arr[j] <= arr[i]:
            j -= 1
        arr[i], arr[j] = arr[j], arr[i]
    
    # Reverse the suffix
    left, right = i+1, n-1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1`,
        language: 'python'
      },
      {
        title: 'Meeting Rooms II',
          "description": "Hint: Sort intervals by start time. Use a min-heap to track end times of ongoing meetings. If a meeting starts after the earliest ending meeting, reuse the room (pop from heap); otherwise, allocate a new room (push end time). The heap size at the end is the minimum number of rooms needed.",
        codeSnippet: `import heapq

def min_meeting_rooms(intervals):
    if not intervals:
        return 0
        
    intervals.sort(key=lambda x: x[0])
    heap = []  # stores end times
    
    for interval in intervals:
        if heap and interval[0] >= heap[0]:
            heapq.heappop(heap)
        heapq.heappush(heap, interval[1])
        
    return len(heap)`,
        language: 'python'
      },
    {
  title: 'Kth Largest Element',
  description: "Hint: Quickselect is like a faster version of quicksort...",
  codeSnippet: `def find_kth_largest(arr, k):
    arr.sort()
    return arr[-k]`,
  language: 'python'
},
      {
        title: 'Merge Sorted Arrays',
        "description": "Hint: Use three pointers - one for each array and one for the end of the merged array. Compare elements from the end of both arrays and place the larger one at the end of the merged array, moving pointers accordingly.",
        codeSnippet: `def merge_sorted_arrays(nums1, m, nums2, n):
    p1, p2, p = m-1, n-1, m+n-1
    
    while p1 >= 0 and p2 >= 0:
        if nums1[p1] > nums2[p2]:
            nums1[p] = nums1[p1]
            p1 -= 1
        else:
            nums1[p] = nums2[p2]
            p2 -= 1
        p -= 1
        
    # Copy remaining elements from nums2
    nums1[:p2+1] = nums2[:p2+1]`,
        language: 'python'
      },
      {
        title: 'Find Peak Element',
        "description": "Hint: Use binary search. If the middle element is greater than the next one, the peak lies on the left side (including mid). Otherwise, it lies on the right side.",
        codeSnippet: `def find_peak_element(arr):
    left, right = 0, len(arr)-1
    
    while left < right:
        mid = (left + right) // 2
        if arr[mid] > arr[mid+1]:
            right = mid
        else:
            left = mid + 1
            
    return left`,
        language: 'python'
      },
      {
        title: 'Search in 2D Matrix',
        "description": "Hint: Treat the 2D matrix as a 1D sorted array. Use binary search by calculating the mid index and converting it back to 2D coordinates using division and modulus.",
        codeSnippet: `def search_2d_matrix(matrix, target):
    if not matrix or not matrix[0]:
        return False
        
    rows, cols = len(matrix), len(matrix[0])
    left, right = 0, rows * cols - 1
    
    while left <= right:
        mid = (left + right) // 2
        mid_value = matrix[mid // cols][mid % cols]
        
        if mid_value == target:
            return True
        elif mid_value < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return False`,
        language: 'python'
      },
      {
        title: 'Spiral Matrix',
        "description": "Hint: Use four pointers to track the boundaries of the matrix (top, bottom, left, right). Traverse the matrix in a spiral order by moving right, down, left, and up, adjusting the boundaries after each direction.",
        codeSnippet: `def spiral_order(matrix):
    if not matrix:
        return []
        
    result = []
    top, bottom = 0, len(matrix)-1
    left, right = 0, len(matrix[0])-1
    
    while top <= bottom and left <= right:
        # Traverse right
        for i in range(left, right+1):
            result.append(matrix[top][i])
        top += 1
        
        # Traverse down
        for i in range(top, bottom+1):
            result.append(matrix[i][right])
        right -= 1
        
        if top <= bottom:
            # Traverse left
            for i in range(right, left-1, -1):
                result.append(matrix[bottom][i])
            bottom -= 1
            
        if left <= right:
            # Traverse up
            for i in range(bottom, top-1, -1):
                result.append(matrix[i][left])
            left += 1
            
    return result`,
        language: 'python'
      },
      {
        title: 'Set Matrix Zeroes',
        "description": "Hint: Use the first row and first column as markers. First, check if the first row and column need to be zeroed. Then, for each cell in the matrix, if it is zero, mark its row and column in the first row and column. Finally, iterate through the matrix again to set cells to zero based on the markers.",
        codeSnippet: `def set_zeroes(matrix):
    if not matrix:
        return
        
    rows, cols = len(matrix), len(matrix[0])
    first_row_zero = any(matrix[0][j] == 0 for j in range(cols))
    first_col_zero = any(matrix[i][0] == 0 for i in range(rows))
    
    # Use first row and column as markers
    for i in range(1, rows):
        for j in range(1, cols):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0
    
    # Set zeroes based on markers
    for i in range(1, rows):
        for j in range(1, cols):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0
    
    # Set first row
    if first_row_zero:
        for j in range(cols):
            matrix[0][j] = 0
    
    # Set first column
    if first_col_zero:
        for i in range(rows):
            matrix[i][0] = 0`,
        language: 'python'
      },
      {
        title: 'Rotate Image',
        "description": "Hint: First transpose the matrix (swap rows with columns), then reverse each row to get the 90-degree rotation.",
        codeSnippet: `def rotate_image(matrix):
    n = len(matrix)
    
    # Transpose matrix
    for i in range(n):
        for j in range(i+1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    
    # Reverse each row
    for i in range(n):
        matrix[i].reverse()`,
        language: 'python'
      },
      {
        title: 'Word Search',
         "description": "Hint: Use backtracking. Start from each cell matching the first letter, then explore all 4 directions (up, down, left, right) recursively. Mark visited cells to avoid revisiting them during the current path.",
        codeSnippet: `def exist(board, word):
    def dfs(i, j, index):
        if index == len(word):
            return True
        if i < 0 or i >= len(board) or j < 0 or j >= len(board[0]) or board[i][j] != word[index]:
            return False
            
        temp = board[i][j]
        board[i][j] = '#'  # Mark as visited
        
        found = (dfs(i+1, j, index+1) or
                dfs(i-1, j, index+1) or
                dfs(i, j+1, index+1) or
                dfs(i, j-1, index+1))
                
        board[i][j] = temp  # Backtrack
        return found
    
    for i in range(len(board)):
        for j in range(len(board[0])):
            if dfs(i, j, 0):
                return True
                
    return False`,
        language: 'python'
      },
      {
        title: 'Longest Consecutive Sequence',
          "description": "Hint: Use a set to store all numbers for O(1) lookups. For each number, check if it is the start of a sequence (num-1 not in set). Then count consecutive numbers from there to find the longest sequence.",
        codeSnippet: `def longest_consecutive_sequence(arr):
    if not arr:
        return 0
        
    num_set = set(arr)
    longest = 0
    
    for num in num_set:
        # Check if it's the start of a sequence
        if num - 1 not in num_set:
            current_num = num
            current_streak = 1
            
            while current_num + 1 in num_set:
                current_num += 1
                current_streak += 1
                
            longest = max(longest, current_streak)
            
    return longest`,
        language: 'python'
      },
      {
        title: 'Find All Numbers Disappeared in Array',
        "description": "Hint: Use the array itself to track which numbers are present. For each number, mark the index corresponding to its value as negative. Then, the indices that remain positive indicate the missing numbers.",
        codeSnippet: `def find_disappeared_numbers(arr):
    # Mark numbers as negative
    for num in arr:
        index = abs(num) - 1
        if arr[index] > 0:
            arr[index] = -arr[index]
    
    # Find positive numbers (indices of missing numbers)
    result = []
    for i in range(len(arr)):
        if arr[i] > 0:
            result.append(i+1)
            
    return result`,
        language: 'python'
      },
      {
        title: 'Maximum Points You Can Obtain from Cards',
          "description": "Hint: You can pick from the start or end of the array. Think of taking k elements as leaving n-k elements in the middle. Use a sliding window to find the minimum sum of the middle n-k elements and subtract from total sum to get the maximum points.",
        codeSnippet: `def max_score_from_ends(arr, k):
    n = len(arr)
    left_sum = sum(arr[:k])
    max_sum = left_sum
    right_sum = 0
    
    for i in range(1, k+1):
        left_sum -= arr[k-i]
        right_sum += arr[n-i]
        max_sum = max(max_sum, left_sum + right_sum)
        
    return max_sum`,
        language: 'python'
      },
      {
        title: 'Subarray Sum Equals K',
          "description": "Hint: Use a running cumulative sum and a hashmap. For each index, store how many times each prefix sum has occurred. If (current_sum - k) exists in the map, add its count to the result because it forms a subarray with sum k.",
        codeSnippet: `def subarray_sum_equals_k(arr, k):
    prefix_sum = {0: 1}
    current_sum = 0
    count = 0
    
    for num in arr:
        current_sum += num
        count += prefix_sum.get(current_sum - k, 0)
        prefix_sum[current_sum] = prefix_sum.get(current_sum, 0) + 1
        
    return count`,
        language: 'python'
      },
      {
        title: 'Minimum Size Subarray Sum',
  "description": "Hint: Use a sliding window. Keep expanding the window by adding elements from the right until the sum ≥ target, then shrink from the left to find the smallest length. Repeat until the end.",

        codeSnippet: `def min_subarray_length(arr, target):
    left = 0
    current_sum = 0
    min_length = float('inf')
    
    for right in range(len(arr)):
        current_sum += arr[right]
        
        while current_sum >= target:
            min_length = min(min_length, right - left + 1)
            current_sum -= arr[left]
            left += 1
            
    return min_length if min_length != float('inf') else 0`,
        language: 'python'
      },
      {
        title: 'Find All Anagrams in String',
         "description": "Hint: Use a sliding window of size equal to the length of p. Keep frequency counts of characters in the window and compare with p's character counts. Slide the window across s and record starting indices when counts match.",
        codeSnippet: `def find_anagrams(s, p):
    if len(s) < len(p):
        return []
        
    p_count = [0] * 26
    s_count = [0] * 26
    result = []
    
    for char in p:
        p_count[ord(char) - ord('a')] += 1
        
    for i in range(len(s)):
        s_count[ord(s[i]) - ord('a')] += 1
        
        if i >= len(p):
            s_count[ord(s[i - len(p)]) - ord('a')] -= 1
            
        if s_count == p_count:
            result.append(i - len(p) + 1)
            
    return result`,
        language: 'python'
      },
      {
        title: 'Permutation in String',
          "description": "Hint: Use a sliding window of size equal to s1. Keep frequency counts of characters in s1 and the current window in s2. Slide the window across s2 and check if the counts match; if they do, s2 contains a permutation of s1.",

        codeSnippet: `def check_inclusion(s1, s2):
    if len(s1) > len(s2):
        return False
        
    s1_count = [0] * 26
    s2_count = [0] * 26
    
    for i in range(len(s1)):
        s1_count[ord(s1[i]) - ord('a')] += 1
        s2_count[ord(s2[i]) - ord('a')] += 1
        
    if s1_count == s2_count:
        return True
        
    for i in range(len(s1), len(s2)):
        s2_count[ord(s2[i]) - ord('a')] += 1
        s2_count[ord(s2[i - len(s1)]) - ord('a')] -= 1
        
        if s1_count == s2_count:
            return True
            
    return False`,
        language: 'python'
      },
      {
        title: 'Maximum Swap',
          "description": "Hint: To get the largest number, find the first digit from the left that is smaller than a larger digit on its right. Swap it with the largest such digit found to the right. Only one swap is allowed.",

        codeSnippet: `def maximum_swap(num):
    digits = list(str(num))
    n = len(digits)
    max_index = n - 1
    left = right = -1
    
    for i in range(n-2, -1, -1):
        if digits[i] > digits[max_index]:
            max_index = i
        elif digits[i] < digits[max_index]:
            left = i
            right = max_index
    
    if left != -1:
        digits[left], digits[right] = digits[right], digits[left]
        return int(''.join(digits))
        
    return num`,
        language: 'python'
      },
      {
        title: 'Wiggle Sort',
          "description": "Hint: Iterate through the array and ensure that every even index is less than or equal to the next element, and every odd index is greater than or equal to the next element. Swap elements as needed to maintain this order.",
        codeSnippet: `def wiggle_sort(arr):
    for i in range(len(arr)-1):
        if (i % 2 == 0 and arr[i] > arr[i+1]) or (i % 2 == 1 and arr[i] < arr[i+1]):
            arr[i], arr[i+1] = arr[i+1], arr[i]`,
        language: 'python'
      },
      {
        title: 'Find K Closest Elements',
          "description": "Hint: Use binary search to find the starting index of the k closest elements. Compare the distances from the target to the elements at the current window's edges and adjust the window accordingly.",
        codeSnippet: `def find_closest_elements(arr, k, target):
    left, right = 0, len(arr) - k
    
    while left < right:
        mid = (left + right) // 2
        # Compare distances from target
        if target - arr[mid] > arr[mid + k] - target:
            left = mid + 1
        else:
            right = mid
            
    return arr[left:left + k]`,
        language: 'python'
      },
      {
        title: 'Find Peak Element in 2D Array',
          "description": "Hint: Use a binary search approach on columns. For each mid column, find the maximum element in that column. Then check its neighbors to decide which direction to move (left or right) to find a peak.",
        codeSnippet: `def find_peak_2d(matrix):
    def find_peak_in_column(col):
        max_row = 0
        for i in range(1, len(matrix)):
            if matrix[i][col] > matrix[max_row][col]:
                max_row = i
        return max_row
    
    left, right = 0, len(matrix[0])-1
    
    while left <= right:
        mid_col = (left + right) // 2
        peak_row = find_peak_in_column(mid_col)
        
        left_val = matrix[peak_row][mid_col-1] if mid_col > 0 else float('-inf')
        right_val = matrix[peak_row][mid_col+1] if mid_col < len(matrix[0])-1 else float('-inf')
        
        if matrix[peak_row][mid_col] >= left_val and matrix[peak_row][mid_col] >= right_val:
            return [peak_row, mid_col]
        elif left_val > matrix[peak_row][mid_col]:
            right = mid_col - 1
        else:
            left = mid_col + 1
            
    return [-1, -1]`,
        language: 'python'
      },
      {
        title: 'Count Inversions in Array',
          "description": "Hint: Use a modified merge sort to count inversions while sorting the array. During the merge step, if an element from the right half is smaller than an element from the left half, it indicates that there are inversions.",
        codeSnippet: `def count_inversions(arr):
    def merge_count(left, right):
        merged = []
        inversions = 0
        i = j = 0
        
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                merged.append(left[i])
                i += 1
            else:
                merged.append(right[j])
                j += 1
                inversions += len(left) - i
                
        merged.extend(left[i:])
        merged.extend(right[j:])
        return merged, inversions
    
    def sort_count(arr):
        if len(arr) <= 1:
            return arr, 0
            
        mid = len(arr) // 2
        left, left_count = sort_count(arr[:mid])
        right, right_count = sort_count(arr[mid:])
        merged, merge_count_val = merge_count(left, right)
        
        return merged, left_count + right_count + merge_count_val
    
    _, count = sort_count(arr)
    return count`,
        language: 'python'
      },
      {
        title: 'Maximum Sum Circular Subarray',
          "description": "Hint: Use Kadane’s algorithm to find the maximum subarray sum in a linear array. To handle the circular case, find the total sum of the array and subtract the minimum subarray sum (also found using Kadane’s) from it. The result is the maximum circular subarray sum.",
        codeSnippet: `def max_circular_subarray(arr):
    def kadane(arr):
        max_ending_here = max_so_far = arr[0]
        for i in range(1, len(arr)):
            max_ending_here = max(arr[i], max_ending_here + arr[i])
            max_so_far = max(max_so_far, max_ending_here)
        return max_so_far
    
    # Case 1: Maximum subarray is not circular
    max_linear = kadane(arr)
    
    # Case 2: Maximum subarray is circular (wrap around)
    total_sum = sum(arr)
    # Invert array and find minimum subarray
    inverted = [-x for x in arr]
    max_wrap = total_sum + kadane(inverted)
    
    # Handle case where all numbers are negative
    if max_wrap == 0:
        return max_linear
        
    return max(max_linear, max_wrap)`,
        language: 'python'
      },
      {
        title: 'Find Duplicate Number',
          "description": "Hint: Use Floyd's Tortoise and Hare (Cycle Detection) algorithm. Treat the array as a linked list where the value at each index points to the next index. The duplicate number will create a cycle in this linked list.",
        codeSnippet: `def find_duplicate(arr):
    # Floyd's Tortoise and Hare algorithm
    slow = fast = arr[0]
    
    # Find intersection point
    while True:
        slow = arr[slow]
        fast = arr[arr[fast]]
        if slow == fast:
            break
    
    # Find entrance to cycle
    slow = arr[0]
    while slow != fast:
        slow = arr[slow]
        fast = arr[fast]
        
    return slow`,
        language: 'python'
      },
      {
        title: 'First Missing Positive',
          "description": "Hint: Place each number at its correct index (value 1 at index 0, value 2 at index 1, etc.). Then scan the array to find the first index where number doesn’t match (that index+1 is the missing positive).",
        codeSnippet: `def first_missing_positive(arr):
    n = len(arr)
    
    # Place numbers in their correct positions
    for i in range(n):
        while 1 <= arr[i] <= n and arr[i] != arr[arr[i]-1]:
            # Swap to correct position
            correct_pos = arr[i] - 1
            arr[i], arr[correct_pos] = arr[correct_pos], arr[i]
    
    # Find first missing positive
    for i in range(n):
        if arr[i] != i + 1:
            return i + 1
            
    return n + 1`,
        language: 'python'
      },
      {
        title: 'Count of Smaller Numbers After Self',
          "description": "Hint: Use a modified merge sort to count how many numbers from the right side are smaller than each number from the left side while merging. Maintain an index array to track original positions.",
        codeSnippet: `def count_smaller_after_self(arr):
    def merge_sort(enums):
        if len(enums) <= 1:
            return enums
            
        mid = len(enums) // 2
        left = merge_sort(enums[:mid])
        right = merge_sort(enums[mid:])
        
        # Count inversions
        i = j = 0
        while i < len(left) or j < len(right):
            if j == len(right) or (i < len(left) and left[i][1] <= right[j][1]):
                result[left[i][0]] += j  # Count elements in right that are smaller
                enums[i+j] = left[i]
                i += 1
            else:
                enums[i+j] = right[j]
                j += 1
                
        return enums
    
    n = len(arr)
    result = [0] * n
    merge_sort(list(enumerate(arr)))
    return result`,
        language: 'python'
      },
      {
        title: 'Create Maximum Number',
          "description": "Hint: To create the maximum number of length k from two arrays, try all possible splits of k between the two arrays. For each split, get the maximum subsequence from each array and merge them to form the largest number. Keep track of the overall maximum.",
        codeSnippet: `def max_number(nums1, nums2, k):
    def prep(nums, k):
        drop = len(nums) - k
        out = []
        for num in nums:
            while drop and out and out[-1] < num:
                out.pop()
                drop -= 1
            out.append(num)
        return out[:k]
    
    def merge(a, b):
        return [max(a, b).pop(0) for _ in a+b]
    
    return max(merge(prep(nums1, i), prep(nums2, k-i)) 
               for i in range(k+1) 
               if i <= len(nums1) and k-i <= len(nums2))`,
        language: 'python'
      },
      {
        title: 'Maximum Gap',
          "description": "Hint: Use a bucket sort approach. Calculate the minimum and maximum values, then create buckets to hold ranges of values. Place each number in its corresponding bucket, then find the maximum gap between the non-empty buckets.",
        codeSnippet: `def maximum_gap(arr):
    if len(arr) < 2:
        return 0
        
    min_val, max_val = min(arr), max(arr)
    bucket_size = max(1, (max_val - min_val) // (len(arr) - 1))
    bucket_count = (max_val - min_val) // bucket_size + 1
    
    buckets = [[None, None] for _ in range(bucket_count)]
    
    for num in arr:
        idx = (num - min_val) // bucket_size
        if buckets[idx][0] is None:
            buckets[idx][0] = buckets[idx][1] = num
        else:
            buckets[idx][0] = min(buckets[idx][0], num)
            buckets[idx][1] = max(buckets[idx][1], num)
    
    max_gap = 0
    prev_max = buckets[0][1]
    
    for i in range(1, bucket_count):
        if buckets[i][0] is not None:
            max_gap = max(max_gap, buckets[i][0] - prev_max)
            prev_max = buckets[i][1]
            
    return max_gap`,
        language: 'python'
      },
      {
        title: 'Find Median from Data Stream',
          "description": "Hint: Use two heaps - a max heap for the lower half of numbers and a min heap for the upper half. Balance the heaps such that the max heap can have at most one more element than the min heap. The median is either the top of the max heap or the average of the tops of both heaps.",
        codeSnippet: `import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # max heap (invert min heap)
        self.large = []  # min heap

    def add_num(self, num):
        if len(self.small) == len(self.large):
            heapq.heappush(self.large, -heapq.heappushpop(self.small, -num))
        else:
            heapq.heappush(self.small, -heapq.heappushpop(self.large, num))

    def find_median(self):
        if len(self.small) == len(self.large):
            return (self.large[0] - self.small[0]) / 2.0
        else:
            return self.large[0]`,
        language: 'python'
      },
    {
      title: 'Range Sum Query - Immutable',
      description: 'Hint: Use prefix sums to answer range sum queries in O(1) time. Precompute a prefix sum array where prefix[i] is the sum of elements from index 0 to i-1. Then the sum from index i to j is prefix[j+1] - prefix[i].',
      codeSnippet: `class NumArray:
    def __init__(self, nums: List[int]):
        n = len(nums)
        self.prefix = [0] * (n + 1)
        for i in range(n):
            self.prefix[i + 1] = self.prefix[i] + nums[i]

    def sumRange(self, left: int, right: int) -> int:
        return self.prefix[right + 1] - self.prefix[left]`,
      language: 'python'
    }
    ];
  }

  private getHashSetHints(): Hint[] {
    return [
      {
        title: 'Duplicate Detection',
        description: 'Check if an array contains duplicates using a set for O(n) average time complexity',
        codeSnippet: `def has_duplicate(arr):
    seen = set()
    for item in arr:
        if item in seen:
            return True
        seen.add(item)
    return False`,
        language: 'python'
      },
      {
        title: 'Set Operations',
        description: 'Perform union, intersection, and difference operations on sets',
        codeSnippet: `set1 = {1, 2, 3}
set2 = {3, 4, 5}
union = set1 | set2        # {1, 2, 3, 4, 5}
intersection = set1 & set2 # {3}
difference = set1 - set2   # {1, 2}`,
        language: 'python'
      },
      {
        title: 'Finding Unique Elements',
        description: 'Extract unique elements from an array using a set',
        codeSnippet: `def find_unique(arr):
    return list(set(arr))`,
        language: 'python'
      },
      {
        title: 'Membership Testing',
        description: 'Check if an element exists in a set for O(1) average time complexity',
        codeSnippet: `items_set = set(items)
if target in items_set:
    # Target exists in items`,
        language: 'python'
      },
      {
        title: 'Set Comprehensions',  
        description: 'Create sets using comprehensions for concise and efficient code',
        codeSnippet: `squares = {x**2 for x in range(10)}
even_squares = {x**2 for x in range(10) if x % 2 == 0}`,
        language: 'python'
      },
      {
        title: 'Remove Duplicates from Sorted Array',
        description: 'Hint: Use two pointers to overwrite duplicates in-place. One pointer iterates through the array, while the other tracks the position to write unique elements.',
        codeSnippet: `def remove_duplicates(arr):
    if not arr:
        return 0
        
    write_index = 1
    for i in range(1, len(arr)):
        if arr[i] != arr[i-1]:
            arr[write_index] = arr[i]
            write_index += 1
            
    return write_index`,
        language: 'python'
      },
      {
  "title": "Majority Element",
  "description": "Hint: Use the Boyer-Moore Voting Algorithm to find the majority element in linear time and constant space. Maintain a count and a candidate element, updating them as you iterate through the array.",
  "codeSnippet": "def majority_element(nums):\n    count = 0\n    candidate = None\n    \n    for num in nums:\n        if count == 0:\n            candidate = num\n        count += (1 if num == candidate else -1)\n    \n    return candidate",
  "language": "python"
  },
  {
  title: 'Array Partition',
  description: 'Hint: Sort the array and sum up the elements at even indices to maximize the sum of min pairs.',
  codeSnippet: `def array_pair_sum(nums):
    nums.sort()
    return sum(nums[::2])`,
  language: 'python'
},
{
  title: 'Longest Consecutive Sequence',
    description: 'Hint: Use a HashSet to store numbers and check for the start of sequences. For each number, if it is the start of a sequence (num-1 not in set), count the length of the sequence by checking consecutive numbers.',
  codeSnippet: `def longest_consecutive(nums):
    num_set = set(nums)
    longest = 0
    for num in num_set:
        if num - 1 not in num_set:
            length = 1
            while num + length in num_set:
                length += 1
            longest = max(longest, length)
    return longest`,
  language: 'python'
},
{
  title: 'Happy Number',
  description: 'Determine if a number is happy by using a HashSet to detect cycles in the sum of squares of digits.',
  codeSnippet: `def is_happy(n):
    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        n = sum(int(digit)**2 for digit in str(n))
    return n == 1`,
  language: 'python'
},
{
  title: 'Intersection of Two Arrays',
   description: 'Find the intersection of two arrays using HashSet for O(n) average time complexity.',
  codeSnippet: `a = [1,2,3]
b = [2,3,4]
print(set(a) & set(b))  # {2,3}`,
  language: 'python'
},
{
  title: 'Unique Characters',
   description: 'Check if a string has all unique characters using a HashSet.',
  codeSnippet: `s = "hello"
print(len(s) == len(set(s)))  # False`,
  language: 'python'
},
{
  title: 'Two Sum Existence',
  description: 'Check if any two numbers in an array sum up to a target using a HashSet for O(n) average time complexity.',
  codeSnippet: `nums = [2,7,11,15]; target = 9
seen = set()
for num in nums:
    if target - num in seen:
        print("Found")  # Found
    seen.add(num)`,
  language: 'python'
},
{
  title: 'First Unique Character',
  description: 'Use a HashMap to count character frequencies, then find the first character with a count of 1.',
  codeSnippet: `def first_unique(s):
    freq = {}
    for ch in s:
        freq[ch] = freq.get(ch, 0) + 1
    for i, ch in enumerate(s):
        if freq[ch] == 1:
            return i
    return -1`,
  language: 'python'
},{
  title: 'Longest Substring Without Repeating Characters',
  description: 'Use a sliding window and a HashMap to track the last seen index of characters, adjusting the window as needed to maintain uniqueness.',
  codeSnippet: `def length_of_longest_substring(s):
    seen = {}
    left = res = 0
    for right, ch in enumerate(s):
        if ch in seen and seen[ch] >= left:
            left = seen[ch] + 1
        seen[ch] = right
        res = max(res, right - left + 1)
    return res`,
  language: 'python'
},
{
  title: 'Minimum Window Substring',
   description: 'Use a sliding window and a HashMap to track character counts, expanding and contracting the window to find the minimum substring containing all characters of the target.',
  codeSnippet: `from collections import Counter
def min_window(s, t):
    need, missing = Counter(t), len(t)
    left = start = end = 0
    for right, ch in enumerate(s, 1):
        if need[ch] > 0: missing -= 1
        need[ch] -= 1
        if missing == 0:
            while left < right and need[s[left]] < 0:
                need[s[left]] += 1
                left += 1
            if end == 0 or right-left < end-start:
                start, end = left, right
    return s[start:end]`,
  language: 'python'
},
{
  title: 'Container With Most Water',
  description: 'Use two pointers starting at both ends of the array, moving the pointer at the shorter line inward to potentially find a taller line and maximize area.',
  codeSnippet: `def max_area(height):
    left, right, res = 0, len(height)-1, 0
    while left < right:
        res = max(res, min(height[left], height[right]) * (right-left))
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return res`,
  language: 'python'
},
{
  title: 'Unique Email Addresses',
  description: 'Use a HashSet to store unique email addresses after normalizing them by removing dots and ignoring characters after plus signs in the local part.',
  codeSnippet: `def num_unique_emails(emails):
    seen = set()
    for email in emails:
        local, domain = email.split('@')
        local = local.split('+')[0].replace('.', '')
        seen.add(local + '@' + domain)
    return len(seen)`,
  language: 'python'
},
{
  title: 'Subarray Sum Equals K',
  description: 'Use a HashMap to store cumulative sums and their frequencies, allowing for O(n) time complexity in finding subarrays that sum to k.',
  codeSnippet: `from collections import defaultdict
def subarray_sum(nums, k):
    mp = defaultdict(int)
    mp[0] = 1
    total = res = 0
    for n in nums:
        total += n
        res += mp[total-k]
        mp[total] += 1
    return res`,
  language: 'python'
},
{
  title: 'Group Anagrams',
  description: 'Use a HashMap to group words by their sorted character tuple.',
  codeSnippet: `from collections import defaultdict
def group_anagrams(strs):
    mp = defaultdict(list)
    for s in strs:
        mp[''.join(sorted(s))].append(s)
    return list(mp.values())`,
  language: 'python'
},
{
  title: 'Permutation in String',
  description: 'Check if any permutation of s1 is a substring of s2 using sliding window and frequency counts.',
  codeSnippet: `from collections import Counter
def check_inclusion(s1, s2):
    need, window = Counter(s1), Counter()
    left = 0
    for right, ch in enumerate(s2):
        window[ch] += 1
        if right - left + 1 > len(s1):
            window[s2[left]] -= 1
            if window[s2[left]] == 0:
                del window[s2[left]]
            left += 1
        if window == need:
            return True
    return False`,
  language: 'python'
},
{
  title: 'Longest Repeating Character Replacement',
  description: 'Use a sliding window and a HashMap to track character frequencies, adjusting the window size based on the number of replacements allowed.',
  codeSnippet: `from collections import defaultdict
def character_replacement(s, k):
    count = defaultdict(int)
    left = res = maxf = 0
    for right, ch in enumerate(s):
        count[ch] += 1
        maxf = max(maxf, count[ch])
        while (right - left + 1) - maxf > k:
            count[s[left]] -= 1
            left += 1
        res = max(res, right - left + 1)
    return res`,
  language: 'python'
},
{
  title: 'Sliding Window Maximum',
  description: 'Use a deque to maintain indices of potential maximums in the current window, ensuring O(n) time complexity.',
  codeSnippet: `from collections import deque
def max_sliding_window(nums, k):
    dq, res = deque(), []
    for i, n in enumerate(nums):
        while dq and nums[dq[-1]] <= n: dq.pop()
        dq.append(i)
        if dq[0] == i - k: dq.popleft()
        if i >= k - 1: res.append(nums[dq[0]])
    return res`,
  language: 'python'
},
{
  title: 'Longest Consecutive Sequence',
  description: 'Use a HashSet to efficiently find the length of the longest consecutive numbers sequence.',
  codeSnippet: `def longest_consecutive(nums):
    nums_set = set(nums)
    res = 0
    for n in nums_set:
        if n-1 not in nums_set:
            length = 1
            while n+length in nums_set: length += 1
            res = max(res, length)
    return res`,
  language: 'python'
},
{
  title: 'Find All Duplicates in Array',
  description: 'Use a HashMap or marking technique to find all numbers that appear twice in array.',
  codeSnippet: `def find_duplicates(nums):
    res = []; seen = set()
    for n in nums:
        if n in seen: res.append(n)
        seen.add(n)
    return res`,
  language: 'python'
},
{
  title: 'Count Subarrays with Sum Divisible by K',
  description: 'Use a HashMap to track remainders of prefix sums modulo k to count valid subarrays.',
  codeSnippet: `from collections import defaultdict
def subarrays_div_by_k(arr, k):
    mp = defaultdict(int); mp[0] = 1; total = 0; res = 0
    for n in arr:
        total += n
        res += mp[total % k]
        mp[total % k] += 1
    return res`,
  language: 'python'
},
{
  title: 'Longest Substring with At Most K Distinct Characters',
  description: 'Use sliding window and HashMap to track character counts and maintain at most k distinct chars.',
  codeSnippet: `from collections import defaultdict
def longest_k_distinct(s, k):
    count = defaultdict(int); left = res = 0
    for right, ch in enumerate(s):
        count[ch] += 1
        while len(count) > k:
            count[s[left]] -= 1
            if count[s[left]] == 0: del count[s[left]]
            left += 1
        res = max(res, right - left + 1)
    return res`,
  language: 'python'
},
{
  title: 'Longest Substring with All Unique Characters',
  description: 'Use sliding window and HashSet to expand substring while ensuring all characters are unique.',
  codeSnippet: `def longest_unique_substring(s):
    seen = set(); left = res = 0
    for right, ch in enumerate(s):
        while ch in seen:
            seen.remove(s[left]); left += 1
        seen.add(ch)
        res = max(res, right - left + 1)
    return res`,
  language: 'python'
},
{
  title: 'Check if Array Contains Duplicate II',
  description: 'Use a HashMap to track indices of elements and check if duplicates appear within k distance.',
  codeSnippet: `def contains_nearby_duplicate(nums, k):
    mp = {}
    for i, n in enumerate(nums):
        if n in mp and i - mp[n] <= k: return True
        mp[n] = i
    return False`,
  language: 'python'
},
{
  title: 'Longest Subarray with Equal 0s and 1s',
  description: 'Convert 0s to -1s and use a HashMap to track prefix sums for longest balanced subarray.',
  codeSnippet: `def find_max_length(nums):
    mp = {0: -1}; total = 0; res = 0
    for i, n in enumerate(nums):
        total += -1 if n == 0 else 1
        if total in mp: res = max(res, i - mp[total])
        else: mp[total] = i
    return res`,
  language: 'python'
},
{
  title: 'Two Sum II - Input Array Sorted',
  description: 'Use two pointers on a sorted array to find two numbers that sum to target efficiently.',
  codeSnippet: `def two_sum_sorted(arr, target):
    left, right = 0, len(arr)-1
    while left < right:
        s = arr[left] + arr[right]
        if s == target: return [left, right]
        elif s < target: left += 1
        else: right -= 1
    return []`,
  language: 'python'
},
{
  title: 'Check If N and Its Double Exist',
  description: 'Use a HashSet to check if for any number x, 2*x exists in the array.',
  codeSnippet: `def check_if_double(nums):
    seen = set()
    for n in nums:
        if 2*n in seen or (n % 2 == 0 and n//2 in seen): return True
        seen.add(n)
    return False`,
  language: 'python'
},
{
  title: 'Longest Subarray with At Most Two Distinct Numbers',
  description: 'Use sliding window and HashMap to track counts and maintain at most two distinct numbers.',
  codeSnippet: `from collections import defaultdict
def total_fruit(fruits):
    count = defaultdict(int); left = res = 0
    for right, f in enumerate(fruits):
        count[f] += 1
        while len(count) > 2:
            count[fruits[left]] -= 1
            if count[fruits[left]] == 0: del count[fruits[left]]
            left += 1
        res = max(res, right - left + 1)
    return res`,
  language: 'python'
},
{
  title: 'Find All Unique Triplets (3Sum)',
  description: 'Sort array and use two pointers with a HashSet to avoid duplicate triplets that sum to zero.',
  codeSnippet: `def three_sum(nums):
    nums.sort(); res = []
    for i in range(len(nums)-2):
        if i > 0 and nums[i] == nums[i-1]: continue
        left, right = i+1, len(nums)-1
        while left < right:
            s = nums[i] + nums[left] + nums[right]
            if s == 0: res.append([nums[i], nums[left], nums[right]]); left += 1; right -= 1
            elif s < 0: left += 1
            else: right -= 1
    return res`,
  language: 'python'
},
{
  title: 'Group Shifted Strings',
  description: 'Group strings that can be shifted to each other by calculating a key based on character differences and using a HashMap.',
  codeSnippet: `from collections import defaultdict
def group_shifted(strings):
    mp = defaultdict(list)
    for s in strings:
        key = tuple((ord(c)-ord(s[0]))%26 for c in s)
        mp[key].append(s)
    return list(mp.values())`,
  language: 'python'
},
{
  title: 'Find the Duplicate Number',
  description: 'Use a HashSet to track seen numbers and identify the duplicate in the array.',
  codeSnippet: `def find_duplicate(nums):
    seen = set()
    for n in nums:
        if n in seen: return n
        seen.add(n)
    return -1`,
  language: 'python'
},
{
  title: 'Longest Substring Without Repeating Characters',
 description: 'Use a sliding window and a HashMap to track the last seen index of characters, adjusting the window as needed to maintain uniqueness.',
  codeSnippet: `def length_of_longest_substring(s):
    last_seen = {}; start = res = 0
    for i, ch in enumerate(s):
        if ch in last_seen: start = max(start, last_seen[ch]+1)
        last_seen[ch] = i
        res = max(res, i-start+1)
    return res`,
  language: 'python'
},
{
  title: 'Word Pattern',
  description: 'Use two HashMaps to establish a bijection between characters in the pattern and words in the string.',
  codeSnippet: `def word_pattern(pattern, s):
    words = s.split()
    if len(pattern) != len(words): return False
    mapping = {}
    used = set()
    for p, w in zip(pattern, words):
        if p in mapping:
            if mapping[p] != w: return False
        else:
            if w in used: return False
            mapping[p] = w; used.add(w)
    return True`,
  language: 'python'
},
{
  title: 'Top K Frequent Words',
  description: 'Use a HashMap to count frequency of words.Sort words by frequency and lexicographical order to pick top k.This is a common interview problem involving HashMaps and sorting techniques.',
  codeSnippet: `from collections import Counter
def top_k_words(words, k):
    count = Counter(words)
    return sorted(count, key=lambda x: (-count[x], x))[:k]`,
  language: 'python'
},

{
  title: 'Find All Anagrams in a String',
  description: 'Use a HashMap to track frequency of characters in the target string.Use sliding window of same length over the source string and compare counts.Return all starting indices where an anagram of target occurs.',
  codeSnippet: `from collections import Counter
def find_anagrams(s, p):
    if len(s) < len(p): return []
    p_count = Counter(p); s_count = Counter()
    res = []
    for i, ch in enumerate(s):
        s_count[ch] += 1
        if i >= len(p): s_count[s[i-len(p)]] -= 1; s_count += Counter()
        if s_count == p_count: res.append(i-len(p)+1)
    return res`,
  language: 'python'
},
{
  title: 'Check If N and Its Double Exist',
  description: 'Use a HashSet to track all numbers.For each number, check if double exists (or half for negative numbers) in the set.This is a common problem testing HashSet lookup efficiency.',
  codeSnippet: `def check_if_double(nums):
    seen = set()
    for n in nums:
        if 2*n in seen or (n % 2 == 0 and n//2 in seen): return True
        seen.add(n)
    return False`,
  language: 'python'
},
{
  title: 'Four Sum II',
  description: 'Use two HashMaps to store sums of pairs from two arrays.Then, check for complement sums from the other two arrays to count quadruplets efficiently.',
  codeSnippet: `from collections import Counter
def four_sum_count(A, B, C, D):
    ab = Counter(a+b for a in A for b in B)
    return sum(ab.get(-(c+d),0) for c in C for d in D)`,
  language: 'python'
},
{
  title: 'Intersection of Two Arrays II',
  description: 'Use a HashMap to count occurrences in the first array.For each element in the second array, decrease the count if present to find common elements, including duplicates.',
  codeSnippet: `from collections import Counter
def intersect(nums1, nums2):
    c = Counter(nums1)
    res = []
    for n in nums2:
        if c[n] > 0: res.append(n); c[n] -= 1
    return res`,
  language: 'python'
},

{
  title: 'Longest Harmonious Subsequence',
  description: 'Use a HashMap to count occurrences of each number.Check for numbers that differ by 1 and track the maximum combined count to find the longest harmonious subsequence.',
  codeSnippet: `from collections import Counter
def find_lhs(nums):
    c = Counter(nums)
    return max((c[x]+c[x+1]) for x in c if x+1 in c) if c else 0`,
  language: 'python'
},
{
  title: 'Contains Duplicate II',
  description: 'Use a HashMap to track the latest index of each number.Check if a duplicate occurs within k distance to detect nearby duplicates efficiently.',
  codeSnippet: `def contains_nearby_duplicate(nums, k):
    mp = {}
    for i, n in enumerate(nums):
        if n in mp and i - mp[n] <= k: return True
        mp[n] = i
    return False`,
  language: 'python'
},
{
  title: 'Check If Word Pattern Matches',
  description: 'Use a HashMap to map pattern characters to words.Ensure the mapping is one-to-one and matches the sequence of words in the string.',
  codeSnippet: `def word_pattern(pattern, s):
    words = s.split()
    if len(pattern) != len(words): return False
    mp = {}; used = set()
    for p, w in zip(pattern, words):
        if p in mp:
            if mp[p] != w: return False
        else:
            if w in used: return False
            mp[p] = w; used.add(w)
    return True`,
  language: 'python'
},
{
  title: 'Count Number of Nice Subarrays',
  description: 'Use a HashMap to count prefix sums of odd numbers.For each new prefix sum, check how many previous sums differ by the required count k of odd numbers.',
  codeSnippet: `from collections import defaultdict
def number_of_nice_subarrays(nums, k):
    mp = defaultdict(int); mp[0] = 1
    count = total = 0
    for n in nums:
        total += n % 2
        count += mp[total - k]
        mp[total] += 1
    return count`,
  language: 'python'
},
{
  title: 'Check If Two Strings Are Isomorphic',
  description: 'Use two HashMaps to store character mappings in both directions.Ensure that each character in s maps to a unique character in t and vice versa.',
  codeSnippet: `def is_isomorphic(s, t):
    map_s = {}; map_t = {}
    for cs, ct in zip(s, t):
        if cs in map_s and map_s[cs] != ct: return False
        if ct in map_t and map_t[ct] != cs: return False
        map_s[cs] = ct; map_t[ct] = cs
    return True`,
  language: 'python'
},
{
  title: 'Longest Substring with At Most Two Distinct Characters',
  description: 'Use a HashMap to track character counts in the sliding window.Expand window and shrink when distinct characters exceed 2, tracking maximum length.',
  codeSnippet: `from collections import defaultdict
def length_of_longest_substring_two_distinct(s):
    count = defaultdict(int); left = res = 0
    for right, ch in enumerate(s):
        count[ch] += 1
        while len(count) > 2:
            count[s[left]] -= 1
            if count[s[left]] == 0: del count[s[left]]
            left += 1
        res = max(res, right - left + 1)
    return res`,
  language: 'python'
},
{
  title: 'Group Shifted Strings',
  description: 'Use a HashMap to group strings by shifting pattern.Strings with same shifting sequence belong to the same group.',
  codeSnippet: `from collections import defaultdict
def group_shifted_strings(strings):
    mp = defaultdict(list)
    for s in strings:
        key = tuple((ord(c)-ord(s[0]))%26 for c in s)
        mp[key].append(s)
    return list(mp.values())`,
  language: 'python'
}    ];
  }

  private getHashMapHints(): Hint[] {
    return [
      {
        title: 'Frequency Counting',
        description: 'Count occurrences of elements using dictionaries',
        codeSnippet: `from collections import defaultdict
freq = defaultdict(int)
for item in items:
    freq[item] += 1`,
        language: 'python'
      },
      {
        title: 'Grouping Elements',
        description: 'Group elements by a key using dictionaries',
        codeSnippet: `from collections import defaultdict
groups = defaultdict(list)
for item in items:
    key = item[0]  # Group by first character
    groups[key].append(item)`,
        language: 'python'
      },
      {
        title: 'Memoization',
        description: 'Cache function results using dictionaries',
        codeSnippet: `cache = {}
def fibonacci(n):
    if n in cache:
        return cache[n]
    if n <= 1:
        return n
    result = fibonacci(n-1) + fibonacci(n-2)
    cache[n] = result
    return result`,
        language: 'python'
      },
      {
        title: 'Two Sum Pattern',
        description: 'Use dictionary to find complements',
        codeSnippet: `def two_sum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`,
        language: 'python'
      },
      {
        title: 'Default Values',
        description: 'Handle missing keys with get() or defaultdict',
        codeSnippet: `# Using get()
value = my_dict.get(key, default_value)

# Using defaultdict
from collections import defaultdict
my_dict = defaultdict(int)  # Default value 0`,
        language: 'python'
      },
      {
  title: 'Two Sum',
  description: 'Use a HashMap to store numbers and their indices.For each number, check if (target - number) exists in the map to find a valid pair in one pass.',
  codeSnippet: `def two_sum(nums, target):
    mp = {}
    for i, num in enumerate(nums):
        if target - num in mp: return [mp[target-num], i]
        mp[num] = i
    return []`,
  language: 'python'
},
{
  title: 'Two Sum II - Input Array Sorted',
  description: 'Use a HashMap to check complements or two pointers in sorted array.Find indices of two numbers summing to target efficiently.',
  codeSnippet: `def two_sum_sorted(nums, target):
    mp = {}
    for i, num in enumerate(nums):
        if target - num in mp: return [mp[target-num]+1, i+1]
        mp[num] = i
    return []`,
  language: 'python'
},
{
      title: 'Two Sum - Classic Pattern',
      description: 'Use HashMap to store numbers and their indices. For each number, check if complement exists in map for O(n) solution.',
      codeSnippet: `def twoSum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`,
      language: 'python'
    },
    {
  title: 'Top K Frequent Elements',
  description: 'Use HashMap for frequency counting, then bucket sort or heap to find top K elements based on their frequency counts.',
  codeSnippet: `def topKFrequent(nums, k):
    freq = {}
    for num in nums:
        freq[num] = freq.get(num, 0) + 1
    return sorted(freq.keys(), key=lambda x: -freq[x])[:k]`,
  language: 'python'
},
{
  title: 'First Unique Character',
  description: 'First pass: count character frequencies. Second pass: find first character with frequency 1 for O(n) solution.',
  codeSnippet: `def firstUniqChar(s):
    freq = {}
    for char in s:
        freq[char] = freq.get(char, 0) + 1
    for i, char in enumerate(s):
        if freq[char] == 1:
            return i
    return -1`,
  language: 'python'
},
{
  title: 'Word Pattern',
  description: 'Bijection mapping between pattern and words. Use two HashMaps to ensure one-to-one mapping in both directions.',
  codeSnippet: `def wordPattern(pattern, s):
    words = s.split()
    if len(pattern) != len(words):
        return False
    char_to_word = {}
    word_to_char = {}
    for char, word in zip(pattern, words):
        if char in char_to_word and char_to_word[char] != word:
            return False
        if word in word_to_char and word_to_char[word] != char:
            return False
        char_to_word[char] = word
        word_to_char[word] = char
    return True`,
  language: 'python'
},
{
  title: 'Ransom Note',
  description: 'Count characters in magazine. Check if ransom note can be formed by ensuring sufficient character counts available.',
  codeSnippet: `def canConstruct(ransomNote, magazine):
    mag_count = {}
    for char in magazine:
        mag_count[char] = mag_count.get(char, 0) + 1
    for char in ransomNote:
        if char not in mag_count or mag_count[char] == 0:
            return False
        mag_count[char] -= 1
    return True`,
  language: 'python'
},
{
  title: 'Jewels and Stones',
  description: 'Use HashSet for O(1) jewel lookups. Count how many stones are also jewels by checking membership in jewels set.',
  codeSnippet: `def numJewelsInStones(jewels, stones):
    jewel_set = set(jewels)
    count = 0
    for stone in stones:
        if stone in jewel_set:
            count += 1
    return count`,
  language: 'python'
},
{
  title: 'Distribute Candies',
  description: 'Count unique candy types using HashSet. Maximum unique types sister can get is min(unique_count, total_candies/2).',
  codeSnippet: `def distributeCandies(candyType):
    unique = len(set(candyType))
    return min(unique, len(candyType) // 2)`,
  language: 'python'
},
{
  title: 'Longest Palindrome',
  description: 'Count character frequencies. Palindrome length is sum of even counts plus one if any odd count exists for center.',
  codeSnippet: `def longestPalindrome(s):
    freq = {}
    for char in s:
        freq[char] = freq.get(char, 0) + 1
    length = 0
    has_odd = False
    for count in freq.values():
        length += count // 2 * 2
        if count % 2 == 1:
            has_odd = True
    return length + 1 if has_odd else length`,
  language: 'python'
},
{
  title: 'LRU Cache Implementation',
  description: 'Combine HashMap with doubly linked list. HashMap provides O(1) access, linked list maintains usage order for eviction.',
  codeSnippet: `class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        self.head = Node(0, 0)
        self.tail = Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add(node)
            return node.value
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self._add(node)
        self.cache[key] = node
        if len(self.cache) > self.capacity:
            lru = self.head.next
            self._remove(lru)
            del self.cache[lru.key]`,
  language: 'python'
},
{
  title: 'Insert Delete GetRandom O(1)',
  description: 'Combine HashMap with ArrayList. HashMap stores indices, ArrayList stores values for O(1) random access and operations.',
  codeSnippet: `class RandomizedSet:
    def __init__(self):
        self.nums = []
        self.indices = {}

    def insert(self, val: int) -> bool:
        if val in self.indices:
            return False
        self.indices[val] = len(self.nums)
        self.nums.append(val)
        return True

    def remove(self, val: int) -> bool:
        if val not in self.indices:
            return False
        index = self.indices[val]
        last_val = self.nums[-1]
        self.nums[index] = last_val
        self.indices[last_val] = index
        self.nums.pop()
        del self.indices[val]
        return True

    def getRandom(self) -> int:
        return random.choice(self.nums)`,
  language: 'python'
},
{
  title: 'Copy List with Random Pointer',
  description: 'Two-pass approach with HashMap. First pass: create copies. Second pass: connect random pointers using mapping.',
  codeSnippet: `def copyRandomList(head):
    if not head:
        return None
    mapping = {}
    current = head
    while current:
        mapping[current] = Node(current.val)
        current = current.next
    current = head
    while current:
        if current.next:
            mapping[current].next = mapping[current.next]
        if current.random:
            mapping[current].random = mapping[current.random]
        current = current.next
    return mapping[head]`,
  language: 'python'
},
{
  title: 'Word Frequency Counter',
  description: 'Use HashMap to count word frequencies. Split text into words and increment counts for statistical analysis.',
  codeSnippet: `def wordFrequency(text):
    words = text.lower().split()
    freq = {}
    for word in words:
        freq[word] = freq.get(word, 0) + 1
    return freq`,
  language: 'python'
},
{
  title: 'Subarray Sum Equals K (Optimized)',
  description: 'Use a HashMap to store prefix sums and their counts.This allows counting subarrays with sum k in O(n) time using cumulative sum differences.',
  codeSnippet: `from collections import defaultdict
def subarray_sum(nums, k):
    prefix_count = defaultdict(int)
    prefix_count[0] = 1
    total = res = 0
    for n in nums:
        total += n
        res += prefix_count[total - k]
        prefix_count[total] += 1
    return res`,
  language: 'python'
},
{
  title: 'Check Pair Sum Exists in Array',
  description: 'Use a HashMap to store seen numbers and check if complement exists.Common interview question to check if any pair sums to a target in O(n) time.',
  codeSnippet: `def has_pair(nums, target):
    seen = set()
    for n in nums:
        if target - n in seen: return True
        seen.add(n)
    return False`,
  language: 'python'
},
{
  title: 'Find Majority Element',
  description: 'Use a HashMap to count occurrences of each element.Element occurring more than n/2 times is returned as majority element.',
  codeSnippet: `from collections import Counter
def majorityElement(nums):
    freq = Counter(nums)
    for num, count in freq.items():
        if count > len(nums)//2: return num`,
  language: 'python'
},
{
  title: 'Longest Arithmetic Subarray',
  description: 'Use a HashMap to store length of arithmetic subarray ending at each index.Update length based on previous difference to find the longest subarray.',
  codeSnippet: `def longestArithSeqLength(nums):
    dp = {}
    res = 0
    for i in range(len(nums)):
        for j in range(i):
            diff = nums[i]-nums[j]
            dp[i,diff] = dp.get((j,diff),1)+1
            res = max(res, dp[i,diff])
    return res`,
  language: 'python'
},
{
  title: 'Find Four Elements with Given Sum',
  description: 'Use a HashMap to store sums of pairs.Check if complement sum exists for another pair to get four numbers summing to target efficiently.',
  codeSnippet: `def fourSum(nums, target):
    pair_sums = {}
    n = len(nums)
    for i in range(n):
        for j in range(i+1, n):
            s = nums[i]+nums[j]
            if target - s in pair_sums:
                for x, y in pair_sums[target - s]:
                    if len({i,j,x,y})==4: return True
            pair_sums.setdefault(s, []).append((i,j))
    return False`,
  language: 'python'
},
{
  title: 'Longest Subarray with Sum Zero',
  description: 'Use a HashMap to store first occurrence of prefix sums.Subarray between repeated prefix sums has zero sum.',
  codeSnippet: `def longest_zero_sum_subarray(nums):
    prefix_sum = 0
    mp = {0:-1}
    res = 0
    for i, n in enumerate(nums):
        prefix_sum += n
        if prefix_sum in mp:
            res = max(res, i - mp[prefix_sum])
        else:
            mp[prefix_sum] = i
    return res`,
  language: 'python'
},
{
  title: 'Count Pairs with Given Difference',
  description: 'Use a HashMap to store seen numbers.For each number, check if number ± difference exists to count valid pairs efficiently.',
  codeSnippet: `def countPairs(nums, k):
    seen = {}
    count = 0
    for n in nums:
        if n+k in seen: count += seen[n+k]
        if n-k in seen: count += seen[n-k]
        seen[n] = seen.get(n,0)+1
    return count`,
  language: 'python'
},
{
  title: 'Check for Subarray Sum Multiple of K',
  description: 'Use a HashMap to store first occurrence of prefix sum modulo K.If same modulo appears again, subarray sum is a multiple of K.',
  codeSnippet: `def checkSubarraySum(nums, k):
    mp = {0:-1}
    total = 0
    for i, n in enumerate(nums):
        total += n
        rem = total % k if k != 0 else total
        if rem in mp:
            if i - mp[rem] > 1: return True
        else:
            mp[rem] = i
    return False`,
  language: 'python'
},
{
  title: 'Longest Consecutive Sequence',
  description: 'Use a HashSet to store all elements.For each number, check if it is the start of a sequence, then count consecutive numbers.',
  codeSnippet: `def longestConsecutive(nums):
    num_set = set(nums)
    res = 0
    for n in num_set:
        if n-1 not in num_set:
            length = 1
            while n+length in num_set: length += 1
            res = max(res, length)
    return res`,
  language: 'python'
},
{
  title: 'Count Distinct Elements Between Queries',
  description: 'Use a HashMap to maintain frequency counts while moving a window or pointers.Efficiently answer multiple queries about distinct elements in subarrays.',
  codeSnippet: `def distinctInSubarrays(nums, queries):
    from collections import defaultdict
    freq = defaultdict(int)
    res = []
    for l, r in queries:
        distinct = 0
        for i in range(l, r+1):
            if freq[nums[i]] == 0: distinct += 1
            freq[nums[i]] += 1
        res.append(distinct)
        for i in range(l, r+1): freq[nums[i]] -= 1
    return res`,
  language: 'python'
},
{
  title: 'Pairs with XOR Equal to K',
  description: 'Use a HashMap to store frequencies of numbers.For each number, check if num XOR K exists to count valid pairs efficiently.',
  codeSnippet: `def countPairsXOR(nums, k):
    freq = {}
    count = 0
    for n in nums:
        count += freq.get(n ^ k, 0)
        freq[n] = freq.get(n, 0) + 1
    return count`,
  language: 'python'
},
{
  title: 'Find Duplicates in Array of Size N+1',
  description: 'Use a HashSet to track seen numbers.The first number that repeats is the duplicate. Works for arrays with elements 1..N.',
  codeSnippet: `def findDuplicate(nums):
    seen = set()
    for n in nums:
        if n in seen: return n
        seen.add(n)`,
  language: 'python'
},
{
  title: 'Find Two Elements with Given Sum in Unsorted Array',
  description: 'Use a HashMap to track seen numbers.For each number, check if complement exists to return the pair in O(n) time.',
  codeSnippet: `def findPair(nums, target):
    seen = {}
    for n in nums:
        if target - n in seen: return [target-n, n]
        seen[n] = True
    return []`,
  language: 'python'
},
{
  title: 'Equal Row and Column Pairs',
  description: 'Use HashMap to store string representations of rows.Compare with each column to count how many rows and columns are identical.',
  codeSnippet: `def equalPairs(grid):
    from collections import Counter
    row_count = Counter(tuple(row) for row in grid)
    return sum(row_count[tuple(col)] for col in zip(*grid))`,
  language: 'python'
},
{
  title: 'Longest Harmonious Subsequence',
  description: 'Use HashMap to count frequencies.A harmonious subsequence has max and min elements differ by 1; iterate to find max length.',
  codeSnippet: `def findLHS(nums):
    from collections import Counter
    freq = Counter(nums)
    return max((freq[x] + freq.get(x+1,0) for x in freq), default=0)`,
  language: 'python'
},
{
  title: 'Number of Boomerangs',
  description: 'Use HashMap to store distance frequencies from each point.Count pairs of points with same distance to a given point to form boomerangs.',
  codeSnippet: `def numberOfBoomerangs(points):
    res = 0
    for x1, y1 in points:
        mp = {}
        for x2, y2 in points:
            d = (x1-x2)**2 + (y1-y2)**2
            mp[d] = mp.get(d,0)+1
        res += sum(v*(v-1) for v in mp.values())
    return res`,
  language: 'python'
},
{
  title: 'Longest Subarray with Ones After K Flips',
  description: 'Use HashMap or sliding window to maximize consecutive 1s after flipping at most K zeros.',
  codeSnippet: `def longestOnes(nums, k):
    left = zeros = res = 0
    for right, n in enumerate(nums):
        if n == 0: zeros += 1
        while zeros > k:
            if nums[left] == 0: zeros -= 1
            left += 1
        res = max(res, right-left+1)
    return res`,
  language: 'python'
},
{
  title: 'Check If N and Its Double Exist',
  description: 'Use HashSet to store seen numbers.For each number, check if its double or half exists to validate the condition.',
  codeSnippet: `def checkIfExist(arr):
    seen = set()
    for n in arr:
        if 2*n in seen or (n%2==0 and n//2 in seen):
            return True
        seen.add(n)
    return False`,
  language: 'python'
},
{
  title: 'Top K Frequent Words',
  description: 'Use HashMap to count word frequencies.Sort words by frequency and lexicographical order to get top K.',
  codeSnippet: `from collections import Counter
def topKFrequent(words, k):
    count = Counter(words)
    return sorted(count.keys(), key=lambda x: (-count[x], x))[:k]`,
  language: 'python'
},
{
  title: 'Repeated DNA Sequences',
  description: 'Use HashMap to track frequency of each 10-letter substring.Return substrings that appear more than once.',
  codeSnippet: `def findRepeatedDnaSequences(s):
    mp = {}
    res = []
    for i in range(len(s)-9):
        sub = s[i:i+10]
        mp[sub] = mp.get(sub,0)+1
        if mp[sub] == 2: res.append(sub)
    return res`,
  language: 'python'
},
{
  title: 'Check If All Characters Have Equal Frequency',
  description: 'Use HashMap to count characters.Check if all frequencies are the same for validation.',
  codeSnippet: `def equalCharFreq(s):
    from collections import Counter
    freq = Counter(s)
    return len(set(freq.values())) == 1`,
  language: 'python'
},
{
  title: 'Find Duplicate Subtrees',
  description: 'Use HashMap to serialize each subtree and count occurrences.Return root nodes of duplicate subtrees.',
  codeSnippet: `def findDuplicateSubtrees(root):
    from collections import defaultdict
    mp, res = defaultdict(int), []
    def dfs(node):
        if not node: return '#'
        s = "{},{},{}".format(node.val, dfs(node.left), dfs(node.right))
        if mp[s] == 1: res.append(node)
        mp[s] += 1
        return s
    dfs(root)
    return res`,
  language: 'python'
},
{
  title: 'Find All Numbers Disappeared in Array',
  description: 'Use HashSet to store numbers.Return numbers in range 1..n that are missing in array.',
  codeSnippet: `def findDisappearedNumbers(nums):
    return [i for i in range(1,len(nums)+1) if i not in set(nums)]`,
  language: 'python'
},
{
  title: 'Max Points on a Line',
  description: 'Use HashMap to count slopes between points.The max number of points sharing the same slope are collinear.',
  codeSnippet: `def maxPoints(points):
    from collections import defaultdict
    res = 0
    for i,(x1,y1) in enumerate(points):
        mp, duplicate = defaultdict(int),1
        for j,(x2,y2) in enumerate(points):
            if i==j: continue
            dx,dy = x2-x1, y2-y1
            if dx==0 and dy==0: duplicate+=1; continue
            g = gcd(dx,dy)
            mp[(dx//g,dy//g)] +=1
        res = max(res, max(mp.values(), default=0)+duplicate)
    return res`,
  language: 'python'
},
{
  title: 'Check If N and Its Double Exist',
  description: 'Use HashSet to check if 2*n exists for any number n in array.',
  codeSnippet: `def checkIfExist(arr):
    s = set()
    for n in arr:
        if 2*n in s or (n%2==0 and n//2 in s): return True
        s.add(n)
    return False`,
  language: 'python'
},
{
  title: 'Find K-diff Pairs in Array',
  description: 'Use HashMap to count elements.Count pairs where absolute difference equals k.',
  codeSnippet: `def findPairs(nums,k):
    from collections import Counter
    if k<0: return 0
    freq,res = Counter(nums),0
    if k==0:
        return sum(1 for v in freq.values() if v>1)
    for n in freq:
        if n+k in freq: res+=1
    return res`,
  language: 'python'
},
{
  title: 'Find All Anagrams in a String',
  description: 'Use HashMap to count characters in pattern.Slide a window over string and compare frequency counts to detect anagrams.',
  codeSnippet: `def findAnagrams(s, p):
    from collections import Counter
    p_count, s_count = Counter(p), Counter(s[:len(p)-1])
    res = []
    for i in range(len(p)-1, len(s)):
        s_count[s[i]] += 1
        if s_count == p_count: res.append(i-len(p)+1)
        s_count[s[i-len(p)+1]] -= 1
        if s_count[s[i-len(p)+1]]==0: del s_count[s[i-len(p)+1]]
    return res`,
  language: 'python'
},
{
  title: 'Encode and Decode TinyURL',
  description: 'Use HashMap to store original to short URL mapping and vice versa for O(1) access.',
  codeSnippet: `class Codec:
    def __init__(self):
        self.mp, self.id = {}, 0
    def encode(self, longUrl):
        self.id += 1
        self.mp[self.id] = longUrl
        return "http://tinyurl.com/"+str(self.id)
    def decode(self, shortUrl):
        id = int(shortUrl.split('/')[-1])
        return self.mp[id]`,
  language: 'python'
},
{
  title: 'Number of Good Pairs',
  description: 'Use HashMap to count occurrences of numbers.Count pairs where nums[i] == nums[j] and i<j.',
  codeSnippet: `def numIdenticalPairs(nums):
    from collections import Counter
    c = Counter(nums)
    return sum(v*(v-1)//2 for v in c.values())`,
  language: 'python'
},
{
  title: 'Pairs of Songs With Total Durations Divisible by 60',
  description: 'Use HashMap to count remainders modulo 60.Pairs sum divisible by 60 using complement remainder counts.',
  codeSnippet: `def numPairsDivisibleBy60(time):
    mp,res = {},0
    for t in time:
        rem = t%60
        res += mp.get((60-rem)%60,0)
        mp[rem] = mp.get(rem,0)+1
    return res`,
  language: 'python'
},
{
  title: 'Longest Substring with At Most Two Distinct Characters',
  description: 'Use HashMap to count characters in sliding window.Shrink window if distinct count > 2 to find max length substring.',
  codeSnippet: `def lengthOfLongestSubstringTwoDistinct(s):
    from collections import defaultdict
    mp,left,res = defaultdict(int),0,0
    for right,c in enumerate(s):
        mp[c]+=1
        while len(mp)>2:
            mp[s[left]]-=1
            if mp[s[left]]==0: del mp[s[left]]
            left+=1
        res=max(res,right-left+1)
    return res`,
  language: 'python'
}
];
  }

  private getStringHints(): Hint[] {
    return [
      {
        title: 'String Reversal',
        description: 'Reverse a string using slicing',
        codeSnippet: `def reverse_string(s):
    return s[::-1]`,
        language: 'python'
      },
      {
        title: 'Palindrome Check',
        description: 'Check if a string is a palindrome',
        codeSnippet: `def is_palindrome(s):
    left, right = 0, len(s)-1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True`,
        language: 'python'
      },
      {
        title: 'Character Frequency',
        description: 'Count character frequencies',
        codeSnippet: `from collections import Counter
char_count = Counter(s)`,
        language: 'python'
      },
      {
        title: 'String Splitting',
        description: 'Split strings into words or parts',
        codeSnippet: `words = s.split()  # Split by whitespace
parts = s.split(",")  # Split by comma`,
        language: 'python'
      },
      {
        title: 'String Joining',
        description: 'Join elements into a string',
        codeSnippet: `words = ["Hello", "World"]
result = " ".join(words)  # "Hello World"`,
        language: 'python'
      },
      {
  "title": "Longest Palindromic Substring",
  "description": "Expand around centers to find longest substring which is a palindrome.",
  "codeSnippet": "def longest_palindrome(s):\n    def expand(l,r):\n        while l>=0 and r<len(s) and s[l]==s[r]:\n            l-=1; r+=1\n        return s[l+1:r]\n    res = ''\n    for i in range(len(s)):\n        res = max(res, expand(i,i), expand(i,i+1), key=len)\n    return res",
  "language": "python"
},
{
  "title": "Longest Substring Without Repeating Characters",
  "description": "Use sliding window and HashMap to track last seen characters.",
  "codeSnippet": "def length_of_longest_substring(s):\n    seen = {}\n    left = res = 0\n    for right, char in enumerate(s):\n        if char in seen and seen[char] >= left:\n            left = seen[char]+1\n        seen[char]=right\n        res = max(res, right-left+1)\n    return res",
  "language": "python"
},
{
  "title": "Valid Anagram",
  "description": "Count character frequencies using HashMap or array and compare for two strings.",
  "codeSnippet": "from collections import Counter\n\ndef is_anagram(s,t):\n    return Counter(s)==Counter(t)",
  "language": "python"
},
{
  "title": "Valid Parentheses",
  "description": "Use a stack to match opening and closing brackets.",
  "codeSnippet": "def is_valid(s):\n    stack = []\n    pairs = {'(':')','{':'}','[':']'}\n    for c in s:\n        if c in pairs: stack.append(c)\n        elif not stack or pairs[stack.pop()]!=c: return False\n    return not stack",
  "language": "python"
},
{
  "title": "Longest Common Prefix",
  "description": "Compare characters column-wise or use divide-and-conquer to find common prefix.",
  "codeSnippet": "def longest_common_prefix(strs):\n    if not strs: return ''\n    prefix = strs[0]\n    for s in strs[1:]:\n        while not s.startswith(prefix):\n            prefix = prefix[:-1]\n    return prefix",
  "language": "python"
},
{
  "title": "Implement strStr() / Substring Search",
  "description": "Use Python find/index or sliding window to locate substring.",
  "codeSnippet": "def strStr(haystack, needle):\n    return haystack.find(needle)",
  "language": "python"
},
{
  "title": "Count and Say",
  "description": "Generate sequence by reading previous term and counting consecutive digits.",
  "codeSnippet": "def count_and_say(n):\n    s='1'\n    for _ in range(n-1):\n        res = ''\n        i=0\n        while i<len(s):\n            count=1\n            while i+1<len(s) and s[i]==s[i+1]:\n                i+=1; count+=1\n            res+=str(count)+s[i]\n            i+=1\n        s=res\n    return s",
  "language": "python"
},
{
  "title": "String to Integer (atoi)",
  "description": "Parse string and handle whitespaces, optional signs, and numeric conversion.",
  "codeSnippet": "def myAtoi(s):\n    s = s.strip()\n    if not s: return 0\n    sign=1; i=0\n    if s[0] in ['+','-']: sign = -1 if s[0]=='-' else 1; i=1\n    num=0\n    while i<len(s) and s[i].isdigit():\n        num = num*10+int(s[i]); i+=1\n    num = max(-2**31, min(num*sign,2**31-1))\n    return num",
  "language": "python"
},
{
  "title": "String Compression",
  "description": "Compress repeated characters using counts.",
  "codeSnippet": "def compress(chars):\n    write=0,i=0\n    while i<len(chars):\n        char=chars[i]; count=0\n        while i<len(chars) and chars[i]==char: i+=1; count+=1\n        chars[write]=char; write+=1\n        if count>1:\n            for c in str(count): chars[write]=c; write+=1\n    return write",
  "language": "python"
},
{
  "title": "Repeated Substring Pattern",
  "description": "Check if string can be constructed by repeating a substring using concatenation or string search.",
  "codeSnippet": "def repeated_substring_pattern(s):\n    return s in (s+s)[1:-1]",
  "language": "python"
},
{
  "title": "Multiply Strings",
  "description": "Simulate multiplication like manual digit multiplication using arrays to handle big integers.",
  "codeSnippet": "def multiply(num1,num2):\n    res=[0]*(len(num1)+len(num2))\n    for i in range(len(num1)-1,-1,-1):\n        for j in range(len(num2)-1,-1,-1):\n            res[i+j+1]+=int(num1[i])*int(num2[j])\n    for i in range(len(res)-1,0,-1):\n        res[i-1]+=res[i]//10; res[i]%=10\n    return ''.join(map(str,res)).lstrip('0') or '0'",
  "language": "python"
},
{
  "title": "Decode String",
  "description": "Use stack to decode strings like '3[a2[b]]' by storing repeat counts and partial strings.",
  "codeSnippet": "def decode_string(s):\n    stack,num,cur=[],0,''\n    for c in s:\n        if c.isdigit(): num=num*10+int(c)\n        elif c=='[': stack.append((cur,num)); cur=''; num=0\n        elif c==']': last_num=stack.pop(); cur=last_num[0]+cur*last_num[1]\n        else: cur+=c\n    return cur",
  "language": "python"
},
{
  "title": "Remove Duplicate Letters",
  "description": "Use stack and last occurrence index to keep smallest lexicographical result without duplicates.",
  "codeSnippet": "def remove_duplicate_letters(s):\n    last={c:i for i,c in enumerate(s)}\n    stack=set(); res=[]\n    for i,c in enumerate(s):\n        if c in stack: continue\n        while res and c<res[-1] and i<last[res[-1]]: stack.remove(res.pop())\n        res.append(c); stack.add(c)\n    return ''.join(res)",
  "language": "python"
},
{
  "title": "Count Palindromic Substrings",
  "description": "Expand around centers to count all substrings that are palindromes.",
  "codeSnippet": "def count_substrings(s):\n    res=0\n    for i in range(len(s)):\n        l,r=i,i\n        while l>=0 and r<len(s) and s[l]==s[r]: res+=1;l-=1;r+=1\n        l,r=i,i+1\n        while l>=0 and r<len(s) and s[l]==s[r]: res+=1;l-=1;r+=1\n    return res",
  "language": "python"
},
{
  "title": "Valid Palindrome with Alphanumeric",
  "description": "Ignore non-alphanumeric characters and compare lowercase letters from both ends.",
  "codeSnippet": "def is_palindrome_alnum(s):\n    s=[c.lower() for c in s if c.isalnum()]\n    return s==s[::-1]",
  "language": "python"
},
  {
  "title": "ZigZag Conversion",
  "description": "Simulate zigzag pattern by using multiple string builders for each row.",
  "codeSnippet": "def convert(s,numRows):\n    if numRows==1: return s\n    rows=['']*numRows; i,step=0,1\n    for c in s:\n        rows[i]+=c\n        if i==0: step=1\n        elif i==numRows-1: step=-1\n        i+=step\n    return ''.join(rows)",
  "language": "python"
},
{
  "title": "Longest Palindromic Subsequence",
  "description": "Use dynamic programming to find longest subsequence that forms a palindrome.",
  "codeSnippet": "def longest_pal_subseq(s):\n    n=len(s); dp=[[0]*n for _ in range(n)]\n    for i in range(n-1,-1,-1):\n        dp[i][i]=1\n        for j in range(i+1,n):\n            if s[i]==s[j]: dp[i][j]=dp[i+1][j-1]+2\n            else: dp[i][j]=max(dp[i+1][j],dp[i][j-1])\n    return dp[0][n-1]",
  "language": "python"
},
{
  "title": "Remove All Adjacent Duplicates",
  "description": "Use stack to remove duplicates iteratively until no adjacent duplicates remain.",
  "codeSnippet": "def remove_adj_dup(s):\n    stack=[]\n    for c in s:\n        if stack and stack[-1]==c: stack.pop()\n        else: stack.append(c)\n    return ''.join(stack)",
  "language": "python"
},
{
  "title": "Reverse Words in a String",
  "description": "Split string by spaces, reverse the words list, and join back.",
  "codeSnippet": "def reverse_words(s):\n    return ' '.join(s.strip().split()[::-1])",
  "language": "python"
},
{
  "title": "Length of Last Word",
  "description": "Trim spaces and find length of last word by splitting.",
  "codeSnippet": "def length_of_last_word(s):\n    return len(s.strip().split()[-1])",
  "language": "python"
},
{
  "title": "Add Binary Strings",
  "description": "Simulate addition by iterating from the end with carry handling.",
  "codeSnippet": "def add_binary(a,b):\n    res=''; carry=0\n    i,j=len(a)-1,len(b)-1\n    while i>=0 or j>=0 or carry:\n        x=carry+(int(a[i]) if i>=0 else 0)+(int(b[j]) if j>=0 else 0)\n        res=str(x%2)+res; carry=x//2; i-=1;j-=1\n    return res",
  "language": "python"
},
{
  "title": "Excel Sheet Column Number",
  "description": "Convert column string like 'AB' to number using positional base-26 logic.",
  "codeSnippet": "def title_to_number(s):\n    res=0\n    for c in s: res=res*26+ord(c)-ord('A')+1\n    return res",
  "language": "python"
},
{
  "title": "Decode Ways",
  "description": "Dynamic programming to count ways digits can be decoded into letters.",
  "codeSnippet": "def num_decodings(s):\n    if not s or s[0]=='0': return 0\n    dp=[0]*(len(s)+1); dp[0]=1; dp[1]=1\n    for i in range(2,len(s)+1):\n        if s[i-1]!='0': dp[i]+=dp[i-1]\n        if 10<=int(s[i-2:i])<=26: dp[i]+=dp[i-2]\n    return dp[-1]",
  "language": "python"
},
{
  "title": "String Explosion / Backspace Compare",
  "description": "Use stack to simulate typing with backspaces.",
  "codeSnippet": "def backspace_compare(s,t):\n    def build(string):\n        stack=[]\n        for c in string:\n            if c=='#' and stack: stack.pop()\n            elif c!='#': stack.append(c)\n        return stack\n    return build(s)==build(t)",
  "language": "python"
},
{
  title: 'Encode and Decode TinyURL',
  description: 'Use two HashMaps for encoding and decoding. Generate random codes and map them to original URLs bidirectionally.',
  codeSnippet: `class Codec:
    def __init__(self):
        self.encode_map = {}
        self.decode_map = {}
        self.base = "http://tinyurl.com/"
        self.chars = string.ascii_letters + string.digits

    def encode(self, longUrl: str) -> str:
        while longUrl not in self.encode_map:
            code = ''.join(random.choice(self.chars) for _ in range(6))
            if code not in self.decode_map:
                self.encode_map[longUrl] = code
                self.decode_map[code] = longUrl
        return self.base + self.encode_map[longUrl]

    def decode(self, shortUrl: str) -> str:
        return self.decode_map[shortUrl[-6:]]`,
  language: 'python'
},
{
  title: 'Repeated DNA Sequences',
  description: 'Use HashSet to track seen sequences. Find all 10-letter sequences that appear more than once in DNA string.',
  codeSnippet: `def findRepeatedDnaSequences(s):
    seen = set()
    result = set()
    for i in range(len(s) - 9):
        sequence = s[i:i+10]
        if sequence in seen:
            result.add(sequence)
        else:
            seen.add(sequence)
    return list(result)`,
  language: 'python'
},{
  title: 'Number of Atoms',
  description: 'Use stack and HashMap to parse chemical formula. Handle parentheses and counts to count atoms in chemical formula.',
  codeSnippet: `def countOfAtoms(formula):
    stack = [collections.Counter()]
    i = 0
    n = len(formula)
    while i < n:
        if formula[i] == '(':
            stack.append(collections.Counter())
            i += 1
        elif formula[i] == ')':
            top = stack.pop()
            i += 1
            start = i
            while i < n and formula[i].isdigit():
                i += 1
            multiplier = int(formula[start:i] or 1)
            for atom, count in top.items():
                stack[-1][atom] += count * multiplier
        else:
            start = i
            i += 1
            while i < n and formula[i].islower():
                i += 1
            atom = formula[start:i]
            start = i
            while i < n and formula[i].isdigit():
                i += 1
            count = int(formula[start:i] or 1)
            stack[-1][atom] += count
    return ''.join(atom + (str(count) if count > 1 else '')
                   for atom, count in sorted(stack[-1].items()))`,
  language: 'python'
},
{
  title: 'Brick Wall',
  description: 'Count edge positions using HashMap. The least bricks cross through the position with most edge occurrences.',
  codeSnippet: `def leastBricks(wall):
    edge_count = {}
    for row in wall:
        position = 0
        for i in range(len(row) - 1):
            position += row[i]
            edge_count[position] = edge_count.get(position, 0) + 1
    if not edge_count:
        return len(wall)
    return len(wall) - max(edge_count.values())`,
  language: 'python'
},
{
  title: 'Set Mismatch',
  description: 'Use array as HashMap by marking visited numbers. Find duplicate and missing number by tracking positive/negative states.',
  codeSnippet: `def findErrorNums(nums):
    result = []
    for num in nums:
        if nums[abs(num)-1] < 0:
            result.append(abs(num))
        else:
            nums[abs(num)-1] *= -1
    for i in range(len(nums)):
        if nums[i] > 0:
            result.append(i+1)
    return result`,
  language: 'python'
},
{
  title: 'Find Anagram Mappings',
  description: 'Create mapping from B values to indices. For each element in A, find corresponding index in B using the mapping.',
  codeSnippet: `def anagramMappings(A, B):
    mapping = {}
    for i, num in enumerate(B):
        mapping[num] = i
    return [mapping[num] for num in A]`,
  language: 'python'
},
{
  title: 'Continuous Subarray Sum',
  description: 'Use prefix sum with modulo properties. If same modulo result appears again, subarray sum is multiple of k.',
  codeSnippet: `def checkSubarraySum(nums, k):
    prefix_map = {0: -1}
    current_sum = 0
    for i, num in enumerate(nums):
        current_sum += num
        if k != 0:
            current_sum %= k
        if current_sum in prefix_map:
            if i - prefix_map[current_sum] > 1:
                return True
        else:
            prefix_map[current_sum] = i
    return False`,
  language: 'python'
},
{
  title: '4Sum II',
  description: 'Count sum pairs from first two arrays. Check for complementary sums from other two arrays for O(n²) solution.',
  codeSnippet: `def fourSumCount(A, B, C, D):
    count = 0
    sum_map = {}
    for a in A:
        for b in B:
            sum_map[a + b] = sum_map.get(a + b, 0) + 1
    for c in C:
        for d in D:
            count += sum_map.get(-(c + d), 0)
    return count`,
  language: 'python'
},
{
  title: 'Sort Characters By Frequency',
  description: 'Count character frequencies using HashMap, then sort by frequency descending to reconstruct the string accordingly.',
  codeSnippet: `def frequencySort(s):
    freq = {}
    for char in s:
        freq[char] = freq.get(char, 0) + 1
    sorted_chars = sorted(freq.keys(), key=lambda x: -freq[x])
    return ''.join(char * freq[char] for char in sorted_chars)`,
  language: 'python'
},
{
  title: 'Keyboard Row',
  description: 'Use HashMap to map characters to their keyboard rows. Check if all characters of a word belong to same row.',
  codeSnippet: `def findWords(words):
    rows = {
        'q': 1, 'w': 1, 'e': 1, 'r': 1, 't': 1, 'y': 1, 'u': 1, 'i': 1, 'o': 1, 'p': 1,
        'a': 2, 's': 2, 'd': 2, 'f': 2, 'g': 2, 'h': 2, 'j': 2, 'k': 2, 'l': 2,
        'z': 3, 'x': 3, 'c': 3, 'v': 3, 'b': 3, 'n': 3, 'm': 3
    }
    result = []
    for word in words:
        if not word:
            continue
        row = rows[word[0].lower()]
        valid = True
        for char in word[1:]:
            if rows[char.lower()] != row:
                valid = False
                  break
        if valid:
            result.append(word)
    return result`,
  language: 'python'
},
{
  title: 'Time Based Key-Value Store',
  description: 'Use HashMap with timestamps as keys. Binary search to find most recent timestamp for a given key.',
  codeSnippet: `class TimeMap:
    def __init__(self):
        self.store = {}

    def set(self, key: str, value: str, timestamp: int) -> None:
        if key not in self.store:
            self.store[key] = []
        self.store[key].append((timestamp, value))

    def get(self, key: str, timestamp: int) -> str:
        if key not in self.store:
            return ""
        arr = self.store[key]
        left, right = 0, len(arr) - 1
        while left <= right:
            mid = (left + right) // 2
              if arr[mid][0] <= timestamp:
                left = mid + 1
            else:
                right = mid - 1
        return arr[right][1] if right >= 0 else ""`,
  language: 'python'
},
{
  title: 'Design HashSet',
  description: 'Implement basic HashSet operations: add, remove, contains. Use array of linked lists for chaining collision handling.',
  codeSnippet: `class MyHashSet:
    def __init__(self):
        self.size = 1000
        self.buckets = [[] for _ in range(self.size)]

    def add(self, key: int) -> None:
        bucket = self.buckets[key % self.size]
        if key not in bucket:
            bucket.append(key)

    def remove(self, key: int) -> None:
        bucket = self.buckets[key % self.size]
            if key in bucket:
            bucket.remove(key)

    def contains(self, key: int) -> bool:
        bucket = self.buckets[key % self.size]
        return key in bucket`,
  language: 'python'
},
{
  title: 'Design HashMap',
  description: 'Implement basic HashMap operations: put, get, remove. Use array of linked lists for chaining collision resolution.',
  codeSnippet: `class MyHashMap:
    def __init__(self):
        self.size = 1000
        self.buckets = [[] for _ in range(self.size)]

    def put(self, key: int, value: int) -> None:
        bucket = self.buckets[key % self.size]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        bucket.append((key, value))

    def get(self, key: int) -> int:
        bucket = self.buckets[key % self.size]
        for k, v in bucket:
           if k == key:
                return v
        return -1

    def remove(self, key: int) -> None:
        bucket = self.buckets[key % self.size]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                del bucket[i]
                return`,
  language: 'python'
},
{
  title: '4Sum II',
  description: 'Count sum pairs from first two arrays. Check for complementary sums from other two arrays for O(n²) solution.',
  codeSnippet: `def fourSumCount(A, B, C, D):
    count = 0
    sum_map = {}
    for a in A:
        for b in B:
            sum_map[a + b] = sum_map.get(a + b, 0) + 1
    for c in C:
        for d in D:
            count += sum_map.get(-(c + d), 0)
    return count`,
  language: 'python'
},
{
  title: 'Set Mismatch',
  description: 'Use array as HashMap by marking visited numbers. Find duplicate and missing number by tracking positive/negative states.',
  codeSnippet: `def findErrorNums(nums):
    result = []
    for num in nums:
        if nums[abs(num)-1] < 0:
            result.append(abs(num))
        else:
            nums[abs(num)-1] *= -1
    for i in range(len(nums)):
        if nums[i] > 0:
            result.append(i+1)
    return result`,
  language: 'python'
},
{
  "title": "Count and Say",
  "description": "Generate sequence iteratively by counting consecutive digits of previous term.",
  "codeSnippet": "def count_and_say(n):\n    s='1'\n    for _ in range(n-1):\n        prev=''; i=0\n        while i<len(s):\n            count=1\n            while i+1<len(s) and s[i]==s[i+1]: i+=1; count+=1\n            prev+=str(count)+s[i]; i+=1\n        s=prev\n    return s",
  "language": "python"
},
{
  "title": "Simplify Path",
  "description": "Use stack to process directory path components, handling '.', '..', and extra slashes.",
  "codeSnippet": "def simplify_path(path):\n    stack=[]\n    for p in path.split('/'):\n        if p=='..' and stack: stack.pop()\n        elif p and p!='.': stack.append(p)\n    return '/'+'/'.join(stack)",
  "language": "python"
},
{
  "title": "License Key Formatting",
  "description": "Use string manipulation to group characters in uppercase and add dashes appropriately.",
  "codeSnippet": "def license_key_formatting(s,k):\n    s=s.replace('-','').upper(); res=''\n    for i,c in enumerate(reversed(s)):\n        if i%k==0 and i!=0: res+='-'\n        res+=c\n    return res[::-1]",
  "language": "python"
},
{
  "title": "Integer to Roman",
  "description": "Map values to symbols and build Roman numeral from highest to lowest.",
  "codeSnippet": "def int_to_roman(num):\n    vals=[1000,900,500,400,100,90,50,40,10,9,5,4,1]\n    syms='M CM D CD C XC L XL X IX V IV I'.split()\n    res=''\n    for v,s in zip(vals,syms): res+=s*(num//v); num%=v\n    return res",
  "language": "python"
},
{
  "title": "Roman to Integer",
  "description": "Scan string, adding/subtracting values based on Roman numeral rules.",
  "codeSnippet": "def roman_to_int(s):\n    vals={'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000}; res=0\n    for i in range(len(s)):\n        if i+1<len(s) and vals[s[i]]<vals[s[i+1]]: res-=vals[s[i]]\n        else: res+=vals[s[i]]\n    return res",
  "language": "python"
},
{
  "title": "Expression Add Operators",
  "description": "Backtracking to insert '+','-','*' operators and evaluate expressions to match target.",
  "codeSnippet": "def addOperators(num,target):\n    res=[]\n    def backtrack(expr,pos,prev,cur):\n        if pos==len(num) and cur==target: res.append(expr); return\n        for i in range(pos+1,len(num)+1):\n            n=num[pos:i]; if len(n)>1 and n[0]=='0': break; n=int(n)\n            if pos==0: backtrack(str(n),i,n,n)\n            else:\n                backtrack(expr+'+'+str(n),i,n,cur+n)\n                backtrack(expr+'-'+str(n),i,-n,cur-n)\n                backtrack(expr+'*'+str(n),i,prev*n,cur-prev+prev*n)\n    backtrack('',0,0,0); return res",
  "language": "python"
}
   ];
  }

  private getLinkedListHints(): Hint[] {
    return [
    {
  "title": "Reverse Linked List",
  "description": "Reverse a singly linked list iteratively or recursively by changing next pointers.",
  "codeSnippet": "def reverse_list(head):\n    prev=None\n    while head:\n        nxt=head.next\n        head.next=prev\n        prev=head\n        head=nxt\n    return prev",
  "language": "python"
},
{
        title: 'Fast and Slow Pointers',
        description: 'Find middle node or detect cycles',
        codeSnippet: `slow = fast = head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
# slow is now at middle`,
        language: 'python'
      },
   {
  "title": "Detect Cycle in Linked List",
  "description": "Use Floyd’s Tortoise and Hare (slow and fast pointers) to detect a cycle.",
  "codeSnippet": "def has_cycle(head):\n    slow=fast=head\n    while fast and fast.next:\n        slow=slow.next\n        fast=fast.next.next\n        if slow==fast: return True\n    return False",
  "language": "python"
},
{
  "title": "Find Cycle Start Node",
  "description": "Once cycle is detected, reset one pointer to head and move both one step at a time to find the start of the loop.",
  "codeSnippet": "def detect_cycle(head):\n    slow=fast=head\n    while fast and fast.next:\n        slow=slow.next\n        fast=fast.next.next\n        if slow==fast:\n            ptr=head\n            while ptr!=slow:\n                ptr=ptr.next\n                slow=slow.next\n            return ptr\n    return None",
  "language": "python"
},
      {
  "title": "Find Cycle Start Node",
  "description": "Once cycle is detected, reset one pointer to head and move both one step at a time to find the start of the loop.",
  "codeSnippet": "def detect_cycle(head):\n    slow=fast=head\n    while fast and fast.next:\n        slow=slow.next\n        fast=fast.next.next\n        if slow==fast:\n            ptr=head\n            while ptr!=slow:\n                ptr=ptr.next\n                slow=slow.next\n            return ptr\n    return None",
  "language": "python"
},
{
  "title": "Merge Two Sorted Lists",
  "description": "Merge two sorted linked lists into a single sorted list using pointers.",
  "codeSnippet": "def merge_two_lists(l1,l2):\n    dummy=tail=ListNode(0)\n    while l1 and l2:\n        if l1.val<l2.val: tail.next=l1; l1=l1.next\n        else: tail.next=l2; l2=l2.next\n        tail=tail.next\n    tail.next=l1 or l2\n    return dummy.next",
  "language": "python"
},
{
  "title": "Remove N-th Node From End",
  "description": "Use two pointers separated by n nodes to remove the n-th node from end in one pass.",
  "codeSnippet": "def remove_nth_from_end(head,n):\n    dummy=ListNode(0); dummy.next=head\n    first=second=dummy\n    for _ in range(n+1): first=first.next\n    while first: first=first.next; second=second.next\n    second.next=second.next.next\n    return dummy.next",
  "language": "python"
},
{
  "title": "Palindrome Linked List",
  "description": "Use slow/fast pointers to find middle, reverse second half, and compare both halves.",
  "codeSnippet": "def is_palindrome(head):\n    slow=fast=head\n    while fast and fast.next: slow=slow.next; fast=fast.next.next\n    prev=None\n    while slow: nxt=slow.next; slow.next=prev; prev=slow; slow=nxt\n    left,right=head,prev\n    while right:\n        if left.val!=right.val: return False\n        left=left.next; right=right.next\n    return True",
  "language": "python"
},
{
  "title": "Linked List Cycle Length",
  "description": "After detecting cycle, keep one pointer fixed and move the other until it meets again to count length.",
  "codeSnippet": "def cycle_length(head):\n    slow=fast=head\n    while fast and fast.next:\n        slow=slow.next; fast=fast.next.next\n        if slow==fast:\n            length=1\n            fast=fast.next\n            while slow!=fast: fast=fast.next; length+=1\n            return length\n    return 0",
  "language": "python"
},
{
  "title": "Intersection of Two Linked Lists",
  "description": "Use two pointers; when one reaches end, redirect to the head of the other list to find intersection.",
  "codeSnippet": "def get_intersection_node(headA,headB):\n    a,b=headA,headB\n    while a!=b:\n        a=a.next if a else headB\n        b=b.next if b else headA\n    return a",
  "language": "python"
},
{
  "title": "Remove Duplicates from Sorted List",
  "description": "Iterate through sorted list and skip nodes with duplicate values.",
  "codeSnippet": "def delete_duplicates(head):\n    cur=head\n    while cur and cur.next:\n        if cur.val==cur.next.val: cur.next=cur.next.next\n        else: cur=cur.next\n    return head",
  "language": "python"
},
{
  "title": "Remove All Duplicates from Sorted List II",
  "description": "Remove all nodes that have duplicates, leaving only distinct values.",
  "codeSnippet": "def delete_all_duplicates(head):\n    dummy=ListNode(0); dummy.next=head\n    prev=dummy; cur=head\n    while cur:\n        while cur.next and cur.val==cur.next.val: cur=cur.next\n        if prev.next==cur: prev=prev.next\n        else: prev.next=cur.next\n        cur=cur.next\n    return dummy.next",
  "language": "python"
},
{
  "title": "Odd Even Linked List",
  "description": "Reorder a linked list so that all odd-indexed nodes come before even-indexed nodes while maintaining relative order.",
  "codeSnippet": "def odd_even_list(head):\n    if not head: return None\n    odd,even,even_head=head,head.next,head.next\n    while even and even.next:\n        odd.next=even.next; odd=odd.next\n        even.next=odd.next; even=even.next\n    odd.next=even_head\n    return head",
  "language": "python"
},
{
  "title": "Flatten a Multilevel Doubly Linked List",
  "description": "Traverse and flatten a doubly linked list where nodes may have a child pointer to another list.",
  "codeSnippet": "def flatten(head):\n    if not head: return None\n    stack=[head]; prev=None\n    while stack:\n        curr=stack.pop()\n        if prev: prev.next=curr; curr.prev=prev\n        if curr.next: stack.append(curr.next)\n        if curr.child: stack.append(curr.child); curr.child=None\n        prev=curr\n    return head",
  "language": "python"
},
{
  "title": "Reorder List",
  "description": "Reorder linked list from L0→L1→…→Ln to L0→Ln→L1→Ln-1… using middle and reverse techniques.",
  "codeSnippet": "def reorder_list(head):\n    if not head: return\n    # Find middle\n    slow=fast=head\n    while fast and fast.next: slow=slow.next; fast=fast.next.next\n    # Reverse second half\n    prev=None; cur=slow.next; slow.next=None\n    while cur: nxt=cur.next; cur.next=prev; prev=cur; cur=nxt\n    # Merge two halves\n    first,second=head,prev\n    while second:\n        tmp1,tmp2=first.next,second.next\n        first.next=second; second.next=tmp1\n        first,second=tmp1,tmp2",
  "language": "python"
},
{
  "title": "Rotate Linked List",
  "description": "Rotate the linked list to the right by k places using list length and connecting end to head temporarily.",
  "codeSnippet": "def rotate_right(head,k):\n    if not head: return None\n    # Find length\n    length=1; tail=head\n    while tail.next: tail=tail.next; length+=1\n    k%=length\n    if k==0: return head\n    tail.next=head\n    for _ in range(length-k): tail=tail.next\n    new_head=tail.next; tail.next=None\n    return new_head",
  "language": "python"
},
{
  "title": "Copy List with Random Pointer (Alternative)",
  "description": "Copy linked list with random pointers in-place using node interleaving technique to avoid extra hashmap.",
  "codeSnippet": "def copy_random_list(head):\n    if not head: return None\n    # Interleave copied nodes\n    cur=head\n    while cur: nxt=cur.next; copy=Node(cur.val); cur.next=copy; copy.next=nxt; cur=nxt\n    # Assign random pointers\n    cur=head\n    while cur:\n        if cur.random: cur.next.random=cur.random.next\n        cur=cur.next.next\n    # Separate lists\n    cur=head; copy_head=head.next\n    while cur:\n        copy=cur.next\n        cur.next=copy.next; copy.next=copy.next.next if copy.next else None\n        cur=cur.next\n    return copy_head",
  "language": "python"
},
{
  "title": "Add Two Numbers",
  "description": "Add two numbers represented by linked lists digit by digit with carry handling.",
  "codeSnippet": "def add_two_numbers(l1,l2):\n    dummy=tail=ListNode(0); carry=0\n    while l1 or l2 or carry:\n        val=carry+(l1.val if l1 else 0)+(l2.val if l2 else 0)\n        carry,val=divmod(val,10)\n        tail.next=ListNode(val); tail=tail.next\n        l1=l1.next if l1 else None\n        l2=l2.next if l2 else None\n    return dummy.next",
  "language": "python"
},
{
  "title": "Add Two Numbers II (Reverse Not Allowed)",
  "description": "Add two numbers represented by linked lists without reversing them using stacks for carry propagation.",
  "codeSnippet": "def add_two_numbers_ii(l1,l2):\n    s1,s2=[],[]\n    while l1: s1.append(l1.val); l1=l1.next\n    while l2: s2.append(l2.val); l2=l2.next\n    carry=None; head=None\n    carry=0\n    while s1 or s2 or carry:\n        val=carry+(s1.pop() if s1 else 0)+(s2.pop() if s2 else 0)\n        carry,val=divmod(val,10)\n        node=ListNode(val); node.next=head; head=node\n    return head",
  "language": "python"
},
{
  "title": "Split Linked List in Parts",
  "description": "Split a linked list into k parts as equally as possible, distributing extra nodes to first parts.",
  "codeSnippet": "def split_list(head,k):\n    # Find length\n    n=0; cur=head\n    while cur: n+=1; cur=cur.next\n    part_size,extra=divmod(n,k)\n    parts=[]; cur=head\n    for _ in range(k):\n        head_part=cur\n        for _ in range(part_size+(extra>0)-1 if cur else 0): cur=cur.next\n        if cur: nxt=cur.next; cur.next=None; cur=nxt\n        parts.append(head_part); extra-=1\n    return parts",
  "language": "python"
},
{
  "title": "Rotate Doubly Linked List",
  "description": "Rotate a doubly linked list by k nodes efficiently by adjusting next and prev pointers.",
  "codeSnippet": "def rotate_dll(head,k):\n    if not head or k==0: return head\n    tail=head; n=1\n    while tail.next: tail=tail.next; n+=1\n    k%=n\n    if k==0: return head\n    cur=head; for _ in range(n-k-1): cur=cur.next\n    new_head=cur.next; cur.next=None; new_head.prev=None\n    tail.next=head; head.prev=tail\n    return new_head",
  "language": "python"
},
{
  "title": "Reverse Nodes in k-Group",
  "description": "Reverse nodes in a linked list k at a time. Leave remaining nodes if less than k.",
  "codeSnippet": "def reverse_k_group(head,k):\n    def reverse(start,end): prev=None; cur=start\n        while cur!=end: nxt=cur.next; cur.next=prev; prev=cur; cur=nxt\n        return prev\n    dummy=ListNode(0); dummy.next=head; group_prev=dummy\n    while True:\n        kth=group_prev\n        for _ in range(k): kth=kth.next; if not kth: return dummy.next\n        group_next=kth.next; prev,next_head=group_prev.next,group_next\n        group_prev.next=reverse(prev,kth.next); prev.next=next_head\n        group_prev=prev",
  "language": "python"
},
{
  "title": "Remove Nth Node From End",
  "description": "Remove the Nth node from the end in one pass using two pointers with a gap of n nodes.",
  "codeSnippet": "def remove_nth_from_end(head,n):\n    dummy=ListNode(0); dummy.next=head; first=second=dummy\n    for _ in range(n+1): first=first.next\n    while first: first=first.next; second=second.next\n    second.next=second.next.next\n    return dummy.next",
  "language": "python"
},
{
  "title": "Detect Cycle in Linked List",
  "description": "Use fast and slow pointers to detect if a cycle exists in the linked list.",
  "codeSnippet": "def has_cycle(head):\n    slow=fast=head\n    while fast and fast.next:\n        slow=slow.next; fast=fast.next.next\n        if slow==fast: return True\n    return False",
  "language": "python"
},
{
  "title": "Linked List Cycle II",
  "description": "If a cycle exists, find the starting node using fast/slow pointers and distance logic.",
  "codeSnippet": "def detect_cycle(head):\n    slow=fast=head\n    while fast and fast.next:\n        slow=slow.next; fast=fast.next.next\n        if slow==fast:\n            slow=head\n            while slow!=fast: slow=slow.next; fast=fast.next\n            return slow\n    return None",
  "language": "python"
},
{
  "title": "Palindrome Linked List",
  "description": "Check if linked list is palindrome by reversing second half and comparing with first half.",
  "codeSnippet": "def is_palindrome(head):\n    slow=fast=head\n    while fast and fast.next: slow=slow.next; fast=fast.next.next\n    prev=None; cur=slow\n    while cur: nxt=cur.next; cur.next=prev; prev=cur; cur=nxt\n    left, right=head, prev\n    while right: if left.val!=right.val: return False; left=left.next; right=right.next\n    return True",
  "language": "python"
},
{
  "title": "Intersection of Two Linked Lists",
  "description": "Find the intersection node of two singly linked lists using two-pointer technique.",
  "codeSnippet": "def get_intersection_node(headA,headB):\n    a,b=headA,headB\n    while a!=b: a=a.next if a else headB; b=b.next if b else headA\n    return a",
  "language": "python"
},
{
  "title": "Rotate Linked List Left by k Nodes",
  "description": "Rotate linked list to the left by k nodes by connecting end to head temporarily.",
  "codeSnippet": "def rotate_left(head,k):\n    if not head: return head\n    tail=head; n=1\n    while tail.next: tail=tail.next; n+=1\n    k%=n; if k==0: return head\n    cur=head; for _ in range(k-1): cur=cur.next\n    new_head=cur.next; cur.next=None; tail.next=head\n    return new_head",
  "language": "python"
},
{
  "title": "Flatten a Multilevel Doubly Linked List",
  "description": "Flatten a multilevel doubly linked list so all nodes appear in a single-level list using DFS.",
  "codeSnippet": "def flatten(head):\n    if not head: return head\n    stack=[head]\n    prev=None\n    while stack:\n        node=stack.pop()\n        if prev: prev.next=node; node.prev=prev\n        if node.next: stack.append(node.next)\n        if node.child: stack.append(node.child); node.child=None\n        prev=node\n    return head",
  "language": "python"
},
{
  "title": "Copy List with Random Pointer",
  "description": "Copy a linked list where each node has a random pointer. Use hashmap to map original to copied nodes.",
  "codeSnippet": "def copyRandomList(head):\n    if not head: return None\n    mapping={}\n    cur=head\n    while cur: mapping[cur]=Node(cur.val); cur=cur.next\n    cur=head\n    while cur:\n        mapping[cur].next=mapping.get(cur.next)\n        mapping[cur].random=mapping.get(cur.random)\n        cur=cur.next\n    return mapping[head]",
  "language": "python"
},
{
  "title": "Swap Nodes in Pairs",
  "description": "Swap every two adjacent nodes in a linked list using iteration or recursion.",
  "codeSnippet": "def swap_pairs(head):\n    dummy=ListNode(0); dummy.next=head; prev=dummy\n    while prev.next and prev.next.next:\n        a=prev.next; b=a.next\n        prev.next,b.next,a.next=b,a.next,b.next\n        prev=a\n    return dummy.next",
  "language": "python"
},
{
  "title": "Split Linked List in Parts",
  "description": "Split linked list into k parts of almost equal length, distributing extra nodes to earlier parts.",
  "codeSnippet": "def split_list_to_parts(head,k):\n    n=0; cur=head\n    while cur: n+=1; cur=cur.next\n    width,rem=divmod(n,k); res=[]; cur=head\n    for i in range(k): head_of_part=cur\n        for j in range(width + (i<rem) -1): if cur: cur=cur.next\n        if cur: tmp=cur.next; cur.next=None; cur=tmp\n        res.append(head_of_part)\n    return res",
  "language": "python"
},
{
  "title": "Remove Zero Sum Sublists",
  "description": "Remove consecutive nodes summing to zero using prefix sum and hashmap to track sums.",
  "codeSnippet": "def remove_zero_sum_sublists(head):\n    dummy=ListNode(0); dummy.next=head\n    prefix_sum=0; seen={0:dummy}\n    cur=head\n    while cur: prefix_sum+=cur.val\n        seen[prefix_sum]=cur; cur=cur.next\n    prefix_sum=0; cur=dummy\n    while cur:\n        prefix_sum+=cur.val\n        cur.next=seen[prefix_sum].next\n        cur=cur.next\n    return dummy.next",
  "language": "python"
},
{
  "title": "Sort List (Merge Sort)",
  "description": "Sort a linked list using merge sort in O(n log n) time with constant space.",
  "codeSnippet": "def sort_list(head):\n    if not head or not head.next: return head\n    slow,fast=head,head.next\n    while fast and fast.next: slow=slow.next; fast=fast.next.next\n    mid=slow.next; slow.next=None\n    left,right=sort_list(head),sort_list(mid)\n    dummy=tail=ListNode(0)\n    while left and right: if left.val<right.val: tail.next=left; left=left.next\n        else: tail.next=right; right=right.next\n        tail=tail.next\n    tail.next=left or right\n    return dummy.next",
  "language": "python"
},
{
  "title": "Reverse Linked List II",
  "description": "Reverse a sublist of a linked list from position m to n using iteration in-place.",
  "codeSnippet": "def reverse_between(head,m,n):\n    dummy=ListNode(0); dummy.next=head\n    prev=dummy\n    for _ in range(m-1): prev=prev.next\n    cur=prev.next\n    for _ in range(n-m): tmp=cur.next; cur.next=tmp.next; tmp.next=prev.next; prev.next=tmp\n    return dummy.next",
  "language": "python"
},
{
  "title": "Rotate List",
  "description": "Rotate a linked list to the right by k positions by connecting tail to head temporarily.",
  "codeSnippet": "def rotate_right(head,k):\n    if not head: return head\n    length=1; tail=head\n    while tail.next: tail=tail.next; length+=1\n    k%=length; if k==0: return head\n    tail.next=head; steps=length-k\n    prev=None; cur=head\n    for _ in range(steps): prev=cur; cur=cur.next\n    prev.next=None\n    return cur",
  "language": "python"
},
{
  "title": "Remove Nth Node From End",
  "description": "Use two pointers separated by n nodes to remove the nth node from end in one pass.",
  "codeSnippet": "def remove_nth_from_end(head,n):\n    dummy=ListNode(0); dummy.next=head; fast=slow=dummy\n    for _ in range(n+1): fast=fast.next\n    while fast: fast=fast.next; slow=slow.next\n    slow.next=slow.next.next\n    return dummy.next",
  "language": "python"
},
{
  "title": "Partition List",
  "description": "Partition list around value x so nodes < x come before nodes >= x while preserving original relative order.",
  "codeSnippet": "def partition(head,x):\n    before_head=before=ListNode(0); after_head=after=ListNode(0); cur=head\n    while cur: if cur.val<x: before.next=cur; before=before.next\n        else: after.next=cur; after=after.next\n        cur=cur.next\n    after.next=None; before.next=after_head.next\n    return before_head.next",
  "language": "python"
},
{
  "title": "Copy List with Random Pointer (One-Pass HashMap)",
  "description": "Create new nodes in one pass and store mapping in hashmap to assign next and random pointers efficiently.",
  "codeSnippet": "def copy_random_list_one_pass(head):\n    if not head: return None\n    mapping={}\n    cur=head\n    while cur: mapping[cur]=Node(cur.val); cur=cur.next\n    for node in mapping: mapping[node].next=mapping.get(node.next); mapping[node].random=mapping.get(node.random)\n    return mapping[head]",
  "language": "python"
},
{
  "title": "Flatten Binary Tree to Linked List",
  "description": "Flatten a binary tree into a linked list following preorder traversal in-place using recursion.",
  "codeSnippet": "def flatten(root):\n    if not root: return\n    flatten(root.left); flatten(root.right)\n    tmp=root.right\n    root.right=root.left; root.left=None\n    cur=root\n    while cur.right: cur=cur.right\n    cur.right=tmp",
  "language": "python"
},
{
  "title": "Remove Linked List Elements",
  "description": "Remove all nodes with a specific value using iteration and dummy node for simplicity.",
  "codeSnippet": "def remove_elements(head,val):\n    dummy=ListNode(0); dummy.next=head; cur=dummy\n    while cur.next: if cur.next.val==val: cur.next=cur.next.next\n        else: cur=cur.next\n    return dummy.next",
  "language": "python"
},
{
  "title": "Reorder List",
  "description": "Rearrange list into L0→Ln→L1→Ln-1 pattern by splitting, reversing, and merging.",
  "codeSnippet": "def reorderList(head):\n    if not head: return\n    slow,fast=head,head\n    while fast and fast.next:\n        slow,fast=slow.next,fast.next.next\n    prev=None; cur=slow.next; slow.next=None\n    while cur:\n        nxt=cur.next; cur.next=prev; prev=cur; cur=nxt\n    first,second=head,prev\n    while second:\n        tmp1,tmp2=first.next,second.next\n        first.next=second; second.next=tmp1\n        first,second=tmp1,tmp2",
  "language": "python"
},
{
  "title": "Plus One Linked List",
  "description": "Add one to a number represented as linked list, handling carry properly.",
  "codeSnippet": "def plusOne(head):\n    def reverse(node):\n        prev=None\n        while node:\n            nxt=node.next; node.next=prev; prev=node; node=nxt\n        return prev\n    head=reverse(head)\n    cur,carry=head,1\n    while cur and carry:\n        cur.val+=carry; carry=cur.val//10; cur.val%=10\n        if not cur.next and carry: cur.next=ListNode(carry); carry=0\n        cur=cur.next\n    return reverse(head)",
  "language": "python"
},
{
  "title": "Remove Nth Node From End",
  "description": "Remove nth node from end by using two pointers with a gap of n nodes.",
  "codeSnippet": "def removeNthFromEnd(head,n):\n    dummy=ListNode(0); dummy.next=head\n    first=second=dummy\n    for _ in range(n+1): first=first.next\n    while first:\n        first,second=first.next,second.next\n    second.next=second.next.next\n    return dummy.next",
  "language": "python"
},
{
  "title": "Convert Binary Number in Linked List to Integer",
  "description": "Traverse list as binary digits and build integer result progressively.",
  "codeSnippet": "def getDecimalValue(head):\n    res=0\n    while head:\n        res=res*2+head.val\n        head=head.next\n    return res",
  "language": "python"
},
{
  "title": "Merge In Between Linked Lists",
  "description": "Remove a segment from list1 and merge entire list2 in that gap.",
  "codeSnippet": "def mergeInBetween(list1,a,b,list2):\n    prev,cur=list1,list1\n    for _ in range(a-1): prev=prev.next\n    for _ in range(b): cur=cur.next\n    prev.next=list2\n    while list2.next: list2=list2.next\n    list2.next=cur.next\n    return list1",
  "language": "python"
},
{
  "title": "Add Two Numbers II",
  "description": "Add numbers stored in forward order by using stacks to process from least significant digit.",
  "codeSnippet": "def addTwoNumbers(l1,l2):\n    s1,s2=[],[]\n    while l1: s1.append(l1.val); l1=l1.next\n    while l2: s2.append(l2.val); l2=l2.next\n    carry=0; head=None\n    while s1 or s2 or carry:\n        v1=s1.pop() if s1 else 0\n        v2=s2.pop() if s2 else 0\n        total=v1+v2+carry\n        node=ListNode(total%10)\n        node.next=head; head=node\n        carry=total//10\n    return head",
  "language": "python"
},
{
  "title": "Remove Zero Sum Sublists",
  "description": "Remove consecutive sequences of nodes that sum to zero using prefix sums and hashmap.",
  "codeSnippet": "def removeZeroSumSublists(head):\n    dummy=ListNode(0); dummy.next=head\n    prefix=0; mp={0:dummy}\n    cur=head\n    while cur:\n        prefix+=cur.val\n        if prefix in mp:\n            prev=mp[prefix]; node=prev.next; tmp=prefix\n            while node!=cur:\n                tmp+=node.val; mp.pop(tmp)\n                node=node.next\n            prev.next=cur.next\n        else: mp[prefix]=cur\n        cur=cur.next\n    return dummy.next",
  "language": "python"
},
{
  "title": "Linked List Components",
  "description": "Count number of connected components formed by subset of nodes using set lookup.",
  "codeSnippet": "def numComponents(head,G):\n    G=set(G); cur=head; count=0\n    while cur:\n        if cur.val in G and (not cur.next or cur.next.val not in G):\n            count+=1\n        cur=cur.next\n    return count",
  "language": "python"
},
{
  "title": "Insert into Sorted Circular Linked List",
  "description": "Insert value into a sorted circular list while maintaining order and circular property.",
  "codeSnippet": "def insert(head,insertVal):\n    node=Node(insertVal)\n    if not head:\n        node.next=node; return node\n    cur=head\n    while True:\n        if cur.val<=insertVal<=cur.next.val: break\n        if cur.val>cur.next.val and (insertVal>=cur.val or insertVal<=cur.next.val): break\n        cur=cur.next\n        if cur==head: break\n    node.next=cur.next; cur.next=node\n    return head",
  "language": "python"
}
  ];
  }
  private getStackHints(): Hint[] {
  return [
    {
  "title": "Valid Parentheses",
  "description": "Use a stack to validate if every opening bracket has a matching closing one in correct order. Common interview question for stack basics.",
  "codeSnippet": "def isValid(s):\n    stack=[]; mapping={')':'(',']':'[','}':'{'}\n    for ch in s:\n        if ch in mapping:\n            if not stack or stack.pop()!=mapping[ch]: return False\n        else:\n            stack.append(ch)\n    return not stack",
  "language": "python"
},
{
  "title": "Min Stack",
  "description": "Design a stack that supports push, pop, top, and retrieving minimum in O(1) time using an auxiliary stack.",
  "codeSnippet": "class MinStack:\n    def __init__(self): self.stack=[]; self.minStack=[]\n    def push(self,x):\n        self.stack.append(x)\n        self.minStack.append(min(x,self.minStack[-1]) if self.minStack else x)\n    def pop(self): self.stack.pop(); self.minStack.pop()\n    def top(self): return self.stack[-1]\n    def getMin(self): return self.minStack[-1]",
  "language": "python"
},
{
  "title": "Next Greater Element",
  "description": "For each element, find the next greater element to its right using a stack to track decreasing sequence.",
  "codeSnippet": "def nextGreater(nums):\n    res=[-1]*len(nums); stack=[]\n    for i,n in enumerate(nums):\n        while stack and nums[stack[-1]]<n:\n            res[stack.pop()]=n\n        stack.append(i)\n    return res",
  "language": "python"
},
{
  "title": "Largest Rectangle in Histogram",
  "description": "Use a stack to maintain indices of bars in ascending height. Calculate area when popping shorter bars.",
  "codeSnippet": "def largestRectangle(heights):\n    stack=[]; max_area=0\n    heights.append(0)\n    for i,h in enumerate(heights):\n        while stack and heights[stack[-1]]>h:\n            height=heights[stack.pop()]\n            width=i if not stack else i-stack[-1]-1\n            max_area=max(max_area,height*width)\n        stack.append(i)\n    return max_area",
  "language": "python"
},
{
  "title": "Daily Temperatures",
  "description": "Find how many days to wait until a warmer temperature. Use a stack to store indices of unresolved days.",
  "codeSnippet": "def dailyTemperatures(T):\n    res=[0]*len(T); stack=[]\n    for i,t in enumerate(T):\n        while stack and T[stack[-1]]<t:\n            idx=stack.pop(); res[idx]=i-idx\n        stack.append(i)\n    return res",
  "language": "python"
},
{
  "title": "Evaluate Reverse Polish Notation",
  "description": "Use a stack to evaluate postfix expressions. Push numbers, and on operators, pop operands and compute.",
  "codeSnippet": "def evalRPN(tokens):\n    stack=[]\n    for t in tokens:\n        if t not in '+-*/': stack.append(int(t))\n        else:\n            b,a=stack.pop(),stack.pop()\n            stack.append(int(a+b) if t=='+' else int(a-b) if t=='-' else int(a*b) if t=='*' else int(a/b))\n    return stack[0]",
  "language": "python"
},

{
  "title": "Remove Adjacent Duplicates",
  "description": "Use a stack to remove adjacent duplicate characters in a string. Push if not same, pop if duplicate.",
  "codeSnippet": "def removeDuplicates(s):\n    stack=[]\n    for ch in s:\n        if stack and stack[-1]==ch: stack.pop()\n        else: stack.append(ch)\n    return ''.join(stack)",
  "language": "python"
},
{
  "title": "Simplify Path",
  "description": "Given a Unix-style path, use a stack to handle '..' (go up), '.' (stay), and directory names to simplify path.",
  "codeSnippet": "def simplifyPath(path):\n    stack=[]\n    for part in path.split('/'):\n        if part=='' or part=='.': continue\n        elif part=='..':\n            if stack: stack.pop()\n        else: stack.append(part)\n    return '/'+'/'.join(stack)",
  "language": "python"
},
{
  "title": "Decode String",
  "description": "Use stack to decode encoded strings like '3[a2[c]]'. Push chars until ']', then expand substring with multiplier.",
  "codeSnippet": "def decodeString(s):\n    stack=[]\n    for ch in s:\n        if ch!=']': stack.append(ch)\n        else:\n            substr=''\n            while stack[-1]!='[': substr=stack.pop()+substr\n            stack.pop()\n            k=''\n            while stack and stack[-1].isdigit(): k=stack.pop()+k\n            stack.append(int(k)*substr)\n    return ''.join(stack)",
  "language": "python"
},
{
  "title": "Basic Calculator II",
  "description": "Use a stack to evaluate string with +, -, *, /. Handle operator precedence by applying * and / immediately.",
  "codeSnippet": "def calculate(s):\n    num, sign, stack=0,'+',[]\n    s+='+'\n    for ch in s:\n        if ch.isdigit(): num=num*10+int(ch)\n        elif ch in '+-*/':\n            if sign=='+': stack.append(num)\n            elif sign=='-': stack.append(-num)\n            elif sign=='*': stack.append(stack.pop()*num)\n            elif sign=='/': stack.append(int(stack.pop()/num))\n            num,sign=0,ch\n    return sum(stack)",
  "language": "python"
},
{
  "title": "Longest Valid Parentheses",
  "description": "Find length of longest valid parentheses substring using stack to track indices. Reset base index when invalid character appears.",
  "codeSnippet": "def longestValidParentheses(s):\n    stack=[-1]; res=0\n    for i,c in enumerate(s):\n        if c=='(': stack.append(i)\n        else:\n            stack.pop()\n            if not stack: stack.append(i)\n            else: res=max(res,i-stack[-1])\n    return res",
  "language": "python"
},
{
  "title": "Remove K Digits",
  "description": "Given a number string, remove k digits to form the smallest possible number. Use a monotonic stack to greedily maintain increasing order.",
  "codeSnippet": "def removeKdigits(num,k):\n    stack=[]\n    for d in num:\n        while k and stack and stack[-1]>d:\n            stack.pop(); k-=1\n        stack.append(d)\n    res=''.join(stack[:-k] if k else stack).lstrip('0')\n    return res if res else '0'",
  "language": "python"
},
{
  "title": "Online Stock Span",
  "description": "Use a monotonic stack to track stock prices and calculate span (days since last higher price). Each query runs in amortized O(1).",
  "codeSnippet": "class StockSpanner:\n    def __init__(self): self.stack=[]\n    def next(self,price):\n        span=1\n        while self.stack and self.stack[-1][0]<=price:\n            span+=self.stack.pop()[1]\n        self.stack.append((price,span))\n        return span",
  "language": "python"
},
{
  "title": "Next Smaller Element",
  "description": "For each element, find the next smaller element to its right using a monotonic decreasing stack. Useful in range queries.",
  "codeSnippet": "def nextSmaller(nums):\n    res=[-1]*len(nums)\n    stack=[]\n    for i in range(len(nums)-1,-1,-1):\n        while stack and stack[-1]>=nums[i]: stack.pop()\n        if stack: res[i]=stack[-1]\n        stack.append(nums[i])\n    return res",
  "language": "python"
},
{
  "title": "Valid Expression Evaluation",
  "description": "Check if brackets, braces, and parentheses in an expression are valid using a stack. Ensures proper opening-closing match.",
  "codeSnippet": "def isValid(s):\n    stack=[]; pairs={')':'(',']':'[','}':'{'}\n    for c in s:\n        if c in pairs.values(): stack.append(c)\n        elif not stack or stack.pop()!=pairs[c]: return False\n    return not stack",
  "language": "python"
},
{
  "title": "Largest Rectangle in Matrix",
  "description": "Use stack-based histogram logic row by row to find the maximal rectangle of 1’s in a binary matrix.",
  "codeSnippet": "def maximalRectangle(matrix):\n    if not matrix: return 0\n    n=len(matrix[0]); heights=[0]*n; res=0\n    for row in matrix:\n        for i in range(n): heights[i]=heights[i]+1 if row[i]=='1' else 0\n        res=max(res,largestRectangleArea(heights[:]))\n    return res\n\ndef largestRectangleArea(h):\n    stack=[]; res=0; h.append(0)\n    for i,ht in enumerate(h):\n        while stack and h[stack[-1]]>ht:\n            H=h[stack.pop()]; W=i if not stack else i-stack[-1]-1\n            res=max(res,H*W)\n        stack.append(i)\n    return res",
  "language": "python"
},
{
  "title": "Exclusive Time of Functions",
  "description": "Given function logs with start and end times, use a stack to track active calls and compute exclusive execution times.",
  "codeSnippet": "def exclusiveTime(n,logs):\n    res=[0]*n; stack=[]; prev=0\n    for log in logs:\n        f,typ,t=log.split(':'); f,t=int(f),int(t)\n        if typ=='start':\n            if stack: res[stack[-1]]+=t-prev\n            stack.append(f); prev=t\n        else:\n            res[stack.pop()]+=t-prev+1; prev=t+1\n    return res",
  "language": "python"
},
{
  "title": "Asteroid Collision",
  "description": "Simulate collisions of moving asteroids using a stack. Positive moves right, negative moves left. Resolve when they meet.",
  "codeSnippet": "def asteroidCollision(asteroids):\n    stack=[]\n    for a in asteroids:\n        while stack and a<0<stack[-1]:\n            if stack[-1] < -a: stack.pop(); continue\n            elif stack[-1]==-a: stack.pop()\n            break\n        else: stack.append(a)\n    return stack",
  "language": "python"
},
{
  "title": "Score of Parentheses",
  "description": "Use a stack to evaluate the score of a balanced parentheses string based on recursive rules. '()' gives 1, nesting doubles value.",
  "codeSnippet": "def scoreOfParentheses(S):\n    stack=[0]\n    for c in S:\n        if c=='(': stack.append(0)\n        else:\n            v=stack.pop()\n            stack[-1]+=max(2*v,1)\n    return stack[0]",
  "language": "python"
},
{
  "title": "Backspace String Compare",
  "description": "Compare two strings with backspaces ('#') using stack simulation. Push normal characters, pop on '#'.",
  "codeSnippet": "def backspaceCompare(S,T):\n    def build(s):\n        stack=[]\n        for c in s:\n            if c!='#': stack.append(c)\n            elif stack: stack.pop()\n        return ''.join(stack)\n    return build(S)==build(T)",
  "language": "python"
},
{
  "title": "Remove Adjacent Duplicates",
  "description": "Use a stack to repeatedly remove adjacent duplicate characters from a string until none remain.",
  "codeSnippet": "def removeDuplicates(s):\n    stack=[]\n    for c in s:\n        if stack and stack[-1]==c: stack.pop()\n        else: stack.append(c)\n    return ''.join(stack)",
  "language": "python"
},
{
  "title": "132 Pattern",
  "description": "Check if there exists a subsequence nums[i] < nums[k] < nums[j] using a decreasing stack scanning from right.",
  "codeSnippet": "def find132pattern(nums):\n    stack=[]; third=float('-inf')\n    for n in nums[::-1]:\n        if n<third: return True\n        while stack and n>stack[-1]: third=stack.pop()\n        stack.append(n)\n    return False",
  "language": "python"
},
{
  "title": "Make Parentheses Valid",
  "description": "Determine minimum additions needed to make parentheses string valid using a stack counter for balance.",
  "codeSnippet": "def minAddToMakeValid(S):\n    bal=open_=0\n    for c in S:\n        if c=='(': open_+=1\n        elif open_: open_-=1\n        else: bal+=1\n    return bal+open_",
  "language": "python"
},
{
  "title": "Daily Temperatures",
  "description": "For each day, find how many days until a warmer temperature occurs. Use a monotonic decreasing stack of indices.",
  "codeSnippet": "def dailyTemperatures(T):\n    res=[0]*len(T); stack=[]\n    for i,t in enumerate(T):\n        while stack and T[stack[-1]]<t:\n            idx=stack.pop(); res[idx]=i-idx\n        stack.append(i)\n    return res",
  "language": "python"
},
{
  "title": "Trap Rain Water",
  "description": "Use a stack to calculate trapped rainwater between bars. Track left boundaries and fill when encountering higher bars.",
  "codeSnippet": "def trap(height):\n    stack=[]; res=0\n    for i,h in enumerate(height):\n        while stack and h>height[stack[-1]]:\n            top=stack.pop()\n            if not stack: break\n            dist=i-stack[-1]-1\n            bounded=min(h,height[stack[-1]])-height[top]\n            res+=dist*bounded\n        stack.append(i)\n    return res",
  "language": "python"
},
{
  "title": "Remove Outermost Parentheses",
  "description": "Remove the outermost parentheses of every primitive substring using a stack counter.",
  "codeSnippet": "def removeOuterParentheses(S):\n    res=''; bal=0\n    for c in S:\n        if c=='(': \n            if bal>0: res+=c\n            bal+=1\n        else:\n            bal-=1\n            if bal>0: res+=c\n    return res",
  "language": "python"
},
{
  "title": "Balanced Brackets with Wildcards",
  "description": "Check if a string of parentheses and '*' can be valid by treating '*' as '(', ')' or empty. Use two stacks.",
  "codeSnippet": "def checkValidString(s):\n    left,star=[],[]\n    for i,c in enumerate(s):\n        if c=='(': left.append(i)\n        elif c=='*': star.append(i)\n        else:\n            if left: left.pop()\n            elif star: star.pop()\n            else: return False\n    while left and star:\n        if left[-1]>star[-1]: return False\n        left.pop(); star.pop()\n    return not left",
  "language": "python"
},
{
  "title": "Max Rectangle in Binary Matrix",
  "description": "Extend histogram approach with stacks to find largest rectangle of 1’s in a binary matrix row by row.",
  "codeSnippet": "def maximalRectangle(matrix):\n    if not matrix: return 0\n    heights=[0]*len(matrix[0]); res=0\n    for row in matrix:\n        for i,v in enumerate(row): heights[i]=heights[i]+1 if v=='1' else 0\n        res=max(res,largestRectangleArea(heights))\n    return res",
  "language": "python"
},
{
  "title": "Stack Using Queues",
  "description": "Implement a stack using queues. Push normally, rotate queue to simulate LIFO on pop.",
  "codeSnippet": "from collections import deque\nclass MyStack:\n    def __init__(self): self.q=deque()\n    def push(self,x):\n        self.q.append(x)\n        for _ in range(len(self.q)-1): self.q.append(self.q.popleft())\n    def pop(self): return self.q.popleft()\n    def top(self): return self.q[0]\n    def empty(self): return not self.q",
  "language": "python"
},
{
  "title": "Stock Span Problem",
  "description": "Calculate stock span using a stack to find consecutive days stock price was less or equal.",
  "codeSnippet": "def stockSpan(prices):\n    res=[0]*len(prices); stack=[]\n    for i,p in enumerate(prices):\n        span=1\n        while stack and stack[-1][0]<=p:\n            span+=stack.pop()[1]\n        stack.append((p,span)); res[i]=span\n    return res",
  "language": "python"
},
{
  "title": "Celebrity Problem",
  "description": "Use a stack to eliminate non-celebrities until one candidate remains, then verify in O(n).",
  "codeSnippet": "def findCelebrity(n,knows):\n    stack=list(range(n))\n    while len(stack)>1:\n        a,b=stack.pop(),stack.pop()\n        if knows(a,b): stack.append(b)\n        else: stack.append(a)\n    cand=stack[0]\n    if all(not knows(cand,i) for i in range(n) if i!=cand) and all(knows(i,cand) for i in range(n) if i!=cand):\n        return cand\n    return -1",
  "language": "python"
},
{
  "title": "Valid Palindrome with Removal",
  "description": "Check if a string can be a palindrome after deleting at most one character using stack-like two-pointer check.",
  "codeSnippet": "def validPalindrome(s):\n    def isPal(l,r):\n        while l<r:\n            if s[l]!=s[r]: return False\n            l+=1; r-=1\n        return True\n    l,r=0,len(s)-1\n    while l<r:\n        if s[l]!=s[r]: return isPal(l+1,r) or isPal(l,r-1)\n        l+=1; r-=1\n    return True",
  "language": "python"
},
{
  "title": "Validate Stack Sequences",
  "description": "Check if pushed and popped sequences are valid stack operations simulation.",
  "codeSnippet": "def validateStackSequences(pushed,popped):\n    stack=[]; j=0\n    for x in pushed:\n        stack.append(x)\n        while stack and j<len(popped) and stack[-1]==popped[j]:\n            stack.pop(); j+=1\n    return not stack",
  "language": "python"
},
{
  "title": "Reverse Substrings Between Parentheses",
  "description": "Use a stack to reverse substrings inside each pair of parentheses, handling nesting properly.",
  "codeSnippet": "def reverseParentheses(s):\n    stack=[]\n    for c in s:\n        if c==')':\n            sub=''\n            while stack and stack[-1]!='(': sub=stack.pop()+sub\n            stack.pop(); stack.append(sub[::-1])\n        else: stack.append(c)\n    return ''.join(stack)",
  "language": "python"
},
{
  "title": "Min Add to Balance Parentheses",
  "description": "Use a counter stack simulation to compute minimum insertions needed for balance in parentheses string.",
  "codeSnippet": "def minAddToMakeValid(s):\n    bal=add=0\n    for c in s:\n        if c=='(': bal+=1\n        else:\n            if bal: bal-=1\n            else: add+=1\n    return add+bal",
  "language": "python"
},
{
  "title": "Reverse Stack Recursively",
  "description": "Reverse a stack using recursion by popping all elements and inserting them at the bottom.",
  "codeSnippet": "def insertBottom(stack,x):\n    if not stack: stack.append(x)\n    else:\n        temp=stack.pop()\n        insertBottom(stack,x)\n        stack.append(temp)\n\ndef reverseStack(stack):\n    if stack:\n        x=stack.pop()\n        reverseStack(stack)\n        insertBottom(stack,x)",
  "language": "python"
},
 {
    "title": "Check Redundant Brackets",
    "description": "Detect if an expression contains redundant brackets using a stack.",
    "codeSnippet": "def checkRedundant(expr):\n    stack=[]\n    for ch in expr:\n        if ch==')':\n            top=stack.pop(); hasOp=False\n            while top!='(':\n                if top in '+-*/': hasOp=True\n                top=stack.pop()\n            if not hasOp: return True\n        else: stack.append(ch)\n    return False",
    "language": "python"
  },
    {
    "title": "Postfix Evaluation",
    "description": "Evaluate a postfix expression using a stack for operands.",
    "codeSnippet": "def evalPostfix(expr):\n    stack=[]\n    for ch in expr.split():\n        if ch.isdigit(): stack.append(int(ch))\n        else:\n            b,a=stack.pop(),stack.pop()\n            stack.append(eval(f'{a}{ch}{b}'))\n    return stack[0]",
    "language": "python"
  },
  {
    "title": "Infix to Postfix",
    "description": "Convert an infix expression to postfix using a stack for operators.",
    "codeSnippet": "def infixToPostfix(expr):\n    prec={'+':1,'-':1,'*':2,'/':2}\n    stack=[]; output=[]\n    for ch in expr:\n        if ch.isalnum(): output.append(ch)\n        elif ch=='(': stack.append(ch)\n        elif ch==')':\n            while stack[-1]!='(': output.append(stack.pop())\n            stack.pop()\n        else:\n            while stack and stack[-1]!='(' and prec.get(ch,0)<=prec.get(stack[-1],0):\n                output.append(stack.pop())\n            stack.append(ch)\n    while stack: output.append(stack.pop())\n    return ''.join(output)",
    "language": "python"
  },
{
    "title": "Balanced Brackets with Multiple Types",
    "description": "Check if an expression with (), {}, and [] brackets is balanced using a stack.",
    "codeSnippet": "def isBalanced(s):\n    stack=[]; pairs={')':'(',']':'[','}':'{'}\n    for ch in s:\n        if ch in '({[': stack.append(ch)\n        elif not stack or stack[-1]!=pairs[ch]: return False\n        else: stack.pop()\n    return not stack",
    "language": "python"
  },
   {
    "title": "Sort a Stack",
    "description": "Sort a stack using only recursion and stack operations.",
    "codeSnippet": "def sortedInsert(stack,x):\n    if not stack or x>stack[-1]: stack.append(x)\n    else:\n        temp=stack.pop(); sortedInsert(stack,x); stack.append(temp)\n\ndef sortStack(stack):\n    if stack:\n        temp=stack.pop(); sortStack(stack); sortedInsert(stack,temp)",
    "language": "python"
  },
   {
    "title": "Span of Balanced Substring",
    "description": "Find the length of longest balanced substring in parentheses using stack indices.",
    "codeSnippet": "def balancedSpan(s):\n    stack=[-1]; res=0\n    for i,ch in enumerate(s):\n        if ch=='(': stack.append(i)\n        else:\n            stack.pop()\n            if not stack: stack.append(i)\n            else: res=max(res,i-stack[-1])\n    return res",
    "language": "python"
  },
    {
    "title": "Expression Evaluation with Variables",
    "description": "Evaluate arithmetic expression with variables using two stacks (operands & operators).",
    "codeSnippet": "def precedence(op): return 1 if op in '+-' else 2\n\ndef evalExpr(expr,vals):\n    def applyOp(a,b,op): return eval(f'{a}{op}{b}')\n    nums=[]; ops=[]; i=0\n    while i<len(expr):\n        if expr[i].isalnum():\n            val=vals.get(expr[i],int(expr[i]))\n            nums.append(val)\n        elif expr[i] in '+-*/':\n            while ops and precedence(ops[-1])>=precedence(expr[i]):\n                b,a,op=nums.pop(),nums.pop(),ops.pop()\n                nums.append(applyOp(a,b,op))\n            ops.append(expr[i])\n        i+=1\n    while ops:\n        b,a,op=nums.pop(),nums.pop(),ops.pop()\n        nums.append(applyOp(a,b,op))\n    return nums[-1]",
    "language": "python"
  },
   {
    "title": "Remove Adjacent Duplicates",
    "description": "Remove adjacent duplicates from a string using a stack.",
    "codeSnippet": "def removeDuplicates(s):\n    stack=[]\n    for ch in s:\n        if stack and stack[-1]==ch: stack.pop()\n        else: stack.append(ch)\n    return ''.join(stack)",
    "language": "python"
  },
    {
    "title": "Next Greater Frequency",
    "description": "Find the next greater frequency element using frequency map + stack.",
    "codeSnippet": "from collections import Counter\n\ndef nextGreaterFreq(arr):\n    freq=Counter(arr); stack=[]; res=[-1]*len(arr)\n    for i in range(len(arr)):\n        while stack and freq[arr[stack[-1]]]<freq[arr[i]]:\n            res[stack.pop()]=arr[i]\n        stack.append(i)\n    return res",
    "language": "python"
  },
   {
    "title": "Basic Calculator",
    "description": "Implement calculator for '+', '-', parentheses using stack.",
    "codeSnippet": "def calculate(s):\n    stack=[]; res=0; num=0; sign=1\n    for ch in s:\n        if ch.isdigit(): num=num*10+int(ch)\n        elif ch in '+-': res+=sign*num; num=0; sign=1 if ch=='+' else -1\n        elif ch=='(': stack.append((res,sign)); res=0; sign=1\n        elif ch==')': res+=sign*num; prev,sign=stack.pop(); res=prev+sign*res; num=0\n    return res+sign*num",
    "language": "python"
  },
    {
    "title": "Minimum Insertions to Balance Parentheses",
    "description": "Find minimum insertions needed to balance parentheses string using a stack counter.",
    "codeSnippet": "def minInsertions(s):\n    res=0; bal=0\n    for ch in s:\n        if ch=='(': bal+=2\n        else:\n            bal-=1\n            if bal==-1:\n                res+=1; bal=1\n    return res+bal",
    "language": "python"
  },
  {
    "title": "Design Browser History",
    "description": "Simulate browser history with back and forward operations using two stacks.",
    "codeSnippet": "class BrowserHistory:\n    def __init__(self, homepage):\n        self.backStack=[]; self.forwardStack=[]; self.curr=homepage\n    def visit(self,url):\n        self.backStack.append(self.curr); self.curr=url; self.forwardStack.clear()\n    def back(self,steps):\n        while steps and self.backStack:\n            self.forwardStack.append(self.curr)\n            self.curr=self.backStack.pop(); steps-=1\n        return self.curr\n    def forward(self,steps):\n        while steps and self.forwardStack:\n            self.backStack.append(self.curr)\n            self.curr=self.forwardStack.pop(); steps-=1\n        return self.curr",
    "language": "python"
  },
   {
    "title": "Max Stack",
    "description": "Design a stack that supports push, pop, top, and retrieving maximum element in O(1). Use auxiliary stack.",
    "codeSnippet": "class MaxStack:\n    def __init__(self):\n        self.stack=[]; self.maxStack=[]\n    def push(self,x):\n        self.stack.append(x)\n        self.maxStack.append(x if not self.maxStack else max(x,self.maxStack[-1]))\n    def pop(self):\n        self.maxStack.pop(); return self.stack.pop()\n    def top(self): return self.stack[-1]\n    def getMax(self): return self.maxStack[-1]",
    "language": "python"
  },
   {
    "title": "Expression Add Operators",
    "description": "Insert +, -, * between digits of a string to form expressions evaluating to target. Use backtracking with stack to track operations.",
    "codeSnippet": "def addOperators(num,target):\n    res=[]\n    def dfs(i,expr,val,prev):\n        if i==len(num):\n            if val==target: res.append(expr)\n            return\n        for j in range(i+1,len(num)+1):\n            if j>i+1 and num[i]=='0': break\n            cur=int(num[i:j])\n            if i==0:\n                dfs(j,str(cur),cur,cur)\n            else:\n                dfs(j,expr+'+'+str(cur),val+cur,cur)\n                dfs(j,expr+'-'+str(cur),val-cur,-cur)\n                dfs(j,expr+'*'+str(cur),val-prev+prev*cur,prev*cur)\n    dfs(0,'',0,0)\n    return res",
    "language": "python"
  }
  ];
}
private getQueueHints(): Hint[] {
  return [
    {
  "title": "Implement Linear Queue using Array",
  "description": "Design a simple queue using an array with front and rear pointers. Support enqueue, dequeue, and display operations.",
  "codeSnippet": "class Queue:\n    def __init__(self, size):\n        self.q=[None]*size; self.size=size\n        self.front=self.rear=-1\n    def enqueue(self,x):\n        if self.rear==self.size-1: return 'Overflow'\n        if self.front==-1: self.front=0\n        self.rear+=1; self.q[self.rear]=x\n    def dequeue(self):\n        if self.front==-1 or self.front>self.rear: return 'Underflow'\n        val=self.q[self.front]; self.front+=1; return val\n    def display(self):\n        return self.q[self.front:self.rear+1]",
  "language": "python"
},
{
  "title": "Implement Circular Queue",
  "description": "Create a circular queue using an array. Ensure efficient use of memory by wrapping around when rear reaches the end.",
  "codeSnippet": "class CircularQueue:\n    def __init__(self,k):\n        self.q=[None]*k; self.size=k\n        self.front=self.rear=-1\n    def enqueue(self,x):\n        if (self.rear+1)%self.size==self.front: return 'Full'\n        if self.front==-1: self.front=0\n        self.rear=(self.rear+1)%self.size; self.q[self.rear]=x\n    def dequeue(self):\n        if self.front==-1: return 'Empty'\n        val=self.q[self.front]\n        if self.front==self.rear: self.front=self.rear=-1\n        else: self.front=(self.front+1)%self.size\n        return val",
  "language": "python"
},
{
  "title": "Implement Double Ended Queue (Deque)",
  "description": "Design a deque that allows insertion and deletion from both front and rear efficiently.",
  "codeSnippet": "from collections import deque\nclass Deque:\n    def __init__(self):\n        self.dq=deque()\n    def insertFront(self,x): self.dq.appendleft(x)\n    def insertRear(self,x): self.dq.append(x)\n    def deleteFront(self): return self.dq.popleft() if self.dq else 'Empty'\n    def deleteRear(self): return self.dq.pop() if self.dq else 'Empty'\n    def display(self): return list(self.dq)",
  "language": "python"
},
{
  "title": "Queue using Stacks",
  "description": "Implement a queue using two stacks. Enqueue adds to one stack, while dequeue requires transfer between stacks.",
  "codeSnippet": "class MyQueue:\n    def __init__(self):\n        self.s1,self.s2=[],[]\n    def enqueue(self,x): self.s1.append(x)\n    def dequeue(self):\n        if not self.s2:\n            while self.s1: self.s2.append(self.s1.pop())\n        return self.s2.pop() if self.s2 else 'Empty'",
  "language": "python"
},
{
  "title": "Stack using Queue",
  "description": "Implement a stack using a single queue. Maintain order by rotating elements after each push.",
  "codeSnippet": "from collections import deque\nclass MyStack:\n    def __init__(self): self.q=deque()\n    def push(self,x):\n        self.q.append(x)\n        for _ in range(len(self.q)-1): self.q.append(self.q.popleft())\n    def pop(self): return self.q.popleft() if self.q else 'Empty'\n    def top(self): return self.q[0] if self.q else 'Empty'",
  "language": "python"
},
{
  "title": "Circular Tour (Gas Station Problem)",
  "description": "Given petrol and distance arrays, find the first index where a truck can complete a circular tour.",
  "codeSnippet": "def circularTour(petrol,dist):\n    n=len(petrol); start=0; deficit=0; balance=0\n    for i in range(n):\n        balance+=petrol[i]-dist[i]\n        if balance<0:\n            start=i+1; deficit+=balance; balance=0\n    return start if balance+deficit>=0 else -1",
  "language": "python"
},
{
  "title": "Sliding Window Maximum",
  "description": "Given an array and window size k, find the maximum in each sliding window using deque.",
  "codeSnippet": "from collections import deque\n\ndef maxSlidingWindow(nums,k):\n    dq,res=deque(),[]\n    for i,n in enumerate(nums):\n        while dq and nums[dq[-1]]<n: dq.pop()\n        dq.append(i)\n        if dq[0]==i-k: dq.popleft()\n        if i>=k-1: res.append(nums[dq[0]])\n    return res",
  "language": "python"
},
{
  "title": "First Unique Character in a Stream",
  "description": "Track the first non-repeating character in a stream using a queue and frequency map.",
  "codeSnippet": "from collections import deque\n\ndef firstUnique(stream):\n    q=deque(); freq={}\n    res=[]\n    for ch in stream:\n        freq[ch]=freq.get(ch,0)+1\n        q.append(ch)\n        while q and freq[q[0]]>1: q.popleft()\n        res.append(q[0] if q else '#')\n    return ''.join(res)",
  "language": "python"
},
{
  "title": "Generate Binary Numbers",
  "description": "Generate first N binary numbers using a queue. Enqueue strings '0' and '1' to build sequence.",
  "codeSnippet": "from collections import deque\n\ndef generateBinary(n):\n    q=deque(['1']); res=[]\n    for _ in range(n):\n        cur=q.popleft(); res.append(cur)\n        q.append(cur+'0'); q.append(cur+'1')\n    return res",
  "language": "python"
},
{
  "title": "Rotten Oranges Problem",
  "description": "Find minimum time required to rot all oranges in a grid using BFS queue.",
  "codeSnippet": "from collections import deque\n\ndef orangesRotting(grid):\n    rows,cols=len(grid),len(grid[0])\n    q=deque(); fresh=0; time=0\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c]==2: q.append((r,c,0))\n            elif grid[r][c]==1: fresh+=1\n    while q:\n        r,c,time=q.popleft()\n        for dr,dc in [(1,0),(-1,0),(0,1),(0,-1)]:\n            nr,nc=r+dr,c+dc\n            if 0<=nr<rows and 0<=nc<cols and grid[nr][nc]==1:\n                grid[nr][nc]=2; fresh-=1\n                q.append((nr,nc,time+1))\n    return -1 if fresh>0 else time",
  "language": "python"
},
{
  "title": "Implement Priority Queue using Heap",
  "description": "Design a priority queue where elements are dequeued based on priority instead of arrival order using heapq.",
  "codeSnippet": "import heapq\nclass PriorityQueue:\n    def __init__(self): self.h=[]\n    def enqueue(self,x,priority): heapq.heappush(self.h,(priority,x))\n    def dequeue(self): return heapq.heappop(self.h)[1] if self.h else 'Empty'\n    def peek(self): return self.h[0][1] if self.h else 'Empty'",
  "language": "python"
},
{
  "title": "Interleave Queue Halves",
  "description": "Rearrange elements of a queue so that first half and second half are interleaved.",
  "codeSnippet": "from collections import deque\n\ndef interleaveQueue(q):\n    n=len(q)//2; s=deque()\n    for _ in range(n): s.append(q.popleft())\n    while s:\n        q.append(s.popleft())\n        q.append(q.popleft())\n    return list(q)",
  "language": "python"
},  
{
  "title": "Implement LRU Cache using Deque",
  "description": "Design a cache with limited capacity. Use deque and hashmap to remove least recently used items on overflow.",
  "codeSnippet": "from collections import deque\nclass LRUCache:\n    def __init__(self,cap):\n        self.cap=cap; self.cache={}; self.dq=deque()\n    def get(self,key):\n        if key not in self.cache: return -1\n        self.dq.remove(key); self.dq.append(key)\n        return self.cache[key]\n    def put(self,key,val):\n        if key in self.cache: self.dq.remove(key)\n        elif len(self.dq)==self.cap:\n            old=self.dq.popleft(); del self.cache[old]\n        self.dq.append(key); self.cache[key]=val",
  "language": "python"
},
{
  "title": "Reverse First K Elements of Queue",
  "description": "Reverse the first K elements of a queue while keeping the rest in the same order.",
  "codeSnippet": "from collections import deque\n\ndef reverseK(q,k):\n    s=[]\n    for _ in range(k): s.append(q.popleft())\n    while s: q.append(s.pop())\n    for _ in range(len(q)-k): q.append(q.popleft())\n    return list(q)",
  "language": "python"
},
{
  "title": "Check if Queue is Palindrome",
  "description": "Verify if the sequence of elements in a queue reads the same forward and backward.",
  "codeSnippet": "from collections import deque\n\ndef isPalindromeQueue(q):\n    arr=list(q)\n    return arr==arr[::-1]",
  "language": "python"
},
{
  "title": "Job Scheduling using Priority Queue",
  "description": "Simulate a job scheduler where jobs with higher priority are executed first using max-heap.",
  "codeSnippet": "import heapq\n\ndef schedule(jobs):\n    pq=[(-p,j) for j,p in jobs]; heapq.heapify(pq)\n    res=[]\n    while pq:\n        p,j=heapq.heappop(pq)\n        res.append(j)\n    return res",
  "language": "python"
},
{
  "title": "Maximum of All Subarrays of Size K",
  "description": "Find the maximum of every contiguous subarray of size K using deque for efficiency.",
  "codeSnippet": "from collections import deque\n\ndef maxSubarrays(arr,k):\n    dq,res=deque(),[]\n    for i in range(len(arr)):\n        while dq and dq[0]<=i-k: dq.popleft()\n        while dq and arr[dq[-1]]<=arr[i]: dq.pop()\n        dq.append(i)\n        if i>=k-1: res.append(arr[dq[0]])\n    return res",
  "language": "python"
},{
  "title": "Circular Petrol Pump Tour",
  "description": "Find the starting petrol pump index from which a vehicle can complete a circular tour.",
  "codeSnippet": "def petrolTour(petrol,dist):\n    start=0; deficit=0; balance=0\n    for i in range(len(petrol)):\n        balance+=petrol[i]-dist[i]\n        if balance<0:\n            start=i+1; deficit+=balance; balance=0\n    return start if balance+deficit>=0 else -1",
  "language": "python"
},
{
  "title": "Printer Queue Simulation",
  "description": "Simulate a printer queue where jobs are processed based on priority instead of arrival order.",
  "codeSnippet": "from collections import deque\n\ndef printerQueue(jobs,pos):\n    q=deque([(p,i) for i,p in enumerate(jobs)])\n    count=0\n    while q:\n        cur=q.popleft()\n        if any(cur[0]<x[0] for x in q): q.append(cur)\n        else:\n            count+=1\n            if cur[1]==pos: return count",
  "language": "python"
},
{
  "title": "Sliding Window Average",
  "description": "Maintain a moving average of the last K elements using a queue to track values efficiently.",
  "codeSnippet": "from collections import deque\nclass MovingAverage:\n    def __init__(self,k): self.q=deque(); self.size=k; self.sum=0\n    def next(self,val):\n        if len(self.q)==self.size: self.sum-=self.q.popleft()\n        self.q.append(val); self.sum+=val\n        return self.sum/len(self.q)",
  "language": "python"
},
{
  "title": "First Non-Repeating Character in Stream",
  "description": "Track the first non-repeating character in a character stream using queue + frequency map.",
  "codeSnippet": "from collections import deque,Counter\n\ndef firstNonRepeating(stream):\n    q=deque(); freq=Counter()\n    for ch in stream:\n        freq[ch]+=1; q.append(ch)\n        while q and freq[q[0]]>1: q.popleft()\n        print(q[0] if q else '#', end='')",
  "language": "python"
},
{
  "title": "First Non-Repeating Character in Stream",
  "description": "Track the first non-repeating character in a character stream using queue + frequency map.",
  "codeSnippet": "from collections import deque,Counter\n\ndef firstNonRepeating(stream):\n    q=deque(); freq=Counter()\n    for ch in stream:\n        freq[ch]+=1; q.append(ch)\n        while q and freq[q[0]]>1: q.popleft()\n        print(q[0] if q else '#', end='')",
  "language": "python"
},
{
  "title": "Deque Based Palindrome Checker",
  "description": "Check if a string is a palindrome by comparing characters from both ends using deque.",
  "codeSnippet": "from collections import deque\n\ndef isPalindrome(s):\n    dq=deque(ch.lower() for ch in s if ch.isalnum())\n    while len(dq)>1:\n        if dq.popleft()!=dq.pop(): return False\n    return True",
  "language": "python"
},
{
  "title": "Shortest Path in Binary Maze",
  "description": "Use BFS queue to find shortest path from source to destination in a binary matrix.",
  "codeSnippet": "from collections import deque\n\ndef shortestPath(grid,src,dst):\n    rows,cols=len(grid),len(grid[0]); q=deque([(src[0],src[1],0)])\n    visited=set([src])\n    while q:\n        r,c,d=q.popleft()\n        if (r,c)==dst: return d\n        for dr,dc in [(1,0),(-1,0),(0,1),(0,-1)]:\n            nr,nc=r+dr,c+dc\n            if 0<=nr<rows and 0<=nc<cols and grid[nr][nc]==1 and (nr,nc) not in visited:\n                visited.add((nr,nc)); q.append((nr,nc,d+1))\n    return -1",
  "language": "python"
},
{
  "title": "Task Scheduler",
  "description": "Given tasks with cooldown periods, schedule them so that identical tasks are at least `n` apart. Use a max-heap with a queue to simulate CPU cycles and track cooldown times. The queue ensures tasks re-enter the heap after cooldown expires.",
  "codeSnippet": "from collections import deque,Counter\nimport heapq\n\ndef leastInterval(tasks,n):\n    freq=Counter(tasks)\n    maxHeap=[-cnt for cnt in freq.values()]\n    heapq.heapify(maxHeap)\n    time=0; q=deque()\n    while maxHeap or q:\n        time+=1\n        if maxHeap:\n            cnt=1+heapq.heappop(maxHeap)\n            if cnt: q.append((cnt,time+n))\n        if q and q[0][1]==time:\n            heapq.heappush(maxHeap,q.popleft()[0])\n    return time",
  "language": "python"
},
{
  "title": "Jump Game III",
  "description": "You start at an index in an array and can jump left or right by the value at that index. Use BFS with a queue to explore reachable indices and determine if you can land on a zero. Queue avoids repeated states and guarantees shortest exploration.",
  "codeSnippet": "from collections import deque\n\ndef canReach(arr,start):\n    n=len(arr); q=deque([start]); visited=set([start])\n    while q:\n        i=q.popleft()\n        if arr[i]==0: return True\n        for j in [i+arr[i],i-arr[i]]:\n            if 0<=j<n and j not in visited:\n                visited.add(j); q.append(j)\n    return False",
  "language": "python"
},
{
  "title": "Shortest Path to Get Food",
  "description": "In a grid with walls, free spaces, and a food cell, find the minimum number of steps from the start. BFS with a queue explores layer by layer to guarantee shortest path. Each cell is enqueued once for efficiency.",
  "codeSnippet": "from collections import deque\n\ndef getFood(grid):\n    rows,cols=len(grid),len(grid[0]); q=deque()\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c]=='*': q.append((r,c,0))\n    visited=set(q)\n    while q:\n        r,c,d=q.popleft()\n        if grid[r][c]=='#': return d\n        for dr,dc in [(1,0),(-1,0),(0,1),(0,-1)]:\n            nr,nc=r+dr,c+dc\n            if 0<=nr<rows and 0<=nc<cols and grid[nr][nc]!='X' and (nr,nc) not in visited:\n                visited.add((nr,nc)); q.append((nr,nc,d+1))\n    return -1",
  "language": "python"
},
{
  "title": "Snake and Ladders",
  "description": "Given a board with snakes and ladders, find the minimum number of dice rolls to reach the end. BFS with a queue tries all dice outcomes and accounts for snakes/ladders jumps. Queue ensures level-order traversal representing dice rolls.",
  "codeSnippet": "from collections import deque\n\ndef snakesAndLadders(board):\n    n=len(board)\n    def getPos(s):\n        r=(s-1)//n; c=(s-1)%n\n        if r%2: c=n-1-c\n        return n-1-r,c\n    q=deque([(1,0)]); visited=set([1])\n    while q:\n        s,m=q.popleft()\n        if s==n*n: return m\n        for i in range(1,7):\n            nxt=s+i\n            if nxt>n*n: break\n            r,c=getPos(nxt)\n            if board[r][c]!=-1: nxt=board[r][c]\n            if nxt not in visited:\n                visited.add(nxt); q.append((nxt,m+1))\n    return -1",
  "language": "python"
},
{
  "title": "Minimum Time to Collect All Apples",
  "description": "In a tree, edges take 1 unit time. Use BFS or DFS with a queue to calculate the total time to collect apples and return to root. Queue ensures visiting all children while accounting for backtracking cost.",
  "codeSnippet": "from collections import defaultdict\n\ndef minTime(n,edges,hasApple):\n    tree=defaultdict(list)\n    for u,v in edges: tree[u].append(v); tree[v].append(u)\n    def dfs(node,parent):\n        time=0\n        for child in tree[node]:\n            if child!=parent:\n                child_time=dfs(child,node)\n                if child_time>0 or hasApple[child]:\n                    time+=child_time+2\n        return time\n    return dfs(0,-1)",
  "language": "python"
},
{
  "title": "Walls and Gates",
  "description": "Fill each empty room with the distance to its nearest gate. Use BFS from all gates at once with a queue, expanding layer by layer. This ensures shortest distance is filled first for each cell.",
  "codeSnippet": "from collections import deque\n\ndef wallsAndGates(rooms):\n    rows,cols=len(rooms),len(rooms[0]); q=deque()\n    for r in range(rows):\n        for c in range(cols):\n            if rooms[r][c]==0: q.append((r,c))\n    while q:\n        r,c=q.popleft()\n        for dr,dc in [(1,0),(-1,0),(0,1),(0,-1)]:\n            nr,nc=r+dr,c+dc\n            if 0<=nr<rows and 0<=nc<cols and rooms[nr][nc]==2147483647:\n                rooms[nr][nc]=rooms[r][c]+1\n                q.append((nr,nc))",
  "language": "python"
},
{
  "title": "Minimum Genetic Mutation",
  "description": "Start from a gene string and mutate one character at a time until reaching the target gene. BFS with a queue explores all valid mutations in layers, ensuring the minimum mutation steps are found.",
  "codeSnippet": "from collections import deque\n\ndef minMutation(start,end,bank):\n    bank=set(bank); q=deque([(start,0)])\n    while q:\n        gene,steps=q.popleft()\n        if gene==end: return steps\n        for i in range(len(gene)):\n            for ch in 'ACGT':\n                nxt=gene[:i]+ch+gene[i+1:]\n                if nxt in bank:\n                    bank.remove(nxt); q.append((nxt,steps+1))\n    return -1",
  "language": "python"
},
{
  "title": "Minimum Genetic Mutation",
  "description": "Start from a gene string and mutate one character at a time until reaching the target gene. BFS with a queue explores all valid mutations in layers, ensuring the minimum mutation steps are found.",
  "codeSnippet": "from collections import deque\n\ndef minMutation(start,end,bank):\n    bank=set(bank); q=deque([(start,0)])\n    while q:\n        gene,steps=q.popleft()\n        if gene==end: return steps\n        for i in range(len(gene)):\n            for ch in 'ACGT':\n                nxt=gene[:i]+ch+gene[i+1:]\n                if nxt in bank:\n                    bank.remove(nxt); q.append((nxt,steps+1))\n    return -1",
  "language": "python"
},
{
  "title": "Shortest Bridge",
  "description": "Given a grid with two islands, connect them with the minimum number of flips. First, DFS marks one island, then BFS with a queue expands outward until the second island is reached.",
  "codeSnippet": "from collections import deque\n\ndef shortestBridge(grid):\n    rows,cols=len(grid),len(grid[0]); q=deque()\n    def dfs(r,c):\n        if r<0 or r>=rows or c<0 or c>=cols or grid[r][c]!=1: return\n        grid[r][c]=2; q.append((r,c,0))\n        for dr,dc in [(1,0),(-1,0),(0,1),(0,-1)]: dfs(r+dr,c+dc)\n    found=False\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c]==1: dfs(r,c); found=True; break\n        if found: break\n    while q:\n        r,c,d=q.popleft()\n        for dr,dc in [(1,0),(-1,0),(0,1),(0,-1)]:\n            nr,nc=r+dr,c+dc\n            if 0<=nr<rows and 0<=nc<cols:\n                if grid[nr][nc]==1: return d\n                if grid[nr][nc]==0:\n                    grid[nr][nc]=2; q.append((nr,nc,d+1))",
  "language": "python"
},
{
  "title": "Open the Lock",
  "description": "A lock has 4 rotating wheels (digits 0–9). Find minimum moves to reach target from '0000' avoiding deadends. BFS with a queue generates all next states, ensuring shortest solution is found first.",
  "codeSnippet": "from collections import deque\n\ndef openLock(deadends,target):\n    dead=set(deadends)\n    q=deque([('0000',0)])\n    visited=set('0000')\n    while q:\n        state,steps=q.popleft()\n        if state==target: return steps\n        if state in dead: continue\n        for i in range(4):\n            for d in [-1,1]:\n                nxt=state[:i]+str((int(state[i])+d)%10)+state[i+1:]\n                if nxt not in visited:\n                    visited.add(nxt); q.append((nxt,steps+1))\n    return -1",
  "language": "python"
},
{
  "title": "Course Schedule",
  "description": "Check if all courses can be finished given prerequisites. Use topological sort with queue (Kahn’s algorithm) to detect cycles. Queue helps process nodes with zero indegree in correct order.",
  "codeSnippet": "from collections import defaultdict,deque\n\ndef canFinish(numCourses,prereq):\n    graph=defaultdict(list); indegree=[0]*numCourses\n    for u,v in prereq:\n        graph[v].append(u); indegree[u]+=1\n    q=deque([i for i in range(numCourses) if indegree[i]==0])\n    visited=0\n    while q:\n        node=q.popleft(); visited+=1\n        for nei in graph[node]:\n            indegree[nei]-=1\n            if indegree[nei]==0: q.append(nei)\n    return visited==numCourses",
  "language": "python"
},
{
  "title": "Binary Tree Level Order Traversal",
  "description": "Traverse a binary tree level by level using a queue (BFS). At each step, dequeue nodes of the current level and enqueue their children for the next level. Useful for problems requiring level-wise processing.",
  "codeSnippet": "from collections import deque\n\ndef levelOrder(root):\n    if not root: return []\n    q, res = deque([root]), []\n    while q:\n        level = []\n        for _ in range(len(q)):\n            node = q.popleft()\n            level.append(node.val)\n            if node.left: q.append(node.left)\n            if node.right: q.append(node.right)\n        res.append(level)\n    return res",
  "language": "python"
},
{
  "title": "Design Hit Counter",
  "description": "Count hits in the past 5 minutes. Use a queue to store timestamps of hits and discard old ones as time progresses. Queue ensures O(1) time complexity for each hit and query operation.",
  "codeSnippet": "from collections import deque\n\nclass HitCounter:\n    def __init__(self):\n        self.q = deque()\n    def hit(self, t):\n        self.q.append(t)\n    def getHits(self, t):\n        while self.q and self.q[0] <= t-300:\n            self.q.popleft()\n        return len(self.q)",
  "language": "python"
},
{
  "title": "Number of Islands",
  "description": "Count islands in a grid using BFS with a queue. Each time a land cell is found, mark all connected land cells as visited by spreading through the queue.",
  "codeSnippet": "from collections import deque\n\ndef numIslands(grid):\n    if not grid: return 0\n    rows, cols, count = len(grid), len(grid[0]), 0\n    def bfs(r,c):\n        q=deque([(r,c)]); grid[r][c]='0'\n        while q:\n            x,y=q.popleft()\n            for dx,dy in [(1,0),(-1,0),(0,1),(0,-1)]:\n                nx,ny=x+dx,y+dy\n                if 0<=nx<rows and 0<=ny<cols and grid[nx][ny]=='1':\n                    grid[nx][ny]='0'; q.append((nx,ny))\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c]=='1':\n                bfs(r,c); count+=1\n    return count",
  "language": "python"
},
{
  "title": "Flood Fill",
  "description": "Fill all connected pixels of the same color starting from a source pixel. Use BFS with a queue to spread color to all adjacent valid pixels until no more updates are possible.",
  "codeSnippet": "from collections import deque\n\ndef floodFill(image,sr,sc,newColor):\n    start=image[sr][sc]\n    if start==newColor: return image\n    q=deque([(sr,sc)]); image[sr][sc]=newColor\n    while q:\n        r,c=q.popleft()\n        for dr,dc in [(1,0),(-1,0),(0,1),(0,-1)]:\n            nr,nc=r+dr,c+dc\n            if 0<=nr<len(image) and 0<=nc<len(image[0]) and image[nr][nc]==start:\n                image[nr][nc]=newColor; q.append((nr,nc))\n    return image",
  "language": "python"
},
{
  "title": "Walls and Gates",
  "description": "Fill each empty room with the distance to its nearest gate. Use BFS with a queue by enqueuing all gates first and expanding layer by layer to update distances.",
  "codeSnippet": "from collections import deque\n\ndef wallsAndGates(rooms):\n    q=deque()\n    rows,cols=len(rooms),len(rooms[0])\n    for r in range(rows):\n        for c in range(cols):\n            if rooms[r][c]==0: q.append((r,c))\n    while q:\n        r,c=q.popleft()\n        for dr,dc in [(1,0),(-1,0),(0,1),(0,-1)]:\n            nr,nc=r+dr,c+dc\n            if 0<=nr<rows and 0<=nc<cols and rooms[nr][nc]==2147483647:\n                rooms[nr][nc]=rooms[r][c]+1\n                q.append((nr,nc))",
  "language": "python"
},
{
  "title": "Shortest Path in DAG",
  "description": "Use a queue-based topological sort to compute shortest paths in a Directed Acyclic Graph. Process nodes in order and relax edges using BFS-like traversal.",
  "codeSnippet": "from collections import deque\n\ndef shortestPathDAG(n,edges,src):\n    graph=[[] for _ in range(n)]\n    indeg=[0]*n\n    for u,v,w in edges:\n        graph[u].append((v,w)); indeg[v]+=1\n    q=deque([i for i in range(n) if indeg[i]==0])\n    topo=[]\n    while q:\n        node=q.popleft(); topo.append(node)\n        for nei,_ in graph[node]:\n            indeg[nei]-=1\n            if indeg[nei]==0: q.append(nei)\n    dist=[float('inf')]*n; dist[src]=0\n    for u in topo:\n        for v,w in graph[u]:\n            if dist[u]+w<dist[v]: dist[v]=dist[u]+w\n    return dist",
  "language": "python"
},
{
  "title": "Sliding Window Median",
  "description": "Find the median of numbers inside a sliding window of size k. Requires two heaps or a balanced structure, but queue logic is used to maintain window order.",
  "codeSnippet": "import heapq\nclass MedianSlidingWindow:\n    def medianSlidingWindow(self,nums,k):\n        res=[]\n        for i in range(len(nums)-k+1):\n            window=sorted(nums[i:i+k])\n            res.append(window[k//2] if k%2 else (window[k//2-1]+window[k//2])/2)\n        return res",
  "language": "python"
},
{
  "title": "Task Scheduling with Cooling",
  "description": "Schedule tasks with cooling interval between same type tasks. Use queue to simulate cooldown period and priority queue to pick highest frequency task.",
  "codeSnippet": "from collections import Counter,deque\nimport heapq\nclass Solution:\n    def leastInterval(self,tasks,n):\n        count=Counter(tasks); maxHeap=[-c for c in count.values()]; heapq.heapify(maxHeap)\n        time=0; q=deque()\n        while maxHeap or q:\n            time+=1\n            if maxHeap:\n                cnt=1+heapq.heappop(maxHeap)\n                if cnt: q.append((cnt,time+n))\n            if q and q[0][1]==time: heapq.heappush(maxHeap,q.popleft()[0:1])\n        return time",
  "language": "python"
},
{
  "title": "Snake Game Simulation",
  "description": "Simulate a snake game on a grid where snake grows on food. Queue stores positions of snake body and helps in updating movement direction efficiently.",
  "codeSnippet": "from collections import deque\nclass SnakeGame:\n    def __init__(self,width,height,food):\n        self.width=width; self.height=height; self.food=deque(food)\n        self.snake=deque([(0,0)]); self.pos={(0,0)}\n    def move(self,dir):\n        head=self.snake[-1]; dirs={'U':(-1,0),'D':(1,0),'L':(0,-1),'R':(0,1)}\n        nh=(head[0]+dirs[dir][0],head[1]+dirs[dir][1])\n        if not (0<=nh[0]<self.height and 0<=nh[1]<self.width): return -1\n        if nh in self.pos and nh!=self.snake[0]: return -1\n        self.snake.append(nh); self.pos.add(nh)\n        if self.food and list(self.food[0])==list(nh): self.food.popleft()\n        else:\n            tail=self.snake.popleft(); self.pos.remove(tail)\n        return len(self.snake)-1",
  "language": "python"
},
{
  "title": "Ticket Counter Queue",
  "description": "Simulate people buying tickets where each person takes one at a time and goes to the back of the queue if still needed. Return total turns for a target person.",
  "codeSnippet": "from collections import deque\n\ndef timeRequiredToBuy(tickets,k):\n    q=deque([(t,i) for i,t in enumerate(tickets)])\n    time=0\n    while q:\n        t,i=q.popleft(); time+=1; t-=1\n        if t>0: q.append((t,i))\n        if i==k and t==0: return time",
  "language": "python"
},
{
  "title": "Bank Teller Queue Simulation",
  "description": "Simulate bank queue with multiple tellers. Customers join queue and are served based on teller availability, updating waiting times accordingly.",
  "codeSnippet": "from collections import deque\n\ndef bankQueue(customers,tellers):\n    q=deque(customers); time=0; busy=[0]*tellers\n    while q or any(busy):\n        for i in range(tellers):\n            if busy[i]==0 and q:\n                busy[i]=q.popleft()\n            if busy[i]>0: busy[i]-=1\n        time+=1\n    return time",
  "language": "python"
},
{
  "title": "Design Front Middle Back Queue",
  "description": "Implement a queue supporting push/pop from front, back, and middle. Can be done with two deques balancing sizes to keep middle accessible.",
  "codeSnippet": "from collections import deque\nclass FrontMiddleBackQueue:\n    def __init__(self): self.front=deque(); self.back=deque()\n    def balance(self):\n        if len(self.front)>len(self.back): self.back.appendleft(self.front.pop())\n        elif len(self.front)<len(self.back)-1: self.front.append(self.back.popleft())\n    def pushFront(self,val): self.front.appendleft(val); self.balance()\n    def pushBack(self,val): self.back.append(val); self.balance()\n    def pushMiddle(self,val):\n        if len(self.front)<len(self.back): self.front.append(val)\n        else: self.back.appendleft(val); self.balance()\n    def popFront(self):\n        if not self.front and not self.back: return -1\n        if self.front: val=self.front.popleft()\n        else: val=self.back.popleft()\n        self.balance(); return val\n    def popBack(self):\n        if not self.back and not self.front: return -1\n        if self.back: val=self.back.pop()\n        else: val=self.front.pop()\n        self.balance(); return val\n    def popMiddle(self):\n        if not self.front and not self.back: return -1\n        if len(self.front)==len(self.back): val=self.front.pop()\n        else: val=self.back.popleft()\n        self.balance(); return val",
  "language": "python"
},
{
  "title": "Hit Counter",
  "description": "Design a hit counter that counts hits in the last 5 minutes. Use queue to store timestamps and remove outdated hits to maintain correct count.",
  "codeSnippet": "from collections import deque\nclass HitCounter:\n    def __init__(self): self.q=deque()\n    def hit(self,t): self.q.append(t)\n    def getHits(self,t):\n        while self.q and self.q[0]<=t-300: self.q.popleft()\n        return len(self.q)",
  "language": "python"
},
{
  "title": "Minimum Cost to Connect Sticks",
  "description": "Given stick lengths, connect all sticks into one with minimum cost. Use priority queue to always combine two smallest sticks iteratively.",
  "codeSnippet": "import heapq\ndef connectSticks(sticks):\n    heapq.heapify(sticks); cost=0\n    while len(sticks)>1:\n        a=heapq.heappop(sticks); b=heapq.heappop(sticks)\n        cost+=a+b; heapq.heappush(sticks,a+b)\n    return cost",
  "language": "python"
},
{
  "title": "First Unique Number in Stream",
  "description": "Maintain the first unique number in a dynamic stream. Use a queue to store order of unique elements and a hashmap to count occurrences for O(1) retrieval.",
  "codeSnippet": "from collections import deque, Counter\n\nclass FirstUnique:\n    def __init__(self, nums):\n        self.count = Counter(nums)\n        self.q = deque([x for x in nums if self.count[x]==1])\n    def showFirstUnique(self):\n        while self.q and self.count[self.q[0]]>1: self.q.popleft()\n        return self.q[0] if self.q else -1\n    def add(self, value):\n        self.count[value]+=1\n        if self.count[value]==1: self.q.append(value)",
  "language": "python"
} ];
} 
private getTreeHints(): Hint[] {
  return [
    {
  title: 'Binary Tree Inorder Traversal',
  description: 'Use iterative approach with stack. Push left nodes first, then process current, then move right. Maintain current pointer and stack state.',
  codeSnippet: `def inorderTraversal(root):
    result = []
    stack = []
    current = root
    while current or stack:
        while current:
            stack.append(current)
            current = current.left
        current = stack.pop()
        result.append(current.val)
        current = current.right
    return result`,
  language: 'python'
},
{
  title: 'Validate Binary Search Tree',
  description: 'Use recursive DFS with min/max bounds. Each node must be within valid range. Track boundaries as you traverse down the tree.',
  codeSnippet: `def isValidBST(root):
    def validate(node, low=-float('inf'), high=float('inf')):
        if not node: return True
        if node.val <= low or node.val >= high: return False
        return validate(node.left, low, node.val) and validate(node.right, node.val, high)
    return validate(root)`,
  language: 'python'
},
{
  title: 'Maximum Depth of Binary Tree',
  description: 'Recursive DFS approach. Depth is 1 + max(left_depth, right_depth). Base case: null node has depth 0.',
  codeSnippet: `def maxDepth(root):
    if not root: return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))`,
  language: 'python'
},
{
  title: 'Binary Tree Level Order Traversal',
  description: 'Use BFS with queue. Process each level separately. Track level size to know when level ends.',
  codeSnippet: `def levelOrder(root):
    if not root: return []
    result = []
    queue = collections.deque([root])
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
  language: 'python'
},
 {
      title: 'Symmetric Tree',
      description: 'Check if tree is mirror of itself. Use helper function to compare left and right subtrees recursively.',
      codeSnippet: `def isSymmetric(root):
    def isMirror(left, right):
        if not left and not right: return True
        if not left or not right: return False
        return (left.val == right.val and 
                isMirror(left.left, right.right) and 
                isMirror(left.right, right.left))
    return isMirror(root.left, root.right) if root else True`,
      language: 'python'
    },
     {
      title: 'Path Sum',
      description: 'Check if there exists root-to-leaf path with given sum. Subtract node value from target sum at each level.',
      codeSnippet: `def hasPathSum(root, targetSum):
    if not root: return False
    if not root.left and not root.right: return targetSum == root.val
    return (hasPathSum(root.left, targetSum - root.val) or 
            hasPathSum(root.right, targetSum - root.val))`,
      language: 'python'
    },
        {
      title: 'Construct Binary Tree from Preorder and Inorder',
      description: 'First element in preorder is root. Find root in inorder to split left/right subtrees. Recursively build tree.',
      codeSnippet: `def buildTree(preorder, inorder):
    if not preorder or not inorder: return None
    root_val = preorder[0]
    root = TreeNode(root_val)
    root_index = inorder.index(root_val)
    root.left = buildTree(preorder[1:1+root_index], inorder[:root_index])
    root.right = buildTree(preorder[1+root_index:], inorder[root_index+1:])
    return root`,
      language: 'python'
    },
{
      title: 'Flatten Binary Tree to Linked List',
      description: 'Use recursive approach to flatten left and right subtrees, then rearrange pointers to form linked list.',
      codeSnippet: `def flatten(root):
    if not root: return
    flatten(root.left)
    flatten(root.right)
    right = root.right
    root.right = root.left
    root.left = None
    while root.right:
        root = root.right
    root.right = right`,
      language: 'python'
    },
    {
      title: 'Lowest Common Ancestor of BST',
      description: 'Use BST property: if both values are smaller than current, go left; if larger, go right; else found LCA.',
      codeSnippet: `def lowestCommonAncestor(root, p, q):
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left
        elif p.val > root.val and q.val > root.val:
            root = root.right
        else:
            return root`,
      language: 'python'
    },
    {
      title: 'Kth Smallest Element in BST',
      description: 'Use iterative inorder traversal. Count nodes until kth element is found. Early return when k reaches 0.',
      codeSnippet: `def kthSmallest(root, k):
    stack = []
    while True:
        while root:
            stack.append(root)
            root = root.left
        root = stack.pop()
        k -= 1
        if k == 0: return root.val
        root = root.right`,
      language: 'python'
    },
     {
      title: 'Binary Tree Right Side View',
      description: 'Use BFS and track last element at each level. Alternatively, use DFS with level tracking and right-first traversal.',
      codeSnippet: `def rightSideView(root):
    if not root: return []
    result = []
    queue = collections.deque([root])
    while queue:
        level_size = len(queue)
        for i in range(level_size):
            node = queue.popleft()
            if i == level_size - 1: result.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
    return result`,
      language: 'python'
    },
    {
      title: 'Count Complete Tree Nodes',
      description: 'Use binary search approach. Calculate left and right heights to determine if subtree is complete.',
      codeSnippet: `def countNodes(root):
    if not root: return 0
    left_height = getHeight(root.left)
    right_height = getHeight(root.right)
    if left_height == right_height:
        return (1 << left_height) + countNodes(root.right)
    else:
        return (1 << right_height) + countNodes(root.left)

def getHeight(node):
    height = 0
    while node:
        height += 1
        node = node.left
    return height`,
    language: 'python'
    },
     {
      title: 'House Robber III',
      description: 'Use postorder traversal. Return two values: rob current node or not. Choose maximum of options at each step.',
      codeSnippet: `def rob(root):
    def dfs(node):
        if not node: return (0, 0)
        left = dfs(node.left)
        right = dfs(node.right)
        rob_current = node.val + left[1] + right[1]
        skip_current = max(left) + max(right)
        return (rob_current, skip_current)
    return max(dfs(root))`,
      language: 'python'
    },
     {
      title: 'Binary Tree Maximum Path Sum',
      description: 'Use postorder traversal. Track maximum path sum that can include current node as connection point.',
      codeSnippet: `def maxPathSum(root):
    max_sum = float('-inf')
    def dfs(node):
        nonlocal max_sum
        if not node: return 0
        left = max(0, dfs(node.left))
        right = max(0, dfs(node.right))
        max_sum = max(max_sum, left + right + node.val)
        return max(left, right) + node.val
    dfs(root)
    return max_sum`,
      language: 'python'
    },
    {
      title: 'Invert Binary Tree',
      description: 'Swap left and right children recursively. Can be done with DFS (preorder) or BFS level order traversal.',
      codeSnippet: `def invertTree(root):
    if not root: return None
    root.left, root.right = invertTree(root.right), invertTree(root.left)
    return root`,
      language: 'python'
    },
    {
      title: 'Subtree of Another Tree',
      description: 'Check if tree t is subtree of s. Use helper to check identical trees and main function to traverse s.',
      codeSnippet: `def isSubtree(s, t):
    def isSame(x, y):
        if not x and not y: return True
        if not x or not y: return False
        return x.val == y.val and isSame(x.left, y.left) and isSame(x.right, y.right)
    
    if not s: return False
    return isSame(s, t) or isSubtree(s.left, t) or isSubtree(s.right, t)`,
      language: 'python'
    },
     {
      title: 'Diameter of Binary Tree',
      description: 'Calculate height of left and right subtrees. Diameter is max of left+right heights at each node.',
      codeSnippet: `def diameterOfBinaryTree(root):
    diameter = 0
    def height(node):
        nonlocal diameter
        if not node: return 0
        left = height(node.left)
        right = height(node.right)
        diameter = max(diameter, left + right)
        return 1 + max(left, right)
    height(root)
    return diameter`,
      language: 'python'
    },
     {
      title: 'Vertical Order Traversal',
      description: 'Use BFS with column tracking. Store nodes by column in dictionary. Sort by row and value for same position.',
      codeSnippet: `def verticalTraversal(root):
    if not root: return []
    column_map = collections.defaultdict(list)
    queue = collections.deque([(root, 0, 0)])
    while queue:
        node, row, col = queue.popleft()
        column_map[col].append((row, node.val))
        if node.left: queue.append((node.left, row+1, col-1))
        if node.right: queue.append((node.right, row+1, col+1))
    
    result = []
    for col in sorted(column_map.keys()):
        result.append([val for row, val in sorted(column_map[col])])
    return result`,
      language: 'python'
    },
     {
      title: 'Sum Root to Leaf Numbers',
      description: 'Use DFS to accumulate number from root to leaf. Multiply current sum by 10 and add node value at each level.',
      codeSnippet: `def sumNumbers(root):
    def dfs(node, current_sum):
        if not node: return 0
        current_sum = current_sum * 10 + node.val
        if not node.left and not node.right: return current_sum
        return dfs(node.left, current_sum) + dfs(node.right, current_sum)
    return dfs(root, 0)`,
      language: 'python'
    },
     {
      title: 'Populating Next Right Pointers',
      description: 'Use level order traversal. Connect nodes at same level. Can be done with O(1) space using established next pointers.',
      codeSnippet: `def connect(root):
    if not root: return None
    leftmost = root
    while leftmost.left:
        head = leftmost
        while head:
            head.left.next = head.right
            if head.next: head.right.next = head.next.left
            head = head.next
        leftmost = leftmost.left
    return root`,
      language: 'python'
    },
    {
      title: 'Find Duplicate Subtrees',
      description: 'Use serialization to represent subtrees. Store serialized strings in dictionary to detect duplicates.',
      codeSnippet: `def findDuplicateSubtrees(root):
    result = []
    subtree_map = {}
    def serialize(node):
        if not node: return '#'
        serial = f"{node.val},{serialize(node.left)},{serialize(node.right)}"
        subtree_map[serial] = subtree_map.get(serial, 0) + 1
        if subtree_map[serial] == 2: result.append(node)
        return serial
    serialize(root)
    return result`,
      language: 'python'
    },
    {
      title: 'Delete Node in BST',
      description: 'Find node to delete. If it has one child, replace with child. If two children, replace with inorder successor.',
      codeSnippet: `def deleteNode(root, key):
    if not root: return None
    if key < root.val: root.left = deleteNode(root.left, key)
    elif key > root.val: root.right = deleteNode(root.right, key)
    else:
        if not root.left: return root.right
        if not root.right: return root.left
        successor = findMin(root.right)
        root.val = successor.val
        root.right = deleteNode(root.right, successor.val)
    return root

def findMin(node):
    while node.left: node = node.left
    return node`,
      language: 'python'
    },
    {
      title: 'Binary Tree Cameras',
      description: 'Use postorder traversal with state tracking. Return states: 0=not covered, 1=covered by camera, 2=has camera.',
      codeSnippet: `def minCameraCover(root):
    cameras = 0
    def dfs(node):
        nonlocal cameras
        if not node: return 1
        left = dfs(node.left)
        right = dfs(node.right)
        if left == 0 or right == 0:
            cameras += 1
            return 2
        if left == 2 or right == 2: return 1
        return 0
    return (dfs(root) == 0) + cameras`,
      language: 'python'
    },
    {
      title: 'Maximum Width of Binary Tree',
      description: 'Use BFS with position indexing. Track min and max positions at each level to calculate width.',
      codeSnippet: `def widthOfBinaryTree(root):
    if not root: return 0
    max_width = 0
    queue = collections.deque([(root, 0)])
    while queue:
        level_size = len(queue)
        first_pos = queue[0][1]
        for i in range(level_size):
            node, pos = queue.popleft()
            if node.left: queue.append((node.left, 2*pos))
            if node.right: queue.append((node.right, 2*pos+1))
        max_width = max(max_width, pos - first_pos + 1)
    return max_width`,
      language: 'python'
    },
     {
      title: 'Construct BST from Preorder',
      description: 'Use recursive approach with bounds. First element is root. All smaller elements go left, larger go right.',
      codeSnippet: `def bstFromPreorder(preorder):
    def build(lower=float('-inf'), upper=float('inf')):
        nonlocal idx
        if idx >= len(preorder): return None
        val = preorder[idx]
        if val < lower or val > upper: return None
        idx += 1
        node = TreeNode(val)
        node.left = build(lower, val)
        node.right = build(val, upper)
        return node
    idx = 0
    return build()`,
      language: 'python'
    },
    {
  "title": "Lowest Common Ancestor",
  "description": "Find the lowest common ancestor (LCA) of two nodes in a binary tree. Recursively check left and right subtrees and return current node if both sides contain the target nodes.",
  "codeSnippet": "def lowestCommonAncestor(root,p,q):\n    if not root or root==p or root==q: return root\n    l,r = lowestCommonAncestor(root.left,p,q), lowestCommonAncestor(root.right,p,q)\n    return root if l and r else l or r",
  "language": "python"
},
{
  "title": "Serialize and Deserialize Binary Tree",
  "description": "Convert a binary tree to a string and back. Use preorder traversal with markers for null nodes for unambiguous reconstruction.",
  "codeSnippet": "def serialize(root):\n    vals = []\n    def dfs(node):\n        if not node: vals.append('#'); return\n        vals.append(str(node.val))\n        dfs(node.left)\n        dfs(node.right)\n    dfs(root)\n    return ' '.join(vals)\n\ndef deserialize(data):\n    vals = iter(data.split())\n    def dfs():\n        val = next(vals)\n        if val=='#': return None\n        node=TreeNode(int(val))\n        node.left=dfs()\n        node.right=dfs()\n        return node\n    return dfs()",
  "language": "python"
},
{
  "title": "Invert Binary Tree",
  "description": "Flip a binary tree horizontally. Swap left and right children recursively at every node.",
  "codeSnippet": "def invertTree(root):\n    if not root: return None\n    root.left, root.right = invertTree(root.right), invertTree(root.left)\n    return root",
  "language": "python"
},
{
  "title": "Path Sum",
  "description": "Check if a root-to-leaf path exists with a given sum. Traverse recursively subtracting node values from the target sum until a leaf is reached.",
  "codeSnippet": "def hasPathSum(root,sum):\n    if not root: return False\n    if not root.left and not root.right: return root.val==sum\n    return hasPathSum(root.left,sum-root.val) or hasPathSum(root.right,sum-root.val)",
  "language": "python"
},
{
  "title": "Flatten Binary Tree to Linked List",
  "description": "Transform a binary tree into a linked list in-place following preorder traversal. Reconnect right pointers while nullifying left pointers.",
  "codeSnippet": "def flatten(root):\n    if not root: return\n    flatten(root.left)\n    flatten(root.right)\n    tmp=root.right\n    root.right=root.left\n    root.left=None\n    cur=root\n    while cur.right: cur=cur.right\n    cur.right=tmp",
  "language": "python"
},
{
  "title": "Count Univalue Subtrees",
  "description": "Count subtrees where all nodes have the same value. Recursively check children and increment count if both sides match current node.",
  "codeSnippet": "def countUnivalSubtrees(root):\n    count=0\n    def dfs(node):\n        nonlocal count\n        if not node: return True\n        l,r=dfs(node.left),dfs(node.right)\n        if l and r and (not node.left or node.left.val==node.val) and (not node.right or node.right.val==node.val):\n            count+=1\n            return True\n        return False\n    dfs(root)\n    return count",
  "language": "python"
},
{
  "title": "Right Side View of Binary Tree",
  "description": "Return the visible nodes when looking at the tree from the right side. Use BFS or DFS, keeping track of the last node at each level.",
  "codeSnippet": "from collections import deque\n\ndef rightSideView(root):\n    if not root: return []\n    res,q=[],deque([root])\n    while q:\n        for i in range(len(q)):\n            node=q.popleft()\n            if i==len(q)-1: res.append(node.val)\n            if node.left: q.append(node.left)\n            if node.right: q.append(node.right)\n    return res",
  "language": "python"
},
{
  "title": "Sum of Left Leaves",
  "description": "Calculate the sum of all left leaf nodes in a binary tree. Recursively check if a node is a left child and a leaf before adding its value.",
  "codeSnippet": "def sumOfLeftLeaves(root):\n    if not root: return 0\n    res=0\n    if root.left and not root.left.left and not root.left.right: res+=root.left.val\n    return res+sumOfLeftLeaves(root.left)+sumOfLeftLeaves(root.right)",
  "language": "python"
},
{
  "title": "Balanced Binary Tree",
  "description": "Determine if a tree is height-balanced (difference between left and right subtrees ≤ 1 at every node). Use DFS to check depths recursively.",
  "codeSnippet": "def isBalanced(root):\n    def dfs(node):\n        if not node: return 0\n        l,r=dfs(node.left),dfs(node.right)\n        if l==-1 or r==-1 or abs(l-r)>1: return -1\n        return 1+max(l,r)\n    return dfs(root)!=-1",
  "language": "python"
},
{
  "title": "Binary Tree Maximum Path Sum",
  "description": "Find the maximum sum path in a tree, which may start and end at any nodes. Recursively calculate max path including left and right children and update global max.",
  "codeSnippet": "def maxPathSum(root):\n    res=float('-inf')\n    def dfs(node):\n        nonlocal res\n        if not node: return 0\n        l,r=max(dfs(node.left),0),max(dfs(node.right),0)\n        res=max(res,node.val+l+r)\n        return node.val+max(l,r)\n    dfs(root)\n    return res",
  "language": "python"
},
{
  "title": "Sum Root to Leaf Numbers",
  "description": "Each root-to-leaf path forms a number. Compute sum of all these numbers by recursively building numbers as you traverse.",
  "codeSnippet": "def sumNumbers(root):\n    def dfs(node,num):\n        if not node: return 0\n        num=num*10+node.val\n        if not node.left and not node.right: return num\n        return dfs(node.left,num)+dfs(node.right,num)\n    return dfs(root,0)",
  "language": "python"
},
{
  "title": "Construct Binary Tree from Preorder and Inorder",
  "description": "Reconstruct a binary tree given preorder and inorder traversal lists. Use recursion and hash map for inorder indices for efficiency.",
  "codeSnippet": "def buildTree(pre,inorder):\n    idx={v:i for i,v in enumerate(inorder)}\n    def helper(p_l,p_r,i_l,i_r):\n        if p_l>p_r: return None\n        root_val=pre[p_l]; root=TreeNode(root_val)\n        i=idx[root_val]; left_size=i-i_l\n        root.left=helper(p_l+1,p_l+left_size,i_l,i-1)\n        root.right=helper(p_l+left_size+1,p_r,i+1,i_r)\n        return root\n    return helper(0,len(pre)-1,0,len(inorder)-1)",
  "language": "python"
},
{
  "title": "Construct Binary Tree from Inorder and Postorder",
  "description": "Reconstruct a binary tree from inorder and postorder traversals. Use recursion with hashmap to quickly locate root indices in inorder.",
  "codeSnippet": "def buildTree(inorder,postorder):\n    idx={v:i for i,v in enumerate(inorder)}\n    def helper(i_l,i_r,p_l,p_r):\n        if i_l>i_r: return None\n        root_val=postorder[p_r]; root=TreeNode(root_val)\n        i=idx[root_val]; left_size=i-i_l\n        root.left=helper(i_l,i-1,p_l,p_l+left_size-1)\n        root.right=helper(i+1,i_r,p_l+left_size,p_r-1)\n        return root\n    return helper(0,len(inorder)-1,0,len(postorder)-1)",
  "language": "python"
},
{
  "title": "Populating Next Right Pointers",
  "description": "Connect each node’s next pointer to its right neighbor at the same level. Use BFS or recursion, connecting children level by level.",
  "codeSnippet": "def connect(root):\n    if not root: return None\n    if root.left: root.left.next=root.right\n    if root.right and root.next: root.right.next=root.next.left\n    connect(root.left); connect(root.right)\n    return root",
  "language": "python"
},
{
  "title": "Sum of Nodes with Even-Valued Grandparent",
  "description": "Compute sum of nodes whose grandparent node has even value. Traverse tree recursively passing parent and grandparent information.",
  "codeSnippet": "def sumEvenGrandparent(root):\n    def dfs(node,parent,grandparent):\n        if not node: return 0\n        res=(node.val if grandparent%2==0 else 0)\n        return res+dfs(node.left,node.val,parent)+dfs(node.right,node.val,parent)\n    return dfs(root,1,1)",
  "language": "python"
},
{
  "title": "Lowest Common Ancestor of BST",
  "description": "Find the lowest common ancestor in a BST. Use BST properties to traverse from root towards the split point of the two nodes.",
  "codeSnippet": "def lowestCommonAncestor(root,p,q):\n    while root:\n        if p.val<root.val and q.val<root.val: root=root.left\n        elif p.val>root.val and q.val>root.val: root=root.right\n        else: return root",
  "language": "python"
},
{
  "title": "Lowest Common Ancestor of BST",
  "description": "Find the lowest common ancestor in a BST. Use BST properties to traverse from root towards the split point of the two nodes.",
  "codeSnippet": "def lowestCommonAncestor(root,p,q):\n    while root:\n        if p.val<root.val and q.val<root.val: root=root.left\n        elif p.val>root.val and q.val>root.val: root=root.right\n        else: return root",
  "language": "python"
},
{
  "title": "Zigzag Level Order Traversal",
  "description": "Return tree nodes in zigzag order. Alternate direction at each level while using a queue for BFS.",
  "codeSnippet": "from collections import deque\n\ndef zigzagLevelOrder(root):\n    if not root: return []\n    res,q=[],deque([root]); leftToRight=True\n    while q:\n        level=[]\n        for _ in range(len(q)):\n            node=q.popleft(); level.append(node.val)\n            if node.left: q.append(node.left)\n            if node.right: q.append(node.right)\n        res.append(level if leftToRight else level[::-1])\n        leftToRight=not leftToRight\n    return res",
  "language": "python"
},
{
  "title": "Convert Sorted Array to BST",
  "description": "Construct a height-balanced BST from a sorted array. Pick middle element as root and recursively build left and right subtrees.",
  "codeSnippet": "def sortedArrayToBST(nums):\n    if not nums: return None\n    mid=len(nums)//2\n    root=TreeNode(nums[mid])\n    root.left=sortedArrayToBST(nums[:mid])\n    root.right=sortedArrayToBST(nums[mid+1:])\n    return root",
  "language": "python"
},
{
  "title": "Convert Sorted List to BST",
  "description": "Convert a sorted linked list to balanced BST. Use slow and fast pointers to find middle node as root recursively.",
  "codeSnippet": "def sortedListToBST(head):\n    if not head: return None\n    if not head.next: return TreeNode(head.val)\n    slow,fast,prev=head,head,None\n    while fast and fast.next: prev=slow; slow=slow.next; fast=fast.next.next\n    prev.next=None\n    root=TreeNode(slow.val)\n    root.left=sortedListToBST(head)\n    root.right=sortedListToBST(slow.next)\n    return root",
  "language": "python"
},
{
  "title": "Serialize and Deserialize Binary Tree",
  "description": "Convert tree to string and back. Use BFS or DFS to serialize, storing None nodes for correct reconstruction.",
  "codeSnippet": "from collections import deque\n\ndef serialize(root):\n    if not root: return ''\n    q,res=deque([root]),[]\n    while q:\n        node=q.popleft()\n        res.append(str(node.val) if node else '#')\n        if node: q.extend([node.left,node.right])\n    return ','.join(res)\n\ndef deserialize(data):\n    if not data: return None\n    vals=data.split(','); root=TreeNode(int(vals[0]))\n    q=deque([root]); i=1\n    while q:\n        node=q.popleft()\n        if vals[i]!='#': node.left=TreeNode(int(vals[i])); q.append(node.left)\n        i+=1\n        if vals[i]!='#': node.right=TreeNode(int(vals[i])); q.append(node.right)\n        i+=1\n    return root",
  "language": "python"
},
{
  "title": "Find Bottom Left Tree Value",
  "description": "Return the leftmost value in the last row of the tree. Use BFS to track first node at each level or DFS with depth tracking.",
  "codeSnippet": "def findBottomLeftValue(root):\n    from collections import deque\n    q=deque([root])\n    while q:\n        node=q.popleft()\n        if node.right: q.append(node.right)\n        if node.left: q.append(node.left)\n    return node.val",
  "language": "python"
},
{
  "title": "Count Complete Tree Nodes",
  "description": "Count nodes in a complete binary tree efficiently using tree height. Use left and right subtree heights to determine full subtree sizes.",
  "codeSnippet": "def countNodes(root):\n    if not root: return 0\n    left,right=root,root\n    hl=hr=0\n    while left: hl+=1; left=left.left\n    while right: hr+=1; right=right.right\n    if hl==hr: return 2**hl-1\n    return 1+countNodes(root.left)+countNodes(root.right)",
  "language": "python"
},
{
  "title": "Symmetric Tree",
  "description": "Check if a tree is mirror of itself. Recursively compare left and right subtrees for mirrored structure and values.",
  "codeSnippet": "def isSymmetric(root):\n    def isMirror(t1,t2):\n        if not t1 and not t2: return True\n        if not t1 or not t2: return False\n        return t1.val==t2.val and isMirror(t1.left,t2.right) and isMirror(t1.right,t2.left)\n    return isMirror(root,root)",
  "language": "python"
},
{
  "title": "Symmetric Tree",
  "description": "Check if a tree is mirror of itself. Recursively compare left and right subtrees for mirrored structure and values.",
  "codeSnippet": "def isSymmetric(root):\n    def isMirror(t1,t2):\n        if not t1 and not t2: return True\n        if not t1 or not t2: return False\n        return t1.val==t2.val and isMirror(t1.left,t2.right) and isMirror(t1.right,t2.left)\n    return isMirror(root,root)",
  "language": "python"
}
  ];
} 
private getGraphHints(): Hint[] {
  return [
    {
  "title": "Number of Islands",
  "description": "Given a 2D grid of '1's (land) and '0's (water), count the number of connected islands. Use DFS or BFS to explore and mark visited lands.",
  "codeSnippet": "def numIslands(grid):\n    if not grid: return 0\n    def dfs(r,c):\n        if r<0 or c<0 or r>=len(grid) or c>=len(grid[0]) or grid[r][c]=='0': return\n        grid[r][c]='0'\n        for x,y in [(1,0),(0,1),(-1,0),(0,-1)]: dfs(r+x,c+y)\n    count=0\n    for i in range(len(grid)):\n        for j in range(len(grid[0])):\n            if grid[i][j]=='1': count+=1; dfs(i,j)\n    return count",
  "language": "python"
},
{
  "title": "Course Schedule II",
  "description": "Return a valid order of courses given prerequisites. Use topological sort with BFS (Kahn’s algorithm) or DFS to detect cycles and order courses.",
  "codeSnippet": "from collections import defaultdict,deque\n\ndef findOrder(numCourses,prereq):\n    graph=defaultdict(list); indegree=[0]*numCourses\n    for u,v in prereq: graph[v].append(u); indegree[u]+=1\n    q=deque([i for i in range(numCourses) if indegree[i]==0]); res=[]\n    while q:\n        node=q.popleft(); res.append(node)\n        for nei in graph[node]: indegree[nei]-=1; q.append(nei) if indegree[nei]==0 else None\n    return res if len(res)==numCourses else []",
  "language": "python"
},
{
  "title": "Clone Graph",
  "description": "Given a connected undirected graph, create a deep copy. Use DFS or BFS with a HashMap to track visited nodes and copy neighbors.",
  "codeSnippet": "def cloneGraph(node):\n    if not node: return None\n    mapping={}\n    def dfs(n):\n        if n in mapping: return mapping[n]\n        copy=Node(n.val); mapping[n]=copy\n        for nei in n.neighbors: copy.neighbors.append(dfs(nei))\n        return copy\n    return dfs(node)",
  "language": "python"
},
{
  "title": "Minimum Spanning Tree (Prim's Algorithm)",
  "description": "Find MST of a weighted undirected graph. Start from any node and use a priority queue to pick the edge with minimum weight connecting to the MST.",
  "codeSnippet": "import heapq\n\ndef primMST(graph,start=0):\n    visited=set(); heap=[(0,start)]; res=0\n    while heap:\n        w,u=heapq.heappop(heap)\n        if u in visited: continue\n        visited.add(u); res+=w\n        for v,nw in graph[u]:\n            if v not in visited: heapq.heappush(heap,(nw,v))\n    return res",
  "language": "python"
},
{
  "title": "Word Ladder",
  "description": "Transform beginWord to endWord using minimum number of steps, changing one letter at a time. BFS finds shortest transformation path.",
  "codeSnippet": "from collections import deque\n\ndef ladderLength(begin,end,wordList):\n    wordSet=set(wordList)\n    if end not in wordSet: return 0\n    q=deque([(begin,1)])\n    while q:\n        word,l=q.popleft()\n        if word==end: return l\n        for i in range(len(word)):\n            for c in 'abcdefghijklmnopqrstuvwxyz':\n                newWord=word[:i]+c+word[i+1:]\n                if newWord in wordSet: wordSet.remove(newWord); q.append((newWord,l+1))\n    return 0",
  "language": "python"
},
{
  "title": "Shortest Path in Binary Matrix",
  "description": "Find shortest path from top-left to bottom-right in a binary grid. Use BFS and mark visited cells to avoid cycles.",
  "codeSnippet": "from collections import deque\n\ndef shortestPathBinaryMatrix(grid):\n    n=len(grid)\n    if grid[0][0] or grid[n-1][n-1]: return -1\n    q=deque([(0,0,1)])\n    directions=[(1,0),(0,1),(-1,0),(0,-1),(1,1),(-1,-1),(1,-1),(-1,1)]\n    while q:\n        r,c,d=q.popleft()\n        if r==n-1 and c==n-1: return d\n        for x,y in directions:\n            nr,nc=r+x,c+y\n            if 0<=nr<n and 0<=nc<n and grid[nr][nc]==0:\n                grid[nr][nc]=1; q.append((nr,nc,d+1))\n    return -1",
  "language": "python"
},
{
  "title": "Detect Cycle in Directed Graph",
  "description": "Check if a directed graph contains a cycle. Use DFS with a recursion stack to detect back edges indicating cycles.",
  "codeSnippet": "def hasCycle(graph):\n    visited=set(); recStack=set()\n    def dfs(u):\n        visited.add(u); recStack.add(u)\n        for v in graph[u]:\n            if v not in visited and dfs(v): return True\n            elif v in recStack: return True\n        recStack.remove(u)\n        return False\n    for node in graph: \n        if node not in visited and dfs(node): return True\n    return False",
  "language": "python"
},
{
  "title": "Topological Sort",
  "description": "Return a linear ordering of vertices in a DAG. Use DFS post-order or BFS with indegrees (Kahn’s algorithm).",
  "codeSnippet": "from collections import defaultdict,deque\n\ndef topoSort(numCourses,edges):\n    graph=defaultdict(list); indegree=[0]*numCourses\n    for u,v in edges: graph[v].append(u); indegree[u]+=1\n    q=deque([i for i in range(numCourses) if indegree[i]==0]); res=[]\n    while q:\n        node=q.popleft(); res.append(node)\n        for nei in graph[node]: indegree[nei]-=1; q.append(nei) if indegree[nei]==0 else None\n    return res if len(res)==numCourses else []",
  "language": "python"
},
{
  "title": "Cheapest Flights Within K Stops",
  "description": "Find the cheapest price from source to destination with at most K stops. Use BFS/DFS with pruning or Bellman-Ford algorithm for shortest paths.",
  "codeSnippet": "from collections import defaultdict,deque\n\ndef findCheapestPrice(n,flights,src,dst,K):\n    graph=defaultdict(list)\n    for u,v,w in flights: graph[u].append((v,w))\n    q=deque([(src,0,0)]); res=float('inf')\n    while q:\n        node,cost,stops=q.popleft()\n        if node==dst: res=min(res,cost)\n        if stops<=K:\n            for nei,w in graph[node]: q.append((nei,cost+w,stops+1))\n    return res if res!=float('inf') else -1",
  "language": "python"
},
{
  "title": "Network Delay Time",
  "description": "Given times for edges, find the minimum time for a signal to reach all nodes. Use Dijkstra’s algorithm with a priority queue to compute shortest paths from the source.",
  "codeSnippet": "import heapq\n\ndef networkDelayTime(times,N,K):\n    graph={i:[] for i in range(1,N+1)}\n    for u,v,w in times: graph[u].append((v,w))\n    heap=[(0,K)]; dist={}\n    while heap:\n        d,u=heapq.heappop(heap)\n        if u in dist: continue\n        dist[u]=d\n        for v,w in graph[u]: heapq.heappush(heap,(d+w,v))\n    return max(dist.values()) if len(dist)==N else -1",
  "language": "python"
},
{
  "title": "Alien Dictionary",
  "description": "Determine the character order from a sorted list of words. Build a graph of characters and apply topological sort to find a valid order.",
  "codeSnippet": "from collections import defaultdict,deque\n\ndef alienOrder(words):\n    graph=defaultdict(set); indegree={c:0 for word in words for c in word}\n    for i in range(len(words)-1):\n        for a,b in zip(words[i],words[i+1]):\n            if a!=b and b not in graph[a]: graph[a].add(b); indegree[b]+=1; break\n    q=deque([c for c in indegree if indegree[c]==0]); res=''\n    while q: c=q.popleft(); res+=c\n        for nei in graph[c]: indegree[nei]-=1; q.append(nei) if indegree[nei]==0 else None\n    return res if len(res)==len(indegree) else ''",
  "language": "python"
},
{
  "title": "Redundant Connection",
  "description": "Given edges forming a tree plus one extra edge, find the edge creating a cycle. Use Union-Find (Disjoint Set) to detect cycles efficiently.",
  "codeSnippet": "def findRedundantConnection(edges):\n    parent=[i for i in range(len(edges)+1)]\n    def find(x):\n        while parent[x]!=x: parent[x]=parent[parent[x]]; x=parent[x]\n        return x\n    for u,v in edges:\n        pu,pv=find(u),find(v)\n        if pu==pv: return [u,v]\n        parent[pu]=pv",
  "language": "python"
},
{
  "title": "Course Schedule III",
  "description": "Schedule the maximum number of courses given deadlines and durations. Sort by deadlines and use a max-heap to drop long courses when exceeding time.",
  "codeSnippet": "import heapq\n\ndef scheduleCourse(courses):\n    courses.sort(key=lambda x:x[1]); h=[]; time=0\n    for dur,end in courses:\n        time+=dur; heapq.heappush(h,-dur)\n        if time>end: time+=heapq.heappop(h)\n    return len(h)",
  "language": "python"
},
{
  "title": "Reconstruct Itinerary",
  "description": "Given airline tickets, reconstruct the itinerary in lexical order. Use Hierholzer's algorithm to find an Eulerian path in the graph.",
  "codeSnippet": "from collections import defaultdict\n\ndef findItinerary(tickets):\n    graph=defaultdict(list)\n    for u,v in sorted(tickets,reverse=True): graph[u].append(v)\n    res=[]\n    def visit(u):\n        while graph[u]: visit(graph[u].pop())\n        res.append(u)\n    visit('JFK'); return res[::-1]",
  "language": "python"
},
{
  "title": "Critical Connections in a Network",
  "description": "Find all edges which, if removed, increase the number of connected components. Use Tarjan’s algorithm (DFS with discovery & low time).",
  "codeSnippet": "def criticalConnections(n,connections):\n    graph={i:[] for i in range(n)}\n    for u,v in connections: graph[u].append(v); graph[v].append(u)\n    disc=[-1]*n; low=[-1]*n; res=[]; time=0\n    def dfs(u,p):\n        nonlocal time\n        disc[u]=low[u]=time; time+=1\n        for v in graph[u]:\n            if v==p: continue\n            if disc[v]==-1: dfs(v,u); low[u]=min(low[u],low[v]);\n            else: low[u]=min(low[u],disc[v])\n            if low[v]>disc[u]: res.append([u,v])\n    dfs(0,-1); return res",
  "language": "python"
},
{
  "title": "Minimum Height Trees",
  "description": "Find all roots producing minimum height trees. Iteratively remove leaves (nodes with degree 1) using a queue until 1 or 2 nodes remain.",
  "codeSnippet": "from collections import defaultdict,deque\n\ndef findMinHeightTrees(n,edges):\n    if n==1: return [0]\n    graph=defaultdict(set)\n    for u,v in edges: graph[u].add(v); graph[v].add(u)\n    leaves=deque([i for i in graph if len(graph[i])==1])\n    while n>2:\n        n-=len(leaves)\n        new_leaves=deque()\n        for leaf in leaves:\n            nei=graph[leaf].pop(); graph[nei].remove(leaf)\n            if len(graph[nei])==1: new_leaves.append(nei)\n        leaves=new_leaves\n    return list(leaves)",
  "language": "python"
},
{
  "title": "Cheapest Path in Grid",
  "description": "Find minimum cost path from top-left to bottom-right. Use Dijkstra’s algorithm on grid where each cell is a node with weighted edges to neighbors.",
  "codeSnippet": "import heapq\n\ndef minPath(grid):\n    m,n=len(grid),len(grid[0])\n    heap=[(grid[0][0],0,0)]; dist={(0,0):grid[0][0]}\n    while heap:\n        cost,r,c=heapq.heappop(heap)\n        if r==m-1 and c==n-1: return cost\n        for x,y in [(1,0),(0,1),(-1,0),(0,-1)]:\n            nr,nc=r+x,c+y\n            if 0<=nr<m and 0<=nc<n and cost+grid[nr][nc]<dist.get((nr,nc),float('inf')):\n                dist[(nr,nc)]=cost+grid[nr][nc]; heapq.heappush(heap,(dist[(nr,nc)],nr,nc))",
  "language": "python"
},
{
  "title": "Bipartite Graph Check",
  "description": "Check if a graph can be colored with 2 colors without adjacent nodes sharing a color. Use BFS or DFS to assign colors and detect conflicts.",
  "codeSnippet": "from collections import deque\n\ndef isBipartite(graph):\n    color={}\n    for node in range(len(graph)):\n        if node not in color:\n            q=deque([node]); color[node]=0\n            while q:\n                u=q.popleft()\n                for v in graph[u]:\n                    if v in color:\n                        if color[v]==color[u]: return False\n                    else:\n                        color[v]=1-color[u]; q.append(v)\n    return True",
  "language": "python"
},
{
  "title": "Graph Valid Tree",
  "description": "Check if a graph is a valid tree. A graph is a tree if it has exactly n-1 edges and is fully connected. Use DFS or Union-Find to verify.",
  "codeSnippet": "def validTree(n,edges):\n    if len(edges)!=n-1: return False\n    parent=list(range(n))\n    def find(x):\n        while parent[x]!=x: parent[x]=parent[parent[x]]; x=parent[x]\n        return x\n    for u,v in edges:\n        pu,pv=find(u),find(v)\n        if pu==pv: return False\n        parent[pu]=pv\n    return True",
  "language": "python"
},
{
  "title": "Is Graph Connected",
  "description": "Check if all nodes are connected in an undirected graph. Perform DFS/BFS from any node and verify that all nodes are visited.",
  "codeSnippet": "from collections import defaultdict\n\ndef isConnected(n,edges):\n    graph=defaultdict(list)\n    for u,v in edges: graph[u].append(v); graph[v].append(u)\n    seen=set()\n    def dfs(u):\n        if u in seen: return\n        seen.add(u)\n        for v in graph[u]: dfs(v)\n    dfs(0)\n    return len(seen)==n",
  "language": "python"
},
{
  "title": "Word Ladder",
  "description": "Find the shortest transformation sequence from beginWord to endWord by changing one letter at a time. Use BFS to explore neighbors efficiently.",
  "codeSnippet": "from collections import deque\n\ndef ladderLength(begin,end,wordList):\n    wordSet=set(wordList)\n    q=deque([(begin,1)])\n    while q:\n        word,steps=q.popleft()\n        if word==end: return steps\n        for i in range(len(word)):\n            for c in 'abcdefghijklmnopqrstuvwxyz':\n                nxt=word[:i]+c+word[i+1:]\n                if nxt in wordSet:\n                    wordSet.remove(nxt); q.append((nxt,steps+1))\n    return 0",
  "language": "python"
},
{
  "title": "Graph Coloring Problem",
  "description": "Assign colors to graph vertices such that no two adjacent vertices share the same color. Use backtracking to attempt k-coloring of nodes.",
  "codeSnippet": "def graphColoring(graph,m):\n    n=len(graph); colors=[0]*n\n    def safe(node,c):\n        for nei in range(n):\n            if graph[node][nei]==1 and colors[nei]==c: return False\n        return True\n    def dfs(node):\n        if node==n: return True\n        for c in range(1,m+1):\n            if safe(node,c):\n                colors[node]=c\n                if dfs(node+1): return True\n                colors[node]=0\n        return False\n    return dfs(0)",
  "language": "python"
},
{
  "title": "Knight’s Shortest Path",
  "description": "Find the minimum steps for a knight to move from a source to a target in an infinite chessboard. Use BFS to explore valid moves.",
  "codeSnippet": "from collections import deque\n\ndef minKnightMoves(x,y):\n    q=deque([(0,0,0)])\n    seen={(0,0)}\n    moves=[(1,2),(2,1),(-1,2),(-2,1),(1,-2),(2,-1),(-1,-2),(-2,-1)]\n    while q:\n        i,j,steps=q.popleft()\n        if (i,j)==(x,y): return steps\n        for dx,dy in moves:\n            ni,nj=i+dx,j+dy\n            if (ni,nj) not in seen:\n                seen.add((ni,nj)); q.append((ni,nj,steps+1))",
  "language": "python"
},
{
  "title": "Evaluate Division",
  "description": "Given equations like a/b=2, evaluate queries like a/c. Build a weighted graph and use DFS/BFS to compute ratios between variables.",
  "codeSnippet": "from collections import defaultdict\n\ndef calcEquation(equations,values,queries):\n    graph=defaultdict(list)\n    for (a,b),v in zip(equations,values):\n        graph[a].append((b,v)); graph[b].append((a,1/v))\n    def dfs(src,dst,seen):\n        if src==dst: return 1\n        for nei,w in graph[src]:\n            if nei not in seen:\n                seen.add(nei)\n                val=dfs(nei,dst,seen)\n                if val!=-1: return val*w\n        return -1\n    res=[]\n    for a,b in queries:\n        if a not in graph or b not in graph: res.append(-1)\n        else: res.append(dfs(a,b,set([a])))\n    return res",
  "language": "python"
},
{
  "title": "Accounts Merge",
  "description": "Merge accounts with common emails. Model accounts as graph nodes and use DFS/Union-Find to connect and merge overlapping accounts.",
  "codeSnippet": "from collections import defaultdict\n\ndef accountsMerge(accounts):\n    graph=defaultdict(list); email_to_name={}\n    for acc in accounts:\n        name=acc[0]\n        for email in acc[1:]:\n            graph[acc[1]].append(email); graph[email].append(acc[1])\n            email_to_name[email]=name\n    seen=set(); res=[]\n    def dfs(email,comp):\n        if email in seen: return\n        seen.add(email); comp.append(email)\n        for nei in graph[email]: dfs(nei,comp)\n    for email in graph:\n        if email not in seen:\n            comp=[]; dfs(email,comp)\n            res.append([email_to_name[email]]+sorted(comp))\n    return res",
  "language": "python"
},
{
  "title": "Clone Graph",
  "description": "Given a reference node of a connected undirected graph, return a deep copy. Use DFS or BFS with a hashmap to map original to cloned nodes.",
  "codeSnippet": "class Node:\n    def __init__(self,val,neighbors=None):\n        self.val=val; self.neighbors=neighbors if neighbors else []\n\ndef cloneGraph(node):\n    if not node: return None\n    mapping={}\n    def dfs(n):\n        if n in mapping: return mapping[n]\n        copy=Node(n.val); mapping[n]=copy\n        for nei in n.neighbors: copy.neighbors.append(dfs(nei))\n        return copy\n    return dfs(node)",
  "language": "python"
},
{
  "title": "Longest Path in DAG",
  "description": "Find the longest path in a Directed Acyclic Graph. Use topological sorting and relax edges in linear order to compute longest distances.",
  "codeSnippet": "from collections import defaultdict\n\ndef longestPath(n,edges):\n    graph=defaultdict(list); indeg=[0]*n\n    for u,v in edges: graph[u].append(v); indeg[v]+=1\n    topo=[]; stack=[i for i in range(n) if indeg[i]==0]\n    while stack:\n        u=stack.pop(); topo.append(u)\n        for v in graph[u]: indeg[v]-=1; stack.append(v) if indeg[v]==0 else None\n    dist=[0]*n\n    for u in topo:\n        for v in graph[u]: dist[v]=max(dist[v],dist[u]+1)\n    return max(dist)",
  "language": "python"
},
{
  "title": "Island Perimeter",
  "description": "Given a grid representing land and water, compute the perimeter of the island. Count exposed edges of land cells.",
  "codeSnippet": "def islandPerimeter(grid):\n    m,n=len(grid),len(grid[0]); peri=0\n    for i in range(m):\n        for j in range(n):\n            if grid[i][j]==1:\n                peri+=4\n                if i>0 and grid[i-1][j]==1: peri-=2\n                if j>0 and grid[i][j-1]==1: peri-=2\n    return peri",
  "language": "python"
},
{
  "title": "Check Bipartite Graph",
  "description": "Determine if a graph is bipartite using BFS coloring. Assign alternate colors to adjacent nodes and detect conflicts.",
  "codeSnippet": "from collections import deque\n\ndef isBipartite(n, edges):\n    graph=[[] for _ in range(n)]\n    for u,v in edges: graph[u].append(v); graph[v].append(u)\n    color=[-1]*n\n    for i in range(n):\n        if color[i]==-1:\n            q=deque([i]); color[i]=0\n            while q:\n                u=q.popleft()\n                for v in graph[u]:\n                    if color[v]==-1: color[v]=1-color[u]; q.append(v)\n                    elif color[v]==color[u]: return False\n    return True",
  "language": "python"
},
{
  "title": "Number of Connected Components",
  "description": "Count the number of connected components in an undirected graph using DFS/BFS traversal.",
  "codeSnippet": "from collections import defaultdict\n\ndef countComponents(n, edges):\n    graph=defaultdict(list)\n    for u,v in edges: graph[u].append(v); graph[v].append(u)\n    seen=set(); count=0\n    def dfs(u):\n        for v in graph[u]:\n            if v not in seen:\n                seen.add(v); dfs(v)\n    for i in range(n):\n        if i not in seen:\n            seen.add(i); dfs(i); count+=1\n    return count",
  "language": "python"
},
{
  "title": "Dijkstra Shortest Path",
  "description": "Find the shortest path from a source to all nodes using Dijkstra’s algorithm with a priority queue (min-heap).",
  "codeSnippet": "import heapq\n\ndef dijkstra(n, edges, src):\n    graph=[[] for _ in range(n)]\n    for u,v,w in edges: graph[u].append((v,w))\n    dist=[float('inf')]*n; dist[src]=0\n    pq=[(0,src)]\n    while pq:\n        d,u=heapq.heappop(pq)\n        if d>dist[u]: continue\n        for v,w in graph[u]:\n            if dist[v]>d+w:\n                dist[v]=d+w\n                heapq.heappush(pq,(dist[v],v))\n    return dist",
  "language": "python"
},
{
  "title": "Detect Cycle in Undirected Graph",
  "description": "Check if an undirected graph contains a cycle using DFS and tracking parent nodes.",
  "codeSnippet": "from collections import defaultdict\n\ndef hasCycle(n, edges):\n    graph=defaultdict(list)\n    for u,v in edges: graph[u].append(v); graph[v].append(u)\n    seen=set()\n    def dfs(u,parent):\n        seen.add(u)\n        for v in graph[u]:\n            if v not in seen:\n                if dfs(v,u): return True\n            elif v!=parent: return True\n        return False\n    for i in range(n):\n        if i not in seen:\n            if dfs(i,-1): return True\n    return False",
  "language": "python"
},
{
  "title": "Bellman-Ford Shortest Path",
  "description": "Compute shortest paths from a source, even with negative weights. Detect negative cycles by running one extra iteration.",
  "codeSnippet": "def bellmanFord(n, edges, src):\n    dist=[float('inf')]*n; dist[src]=0\n    for _ in range(n-1):\n        for u,v,w in edges:\n            if dist[u]+w<dist[v]:\n                dist[v]=dist[u]+w\n    for u,v,w in edges:\n        if dist[u]+w<dist[v]: return None  # negative cycle\n    return dist",
  "language": "python"
},
{
  "title": "Bellman-Ford Shortest Path",
  "description": "Compute shortest paths from a source, even with negative weights. Detect negative cycles by running one extra iteration.",
  "codeSnippet": "def bellmanFord(n, edges, src):\n    dist=[float('inf')]*n; dist[src]=0\n    for _ in range(n-1):\n        for u,v,w in edges:\n            if dist[u]+w<dist[v]:\n                dist[v]=dist[u]+w\n    for u,v,w in edges:\n        if dist[u]+w<dist[v]: return None  # negative cycle\n    return dist",
  "language": "python"
},
{
  "title": "Clone Graph",
  "description": "Deep copy an undirected graph. Use DFS or BFS to create new nodes and map old nodes to new nodes to preserve structure.",
  "codeSnippet": "class Node:\n    def __init__(self,val,neighbors=None):\n        self.val=val; self.neighbors=neighbors or []\n\ndef cloneGraph(node):\n    if not node: return None\n    oldToNew={}\n    def dfs(n):\n        if n in oldToNew: return oldToNew[n]\n        copy=Node(n.val)\n        oldToNew[n]=copy\n        for nei in n.neighbors:\n            copy.neighbors.append(dfs(nei))\n        return copy\n    return dfs(node)",
  "language": "python"
},
{
  "title": "Redundant Connection",
  "description": "Given a graph that was originally a tree, find the edge that creates a cycle. Use Union-Find to detect the extra edge.",
  "codeSnippet": "def findRedundantConnection(edges):\n    parent=list(range(len(edges)+1))\n    def find(x):\n        if parent[x]!=x: parent[x]=find(parent[x])\n        return parent[x]\n    def union(x,y):\n        rx,ry=find(x),find(y)\n        if rx==ry: return False\n        parent[ry]=rx; return True\n    for u,v in edges:\n        if not union(u,v): return [u,v]",
  "language": "python"
},
{
  "title": "Critical Connections (Bridges in Graph)",
  "description": "Find all critical connections (bridges) in a network. Use Tarjan’s algorithm with DFS to track discovery and low-link values.",
  "codeSnippet": "def criticalConnections(n, connections):\n    graph=[[] for _ in range(n)]\n    for u,v in connections:\n        graph[u].append(v); graph[v].append(u)\n    res=[]; low=[0]*n; disc=[-1]*n; time=0\n    def dfs(u,p):\n        nonlocal time\n        disc[u]=low[u]=time; time+=1\n        for v in graph[u]:\n            if v==p: continue\n            if disc[v]==-1:\n                dfs(v,u); low[u]=min(low[u],low[v])\n                if low[v]>disc[u]: res.append([u,v])\n            else:\n                low[u]=min(low[u],disc[v])\n    dfs(0,-1)\n    return res",
  "language": "python"
},
{
  "title": "Alien Dictionary",
  "description": "Given a sorted dictionary of an alien language, determine the order of characters. Build a graph of precedence and perform topological sort to find valid ordering.",
  "codeSnippet": "from collections import defaultdict,deque\n\ndef alienOrder(words):\n    graph=defaultdict(set); indeg={c:0 for w in words for c in w}\n    for w1,w2 in zip(words,words[1:]):\n        for c1,c2 in zip(w1,w2):\n            if c1!=c2:\n                if c2 not in graph[c1]:\n                    graph[c1].add(c2); indeg[c2]+=1\n                break\n        else:\n            if len(w1)>len(w2): return ''\n    q=deque([c for c in indeg if indeg[c]==0]); res=''\n    while q:\n        c=q.popleft(); res+=c\n        for nei in graph[c]:\n            indeg[nei]-=1\n            if indeg[nei]==0: q.append(nei)\n    return res if len(res)==len(indeg) else ''",
  "language": "python"
},
{
  "title": "Reconstruct Itinerary",
  "description": "Given flight tickets, reconstruct the itinerary starting from 'JFK' that uses all tickets once. Use DFS with lexical ordering to build the path.",
  "codeSnippet": "from collections import defaultdict\n\ndef findItinerary(tickets):\n    graph=defaultdict(list)\n    for u,v in sorted(tickets,reverse=True): graph[u].append(v)\n    res=[]\n    def dfs(u):\n        while graph[u]: dfs(graph[u].pop())\n        res.append(u)\n    dfs('JFK')\n    return res[::-1]",
  "language": "python"
},
{
  "title": "Critical Connections in Network",
  "description": "Find all bridges in a graph whose removal increases connected components. Use Tarjan’s algorithm with DFS timestamps and low-link values.",
  "codeSnippet": "def criticalConnections(n,connections):\n    graph=[[] for _ in range(n)]\n    for u,v in connections:\n        graph[u].append(v); graph[v].append(u)\n    disc=[-1]*n; low=[0]*n; res=[]; time=0\n    def dfs(u,parent):\n        nonlocal time\n        disc[u]=low[u]=time; time+=1\n        for v in graph[u]:\n            if v==parent: continue\n            if disc[v]==-1:\n                dfs(v,u); low[u]=min(low[u],low[v])\n                if low[v]>disc[u]: res.append([u,v])\n            else:\n                low[u]=min(low[u],disc[v])\n    for i in range(n):\n        if disc[i]==-1: dfs(i,-1)\n    return res",
  "language": "python"
},
{
  "title": "Count Connected Components",
  "description": "Count how many connected components exist in an undirected graph. Use DFS or Union-Find to explore and group nodes efficiently.",
  "codeSnippet": "def countComponents(n,edges):\n    graph=[[] for _ in range(n)]\n    for u,v in edges: graph[u].append(v); graph[v].append(u)\n    visited=set(); count=0\n    def dfs(u):\n        for v in graph[u]:\n            if v not in visited:\n                visited.add(v); dfs(v)\n    for i in range(n):\n        if i not in visited:\n            visited.add(i); dfs(i); count+=1\n    return count",
  "language": "python"
},
{
  "title": "Evaluate Division",
  "description": "Given equations like a/b=2.0, evaluate queries. Build weighted graph and use DFS/BFS to compute ratio between variables.",
  "codeSnippet": "from collections import defaultdict\n\ndef calcEquation(equations,values,queries):\n    graph=defaultdict(list)\n    for (a,b),val in zip(equations,values):\n        graph[a].append((b,val))\n        graph[b].append((a,1/val))\n    def dfs(u,v,visited):\n        if u==v: return 1.0\n        visited.add(u)\n        for nei,val in graph[u]:\n            if nei not in visited:\n                res=dfs(nei,v,visited)\n                if res!=-1: return res*val\n        return -1\n    ans=[]\n    for u,v in queries:\n        ans.append(dfs(u,v,set()) if u in graph and v in graph else -1)\n    return ans",
  "language": "python"
},
{
  "title": "Find Eventual Safe States",
  "description": "Identify nodes that eventually lead to terminal nodes without entering a cycle. Use reverse graph + topological sorting or DFS with states.",
  "codeSnippet": "def eventualSafeNodes(graph):\n    n=len(graph); outdeg=[len(g) for g in graph]\n    rev=[[] for _ in range(n)]\n    for u in range(n):\n        for v in graph[u]: rev[v].append(u)\n    q=[i for i,d in enumerate(outdeg) if d==0]\n    safe=[False]*n\n    while q:\n        u=q.pop(); safe[u]=True\n        for v in rev[u]:\n            outdeg[v]-=1\n            if outdeg[v]==0: q.append(v)\n    return [i for i in range(n) if safe[i]]",
  "language": "python"
},
{
  "title": "Detect Cycle in Directed Graph",
  "description": "Check if a directed graph has a cycle. Use DFS with recursion stack or Kahn’s algorithm (topological sort) to detect cycles efficiently.",
  "codeSnippet": "def hasCycle(graph):\n    n=len(graph); visited=[0]*n\n    def dfs(u):\n        if visited[u]==1: return True\n        if visited[u]==2: return False\n        visited[u]=1\n        for v in graph[u]:\n            if dfs(v): return True\n        visited[u]=2\n        return False\n    for i in range(n):\n        if visited[i]==0 and dfs(i): return True\n    return False",
  "language": "python"
},
 {
    "title": "Shortest Path in Unweighted Graph",
    "description": "Find shortest path from source using BFS since all edge weights are equal.",
    "codeSnippet": "from collections import deque\n\ndef shortestPath(n,edges,src):\n    g=[[] for _ in range(n)]\n    for u,v in edges: g[u].append(v); g[v].append(u)\n    dist=[-1]*n; dist[src]=0\n    q=deque([src])\n    while q:\n        u=q.popleft()\n        for v in g[u]:\n            if dist[v]==-1:\n                dist[v]=dist[u]+1; q.append(v)\n    return dist",
    "language": "python"
  },
    {
    "title": "Course Schedule Feasibility",
    "description": "Check if all courses can be finished. Equivalent to detecting cycle in a DAG using Kahn’s Algorithm.",
    "codeSnippet": "def canFinish(n,prereq):\n    g=[[] for _ in range(n)]; indeg=[0]*n\n    for u,v in prereq: g[v].append(u); indeg[u]+=1\n    q=[i for i in range(n) if indeg[i]==0]; visited=0\n    while q:\n        u=q.pop(0); visited+=1\n        for v in g[u]:\n            indeg[v]-=1\n            if indeg[v]==0: q.append(v)\n    return visited==n",
    "language": "python"
  },
    {
    "title": "Word Ladder Shortest Path",
    "description": "Find shortest transformation sequence using BFS in word graph.",
    "codeSnippet": "from collections import deque\n\ndef ladderLength(begin,end,wordList):\n    wordSet=set(wordList)\n    if end not in wordSet: return 0\n    q=deque([(begin,1)])\n    while q:\n        word,steps=q.popleft()\n        if word==end: return steps\n        for i in range(len(word)):\n            for c in 'abcdefghijklmnopqrstuvwxyz':\n                nxt=word[:i]+c+word[i+1:]\n                if nxt in wordSet:\n                    wordSet.remove(nxt)\n                    q.append((nxt,steps+1))\n    return 0",
    "language": "python"
  },
   {
    "title": "All Paths from Source to Target",
    "description": "Find all paths in a DAG from source to target using DFS backtracking.",
    "codeSnippet": "def allPathsSourceTarget(graph):\n    res=[]; n=len(graph)\n    def dfs(u,path):\n        if u==n-1:\n            res.append(path[:]); return\n        for v in graph[u]:\n            path.append(v); dfs(v,path); path.pop()\n    dfs(0,[0]); return res",
    "language": "python"
  },

 {
    "title": "Pacific Atlantic Water Flow",
    "description": "Use DFS/BFS from ocean borders to mark reachable cells, then intersect results.",
    "codeSnippet": "def pacificAtlantic(heights):\n    m,n=len(heights),len(heights[0])\n    pac=set(); atl=set()\n    def dfs(i,j,vis,prev):\n        if (i,j) in vis or i<0 or j<0 or i>=m or j>=n or heights[i][j]<prev: return\n        vis.add((i,j))\n        for dx,dy in [(1,0),(-1,0),(0,1),(0,-1)]: dfs(i+dx,j+dy,vis,heights[i][j])\n    for i in range(m): dfs(i,0,pac,0); dfs(i,n-1,atl,0)\n    for j in range(n): dfs(0,j,pac,0); dfs(m-1,j,atl,0)\n    return list(pac & atl)",
    "language": "python"
  },
  {
    "title": "Graph Valid Tree",
    "description": "Check if undirected graph is a tree: must be connected and have n-1 edges.",
    "codeSnippet": "def validTree(n,edges):\n    if len(edges)!=n-1: return False\n    g=[[] for _ in range(n)]\n    for u,v in edges: g[u].append(v); g[v].append(u)\n    seen=set()\n    def dfs(u):\n        for v in g[u]:\n            if v not in seen:\n                seen.add(v); dfs(v)\n    seen.add(0); dfs(0)\n    return len(seen)==n",
    "language": "python"
  },
  ];
}
private getHeapHints(): Hint[] {
  return [
    {
    "title": "Heapify Array (Min-Heap)",
    "description": "Convert an array into a min-heap in O(n) time using bottom-up heapify.",
    "codeSnippet": "import heapq\n\ndef buildMinHeap(arr):\n    heapq.heapify(arr)\n    return arr",
    "language": "python"
  },
  {
    "title": "Heapify Array (Max-Heap)",
    "description": "Convert an array into a max-heap by pushing negative values into a min-heap.",
    "codeSnippet": "import heapq\n\ndef buildMaxHeap(arr):\n    return [-x for x in heapq.heapify([-a for a in arr])]",
    "language": "python"
  },
    {
    "title": "Kth Largest Element",
    "description": "Maintain a min-heap of size k and pop smallest when heap grows beyond k.",
    "codeSnippet": "import heapq\n\ndef kthLargest(nums,k):\n    heap=[]\n    for n in nums:\n        heapq.heappush(heap,n)\n        if len(heap)>k: heapq.heappop(heap)\n    return heap[0]",
    "language": "python"
  },
  {
    "title": "Kth Smallest Element",
    "description": "Maintain a max-heap of size k to track kth smallest efficiently.",
    "codeSnippet": "import heapq\n\ndef kthSmallest(nums,k):\n    heap=[-x for x in nums[:k]]\n    heapq.heapify(heap)\n    for n in nums[k:]:\n        if -heap[0]>n:\n            heapq.heappop(heap); heapq.heappush(heap,-n)\n    return -heap[0]",
    "language": "python"
  },
   {
    "title": "Find Median from Data Stream",
    "description": "Use two heaps: max-heap for left half, min-heap for right half. Balance sizes to get median.",
    "codeSnippet": "import heapq\n\nclass MedianFinder:\n    def __init__(self):\n        self.small=[]; self.large=[]\n    def addNum(self,num):\n        heapq.heappush(self.small,-num)\n        if self.large and -self.small[0]>self.large[0]:\n            heapq.heappush(self.large,-heapq.heappop(self.small))\n        if len(self.small)>len(self.large)+1:\n            heapq.heappush(self.large,-heapq.heappop(self.small))\n        if len(self.large)>len(self.small):\n            heapq.heappush(self.small,-heapq.heappop(self.large))\n    def findMedian(self):\n        if len(self.small)>len(self.large): return -self.small[0]\n        return (-self.small[0]+self.large[0])/2",
    "language": "python"
  },
  {
    "title": "Top K Frequent Elements",
    "description": "Use min-heap of size k to store frequencies and return top k frequent numbers.",
    "codeSnippet": "import heapq\nfrom collections import Counter\n\ndef topKFrequent(nums,k):\n    cnt=Counter(nums)\n    return [x for x,_ in heapq.nlargest(k,cnt.items(),key=lambda x:x[1])]",
    "language": "python"
  },
   {
    "title": "K Closest Numbers",
    "description": "Use max-heap of size k based on distance from target x.",
    "codeSnippet": "import heapq\n\ndef kClosest(nums,k,x):\n    heap=[]\n    for n in nums:\n        heapq.heappush(heap,(-abs(n-x),-n))\n        if len(heap)>k: heapq.heappop(heap)\n    return sorted([-v for d,v in heap])",
    "language": "python"
  },
  {
    "title": "Merge K Sorted Lists",
    "description": "Use a min-heap to merge nodes from k sorted linked lists efficiently.",
    "codeSnippet": "import heapq\n\ndef mergeKLists(lists):\n    heap=[]\n    for i,l in enumerate(lists):\n        if l: heapq.heappush(heap,(l.val,i,l))\n    dummy=cur=ListNode(0)\n    while heap:\n        val,i,node=heapq.heappop(heap)\n        cur.next=node; cur=cur.next\n        if node.next: heapq.heappush(heap,(node.next.val,i,node.next))\n    return dummy.next",
    "language": "python"
  },
  {
    "title": "Connect Ropes with Minimum Cost",
    "description": "Use min-heap to always connect the two smallest ropes first.",
    "codeSnippet": "import heapq\n\ndef minCost(ropes):\n    heapq.heapify(ropes); cost=0\n    while len(ropes)>1:\n        a=heapq.heappop(ropes); b=heapq.heappop(ropes)\n        cost+=a+b\n        heapq.heappush(ropes,a+b)\n    return cost",
    "language": "python"
  },
  {
    "title": "K Pairs with Smallest Sums",
    "description": "Use min-heap to store pairs (sum, i, j). Pop k smallest sums.",
    "codeSnippet": "import heapq\n\ndef kSmallestPairs(nums1,nums2,k):\n    res=[]; heap=[]\n    for i in range(min(k,len(nums1))):\n        heapq.heappush(heap,(nums1[i]+nums2[0],i,0))\n    while heap and len(res)<k:\n        s,i,j=heapq.heappop(heap); res.append([nums1[i],nums2[j]])\n        if j+1<len(nums2):\n            heapq.heappush(heap,(nums1[i]+nums2[j+1],i,j+1))\n    return res",
    "language": "python"
  },
   {
    "title": "Reorganize String",
    "description": "Use max-heap on character counts to rearrange string without adjacent duplicates.",
    "codeSnippet": "import heapq\nfrom collections import Counter\n\ndef reorganizeString(s):\n    cnt=Counter(s); heap=[(-v,k) for k,v in cnt.items()]\n    heapq.heapify(heap); res=[]\n    while len(heap)>1:\n        v1,c1=heapq.heappop(heap); v2,c2=heapq.heappop(heap)\n        res+=c1+c2\n        if v1+1: heapq.heappush(heap,(v1+1,c1))\n        if v2+1: heapq.heappush(heap,(v2+1,c2))\n    if heap:\n        if -heap[0][0]>1: return \"\"\n        res+=heap[0][1]\n    return \"\".join(res)",
    "language": "python"
  },
   {
    "title": "Task Scheduler",
    "description": "Use max-heap of frequencies and cooldown queue to schedule tasks with minimum intervals.",
    "codeSnippet": "import heapq\nfrom collections import Counter,deque\n\ndef leastInterval(tasks,n):\n    cnt=Counter(tasks)\n    heap=[-c for c in cnt.values()]\n    heapq.heapify(heap)\n    time=0; q=deque()\n    while heap or q:\n        time+=1\n        if heap:\n            c=1+heapq.heappop(heap)\n            if c: q.append((c,time+n))\n        if q and q[0][1]==time:\n            heapq.heappush(heap,q.popleft()[0])\n    return time",
    "language": "python"
  },
  {
    "title": "Ugly Numbers",
    "description": "Generate ugly numbers using min-heap and set to avoid duplicates.",
    "codeSnippet": "import heapq\n\ndef nthUglyNumber(n):\n    heap=[1]; seen={1}\n    for _ in range(n):\n        u=heapq.heappop(heap)\n        for f in [2,3,5]:\n            if u*f not in seen:\n                seen.add(u*f); heapq.heappush(heap,u*f)\n    return u",
    "language": "python"
  },
   {
    "title": "Find Smallest Range Covering Elements from K Lists",
    "description": "Use min-heap to track smallest element and a variable for largest element.",
    "codeSnippet": "import heapq\n\ndef smallestRange(lists):\n    heap=[]; maxv=float('-inf')\n    for i,l in enumerate(lists):\n        heapq.heappush(heap,(l[0],i,0)); maxv=max(maxv,l[0])\n    res=[-1e9,1e9]\n    while heap:\n        v,i,j=heapq.heappop(heap)\n        if maxv-v<res[1]-res[0]: res=[v,maxv]\n        if j+1==len(lists[i]): break\n        nxt=lists[i][j+1]\n        heapq.heappush(heap,(nxt,i,j+1)); maxv=max(maxv,nxt)\n    return res",
    "language": "python"
  },
    {
    "title": "Maximize Capital (IPO Problem)",
    "description": "Use two heaps: one max-heap for profits, one min-heap for projects by capital.",
    "codeSnippet": "import heapq\n\ndef findMaximizedCapital(k,w,profits,capital):\n    projects=list(zip(capital,profits))\n    projects.sort()\n    i=0; heap=[]\n    for _ in range(k):\n        while i<len(projects) and projects[i][0]<=w:\n            heapq.heappush(heap,-projects[i][1]); i+=1\n        if not heap: break\n        w-=heapq.heappop(heap)\n    return w",
    "language": "python"
  },
    {
    "title": "Sort Characters by Frequency",
    "description": "Use max-heap based on character frequency to build sorted string.",
    "codeSnippet": "import heapq\nfrom collections import Counter\n\ndef frequencySort(s):\n    cnt=Counter(s)\n    heap=[(-v,k) for k,v in cnt.items()]\n    heapq.heapify(heap); res=\"\"\n    while heap:\n        v,c=heapq.heappop(heap)\n        res+=c*(-v)\n    return res",
    "language": "python"
  },
   {
    "title": "Find K Closest Points to Origin",
    "description": "Use max-heap of size k based on distance squared from origin.",
    "codeSnippet": "import heapq\n\ndef kClosest(points,k):\n    heap=[]\n    for x,y in points:\n        d=-(x*x+y*y)\n        heapq.heappush(heap,(d,x,y))\n        if len(heap)>k: heapq.heappop(heap)\n    return [(x,y) for d,x,y in heap]",
    "language": "python"
  },
    {
    "title": "Minimum Cost to Hire K Workers",
    "description": "Sort by ratio and use max-heap to keep track of smallest total wage.",
    "codeSnippet": "import heapq\n\ndef mincostToHireWorkers(quality,wage,k):\n    workers=sorted([(w/q,q) for q,w in zip(quality,wage)])\n    res=float('inf'); total=0; heap=[]\n    for ratio,q in workers:\n        heapq.heappush(heap,-q); total+=q\n        if len(heap)>k: total+=heapq.heappop(heap)\n        if len(heap)==k: res=min(res,total*ratio)\n    return res",
    "language": "python"
  },
   {
    "title": "Maximum Sum After K Negations",
    "description": "Use min-heap to always negate the smallest number k times.",
    "codeSnippet": "import heapq\n\ndef largestSumAfterKNegations(nums,k):\n    heapq.heapify(nums)\n    for _ in range(k):\n        x=heapq.heappop(nums)\n        heapq.heappush(nums,-x)\n    return sum(nums)",
    "language": "python"
  },
   {
    "title": "Find SkyLine Problem",
    "description": "Use max-heap of building heights with sweeping line algorithm.",
    "codeSnippet": "import heapq\n\ndef getSkyline(buildings):\n    events=[(l,-h,r) for l,r,h in buildings]\n    events+=[(r,0,0) for _,r,_ in buildings]\n    events.sort(); res=[[0,0]]; heap=[(0,float('inf'))]\n    for x,h,r in events:\n        while heap[0][1]<=x: heapq.heappop(heap)\n        if h: heapq.heappush(heap,(h,r))\n        if res[-1][1]!=-heap[0][0]: res.append([x,-heap[0][0]])\n    return res[1:]",
    "language": "python"
  },
  {
  "title": "Kth Smallest Element in Sorted Matrix",
  "description": "Each row and column is sorted. Use a min-heap to push elements row-wise and extract k times to find the kth smallest.",
  "codeSnippet": "import heapq\n\ndef kthSmallest(matrix,k):\n    n=len(matrix)\n    heap=[(matrix[i][0],i,0) for i in range(n)]\n    heapq.heapify(heap)\n    for _ in range(k-1):\n        val,r,c=heapq.heappop(heap)\n        if c+1<n: heapq.heappush(heap,(matrix[r][c+1],r,c+1))\n    return heap[0][0]",
  "language": "python"
},
{
  "title": "Rearrange String with No Adjacent Duplicates",
  "description": "Use a max-heap to always pick the most frequent character that is not the same as the last placed one.",
  "codeSnippet": "import heapq\nfrom collections import Counter\n\ndef rearrange(s):\n    count=Counter(s)\n    heap=[(-v,ch) for ch,v in count.items()]\n    heapq.heapify(heap)\n    res=''\n    prev=(0,'')\n    while heap:\n        v,ch=heapq.heappop(heap)\n        res+=ch\n        if prev[0]<0: heapq.heappush(heap,prev)\n        prev=(v+1,ch)\n    return res if len(res)==len(s) else ''",
  "language": "python"
},
{
  "title": "Connect Ropes with Minimum Cost",
  "description": "Always combine the two smallest ropes using a min-heap. Keep track of the total cost until one rope remains.",
  "codeSnippet": "import heapq\n\ndef minCost(ropes):\n    heapq.heapify(ropes)\n    cost=0\n    while len(ropes)>1:\n        a=heapq.heappop(ropes)\n        b=heapq.heappop(ropes)\n        cost+=a+b\n        heapq.heappush(ropes,a+b)\n    return cost",
  "language": "python"
},
{
  "title": "K Largest Numbers",
  "description": "Use a min-heap of size k to keep track of the k largest elements in the array. Return the heap at the end.",
  "codeSnippet": "import heapq\n\ndef kLargest(nums,k):\n    heap=[]\n    for n in nums:\n        heapq.heappush(heap,n)\n        if len(heap)>k:\n            heapq.heappop(heap)\n    return heap",
  "language": "python"
},
{
  "title": "Top K Frequent Words",
  "description": "Count word frequencies, then use a heap to extract the top k based on frequency and lexicographic order.",
  "codeSnippet": "import heapq\nfrom collections import Counter\n\ndef topKWords(words,k):\n    count=Counter(words)\n    heap=[(-v,w) for w,v in count.items()]\n    heapq.heapify(heap)\n    return [heapq.heappop(heap)[1] for _ in range(k)]",
  "language": "python"
},
{
  "title": "Smallest Range from K Sorted Lists",
  "description": "Use a min-heap to track the current minimum across k lists while keeping track of the maximum element in the window.",
  "codeSnippet": "import heapq\n\ndef smallestRange(lists):\n    heap=[]; maxVal=float('-inf')\n    for i,l in enumerate(lists):\n        heapq.heappush(heap,(l[0],i,0))\n        maxVal=max(maxVal,l[0])\n    res=[-1e9,1e9]\n    while heap:\n        val,i,j=heapq.heappop(heap)\n        if maxVal-val<res[1]-res[0]: res=[val,maxVal]\n        if j+1==len(lists[i]): break\n        nxt=lists[i][j+1]\n        heapq.heappush(heap,(nxt,i,j+1))\n        maxVal=max(maxVal,nxt)\n    return res",
  "language": "python"
},
{
  "title": "Find Kth Largest using Max Heap",
  "description": "Convert numbers into a max-heap (by pushing negatives) and pop k times to get the kth largest element.",
  "codeSnippet": "import heapq\n\ndef kthLargest(nums,k):\n    heap=[-n for n in nums]\n    heapq.heapify(heap)\n    for _ in range(k-1): heapq.heappop(heap)\n    return -heap[0]",
  "language": "python"
},
 {
    "title": "K Closest Points to Origin",
    "description": "Given points on a 2D plane, return the k closest points to the origin. Use a max-heap to maintain the k smallest distances while discarding larger ones. This ensures efficient retrieval of the closest points.",
    "codeSnippet": "import heapq\n\ndef kClosest(points,k):\n    heap=[]\n    for x,y in points:\n        dist=-(x*x+y*y)\n        heapq.heappush(heap,(dist,x,y))\n        if len(heap)>k: heapq.heappop(heap)\n    return [(x,y) for _,x,y in heap]",
    "language": "python"
  },
  {
    "title": "Find Smallest Range Covering K Lists",
    "description": "Given k sorted lists, find the smallest range that includes at least one number from each list. Use a min-heap to track the smallest element and a variable to track the maximum element. Continuously update the range until one list is exhausted.",
    "codeSnippet": "import heapq\n\ndef smallestRange(nums):\n    heap=[]; maxv=float('-inf')\n    for i,l in enumerate(nums):\n        heapq.heappush(heap,(l[0],i,0))\n        maxv=max(maxv,l[0])\n    res=[-1e9,1e9]\n    while heap:\n        val,i,j=heapq.heappop(heap)\n        if maxv-val<res[1]-res[0]: res=[val,maxv]\n        if j+1==len(nums[i]): break\n        nxt=nums[i][j+1]\n        heapq.heappush(heap,(nxt,i,j+1))\n        maxv=max(maxv,nxt)\n    return res",
    "language": "python"
  },
  {
    "title": "Reorganize String to Avoid Adjacent Duplicates",
    "description": "Given a string, rearrange its characters so that no two adjacent characters are the same. Use a max-heap to always pick the most frequent character, placing it in the result while keeping track of the previously used character.",
    "codeSnippet": "import heapq\nfrom collections import Counter\n\ndef reorganizeString(s):\n    count=Counter(s)\n    heap=[(-v,ch) for ch,v in count.items()]\n    heapq.heapify(heap)\n    res=''; prev=(0,'')\n    while heap:\n        v,ch=heapq.heappop(heap)\n        res+=ch\n        if prev[0]<0: heapq.heappush(heap,prev)\n        prev=(v+1,ch)\n    return res if len(res)==len(s) else ''",
    "language": "python"
  },
  {
    "title": "Minimum Cost to Connect Ropes",
    "description": "Given ropes with different lengths, connect them into one rope with minimum cost. At each step, combine the two smallest ropes using a min-heap and add their sum back into the heap until one rope remains.",
    "codeSnippet": "import heapq\n\ndef minCost(ropes):\n    heapq.heapify(ropes)\n    cost=0\n    while len(ropes)>1:\n        a=heapq.heappop(ropes)\n        b=heapq.heappop(ropes)\n        cost+=a+b\n        heapq.heappush(ropes,a+b)\n    return cost",
    "language": "python"
  },
  {
    "title": "Find Kth Smallest Element in Stream",
    "description": "Maintain a max-heap of size k while streaming numbers. If the incoming number is smaller than the largest in the heap, replace it. At the end, the root of the max-heap is the kth smallest element.",
    "codeSnippet": "import heapq\n\ndef kthSmallest(nums,k):\n    heap=[-x for x in nums[:k]]\n    heapq.heapify(heap)\n    for n in nums[k:]:\n        if -heap[0]>n:\n            heapq.heappop(heap)\n            heapq.heappush(heap,-n)\n    return -heap[0]",
    "language": "python"
  },
   {
    "title": "Find K Pairs with Smallest Sums",
    "description": "Given two sorted arrays, find k pairs (one from each array) with the smallest sums. Use a min-heap initialized with the first element of one array combined with each element of the other.",
    "codeSnippet": "import heapq\n\ndef kSmallestPairs(nums1,nums2,k):\n    heap=[(nums1[0]+nums2[j],0,j) for j in range(len(nums2))]\n    heapq.heapify(heap)\n    res=[]\n    for _ in range(min(k,len(nums1)*len(nums2))):\n        s,i,j=heapq.heappop(heap)\n        res.append((nums1[i],nums2[j]))\n        if i+1<len(nums1):\n            heapq.heappush(heap,(nums1[i+1]+nums2[j],i+1,j))\n    return res",
    "language": "python"
  },
  {
    "title": "Find Maximum Capital with K Projects",
    "description": "Given projects with profits and capital requirements, find the maximum capital you can accumulate after doing at most k projects. Use a min-heap for capital and a max-heap for profits.",
    "codeSnippet": "import heapq\n\ndef findMaximizedCapital(k,W,profits,capital):\n    projects=sorted(zip(capital,profits))\n    i=0; heap=[]\n    for _ in range(k):\n        while i<len(projects) and projects[i][0]<=W:\n            heapq.heappush(heap,-projects[i][1]); i+=1\n        if not heap: break\n        W-=heapq.heappop(heap)\n    return W",
    "language": "python"
  },
  {
    "title": "Find Top K Frequent Elements",
    "description": "Given an array of integers, return the k most frequent elements. Use a min-heap of size k to keep track of the most frequent ones, discarding less frequent numbers as new ones come.",
    "codeSnippet": "import heapq\nfrom collections import Counter\n\ndef topKFrequent(nums,k):\n    count=Counter(nums)\n    heap=[]\n    for num,freq in count.items():\n        heapq.heappush(heap,(freq,num))\n        if len(heap)>k: heapq.heappop(heap)\n    return [n for f,n in heap]",
    "language": "python"
  },
  {
    "title": "Find Smallest K Numbers",
    "description": "From an unsorted array, find the k smallest numbers. Use a max-heap of size k and discard larger numbers as you traverse the array to ensure efficiency.",
    "codeSnippet": "import heapq\n\ndef smallestK(nums,k):\n    heap=[-x for x in nums[:k]]\n    heapq.heapify(heap)\n    for n in nums[k:]:\n        if -heap[0]>n:\n            heapq.heappop(heap)\n            heapq.heappush(heap,-n)\n    return [-x for x in heap]",
    "language": "python"
  },
  {
    "title": "Rearrange String with Distance K",
    "description": "Rearrange characters of a string so that the same characters are at least distance k apart. Use a max-heap to always pick the most frequent character and a queue to maintain cooldown.",
    "codeSnippet": "import heapq\nfrom collections import Counter,deque\n\ndef rearrangeString(s,k):\n    if k==0: return s\n    count=Counter(s)\n    heap=[(-v,ch) for ch,v in count.items()]\n    heapq.heapify(heap)\n    res=''; q=deque()\n    while heap or q:\n        if heap:\n            v,ch=heapq.heappop(heap)\n            res+=ch; q.append((v+1,ch))\n        else: return ''\n        if len(q)>=k:\n            v,ch=q.popleft()\n            if v<0: heapq.heappush(heap,(v,ch))\n    return res if len(res)==len(s) else ''",
    "language": "python"
  },
   {
    "title": "Find Max Stone Removal Game",
    "description": "In a stone removal game, each pile has stones. Remove the largest pile each turn, halve it, and put it back. Find the minimum stones after k moves. Use a max-heap to always remove the largest pile.",
    "codeSnippet": "import heapq\n\ndef minStoneSum(piles,k):\n    heap=[-p for p in piles]\n    heapq.heapify(heap)\n    for _ in range(k):\n        x=-heapq.heappop(heap)\n        heapq.heappush(heap,-(x-x//2))\n    return -sum(heap)",
    "language": "python"
  },
  {
    "title": "Find Kth Largest Unique Element",
    "description": "Find the kth largest unique element in an array. Use a max-heap of unique numbers and pop until the kth element is reached.",
    "codeSnippet": "import heapq\n\ndef kthLargestUnique(nums,k):\n    unique=list(set(nums))\n    heap=[-x for x in unique]\n    heapq.heapify(heap)\n    for _ in range(k-1): heapq.heappop(heap)\n    return -heap[0]",
    "language": "python"
  },
  {
    "title": "Find Kth Smallest Range in K Lists",
    "description": "You are given k sorted lists. Find the smallest range that includes at least one number from each list. Use a min-heap to track current elements and maintain the maximum seen so far.",
    "codeSnippet": "import heapq\n\ndef smallestRange(nums):\n    heap=[]; mx=float('-inf')\n    for i,arr in enumerate(nums):\n        heapq.heappush(heap,(arr[0],i,0))\n        mx=max(mx,arr[0])\n    res=[-1e9,1e9]\n    while heap:\n        mn,i,j=heapq.heappop(heap)\n        if mx-mn<res[1]-res[0]: res=[mn,mx]\n        if j+1==len(nums[i]): break\n        nxt=nums[i][j+1]\n        heapq.heappush(heap,(nxt,i,j+1))\n        mx=max(mx,nxt)\n    return res",
    "language": "python"
  },
  {
    "title": "Kth Largest Sum of Subarray",
    "description": "Find the kth largest sum of any contiguous subarray. Use prefix sums to generate subarray sums and maintain a min-heap of size k.",
    "codeSnippet": "import heapq\n\ndef kthLargestSum(arr,k):\n    n=len(arr)\n    prefix=[0]*(n+1)\n    for i in range(n): prefix[i+1]=prefix[i]+arr[i]\n    heap=[]\n    for i in range(n):\n        for j in range(i+1,n+1):\n            s=prefix[j]-prefix[i]\n            heapq.heappush(heap,s)\n            if len(heap)>k: heapq.heappop(heap)\n    return heap[0]",
    "language": "python"
  },
  {
    "title": "Running Maximum in Sliding Window",
    "description": "Given an array and window size k, return the maximum for each sliding window. Use a max-heap with lazy deletion of elements outside the window.",
    "codeSnippet": "import heapq\n\ndef maxSlidingWindow(nums,k):\n    res=[]; heap=[]\n    for i,n in enumerate(nums):\n        heapq.heappush(heap,(-n,i))\n        while heap[0][1]<=i-k:\n            heapq.heappop(heap)\n        if i>=k-1:\n            res.append(-heap[0][0])\n    return res",
    "language": "python"
  },
  {
    "title": "Find Kth Smallest Prime Fraction",
    "description": "Given an array of primes sorted in ascending order, find the kth smallest fraction a/b. Use a min-heap to push fractions with increasing denominators.",
    "codeSnippet": "import heapq\n\ndef kthSmallestPrimeFraction(arr,k):\n    n=len(arr)\n    heap=[(arr[i]/arr[-1],i,n-1) for i in range(n-1)]\n    heapq.heapify(heap)\n    for _ in range(k-1):\n        val,i,j=heapq.heappop(heap)\n        if j-1>i:\n            heapq.heappush(heap,(arr[i]/arr[j-1],i,j-1))\n    val,i,j=heapq.heappop(heap)\n    return [arr[i],arr[j]]",
    "language": "python"
  },
  {
    "title": "Minimum Number of Refueling Stops",
    "description": "You start with some fuel and stations on the way. Find the minimum number of refuels to reach the target. Use a max-heap to store reachable fuel amounts and refuel greedily.",
    "codeSnippet": "import heapq\n\ndef minRefuelStops(target,startFuel,stations):\n    heap=[]; i=0; stops=0; fuel=startFuel\n    while fuel<target:\n        while i<len(stations) and stations[i][0]<=fuel:\n            heapq.heappush(heap,-stations[i][1]); i+=1\n        if not heap: return -1\n        fuel+=-heapq.heappop(heap); stops+=1\n    return stops",
    "language": "python"
  },
  {
    "title": "Maximum Product After K Increments",
    "description": "Given an array and k operations, in each operation increment the smallest element by 1. Use a min-heap to repeatedly pick the smallest and maximize product at the end.",
    "codeSnippet": "import heapq\n\ndef maxProductAfterKIncrements(nums,k):\n    heapq.heapify(nums)\n    for _ in range(k):\n        x=heapq.heappop(nums)\n        heapq.heappush(nums,x+1)\n    prod=1\n    for n in nums: prod*=n\n    return prod",
    "language": "python"
  },
  {
    "title": "Minimum Deviation in Array",
    "description": "You are given an array. In one operation, you can divide an even number by 2 or multiply an odd number by 2. Use a max-heap to minimize the deviation between max and min elements.",
    "codeSnippet": "import heapq\n\ndef minimumDeviation(nums):\n    heap=[]\n    mn=float('inf')\n    for n in nums:\n        if n%2: n*=2\n        heapq.heappush(heap,-n)\n        mn=min(mn,n)\n    res=float('inf')\n    while True:\n        x=-heapq.heappop(heap)\n        res=min(res,x-mn)\n        if x%2: break\n        mn=min(mn,x//2)\n        heapq.heappush(heap,-x//2)\n    return res",
    "language": "python"
  },
  {
    "title": "Furthest Building You Can Reach",
    "description": "You are climbing buildings with given heights using bricks and ladders. Use a min-heap to track largest climbs assigned to ladders and decide when to use bricks.",
    "codeSnippet": "import heapq\n\ndef furthestBuilding(heights,bricks,ladders):\n    heap=[]\n    for i in range(len(heights)-1):\n        diff=heights[i+1]-heights[i]\n        if diff>0:\n            heapq.heappush(heap,diff)\n        if len(heap)>ladders:\n            bricks-=heapq.heappop(heap)\n        if bricks<0: return i\n    return len(heights)-1",
    "language": "python"
  },
  {
    "title": "Minimum Stone Sum",
    "description": "Given a pile of stones represented by numbers, in each move remove half of the largest pile. Use a max-heap to repeatedly reduce the largest pile until k moves are done.",
    "codeSnippet": "import heapq\n\ndef minStoneSum(piles,k):\n    heap=[-p for p in piles]\n    heapq.heapify(heap)\n    for _ in range(k):\n        x=-heapq.heappop(heap)\n        x-=x//2\n        heapq.heappush(heap,-x)\n    return -sum(heap)",
    "language": "python"
  },
  {
    "title": "Minimum Operations to Halve Array Sum",
    "description": "You are given an array. Reduce the sum to at most half by repeatedly halving the largest element. Use a max-heap to track and minimize operations.",
    "codeSnippet": "import heapq\n\ndef halveArray(nums):\n    total=sum(nums); half=total/2\n    heap=[-x for x in nums]\n    heapq.heapify(heap)\n    ops=0; reduced=0\n    while reduced<half:\n        x=-heapq.heappop(heap)\n        reduced+=x/2\n        heapq.heappush(heap,-x/2)\n        ops+=1\n    return ops",
    "language": "python"
  },
   {
    "title": "Rank Teams by Votes",
    "description": "Teams are ranked by votes given as strings. Use a max-heap to order teams by position frequency and lexicographic tiebreakers.",
    "codeSnippet": "import heapq\nfrom collections import defaultdict\n\ndef rankTeams(votes):\n    n=len(votes[0])\n    count=defaultdict(lambda:[0]*n)\n    for v in votes:\n        for i,c in enumerate(v):\n            count[c][i]-=1\n    heap=[(tuple(cnt),c) for c,cnt in count.items()]\n    heapq.heapify(heap)\n    res=\"\"\n    while heap:\n        res+=heapq.heappop(heap)[1]\n    return res",
    "language": "python"
  }

  ];
}
private getSortingHints(): Hint[] {
  return [
  {
    "title": "Sort Colors (Dutch National Flag)",
    "description": "Given an array with 0s, 1s, and 2s, sort them in-place without using built-in sort. Use three pointers (low, mid, high) to partition efficiently.",
    "codeSnippet": "def sortColors(nums):\n    low=mid=0; high=len(nums)-1\n    while mid<=high:\n        if nums[mid]==0: nums[low],nums[mid]=nums[mid],nums[low]; low+=1; mid+=1\n        elif nums[mid]==1: mid+=1\n        else: nums[mid],nums[high]=nums[high],nums[mid]; high-=1\n    return nums",
    "language": "python"
  },
  {
    "title": "Kth Largest Element",
    "description": "Find the Kth largest element in an unsorted array. Can be solved using Quickselect (average O(n)) or Heap for efficient extraction.",
    "codeSnippet": "import heapq\n\ndef kthLargest(nums,k):\n    return heapq.nlargest(k,nums)[-1]",
    "language": "python"
  },
  {
    "title": "Merge Intervals",
    "description": "Given intervals, merge overlapping ones after sorting them by start time. Sorting ensures we only need to compare current and last merged interval.",
    "codeSnippet": "def mergeIntervals(intervals):\n    intervals.sort(key=lambda x:x[0])\n    res=[intervals[0]]\n    for s,e in intervals[1:]:\n        if s<=res[-1][1]: res[-1][1]=max(res[-1][1],e)\n        else: res.append([s,e])\n    return res",
    "language": "python"
  },
  {
    "title": "Meeting Rooms",
    "description": "Given meeting time intervals, check if a person can attend all. Sort by start time and check for overlapping adjacent intervals.",
    "codeSnippet": "def canAttend(intervals):\n    intervals.sort(key=lambda x:x[0])\n    for i in range(1,len(intervals)):\n        if intervals[i][0]<intervals[i-1][1]: return False\n    return True",
    "language": "python"
  },
  {
    "title": "Meeting Rooms II",
    "description": "Find the minimum number of meeting rooms required. Sort start and end times separately and use two pointers to track ongoing meetings.",
    "codeSnippet": "def minMeetingRooms(intervals):\n    starts=sorted(i[0] for i in intervals)\n    ends=sorted(i[1] for i in intervals)\n    s=e=0; rooms=0; res=0\n    while s<len(starts):\n        if starts[s]<ends[e]: rooms+=1; s+=1\n        else: rooms-=1; e+=1\n        res=max(res,rooms)\n    return res",
    "language": "python"
  },
  {
    "title": "Sort Characters by Frequency",
    "description": "Rearrange characters in a string so that characters with higher frequency appear first. Use sorting with frequency count.",
    "codeSnippet": "from collections import Counter\n\ndef frequencySort(s):\n    count=Counter(s)\n    return ''.join(ch*freq for ch,freq in sorted(count.items(),key=lambda x:-x[1]))",
    "language": "python"
  },
  {
    "title": "Relative Sort Array",
    "description": "Sort arr1 according to the order defined by arr2. Elements not in arr2 should be placed at the end in ascending order.",
    "codeSnippet": "def relativeSort(arr1,arr2):\n    order={x:i for i,x in enumerate(arr2)}\n    return sorted(arr1,key=lambda x:(order.get(x,len(arr2)),x))",
    "language": "python"
  },
  {
    "title": "Largest Number from Array",
    "description": "Arrange numbers to form the largest possible number. Sort numbers using custom comparator based on string concatenation order.",
    "codeSnippet": "from functools import cmp_to_key\n\ndef largestNumber(nums):\n    def cmp(x,y): return (int(y+x)-int(x+y))\n    nums=sorted(map(str,nums),key=cmp_to_key(cmp))\n    return ''.join(nums).lstrip('0') or '0'",
    "language": "python"
  },
  {
    "title": "H-Index",
    "description": "Given citation counts, find researcher's H-index. Sort in descending order and check maximum h such that citations[h] >= h+1.",
    "codeSnippet": "def hIndex(citations):\n    citations.sort(reverse=True)\n    h=0\n    for i,c in enumerate(citations):\n        if c>=i+1: h=i+1\n    return h",
    "language": "python"
  },
  {
    "title": "Find Missing Number",
    "description": "Given array containing n distinct numbers from 0..n, find the missing one. Sort and check mismatches or use arithmetic sum.",
    "codeSnippet": "def missingNumber(nums):\n    nums.sort()\n    for i,x in enumerate(nums):\n        if i!=x: return i\n    return len(nums)",
    "language": "python"
  },
  {
    "title": "Maximum Gap",
    "description": "Given an unsorted array, find the maximum difference between successive elements in sorted form. Use bucket sort idea for linear time.",
    "codeSnippet": "def maximumGap(nums):\n    if len(nums)<2: return 0\n    nums.sort()\n    return max(nums[i+1]-nums[i] for i in range(len(nums)-1))",
    "language": "python"
  },
  {
    "title": "Sort by Parity",
    "description": "Rearrange array so that all even numbers come before odd numbers. Sorting or two-pointer partitioning can be applied here.",
    "codeSnippet": "def sortArrayByParity(nums):\n    return sorted(nums,key=lambda x:x%2)",
    "language": "python"
  },
  {
    "title": "Sort by Parity II",
    "description": "Given array with equal even and odd numbers, rearrange so that even indices hold even numbers and odd indices hold odd numbers.",
    "codeSnippet": "def sortArrayByParityII(nums):\n    even=[x for x in nums if x%2==0]\n    odd=[x for x in nums if x%2==1]\n    res=[]\n    for e,o in zip(even,odd): res+=[e,o]\n    return res",
    "language": "python"
  },
  {
    "title": "Sort Array by Increasing Frequency",
    "description": "Sort array elements by frequency in ascending order, and if equal frequency, sort by value descending. Use Counter and sorting.",
    "codeSnippet": "from collections import Counter\n\ndef frequencySort(nums):\n    c=Counter(nums)\n    return sorted(nums,key=lambda x:(c[x],-x))",
    "language": "python"
  },
  {
    "title": "Sort Transformed Array",
    "description": "Given sorted nums and quadratic function f(x)=ax^2+bx+c, apply f to all elements and return result in sorted order efficiently.",
    "codeSnippet": "def sortTransformedArray(nums,a,b,c):\n    f=lambda x:a*x*x+b*x+c\n    res=[f(x) for x in nums]\n    return sorted(res)",
    "language": "python"
  },
  {
    "title": "K Closest Points to Origin",
    "description": "Find K points closest to origin. Sort by distance (x^2 + y^2). Heaps can also be used for better performance with large data.",
    "codeSnippet": "def kClosest(points,k):\n    return sorted(points,key=lambda p:p[0]**2+p[1]**2)[:k]",
    "language": "python"
  },
  {
    "title": "Reorder Data in Log Files",
    "description": "Logs are letter-logs or digit-logs. Sort letter-logs by content and identifier, keep digit-logs in original order. Popular Amazon question.",
    "codeSnippet": "def reorderLogFiles(logs):\n    letters,digits=[],[]\n    for log in logs:\n        if log.split()[1].isdigit(): digits.append(log)\n        else: letters.append(log)\n    letters.sort(key=lambda x:(x.split()[1:],x.split()[0]))\n    return letters+digits",
    "language": "python"
  },
  {
    "title": "Rank Teams by Votes",
    "description": "Teams are voted in rank order. Sort teams by vote counts column-wise, then by lex order. Use tuple sorting for this task.",
    "codeSnippet": "from collections import Counter\n\ndef rankTeams(votes):\n    teams=list(votes[0])\n    rank={c:[0]*len(teams)+[c] for c in teams}\n    for v in votes:\n        for i,c in enumerate(v): rank[c][i]-=1\n    return ''.join(sorted(teams,key=lambda x:rank[x]))",
    "language": "python"
  },
  {
    "title": "Sort Integers by Number of 1 Bits",
    "description": "Sort integers by number of 1 bits in binary representation. If tie, sort by integer value. Use Python’s bit_count or bin().count().",
    "codeSnippet": "def sortByBits(arr):\n    return sorted(arr,key=lambda x:(bin(x).count('1'),x))",
    "language": "python"
  },
  {
    "title": "Largest Perimeter Triangle",
    "description": "Find the largest perimeter of a triangle from given side lengths. Sort array descending and check triples greedily.",
    "codeSnippet": "def largestPerimeter(nums):\n    nums.sort(reverse=True)\n    for i in range(len(nums)-2):\n        if nums[i]<nums[i+1]+nums[i+2]:\n            return nums[i]+nums[i+1]+nums[i+2]\n    return 0",
    "language": "python"
  },
  {
    "title": "Minimum Absolute Difference",
    "description": "Given an array, return pairs of elements with the smallest absolute difference. Sort first, then compare adjacent pairs.",
    "codeSnippet": "def minimumAbsDifference(arr):\n    arr.sort(); diff=float('inf'); res=[]\n    for i in range(len(arr)-1):\n        d=arr[i+1]-arr[i]\n        if d<diff: diff=d; res=[[arr[i],arr[i+1]]]\n        elif d==diff: res.append([arr[i],arr[i+1]])\n    return res",
    "language": "python"
  },
  {
    "title": "Sort Diagonals of Matrix",
    "description": "Given a matrix, sort each diagonal independently. Collect elements of each diagonal, sort them, and place them back.",
    "codeSnippet": "from collections import defaultdict\n\ndef diagonalSort(mat):\n    d=defaultdict(list)\n    for i in range(len(mat)):\n        for j in range(len(mat[0])):\n            d[i-j].append(mat[i][j])\n    for k in d: d[k].sort(reverse=True)\n    for i in range(len(mat)):\n        for j in range(len(mat[0])):\n            mat[i][j]=d[i-j].pop()\n    return mat",
    "language": "python"
  },
  {
    "title": "Sort Linked List",
    "description": "Sort a singly linked list in O(n log n). Merge Sort is often used because it can be efficiently applied to linked lists.",
    "codeSnippet": "class ListNode:\n    def __init__(self,val=0,next=None): self.val=val; self.next=next\n\ndef sortList(head):\n    if not head or not head.next: return head\n    slow,fast=head,head.next\n    while fast and fast.next:\n        slow=slow.next; fast=fast.next.next\n    mid=slow.next; slow.next=None\n    l,r=sortList(head),sortList(mid)\n    return merge(l,r)\n\ndef merge(l1,l2):\n    dummy=ListNode(); cur=dummy\n    while l1 and l2:\n        if l1.val<l2.val: cur.next,l1=l1,l1.next\n        else: cur.next,l2=l2,l2.next\n        cur=cur.next\n    cur.next=l1 or l2\n    return dummy.next",
    "language": "python"
  },
  {
    "title": "Sort Characters by Frequency",
    "description": "Rearrange characters in a string so that the most frequent characters appear first. Use a frequency map and sort by counts to build the final string efficiently.",
    "codeSnippet": "from collections import Counter\n\ndef frequencySort(s):\n    count = Counter(s)\n    return ''.join(ch*freq for ch, freq in sorted(count.items(), key=lambda x: -x[1]))",
    "language": "python"
  },
  {
    "title": "Sort a K-Sorted Array",
    "description": "An array is nearly sorted where each element is at most k positions away from its target position. Use a min-heap of size k+1 to sort efficiently.",
    "codeSnippet": "import heapq\n\ndef sortKSortedArray(arr, k):\n    heap = arr[:k+1]\n    heapq.heapify(heap)\n    res = []\n    for i in range(k+1, len(arr)):\n        res.append(heapq.heappushpop(heap, arr[i]))\n    res.extend(sorted(heap))\n    return res",
    "language": "python"
  },
  {
    "title": "Minimum Swaps to Sort Array",
    "description": "Calculate the minimum number of swaps to sort an array by mapping elements to their indices and finding cycles in the permutation.",
    "codeSnippet": "def minSwaps(nums):\n    arr = sorted((num, i) for i, num in enumerate(nums))\n    visited = [False]*len(nums)\n    res = 0\n    for i in range(len(nums)):\n        if visited[i] or arr[i][1]==i: continue\n        cycle = 0; j=i\n        while not visited[j]: visited[j]=True; j=arr[j][1]; cycle+=1\n        res += cycle-1\n    return res",
    "language": "python"
  },
  {
    "title": "Sort Colors (Dutch National Flag)",
    "description": "Sort an array containing 0s, 1s, and 2s in-place using three pointers: low, mid, and high. Efficient linear-time partitioning.",
    "codeSnippet": "def sortColors(nums):\n    low=mid=0; high=len(nums)-1\n    while mid<=high:\n        if nums[mid]==0: nums[low],nums[mid]=nums[mid],nums[low]; low+=1; mid+=1\n        elif nums[mid]==1: mid+=1\n        else: nums[mid],nums[high]=nums[high],nums[mid]; high-=1\n    return nums",
    "language": "python"
  },
  {
    "title": "Sort by Parity",
    "description": "Reorder an array so that all even numbers come before all odd numbers. Use simple sort or two-pointer partition technique.",
    "codeSnippet": "def sortByParity(nums):\n    return sorted(nums, key=lambda x: x%2)",
    "language": "python"
  },
  {
    "title": "Sort by Parity II",
    "description": "Given an array with equal number of even and odd numbers, rearrange it so even indices hold even numbers and odd indices hold odd numbers.",
    "codeSnippet": "def sortArrayByParityII(nums):\n    even=[x for x in nums if x%2==0]; odd=[x for x in nums if x%2==1]\n    res=[]\n    for e,o in zip(even, odd): res += [e,o]\n    return res",
    "language": "python"
  },
  {
    "title": "Sort Intervals by Start Time",
    "description": "Given a list of intervals, sort them by start time to facilitate merging or checking overlaps efficiently.",
    "codeSnippet": "def sortIntervals(intervals):\n    return sorted(intervals, key=lambda x: x[0])",
    "language": "python"
  },
  {
    "title": "Merge Intervals",
    "description": "After sorting intervals by start time, merge overlapping intervals efficiently by comparing with the last merged interval.",
    "codeSnippet": "def mergeIntervals(intervals):\n    intervals.sort(key=lambda x:x[0])\n    res=[intervals[0]]\n    for s,e in intervals[1:]:\n        if s<=res[-1][1]: res[-1][1]=max(res[-1][1],e)\n        else: res.append([s,e])\n    return res",
    "language": "python"
  },
  {
    "title": "Minimum Absolute Difference",
    "description": "Find all pairs of elements in an array with the smallest absolute difference. Sort the array first, then check consecutive pairs.",
    "codeSnippet": "def minimumAbsDifference(arr):\n    arr.sort(); diff=float('inf'); res=[]\n    for i in range(len(arr)-1):\n        d=arr[i+1]-arr[i]\n        if d<diff: diff=d; res=[[arr[i],arr[i+1]]]\n        elif d==diff: res.append([arr[i],arr[i+1]])\n    return res",
    "language": "python"
  },
  {
    "title": "Maximum Gap",
    "description": "Compute maximum difference between successive elements in sorted form. Sorting or bucket sort can be used for linear approximation.",
    "codeSnippet": "def maximumGap(nums):\n    if len(nums)<2: return 0\n    nums.sort()\n    return max(nums[i+1]-nums[i] for i in range(len(nums)-1))",
    "language": "python"
  },
  {
    "title": "Largest Perimeter Triangle",
    "description": "Find the largest perimeter triangle from array of side lengths. Sort in descending order and pick first valid triple greedily.",
    "codeSnippet": "def largestPerimeter(nums):\n    nums.sort(reverse=True)\n    for i in range(len(nums)-2):\n        if nums[i]<nums[i+1]+nums[i+2]: return nums[i]+nums[i+1]+nums[i+2]\n    return 0",
    "language": "python"
  },
  {
    "title": "Reorder Data in Log Files",
    "description": "Sort letter-logs lexicographically by content and identifier. Keep digit-logs in original order. Letter-logs come first in the result.",
    "codeSnippet": "def reorderLogFiles(logs):\n    letters,digits=[],[]\n    for log in logs:\n        if log.split()[1].isdigit(): digits.append(log)\n        else: letters.append(log)\n    letters.sort(key=lambda x:(x.split()[1:],x.split()[0]))\n    return letters+digits",
    "language": "python"
  },
  {
    "title": "Rank Teams by Votes",
    "description": "Sort teams based on vote counts in each position. Use tuple sorting and lexicographic tie-breakers for final ranking.",
    "codeSnippet": "from collections import Counter\n\ndef rankTeams(votes):\n    teams=list(votes[0])\n    rank={c:[0]*len(teams)+[c] for c in teams}\n    for v in votes:\n        for i,c in enumerate(v): rank[c][i]-=1\n    return ''.join(sorted(teams,key=lambda x:rank[x]))",
    "language": "python"
  },
  {
    "title": "Sort Integers by Number of 1 Bits",
    "description": "Sort integers by the number of 1 bits in binary representation. Ties are broken by integer value.",
    "codeSnippet": "def sortByBits(arr):\n    return sorted(arr, key=lambda x: (bin(x).count('1'), x))",
    "language": "python"
  },
  {
    "title": "Largest Number from Array",
    "description": "Arrange numbers to form the largest possible concatenated number. Use string comparison for sorting custom order.",
    "codeSnippet": "from functools import cmp_to_key\n\ndef largestNumber(nums):\n    def cmp(x,y): return (int(y+x)-int(x+y))\n    nums=sorted(map(str,nums), key=cmp_to_key(cmp))\n    return ''.join(nums).lstrip('0') or '0'",
    "language": "python"
  },
  {
    "title": "H-Index",
    "description": "Find the H-index given citation counts. Sort in descending order and find the maximum h where citations[h] >= h+1.",
    "codeSnippet": "def hIndex(citations):\n    citations.sort(reverse=True)\n    h=0\n    for i,c in enumerate(citations):\n        if c>=i+1: h=i+1\n    return h",
    "language": "python"
  },
  {
    "title": "Find Missing Number",
    "description": "Given n distinct numbers from 0..n, find the missing number. Sort and compare indices or use arithmetic sum for optimization.",
    "codeSnippet": "def missingNumber(nums):\n    nums.sort()\n    for i,x in enumerate(nums):\n        if i!=x: return i\n    return len(nums)",
    "language": "python"
  },
  {
    "title": "Sort Transformed Array",
    "description": "Apply a quadratic function to a sorted array and return the result in sorted order. Sorting after transformation ensures correctness.",
    "codeSnippet": "def sortTransformedArray(nums,a,b,c):\n    f=lambda x:a*x*x+b*x+c\n    res=[f(x) for x in nums]\n    return sorted(res)",
    "language": "python"
  },
  {
    "title": "K Closest Points to Origin",
    "description": "Find the K closest points to the origin. Sort points based on distance squared from origin or use a heap for better efficiency.",
    "codeSnippet": "def kClosest(points,k):\n    return sorted(points, key=lambda p:p[0]**2+p[1]**2)[:k]",
    "language": "python"
  },
  {
    "title": "Sort Diagonals of Matrix",
    "description": "Sort each diagonal of a matrix independently. Collect diagonal elements, sort, and place them back efficiently.",
    "codeSnippet": "from collections import defaultdict\n\ndef diagonalSort(mat):\n    d=defaultdict(list)\n    for i in range(len(mat)):\n        for j in range(len(mat[0])):\n            d[i-j].append(mat[i][j])\n    for k in d: d[k].sort(reverse=True)\n    for i in range(len(mat)):\n        for j in range(len(mat[0])):\n            mat[i][j]=d[i-j].pop()\n    return mat",
    "language": "python"
  },
  {
    "title": "Sort Linked List",
    "description": "Sort a singly linked list in O(n log n) using merge sort. Efficient for linked lists without random access.",
    "codeSnippet": "class ListNode:\n    def __init__(self,val=0,next=None): self.val=val; self.next=next\n\ndef sortList(head):\n    if not head or not head.next: return head\n    slow,fast=head,head.next\n    while fast and fast.next: slow=slow.next; fast=fast.next.next\n    mid=slow.next; slow.next=None\n    l,r=sortList(head),sortList(mid)\n    return merge(l,r)\n\ndef merge(l1,l2):\n    dummy=ListNode(); cur=dummy\n    while l1 and l2:\n        if l1.val<l2.val: cur.next,l1=l1,l1.next\n        else: cur.next,l2=l2,l2.next\n        cur=cur.next\n    cur.next=l1 or l2\n    return dummy.next",
    "language": "python"
  },
  {
    "title": "Wiggle Sort",
    "description": "Rearrange an array so that nums[0] <= nums[1] >= nums[2] <= nums[3]... Sort and swap elements to satisfy the wiggle property efficiently.",
    "codeSnippet": "def wiggleSort(nums):\n    nums.sort()\n    for i in range(1,len(nums)-1,2):\n        nums[i],nums[i+1]=nums[i+1],nums[i]\n    return nums",
    "language": "python"
  },
  {
    "title": "Rearrange Array Alternately",
    "description": "Given a sorted array, rearrange it so that the first element is max, second is min, third is 2nd max, and so on. Use two-pointer technique after sorting.",
    "codeSnippet": "def rearrange(arr):\n    arr.sort()\n    res=[]\n    i,j=0,len(arr)-1\n    while i<=j:\n        if i!=j: res.extend([arr[j],arr[i]])\n        else: res.append(arr[i])\n        i+=1;j-=1\n    return res",
    "language": "python"
  },
  {
    "title": "Max Sum After K Negations",
    "description": "Given an array, perform K negations to maximize sum. Sort array and greedily negate the smallest (most negative) elements.",
    "codeSnippet": "def largestSumAfterKNegations(nums, k):\n    nums.sort()\n    for i in range(len(nums)):\n        if k>0 and nums[i]<0: nums[i]=-nums[i]; k-=1\n    if k%2: nums.sort(); nums[0]=-nums[0]\n    return sum(nums)",
    "language": "python"
  },
  {
    "title": "Sort 0s, 1s and 2s by Counting",
    "description": "Sort an array of 0s,1s,2s using counting sort. Count occurrences and overwrite the array efficiently without extra comparisons.",
    "codeSnippet": "def sort012(arr):\n    count=[0,0,0]\n    for x in arr: count[x]+=1\n    res=[]\n    for i,c in enumerate(count): res.extend([i]*c)\n    return res",
    "language": "python"
  },
  {
    "title": "Arrange Coins",
    "description": "Arrange n coins in a staircase with complete rows. Sorting is not needed but understanding sequence ordering can be done efficiently using math.",
    "codeSnippet": "def arrangeCoins(n):\n    left,right=0,n\n    while left<=right:\n        mid=(left+right)//2\n        if mid*(mid+1)//2<=n: left=mid+1\n        else: right=mid-1\n    return right",
    "language": "python"
  },
  {
    "title": "Reorder Array by Sign",
    "description": "Given an array of positive and negative numbers, rearrange it so negatives and positives alternate while maintaining relative order. Sort helps in partitioning.",
    "codeSnippet": "def reorderBySign(arr):\n    pos=[x for x in arr if x>=0]\n    neg=[x for x in arr if x<0]\n    res=[]\n    for p,n in zip(pos,neg): res.extend([n,p])\n    res.extend(pos[len(neg):]+neg[len(pos):])\n    return res",
    "language": "python"
  },
  {
    "title": "Sort by Absolute Difference",
    "description": "Sort array elements based on their absolute difference from a given number X. Sorting helps to prioritize numbers closest to X.",
    "codeSnippet": "def sortByAbsDiff(arr, x):\n    return sorted(arr, key=lambda a: abs(a-x))",
    "language": "python"
  },
  {
    "title": "Form Minimum Number from Array",
    "description": "Given an array of digits, arrange them to form the minimum possible number. Sort digits and handle leading zeros carefully.",
    "codeSnippet": "def minNumber(nums):\n    nums=sorted(map(str,nums))\n    return ''.join(nums).lstrip('0') or '0'",
    "language": "python"
  },
  {
    "title": "Sort Array by Set Bits Count",
    "description": "Sort integers based on the number of 1 bits in their binary form. Useful for bit manipulation challenges and can be done efficiently with sort key.",
    "codeSnippet": "def sortBySetBits(arr):\n    return sorted(arr, key=lambda x: (bin(x).count('1'), x))",
    "language": "python"
  },
  {
    "title": "Sort Students by Marks",
    "description": "Sort a list of students represented as tuples (name, marks) by marks descending, then name ascending for tie-breakers. Classic sorting with multiple keys.",
    "codeSnippet": "def sortStudents(students):\n    return sorted(students, key=lambda x: (-x[1], x[0]))",
    "language": "python"
  }
];
}
private getSearchingHints(): Hint[] {
  return [
  {
    "title": "Binary Search",
    "description": "Given a sorted array, find the index of a target element. Binary search repeatedly divides the search space in half to achieve O(log n) time complexity.",
    "codeSnippet": "def binarySearch(arr, target):\n    left, right = 0, len(arr)-1\n    while left <= right:\n        mid = (left + right)//2\n        if arr[mid]==target: return mid\n        elif arr[mid]<target: left = mid+1\n        else: right = mid-1\n    return -1",
    "language": "python"
  },
  {
    "title": "First and Last Position of Element",
    "description": "In a sorted array with duplicates, find the first and last occurrence of a target. Binary search is applied twice for lower and upper bounds.",
    "codeSnippet": "def searchRange(nums, target):\n    def bound(isFirst):\n        left, right, idx = 0, len(nums)-1, -1\n        while left <= right:\n            mid = (left + right)//2\n            if nums[mid] == target: idx = mid; right = mid-1 if isFirst else left = mid+1\n            elif nums[mid] < target: left = mid+1\n            else: right = mid-1\n        return idx\n    return [bound(True), bound(False)]",
    "language": "python"
  },
  {
    "title": "Search in Rotated Sorted Array",
    "description": "Given a rotated sorted array, find the index of a target element. Modify binary search to account for rotation by checking which half is sorted.",
    "codeSnippet": "def search(nums, target):\n    left, right = 0, len(nums)-1\n    while left <= right:\n        mid = (left+right)//2\n        if nums[mid]==target: return mid\n        if nums[left]<=nums[mid]:\n            if nums[left]<=target<nums[mid]: right=mid-1\n            else: left=mid+1\n        else:\n            if nums[mid]<target<=nums[right]: left=mid+1\n            else: right=mid-1\n    return -1",
    "language": "python"
  },
  {
    "title": "Find Peak Element",
    "description": "Find an element in an array which is greater than its neighbors. Binary search can find a peak in O(log n) by checking mid element relative to neighbors.",
    "codeSnippet": "def findPeakElement(nums):\n    left, right = 0, len(nums)-1\n    while left < right:\n        mid = (left+right)//2\n        if nums[mid] < nums[mid+1]: left = mid+1\n        else: right = mid\n    return left",
    "language": "python"
  },
  {
    "title": "Search in 2D Matrix",
    "description": "Given a matrix where rows and columns are sorted, determine if a target exists. Treat matrix as a flattened sorted array or use step-wise linear search.",
    "codeSnippet": "def searchMatrix(matrix, target):\n    if not matrix: return False\n    rows, cols = len(matrix), len(matrix[0])\n    r, c = 0, cols-1\n    while r<rows and c>=0:\n        if matrix[r][c]==target: return True\n        elif matrix[r][c]>target: c-=1\n        else: r+=1\n    return False",
    "language": "python"
  },
  {
    "title": "Find Minimum in Rotated Sorted Array",
    "description": "Find the minimum element in a rotated sorted array without duplicates. Binary search narrows the search based on rotation point.",
    "codeSnippet": "def findMin(nums):\n    left, right = 0, len(nums)-1\n    while left < right:\n        mid = (left+right)//2\n        if nums[mid] > nums[right]: left = mid+1\n        else: right = mid\n    return nums[left]",
    "language": "python"
  },
  {
    "title": "Count Occurrences of a Number",
    "description": "Count how many times a target occurs in a sorted array. Use binary search to find first and last occurrences and calculate count.",
    "codeSnippet": "def countOccurrences(nums, target):\n    def bound(isFirst):\n        left, right, idx = 0, len(nums)-1, -1\n        while left <= right:\n            mid = (left+right)//2\n            if nums[mid]==target: idx=mid; right=mid-1 if isFirst else left=mid+1\n            elif nums[mid]<target: left=mid+1\n            else: right=mid-1\n        return idx\n    first=bound(True); last=bound(False)\n    return last-first+1 if first!=-1 else 0",
    "language": "python"
  },
  {
    "title": "Median of Two Sorted Arrays",
    "description": "Find median of two sorted arrays efficiently. Use binary search on the smaller array to partition both arrays correctly for O(log(min(n,m))).",
    "codeSnippet": "def findMedianSortedArrays(nums1, nums2):\n    if len(nums1) > len(nums2): nums1, nums2 = nums2, nums1\n    x, y = len(nums1), len(nums2)\n    low, high = 0, x\n    while low <= high:\n        partitionX = (low + high)//2\n        partitionY = (x + y + 1)//2 - partitionX\n        maxLeftX = float('-inf') if partitionX==0 else nums1[partitionX-1]\n        minRightX = float('inf') if partitionX==x else nums1[partitionX]\n        maxLeftY = float('-inf') if partitionY==0 else nums2[partitionY-1]\n        minRightY = float('inf') if partitionY==y else nums2[partitionY]\n        if maxLeftX<=minRightY and maxLeftY<=minRightX:\n            if (x+y)%2==0: return (max(maxLeftX,maxLeftY)+min(minRightX,minRightY))/2\n            else: return max(maxLeftX,maxLeftY)\n        elif maxLeftX>minRightY: high=partitionX-1\n        else: low=partitionX+1",
    "language": "python"
  },
  {
    "title": "Find Duplicate Number",
    "description": "In an array of n+1 integers where numbers are from 1 to n, find the duplicate without modifying array. Use binary search on value range based on count.",
    "codeSnippet": "def findDuplicate(nums):\n    left, right = 1, len(nums)-1\n    while left < right:\n        mid = (left+right)//2\n        if sum(x<=mid for x in nums) > mid: right = mid\n        else: left = mid+1\n    return left",
    "language": "python"
  },
  {
    "title": "Kth Smallest Element in a Sorted Matrix",
    "description": "Given a row- and column-wise sorted matrix, find kth smallest element. Apply binary search on value range and count elements <= mid.",
    "codeSnippet": "def kthSmallest(matrix, k):\n    n = len(matrix)\n    left, right = matrix[0][0], matrix[-1][-1]\n    while left < right:\n        mid = (left+right)//2\n        count = sum(sum(1 for x in row if x<=mid) for row in matrix)\n        if count < k: left = mid+1\n        else: right = mid\n    return left",
    "language": "python"
  },
  {
    "title": "Find Rotation Count in Rotated Sorted Array",
    "description": "Given a rotated sorted array, find the number of rotations (index of the minimum element). Use modified binary search to find pivot point efficiently.",
    "codeSnippet": "def rotationCount(nums):\n    left, right = 0, len(nums)-1\n    while left < right:\n        mid = (left+right)//2\n        if nums[mid] > nums[right]: left = mid+1\n        else: right = mid\n    return left",
    "language": "python"
  },
  {
    "title": "Find Floor of a Number",
    "description": "In a sorted array, find the largest element smaller than or equal to a target. Binary search narrows down candidates efficiently to find floor value.",
    "codeSnippet": "def floorNumber(nums, target):\n    left, right = 0, len(nums)-1; res = -1\n    while left <= right:\n        mid = (left+right)//2\n        if nums[mid] <= target: res = nums[mid]; left = mid+1\n        else: right = mid-1\n    return res",
    "language": "python"
  },
  {
    "title": "Find Ceiling of a Number",
    "description": "In a sorted array, find the smallest element greater than or equal to target. Binary search can efficiently locate ceiling in O(log n).",
    "codeSnippet": "def ceilingNumber(nums, target):\n    left, right = 0, len(nums)-1; res = -1\n    while left <= right:\n        mid = (left+right)//2\n        if nums[mid] >= target: res = nums[mid]; right = mid-1\n        else: left = mid+1\n    return res",
    "language": "python"
  },
  {
    "title": "Search in Infinite Sorted Array",
    "description": "Given an infinite sorted array (or unknown size), find a target. First, exponentially expand search range, then perform binary search in that range.",
    "codeSnippet": "def searchInfiniteArray(reader, target):\n    left, right = 0, 1\n    while reader[right] < target: left = right; right *= 2\n    while left <= right:\n        mid = (left+right)//2\n        if reader[mid] == target: return mid\n        elif reader[mid] < target: left = mid+1\n        else: right = mid-1\n    return -1",
    "language": "python"
  },
  {
    "title": "Exponential Search",
    "description": "Efficiently search in a sorted array where size is known. Start with range doubling to find boundary, then apply binary search inside the range.",
    "codeSnippet": "def exponentialSearch(arr, target):\n    if arr[0]==target: return 0\n    n=1\n    while n<len(arr) and arr[n]<=target: n*=2\n    left, right = n//2, min(n,len(arr)-1)\n    while left<=right:\n        mid=(left+right)//2\n        if arr[mid]==target: return mid\n        elif arr[mid]<target: left=mid+1\n        else: right=mid-1\n    return -1",
    "language": "python"
  },
  {
    "title": "Interpolation Search",
    "description": "For uniformly distributed sorted arrays, estimate the probable position of target using interpolation instead of always mid-point. Faster than binary search in some cases.",
    "codeSnippet": "def interpolationSearch(arr, target):\n    lo, hi = 0, len(arr)-1\n    while lo <= hi and target >= arr[lo] and target <= arr[hi]:\n        pos = lo + ((target - arr[lo])*(hi-lo)//(arr[hi]-arr[lo]))\n        if arr[pos] == target: return pos\n        if arr[pos] < target: lo = pos+1\n        else: hi = pos-1\n    return -1",
    "language": "python"
  },
  {
    "title": "Search in Nearly Sorted Array",
    "description": "Array is almost sorted; each element may be swapped with neighbors. Modified binary search checks mid, mid-1, and mid+1 positions for target.",
    "codeSnippet": "def searchNearlySorted(arr, target):\n    left, right = 0, len(arr)-1\n    while left <= right:\n        mid = (left+right)//2\n        if arr[mid]==target: return mid\n        if mid-1>=left and arr[mid-1]==target: return mid-1\n        if mid+1<=right and arr[mid+1]==target: return mid+1\n        if arr[mid] > target: right=mid-2\n        else: left=mid+2\n    return -1",
    "language": "python"
  },
  {
    "title": "Find Peak in Mountain Array",
    "description": "Given an array that increases then decreases, find the peak element. Binary search reduces search space by checking mid against neighbors.",
    "codeSnippet": "def peakIndexInMountainArray(arr):\n    left, right = 0, len(arr)-1\n    while left < right:\n        mid = (left+right)//2\n        if arr[mid] < arr[mid+1]: left = mid+1\n        else: right = mid\n    return left",
    "language": "python"
  },
  {
    "title": "Find Missing Element in Arithmetic Progression",
    "description": "Given an arithmetic progression with one missing element, find it using binary search. Compare expected value with actual mid value to narrow search.",
    "codeSnippet": "def missingAP(arr):\n    n = len(arr)+1\n    diff = (arr[-1]-arr[0])//n\n    left, right = 0, len(arr)-1\n    while left <= right:\n        mid = (left+right)//2\n        if arr[mid] != arr[0]+mid*diff: right = mid-1\n        else: left = mid+1\n    return arr[0]+left*diff",
    "language": "python"
  },
  {
    "title": "Search in Bitonic Array",
    "description": "A bitonic array increases then decreases. To find target, first find peak, then perform binary search on both increasing and decreasing halves.",
    "codeSnippet": "def searchBitonic(arr, target):\n    def binarySearch(l,r,asc):\n        while l<=r:\n            mid=(l+r)//2\n            if arr[mid]==target: return mid\n            if asc:\n                if arr[mid]<target: l=mid+1\n                else: r=mid-1\n            else:\n                if arr[mid]<target: r=mid-1\n                else: l=mid+1\n        return -1\n    peak=peakIndexInMountainArray(arr)\n    res=binarySearch(0,peak,True)\n    return res if res!=-1 else binarySearch(peak+1,len(arr)-1,False)",
    "language": "python"
  },
  {
    "title": "Search in Infinite Rotated Array",
    "description": "Given a rotated sorted array of unknown size, find target. Use exponential range expansion followed by modified binary search accounting for rotation.",
    "codeSnippet": "def searchInfiniteRotated(reader,target):\n    left,right=0,1\n    while reader[right]<target: left=right; right*=2\n    while left<=right:\n        mid=(left+right)//2\n        if reader[mid]==target: return mid\n        if reader[left]<=reader[mid]:\n            if reader[left]<=target<reader[mid]: right=mid-1\n            else: left=mid+1\n        else:\n            if reader[mid]<target<=reader[right]: left=mid+1\n            else: right=mid-1\n    return -1",
    "language": "python"
  },
  {
    "title": "Find Duplicate in Sorted Array",
    "description": "In a sorted array with one duplicate, find it efficiently using binary search. Compare mid with index to determine which half contains duplicate.",
    "codeSnippet": "def findDuplicateSorted(arr):\n    left,right=0,len(arr)-1\n    while left<right:\n        mid=(left+right)//2\n        if arr[mid]>mid+1: right=mid\n        else: left=mid+1\n    return arr[left]",
    "language": "python"
  },
  {
    "title": "Find Square Root of Number",
    "description": "Compute integer square root of a number using binary search. Narrow the range between 0 and number, adjusting mid until floor(sqrt(n)) is found.",
    "codeSnippet": "def sqrtInteger(x):\n    if x<2: return x\n    left, right = 1, x//2\n    while left <= right:\n        mid = (left+right)//2\n        if mid*mid==x: return mid\n        elif mid*mid<x: left=mid+1; ans=mid\n        else: right=mid-1\n    return ans",
    "language": "python"
  },
  {
    "title": "Find Local Minima in Array",
    "description": "A local minima is an element smaller than neighbors. Use binary search by comparing mid with neighbors to find a local minima in O(log n).",
    "codeSnippet": "def findLocalMin(arr):\n    left, right = 0, len(arr)-1\n    while left <= right:\n        mid = (left+right)//2\n        if (mid==0 or arr[mid]<arr[mid-1]) and (mid==len(arr)-1 or arr[mid]<arr[mid+1]): return arr[mid]\n        elif mid>0 and arr[mid-1]<arr[mid]: right=mid-1\n        else: left=mid+1",
    "language": "python"
  },
  {
    "title": "Search in 2D Matrix I",
    "description": "Given a matrix where each row and column is sorted, find a target efficiently. Start from top-right or bottom-left corner and eliminate rows/columns step by step.",
    "codeSnippet": "def searchMatrix(matrix, target):\n    if not matrix: return False\n    row, col = 0, len(matrix[0])-1\n    while row < len(matrix) and col >= 0:\n        if matrix[row][col]==target: return True\n        elif matrix[row][col]>target: col-=1\n        else: row+=1\n    return False",
    "language": "python"
  },
  {
    "title": "Search in 2D Matrix II",
    "description": "Matrix sorted in rows and columns. Use binary search row-wise or column-wise to efficiently locate target, optimizing for rectangular matrices.",
    "codeSnippet": "def searchMatrixBinary(matrix,target):\n    for row in matrix:\n        left,right=0,len(row)-1\n        while left<=right:\n            mid=(left+right)//2\n            if row[mid]==target: return True\n            elif row[mid]<target: left=mid+1\n            else: right=mid-1\n    return False",
    "language": "python"
  },
  {
    "title": "Find First and Last Position of Element",
    "description": "In a sorted array, find first and last occurrence of target. Use binary search twice to locate leftmost and rightmost indices efficiently.",
    "codeSnippet": "def searchRange(nums,target):\n    def binarySearch(leftBias):\n        left,right=0,len(nums)-1; res=-1\n        while left<=right:\n            mid=(left+right)//2\n            if nums[mid]==target: res=mid\n                if leftBias: right=mid-1\n                else: left=mid+1\n            elif nums[mid]<target: left=mid+1\n            else: right=mid-1\n        return res\n    return [binarySearch(True), binarySearch(False)]",
    "language": "python"
  },
  {
    "title": "Count Occurrences of Element",
    "description": "Count how many times a target appears in a sorted array. Find first and last occurrence using binary search, then compute count.",
    "codeSnippet": "def countOccurrences(nums,target):\n    first,last=searchRange(nums,target)\n    return last-first+1 if first!=-1 else 0",
    "language": "python"
  },
  {
    "title": "Search in Rotated Sorted Array I",
    "description": "Given a rotated sorted array, find target element. Use modified binary search checking which half is properly sorted to narrow search efficiently.",
    "codeSnippet": "def searchRotated(nums,target):\n    left,right=0,len(nums)-1\n    while left<=right:\n        mid=(left+right)//2\n        if nums[mid]==target: return mid\n        if nums[left]<=nums[mid]:\n            if nums[left]<=target<nums[mid]: right=mid-1\n            else: left=mid+1\n        else:\n            if nums[mid]<target<=nums[right]: left=mid+1\n            else: right=mid-1\n    return -1",
    "language": "python"
  },
  {
    "title": "Find Minimum in Rotated Sorted Array",
    "description": "Find minimum element in rotated sorted array without duplicates. Use binary search to check mid against right to find pivot point efficiently.",
    "codeSnippet": "def findMin(nums):\n    left,right=0,len(nums)-1\n    while left<right:\n        mid=(left+right)//2\n        if nums[mid]>nums[right]: left=mid+1\n        else: right=mid\n    return nums[left]",
    "language": "python"
  },
  {
    "title": "Search in Rotated Sorted Array II",
    "description": "Similar to rotated sorted array but with duplicates. Carefully handle equal elements to reduce search space while using binary search.",
    "codeSnippet": "def searchRotatedDup(nums,target):\n    left,right=0,len(nums)-1\n    while left<=right:\n        mid=(left+right)//2\n        if nums[mid]==target: return True\n        if nums[left]==nums[mid]==nums[right]: left+=1; right-=1\n        elif nums[left]<=nums[mid]:\n            if nums[left]<=target<nums[mid]: right=mid-1\n            else: left=mid+1\n        else:\n            if nums[mid]<target<=nums[right]: left=mid+1\n            else: right=mid-1\n    return False",
    "language": "python"
  },
  {
    "title": "Median of Two Sorted Arrays",
    "description": "Find median of two sorted arrays in O(log(min(n,m))) time. Use binary search on smaller array to partition elements correctly.",
    "codeSnippet": "def findMedianSortedArrays(nums1,nums2):\n    if len(nums1)>len(nums2): nums1,nums2=nums2,nums1\n    x,y=len(nums1),len(nums2)\n    low,high=0,x\n    while low<=high:\n        px=(low+high)//2\n        py=(x+y+1)//2-px\n        maxLeftX=nums1[px-1] if px!=0 else float('-inf')\n        minRightX=nums1[px] if px!=x else float('inf')\n        maxLeftY=nums2[py-1] if py!=0 else float('-inf')\n        minRightY=nums2[py] if py!=y else float('inf')\n        if maxLeftX<=minRightY and maxLeftY<=minRightX:\n            if (x+y)%2==0: return (max(maxLeftX,maxLeftY)+min(minRightX,minRightY))/2\n            else: return max(maxLeftX,maxLeftY)\n        elif maxLeftX>minRightY: high=px-1\n        else: low=px+1",
    "language": "python"
  },
  {
    "title": "Kth Smallest Element in Sorted Matrix",
    "description": "Matrix rows and columns are sorted. Find kth smallest element using binary search on values and counting elements <= mid efficiently.",
    "codeSnippet": "def kthSmallest(matrix,k):\n    n=len(matrix)\n    left,right=matrix[0][0],matrix[-1][-1]\n    while left<right:\n        mid=(left+right)//2\n        count=sum([sum(1 for x in row if x<=mid) for row in matrix])\n        if count<k: left=mid+1\n        else: right=mid\n    return left",
    "language": "python"
  },
  {
    "title": "Kth Largest Element in a Stream",
    "description": "Maintain a stream of numbers and efficiently find kth largest. Use min-heap of size k to track largest elements dynamically.",
    "codeSnippet": "import heapq\nclass KthLargest:\n    def __init__(self,k,nums):\n        self.k=k\n        self.heap=nums\n        heapq.heapify(self.heap)\n        while len(self.heap)>k: heapq.heappop(self.heap)\n    def add(self,val):\n        heapq.heappush(self.heap,val)\n        if len(self.heap)>self.k: heapq.heappop(self.heap)\n        return self.heap[0]",
    "language": "python"
  },
  {
    "title": "Find Peak Element II (2D)",
    "description": "Given a 2D matrix, find a peak element greater than neighbors (up, down, left, right). Use divide-and-conquer to reduce rows/columns efficiently.",
    "codeSnippet": "def findPeakGrid(mat):\n    rows,cols=len(mat),len(mat[0])\n    def findMaxRow(row): return max(range(cols), key=lambda c: mat[row][c])\n    top,bottom=0,rows-1\n    while top<=bottom:\n        mid=(top+bottom)//2\n        c=findMaxRow(mid)\n        up=mat[mid-1][c] if mid>0 else float('-inf')\n        down=mat[mid+1][c] if mid<rows-1 else float('-inf')\n        if mat[mid][c]>=up and mat[mid][c]>=down: return [mid,c]\n        elif up>mat[mid][c]: bottom=mid-1\n        else: top=mid+1",
    "language": "python"
  },
  {
    "title": "Find Duplicate in Unsorted Array",
    "description": "Given an unsorted array with n+1 elements in range 1..n, find the duplicate without modifying array. Use binary search on value range.",
    "codeSnippet": "def findDuplicate(nums):\n    left,right=1,len(nums)-1\n    while left<right:\n        mid=(left+right)//2\n        count=sum(x<=mid for x in nums)\n        if count>mid: right=mid\n        else: left=mid+1\n    return left",
    "language": "python"
  },
  {
    "title": "Search in 3D Matrix",
    "description": "Matrix sorted along all three dimensions. Perform binary search by flattening indices or recursively narrowing planes, rows, and columns.",
    "codeSnippet": "def search3DMatrix(matrix,target):\n    l,r=0,len(matrix)*len(matrix[0])*len(matrix[0][0])-1\n    while l<=r:\n        mid=(l+r)//2\n        x=mid//(len(matrix[0])*len(matrix[0][0]))\n        y=(mid//len(matrix[0][0]))%len(matrix[0])\n        z=mid%len(matrix[0][0])\n        if matrix[x][y][z]==target: return True\n        elif matrix[x][y][z]<target: l=mid+1\n        else: r=mid-1\n    return False",
    "language": "python"
  },
  {
    "title": "First Bad Version",
    "description": "Given versions 1 to n, find the first bad version using minimal API calls. Binary search efficiently narrows down to the first failing version.",
    "codeSnippet": "def firstBadVersion(n,isBadVersion):\n    left,right=1,n\n    while left<right:\n        mid=(left+right)//2\n        if isBadVersion(mid): right=mid\n        else: left=mid+1\n    return left",
    "language": "python"
  },
  {
    "title": "Find Peak Element I",
    "description": "Find a peak element in an array where neighbors are smaller. Binary search can find any peak efficiently in O(log n) by checking mid against neighbors.",
    "codeSnippet": "def findPeak(nums):\n    left,right=0,len(nums)-1\n    while left<right:\n        mid=(left+right)//2\n        if nums[mid]<nums[mid+1]: left=mid+1\n        else: right=mid\n    return left",
    "language": "python"
  },
  {
    "title": "Find Missing Ranges",
    "description": "Given a sorted array of numbers in a range [lower, upper], find missing ranges. Iterate while comparing adjacent elements and store missing intervals.",
    "codeSnippet": "def findMissingRanges(nums,lower,upper):\n    res=[]\n    prev=lower-1\n    for i in range(len(nums)+1):\n        curr=nums[i] if i<len(nums) else upper+1\n        if curr-prev>1:\n            res.append(f'{prev+1}->{curr-1}' if curr-prev>2 else f'{prev+1}')\n        prev=curr\n    return res",
    "language": "python"
  },
  {
    "title": "Find Element in Mountain Array",
    "description": "Mountain array increases then decreases. Use binary search in increasing part first, then decreasing part if needed to locate target.",
    "codeSnippet": "def findInMountainArray(arr,target):\n    def peakIndex():\n        l,r=0,len(arr)-1\n        while l<r:\n            m=(l+r)//2\n            if arr[m]<arr[m+1]: l=m+1\n            else: r=m\n        return l\n    peak=peakIndex()\n    for l,r in [(0,peak),(peak+1,len(arr)-1)]:\n        while l<=r:\n            m=(l+r)//2\n            if arr[m]==target: return m\n            if l<=peak:\n                if arr[m]<target: l=m+1\n                else: r=m-1\n            else:\n                if arr[m]<target: r=m-1\n                else: l=m+1\n    return -1",
    "language": "python"
  },
  {
    "title": "Count of Smaller Numbers After Self",
    "description": "Given an array, count how many elements to the right are smaller. Use Binary Indexed Tree or merge-sort based counting efficiently.",
    "codeSnippet": "def countSmaller(nums):\n    res=[0]*len(nums)\n    def sort(enum):\n        mid=len(enum)//2\n        if mid:\n            left,right=sort(enum[:mid]),sort(enum[mid:])\n            m,n=0,0\n            while m+ n<len(enum):\n                if n==len(right) or (m<len(left) and left[m][1]<=right[n][1]):\n                    enum[m+n]=left[m]\n                    res[left[m][0]]+=n\n                    m+=1\n                else:\n                    enum[m+n]=right[n]; n+=1\n        return enum\n    sort(list(enumerate(nums)))\n    return res",
    "language": "python"
  },
  {
    "title": "Find Duplicate Number II",
    "description": "Find the duplicate in array where numbers are from 1 to n and exactly one duplicate exists. Use binary search on value range, not index.",
    "codeSnippet": "def findDuplicate(nums):\n    left,right=1,len(nums)-1\n    while left<right:\n        mid=(left+right)//2\n        if sum(x<=mid for x in nums)>mid: right=mid\n        else: left=mid+1\n    return left",
    "language": "python"
  },
  {
    "title": "Search Range in Infinite Sorted Array",
    "description": "Given an infinite or unknown-sized sorted array, find start and end position of a target. First find bounds exponentially, then binary search.",
    "codeSnippet": "def searchInfinite(arr,target):\n    left,right=0,1\n    while arr[right]<target: left,right=right,right*2\n    def binarySearch(l,r):\n        res=-1\n        while l<=r:\n            m=(l+r)//2\n            if arr[m]==target: res=m; r=m-1\n            elif arr[m]<target: l=m+1\n            else: r=m-1\n        return res\n    start=binarySearch(left,right)\n    end=binarySearch(left,right)\n    return [start,end]",
    "language": "python"
  },
  {
    "title": "Search in Circular Sorted Array",
    "description": "Given circularly sorted array, find target. Adapt binary search to account for rotation while maintaining O(log n) complexity.",
    "codeSnippet": "def searchCircular(nums,target):\n    left,right=0,len(nums)-1\n    while left<=right:\n        mid=(left+right)//2\n        if nums[mid]==target: return mid\n        if nums[left]<=nums[mid]:\n            if nums[left]<=target<nums[mid]: right=mid-1\n            else: left=mid+1\n        else:\n            if nums[mid]<target<=nums[right]: left=mid+1\n            else: right=mid-1\n    return -1",
    "language": "python"
  },
  {
    "title": "Maximum Element in Bitonic Array",
    "description": "Find maximum in array that increases then decreases. Use binary search to find peak efficiently rather than linear scan.",
    "codeSnippet": "def findMaxBitonic(arr):\n    left,right=0,len(arr)-1\n    while left<right:\n        mid=(left+right)//2\n        if arr[mid]<arr[mid+1]: left=mid+1\n        else: right=mid\n    return arr[left]",
    "language": "python"
  },
  {
    "title": "Find K Closest Elements",
    "description": "Given sorted array, find k elements closest to x. Use binary search to find insert position then expand pointers to collect k elements efficiently.",
    "codeSnippet": "def findClosestElements(arr,k,x):\n    left,right=0,len(arr)-k\n    while left<right:\n        mid=(left+right)//2\n        if x-arr[mid]>arr[mid+k]-x: left=mid+1\n        else: right=mid\n    return arr[left:left+k]",
    "language": "python"
  },
  {
    "title": "Find Range Sum in Sorted Array",
    "description": "Given sorted array, efficiently find sum of elements within a range [low,high]. Use binary search to locate bounds and sum slice.",
    "codeSnippet": "def rangeSum(nums,low,high):\n    def lowerBound(target):\n        l,r=0,len(nums)-1; res=len(nums)\n        while l<=r:\n            m=(l+r)//2\n            if nums[m]>=target: res=m; r=m-1\n            else: l=m+1\n        return res\n    def upperBound(target):\n        l,r=0,len(nums)-1; res=-1\n        while l<=r:\n            m=(l+r)//2\n            if nums[m]<=target: res=m; l=m+1\n            else: r=m-1\n        return res\n    l,u=lowerBound(low),upperBound(high)\n    return sum(nums[l:u+1]) if l<=u else 0",
    "language": "python"
  },
  {
    "title": "Search Element in Row-wise and Column-wise Sorted Matrix",
    "description": "Matrix sorted both row-wise and column-wise. Start from top-right, move left or down to find target in O(m+n) time.",
    "codeSnippet": "def searchMatrix(matrix,target):\n    if not matrix: return False\n    row,col=0,len(matrix[0])-1\n    while row<len(matrix) and col>=0:\n        if matrix[row][col]==target: return True\n        elif matrix[row][col]>target: col-=1\n        else: row+=1\n    return False",
    "language": "python"
  },
  {
    "title": "Minimum Difference Element",
    "description": "Find element closest to target in sorted array. Binary search to find insertion point and compare adjacent elements for minimum difference.",
    "codeSnippet": "def closestElement(arr,target):\n    left,right=0,len(arr)-1\n    while left<right:\n        mid=(left+right)//2\n        if arr[mid]<target: left=mid+1\n        else: right=mid\n    if left>0 and abs(arr[left-1]-target)<=abs(arr[left]-target): return arr[left-1]\n    return arr[left]",
    "language": "python"
  },
  {
    "title": "Search Insert Position",
    "description": "Given sorted array and target, find index where target would be inserted to maintain order. Use binary search for efficient O(log n) solution.",
    "codeSnippet": "def searchInsert(nums,target):\n    left,right=0,len(nums)-1\n    while left<=right:\n        mid=(left+right)//2\n        if nums[mid]==target: return mid\n        elif nums[mid]<target: left=mid+1\n        else: right=mid-1\n    return left",
    "language": "python"
  }
  ];
}
private getDynamicProgrammingHints(): Hint[] {
  return [
  {
    "title": "Climbing Stairs",
    "description": "Given n stairs, find the number of distinct ways to reach the top. Each step can be 1 or 2 stairs. DP helps store subproblem results to avoid recomputation.",
    "codeSnippet": "def climbStairs(n):\n    dp=[0]*(n+1)\n    dp[0]=1; dp[1]=1\n    for i in range(2,n+1):\n        dp[i]=dp[i-1]+dp[i-2]\n    return dp[n]",
    "language": "python"
  },
  {
    "title": "Minimum Path Sum",
    "description": "Given a grid, find the minimum sum path from top-left to bottom-right, moving only down or right. DP accumulates optimal paths from the start.",
    "codeSnippet": "def minPathSum(grid):\n    m,n=len(grid),len(grid[0])\n    dp=[[0]*n for _ in range(m)]\n    dp[0][0]=grid[0][0]\n    for i in range(m):\n        for j in range(n):\n            if i>0: dp[i][j]=dp[i][j]+dp[i-1][j]\n            if j>0: dp[i][j]=dp[i][j]+dp[i][j-1]-(dp[i-1][j] if i>0 and j>0 else 0)\n    return dp[m-1][n-1]",
    "language": "python"
  },
  {
    "title": "Longest Increasing Subsequence",
    "description": "Find the length of the longest increasing subsequence in an array. DP keeps track of the LIS ending at each index for optimal solutions.",
    "codeSnippet": "def lengthOfLIS(nums):\n    n=len(nums)\n    dp=[1]*n\n    for i in range(n):\n        for j in range(i):\n            if nums[i]>nums[j]: dp[i]=max(dp[i],dp[j]+1)\n    return max(dp)",
    "language": "python"
  },
  {
    "title": "House Robber",
    "description": "Maximize sum of non-adjacent elements in array. DP tracks max sum including or excluding each house to avoid robbing adjacent houses.",
    "codeSnippet": "def rob(nums):\n    prev=curr=0\n    for n in nums:\n        prev,curr=curr,max(curr,prev+n)\n    return curr",
    "language": "python"
  },
  {
    "title": "Coin Change",
    "description": "Given coins and amount, find minimum coins needed. DP array stores minimum coins for all amounts up to target for efficient calculation.",
    "codeSnippet": "def coinChange(coins,amount):\n    dp=[float('inf')]*(amount+1)\n    dp[0]=0\n    for i in range(1,amount+1):\n        for c in coins:\n            if i>=c: dp[i]=min(dp[i],dp[i-c]+1)\n    return dp[amount] if dp[amount]!=float('inf') else -1",
    "language": "python"
  },
  {
    "title": "Unique Paths",
    "description": "Count the number of unique paths in a grid from top-left to bottom-right, moving only right or down. DP builds the solution using paths from previous cells.",
    "codeSnippet": "def uniquePaths(m,n):\n    dp=[[1]*n for _ in range(m)]\n    for i in range(1,m):\n        for j in range(1,n): dp[i][j]=dp[i-1][j]+dp[i][j-1]\n    return dp[m-1][n-1]",
    "language": "python"
  },
  {
    "title": "Maximum Subarray Sum",
    "description": "Find the contiguous subarray with maximum sum. DP tracks the maximum sum ending at each index to optimize the global maximum.",
    "codeSnippet": "def maxSubArray(nums):\n    currMax=globalMax=nums[0]\n    for n in nums[1:]:\n        currMax=max(n,currMax+n)\n        globalMax=max(globalMax,currMax)\n    return globalMax",
    "language": "python"
  },
  {
    "title": "Edit Distance",
    "description": "Find minimum operations to convert word1 to word2 using insert, delete, replace. DP builds 2D table of edit distances for all prefixes.",
    "codeSnippet": "def minDistance(word1,word2):\n    m,n=len(word1),len(word2)\n    dp=[[0]*(n+1) for _ in range(m+1)]\n    for i in range(m+1): dp[i][0]=i\n    for j in range(n+1): dp[0][j]=j\n    for i in range(1,m+1):\n        for j in range(1,n+1):\n            if word1[i-1]==word2[j-1]: dp[i][j]=dp[i-1][j-1]\n            else: dp[i][j]=1+min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])\n    return dp[m][n]",
    "language": "python"
  },
  {
    "title": "Partition Equal Subset Sum",
    "description": "Check if array can be split into two subsets with equal sum. DP checks possible sums up to half of total using boolean table.",
    "codeSnippet": "def canPartition(nums):\n    total=sum(nums)\n    if total%2: return False\n    target=total//2\n    dp=[False]*(target+1)\n    dp[0]=True\n    for n in nums:\n        for i in range(target,n-1,-1): dp[i]=dp[i] or dp[i-n]\n    return dp[target]",
    "language": "python"
  },
  {
    "title": "Longest Common Subsequence",
    "description": "Find the length of LCS between two strings. DP table stores LCS lengths for all substring combinations to build optimal solution.",
    "codeSnippet": "def lcs(text1,text2):\n    m,n=len(text1),len(text2)\n    dp=[[0]*(n+1) for _ in range(m+1)]\n    for i in range(1,m+1):\n        for j in range(1,n+1):\n            if text1[i-1]==text2[j-1]: dp[i][j]=dp[i-1][j-1]+1\n            else: dp[i][j]=max(dp[i-1][j],dp[i][j-1])\n    return dp[m][n]",
    "language": "python"
  },
  {
    "title": "Word Break",
    "description": "Given a string and word dictionary, determine if string can be segmented into dictionary words. DP checks if substrings are segmentable efficiently.",
    "codeSnippet": "def wordBreak(s,wordDict):\n    n=len(s)\n    dp=[False]*(n+1)\n    dp[0]=True\n    wordSet=set(wordDict)\n    for i in range(1,n+1):\n        for j in range(i):\n            if dp[j] and s[j:i] in wordSet: dp[i]=True; break\n    return dp[n]",
    "language": "python"
  },
  {
    "title": "Maximum Product Subarray",
    "description": "Find contiguous subarray with maximum product. DP tracks both max and min products at each index due to negative numbers.",
    "codeSnippet": "def maxProduct(nums):\n    maxProd=minProd=result=nums[0]\n    for n in nums[1:]:\n        if n<0: maxProd,minProd=minProd,maxProd\n        maxProd=max(n,maxProd*n); minProd=min(n,minProd*n)\n        result=max(result,maxProd)\n    return result",
    "language": "python"
  },
  {
    "title": "Target Sum",
    "description": "Count ways to assign + or - signs to array elements to reach target sum. DP converts problem to subset sum variant for efficient computation.",
    "codeSnippet": "def findTargetSumWays(nums,S):\n    total=sum(nums)\n    if (S+total)%2: return 0\n    target=(S+total)//2\n    dp=[0]*(target+1); dp[0]=1\n    for num in nums:\n        for i in range(target,num-1,-1): dp[i]+=dp[i-num]\n    return dp[target]",
    "language": "python"
  },
  {
    "title": "Triangle Minimum Path Sum",
    "description": "Find minimum path from top to bottom in triangle array. DP updates minimum sum for each level starting from bottom row upwards.",
    "codeSnippet": "def minimumTotal(triangle):\n    dp=triangle[-1]\n    for row in triangle[-2::-1]:\n        dp=[row[i]+min(dp[i],dp[i+1]) for i in range(len(row))]\n    return dp[0]",
    "language": "python"
  },
  {
    "title": "Decode Ways",
    "description": "Given a string of digits, count ways to decode as letters (1->A..26->Z). DP tracks decoding options at each position considering 1 or 2 digit mappings.",
    "codeSnippet": "def numDecodings(s):\n    n=len(s)\n    dp=[0]*(n+1)\n    dp[0]=1\n    for i in range(1,n+1):\n        if s[i-1]!='0': dp[i]+=dp[i-1]\n        if i>1 and '10'<=s[i-2:i]<='26': dp[i]+=dp[i-2]\n    return dp[n]",
    "language": "python"
  },
  {
    "title": "Interleaving String",
    "description": "Determine if string s3 is formed by interleaving s1 and s2. DP table keeps track of valid interleavings for substring prefixes.",
    "codeSnippet": "def isInterleave(s1,s2,s3):\n    if len(s1)+len(s2)!=len(s3): return False\n    dp=[[False]*(len(s2)+1) for _ in range(len(s1)+1)]\n    dp[0][0]=True\n    for i in range(len(s1)+1):\n        for j in range(len(s2)+1):\n            if i>0 and s1[i-1]==s3[i+j-1]: dp[i][j]|=dp[i-1][j]\n            if j>0 and s2[j-1]==s3[i+j-1]: dp[i][j]|=dp[i][j-1]\n    return dp[-1][-1]",
    "language": "python"
  },
  {
    "title": "Russian Doll Envelopes",
    "description": "Find max number of envelopes that can be nested. Sort envelopes and reduce to LIS problem on heights for efficient DP solution.",
    "codeSnippet": "def maxEnvelopes(envelopes):\n    envelopes.sort(key=lambda x:(x[0],-x[1]))\n    heights=[h for w,h in envelopes]\n    dp=[]\n    for h in heights:\n        l,r=0,len(dp)\n        while l<r: m=(l+r)//2; (l,r)=(m+1,r) if dp[m]<h else (l,m)\n        if l==len(dp): dp.append(h)\n        else: dp[l]=h\n    return len(dp)",
    "language": "python"
  },
  {
    "title": "Maximal Square",
    "description": "Find largest square of 1s in binary matrix. DP tracks size of largest square ending at each cell using top, left, and diagonal neighbors.",
    "codeSnippet": "def maximalSquare(matrix):\n    if not matrix: return 0\n    m,n=len(matrix),len(matrix[0]); dp=[[0]*n for _ in range(m)]; maxSide=0\n    for i in range(m):\n        for j in range(n):\n            if matrix[i][j]=='1':\n                dp[i][j]=1+min(dp[i-1][j] if i>0 else 0, dp[i][j-1] if j>0 else 0, dp[i-1][j-1] if i>0 and j>0 else 0)\n                maxSide=max(maxSide,dp[i][j])\n    return maxSide*maxSide",
    "language": "python"
  },
  {
    "title": "Best Time to Buy and Sell Stock",
    "description": "Given an array of prices, find the maximum profit by buying and selling once. DP keeps track of the minimum price so far to compute maximum profit efficiently.",
    "codeSnippet": "def maxProfit(prices):\n    minPrice=float('inf')\n    maxProfit=0\n    for price in prices:\n        minPrice=min(minPrice,price)\n        maxProfit=max(maxProfit,price-minPrice)\n    return maxProfit",
    "language": "python"
  },
  {
    "title": "House Robber II",
    "description": "Variation where houses are in a circle. Max sum is calculated by running DP twice: once excluding the first house and once excluding the last house.",
    "codeSnippet": "def rob(nums):\n    def robLinear(arr):\n        prev=curr=0\n        for n in arr: prev,curr=curr,max(curr,prev+n)\n        return curr\n    if len(nums)==1: return nums[0]\n    return max(robLinear(nums[:-1]),robLinear(nums[1:]))",
    "language": "python"
  },
  {
    "title": "Palindrome Partitioning II",
    "description": "Given a string, find the minimum cuts needed for palindromic partitioning. DP precomputes palindromes and uses DP to find minimum cuts efficiently.",
    "codeSnippet": "def minCut(s):\n    n=len(s)\n    dp=[0]*n\n    palindrome=[[False]*n for _ in range(n)]\n    for i in range(n):\n        minCuts=i\n        for j in range(i+1):\n            if s[j]==s[i] and (i-j<2 or palindrome[j+1][i-1]):\n                palindrome[j][i]=True\n                minCuts=0 if j==0 else min(minCuts,dp[j-1]+1)\n        dp[i]=minCuts\n    return dp[-1]",
    "language": "python"
  },
  {
    "title": "Count Square Submatrices with All Ones",
    "description": "Count all square submatrices with 1s. DP stores the size of the largest square ending at each cell and sums them up for result.",
    "codeSnippet": "def countSquares(matrix):\n    m,n=len(matrix),len(matrix[0])\n    dp=[[0]*n for _ in range(m)]\n    count=0\n    for i in range(m):\n        for j in range(n):\n            if matrix[i][j]==1:\n                dp[i][j]=1+min(dp[i-1][j] if i>0 else 0, dp[i][j-1] if j>0 else 0, dp[i-1][j-1] if i>0 and j>0 else 0)\n                count+=dp[i][j]\n    return count",
    "language": "python"
  },
  {
    "title": "Distinct Subsequences",
    "description": "Count how many distinct ways string T can be formed from string S. DP stores the number of ways for substrings of S and T.",
    "codeSnippet": "def numDistinct(s,t):\n    m,n=len(s),len(t)\n    dp=[[0]*(n+1) for _ in range(m+1)]\n    for i in range(m+1): dp[i][0]=1\n    for i in range(1,m+1):\n        for j in range(1,n+1):\n            if s[i-1]==t[j-1]: dp[i][j]=dp[i-1][j-1]+dp[i-1][j]\n            else: dp[i][j]=dp[i-1][j]\n    return dp[m][n]",
    "language": "python"
  },
  {
    "title": "Scramble String",
    "description": "Check if one string is a scrambled version of another. DP table keeps track of possible scrambles for substring ranges using bottom-up approach.",
    "codeSnippet": "def isScramble(s1,s2):\n    from functools import lru_cache\n    @lru_cache(None)\n    def dfs(a,b):\n        if a==b: return True\n        if sorted(a)!=sorted(b): return False\n        for i in range(1,len(a)):\n            if dfs(a[:i],b[:i]) and dfs(a[i:],b[i:]): return True\n            if dfs(a[:i],b[-i:]) and dfs(a[i:],b[:-i]): return True\n        return False\n    return dfs(s1,s2)",
    "language": "python"
  },
  {
    "title": "Target Sum Subsets Count",
    "description": "Count number of subsets that sum to target. DP array stores counts for sums up to target for efficient computation.",
    "codeSnippet": "def countSubsets(nums,target):\n    dp=[0]*(target+1); dp[0]=1\n    for num in nums:\n        for i in range(target,num-1,-1): dp[i]+=dp[i-num]\n    return dp[target]",
    "language": "python"
  },
  {
    "title": "Max Sum of Non-Adjacent Numbers",
    "description": "Variation of House Robber where elements are in array and non-adjacent. DP tracks max sum including/excluding each element efficiently.",
    "codeSnippet": "def maxSumNonAdjacent(nums):\n    incl=0; excl=0\n    for num in nums:\n        incl,excl=excl+num,max(incl,excl)\n    return max(incl,excl)",
    "language": "python"
  },
  {
    "title": "Word Wrap Problem",
    "description": "Given words and line width, minimize extra spaces at line ends. DP calculates minimum cost for wrapping words efficiently.",
    "codeSnippet": "def wordWrap(words,maxWidth):\n    n=len(words)\n    dp=[float('inf')]*(n+1); dp[n]=0\n    for i in range(n-1,-1,-1):\n        length=-1\n        for j in range(i,n):\n            length+=len(words[j])+1\n            if length>maxWidth: break\n            dp[i]=min(dp[i],(maxWidth-length)**2+dp[j+1])\n    return dp[0]",
    "language": "python"
  },
  {
    "title": "Maximum Sum Rectangle in 2D Matrix",
    "description": "Find rectangle in 2D matrix with maximum sum. Convert problem to 1D max subarray for each row pair using DP.",
    "codeSnippet": "def maxSumRectangle(matrix):\n    if not matrix: return 0\n    m,n=len(matrix),len(matrix[0])\n    maxSum=float('-inf')\n    for top in range(m):\n        temp=[0]*n\n        for bottom in range(top,m):\n            for i in range(n): temp[i]+=matrix[bottom][i]\n            currMax=curr=temp[0]\n            for x in temp[1:]: curr=max(x,curr+x); currMax=max(currMax,curr)\n            maxSum=max(maxSum,currMax)\n    return maxSum",
    "language": "python"
  },
  {
    "title": "Paint House",
    "description": "Given n houses and k colors, paint all houses minimizing cost without painting two adjacent houses the same. DP tracks min cost for each color per house.",
    "codeSnippet": "def minCost(costs):\n    if not costs: return 0\n    for i in range(1,len(costs)):\n        costs[i][0]+=min(costs[i-1][1],costs[i-1][2])\n        costs[i][1]+=min(costs[i-1][0],costs[i-1][2])\n        costs[i][2]+=min(costs[i-1][0],costs[i-1][1])\n    return min(costs[-1])",
    "language": "python"
  },
  {
    "title": "Frog Jump",
    "description": "Given stones with heights, find min cost to reach last stone by jumping 1 or 2 steps. DP keeps track of min cost to reach each stone.",
    "codeSnippet": "def minCost(heights):\n    n=len(heights)\n    dp=[0]*n\n    for i in range(1,n):\n        cost1=dp[i-1]+abs(heights[i]-heights[i-1])\n        cost2=dp[i-2]+abs(heights[i]-heights[i-2]) if i>1 else float('inf')\n        dp[i]=min(cost1,cost2)\n    return dp[-1]",
    "language": "python"
  },
  {
    "title": "Minimum Cost to Cut a Stick",
    "description": "Given a stick and cut positions, find minimum cost to cut completely. DP considers all partitions and stores minimal cost efficiently.",
    "codeSnippet": "def minCostCut(length,cuts):\n    cuts=[0]+sorted(cuts)+[length]\n    n=len(cuts)\n    dp=[[0]*len(cuts) for _ in range(len(cuts))]\n    for l in range(2,len(cuts)):\n        for i in range(len(cuts)-l):\n            j=i+l\n            dp[i][j]=min(cuts[j]-cuts[i]+dp[i][k]+dp[k][j] for k in range(i+1,j))\n    return dp[0][-1]",
    "language": "python"
  },
  {
    "title": "Burst Balloons",
    "description": "Maximize coins by bursting balloons. DP considers every subarray as last balloon to burst and stores maximum coins for efficient calculation.",
    "codeSnippet": "def maxCoins(nums):\n    nums=[1]+nums+[1]\n    n=len(nums)\n    dp=[[0]*n for _ in range(n)]\n    for length in range(2,n):\n        for left in range(0,n-length):\n            right=left+length\n            for i in range(left+1,right):\n                dp[left][right]=max(dp[left][right],nums[left]*nums[i]*nums[right]+dp[left][i]+dp[i][right])\n    return dp[0][-1]",
    "language": "python"
  },
  {
    "title": "Count Ways to Reach Nth Stair",
    "description": "Generalized climbing stairs with steps in a given set. DP stores number of ways to reach each stair efficiently.",
    "codeSnippet": "def countWays(n,steps):\n    dp=[0]*(n+1); dp[0]=1\n    for i in range(1,n+1):\n        for s in steps:\n            if i>=s: dp[i]+=dp[i-s]\n    return dp[n]",
    "language": "python"
  },
  {
    "title": "Longest Increasing Subsequence",
    "description": "Find the length of the longest strictly increasing subsequence in an array. DP stores the length of LIS ending at each index for efficient computation.",
    "codeSnippet": "def lengthOfLIS(nums):\n    dp=[1]*len(nums)\n    for i in range(len(nums)):\n        for j in range(i):\n            if nums[i]>nums[j]: dp[i]=max(dp[i],dp[j]+1)\n    return max(dp)",
    "language": "python"
  },
  {
    "title": "Longest Common Subsequence",
    "description": "Given two strings, find the length of their longest common subsequence. DP table stores LCS lengths for all substring pairs.",
    "codeSnippet": "def lcs(text1,text2):\n    m,n=len(text1),len(text2)\n    dp=[[0]*(n+1) for _ in range(m+1)]\n    for i in range(1,m+1):\n        for j in range(1,n+1):\n            if text1[i-1]==text2[j-1]: dp[i][j]=dp[i-1][j-1]+1\n            else: dp[i][j]=max(dp[i-1][j],dp[i][j-1])\n    return dp[m][n]",
    "language": "python"
  },
  {
    "title": "Longest Palindromic Subsequence",
    "description": "Find the length of the longest palindromic subsequence in a string. DP stores lengths for all substring ranges efficiently.",
    "codeSnippet": "def longestPalindromeSubseq(s):\n    n=len(s)\n    dp=[[0]*n for _ in range(n)]\n    for i in range(n-1,-1,-1):\n        dp[i][i]=1\n        for j in range(i+1,n):\n            if s[i]==s[j]: dp[i][j]=dp[i+1][j-1]+2\n            else: dp[i][j]=max(dp[i+1][j],dp[i][j-1])\n    return dp[0][n-1]",
    "language": "python"
  },
  {
    "title": "Coin Change (Number of Ways)",
    "description": "Given coins and amount, count the number of combinations to make the amount. DP stores ways to make each sum efficiently.",
    "codeSnippet": "def coinChange(coins,amount):\n    dp=[0]*(amount+1); dp[0]=1\n    for coin in coins:\n        for i in range(coin,amount+1): dp[i]+=dp[i-coin]\n    return dp[amount]",
    "language": "python"
  },
  {
    "title": "Coin Change (Min Coins)",
    "description": "Find minimum number of coins to make a target amount. DP stores minimum coins needed for each sum efficiently.",
    "codeSnippet": "def minCoins(coins,amount):\n    dp=[float('inf')]*(amount+1); dp[0]=0\n    for i in range(1,amount+1):\n        for coin in coins:\n            if i>=coin: dp[i]=min(dp[i],dp[i-coin]+1)\n    return dp[amount] if dp[amount]!=float('inf') else -1",
    "language": "python"
  },
  {
    "title": "Knapsack 0/1",
    "description": "Given weights and values, maximize value without exceeding capacity. DP table stores maximum value for each weight and subset.",
    "codeSnippet": "def knapsack(wt,val,W):\n    n=len(wt)\n    dp=[[0]*(W+1) for _ in range(n+1)]\n    for i in range(1,n+1):\n        for w in range(W+1):\n            if wt[i-1]<=w: dp[i][w]=max(dp[i-1][w],dp[i-1][w-wt[i-1]]+val[i-1])\n            else: dp[i][w]=dp[i-1][w]\n    return dp[n][W]",
    "language": "python"
  },
  {
    "title": "Partition Equal Subset Sum",
    "description": "Check if array can be partitioned into two subsets with equal sum. DP stores reachable sums up to half of total sum.",
    "codeSnippet": "def canPartition(nums):\n    total=sum(nums)\n    if total%2!=0: return False\n    target=total//2\n    dp=[False]*(target+1); dp[0]=True\n    for num in nums:\n        for i in range(target,num-1,-1): dp[i]=dp[i] or dp[i-num]\n    return dp[target]",
    "language": "python"
  },
  {
    "title": "Decode Ways",
    "description": "Count ways to decode a string of digits mapping 1->A to 26->Z. DP stores number of decodings for each substring efficiently.",
    "codeSnippet": "def numDecodings(s):\n    n=len(s)\n    dp=[0]*(n+1); dp[0]=1\n    for i in range(1,n+1):\n        if s[i-1]!='0': dp[i]+=dp[i-1]\n        if i>1 and '10'<=s[i-2:i]<='26': dp[i]+=dp[i-2]\n    return dp[n]",
    "language": "python"
  },
  {
    "title": "Unique Paths",
    "description": "Count unique paths from top-left to bottom-right in a grid. DP stores paths to each cell as sum of top and left neighbors.",
    "codeSnippet": "def uniquePaths(m,n):\n    dp=[[1]*n for _ in range(m)]\n    for i in range(1,m):\n        for j in range(1,n): dp[i][j]=dp[i-1][j]+dp[i][j-1]\n    return dp[-1][-1]",
    "language": "python"
  },
  {
    "title": "Unique Paths II",
    "description": "Unique paths in a grid with obstacles. DP ignores cells with obstacles and sums paths from top and left neighbors.",
    "codeSnippet": "def uniquePathsWithObstacles(grid):\n    m,n=len(grid),len(grid[0])\n    dp=[[0]*n for _ in range(m)]\n    dp[0][0]=1 if grid[0][0]==0 else 0\n    for i in range(m):\n        for j in range(n):\n            if grid[i][j]==1: dp[i][j]=0\n            else:\n                if i>0: dp[i][j]+=dp[i-1][j]\n                if j>0: dp[i][j]+=dp[i][j-1]\n    return dp[-1][-1]",
    "language": "python"
  },
  {
    "title": "Edit Distance",
    "description": "Find minimum operations (insert, delete, replace) to convert one string to another. DP table stores minimal operations for substring pairs.",
    "codeSnippet": "def minDistance(word1,word2):\n    m,n=len(word1),len(word2)\n    dp=[[0]*(n+1) for _ in range(m+1)]\n    for i in range(m+1): dp[i][0]=i\n    for j in range(n+1): dp[0][j]=j\n    for i in range(1,m+1):\n        for j in range(1,n+1):\n            if word1[i-1]==word2[j-1]: dp[i][j]=dp[i-1][j-1]\n            else: dp[i][j]=1+min(dp[i-1][j-1],dp[i-1][j],dp[i][j-1])\n    return dp[m][n]",
    "language": "python"
  },
  {
    "title": "Maximal Square",
    "description": "Find largest square of 1s in binary matrix. DP stores size of largest square ending at each cell and updates maximum found.",
    "codeSnippet": "def maximalSquare(matrix):\n    if not matrix: return 0\n    m,n=len(matrix),len(matrix[0])\n    dp=[[0]*n for _ in range(m)]\n    maxSide=0\n    for i in range(m):\n        for j in range(n):\n            if matrix[i][j]=='1':\n                dp[i][j]=1+min(dp[i-1][j] if i>0 else 0, dp[i][j-1] if j>0 else 0, dp[i-1][j-1] if i>0 and j>0 else 0)\n                maxSide=max(maxSide,dp[i][j])\n    return maxSide*maxSide",
    "language": "python"
  },
  {
    "title": "Word Break",
    "description": "Check if string can be segmented into words from a dictionary. DP stores segmentation possibilities for each prefix efficiently.",
    "codeSnippet": "def wordBreak(s,wordDict):\n    wordSet=set(wordDict)\n    n=len(s)\n    dp=[False]*(n+1); dp[0]=True\n    for i in range(1,n+1):\n        for j in range(i):\n            if dp[j] and s[j:i] in wordSet: dp[i]=True; break\n    return dp[n]",
    "language": "python"
  },
  {
    "title": "Interleaving String",
    "description": "Check if a string is formed by interleaving two other strings. DP stores boolean results for all substring combinations.",
    "codeSnippet": "def isInterleave(s1,s2,s3):\n    if len(s1)+len(s2)!=len(s3): return False\n    dp=[[False]*(len(s2)+1) for _ in range(len(s1)+1)]\n    dp[0][0]=True\n    for i in range(len(s1)+1):\n        for j in range(len(s2)+1):\n            if i>0 and s1[i-1]==s3[i+j-1]: dp[i][j]|=dp[i-1][j]\n            if j>0 and s2[j-1]==s3[i+j-1]: dp[i][j]|=dp[i][j-1]\n    return dp[len(s1)][len(s2)]",
    "language": "python"
  },
  {
    "title": "Regular Expression Matching",
    "description": "Check if a string matches a pattern with '.' and '*'. DP table stores match results for all substring/pattern combinations efficiently.",
    "codeSnippet": "def isMatch(s,p):\n    m,n=len(s),len(p)\n    dp=[[False]*(n+1) for _ in range(m+1)]\n    dp[0][0]=True\n    for j in range(2,n+1):\n        if p[j-1]=='*': dp[0][j]=dp[0][j-2]\n    for i in range(1,m+1):\n        for j in range(1,n+1):\n            if p[j-1]==s[i-1] or p[j-1]=='.': dp[i][j]=dp[i-1][j-1]\n            elif p[j-1]=='*': dp[i][j]=dp[i][j-2] or ((p[j-2]==s[i-1] or p[j-2]=='.') and dp[i-1][j])\n    return dp[m][n]",
    "language": "python"
  },
  {
    "title": "Minimum Path Sum",
    "description": "Find path from top-left to bottom-right with minimum sum. DP stores minimal sum to reach each cell from top-left efficiently.",
    "codeSnippet": "def minPathSum(grid):\n    m,n=len(grid),len(grid[0])\n    for i in range(m):\n        for j in range(n):\n            if i>0 and j>0: grid[i][j]+=min(grid[i-1][j],grid[i][j-1])\n            elif i>0: grid[i][j]+=grid[i-1][j]\n            elif j>0: grid[i][j]+=grid[i][j-1]\n    return grid[-1][-1]",
    "language": "python"
  },
  {
    "title": "Maximum Product Subarray",
    "description": "Find contiguous subarray with maximum product. DP stores max and min products ending at each index due to negative numbers.",
    "codeSnippet": "def maxProduct(nums):\n    maxProd=minProd=result=nums[0]\n    for num in nums[1:]:\n        if num<0: maxProd,minProd=minProd,maxProd\n        maxProd=max(num,maxProd*num)\n        minProd=min(num,minProd*num)\n        result=max(result,maxProd)\n    return result",
    "language": "python"
  },
  {
    "title": "Triangle Minimum Path Sum",
    "description": "Find minimum path sum from top to bottom of triangle. DP updates row by row, storing minimum path sums efficiently.",
    "codeSnippet": "def minimumTotal(triangle):\n    dp=triangle[-1][:]\n    for i in range(len(triangle)-2,-1,-1):\n        for j in range(len(triangle[i])): dp[j]=triangle[i][j]+min(dp[j],dp[j+1])\n    return dp[0]",
    "language": "python"
  }
  ];
}
private getGreedyAlgorithmHints(): Hint[] {
  return [
  {
    "title": "Activity Selection Problem",
    "description": "Given start and end times of activities, select the maximum number of non-overlapping activities. Sort by finish time and greedily pick compatible activities.",
    "codeSnippet": "def activitySelection(start,end):\n    activities=sorted(zip(start,end),key=lambda x:x[1])\n    count=1; last=end[0]\n    for s,e in activities[1:]:\n        if s>=last: count+=1; last=e\n    return count",
    "language": "python"
  },
  {
    "title": "Fractional Knapsack",
    "description": "Maximize value with weight constraint by allowing fractions. Sort items by value/weight ratio and pick greedily until full capacity.",
    "codeSnippet": "def fractionalKnapsack(W,weights,values):\n    ratio=[(v/w,w) for v,w in zip(values,weights)]\n    ratio.sort(reverse=True)\n    total=0\n    for r,w in ratio:\n        if W>=w: total+=r*w; W-=w\n        else: total+=r*W; break\n    return total",
    "language": "python"
  },
  {
    "title": "Job Sequencing with Deadlines",
    "description": "Schedule jobs to maximize profit with deadlines. Sort jobs by profit and greedily assign latest available slots before deadline.",
    "codeSnippet": "def jobScheduling(jobs):\n    jobs.sort(key=lambda x:x[1],reverse=True) # profit descending\n    max_dead=max(d for j,d,p in jobs)\n    slot=[-1]*(max_dead+1); profit=0\n    for j,d,p in jobs:\n        for i in range(d,0,-1):\n            if slot[i]==-1: slot[i]=j; profit+=p; break\n    return profit",
    "language": "python"
  },
  {
    "title": "Minimum Coins for Change",
    "description": "Given denominations, find minimum coins to make a value. Greedily pick largest coin until remaining amount is zero (works for canonical coin systems).",
    "codeSnippet": "def minCoins(coins,amount):\n    coins.sort(reverse=True); cnt=0\n    for c in coins:\n        take=amount//c; cnt+=take; amount-=take*c\n    return cnt if amount==0 else -1",
    "language": "python"
  },
  {
    "title": "Gas Station / Minimum Refills",
    "description": "Compute minimum number of refills to reach destination. Greedily refill at the farthest reachable station each time.",
    "codeSnippet": "def minRefills(dist,capacity,stations):\n    stations=[0]+stations+[dist]; pos=0; count=0\n    for i in range(1,len(stations)):\n        if stations[i]-stations[pos]>capacity: pos=i-1; count+=1\n            if stations[i]-stations[pos]>capacity: return -1\n    return count",
    "language": "python"
  },
  {
    "title": "Huffman Encoding",
    "description": "Construct an optimal prefix code for characters. Greedily combine two least frequent nodes repeatedly to build Huffman tree.",
    "codeSnippet": "import heapq\n\ndef huffman(freqs):\n    heap=[[f,[c,'']] for c,f in freqs.items()]\n    heapq.heapify(heap)\n    while len(heap)>1:\n        lo,hi=heapq.heappop(heap),heapq.heappop(heap)\n        for pair in lo[1:]: pair[1]='0'+pair[1]\n        for pair in hi[1:]: pair[1]='1'+pair[1]\n        heapq.heappush(heap,[lo[0]+hi[0]]+lo[1:]+hi[1:])\n    return sorted(heapq.heappop(heap)[1:],key=lambda p:(len(p[-1]),p))",
    "language": "python"
  },
  {
    "title": "Interval Partitioning / Room Scheduling",
    "description": "Given intervals, find minimum number of resources required so that no overlapping intervals share a resource. Greedily allocate based on start times and earliest finish.",
    "codeSnippet": "def minResources(intervals):\n    starts=sorted([i[0] for i in intervals]); ends=sorted([i[1] for i in intervals])\n    s=e=res=0\n    while s<len(starts):\n        if starts[s]<ends[e]: res+=1; s+=1\n        else: e+=1; s+=1\n    return res",
    "language": "python"
  },
  {
    "title": "Minimum Spanning Tree (Prim's / Kruskal's)",
    "description": "Construct MST to connect all vertices with minimum edge weight. Greedily pick smallest edges connecting new nodes (Kruskal uses union-find).",
    "codeSnippet": "def kruskalMST(edges,n):\n    parent=list(range(n))\n    def find(u):\n        while u!=parent[u]: u=parent[u]\n        return u\n    edges.sort(key=lambda x:x[2]); mst=0\n    for u,v,w in edges:\n        pu,pv=find(u),find(v)\n        if pu!=pv: parent[pu]=pv; mst+=w\n    return mst",
    "language": "python"
  },
  {
    "title": "Maximum Activities with Deadline",
    "description": "Select tasks to maximize count completed before their deadlines. Sort by deadline and greedily pick tasks with shortest duration first.",
    "codeSnippet": "def maxTasks(tasks):\n    tasks.sort(key=lambda x:x[1])\n    time=count=0\n    for dur,deadline in tasks:\n        if time+dur<=deadline: time+=dur; count+=1\n    return count",
    "language": "python"
  },
  {
    "title": "Minimize Sum of Product Pairs",
    "description": "Given two arrays, minimize sum of products of corresponding elements. Sort one ascending and the other descending to achieve minimum sum.",
    "codeSnippet": "def minSumProduct(a,b):\n    a.sort(); b.sort(reverse=True)\n    return sum(x*y for x,y in zip(a,b))",
    "language": "python"
  },
  {
    "title": "Largest Number of Events Attendable",
    "description": "Attend maximum number of events given start and end days. Greedily pick earliest ending events to avoid overlaps.",
    "codeSnippet": "def maxEvents(events):\n    events.sort(key=lambda x:x[1]); res=0; last=0\n    for s,e in events:\n        if s>last: last=e; res+=1\n    return res",
    "language": "python"
  },
  {
    "title": "Minimize Meeting Rooms",
    "description": "Find minimum meeting rooms required for given time intervals. Sort start times, track ongoing meetings, and greedily update count.",
    "codeSnippet": "def minMeetingRooms(intervals):\n    starts=sorted(i[0] for i in intervals); ends=sorted(i[1] for i in intervals)\n    s=e=rooms=res=0\n    while s<len(starts):\n        if starts[s]<ends[e]: rooms+=1; s+=1\n        else: rooms-=1; e+=1\n        res=max(res,rooms)\n    return res",
    "language": "python"
  },
  {
    "title": "Minimum Number of Platforms",
    "description": "Find minimum railway platforms required for trains with arrival and departure times. Greedily track overlapping trains using sorted times.",
    "codeSnippet": "def minPlatforms(arr,dep):\n    arr.sort(); dep.sort()\n    plat=1;i=j=0; res=0\n    while i<len(arr):\n        if arr[i]<=dep[j]: plat+=1; i+=1\n        else: plat-=1; j+=1\n        res=max(res,plat)\n    return res",
    "language": "python"
  },
  {
    "title": "Greedy Change Making Problem",
    "description": "Given unlimited coins, find minimal coins to make target amount. Pick largest denomination greedily; works for canonical coin systems.",
    "codeSnippet": "def greedyChange(coins,amount):\n    coins.sort(reverse=True); count=0\n    for c in coins:\n        take=amount//c; count+=take; amount-=c*take\n    return count if amount==0 else -1",
    "language": "python"
  },
  {
    "title": "Maximum Product Cutting",
    "description": "Cut rope into integer lengths to maximize product. Greedily cut into 3s or 2s based on remainder to maximize product.",
    "codeSnippet": "def maxProduct(n):\n    if n<=3: return n-1\n    res=1\n    while n>4: res*=3; n-=3\n    return res*n",
    "language": "python"
  },
  {
    "title": "Minimize Sum of Absolute Differences",
    "description": "Pair elements from two arrays to minimize sum of absolute differences. Sort both arrays and greedily pair smallest with smallest.",
    "codeSnippet": "def minAbsSum(a,b):\n    a.sort(); b.sort()\n    return sum(abs(x-y) for x,y in zip(a,b))",
    "language": "python"
  },
  {
    "title": "Maximum Number of Activities with Duration",
    "description": "Given start, end, and duration of tasks, select maximum number of tasks. Greedily pick tasks finishing earliest to allow more tasks.",
    "codeSnippet": "def maxActivities(tasks):\n    tasks.sort(key=lambda x:x[1])\n    end=time=count=0\n    for s,d in tasks:\n        if s>=end: count+=1; end=s+d\n    return count",
    "language": "python"
  },
  {
    "title": "Interval Covering / Minimum Points",
    "description": "Given intervals, find minimum points to cover all. Sort by end and greedily select end points to cover maximum intervals.",
    "codeSnippet": "def minPoints(intervals):\n    intervals.sort(key=lambda x:x[1]); res=[]\n    last=-float('inf')\n    for s,e in intervals:\n        if s>last: res.append(e); last=e\n    return res",
    "language": "python"
  },
  {
    "title": "Maximize Stock Profit (Single Transaction)",
    "description": "Buy and sell stock once to maximize profit. Greedily track minimum price and update max profit as we iterate.",
    "codeSnippet": "def maxProfit(prices):\n    minPrice=float('inf'); profit=0\n    for p in prices: minPrice=min(minPrice,p); profit=max(profit,p-minPrice)\n    return profit",
    "language": "python"
  },  
  {
    "title": "Maximum Length of Pair Chain",
    "description": "Given pairs [a,b], form the longest chain where each pair’s first number is greater than previous pair’s second. Sort by second element and greedily pick compatible pairs.",
    "codeSnippet": "def findLongestChain(pairs):\n    pairs.sort(key=lambda x:x[1])\n    cur=-float('inf'); count=0\n    for a,b in pairs:\n        if a>cur: cur=b; count+=1\n    return count",
    "language": "python"
  },
  {
    "title": "Minimum Number of Arrows to Burst Balloons",
    "description": "Given intervals representing balloons, find minimum arrows to burst all. Sort by end and greedily shoot arrow at earliest end to cover maximum balloons.",
    "codeSnippet": "def findMinArrows(points):\n    if not points: return 0\n    points.sort(key=lambda x:x[1])\n    arrows=end=points[0][1]; count=1\n    for x,y in points[1:]:\n        if x>end: arrows=y; end=y; count+=1\n    return count",
    "language": "python"
  },
  {
    "title": "Minimum Number of Platforms for Trains",
    "description": "Given arrival and departure times, find minimum platforms. Sort arrivals and departures, increment/decrement counters as trains arrive/depart.",
    "codeSnippet": "def minPlatforms(arr,dep):\n    arr.sort(); dep.sort(); i=j=plat=maxPlat=0\n    while i<len(arr):\n        if arr[i]<=dep[j]: plat+=1; i+=1\n        else: plat-=1; j+=1\n        maxPlat=max(maxPlat,plat)\n    return maxPlat",
    "language": "python"
  },
  {
    "title": "Maximum Ice Cream Bars",
    "description": "Given costs of ice cream and coins, buy maximum ice creams. Sort costs ascending and greedily pick cheapest first until coins run out.",
    "codeSnippet": "def maxIceCream(costs,coins):\n    costs.sort(); count=0\n    for c in costs:\n        if coins>=c: coins-=c; count+=1\n        else: break\n    return count",
    "language": "python"
  },
  {
    "title": "Maximum Number of Events You Can Attend II",
    "description": "Given events with start, end, and value, attend events to maximize total value with at most k events. Greedy + dynamic approach using sorting by end works well for some variants.",
    "codeSnippet": "def maxValue(events,k):\n    events.sort(key=lambda x:x[1])\n    import bisect\n    dp=[(0,0)]\n    for s,e,v in events:\n        i=bisect.bisect(dp,(s, float('inf')))\n        if len(dp)<k+1 or dp[i-1][1]+v>dp[-1][1]: dp.append((e, dp[i-1][1]+v))\n    return dp[-1][1]",
    "language": "python"
  },
  {
    "title": "Maximize Capital",
    "description": "Given initial capital and projects with profit and cost, choose k projects to maximize capital. Sort projects by cost and pick highest profit affordable.",
    "codeSnippet": "import heapq\n\ndef findMaximizedCapital(k,W,Profits,Capital):\n    projects=sorted(zip(Capital,Profits))\n    h=[]; i=0\n    for _ in range(k):\n        while i<len(projects) and projects[i][0]<=W: heapq.heappush(h,-projects[i][1]); i+=1\n        if not h: break\n        W+=-heapq.heappop(h)\n    return W",
    "language": "python"
  },
  {
    "title": "Reorganize String",
    "description": "Rearrange characters so that no two adjacent are the same. Count frequencies, use max heap, greedily pick highest frequency character and alternate placement.",
    "codeSnippet": "import heapq\nfrom collections import Counter\n\ndef reorganizeString(s):\n    c=Counter(s); h=[(-v,k) for k,v in c.items()]; heapq.heapify(h)\n    res=''; prev=0, ''\n    while h:\n        f,ch=heapq.heappop(h)\n        res+=ch\n        if prev[0]<0: heapq.heappush(h,prev)\n        prev=(f+1,ch)\n    return res if len(res)==len(s) else ''",
    "language": "python"
  },
  {
    "title": "Maximum Units on a Truck",
    "description": "Given boxes with number of units and count, load truck to maximize units. Sort boxes by units/box descending, pick greedily until truck full.",
    "codeSnippet": "def maximumUnits(boxTypes,truckSize):\n    boxTypes.sort(key=lambda x:-x[1]); total=0\n    for count,units in boxTypes:\n        take=min(count,truckSize); total+=take*units; truckSize-=take\n        if truckSize==0: break\n    return total",
    "language": "python"
  },
  {
    "title": "Assign Cookies",
    "description": "Assign cookies of certain size to children with greed factors to maximize satisfied children. Sort both arrays and assign greedily smallest sufficient cookie.",
    "codeSnippet": "def findContentChildren(g,s):\n    g.sort(); s.sort(); i=j=0\n    while i<len(g) and j<len(s):\n        if s[j]>=g[i]: i+=1\n        j+=1\n    return i",
    "language": "python"
  },
  {
    "title": "Minimum Cost to Hire K Workers",
    "description": "Hire k workers to minimize total cost per quality ratio. Sort by ratio and maintain a heap for k lowest quality workers to calculate cost greedily.",
    "codeSnippet": "import heapq\n\ndef mincostToHireWorkers(quality,wage,K):\n    workers=sorted([(w/q,q) for q,w in zip(quality,wage)])\n    res=0; heap=[]; sumq=0\n    for r,q in workers:\n        heapq.heappush(heap,-q); sumq+=q\n        if len(heap)>K: sumq+=heapq.heappop(heap)\n        if len(heap)==K: res=min(res,r*sumq)\n    return res",
    "language": "python"
  },
  {
    "title": "Minimum Number of Platforms II (Continuous Intervals)",
    "description": "Given overlapping intervals of trains, find minimum number of platforms with real-time arrivals. Sort by start time and use min-heap to track earliest end time platform occupancy.",
    "codeSnippet": "import heapq\n\ndef minPlatformsHeap(intervals):\n    intervals.sort(key=lambda x:x[0]); heap=[]\n    for s,e in intervals:\n        if heap and heap[0]<=s: heapq.heappop(heap)\n        heapq.heappush(heap,e)\n    return len(heap)",
    "language": "python"
  },
  {
    "title": "Maximum Length of Pair Sum <= Target",
    "description": "From a list of numbers, select pairs whose sum <= target to maximize pair count. Sort numbers and use two pointers greedily from both ends.",
    "codeSnippet": "def maxPairs(nums,target):\n    nums.sort(); i,j=0,len(nums)-1; count=0\n    while i<j:\n        if nums[i]+nums[j]<=target: count+=1; i+=1; j-=1\n        else: j-=1\n    return count",
    "language": "python"
  },
  {
    "title": "Maximum Candies",
    "description": "Given piles of candies, pick largest available piles each time to maximize collected candies in limited turns. Sort descending and pick top k piles greedily.",
    "codeSnippet": "def maxCandies(piles,k):\n    import heapq\n    piles=[-p for p in piles]; heapq.heapify(piles); total=0\n    for _ in range(k):\n        top=-heapq.heappop(piles); total+=top\n        heapq.heappush(piles,-(top//2))\n    return total",
    "language": "python"
  },
  {
    "title": "Maximum Number of Non-overlapping Subarrays",
    "description": "Select maximum non-overlapping subarrays with sum equal to target. Sort end indices or track end greedily and pick earliest non-conflicting subarray.",
    "codeSnippet": "def maxNonOverlap(nums,target):\n    sum_map={0:-1}; s=0; end=-1; count=0\n    for i,n in enumerate(nums):\n        s+=n\n        if s-target in sum_map and sum_map[s-target]>=end: count+=1; end=i\n        sum_map[s]=i\n    return count",
    "language": "python"
  },
  {
    "title": "Minimum Number of Taps to Open to Water Garden",
    "description": "Given taps ranges on garden [0,n], find minimum taps to open to cover all. Convert ranges to intervals, sort by start, and greedily extend coverage.",
    "codeSnippet": "def minTaps(n,ranges):\n    intervals=[[i-r,i+r] for i,r in enumerate(ranges)]\n    intervals.sort(key=lambda x:(x[0],-x[1]))\n    res=end=far=0;i=0\n    while end<n:\n        while i<len(intervals) and intervals[i][0]<=end: far=max(far,intervals[i][1]); i+=1\n        if far==end: return -1\n        end=far; res+=1\n    return res",
    "language": "python"
  },
  {
    "title": "Maximum Number of Points From Cards",
    "description": "Pick k cards from either end of array to maximize points. Greedily pick higher of two ends iteratively until k cards taken.",
    "codeSnippet": "def maxScore(cards,k):\n    res=sum(cards[:k]); total=res\n    for i in range(1,k+1):\n        total+=cards[-i]-cards[k-i]; res=max(res,total)\n    return res",
    "language": "python"
  },
  {
    "title": "Car Fleet",
    "description": "Compute number of car fleets to reach target given position and speed. Sort cars by position and greedily combine cars that cannot overtake into fleets.",
    "codeSnippet": "def carFleet(target,pos,speed):\n    cars=sorted(zip(pos,speed),reverse=True); fleets=0; cur_time=0\n    for p,s in cars:\n        t=(target-p)/s\n        if t>cur_time: fleets+=1; cur_time=t\n    return fleets",
    "language": "python"
  },
  {
    "title": "Maximum Profit Job Scheduling",
    "description": "Given jobs with start,end,profit, pick non-overlapping jobs to maximize profit. Sort by end and greedily pick compatible job with highest profit using DP + greedy merge.",
    "codeSnippet": "def jobScheduling(jobs):\n    jobs.sort(key=lambda x:x[1]); dp=[[0,0]]\n    import bisect\n    for s,e,p in jobs:\n        i=bisect.bisect(dp,(s,float('inf')))\n        if dp[i-1][1]+p>dp[-1][1]: dp.append([e,dp[i-1][1]+p])\n    return dp[-1][1]",
    "language": "python"
  },
  {
    "title": "Minimum Number of Lectures to Cover Topics",
    "description": "Schedule minimum lectures to cover all topics given start/end intervals. Sort by end and greedily assign next lecture to earliest uncovered interval.",
    "codeSnippet": "def minLectures(intervals):\n    intervals.sort(key=lambda x:x[1]); res=0; last=-float('inf')\n    for s,e in intervals:\n        if s>last: res+=1; last=e\n    return res",
    "language": "python"
  },
  {
    "title": "Maximize Students Taking Exam Without Cheating",
    "description": "Arrange students in rows/columns so no two adjacent cheat. Sort rows and place students greedily ensuring no neighbors filled in previous step.",
    "codeSnippet": "def maxStudents(seats):\n    from itertools import product\n    m=len(seats); n=len(seats[0]); dp=[{} for _ in range(m+1)]; dp[0][0]=0\n    for i in range(1,m+1):\n        for mask in range(1<<n):\n            if all(seats[i-1][j]=='#' or mask&(1<<j)==0 for j in range(n)):\n                for pmask in dp[i-1]:\n                    if mask&pmask==0: dp[i][mask]=max(dp[i].get(mask,0),dp[i-1][pmask]+bin(mask).count('1'))\n    return max(dp[m].values())",
    "language": "python"
  },
  {
    "title": "Minimum Number of Refueling Stops",
    "description": "Travel target distance with initial fuel and gas stations. Sort stations by distance and greedily refuel at station with largest available fuel when needed.",
    "codeSnippet": "import heapq\n\ndef minRefuelStops(target,startFuel,stations):\n    stations.append((target,0)); h=[]; res=0; prev=0; fuel=startFuel\n    for d,f in stations:\n        fuel-=d-prev; prev=d\n        while fuel<0 and h: fuel+=-heapq.heappop(h); res+=1\n        if fuel<0: return -1\n        heapq.heappush(h,-f)\n    return res",
    "language": "python"
  },
  {
    "title": "Maximize Distance to Closest Person",
    "description": "Seat in row to maximize distance from nearest person. Greedily check empty stretches between people and pick midpoint for maximum distance.",
    "codeSnippet": "def maxDistToClosest(seats):\n    prev=-1; maxd=0\n    for i,s in enumerate(seats):\n        if s==1: prev=i\n        else:\n            left=prev if prev!=-1 else -float('inf'); right=next((j for j in range(i+1,len(seats)) if seats[j]),float('inf'))\n            maxd=max(maxd,min(i-left,right-i))\n    return maxd",
    "language": "python"
  },
  {
    "title": "Minimize Total Waiting Time",
    "description": "Given service times of customers, minimize total waiting time. Sort times ascending and serve shortest jobs first (Shortest Job First principle).",
    "codeSnippet": "def minWaitingTime(times):\n    times.sort(); total=0\n    for i,t in enumerate(times): total+=t*(len(times)-i-1)\n    return total",
    "language": "python"
  },
  {
    "title": "Maximum Number of Points From Grid",
    "description": "Pick maximum points from grid cells with constraints (like falling to next row). Sort columns and greedily pick largest values per row under constraints.",
    "codeSnippet": "def maxPoints(grid):\n    m,n=len(grid),len(grid[0]); dp=grid[0]\n    for i in range(1,m):\n        left=[0]*n; right=[0]*n\n        left[0]=dp[0]\n        for j in range(1,n): left[j]=max(left[j-1]-1,dp[j])\n        right[-1]=dp[-1]\n        for j in range(n-2,-1,-1): right[j]=max(right[j+1]-1,dp[j])\n        dp=[grid[i][j]+max(left[j],right[j]) for j in range(n)]\n    return max(dp)",
    "language": "python"
  },
  {
    "title": "Maximum Number of Books in Reading Time",
    "description": "Given array of reading times, pick contiguous books to maximize number read within time limit. Greedily expand window from left using two pointers.",
    "codeSnippet": "def maxBooks(time,totaltime):\n    l=sum_=0; res=0\n    for r in range(len(time)):\n        sum_+=time[r]\n        while sum_>totaltime: sum_-=time[l]; l+=1\n        res=max(res,r-l+1)\n    return res",
    "language": "python"
  },
  {
    "title": "Maximum Score From Performing Multiplication Operations",
    "description": "Pick numbers from either end of array multiplied by given multipliers to maximize score. Greedily choose larger product in each step.",
    "codeSnippet": "def maximumScore(nums,multipliers):\n    n=len(nums); m=len(multipliers); dp=[0]*(m+1)\n    for i in range(m-1,-1,-1):\n        new=[0]*(i+1)\n        for left in range(i+1):\n            new[left]=max(multipliers[i]*nums[left]+dp[left+1],multipliers[i]*nums[n-1-(i-left)]+dp[left])\n        dp=new\n    return dp[0]",
    "language": "python"
  },
  {
    "title": "Minimum Cost to Merge Stones",
    "description": "Merge stones into one pile with minimal cost. Greedily merge smallest piles first to reduce incremental cost (like Huffman approach).",
    "codeSnippet": "import heapq\n\ndef mergeStones(stones):\n    heapq.heapify(stones); total=0\n    while len(stones)>1:\n        a=heapq.heappop(stones); b=heapq.heappop(stones)\n        total+=a+b; heapq.heappush(stones,a+b)\n    return total",
    "language": "python"
  },
  {
    "title": "Maximize Array Sum After K Negations II",
    "description": "Given array and k negations, maximize sum. Greedily flip smallest element k times, adjust based on parity of remaining k.",
    "codeSnippet": "def largestSumAfterKNegations(nums,k):\n    nums.sort()\n    for i in range(len(nums)):\n        if k>0 and nums[i]<0: nums[i]=-nums[i]; k-=1\n    if k%2: nums.sort(); nums[0]=-nums[0]\n    return sum(nums)",
    "language": "python"
  },
  {
    "title": "Minimum Cost to Connect Ropes",
    "description": "Given ropes, connect all with minimum cost. Greedily combine smallest two ropes repeatedly to reduce total cost.",
    "codeSnippet": "import heapq\n\ndef minCostConnectRopes(ropes):\n    heapq.heapify(ropes); total=0\n    while len(ropes)>1:\n        a=heapq.heappop(ropes); b=heapq.heappop(ropes); total+=a+b; heapq.heappush(ropes,a+b)\n    return total",
    "language": "python"
  },
  {
    "title": "Maximum Height by Stacking Cuboids",
    "description": "Stack cuboids to maximize height. Sort dimensions, then greedily choose next cuboid compatible with previous ones in all dimensions.",
    "codeSnippet": "def maxHeight(cuboids):\n    for c in cuboids: c.sort()\n    cuboids.sort(key=lambda x:(x[0],x[1],x[2]))\n    n=len(cuboids); dp=[0]*n\n    for i in range(n):\n        dp[i]=cuboids[i][2]\n        for j in range(i):\n            if all(cuboids[j][k]<=cuboids[i][k] for k in range(3)): dp[i]=max(dp[i],dp[j]+cuboids[i][2])\n    return max(dp)",
    "language": "python"
  },
  {
    "title": "Maximum Number of Points With Cost",
    "description": "Pick points from a matrix row by row with moving cost between columns. Greedily choose best previous cell plus current minus distance cost.",
    "codeSnippet": "def maxPoints(points):\n    m,n=len(points),len(points[0]); dp=points[0]\n    for i in range(1,m):\n        left=[0]*n; right=[0]*n\n        left[0]=dp[0]; right[-1]=dp[-1]\n        for j in range(1,n): left[j]=max(left[j-1]-1,dp[j])\n        for j in range(n-2,-1,-1): right[j]=max(right[j+1]-1,dp[j])\n        dp=[points[i][j]+max(left[j],right[j]) for j in range(n)]\n    return max(dp)",
    "language": "python"
  }
];
}
private getBacktrackingHints(): Hint[] {
  return [
  {
    "title": "N-Queens Problem",
    "description": "Place n queens on an n×n chessboard such that no two queens attack each other. Use backtracking to try all safe positions row by row and backtrack when conflict occurs.",
    "codeSnippet": "def solveNQueens(n):\n    def backtrack(row,cols,diag1,diag2,board,res):\n        if row==n: res.append([''.join(r) for r in board]); return\n        for col in range(n):\n            if col in cols or row+col in diag1 or row-col in diag2: continue\n            board[row][col]='Q'; cols.add(col); diag1.add(row+col); diag2.add(row-col)\n            backtrack(row+1,cols,diag1,diag2,board,res)\n            board[row][col]='.'; cols.remove(col); diag1.remove(row+col); diag2.remove(row-col)\n    res=[]; backtrack(0,set(),set(),set(),[['.']*n for _ in range(n)],res)\n    return res",
    "language": "python"
  },
  {
    "title": "Sudoku Solver",
    "description": "Fill a 9×9 Sudoku board so that each row, column, and 3×3 box has digits 1–9 without repetition. Use backtracking to try each valid number and backtrack if stuck.",
    "codeSnippet": "def solveSudoku(board):\n    def isValid(r,c,n):\n        for i in range(9):\n            if board[r][i]==n or board[i][c]==n or board[r//3*3+i//3][c//3*3+i%3]==n: return False\n        return True\n    def backtrack():\n        for i in range(9):\n            for j in range(9):\n                if board[i][j]=='.':\n                    for n in '123456789':\n                        if isValid(i,j,n): board[i][j]=n;  \n                        if backtrack(): return True\n                        board[i][j]='.'\n                    return False\n        return True\n    backtrack()\n    return board",
    "language": "python"
  },
  {
    "title": "Word Search in Grid",
    "description": "Check if a word exists in a 2D board by moving horizontally or vertically. Use backtracking to explore all paths starting from each cell and mark visited cells.",
    "codeSnippet": "def exist(board, word):\n    def dfs(r,c,i):\n        if i==len(word): return True\n        if r<0 or c<0 or r>=len(board) or c>=len(board[0]) or board[r][c]!=word[i]: return False\n        tmp=board[r][c]; board[r][c]='#'\n        res=dfs(r+1,c,i+1) or dfs(r-1,c,i+1) or dfs(r,c+1,i+1) or dfs(r,c-1,i+1)\n        board[r][c]=tmp\n        return res\n    for i in range(len(board)):\n        for j in range(len(board[0])):\n            if dfs(i,j,0): return True\n    return False",
    "language": "python"
  },
  {
    "title": "Combination Sum",
    "description": "Find all unique combinations of numbers that sum to a target. Use backtracking to include/exclude each number recursively and backtrack when sum exceeds target.",
    "codeSnippet": "def combinationSum(candidates,target):\n    def backtrack(start,path,total):\n        if total==target: res.append(path[:]); return\n        for i in range(start,len(candidates)):\n            if total+candidates[i]>target: continue\n            path.append(candidates[i]); backtrack(i,path,total+candidates[i]); path.pop()\n    res=[]; backtrack(0,[],0); return res",
    "language": "python"
  },
  {
    "title": "Letter Case Permutation",
    "description": "Generate all strings by changing letter cases in the input string. Use backtracking to decide lowercase or uppercase for each character recursively.",
    "codeSnippet": "def letterCasePermutation(s):\n    def backtrack(i,path):\n        if i==len(s): res.append(''.join(path)); return\n        if s[i].isalpha():\n            path.append(s[i].lower()); backtrack(i+1,path); path.pop()\n            path.append(s[i].upper()); backtrack(i+1,path); path.pop()\n        else: path.append(s[i]); backtrack(i+1,path); path.pop()\n    res=[]; backtrack(0,[]); return res",
    "language": "python"
  },
  {
    "title": "Palindrome Partitioning",
    "description": "Partition a string such that every substring is a palindrome. Use backtracking to try all partitions and backtrack when a substring is not a palindrome.",
    "codeSnippet": "def partition(s):\n    def isPalindrome(sub): return sub==sub[::-1]\n    def backtrack(start,path):\n        if start==len(s): res.append(path[:]); return\n        for end in range(start+1,len(s)+1):\n            if isPalindrome(s[start:end]): path.append(s[start:end]); backtrack(end,path); path.pop()\n    res=[]; backtrack(0,[]); return res",
    "language": "python"
  },
  {
    "title": "Generate Parentheses",
    "description": "Generate all valid combinations of n pairs of parentheses. Use backtracking to add '(' or ')' while keeping the combination valid.",
    "codeSnippet": "def generateParenthesis(n):\n    def backtrack(path,open,close):\n        if len(path)==2*n: res.append(''.join(path)); return\n        if open<n: path.append('('); backtrack(path,open+1,close); path.pop()\n        if close<open: path.append(')'); backtrack(path,open,close+1); path.pop()\n    res=[]; backtrack([],0,0); return res",
    "language": "python"
  },
  {
    "title": "Subsets",
    "description": "Generate all subsets of a set of numbers. Use backtracking to include or exclude each element recursively to explore all combinations.",
    "codeSnippet": "def subsets(nums):\n    def backtrack(start,path):\n        res.append(path[:])\n        for i in range(start,len(nums)):\n            path.append(nums[i]); backtrack(i+1,path); path.pop()\n    res=[]; backtrack(0,[]); return res",
    "language": "python"
  },
  {
    "title": "Word Break II",
    "description": "Break a string into valid dictionary words. Use backtracking to try all substrings and backtrack when substring not in dictionary.",
    "codeSnippet": "def wordBreak(s,wordDict):\n    wordSet=set(wordDict)\n    def backtrack(start,path):\n        if start==len(s): res.append(' '.join(path)); return\n        for end in range(start+1,len(s)+1):\n            if s[start:end] in wordSet: path.append(s[start:end]); backtrack(end,path); path.pop()\n    res=[]; backtrack(0,[]); return res",
    "language": "python"
  },
  {
    "title": "Rat in a Maze",
    "description": "Find all paths from top-left to bottom-right in a maze. Use backtracking to move in all possible directions while avoiding blocked cells.",
    "codeSnippet": "def ratMaze(maze):\n    n=len(maze); res=[]\n    def backtrack(r,c,path):\n        if r==n-1 and c==n-1: res.append(path[:]); return\n        for dr,dc,d in [(1,0,'D'),(0,1,'R'),(-1,0,'U'),(0,-1,'L')]:\n            nr,nc=r+dr,c+dc\n            if 0<=nr<n and 0<=nc<n and maze[nr][nc]==1: maze[nr][nc]=0; path.append(d); backtrack(nr,nc,path); path.pop(); maze[nr][nc]=1\n    if maze[0][0]==1: maze[0][0]=0; backtrack(0,0,[])\n    return res",
    "language": "python"
  },
  {
    "title": "Kth Permutation Sequence",
    "description": "Find the kth permutation of numbers 1 to n. Use backtracking to generate permutations recursively and stop when kth is reached.",
    "codeSnippet": "def getPermutation(n,k):\n    from math import factorial\n    nums=list(map(str,range(1,n+1)))\n    k-=1; res=[]\n    for i in range(n-1,-1,-1):\n        idx=k//factorial(i); res.append(nums.pop(idx)); k%=factorial(i)\n    return ''.join(res)",
    "language": "python"
  },
  {
    "title": "Combination Sum II",
    "description": "Find unique combinations of numbers that sum to a target (numbers used only once). Use backtracking with skip duplicates to avoid repeated combinations.",
    "codeSnippet": "def combinationSum2(candidates,target):\n    candidates.sort()\n    def backtrack(start,path,total):\n        if total==target: res.append(path[:]); return\n        for i in range(start,len(candidates)):\n            if i>start and candidates[i]==candidates[i-1]: continue\n            if total+candidates[i]>target: break\n            path.append(candidates[i]); backtrack(i+1,path,total+candidates[i]); path.pop()\n    res=[]; backtrack(0,[],0); return res",
    "language": "python"
  },
  {
    "title": "Restore IP Addresses",
    "description": "Restore valid IP addresses from a string. Use backtracking to partition the string into 4 segments, checking each segment is valid (0-255).",
    "codeSnippet": "def restoreIpAddresses(s):\n    def backtrack(start,path):\n        if len(path)==4 and start==len(s): res.append('.'.join(path)); return\n        if len(path)==4 or start==len(s): return\n        for l in range(1,4):\n            if start+l<=len(s): seg=s[start:start+l];\n            if (seg[0]!='0' or seg=='0') and int(seg)<=255: path.append(seg); backtrack(start+l,path); path.pop()\n    res=[]; backtrack(0,[]); return res",
    "language": "python"
  },
  {
    "title": "Generate All Binary Strings",
    "description": "Generate all binary strings of length n. Use backtracking to place '0' or '1' at each position recursively.",
    "codeSnippet": "def generateBinaryStrings(n):\n    def backtrack(i,path):\n        if i==n: res.append(''.join(path)); return\n        for ch in '01': path.append(ch); backtrack(i+1,path); path.pop()\n    res=[]; backtrack(0,[]); return res",
    "language": "python"
  },
  {
    "title": "Gray Code Generation",
    "description": "Generate a sequence of n-bit Gray codes where two successive numbers differ in only one bit. Use backtracking to flip bits recursively and explore all possibilities.",
    "codeSnippet": "def grayCode(n):\n    def backtrack(path,visited):\n        if len(path)==2**n: res.append(path[:]); return\n        for i in range(n):\n            nxt=path[-1]^(1<<i)\n            if nxt not in visited: visited.add(nxt); path.append(nxt); backtrack(path,visited); path.pop(); visited.remove(nxt)\n    res=[]; backtrack([0],set([0])); return res",
    "language": "python"
  },
  {
    "title": "Target Sum Subsets",
    "description": "Find all subsets of an array that sum up to a target value. Use backtracking to include/exclude each number recursively and backtrack when sum exceeds target.",
    "codeSnippet": "def targetSumSubsets(nums,target):\n    def backtrack(i,path,total):\n        if total==target: res.append(path[:]); return\n        if i>=len(nums) or total>target: return\n        path.append(nums[i]); backtrack(i+1,path,total+nums[i]); path.pop(); backtrack(i+1,path,total)\n    res=[]; backtrack(0,[],0); return res",
    "language": "python"
  },
  {
    "title": "Generate All K-Length Strings",
    "description": "Generate all strings of length k from given characters. Use backtracking to select each character for every position recursively.",
    "codeSnippet": "def generateKLengthStrings(chars,k):\n    def backtrack(path):\n        if len(path)==k: res.append(''.join(path)); return\n        for c in chars: path.append(c); backtrack(path); path.pop()\n    res=[]; backtrack([]); return res",
    "language": "python"
  },
  {
    "title": "Sum of Consecutive Numbers",
    "description": "Find sequences of consecutive integers that sum up to a target. Use backtracking to build sequences and backtrack when sum exceeds target.",
    "codeSnippet": "def consecutiveSum(target):\n    def backtrack(start,path,total):\n        if total==target: res.append(path[:]); return\n        if total>target: return\n        for i in range(start,target+1): path.append(i); backtrack(i+1,path,total+i); path.pop()\n    res=[]; backtrack(1,[],0); return res",
    "language": "python"
  },
  {
    "title": "Generate All Unique BSTs",
    "description": "Generate all structurally unique BSTs for numbers 1 to n. Use backtracking to pick each number as root and recursively generate left and right subtrees.",
    "codeSnippet": "def generateTrees(n):\n    if n==0: return []\n    def build(start,end):\n        if start>end: return [None]\n        res=[]\n        for i in range(start,end+1):\n            for l in build(start,i-1):\n                for r in build(i+1,end):\n                    root=TreeNode(i); root.left=l; root.right=r; res.append(root)\n        return res\n    return build(1,n)",
    "language": "python"
  },
  {
    "title": "Jump Game Paths",
    "description": "Find all paths from start to end in an array where numbers indicate max jumps from that index. Use backtracking to try each jump length recursively.",
    "codeSnippet": "def jumpGamePaths(nums):\n    def backtrack(i,path):\n        if i==len(nums)-1: res.append(path[:]); return\n        for jump in range(1,nums[i]+1):\n            if i+jump<len(nums): path.append(i+jump); backtrack(i+jump,path); path.pop()\n    res=[]; backtrack(0,[0]); return res",
    "language": "python"
  },
  {
    "title": "Find All Increasing Subsequences",
    "description": "Generate all increasing subsequences from an array. Use backtracking to include numbers only if they are greater than the last included number.",
    "codeSnippet": "def increasingSubsequences(nums):\n    def backtrack(start,path):\n        if len(path)>1: res.append(path[:])\n        used=set()\n        for i in range(start,len(nums)):\n            if nums[i] in used or (path and nums[i]<path[-1]): continue\n            used.add(nums[i]); path.append(nums[i]); backtrack(i+1,path); path.pop()\n    res=[]; backtrack(0,[]); return res",
    "language": "python"
  },
  {
    "title": "Generate All Unique Permutations",
    "description": "Generate all permutations of a list with possible duplicates. Use backtracking and skip duplicates to avoid repeated permutations.",
    "codeSnippet": "def permuteUnique(nums):\n    nums.sort()\n    def backtrack(path,used):\n        if len(path)==len(nums): res.append(path[:]); return\n        for i in range(len(nums)):\n            if used[i] or (i>0 and nums[i]==nums[i-1] and not used[i-1]): continue\n            used[i]=True; path.append(nums[i]); backtrack(path,used); path.pop(); used[i]=False\n    res=[]; backtrack([], [False]*len(nums)); return res",
    "language": "python"
  },
  {
    "title": "Palindromic Subsequences",
    "description": "Find all palindromic subsequences in a string. Use backtracking to select substrings and check if palindrome, then explore further recursively.",
    "codeSnippet": "def palindromicSubseq(s):\n    def backtrack(start,path):\n        if path and path==path[::-1]: res.append(''.join(path))\n        for i in range(start,len(s)):\n            path.append(s[i]); backtrack(i+1,path); path.pop()\n    res=[]; backtrack(0,[]); return list(set(res))",
    "language": "python"
  },
  {
    "title": "Combination Sum III",
    "description": "Find all combinations of k numbers 1–9 that sum to n. Use backtracking to include numbers while ensuring sum and count constraints.",
    "codeSnippet": "def combinationSum3(k,n):\n    def backtrack(start,path,total):\n        if len(path)==k and total==n: res.append(path[:]); return\n        if len(path)>=k or total>n: return\n        for i in range(start,10): path.append(i); backtrack(i+1,path,total+i); path.pop()\n    res=[]; backtrack(1,[],0); return res",
    "language": "python"
  },
  {
    "title": "Subset Sum Equals Target",
    "description": "Return True if a subset sums to target. Use backtracking to include or exclude each element recursively, stopping early if sum matches target.",
    "codeSnippet": "def subsetSum(nums,target):\n    def backtrack(i,total):\n        if total==target: return True\n        if i>=len(nums) or total>target: return False\n        return backtrack(i+1,total+nums[i]) or backtrack(i+1,total)\n    return backtrack(0,0)",
    "language": "python"
  },
  {
    "title": "All Paths in Grid with Obstacles",
    "description": "Find all paths from top-left to bottom-right in a grid avoiding obstacles. Use backtracking to move in all valid directions and backtrack when blocked.",
    "codeSnippet": "def pathsWithObstacles(grid):\n    m,n=len(grid),len(grid[0])\n    def backtrack(r,c,path):\n        if r==m-1 and c==n-1: res.append(path[:]); return\n        for dr,dc,d in [(1,0,'D'),(0,1,'R')]:\n            nr,nc=r+dr,c+dc\n            if 0<=nr<m and 0<=nc<n and grid[nr][nc]==0: grid[nr][nc]=1; path.append(d); backtrack(nr,nc,path); path.pop(); grid[nr][nc]=0\n    res=[]; grid[0][0]=1; backtrack(0,0,[]); return res",
    "language": "python"
  },
  {
    "title": "Expression Add Operators",
    "description": "Insert '+','-','*' between digits to reach target value. Use backtracking to try every operator placement and evaluate expressions recursively.",
    "codeSnippet": "def addOperators(num,target):\n    def backtrack(i,path,val,prev):\n        if i==len(num) and val==target: res.append(''.join(path)); return\n        for j in range(i+1,len(num)+1):\n            tmp=num[i:j]; n=int(tmp)\n            if i>0 and tmp[0]=='0': break\n            if i==0: backtrack(j,list(tmp),n,n)\n            else:\n                backtrack(j,path+['+',tmp],val+n,n); backtrack(j,path+['-',tmp],val-n,-n); backtrack(j,path+['*',tmp],val-prev+prev*n,prev*n)\n    res=[]; backtrack(0,[],0,0); return res",
    "language": "python"
  },
  {
    "title": "All Paths from Source to Target",
    "description": "Given a DAG, find all paths from node 0 to target node. Use backtracking to explore each edge recursively and build path sequences.",
    "codeSnippet": "def allPathsSourceTarget(graph):\n    def backtrack(node,path):\n        if node==len(graph)-1: res.append(path[:]); return\n        for nei in graph[node]: path.append(nei); backtrack(nei,path); path.pop()\n    res=[]; backtrack(0,[0]); return res",
    "language": "python"
  },
  {
    "title": "All Valid IPs with Backtracking",
    "description": "Generate all valid IP addresses from a string of digits. Backtracking helps choose segments and revert choices if invalid segment chosen.",
    "codeSnippet": "def validIPAddresses(s):\n    def backtrack(start,path):\n        if len(path)==4 and start==len(s): res.append('.'.join(path)); return\n        if len(path)==4 or start==len(s): return\n        for l in range(1,4):\n            if start+l<=len(s): seg=s[start:start+l]\n            if (seg[0]!='0' or seg=='0') and int(seg)<=255: path.append(seg); backtrack(start+l,path); path.pop()\n    res=[]; backtrack(0,[]); return res",
    "language": "python"
  },
  {
    "title": "All Unique Subsets With Duplicates",
    "description": "Generate all subsets from array with duplicates without repeating subsets. Sort first and use backtracking while skipping duplicates.",
    "codeSnippet": "def subsetsWithDup(nums):\n    nums.sort()\n    def backtrack(start,path):\n        res.append(path[:])\n        for i in range(start,len(nums)):\n            if i>start and nums[i]==nums[i-1]: continue\n            path.append(nums[i]); backtrack(i+1,path); path.pop()\n    res=[]; backtrack(0,[]); return res",
    "language": "python"
  },
  {
    "title": "All Paths in Binary Tree",
    "description": "Find all root-to-leaf paths in a binary tree. Backtracking helps append node to path and remove it after recursive calls.",
    "codeSnippet": "def binaryTreePaths(root):\n    def backtrack(node,path):\n        if not node: return\n        path.append(str(node.val))\n        if not node.left and not node.right: res.append('->'.join(path))\n        else: backtrack(node.left,path); backtrack(node.right,path)\n        path.pop()\n    res=[]; backtrack(root,[]); return res",
    "language": "python"
  },
  {
    "title": "All Word Squares",
    "description": "Generate all word squares from a list of words. Backtracking helps place words row by row ensuring column prefixes match existing rows.",
    "codeSnippet": "def wordSquares(words):\n    n=len(words[0])\n    prefixMap={}\n    for w in words:\n        for i in range(n+1): prefixMap.setdefault(w[:i],[]).append(w)\n    def backtrack(step,path):\n        if step==n: res.append(path[:]); return\n        prefix=''.join([word[step] for word in path])\n        for w in prefixMap.get(prefix,[]): path.append(w); backtrack(step+1,path); path.pop()\n    res=[]; backtrack(0,[]); return res",
    "language": "python"
  },
  {
    "title": "N-Queens II",
    "description": "Count the number of distinct solutions for placing N queens on an N×N chessboard. Use backtracking to place queens row by row and backtrack on conflicts.",
    "codeSnippet": "def totalNQueens(n):\n    def backtrack(row,cols,diag1,diag2):\n        if row==n: return 1\n        count=0\n        for c in range(n):\n            if c in cols or row-c in diag1 or row+c in diag2: continue\n            cols.add(c); diag1.add(row-c); diag2.add(row+c)\n            count+=backtrack(row+1,cols,diag1,diag2)\n            cols.remove(c); diag1.remove(row-c); diag2.remove(row+c)\n        return count\n    return backtrack(0,set(),set(),set())",
    "language": "python"
  },
  {
    "title": "Letter Combinations of a Phone Number",
    "description": "Generate all letter combinations from a digit string as per telephone keypad. Backtracking explores all possible letters for each digit recursively.",
    "codeSnippet": "def letterCombinations(digits):\n    mapping={'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}\n    def backtrack(index,path):\n        if index==len(digits): res.append(''.join(path)); return\n        for c in mapping[digits[index]]: path.append(c); backtrack(index+1,path); path.pop()\n    res=[]\n    if digits: backtrack(0,[])\n    return res",
    "language": "python"
  },
  {
    "title": "Word Search",
    "description": "Given a grid of letters, determine if a word exists following adjacent cells. Use backtracking to explore all possible paths from each starting cell.",
    "codeSnippet": "def exist(board,word):\n    def backtrack(r,c,i):\n        if i==len(word): return True\n        if not(0<=r<len(board) and 0<=c<len(board[0])) or board[r][c]!=word[i]: return False\n        tmp=board[r][c]; board[r][c]='#'\n        res=any(backtrack(r+dr,c+dc,i+1) for dr,dc in [(0,1),(1,0),(0,-1),(-1,0)])\n        board[r][c]=tmp; return res\n    return any(backtrack(r,c,0) for r in range(len(board)) for c in range(len(board[0])))",
    "language": "python"
  },
  {
    "title": "Restore IP Addresses",
    "description": "Generate all valid IP addresses from a string of digits. Backtracking selects segments and reverts choices if invalid segments occur.",
    "codeSnippet": "def restoreIpAddresses(s):\n    def backtrack(start,path):\n        if len(path)==4 and start==len(s): res.append('.'.join(path)); return\n        if len(path)==4 or start==len(s): return\n        for l in range(1,4):\n            if start+l<=len(s): seg=s[start:start+l]\n            if (seg[0]!='0' or seg=='0') and int(seg)<=255: path.append(seg); backtrack(start+l,path); path.pop()\n    res=[]; backtrack(0,[]); return res",
    "language": "python"
  },
  {
    "title": "Generate Parentheses II",
    "description": "Generate all balanced parentheses strings of length 2n. Backtracking ensures at any step open parentheses are less than n and closing are valid.",
    "codeSnippet": "def generateParenthesis(n):\n    def backtrack(path,open,close):\n        if len(path)==2*n: res.append(''.join(path)); return\n        if open<n: path.append('('); backtrack(path,open+1,close); path.pop()\n        if close<open: path.append(')'); backtrack(path,open,close+1); path.pop()\n    res=[]; backtrack([],0,0); return res",
    "language": "python"
  },
  {
    "title": "Combination Sum IV",
    "description": "Find all combinations from given numbers that sum to target allowing repetitions. Backtracking explores each number recursively.",
    "codeSnippet": "def combinationSum(nums,target):\n    def backtrack(path,total):\n        if total==target: res.append(path[:]); return\n        if total>target: return\n        for n in nums: path.append(n); backtrack(path,total+n); path.pop()\n    res=[]; backtrack([],0); return res",
    "language": "python"
  },
  {
    "title": "Palindrome Partitioning II",
    "description": "Partition a string such that every substring is a palindrome. Use backtracking to choose partitions and validate palindromes at each step.",
    "codeSnippet": "def partition(s):\n    def backtrack(start,path):\n        if start==len(s): res.append(path[:]); return\n        for i in range(start,len(s)):\n            if s[start:i+1]==s[start:i+1][::-1]: path.append(s[start:i+1]); backtrack(i+1,path); path.pop()\n    res=[]; backtrack(0,[]); return res",
    "language": "python"
  },
  {
    "title": "All Paths in Maze",
    "description": "Find all paths from top-left to bottom-right in a matrix avoiding obstacles. Backtracking explores all four directions recursively while marking visited cells.",
    "codeSnippet": "def allMazePaths(grid):\n    def backtrack(r,c,path):\n        if r==len(grid)-1 and c==len(grid[0])-1: res.append(path[:]); return\n        for dr,dc,d in [(1,0,'D'),(0,1,'R'),(-1,0,'U'),(0,-1,'L')]:\n            nr,nc=r+dr,c+dc\n            if 0<=nr<len(grid) and 0<=nc<len(grid[0]) and grid[nr][nc]==0:\n                grid[nr][nc]=1; path.append(d); backtrack(nr,nc,path); path.pop(); grid[nr][nc]=0\n    res=[]; grid[0][0]=1; backtrack(0,0,[]); return res",
    "language": "python"
  },
  {
    "title": "Word Ladder II Paths",
    "description": "Find all shortest transformation sequences from beginWord to endWord using a dictionary. Backtracking builds paths while BFS ensures shortest length.",
    "codeSnippet": "def findLadders(beginWord,endWord,wordList):\n    wordSet=set(wordList); if endWord not in wordSet: return []\n    def backtrack(word,path):\n        if word==beginWord: res.append(path[::-1]); return\n        for prev in parents[word]: path.append(prev); backtrack(prev,path); path.pop()\n    from collections import defaultdict,deque\n    res=[]; parents=defaultdict(list); level={beginWord}; found=False\n    while level and not found:\n        next_level=defaultdict(list)\n        for word in level:\n            wordSet.discard(word)\n        for word in level:\n            for i in range(len(word)):\n                for c in 'abcdefghijklmnopqrstuvwxyz':\n                    nxt=word[:i]+c+word[i+1:]\n                    if nxt in wordSet: next_level[nxt].append(word); found=found or nxt==endWord\n        parents.update(next_level); level=next_level.keys()\n    if not found: return []\n    backtrack(endWord,[endWord]); return res",
    "language": "python"
  },
  {
    "title": "Expression Parentheses Add",
    "description": "Add parentheses in a numeric string to achieve a target value. Backtracking explores all possible partitions and operator placements recursively.",
    "codeSnippet": "def addParentheses(num,target):\n    def backtrack(start,path,eval,prev):\n        if start==len(num) and eval==target: res.append(''.join(path)); return\n        for i in range(start,len(num)):\n            tmp=num[start:i+1]; n=int(tmp)\n            if i>start and tmp[0]=='0': break\n            if start==0: backtrack(i+1,list(tmp),n,n)\n            else:\n                backtrack(i+1,path+['+',tmp],eval+n,n); backtrack(i+1,path+['-',tmp],eval-n,-n); backtrack(i+1,path+['*',tmp],eval-prev+prev*n,prev*n)\n    res=[]; backtrack(0,[],0,0); return res",
    "language": "python"
  },
  {
    "title": "Rat in Maze All Paths",
    "description": "Print all paths a rat can take from top-left to bottom-right of maze. Backtracking explores all directions recursively and marks visited cells.",
    "codeSnippet": "def ratMazePaths(maze):\n    def backtrack(r,c,path):\n        if r==len(maze)-1 and c==len(maze[0])-1: res.append(path[:]); return\n        for dr,dc,d in [(1,0,'D'),(0,1,'R')]:\n            nr,nc=r+dr,c+dc\n            if 0<=nr<len(maze) and 0<=nc<len(maze[0]) and maze[nr][nc]==1:\n                maze[nr][nc]=0; path.append(d); backtrack(nr,nc,path); path.pop(); maze[nr][nc]=1\n    res=[]; maze[0][0]=0; backtrack(0,0,[]); return res",
    "language": "python"
  },
  {
    "title": "All Knight’s Tours",
    "description": "Find all possible Knight's tours on a chessboard. Backtracking moves the knight recursively, marking visited cells and reverting if blocked.",
    "codeSnippet": "def knightsTours(n):\n    def backtrack(r,c,count):\n        if count==n*n: res.append(path[:]); return\n        for dr,dc in moves:\n            nr,nc=r+dr,c+dc\n            if 0<=nr<n and 0<=nc<n and (nr,nc) not in visited: visited.add((nr,nc)); path.append((nr,nc)); backtrack(nr,nc,count+1); path.pop(); visited.remove((nr,nc))\n    moves=[(2,1),(1,2),(-1,2),(-2,1),(-2,-1),(-1,-2),(1,-2),(2,-1)]; res=[]; visited=set([(0,0)]); path=[(0,0)]; backtrack(0,0,1); return res",
    "language": "python"
  },
  {
    "title": "All Subsets of Size K",
    "description": "Generate all subsets of size k from an array. Backtracking chooses elements recursively and backtracks after exploring each branch.",
    "codeSnippet": "def subsetsOfSizeK(nums,k):\n    def backtrack(start,path):\n        if len(path)==k: res.append(path[:]); return\n        for i in range(start,len(nums)): path.append(nums[i]); backtrack(i+1,path); path.pop()\n    res=[]; backtrack(0,[]); return res",
    "language": "python"
  },
  {
    "title": "Sudoku Solver",
    "description": "Fill a 9x9 Sudoku board so that each row, column, and 3x3 sub-box contains all digits 1-9. Backtracking tries digits and reverts on conflicts.",
    "codeSnippet": "def solveSudoku(board):\n    def isValid(r,c,k):\n        for i in range(9):\n            if board[r][i]==k or board[i][c]==k or board[r//3*3+i//3][c//3*3+i%3]==k: return False\n        return True\n    def backtrack():\n        for r in range(9):\n            for c in range(9):\n                if board[r][c]=='.':\n                    for k in '123456789':\n                        if isValid(r,c,k): board[r][c]=k;\n                        if backtrack(): return True; board[r][c]='.'\n                    return False\n        return True\n    backtrack(); return board",
    "language": "python"
  },
  {
    "title": "Subset Sum to Target",
    "description": "Find all subsets of an array whose sum equals a target value. Backtracking chooses or skips each element recursively to build valid subsets.",
    "codeSnippet": "def subsetSum(nums,target):\n    def backtrack(start,path,total):\n        if total==target: res.append(path[:]); return\n        if total>target: return\n        for i in range(start,len(nums)): path.append(nums[i]); backtrack(i+1,path,total+nums[i]); path.pop()\n    res=[]; backtrack(0,[],0); return res",
    "language": "python"
  },
  {
    "title": "All Unique Permutations",
    "description": "Generate all unique permutations of an array that may contain duplicates. Backtracking uses sorting and skip conditions to avoid repeated permutations.",
    "codeSnippet": "def permuteUnique(nums):\n    nums.sort()\n    def backtrack(path,used):\n        if len(path)==len(nums): res.append(path[:]); return\n        for i in range(len(nums)):\n            if used[i] or (i>0 and nums[i]==nums[i-1] and not used[i-1]): continue\n            used[i]=True; path.append(nums[i]); backtrack(path,used); path.pop(); used[i]=False\n    res=[]; backtrack([], [False]*len(nums)); return res",
    "language": "python"
  },
  {
    "title": "Combination Sum II",
    "description": "Find all unique combinations from a list of numbers that sum to a target where each number may be used once. Backtracking avoids duplicates and explores all possibilities.",
    "codeSnippet": "def combinationSum2(candidates,target):\n    candidates.sort()\n    def backtrack(start,path,total):\n        if total==target: res.append(path[:]); return\n        if total>target: return\n        for i in range(start,len(candidates)):\n            if i>start and candidates[i]==candidates[i-1]: continue\n            path.append(candidates[i]); backtrack(i+1,path,total+candidates[i]); path.pop()\n    res=[]; backtrack(0,[],0); return res",
    "language": "python"
  },
  {
    "title": "Find All Word Squares",
    "description": "Given a list of words, generate all valid word squares where words read the same horizontally and vertically. Backtracking places words row by row ensuring prefix constraints.",
    "codeSnippet": "def wordSquares(words):\n    from collections import defaultdict\n    def buildTrie(words):\n        trie=defaultdict(list)\n        for w in words:\n            for i in range(len(w)): trie[w[:i+1]].append(w)\n        return trie\n    def backtrack(step,path):\n        if step==N: res.append(path[:]); return\n        prefix=''.join([word[step] for word in path])\n        for candidate in trie.get(prefix,[]): path.append(candidate); backtrack(step+1,path); path.pop()\n    N=len(words[0]); trie=buildTrie(words); res=[]; backtrack(0,[]); return res",
    "language": "python"
  },
  {
    "title": "M-Coloring Problem",
    "description": "Color a graph with M colors so that no two adjacent nodes share the same color. Backtracking assigns colors to nodes recursively and reverts on conflicts.",
    "codeSnippet": "def graphColoring(graph,M):\n    def isSafe(node,color):\n        for i,adj in enumerate(graph[node]):\n            if adj and colors[i]==color: return False\n        return True\n    def backtrack(node):\n        if node==len(graph): return True\n        for c in range(1,M+1):\n            if isSafe(node,c): colors[node]=c; if backtrack(node+1): return True; colors[node]=0\n        return False\n    colors=[0]*len(graph); return backtrack(0)",
    "language": "python"
  },
  {
    "title": "Expression Add Operators",
    "description": "Insert '+','-','*' operators in a numeric string to reach a target value. Backtracking explores partitions and operators recursively while evaluating expressions.",
    "codeSnippet": "def addOperators(num,target):\n    def backtrack(index,path,eval,prev):\n        if index==len(num) and eval==target: res.append(''.join(path)); return\n        for i in range(index,len(num)):\n            if i>index and num[index]=='0': break\n            cur=num[index:i+1]; n=int(cur)\n            if index==0: backtrack(i+1,list(cur),n,n)\n            else:\n                backtrack(i+1,path+['+',cur],eval+n,n); backtrack(i+1,path+['-',cur],eval-n,-n); backtrack(i+1,path+['*',cur],eval-prev+prev*n,prev*n)\n    res=[]; backtrack(0,[],0,0); return res",
    "language": "python"
  },
  {
    "title": "Split Array into Consecutive Subsequences",
    "description": "Split a sorted array into consecutive subsequences of length ≥3. Backtracking tries to extend or start new subsequences and reverts when impossible.",
    "codeSnippet": "def isPossible(nums):\n    from collections import Counter,defaultdict\n    count,freq=Counter(nums),defaultdict(int)\n    for n in nums:\n        if count[n]==0: continue\n        count[n]-=1\n        if freq[n-1]>0: freq[n-1]-=1; freq[n]+=1\n        elif count[n+1]>0 and count[n+2]>0: count[n+1]-=1; count[n+2]-=1; freq[n+2]+=1\n        else: return False\n    return True",
    "language": "python"
  },
  {
    "title": "Target Sum Subsets",
    "description": "Find all subsets where elements can be assigned + or - to reach a target sum. Backtracking recursively assigns signs and explores all possibilities.",
    "codeSnippet": "def findTargetSumWays(nums,target):\n    def backtrack(index,total):\n        if index==len(nums):\n            if total==target: res.append(1)\n            return\n        backtrack(index+1,total+nums[index]); backtrack(index+1,total-nums[index])\n    res=[]; backtrack(0,0); return len(res)",
    "language": "python"
  },
  {
    "title": "Palindrome Partition with Minimum Cuts",
    "description": "Partition a string into palindromes minimizing the number of cuts. Backtracking explores partitions recursively and keeps track of the minimum cuts found.",
    "codeSnippet": "def minCut(s):\n    def isPalindrome(l,r):\n        while l<r: if s[l]!=s[r]: return False; l+=1;r-=1\n        return True\n    def backtrack(start,cuts):\n        nonlocal min_cuts\n        if start==len(s): min_cuts=min(min_cuts,cuts); return\n        for i in range(start,len(s)):\n            if isPalindrome(start,i): backtrack(i+1,cuts+1)\n    min_cuts=float('inf'); backtrack(0,-1); return min_cuts",
    "language": "python"
  }
  ];
}
// Add these methods to your existing TopicService class in topic.service.ts

}
