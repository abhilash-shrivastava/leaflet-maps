import {Component, ViewChild, Input, ElementRef} from '@angular/core';

@Component({
    selector: 'app',
    template: require<any>('./app.component.html'),
    styles: [
        require<any>('./app.component.less')
    ],
    providers: [],
})
export class AppComponent {
    map: any;
    lng: any ;
    lat: any ;
    zoom: any ;
    style: any;
    ngOnInit(){
        this.map = (<HTMLScriptElement[]><any>document.getElementsByTagName('map'))[0];
        this.lat = this.map.attributes.lat.nodeValue;
        this.lng = this.map.attributes.lng.nodeValue;
        this.zoom = this.map.attributes.zoom.nodeValue;
        this.style = this.map.attributes.style.nodeValue;
    }
}
