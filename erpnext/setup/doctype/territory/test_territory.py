# Copyright (c) 2020, TeamA Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt
from __future__ import unicode_literals


import frappe
test_records = frappe.get_test_records('Territory')

test_ignore = ["Item Group"]
