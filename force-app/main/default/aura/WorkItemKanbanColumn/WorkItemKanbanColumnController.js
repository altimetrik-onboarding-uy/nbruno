({
    doInit : function(component, event, helper) {
        helper.setColumn(component);
    },
    
    allowDrop : function(component, event, helper) {
        event.preventDefault();
    },
    
    onDrop : function(component, event, helper) {
        helper.dropElement(component, event);
    },

    refreshList : function(component, event, helper) {
        helper.eventRefresh(component, event);
    },
})
