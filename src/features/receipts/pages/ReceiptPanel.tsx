import {type ReactElement, useEffect, useRef, useState} from 'react'
import '../../../styles/tailwind.css'
import '../../../styles/style.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Receipt from '../components/Receipt.tsx';
import Upload from '../../upload/components/UploadButton.tsx';
import type { paginatable } from '../../../shared/utils/databaseTables.ts';
import { paginate } from '../../../services/receiver.ts';
import Filter from '../../../shared/components/Filter.tsx';

function ReceiptPanel() : any {
    const [receipts, updateReceipts] = useState<paginatable['receipts']['query']>([]);
    const filters = useRef<string>('');
    const isLastPage = useRef<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    async function load(offset: number) {
        const session: paginatable['receipts'] | null = await paginate<'receipts'>('receipts', offset, filters.current);
        if (session) {
            isLastPage.current = session.last_page;
            filters.current = session.filters;
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
        <Outlet />
        <button onClick={() => navigate('/scanner')} className='upload-button btn bottom-40!'>
            <svg className='transition' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M160 224L224 224L224 160L160 160L160 224zM96 144C96 117.5 117.5 96 144 96L240 96C266.5 96 288 117.5 288 144L288 240C288 266.5 266.5 288 240 288L144 288C117.5 288 96 266.5 96 240L96 144zM160 480L224 480L224 416L160 416L160 480zM96 400C96 373.5 117.5 352 144 352L240 352C266.5 352 288 373.5 288 400L288 496C288 522.5 266.5 544 240 544L144 544C117.5 544 96 522.5 96 496L96 400zM416 160L416 224L480 224L480 160L416 160zM400 96L496 96C522.5 96 544 117.5 544 144L544 240C544 266.5 522.5 288 496 288L400 288C373.5 288 352 266.5 352 240L352 144C352 117.5 373.5 96 400 96zM384 416C366.3 416 352 401.7 352 384C352 366.3 366.3 352 384 352C401.7 352 416 366.3 416 384C416 401.7 401.7 416 384 416zM384 480C401.7 480 416 494.3 416 512C416 529.7 401.7 544 384 544C366.3 544 352 529.7 352 512C352 494.3 366.3 480 384 480zM480 512C480 494.3 494.3 480 512 480C529.7 480 544 494.3 544 512C544 529.7 529.7 544 512 544C494.3 544 480 529.7 480 512zM512 416C494.3 416 480 401.7 480 384C480 366.3 494.3 352 512 352C529.7 352 544 366.3 544 384C544 401.7 529.7 416 512 416zM480 448C480 465.7 465.7 480 448 480C430.3 480 416 465.7 416 448C416 430.3 430.3 416 448 416C465.7 416 480 430.3 480 448z"/></svg>
        </button>
        <Upload onClick={() => navigate(location.pathname == '/' ? 'receipts/upload' : 'upload')} />
        <Filter<'receipts'> forPanel='receipts' filterableColumns={['creation', 'title', 'size', 'color', 'price', 'currency', 'category']} onFilter={(result) => {
            if (result) {
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