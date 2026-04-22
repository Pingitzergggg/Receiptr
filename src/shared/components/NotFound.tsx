import type {ReactElement} from "react";

function NotFound(): ReactElement {
    return <>
        <div className="upload window bg-(--card-background)!">
            <div className="flex flex-col justify-center items-center">
                <img className="w-[10rem] h-[7.5rem]" src="/icon.png" alt="logo" />
                <h1 className="text-6xl font-bold">Receiptr</h1>
            </div>
            <h2 className="text-6xl font-bold text-center"><b className="text-(--accent-color)!">404</b> - Page not found!</h2>
            <p className="italic text-center mt-5">The page you are looking for cannot be found!</p>
        </div>
    </>
}

export default NotFound;