import { Injectable } from '@angular/core';

@Injectable()
export class ImageCompare {
    private sensitivity;
    private temp1Canvas;
    private temp1Context;
    private temp2Canvas;
    private temp2Context;
    private topLeft;
    private bottomRight;

    /*
     * Initializes the object.
     * Also used as a reset between image comparements.
     *
     * @return void.
     *
     */
    initialize() {
        this.sensitivity = 40;

        if (!this.temp1Canvas) {
            this.temp1Canvas = document.createElement('canvas');
            this.temp1Context = this.temp1Canvas.getContext("2d");
        }

        if (!this.temp2Canvas) {
            this.temp2Canvas = document.createElement('canvas');
            this.temp2Context = this.temp2Canvas.getContext("2d");
        }

        this.topLeft = [Infinity, Infinity];
        this.bottomRight = [0, 0];
    }

    /*
     * Compares to images.
     *
     * @param <Element> image1 The canvas of the first image.
     * @param <Element> image2 The canvas of the second image.
     * @param <Int>		width  The width to compare.
     * @param <Int>		height The height to compare
     *
     * @return <Object> The top left, and the bottom right pixels.
     *
     */
    compare(image1, image2, width, height) {
        this.initialize();

        if (!image1 || !image2) {
            return;
        }

        this.temp1Context.clearRect(0, 0, 100000, 100000);
        this.temp1Context.clearRect(0, 0, 100000, 100000);

        this.temp1Context.drawImage(image1, 0, 0, width, height);
        this.temp2Context.drawImage(image2, 0, 0, width, height);


        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                var pixel1 = this.temp1Context.getImageData(x, y, 1, 1);
                var pixel1Data = pixel1.data;

                var pixel2 = this.temp2Context.getImageData(x, y, 1, 1);
                var pixel2Data = pixel2.data;

                if (this.comparePixel(pixel1Data, pixel2Data) == false) {
                    this.setTopLeft(x, y);
                    this.setBottomRight(x, y);
                }
            }
        }

        return {
            'topLeft': this.topLeft,
            'bottomRight': this.bottomRight
        }
    }

    /*
     * Compares an individual pixel (within a range based on sensitivity).
     *
     * @param <Array> p1 The first pixel [r,g,b,a].
     * @param <Array> p2 The second pixel [r,g,b,a].
     *
     * @return <Boolean> If they are the same.
     *
     */
    comparePixel(p1, p2) {
        var matches = true;

        for (var i = 0; i < p1.length; i++) {
            var t1 = Math.round(p1[i] / 10) * 10;
            var t2 = Math.round(p2[i] / 10) * 10;

            if (t1 != t2) {
                if ((t1 + this.sensitivity < t2 || t1 - this.sensitivity > t2)) {
                    matches = false;
                }
            }
        }

        return matches;
    }

    /*
     * Sets the top left pixel.
     *
     * @param <int> x The x position.
     * @param <int> y The y position.
     *
     * @return void.
     *
     */
    setTopLeft(x, y) {
        if (x < this.topLeft[0]) {
            this.topLeft[0] = x;
        }
        if (y < this.topLeft[1]) {
            this.topLeft[1] = [y];
        }
    }

    /*
     * Sets the bottom right pixel.
     *
     * @param <int> x The x position.
     * @param <int> y The y position.
     *
     * @return void.
     *
     */
    setBottomRight(x, y) {
        if (x > this.bottomRight[0]) {
            this.bottomRight[0] = [x];
        }
        if (y > this.bottomRight[1]) {
            this.bottomRight[1] = [y];
        }
    }
}