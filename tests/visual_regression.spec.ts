import { _android as android } from "playwright";
import {test, expect, _android}   from "@playwright/test";
import { text } from "stream/consumers";


// test('Add product to basket', async () => {
//     const [device] = await android.devices();
//     console.log(`Model: ${device.model()}`);
//     console.log(`Serial: ${device.serial()}`);

//     // Before actions
//     await device.shell('pm clear com.android.chrome');
//     await device.shell('am set-debug-app --persistent com.android.chrome');
//     // Take screenshot of the whole device.
//     await device.screenshot({path:'tests/screenshots/' + 'debug.png'});

//     // Launch Chrome browser.
//     await device.shell('am force-stop com.android.chrome');
//     const context = await device.launchBrowser();

//     // Use BrowserContext as usual.
//     const page = await context.newPage();
//     await page.goto('https://www.24mx.pl/');
//     console.log(await page.evaluate(() => window.location.href));
//     if (await page.getByRole('button',{name:"OK"}).count()>0)
//         await page.getByRole('button',{name:"OK"}).click()
//     await page.getByRole('img', {name:'Kaski MX'}).click()
//     page.waitForLoadState('domcontentloaded')
//     // await page.getByRole('img',{name:"Kask Cross Raven Airborne Evo Czarny"}).click()
//     page.click("(//img[@title='Kask Cross Raven Airborne Evo Czarny'])[1]");
//     await device.shell('input swipe 10 800 10 10');
//     await page.screenshot({path:'tests/screenshots/' + 'debug.png'});
//     await page.click("//div[@class='m-select__display']");
//     await page.click("(//div[@class='a-product-variation'])[3]");
//     await page.click(".m-button.m-button--purchase.qa-pdp-add-to-cart-btn.m-button--md");
//     page.waitForLoadState('domcontentloaded')
//     await page.click("//a[contains(text(),'Przejdź do kasy')]");
//     await page.waitForLoadState('domcontentloaded');
//     await page.waitForSelector("//div[@class='m-checkout-box m-checkout-box--delivery']//div[@class='m-checkout-box__heading']");
//     await Promise.all([
//         expect(page).toHaveScreenshot('/screenshots/koszyk.png', {clip: {x:0, y:0, height:224, width:514}})
//     ])
//     // Go to basket
//     page.waitForLoadState()
//     await page.click("//div[@class='m-header-button m-header-button--icon qa-mobile-header-cart']//fa-icon[@class='ng-fa-icon']//*[name()='svg']");
//     // Proceed to checkout
//     console.log('Proceed to checkout')
//     page.waitForLoadState()
//     // await page.click("//button[@class='m-button m-button--purchase m-button--minicart qa-proceed-to-checkout-button']")
//     await page.click("(//span[contains(text(),'Przejdź do kasy')])[1]");
//     console.log("Clicked Button: Przejdz do kasy")
//     // check address and contact details
//     console.log('Check address and contact details')
//     page.waitForLoadState()
//     await device.shell('input swipe 10 1000 10 10');
//     page.waitForLoadState()
//     await expect(page.getByRole('heading', {name:'1. Wybierz opcję dostawy'})).toBeVisible();
//     console.log('Checking: 1. Wybierz opcję dostawy')
//     await expect(page.getByRole('heading', {name:'2. Wybierz metodę płatności'})).toBeVisible();
//     console.log('Checking: 2. Wybierz metodę płatności')
//     await device.shell('input swipe 10 1000 10 10');
//     await expect(page.getByRole('heading', {name:'3. Wprowadź swój adres i dane kontaktowe'})).toBeVisible();
//     console.log('Checking: 3. Wprowadź swój adres i dane kontaktowe')
    
// });

test('Remove product from basket', async () => {
    const [device] = await android.devices();
    console.log(`Model: ${device.model()}`);
    console.log(`Serial: ${device.serial()}`);

    // Before actions
    await device.shell('pm clear com.android.chrome');
    await device.shell('am set-debug-app --persistent com.android.chrome');
    // Take screenshot of the whole device.
    await device.screenshot({path:'tests/screenshots/' + 'debug.png'});

    // Launch Chrome browser.
    await device.shell('am force-stop com.android.chrome');
    const context = await device.launchBrowser();

    // Use BrowserContext as usual.
    const page = await context.newPage();
    await page.goto('https://www.24mx.pl/');
    console.log(await page.evaluate(() => window.location.href));
    if (await page.getByRole('button',{name:"OK"}).count()>0)
        await page.getByRole('button',{name:"OK"}).click()
    await page.getByRole('img', {name:'Kaski MX'}).click()
    page.waitForLoadState('domcontentloaded')
    // await page.getByRole('img',{name:"Kask Cross Raven Airborne Evo Czarny"}).click()
    page.click("(//img[@title='Kask Cross Raven Airborne Evo Czarny'])[1]");
    await device.shell('input swipe 10 800 10 10');
    await page.screenshot({path:'tests/screenshots/' + 'debug.png'});
    await page.click("//div[@class='m-select__display']");
    await page.click("(//div[@class='a-product-variation'])[3]");
    await page.click(".m-button.m-button--purchase.qa-pdp-add-to-cart-btn.m-button--md");
    page.waitForLoadState('domcontentloaded')
    await page.click("//a[contains(text(),'Przejdź do kasy')]");
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector("//div[@class='m-checkout-box m-checkout-box--delivery']//div[@class='m-checkout-box__heading']");
    await Promise.all([
        expect(page).toHaveScreenshot('/screenshots/koszyk.png', {clip: {x:0, y:0, height:224, width:514}})
    ])
    // Go to basket
    page.waitForLoadState()
    await page.click("//div[@class='m-header-button m-header-button--icon qa-mobile-header-cart']//fa-icon[@class='ng-fa-icon']//*[name()='svg']");
    // Proceed to checkout
    console.log('Proceed to checkout')
    page.waitForLoadState()
    await page.click("(//button[@class='m-button m-button__product-edit m-button--xs m-button--xs--square m-button--navigation--outline qa-edit-remove-btn ng-star-inserted'])[1]");
    // await page.getByRole('button', {name:"Edytuj"}).click()
    console.log("Clicked Button: Edytuj")
    page.waitForLoadState()
    await page.click("//span[contains(text(),'Usuń')]");
    console.log("Clicked Button: Usuń")
    await page.waitForSelector('//html/body/app-root/p-header/header/div[1]/div[1]/div/p-header-minicart/p-header-minicart-mobile/div/div/div[1]/div/div/div/div[1]')
    await page.getByText("Twój koszyk jest pusty")
    
});

