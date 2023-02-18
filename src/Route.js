import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Detail from './posts/Detail';
import List from './posts/List';

const AppStack = createStackNavigator();

const Route = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#000'} barStyle="dark-content" />
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <AppStack.Screen name="List" component={List} />
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
