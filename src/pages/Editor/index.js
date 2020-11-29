import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Header from '../../components/Header';
import api from '../../utils/api';

import "./index.css";

export default function EditorPage(props) {
    const [title, setTitle] = useState('');
    const [text,setText] = useState('');
    const [chapterObj, setChapterObj] = useState({
      title,
      text
    })
    const history = useHistory();
    const [teste, setTeste] = useState(0);
    useEffect(()=>{
      setChapterObj({
        title,
        text
      })
    },[title,text])

    async function getChapter(id){
      await api.get(`/chapters/${id}`)
        .then(response =>{
          let {title,text} = response.data;
          console.log(teste);
        })
        .catch(err=>{
          throw new Error(err);
        })    
    }
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

    if (props.location.state){
      const {id} = props.location.state;
      getChapter(id)      
      
    };
    
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
  