import { Component, inject } from '@angular/core';
import { AuthStore } from '../../auth/auth.store';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer',
    imports: [RouterLink],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
    authStore = inject(AuthStore)
}
