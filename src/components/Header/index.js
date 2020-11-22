import React from 'react'
import { FiPenTool, FiPlusCircle, FiSave } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './index.css';

export default function Header({page, action}) {
    const history = useHistory()
    return (
      <header className="header">
        <FiPenTool className="headerIcon" onClick={()=>history.push('/')}/>
        {page === "main" ?(<FiPlusCircle className="headerIcon" onClick={action}/>) : (<FiSave className="headerIcon" onClick={action}/>)}
      </header>
    );
  }
  