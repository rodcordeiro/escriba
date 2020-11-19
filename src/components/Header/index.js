import React from 'react'
import { FiPenTool, FiPlusCircle, FiSave } from 'react-icons/fi';

import './index.css';

export default function Header({page}) {
    return (
      <header className="header">
        <FiPenTool className="headerIcon"/>
        {page == "main" ?(<FiPlusCircle className="headerIcon" />) : (<FiSave className="headerIcon" />)}
      </header>
    );
  }
  