import React, { Component } from 'react';
import { Image,  StyleSheet, View } from 'react-native';

const logo = () => (
   <View style={styles.logoContainer}>
   <Image
   style={styles.logo}
   source={{uri: 'https://i.ibb.co/P6MxbtC/FullLogo.png'}}/>
   </View>
)
export default logo

const styles = StyleSheet.create({
	logoContainer: {
		height: 25,
		justifyContent: 'center',
		marginLeft: '3%'
	},
	logo: {
		aspectRatio: 4.1/1,
		height: '100%',
		resizeMode: 'stretch',
	}
});