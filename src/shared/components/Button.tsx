// @ts-ignore
import { useEffect, useState, type ReactElement } from "react";

type propsType = {
    label: string,
    icon?: ReactElement,
    height?: string,
    width?: string,
    fontSize?: string,
    className?: string,
    async?: boolean,
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => Promise<void>|void
};

function Button({label, icon, height, width, className, async, fontSize, onClick} : propsType) : ReactElement {

    const [canBeHovered, setCanBeHovered] = useState<boolean>(false);
    const [isHovered, setHovered] = useState<boolean>(false);
    const [isClicked, setClicked] = useState<boolean>(false);

    useEffect(() => {
        const hoverableMatcher = window.matchMedia('(hover: hover)');
        setCanBeHovered(hoverableMatcher.matches);
    }, []);


    if (isHovered) {
        setTimeout(() => setHovered(false), 500);
    }

    return (<>
        <div onClick={event => {
            setClicked(true);
            if (!canBeHovered) {
                setHovered(true);
            }
            if (onClick) {
                if (async) {
                    onClick(event)?.then(() => setClicked(false));
                } else {
                    onClick(event);
                    setClicked(false);
                }
            }
        }} onMouseOver={() => {if (canBeHovered) {
                setHovered(true);
            }}} className={`btn-container ${isHovered ? 'btn-container-hover' : ''} ${className}`} style={{height: `${height ? height : '2.5rem'}`, width: `${width ? width : '5rem'}`}}>
            <button className="btn" style={{fontSize: `${fontSize}`}}>
                {label}
                {(icon && !async) && icon}
                {(icon && async && !isClicked) && icon}
                {(async && isClicked) && <span className="loading loading-spinner loading-md mx-1"></span>}
            </button>
            <div></div>
        </div>
    </>);
}

export default Button;