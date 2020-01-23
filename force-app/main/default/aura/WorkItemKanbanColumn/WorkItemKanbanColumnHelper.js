({
    setColumn : function(component) {
        let workItemList = component.get("v.workItemList");
        let title = component.get("v.title");
        if(title === "New"){
            let newItemList = workItemList.filter(workItemList => workItemList.Status__c === "New");
            component.set("v.filteredList",newItemList);
        }
        if(title === "Ready"){
            let readyItemList = workItemList.filter(workItemList => workItemList.Status__c === "Ready");
            component.set("v.filteredList",readyItemList);
        }
        if(title === "In progress"){
            let inProgressItemList  = workItemList.filter(workItemList => workItemList.Status__c === "In progress");
            component.set("v.filteredList",inProgressItemList);
        }
        if(title === "Done"){
            let doneItemList = workItemList.filter(workItemList => workItemList.Status__c === "Done");
            component.set("v.filteredList",doneItemList);
        }
    },
 
})
