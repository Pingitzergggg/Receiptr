import { useEffect, useState, type ReactElement } from "react";
import requestResource  from "../misc/receiver";
import { faCheck, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteItem from "../tools/DeleteItem";
import Select from "../tools/Select";
import Button from "../tools/Button";

function Test() : any {

    return <div className="absolute-center">
        <Button label="Upload" icon={<FontAwesomeIcon icon={faCheck} />} />
        </div>
}

export default Test;