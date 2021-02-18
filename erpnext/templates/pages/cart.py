# Copyright (c) 2020, TeamA Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt
from __future__ import unicode_literals
from erpnext.shopping_cart.cart import get_cart_quotation
import frappe

no_cache = 1


def get_context(context):
    context.update(get_cart_quotation())
