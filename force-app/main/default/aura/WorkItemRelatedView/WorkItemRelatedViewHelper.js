({
    setData : function(component) {
        let contactId = component.get("v.recordId");
        var action = component.get("c.getWorkItems");
        action.setParams({ contactId: contactId });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                let workItemList = response.getReturnValue();
                workItemList.forEach(function(item){
                    item.linkName = '/'+item.Id;
                    item.recordType = item.RecordType.Name;
                })
                component.set("v.data", workItemList);
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

    setColumns : function(component){
        let actions = [
            { label: 'Edit', name: 'edit' },
            { label: 'Delete', name: 'delete' }
        ]
        component.set("v.columns", [
            {label: 'Name', fieldName: 'linkName', type: 'url', typeAttributes: {label: { fieldName: 'Name' } , target: '_blank'}},
            {label: 'Title', fieldName: 'Title__c', type: 'text'},
            {label: 'Status', fieldName: 'Status__c', type: 'text'},
            {label: 'Difficulty', fieldName: 'Difficulty__c', type: 'number'},
            {label: 'Start date', fieldName: 'Start_Date__c', type: 'date'},
            {label: 'Estimated end date', fieldName: 'Estimated_End_Date__c', type: 'date'},
            {label: 'End date', fieldName: 'End_Date__c', type: 'date'},
            {label: 'Type', fieldName: 'recordType', type: 'text'},
            { type: 'action', typeAttributes: { rowActions: actions } },
        ]);
    },

    editRecord : function (component, event, row){
        component.set("v.rowInfo", row);
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
             "recordId": row.Id
       });
        editRecordEvent.fire();
    },

    deleteRecord : function(component, row){
        let action = component.get("c.deleteWorkItem");
        action.setParams({
            itemId: row.Id
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS") {
                let rows = component.get('v.data');
                let rowIndex = rows.indexOf(row);
                rows.splice(rowIndex, 1);
                component.set('v.data', rows);
                this.showToast("success","Item was deleted");
                component.set('v.showConfirmDialog', false);
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

    viewRefresh : function (component, event){
        let row = component.get("v.rowInfo");
        let eventType = event.getParam('type');
        let data = component.get('v.data');
        if(eventType === 'SUCCESS'){
            let updatedRows = data.find(function(el) { return el.Id === row.Id; });
            if (updatedRows) {
                this.setData(component);
            } else {
                this.showToast("error","Something went wrong! Please contact your System Admin");
            }
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