import { useState, useEffect, type ReactElement } from 'react'
import { cardsDummy } from '../misc/dummydata';
import '../tailwind.css'
import '../style.scss'
import { Outlet, useNavigate } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '../tools/Card';
import Upload from '../tools/Upload';

//let cards : any[] = [] //uncomment for production
let cards : any[] = cardsDummy;
function CardPanel() : any {
  const navigate = useNavigate();
  // const [innerRenderCount, setInnerRenderCount] = useState(0); //This is the working fetch call, only commented for local testing!! DONT DELETE

  // useEffect(() => {
  //   cards = [];
  //   fetch('http://localhost:5001/billconvert/fetch_card_data', {
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
  //       cards.push(data[key]);
  //     }
  //     console.log(`CardPanel has re-rendered the page!\nValue: ${innerRenderCount}`);
  //     setInnerRenderCount((innerRenderCount) => innerRenderCount + 1);
  //   });
  // }, [])

  const cardPanel : ReactElement[] = cards.map(cards =>
     <Card
        id={cards.id}
        bank={cards.bank}
        date={cards.expiryDate}
        number={cards.number}
        holder={cards.holder}
        category={cards.category}
        color={cards.color} 
         />  
  )

  return (
    <>
      <Outlet />
      <Upload onClick={() => navigate('upload')} />
      <div className='container mt-20 mb-20 w-[90%]'>
        <div id='receipt-grid' className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-15'>
          {cardPanel}
        </div>
      </div>
    </>
  );
}

export default CardPanel;