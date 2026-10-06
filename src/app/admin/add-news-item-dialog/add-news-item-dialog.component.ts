import { Component, effect, inject } from '@angular/core';
import { QuillTextEditorComponent } from '../../shared/quill-text-editor/quill-text-editor.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { NewsStore } from '../../shared/news/news.store';
import { DialogRef } from '@angular/cdk/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NewsItem } from '../../models/news-item.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../../services/snackbar.service';
import { FirebaseError } from '@angular/fire/app';
import { ConfirmService } from '../../services/confirm.service';

@Component({
    selector: 'app-add-news-item-dialog',
    imports: [
        FormsModule,
        QuillTextEditorComponent,
        MatDialogModule,
        MatFormFieldModule,
        MatInput,
        MatButtonModule,
        MatCheckboxModule
    ],
    templateUrl: './add-news-item-dialog.component.html',
    styleUrl: './add-news-item-dialog.component.scss'
})
export class AddNewsItemDialogComponent {
    contentNl = 'nederlands';
    contentEn = 'engels';
    visible = true;
    editmode: boolean = false
    form: FormGroup
    fb = inject(FormBuilder)
    newsStore = inject(NewsStore);
    snackbarService = inject(SnackbarService);
    confirmService = inject(ConfirmService)


    constructor(private dialogRef: MatDialogRef<AddNewsItemDialogComponent>) {

        effect(() => {
            this.contentNl = this.newsStore.contentNl(),
                this.contentEn = this.newsStore.contentEn(),
                this.visible = this.newsStore.visible()
        })
    }


    async onSave() {



        const newsItem: NewsItem = {
            contentNl: this.contentNl,
            contentEn: this.contentEn,
            visible: this.visible
        }

        this.newsStore.saveNews(newsItem)
            .then((res: any) => {
                this.snackbarService.openSnackbar(`newsitem added`)
            })
            .catch((err: FirebaseError) => {
                console.log(err);
                this.snackbarService.openSnackbar(`operation faile due to ${err.message}`)
            })



        this.dialogRef.close();
    }

    onCancel() {
        this.confirmService.getConfirmation('If you confirm, all changes you made so far will be lost')
            .subscribe((res: boolean) => {
                console.log(res);
                if (res) {
                    this.dialogRef.close()
                }
            })
    }
}
