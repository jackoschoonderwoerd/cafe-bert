import { Component, inject } from '@angular/core';
import { QuillTextEditorComponent } from '../../shared/quill-text-editor/quill-text-editor.component';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CalendarItem } from '../../models/calendar-item.model';
import { CalendarStore } from '../../features/calendar/calendar.store';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { FirebaseError } from '@angular/fire/app';
import { AuthStore } from '../../auth/auth.store';


@Component({
    selector: 'app-add-calendar-item-dialog',
    imports: [QuillTextEditorComponent,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule
    ],
    templateUrl: './add-calendar-item-dialog.component.html',
    styleUrl: './add-calendar-item-dialog.component.scss'
})
export class AddCalendarItemDialogComponent {
    id: string = ''
    subjectNl = '';
    subjectEn = ''
    descriptionNl = '';
    descriptionEn = ''
    visible = true
    eventDate: Date | null = null;
    startTime = '';
    endTime = '';

    editmode: boolean = false;
    calendarStore = inject(CalendarStore)
    snackbarService = inject(SnackbarService);


    data = inject<{ item: CalendarItem }>(MAT_DIALOG_DATA);

    constructor(
        private dialogRef: MatDialogRef<AddCalendarItemDialogComponent>
    ) {
        if (this.data && this.data.item) {
            const item: CalendarItem = this.data.item
            this.editmode = true;
            this.id = item.id;
            this.subjectNl = item.subjectNl;
            this.subjectEn = item.subjectEn;
            this.descriptionNl = item.descriptionNl;
            this.descriptionEn = item.descriptionEn;
            this.visible = item.visible;
            this.eventDate = new Date(item.startsAt);
            this.startTime = this.formatTime(item.startsAt);
            this.endTime = this.formatTime(item.endsAt);
        }
    }


    submitCalendarItem() {

        const startsAt = this.combineDateAndTime(this.eventDate, this.startTime)
        const endsAt = this.combineDateAndTime(this.eventDate, this.endTime)


        const calendarItem: CalendarItem = {
            subjectNl: this.subjectNl,
            subjectEn: this.subjectEn,
            startsAt: startsAt,
            endsAt: endsAt,
            descriptionNl: this.descriptionNl,
            descriptionEn: this.descriptionEn,
            visible: this.visible,
            mutable: true,
        }
        if (!this.editmode) {
            this.calendarStore.addCalendarItem(calendarItem).then((res: any) => {
                this.snackbarService.openSnackbar('calendar item added')
                this.dialogRef.close()
            });
        } else {
            calendarItem.id = this.id;
            this.calendarStore.updateCalendarItem(calendarItem)
                .then((res: any) => {
                    this.snackbarService.openSnackbar('calendar item updated');
                    this.dialogRef.close()
                })
                .catch((err: FirebaseError) => {
                    console.log(err);
                    this.snackbarService.openSnackbar(`operation failed due to ${err.message}`);
                    this.dialogRef.close();
                })
        }
    }



    onCancel() {
        this.dialogRef.close()
    }
    combineDateAndTime(date: Date | null, time: string): Date | null {
        if (!date || !time) {
            return null;
        }

        const [hours, minutes] = time.split(':').map(Number);

        const result = new Date(date);
        result.setHours(hours, minutes, 0, 0);

        return result;
    }

    private formatTime(date: Date): string {
        return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }
}
