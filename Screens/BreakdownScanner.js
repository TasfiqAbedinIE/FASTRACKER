import { Text, View } from "react-native"
import Lottie from 'lottie-react-native'

function BreakdownScanner(){
    return(
        <Lottie source={require('../assets/groovyWalk.json')} autoPlay loop />
    )
}

export default BreakdownScanner