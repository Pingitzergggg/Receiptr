import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { checkInjection } from './stringValidator'
import type { inputType } from './stringValidator'
import '../tailwind.css'
import '../style.scss'

function Login() : any {

    type inputField = {
        value: string,
        error: string
    };

    type inputFields = {
        email: inputField,
        password: inputField
    };

    const [loginData, setLoginData] = useState<inputFields>({
        email: {
            value: '',
            error: ''
        },
        password: {
            value: '',
            error: ''
        }
    });

    const handleInputChange = (event : any) => {
        const getId : string = event.target.id;
        const getValue : string = event.target.value;
        try {
            checkInjection(getValue);
            setLoginData((prev) => ({...prev, [getId]: {value: getValue, error: ''}}));
        } catch(err) {
            if (getValue.length != 0) {
                setLoginData((prev) => ({...prev, [getId]: {value: '', error: err}}));
            } else {
                setLoginData((prev) => ({...prev, [getId]: {value: '', error: ''}}));
            }
        }
    };

    const navigate = useNavigate();

    const login = () => {
        console.log(loginData);
        let errorOccured = false;
        for (let key in loginData) {
            const innerKey = key as keyof inputFields;
            if (loginData[innerKey].value.length == 0) {
                errorOccured = true;
            }
        }

        if (!errorOccured) {
            fetch('http://localhost:5001/billconvert/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-API-KEY': "]WcdihR9N6}Ol5/V`e}sDD',HRRZIm`Kk|oG'grXb})cJqKS(S"
            },
            body: JSON.stringify({
                email: loginData.email.value,
                password: loginData.password.value
            })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.status);
                    if (data.status == '302') {
                        localStorage.setItem('id', data.reply.id);
                        navigate('/');
                    } else {
                        throw data.error;
                    }
                })
        }
    }

    return (
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Login</legend>

            <label className="label">Email</label>
            <input id='email' onChange={handleInputChange} type="email" className="input" placeholder="Email"/>
            {(loginData.email.error.length != 0) && <span className='error'>{loginData.email.error}</span>}

            <label className="label">Password</label>
            <input id='password' onChange={handleInputChange} type="password" className="input" placeholder="Password" />
            {(loginData.password.error.length != 0) && <span className='error'>{loginData.password.error}</span>}

            <button onClick={login} className="btn btn-neutral mt-4">Login</button>

            <p>Don't have an account? <NavLink to='/register'>Register</NavLink></p>
            
        </fieldset>
    );
}

export default Login;