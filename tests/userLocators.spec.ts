import { test } from '@playwright/test'

test.beforeEach( async ({page}) => {
    await page.goto('http://localhost:4200')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

})

test('Locator syntax rules', async ({page}) => {
    //by tag name
    page.locator('input')

    //by id
    await page.locator('#inputEmail').click()

    //by class
    page.locator('.shape-rectangle')

    //by attribute
    page.locator('[placeholder-"Email"]')

    //by entire class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //by combining different selectors
    
    //by partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using")')

})

test('User facing locators', async ({page}) => {
    await page.getByRole('textbox', {name: 'Email'}).first().click()
    await page.getByRole('button', {name: "Sign In"}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using The Grid').click()

    //await page.getByTitle('IoT Dashboard').click()

    await page.getByTestId('Sign In').click()
})

test('locating chid elements', async ({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    //can mix locators to find specific elements. Usualy avoid first or last etc
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

    //can use index of elements. Not preferred
    await page.locator('nb-card').nth(3).getByRole('button').click()
})

//Using parent elements to locate child elements
test ('Parent elements', async ({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: 'Email'}).click()
})