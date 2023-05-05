import axios from "axios";
import { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
//import { useNavigate } from "react-router-dom";

const CreateProducts = ({list}) => {
  const [person, setPerson]= useState({
    name : "",
    email : "",
    password : "",
    TermsofService  : "",
  }) 
 //const nav = useNavigate();

  return (
  <div>
    <div>Lütfen Bilgilerinizi Giriniz</div>
   <Form
   onSubmit={(event) => {
    event.preventDefault();
    axios
      .post(
        "https://reqres.in/api/users",
        person
      )
      .then((res) => {
        console.log("Yeni product kayıt res > ", res.data);
        list();
        console.log('resdata>',person)
      });
    }}
    >   
        <FormGroup>
        <Label htmlFor="person-name">Name</Label>
        <Input
            id="person-name"
            name="name"
            type="text"
            onChange={(event) => {
              setPerson({ ...person, name: event.target.value });
            }}
            value={person.name}
          />
        </FormGroup>
        <FormGroup>
        <Label htmlFor="person-email">E-mail</Label>
        <Input
            id="person-email"
            name="email"
            type="email"
            onChange={(event) => {
              setPerson({ ...person, email: event.target.value });
            }}
            value={person.email}
          />
        </FormGroup>
        <FormGroup>
        <Label htmlFor="person-password">Password</Label>
        <Input
            id="person-password"
            name="password"
            type="password"
            onChange={(event) => {
              setPerson({ ...person, password: event.target.value });
            }}
            value={person.password}
          />
        </FormGroup>
        <FormGroup>
        <Label htmlFor="person-terms">Terms</Label>
        <Input
            id="person-terms"
            name="terms"
            type="checkbox"
            onChange={(event) => {
              setPerson({ ...person, terms: event.target.value });
            }}
            value={person.terms}
          />
        </FormGroup>
        <Button type="submit">Save</Button>
      </Form> 
    </div>
  );

} 

export default CreateProducts;