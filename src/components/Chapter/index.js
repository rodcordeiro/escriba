import React from 'react'
import './index.css';

export default function Chapter({id, title, preview, setId}) {
    function getChap(id){
      setId(id)
    }
    return (
      <div className="chapter-preview" key={id} onClick={()=>setId(id)}>
        <h3>{title}</h3>
        <p>{preview}</p>
      </div>
    );
  }
  