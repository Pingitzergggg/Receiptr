import { useEffect, useState, type ReactElement } from "react";
import requestResource  from "../misc/receiver";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteItem from "../tools/DeleteItem";
import Select from "../tools/Select";

function Test() : any {
    return <>
            <div className="btn-container">
                <button className="btn">Upload</button>
                <div id="layer1"></div>
            </div>
        </>
}

export default Test;