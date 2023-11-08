import React, { useState } from 'react';
import { useRouter } from 'next/router';
import LoggedIn from './components/LoggedIn';

function LoginControlled() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });
    
      const [error, setError] = useState(null);
      const [authenticated, setAuthenticated] = useState(false);
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const { username, password } = formData;
    
        // Make an API request to fetch user data
        fetch('/api/profile')
          .then((response) => {
            if (response.status === 401) {
              setError('Unauthorized');
              return null;
            }
            if (response.status === 200) {
              return response.json();
            }
            throw new Error('Failed to fetch user data');
          })
          .then((userData) => {
            if (userData) {
              // Check if the entered username and password match any user in the fetched data
              const user = userData.find(
                (user) => user.username === username && user.password === password
              );
    
              if (user) {
                console.log('Authenticated as:', user.username);
                setError(null);
                setAuthenticated(true);
    
                // Redirect to the main page after successful authentication

          // Efface le message "Authentification réussie" après 3 secondes
          setTimeout(() => {
            setAuthenticated(false);
            router.push('/');
          }, 3000);
                // Redirect to the home page or perform other actions upon successful authentication
              } else {
                setError('Invalid credentials. Please try again.');
              }
            }
          })
          .catch((error) => {
            console.error(error);
            setError('Failed to authenticate. Please try again.');
          });
      };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connexion
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Nom d&apo;sutilisateur:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nom d'utilisateur"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Mot de passe:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
              />
            </div>
          </div>
          {authenticated ? (
            <div className="text-green-500 text-center">
              Authentification réussie !
              <LoggedIn />
            </div>
          ) : (
            error && <div className="text-red-500 text-center">{error}</div>
          )}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginControlled;
