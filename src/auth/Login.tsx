import { BrowserRouter, Routes, Route, NavLink, Outlet, Router } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Register from './Register'
import '../tailwind.css'
import '../style.scss'

function Login() : any {

    const LoginPanel = (
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Login</legend>

            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Email"/>
            <span className='error'>Error</span>

            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Password" />
            <span className='error'>Error</span>

            <button className="btn btn-neutral mt-4">Login</button>

            <p>Don't have an account? <NavLink to='/register'>Register</NavLink></p>
            
        </fieldset>
    )

    return LoginPanel;
}

export default Login;