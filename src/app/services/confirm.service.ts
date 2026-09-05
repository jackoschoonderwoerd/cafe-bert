import { inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';


@Injectable({
    providedIn: 'root'
})
export class ConfirmService {


    dialog = inject(MatDialog)
    constructor() { }

    getConfirmation(message?: string) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                message: message
            }
        })
        return dialogRef.afterClosed()
    }

}
