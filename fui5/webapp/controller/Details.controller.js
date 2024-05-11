sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/ui/model/Sorter",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History"
],
    /**
     */
    (Controller, MessageToast, JSONModel, Filter, FilterOperator, Fragment, Sorter, UIComponent, History) => {
        "use strict";
        return Controller.extend("fui5.controller.Details", {

            /**
             * @override
             */
            onInit: function() {
                var oRouter = UIComponent.getRouterFor(this);

                oRouter.getRoute("Details").attachPatternMatched(this.onRouteMatched, this);
                
            
            },
            onNavpress: function(){
                var onHistory = History.getInstance();
                var previousPage = onHistory.getPreviousHash();

                if(previousPage !== undefined){
                    window.history.go(-1);
                }else{
                    var oRouter = UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteView1", {}, true);
                }
            },

            onRouteMatched: function(oEvent){
                var sID = oEvent.getParameter("arguments").CustomerName;

                // var sPath = this.getView().getModel().createKey("SalesOrderSet",{
                //     CustomerName: sID
                // });
                // this.getView().bindElement("/"+sPath);
            }
      });
    });