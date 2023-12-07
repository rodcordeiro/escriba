import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Header from "../../components/Header";
import api from "../../utils/api";

import "./index.css";

export default function CreatorPage(props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [chapterObj, setChapterObj] = useState({
    title,
    text,
  });
  const navigate = useNavigate();

  useEffect(() => {
    setChapterObj({
      title,
      text,
    });
  }, [title, text]);

  async function saveChapter() {
    await api
      .post("/v1/posts", chapterObj)
      .then((response) => {
        alert(`Capítulo ${response.data.title} criado.`);
        navigate("/");
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  return (
    <div className="App">
      <Header action={saveChapter} />
      <div className="editor">
        <input
          id="titleInput"
          type="text"
          value={title}
          placeholder="Chapter Title"
          className="titleInput"
          onChange={(e) => setTitle(e.target.value)}
        />
        <CKEditor
          editor={ClassicEditor}
          data={text}
          onChange={(event, editor) => {
            const data = editor.getData();
            setText(data);
          }}
        />
      </div>
    </div>
  );
}
