import { Android, AndroidDevice, Page, expect } from '@playwright/test';

export class TwentyFourMxPage {
    constructor(private page: Page, private device: AndroidDevice) {}

    // Locators
    readonly searchInput = this.page.locator('#search-desktop');
    readonly searchButton = this.page.locator("(//a[@class='autocomplete-item'])[1]");
    readonly categoryHelmets = this.page.locator("//a[@class='m-navigation-link'][normalize-space()='Kaski']")
    readonly crossHelmets = this.page.locator("(//img[@alt='Kask Cross'])[1]")
    readonly openTheHelmetsSizes = this.page.locator("//div[@class='m-select__display']")
    readonly addToCart = this.page.locator(".m-button.m-button--purchase.qa-pdp-add-to-cart-btn.m-button--md")
    readonly checkout = this.page.locator("//a[contains(text(),'Przejdź do kasy')]")
    readonly basket = this.page.locator("//div[@class='m-header-button m-header-button--icon qa-mobile-header-cart']//fa-icon[@class='ng-fa-icon']//*[name()='svg']")
    readonly cashbox =  this.page.locator("(//span[contains(text(),'Przejdź do kasy')])[1]")
    readonly editButton = this.page.locator("(//button[@class='m-button m-button__product-edit m-button--xs m-button--xs--square m-button--navigation--outline qa-edit-remove-btn ng-star-inserted'])[1]")
    readonly removeButton = this.page.locator("//span[contains(text(),'Usuń')]")
    readonly emptyBasket = this.page.locator('//html/body/app-root/p-header/header/div[1]/div[1]/div/p-header-minicart/p-header-minicart-mobile/div/div/div[1]/div/div/div/div[1]')

    async goto() {
        await this.page.goto('https://www.24mx.pl/');
        console.log(await this.page.evaluate(() => window.location.href));
        if (await this.page.getByRole('button',{name:"OK"}).count()>0)
        await this.page.getByRole('button',{name:"OK"}).click()
        await this.page.getByRole('img', {name:'Kaski MX'}).click()
        this.page.waitForLoadState('domcontentloaded')
    }

    // Methods
    async performSearch(query: string) {
        await this.searchInput.fill(query);
        await this.page.waitForLoadState()
        await this.searchButton.click();
        await this.page.waitForLoadState()
    }

    async waitForMainPageLoadState() {
        await this.page.waitForSelector('//*[@id="wrapper"]/div/p-home/div[1]/div[1]/p-cms-dynamic-renderer[1]/p-cms-freestyle/div/div/div/div[1]', {state:'visible'});
        await this.page.waitForLoadState()
    }

    async compareImage(image: string, _clip?:{x: number; y: number; width: number; height: number}|undefined) {
        if(_clip)
            {
                await Promise.all([
                    expect(this.page).toHaveScreenshot(image, {clip: {x:_clip.x, y:_clip.y, height:_clip.height, width:_clip.width}})
                ])
            }
        else
        {
            await Promise.all([expect(this.page).toHaveScreenshot(image)])
        }
        this.page.waitForLoadState()
    }

    async openCategoryHelmetsCross() {
        await this.categoryHelmets.click()
        await this.page.waitForLoadState()
        await this.crossHelmets.click()

    }

    async chooseHelmetbyTitle(name:string){
        await this.page.click(`div[class='m-product-card-img'] img[title='${name}']`);
    }

    async chooseHelmetSize(size:string){
        /**
         * Select Helmet size.
         * @param size - Select size number XS=1, S:2, M:3, L:4, XL:5
         */
        const sizes: { [key: string]: string } = {
            XS: "1",
            S: "2",
            M: "3",
            L: "4",
            XL: "5"
          };
        await this.device.shell('input swipe 10 800 10 10');
        await this.openTheHelmetsSizes.click()
        await this.page.click(`(//div[@class='a-product-variation'])[${sizes[size]}]`)
    }

    async addToCartAndCheckout(){
        await this.addToCart.click()
        await this.checkout.click()
        await this.page.waitForLoadState()
        await this.page.waitForSelector("//div[@class='m-checkout-box m-checkout-box--delivery']//div[@class='m-checkout-box__heading']", {state:'visible'});
        await this.page.waitForLoadState()
    }

    async goToBasket(){
        console.log('Go to basket')
        await this.basket.click()
        this.page.waitForLoadState()
    }

    async goToCashBox(){
        console.log('Go to CashBox')
        await this.cashbox.click()
        this.page.waitForLoadState()
    }

    async check_address_and_contact_details(){
        console.log('Check address and contact details')
        await this.device.shell('input swipe 10 1000 10 10');
        this.page.waitForLoadState()
        await expect(this.page.getByRole('heading', {name:'1. Wybierz opcję dostawy'})).toBeVisible();
        console.log('Checking: 1. Wybierz opcję dostawy')
        await expect(this.page.getByRole('heading', {name:'2. Wybierz metodę płatności'})).toBeVisible();
        console.log('Checking: 2. Wybierz metodę płatności')
        await this.device.shell('input swipe 10 1000 10 10');
        await expect(this.page.getByRole('heading', {name:'3. Wprowadź swój adres i dane kontaktowe'})).toBeVisible();
        console.log('Checking: 3. Wprowadź swój adres i dane kontaktowe')
    }

    async removeFromBasket(){
        await this.editButton.click()
        console.log("Clicked Button: Edytuj")
        this.page.waitForLoadState()
        await this.removeButton.click()
        console.log("Clicked Button: Usuń")
    }

    async checkIfBasketIsEmpty(){
        this.emptyBasket.waitFor()
        this.page.getByText("Twój koszyk jest pusty")
    }
}