import { _android as android } from "playwright";
import {test, _android}   from "@playwright/test";
import { TwentyFourMxPage } from './24mx_pom.page';

const percySnapshot = require('@percy/playwright');
test('Add product to basket', async () => {
    const [device] = await android.devices();
    console.log(`Model: ${device.model()}`);
    console.log(`Serial: ${device.serial()}`);

    // Before actions
    await device.shell('pm clear com.android.chrome');
    await device.shell('am set-debug-app --persistent com.android.chrome');

    //Launch Chrome browser.
    await device.shell('am force-stop com.android.chrome');
    const context = await device.launchBrowser();

    const page = await context.newPage();
    const twentyFourMxPage = new TwentyFourMxPage(page, device);
    await twentyFourMxPage.goto()
    await twentyFourMxPage.chooseHelmetbyTitle("Kask Cross Raven Airborne Evo Czarny")
    await twentyFourMxPage.chooseHelmetSize('M')
    await twentyFourMxPage.addToCartAndCheckout()
    await percySnapshot(page, 'android_koszyk.png');
    await twentyFourMxPage.compareImage('/screenshots/koszyk.png', {x:0, y:0, height:224, width:514})
    twentyFourMxPage.goToBasket()
    twentyFourMxPage.goToCashBox()
    twentyFourMxPage.check_address_and_contact_details()
});

test('Remove product from basket', async () => {
    const [device] = await android.devices();
    console.log(`Model: ${device.model()}`);
    console.log(`Serial: ${device.serial()}`);

    // Before actions
    await device.shell('pm clear com.android.chrome');
    await device.shell('am set-debug-app --persistent com.android.chrome');

    // Launch Chrome browser.
    await device.shell('am force-stop com.android.chrome');
    const context = await device.launchBrowser();

    // Use BrowserContext as usual.
    const page = await context.newPage();
    const twentyFourMxPage = new TwentyFourMxPage(page, device);
    await twentyFourMxPage.goto()
    await twentyFourMxPage.chooseHelmetbyTitle("Kask Cross Raven Airborne Evo Czarny")
    await twentyFourMxPage.chooseHelmetSize('M')
    await twentyFourMxPage.addToCartAndCheckout()
    await percySnapshot(page, 'android_pusty_koszyk.png');
    await twentyFourMxPage.compareImage('/screenshots/koszyk.png', {x:0, y:0, height:224, width:514})
    twentyFourMxPage.goToBasket()
    twentyFourMxPage.removeFromBasket()
    twentyFourMxPage.checkIfBasketIsEmpty()
});

