import { Component,Directive } from '@angular/core';

@Component({
    selector: 'chatbox',
    templateUrl: 'chat.component.html',
})
export class ChatComponent {
    private message: String;
    public chatMessages: any[] = [];
    construcotr() {}

    /**
     * Send spoken chat message to message box.
     */
    onSend(){
        this.chatMessages.push({
            message: this.message,
            date: new Date(),
            author: 'User 1'
        });
        this.message = '';
    }
}
