import geoip from 'geoip-lite'

export const getLocation = (ip) => {
    const geo = geoip.lookup(ip)
    console.log('ip', ip)
    console.log('geo', geo)
    
    if (geo){
        return {
            city: geo.city || 'Unknown city',
            state: geo.state || 'Unknown State',
            country : geo.country || 'Unknown Country'
        };
    }
    return {city: 'Unknown', state: 'unknown', country: 'unknown'}
}