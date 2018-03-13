var axios = require ('axios')

module.exports = async function getAll(lng, lat) {
	try {

	 const citibikePromise = axios('https://subs-backend.herokuapp.com/api/bikes/', {
            params: {
                lng: -73.9839440,
                lat: 40.6766600,                 
/*                lng: parseFloat(lng).toFixed(6),
                lat: parseFloat(lat).toFixed(6) */              
            }
        })
	 const subwayPromise = axios('https://subs-backend.herokuapp.com/api/stops/', {
            params: {
                lng: -73.9839440,
                lat: 40.6766600,               
            }
        })
	 const aspPromise = axios.get('https://streetparker.herokuapp.com/mon', {
            params: { coordinates: [-73.9839440, 40.6766600]                            
            }
         })
    const bussesPromise = axios('https://bustime.mta.info/api/where/stops-for-location.json?latSpan=0.01&lonSpan=0.01&key=d780a773-f505-402c-b6cb-4a9939fbe07a', {
            params: {
                lon: -73.9839440,
                lat: 40.6766600,             
            }    	
    })    
    const metersPromise =  axios('https://streetparker.herokuapp.com/api/meters', {
            params: { coordinates: [-73.9839440, 40.6766600]                            
            }  	    	
    })

    const [citibikeStops, subwayStops, aspSigns, busStops, parkingMeters] = await Promise.all([citibikePromise, subwayPromise, aspPromise, bussesPromise, metersPromise]);
    return [citibikeStops.data, subwayStops.data, aspSigns.data, busStops.data.data.stops, parkingMeters.data]
} catch (e) {
    console.error(e);  
  }
 }


