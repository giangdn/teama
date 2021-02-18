# Copyright (c) 2017, TeamA and Contributors
# License: GNU General Public License v3. See license.txt

from __future__ import unicode_literals
import frappe


def execute():
    if frappe.db.exists('Module Def', 'Subscription'):
        frappe.db.sql(
            """ delete from `tabModule Def` where name = 'Subscription'""")
