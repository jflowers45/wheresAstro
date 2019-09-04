import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import leaflet from '@salesforce/resourceUrl/leaflet';

export default class AstroMap extends LightningElement {
    _leafletInitialized = false;
    _mapPopulated=false;
    _photos;
    map;
    latLngArray;
    markers={};
    
    @api get photos() {
        return this._photos;
    }
    
    set photos(value) {
        if (typeof value !== 'undefined') {
            this._photos = value;
            this.populateMap();
        }
    }

    renderedCallback() {
        if (this._leafletInitialized) {
            return;
        }
        this._leafletInitialized = true;
    
        Promise.all([
            loadScript(this, leaflet + '/leaflet.js'),
            loadStyle(this, leaflet + '/leaflet.css')
        ])
        .then(() => {
            this.initializeleaflet();
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading',
                    message: error.message,
                    variant: 'error'
                })
            );
        });
    }

    updateSelection(recordId) {
        let evt = new CustomEvent('markerclick', {
            detail: {
                id:recordId
            },
            bubbles:true,
            composed:true
        });
        this.dispatchEvent(evt);
    }

    centerMapOnRecord(recordId) {
       let marker = this.markers[recordId];
       this.map.setView(marker.getLatLng());
    }

    
    @api setMapSelection(recordId) {
        this.markers[recordId].fire('click');
    }

    populateMap() {
        if (this._photos && this._photos.length > 0 && this.map) { 

            if (this._mapPopulated) {
                return;
            }
            this._mapPopulated = true;

            this.latLngArray = [];
            let cmp = this;
            this._photos.forEach(function (photo) {
                let lat = photo.Location__Latitude__s;
                let lng = photo.Location__Longitude__s;
                cmp.latLngArray.push([lat,lng]);

                let marker = L.marker([lat, lng]).addTo(cmp.map);

                marker.on('dblclick', function() {
                    let latlng = this.getLatLng();
                    this.cmp.map.setView(latlng, 12);
                });
                
                marker.on('click', function() {
                    cmp.updateSelection(this.recordId);
                });
                
                marker.bindPopup(photo.Name)

                marker.cmp = cmp;
                marker.recordId = photo.Id;
                cmp.markers[marker.recordId] = marker;
                
            });
            
            this.centerMap();
        }
    }

    onclick() {
        this.centerMap();
    }

    centerMap() {
        this.map.setView([35.9375, 14.3754],2);     
    }

    initializeleaflet() {
        const mapRoot = this.template.querySelector(".map-root");
        this.map = L.map(mapRoot);
        this.centerMap();
        let tileLayerUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        let mapLink = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> Contributors';
        L.tileLayer(
            tileLayerUrl, 
            {
                attribution: mapLink,
                maxZoom: 18
            }
        ).addTo(this.map);
        this.populateMap();
    }
 
}