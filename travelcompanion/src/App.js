import React, {useState, useEffect} from 'react';
import {CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api'; 
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { SignalCellularNull } from '@material-ui/icons';
 
const App = () =>{

    const[places, setPlaces] = useState([]);
    const [childClicked, setchildClicked] = useState(SignalCellularNull)

    const[coordinates, setCoordinates] = useState({});
    const[bounds, setBounds] = useState({});
    // const [coordsLoaded, setCoordsLoaded] = useState(false);

    const [isloading, setIsloading] = useState(false);

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude}}) => {
            setCoordinates({ lat: latitude, lng:longitude });
      })
    }, [])
    

    useEffect(() => {
        setIsloading(true);

      getPlacesData(bounds.sw, bounds.ne) 
            .then((data)=> {
                   setPlaces(data);
                   setIsloading(false);
            }) 
    }, [coordinates, bounds]);
    
    return(
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{ width: '100%' }}> 
                <Grid item xs={12} md={4}>
                    <List 
                        places={places}
                        childClicked={childClicked} 
                        isloading={isloading}
                        />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                       setCoordinates={setCoordinates}
                       setBounds={setBounds}
                       coordinates={coordinates}   
                       places={places}        
                       setchildClicked={setchildClicked}
                    />
                </Grid>
            </Grid>
        </>
    )

}

export default App;