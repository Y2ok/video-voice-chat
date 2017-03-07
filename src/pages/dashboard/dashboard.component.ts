import { Component, ViewChild } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { SpeechRecognitionService } from '../../services/speechRecognition.service';
import { WebCamCapture } from '../../services/webCam.service';
import { ImageCompare } from '../../services/imageCompare.service';

import * as THREE from 'three';

@Component({
    templateUrl: './dashboard.component.html'
})


export class DashboardComponent {
    @ViewChild('webcam') webcam;   

    constructor(private router: Router, private http: Http, private speech: SpeechRecognitionService, private webService: WebCamCapture) { }

    /*
    ** On Init function, which makes sure that all required prerequisites are done
    */
    ngOnInit() {
            var rendering = false;

            var webCam = null;
            var imageCompare = null;

			webCam = this.webService.initialize(this.webcam.nativeElement);
			rendering = true;

			this.render();
            
            this.speech.record('en_US')
            .subscribe(e => console.log(e));
    }

    render() {
        var width = 64;
        var height = 48;      

        var currentImage = null;
        var oldImage = null;

        var topLeft = [Infinity,Infinity];
        var bottomRight = [0,0];

        var raf = (function(){
            return  window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
            function( callback ){
                window.setTimeout(callback, 1000/60);
            };
        })();

        oldImage = currentImage;
        currentImage = this.webService.captureImage(false);

        if(!oldImage || !currentImage) {
            return;
        }

        var vals = new ImageCompare().compare(currentImage, oldImage, width, height);

        topLeft[0] = vals.topLeft[0] * 10;
        topLeft[1] = vals.topLeft[1] * 10;

        bottomRight[0] = vals.bottomRight[0] * 10;
        bottomRight[1] = vals.bottomRight[1] * 10;

        document.getElementById('movement').style.top = topLeft[1] + 'px';
        document.getElementById('movement').style.left = topLeft[0] + 'px';

        document.getElementById('movement').style.width = (bottomRight[0] - topLeft[0]) + 'px';
        document.getElementById('movement').style.height = (bottomRight[1] - topLeft[1]) + 'px';

        topLeft = [Infinity,Infinity];
        bottomRight = [0,0]
    }
}