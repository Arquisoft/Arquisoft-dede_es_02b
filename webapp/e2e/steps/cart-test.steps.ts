import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/cart-test.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true});
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000/login", {
        waitUntil: "networkidle0",
      })
      .catch((error) => {console.log(error)});
  });

  test('The shopping cart is empty', ({given,when,then}) => {
    jest.setTimeout(1800000);
    let email:string;
    let contraseña:string;

    given('An empty cart', async() => {
      email = "adrian@email.com"
      contraseña = "1234"
    });

    when('I add some products in the cart', async () => { 
      await expect(page).toFillForm('form[name="login"]', {
        contraseña: contraseña,
        email: email,
      })
      await expect(page).toClick('button', { text: 'Iniciar sesión' })
    });

    then('The products should appear in the cart window', async () => {
      await expect(page).toMatch('mango')
      
      let botonSandiaSelector ='[aria-label="addunit_mango"]';
      let botonSandiaSelector2 = '[aria-label="addtocart_mango"]';

      await page.waitForSelector(botonSandiaSelector);
      await page.click(botonSandiaSelector);
      await page.click(botonSandiaSelector);

      await page.waitForSelector(botonSandiaSelector2);
      await page.click(botonSandiaSelector2);

      let nombreSelector ='[id="goToCart"]';
      await page.click(nombreSelector); 
      await expect(page).toMatch('Carrito')
      await expect(page).toMatch('mango');

      nombreSelector ='[id="clearCart"]';
      await page.click(nombreSelector);  
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});

