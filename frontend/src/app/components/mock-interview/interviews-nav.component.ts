import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-interviews-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './interviews-nav.component.html',
  styleUrls: ['./interviews-nav.component.css']
})
export class InterviewsNavComponent {
  // Component logic can be added here if needed
}