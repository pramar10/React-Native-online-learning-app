import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CourseDetails, CourseListing, MainLayout} from './screens';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import themeReducer from './stores/themeReducer';
import { Easing } from 'react-native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element'
// const Stack = createNativeStackNavigator();
const Stack = createSharedElementStackNavigator();
const store = createStore(themeReducer, applyMiddleware(thunk));
const options ={
  gestureEnabled:false,
  transitionSpec:{
    open:{
      animation:'timing',
      config:{duration:400,easing:Easing.inOut(Easing.ease)}
    },
    close:{
      animation:'timing',
      config:{duration:400,easing:Easing.inOut(Easing.ease)}
    },

  },
  cardStyleInterpolator:({current:{progress}})=>{
    return{
      cardStyle:{
        opacity:progress
      }
    }
  }
}
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            useNativeDriver:true,
            headerShown: false,
          }}
          initialRouteName={'Dashboard'}
          detachInactiveScreens ={false}
          >
          <Stack.Screen name="Dashboard" component={MainLayout} />
          <Stack.Screen name="CourseListing" component={CourseListing}
          options={()=>options} />
          <Stack.Screen name="CourseDetails" component={CourseDetails}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
