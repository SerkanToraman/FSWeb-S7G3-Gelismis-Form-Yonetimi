describe('first test', () => {
  it('local host 3000 works', () => {
    cy.visit('http://localhost:3000/')
  })
});

describe('new person buton', () => {
  it('/person opens and 4 inputs are visible when clicked', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-cy="newPersonBtn"]').click()
    cy.get("Input").should("have.length", 4)
  })
 
});


const passinName = "Serkan";
const failingName = "Al";
const passingEmail ="serkan@hotmail.com";
const failingEmail = "serkanhotmail.com";
const passingPassword = "2023WITech";
const failingPassword = "20T"


describe(' Prson Testler', () => { 
  beforeEach(() =>{
    cy.visit('http://localhost:3000/')
    cy.get('[data-cy="newPersonBtn"]').click()
    //Axios'dan asynch sorunu olursa b'raz beklemesi icin 
    //cy.wait(1000);
  })


 it('the save button is disabled since the form data is empty', () =>{
  cy.get('[data-cy="newPersonSaveBtn"]').should("be.disabled")
})

it('when all tha form data entered - button not disabled?', () =>{
  cy.get('[data-cy="newPersonSaveName"]').type(passinName)
  cy.get('[data-cy="newPersonSaveEmail"]').type(passingEmail)
  cy.get('[data-cy="newPersonSavePassword"]').type(passingPassword)
   cy.get('[data-cy="newPersonSaveTerms"]').check()
   cy.get('[data-cy="newPersonSaveBtn"]').should("not.be.disabled")
})
it('If entered failing name, name error shown and error text correct?', () =>{
  cy.get('[data-cy="newPersonSaveName"]').type(failingName)
   cy.get('[data-cy="Error"]').should("have.length",1).should("contain",'Minimum 3 karakter olmali')
})

it('If entered  passingname and failing email - email error shown and email error text correct?', () =>{
  cy.get('[data-cy="newPersonSaveName"]').type(passinName)
  cy.get('[data-cy="newPersonSaveEmail"]').type(failingEmail)
   cy.get('[data-cy="Error"]').should("have.length",1).should("contain",'Geçerli bir e-mail gerekli')
})

it('If entered  passingname and then deleted- name error shown and name error text correct?', () =>{
  cy.get('[data-cy="newPersonSaveName"]').type(passinName).clear()
   cy.get('[data-cy="Error"]').should("have.length",1).should("contain",'Isim gerekli')
})
})



