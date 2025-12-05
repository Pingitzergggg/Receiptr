import { useState, useEffect } from 'react'
import { receiptsDummy } from '../misc/dummydata';
import '../tailwind.css'
import '../style.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import UploadReceiptPanel from './upload/UploadReceiptPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faX } from '@fortawesome/free-solid-svg-icons';

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
  const location = useLocation();

  const receiptPanel : any = receipts.map(receipts =>
    <div onClick={() => navigate(`/receipts/${receipts.id}`)} key={receipts.id} className="card w-96 bg-base-100 card-xs shadow-sm">
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
        <div>
          <a className='btn-nav bg-red-400'>
            <FontAwesomeIcon icon={faX} />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Outlet />
      <button onClick={() => navigate(location.pathname == '/' ? 'receipts/upload' : 'upload')} className='upload-button btn'>
        <FontAwesomeIcon icon={faPlus} />
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