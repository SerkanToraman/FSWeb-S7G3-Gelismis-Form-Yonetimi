import axios from "axios";
import { useEffect, useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
//import { useNavigate } from "react-router-dom";
import * as yup from 'yup';

  let userSchema = yup.object({
    name: yup.string().required('Isim gerekli').min(3,'Minimum 3 karakter olmali'),
    email: yup.string().email('Geçerli bir e-mail gerekli').required(),
    password: yup.string().required("Şifre gerekli").min(8,'Minimum 8 karakter olmali'),
    terms: yup.boolean().oneOf([true], "Onay gerekli"),
  });

  

function FormPage (props){
  const [person, setPerson]= useState({
    name : "",
    email : "",
    password : "",
    terms:false,
  }) 

  const empty= {
    name : "",
    email : "",
    password : "",
    terms:false,
  }
  const [errors,setErrors] = useState({});
  const [isFormValid,setIsFormValid] = useState(false);
   //const nav = useNavigate();

  function validateForm(formData,formName){
    yup.reach(userSchema, formName).validate(formData)
      .then((result)=>{
        setErrors({...errors,[formName]:""});
      }).catch((err)=>{
        setErrors({...errors,[formName]:err.errors[0]});

      })
  }

  useEffect(()=>{
    userSchema
      .isValid(person)
      .then((valid)=>{
        setIsFormValid(valid)
      })
  },[errors])


 function changeHandler(e) {
  const {name,value,type,checked} = e.target;
  let readInputValue = type === 'checkbox' ?  checked: value;
  
  const newFormData = {
    ...person,
    [name]:readInputValue
  };
  setPerson(newFormData);
  validateForm(readInputValue,name);
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
            invalid={!!errors.name}
            />
            {errors.name ? <p>{errors.name}</p> : null}
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
            invalid={!!errors.email}
            />
            {errors.email ? <p>{errors.email}</p> : null}
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
            invalid={!!errors.password}
          />
          {errors.password ? <p>{errors.password}</p> : null}
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
            invalid={!!errors.terms}
          />
          {errors.terms ? <p>{errors.terms}</p> : null}
        </FormGroup>
        <Button type="submit" disabled= {!isFormValid}>Save</Button>
        <Button type="button" onClick={(e)=> setPerson(empty)}>Sıfırla</Button>
      </Form> 
    </div>
  );
} 
export default FormPage;