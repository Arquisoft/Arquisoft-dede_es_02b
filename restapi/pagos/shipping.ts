var shippo = require('shippo')('shippo_test_355d87774e04e4982391ff93e7d7e3293f99f42e');

module.exports = function (addressTo:object) {
    var addressFrom = {

        "name": "Shawn Ippotle",
        "street1": "215 Clayton St.",
        "city": "San Francisco",
        "state": "CA",
        "zip": "94117",
        "country": "US"
    };
    var parcel = {

        "length": "5",
        "width": "5",
        "height": "5",
        "distance_unit": "in",
        "weight": 2,
        "mass_unit": "lb"
    };
    return shippo.shipment.create({
        "address_from": addressFrom,
        "address_to": addressTo,
        "parcels": [parcel],
        "async": true
    }).then ((shipment: any, err : any) => {
        if (err != null)
            console.log("Ha ocurrido un error al calcular los gastos de envio: " + err);
        return shipment?.rates[0].amount;
    });
}