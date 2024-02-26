function getDayOfWeekFromDate(date: Date, dayOfWeek: number): Date {
    const resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() - (date.getDay() + 7 - dayOfWeek) % 7);
    return resultDate;
}

function getIsoWeekNumber(date: Date): number {
    const copyDate = new Date(date.getTime());
    copyDate.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year
    copyDate.setDate(copyDate.getDate() + 3 - (copyDate.getDay() + 6) % 7);
    // January 4 is always in week 1
    const week1 = new Date(copyDate.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1
    return 1 + Math.round(((copyDate.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

function getPreviousThursday(date: Date): Date {
    return getDayOfWeekFromDate(date, 4); // 4 is for Thursday
}

export function getLastThursdayOddWeek(): Date {
    let currentDatetime = new Date(); // Current date and time
    currentDatetime = new Date(Date.UTC(currentDatetime.getUTCFullYear(),
        currentDatetime.getUTCMonth(), currentDatetime.getUTCDate())); // Convert to UTC and remove time

    let mostRecentThursday = getPreviousThursday(currentDatetime);
    let weekNumber = getIsoWeekNumber(mostRecentThursday);

    // Check if the week number is odd, if not, subtract one week
    if (weekNumber % 2 === 0) {
        mostRecentThursday.setDate(mostRecentThursday.getDate() - 7);
        weekNumber = getIsoWeekNumber(mostRecentThursday);
    }

    // Ensure the Thursday chosen is in an odd week (re-check due to the above condition)
    if (weekNumber % 2 === 0) {
        mostRecentThursday.setDate(mostRecentThursday.getDate() - 7);
    }

    // Set to 00:00 UTC
    mostRecentThursday.setUTCHours(0, 0, 0, 0);

    return mostRecentThursday;
}
