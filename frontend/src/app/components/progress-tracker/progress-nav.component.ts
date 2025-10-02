import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-progress-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './progress-nav.component.html',
  styleUrls: ['./progress-nav.component.css']
})
export class ProgressNavComponent {
  // Component logic can be added here if needed
}