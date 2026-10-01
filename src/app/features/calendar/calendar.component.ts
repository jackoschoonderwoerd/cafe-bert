import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddCalendarItemDialogComponent } from '../../admin/add-calendar-item-dialog/add-calendar-item-dialog.component';
import { CalendarStore } from './calendar.store';
import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { CalendarItem } from '../../models/calendar-item.model';
import { AuthStore } from '../../auth/auth.store';
import { AppStore } from '../../app-store/app.store';
import { SnackbarService } from '../../services/snackbar.service';
import { FirebaseError } from '@angular/fire/app';
import { ConfirmService } from '../../services/confirm.service';
import { JazzfryCalendarComponent } from './jazzfry-calendar/jazzfry-calendar.component';


@Component({
    selector: 'app-calendar',
    imports: [
        MatButtonModule,
        DatePipe,
        MatExpansionModule,
        MatIconModule,
        MatButtonModule,
        JazzfryCalendarComponent
    ],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

    matDialog = inject(MatDialog)
    calendarStore = inject(CalendarStore)
    panelOpenState = signal(false)
    authStore = inject(AuthStore);
    appStore = inject(AppStore)
    snackbarService = inject(SnackbarService);
    confirmService = inject(ConfirmService)


    onAddCalendarItem() {
        this.matDialog.open(AddCalendarItemDialogComponent, {
            minHeight: '95dvh',
            minWidth: '95dvw'
        })
    }
    onEdit(item: CalendarItem) {
        this.matDialog.open(AddCalendarItemDialogComponent, {
            minHeight: '95dvh',
            minWidth: '95dvw',
            data: {
                item
            }
        })
    }
    onDelete(item: CalendarItem) {
        this.confirmService.getConfirmation().subscribe((res: boolean) => {
            if (res) {
                this.calendarStore.deleteCalendarItem(item)
                    .then((res: any) => {
                        this.snackbarService.openSnackbar('item deleted');
                    })
                    .catch((err: FirebaseError) => {
                        this.snackbarService.openSnackbar(`operation failed due to: ${err.message}`)
                    })
            }
        })
    }
    subjectContainsAjax(subjectNl: string): boolean {
        return subjectNl.toLowerCase().includes('ajax')
    }
    subjectContainsJazzfry(subjectNl: string) {
        return subjectNl.toLowerCase().includes('jazzfry')
    }
    ajaxStyle(subjectNl: string) {
        return subjectNl.toLowerCase().includes('ajax')
            ? 'color: white; background-color: red; padding:.5rem; border:1px solid white'
            : '';
    }

    getStyleBySubject(subjectNl: string) {
        if (subjectNl.toLowerCase().includes('ajax')) {
            return 'color: white; background-color: red; padding-left:.5rem; border:1px solid white'
        } else if (subjectNl.toLowerCase().includes('jazzfry')) {
            return 'color: white; background-color: var(--purple-extra-dark); padding-left:.5rem; border:1px solid white'
        } else {
            return 'color: white; background-color: var(--yellow-extra-dark); padding-left:.5rem; border:1px solid white'
        }
    }
}
