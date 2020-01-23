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
                alert("INCOMPLETE OPERATION");
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert("ERROR ON ELEMENT CALLBACK");
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    workItemEdit : function(component, event, helper){
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
             "recordId": component.get("v.workItem.Id")
       });
        editRecordEvent.fire();
    },
})