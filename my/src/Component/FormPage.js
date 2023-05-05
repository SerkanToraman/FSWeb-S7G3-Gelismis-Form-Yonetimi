import axios from "axios";
import { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
//import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

function FormPage (props){
  const [person, setPerson]= useState({
    name : "",
    email : "",
    password : "",
    TermsofService  : "",
  }) 

  const empty= {
    name : "",
    email : "",
    password : "",
    TermsofService  : "",
  }
 //const nav = useNavigate();

 function changeHandler(e) {
  const {name,value,type,checked} = e.target;
  let readInputValue = type === 'checkbox' ?  checked: value;
  
  const newFormData = {
    ...person,
    [name]:readInputValue
  };
  setPerson(newFormData);
}


  return (
  <div>
    <div>Lütfen Bilgilerinizi Giriniz</div>
   <Form style={{width:'18rem'}}
   onSubmit={(event) => {
    event.preventDefault();
    axios
      .post(
        "https://reqres.in/api/users",
        person
      )
      .then((res) => {
        console.log("Yeni product kayıt res > ", res.data);
        props.onSubmit(res.data);
      });
    }}
    > 
        <FormGroup>
        <Label htmlFor="person-name">Name</Label>
        <Input
            id="person-name"
            name="name"
            type="text"
            onChange={(e) => {
              changeHandler(e);
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
            onChange={(e) => {
              changeHandler(e);
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
            onChange={(e) => {
              changeHandler(e);
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
            onChange={(e) => {
              changeHandler(e);
            }}
            value={person.terms}
          />
        </FormGroup>
        <Button type="submit">Save</Button>
        <Button type="button" onClick={(e)=> setPerson(empty)}>Sıfırla</Button>
      </Form> 
    </div>
  );

} 

export default FormPage;