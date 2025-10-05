import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: 'dsa' | 'system-design' | 'sql' | 'behavioral';
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
  codeExample?: string;
  tags: string[];
  interval: number;
  ease: number;
  dueDate: Date;
  reviews: number;
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  cards: Flashcard[];
  mastered: number;
  progress: number;
}

export interface UserProgress {
  level: number;
  xp: number;
  streak: number;
  totalCardsMastered: number;
  todayReviews: number;
  achievements: Achievement[];
  lastStudyDate: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  target: number;
}

@Injectable({
  providedIn: 'root'
})
export class FlashquestService {
  private decks: Deck[] = [
    {
      id: '1',
      name: 'Algorithm Patterns',
      description: 'Master common DSA patterns and strategies',
      category: 'dsa',
      icon: '🧠',
      color: '#3b82f6',
      cards: [],
      mastered: 0,
      progress: 0
    },
    {
      id: '2',
      name: 'System Design',
      description: 'Scalability, databases, and architecture',
      category: 'system-design',
      icon: '🏗️',
      color: '#ef4444',
      cards: [],
      mastered: 0,
      progress: 0
    },
    {
      id: '3',
      name: 'SQL Mastery',
      description: 'Advanced queries and optimization',
      category: 'sql',
      icon: '🗄️',
      color: '#10b981',
      cards: [],
      mastered: 0,
      progress: 0
    },
    {
      id: '4',
      name: 'Behavioral',
      description: 'Interview stories and leadership',
      category: 'behavioral',
      icon: '💼',
      color: '#f59e0b',
      cards: [],
      mastered: 0,
      progress: 0
    }
  ];

  private userProgress: UserProgress = {
    level: 1,
    xp: 0,
    streak: 0,
    totalCardsMastered: 0,
    todayReviews: 0,
    achievements: [
      {
        id: 'first_card',
        name: 'First Steps',
        description: 'Review your first card',
        icon: '🎯',
        unlocked: false,
        progress: 0,
        target: 1
      },
      {
        id: 'streak_7',
        name: 'Weekly Warrior',
        description: 'Maintain a 7-day streak',
        icon: '🔥',
        unlocked: false,
        progress: 0,
        target: 7
      },
      {
        id: 'master_50',
        name: 'Card Master',
        description: 'Master 50 cards',
        icon: '🏆',
        unlocked: false,
        progress: 0,
        target: 50
      }
    ],
    lastStudyDate: new Date()
  };

  private progressSubject = new BehaviorSubject<UserProgress>(this.userProgress);
  public progress$ = this.progressSubject.asObservable();

  constructor() {
    this.initializeSampleCards();
    this.updateDeckProgress();
  }

  private initializeSampleCards() {
    const sampleCards: Flashcard[] = [
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
        tags: ['sorting', 'divide-conquer', 'recursion'],
        interval: 1,
        ease: 2.5,
        dueDate: new Date(),
        reviews: 0
      },
      {
        id: '2',
        question: 'When would you use a HashMap vs Array for data storage?',
        answer: 'HashMap: When you need O(1) lookups by key and order doesn\'t matter. Array: When you need ordered data or index-based access.',
        category: 'dsa',
        difficulty: 'easy',
        explanation: 'HashMaps trade memory for speed, Arrays are more memory efficient but slower for lookups.',
        tags: ['data-structures', 'hashmap', 'array'],
        interval: 1,
        ease: 2.5,
        dueDate: new Date(),
        reviews: 0
      },
      {
        id: '3',
        question: 'What is database connection pooling and why is it important?',
        answer: 'Connection pooling maintains a cache of database connections that can be reused. It reduces overhead of establishing new connections for each request.',
        category: 'system-design',
        difficulty: 'medium',
        explanation: 'Creating database connections is expensive. Pooling allows connection reuse, improving performance.',
        tags: ['database', 'performance', 'scaling'],
        interval: 1,
        ease: 2.5,
        dueDate: new Date(),
        reviews: 0
      }
    ];

    // Distribute cards to decks
    this.decks[0].cards = sampleCards.filter(c => c.category === 'dsa');
    this.decks[1].cards = sampleCards.filter(c => c.category === 'system-design');
    this.decks[2].cards = sampleCards.filter(c => c.category === 'sql');
    this.decks[3].cards = sampleCards.filter(c => c.category === 'behavioral');
  }

  getDecks(): Deck[] {
    return this.decks;
  }

  getDeckById(id: string): Deck | undefined {
    return this.decks.find(d => d.id === id);
  }

  getDueCards(deckId: string): Flashcard[] {
    const deck = this.getDeckById(deckId);
    if (!deck) return [];
    
    return deck.cards.filter(card => new Date(card.dueDate) <= new Date());
  }

  // Spaced Repetition Algorithm (SM-2)
  rateCard(card: Flashcard, rating: 0 | 1 | 2 | 3 | 4 | 5): void {
    let ease = card.ease;
    let interval = card.interval;
    let reviews = card.reviews + 1;

    if (rating >= 3) {
      if (reviews === 1) {
        interval = 1;
      } else if (reviews === 2) {
        interval = 6;
      } else {
        interval = Math.round(card.interval * ease);
      }
      ease = Math.max(1.3, ease + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02)));
    } else {
      interval = 1;
      ease = Math.max(1.3, ease - 0.2);
    }

    // Update card
    card.interval = interval;
    card.ease = ease;
    card.reviews = reviews;
    card.dueDate = new Date(Date.now() + interval * 24 * 60 * 60 * 1000);

    // Update user progress
    this.updateUserProgress(rating);
    this.updateDeckProgress();
  }

  private updateUserProgress(rating: number) {
    const today = new Date().toDateString();
    const lastStudy = this.userProgress.lastStudyDate.toDateString();

    // Update streak
    if (today !== lastStudy) {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
      if (lastStudy === yesterday) {
        this.userProgress.streak++;
      } else {
        this.userProgress.streak = 1;
      }
      this.userProgress.todayReviews = 0;
    }

    this.userProgress.todayReviews++;
    this.userProgress.lastStudyDate = new Date();

    // Add XP based on rating
    const xpGained = rating * 10;
    this.userProgress.xp += xpGained;

    // Level up every 1000 XP
    this.userProgress.level = Math.floor(this.userProgress.xp / 1000) + 1;

    // Update achievements
    this.updateAchievements();

    this.progressSubject.next({...this.userProgress});
  }

  private updateAchievements() {
    this.userProgress.achievements.forEach(achievement => {
      switch(achievement.id) {
        case 'first_card':
          if (this.userProgress.todayReviews >= 1) {
            achievement.progress = 1;
            achievement.unlocked = true;
          }
          break;
        case 'streak_7':
          achievement.progress = Math.min(this.userProgress.streak, 7);
          if (this.userProgress.streak >= 7) {
            achievement.unlocked = true;
          }
          break;
        case 'master_50':
          achievement.progress = this.userProgress.totalCardsMastered;
          if (this.userProgress.totalCardsMastered >= 50) {
            achievement.unlocked = true;
          }
          break;
      }
    });
  }

  private updateDeckProgress() {
    this.decks.forEach(deck => {
      const totalCards = deck.cards.length;
      const masteredCards = deck.cards.filter(card => card.interval > 21).length;
      deck.mastered = masteredCards;
      deck.progress = totalCards > 0 ? (masteredCards / totalCards) * 100 : 0;
      this.userProgress.totalCardsMastered = this.decks.reduce((sum, d) => sum + d.mastered, 0);
    });
  }
}