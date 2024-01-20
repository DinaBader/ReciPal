import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyStacks } from './stacks';
import HomeScreen from './src/Pages/userpage/User'
import ImageScreen from './src/UserNavigation/screens/ImageScreen'
import UserProfileScreen from './src/Pages/userProfilePage/UserProfile'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createStackNavigator } from '@react-navigation/stack';
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
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import common_ar from "./src/translation/ar/common.json"
import common_en from "./src/translation/en/common.json"
import { LanguageProvider } from './src/translation/LanguageContext';
const homeName='Home';
const imageName='Image';
const profileName='Profile';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const Stack=createStackNavigator();

  const selectedLanguage=()=>{
    i18next.init({
      interpolation:{
        escapeValue:false  
      },
      lng:this.state.selectedLanguage,
      resources:{
        en:{
          common:common_en
        },
        ar:{
          common:common_ar
        },
      },
    });
  }

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const role = await AsyncStorage.getItem('userRole');
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');

        console.log('Role:', role);
        console.log('LoggedIn:', loggedIn);
        if (loggedIn ) {
          setIsLoggedIn(true);
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
  const Tab=createBottomTabNavigator();
  return (
    <LanguageProvider>
    <NavigationContainer>
       <Stack.Navigator initialRouteName="LandingPage">
        {true  ? (
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
            <Stack.Screen name="SignupPage" component={SignupPage} options={{ headerShown: false }} /> 
            <Stack.Screen name="AdminPage" component={AdminPage} options={{ headerShown: false }} />

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
      {/* <Tab.Navigator
        initialRouteName={Initial}
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
            } else if (rn === imageName) {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (rn === profileName) {
            iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size+5} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
        tabBarLabel:'',
        tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
        tabBarStyle: { padding: 10, height: 65, backgroundColor: '#FFBF4D' },
        })}
    >
            <Tab.Screen name={Initial} component={InitialScreen} options={{ headerShown: false }}/>
            <Tab.Screen name={homeName} component={HomeScreen} options={{ headerShown: false }}/>
            <Tab.Screen name={imageName} component={ImageScreen} options={{ headerShown: false }}/>
            <Tab.Screen name={profileName} component={UserProfileScreen} options={{ headerShown: false }}/>
        </Tab.Navigator> */}
    </NavigationContainer>
    </LanguageProvider>

  );
};

export default App;
