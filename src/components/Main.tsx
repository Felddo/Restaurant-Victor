import { Header } from './header/Header';
import { Blocks } from './blocks/Blocks';
import { Footer } from './footer/Footer';
import { ScrollRestoration } from 'react-router-dom';


export const Main = () => {
    return (
        <>
            <title>Ресторан Victor</title>

            <ScrollRestoration />
            <Header/>
            
            <main className='px-[5%] py-10 flex flex-col gap-6'> 
                <Blocks/>
            </main>
            <Footer/>
        </>
    );
};