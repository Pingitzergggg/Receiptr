import { useEffect, useRef, type ReactElement, type RefObject } from "react";
import { useSearchParams } from "react-router-dom";
import UploadReceiptPanel from "../appfiles/upload/UploadReceiptPanel";
import NotFound from "./NotFound";

function KioskDemo(): ReactElement {
    const [params] = useSearchParams()
    const key: string|null = params.get('key');

    let Element: ReactElement = <>
        <div className="absolute-center">
            <div>
                <img src="/icon.png" alt="logo" />
                <h1>Receiptr</h1>
            </div>
            <h2>Kiosk Demo</h2>
            {!!key && <UploadReceiptPanel key={key} />}
        </div>
    </>

    if (!key) {
        Element = <NotFound />;
    }

    return Element;
}

export default KioskDemo;