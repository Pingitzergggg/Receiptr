import { useState, useEffect } from 'react'
import { receiptsDummy } from './dummydata';
import '../tailwind.css'
import '../style.scss'
import { Outlet, useNavigate } from 'react-router-dom';

//let receipts : any[] = []; //uncomment for production
let receipts : any[] = receiptsDummy;
function ReceiptPanel() : any {
  // const [innerRenderCount, setInnerRenderCount] = useState(0); //This is the working fetch call, only commented for local testing!! DONT DELETE

  // useEffect(() => {
  //   receipts = [];
  //   fetch('http://localhost:5001/billconvert/fetch_receipt_data', {
  //   method: 'POST',
  //   headers: {
  //     'content-type': 'application/json',
  //     'X-API-KEY': "]WcdihR9N6}Ol5/V`e}sDD',HRRZIm`Kk|oG'grXb})cJqKS(S",
  //     'id': '1'
  //   },
  //   body: JSON.stringify({id:1})
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     for(let key in data) {
  //       receipts.push(data[key]);
  //     }
  //     console.log(`ReceiptPanel has re-rendered the page!\nValue: ${innerRenderCount}`);
  //     setInnerRenderCount((innerRenderCount) => innerRenderCount + 1);
  //   });
  // }, [])

  const navigate = useNavigate();

  const receiptPanel : any = receipts.map(receipts =>
    <div key={receipts.id} className="card w-96 bg-base-100 card-xs shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{receipts.title}</h2>
        <p>
          Key: {receipts.id}<br/>
          Size: {receipts.fileSize + receipts.fileMeasurementUnit}<br/>
          Type: {receipts.fileType}<br/>
          Store: {receipts.companyName}<br/>
          Creation: {receipts.dateCreated}<br/>
          With card: {receipts.number}
        </p>
        <div className="justify-end card-actions">
          <button onClick={() => navigate(`/receipts/${receipts.id}`)} className="btn btn-primary">Open</button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Outlet />
      <button className='upload-button btn btn-soft w-auto h-auto p-[1rem]'>
        <svg className='size-[1rem]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#e6e6e6" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>
      </button>
      <div className='container mt-20 mb-20' id='receipts-div'>
        <div id='receipt-grid' className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-15'>
          {receiptPanel}
        </div>
      </div>
    </>
  );
}

export default ReceiptPanel;