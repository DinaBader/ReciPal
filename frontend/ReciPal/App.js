import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingPage from './src/Pages/landingpage/LandingPage';
import LoginPage from './src/Pages/loginpage/Login';
import SignupPage from './src/Pages/signinpage/Signup';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }}/>
        <Stack.Screen name="SignupPage" component={SignupPage} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

