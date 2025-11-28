import { useState } from "react";
import Input from "../tools/Input";

function Test() : any {

    const [throwError, setError] = useState<boolean>(false);

    return (
        <>
            <legend className="absolute-center">
                <Input errorInValue={throwError} width="12rem" title="Name" />
                <button onClick={() => setError(!throwError)} className="mt-5">Throw</button>
            </legend>
        </>
    );
}

export default Test;