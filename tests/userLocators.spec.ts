import { expect, test } from '@playwright/test'

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
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: 'Email'}).click()
    await page.locator('nb-card').filter({hasText: "Basic Form"}).getByRole('textbox', {name: 'Email'}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: 'Email'}).click()
    
})

test('reusable locators', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: 'Password'}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect (emailField).toHaveValue('test@test.com')
})

test('extracting values', async ({page}) => {
    //single text value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})

    const buttonText = await basicForm.locator('button').textContent()
    expect (buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonText = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonText).toContain('Option 1')

    //input value
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    //attribute value
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual(('Email'))
})