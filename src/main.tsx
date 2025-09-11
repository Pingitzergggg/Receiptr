import { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { receiptsDummy, cardsDummy } from './dummydata'
import './tailwind.css'
import './style.scss'

const root = createRoot(document.getElementById('root')!);

type panels = "RECEIPTS" | "CARDS" | "SETIINGS" | "USER";

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
          <button className="btn btn-primary">Open</button>
        </div>
      </div>
    </div>
  );

  return receiptPanel;
}

function Panel() {
  let [currentPanel, setCurrentPanel] = useState<panels>("RECEIPTS");
  const Navbar = (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );

  const Dock = (
    <div className="dock">
      <button id="receipts" onClick={() => {setCurrentPanel("RECEIPTS");}} className={currentPanel == "RECEIPTS" ? 'dock-active' : ''}>
        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><polyline points="1 11 12 2 23 11" fill="none" stroke="currentColor" stroke-miterlimit="10" strokeWidth="2"></polyline><path d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></path><line x1="12" y1="22" x2="12" y2="18" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></line></g></svg>
        <span className="dock-label">Home</span>
      </button>

      <button id="cards" onClick={() => {setCurrentPanel("CARDS");}} className={currentPanel == "CARDS" ? 'dock-active' : ''}>
        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><polyline points="3 14 9 14 9 17 15 17 15 14 21 14" fill="none" stroke="currentColor" stroke-miterlimit="10" strokeWidth="2"></polyline><rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></rect></g></svg>
        <span className="dock-label">Inbox</span>
      </button>

      <button id="settings" onClick={() => {setCurrentPanel("SETIINGS");}} className={currentPanel == "SETIINGS" ? 'dock-active' : ''}>
        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></circle><path d="m22,13.25v-2.5l-2.318-.966c-.167-.581-.395-1.135-.682-1.654l.954-2.318-1.768-1.768-2.318.954c-.518-.287-1.073-.515-1.654-.682l-.966-2.318h-2.5l-.966,2.318c-.581.167-1.135.395-1.654.682l-2.318-.954-1.768,1.768.954,2.318c-.287.518-.515,1.073-.682,1.654l-2.318.966v2.5l2.318.966c.167.581.395,1.135.682,1.654l-.954,2.318,1.768,1.768,2.318-.954c.518.287,1.073.515,1.654.682l.966,2.318h2.5l.966-2.318c.581-.167,1.135-.395,1.654-.682l2.318.954,1.768-1.768-.954-2.318c.287-.518.515-1.073.682-1.654l2.318-.966Z" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></path></g></svg>
        <span className="dock-label">Settings</span>
      </button>
    </div>
  );

  let PanelContent;

  if (currentPanel == "RECEIPTS") {
    PanelContent = (
      <div className='container mt-20 mb-20'>
        <div id='receipt-grid' className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols3 lg:grid-cols4 gap-4'>
          < ReceiptPanel/>
        </div>
      </div>
    );
  } else if (currentPanel == "CARDS") {
    PanelContent = (
      <div className='container mt-20 mb-20'>
        <div id='receipt-grid' className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols3 lg:grid-cols4 gap-4'>
          < CardPanel/>
        </div>
      </div>
    );
  } else if (currentPanel == "USER") {
    PanelContent = <></>;
  } else if (currentPanel == "SETIINGS"){
    PanelContent = <></>;
  } else {
    PanelContent = <></>;
  }

  return(
    <>
      {Navbar}
      {PanelContent}
      {Dock}
    </>
  );
}

root.render(
    <>
      < Panel/>
    </>
)
