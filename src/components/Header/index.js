import React from 'react'
import { FiPenTool, FiPlusCircle, FiSave } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import './index.css';

export default function Header({page, action}) {
    const history = useNavigate()
    return (
      <header className="header">
        <FiPenTool className="headerIcon" onClick={()=>history('/')}/>
        {page === "main" ?(<FiPlusCircle className="headerIcon" onClick={action}/>) : (<FiSave className="headerIcon" onClick={action}/>)}
      </header>
    );
  }
  