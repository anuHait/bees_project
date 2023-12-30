import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // New state for name
  const [isSignUp, setIsSignUp] = useState(true); // New state for conditional rendering
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlenameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    // Implement your signup or signin logic here
    e.preventDefault();
    if (isSignUp) {
      // Handle sign up
      console.log('Signing up with:', { email, password, name });
      const resp=axios.post('http://localhost:8000/api/signup', {name, email, password })
      .then((response) => {
        console.log(response);
        //alert(response.data);
        if(response.status===200){
          Swal.fire(`${response.data}`);

          setIsSignUp(!isSignUp);
        }
        //return <Navigate to="/dashboard" replace />;
      })

    } else {
      
      console.log('Signing in with:', { email, password });
      const resp=axios.post('http://localhost:8000/api/login', { email, password })
      .then((response) => {
        console.log(response);
        if(response.status===200){
          localStorage.setItem('user:token', response.data.token);
         navigate('/dashboard', { replace: true });
        }
      })
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">
          {isSignUp ? 'Sign Up' : 'Sign In'} to get started
        </h1>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          {isSignUp && ( // Only show name field for sign up
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handlenameChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={(e) => handleSubmit(e)}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <p>
          {isSignUp
            ? "Already have an account?"
            : "Don't have an account?"}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={toggleForm}
          >
            {isSignUp ? ' Sign in' : ' Sign up'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Index;
