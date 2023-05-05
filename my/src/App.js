import axios from "axios";
import { useEffect, useState } from "react";
import CreateProducts from  "./Component/form"
import PersonPool from "./Component/person";
import { Routes, Route, Link } from "react-router-dom";
import { Button } from "reactstrap";

import './App.css';

function App() {

  const [persons,setPersons] = useState([]);

  let list = () => {axios
      .post('https://reqres.in/api/users')
      .then((res)=>{
        setPersons(...res.data)})
      }
 
 
 return(
<div className="">
<h1> Anasayfa </h1>
<Link to="/">
  <Button>Main Page</Button>
</Link>

<div className="button-style">
        <Link to="/person"><Button> New Person</Button></Link>
        <Link to="/personpool"><Button> Person Pool</Button></Link>
</div> 


<Routes>
    <Route path = "/"/>   
    <Route path = "/person" element={<CreateProducts list={list}/>}/>
    <Route path = "/personpool" element={<PersonPool persons={persons}/>}/>

</Routes>
 

</div>
 ) 
}

export default App;
