import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [Username, setUsername] = useState<string>('');
  const [Password, setPassword] = useState<string>('');
  const [UsernameError, setUsernameError] = useState<string>('');
  const [PasswordError, setPasswordError] = useState<string>('');
  const [ServerError, setServerError] = useState<string>('');
  const navigate = useNavigate(); 
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsernameError('');
    setPasswordError('');
    setServerError('');

    try{ 
        const res = await axios.post('http://localhost:3000/auth/register', 
        {
          username: Username,
          password: Password
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        navigate('/Login')
      } else if (res.status === 400) {
        setUsernameError('User already exists');
      }

    } catch (err) {
      if (err.response) {
        if (err.response.status === 403) {
            setServerError('Invalid username or password');
        } else if (err.response.status === 500) {
            setServerError('Internal server error. Please try again later.');
        }
    } else {
        setServerError('Network error. Please check your connection.');
    }}
  };

  return (
    <div className='flex flex-col items-center justify-center space-y-10 bg-gradient-to-r h-screen from-[#283342] to-[#009099]'>
      <img src='/Pictures/Logo.svg'alt='Logo' className='w-96'/>
      <h1 className='text-6xl font-poppins font-bold text-white'>Signup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <h1 className='font-poppins font-semibold text-white'>Username</h1>
          <input 
            type="email" 
            value={Username} 
            onChange={(e) => setUsername(e.target.value)}
            className='rounded-lg p-1' 
            required 
          />
          { UsernameError && <p className="text-red-500">{UsernameError}</p> }
        </div>
        <div>
          <h1 className='font-poppins font-semibold text-white'>Password</h1>
          <input 
            type="password" 
            value={Password} 
            onChange={(e) => setPassword(e.target.value)}
            className='rounded-lg p-1' 
            required 
          />
          { PasswordError && <p className="text-red-500">{PasswordError}</p> }
        </div>
        <div>
          <button type="submit" className='rounded-lg border-slate-300 w-20 bg-slate-200 border-2'>
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
