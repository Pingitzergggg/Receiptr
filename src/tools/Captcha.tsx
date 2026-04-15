import { useRef, useState, type ReactElement, type RefObject } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "../misc/receiver";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";

const RECAPTCHA_SITE_KEY: string = "6LcjXLgsAAAAAEG9fQcWioFVoDZWbb1VhtK16AYt";

function Captcha(): ReactElement {
    const recaptchaRef: RefObject<ReCAPTCHA|null> = useRef(null);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    async function validate() {
        const token: string|null|undefined = recaptchaRef.current?.getValue();
        if (!token) {
            setError('Please fill reCAPTCHA!');
            return;
        }

        try {
            if (!(await verifyCaptcha(token))) {
                setError('CAPTCHA Invalid');
                return;
            }
            recaptchaRef.current?.reset();
            navigate('/', {state: {fromLogin: true}});
        } catch (error) {
            if (error instanceof WebTransportError) {
                setError(error.message);
            } else {
                setError('Error occurred!');
            }
            console.error(error);
        }
    }

    return <>
        {error && <Popup type="ERROR" message={error} />}
        <div className="absolute-center">
            <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} ref={recaptchaRef} />
        </div>
    </>
}

export default Captcha;