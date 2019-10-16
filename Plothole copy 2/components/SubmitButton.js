import React from 'react';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const submitButton = props => {
	return(
		<TouchableHighlight 
		style={styles.button}
		onPress = {props.sendLocation}
		underlayColor={'#AB4646'} >
		<View style={styles.buttonContent}>
		<Text style={styles.buttonText}> ADD POTHOLE </Text>
		</View>
		</TouchableHighlight>
	);

};

const styles = StyleSheet.create({
  button: {
   backgroundColor: '#d35656',
   padding: '3%',
   margin: '1.5%',
   width: '85%',
   alignItems: 'center',
   borderRadius: 3,
  },
  buttonContent: {
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'flex-end'
  },
  buttonText: {
   color: '#fff',
   fontWeight: "bold",
   marginLeft: 5,
  },
});

export default submitButton;
