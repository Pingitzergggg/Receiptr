import '../../../styles/tailwind.css'
import '../../../styles/style.scss'
import codes from '../../../shared/constants/CountryCodes.json'

function CountryCodes() : any {
    const codeList = codes;
    const codeOptions : any = codeList.map(codeList =>
        <option key={codeList.code} value={codeList.dial_code.substring(1)}>{codeList.dial_code} - {codeList.name}</option>
    );
    return codeOptions;
}

export default CountryCodes;