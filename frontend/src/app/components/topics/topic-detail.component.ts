//frontend/src/app/components/topics/topic-detail.component.ts
// frontend/src/app/components/topics/topic-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TopicService, Topic, Hint } from '../../services/topic.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topic-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {
  topic: Topic | null = null;
  isLoading = true;
  activeHintIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService
  ) { }

  ngOnInit() {
    const topicId = parseInt(this.route.snapshot.paramMap.get('id') || '1', 10);
    this.loadTopic(topicId);
  }

  loadTopic(topicId: number) {
    this.topicService.getTopics().subscribe(
      (topics: Topic[]) => {
        this.topic = topics.find(t => t.id === topicId) || null;
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
    return this.topic ? this.topic.hints[this.activeHintIndex] : null;
  }
}