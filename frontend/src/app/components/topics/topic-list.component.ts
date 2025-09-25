// frontend/src/app/components/topics/topic-list.component.ts
import { Component, OnInit } from '@angular/core';
import { TopicService, Topic, Problem } from '../../services/topic.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../layout/navbar.component'; 
@Component({
  selector: 'app-topic-list',
  standalone: true,
  imports: [CommonModule, FormsModule,NavbarComponent],
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {
  topics: Topic[] = [];
  filteredTopics: Topic[] = [];
  searchText = '';
  selectedCategory = 'all';
  categories = ['all', 'DSA', 'SQL', 'Python'];
  isLoading = true;

  constructor(
    private topicService: TopicService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadTopics();
  }

  loadTopics() {
    this.topicService.getTopics().subscribe(
      (data: Topic[]) => {
        this.topics = data;
        this.filteredTopics = data;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error loading topics:', error);
        this.isLoading = false;
      }
    );
  }

  filterTopics() {
    this.filteredTopics = this.topics.filter(topic => {
      const matchesSearch = topic.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
                           topic.description.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesCategory = this.selectedCategory === 'all' || topic.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  viewTopicDetails(topic: Topic) {
    this.router.navigate(['/topics', topic.id]);
  }

  takeTest(topic: Topic) {
    this.router.navigate(['/test', topic.id]);
  }
}