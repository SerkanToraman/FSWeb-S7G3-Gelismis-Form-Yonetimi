import { useEffect, useState } from "react";

function PersonPool ({members}) {

const [personList,setPersonList]=useState([]);

console.log('deneme >',personList)
useEffect(()=>{
  setPersonList(members);
},[members])
console.log('length',personList.length)

return(
personList.length>0 &&(<div>{personList.map((p,i)=>{
  return <div key={i}>
    <p>name: {p.name}</p>
    <p>E-mail: {p.email}</p>
    <p>Password: {p.password}</p>
    <p>Terms of Service: {p.terms}</p>
    </div>
})}
</div>)
);
}
export default PersonPool;