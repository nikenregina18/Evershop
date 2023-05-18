import 'cypress-xpath';

describe('Sign Up', () => {
    it('Positive and Negative Sign Up', () => {
        cy.visit('https://demo.evershop.io/account/login')
        //Fixture call from data fixture
        cy.fixture('SignInData').then((data)=>{
            data.forEach((userdata) => {
                if(userdata.SignInCase == "Positive"){
                    //Case 1
                    cy.xpath("//input[@placeholder='Email']").type(userdata.email)
                    cy.xpath("//input[@placeholder='Password']").type(userdata.password)
                    cy.xpath("//button[@type='submit']").click()
                    cy.xpath("//a[@href='/account']//*[name()='svg']").click()
                    cy.xpath("//div[contains(text(),'"+userdata.email+"')]").should('exist')
                    cy.xpath("//a[normalize-space()='Logout']").click()
                    cy.wait(3000)
                    cy.xpath("//a[@href='/account/login']//*[name()='svg']").click()
                }else if(userdata.SignInCase == "Negative"){
                    //Case 2
                    cy.xpath("//input[@placeholder='Email']").type(userdata.email)
                    cy.xpath("//input[@placeholder='Password']").type(userdata.password)
                    cy.xpath("//button[@type='submit']").click()
                    cy.xpath("//div[@class='text-critical mb-1']").should('exist')
                }
            });
        })
    });
})