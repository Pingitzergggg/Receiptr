import { NavLink, useNavigate } from 'react-router-dom';
import { stringValidate } from './stringValidator';
import CountryCodes from './CountryCodes';
import type { inputType } from './stringValidator';
import { useState, useEffect } from 'react';
import '../tailwind.css'
import '../style.scss'

function Register() : any {

    type FormField = {
        value: string;
        error: string;
    };

    type FormFields = {
        firstName: FormField;
        lastName: FormField;
        email: FormField;
        tel: FormField;
        password: FormField;
        countryCode: FormField;
    };

    const [registerData, setRegisterData] = useState<FormFields>({
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
            value: '',
            error: ''
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
        const getValue = event.target.value;
        if (getValue.length != 0) {
            setRegisterData((prev) => ({...prev, countryCode : {value : getValue, error: ''}}));
        } else {
            setRegisterData((prev) => ({...prev, countryCode : {value : '', error: ''}}));
        }
    }

    const register = () => {
        console.log(registerData);
        let errorOccured = false;
        for (let key in registerData) {
            const innerKey = key as keyof FormFields;
            if (registerData[innerKey].value.length == 0) {
                errorOccured = true;
            }
        }
        
        if (!errorOccured) {
            registerUser({
                name: `${registerData.firstName.value} ${registerData.lastName.value}`,
                email: `${registerData.email.value}`,
                phone: `${registerData.tel.value}`,
                countryCode: `${registerData.countryCode.value}`,
                password: `${registerData.password.value}`
            });
        }
    };

    const navigate = useNavigate();

    function registerUser(object : {
        name: string,
        email: string,
        phone: string,
        countryCode: string,
        password: string
    }) : any {
    
          fetch('http://localhost:5001/billconvert/register', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'X-API-KEY': "]WcdihR9N6}Ol5/V`e}sDD',HRRZIm`Kk|oG'grXb})cJqKS(S"
          },
          body: JSON.stringify(object)
        })
          .then(response => response.json())
          .then(data => {
            console.log(data.status);
            if (data.status == '201') {
                navigate('/login', {state: {fromRegister: true}});
            } else {
                throw data.error;
            }
          })
    }

    return (
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Register Account</legend>

            <label className="label">First Name</label>
            <input id="firstName" onChange={handleInputChange} type="text" className="input" placeholder="First Name" />
            {(registerData.firstName.error.length != 0) && <span className='error'>{registerData.firstName.error}</span>}

            <label className="label">Last Name</label>
            <input id='lastName' onChange={handleInputChange} type="text" className="input" placeholder="Last Name" />
            {(registerData.lastName.error.length != 0) && <span className='error'>{registerData.lastName.error}</span>}
            
            <label className="label">Email</label>
            <input id='email' onChange={handleInputChange} type="email" className="input" placeholder="Email" />
            {(registerData.email.error.length != 0) && <span className='error'>{registerData.email.error}</span>}

            <label className="label">Country Code</label>
            <select onChange={handleSelectChange} className='select' name="" id="countryCode">
                <option value="">Select your country</option>
                < CountryCodes/>
            </select>

            <label className="label">Phone</label>
            <input id='tel' onChange={handleInputChange} type="tel" className="input" placeholder="Phone" />
            {(registerData.tel.error.length != 0) && <span className='error'>{registerData.tel.error}</span>}

            <label className="label">Password</label>
            <input id='password' onChange={handleInputChange} type="password" className="input" placeholder="Password" />
            {(registerData.password.error.length != 0) && <span className='error'>{registerData.password.error}</span>}

            <button onClick={register} className="btn btn-neutral mt-4">Register</button>

            <p>Back to <NavLink to='/login'>Login</NavLink></p>
        </fieldset>
    )
}

export default Register;