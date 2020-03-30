import React, {useState, useCallback, useEffect} from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import {Text} from '@ui-kitten/components';
import MapView, {Marker, AnimatedRegion, Circle} from 'react-native-maps';
import useCustomAxios from '../Hooks/useCustomAxios'
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const DiscoverPage = () => {
    const distance = 100
    const [location, setLocation] = useState({longitude: 30.0429528, latitude: 30.9970722})
    const [pos, setPos] = useState(regionFrom(location.latitude, location.longitude, 1500))
    const [markers, setMarkers] = useState([])
    const [{ loading, error}, execute] = useCustomAxios(
        {
          url: '/business-list-location',
          method: 'POST'
        },
        { manual: true }
      )

      const updateMap = useCallback(async (longitude, latitude) => {
          const {data} = await execute({data:{longitude, latitude, distance}})
          setMarkers(data.data.businesses)
          return data
      }, [distance, execute])

      const _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          console.warn('Permission to access location was denied')
        }
    
        const location = await Location.getCurrentPositionAsync({});
        setPos(regionFrom(location.coords.latitude, location.coords.longitude, 1500))
        setLocation({latitude: location.coords.latitude, longitude: location.coords.longitude})
        return location.coords
      };

      useEffect(() => {
        (async () => {
            const location = await _getLocationAsync()
            await updateMap(location.longitude, location.latitude)
        })()

      }, [])

      return(

            <View style={styles.map_container}> 
                <MapView style={styles.map}
                    initialRegion={pos}
                    showsUserLocation
                    followsUserLocation
                    onRegionChangeComplete={async region => {
                        await updateMap(region.longitude, region.latitude)
                        setPos(region)
                    }}
                >
                {markers.map((marker, key) => {
                    return <Marker
                        key={key}
                        coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                        title={marker.business_name}
                        description={marker.description}
                />})}
                </MapView>
            </View>
           
            
    )
}

const regionFrom = (lat, lon, distance) => {
    distance = distance/2
    const circumference = 40075
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000
    const angularDistance = distance/circumference

    const latitudeDelta = distance / oneDegreeOfLatitudeInMeters
    const longitudeDelta = Math.abs(Math.atan2(
            Math.sin(angularDistance)*Math.cos(lat),
            Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat))) || 0
    return {
        latitude: lat,
        longitude: lon,
        latitudeDelta,
        longitudeDelta,
    }
}




export default DiscoverPage;


const styles = StyleSheet.create({

    map_container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
 });
  