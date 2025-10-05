//frontend/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopicListComponent } from './components/topics/topic-list.component';
import { VoiceInterviewComponent } from './components/voice-interview/voice-interview.component';
import { WhiteboardComponent } from './components/whiteboard/whiteboard.component';
import { FlashquestComponent } from './components/flashquest/flashquest.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'topics', component: TopicListComponent, canActivate: [AuthGuard] },
  { path: 'topics/:id', component: TopicListComponent, canActivate: [AuthGuard] },
  { path: 'voice-interview', component: VoiceInterviewComponent, canActivate: [AuthGuard] },
  { path: 'whiteboard', component: WhiteboardComponent, canActivate: [AuthGuard] },
  { path: 'flashcards', component: FlashquestComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/dashboard' }
];