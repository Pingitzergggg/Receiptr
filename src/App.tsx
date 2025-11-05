import { BrowserRouter, Routes, Route, NavLink, Outlet, Router, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Popup from './Popup'
import ReceiptPanel from './appfiles/ReceiptPanel'
import CardPanel from './appfiles/CardPanel'
import SettingsPanel from './appfiles/SettingsPanel'
import Login from './auth/Login'
import Register from './auth/Register'
import './tailwind.css'
import './style.scss'
import BinaryPanel from './appfiles/BinaryPanel'

function isUserLoggedIn() : boolean {
  let accountId : string = localStorage.getItem('id') as string; console.log(`accountId: ${accountId}`); //put CONST at production
  accountId = '1';
  if (accountId !== null) {
    if (accountId.length != 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function App() {
  const logout = () => localStorage.setItem('id', '');
  const Navbar = (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Receiptr</a>
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
            <li><NavLink to='/login' onClick={logout}>Logout</NavLink></li>
          </ul>
        </div>
      </div>
    </div>
  );
  
  const Dock = () => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
      console.log('checking if user logged in...'+isUserLoggedIn())
      if (!isUserLoggedIn()) {
        navigate('/login'); console.log("User not logged in, redirecting to /login")
      }
    }, [navigate]);
    return (
    <div className="dock">
        <button id="receipts" onClick={() => {navigate('/receipts')}} className={location.pathname == "/receipts" || location.pathname == "/" ? 'dock-active' : ''}>
          <svg className="size-[1.5em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#e0e0e0" d="M142 66.2C150.5 62.3 160.5 63.7 167.6 69.8L208 104.4L248.4 69.8C257.4 62.1 270.7 62.1 279.6 69.8L320 104.4L360.4 69.8C369.4 62.1 382.6 62.1 391.6 69.8L432 104.4L472.4 69.8C479.5 63.7 489.5 62.3 498 66.2C506.5 70.1 512 78.6 512 88L512 552C512 561.4 506.5 569.9 498 573.8C489.5 577.7 479.5 576.3 472.4 570.2L432 535.6L391.6 570.2C382.6 577.9 369.4 577.9 360.4 570.2L320 535.6L279.6 570.2C270.6 577.9 257.3 577.9 248.4 570.2L208 535.6L167.6 570.2C160.5 576.3 150.5 577.7 142 573.8C133.5 569.9 128 561.4 128 552L128 88C128 78.6 133.5 70.1 142 66.2zM232 200C218.7 200 208 210.7 208 224C208 237.3 218.7 248 232 248L408 248C421.3 248 432 237.3 432 224C432 210.7 421.3 200 408 200L232 200zM208 416C208 429.3 218.7 440 232 440L408 440C421.3 440 432 429.3 432 416C432 402.7 421.3 392 408 392L232 392C218.7 392 208 402.7 208 416zM232 296C218.7 296 208 306.7 208 320C208 333.3 218.7 344 232 344L408 344C421.3 344 432 333.3 432 320C432 306.7 421.3 296 408 296L232 296z"/></svg>
          <span className="dock-label mb-1">Receipts</span>
        </button>

        <button id="cards" onClick={() => {navigate('/cards')}} className={location.pathname == "/cards" ? 'dock-active' : ''}>
          <svg className="size-[1.5em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#e0e0e0" d="M64 192L64 224L576 224L576 192C576 156.7 547.3 128 512 128L128 128C92.7 128 64 156.7 64 192zM64 272L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 272L64 272zM128 424C128 410.7 138.7 400 152 400L200 400C213.3 400 224 410.7 224 424C224 437.3 213.3 448 200 448L152 448C138.7 448 128 437.3 128 424zM272 424C272 410.7 282.7 400 296 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L296 448C282.7 448 272 437.3 272 424z"/></svg>
          <span className="dock-label mb-1">Cards</span>
        </button>

        <button id="settings" onClick={() => {navigate('/settings')}} className={location.pathname == "/settings" ? 'dock-active' : ''}>
          <svg className="size-[1.5em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#e0e0e0" d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z"/></svg>
          <span className="dock-label mb-1">Settings</span>
        </button>
    </div>
  )};

  const Panel = () => {
    const location = useLocation();
    return (
      <>
        {location.state?.fromLogin && <Popup type='SUCCESS' message='succesful login' />}
        {Navbar}
        <Outlet/>
        <Dock/>
      </>
    )
  } 

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Panel/>}>
          <Route path='/' element={<ReceiptPanel/>} />
          <Route path='/receipts' element={<ReceiptPanel/>}>
            <Route path=':receiptId' element={<BinaryPanel />} />
          </Route>
          <Route path='/cards' element={<CardPanel/>} />
          <Route path='/settings' element={<SettingsPanel/>} />
          <Route path='/user' element={<p>user</p>} />
        </Route>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;