# Copyright (c) 2020, TeamA Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt

from __future__ import unicode_literals
import frappe


def execute():
    frappe.delete_doc("Page", "modules_setup")
