@isTest
private class WorkItemKanbanTest {
    @testSetup static void setup() {
        List<Work_Item__c> workItemsList = new List<Work_Item__c>();
        Work_Item__c workItem1 = new Work_Item__c(Title__c = 'Work Item 1', Start_Date__c = Date.today().addDays(-10), Status__c = 'New', Estimated_End_Date__c = Date.today().addDays(-2));
        Work_Item__c workItem2 = new Work_Item__c(Title__c = 'Work Item 2', Start_Date__c = Date.today().addDays(-10), Status__c = 'New', Estimated_End_Date__c = Date.today().addDays(2));
        workItemsList.add(workItem1);
        workItemsList.add(workItem2);
        insert workItemsList;
    }

    @isTest
    public static void testGetItems() {
        test.startTest();

        List<Work_Item__c> workItemsList = [SELECT Id, Title__c, Difficulty__c, Status__c, Start_Date__c, Estimated_End_Date__c, RecordTypeId, RecordType.Name FROM Work_Item__c WHERE Start_Date__c >= LAST_N_DAYS:30]; 
        
        Test.stopTest();

        System.assertEquals(workItemsList.size(),(WorkItemKanbanController.getWorkItems()).size(), 'No work items found');
    }

    @isTest
    public static void testIsOverdue(){
        test.startTest();

        Work_Item__c workItem1 = [SELECT Id, Title__c, Difficulty__c, Status__c, Start_Date__c, Estimated_End_Date__c FROM Work_Item__c WHERE Title__c = 'Work Item 1' LIMIT 1];
        Work_Item__c workItem2 = [SELECT Id, Title__c, Difficulty__c, Status__c, Start_Date__c, Estimated_End_Date__c FROM Work_Item__c WHERE Title__c = 'Work Item 2' LIMIT 1];
    
        Test.stopTest();

        System.assertEquals(WorkItemKanbanController.itemIsOverdue(workItem1), TRUE, 'Result is not true');
        System.assertEquals(WorkItemKanbanController.itemIsOverdue(workItem2), FALSE, 'Result is not false');
    }

    @isTest
    public static void testUpdateStatus() {
        test.startTest();

        Work_Item__c workItem1 = [SELECT Id, Title__c, Difficulty__c, Status__c, Start_Date__c FROM Work_Item__c WHERE Title__c = 'Work Item 1' LIMIT 1]; 
        Work_Item__c workItem2 = [SELECT Id, Title__c, Difficulty__c, Status__c, Start_Date__c FROM Work_Item__c WHERE Title__c = 'Work Item 2' LIMIT 1]; 
        WorkItemKanbanController.updateStatus(workItem1, 'Done');
        WorkItemKanbanController.updateStatus(workItem2, 'Bad Value');

        Test.stopTest();

        System.assertEquals(workItem1.Status__c,'Done', 'Status does not match');
    }
}