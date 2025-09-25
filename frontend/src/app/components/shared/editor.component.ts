import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  imports: [CommonModule], // ← MUST HAVE CommonModule
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  @Input() code: string = '';
  @Input() language: string = 'python';
  @Input() readOnly: boolean = false;
  @Output() codeChange = new EventEmitter<string>();
  
  editorOptions = {
    theme: 'vs-dark', 
    language: 'python',
    minimap: { enabled: false },
    fontSize: 14,
    automaticLayout: true,
    readOnly: this.readOnly
  };

  onCodeChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.code = target.value;
    this.codeChange.emit(target.value);
  }
}