import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LandingPage from './src/Pages/landingpage/LandingPage';
import LoginPage from './src/Pages/loginpage/Login';
import SignupPage from './src/Pages/signinpage/Signup';
import UserPage from './src/Pages/userpage/User';
import AdminPage from './src/Pages/adminpage/Admin';
import MainContainer from './src/UserNavigation/MainContainer';
import RecipeDetail from './src/Pages/recipedetailpage/Recipedetail'
import Settings from "./src/Pages/settingspage/Setting";
import EditProfile from './src/Pages/editProfilepage/EditProfile'
import Languages from './src/Pages/languagesPage/Languages';
import FeedBack from './src/Pages/feedbackpage/FeedBack';
import Saved  from './src/Pages/savedpage/Saved'
import Awards  from './src/Pages/awardspage/Awards'

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const role = await AsyncStorage.getItem('userRole');
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');

        console.log('Role:', role);
        console.log('LoggedIn:', loggedIn);

        if (loggedIn ) {
          setIsLoggedIn(true);
          // setUserRole(JSON.parse(role));
        } else {
          setIsLoggedIn(false);
          setUserRole(null);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuthentication();
  }, []);

  useEffect(()=>{
    console.log(isLoggedIn);
    console.log(typeof userRole);
  },[isLoggedIn]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        {true ? (
          <>
            <Stack.Screen name="MainContainer" component={MainContainer} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={Settings} options={{headerShown:false}} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown:false}} />
            <Stack.Screen name="Languages" component={Languages} options={{headerShown:false}} />
            <Stack.Screen name="FeedBack" component={FeedBack} options={{headerShown:false}} />
            <Stack.Screen name="Saved" component={Saved} options={{headerShown:false}} />
            <Stack.Screen name="Awards" component={Awards} options={{headerShown:false}} />
            <Stack.Screen name="RecipeDetail" component={RecipeDetail} options={{ headerShown: false }}/>
            <Stack.Screen name="UserPage" component={UserPage} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />


          </>
        ) : (
          <>
            <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
            <Stack.Screen name="SignupPage" component={SignupPage} options={{ headerShown: false }} />
            <Stack.Screen name="UserPage" component={UserPage} options={{ headerShown: false }} />
            <Stack.Screen name="AdminPage" component={AdminPage} options={{ headerShown: false }} />
            <Stack.Screen name="RecipeDetail" component={RecipeDetail} options={{ headerShown: false }}/>
            <Stack.Screen name="Settings" component={Settings} options={{headerShown:false}} />
            
          </>
          )}   
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
