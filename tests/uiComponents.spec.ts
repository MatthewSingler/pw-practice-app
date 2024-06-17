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

    test('radio butons', async ({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})

        //await usingTheGridForm.getByLabel('Option 1').check({force: true})
        await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force: true})

        //generic assertion
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()
        expect(radioStatus).toBeTruthy()
        //locator assertion
        await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()

        await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true})
        expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeFalsy()
        expect(await usingTheGridForm.getByRole('radio', {name: "Option 2"})).toBeTruthy()



    })
})

test('checkboxes', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()
    await page.getByRole('checkbox', {name: "Hide on click"}).click({force: true}) //b/c it is visually hidden we need the force flag

    const allCheckBoxes = page.getByRole('checkbox')
    for(const box of await allCheckBoxes.all()){
        await box.check({force: true})
        expect(await box.isChecked()).toBeTruthy()
    }
})

test('lists and dropdowns', async ({page}) => {
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list') //Can use when there is a UL tage
    page.getByRole('listitem') //can use when there is a LI tag. This will provide an array of the entire list so we can find the list item we want

    //const optionList = page.getByRole('list').locator('nb-option') //This is ok
    const optionList = page.locator('nb-option-list nb-option') //This is a little better b/c it is compact and uses the parent and child
    await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate']) //The array is expected b/c we selected nb-option in the locator and that provides the entire list
    await optionList.filter({hasText: 'Cosmic'}).click()
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        "Light": 'rgb(255, 255, 255)',
        "Dark": 'rgb(34, 43, 69)',
        "Cosmic": 'rgb(50, 50, 89)',
        "Corporate": 'rgb(255, 255, 255)'
    }
    await dropDownMenu.click()
    for (const color in colors){
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if(color != 'Corporate')
            await dropDownMenu.click()
    }
})