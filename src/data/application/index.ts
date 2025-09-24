/**
 * Deprecated: The Graph health check endpoint is no longer available.
 * This function now returns default values to maintain backward compatibility.
 */
export function useFetchedSubgraphStatus(): {
    available: boolean | null;
    syncedBlock: number | undefined;
    headBlock: number | undefined;
} {
    // Return default values since the health check endpoint is deprecated
    return {
        available: true,
        syncedBlock: undefined,
        headBlock: undefined,
    };
}
