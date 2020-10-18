/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"fleetreturn/GBC/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"fleetreturn/GBC/test/integration/pages/Return",
	"fleetreturn/GBC/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "fleetreturn.GBC.view.",
		autoWait: true
	});
});