({
    doInit : function(component, event, helper) {
        helper.setData(component);
        helper.setColumns(component);
    },

    handleRowAction: function (component, event, helper) {
        let action = event.getParam('action');
        let row = event.getParam('row');
        
        switch (action.name) {   
            case 'edit':
                helper.editRecord(component, event, row);
                break;
            case 'delete':
                component.set("v.rowInfo", row);
                let confirm = component.get('c.handleConfirmDialog');
                $A.enqueueAction(confirm);
                break;
        }
    },

    handleConfirmDialog : function(component, event, helper) {
        component.set('v.showConfirmDialog', true);
    },
     
    handleConfirmDialogYes : function(component, event, helper) {
        let row = component.get("v.rowInfo");
        helper.deleteRecord(component, row);
    },
     
    handleConfirmDialogNo : function(component, event, helper) {
        component.set('v.showConfirmDialog', false);
    },

    refreshView : function(component, event, helper) {
        helper.viewRefresh(component, event);
    },
})
