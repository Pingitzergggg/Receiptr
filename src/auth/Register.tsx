import { stringValidate, stringNormalize } from './stringValidator';
import CountryCodes from './CountryCodes';
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
        countryCode: {
            value: ''
        }
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

    const handleSelectChange = (event : any) => {
        const getId : string = event.target.id;
        const getValue = event.target.value;
        if (getValue.length != 0) {
            setRegisterData((prev) => ({...prev, countryCode : {value : getValue}}));
        } else {
            setRegisterData((prev) => ({...prev, countryCode : {value : ''}}));
        }
    }

    const register = () => {
        console.log(registerData);
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

            <label className="label">Code</label>
            <select onChange={handleSelectChange} className='select' name="" id="countryCode">
                <option value="">-</option>
                < CountryCodes/>
            </select>

            <label className="label">Phone</label>
            <input id='tel' onChange={handleInputChange} type="tel" className="input" placeholder="Phone" />
            {(registerData.tel.error.length != 0) && <span id='firstNameError' className='error'>{registerData.tel.error}</span>}

            <label className="label">Password</label>
            <input id='password' onChange={handleInputChange} type="password" className="input" placeholder="Password" />
            {(registerData.password.error.length != 0) && <span id='firstNameError' className='error'>{registerData.password.error}</span>}

            <button onClick={register} className="btn btn-neutral mt-4">Register</button>
        </fieldset>
    )
}

export default Register;