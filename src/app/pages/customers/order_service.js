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

function _add_empty_product_item() {
    return {
        name: '', quantity: 1
    }
}

function create_future_order(customer) {
    var future_order = {};
    future_order.billing_address = {};
    future_order.shipping_address = {};
    angular.copy(customer.default_shipping_address,
        future_order.shipping_address);
    angular.copy(customer.default_billing_address,
        future_order.billing_address);
    future_order.billing_address.customer_name = customer.firstname + "  " + customer.lastname;
    future_order.shipping_address.customer_name = customer.firstname + "  " + customer.lastname;
    future_order.customer_id = customer.id;
    future_order.subtotal = 0;
    future_order.shipping_handling = 0.00;
    future_order.grand_total = 0;
    future_order.status = "pending";
    return future_order;
}




function calcullate_all(future_order, future_products) {
    future_order.subtotal = calculate_total(future_products);
    future_order.grand_total =  future_order.subtotal + future_order.shipping_handling;
    
}