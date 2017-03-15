import { Component,Directive } from '@angular/core';

@Component({
    selector: 'chatbox',
    templateUrl: 'chat.component.html',
})
export class ChatComponent {
    private message: String;
    construcotr() {}

    onSend(){
      console.log("Send button pressed");
    }
}
