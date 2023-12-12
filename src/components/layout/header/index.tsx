import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  rightComponent?: () => JSX.Element;
};

const Header: React.FC<Props> = ({ rightComponent }) => {
  const navigate = useNavigate();
  return (
    <div className="container w-screen px-10 py-5 bg-zinc-950 flex flex-row justify-between ">
      {/* <Link to={'/'}> */}
      <h2
        onClick={() => setTimeout(() => navigate(`/`), 200)}
        className="text-base antialiased"
      >
        Escriba
      </h2>
      {/* </Link> */}
      <div>{rightComponent && rightComponent()}</div>
    </div>
  );
};

export { Header };
