import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useRef, useState, type RefObject } from 'react'
import { checkInjection } from '../misc/stringValidator'
import Popup from '../tools/Popup'
import '../tailwind.css'
import '../style.scss'
import {extractResponse, requestResource} from "../misc/receiver.ts";
import Button from "../tools/Button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket} from "@fortawesome/free-solid-svg-icons";

type inputField = {
    value: string,
    error: string
};

type inputFields = {
    email: inputField,
    password: inputField
};

function Login() : any {

    const location = useLocation();

    const rememberMe: RefObject<boolean> = useRef(false);
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

    const [error, setError] = useState<string>('');
    async function login() {
        setError('');
        console.log(loginData);
        let errorOccurred = false;
        for (let key in loginData) {
            const innerKey = key as keyof inputFields;
            if (loginData[innerKey].value.length == 0) {
                errorOccurred = true;
            }
        }

        if (!errorOccurred) {
            try {
                const response = await requestResource("login", "POST", null, null, {
                    email: loginData.email.value,
                    password: loginData.password.value,
                    remember_device: rememberMe.current
                });
                await extractResponse(response);
                sessionStorage.removeItem('cards');
                sessionStorage.removeItem('receipts');
                sessionStorage.removeItem('categories');
                navigate("/", {state: {fromLogin: true}});
            } catch (error) {
                console.log(error);
                if (error instanceof WebTransportError) {
                    setError(error.message);
                } else {
                    setError("Error occurred!");
                }
            }
        }
    }

    return (
            <>
                {location.state?.passwordRequest && <Popup type='SUCCESS' message='Password requested!' />}
                {location.state?.passwordReset && <Popup type='SUCCESS' message='Password reset!' />}
                {error && <Popup type='ERROR' message={error}/>}
                <div className='flex justify-evenly items-center w-[100vw] h-[100vh]'>
                    <div id='banner' className='w-full hidden lg:block'>
                        <img draggable={false} src={`/banner_${localStorage.getItem('theme')}.png`} alt='Banner' className='h-[100vh] w-[50vw]' />
                    </div>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <div className='flex flex-col md:flex-row items-center justify-center mb-10'>
                            <img src='/icon.png' alt='Logo' className='w-[10rem] h-[7.5rem]' />
                            <h1 className='text-6xl font-bold'>Receiptr</h1>
                        </div>
                        <fieldset className="fieldset bg-(--fieldset-bg) border-base-300 rounded-box w-xs border p-4">
                            <legend className="fieldset-legend">Login</legend>

                            <label className="label">Email</label>
                            <input id='email' onChange={handleInputChange} type="email" className="input" placeholder="Email"/>
                            {(loginData.email.error.length != 0) && <span className='error'>{loginData.email.error}</span>}

                            <label className="label">Password</label>
                            <input id='password' onChange={handleInputChange} type="password" className="input" placeholder="Password" />
                            {(loginData.password.error.length != 0) && <span className='error'>{loginData.password.error}</span>}

                            <div className='mt-2 flex items-center'>
                                <p>Remember browser</p>
                                <input className='checkbox checkbox-md ml-2' onChange={event => rememberMe.current = event.target.checked} type='checkbox'/>
                            </div>

                            <Button async={true} onClick={login} className='mt-1' width="100%" label="Login" icon={<FontAwesomeIcon icon={faArrowRightToBracket} />} />

                            <p>Don't have an account? <NavLink to='/register'><b className='hover:underline'>Register</b></NavLink></p>
                            <NavLink to='/request-password'><a className='hover:underline cursor-pointer'>Forgot my password</a></NavLink>
                        </fieldset>
                    </div>
                </div>
            </>
        );
}

export default Login;