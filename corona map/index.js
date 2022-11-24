function updateMap() {
    fetch("/data.json")
        .then(response => response.json())
        .then(rsp => {
            console.log(rsp.data);
            rsp.data.forEach(element => {
                latitude = element.latitude;
                longitude = element.longitude;

                cases = element.infected;
                if (cases >= 255) {
                    clr = "red";
                }
                else {
                    clr = `rgb(${cases}, 0 , 0)`;
                }

                //Mark on the map
                var marker = new mapboxgl.Marker({
                    color: clr
                })
                    .setLngLat([longitude, latitude])
                    .addTo(map);
            })
        })
}

setInterval(() => {
    updateMap();
    // console.log('updating map with real time data');
}, 2000);