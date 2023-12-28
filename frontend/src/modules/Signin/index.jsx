import React, { useState } from 'react';

function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // New state for username
  const [isSignUp, setIsSignUp] = useState(true); // New state for conditional rendering

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    // Implement your signup or signin logic here
    e.preventDefault();
    if (isSignUp) {
      // Handle sign up
      console.log('Signing up with:', { email, password, username });
    } else {
      // Handle sign in
      console.log('Signing in with:', { email, password });
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
          {isSignUp && ( // Only show username field for sign up
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
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
