import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/* Other Service imports */
import { routing } from './app.routes';

/* Import modules */
import { ToasterModule } from 'angular2-toaster';

/* Component imports */
import { AppComponent } from './components/app/app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ChatComponent } from './components/chat/chat.component';

/* Page Imports */
import { DashboardComponent } from './pages/dashboard/dashboard.component';

/* Service Imports */
import { SpeechRecognitionService } from './services/speechRecognition.service';
import { WebCamCapture } from './services/webCam.service';
import { ImageCompare } from './services/imageCompare.service';

/* Pipe imports */

@NgModule({
    providers: [
        SpeechRecognitionService,
        WebCamCapture,
        ImageCompare
    ],
    imports: [
        BrowserModule,
        routing,
        FormsModule,
        ToasterModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        NavigationComponent,
        DashboardComponent,
        ChatComponent
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }
