import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Header from '../../components/Header';
import api from '../../utils/api';

import "./index.css";

export default function EditorPage(props) {
  const [status,setStatus] = useState(false);
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [text,setText] = useState('');
  const [chapterObj, setChapterObj] = useState({title,text})
  const history = useHistory();  
  
  if(!status) {
    setStatus(true)
    const {chapterId} = props.location.state;
    setId(chapterId)
    getChapter(chapterId)
  };
  useEffect(()=>{
    setChapterObj({
      title,
      text
    })
  },[title,text])

  async function getChapter(id){
    await api.get(`/chapters/${id}`)
    .then(response =>{
      setTitle(response.data.title)
      setText(response.data.text)
    })
    .catch(err=>{
        throw new Error(err);
    })    
  }

  async function updateChapter(){
    await api.put(`/chapters/${id}`,chapterObj)
    .then(response=>{
        alert(`Capítulo ${title} atualizado`)
        history.push('/');
    })
    .catch(err=>{
        throw new Error(err)
    })
  }


  return (
      <div className="App">
        
          <Header action={updateChapter}/>
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
