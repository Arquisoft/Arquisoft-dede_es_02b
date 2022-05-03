import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/cart-test.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true, slowMo:150 });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000/login", {
        waitUntil: "networkidle0",
      })
      .catch((error) => {console.log(error)});
  });

  test('The shopping cart is empty', ({given,when,then}) => {
    let email:string;
    let nombre:string;
    let apellidos:string;
    let dni:string;
    let contraseña:string;

    given('An empty cart', () => {
      email = "alextests@test.com"
      nombre = "alex"
      apellidos = "caso"
      dni = "12345678n"
      contraseña = "1234"

      let nombreSelector ='[id="nombre"]';
      let apellidosSelector = '[id="apellidos"]';
      let dniSelector = '[id="dni"]';
      let emailSelector = '[id="email"]';
      let contraseñaSelector = '[id="contraseña"]';
      let botonSelector = '[id="registrarse"]';

      page.waitForSelector(nombreSelector);
      page.click(nombreSelector);
      page.keyboard.type(nombre);

      page.waitForSelector(apellidosSelector);
      page.click(apellidosSelector);
      page.keyboard.type(apellidos);

      page.waitForSelector(dniSelector);
      page.click(dniSelector);
      page.keyboard.type(dni);

      page.waitForSelector(emailSelector);
      page.click(emailSelector);
      page.keyboard.type(email);

      page.waitForSelector(contraseñaSelector);
      page.click(contraseñaSelector);
      page.keyboard.type(contraseña);

      page.waitForSelector(botonSelector);
      page.click(botonSelector);
      expect(page).toMatch('Productos')
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

