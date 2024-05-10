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
    page.locator('input[placeholder="Email"].shape-rectangle')

    //by partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using")')

})