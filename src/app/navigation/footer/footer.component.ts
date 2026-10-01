import { Component, inject } from '@angular/core';
import { AuthStore } from '../../auth/auth.store';
import { RouterLink, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { QuickAccessDialogComponent } from '../../features/quick-access-dialog/quick-access-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-footer',
    imports: [RouterLink, RouterModule, MatIconModule, MatButtonModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
    authStore = inject(AuthStore)
    matDialog = inject(MatDialog)

    fireQuickAccessDrinks() {
        this.matDialog.open(QuickAccessDialogComponent,
            {
                height: '100vh'
            }
        )
    }

    fireQuickAccessFoodItems() {
    }
}
