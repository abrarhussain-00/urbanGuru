import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const postRegistrationDetails = () => {
        axios
            .post('http://localhost:8000/api/register', {
                firstName,
                lastName,
                userName,
                password,
                confirmPassword,
            })
            .then((res) => {
                localStorage.setItem('userId', JSON.stringify(res.data.id));
                localStorage.setItem('firstName', JSON.stringify(res.data.firstName));
                navigate('/');
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.errors) {
                    setErrors(err.response.data.errors);
                }
                console.error(err);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postRegistrationDetails();
        setFirstName('');
        setLastName('');
        setUserName('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="bg-gray-200 min-h-screen flex justify-center items-center">
            <form className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                </label>
                <input
                    placeholder="Enter your first name"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    type="text"
                    value={firstName}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}

                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                </label>
                <input
                    placeholder="Enter your last name"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    type="text"
                    value={lastName}
                    required
                    onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}

                <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                    Username
                </label>
                <input
                    placeholder="Enter your username"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    type="text"
                    value={userName}
                    required
                    onChange={(e) => setUserName(e.target.value)}
                />
                {errors.userName && <span className="text-red-500">{errors.userName.message}</span>}

                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    placeholder="Enter your password"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    type="password"
                    minLength={8}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <input
                    placeholder="Confirm your password"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    type="password"
                    minLength={8}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                    <span className="text-red-500">{errors.confirmPassword.message}</span>
                )}

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                    type="submit"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Registration;