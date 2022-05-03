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

  afterAll(async ()=>{
    browser.close()
  })

});

