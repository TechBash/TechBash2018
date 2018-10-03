var DiscountType;
(function (DiscountType) {
    DiscountType[DiscountType["None"] = 0] = "None";
    DiscountType[DiscountType["TenPercentOff"] = 1] = "TenPercentOff";
    DiscountType[DiscountType["BOGO"] = 2] = "BOGO";
    DiscountType[DiscountType["TwentyPercentOff"] = 3] = "TwentyPercentOff";
})(DiscountType || (DiscountType = {}));
var Item = /** @class */ (function () {
    function Item(SKU, Quantity, Price, Discount) {
        this.SKU = SKU;
        this.Quantity = Quantity;
        this.Price = Price;
        this.Discount = Discount;
    }
    return Item;
}());
var Order = /** @class */ (function () {
    function Order() {
        this.Items = [];
    }
    Order.prototype.addItem = function (item) {
        this.Items.push(item);
    };
    Order.prototype.totalAmount = function () {
        var total = 0;
        this.Items.forEach(function (item) {
            switch (item.Discount) {
                case DiscountType.None: {
                    total = total + item.Quantity * item.Price;
                    break;
                }
                case DiscountType.TenPercentOff: {
                    total = total + item.Quantity * 0.9 * item.Price;
                    break;
                }
                case DiscountType.BOGO: {
                    total = total + item.Quantity * item.Price;
                    item.Quantity = item.Quantity * 2;
                    break;
                }
                case DiscountType.TwentyPercentOff: {
                    total = total + item.Quantity * 0.8 * item.Price;
                    break;
                }
                // More to come!!!
            }
        });
        return total;
    };
    return Order;
}());
var myOrder = new Order;
myOrder.addItem(new Item('Adult General Admission', 2, 10.00, DiscountType.None));
myOrder.addItem(new Item('Child General Admission', 2, 10.00, DiscountType.BOGO));
myOrder.addItem(new Item('Senior General Admission', 2, 10.00, DiscountType.TenPercentOff));
myOrder.addItem(new Item('Guys Named Nick General Admission', 2, 10.00, DiscountType.None));
console.log(myOrder.totalAmount);
