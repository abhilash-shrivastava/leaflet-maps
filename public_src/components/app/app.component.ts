import {Component, ViewChild} from '@angular/core';

@Component({
    selector: 'app',
    template: require<any>('./app.component.html'),
    styles: [
        require<any>('./app.component.less')
    ],
    providers: [],
})
export class AppComponent {
}
