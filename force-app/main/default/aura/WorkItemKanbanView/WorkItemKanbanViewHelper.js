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
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            alert("ERROR ON WORK ITEMS CALLBACK");
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

    setColumns : function(component) {
        var action = component.get("c.getPicklistValues");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                let picklistValues = response.getReturnValue();
                component.set("v.titleList", picklistValues);
            }
            else if (state === "INCOMPLETE") {
                alert("INCOMPLETE OPERATION");
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            alert("ERROR ON VIEW COLUMNS CALLBACK");
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

    updateStatus : function(component, workItem, statusString){
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
            }
            else if (state === "INCOMPLETE") {
                alert("INCOMPLETE OPERATION");
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            alert("ERROR ON UPDATE CALLBACK");
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
    
})