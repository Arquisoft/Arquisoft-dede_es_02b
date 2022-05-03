import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/login-form.feature');

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
      jest.setTimeout(1000000);
  });

  test('The user is not logged in the site', ({given,when,then}) => {
    jest.setTimeout(100000);
    let email:string;
    let contraseña:string;

    given('An registered user', () => {
      email = "newuser@test.com"
      contraseña = "1234"
    });

    when('I fill the data in the form and press submit', async () => {
      await expect(page).toMatch('Inicia sesión')
      await expect(page).toFillForm('form[name="login"]', {
        contraseña: contraseña,
        email: email,
      })
      await expect(page).toClick('button', { text: 'Iniciar sesión' })
    });

    then('The products page should be shown', async () => {
      // await expect(page).toMatch('You have been registered in the system!')
      await new Promise((r) => setTimeout(r, 3000));
      await expect(page).toMatch('Productos')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});

