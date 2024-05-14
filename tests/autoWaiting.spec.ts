import { expect, test } from '@playwright/test'

test.beforeEach( async ({page}) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()

})

test('auto waiting', async ({page}) => {
    const successButton = page.locator('bg-success')
    //await successButton.click()
//or
    //const text = await successButton.textContent()
    //await successButton.waitFor({state: 'attached'}) //returns an array so we need to use .toContain instead of .toEqual 
    //const text = await successButton.allTextContents()
    
    //expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})


})

test('alternative waits', async ({page}) => {
    const successButton = page.locator('.bg-success') //same locator as our starting point

    //wait for element
    //await page.waitForSelector('.bg-success')

    //wait for particular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //wait for network calls to be completed - not recomended
    //await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()  //method does not have an auto wait
    expect(text).toContain('Data loaded with AJAX get request.') //method does not have an auto wait

})