import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import dayjs from 'dayjs';

/**
 * Used to get large amounts of data when
 * @param query
 * @param localClient
 * @param vars - any variables that are passed in every query
 * @param values - the keys that are used as the values to map over if
 * @param skipCount - amount of entities to skip per query
 */

export function useDeltaTimestamps(): [number, number, number] {
    const utcCurrentTime = dayjs();
    const t1 = utcCurrentTime.subtract(1, 'day').startOf('minute').unix();
    const t2 = utcCurrentTime.subtract(2, 'day').startOf('minute').unix();
    const tWeek = utcCurrentTime.subtract(1, 'week').startOf('minute').unix();
    return [t1, t2, tWeek];
}
