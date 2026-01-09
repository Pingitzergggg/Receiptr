import { faBoxArchive, faCircleExclamation, faCookie, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../tools/Button";

function SettingsPanel() : any {
    /*
     - Dark mode
     - Change user data
     - Logout
     - I have no idea honestly...
    */
    return (
        <>
        <div className="grid grid-cols-1 gap-3 my-20 w-[75%]">
          <div className="w-[100%] bg-(--card-background) rounded-[15px] p-5">
            <h2 className="text-2xl font-bold mb-5">
              <FontAwesomeIcon icon={faUser} />
              User Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <legend>
                <h3>Email</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 flex items-center justify-between w-[100%]">
                  <p className="w-auto! break-all">asder@example.com</p>
                  <Button label="Change" />
                </div>
              </legend>
              <legend>
                <h3>Email</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 flex items-center justify-between w-[100%]">
                  <p className="w-auto! break-all">asder@example.com</p>
                  <Button label="Change" />
                </div>
              </legend>
              <legend>
                <h3>Email</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 flex items-center justify-between w-[100%]">
                  <p className="w-auto! break-all">asder@example.com</p>
                  <Button label="Change" />
                </div>
              </legend>
              <legend>
                <h3>Email</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 flex items-center justify-between w-[100%]">
                  <p className="w-auto! break-all">asder@example.com</p>
                  <Button label="Change" />
                </div>
              </legend>
            </div>
            <button className="btn">Logout</button>
          </div>

          <div className="w-[100%] bg-(--card-background) rounded-[15px] p-5">
            <h2 className="text-2xl font-bold mb-5">
              <FontAwesomeIcon icon={faBoxArchive} />
              Archive</h2>
            <button className="btn">Fetch archived receipts</button>
            <button className="btn">Fetch archived cards</button>
          </div>

          <div className="w-[100%] bg-(--card-background) rounded-[15px] p-5">
            <h2 className="text-2xl font-bold mb-5">
              <FontAwesomeIcon icon={faCookie} />
              Cache Settings</h2>
            <button className="btn">Clear cache</button>
            <button className="btn">Clear session</button>
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
