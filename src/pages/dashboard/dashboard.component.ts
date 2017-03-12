import { Component, ViewChild } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { SpeechRecognitionService } from '../../services/speechRecognition.service';
import { WebCamCapture } from '../../services/webCam.service';
import { ImageCompare } from '../../services/imageCompare.service';
import { ChatComponent } from '../../components/chat/chat.component';

import * as THREE from 'three';

@Component({
    templateUrl: 'dashboard.component.html',
})


export class DashboardComponent {
    @ViewChild('webcam') webcam;
    @ViewChild(ChatComponent) chat;

    private moveLength = 9; // Frame count
    private minIncreasingXCount = 10;

    private currentImage = null;
    private oldImage = null;
    public listening: string = 'Start Listening';
    private listen: boolean = false;
    private rendering = false;
    constructor(private router: Router, private http: Http, private speech: SpeechRecognitionService, private webService: WebCamCapture) { }

    private motion: boolean = false;
    private nonMotionCounter: number = 0;
    private leftX = [];
    private rightX = [];


    /*
    ** On Init function, which makes sure that all required prerequisites are done
    */
    ngOnInit() {
            this.rendering = false;

            var webCam = null;
            var imageCompare = null;

			webCam = this.webService.initialize(this.webcam.nativeElement);
			this.rendering = true;
			this.main();
    }

    /**
     * On listen function, to toggle listening to microphone on and off.
     */
    onListen() {
        this.listen = !this.listen;
        if (this.listen) {
            this.listening = 'Stop Listening';
            this.speech.record('en-US')
            .subscribe(message => {
                if (message === undefined) {
                    this.chat.message = "";
                } else {
                    this.chat.message = message;
                }
            });
        } else {
            this.speech.stop();
            this.listening = 'Start Listening';
        }
    }

    render() {
        var width = 64;
        var height = 48;

        var topLeft = [Infinity,Infinity];
        var bottomRight = [0,0];

        this.oldImage = this.currentImage;
        this.currentImage = this.webService.captureImage(false);

        if(!this.oldImage || !this.currentImage) {
            return;
        }
        var vals = new ImageCompare().compare(this.currentImage, this.oldImage, width, height);


        topLeft[0] = vals.topLeft[0] * 10;
        topLeft[1] = vals.topLeft[1] * 10;

        bottomRight[0] = vals.bottomRight[0] * 10;
        bottomRight[1] = vals.bottomRight[1] * 10;

        document.getElementById('movement').style.top = topLeft[1] + 'px';
        document.getElementById('movement').style.left = topLeft[0] + 'px';
        document.getElementById('movement').style.width = (bottomRight[0] - topLeft[0]) + 'px';
        document.getElementById('movement').style.height = (bottomRight[1] - topLeft[1]) + 'px';


        if (topLeft[0] == Infinity || bottomRight[0] == 0){
            this.nonMotionCounter++;
            if(this.nonMotionCounter > 3){
              this.leftX = [];
              this.rightX = [];
              console.log("No move detected in more than 3 frames, resetting X arrays");
            }
        } else {
          this.leftX.push(topLeft[0]);
          this.rightX.push(bottomRight[0]);
          this.nonMotionCounter = 0;
          if(this.leftX.length > this.moveLength){
            console.log("Move complete");
            var increasingXCount = 0;
            increasingXCount = this.isMoveRight(this.leftX);
            increasingXCount = increasingXCount + this.isMoveRight(this.rightX);
            if(increasingXCount > this.minIncreasingXCount){
              console.log("Swipe Right Detected");
            } else {
              console.log("Swipe Right Not Detected");
            }
            this.leftX = [];
            this.rightX = [];
          }
        }

        topLeft = [Infinity,Infinity];
        bottomRight = [0,0];
    }

    main() {
        try{
            this.render();
        }
        catch(e) {
            console.log(e);
            return;
        }
        if (this.rendering) {
            this.raf(this.main.bind(this));
        }

    }

    raf(callback) {
        window.setTimeout(callback, 1000/60);
    }

    isMoveRight(coordinates){
      var count = 0;
      for (var x = 0; x < coordinates.length-1; x++) {
        if(coordinates[x] < coordinates[x+1]){
          count++;
        }
      }
      return count;
    }
}
