import { Layout, } from 'antd';
import Navbar from "./Navbar"
import { Outlet } from 'react-router-dom';

const { Content, } = Layout;

const PublicLayout = () => {

  return (
    <Layout className="layout" >

      <Content className='bg-white vh-100'
      >
        <div className='container'>
          <Navbar />
          <Outlet />
        </div>
      </Content>

    </Layout>
  );
};
export default PublicLayout;