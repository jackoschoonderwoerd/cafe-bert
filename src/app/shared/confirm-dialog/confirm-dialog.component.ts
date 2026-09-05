import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    imports: [MatDialogModule, MatButtonModule, JsonPipe],
    templateUrl: './confirm-dialog.component.html',
    styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
    constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

    data = inject(MAT_DIALOG_DATA);

    ngOnInit(): void {
        this.dialogRef.updateSize('300px', 'auto');
    }
}
