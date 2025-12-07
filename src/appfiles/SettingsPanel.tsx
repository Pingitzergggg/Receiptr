import { faBoxArchive, faCircleExclamation, faCookie, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            <table>
              <tr>
                <td>
                  Name: 
                </td>
                <td>
                  The Sexer Mexer
                </td>
                <td>
                  <button className="btn">Change</button>
                </td>
              </tr>

              <tr>
                <td>
                  Email: 
                </td>
                <td>
                  example@gmail.com
                </td>
                <td>
                  <button className="btn">Change</button>
                </td>
              </tr>

              <tr>
                <td>
                  Tel: 
                </td>
                <td>
                  +36 20 123 4567
                </td>
                <td>
                  <button className="btn">Change</button>
                </td>
              </tr>

              <tr>
                  <td>
                    Password: 
                  </td>
                  <td>
                    ****
                  </td>
                  <td>
                    <button className="btn">Change</button>
                  </td>
              </tr>
            </table>
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
