import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export interface FlashMessageOptions {
  classes?: string[];
  timeout?: number;
}

export interface FlashMessage {
  text: string;
  options?: FlashMessageOptions;
  timestamp?: number;
}

Injectable();
export class FlashMessageService {
  public message = new Subject<FlashMessage>();

  show(text: string, options: FlashMessageOptions = {}) {
    this.message.next(<FlashMessage>{
      text,
      options
    });
  }
}