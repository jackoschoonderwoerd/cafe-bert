import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AjaxService {

    private http = inject(HttpClient);

    // private url =
    //     'https://site.api.espn.com/apis/site/v2/sports/soccer/ned.1/teams/139/schedule';

    private url =
        'https://site.api.espn.com/apis/site/v2/sports/soccer/ned.1/teams/139/schedule?fixture=true';

    getSchedule() {
        return this.http.get<any>(this.url);
    }
}
