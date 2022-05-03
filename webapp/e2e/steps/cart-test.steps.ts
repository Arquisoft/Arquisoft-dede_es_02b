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
    let contraseña:string;

    given('An empty cart', () => {
      email = "newuser@test.com"
      contraseña = "1234"

      expect(page).toMatch('Inicia sesión')
      expect(page).toFillForm('form[name="login"]', {
        contraseña: contraseña,
        email: email,
      })
      expect(page).toClick('button', { text: 'Iniciar sesión' })

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

