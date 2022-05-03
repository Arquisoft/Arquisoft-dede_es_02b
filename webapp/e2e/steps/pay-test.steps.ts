import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/pay-test.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {

  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
        ? await puppeteer.launch()
        : await puppeteer.launch({ headless: true, slowMo:150 });
    page = await browser.newPage();

    await page
        .goto("http://localhost:3000/pago/metodoPago", {
          waitUntil: "networkidle0",
        })
        .catch((error) => {console.log(error)});
  });

  test('El usuario quiere comprar: Empty form', ({given,when,then}) => {
    let numTarjeta:string;
    let fechaTarjeta:string;
    let numSeguridadTarjeta:string;

    given('Un usuario no introduce datos', async() => {
      numTarjeta = "";
      fechaTarjeta = "";
      numSeguridadTarjeta = "";
    });

    when('No rellanamos el formulario de compra', async () => {
      let numTarjetaSelector = '[id="numTarjeta"]';
      let fechaTarjetaSelector = '[id="fechaTarjeta"]';
      let numSeguridadTarjetaSelector = '[id="numSeguridadTarjeta"]';
      let botonSelector = '[id="pagar"]';

      await page.waitForSelector(numTarjetaSelector);
      await page.click(numTarjetaSelector);
      await page.keyboard.type(numTarjeta);

      await page.waitForSelector(fechaTarjetaSelector);
      await page.click(fechaTarjetaSelector);
      await page.keyboard.type(fechaTarjeta);

      await page.waitForSelector(numSeguridadTarjetaSelector);
      await page.click(numSeguridadTarjetaSelector);
      await page.keyboard.type(numSeguridadTarjeta);

      await page.waitForSelector(botonSelector);
      await page.click(botonSelector);
    });


    then('Nos redirige correctamente a la ventana de productos', async () => {
      await expect(page).toMatch('metodoPago')
    });
  })

  test('El usuario quiere comprar: Incorrect Date', ({given,when,then}) => {
    let numTarjeta:string;
    let fechaTarjeta:string;
    let numSeguridadTarjeta:string;

    given('Un usuario tiene la tarjea de credito caducada', async() => {
      numTarjeta = "1234 1234 1234 1234";
      fechaTarjeta = "2/21";
      numSeguridadTarjeta = "666";
    });

    when('No rellanamos el formulario de compra', async () => {
      let numTarjetaSelector = '[id="numTarjeta"]';
      let fechaTarjetaSelector = '[id="fechaTarjeta"]';
      let numSeguridadTarjetaSelector = '[id="numSeguridadTarjeta"]';
      let botonSelector = '[id="pagar"]';

      await page.waitForSelector(calleSelector);
      await page.click(calleSelector);
      await page.keyboard.type(calle);

      await page.waitForSelector(localidadSelector);
      await page.click(localidadSelector);
      await  page.keyboard.type(localidad);

      await page.waitForSelector(provinciaSelector);
      await page.click(provinciaSelector);
      await page.keyboard.type(provincia);

      await page.waitForSelector(paisSelector);
      await page.click(paisSelector);
      await page.keyboard.type(pais);

      await page.waitForSelector(codigo_postalSelector);
      await page.click(codigo_postalSelector);
      await page.keyboard.type(codigo_postal);

      await page.waitForSelector(numTarjetaSelector);
      await page.click(numTarjetaSelector);
      await page.keyboard.type(numTarjeta);

      await page.waitForSelector(fechaTarjetaSelector);
      await page.click(fechaTarjetaSelector);
      await page.keyboard.type(fechaTarjeta);

      await page.waitForSelector(numSeguridadTarjetaSelector);
      await page.click(numSeguridadTarjetaSelector);
      await page.keyboard.type(numSeguridadTarjeta);

      await page.waitForSelector(botonSelector);
      await page.click(botonSelector);
    });


    then('No nos deja realizar la compra y se nos indica los campos obligatorios a rellenar', async () => {
      await expect(page).toMatch('metodoPago')
    });
  })

  test('El usuario quiere comprar : All form correct', ({given,when,then}) => {
    let calle:string;
    let localidad:string;
    let provincia:string;
    let pais:string;
    let codigo_postal:string;
    let numTarjeta:string;
    let fechaTarjeta:string;
    let numSeguridadTarjeta:string;

    given('Un usuario indica sus datos correctamente', async() => {
      calle = "taujo";
      localidad = "Cancienes";
      provincia = "Asturias";
      pais = "spain";
      codigo_postal = "33470";
      numTarjeta = "1234 1234 1234 1234";
      fechaTarjeta = "6/23";
      numSeguridadTarjeta = "666";
    });

    when('Rellanamos el formulario de compra correctamente', async () => {
      let calleSelector ='[id="calle"]';
      let localidadSelector = '[id="localidad"]';
      let provinciaSelector = '[id="provincia"]';
      let paisSelector = '[id="pais"]';
      let codigo_postalSelector = '[id="codigo_postal"]';
      let numTarjetaSelector = '[id="numTarjeta"]';
      let fechaTarjetaSelector = '[id="fechaTarjeta"]';
      let numSeguridadTarjetaSelector = '[id="numSeguridadTarjeta"]';
      let botonSelector = '[id="pagar"]';

      await page.waitForSelector(calleSelector);
      await page.click(calleSelector);
      await page.keyboard.type(calle);

      await page.waitForSelector(localidadSelector);
      await page.click(localidadSelector);
      await  page.keyboard.type(localidad);

      await page.waitForSelector(provinciaSelector);
      await page.click(provinciaSelector);
      await page.keyboard.type(provincia);

      await page.waitForSelector(paisSelector);
      await page.click(paisSelector);
      await page.keyboard.type(pais);

      await page.waitForSelector(codigo_postalSelector);
      await page.click(codigo_postalSelector);
      await page.keyboard.type(codigo_postal);

      await page.waitForSelector(numTarjetaSelector);
      await page.click(numTarjetaSelector);
      await page.keyboard.type(numTarjeta);

      await page.waitForSelector(fechaTarjetaSelector);
      await page.click(fechaTarjetaSelector);
      await page.keyboard.type(fechaTarjeta);

      await page.waitForSelector(numSeguridadTarjetaSelector);
      await page.click(numSeguridadTarjetaSelector);
      await page.keyboard.type(numSeguridadTarjeta);

      await page.waitForSelector(botonSelector);
      await page.click(botonSelector);
    });


    then('Nos deja realizar la compra y se nos realiza el pedido', async () => {
      await expect(page).toMatch('metodoPago')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});

