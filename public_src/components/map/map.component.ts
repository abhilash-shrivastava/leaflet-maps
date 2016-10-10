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
    template: '<div id="map"></div>',
    styles: []
})

export class MapComponent{
    @Input('lng') lng: any;
    @Input('lat') lat: any;
    @Input('zoom') zoom: any;
    @Input('style') style: any;
    map: any;

    @ViewChild(MarkerComponent) markerComponent:MarkerComponent;

    constructor(private mapService: MapService, private geocoder: GeocodingService) {
    }

    ngOnInit() {
        this.map = <HTMLInputElement>document.getElementById('map');
        this.map.style.cssText = this.style;
        var map = new L.Map('map', {
            zoomControl: false,
            center: new L.LatLng(this.lat, this.lng),
            zoom: this.zoom,
            minZoom: 4,
            maxZoom: 19,
            layers: [this.mapService.baseMaps.OpenStreetMap]
        });

        L.control.zoom({ position: 'topright' }).addTo(map);
        L.control.layers(this.mapService.baseMaps).addTo(map);
        L.control.scale().addTo(map);

        this.mapService.map = map;
        // this.geocoder.getCurrentLocation()
        //     .subscribe(
        //         location => map.panTo([location.latitude, location.longitude]),
        //         err => console.error(err)
        //     );
    }

    ngAfterViewInit() {
        // this.markerComponent.Initialize();
    }
}