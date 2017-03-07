import { Component } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { SpeechRecognitionService } from '../../services/speechRecognition.service';

@Component({
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent {

    constructor(private router: Router, private http: Http, private speech: SpeechRecognitionService) { }

    /*
    ** On Init function, which makes sure that all required prerequisites are done
    */
    ngOnInit() {
        this.speech.record('en_US')
            .subscribe(e => console.log(e));
    }

}