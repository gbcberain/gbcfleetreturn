var msg = "";
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/ValidateException",
	"sap/m/MessageBox",
	"fleetreturn/GBC/model/models"
], function (Controller, MessageToast, ValidateException, MessageBox, models) {
	"use strict";

	return Controller.extend("fleetreturn.GBC.controller.Return", {
		onInit: function () {
			debugger;
			//this.getView().byId("idtoempidLabel").setEnabled(false);
			this.getView().byId("idtoempidLabel").setVisible(false);
			this.getView().byId("idToempId").setVisible(false);
			this.getView().byId("idtoempnameLabel").setVisible(false);
			this.getView().byId("idToEmpName").setVisible(false);
				this.getView().byId("idIssueText").setVisible(false);
				this.getView().byId("idTypeIssue").setVisible(false);
				
				var oJsonModel = models.createJsonModel("/model/viewdata.json");
				this.getView().setModel(oJsonModel);
				
				//set json models
			  //  var oJsonData = models.createJsonModel("fleetreturn/GBC/model/viewdata.json");
		},
		onChange: function (oControlEvent) {
			debugger;
			this.selectedKey = oControlEvent.getSource().getSelectedKey();

			if (this.selectedKey === '1') {
				this.getView().byId("idtoempidLabel").setVisible(true);
				this.getView().byId("idToempId").setVisible(true);
				this.getView().byId("idtoempnameLabel").setVisible(true);
				this.getView().byId("idToEmpName").setVisible(true);
				this.getView().byId("idIssueText").setVisible(false);
				this.getView().byId("idTypeIssue").setVisible(false);
			} else if (this.selectedKey === '2' || this.selectedKey === '3') {
				this.getView().byId("idtoempidLabel").setVisible(false);
				this.getView().byId("idToempId").setVisible(false);
				this.getView().byId("idtoempnameLabel").setVisible(false);
				this.getView().byId("idToEmpName").setVisible(false);
				this.getView().byId("idIssueText").setVisible(false);
				this.getView().byId("idTypeIssue").setVisible(false);
				if	(this.selectedKey === '2') {
				this.getView().byId("idIssueText").setVisible(true);
				this.getView().byId("idTypeIssue").setVisible(true);
					
				}
			}

		},

		onSubmit: function (oEvent) {

			debugger;

			this.Pernr = oEvent.getSource().getValue();
			if (this.Pernr !== "") {
				this.getView().byId("idempId").setValueState("None");
				this.getView().byId("idToempId").setValue("");
				this.getView().byId("idToEmpName").setText("");
				this.getView().byId("idEmpName").setText("");
				this.getView().byId("idToempId").setValueState("None");
				//	var empId = this.getView().byId("idempId").getValue();
				var that = this;

				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/empDetailsSet('" + this.Pernr + "')";

				oModel.read(sPath, {
					success: function (oData, response) {
						debugger;
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						that.getView().byId("idEmpName").setText(oData.empName);
						that.getView().byId("idEmpVehicle").setText(oData.Equnr);
						that.getView().byId("idVehPlate").setText(oData.Plate);
						that.vehicle = oData.Equnr;
						if (that.vehicle === "") {
							sap.m.MessageToast.show("No Vehicle Details available for the employee");
						}
						that.getView().byId("idVehDescr").setText(oData.EquDescr);
						//var osf = that.getView().byId("idReturn");
						//osf.setModel(oModel3);
						//var osf1 = that.getView().byId("LeaveApprover");
						//osf1.setModel(oModel3);
					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			} else {
				// sap.m.MessageToast.show("");
				//	MessageBox.alert("Please enter Transferor employee ID");
				this.getView().byId("idempId").setValueState("Error");
				this.getView().byId("idempId").setValueStateText("Enter Transferor employee ID");
				this.getView().byId("idempId").setShowValueStateMessage(true);
				//this.getView().byId("idempId").setValueState("Please enter Transferor employee ID");
			}

		},

		onSubmitTransferor: function (oEvent) {

			debugger;

			var PernrTo = oEvent.getSource().getValue();
			if (PernrTo !== "") {
				if (this.vehicle !== "") {
					if (this.Pernr !== PernrTo) {
						this.getView().byId("idToempId").setValueState("None");
						this.getView().byId("idempId").setValueState("None");
						//	var empId = this.getView().byId("idempId").getValue();
						var that = this;

						var oModel = that.getOwnerComponent().getModel();
						var sPath = "/empDetailsSet('" + PernrTo + "')";

						oModel.read(sPath, {
							success: function (oData, response) {
								debugger;
								//var oModel3 = new sap.ui.model.json.JSONModel(oData);
								that.getView().byId("idToEmpName").setText(oData.empName);
								//that.getView().byId("idEmpVehicle").setText(oData.Equnr);
								//that.getView().byId("idVehDescr").setText(oData.EquDescr);
								//var osf = that.getView().byId("idReturn");
								//osf.setModel(oModel3);
								//var osf1 = that.getView().byId("LeaveApprover");
								//osf1.setModel(oModel3);
							},
							error: function () {

								sap.m.MessageToast.show("No Data retreived");
							}

						});

					} else {
						//sap.m.MessageToast.show("Transferor and Transferee cannot be same");
						this.getView().byId("idempId").setValueState("Error");
						this.getView().byId("idempId").setValueStateText("Transferor and Transferee cannot be same");
						this.getView().byId("idempId").setShowValueStateMessage(true);
						this.getView().byId("idToempId").setValueState("Error");
						this.getView().byId("idToempId").setValueStateText("Transferor and Transferee cannot be same");
						this.getView().byId("idToempId").setShowValueStateMessage(true);
					}
				} else {
					sap.m.MessageToast.show("No Vehicle details found for the entered Transferor");
				}
			} else {
				this.getView().byId("idToempId").setValueState("Error");
				this.getView().byId("idToempId").setValueStateText("Enter Transferee employee ID");
				this.getView().byId("idToempId").setShowValueStateMessage(true);
			}

		},

		onPress: function (oEvent) {
			debugger;
			var iTransferor = this.getView().byId("idempId").getValue();
			var iTransferee = this.getView().byId("idToempId").getValue();
			var iEqunr = this.getView().byId("idEmpVehicle").getText();
			var iTransferType = this.getView().byId("idTransfer").getSelectedKey();
			var iVehicleType = this.getView().byId("idVehicleType").getSelectedKey();
			var iIssueType = this.getView().byId("idTypeIssue").getSelectedKey();
			var iPlate = this.getView().byId("idVehPlate").getText();
			if	( iEqunr != "" ) {
			
			var Entry = {
				Ztransferor: iTransferor,
				Zequnr: iEqunr,
				Ztransferee: iTransferee,
				Ztype: iTransferType,
				Zvehicletype: iVehicleType,
				Zduplicate : "",
				Zrecord : "",
				Zissuetype : iIssueType,
				ZPlate : iPlate
			};

			var that = this;

			var oModel = that.getOwnerComponent().getModel();

			oModel.create("/transferCreateSet",
				Entry, {
					success: function (data) {
						debugger;
						if (data.Zduplicate == 'X') {

							//MessageBox.alert("A Transfer Request is already in process of approval, cannot submit new request");
							//location.reload();
							    
							    msg = "A Transfer Request#" + " " + "'" + data.Zrecord + "'" + " " + "is already in process of approval.\n\ cannot submit a new request";
								MessageBox.error(msg, {
								actions: [sap.m.MessageBox.Action.CLOSE],
								//styleClass: bCompact ? "sapUiSizeCompact" : "",
								onClose: function (sAction) {
									location.reload();
								}
							});

						} else if (data.Zduplicate != 'X') {
							debugger;
							
							msg = "Vehicle Transfer Request#" + " " + data.Zrecord + " " + "Submitted";
							MessageBox.success(msg, {
								actions: [sap.m.MessageBox.Action.CLOSE],
								//styleClass: bCompact ? "sapUiSizeCompact" : "",
								onClose: function (sAction) {
									location.reload();
								}
							});

							//location.reload();
						}
					},
					error: function (oError) {
						debugger;
					//	MessageBox.error("Error while submitting the transfer request. Please try again");
						MessageBox.error("Error while submitting the transfer request. Please try again", {
								actions: [sap.m.MessageBox.Action.CLOSE],
								//styleClass: bCompact ? "sapUiSizeCompact" : "",
								onClose: function (sAction) {
									location.reload();
								}
							});

					}

				});

		} else {
			MessageBox.error("Vehicle ID is blank, request cannot be created", {
								actions: [sap.m.MessageBox.Action.CLOSE],
								//styleClass: bCompact ? "sapUiSizeCompact" : "",
								onClose: function (sAction) {
								//	location.reload();
								}
							});
		}
		}	
	});
});