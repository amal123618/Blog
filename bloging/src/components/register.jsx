import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { Link } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://blog-10-nrph.onrender.com/register/", user);
      alert('Registration successful');
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      alert('Registration failed');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <h1>Register</h1>
        <p>Create your account to start blogging today.</p>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" name="username" onChange={handleChange} />
        <input type="email" placeholder="Email" name="email" onChange={handleChange} />
        <input type="password" placeholder="Password" name="password" onChange={handleChange} />
        <button type="submit">Register</button>
         <p className="register-link">
          already registered ?<Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
