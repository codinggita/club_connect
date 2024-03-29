import React, { useState } from 'react';
import Navbar from "../../component/Navbar/Navbar";
import Footer from '../../component/Footer/footer';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import axios from 'axios';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "./Login.css";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        // console.log('IN LOGIN USER FRONTEND:', email, password);
        try {
            const response = await axios.post('/login', { email, password });
            console.log('AFTER LOGIN USER BACKEND:', email, password);
            const responseData = response.data;
            if (responseData.error) {
                toast.error(responseData.error);
            } else {
                setData({});
                toast.success('Login Successful');
                navigate('/dashboard');
                // console.log('Logged with:', email, password);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setData((prevData) => ({ ...prevData, email }));
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setData((prevData) => ({ ...prevData, password }));
    };

    return (
        <>
            <Navbar />
            <section className="login_page">
                <div className="container_logs" id="container_logs">
                    <div className="form-container_logs sign-in">
                        <form onSubmit={loginUser}>
                            <h1>Sign In</h1>

                            <div className="social-icons">
                                <a href="#" className="icon"><GoogleIcon /></a>
                                <a href="#" className="icon"><FacebookIcon /></a>
                                <a href="#" className="icon"><GitHubIcon /></a>
                                <a href="#" className="icon"><LinkedInIcon /></a>
                            </div>

                            <span>or use your login credentials</span>

                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={data.email}
                                onChange={handleEmailChange}
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={data.password}
                                onChange={handlePasswordChange}
                            />

                            <a href="#">Forget Your Password?</a>

                            <button type='submit'>Sign In</button>

                            <button id="mobile_register">Register Now</button>
                        </form>
                    </div>

                    <div className="toggle-container_logs">
                        <div className="toggle">
                            <div className="toggle-panel toggle-right">
                                <h1>Hello, Verto!</h1>
                                <p>Register now to explore the vastness of our Campus.</p>
                                <button className="hidden" id="register" onClick = {() => navigate("/register")}>Register Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Login;
