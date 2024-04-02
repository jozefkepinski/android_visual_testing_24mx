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
    await page.getByRole('img',{name:"Kask Cross Raven Airborne Evo Czarny"}).click()
    // await device.scroll("android.view.View","down",50)
    await device.shell('input swipe 10 1000 10 10');
    //await device.input.swipe({x:1, y:1},[{ x: 1, y:10 },{ x: 1, y: 80}],2)
    await page.screenshot({path:'tests/screenshots/' + 'debug.png'});
    await page.click("//div[@class='m-select__display']");
    await page.click("(//div[@class='a-product-variation'])[3]");
    await page.click(".m-button.m-button--purchase.qa-pdp-add-to-cart-btn.m-button--md");
    await page.click("//a[contains(text(),'Przejdź do kasy')]");
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector("//div[@class='m-checkout-box m-checkout-box--delivery']//div[@class='m-checkout-box__heading']");
    await page.waitForTimeout(2000);
    await Promise.all([
        expect(page).toHaveScreenshot('/screenshots/koszyk.png', {clip: {x:0, y:0, height:224, width:514}})
    ])

    // test('Usunięcie produktu z koszyka', async () => {
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
    //     await page.getByRole('img',{name:"Kask Cross Raven Airborne Evo Czarny"}).click()
    //     // await device.scroll("android.view.View","down",50)
    //     await device.shell('input swipe 10 1000 10 10');
    //     //await device.input.swipe({x:1, y:1},[{ x: 1, y:10 },{ x: 1, y: 80}],2)
    //     await page.screenshot({path:'tests/screenshots/' + 'debug.png'});
    //     await page.click("//div[@class='m-select__display']");
    //     await page.click("(//div[@class='a-product-variation'])[3]");
    //     await page.click(".m-button.m-button--purchase.qa-pdp-add-to-cart-btn.m-button--md");
    //     await page.click("//a[contains(text(),'Przejdź do kasy')]");
    //     await page.waitForLoadState('domcontentloaded');
    //     await page.waitForSelector("//div[@class='m-checkout-box m-checkout-box--delivery']//div[@class='m-checkout-box__heading']");
    //     await page.waitForTimeout(2000);
    //     await Promise.all([
    //         expect(page).toHaveScreenshot('/screenshots/koszyk.png', {clip: {x:0, y:0, height:224, width:514}})
    //     ])
});

