import React from 'react'
import './index.css';

export default function Chapter({title, preview}) {
    return (
      <div className="chapter-preview">
        <h3>{title}</h3>
        <p>{preview}</p>
      </div>
    );
  }
  