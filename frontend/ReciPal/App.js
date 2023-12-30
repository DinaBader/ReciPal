import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingPage from './src/LandingPage';
import LoginPage from './src/Login';
import UserDashboard from './src/UserDashboard';
import AdminDashboard from './src/AdminDashboard';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }}/>
        <Stack.Screen name="UserDashboard" component={UserDashboard} options={{ headerShown: false }}/>
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

