({
    setHelpText : function(component) {
        let recordType = component.get("v.workItem.RecordType.Name");
        if (recordType === "Fix") {
            component.set("v.helpText", "This is a Fix-type Work Item.");
          } else if (recordType === "Idea") {
            component.set("v.helpText", "This is a Idea-type Work Item.");
          } else if(recordType === "Action"){
            component.set("v.helpText", "This is a Action-type Work Item.");
          }
    },

    isOverdue : function(component){
        var action = component.get("c.itemIsOverdue");
        action.setParams({ workItem : component.get("v.workItem") });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.isOverdue", response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
                this.showToast("warning","Operation was not completed");
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        this.showToast("error","There was an error while updating: "+errors[0].message);
                    }
                } else {
                    this.showToast("error","Something went wrong! Please contact your System Admin");
                }
            }
        });
        $A.enqueueAction(action);
    },

    workItemEdit : function(component, event){
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
             "recordId": component.get("v.workItem.Id")
       });
        editRecordEvent.fire();
    },

    viewRefresh : function (component, event){
        let eventType = event.getParam('type');
        let indexCall = 0;
        if(eventType === 'SUCCESS'){
            if(indexCall == 0){
                indexCall +=1;
                $A.get('e.force:refreshView').fire();
            }
        }
    },

    startDrag : function (component, event){
        event.dataTransfer.dropEffect = "move";
        let item = component.get('v.workItem');
        event.dataTransfer.setData('text', JSON.stringify(item));
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