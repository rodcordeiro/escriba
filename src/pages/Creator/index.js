import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Header from '../../components/Header';
import api from '../../utils/api';

import "./index.css";

export default function CreatorPage(props) {
    const [title, setTitle] = useState('');
    const [text,setText] = useState('');
    const [chapterObj, setChapterObj] = useState({
      title,
      text
    })
    const history = useHistory();
    
    useEffect(()=>{
      setChapterObj({
        title,
        text
      })
    },[title,text])

    async function saveChapter(){
      await api.post('/chapters/create',chapterObj)
        .then(response=>{
          alert(`Capítulo ${response.data.chapter.title} criado. ID:${response.data.chapter.id}`)
          history.push('/');
        })
        .catch(err=>{
          throw new Error(err)
        })
    }
      return (
        <div className="App">
          
            <Header action={saveChapter}/>
            <div className="editor">
            <input 
              id="titleInput"
              type="text"
              value={title}
              placeholder="Chapter Title"
              className="titleInput"
              onChange={e => setTitle(e.target.value)}
            />
            <CKEditor
            editor={ ClassicEditor }
            data={text}
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                setText( data );
            } }
            />  
            </div>
        </div>
      );

  }
  