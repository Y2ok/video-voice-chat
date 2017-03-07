import { Injectable } from '@angular/core';

@Injectable()
export class WebCamCapture {
    constructor() { }

    private webCamWindow: any = false;
    private width = 640;
    private height = 480;

    /*
     * Initializes the object.
     *
     * @param <Element> videoElement The video element where we want to stream the footage.
     *
     * @return void.
     *
     */
    initialize(videoElement) {
        if (typeof videoElement != 'object') {
            this.webCamWindow = document.getElementById(videoElement);
        } else {
            this.webCamWindow = videoElement;
        }

        if (this.webCamWindow) {
            this.webCamWindow.style.width = this.width + 'px';
            this.webCamWindow.style.height = this.height + 'px';
            this.startStream();
        }
    }

    /*
     * Starts the streaming from the webcamera to the video element.
     *
     * @return void.
     *
     */
    startStream() {
        (navigator.getUserMedia).call(
            navigator,
            { video: true },
            (localMediaStream) => {
                if (this.webCamWindow) {
                    var vendorURL = window.URL;

                    this.webCamWindow.src = vendorURL.createObjectURL(localMediaStream);
                }
            },
            console.error
        );
    }

    /*
     * Captures a still image from the video.
     *
     * @param <Element> append An optional element where we want to append the image. 
     *
     * @return <Element> A canvas element with the image.
     *
     */
    captureImage(append) {
        var canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.getContext('2d').drawImage(this.webCamWindow, 0, 0, this.width, this.height);

        var pngImage = canvas.toDataURL("image/png");

        if (append) {
            append.appendChild(canvas);
        }

        return canvas;
    }

    /*
     * Sets the size of the video
     *
     * @param <Int> w The width.
     * @param <Int> h The height.
     *
     * @return void.
     *
     */
    setSize(w, h) {
        this.width = w;
        this.height = h;
    }

    /*
     * Checks if the browser supports webcam interfacing.
     *
     * @return <Boolean>.
     *
     */

    // Return public interface.
};