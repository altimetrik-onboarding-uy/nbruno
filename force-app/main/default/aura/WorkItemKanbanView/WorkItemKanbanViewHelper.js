({
    setWorkItemList : function(component) {
        var action = component.get("c.getWorkItems");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                let workItemList = response.getReturnValue();
                component.set("v.workItemList", workItemList);
            }
            else if (state === "INCOMPLETE") {
                alert("INCOMPLETE OPERATION");
                this.showToast("warning","Operation was not completed");
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            alert("ERROR ON WORK ITEMS CALLBACK");
                            console.log("Error message: " +  errors[0].message);
                            this.showToast("error","There was an error while updating: "+errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                        this.showToast("error","Something went wrong! Please contact your System Admin");
                    }
                }
        });
        $A.enqueueAction(action);
    },

    setColumns : function(component) {
        var action = component.get("c.getPicklistValues");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                let picklistValues = response.getReturnValue();
                component.set("v.titleList", picklistValues);
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

    updateStatus : function(component, event, workItem, statusString){
        let action = component.get("c.updateStatus");
        action.setParams({
            workItem: workItem,
            status: statusString
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS") {
                let refreshEvent = $A.get("e.c:WorkItemKanbanRefresh");
                refreshEvent.setParams({ 'title': statusString, 'item': workItem });
                refreshEvent.fire();
                this.showToast("success","Item Status was updated");
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
    
    showToast : function(type, message) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type": type,
            "message": message
        });
        toastEvent.fire();
    },
})