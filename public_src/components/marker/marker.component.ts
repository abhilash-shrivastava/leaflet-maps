import {Component, Input} from '@angular/core';
import {MapService} from '../../services/map.service';
import {Map, LeafletMouseEvent, Marker} from 'leaflet';

@Component({
    selector: 'marker',
    template: require<any>('./marker.component.html'),
    styles: [
        require<any>('./marker.component.less'),
        require<any>('../../styles/main.less')
    ],
    providers: []
})
export class MarkerComponent {
    editing: boolean;
    removing: boolean;
    markerCount: number;
    // @Input('map') map: any;
    @Input('markerlng') markerlng: any;
    @Input('markerlat') markerlat: any;
    @Input('title') title: any;


    constructor(private mapService: MapService) {
        this.editing = false;
        this.removing = false;
        this.markerCount = 0;
    }

    ngOnInit() {
    }

    Initialize() {
        console.log(this.markerlat);
        console.log(this.markerlng);
        let marker = L.marker([this.markerlat, this.markerlng], {
                icon: L.icon({
                    iconUrl: require<any>('../../../node_modules/leaflet/dist/images/marker-icon.png'),
                    shadowUrl: require<any>('../../../node_modules/leaflet/dist/images/marker-shadow.png')
                }),
                draggable: true
            })
            .bindPopup(this.title, {
                offset: L.point(12, 6)
            })
            .addTo(this.mapService.map);
        this.markerCount += 1;

        marker.on('click', (event: MouseEvent) => {
            if (this.removing) {
                this.mapService.map.removeLayer(marker);
                this.markerCount -= 1;
            }
        });
    }

    toggleEditing() {
        this.editing = !this.editing;

        if (this.editing == true && this.removing == true) {
            this.removing = false;
        }
    }

    toggleRemoving() {
        this.removing = !this.removing;

        if (this.editing == true && this.removing == true) {
            this.editing = false;
        }
    }
}
