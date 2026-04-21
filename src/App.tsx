// @ts-ignore
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useNavigate,
  useLocation,
  type NavigateFunction
} from 'react-router-dom'
// @ts-ignore
import {useState, useEffect, type ReactElement, useRef, type RefObject} from 'react'
import Popup, { type popupType } from './tools/Popup'
import ReceiptPanel from './appfiles/ReceiptPanel'
import CardPanel from './appfiles/CardPanel'
import SettingsPanel from './appfiles/SettingsPanel'
import Login from './auth/Login'
import Register from './auth/Register'
import './tailwind.css'
import './style.scss'
import BinaryPanel from './appfiles/BinaryPanel'
import UploadReceiptPanel from './appfiles/upload/UploadReceiptPanel'
import UploadCardPanel from './appfiles/upload/UploadCardPanel'
import Test from './testing/Test'
import setTheme from './misc/theme'
// @ts-ignore
import { faSun, faMoon, faExpand } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CategoryPanel from './appfiles/CategoryPanel.tsx'
import UploadCategoryPanel from './appfiles/upload/UploadCategoryPanel.tsx'
import DeleteItem from './tools/DeleteItem'
import Archive from "./tools/Archive.tsx";
import {extractResponse, requestResource} from "./misc/receiver.ts";
import UploadSettingsPanel from "./appfiles/upload/UploadSettingsPanel.tsx";
import NotFound from './tools/NotFound.tsx'
import PasswordReset from './tools/PasswordReset.tsx'
import PasswordRequest from './tools/PasswordRequest.tsx'
import KioskDemo from './tools/KioskDemo.tsx'
import QReader from './tools/QReader.tsx'

function App(): ReactElement {

  const Global = () => {
    type globalPopupType = {
      message: string,
      type: popupType
    }
    const location = useLocation();
    const [globalPopup, setGlobalPopup] = useState<globalPopupType>({message: '', type: "INFO"});
    const currentURL: RefObject<string> = useRef('/');
    useEffect(() => {
      if (location.state?.globalPopup && currentURL.current !== location.pathname) {
        setGlobalPopup(location.state.globalPopup);
      }
      currentURL.current = location.pathname;
    }, [location.pathname]);

    return <>
      {!!globalPopup.message.length && <Popup onFinish={() => {
        setGlobalPopup({message: '', type: 'INFO'});
      }} message={globalPopup.message} type={globalPopup.type} />}
    </>
  }

  // @ts-ignore
  const Navbar = (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="text-2xl h-auto flex items-center font-bold p-[.5rem]">
          <img src='/icon.png' alt="icon.png" className='w-[80px] h-[53.3px] mr-2' id='logo' />
          Receiptr
        </a>
      </div>
      <div className="flex-none">
        <a onClick={setTheme} className='mx-5 cursor-pointer'>
          {localStorage.getItem("theme") == "light" ? <FontAwesomeIcon className='hover:scale-120 transition' icon={faSun} /> : <FontAwesomeIcon className='hover:scale-120 transition' icon={faMoon} />}
        </a>
        {/* <li><NavLink to='/login' onClick={logout}>Logout</NavLink></li> */}
      </div>
    </div>
  );

  const Dock = ({navigate}: {navigate: NavigateFunction}) => {
    return (
    <div className="dock">
        <button id="receipts" onClick={() => {navigate('/receipts')}} className={location.pathname.split('/')[1] === 'receipts' || location.pathname == "/" ? 'dock-active' : ''}>
          <svg className="size-[1.5em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill={localStorage.getItem("theme") == "light" ? "000000" : "#e0e0e0"} d="M142 66.2C150.5 62.3 160.5 63.7 167.6 69.8L208 104.4L248.4 69.8C257.4 62.1 270.7 62.1 279.6 69.8L320 104.4L360.4 69.8C369.4 62.1 382.6 62.1 391.6 69.8L432 104.4L472.4 69.8C479.5 63.7 489.5 62.3 498 66.2C506.5 70.1 512 78.6 512 88L512 552C512 561.4 506.5 569.9 498 573.8C489.5 577.7 479.5 576.3 472.4 570.2L432 535.6L391.6 570.2C382.6 577.9 369.4 577.9 360.4 570.2L320 535.6L279.6 570.2C270.6 577.9 257.3 577.9 248.4 570.2L208 535.6L167.6 570.2C160.5 576.3 150.5 577.7 142 573.8C133.5 569.9 128 561.4 128 552L128 88C128 78.6 133.5 70.1 142 66.2zM232 200C218.7 200 208 210.7 208 224C208 237.3 218.7 248 232 248L408 248C421.3 248 432 237.3 432 224C432 210.7 421.3 200 408 200L232 200zM208 416C208 429.3 218.7 440 232 440L408 440C421.3 440 432 429.3 432 416C432 402.7 421.3 392 408 392L232 392C218.7 392 208 402.7 208 416zM232 296C218.7 296 208 306.7 208 320C208 333.3 218.7 344 232 344L408 344C421.3 344 432 333.3 432 320C432 306.7 421.3 296 408 296L232 296z"/></svg>
          <span className="dock-label mb-1 text-(--font-color)">Receipts</span>
        </button>

        <button id="cards" onClick={() => {navigate('/cards')}} className={location.pathname.split('/')[1] === 'cards' ? 'dock-active' : ''}>
          <svg className="size-[1.5em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill={localStorage.getItem("theme") == "light" ? "000000" : "#e0e0e0"} d="M64 192L64 224L576 224L576 192C576 156.7 547.3 128 512 128L128 128C92.7 128 64 156.7 64 192zM64 272L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 272L64 272zM128 424C128 410.7 138.7 400 152 400L200 400C213.3 400 224 410.7 224 424C224 437.3 213.3 448 200 448L152 448C138.7 448 128 437.3 128 424zM272 424C272 410.7 282.7 400 296 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L296 448C282.7 448 272 437.3 272 424z"/></svg>
          <span className="dock-label mb-1 text-(--font-color)">Cards</span>
        </button>

        <button id="categories" onClick={() => {navigate('/categories')}} className={location.pathname.split('/')[1] === 'categories' ? 'dock-active' : ''}>
          <svg className='size-[1.5rem]' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill={localStorage.getItem("theme") == "light" ? "000000" : "#e0e0e0"} fill-rule="evenodd" clip-rule="evenodd" d="M16.1369 4.72848L17.9665 6.55812C20.6555 9.24711 22 10.5916 22 12.2623C22 13.933 20.6555 15.2775 17.9665 17.9665C15.2775 20.6555 13.933 22 12.2623 22C10.5916 22 9.24711 20.6555 6.55812 17.9665L4.72848 16.1369C3.18295 14.5914 2.41018 13.8186 2.12264 12.816C1.83509 11.8134 2.08083 10.7485 2.57231 8.61875L2.85574 7.39057C3.26922 5.59881 3.47597 4.70292 4.08944 4.08944C4.70292 3.47597 5.5988 3.26922 7.39057 2.85574L8.61875 2.57231C10.7485 2.08083 11.8134 1.83509 12.816 2.12264C13.8186 2.41018 14.5914 3.18295 16.1369 4.72848ZM11.1467 14.3284C10.4737 13.6555 10.4794 12.6899 10.8819 11.9247C10.6807 11.6325 10.7101 11.2295 10.9699 10.9697C11.2288 10.7108 11.6298 10.6807 11.9217 10.8795C12.2615 10.6988 12.635 10.6033 13.0071 10.6068C13.4213 10.6107 13.7539 10.9497 13.75 11.3639C13.7461 11.7781 13.4071 12.1107 12.9929 12.1068C12.816 12.1051 12.5835 12.1845 12.3841 12.3839C11.9966 12.7714 12.0985 13.1589 12.2073 13.2678C12.3162 13.3766 12.7037 13.4785 13.0912 13.091C13.8753 12.307 15.2289 12.0467 16.0964 12.9142C16.7694 13.5872 16.7637 14.5528 16.3612 15.318C16.5624 15.6102 16.533 16.0132 16.2732 16.273C16.0143 16.5319 15.6131 16.5619 15.3212 16.3631C14.8643 16.6059 14.3446 16.6969 13.849 16.595C13.4433 16.5117 13.182 16.1152 13.2654 15.7094C13.3487 15.3037 13.7452 15.0424 14.151 15.1257C14.3281 15.1622 14.6137 15.104 14.859 14.8588C15.2465 14.4712 15.1446 14.0837 15.0358 13.9749C14.9269 13.866 14.5394 13.7641 14.1519 14.1517C13.3678 14.9357 12.0142 15.1959 11.1467 14.3284ZM10.021 10.2931C10.802 9.51207 10.802 8.24574 10.021 7.46469C9.23991 6.68364 7.97358 6.68364 7.19253 7.46469C6.41148 8.24574 6.41148 9.51207 7.19253 10.2931C7.97358 11.0742 9.23991 11.0742 10.021 10.2931Z"></path></svg>
          <span className="dock-label mb-1 text-(--font-color)">Categories</span>
        </button>

        <button id="settings" onClick={() => {navigate('/settings')}} className={location.pathname.split('/')[1] === 'settings' ? 'dock-active' : ''}>
          <svg className="size-[1.5em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill={localStorage.getItem("theme") == "light" ? "000000" : "#e0e0e0"} d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z"/></svg>
          <span className="dock-label mb-1 text-(--font-color)">Settings</span>
        </button>
    </div>
  )};

  const Panel = () => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
      if (['/login', '/register'].includes(location.pathname)) {
        navigate(location.pathname);
      }
      if (!sessionStorage.getItem('user')) {
        navigate("/login");
        console.log(`Redirected to /login due to missing user session!`)
        return;
      }
    }, [location.pathname]);

    useEffect(() => {
      console.log('Fetching user session on first mount...')
      requestResource<'user'>("user", "GET")
          .then(async response => {
            try {
              await extractResponse<'user'>(response)
            } catch (error) {
              if (error instanceof ReferenceError) {
                navigate('/login');
                console.log('User is not authenticated!');
                return;
              } else {
                console.error(error);
              }
            }
          })
    }, []);

    return (
      <>
        {Navbar}
        <Outlet/>
        <Dock navigate={navigate}/>
      </>
    )
  }

  return(
      <BrowserRouter>
        <Global />
        <Routes>
          <Route path='/' element={<Panel/>}>
            <Route path='/' element={<ReceiptPanel/>} />
            <Route path='/receipts' element={<ReceiptPanel/>}>
              <Route path=':receiptId' element={<BinaryPanel />} />
              <Route path='upload' element={<UploadReceiptPanel />} >
                <Route path=':receiptId' element={<UploadReceiptPanel />} />
              </Route>
              <Route path='delete' element={<DeleteItem<'receipts'> itemType='RECEIPTS' />} />
            </Route>
            <Route path='/cards' element={<CardPanel/>}>
              <Route path="upload" element={<UploadCardPanel />}>
                <Route path=':cardId' element={<UploadCardPanel />} />
              </Route>
              <Route path='delete' element={<DeleteItem<'cards'> itemType='CARDS' />} />
            </Route>
            <Route path='/categories' element={<CategoryPanel />}>
              <Route path='upload' element={<UploadCategoryPanel />}>
                <Route path=':categoryId' element={<UploadCategoryPanel/>} />
              </Route>
              <Route path='delete' element={<DeleteItem<'categories'> itemType='CATEGORIES' />} />
            </Route>
            <Route path='/settings' element={<SettingsPanel/>} >
              <Route path='upload/:type' element={<UploadSettingsPanel/>} />
              <Route path='archive/receipts' element={<Archive<'receipts'> type='Receipts' />} />
              <Route path='archive/cards' element={<Archive<'cards'> type='Cards' />} />
              <Route path='archive/categories' element={<Archive<'categories'> type='Categories' />} />
            </Route>
            <Route path='/user' element={<p>user</p>} />
          </Route>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/dev' element={<Test />}/>

          <Route path='/kiosk' element={<KioskDemo />} >
            <Route path='form' element={<UploadReceiptPanel />} />
          </Route>

          <Route path='scanner' element={<QReader />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/request-password" element={<PasswordRequest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;