import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, View, Dimensions, KeyboardAvoidingView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import ContainerBlock10 from '../Components/ContainerBlock10';
import ContainerBlock9 from '../Components/ContainerBlock9';
import ContainerBlock7 from '../Components/ContainerBlock7';
import ContainerBlock6 from '../Components/ContainerBlock6';
import ContainerBlock5 from '../Components/ContainerBlock5';

screen_width = Dimensions.get('window').width
screen_height = Dimensions.get('window').height

function Hourly_prod({navigation}) {

  // Applicable for V-1.5.5
  // const [modalIsVisible, setModalIsVisible] = useState(false)
  // const [enteredDate, setEnteredDate] = useState('DD-MM-YY')
  // const [enteredLine, setEnteredLine] = useState('')
  // const [enteredWH, setWorkingHour] = useState('')
  // const [enteredTarget, setHourlyTarget] = useState('')
  // const [enteredProduction, setHourlyProduction] = useState('')
  // const [enteredIssues, setIssues ] = useState('')

  // const [IsSubmitting, setIsSubmitting] = useState(false)

  // const complete_data = {
  //   // Applicable for V -- 1.0.0

  //   // Date: enteredDate,
  //   // Line: enteredLine,
  //   // Working_Hour: enteredWH,

  //   /////////////////////////////
  //   Target: enteredTarget,
  //   Production: enteredProduction,
  //   Issues: enteredIssues
  // }


  // function StartGoalHandler(){
  //   setModalIsVisible(true)
  // }
  // function EndGoalHandler(get_date){
  //   setEnteredDate(get_date)
  //   setModalIsVisible(false)
  // }
  // function LineData(get_line){
  //   setEnteredLine(Number(get_line))
  // }
  // function workingHour(getWH){
  //   setWorkingHour(Number(getWH))
  // }
  // function targetSetup(getTarget){
  //   setHourlyTarget(Number(getTarget))
  // }
  // function productionSetup(getProduction){
  //   setHourlyProduction(Number(getProduction))
  // }
  // function productionIssues(getIssues){
  //   setIssues(getIssues)
  // }

  // function gather_data(){

  //   //Applicable for V -- 1.0.0
  //   // setIsSubmitting(true)
  //   // store_line_data(complete_data)
  //   // setEnteredLine('')
  //   // setHourlyTarget('')
  //   // setHourlyProduction('')
  //   // setIssues('')
  //   /////////////////////////////

  //   if (enteredDate !== 'DD-MM-YY' && enteredLine !== '' && enteredProduction !== '' && enteredTarget !== '' && enteredWH !== ''){
  //     setIsSubmitting(true)
  //     store_line_data(complete_data, enteredDate, enteredLine, enteredWH)
  //     setEnteredLine('')
  //     setHourlyTarget('')
  //     setHourlyProduction('')
  //     setIssues('')
  //   }
  //   else{
  //     Alert.alert("You Forgot To Enter Data, Please Retry")
  //   }

  //   setTimeout(() => {setIsSubmitting(false)}, 1000)
  // }

  // if(IsSubmitting){
  //   return <LoadingOverlay/>
  // }
  
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    {label: '1-6', value: [1,2,3,4,5,6]},
    {label: '7-15', value: [7,8,9,10,11,12,13,14,15]},
    {label: '16-21', value: [16,17,18,19,20,21] },
    {label: '22-30', value: [22,23,24,25,26,27,28,29,30] },
    {label: '31-36', value: [31,32,33,34,35,36] },
    {label: '37-45', value: [37,38,39,40,41,42,43,44,45]},
    {label: '46-55', value: [46,47,48,49,50,51,52,53,54,55]},
    {label: '56-62', value: [56,57,58,59,60,61,62]},
    {label: '63-69', value: [63,64,65,66,67,68,69]},
    {label: '70-76', value: [70,71,72,73,74,75,76]},
    {label: '77-81', value: [77,78,79,80,81]},
    {label: '82-86', value: [82,83,84,85,86]},
    {label: '87-91', value: [87,88,89,90,91]},
    {label: '92-96', value: [92,93,94,95,96]},
    {label: '97-105', value: [97,98,99,100,101,102,103,104,105]},
    {label: '106-114', value: [106,107,108,109,110,111,112,113,114]},
  ]);

  const day = new Date()
  const currentHour = day.getHours()
  // console.log(currentHour)

  const [hour, setHour] = useState(currentHour)
  function getHour(hour){
    setHour(hour)
  }

  // console.log(value)

  let arrayLen = value.length
  let screen = <Text>Please select a block</Text>

  if (arrayLen === 10){
    screen = <ContainerBlock10 line_no={value} hour={hour} currentHour={currentHour}/>
    console.log(hour)
  }
  else if (arrayLen === 9){
    screen = <ContainerBlock9 line_no={value} hour={hour} currentHour={currentHour}/>
  }
  else if (arrayLen === 7){
    screen = <ContainerBlock7 line_no={value} hour={hour} currentHour={currentHour}/>
  }
  else if (arrayLen === 6){
    screen = <ContainerBlock6 line_no={value} hour={hour} currentHour={currentHour}/>
  }
  else if (arrayLen === 5){
    screen = <ContainerBlock5 line_no={value} hour={hour} currentHour={currentHour}/>
  }
  else{
    screen = <Text style={{fontSize: 20, marginLeft: screen_width * 0.03}}>Please select a <Text style={{fontWeight:'bold', color: 'red'}}>BLOCK</Text> and Enter <Text style={{fontWeight:'bold', color: 'red'}}>HOUR</Text></Text>
  }

  return (
    <View>
        <ImageBackground source={require('../assets/background.png')} style={styles.backgroundimage}>

          {/* Applicable for V-1.5.5 */}
          <>
          {/* <View style={styles.Mother}>
            <View style={styles.topheader}>
              <Text style={styles.topheadertext}>DATA FORM</Text>
            </View>

            <View style={styles.motherdataform}>
              <View style={styles.dataformbundle}>
                <Text style={styles.dataformtext}>DATE</Text>
                <TextInput caretHidden={true} style={styles.dataforminput} onPressIn={StartGoalHandler} showSoftInputOnFocus={false} >{enteredDate}</TextInput>
                <Calendar visible={modalIsVisible} onCancel={EndGoalHandler}></Calendar>
              </View>
              <View style={styles.dataformbundle}>
                <Text style={styles.dataformtext}>LINE NO.</Text>
                <TextInput style={styles.dataforminput} onChangeText={LineData} keyboardType="numeric">{enteredLine}</TextInput>
              </View>
              <View style={styles.dataformbundle}>
                <Text style={styles.dataformtext}>WORKING HOURS</Text>
                <TextInput style={styles.dataforminput} onChangeText={workingHour} keyboardType="numeric">{enteredWH}</TextInput>
              </View>
              <View style={styles.dataformbundle}>
                <Text style={styles.dataformtext}>HOURLY TARGET</Text>
                <TextInput style={styles.dataforminput} onChangeText={targetSetup} keyboardType="numeric">{enteredTarget}</TextInput>
              </View>
              <View style={styles.dataformbundle}>
                <Text style={styles.dataformtext}>HOURLY PRODUCTION</Text>
                <TextInput style={styles.dataforminput} onChangeText={productionSetup} keyboardType="numeric">{enteredProduction}</TextInput>
              </View>
              <View style={styles.dataformbundle}>
                <Text style={styles.dataformtext}>REMARKS</Text>
                <TextInput style={styles.dataforminput} onChangeText={productionIssues}>{enteredIssues}</TextInput>
              </View>
            </View>

            <View>
              <View style={styles.touchableButton}>
                <Button title='SUBMIT' color={'#21d400'} onPress={gather_data}/>
              </View>
            </View>
            
          </View> */}

          </>

          <View>
                <View style={styles.topcontainer}>
                  <View>
                      <DropDownPicker
                        style={styles.dropdown}
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        listMode="MODAL"
                        modalTitle='Select Your Block'
                        modalProps={{animationType:'fade'}}
                        placeholder='Select Your Block'
                      />
                  </View>
                  <View style={styles.hourInput}>
                      <Text style={styles.textInputText}>HOUR</Text>
                      <TextInput style={styles.textInput} onChangeText={getHour} keyboardType='numeric'>{currentHour}</TextInput>
                  </View>
                  
                </View>
                

                <View>
                  <KeyboardAvoidingView behavior='padding'>
                    {screen}
                  </KeyboardAvoidingView>
                </View>
              </View>
        </ImageBackground>
    </View>
  );
}

export default Hourly_prod

const styles = StyleSheet.create({
  backgroundimage:{
    width: screen_width,
    height: screen_height,
  },

  // Applicable for V -- 1.5.0
  // Mother:{
  //   marginTop: screen_height * 0.01
  // },
  // topheader:{
  //   marginLeft: screen_width * 0.05,
  // },
  // topheadertext:{
  //   fontSize: screen_height > 500 ? 25:20,
  //   fontWeight:'bold',
  //   fontFamily: 'sans-serif',
  //   color: '#21d400',
  // },
  // motherdataform:{
  //   paddingLeft:'5%',
  //   paddingTop: '5%',
  // },
  // dataformbundle:{
  //   marginBottom: '6%',
  // },
  // dataformtext:{
  //   fontSize: screen_height > 500 ? 20:18,
  //   fontWeight:'bold',
  //   fontFamily: 'sans-serif',
  // },
  // dataforminput:{
  //   width: screen_width * 0.9,
  //   height: 40,
  //   borderColor: '#e6fff3',
  //   borderWidth: 2,
  //   borderRadius: 5,
  //   backgroundColor: '#ffffff',
  //   textAlign:'center',
  //   color:'#000000',
  // },
  // touchableButton:{
  //   width: screen_width * 0.5,
  //   backgroundColor: '#73e600',
  //   marginLeft: screen_width * 0.25,
  //   marginTop:10,
  // },

  dropdown:{
    marginTop: screen_height * 0.01,
    marginLeft: screen_width * 0.03,
    width: screen_width * 0.4,
    backgroundColor: 'f8f9fa',
  },
  topcontainer:{
    flexDirection: 'row',
    marginBottom: 10,
  },
  hourInput:{
    flexDirection:'row',
    marginLeft:screen_width * 0.03,
    marginTop: screen_height * 0.01,
  },
  textInputText:{
    marginTop: 10,
    marginRight:10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput:{
    width: screen_width * 0.35,
    borderWidth: 2,
    borderColor:"#2b2d42",
    borderRadius:5,
    textAlign:'center',
    fontSize: 20,
  },
});
