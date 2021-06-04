import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Header from '../../components/Header';
import api from '../../utils/api';

import "./index.css";

export default function CreatorPage(props) {
    const [token, setToken] = useState(false);  
    const [state, setState] = useState(false);  
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
      await api.post('/esb/chapters/create',chapterObj,{headers:{
        token
      }})
        .then(response=>{
          alert(`Capítulo ${response.data.chapter.title} criado.`)
          history.push('/');
        })
        .catch(err=>{
          throw new Error(err)
        })
    }
    function getToken(){
      if(!state){
        setState(true)
        let t = localStorage.getItem('authToken')
        if(t){
          setToken(t)
        } else {
          history.push('/login');
        }
      }
    }
    getToken()
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
  