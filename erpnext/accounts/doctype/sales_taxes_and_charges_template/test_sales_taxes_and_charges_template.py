# -*- coding: utf-8 -*-
# Copyright (c) 2020, TeamA Technologies Pvt. Ltd. and Contributors and Contributors
# See license.txt
from __future__ import unicode_literals

import frappe
import unittest

test_records = frappe.get_test_records('Sales Taxes and Charges Template')


class TestSalesTaxesandChargesTemplate(unittest.TestCase):
    pass