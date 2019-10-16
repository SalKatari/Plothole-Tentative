import React from 'react';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const go = props => {
	return(
		<TouchableHighlight 
		style={styles.button}
		onPress = {props.onGo}
		underlayColor={'#f1f1f1'}>		
		<Icon name={props.onIcon} size={22} color="#444" />		
		</TouchableHighlight>
	);

};

const styles = StyleSheet.create({
  button: {
   aspectRatio: 1/1,   
   width: '7%',
   alignItems: 'center',
   justifyContent: 'center',
   borderRadius: 100,
  },
});

export default go;
