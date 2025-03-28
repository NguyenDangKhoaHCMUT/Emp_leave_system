import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/context/AuthContext';
import './Login.css';
import { postLogin } from '~/services/apiService';

function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      const userData = {
        username: username,
        password: password
      };
      console.log(userData);
      const response = await postLogin(userData);
      if (response.data.message === "Login Successfully !!") {
        login({
          name: username,
          token: response.data.token,
          role: response.data.idRole === 2 ? 'admin' : 'user'
        });
        // if role is 2, navigate to admin page
        if (response.data.idRole === 2) {
          navigate('/admin');
        } else {
        navigate('/');
        }
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-illustration">  
        <div className="illustration-content">
          <h1>Leave Management System</h1>
          <p>Manage your time off requests efficiently</p>
          <div className="illustration-image"></div>
        </div>
      </div>
      
      <div className="login-form-container">
        <div className="login-form-wrapper">
          <div className="login-header">
            <div className="app-logo">
              <span className="logo-icon">📅</span>
            </div>
            <h2>Welcome Back</h2>
            <p>Please sign in to your account</p>
          </div>
          
          {error && (
            <div className="error-message">
              <span className="error-icon">❌</span>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input 
                  id="username"
                  type="text" 
                  placeholder="Enter your username"
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  autocomplete="off"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <div className="password-header">
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input 
                  id="password"
                  type="password" 
                  placeholder="Enter your password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  autocomplete="off"
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
              {isLoading && <span className="spinner"></span>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
