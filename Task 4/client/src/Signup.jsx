import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Style.css';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/signup', { name, email, password })
            .then(result => {
                if (result.data.message === "Success") {
                    navigate('/login');
                } else {
                    setErrorMessage(result.data.message);
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    setErrorMessage(err.response.data.message);
                } else {
                    setErrorMessage('An error occurred. Please try again later.');
                }
            });
    };

    return (
        <div className="form-box">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name">
                        <strong>Name</strong>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        autoComplete="off"
                        name="name"
                        className="form-control rounded-0"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit" className="btn btn-primary w-100 rounded-0">
                    Sign Up
                </button>
                {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
                <p>Already have an Account?</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            </form>
        </div>
    );
}

export default Signup;
