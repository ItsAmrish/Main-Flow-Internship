import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Style.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                if (result.data === "Success") {
                    navigate('/home');
                } else {
                    setErrorMessage('Invalid email or password');
                }
            })
            .catch(err => {
                console.error(err);
                setErrorMessage('An error occurred. Please try again.');
            });
    };

    return (
        <div className="form-box">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="off"
                        name="email"
                        className="form-control rounded-0"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password">
                        <strong>Password</strong>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        autoComplete="off"
                        name="password"
                        className="form-control rounded-0"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">
                    Login
                </button>
                {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
                <p>Dont have an Account?</p>
                <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Sign Up
                </Link>
            </form>
        </div>
    );
}

export default Login;
