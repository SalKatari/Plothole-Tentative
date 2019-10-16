import React from 'react';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const fetchLocation = props => {
  return(
    <TouchableHighlight 
    style={styles.button}
    onPress = {props.onGetImage}
    underlayColor={'#333'} >
    <View style={styles.buttonContent}>
    <Text style={styles.buttonText}> CAPTURE IMAGE </Text>
    </View>
    </TouchableHighlight>
  );

};

const styles = StyleSheet.create({
  button: {
   backgroundColor: '#444',
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

export default fetchLocation;
