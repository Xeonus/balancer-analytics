// Assumed pattern in seconds (1 week ~ 604800 seconds)
export const PATTERN = 604800;

//First 25 rounds
let balancerTimeStamps = [
    1649894400,
    1650499200,
    1651104000,
    1651708800,
    1652313600,
    1652918400,
    1653523200,
    1654128000,
    1655337600,
    1655942400,
    1656547200,
    1657152000,
    1657756800,
    1658361600,
    1658966400,
    1659571200,
    1660176000,
    1660780800,
    1661385600,
    1661990400,
    1662595200,
    1663200000,
    1663804800,
    1664409600,
    1665014400,
    1665619200,
    1666224000,
    1666828800,
    1667433600,
    1668038400,
    1668643200,
    1669248000,
    1669852800,
    1670457600,
    1671062400,
    1671667200,
    1672272000,
    1672876800,
    1673481600,
    1674086400,
    1674691200,
    1675296000,
    1675900800,
    1676505600,
    1677110400,
    1677715200,
    1678320000,
    1678924800,
    1679529600,
    1680134400,
    1680739200,
    1681344000,
    1681948800,
    1682553600,
    1683158400,
    1683763200,
    1684368000,
    1684972800,
    1685577600,
    1686182400,
    1686787200,
    1687392000,
    1687996800,
    1688601600,
    1689206400,
    1689811200,
    1690416000,
    1691020800,
];

// Function to get the next Thursday 02:00 GMT timestamp
const getNextThursdayTimestamp = (timestamp: number): number => {
    const date = new Date(timestamp * 1000);
    date.setUTCHours(2, 0, 0, 0);
    date.setUTCDate(date.getUTCDate() + ((4 - date.getUTCDay() + 7) % 7) + 1); // Next Thursday
    return Math.floor(date.getTime() / 1000);
};

// Ensure the first timestamp is on a Thursday at 02:00 GMT
balancerTimeStamps[0] = getNextThursdayTimestamp(balancerTimeStamps[0]);

// get current time in seconds
const now = Math.floor(Date.now() / 1000);

// add additional rounds
while (balancerTimeStamps[balancerTimeStamps.length - 1] < now) {
    let lastTimestamp = balancerTimeStamps[balancerTimeStamps.length - 1];

    // Check if next timestamp is not within the next week
    if (lastTimestamp + PATTERN < now) {
        balancerTimeStamps.push(lastTimestamp + PATTERN);
    } else {
        const nextThursdayTimeStamp = lastTimestamp + PATTERN + 604800;
        if (now >= (lastTimestamp) && now < nextThursdayTimeStamp) {
            balancerTimeStamps.push(0)
        }
        break;
    }
}

export const BALANCER_TIMESTAMPS = balancerTimeStamps
