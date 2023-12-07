// import React from 'react';

const HomeScreen = () => {
  return (
    <div className="flex flex-row">
      <div className="container basis-1/4 ">
        {Array(Math.floor(Math.random() * 10 + 1))
          .fill({ title: 'some title', text: '<p>some text</p>' })
          .map(chapter => (
            <div className="container px-10 py-5 bg-slate-500 my-2 rounded-md">
              <h3>{chapter.title}</h3>
            </div>
          ))}
      </div>
      <div className="container">
        <h1>Escriba</h1>
        <h3>O que é o Escriba?</h3>
        <p>
          O Escriba é um site desenvolvido por Rodrigo Cordeiro com o intuito de
          auxiliar no desenvolvimento de livros, servindo como ferramenta de
          escrita e permitindo seu acesso de qualquer dispositivo.
        </p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
      </div>
    </div>
  );
};

export default HomeScreen;
