var shippo = require('shippo')('shippo_test_eb019b0f79848036d9feb06d0dd864499e2ebf56');

module.exports = function (addressTo:object, weight:number) {
    var addressFrom = {

        "name": "Escuela de Ingenieria Informatica",
        "street1": "Calle Valdes Salas",
        "city": "Oviedo",
        "state": "Asturias",
        "zip": "33007",
        "country": "ES"
    };
    var parcel = {

        "length": "5",
        "width": "5",
        "height": "5",
        "distance_unit": "in",
        "weight": weight,
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