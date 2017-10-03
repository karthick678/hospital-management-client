import { Component, OnInit } from '@angular/core';
import {
    FlashMessageService,
    FlashMessage,
    FlashMessageOptions,
} from './flash-message.service';

@Component({
    selector: 'flash-message',
    templateUrl: './flash-message.component.html',
    styleUrls: ['./flash-message.component.scss']
})
export class FlashMessageComponent implements OnInit {
    public messages: FlashMessage[] = [];

    constructor(private flashMessageService: FlashMessageService) { }

    ngOnInit() {
        this.flashMessageService.message.subscribe(message => {
            this.handleMessage(message);
        });
    }

    handleMessage(message: FlashMessage) {
        const defaultOpts: FlashMessageOptions = {
            classes: [],
            timeout: 3000
        };
        Object.assign(defaultOpts, message.options);
        message.options = defaultOpts;

        const timestamp = message.timestamp = + new Date();

        this.messages.push(message);

        setTimeout(() => {
            this.messages = this.messages.filter(msg => msg.timestamp !== timestamp);
        }, message.options.timeout);
    }

    removeFlexMessage(index: number) {
        this.messages.splice(index, 1);
    } 

}