import React, { Component, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import StopWatch from "../Components/StopWatch";
import CAScrollDown from "../Components/CAScrollDown";
import { store_capacity_data } from "../Components/server_activity";
import LoadingOverlay from '../Components/LoadingOverlay'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width
let totalInterval = []

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }


function CapacityAnalysis(){
    const [avgCycleTime, setAvgCycleTime] = useState(0)
    const [smv, setSMV] = useState(0)
    const [capacityPerHour, setCapacityPerHour] = useState(0)

    const [iD, setID] = useState('330')
    const [lineNo, setLineNo] = useState('')
    const [fabricsType, setFabricsType] = useState('')
    const [remarks, setRemarks] = useState('')

    const [itemValue, setItemValue] = useState()
    const [processValue, setProcessValue] = useState()

    const [refreshing, setRefreshing] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)

    function onChangeID(id){
        setID(id)
    }
    function onChangeLineNo(lineNo){
        setLineNo(Number(lineNo))
    }
    function onChangeFabricsType(FabType){
        setFabricsType(FabType)
    }
    function onChangeRemarks(remarks){
        setRemarks(remarks)
    }

    // console.log(iD, lineNo, fabricsType, remarks)
  
    useEffect(() => {
        totalInterval=[]
    }, [])
  
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => 
        setAvgCycleTime(0),
        setSMV(0),
        setCapacityPerHour(0),
        setID('330'),
        setLineNo(''),
        setFabricsType(''),
        setRemarks(''),
        setRefreshing(false));
        totalInterval=[];
      }, []);
    
    function getInterval(add){
        totalInterval.push(add)
        console.log(totalInterval)
        let totalCycleTime = 0;
            for (const i in totalInterval){
                totalCycleTime = totalCycleTime + totalInterval[i];
            }

        setAvgCycleTime(((totalCycleTime/totalInterval.length)/1000).toFixed(2))

        setSMV(() =>{
            return((avgCycleTime/60).toFixed(2))
        })

        setCapacityPerHour(() => {
            return((3060/avgCycleTime).toFixed(0))
        })
    }

    function getDropdownValue(value, processValue){
        setItemValue(value)
        setProcessValue(processValue)
        console.log(value, processValue)
    }

    const totalCapacityData = {
        "Cycle Time" : Number(avgCycleTime),
        "Remarks" : remarks,
        "Fab Type" : fabricsType,
        "Item" : itemValue,
        "Line" : lineNo
    }

    async function importCapacityData(){
        if (iD.length === 8){
            setIsSubmitting(true)
            let errormsg = 'success'
            errormsg = await store_capacity_data(Number(iD), processValue, totalCapacityData)

            if(errormsg === 'success'){
                setTimeout(() => {setIsSubmitting(false)}, 3000)
            }
            else{
                Alert.alert('A Network Error Occured, Please try Again')
                setTimeout(() => {setIsSubmitting(false)}, 1000)
            }
        }
        else{
            Alert.alert("Please Enter Operator ID and Retry, Thank you")
            console.log(iD.length)
        }
    }

    if(isSubmitting){
        return <LoadingOverlay/>
  }

    return(
        <View style={styles.headContainer}>
            <View>
                <CAScrollDown getDropdownValue={getDropdownValue}/>
            </View>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                <KeyboardAvoidingView behavior="position">
                    <View style={styles.stopWatchContainer}>
                        <StopWatch getInterval={getInterval}/>
                    </View>
                    <View style={styles.reportContainer}>
                        <View style={styles.eachReport}>
                            <Text style={[styles.reportText]}>AVG. CYCLE TIME</Text>
                            <Text style={[styles.reportText]}>{avgCycleTime} SEC</Text>
                        </View>
                        <View style={styles.eachReport}>
                            <Text style={[styles.reportText]}>SMV</Text>
                            <Text style={[styles.reportText]}>{smv} MIN</Text>
                        </View>
                        <View style={styles.eachReport}>
                            <Text style={[styles.reportText]}>CAPACITY</Text>
                            <Text style={[styles.reportText]}>{capacityPerHour} PCS</Text>
                        </View>
                    </View>
                    <View style={styles.manualEntryContainer}>
                        <View style={styles.IdLineNoContainer}>
                            <TextInput style={styles.textInputStyle} keyboardType='numeric' onChangeText={onChangeID}>{iD}</TextInput>
                            <TextInput style={styles.textInputStyle} placeholder='LINE NO' keyboardType="numeric" onChangeText={onChangeLineNo}>{lineNo}</TextInput>
                            <TextInput style={styles.textInputStyle} placeholder='FABRICS TYPE' onChangeText={onChangeFabricsType}>{fabricsType}</TextInput>
                        </View>
                        <View>
                            <TextInput style={[styles.textInputStyle, {width: screenWidth * 0.95, marginTop: 10}]} placeholder="REMARKS" onChangeText={onChangeRemarks}>{remarks}</TextInput>
                        </View>
                        <TouchableOpacity style={styles.pressButton} onPress={importCapacityData}>
                            <View>
                                <Text style={styles.pressButtonText}>SUBMIT</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>

    )
}

export default CapacityAnalysis

const styles = StyleSheet.create({
    headContainer:{
        backgroundColor: '#f8f9fa',
        height: screenHeight,
    },
    stopWatchContainer:{
        height: screenHeight * 0.3,
        marginTop: screenHeight * 0.03,
    },
    reportContainer:{
        // flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        marginHorizontal: screenWidth * 0.1,
        marginTop: screenHeight * 0.09,
        // borderWidth: 2,
        // borderRadius: 10,
        // borderColor: '#000000'
    },
    reportText:{
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: screenWidth < 300 ? 14:16,
    },
    eachReport:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: screenWidth * 0.1,
        marginVertical: screenHeight * 0.008,
        borderBottomWidth: 1,
    },
    textInputStyle:{
        width: screenWidth * 0.3,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        fontSize: 17,
        textAlign: 'center',
        marginLeft: screenWidth * 0.025,
    },
    IdLineNoContainer:{
        flexDirection: 'row',
    },
    manualEntryContainer:{
        marginTop: screenHeight * 0.03,
    },
    pressButton:{
        marginVertical: screenHeight * 0.05,
        marginLeft: screenWidth * 0.25,
        width: screenWidth * 0.5,
        height: screenHeight * 0.06,
        backgroundColor: '#7bf1a8',
        borderRadius:15,
        elevation: 5,
        overflow: 'hidden',
      },
      pressButtonText:{
        height: '100%',
        textAlign: "center",
        paddingTop: screenHeight * 0.015,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000'
      },
})
