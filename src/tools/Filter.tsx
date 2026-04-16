import {type ReactElement, useEffect, useRef, useState} from "react";
import type {paginatable} from "../misc/databaseTables.ts";
import Button from "./Button.tsx";
import Input from "./Input.tsx";
import Select from "./Select.tsx";
import {type response, requestResource, extractResponse} from "../misc/receiver.ts";
import {stringValidate} from "../misc/stringValidator.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faFilter} from "@fortawesome/free-solid-svg-icons";
import Refresh from "./Refresh.tsx";

type forPanel = "receipts" | "cards" | "categories";
type filter = {
    order?: string,
    search?: string,
    direction?: string
}

type propsType<T extends keyof paginatable> = {
    forPanel: forPanel;
    filterableColumns?: string[];
    onFilter?: (result: paginatable[T]|null) => void,
    onRefresh?: (result: paginatable[T]|null) => void
}

function Filter<T extends keyof paginatable>({forPanel, onFilter, onRefresh, filterableColumns}: propsType<T>): ReactElement {
    const filter = useRef<filter>({});
    const [keyword, setKeyword] = useState<{value: string, error: string}>({value: '', error: ''});

    useEffect(() => {filter.current.search = keyword.value}, [keyword.value]);

    async function load(): Promise<paginatable[T]|null> {
        const filterString: string = `${filter.current.order ? "orderBy="+filter.current.order : ""}${filter.current.search ? "&search="+filter.current.search : ""}${filter.current.direction ? "&direction="+filter.current.direction : ""}`;
        console.log(`Attempting to fetch with ${filterString.trim()}...`);
        const response: response<'receipts'> = await requestResource<'receipts'>('receipts', 'GET', null, filterString.trim());
        // @ts-ignore
        const data: paginatable[T]|null = await extractResponse<'receipts'>(response);
        if (data) {
            sessionStorage.setItem(forPanel, JSON.stringify({...data, filters: filterString}));
            return {...data, filters: filterString};
        }
        return null;
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const value = event.target.value;
        try {
            stringValidate('NAME', value);
            setKeyword({value: value, error: ''});
        } catch(err: any) {
            if (value.length == 0) {
                setKeyword({value: '', error: ''});
            } else {
                setKeyword({value: value, error: err});
            }
        }
    }

    const [filterOpened, setFilterOpened] = useState<boolean>(false);
    return (<div className="justify-evenly items-center w-[90%] mt-10">
        <div className="flex justify-evenly items-center px-1">
            <div onClick={() => setFilterOpened(!filterOpened)} className="flex items-center cursor-pointer">
                <FontAwesomeIcon className={`${filterOpened ? '' : 'rotate-[-90deg]'} transition`} icon={faCaretDown} />
                <h3 className="font-bold text-2xl p-2">Filters</h3>
            </div>
            <Refresh trigger={async () => {
                if (onRefresh) onRefresh(await load());
            }} className="mt-[0] p-2" />
        </div>
        {filterOpened && <div className='flex md:flex-row flex-col bg-(--card-background) rounded-[10px] p-3'>
            <div className="flex w-full justify-center items-center">
                <div className='mr-2 w-[50%]'>
                    <Select  defaultValue='creation' width='100%' title='Order By' id='orderby' errorInValue={false} onChange={(event) => {
                        if (event.target.value) filter.current.order = event.target.value;
                    }} values={
                        !filterableColumns ? [] :
                        filterableColumns.map(each => {return {value: each, label: each}}).filter(each => each.value !== 'color')
                    } />
                </div>
                <Input width='100%' title='Search' id='search' errorInValue={false} value={keyword.value} onChange={handleInputChange} />
            </div>
            <div className="flex w-full md:w-[40%] justify-between md:justify-center items-center">
                <div className="flex">
                    <p>Reverse: </p>
                    <input type="checkbox" className="checkbox checkbox-md ml-2" onChange={event => {
                        filter.current.direction = event.target.checked ? "desc" : "asc";
                        console.log(filter.current.direction);
                    }} />
                </div>
                <Button width="100%" className="ml-5 md:w-[50%]!" label='Filter' icon={<FontAwesomeIcon style={{width: '1rem', height: '1rem'}} icon={faFilter} />} onClick={async () => {
                    if (onFilter) onFilter(await load());
                }} />
            </div>
        </div>}</div>
    );
}

export default Filter;