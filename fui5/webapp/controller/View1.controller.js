sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/ui/model/Sorter",
    "sap/ui/core/UIComponent"
],
    /**
     */
    (Controller, MessageToast, JSONModel, Filter, FilterOperator, Fragment, Sorter, UIComponent) => {
        "use strict";

        return Controller.extend("fui5.controller.View1", {
            onInit: function () {
                //crate data object
                 var oDATA = {
                     "title": 'My title',
                     "SalesOrderSet" :[
                        {
                            "Purchase Order ID": "1000000010",
                            "Sales Order ID": "1",
                            "CustomerName": "Customer Name 1",
                            "Status": "Success",
                            "Gross Amount": "1999",
                            "Currency":"MYR",
                            "Business Area/OU": "OBBH", 
                        },
                        {
                            "Purchase Order ID": "1000000012",
                            "Sales Order ID": "2",
                            "CustomerName": "Customer Name 2",
                            "Status": "Success",
                            "Gross Amount": "199",
                            "Currency":"EUR",
                            "Business Area/OU": "OBBH", 
                        },
                        {
                            "Purchase Order ID": "1000000013",
                            "Sales Order ID": "3",
                            "CustomerName": "Customer Name 3",
                            "Status": "Success",
                            "Gross Amount": "99",
                            "Currency":"MYR",
                            "Business Area/OU": "OBBH", 
                        },
                        {
                            "Purchase Order ID": "1000000014",
                            "Sales Order ID": "4",
                            "CustomerName": "Customer Name 4",
                            "Status": "Success",
                            "Gross Amount": "99",
                            "Currency":"MYR",
                            "Business Area/OU": "OBBH", 
                        }
                     ]

                 };

                //Model instance
                var oModel = new JSONModel(oDATA);
                //oModel.setDefaultBindingMode("OneWay"); //this is for one way binding

                //assign the model to view
              this.getView().setModel(oModel);
            },

            /**
             * @override
             */
            // onExit: function() {
            //     alert('onExit is called');
            // },

            /**
             * @override
             */
            // onBeforeRendering: function() {
            //     alert('onBeforeRendring is called');
            // },

            /**
             * @override
             */
            // onAfterRendering: function() {
            //     alert('onAfterRendering is called');
            // },

            onSort: function(){
                // 1. get the current view
                var oView = this.getView();

                // 2. load the fragment
                if (! this.byId("SortDialog")){
                    Fragment.load({
                        id: oView.getId(),
                        name: "fui5.fragment.SortDialog",
                        controller: this
                    }).then(function(oDialog){
                        // 3. Open Dialog
                        oDialog.open();
                    });
                }else{
                    this.byId("SortDialog").open();
                }
            },

            onGroup: function(){
                // 1. get the current view
                var oView = this.getView();

                // 2. load the fragment
                if (! this.byId("GroupDialog")){
                    Fragment.load({
                        id: oView.getId(),
                        name: "fui5.fragment.GroupDialog",
                        controller: this
                    }).then(function(oDialog){
                        // 3. Open Dialog
                        oDialog.open();
                    });
                }else{
                    this.byId("GroupDialog").open();
                }
            },

            onSortDialogConfirm: function(oEvent){
                var oSortItem = oEvent.getParameter("sortItem");
                var sColumnPath = "Purchase Order ID";
                var bDesendingOrder = oEvent.getParameter("sortDescending");
                var aSorters = [];

                if(oSortItem){
                    sColumnPath = oSortItem.getKey();
                }
                aSorters.push(new Sorter(sColumnPath, bDesendingOrder));

                //get the id of the table                
                var oTable = this.byId("IDtable1");
                //bing the item of the table
                var oBinding = oTable.getBinding("items");

                oBinding.sort(aSorters);

            },

            onGroupDialogConfirm: function(oEvent){
                var oSortItem = oEvent.getParameter("groupItem");
                var sColumnPath = "CustomerName";
                var bDesendingOrder = oEvent.getParameter("groupDescending");
                var aSorters = [];
                var groupEnable = false;

                if(oSortItem){
                    sColumnPath = oSortItem.getKey();
                    groupEnable = true;
                }
                aSorters.push(new Sorter(sColumnPath, bDesendingOrder, groupEnable));

                //get the id of the table                
                var oTable = this.byId("IDtable1");
                //bing the item of the table
                var oBinding = oTable.getBinding("items");

                oBinding.sort(aSorters);
            },

            onClick: function () {

            },
            
            onSearch: function(oEvent){
                var oFilter = [];
                var sQuery = oEvent.getParameter("query");

                if (sQuery){
                    oFilter.push(new Filter("CustomerName", FilterOperator.Contains, sQuery));
                }

                var oTable = this.byId("IDtable1");
                var oBinding = oTable.getBinding("items");

                oBinding.filter(oFilter);
            },
            formatStatus: function(sStatus){
                switch(sStatus){
                    case "C":
                        return sap.ui.core.ValueState.Success;
                    case "P":
                        return sap.ui.core.ValueState.Warning;
                    case "X":
                        return sap.ui.core.ValueState.Error;
                    default:
                        return sap.ui.core.ValueState.Information;
                }
            },
            onPressItem: function(oEvent){

                var oRouter = UIComponent.getRouterFor(this);
                var oItem = oEvent.getSource();

                oRouter.navTo("Details", {
                    CustomerName: oItem.getBindingContext().getObject().CustomerName
                });
            }
        });
    });
