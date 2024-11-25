import geoip from 'geoip-lite';
import path from 'path';

export const getLocation = (ip) => {
    const geo = geoip.lookup(ip);
    console.log('ip', ip);
    console.log('geo', geo);

    if (geo) {
        return {
            city: geo.city || 'Unknown city', 
            state: geo.region || 'Unknown State',
            country: geo.country || 'Unknown Country'
        };
    }
    return { city: 'Unknown', state: 'unknown', country: 'unknown' };
};