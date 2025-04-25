import dayjs from 'dayjs';

export const formattedGame = (beginningDateTime: string) => dayjs(beginningDateTime).format('DD.MM.YYYY HH:mm');

export const formattedDecoder = (beginningDateTime: string): { day: any, time: any } => {
    const date = dayjs(beginningDateTime);

    return {
        day: date.startOf('day'),
        time: date,
    }
}