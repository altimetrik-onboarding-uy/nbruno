({
    doInit : function(component, event, helper) {
        helper.setColumn(component);
    },
    
    allowDrop : function(component, event, helper) {
        event.preventDefault();
    },
    
    onDrop : function(component, event, helper) {
        event.preventDefault();
        let dropEvent = component.getEvent("elementDrop");
        dropEvent.setParams({
            'title': component.get('v.title'),
            'item': JSON.parse(event.dataTransfer.getData('text'))
        });
        dropEvent.fire();
    },

    refreshList : function(component, event, helper) {
        let updatedItemList = component.get("v.workItemList");
        let title = event.getParam("title");
        let item = event.getParam("item");
        let actualItem = updatedItemList.find(function(el) { return el.Id === item.Id; });
        if (actualItem) {
            actualItem.Status__c = title;
            component.set("v.workItemList",updatedItemList);
            helper.setColumn(component);
        } else {
            console.log("could not find item ", item, " in list ", updatedItemList);
        }
    }
})
