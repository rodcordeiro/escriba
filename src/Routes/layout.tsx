import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <div className="w-screen h-screen overflow-x-hidden ">
      <Outlet />
    </div>
  );
};
