import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { TopicService, Topic, Hint } from '../../services/topic.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../layout/navbar.component';

@Component({
  selector: 'app-topic-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {
  topic: Topic | null = null;
  isLoading = true;
  activeHintIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private router: Router
  ) { }

  ngOnInit() {
    const topicId = this.route.snapshot.paramMap.get('id');
    if (topicId) {
      this.loadTopic(topicId);
    }
  }

  loadTopic(topicId: string) {
    this.topicService.getTopics().subscribe(
      (topics: Topic[]) => {
        this.topic = topics.find(t => t.id === topicId) || null;
        
        if (this.topic) {
          console.log('Topic loaded:', this.topic.name);
          console.log('Hints available:', this.topic.hints.length);
          
          // Initialize active hint
          if (this.topic.hints && this.topic.hints.length > 0) {
            this.activeHintIndex = 0;
          }
        } else {
          console.log('Topic not found with ID:', topicId);
        }
        
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error loading topic:', error);
        this.isLoading = false;
      }
    );
  }

  nextHint() {
    if (this.topic && this.activeHintIndex < this.topic.hints.length - 1) {
      this.activeHintIndex++;
    }
  }

  previousHint() {
    if (this.activeHintIndex > 0) {
      this.activeHintIndex--;
    }
  }

  get activeHint(): Hint | null {
    return this.topic && this.topic.hints && this.topic.hints.length > 0 
      ? this.topic.hints[this.activeHintIndex] 
      : null;
  }

  // Navigate to test page
  takeTest() {
    if (this.topic) {
      this.router.navigate(['/test', this.topic.id]);
    }
  }

  // Copy code to clipboard
  copyCode(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      // Show temporary feedback (you can add a toast notification here)
      console.log('Code copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy code: ', err);
    });
  }
}