import express, { request, response } from 'express';
import { PrismaClient} from '@prisma/client';
import cors from 'cors';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesStringToHours } from './utils/convert-minutos-string-to-hours';

const app = express();

app.use(express.json());

//para produção colloque o origin e o endereço do frontend
app.use(cors());


const prisma = new PrismaClient({
  log: ['query']
})

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include:{
      _count:{
        select:{
          ads:true,
        }
      }
    }
  })
  return response.json(games);
}) 

app.post('/games/:id/ads', async (request, response) =>{
  const gameId = request.params.id;
  const body= request.body;
  
  //Validação zod javascript
  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      weekDays: body.weekDays.join(","),
      useVoiceChannel: body.useVoiceChannel,
      yearsPlaying: body.yearsPlaying,
      hoursStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      discord: body.discord,
    }
    
  })
  //

  return response.status(201).json(ad);
});
  
app.get("/games/:id/ads", async (request, response)=>{
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
      select:{
        id: true,
        name: true,
        weekDays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hoursStart:true,
        hourEnd:true,
      },
      where:{
        gameId: gameId,
      },
      orderBy:{
        createdAd: 'desc'
      }
    })
   
    return response.json(ads.map(ad => {
      return {
        ...ad,
        weekDays: ad.weekDays.split("," || undefined),
        hourStart: convertMinutesStringToHours(ad.hoursStart),
        hourEnd: convertMinutesStringToHours(ad.hourEnd),
      }
    }));
});

app.get("/ads/:id/discord", async (request, response)=>{
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
      select: {
        discord: true,
      },
      where:{
        id: adId,
      }
    })

    return response.json({
      discord: ad.discord,
    })
});

app.listen(3333);