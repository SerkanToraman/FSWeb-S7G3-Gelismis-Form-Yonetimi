import FormPage from  "./Component/FormPage"
import PersonPool from "./Component/PersonPool";
import MainPage from  "./Component/MainPage"
import { Routes, Route, Link } from "react-router-dom";
import { Button } from "reactstrap";

import './App.css';
import { useState } from "react";

function App() {

  const [members,setMembers] = useState([]);
  
  const getData = (data) => {
    setMembers([...members,data])
    console.log('appjs',members)
  }
 
 return(
<div className="">     
    <div className="button-style">
            <Link to="/"><Button>Main Page</Button></Link> <br/>
            <Link to="/person"><Button data-cy="newPersonBtn"> New Person</Button></Link>
            <Link to="/personpool"><Button data-cy="personListBtn"> Person List</Button></Link> 
    </div> 
    <Routes>
            <Route path = "/person" element={<FormPage onSubmit={getData}/>}/>
            <Route path = "/personpool" element={<PersonPool members={members}/>}/>
            <Route exact path = "/" element={<MainPage/>}/>  
    </Routes> 
    
</div>
 ) 
}


export default App;
