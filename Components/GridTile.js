import { Pressable, View, Text, StyleSheet, Dimensions, Image} from "react-native"

function GridTile({serial, dept, news, image}){

    return (
        <View style={styles.gridItem}>
            <Pressable android_ripple={{color: '#ccc'}}>
                <Image source={{uri:image}} style={styles.image}/>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>{serial}. {dept}</Text>
                    <Text style={styles.description}>{news}</Text>
                </View>
            </Pressable>
        </View>
    )        
}

export default GridTile

screen_width = Dimensions.get('window').width
screen_height = Dimensions.get('window').height

const styles = StyleSheet.create({
    gridItem:{
        margin: 10,
        borderRadius: 4,
        elevation: 6,
        overflow: Platform.OS === 'android' ? 'hidden': 'visible'
    },
    innerContainer:{
        padding:20,
        backgroundColor: '#fefee3',
    },
    title:{
        fontWeight:'bold',
        fontSize: screen_width > 390 ? 24:22,
        textAlign: 'justify',
        color: "#168aad"
    },
    description:{
        fontSize: screen_width > 390 ? 18:16,
        textAlign: 'justify',
        color: 'black',
        marginTop: 10,
    },
    image:{
        width: "100%",
        height: 200,
    }
})