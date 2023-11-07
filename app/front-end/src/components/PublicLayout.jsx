import Navbar from "./Navbar"
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {

  return (
      <div className='bg-white vh-100'>
        <div className='container'>
          <Navbar />
          <Outlet />
        </div>
      </div>
  );
};
export default PublicLayout;
