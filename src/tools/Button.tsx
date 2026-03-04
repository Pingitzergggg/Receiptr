// @ts-ignore
import { useEffect, useState, type ReactElement } from "react";

type propsType = {
    label: string,
    icon?: ReactElement,
    height?: string,
    width?: string,
    fontSize?: string,
    className?: string,
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
};

function Button({label, icon, height, width, className, fontSize, onClick} : propsType) : ReactElement {

    const [isHovered, setHovered] = useState<boolean>(false);

    console.log(`isHovered: ${isHovered}`)

    if (isHovered) {
        setTimeout(() => setHovered(false), 500);
    }

    return (<>
        <div onMouseOver={() => setHovered(true)} className={`btn-container ${isHovered ? 'btn-container-hover' : ''} ${className}`} style={{height: `${height ? height : '2.5rem'}`, width: `${width ? width : '5rem'}`}}>
            <button className="btn" style={{fontSize: `${fontSize}`}}>
                {label}
                {icon && icon}
            </button>
            <div onClick={onClick}></div>
        </div>
    </>);
}

export default Button;