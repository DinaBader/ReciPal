import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingPage from './src/Pages/landingpage/LandingPage';
import LoginPage from './src/Pages/loginpage/Login';
import SignupPage from './src/Pages/signinpage/Signup';
import UserPage from './src/Pages/userpage/User'
import AdminPage from './src/Pages/adminpage/Admin'
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }}/>
        <Stack.Screen name="SignupPage" component={SignupPage} options={{ headerShown: false }}/>
        <Stack.Screen name="UserPage" component={UserPage} options={{ headerShown: false }}/>
        <Stack.Screen name="AdminPage" component={AdminPage} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

