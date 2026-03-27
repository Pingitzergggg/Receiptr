import {type ReactElement, useEffect, useState} from 'react'
import '../tailwind.css'
import '../style.scss'
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import Card from '../tools/Card';
import Upload from '../tools/Upload';
import type {paginatable, responseType} from "../misc/databaseTables.ts";
import {extractResponse, requestResource, type response} from "../misc/receiver.ts";
import Refresh from "../tools/Refresh.tsx";
import Popup from "../tools/Popup.tsx";

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
        {location.state?.deleteSuccess && <Popup type={"SUCCESS"} message={'Delete successful!'} />}
        {location.state?.uploadSuccess && <Popup type='SUCCESS' message='Upload was successful!' />}
        <Outlet />
        <Upload onClick={() => navigate('upload')} />
        <Refresh trigger={load} />
          <div className='container mt-10 mb-20 w-[90%]'>
            <div id='receipt-grid' className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-15'>
                {cardPanel.length != 0 && cardPanel}
                {cardPanel.length == 0 && <p>Empty</p>}
            </div>
          </div>
    </>
  );
}

export default CardPanel;