require('cypress-xpath');
//require('fake');

describe('Sign Up', () => {
    it('Positive and Negative Sign Up', () => {
        cy.visit('https://demo.evershop.io/account/register')
        // Generate a fake email
        //const email = fake.internet.email();
        //console.log('Generated Email:', email);

        //Fixture call from data fixture
        cy.fixture('SignUpData').then((data)=>{
            data.forEach((userdata) => {
                if(userdata.SignUpCase == "Positive"){
                    //Case 1 Success login
                    cy.xpath("//input[@placeholder='Full Name']").type(userdata.fullname)
                    cy.xpath("//input[@placeholder='Email']").type(userdata.email)
                    cy.xpath("//input[@placeholder='Password']").type(userdata.password)
                    cy.xpath("//button[@type='button']").click()
                    cy.xpath("//a[@href='/account']//*[name()='svg']").click()
                    cy.xpath("//div[contains(text(),'"+userdata.fullname+"')]").should('exist')
                    cy.xpath("//a[normalize-space()='Logout']").click()
                    cy.wait(3000)
                    cy.xpath("//a[@href='/account/login']//*[name()='svg']").click()
                    cy.xpath("//a[normalize-space()='Create an account']").click()
                }else if(userdata.SignUpCase == "Negative"){
                    //Case 2
                    cy.xpath("//input[@placeholder='Full Name']").type(userdata.fullname)
                    cy.xpath("//input[@placeholder='Email']").type(userdata.email)
                    cy.xpath("//input[@placeholder='Password']").type(userdata.password)
                    cy.xpath("//button[@type='button']").click()
                    cy.xpath("//div[@class='text-critical mb-1']").should('exist')
                }
            });
        })
    });
})