import { test, expect } from '@playwright/test';

//The tests run in order!

const user = {
  username: "Vladiic",
  password: "123456"
}
test.describe("Initial test", () => {
  test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000');
  })
  //we isolate the common part of each test!

  test('front page can be opened', async ({ page }) => {

    const locator = page.getByText('log in');
    await expect(locator).toBeVisible()
  })

  test('user can log in ', async ({page}) => {
    await page.getByRole("button", {name: "log in"}).click();
    await page.getByLabel("username").fill("vladko");
    // const textboxes = await page.getByRole('textbox').all()
    // await textboxes[0].fill('mluukkai')
    // await textboxes[1].fill('salainen').  -->> we use this if there is
    //  more than one textbox field with no label
    await page.getByLabel("password").fill("123456j");
    await page.getByRole("button", {name: "submit"}).click();
    await expect(page.getByText("Welcome, ")).toBeVisible();
  } )

  //create a test to fill the log in form with dummy data and verify nothing works
  test('fill with incorrect data', async ({page, request}) => {
    const loginResponse = await request.post("/api/login", {
      data: user
    });
    const { token } = await loginResponse.json();

    await request.delete("/api/delete/all");

    await request.post("/api/notes", {
      data: {
        text: "abc",
        important: true
      },
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  })
})


  // "scripts": {
  //   "start": "cross-env NODE_ENV=production node index.js",
  //   "dev": "cross-env NODE_ENV=development node --watch index.js",
  //   "test": "cross-env NODE_ENV=test node --test",
  //   "lint": "eslint .",
  //   // ...
  //   "start:test": "cross-env NODE_ENV=test node --watch index.js"