import { faUpRightAndDownLeftFromCenter, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BinaryPanel() : any {
    // @ts-ignore
    const { receiptId } = useParams();
    
//   const [innerRenderCount, setInnerRenderCount] = useState(0); //This is the working fetch call, only commented for local testing!! DONT DELETE

//   useEffect(() => {
//     fetch('http://localhost:5001/billconvert/fetch_binary_data', {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json',
//       'X-API-KEY': "]WcdihR9N6}Ol5/V`e}sDD',HRRZIm`Kk|oG'grXb})cJqKS(S",
//       'id': '1'
//     },
//     body: JSON.stringify({id:1})
//   })
//     .then(response => response.blob())
//     .then(data => {
//       const objectURL = URL.createObjectURL(data);
//       console.log(`BinaryPanel has re-rendered the page!\nValue: ${innerRenderCount}`);
//       setInnerRenderCount((innerRenderCount) => innerRenderCount + 1);
//     });
//   }, [])

    const navigate = useNavigate();

    let [content, setContent] : any = useState(<i>Loading<span className="loading loading-spinner loading-md mx-1"></span></i>);

    useEffect(() => {
        const promise = new Promise(resolve => setTimeout(() => resolve(
            <>
                <iframe src="../../cats.pdf"></iframe>
                <div id="binary-panel-control-bar">
                    <p>Receipt name</p>
                    <div className="flex justify-center items-center">
                        <a onClick={() => window.location.assign('../../cats.pdf')} className="btn-nav bg-amber-400 ml-3">
                            <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
                        </a>
                        <a onClick={() => navigate('/receipts')} className="btn-nav bg-red-400 ml-3">
                            <FontAwesomeIcon icon={faXmark} />
                        </a>
                    </div>
                </div>
            </>
        ), 500));

        promise.then(value => setContent(value));
    }, []);

    return <div id="binary-panel-div"> {content} </div>;
}

export default BinaryPanel;