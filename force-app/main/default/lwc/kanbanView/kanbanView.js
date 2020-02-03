/* eslint-disable no-console */
/* eslint-disable no-alert */
import { LightningElement, api, wire } from 'lwc';
import getWorkItems from '@salesforce/apex/WorkItemKanbanController.getWorkItems';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import WORKITEM_OBJECT from '@salesforce/schema/Work_Item__c';
import STATUS_FIELD from '@salesforce/schema/Work_Item__c.Status__c';

export default class KanbanView extends LightningElement {
    @api workItemList;
    @api picklistValues;
    @api values;

    connectedCallback(){
    }

    @wire(getObjectInfo, { objectApiName: WORKITEM_OBJECT })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: STATUS_FIELD })
    wiredRecordtypeValues({data, error}){
        if(data){
            this.picklistValues = data.values;
        }
        if(error){
            console.log(error);
        }
    }

    @wire(getWorkItems)
    getWorkItemList({ error, data }){
        if (data) {
            this.workItemList = data;
        } else if (error) {
            console.log(error);
        }
    }
}