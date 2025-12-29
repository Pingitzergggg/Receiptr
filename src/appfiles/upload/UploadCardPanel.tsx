import { faUpload, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../tools/Input";
import { type inputType, stringValidate } from "../../misc/stringValidator";
import Select from "../../tools/Select";
import Button from "../../tools/Button";

function UploadReceiptPanel() : ReactElement {

    type inputField = {
        value: string,
        error: string
    };

    type inputFields = {
        cardTitle: inputField,
        name: inputField,
        card: inputField,
        bank: inputField,
        expiry: inputField,
        cvc: inputField
    };

    const [cardData, setCardData] = useState<inputFields>({
        cardTitle: {
            value: '',
            error: ''
        },
        name: {
            value: '',
            error: ''
        },
        card: {
            value: '',
            error: ''
        },
        bank: {
            value: '',
            error: ''
        },
        expiry: {
            value: '',
            error: ''
        },
        cvc: {
            value: '',
            error: ''
        }
    });

    const handleInputChange = (event : any) => {
        const getId : string = event.target.id;
        const getValue : string = event.target.value;
        const currentCommand : inputType = getId.toLowerCase() == 'bank' || getId.toLowerCase() == 'cardtitle' ? 'NAME' : getId.toUpperCase() as inputType;
        try {
            stringValidate(currentCommand, getValue);
            setCardData((prev) => ({...prev, [getId]: {value: getValue, error: ''}}));
        } catch(err : any) {
            if (getValue.length != 0) {
                setCardData((prev) => ({...prev, [getId]: {value: '', error: err}}));
            } else {
                setCardData((prev) => ({...prev, [getId]: {value: '', error: ''}}));
            }
        }
    };

    const navigate = useNavigate();

    return (<>
        <legend className="upload">
            <a onClick={() => navigate('/cards')} className="btn-nav bg-red-400">
                <FontAwesomeIcon icon={faXmark} />
            </a>
            <h2 className="text-2xl">Upload Card</h2>

            <Input title="Title" id="cardTitle" onChange={handleInputChange} errorInValue={cardData.cardTitle.error.length != 0} error={cardData.cardTitle.error} className="my-5" width="100%" />

            <Input title="Name on Card" id="name" onChange={handleInputChange} errorInValue={cardData.name.error.length != 0} error={cardData.name.error} className="my-5" width="100%" />

            <Input title="Number" id="card" onChange={handleInputChange} errorInValue={cardData.card.error.length != 0} error={cardData.card.error} className="mb-5" width="100%" />

            <Input title="Bank" id="bank" onChange={handleInputChange} errorInValue={cardData.bank.error.length != 0} error={cardData.bank.error} className="mb-5" width="100%" />

            <div className="flex justify-between">
                <Input id="expiry" title="Expiry Date" onChange={handleInputChange} errorInValue={cardData.expiry.error.length != 0} error={cardData.expiry.error} className="mb-5" width="48%" />
                <Input id="cvc" title="CVC" onChange={handleInputChange} errorInValue={cardData.cvc.error.length != 0} error={cardData.cvc.error} className="mb-5" width="48%" />
            </div>
            <div className="flex justify-between">
                <Select id="class" title="Choose Class" errorInValue={false} width="48%" />
                <Select id="logo" title="Type" errorInValue={false} width="48%" values={[
                    {
                        label: 'Default',
                        value: ''
                    },
                    {
                        label: 'MasterCard',
                        value: 'mastercard'
                    },
                    {
                        label: 'VISA',
                        value: 'visa'
                    },
                    {
                        label: 'Amex',
                        value: 'amex'
                    },
                    {
                        label: 'Discover',
                        value: 'discover'
                    }
                ]} />
            </div>

            <Button label="Upload" width="100%" className="my-5" fontSize="1rem" icon={<FontAwesomeIcon icon={faUpload} />} />
        </legend>
    </>);
}

export default UploadReceiptPanel;