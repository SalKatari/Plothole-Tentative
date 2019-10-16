import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const usersMaps = props => {
	let userLocationMarker = null;
	if (props.userLocation) {
		userLocationMarker = <MapView.Marker coordinate = {props.userLocation}/>
	}
	const usersMarkers = props.userPlaces.map(userPlace => (<MapView.Marker coordinate = {userPlace} key={userPlace.id}/>));
	return(	
		<MapView 
		style = {props.getSizeMap}
		initialRegion={{
	      latitude: 28.5,
	      longitude: 77.2,
	      latitudeDelta: 3,
	      longitudeDelta: 3,
	    }}
	    region = {props.userLocation}>
			{userLocationMarker}
			{usersMarkers}
		</MapView>		
	);
}

export default usersMaps;
