import type { ReactElement } from "react"
import { useState, useEffect, useRef } from "react"

type optionType = {
    value: string | number,
    label: string
}

type propsType = {
    title: string,
    error?: string,
    className?: string,
    id: string,
    errorInValue: boolean,
    width?: string,
    values?: optionType[],
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

function Select({title, error, className, id, errorInValue, width, values, onChange} : propsType) : ReactElement {
    const [isClassActivated, setClassActivated] = useState<boolean>(false);
    
        const select = useRef<HTMLSelectElement>(null);
    
        useEffect(() => {
            if (!select.current) return;
            if (select.current.value.length != 0) {
                setClassActivated(true);
            }
        }, []);
    
        return (
            <div style={{width: `${width === undefined ? '12rem' : width}`, height: '2.5rem', margin: `.5rem 0 ${errorInValue ? '1.5rem' : '.5rem'} 0`}} className={className === undefined ? '' : className}>
                <div className={`input-container 
                    ${isClassActivated ? 'input-focus' : ''} 
                    ${errorInValue ? 'input-error' : ''}`}>
                        <select ref={select} id={id}
                            onFocus={() => setClassActivated(true)}
                            onBlur={e => setClassActivated(e.target.value.length > 0)}
                            onChange={onChange} >
                                <option value="" unselectable="on">{title}</option>
                                {values?.map(element => 
                                    <option value={element.value}>{element.label}</option>
                                )}
                        </ select>
                        <div></div>
                </div>
                {errorInValue && <label id="error" className="error text-sm break-all">{error === undefined ? "Input error" : error}</label>}
            </div>
        );
}

export default Select;