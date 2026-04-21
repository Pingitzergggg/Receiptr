import { NavLink, useNavigate } from 'react-router-dom'
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
    const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
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
                navigate("/", {state: {globalPopup:{message: 'Successfull login!', type: 'SUCCESS'}}});
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
                {error && <Popup type='ERROR' message={error}/>}
                <div className='flex justify-evenly items-center w-[100vw] h-[100vh]'>
                    <div id='banner' className='w-full hidden lg:block'>
                        <img draggable={false} src={`/banner_${localStorage.getItem('theme')}_trans.png`} alt='Banner' className='h-[100vh] w-[50vw]' />
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
                            <div className='relative'>
                                <input id='password' onChange={handleInputChange} type={isPasswordVisible ? "text" : "password" }className="input" placeholder="Password" />
                                <span className="absolute top-[50%] right-0" style={{transform: 'translate(-50%, -50%)'}}>
                                {isPasswordVisible && 
                                    <svg onClick={() => setPasswordVisible(false)} className="w-[1rem] h-[1rem] cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke={localStorage.getItem('theme') === 'dark' ? '#ffffff' : '#000000'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke={localStorage.getItem('theme') === 'dark' ? '#ffffff' : '#000000'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>}
                                {!isPasswordVisible && 
                                    <svg onClick={() => setPasswordVisible(true)} className="w-[1rem] h-[1rem] cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" stroke={localStorage.getItem('theme') === 'dark' ? '#ffffff' : '#000000'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>}
                                </span>
                            </div>
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