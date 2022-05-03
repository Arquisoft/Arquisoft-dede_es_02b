import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/register-form.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true, slowMo:150 });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000/register", {
        waitUntil: "networkidle0",
      })
      .catch((error) => {console.log(error)});

      jest.setTimeout(10000);
  });

  test('El usuario no esta registrado', ({given,when,then}) => {
    let email:string;
    let nombre:string;
    let apellidos:string;
    let dni:string;
    let contraseña:string;

    given('Un usuario no registrado', async () => {
      email = "newuser@test.com"
      nombre = "new"
      apellidos = "user"
      dni = "12345678z"
      contraseña = "1234"
    });

    when('Rellenamos el formulario de registro', async () => {
      await expect(page).toMatch('Registrarse')

      await expect(page).toFillForm('form[name="registro"]', {
        email: email,
        nombre: nombre,
        apellidos: apellidos,
        dni: dni,
        contraseña: contraseña,
      })

      await expect(page).toClick('button', { text: 'Completar registro' })
      // let nombreSelector ='[id="nombre"]';
      // let apellidosSelector = '[id="apellidos"]';
      // let dniSelector = '[id="dni"]';
      // let emailSelector = '[id="email"]';
      // let contraseñaSelector = '[id="contraseña"]';
      // let botonSelector = '[id="registrarse"]';

      // await page.waitForSelector(nombreSelector);
      // await page.click(nombreSelector);
      // await page.keyboard.type(nombre);

      // await page.waitForSelector(apellidosSelector);
      // await page.click(apellidosSelector);
      // await page.keyboard.type(apellidos);

      // await page.waitForSelector(dniSelector);
      // await page.click(dniSelector);
      // await page.keyboard.type(dni);

      // await page.waitForSelector(emailSelector);
      // await page.click(emailSelector);
      // await page.keyboard.type(email);

      // await page.waitForSelector(contraseñaSelector);
      // await page.click(contraseñaSelector);
      // await page.keyboard.type(contraseña);

      // await page.waitForSelector(botonSelector);
      // await page.click(botonSelector);
    });

    then('Nos redirige correctamente a la ventana de productos', async () => {
      console.log(page.url());
      await expect(page.url()).toMatch('http://localhost:3000/products')
    });
  })

  afterAll(async ()=>{
    
    browser.close()
  })

});

