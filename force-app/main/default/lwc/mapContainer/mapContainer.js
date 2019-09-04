import { LightningElement, track, wire } from 'lwc';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import getAllPhotos from '@salesforce/apex/allPhotos.getAllPhotos';

export default class MapContainer extends LightningElement {

    @wire (CurrentPageReference) pageRef;
    @track photos;
    
    constructor() {
        super(); 
        getAllPhotos()
        .then(result => {
            this.photos = result;
        })
    }

    broadcastSelection(id) {
        fireEvent(this.pageRef, 'mapClick', {id});
    }

    handleMarkerClick(e) {
        let selectedId = e.detail.id
        this.broadcastSelection(selectedId);
        this.template.querySelector('c-astro-table').setGridSelection(e.detail.id);
    }

    handleGridSelection(e) {
        let selectedId = e.detail.id
        this.broadcastSelection(selectedId);
        let map = this.template.querySelector('c-astro-map');
        map.setMapSelection(e.detail.id);
    }   

}