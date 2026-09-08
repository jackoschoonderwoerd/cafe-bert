import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-location',
    imports: [MatButtonModule, MatIconModule, RouterLink],
    templateUrl: './location.component.html',
    styleUrl: './location.component.scss'
})
export class LocationComponent {

}
