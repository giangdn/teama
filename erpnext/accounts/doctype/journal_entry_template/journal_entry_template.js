// Copyright (c) 2020, TeamA Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.ui.form.on("Journal Entry Template", {
	setup: function(frm) {
		frappe.model.set_default_values(frm.doc);

		frm.set_query("account", "accounts", function() {
			var filters = {
				company: frm.doc.company,
				is_group: 0
			};

			if (!frm.doc.multi_currency) {
				$.extend(filters, {
					account_currency: frappe.get_doc(
						":Company",
						frm.doc.company
					).default_currency
				});
			}

			return { filters: filters };
		});

		frappe.call({
			type: "GET",
			method:
				"erpnext.accounts.doctype.journal_entry_template.journal_entry_template.get_naming_series",
			callback: function(r) {
				if (r.message) {
					frm.set_df_property(
						"naming_series",
						"options",
						r.message.split("\n")
					);
					frm.set_value("naming_series", r.message.split("\n")[0]);
					frm.refresh_field("naming_series");
				}
			}
		});
	},
	voucher_type: function(frm) {
		var add_accounts = function(doc, r) {
			$.each(r, function(i, d) {
				var row = frappe.model.add_child(
					doc,
					"Journal Entry Template Account",
					"accounts"
				);
				row.account = d.account;
			});
			refresh_field("accounts");
		};

		if (!frm.doc.company) return;

		frm.trigger("clear_child");
		switch (frm.doc.voucher_type) {
			case "Opening Entry":
				frm.set_value("is_opening", "Yes");
				frappe.call({
					type: "GET",
					method:
						"erpnext.accounts.doctype.journal_entry.journal_entry.get_opening_accounts",
					args: {
						company: frm.doc.company
					},
					callback: function(r) {
						if (r.message) {
							add_accounts(frm.doc, r.message);
						}
					}
				});
				break;
			case "Bank Entry":
			case "Cash Entry":
				frappe.call({
					type: "GET",
					method:
						"erpnext.accounts.doctype.journal_entry.journal_entry.get_default_bank_cash_account",
					args: {
						account_type:
							frm.doc.voucher_type == "Bank Entry"
								? "Bank"
								: frm.doc.voucher_type == "Cash Entry"
								? "Cash"
								: null,
						company: frm.doc.company
					},
					callback: function(r) {
						if (r.message) {
							// If default company bank account not set
							if (!$.isEmptyObject(r.message)) {
								add_accounts(frm.doc, [r.message]);
							}
						}
					}
				});
				break;
			default:
				frm.trigger("clear_child");
		}
	},
	clear_child: function(frm) {
		frappe.model.clear_table(frm.doc, "accounts");
		frm.refresh_field("accounts");
	}
});