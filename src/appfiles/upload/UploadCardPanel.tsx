import { faUpload, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState, type ReactElement, useEffect, useRef} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import Input from "../../tools/Input";
import { type inputType, stringValidate } from "../../misc/stringValidator";
import Select from "../../tools/Select";
import Button from "../../tools/Button";
import {extractResponse, loadResource, requestResource} from "../../misc/receiver.ts";
import type {paginatable, requestType} from "../../misc/databaseTables.ts";
import Popup from "../../tools/Popup.tsx";

type cardType = "Mastercard" | "Amex" | "Visa" | "Discover" | null

type updateData = {
    title: string,
    type: cardType,
    category?: string,
    binding_id: number|null,
    currency: string
}

type inputField = {
    value: string,
    error: string
};

type inputFields = {
    cardTitle: inputField,
    name: inputField,
    card: inputField,
    bank: inputField,
    currency: inputField,
    expiry: inputField,
    cvc: inputField
};

function UploadReceiptPanel() : ReactElement {
    const {cardId} = useParams();
    const [searchParams] = useSearchParams();
    const updateData: updateData|null = searchParams.get('data') ? JSON.parse(searchParams.get('data')!) : null;
    const category_id = useRef<number|null>(updateData?.binding_id);
    const type = useRef<cardType|null>(updateData?.type);

    const [categories, updateCategories] = useState<{value: string, label: string}[]>([]);
    const [cardData, setCardData] = useState<inputFields>({
        cardTitle: {
            value: updateData?.title ?? '',
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
        currency: {
            value: updateData?.currency ?? '',
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

    useEffect(() => {
        async function effect() {
            const categories: paginatable['categories'] | null = await loadResource<'categories'>('categories');
            if (categories) updateCategories(categories.query.map(obj => {return {label: obj.title, value: String(obj.id)}}));
        }
        effect();
    }, []);

    const handleInputChange = (event : any) => {
        const getId : string = event.target.id;
        const getValue : string = event.target.value;
        const currentCommand : inputType = getId.toLowerCase() == 'bank' || getId.toLowerCase() == 'cardtitle' ? 'NAME' : getId.toUpperCase() as inputType;
        try {
            stringValidate(currentCommand, getValue);
            setCardData((prev) => ({...prev, [getId]: {value: getValue, error: ''}}));
        } catch(err : any) {
            if (getValue.length != 0) {
                setCardData((prev) => ({...prev, [getId]: {value: getValue, error: err}}));
            } else {
                setCardData((prev) => ({...prev, [getId]: {value: '', error: ''}}));
            }
        }
    };

    const navigate = useNavigate();

    const [error, setError] = useState<string>('');
    async function upload() {
        setError('');
        const response: boolean = updateData ? await update() : await store();
        if (response) {
            navigate('/cards', {state: {uploadSuccess: true}});
        }
    }

    async function update() {
        if (cardData.cardTitle.error.length != 0) {
            setError('All fields must be correct!');
            return false;
        }
        const body: updateData = {
            title: cardData.cardTitle.value,
            currency: cardData.currency.value,
            type: type.current ?? null,
            binding_id: category_id.current ?? null
        }
        try {
            const response = await requestResource<'cards'>('cards', 'PUT', cardId, null, body);
            await extractResponse<'cards'>(response);
            return true;
        } catch (error) {
            if (error instanceof WebTransportError) {
                setError(error.message);
            } else {
                setError('Upload failed!');
            }
            console.error(error);
            return false;
        }
    }

    async function store(): Promise<boolean> {
        for (let field in cardData) {
            if (cardData[field as keyof inputFields].error.length != 0) {
                setError("All fields must be correct!");
                return false;
            }
        }
        const body: requestType['card'] = {
            title: cardData.cardTitle.value,
            currency: cardData.currency.value,
            number: cardData.card.value,
            expiry: cardData.expiry.value,
            cvc: Number(cardData.cvc.value),
            bank: cardData.bank.value,
            name: cardData.name.value,
            type: type.current ?? null,
            binding_id: category_id.current ?? null
        };
        try {
            const response  = await requestResource<'cards'>('cards', 'POST', null, null, body);
            await extractResponse<'cards'>(response);
            return true;
        } catch (error) {
            if (error instanceof WebTransportError) {
                setError(error.message);
            } else {
                setError('Upload failed!');
            }
            console.error(error);
            return false;
        }
    }

    return (<>
        {error && <Popup type={"ERROR"} message={error} />}
        <legend className="window upload w-[90%]! sm:w-[auto]!">
            <a onClick={() => navigate('/cards')} className="btn-nav bg-red-400">
                <FontAwesomeIcon icon={faXmark} />
            </a>
            <h2 className="text-2xl font-bold">{updateData ? 'Update' : 'Upload'} Card</h2>

            <Input title="Title" id="cardTitle" onChange={handleInputChange} errorInValue={cardData.cardTitle.error.length != 0} error={cardData.cardTitle.error} className="my-5" width="100%" value={cardData.cardTitle.value} />

            {!updateData &&  <>
                <Input title="Name on Card" id="name" onChange={handleInputChange} errorInValue={cardData.name.error.length != 0} error={cardData.name.error} className="my-5" width="100%" value={cardData.name.value} />

                <Input title="Number" id="card" onChange={handleInputChange} errorInValue={cardData.card.error.length != 0} error={cardData.card.error} className="mb-5" width="100%" value={cardData.card.value} />

                <div className="flex justify-between">
                    <Input id="expiry" title="Expiry Date" onChange={handleInputChange} errorInValue={cardData.expiry.error.length != 0} error={cardData.expiry.error} className="mb-5" width="48%" value={cardData.expiry.value} />
                    <Input id="cvc" title="CVC" onChange={handleInputChange} errorInValue={cardData.cvc.error.length != 0} error={cardData.cvc.error} className="mb-5" width="48%" value={cardData.cvc.value} />
                </div></>
            }

            <div className='flex justify-between'>
                {!updateData && <Input title="Bank" id="bank" onChange={handleInputChange} errorInValue={cardData.bank.error.length != 0} error={cardData.bank.error} className="mb-5" width="55%" value={cardData.bank.value} />}
                <Input title="Currency" id='currency' onChange={handleInputChange} errorInValue={cardData.currency.error.length != 0} error={cardData.currency.error} className='mb-5' width={updateData ? '100%' : '40%'} value={cardData.currency.value.toUpperCase()} />
            </div>

            <div className="flex justify-between">
                <Select id="class" title="Choose Category" errorInValue={false} width="48%" onChange={(event) => category_id.current = Number(event.target.value)} values={categories} selected={category_id.current ?? ''} />
                <Select id="logo" title="Type" errorInValue={false} width="48%" onChange={(event) => type.current = event.target.value.toUpperCase() as cardType} selected={type.current ?? 'DEFAULT'} values={[
                    {
                        label: 'Default',
                        value: 'DEFAULT'
                    },
                    {
                        label: 'MasterCard',
                        value: 'MASTERCARD'
                    },
                    {
                        label: 'VISA',
                        value: 'VISA'
                    },
                    {
                        label: 'Amex',
                        value: 'AMEX'
                    },
                    {
                        label: 'Discover',
                        value: 'DISCOVER'
                    }
                ]} />
            </div>

            <Button async={true} onClick={upload} label="Upload" width="100%" className="my-5" fontSize="1rem" icon={<FontAwesomeIcon icon={faUpload} />} />
        </legend>
    </>);
}

export default UploadReceiptPanel;