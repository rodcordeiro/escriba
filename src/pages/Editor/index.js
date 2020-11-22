import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Header from '../../components/Header';

import "./index.css";

export default function EditorPage(props) {
    const [title, setTitle] = useState('');
    const [chapter,setChapter] = useState('');
    let id;
    
     if (props.location.state){
      id = props.location.state.chapterId;
      console.log(id);
     };
    
    
    function saveChapter(){
      const chapterObj = {
        title,
        chapter
      }
      console.log(chapterObj)
    }
    
    return (
      <div className="App">
          <Header action={saveChapter}/>
          <div className="editor">
          <input 
            type="text"
            value={title}
            placeholder="Chapter Title"
            className="titleInput"
            onChange={e => setTitle(e.target.value)}
          />
          <CKEditor
          editor={ ClassicEditor }
          data={chapter}
          onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              console.log( 'Editor is ready to use!', editor );
          } }
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              setChapter( data );
          } }
          onBlur={ ( event, editor ) => {
              console.log( 'Blur.', editor );
          } }
          onFocus={ ( event, editor ) => {
              console.log( 'Focus.', editor );
          } }
          />
          </div>
      </div>
    );
  }
  