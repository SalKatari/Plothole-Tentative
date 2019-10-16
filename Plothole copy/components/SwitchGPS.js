import React from 'react';
import { TouchableHighlight, StyleSheet, Text, View, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const switchGPS = props => {
	return(
    <View style={styles.container}>
    <Text style={styles.text}>GPS</Text>
		<Switch
      style = {styles.switch}
      trackColor={{true: '#d35656', false: '#999'}}
      thumbColor={'#444'}
      onValueChange = {props.handleGPS}
      value = {props.switchVal}/>
    </View>
	);

};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f1f1',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
    padding: '2%',
    borderRadius: 100,
    marginRight: '3%'
  },
  text: {
    marginLeft: '15%'
  },
  switch: {
    color: '#d35656',
  },
});

export default switchGPS;
