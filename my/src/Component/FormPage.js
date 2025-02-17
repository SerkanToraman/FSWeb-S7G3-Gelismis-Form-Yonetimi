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

  const empty= {
    name : "",
    email : "",
    password : "",
    terms:false,
  }

  const [person, setPerson]= useState({
    name : "",
    email : "",
    password : "",
    terms:false,
  }) 

  
  const [errors,setErrors] = useState({
    name : "",
    email : "",
    password : "",
    terms:"",
  });
  const [isFormValid,setIsFormValid] = useState(false);
   //const nav = useNavigate();


   useEffect(()=>{
    userSchema
      .isValid(person)
      .then((valid)=>{
        setIsFormValid(valid)
      })
  },[person])

  function validateForm(formName,formData){
    yup.reach(userSchema, formName).validate(formData)
    .then(()=>{
      setErrors({...errors,[formName]:""});
    }).catch((err)=>{
      setErrors({...errors,[formName]:err.errors[0]});
    })
  }


  useEffect(()=>{console.log("data>",person)},
  [person])


 function changeHandler(e) {
  const {name,value,type,checked} = e.target;
  let readInputValue = type === 'checkbox' ?  checked: value;
  const newFormData = {
    ...person,
    [name]:readInputValue
  };
  setPerson(newFormData);

  validateForm(name,readInputValue)
  console.log("person",person)
  console.log("readInputValue",readInputValue)
  console.log("name",name)
 
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
            data-cy="newPersonSaveName"
            />
            {errors.name ? <p data-cy="Error">{errors.name}</p> : null}
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
            data-cy="newPersonSaveEmail"
            />
            {errors.email ? <p data-cy="Error">{errors.email}</p> : null}
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
            data-cy="newPersonSavePassword"
          />
          {errors.password ? <p data-cy="Error">{errors.password}</p> : null}
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
            checked={person.terms}
            invalid={!!errors.terms}
            data-cy="newPersonSaveTerms"
          />
          {errors.terms ? <p data-cy="Error">{errors.terms}</p> : null}
        </FormGroup>
        <Button type="submit" disabled= {!isFormValid}
        data-cy="newPersonSaveBtn">Save</Button>
        <Button type="button" onClick={(e)=> setPerson(empty)}>Sıfırla</Button>
      </Form> 
    </div>
  );
} 
export default FormPage;