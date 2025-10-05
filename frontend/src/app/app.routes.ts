import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopicListComponent } from './components/topics/topic-list.component';
import { VoiceInterviewComponent } from './components/voice-interview/voice-interview.component';
import { WhiteboardComponent } from './components/whiteboard/whiteboard.component';
import { FlashquestComponent } from './components/flashquest/flashquest.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'topics', component: TopicListComponent },
  { path: 'topics/:id', component: TopicListComponent },
  { path: 'voice-interview', component: VoiceInterviewComponent },
  { path: 'whiteboard', component: WhiteboardComponent },
  { path: 'flashcards', component: FlashquestComponent },
  { path: '**', redirectTo: '/dashboard' }
];