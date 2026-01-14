import { faBoxArchive, faCircleExclamation, faCookie, faWrench, faUser, faCheck, faEnvelope, faLock, faPhone, faAt, faDoorOpen, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../tools/Button";
import type { ReactElement } from "react";

function SettingsPanel() : ReactElement {
    /*
     - Dark mode
     - Change user data
     - Logout
     - I have no idea honestly...
    */
    return (
        <>
        <div className="grid grid-cols-1 gap-3 my-20 w-[90%] md:w-[75%]">
          <div className="w-[100%] bg-(--card-background) rounded-[15px] p-5">
            <h2 className="text-2xl font-bold mb-5">
              <FontAwesomeIcon icon={faUser} />
              User Settings</h2>
            <div className="user-details grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <legend className="transition">
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <h3><FontAwesomeIcon icon={faEnvelope} />Email</h3>
                    <a>
                      <svg className="transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M541.4 162.6C549 155 561.7 156.9 565.5 166.9C572.3 184.6 576 203.9 576 224C576 312.4 504.4 384 416 384C398.5 384 381.6 381.2 365.8 376L178.9 562.9C150.8 591 105.2 591 77.1 562.9C49 534.8 49 489.2 77.1 461.1L264 274.2C258.8 258.4 256 241.6 256 224C256 135.6 327.6 64 416 64C436.1 64 455.4 67.7 473.1 74.5C483.1 78.3 484.9 91 477.4 98.6L388.7 187.3C385.7 190.3 384 194.4 384 198.6L384 240C384 248.8 391.2 256 400 256L441.4 256C445.6 256 449.7 254.3 452.7 251.3L541.4 162.6z"/></svg>
                    </a>
                  </div>
                  <div className="flex items-center">
                    <p className="text-(--accent-color)!">Verified</p>
                    <svg className="w-[1rem] h-[1rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#127012" d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg>
                  </div>
                </div>
                <p>asder@example.com</p>
              </legend>
              <legend className="transition">
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <h3><FontAwesomeIcon icon={faPhone} />Phone</h3>
                    <a>
                      <svg className="transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M541.4 162.6C549 155 561.7 156.9 565.5 166.9C572.3 184.6 576 203.9 576 224C576 312.4 504.4 384 416 384C398.5 384 381.6 381.2 365.8 376L178.9 562.9C150.8 591 105.2 591 77.1 562.9C49 534.8 49 489.2 77.1 461.1L264 274.2C258.8 258.4 256 241.6 256 224C256 135.6 327.6 64 416 64C436.1 64 455.4 67.7 473.1 74.5C483.1 78.3 484.9 91 477.4 98.6L388.7 187.3C385.7 190.3 384 194.4 384 198.6L384 240C384 248.8 391.2 256 400 256L441.4 256C445.6 256 449.7 254.3 452.7 251.3L541.4 162.6z"/></svg>
                    </a>
                  </div>
                  <div className="flex items-center">
                    <p className="text-(--accent-color)!">Verified</p>
                    <svg className="w-[1rem] h-[1rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#127012" d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg>
                  </div>
                </div>
                <p>+36201548790</p>
              </legend>
              <legend className="transition">
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <h3><FontAwesomeIcon icon={faAt} />Username</h3>
                    <a>
                      <svg className="transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M541.4 162.6C549 155 561.7 156.9 565.5 166.9C572.3 184.6 576 203.9 576 224C576 312.4 504.4 384 416 384C398.5 384 381.6 381.2 365.8 376L178.9 562.9C150.8 591 105.2 591 77.1 562.9C49 534.8 49 489.2 77.1 461.1L264 274.2C258.8 258.4 256 241.6 256 224C256 135.6 327.6 64 416 64C436.1 64 455.4 67.7 473.1 74.5C483.1 78.3 484.9 91 477.4 98.6L388.7 187.3C385.7 190.3 384 194.4 384 198.6L384 240C384 248.8 391.2 256 400 256L441.4 256C445.6 256 449.7 254.3 452.7 251.3L541.4 162.6z"/></svg>
                    </a>
                  </div>
                </div>
                <p>SexerMexer</p>
              </legend>
              <legend className="transition">
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <h3><FontAwesomeIcon icon={faLock} />Password</h3>
                    <a>
                      <svg className="transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M541.4 162.6C549 155 561.7 156.9 565.5 166.9C572.3 184.6 576 203.9 576 224C576 312.4 504.4 384 416 384C398.5 384 381.6 381.2 365.8 376L178.9 562.9C150.8 591 105.2 591 77.1 562.9C49 534.8 49 489.2 77.1 461.1L264 274.2C258.8 258.4 256 241.6 256 224C256 135.6 327.6 64 416 64C436.1 64 455.4 67.7 473.1 74.5C483.1 78.3 484.9 91 477.4 98.6L388.7 187.3C385.7 190.3 384 194.4 384 198.6L384 240C384 248.8 391.2 256 400 256L441.4 256C445.6 256 449.7 254.3 452.7 251.3L541.4 162.6z"/></svg>
                    </a>
                  </div>
                </div>
                <p>****</p> 
              </legend>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4">
              <Button label="Logout" icon={<FontAwesomeIcon icon={faDoorOpen} />} className="mt-5" width="auto" />
            </div>
          </div>

          <div className="w-[100%] bg-(--card-background) rounded-[15px] p-5">
            <h2 className="text-2xl font-bold mb-5">
              <FontAwesomeIcon icon={faBoxArchive} />
              Archive</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <Button label="Fetch archived receipts" icon={<FontAwesomeIcon icon={faDownload} />} width="auto" />
              <Button label="Fetch archived cards" icon={<FontAwesomeIcon icon={faDownload} />} width="auto" />
            </div>
          </div>

          <div className="w-[100%] bg-(--card-background) rounded-[15px] p-5">
            <h2 className="text-2xl font-bold mb-5">
              <FontAwesomeIcon icon={faCookie} />
              Cache Settings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <Button label="Fetch archived receipts" icon={<FontAwesomeIcon icon={faDownload} />} width="auto" />
              <Button label="Fetch archived cards" icon={<FontAwesomeIcon icon={faDownload} />} width="auto" />
            </div>
          </div>

          <div className="w-[100%] bg-(--card-background) rounded-[15px] p-5">
            <h2 className="text-2xl font-bold mb-5">
              <FontAwesomeIcon icon={faCircleExclamation} />
              Danger Zone</h2>
            <button className="btn bta">Delete Account</button>
          </div>
        </div>
        </>
    )
}

export default SettingsPanel;
