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
const passingPassword = "2023WIT";
const failingPassword = "20T"


describe('Testler', () => { 
  beforeEach(() =>{
    cy.visit('http://localhost:3000/person')
  })
 })

//  it('New Person buttonuna click edildiginde http://localhost:3000/person@a gidiyor mu?', () =>{


//  })




