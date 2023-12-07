import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";
import "./index.css";

import Header from "../../components/Header";

import api from "../../utils/api";

export default function MainPage() {
  const [state, setState] = useState(false);
  const [id, setId] = useState(false);
  const history = useHistory();
  const [chapters, setChapters] = useState([]);
  const [chapter, setChapter] = useState({
    title: "Escriba",
    text: "<h3>O que é o Escriba?</h3><p>O Escriba é um site desenvolvido por Rodrigo Cordeiro com o intuito de auxiliar no desenvolvimento de livros, servindo como ferramenta de escrita e permitindo seu acesso de qualquer dispositivo.</p><p>&nbsp;</p><p>&nbsp;</p>",
  });

  useEffect(() => {
    getChapters();
    handleChapterText();
  }, [chapter]);

  function setDefaultChapter() {
    setChapter({
      title: "Escriba",
      text: "<h3>O que é o Escriba?</h3><p>O Escriba é um site desenvolvido por Rodrigo Cordeiro com o intuito de auxiliar no desenvolvimento de livros, servindo como ferramenta de escrita e permitindo seu acesso de qualquer dispositivo.</p><p>&nbsp;</p><p>&nbsp;</p>",
    });
  }
  function getToken() {
    if (!state) {
      setState(true);
      let t = localStorage.getItem("authToken");
      if (t) {
        api.defaults.headers["Authorization"] = `Bearer ${t.toString()}`;
      } else {
        history.push("/login");
      }
    }
  }

  async function getChapter(id) {
    let data = await api
      .get(`/v1/posts/${id}`)
      .then((response) => {
        setId(response.data.id);
        setChapter(response.data);
      })
      .catch((err) => {
        throw new Error(err);
      });
    return data;
  }

  async function getChapters() {
    await api
      .get("/v1/posts")
      .then((res) => {
        setChapters(res.data);
      })
      .catch((error) => console.log(error));
  }
  function goToCreatePage() {
    history.push("/create");
  }
  function goToEditPage(id) {
    if (!id) return;
    history.push("/edit", { chapterId: id });
  }
  async function handleDeleteChapter(id) {
    if (!id) return;
    await api
      .delete(`/v1/posts/${id}`)
      .then((response) => {
        getChapters();
        setDefaultChapter();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  function handleChapterText() {
    let chapterElement = document.getElementById("chapterText");
    chapterElement.innerHTML = chapter.text;
  }
  React.useLayoutEffect(() => {
    getToken();
  }, []);
  return (
    <div className="chaptersContainer">
      <Header page="main" action={goToCreatePage} className="header" />
      <aside className="chapters">
        {chapters.map((chapter, index) => (
          <div
            className="chapter-preview"
            key={index}
            onClick={() => getChapter(chapter.id)}
          >
            <h3>{chapter.title}</h3>
            {/* <p>{chapter.text}</p> */}
          </div>
        ))}
      </aside>
      <section className="chapter">
        <FiEdit
          size={25}
          className="edit-icon"
          onClick={() =>
            id ? goToEditPage(id) : alert("Selecione um capítulo antes")
          }
        />
        <FiTrash
          size={25}
          className="trash-icon"
          onClick={() => handleDeleteChapter(id)}
        />
        <h1>{chapter.title} </h1>
        <div id="chapterText"></div>
      </section>
    </div>
  );
}
