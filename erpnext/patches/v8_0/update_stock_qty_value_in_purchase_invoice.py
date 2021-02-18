# Copyright (c) 2017, TeamA and Contributors
# License: GNU General Public License v3. See license.txt

from __future__ import unicode_literals
import frappe


def execute():
    frappe.reload_doc('accounts', 'doctype', 'purchase_invoice_item')
    frappe.db.sql(
        "update `tabPurchase Invoice Item` set stock_qty = qty, stock_uom = uom")
