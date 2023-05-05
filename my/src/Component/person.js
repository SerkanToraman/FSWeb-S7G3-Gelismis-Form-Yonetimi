import { useEffect, useState } from "react";

function PersonPool ({persons}) {

const [personList,setPersonList]=useState([]);

console.log('deneme >',personList)
useEffect(()=>{
  setPersonList(persons);
},[persons])

return(
<>
{personList.length>0 &&
<div>{personList.map((p,i)=>{
  return <div key={i}>
    <p>name:{personList.id}</p>
    <p></p>
    </div>
})}
</div>
}</>
);
}
export default PersonPool;