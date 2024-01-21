// import React from 'react'
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons'

// import HomeScreen from '../Pages/userpage/User'
// import ImageScreen from './screens/ImageScreen'
// import UserProfileScreen from '../Pages/userProfilePage/UserProfile'
// import RecipeDetailScreen from '../Pages/recipedetailpage/Recipedetail'
// import SettingsScreen from '../Pages/settingspage/Setting'

// const homeName='Home';
// const imageName='Image';
// const profileName='Profile';
// const RecipeDetailName='RecipeDetail';
// const SettingsName='Settings'
// const Tab=createBottomTabNavigator();

// const MainContainer = () => {
//   return (
//     <Tab.Navigator
//         initialRouteName={homeName}
//         screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
//             let rn = route.name;

//             if (rn === homeName) {
//             iconName = focused ? 'home' : 'home-outline';
//             } else if (rn === imageName) {
//             iconName = focused ? 'add-circle' : 'add-circle-outline';
//             } else if (rn === profileName) {
//             iconName = focused ? 'person' : 'person-outline';
//             }
//             return <Ionicons name={iconName} size={size+5} color={color}/>;
//         },
//         tabBarActiveTintColor: 'black',
//         tabBarInactiveTintColor: 'black',
//         tabBarLabel:'',
//         tabBarLabelStyle: {paddingBottom: 10, fontSize: 10 },
//         tabBarStyle: { padding: 10, height: 65, backgroundColor: '#FFBF4D' },
//         })}
//     >

//             <Tab.Screen name={homeName} component={HomeScreen} options={{ headerShown: false }}/>
//             <Tab.Screen name={imageName} component={ImageScreen} options={{ headerShown: false }}/>
//             <Tab.Screen name={profileName} component={UserProfileScreen} options={{ headerShown: false }}/>

//         </Tab.Navigator>
//   )
// }

// export default MainContainer