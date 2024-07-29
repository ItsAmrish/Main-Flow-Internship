
import { useNavigate } from 'react-router-dom';
import './Style.css'; 

function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/signup'); 
    };

    return (
        <div className="home-container">
            <div className="home-box">
                <h2>Welcome</h2>
                <p className="welcome-text">You are successfully logged in!</p>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Home;
