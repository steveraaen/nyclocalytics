var axios = require ('axios')

module.exports = async function getAll(lng, lat) {
	try {
console.log('getall called')
console.log(lng + "," + lat)
	 const citibikePromise = axios('https://subs-backend.herokuapp.com/api/bikes/', {
            params: {
                lng: lng,
                lat: lat,                 
/*                lng: parseFloat(lng).toFixed(6),
                lat: parseFloat(lat).toFixed(6) */              
            }
        })
	 const subwayPromise = axios('https://subs-backend.herokuapp.com/api/stops/', {
            params: {
                lng: lng,
                lat: lat,               
            }
        })
	 const aspPromise = axios.get('https://streetparker.herokuapp.com/mon', {
            params: { coordinates: [lng, lat]                            
            }
         })
    const bussesPromise = axios('https://bustime.mta.info/api/where/stops-for-location.json?latSpan=0.01&lonSpan=0.01&key=d780a773-f505-402c-b6cb-4a9939fbe07a', {
            params: {
                lon: lng,
                lat: lat,             
            }    	
    })    
    const metersPromise =  axios('https://streetparker.herokuapp.com/api/meters', {
            params: { coordinates: [lng, lat]                            
            }  	    	
    })
    const revGeoPromise = axios('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat +',' + lng + '&key=AIzaSyD0Zrt4a_yUyZEGZBxGULidgIWK05qYeqs', {
        })

    const [citibikeStops, subwayStops, aspSigns, busStops, parkingMeters, revGeo ] = await Promise.all([citibikePromise, subwayPromise, aspPromise, bussesPromise, metersPromise, revGeoPromise]);
    return [citibikeStops.data, subwayStops.data, aspSigns.data, busStops.data.data.stops, parkingMeters.data, revGeo.data]
} catch (e) {
    console.error(e);  
  }
 }


