import { Routes } from '@angular/router';
import { TopicListComponent } from './components/topics/topic-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MockInterviewComponent } from './components/mock-interview/mock-interview.component';
import { VoiceInterviewComponent } from './components/voice-interview/voice-interview.component';
import { ProgressTrackerComponent } from './components/progress-tracker/progress-tracker.component';
import { CodingRoundComponent } from './components/coding-round/coding-round.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { TopicDetailComponent } from './components/topics/topic-detail.component';
import { TopicTestComponent } from './components/topics/topic-test.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'topics', component: TopicListComponent, canActivate: [AuthGuard] },
  { path: 'topics/:id', component: TopicDetailComponent, canActivate: [AuthGuard] },
  { path: 'test/:id', component: TopicTestComponent, canActivate: [AuthGuard] },
  { path: 'coding-round', component: CodingRoundComponent, canActivate: [AuthGuard] },
  { path: 'mock-interview', component: MockInterviewComponent, canActivate: [AuthGuard] },
  { path: 'voice-interview', component: VoiceInterviewComponent, canActivate: [AuthGuard] }, // Add this
  { path: 'progress', component: ProgressTrackerComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];