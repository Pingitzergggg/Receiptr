import { useState, type ReactElement } from "react";
import { testerMethod } from "../misc/receiver";

function Test() : any {
    let values : any;

    const [page, setPage] = useState<ReactElement>(<p>Loading</p>);

    testerMethod()
        .then(data => {
            if(data) {
                values = data.map(i => (
                    <div>
                        <h2>{i.name}</h2>
                        <p>{i.value}</p>
                    </div>
                ));
            }
            setPage(values);
        });

    return <>
        {page}
    </>
}

export default Test;