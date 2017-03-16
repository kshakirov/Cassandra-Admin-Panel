function calculate_total(items) {
    return items.reduce(function (total, item) {
        return total + item.row_total;
    }, 0)
}

function calculate_derived_fields(item) {
    item.subtotal = item.quantity * item.price;
    item.tax_amount = item.tax_percent / 100 * item.price;
    item.row_total = item.subtotal + item.tax_amount - item.discount_amount

}