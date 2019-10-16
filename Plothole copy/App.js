import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Switch,
  Card,
  ScrollView
} from 'react-native';

import FetchLocation from './components/FetchLocation';
import FetchUsers from './components/FetchUsers';
import UsersMaps from './components/UsersMaps';
import AddImage from './components/AddImage';
import Logo from './components/FetchLogo';
import SwitchGPS from './components/SwitchGPS';
import Go from './components/Go';
import SubmitButton from './components/SubmitButton';
import UsersCards from './components/UsersCards';


import Geolocation from '@react-native-community/geolocation';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


class App extends React.Component {
  static navigationOptions = {    
    header: null,
  };

  state = {
    userLocation: null,
    userPlaces: [],
    photo: null,
    imageId: null,
    switchVal: false,
    GPS: false
  };

  getNewLocation = () => {
      Geolocation.getCurrentPosition(
          info => {
              this.setState({
                userLocation: {
                  latitude: info.coords.latitude,
                  longitude: info.coords.longitude,
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.001,
                }
              });
          },
          (error) => {
              console.log(error.code, error.message);
          },
          { enableHighAccuracy: this.state.GPS, timeout: 15000, maximumAge: 0 }
      );  
  };

  sendUserDataHandler = () => {
    const date = new Date().getDate(); 
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    
    let datevar = new Date();

    let hours = datevar.getHours();
    let minutes = datevar.getMinutes();
    let seconds = datevar.getSeconds();

    
    function makeTwoDigits (time) {
      const timeString = `${time}`;
      if (timeString.length === 2) return time
      return `0${time}`
    }

    const timeGet = `${makeTwoDigits(hours)}:${makeTwoDigits(minutes)}`

    fetch('https://plothole-a1ace.firebaseio.com/Places.json', {
      method: 'POST',
      body: JSON.stringify({
        latitude: this.state.userLocation.latitude,
        longitude: this.state.userLocation.longitude,
        date: date.toString() + '/' + month.toString() + '/' + year.toString() + ' | ' + timeGet.toString()
      }) 
    }).then(res => console.log(res));    
    this.setState({ photo: null });
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchCamera(options, response => {
      console.log("response", response);
      if(response.uri) {
        this.setState({ photo: response });
      }
    });
  };

  handleGPS = (value) => {    
      this.setState({switchVal: value})
      this.setState({GPS: value})
  }

  render() {
    const {photo} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar 
        backgroundColor="#fff" 
        barStyle="dark-content"/>
        <View style={styles.margin}>
          <View 
          style={styles.header}
          elevation={10}>
            <Logo/>
            <View style={styles.gps}>          
              <SwitchGPS
              handleGPS = {this.handleGPS}
              switchVal = {this.state.switchVal}/>
              <Go 
              onGo = {() => this.props.navigation.navigate('All')}
              onIcon = {'globe'}/>
            </View>
          </View>
          <View 
          style={styles.footer}
          elevation={10}>
            <FetchLocation onGetLocation={this.getNewLocation}/>
            <AddImage onGetImage={this.handleChoosePhoto}/>
            {photo && (
              <Image
              source={{uri: photo.uri}}
              style={styles.photo}
              />
            )}
            <SubmitButton sendLocation={this.sendUserDataHandler}/>
          </View>
        </View>
        <UsersMaps 
        style={styles.mapPos}
        userLocation={this.state.userLocation}
        userPlaces = {this.state.userPlaces}
        getSizeMap = {{height: '100%', width: '100%'}}/>
      </View>      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    flexDirection: 'column',
  },
  margin: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  footer: {
    backgroundColor: 'rgba(255,255,255,1)',
    alignItems: 'center',
    paddingTop: '7%',
    paddingBottom: '6%',
    width: '95%',
    zIndex: 2,
    borderRadius: 3,
  },
  header: {
    backgroundColor: 'rgba(255,255,255,1)',
    padding: '4%',
    width: '100%',
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 0
  },
  mapPos: {
    position: 'relative',
  },
  photo: {
    width: '85%',
    aspectRatio: 1/1,
    borderRadius: 3,
    marginTop: '1%',
    marginBottom: '1%',
  },
  gps: {
    flexDirection: 'row',
    alignItems: 'center',  
    justifyContent: 'flex-start', 
    width: '100%',
    marginLeft: '35%'
  }
});

class All extends React.Component {
  static navigationOptions = {    
    header: null,
  };
  state = {
    userPlaces: [],
    userCards: [],
    item: '-LrG5SPRrJIFCeYaOfFi'
  }
  getAllUsersCardHandler = () => {
    fetch('https://plothole-a1ace.firebaseio.com/Places.json')
      .then(res => res.json())
      .then(parsedRes => {
        const cardsArray = [];
        for (const key in parsedRes) {
          cardsArray.push({
            latitude: parsedRes[key].latitude.toString(),
            longitude: parsedRes[key].longitude.toString(),
            time: parsedRes[key].date.toString(),
            id: key
          });
        }
        this.setState({
          userCards: cardsArray
        });
      });
    console.log(this.state.userCards);
  };

  removeCardHandler = () => {

    //this.setState({
     // item: userCard.id
    //});

    fetch('https://plothole-a1ace.firebaseio.com/Places/' + this.state.item + '.json', {
    method: 'delete'
    }).then(response =>
    response.json().then(json => {
      return json;
    }));
  }

  getAllUsersLocationHandler = () => {
    fetch('https://plothole-a1ace.firebaseio.com/Places.json')
      .then(res => res.json())
      .then(parsedRes => {
        const placesArray = [];
        for (const key in parsedRes) {
          placesArray.push({
            latitude: parsedRes[key].latitude,
            longitude: parsedRes[key].longitude,
            id: key
          });
        }
        this.setState({
          userPlaces: placesArray
        });
      });
  }
  render() {
    return (
    <View style={styles2.container}>

      <StatusBar 
        backgroundColor="#fff" 
        barStyle="dark-content"/>
      <View 
      style={styles2.header}
      elevation={10}>
        <Logo/>        
          <Go 
          onGo = {() => this.props.navigation.navigate('Home')}
          onIcon = {'home'}/>
      </View>
      <UsersMaps 
      style={styles2.mapPos}
      userPlaces={this.state.userPlaces}
      getSizeMap = {{height: '40%', width: '100%'}}
      />
      <View style={styles2.refreshContainer}>
        <View style={styles2.refresh} elevation={5}>
          <FetchUsers 
          onGetUsersLocation={() => {
            this.getAllUsersLocationHandler();
            this.getAllUsersCardHandler();
          }}
          onIcon = {'refresh'}/>
        </View>
      </View>
      <Button title={'TEST'}
      onPress={this.removeCardHandler}></Button>
      <ScrollView style={styles2.cardsContainer}>
      <UsersCards 
      userCards={this.state.userCards}
      getItem={this.removeCardHandler}/>
      </ScrollView>
    </View>
    );
  }
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: 'rgba(255,255,255,1)',
    padding: '4%',
    width: '100%',
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mapPos: {
    position: 'relative',
    height: '100%',
  },
  refreshContainer: {
    position: 'absolute',  
    height: '80%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  refresh: {
    backgroundColor: '#fff',
    zIndex: 2,    
    height: '6%',
    aspectRatio: 1/1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  cardsContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: '#fff',
    elevation: 10,
  }
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: App,
  },  
  All: {
    screen: All
  }, 
   
});

export default createAppContainer(AppNavigator);