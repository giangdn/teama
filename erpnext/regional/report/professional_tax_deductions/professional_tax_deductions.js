// Copyright (c) 2016, TeamA Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.require(
	"assets/erpnext/js/salary_slip_deductions_report_filters.js",
	function() {
		frappe.query_reports["Professional Tax Deductions"] =
			erpnext.salary_slip_deductions_report_filters;
	}
);
