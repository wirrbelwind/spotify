export const checkAccessToAudiobooks = (region: string) => {
    const allowedRegions = ['US', 'GB', 'CA', 'IE', 'NZ', 'AU']

    return allowedRegions.includes(region)
}