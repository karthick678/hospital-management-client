import { Component, Input } from '@angular/core';

@Component({
    selector: 'sub-header',
    templateUrl: './subheader.component.html',
    styleUrls: ['./subheader.component.scss']
})

export class SubheaderComponent{
   @Input() title: string;
}