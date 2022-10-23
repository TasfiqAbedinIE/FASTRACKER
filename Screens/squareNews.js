import { FlatList, Text, View, StyleSheet, Dimensions } from "react-native";
import GridTile from "../Components/GridTile";
import { NewsValue } from "../Components/News_data";

screen_width = Dimensions.get('window').width
screen_height = Dimensions.get('window').height

/////////////// Render on scroll Down /////////////////

function SquareNews(){

    function renderNews(itemData){
        return(
            <GridTile
                image = {itemData.item.image}
                serial = {itemData.item.serial}
                dept = {itemData.item.dept}
                news = {itemData.item.news}
            />
        )
    }
    return(
        <View style={styles.container}>
                <FlatList
                    data={NewsValue}
                    keyExtractor={(item) => item.serial}
                    renderItem={renderNews}
                />
        </View>
        
    )
}

export default SquareNews

screen_width = Dimensions.get('window').width
screen_height = Dimensions.get('window').height

const styles = StyleSheet.create({
    header:{
        height: screen_height*0.08,
        marginTop: '8%',
        backgroundColor: '#a9fc94'
    },
    headerText:{
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: "5%",
        marginLeft: '35%',
        color: '#29b804'
    },
    container:{
        height: screen_height,
        backgroundColor: '#deffe2',
        paddingBottom: screen_height * 0.08,
    },
})

