import { LightningElement, track, wire } from 'lwc';
import { registerListener } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import { getRecord} from 'lightning/uiRecordApi';

import AstroImages from '@salesforce/resourceUrl/AstroImages';

import Utils from 'c/utils';

import FIELD_Name from '@salesforce/schema/Photo__c.Name';
import FIELD_Latitude from '@salesforce/schema/Photo__c.Latitude__c';
import FIELD_Longitude from '@salesforce/schema/Photo__c.Longitude__c';
import FIELD_Description from '@salesforce/schema/Photo__c.Description__c';
import FIELD_Orientation from '@salesforce/schema/Photo__c.Orientation__c';
import FIELD_StaticResourceName from '@salesforce/schema/Photo__c.staticResourceName__c';

export default class MapItemDetail extends LightningElement {
    
    @wire(CurrentPageReference) pageRef; 

    @wire(getRecord, { recordId: '$id', fields: [FIELD_Name, FIELD_Latitude, FIELD_Longitude, FIELD_Description, FIELD_StaticResourceName, FIELD_Orientation]})
    wiredPhoto;

    @track id;
    handleMapClick(e) {
      this.id = e.id;
    }

    connectedCallback() {
      registerListener('mapClick', this.handleMapClick, this);
    }
    
    get mapMarkers() {
      return[
          {
              location: {
                Latitude: this.latitude,
                Longitude: this.longitude
              },
              title: this.name
          }
      ];
    }

    get imageClass() {
      return Utils.getDisplayValue(this.wiredPhoto.data, FIELD_Orientation);
    }    

    get imageUrl() {
      return AstroImages + '/' + Utils.getDisplayValue(this.wiredPhoto.data, FIELD_StaticResourceName);
    }

    get description() {
      return Utils.getDisplayValue(this.wiredPhoto.data, FIELD_Description);
    }
    get name() {
      return Utils.getDisplayValue(this.wiredPhoto.data, FIELD_Name);
    }
    get latitude() {
      return Utils.getDisplayValue(this.wiredPhoto.data, FIELD_Latitude);
    }
    get longitude() {
      return Utils.getDisplayValue(this.wiredPhoto.data, FIELD_Longitude);
    }

}