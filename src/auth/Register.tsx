import { stringValidate, stringNormalize } from './stringValidator';
import type { inputType } from './stringValidator';
import { useState } from 'react';
import '../tailwind.css'
import '../style.scss'

function Register() : any {

    const [registerData, setRegisterData] = useState({
        firstName: {
            value: '',
            error: ''
        },
        lastName: {
            value: '',
            error: '',
        },
        email: {
            value: '',
            error: '',
        },
        tel: {
            value: '',
            error: '',
        },
        password: {
            value: '',
            error: '',
        },
    });

    const handleInputChange = (event : any) => {
        const getId : string = event.target.id;
        const getValue : string = event.target.value;
        const currentCommand : inputType = getId.toLowerCase().includes('name') ? 'NAME' : getId.toUpperCase() as inputType;
        try {
            stringValidate(currentCommand, getValue);
            setRegisterData((prev) => ({...prev, [getId]: {value: getValue, error: ''}}));
        } catch(err : any) {
            if (getValue.length != 0) {
                setRegisterData((prev) => ({...prev, [getId]: {value: '', error: err}}));
            } else {
                setRegisterData((prev) => ({...prev, [getId]: {value: '', error: ''}}));
            }
        }
    };

    const register = () => {
        console.log(registerData)
    };

    return (
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Register Account</legend>

            <label className="label">First Name</label>
            <input id="firstName" onChange={handleInputChange} type="text" className="input" placeholder="First Name" />
            {(registerData.firstName.error.length != 0) && <span id='firstNameError' className='error'>{registerData.firstName.error}</span>}

            <label className="label">Last Name</label>
            <input id='lastName' onChange={handleInputChange} type="text" className="input" placeholder="Last Name" />
            {(registerData.lastName.error.length != 0) && <span id='firstNameError' className='error'>{registerData.lastName.error}</span>}
            
            <label className="label">Email</label>
            <input id='email' onChange={handleInputChange} type="email" className="input" placeholder="Email" />
            {(registerData.email.error.length != 0) && <span id='firstNameError' className='error'>{registerData.email.error}</span>}

            <div className="join">
                <select className='select' name="" id="">
                    <option value="">+36</option>
                </select>
                <div>
                  <label className="input validator join-item">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </g>
                    </svg>
                    <input id='tel' onChange={() => handleInputChange} type="tel" placeholder="Phone" required />
                  </label>
                  <div className="validator-hint hidden">Enter valid email address</div>
                </div>
            </div>

            <label className="label">Password</label>
            <input id='password' onChange={handleInputChange} type="password" className="input" placeholder="Password" />
            {(registerData.password.error.length != 0) && <span id='firstNameError' className='error'>{registerData.password.error}</span>}

            <button onClick={register} className="btn btn-neutral mt-4">Register</button>
        </fieldset>
    )
}

export default Register;