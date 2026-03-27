import Input from "../tools/Input.tsx";
import {checkInjection} from "../misc/stringValidator.ts";
import {useState} from "react";
import Select from "../tools/Select.tsx";
import {requestResource} from "../misc/receiver.ts";

function Test() : any {

    return <Select selected={2} title={'asder'} id={'2'} errorInValue={false} values={[{label: 'asdasder', value: 1}, {label: 'asderer', value: 2}]} />
}

export default Test;