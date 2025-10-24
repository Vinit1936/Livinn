    mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
      container: 'map', // container ID
       //style:"mapbox://styles/mapbox/standard-satellite",
      center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: 11 // starting zoom
    });


const marker = new mapboxgl.Marker({color:'#ff385c'})
.setLngLat(coordinates)
.addTo(map);