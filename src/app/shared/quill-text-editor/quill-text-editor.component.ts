import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuillConfigModule } from 'ngx-quill/config';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
    selector: 'app-quill-text-editor',
    imports: [FormsModule, QuillConfigModule, QuillEditorComponent],
    templateUrl: './quill-text-editor.component.html',
    styleUrl: './quill-text-editor.component.scss'
})
export class QuillTextEditorComponent {
    description = '';

    @Output() contentChange = new EventEmitter<string>();
    @Input() content = '';
    @Input() language = '';

    onEditorChanged(event: any) {
        const html = event.html ?? '';
        const cleaned = html
            .replace(/&nbsp;/gi, ' ')
            .replace(/[\u00A0\u202F]/g, ' ');

        this.description = cleaned;
        this.contentChange.emit(cleaned);
    }
}
