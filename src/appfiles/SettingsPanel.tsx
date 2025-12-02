import type { UNSAFE_DataRouterStateContext } from "react-router-dom";

function SettingsPanel() : any {
    /*
     - Dark mode
     - Change user data
     - Logout
     - I have no idea honestly...
    */
    return (
        <>
        <div className="grid grid-cols-1 gap-3 my-20 bg-(--card-background) p-5 w-[75%] rounded-[15px]">
          <div className="w-[100%]">
            <h2>User Settings</h2>
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

          <div>
            <h2>Cache Settings</h2>
            <button className="btn">Clear cache</button>
            <button className="btn">Clear session</button>
          </div>

          <div>
            <h2>Danger Zone</h2>
            <button className="btn bta">Delete Account</button>
          </div>
        </div>
        </>
    )
}

export default SettingsPanel;
