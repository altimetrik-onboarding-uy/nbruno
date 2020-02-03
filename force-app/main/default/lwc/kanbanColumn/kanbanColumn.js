/* eslint-disable no-console */
/* eslint-disable no-alert */
import { LightningElement, track, api } from 'lwc';
export default class KanbanColumn extends LightningElement {
    @api title;
    @api workItemList;
    @track filteredList;
    @track workItem;

    connectedCallback() {
        if(this.title === "New"){
            this.filteredList = this.workItemList.filter(workItemList => workItemList.Status__c === "New");
        }
        if(this.title === "Ready"){
            this.filteredList = this.workItemList.filter(workItemList => workItemList.Status__c === "Ready");
        }
        if(this.title === "In progress"){
            this.filteredList = this.workItemList.filter(workItemList => workItemList.Status__c === "In progress");
        }
        if(this.title === "Done"){
            this.filteredList = this.workItemList.filter(workItemList => workItemList.Status__c === "Done");
        }
    }
}