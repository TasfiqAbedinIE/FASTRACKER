import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IntroScreen from './Screens/IntroScreen';
import SquareNews from './Screens/squareNews';
import HourlyProductionContainer from './Screens/HourlyProductionContainer';
import CapacityAnalysis from './Screens/CapacityAnalysis';
import MachineOptimizationContainer from './Screens/MachineOptimizationContainer';

const Stack =createNativeStackNavigator()

export default function App() {

  return(
    <>
      <StatusBar style='dark'/>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{animation: 'simple_push', headerStyle:{backgroundColor: "#9fff8c"}}}>
          <Stack.Screen options={{headerShown:false}} name="HOME" component={IntroScreen}/>
          <Stack.Screen name="HOURLY PRODUCTION CONTAINER" component={HourlyProductionContainer} options={{title:"SEWING PRODUCTION"}}/>
          <Stack.Screen name="MACHINE OPTIMIZATION" component={MachineOptimizationContainer}/>
          <Stack.Screen name="CAPACITY ANALYSIS" component={CapacityAnalysis} options={{title:"CAPACITY ANALYSIS"}}/>
          <Stack.Screen name="SQUARE NEWS" component={SquareNews}/>
        </Stack.Navigator>
      </NavigationContainer>

    </>
  )
}