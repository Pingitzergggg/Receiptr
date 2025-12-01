import { useState } from "react";
import { testerMethod } from "../misc/reciever";

function Test() : any {
    let values;

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
        });

    return <>
        {values}
    </>
}

export default Test;