import { useState, useEffect, type ReactElement } from 'react'
import { receiptsDummy } from '../misc/dummydata';
import '../tailwind.css'
import '../style.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import UploadReceiptPanel from './upload/UploadReceiptPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faFilePen, faPlus, faTrashCan, faX } from '@fortawesome/free-solid-svg-icons';
import Receipt from '../tools/Receipt';
import Popup from '../tools/Popup';
import Upload from '../tools/Upload';

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

  const receiptPanel : ReactElement[] = receipts.map(receipts =>
    <Receipt 
      id={receipts.id}
      title={receipts.title}
      store={receipts.companyName}
      cardNumber={receipts.number}
      creation={receipts.dateCreated}
      size={receipts.fileSize}
      type={receipts.fileType}
      unit={receipts.fileMeasurementUnit}
      category={receipts.category}
      color={receipts.color}
      price={receipts.price}
      currency={receipts.currency} /> 
  );

  return (
    <>
      <Outlet />
      <Upload onClick={() => navigate(location.pathname == '/' ? 'receipts/upload' : 'upload')} />
      <div className='container mt-20 mb-20' id='receipts-div'>
        <div id='receipt-grid' className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-15'>
          {receiptPanel}
        </div>
      </div>
    </>
  );
}

export default ReceiptPanel;