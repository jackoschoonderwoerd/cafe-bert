import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddNewsItemDialogComponent } from '../../admin/add-news-item-dialog/add-news-item-dialog.component';
import { AppStore } from '../../app-store/app.store';
import { AuthStore } from '../../auth/auth.store';
import { NewsStore } from '../../shared/news/news.store';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-news',
    imports: [MatButtonModule],
    templateUrl: './news.component.html',
    styleUrl: './news.component.scss'
})
export class NewsComponent {
    matDialog = inject(MatDialog);
    appStore = inject(AppStore)
    authStore = inject(AuthStore)
    newsStore = inject(NewsStore)

    onAddNews() {
        this.matDialog.open(AddNewsItemDialogComponent, {
            minWidth: '95dvw',
            minHeight: ' 95dvh'
        })
    }
}
