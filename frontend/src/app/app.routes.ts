//frontend/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopicListComponent } from './components/topics/topic-list.component';
import { TopicDetailComponent } from './components/topics/topic-detail.component';
import { TopicTestComponent } from './components/topics/topic-test.component';
import { VoiceInterviewComponent } from './components/voice-interview/voice-interview.component';
import { WhiteboardComponent } from './components/whiteboard/whiteboard.component';
import { FlashquestComponent } from './components/flashquest/flashquest.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'topics', component: TopicListComponent, canActivate: [AuthGuard] },
  { path: 'topics/:id', component: TopicDetailComponent, canActivate: [AuthGuard] }, // Changed to TopicDetailComponent
  { path: 'topics/:id/hints', component: TopicDetailComponent, canActivate: [AuthGuard] }, // Add hints route
  { path: 'test/:id', component: TopicTestComponent, canActivate: [AuthGuard] }, // Add test route
  { path: 'voice-interview', component: VoiceInterviewComponent, canActivate: [AuthGuard] },
  { path: 'whiteboard', component: WhiteboardComponent, canActivate: [AuthGuard] },
  { path: 'flashcards', component: FlashquestComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path : 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/dashboard' }
];