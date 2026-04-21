import { useEffect, useState, type ReactElement } from "react";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import NotFound from "./NotFound";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import QRCode from 'react-qr-code';

function KioskDemo(): ReactElement {
    const [params] = useSearchParams()
    const key: string|null = params.get('key');
    const navigate = useNavigate();
    const location = useLocation();
    const [displayMode, setDisplayMode] = useState<boolean>(false);

    useEffect(() => {
        if (location.state?.sessionCreated) {
            setDisplayMode(true);
        }
    }, [location.pathname]);

    let Element: ReactElement = <>
        <div className="absolute-center bg-(--card-background)! w-[75%] h-auto p-5 rounded-[15px] flex flex-col justify-center items-center">
            <div className="flex flex-col items-center my-2">
                <img src="/icon.png" className="w-[10rem] h=[5rem]" alt="logo" />
                <h1 className="text-6xl font-bold">Receiptr</h1>
                <h2 className="text-2xl mt-2">Kiosk Demo</h2>
            </div>
            {!displayMode && <p className="text-center">
                This demo page serves the purpose to simulate generating a session QR-code,
                which upon scanning with the Receiptr app on phone can be used to link
                the current receipt to your account. This method replaces technologies
                like NFC and opens the way for more general payment methods as well (e.g.: cash)
            </p>}
            {(displayMode && sessionStorage.getItem('sessionKey')) && <>
                <h3 className="text-3xl my-3">Your QR-Code</h3>
                <div className="bg-[white] p-5 rounded-[15px]">
                    <QRCode value={sessionStorage.getItem('sessionKey')!} />
                </div>
            </>}
            <Button onClick={() => navigate('form?key='+key)} className="my-5 md:w-[50%]!" width="90%" label="Generate QR-code!" icon={<FontAwesomeIcon icon={faQrcode} />} />
        </div>
        <Outlet />
    </>

    if (!key) {
        Element = <NotFound />;
    }

    return Element;
}

export default KioskDemo;