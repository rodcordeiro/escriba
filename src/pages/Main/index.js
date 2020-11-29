import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { FiEdit, FiTrash } from 'react-icons/fi';
import './index.css';

import Header from '../../components/Header';
import Chapter from '../../components/Chapter';

import api from '../../utils/api';

export default function MainPage() {
    const [id,setId] = useState();
    const history = useHistory();
    const [ chapters, setChapters ] = useState([]);
    const [ chapter, setChapter ] = useState({
      "id": id,
      "title": "Escriba",
       "text": "<h3>O que é o Escriba?</h3><p>O Escriba é um site desenvolvido por Rodrigo Cordeiro com o intuito de auxiliar no desenvolvimento de livros, servindo como ferramenta de escrita e permitindo seu acesso de qualquer dispositivo.</p><p>&nbsp;</p><p>&nbsp;</p>"
    });

    useEffect(() => {
      getChapters()
      handleChapterText()
    },[chapter]);
    
    async function getChapter(id){
      let data = await api.get(`/chapters/${id}`)
        .then(response =>{
          setId(response.data.id)
          setChapter(response.data)
        })
        .catch(err=>{
          throw new Error(err);
        })
        return data
      }

    async function getChapters(){
      await api.get('/chapters')
        .then(res => {
          setChapters(res.data)
        })
        .catch(error => 
          console.log(error)
        )
    }
    function goToCreatePage(){
      history.push('/edit');
    }
    function goToEditPage(id){
      history.push('/edit',{id});
    }
    async function handleDeleteChapter(id){
      await api.delete(`/chapters/${id}`)
        .then(response=>{
          getChapters();
          setChapter({
            "title": "Chapter Title",
            "text": "Here goes the chapter text!"
          })
          .catch(err=>{
          })
          throw new Error(err)
        })
    }
    function handleChapterText(){
      let chapterElement = document.getElementById('chapterText')
      chapterElement.innerHTML = chapter.text
    }
    return (
      <div className="chaptersContainer" >
          <Header page="main" action={goToCreatePage} className="header"/>
          <aside className="chapters">
            {
              chapters.map((chapter,index)=>(
                <div className="chapter-preview" key={index} onClick={()=>getChapter(chapter.id)}>
                  <h3>{chapter.title}</h3>
                  {/* <p>{chapter.text}</p> */}
                </div>
              ))
            }
            
          </aside>
          <section className="chapter">
            <FiEdit size={25} className="edit-icon" onClick={()=>goToEditPage(id)}/>
            <FiTrash size={25} className="trash-icon" onClick={()=>handleDeleteChapter(id)}/>
            <h1>{chapter.title} </h1>
            <div id="chapterText"></div>
          </section>
      </div>
    );
  }
  