import dayjs from 'dayjs';

export function unixToDate(unix: number, format = 'YYYY-MM-DD'): string {
    return dayjs.unix(unix).format(format);
}

export const formatTime = (unix: string, buffer?: number) => {
    const now = dayjs();
    const timestamp = dayjs.unix(parseInt(unix)).add(buffer ?? 0, 'minute');

    const inSeconds = now.diff(timestamp, 'second');
    const inMinutes = now.diff(timestamp, 'minute');
    const inHours = now.diff(timestamp, 'hour');
    const inDays = now.diff(timestamp, 'day');

    if (inMinutes < 1) {
        return 'recently';
    }

    if (inHours >= 24) {
        return `${inDays} ${inDays === 1 ? 'day' : 'days'} ago`;
    } else if (inMinutes >= 60) {
        return `${inHours} ${inHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (inSeconds >= 60) {
        return `${inMinutes} ${inMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
        return `${inSeconds} ${inSeconds === 1 ? 'second' : 'seconds'} ago`;
    }
};

export function getUnixTimestamp1000DaysAgo(): number {
    // Get the current date in UTC
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Set time to 00:00 UTC

    // Subtract 999 days
    const daysAgo = 999;
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - daysAgo);

    // Convert to Unix timestamp (in seconds)
    return Math.floor(pastDate.getTime() / 1000);
}
