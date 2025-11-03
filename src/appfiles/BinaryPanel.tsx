import { useEffect, useState } from "react";

function BinaryPanel({receiptId} : {receiptId : number}) : any {
    
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

    return (
        <div id="binary-panel-div">
            <div id="binary-panel-control-bar">
                <a className="batton">Fullscreen</a>
                <a className="batton">Close</a>
            </div>
            <iframe src="../../cats.pdf"></iframe>
        </div>
    )
}

export default BinaryPanel;