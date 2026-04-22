import {type ReactElement, useEffect, useState} from 'react'
import '../../../styles/tailwind.css'
import '../../../styles/style.scss'
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import Card from '../components/Card.tsx';
import Upload from '../../upload/components/UploadButton.tsx';
import type { paginatable, responseType } from '../../../shared/utils/databaseTables.ts';
import {extractResponse, requestResource, type response} from "../../../services/receiver.ts";
import Refresh from '../../../shared/components/Refresh.tsx';

function CardPanel() : any {
  const navigate = useNavigate();
  const [cards, updateCards] = useState<paginatable['cards']['query']>([]);
  const location = useLocation();

    async function load() {
        const response: response<'cards'> = await requestResource<'cards'>('cards', 'GET');
        const data: paginatable['cards'] | null = await extractResponse<'cards'>(response);
        if (data) {
            sessionStorage.setItem('cards', JSON.stringify(data));
            updateCards(data.query);
        }
    }

  useEffect(() => {
      const cardSession = sessionStorage.getItem('cards');
      if (cardSession && !location.state?.uploadSuccess && !location.state?.deleteSuccess) {
          const session: responseType['cards'] = JSON.parse(cardSession);
          if (session) updateCards(session.query);
      } else {
          load();
      }
  }, [location.state]);

    let cardPanel: ReactElement[] = [];
    if (cards) {
        cardPanel = cards.map(cards =>
            <Card
                id={cards.id}
                title={cards.title}
                type={cards.type ? cards.type : "DEFAULT"}
                currency={cards.currency}
                total_receipts={cards.total_receipts}
                total_spent={cards.total_spent}
                category={cards.category}
                category_id={cards.category_id}
                color={cards.color}
            />
        )
    }

  return (
    <>
        <Outlet />
        <Upload onClick={() => navigate('upload')} />
        <Refresh trigger={load} />
          <div className='container mt-10 mb-20 w-[90%]'>
              {cardPanel.length == 0 && <div className='flex items-center justify-center'>
                  {sessionStorage.getItem('cards') && <p className='text-2xl'>No cards yet...</p>}
                  {!sessionStorage.getItem('cards') &&  <i className='text-2xl'>Loading<span className="loading loading-spinner loading-md mx-1"></span></i>}
              </div>}
              {cardPanel.length != 0 &&
                  <div id='card-grid' className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-15'>
                      {cardPanel}
                  </div>}
          </div>
    </>
  );
}

export default CardPanel;