import {type ReactElement, useEffect, useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Category from "../tools/Category.tsx";
import Upload from "../tools/Upload";
import type {paginatable} from "../misc/databaseTables.ts";
import {extractResponse, requestResource, type response} from "../misc/receiver.ts";
import Refresh from "../tools/Refresh.tsx";
import Popup from "../tools/Popup.tsx";

// let classes : any[] = classDummy;
function CategoryPanel() : ReactElement {
    const location = useLocation();
    const [categories, updateCategories] = useState<paginatable['categories']['query']>([]);

    async function load() {
        const response: response<'categories'> = await requestResource<'categories'>('categories', 'GET');
        const data: paginatable['categories'] | null = await extractResponse<'categories'>(response);
        if (data) {
            sessionStorage.setItem('categories', JSON.stringify(data));
            updateCategories(data.query);
        }
    }

    useEffect(() => {
        const categorySession: string|null = sessionStorage.getItem('categories');
        if (categorySession && !location.state?.uploadSuccess && !location.state?.deleteSuccess) {
            const session: paginatable['categories'] = JSON.parse(categorySession);
            if (session) updateCategories(session.query);
        } else {
            window.scrollTo({top: 0, behavior: 'smooth'});
            load();
        }
    }, [location.state]);

    const navigate = useNavigate();

    let categoryPanel: ReactElement[] = [];
    if (categories) {
        categoryPanel = categories.map(category =>
            <Category
                id={category.id}
                title={category.title}
                color={category.color}
                total_receipts={category.total_receipts}
                total_cards={category.total_cards} />
        );
    }

    return (
        <>
            {location.state?.deleteSuccess && <Popup type={"SUCCESS"} message={'Delete successful!'} />}
            {location.state?.uploadSuccess && <Popup type='SUCCESS' message='Upload was successful!' />}
            <Refresh trigger={load} />
            <Upload onClick={() => navigate('upload')} />
            <div className='container mt-10 mb-45 sm:mb-20 w-[90%]'>
                <div className='grid grid-cols-1 gap-4'>
                    {categories.length != 0 && categoryPanel}
                    {categories.length == 0 && <p>Empty</p>}
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default CategoryPanel;