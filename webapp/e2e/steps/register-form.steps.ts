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
        nombre: nombre,
        email: email,
        contraseña:contraseña,
        dni:dni,
        apellidos:apellidos
      })
      await expect(page).toClick('button', { text: 'Registrarse'  })
    });

    then('Nos redirige correctamente a la ventana de productos', async () => {
      await new Promise((r) => setTimeout(r, 3000));
    });
  })

  afterAll(async ()=>{
    
    browser.close()
  })

});