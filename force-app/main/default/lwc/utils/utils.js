import { getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi';

export default class Utils  {

    static getDisplayValue(data, field) {
		return getFieldDisplayValue(data, field) ? getFieldDisplayValue(data, field) : getFieldValue(data, field);
	}
    
} 