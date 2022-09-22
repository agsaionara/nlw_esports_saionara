export function convertMinutesStringToHours(minutesAumont : number){
    const hours = Math.floor(minutesAumont/60);
    const minutes = minutesAumont%60;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2,'0')}`;
}