import React from 'react';

type Props = {
  rightComponent?: () => JSX.Element;
};

const Header: React.FC<Props> = ({ rightComponent }) => {
  return (
    <div className="container w-screen px-10 py-5 bg-zinc-950 flex flex-row justify-between ">
      <h2 className="text-base antialiased">Escriba</h2>
      <div>{rightComponent && rightComponent()}</div>
    </div>
  );
};

export { Header };
