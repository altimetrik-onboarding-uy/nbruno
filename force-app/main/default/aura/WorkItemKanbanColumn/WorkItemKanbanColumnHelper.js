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

    dropElement : function(component, event) {
        event.preventDefault();
        let dropEvent = component.getEvent("elementDrop");
        dropEvent.setParams({
            'title': component.get('v.title'),
            'item': JSON.parse(event.dataTransfer.getData('text'))
        });
        dropEvent.fire();
    },

    eventRefresh : function(component, event){
        let updatedItemList = component.get("v.workItemList");
        let title = event.getParam("title");
        let item = event.getParam("item");
        let actualItem = updatedItemList.find(function(el) { return el.Id === item.Id; });
        if (actualItem) {
            actualItem.Status__c = title;
            component.set("v.workItemList",updatedItemList);
            this.setColumn(component);
        } else {
            this.showToast("error","Something went wrong! Please contact your System Admin");
        }
    },

    showToast : function(type, message) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type": type,
            "message": message
        });
        toastEvent.fire();
    },
})