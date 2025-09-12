import { useState, useEffect } from 'react'
import { cardsDummy } from './dummydata';
import '../tailwind.css'
import '../style.scss'

//let cards : any[] = [] //uncomment for production
let cards : any[] = cardsDummy;
function CardPanel() : any {
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

  const cardPanel : any = cards.map(cards =>
    <div key={cards.id} className="card w-96 bg-base-100 card-xs shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{cards.bank} *{cards.number}</h2>
        <div className="justify-end card-actions">
          <button className="btn btn-primary">Open</button>
        </div>
      </div>
    </div>
  )

  return cardPanel;
}

export default CardPanel;