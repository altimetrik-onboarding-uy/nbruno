public with sharing class WorkItemViewController {
    @AuraEnabled
    public static List<Work_Item__c> getWorkItems(Id contactId) {
        if (Schema.sObjectType.Work_Item__c.isAccessible()) {
            return [SELECT Id, Name, Title__c, Difficulty__c, Status__c, Start_Date__c, Estimated_End_Date__c, End_Date__c, RecordTypeId, RecordType.Name FROM Work_Item__c WHERE Assigned_to__c = :contactId];
        }
        else {
            return NULL;
        }
    }

    @AuraEnabled
    public static void deleteWorkItem(Id itemId) {
        if (Schema.sObjectType.Work_Item__c.isDeletable()) {
            Work_Item__c workItem = [SELECT Id FROM Work_Item__c WHERE Id = :itemId LIMIT 1];
            delete workItem;
        }
    }
}
