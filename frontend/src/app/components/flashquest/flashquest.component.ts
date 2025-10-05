import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../layout/navbar.component';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
  codeExample?: string;
  tags: string[];
}

interface Deck {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  cards: Flashcard[];
}

@Component({
  selector: 'app-flashquest',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  templateUrl: './flashquest.component.html',
  styleUrls: ['./flashquest.component.css']
})
export class FlashquestComponent {
  // Public properties - accessible from template
  decks: Deck[] = [
    {
      id: '1',
      name: 'Algorithm Patterns',
      description: 'Master common DSA patterns and strategies',
      category: 'dsa',
      icon: '🧠',
      color: '#3b82f6',
      cards: [
        {
          id: '1',
          question: 'What is the time complexity of Merge Sort and why?',
          answer: 'O(n log n). It divides the array in half (log n) and then merges (n operations per level).',
          category: 'dsa',
          difficulty: 'medium',
          explanation: 'Divide and conquer approach with guaranteed O(n log n) time.',
          codeExample: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
}`,
          tags: ['sorting', 'divide-conquer', 'recursion']
        },
        {
          id: '2',
          question: 'When would you use a HashMap vs Array for data storage?',
          answer: 'HashMap: When you need O(1) lookups by key and order doesn\'t matter. Array: When you need ordered data or index-based access.',
          category: 'dsa',
          difficulty: 'easy',
          explanation: 'HashMaps trade memory for speed, Arrays are more memory efficient but slower for lookups.',
          tags: ['data-structures', 'hashmap', 'array']
        }
      ]
    },
    {
      id: '2',
      name: 'System Design',
      description: 'Scalability, databases, and architecture',
      category: 'system-design',
      icon: '🏗️',
      color: '#ef4444',
      cards: [
        {
          id: '3',
          question: 'What is database connection pooling and why is it important?',
          answer: 'Connection pooling maintains a cache of database connections that can be reused. It reduces overhead of establishing new connections for each request.',
          category: 'system-design',
          difficulty: 'medium',
          explanation: 'Creating database connections is expensive. Pooling allows connection reuse, improving performance.',
          tags: ['database', 'performance', 'scaling']
        }
      ]
    },
    {
      id: '3',
      name: 'SQL Mastery',
      description: 'Advanced queries and optimization',
      category: 'sql',
      icon: '🗄️',
      color: '#10b981',
      cards: [
        {
          id: '4',
          question: 'What is a covering index in SQL?',
          answer: 'An index that contains all columns needed for a query, allowing the database to answer the query using only the index without accessing the table.',
          category: 'sql',
          difficulty: 'medium',
          explanation: 'Covering indexes enable index-only scans, significantly improving query performance.',
          codeExample: `-- For query: SELECT name, age FROM users WHERE city = 'NYC'
-- Create covering index:
CREATE INDEX idx_users_city_name_age ON users(city, name, age);`,
          tags: ['sql', 'indexing', 'performance']
        }
      ]
    },
    {
      id: '4',
      name: 'Behavioral',
      description: 'Interview stories and leadership',
      category: 'behavioral',
      icon: '💼',
      color: '#f59e0b',
      cards: [
        {
          id: '5',
          question: 'How do you handle conflict in a team? (STAR method)',
          answer: 'S: Team disagreed on technical approach. T: Needed consensus on architecture. A: Facilitated discussion, presented data, found compromise. R: Better solution, improved team dynamics.',
          category: 'behavioral',
          difficulty: 'medium',
          explanation: 'Focus on collaboration, data-driven decisions, and positive outcomes.',
          tags: ['behavioral', 'teamwork', 'conflict']
        }
      ]
    }
  ];

  selectedDeck: Deck | null = null;
  currentCardIndex = 0;
  isFlipped = false;
  showRating = false;
  
  // Animation states
  cardState: 'entering' | 'active' | 'exiting' = 'entering';
  confettiActive = false;

  // Simple session tracking
  sessionScore = 0;
  correctAnswers = 0;
  totalAnswered = 0;

  selectDeck(deck: Deck) {
    this.selectedDeck = deck;
    this.currentCardIndex = 0;
    this.isFlipped = false;
    this.showRating = false;
    this.sessionScore = 0;
    this.correctAnswers = 0;
    this.totalAnswered = 0;
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  nextCard() {
    this.cardState = 'exiting';
    
    setTimeout(() => {
      this.currentCardIndex++;
      this.isFlipped = false;
      this.showRating = false;
      
      if (this.currentCardIndex >= (this.selectedDeck?.cards.length || 0)) {
        this.triggerConfetti();
        setTimeout(() => {
          this.cardState = 'entering';
        }, 2000);
      } else {
        this.cardState = 'entering';
        setTimeout(() => this.cardState = 'active', 300);
      }
    }, 500);
  }

  rateCard(correct: boolean) {
    if (correct) {
      this.correctAnswers++;
      this.sessionScore += 100;
    }
    this.totalAnswered++;
    this.showRating = false;
    this.nextCard();
  }

  getProgressPercent(): number {
    if (!this.selectedDeck) return 0;
    return ((this.currentCardIndex + 1) / this.selectedDeck.cards.length) * 100;
  }

  getSessionAccuracy(): number {
    if (this.totalAnswered === 0) return 0;
    return (this.correctAnswers / this.totalAnswered) * 100;
  }

  triggerConfetti() {
    this.confettiActive = true;
    setTimeout(() => {
      this.confettiActive = false;
    }, 3000);
  }

  getCurrentCard(): Flashcard | null {
    if (!this.selectedDeck || this.currentCardIndex >= this.selectedDeck.cards.length) {
      return null;
    }
    return this.selectedDeck.cards[this.currentCardIndex];
  }

  getTotalCards(): number {
    return this.decks.reduce((total, deck) => total + deck.cards.length, 0);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.selectedDeck && !this.showRating) {
      if (event.key === ' ' || event.key === 'Enter') {
        this.flipCard();
      } else if (event.key === 'ArrowRight' && this.isFlipped) {
        this.showRating = true;
      }
    }
  }
}