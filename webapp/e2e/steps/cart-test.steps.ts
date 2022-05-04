import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/cart-test.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()//{userDataDir: '/tmp/myChromeSession'}
      : await puppeteer.launch({ headless: true, slowMo:150});
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000/login", {
        waitUntil: "networkidle0",
      })
      .catch((error) => {console.log(error)});
      jest.setTimeout(1000000);
  });

  test('The shopping cart is empty', ({given,when,then}) => {
    jest.setTimeout(100000);
    let email:string;
    let contraseña:string;

    given('An empty cart', async() => {
      email = "adrian@email.com"
      contraseña = "1234"
      
    });

    when('I add some products in the cart', async () => { 
      await expect(page).toMatch('Inicia sesión')
      await expect(page).toFillForm('form[name="login"]', {
        contraseña: contraseña,
        email: email,
      })
      await expect(page).toClick('button', { text: 'Iniciar sesión' })
    });

    then('The products should appear in the cart window', async () => {
      // await expect(page).toMatch('You have been registered in the system!')
      await new Promise((r) => setTimeout(r, 3000));
      await expect(page).toMatch('Productos')

      await expect(page).toMatch('manzana reineta')
      await expect(page).toMatch('mango')
      
      let botonSandiaSelector ='[aria-label="addunit_mango"]';
      let botonSandiaSelector2 = '[aria-label="addtocart_mango"]';

      await page.waitForSelector(botonSandiaSelector);
      await page.click(botonSandiaSelector);

      await page.waitForSelector(botonSandiaSelector);
      await page.click(botonSandiaSelector);

      await page.waitForSelector(botonSandiaSelector2);
      await page.click(botonSandiaSelector2);


      console.log("estamos en el carrito")
      let nombreSelector ='[id="goToCart"]';
      await page.click(nombreSelector);  
      await new Promise((r) => setTimeout(r, 3000)); 
      console.log(await page.url())
      await expect(page).toMatch('Carrito')
      await expect(page).toMatch('mango');

      await expect(page).toMatch('Total: €10')

      nombreSelector ='[id="clearCart"]';
      await page.click(nombreSelector);  

      await expect(page).toMatch('Total: €0.00');
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});

