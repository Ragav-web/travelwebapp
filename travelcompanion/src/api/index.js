import axios from "axios";

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'


export const getPlacesData = async(sw, ne) =>{
    try {
        const { data : { data }} = await axios.get(URL , {
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng, 
          },
          headers: {
            'X-RapidAPI-Key': '27cea6a2b1msh0526983668aecb9p1f866ajsn7de63e0f1eb7',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
          }
        });

        return data;
    } catch (error) {
        console.log(error)
    }
} 

