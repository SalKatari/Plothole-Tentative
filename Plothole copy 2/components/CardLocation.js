import React from 'react';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const cardLocation = props => {
  return(
    <TouchableHighlight 
      underlayColor={'#f3f3f3'} 
      style={styles.button}
      onPress={this.props.onGetCardLocation}/>
  );

};

const styles = StyleSheet.create({
  button: {   
   aspectRatio: 1/1,
   alignItems: 'center',
   justifyContent: 'center',
   borderRadius: 100,
  },
});

export default cardLocation;
