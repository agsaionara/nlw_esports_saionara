export function convertHourStringToMinutes(hourString : string){
    const [hours, minutes] = hourString.split(':').map(Number);

    const minutesAumont = (hours *60) + minutes;

    return minutesAumont;
}