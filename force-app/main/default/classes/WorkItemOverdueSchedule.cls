public with sharing class WorkItemOverdueSchedule implements Schedulable {

    public static List<String> getAdminEmails(){
        List<User> adminUsers = [SELECT Id, Email FROM User WHERE Profile.Name = 'System Administrator'];
        List<String> adminEmails = new List<String>();
        for(User admin : adminUsers){
            adminEmails.add(admin.Email);
        }
        return adminEmails;
    }

    public static List<Work_Item__c> getOverdueItems(){
        List<Work_Item__c> overdueWorkItems = [SELECT Id, Name, Title__c, Estimated_End_Date__c, Status__c FROM Work_Item__c WHERE Estimated_End_Date__c >= TODAY AND Status__c != 'Done'];
        return overdueWorkItems;
            
    }

    public void execute(SchedulableContext ctx) {
        List<Work_Item__c> overdueItemsList = WorkItemOverdueSchedule.getOverdueItems();
        List<String> adminEmailList = WorkItemOverdueSchedule.getAdminEmails();

        User targetUser = [SELECT Id FROM User WHERE Email = :adminEmailList[0] LIMIT 1];

        if(!overdueItemsList.isEmpty()){
            Messaging.SingleEmailMessage pendingMail = new Messaging.SingleEmailMessage();
            EmailTemplate emailTemplate = [SELECT Id FROM EmailTemplate WHERE Name = 'Work Item pending' AND IsActive = TRUE LIMIT 1];
            pendingMail.setSubject('Pending Work Items');
            pendingMail.setBccAddresses(adminEmailList);
            pendingMail.setTargetObjectId(targetUser.Id);
            pendingMail.setSaveAsActivity(false);
            String[] messageBody = new String[]{};
            messageBody.add('<h2>The following Work Items are overdue:</h2><table style="width:100%"><tr><th>Name</th><th>Title</th><th>Estimated End Date</th><th>Current Status</th></tr>');
            for(Work_Item__c item : overdueItemsList){
                messageBody.add('<tr><td>'+item.Name+'</td><td>'+item.Title__c+'</td><td>'+item.Estimated_End_Date__c.format()+'</td><td>'+item.Status__c+'</td></tr>');
            }
            messageBody.add('</table>');
            String bodyResult = String.join(messageBody, '');
            pendingMail.setHtmlBody(bodyResult); 

            if(!Test.isRunningTest()){
                Messaging.sendEmail(new Messaging.SingleEmailMessage[] { pendingMail });
            }
        }
    }

}