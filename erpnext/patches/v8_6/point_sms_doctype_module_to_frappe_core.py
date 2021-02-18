# Copyright (c) 2017, TeamA and Contributors
# License: GNU General Public License v3. See license.txt

from __future__ import unicode_literals
import frappe


def execute():
    frappe.db.sql('''UPDATE `tabDocType` SET module="Core" 
				WHERE name IN ("SMS Parameter", "SMS Settings");''')
