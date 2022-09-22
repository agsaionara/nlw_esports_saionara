import './styles/main.css';

import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { GamerBanner } from './components/GamerBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import {CreatedAdModal} from './components/CreatedAdModal';

import logoImage from './assets/logo-nlw-esports.png';
import axios from 'axios';


interface Game{
  id:string;
  title:string;
  bannerUrl:string;
  _count:{
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() =>{
    axios("http://localhost:3333/games").then(response => {
        setGames(response.data);
    })
  }, []);

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImage} alt=""/>
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>dou</span> está aqui
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return(
            <GamerBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount ={game._count.ads}
            />
          )
        })}
      </div>
      
      <Dialog.Root>

        <CreateAdBanner/>

        <CreatedAdModal />
        
      </Dialog.Root>
      
    </div>  
  )
}

export default App
