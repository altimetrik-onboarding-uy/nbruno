({
    doInit : function(component, event, helper) {
        helper.setWorkItemList(component);
        helper.setColumns(component);
    },

    workItemDropped : function(component, event, helper){
        let title = event.getParam("title");
        let item = event.getParam("item");
        helper.updateStatus(component, event, item, title);
        
    }

})