import '../tailwind.css'
import '../style.scss'
import { nameValidator, mailValidator, phoneValidator, passwordValidator } from './stringValidator';

function Register() : any {
    return (
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Register Account</legend>

            <label className="label">First Name</label>
            <input id="firstName" type="text" className="input" placeholder="First Name" />
            <span className='error'>Error</span>

            <label className="label">Last Name</label>
            <input id='lastName' type="text" className="input" placeholder="Last Name" />
            <span className='error'>Error</span>
            
            <label className="label">Email</label>
            <input id='email' type="email" className="input" placeholder="Email" />
            <span className='error'>Error</span>
           
            <label className="label">Phone</label>
            <input id='tel' type="tel" className="input" placeholder="Phone" />
            <span className='error'>Error</span>

            <label className="label">Password</label>
            <input id='password' type="password" className="input" placeholder="Password" />
            <span className='error'>Error</span>

            <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
    )
}

export default Register;