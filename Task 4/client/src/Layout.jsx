
import { Outlet } from 'react-router-dom';
import downVideo from './down.mp4';  
import './Style.css';

const Layout = () => {
    return (
        <div className="container">
            <video autoPlay muted loop className="video-background">
                <source src={downVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="content-wrapper">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
