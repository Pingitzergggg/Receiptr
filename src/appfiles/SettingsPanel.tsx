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
        <div className='container mt-20 mb-20'>
          <h1>Settings</h1>
          <div id="settings-div" className="grid grid-cols-1 gap-6">
            <div>
                <p>Dark mode</p>
                <input type="checkbox" defaultChecked className="toggle toggle-primary" />
                <hr/>
            </div>
            <div>
                <p>Dark mode</p>
                <input type="checkbox" defaultChecked className="toggle toggle-primary" />
                <hr/>
            </div>
          </div>
        </div>
        </>
    )
}

export default SettingsPanel;
