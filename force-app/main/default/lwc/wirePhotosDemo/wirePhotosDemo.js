import { LightningElement, wire } from 'lwc';
import getAllPhotos from '@salesforce/apex/allPhotos.getAllPhotos';

export default class WirePhotosDemo extends LightningElement {
   
    @wire(getAllPhotos) photos;

}