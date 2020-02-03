/* eslint-disable no-console */
/* eslint-disable no-alert */
import { LightningElement, track, api, wire } from 'lwc';
//import WORKITEM_OBJECT from '@salesforce/schema/Work_Item__c';
import itemIsOverdue from '@salesforce/apex/WorkItemKanbanController.itemIsOverdue';
export default class KanbanElement extends LightningElement {
    @api workItem;
    @api helpText;
    @track isOverdue;
    @track error;
    @track recordType;
    @track fixType;
    @track ideaType;
    @track actionType;

    connectedCallback() {
        if (this.workItem.RecordType.Name === 'Fix') {
            this.fixType = true;
            this.helpText = 'This is a Fix-type Work Item.';
        } else if (this.workItem.RecordType.Name === 'Idea') {
            this.ideaType = true;
            this.helpText = 'This is a Idea-type Work Item.';
        } else if(this.workItem.RecordType.Name === 'Action'){
            this.actionType = true;
            this.helpText = 'This is a Action-type Work Item.';
        }
    }

    @wire(itemIsOverdue, { workItem: '$workItem' })
    overdueItems({ error, data }){
        if (data) {
            this.isOverdue = data;
        } else if (error) {
            console.log(error);
        }
    }
}