//frontend/src/app/components/whiteboard/whiteboard.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WhiteboardQuestion } from '../models/whiteboard-question.model';

@Injectable({
  providedIn: 'root'
})
export class WhiteboardService {
  private questions: WhiteboardQuestion[] = [
    {
      id: '1',
      title: 'Reverse a Linked List',
      description: `PROBLEM: Reverse a singly linked list in-place without using extra space.

APPROACH:
We use three pointers: previous, current, and next.
1. Start with previous = null, current = head
2. While current is not null:
   - Store next node: next = current.next
   - Reverse pointer: current.next = previous
   - Move pointers: previous = current, current = next
3. Return previous (new head)

TIME COMPLEXITY: O(n)
SPACE COMPLEXITY: O(1)

EXAMPLE:
Input: 1 → 2 → 3 → 4 → 5 → NULL
Output: 5 → 4 → 3 → 2 → 1 → NULL

EDGE CASES:
- Empty list (head is null)
- Single node list
- List with two nodes`,
      category: 'Data Structures',
      difficulty: 'medium',
      type: 'pseudocode',
      examples: [
        'Input: 1 → 2 → 3 → 4 → 5 → NULL',
        'Output: 5 → 4 → 3 → 2 → 1 → NULL',
        'Single Node: 1 → NULL remains same',
        'Empty List: NULL remains NULL'
      ],
      constraints: [
        'Cannot modify node values',
        'Must use O(1) extra space',
        'The number of nodes in the list is in range [0, 5000]'
      ]
    },
    {
      id: '2',
      title: 'Two Sum Problem',
      description: `PROBLEM: Given an array of integers and a target, find two numbers that add up to the target.

APPROACH:
Use a hash map to store visited numbers:
1. For each number in array:
   - Calculate complement = target - current number
   - If complement exists in map, return indices
   - Else store current number with its index

TIME COMPLEXITY: O(n)
SPACE COMPLEXITY: O(n)

EXAMPLE:
Input: nums = [2,7,11,15], target = 9
Output: [0,1] because 2 + 7 = 9

EDGE CASES:
- Array with duplicate numbers
- Negative numbers
- Exactly one solution exists`,
      category: 'Arrays',
      difficulty: 'easy',
      type: 'pseudocode',
      examples: [
        'Input: [2,7,11,15], target=9 → Output: [0,1]',
        'Input: [3,2,4], target=6 → Output: [1,2]',
        'Input: [3,3], target=6 → Output: [0,1]'
      ],
      constraints: [
        '2 <= nums.length <= 10^4',
        '-10^9 <= nums[i] <= 10^9',
        'Exactly one solution exists'
      ]
    },
    {
      id: '3',
      title: 'Binary Tree Level Order Traversal',
      description: `PROBLEM: Return the level order traversal of a binary tree.

APPROACH:
Use BFS with a queue:
1. Start with root in queue
2. While queue is not empty:
   - Process all nodes at current level
   - Add their children to queue
   - Move to next level

TIME COMPLEXITY: O(n)
SPACE COMPLEXITY: O(w) where w is maximum width

EXAMPLE:
Input: [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]

EDGE CASES:
- Empty tree
- Single node tree
- Skewed tree`,
      category: 'Trees',
      difficulty: 'medium',
      type: 'logic',
      examples: [
        'Input: [3,9,20,null,null,15,7] → Output: [[3],[9,20],[15,7]]',
        'Input: [1] → Output: [[1]]',
        'Input: [] → Output: []'
      ],
      constraints: [
        'Number of nodes: 0 to 2000',
        '-1000 <= Node.val <= 1000'
      ]
    }
  ];

  getDailyWhiteboardChallenge(): Observable<WhiteboardQuestion> {
    const randomIndex = Math.floor(Math.random() * this.questions.length);
    return of(this.questions[randomIndex]);
  }

  getQuestionsByDifficulty(difficulty: string): Observable<WhiteboardQuestion[]> {
    const filtered = this.questions.filter(q => q.difficulty === difficulty);
    return of(filtered);
  }

  getAllQuestions(): Observable<WhiteboardQuestion[]> {
    return of(this.questions);
  }
}