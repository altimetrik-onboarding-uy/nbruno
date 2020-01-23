@isTest
private class WorkItemOverdueScheduleTest {
    @testSetup static void setup() {
        List<Work_Item__c> workItemsList = new List<Work_Item__c>();
        Work_Item__c workItem1 = new Work_Item__c(Estimated_End_Date__c = Date.today().addDays(-1), Status__c = 'New');
        Work_Item__c workItem2 = new Work_Item__c(Estimated_End_Date__c = Date.today().addDays(-2), Status__c = 'New');
        workItemsList.add(workItem1);
        workItemsList.add(workItem2);
        insert workItemsList;
    }

    @isTest
    public static void testGetAdmins() {
        test.startTest();

        String sysAdmin = 'System Administrator';
        List<User> adminUsers = [SELECT Id, Email FROM User WHERE Profile.Name = :sysAdmin];
        List<String> adminEmails = new List<String>();
        for(User admin : adminUsers){
            adminEmails.add(admin.Email);
        }

        Test.stopTest();

        System.assertEquals(adminEmails.size(),(WorkItemOverdueSchedule.getAdminEmails()).size(),'No admin users found');
    }

    @isTest
    public static void testGetWorkItems(){
        test.startTest();

        String status = 'Done';
        List<Work_Item__c> workItemsList = [SELECT Id, Name, Title__c, Estimated_End_Date__c, Status__c FROM Work_Item__c WHERE Estimated_End_Date__c <= TODAY AND Status__c != :status]; 
        
        Test.stopTest();

        System.assertEquals(workItemsList.size(),(WorkItemOverdueSchedule.getOverdueItems()).size(), 'No work items found');
    }

    @isTest
    public static void testSchedule(){
        
        String CRON_EXP = '0 0 0 15 3 ? *';

        test.startTest();

		String jobId = System.schedule('ScheduleApexClassTest',  CRON_EXP, new WorkItemOverdueSchedule());
		CronTrigger ct = [SELECT Id, CronExpression, TimesTriggered, NextFireTime FROM CronTrigger WHERE id = :jobId];
		
        test.stopTest();
        
        System.assertEquals(CRON_EXP, ct.CronExpression, 'Error on schedule context');
		System.assertEquals(0, ct.TimesTriggered, 'Error getting schedule info');
    }
}
