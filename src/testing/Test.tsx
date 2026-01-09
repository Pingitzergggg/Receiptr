import { useEffect, useState, type ReactElement } from "react";
import { faCheck, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteItem from "../tools/DeleteItem";
import Select from "../tools/Select";
import Button from "../tools/Button";
import PdfViewer from "../tools/PdfViewer";
import Upload from "../tools/Upload";

function Test() : any {

    function handle(date : string) : any {
        return date;
    }

    return (<>
        <Button label="asder" />
    </>);
}

export default Test;