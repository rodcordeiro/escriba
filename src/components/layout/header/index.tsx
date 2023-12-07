import React from 'react';
const Header: React.FC = () => {
  return (
    <div className="container px-10 py-5 w-full bg-zinc-950 flex flex-row justify-between ">
      <h2 className="text-base antialiased">Escriba</h2>
      <p>+</p>
    </div>
  );
};

export { Header };
