import React from 'react';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const fetchUsers = props => {
  return(
    <TouchableHighlight 
    style={styles.button}
    onPress = {props.onGetUsersLocation}
    underlayColor={'#f3f3f3'}>    
    <Icon name={props.onIcon} size={22} color="#444" />   
    </TouchableHighlight>
  );

};

const styles = StyleSheet.create({
  button: {
   padding: '20%',
   aspectRatio: 1/1,
   alignItems: 'center',
   justifyContent: 'center',
   borderRadius: 100,
  },
});

export default fetchUsers;
