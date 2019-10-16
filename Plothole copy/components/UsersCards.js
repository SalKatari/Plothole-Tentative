import React, {Component} from 'react';
import { Image, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Text, Button, Left, Body, Right, CardItem, Card, Container, Content } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

const usersCards = props => {
	const usersInfo = props.userCards.map(userCard => (
		<View key={userCard.id} style={styles.container}>
		<Container style={{height: '50%'}}>
        <Content>
          <Card transparent> 
            <CardItem>
	          	<Left>
	            <Body>
	              <Text>Coordinates</Text>
	              <Text note>Latitude: {userCard.latitude}</Text>
	              <Text note>Longitude: {userCard.longitude}</Text>
	            </Body> 
	            </Left>     

	            <TouchableHighlight 
	            underlayColor={'#f3f3f3'} 
	            style={styles.button}
	            >
              	<Icon 
              	name={'location-arrow'} 
              	size={22} 
              	color="#444" 
              	style={{marginRight: '15%'}}/>
              	</TouchableHighlight>

              	<TouchableHighlight 
              	underlayColor={'#f3f3f3'} 
              	style={styles.button}
              	>
              	<Icon 
              	name={'check'} 
              	size={22} 
              	color="#444"/> 
              	</TouchableHighlight> 

            </CardItem>
            <CardItem cardBody>
              <Image 
              source={{uri: 'https://firebasestorage.googleapis.com/v0/b/plothole-a1ace.appspot.com/o/Plothole%20Logo2.png?alt=media&token=ad9a5d9a-480f-4d0b-badc-c60541059a2c'}} 
              style={{height: 200, width: '100%', flex: 1, marginTop: '3%', borderRadius: 10,}}/>
            </CardItem>
            <CardItem>
              <Body style={{alignItems: 'center'}}>   
                <Text note>{userCard.time}</Text>                
              </Body>              
            </CardItem>
          </Card>
        </Content>
      </Container>

		</View>
	));

	return(	
		usersInfo
	);
}

const styles = StyleSheet.create({
  container: {
   borderRadius: 20,
   backgroundColor: '#fff',
   width: '90%',
   margin: '5%',
   marginBottom: 0,
   elevation: 3,
   padding: '3%',
  },
  button: {   
   aspectRatio: 1/1,
   alignItems: 'center',
   justifyContent: 'center',
   borderRadius: 100,
  },
});

export default usersCards;
