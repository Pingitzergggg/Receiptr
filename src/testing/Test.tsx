import { useEffect, useState, type ReactElement } from "react";
import { faCheck, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteItem from "../tools/DeleteItem";
import Select from "../tools/Select";
import Button from "../tools/Button";
import PdfViewer from "../tools/PdfViewer";

function Test() : any {

    return (<>
        <PdfViewer fileUrl="../../cats.pdf"  scrollable={false} />
    </>);
}

export default Test;