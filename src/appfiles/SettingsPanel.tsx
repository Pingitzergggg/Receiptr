import {
  faBoxArchive,
  faCircleExclamation,
  faCookie,
  // @ts-ignore
  faWrench,
  faUser,
  // @ts-ignore
  faCheck,
  faEnvelope,
  faLock,
  faPhone,
  faAt,
  faDoorOpen,
  faBroom, faInfo
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../tools/Button";
import {type ReactElement, useEffect, useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import type {responseType} from "../misc/databaseTables.ts";
import Popup from "../tools/Popup.tsx";
import {extractResponse, requestResource} from "../misc/receiver.ts";
import Select from "../tools/Select.tsx";

function SettingsPanel() : ReactElement {
  const location = useLocation();

  const navigate = useNavigate();
  const [userData, setUserData] = useState<responseType["user"]|null>(sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")!) : null);
  const [accountDeletion, setAccountDeletion] = useState<boolean>(false);
  const [archiveSelected, setArchiveSelected] = useState<'cards'|'receipts'|'categories'|null>(null);
  const [cacheSelected, setCacheSelected] = useState<'cards'|'receipts'|'categories'|null>(null);
  const [error, setError] = useState<string>('');

  function removeSession(key: 'receipts'|'categories'|'cards') {
    sessionStorage.removeItem(key);
    navigate("/settings", {state: {cacheClearSuccess: true}});
  }

  async function logout(wipeoutMode: boolean = false) {
    await requestResource<'user'>(wipeoutMode ? 'wipeout' : 'logout', 'POST');
    sessionStorage.removeItem("user");
    navigate("/login");
  }

  async function destroy() {
    logout();
    await requestResource<'user'>('user', 'DELETE');
  }

  useEffect(() => {
    async function effect() {
      if (location.state?.uploadSuccess) {
        try {
          const response = await requestResource<"user">('user', 'GET');
          await extractResponse(response);
          setUserData(JSON.parse(sessionStorage.getItem("user")!));
        } catch (err) {
         console.error(err);
        }
      }
    }
    effect();
  }, [location.state]);

  return (
        <>
          {accountDeletion &&
              <div>
                <div className="fixed! bg-(--card-background) p-[1rem] absolute-center rounded-[15px]">
                  <h2 className="text-2xl font-bold text-center my-[2rem] mx-[1rem]">Delete account?</h2>
                  <div className="flex justify-evenly mb-[1rem]">
                    <button className="btn bta" onClick={() => setAccountDeletion(false)}>Cancel</button>
                    <button className="btn ml-[1rem]" onClick={destroy}>Delete</button>
                  </div>
                </div>
              </div>}
          {location.state?.cacheClearSuccess && <Popup type={"SUCCESS"} message={"Cache cleared!"} />}
          {location.state?.uploadSuccess && <Popup type={"SUCCESS"} message={"Upload successful!"} />}
          {error && <Popup type="ERROR" message={error} />}
          <Outlet />
        <div className="grid grid-cols-1 gap-3 my-20 w-[90%] md:w-[75%]">
          <div className="w-[100%] bg-(--card-background) rounded-[15px] p-5">
            <h2 className="text-2xl font-bold mb-5">
              <FontAwesomeIcon style={{margin: '0 .5rem 0 0'}} icon={faUser} />
              User Settings</h2>
            <div className="user-details grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <legend className="transition">
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <h3><FontAwesomeIcon icon={faEnvelope} />Email</h3>
                    <a onClick={() => navigate('upload/Email')}>
                      <svg className="transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M541.4 162.6C549 155 561.7 156.9 565.5 166.9C572.3 184.6 576 203.9 576 224C576 312.4 504.4 384 416 384C398.5 384 381.6 381.2 365.8 376L178.9 562.9C150.8 591 105.2 591 77.1 562.9C49 534.8 49 489.2 77.1 461.1L264 274.2C258.8 258.4 256 241.6 256 224C256 135.6 327.6 64 416 64C436.1 64 455.4 67.7 473.1 74.5C483.1 78.3 484.9 91 477.4 98.6L388.7 187.3C385.7 190.3 384 194.4 384 198.6L384 240C384 248.8 391.2 256 400 256L441.4 256C445.6 256 449.7 254.3 452.7 251.3L541.4 162.6z"/></svg>
                    </a>
                  </div>
                  <div className="flex items-center">
                    <p className={`text-${userData?.email_verified ? '(--accent-color)' : 'red-500'}!`}>{userData?.email_verified ? 'Verified' : 'Not Verified'}</p>
                    {userData?.email_verified && <svg className="w-[1rem] h-[1rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                      <path fill="#127012"
                            d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/>
                    </svg>
                    }
                  </div>
                </div>
                <p>{userData?.email}</p>
              </legend>
              <legend className="transition">
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <h3><FontAwesomeIcon icon={faPhone} />Phone</h3>
                    <a onClick={() => navigate('upload/Phone')}>
                      <svg className="transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M541.4 162.6C549 155 561.7 156.9 565.5 166.9C572.3 184.6 576 203.9 576 224C576 312.4 504.4 384 416 384C398.5 384 381.6 381.2 365.8 376L178.9 562.9C150.8 591 105.2 591 77.1 562.9C49 534.8 49 489.2 77.1 461.1L264 274.2C258.8 258.4 256 241.6 256 224C256 135.6 327.6 64 416 64C436.1 64 455.4 67.7 473.1 74.5C483.1 78.3 484.9 91 477.4 98.6L388.7 187.3C385.7 190.3 384 194.4 384 198.6L384 240C384 248.8 391.2 256 400 256L441.4 256C445.6 256 449.7 254.3 452.7 251.3L541.4 162.6z"/></svg>
                    </a>
                  </div>
                </div>
                <p>{userData?.phone}</p>
              </legend>
              <legend className="transition">
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <h3><FontAwesomeIcon icon={faAt} />Username</h3>
                    <a onClick={() => navigate('upload/Username')}>
                      <svg className="transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M541.4 162.6C549 155 561.7 156.9 565.5 166.9C572.3 184.6 576 203.9 576 224C576 312.4 504.4 384 416 384C398.5 384 381.6 381.2 365.8 376L178.9 562.9C150.8 591 105.2 591 77.1 562.9C49 534.8 49 489.2 77.1 461.1L264 274.2C258.8 258.4 256 241.6 256 224C256 135.6 327.6 64 416 64C436.1 64 455.4 67.7 473.1 74.5C483.1 78.3 484.9 91 477.4 98.6L388.7 187.3C385.7 190.3 384 194.4 384 198.6L384 240C384 248.8 391.2 256 400 256L441.4 256C445.6 256 449.7 254.3 452.7 251.3L541.4 162.6z"/></svg>
                    </a>
                  </div>
                </div>
                <p>{userData?.username}</p>
              </legend>
              <legend className="transition">
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <h3><FontAwesomeIcon icon={faLock} />Password</h3>
                    <a onClick={() => navigate('upload/Password')}>
                      <svg className="transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M541.4 162.6C549 155 561.7 156.9 565.5 166.9C572.3 184.6 576 203.9 576 224C576 312.4 504.4 384 416 384C398.5 384 381.6 381.2 365.8 376L178.9 562.9C150.8 591 105.2 591 77.1 562.9C49 534.8 49 489.2 77.1 461.1L264 274.2C258.8 258.4 256 241.6 256 224C256 135.6 327.6 64 416 64C436.1 64 455.4 67.7 473.1 74.5C483.1 78.3 484.9 91 477.4 98.6L388.7 187.3C385.7 190.3 384 194.4 384 198.6L384 240C384 248.8 391.2 256 400 256L441.4 256C445.6 256 449.7 254.3 452.7 251.3L541.4 162.6z"/></svg>
                    </a>
                  </div>
                </div>
                <p>****</p>
              </legend>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4">
              <Button onClick={() => logout()} label="Logout" icon={<FontAwesomeIcon icon={faDoorOpen} />} className="mt-5" width="auto" />
            </div>
          </div>

          <div className="w-[100%] bg-(--card-background) rounded-[15px] p-5">
            <h2 className="text-2xl font-bold mb-5">
              <FontAwesomeIcon style={{margin: '0 .5rem 0 0'}} icon={faBoxArchive} />
              Archive</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <Select onChange={event => setArchiveSelected(event.target.value as any ?? null)} id="archive" errorInValue={false} width="auto" title="Select cache" values={[{label: 'Cards', value: 'cards'}, {label: 'Receipts', value: 'receipts'}, {label: 'Categories', value: 'categories'}]} />
              <Button className="my-auto" onClick={() => {
                if (archiveSelected) {
                  navigate('/settings/archive/'+archiveSelected);
                } else {
                  setError('You must select first!');
                }
              }} label="Check selected archive" icon={<FontAwesomeIcon icon={faBroom} />} width="auto" />
            </div>
          </div>

          <div className="w-[100%] bg-(--card-background) rounded-[15px] p-5">
            <h2 className="text-2xl font-bold mb-5">
              <FontAwesomeIcon style={{margin: '0 .5rem 0 0'}} icon={faCookie} />
              Cache Settings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <Select onChange={event => setCacheSelected(event.target.value as any ?? null)} id="cache" errorInValue={false} width="auto" title="Select archive" values={[{label: 'Cards', value: 'cards'}, {label: 'Receipts', value: 'receipts'}, {label: 'Categories', value: 'categories'}]} />
              <Button className="my-auto" onClick={() => {
                if (cacheSelected) {
                  removeSession(cacheSelected);
                } else {
                  setError('You must select first!');
                }
              }} label="Clear selected cache" icon={<FontAwesomeIcon icon={faBroom} />} width="auto" />
            </div>
          </div>

          <div className="w-[100%] bg-(--card-background) rounded-[15px] p-5">
            <h2 className="text-2xl font-bold mb-5">
              <FontAwesomeIcon style={{margin: '0 .5rem 0 0'}} icon={faCircleExclamation} />
              Danger Zone</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                <button onClick={() => setAccountDeletion(true)} className="btn bta">Delete Account</button>
                <button onClick={() => logout(true)} className="btn bta">Log out everywhere</button>
              </div>
          </div>

          <div className="w-[100%] bg-(--card-background) rounded-[15px] p-5">
            <h2 className="text-2xl font-bold mb-5">
              <FontAwesomeIcon style={{margin: '0 .5rem 0 0'}} icon={faInfo} />
              About
            </h2>
            <div className='px-5 py-1 flex flex-col justify-evenly align-baseline'>
              <p>
                <a href='https://github.com/Pingitzergggg/Receiptr' target='_blank' className='hyperlink'>Receiptr</a> is a partly open-source application designed to emulate kiosk transactions with credit cards and save receipts to user account linked to these cards.
              </p>
              <h3>Maintainers of the Receiptr project:</h3>
              <ul className='list-disc px-5 py-1'>
                <li><a className='hyperlink' href='https://github.com/TrxpleD23' target='_blank'>David Horvath</a></li>
                <li><a className='hyperlink' href="http://github.com/Pingitzergggg" target='_blank'>David Pingitzer</a></li>
                <li><a className='hyperlink' href='https://github.com/Fyrra1' target='_blank'>David Reicher</a></li>
              </ul>
              <p className='p-2'><b className='text-red-500!'>DISCLAIMER:</b> while Receiptr does not store credit card data directly, it is advised not to provide your real credentials when using this site, since it is merely a technology demonstration as of now.</p>
              <div className='text-[.75rem] italic my-2'>
                <p>This software is under the <a href='https://github.com/Pingitzergggg/Receiptr/blob/main/LICENSE' target='_blank' className='hover:underline font-bold'>MIT License</a></p>
                <p>© 2026 David Pingitzer All Rights Reserved</p>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}

export default SettingsPanel;
