//frontend/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { TopicListComponent } from './components/topics/topic-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MockInterviewComponent } from './components/mock-interview/mock-interview.component';
import { ProgressTrackerComponent } from './components/progress-tracker/progress-tracker.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { VoiceInterviewComponent } from './components/voice-interview/voice-interview.component';
import { TopicDetailComponent } from './components/topics/topic-detail.component';
import { TopicTestComponent } from './components/topics/topic-test.component';
import { WhiteboardComponent } from './components/whiteboard/whiteboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'topics', component: TopicListComponent, canActivate: [AuthGuard] },
  { path: 'topics/:id', component: TopicDetailComponent, canActivate: [AuthGuard] },
  { path: 'test/:id', component: TopicTestComponent, canActivate: [AuthGuard] },
  { path: 'mock-interview', component: MockInterviewComponent, canActivate: [AuthGuard] },
  { path: 'voice-interview', component: VoiceInterviewComponent, canActivate: [AuthGuard] },
  { path: 'progress', component: ProgressTrackerComponent, canActivate: [AuthGuard] },
  { path: 'whiteboard', component: WhiteboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/dashboard' }
];