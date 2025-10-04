//frontend/src/app/components/whiteboard/whiteboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
      description: `Design an algorithm to reverse a singly linked list. Consider edge cases like empty lists, single-node lists, and large lists. Explain your approach step by step and analyze the time and space complexity.

Key Points to Address:
• How will you handle the pointer reassignments?
• What is the time complexity of your solution?
• How would you handle a circular linked list?
• Can you optimize for space complexity?`,
      category: 'Data Structures',
      difficulty: 'medium',
      type: 'pseudocode',
      examples: [
        'Input: 1 → 2 → 3 → 4 → 5 → NULL',
        'Output: 5 → 4 → 3 → 2 → 1 → NULL',
        'Edge Case: Empty list → NULL',
        'Edge Case: Single node → Same node'
      ],
      constraints: [
        'Cannot modify node values, only change pointers',
        'Must use O(1) extra space (excluding recursion stack)',
        'Should handle lists with up to 10^4 nodes'
      ]
    },
    {
      id: '2',
      title: 'Binary Tree Level Order Traversal',
      description: `Implement a level-order traversal (BFS) for a binary tree. Your solution should return the nodes level by level. Discuss the algorithm complexity and potential optimizations.

Considerations:
• How does BFS differ from DFS for this problem?
• What data structure is most efficient for this traversal?
• How would you handle very wide trees?
• Can you implement this both iteratively and recursively?`,
      category: 'Trees',
      difficulty: 'medium',
      type: 'logic',
      examples: [
        'Input: [3,9,20,null,null,15,7]',
        'Output: [[3],[9,20],[15,7]]',
        'Explanation: Level 0: [3], Level 1: [9,20], Level 2: [15,7]'
      ],
      constraints: [
        'The number of nodes in the tree is in the range [0, 2000]',
        '-1000 <= Node.val <= 1000'
      ]
    },
    {
      id: '3',
      title: 'Design LRU Cache',
      description: `Design and implement a Least Recently Used (LRU) cache. The cache should support get and put operations with O(1) average time complexity.

System Design Questions:
• What data structures would you use to achieve O(1) operations?
• How will you handle cache eviction when capacity is reached?
• What are the trade-offs between different implementation approaches?
• How would you make this implementation thread-safe?`,
      category: 'System Design',
      difficulty: 'hard',
      type: 'system-design',
      examples: [
        'LRUCache lru = new LRUCache(2);',
        'lru.put(1, 1); // cache is {1=1}',
        'lru.put(2, 2); // cache is {1=1, 2=2}',
        'lru.get(1);    // return 1, cache becomes {2=2, 1=1}',
        'lru.put(3, 3); // evicts key 2, cache is {1=1, 3=3}'
      ],
      constraints: [
        '1 <= capacity <= 3000',
        '0 <= key <= 10^4',
        '0 <= value <= 10^5'
      ]
    },
    {
      id: '4',
      title: 'Find Cycle in Directed Graph',
      description: `Given a directed graph, detect if it contains a cycle. Explain both DFS and topological sort approaches, and discuss when you would use each method.

Algorithm Analysis:
• What is the time complexity for cycle detection using DFS?
• How does Kahn\'s algorithm (topological sort) help in cycle detection?
• What are the memory requirements for each approach?
• How would you handle disconnected graphs?`,
      category: 'Graphs',
      difficulty: 'hard',
      type: 'pseudocode',
      examples: [
        'Input: [[1],[2],[0]] → True (cycle: 0→1→2→0)',
        'Input: [[1,2],[2],[]] → False (no cycle)',
        'Input: [[1],[2],[1]] → True (cycle: 1→2→1)'
      ],
      constraints: [
        'Number of nodes: 1 to 1000',
        'Graph may be disconnected',
        'No self-loops or duplicate edges'
      ]
    },
    {
      id: '5',
      title: 'Implement Trie (Prefix Tree)',
      description: `Design a Trie data structure that supports insert, search, and startsWith operations. Explain the space-time tradeoffs and real-world use cases.

Key Design Decisions:
• What node structure would you use?',
• How do you handle character encoding (Unicode vs ASCII)?',
• What are the memory optimization techniques?',
• How would you implement autocomplete functionality?'`,
      category: 'Data Structures',
      difficulty: 'medium',
      type: 'system-design',
      examples: [
        'Trie trie = new Trie();',
        'trie.insert("apple");',
        'trie.search("apple");   // returns true',
        'trie.search("app");     // returns false',
        'trie.startsWith("app"); // returns true',
        'trie.insert("app");',
        'trie.search("app");     // returns true'
      ],
      constraints: [
        '1 <= word.length, prefix.length <= 2000',
        'Words and prefixes consist of lowercase English letters',
        'At most 3 * 10^4 calls will be made to insert, search, and startsWith'
      ]
    }
  ];

  constructor(private http: HttpClient) {}

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

  saveDrawing(userId: string, questionId: string, drawingData: any): Observable<any> {
    return this.http.post('/api/whiteboard/save', {
      userId,
      questionId,
      drawingData,
      timestamp: new Date()
    });
  }
}