import { _android as android } from "playwright";
import {test, expect, _android}   from "@playwright/test";
import { text } from "stream/consumers";


test('Add product to basket', async () => {
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
    await page.getByRole('img',{name:"Kask Cross Raven Airborne Evo Czarny"}).click()
    // await device.scroll("android.view.View","down",50)
    await device.shell('input swipe 10 800 10 10');
    //await device.input.swipe({x:1, y:1},[{ x: 1, y:10 },{ x: 1, y: 80}],2)
    await page.screenshot({path:'tests/screenshots/' + 'debug.png'});
    await page.click("//div[@class='m-select__display']");
    await page.click("(//div[@class='a-product-variation'])[3]");
    await page.click(".m-button.m-button--purchase.qa-pdp-add-to-cart-btn.m-button--md");
    //await page.waitForTimeout(5000);
    page.waitForLoadState('domcontentloaded')
    await page.click("//a[contains(text(),'Przejdź do kasy')]");
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector("//div[@class='m-checkout-box m-checkout-box--delivery']//div[@class='m-checkout-box__heading']");
    // await Promise.all([
    //     expect(page).toHaveScreenshot('/screenshots/koszyk.png', {clip: {x:0, y:0, height:224, width:514}})
    // ])
    // Go to basket
    //await page.waitForTimeout(5000);
    page.waitForLoadState('domcontentloaded')
    await page.click("//div[@class='m-header-button m-header-button--icon qa-mobile-header-cart']//fa-icon[@class='ng-fa-icon']//*[name()='svg']");
    // Proceed to checkout
    page.waitForLoadState('domcontentloaded')
    await page.click("//button[@class='m-button m-button--purchase m-button--minicart qa-proceed-to-checkout-button']")
    // check address and contact details
    await device.shell('input swipe 10 1000 10 10');
    page.waitForLoadState('domcontentloaded')
    await expect(page.getByRole('heading', {name:'1. Wybierz opcję dostawy'})).toBeVisible();
    //await expect(page.getByLabel('Twój adres email')).toBeVisible();
    
});

// test('Remove product to basket', async ({page}) => {
//     const [device] = await android.devices();
//     console.log(`Model: ${device.model()}`);
//     console.log(`Serial: ${device.serial()}`);

//     // Before actions
//     // await device.shell('pm clear com.android.chrome');
//     // await device.shell('am set-debug-app --persistent com.android.chrome');
//     // Take screenshot of the whole device.
//     await device.screenshot({path:'tests/screenshots/' + 'debug.png'});

//     // Launch Chrome browser.
//     // await device.shell('am force-stop com.android.chrome');
//     // const context = await device.launchBrowser();

//     // Use BrowserContext as usual.
//     // const page = await context.newPage();
//     // await page.goto('https://www.24mx.pl/');
//     console.log(await page.evaluate(() => window.location.href));
//     if (await page.getByRole('button',{name:"OK"}).count()>0)
//         await page.getByRole('button',{name:"OK"}).click()

//     // Go to basket
//     await page.click("//div[@class='minicart-icon']//fa-icon[@class='ng-fa-icon']//*[name()='svg']");
//     //await page.getByRole('button',{name:'svg'}).click()
    
    
// });

