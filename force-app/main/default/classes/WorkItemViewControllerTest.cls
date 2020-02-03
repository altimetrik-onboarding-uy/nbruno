@isTest
private class WorkItemViewControllerTest {
    @testSetup static void setup() {
        Contact contact = new Contact (Lastname = 'Test');
        insert contact;

        List<Work_Item__c> workItemsList = new List<Work_Item__c>();
        Work_Item__c workItem1 = new Work_Item__c(Title__c = 'Work Item 1', Status__c = 'New', Assigned_to__c = contact.Id);
        Work_Item__c workItem2 = new Work_Item__c(Title__c = 'Work Item 2', Status__c = 'New', Assigned_to__c = contact.Id);
        workItemsList.add(workItem1);
        workItemsList.add(workItem2);
        insert workItemsList;
    }

    @isTest
    public static void testGetWorkItems(){
        test.startTest();

        Contact contact = [SELECT Id FROM Contact WHERE Lastname = 'Test' LIMIT 1];
        List<Work_Item__c> workItemList = [SELECT Id FROM Work_Item__c WHERE Assigned_to__c = :contact.Id];

        Test.stopTest();

        System.assertEquals((WorkItemViewController.getWorkItems(contact.Id)).size(), workItemList.size(),'Size does not match');
    }

    @isTest
    public static void testDeleteWorkItems(){

        test.startTest();

        Contact contact = [SELECT Id FROM Contact WHERE Lastname = 'Test' LIMIT 1];
        Work_Item__c workItemDelete = [SELECT Id FROM Work_Item__c WHERE Title__c = 'Work Item 2' LIMIT 1];
        WorkItemViewController.deleteWorkItem(workItemDelete.Id);

        Test.stopTest();

        System.assertEquals((WorkItemViewController.getWorkItems(contact.Id)).size(), 1, 'Item was not deleted');
    }
}
