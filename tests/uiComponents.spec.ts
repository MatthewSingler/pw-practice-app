import { expect, test } from '@playwright/test'

test.beforeEach(async({page}) => {  //create a new before each hook
    await page.goto('http://localhost:4200/')
})

test.describe('Form Layouts page', () => {  //create the test suite
    test.beforeEach(async ({page}) => {  //
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async ({page}) => {
       const usingTheGridEmailinput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: 'Email'})

       await usingTheGridEmailinput.fill('test@test.com')
       await usingTheGridEmailinput.clear()  //will clear the text from above
       await usingTheGridEmailinput.pressSequentially('testtwo@test.com', {delay: 500}) //will show individual kep strokes

       //generic assertion
       const inputValue = await usingTheGridEmailinput.inputValue() //the input value method will grab the value typed and save it to the new variable
       expect(inputValue).toEqual('testtwo@test.com')  //This is our asertion that the text we epect is there

       //locator assertion
       await expect(usingTheGridEmailinput).toHaveValue('testtwo@test.com') //toHaveText will not work here so we use toHaveValue
    })
})