/**
 * Created by Abhi on 10/10/16.
 */
import {Component, ViewChild, Input} from '@angular/core'
import {NavigatorComponent} from '../navigator/navigator.component';
import {MarkerComponent} from '../marker/marker.component';
import {MapService} from '../../services/map.service';
import {GeocodingService} from '../../services/geocoding.service';
import {Location} from '../../core/location.class';

@Component({
    selector: 'map',
    template: require<any>('./map.component.html'),
    styles: [require<any>('./map.component.css').toString()]
})

export class MapComponent{
    @Input('lng') lng: any;
    @Input('lat') lat: any;
    @Input('zoom') zoom: any;
    @Input('style') style: any;
    pinlat: any;
    pinlng: any;
    title: any;
    mapPlaceHolder: any;
    clicked = false;
    mapBox:any;
    closeButton: any;
    map: any;

    @ViewChild(MarkerComponent) markerComponent:MarkerComponent;

    constructor(private mapService: MapService, private geocoder: GeocodingService) {
    }

    ngOnInit() {
        // this.mapPlaceHolder = <HTMLInputElement>document.getElementById('map-place-holder');
        // this.mapPlaceHolder.style.cssText = this.style;
        // this.mapPlaceHolder.innerHTML = "Click To Interact";
        // this.mapPlaceHolder.style.display = 'flex';
        // this.mapPlaceHolder.style.justifyContent = 'center';
        // this.mapPlaceHolder.style.alignItems = 'center';
        // this.mapPlaceHolder.style.background = 'red';
    }

    initializeMap(){
        delete this.map;
        this.clicked = true;
        this.mapBox = document.getElementById('map-box');
        this.mapBox.style.display = "block";
        if (!this.map){
            console.log("new");
            this.map = new L.Map('map', {
                zoomControl: false,
                center: new L.LatLng(this.lat, this.lng),
                zoom: this.zoom,
                minZoom: 4,
                maxZoom: 19,
                layers: [this.mapService.baseMaps.OpenStreetMap]
            });

            L.control.zoom({ position: 'topright' }).addTo(this.map);
            L.control.layers(this.mapService.baseMaps).addTo(this.map);
            L.control.scale().addTo(this.map);

            this.mapService.map = this.map;
            // this.markerComponent.Initialize();
            // this.geocoder.getCurrentLocation()
            //     .subscribe(
            //         location => map.panTo([location.latitude, location.longitude]),
            //         err => console.error(err)
            //     );
        }
    }

    closeMap(box: any){
        box.style.display = 'none';
    }

    ngAfterViewInit() {
    }
}