/**
 * Created by Abhi on 10/10/16.
 */
import {Component, ViewChild} from '@angular/core'
import {NavigatorComponent} from '../navigator/navigator.component';
import {MarkerComponent} from '../marker/marker.component';
import {MapService} from '../../services/map.service';
import {GeocodingService} from '../../services/geocoding.service';
import {Location} from '../../core/location.class';

@Component({
    selector: 'map',
    template: '<div id="map"><navigator></navigator><marker></marker></div>',
    styles: [`body {
                margin:0;
                padding:0;
            }

            #map {
                position:absolute;
                top:50px;
                bottom:0;
                width:100%;
            }`
    ]
})

export class MapComponent{

    @ViewChild(MarkerComponent) markerComponent:MarkerComponent;

    constructor(private mapService: MapService, private geocoder: GeocodingService) {
    }

    ngOnInit() {
        var map = new L.Map('map', {
            zoomControl: false,
            center: new L.LatLng(40.731253, -73.996139),
            zoom: 12,
            minZoom: 4,
            maxZoom: 19,
            layers: [this.mapService.baseMaps.OpenStreetMap]
        });

        L.control.zoom({ position: 'topright' }).addTo(map);
        L.control.layers(this.mapService.baseMaps).addTo(map);
        L.control.scale().addTo(map);

        this.mapService.map = map;
        this.geocoder.getCurrentLocation()
            .subscribe(
                location => map.panTo([location.latitude, location.longitude]),
                err => console.error(err)
            );
    }

    ngAfterViewInit() {
        this.markerComponent.Initialize();
    }
}