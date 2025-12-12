import { useEffect, useState, useRef, type ReactElement } from "react";

type propsType = {
    title: string,
    error?: string,
    className?: string,
    id: string,
    errorInValue: boolean,
    width?: string,
    value?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({title, error, className, id, errorInValue, width, value, onChange} : propsType) : ReactElement {
    
    const [isClassActivated, setClassActivated] = useState<boolean>(false);

    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!input.current) return;
        if (input.current.value.length != 0) {
            setClassActivated(true);
        }
    }, []);

    return (
        <div style={{width: `${width === undefined ? '12rem' : width}`, height: '2.5rem', margin: '1rem 0'}} className={className === undefined ? '' : className}>
            <div className={`input-container 
                ${isClassActivated ? 'input-focus' : ''} 
                ${errorInValue ? 'input-error' : ''}`}>
                    <label id="title">{title}</label>
                    <input ref={input} type="text" id={id}
                        onFocus={() => setClassActivated(true)}
                        onBlur={e => setClassActivated(e.target.value.length > 0)}
                        onChange={onChange}
                        value={value}
                    />
                    <div></div>
            </div>
            {errorInValue && <label id="error" className="text-(--error-color) text-sm break-all">{error === undefined ? "Input error" : error}</label>}
        </div>
    );
}

export default Input;