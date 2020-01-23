({
    doInit : function(component, event, helper) {
        helper.setHelpText(component);
        helper.isOverdue(component);
    },
    
    editRecord : function(component, event, helper){
        helper.workItemEdit(component);
    },
    
    refreshView : function(component, event, helper) {
        let eventType = event.getParam('type');
        let indexCall = 0;
        if(eventType === 'SUCCESS'){
            if(indexCall == 0){
                indexCall +=1;
                $A.get('e.force:refreshView').fire();
            }
        }
    },
    
    onDragStart : function(component, event, helper) {
        event.dataTransfer.dropEffect = "move";
        let item = component.get('v.workItem');
        event.dataTransfer.setData('text', JSON.stringify(item));
    },
    
})