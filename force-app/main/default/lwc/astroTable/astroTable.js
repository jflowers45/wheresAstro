import { LightningElement, api, track  } from 'lwc';

const columns = [
    { label: 'Name', fieldName: 'name', type: 'text'  }
];

export default class AstroTable extends LightningElement {

    @track columns = columns;
    @track rows = [];
    @track selectedRows = [];

    @api get photos() {
        return this.rows;
    }

    set photos(value) {
        if (typeof value !== 'undefined') {
            this.rows = [];
            for (let i=0; i < value.length; i++) {
                let name = value[i].Name;
                let location = value[i].Location__Latitude__s + " " + value[i].Location__Longitude__s;
                let id = value[i].Id;
                let loc = {
                    name,
                    location,
                    id,
                    tip: value[i].CountryTip__c
                }
                this.rows.push(loc);
            }
        }
    }

    @api setGridSelection(recordId) {
        this.selectedRows = [recordId];
    }

    onrowselection(event) {
        const selectedRows = event.detail.selectedRows;
        let row = selectedRows[0];
        
        let evt = new CustomEvent('gridselection', {
            detail: {
                id:row.id
            },
            bubbles:true,
            composed:true
        });
        this.dispatchEvent(evt);
    }

}