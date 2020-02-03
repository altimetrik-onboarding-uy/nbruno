public with sharing class WorkItemKanbanController {
    @AuraEnabled
    public static List<Work_Item__c> getWorkItems() {
        if (Schema.sObjectType.Work_Item__c.isAccessible()) {
            return [SELECT Id, Title__c, Difficulty__c, Status__c, Start_Date__c, Estimated_End_Date__c, RecordTypeId, RecordType.Name FROM Work_Item__c WHERE Start_Date__c >= LAST_N_DAYS:30];
        }
        else {
            return NULL;
        }
    }
    @AuraEnabled
    public static Boolean itemIsOverdue(Work_Item__c workItem) {
        if(workItem.Estimated_End_Date__c <= Date.today()){
            return TRUE;
        }
        else{
            return FALSE;
        }
    }
    
    @AuraEnabled
    public static void updateStatus(Work_Item__c workItem, String status) {
        try {
            if (Schema.sObjectType.Work_Item__c.fields.Status__c.isUpdateable()){
                workItem.Status__c = status;
                update workItem; 
            } 
        } catch(DmlException e) {
            System.debug('The following exception has occurred: ' + e.getMessage());
        }
    }

    @AuraEnabled
    public static List<String> getPicklistValues() {
        List<String> pickListValuesList= new List<String>();
        Schema.DescribeFieldResult fieldResult = Work_Item__c.Status__c.getDescribe();
        List<Schema.PicklistEntry> picklistValues = fieldResult.getPicklistValues();
        for( Schema.PicklistEntry pickListVal : picklistValues){
	        pickListValuesList.add(pickListVal.getLabel());
        }
        return pickListValuesList;
    }
}