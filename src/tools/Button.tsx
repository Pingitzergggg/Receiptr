// @ts-ignore
import { useEffect, useState, type ReactElement } from "react";

type propsType = {
    label: string,
    icon?: ReactElement,
    height?: string,
    width?: string,
    fontSize?: string,
    className?: string,
    loadingIndicator?: boolean,
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
};

function Button({label, icon, height, width, className, loadingIndicator, fontSize, onClick} : propsType) : ReactElement {

    const [isHovered, setHovered] = useState<boolean>(false);
    const [isClicked, setClicked] = useState<boolean>(false);

    console.log(`isHovered: ${isHovered}`)

    if (isHovered) {
        setTimeout(() => setHovered(false), 500);
    }

    return (<>
        <div onMouseOver={() => setHovered(true)} className={`btn-container ${isHovered ? 'btn-container-hover' : ''} ${className}`} style={{height: `${height ? height : '2.5rem'}`, width: `${width ? width : '5rem'}`}}>
            <button className="btn" style={{fontSize: `${fontSize}`}}>
                {label}
                {(icon && !isClicked) && icon}
                {(loadingIndicator && isClicked) && <span className="loading loading-spinner loading-md mx-1"></span>}
            </button>
            <div onClick={event => {
                setClicked(true);
                if (onClick) onClick(event);
            }}></div>
        </div>
    </>);
}

export default Button;