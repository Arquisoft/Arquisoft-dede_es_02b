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

  test('Empty form', ({given,when,then}) => {
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

  test('Incorrect Date', ({given,when,then}) => {
    let numTarjeta:string;
    let fechaTarjeta:string;
    let numSeguridadTarjeta:string;

    given('Un usuario tiene la tarjea de credito caducada', async() => {
      numTarjeta = "1234 1234 1234 123";
      fechaTarjeta = "02/21";
      numSeguridadTarjeta = "666";
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


    then('No nos deja realizar la compra y se nos indica los campos obligatorios a rellenar', async () => {
      await expect(page).toMatch('metodoPago')
    });
  })

  test('All form correct', ({given,when,then}) => {
    let numTarjeta:string;
    let fechaTarjeta:string;
    let numSeguridadTarjeta:string;

    given('Un usuario indica sus datos correctamente', async() => {
      numTarjeta = "1234 1234 1234 1234";
      fechaTarjeta = "06/23";
      numSeguridadTarjeta = "666";
    });

    when('Rellanamos el formulario de compra correctamente', async () => {
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


    then('Nos deja realizar la compra y se nos realiza el pedido', async () => {
      await expect(page).toMatch('metodoPago')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});

