require('cypress-xpath');
let subtotal = 0;
let subtotalUpdate = 0;
//let subtotalAfterDel = 0;
let price;

describe('Shopping without login', () => {
    it('Shopping without login', () => {
        cy.visit('https://demo.evershop.io/');

        cy.fixture('product').then((data)=>{
            data.forEach((productData) => {
                
                cy.contains(productData.productName).scrollIntoView()
                cy.contains(productData.productName).click()

                //Case 1 choose product from the list
                cy.get('.product-single-name').should('exist')
                cy.get('.sale-price').should('exist')
                cy.get("div[id='product-current-image'] img[alt='"+productData.productName+"']").should('exist').should('exist')
                cy.get('p:nth-child(1)').should('exist')

                //Cek harga
                // cy.get('.sale-price').then(($value) => {
                //     let str = $value.text()
                //     let priceString = str.replace('$', ''); // Replace the '$' symbol with an empty string
                //     let priceFloat = parseFloat(priceString); // Parse the modified string as a float
                //     price = priceFloat;
                //     cy.log(price)
                // })

                //Case 2 Adding multiple items
                cy.xpath("//input[@placeholder='Qty']").clear();
                cy.xpath("//input[@placeholder='Qty']").type(productData.quantity)

                //get size xpath
                getElementByXPath("//a[normalize-space()='"+productData.size+"']").then(($element) => {
                    // Element found, continue with the test
                    cy.xpath("//a[normalize-space()='"+productData.size+"']").click()
                })
                .catch((error) => {
                    // Handle the failure when element doesn't exist or any error occurs
                    cy.log('Size not found within the timeout');
                    // Skip the test or perform other actions as needed
                    cy.log('Skipping the test');
                });

                //get color xpath
                getElementByXPath("//a[normalize-space()='"+productData.color+"']").then(($element) => {
                    // Element found, continue with the test
                    cy.xpath("//a[normalize-space()='"+productData.color+"']").click()
                })
                .catch((error) => {
                    // Handle the failure when element doesn't exist or any error occurs
                    cy.log('Size not found within the timeout');
                    // Skip the test or perform other actions as needed
                    cy.log('Skipping the test');
                });
                cy.wait(1000)
                cy.xpath("//span[normalize-space()='ADD TO CART']").click()
                cy.xpath("//a[@class='logo-icon']//*[name()='svg']").click()
                subtotal = subtotal+(productData.quantity*productData.price);
                cy.log(subtotal);
            })
        })
        cy.xpath("//a[@class='mini-cart-icon']//*[name()='svg']").click()
        cy.get('.text-right').then(($value) => {
            let str = $value.text()
            let str2 = str.replace(',', ''); // Replace the '$' symbol with an empty string
            let priceString = str2.replace('$', ''); // Replace the '$' symbol with an empty string
            let priceFloat = parseFloat(priceString); // Parse the modified string as a float
            price = priceFloat;
            cy.log(price);
            //Cek Subtotal Match
            expect(subtotal).to.equal(price);
        })

        //Case 3 Update Items
        cy.fixture('productUpdate').then((data)=>{
            data.forEach((productData) => {
                cy.xpath("//a[@class='mini-cart-icon']//*[name()='svg']").click()
                cy.contains(productData.productName).scrollIntoView()
                cy.contains(productData.productName).click()

                //Cek element exist
                cy.get('.product-single-name').should('exist')
                cy.get('.sale-price').should('exist')
                cy.get("div[id='product-current-image'] img[alt='"+productData.productName+"']").should('exist').should('exist')
                cy.get('p:nth-child(1)').should('exist')

                //Update quantity
                cy.xpath("//input[@placeholder='Qty']").clear();
                cy.xpath("//input[@placeholder='Qty']").type(productData.quantity)
                //get size xpath
                getElementByXPath("//a[normalize-space()='"+productData.size+"']").then(($element) => {
                    // Element found, continue with the test
                    cy.xpath("//a[normalize-space()='"+productData.size+"']").click()
                })
                .catch((error) => {
                    // Handle the failure when element doesn't exist or any error occurs
                    cy.log('Size not found within the timeout');
                    // Skip the test or perform other actions as needed
                    cy.log('Skipping the test');
                });

                //get color xpath
                getElementByXPath("//a[normalize-space()='"+productData.color+"']").then(($element) => {
                    // Element found, continue with the test
                    cy.xpath("//a[normalize-space()='"+productData.color+"']").click()
                })
                .catch((error) => {
                    // Handle the failure when element doesn't exist or any error occurs
                    cy.log('Size not found within the timeout');
                    // Skip the test or perform other actions as needed
                    cy.log('Skipping the test');
                });

                cy.wait(1000)
                cy.xpath("//span[normalize-space()='ADD TO CART']").click()
                cy.xpath("//a[@class='logo-icon']//*[name()='svg']").click()
                subtotalUpdate = subtotalUpdate+(productData.quantity*productData.price);
            })
        })
        cy.xpath("//a[@class='mini-cart-icon']//*[name()='svg']").click()
        cy.xpath("//div[@class='text-right']").then(($value) => {
            let str = $value.text()
            let str2 = str.replace(',', ''); // Replace the '$' symbol with an empty string
            let priceString = str2.replace('$', ''); // Replace the '$' symbol with an empty string
            let priceFloat = parseFloat(priceString); // Parse the modified string as a float
            price = priceFloat;
            cy.log(price);
            //Cek Subtotal Match
            subtotalUpdate = subtotalUpdate + subtotal;
            expect(subtotalUpdate).to.equal(price);
        })

        //Remove Items
        // cy.fixture('productDelete').then((data)=>{
        //     data.forEach((productData) => {
        //         cy.xpath("//a[@class='mini-cart-icon']//*[name()='svg']").click()
        //         cy.xpath(" //a[normalize-space()='"+productData.productName+"']")
        //         .parents("//tbody/tr[2]/td[1]/div[1]")
        //         .find('Remove')
        //         .click();
        //         subtotalAfterDel = subtotalUpdate+(productData.quantity*productData.price)-subtotalAfterDel;
        //     })
        //     cy.xpath("//div[@class='text-right']").then(($value) => {
        //         let str = $value.text()
        //         let str2 = str.replace(',', ''); // Replace the '$' symbol with an empty string
        //         let priceString = str2.replace('$', ''); // Replace the '$' symbol with an empty string
        //         let priceFloat = parseFloat(priceString); // Parse the modified string as a float
        //         price = priceFloat;
        //         cy.log(price);
        //         //Cek Subtotal Match
        //         expect(subtotalDelete).to.equal(price);
        //     })
        // });
    
        //Case 4 Remove item (without calculated total)
        cy.xpath("//a[@class='mini-cart-icon']//*[name()='svg']").click()
        cy.xpath("//tbody/tr[1]/td[1]/div[1]/div[2]/div[2]/a[1]/span").click()

        //Case 5 Checkout
        cy.xpath("//a[@class='button primary']").click()
        cy.fixture('dataCheckout').then((data)=>{
            data.forEach((userdata)=>{
                cy.xpath("//input[@placeholder='Email']").type(userdata.email)
                cy.contains("Continue to shipping").click()
                cy.xpath("//input[@placeholder='Full name']").type(userdata.fullname)
                cy.xpath("//input[@placeholder='Telephone']").type(userdata.phone)
                cy.xpath("//input[@placeholder='Address']").type(userdata.address)
                cy.xpath("//input[@placeholder='City']").type(userdata.city)
                if(userdata.country == "Algeria"){
                    cy.get('select').select('Algeria').should('have.value', 'DZ')
                }else if(userdata.country == "China"){
                    cy.get('select').select('China').should('have.value', 'CN')
                }else if(userdata.country == "India"){
                    cy.get('select').select('India').should('have.value', 'IN')
                }else if(userdata.country == "US"){
                    cy.get('select').eq(0).select('United States').should('have.value', 'US')
                }
                cy.get('select').eq(1).select('Florida').should('have.value', 'US-FL')
                cy.xpath("//input[@placeholder='Postcode']").type(userdata.postcode)
                cy.get('label[for="method0"] span.radio-unchecked').click();
                //cy.xpath("//span[@class='radio-unchecked']").click({ multiple: true })
                cy.xpath("//button[@type='button']").click()
                cy.wait(3000)
                cy.xpath("//div[@class='checkout-payment checkout-step']//div//div[1]//div[1]//div[1]//div[1]//div[1]//a[1]//*[name()='svg']").click()
                cy.contains("Place Order").click({ force : true });
            })
        })
    })

})

const getElementByXPath = (xpath) => {
    return new Cypress.Promise((resolve, reject) => {
        cy.window().then((win) => {
            const element = win.document.evaluate(xpath, win.document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (element !== null) {
            resolve(element);
            } else {
            reject(new Error('Element not found'));
            }
        });
    });
};

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})