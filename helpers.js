var axios = require ('axios')

module.exports = async function() {
	try {
	 const subwayPromise = axios('https://subs-backend.herokuapp.com/api/stops/', {
            params: {
                lng: -73.9839440,
                lat: 40.6766600,               
            }
        })
    const bussesPromise = axios('https://bustime.mta.info/api/where/stops-for-location.json?lat=40.6766600&lon=-73.9839440&latSpan=0.01&lonSpan=0.01&key=d780a773-f505-402c-b6cb-4a9939fbe07a')
    const metersPromise =  axios('http://127.0.0.1:5000/api/meters?lat=40.6766600&lon=-73.9839440')

    const [subwayStops, busStops, parkingMeters] = await Promise.all([subwayPromise, bussesPromise, metersPromise]);
    return [subwayStops.data, busStops.data.data.stops, parkingMeters.data]
} catch (e) {
    console.error(e); // 💩
  }
 }


