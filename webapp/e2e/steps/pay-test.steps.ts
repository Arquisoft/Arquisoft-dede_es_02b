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
        .goto("http://localhost:3000/pago", {
          waitUntil: "networkidle0",
        })
        .catch((error) => {console.log(error)});
  });

  test('The shopping cart is empty', ({given,when,then}) => {
    let email:string;
    let estadoPedido:string;
    let calle:string;
    let localidad:string;
    let provincia:string;
    let pais:string;
    let cp:string;
    let numTarjeta:string;
    let cadTarjeta:string;
    let secTarjeta:string;

    given('An empty cart', async() => {
      email = "uo270457@uniovi.es"
      nombre = "Diego"
      apellidos = "Martinez"
      dni = "7196503K"
      contraseña = "Contraseña"

      let nombreSelector ='[id="nombre"]';
      let apellidosSelector = '[id="apellidos"]';
      let dniSelector = '[id="dni"]';
      let emailSelector = '[id="email"]';
      let contraseñaSelector = '[id="contraseña"]';
      let botonSelector = '[id="registrarse"]';

      await page.waitForSelector(nombreSelector);
      await page.click(nombreSelector);
      await page.keyboard.type(nombre);

      await page.waitForSelector(apellidosSelector);
      await page.click(apellidosSelector);
      await  page.keyboard.type(apellidos);

      await page.waitForSelector(dniSelector);
      await page.click(dniSelector);
      await page.keyboard.type(dni);

      await page.waitForSelector(emailSelector);
      await page.click(emailSelector);
      await page.keyboard.type(email);

      await page.waitForSelector(contraseñaSelector);
      await page.click(contraseñaSelector);
      await page.keyboard.type(contraseña);

      await page.waitForSelector(botonSelector);
      await page.click(botonSelector);
      await expect(page).toMatch('Productos')
    });

    when('I add some products in the cart', async () => {
      let nombreSelector ='[id="addToCart_Mango"]';
      await expect(page).toMatch('Productos')
      await page.click(nombreSelector);

      nombreSelector ='[id="addToCart_Pera"]';
      await page.click(nombreSelector);

      nombreSelector ='[id="addUnit_Sandía"]';
      await page.click(nombreSelector);

      nombreSelector ='[id="addUnit_Sandía"]';
      await page.click(nombreSelector);

      nombreSelector ='[id="addToCart_Sandía"]';
      await page.click(nombreSelector);
    });

    then('The products should appear in the cart window', async () => {
      // await expect(page).toMatch('You have been registered in the system!')
      let nombreSelector ='[id="goToCart"]';
      await page.click(nombreSelector);
      await expect(page).toMatch('Carrito')
      await expect(page).toMatch('Pera');
      await expect(page).toMatch('Sandía');

      await expect(page).toMatch('Total: €7.32')

      nombreSelector ='[id="removeAll_Pera"]';
      await page.click(nombreSelector);
      await expect(page).toMatch('Total: €5.97');

      nombreSelector ='[id="clearCart"]';
      await page.click(nombreSelector);

      await expect(page).toMatch('Total: €0.00');
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});

