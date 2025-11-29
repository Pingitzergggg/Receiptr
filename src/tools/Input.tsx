import { useState, type ReactElement } from "react";

type propsType = {
    title: string,
    error?: string,
    className?: string,
    id: string,
    errorInValue: boolean,
    width?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({title, error, className, id, errorInValue, width, onChange} : propsType) : ReactElement {
    
    const [isClassActivated, setClassActivated] = useState<boolean>(false);

    return (
        <div style={{width: `${width === undefined ? '12rem' : width}`, height: '2.5rem', margin: '1rem 0'}} className={className === undefined ? '' : className}>
            <div className={`input-container 
                ${isClassActivated ? 'input-focus' : ''} 
                ${errorInValue ? 'input-error' : ''}`}>
                    <label id="title">{title}</label>
                    <input type="text" id={id}
                        onFocus={() => setClassActivated(true)}
                        onBlur={e => setClassActivated(e.target.value.length > 0)}
                        onChange={onChange}
                    />
                    <div></div>
            </div>
            {errorInValue && <label id="error" className="text-(--error-color) text-sm break-all">{error === undefined ? "Input error" : error}</label>}
        </div>
    );
}

export default Input;