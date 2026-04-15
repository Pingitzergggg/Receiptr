import {type ReactElement, useEffect, useRef, useState} from 'react'
// import { receiptsDummy } from '../misc/dummydata';
import '../tailwind.css'
import '../style.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Receipt from '../tools/Receipt';
import Upload from '../tools/Upload';
import type {paginatable} from "../misc/databaseTables.ts";
import {paginate} from "../misc/receiver.ts";
import Filter from "../tools/Filter.tsx";
import Popup from "../tools/Popup.tsx";

// let receipts : any[] = receiptsDummy;
function ReceiptPanel() : any {
    const [receipts, updateReceipts] = useState<paginatable['receipts']['query']>([]);
    const filters = useRef<string>('');
    const isLastPage = useRef<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    async function load(offset: number) {
        console.log(`Current filter: ${filters.current}`);
        const session: paginatable['receipts'] | null = await paginate<'receipts'>('receipts', offset, filters.current);
        if (session) {
            isLastPage.current = session.last_page;
            filters.current = session.filters;
            console.log(`Modified filters: ${filters.current}`);
            updateReceipts(session.query);
        }
    }

  useEffect(() => {
      const receiptSession = sessionStorage.getItem('receipts');
      if (receiptSession && !location.state?.uploadSuccess && !location.state?.deleteSuccess) {
          const session = JSON.parse(receiptSession);
          if (session) {
              isLastPage.current = session.last_page;
              filters.current = session.filters;
              updateReceipts(session.query);
          }
      } else {
          load(0);
      }
  }, [location.state])

  let receiptPanel: ReactElement[] = [];
  if (receipts) {
      receiptPanel = receipts.map(receipts =>
          <Receipt
              id={receipts.id}
              title={receipts.title}
              store={receipts.store}
              card={receipts.card ? receipts.card : "none"}
              creation={receipts.purchased_at}
              size={receipts.size}
              unit={receipts.unit}
              category={receipts.category}
              color={receipts.color}
              price={receipts.price}
              currency={receipts.currency}
              card_id={receipts.card_id}
              category_id={receipts.category_id}
          />
      );
  }

  return (
    <>
        {location.state?.deleteSuccess && <Popup type={"SUCCESS"} message={'Delete successful!'} />}
        {location.state?.uploadSuccess && <Popup type='SUCCESS' message='Upload was successful!' />}
        <Outlet />
        <Upload onClick={() => navigate(location.pathname == '/' ? 'receipts/upload' : 'upload')} />
        <Filter<'receipts'> forPanel='receipts' filterableColumns={['creation', 'title', 'size', 'color', 'price', 'currency', 'category']} onFilter={(result) => {
            if (result) {
                console.log('Receipts filter: '+result.filters);
                isLastPage.current = result.last_page;
                filters.current = result.filters;
                updateReceipts(result.query);
            }
        }} onRefresh={(result) => {
            if (result) {
                isLastPage.current = result.last_page;
                filters.current = result.filters;
                updateReceipts(result.query);
            }
        }} />
        <div className='container mt-10 mb-20 w-[90%]' id='receipts-div'>
            {receiptPanel.length == 0 && <div className='flex justify-center items-center'>
                {sessionStorage.getItem('receipts') && <p className='text-2xl'>No receipts yet...</p>}
                {!sessionStorage.getItem('receipts') &&  <i className='text-2xl'>Loading<span className="loading loading-spinner loading-md mx-1"></span></i>}
            </div>}
            {receiptPanel.length != 0 &&
            <div id='receipt-grid' className='grid grid-cols-1 min-[520px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
                {receiptPanel}
        </div>}
          {(receiptPanel.length != 0 && !isLastPage.current) &&
              <div className='w-full flex justify-center my-5'>
                <button className='btn' onClick={() => load(receipts.length)}>Load more</button>
              </div>}
      </div>
    </>
  );
}

export default ReceiptPanel;