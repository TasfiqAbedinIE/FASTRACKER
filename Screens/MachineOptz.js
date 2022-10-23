import { useState, useEffect } from "react";
import { StyleSheet, Dimensions, TextInput, View, Text, Pressable, ScrollView, TouchableOpacity, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import {store_line_machine} from '../Components/server_activity'
import LoadingOverlay from '../Components/LoadingOverlay'

let screen_height = Dimensions.get("window").height;
let screen_width = Dimensions.get("window").width;

function MachineOptz() {
  // DROPDOWN Section
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: "BRAX", value: "BRAX" },
    { label: "CARHARTT", value: "CARHARTT" },
    { label: "Casamoda", value: "Casamoda" },
    { label: "Creasions", value: "Creasions" },
    { label: "Dickies", value: "Dickies" },
    { label: "El-Corte", value: "El-Corte" },
    { label: "E. Strauss", value: "E. Strauss" },
    { label: "ESPRIT", value: "ESPRIT" },
    { label: "FUSSLE", value: "FUSSLE" },
    { label: "G.Star", value: "G.Star" },
    { label: "HUGO BOSS", value: "HUGO BOSS" },
    { label: "HUGO BOSS CWF", value: "HUGO BOSS CWF" },
    { label: "JOOP", value: "JOOP" },
    { label: "Karstadt", value: "Karstadt" },
    { label: "LEE", value: "LEE" },
    { label: "M&S", value: "M&S" },
    { label: "MALFINI", value: "MALFINI" },
    { label: "MUSTANG", value: "MUSTANG" },
    { label: "MWW", value: "MWW" },
    { label: "NAPAPIJRI", value: "NAPAPIJRI" },
    { label: "NEW ERA", value: "NEW ERA" },
    { label: "NEXT UK", value: "NEXT UK" },
    { label: "PUMA", value: "PUMA" },
    { label: "P&C", value: "P&C" },
    { label: "P&C GSM", value: "P&C GSM" },
    { label: "Pierre Cardin", value: "Pierre Cardin" },
    { label: "RAGNO", value: "RAGNO" },
    { label: "S. Oliver", value: "S. Oliver" },
    { label: "Strellson", value: "Strellson" },
    { label: "Tommy Hilfiger", value: "Tommy Hilfiger" },
    { label: "Timberland VF", value: "Timberland VF" },
    { label: "Timberland CWF", value: "Timberland CWF" },
    { label: "T. Australia", value: "T. Australia" },
    { label: "VANZ", value: "VANZ" },
    { label: "Wrangler", value: "Wrangler" },
  ]);
  ///////////////////////////////////////////////////

  const [totalMachine, setTotalMachine] = useState(0);
  //////////// Single Needle ///////////////
  const [SNQuantity, setSNQuantity] = useState(0);
  const [LASNQuantity, setLASNQuantity] = useState(0);
  const [VSNQuantity, setVSNQuantity] = useState(0);
  const [CHSNQuantity, setCHSNQuantity] = useState(0);
  //////////// Double Needle ///////////////
  const [DNQuantity, setDNQuantity] = useState(0);
  const [CHDNQuantity, setCHDNQuantity] = useState(0);
  /////////////// Flat Lock ////////////////
  const [CYBFLQuantity, setCYBFLQuantity] = useState(0);
  const [FBFLQuantity, setFBFLQuantity] = useState(0);
  /////////////// Over Lock ////////////////
  const [T4OLQuantity, set4TOLQuantity] = useState(0);
  const [T3OLQuantity, set3TOLQuantity] = useState(0);
  const [ROLQuantity, setROLQuantity] = useState(0);
  const [BHOLQuantity, setBHOLQuantity] = useState(0);
  ////////////// Feed of the Arm //////////////
  const [FOAQuantity, setFOAQuantity] = useState(0);
  const [FOAVQuantity, setFOAVQuantity] = useState(0);
  ////////////// Button ////////////////
  const [BHOLEQuantity, setBHOLEQuantity] = useState(0);
  const [BATTQuantity, setBATTQuantity] = useState(0);
  const [SNAPBQuantity, setSNAPBQuantity] = useState(0);
  ///////////// Multi needle //////////////
  const [BTACKQuantity, setBTACKQuantity] = useState(0);
  const [ZIGZAGQuantity, setZIGZAGQuantity] = useState(0);
  const [KANSAIQuantity, setKANSAIQuantity] = useState(0);
  ///////////// Others ////////////////
  const [RIBCQuantity, setRIBCQuantity] = useState(0);
  const [EYELETHQuantity, setEYELETHQuantity] = useState(0);
  const [SMOKEQuantity, setSMOKEQuantity] = useState(0);
  const [SSQuantity, setSSQuantity] = useState(0);
  ///////////// Automation //////////////
  const [ACSQuantity, setACSQuantity] = useState(0);
  const [BMOONAQuantity, setBMOONAQuantity] = useState(0);
  const [ALABELQuantity, setALABELQuantity] = useState(0);

  ///////////////// Line No and Style /////////////////
  const [lineNo, getLineNo] = useState('')
  const [styleNo, getStyleNo] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function getLine(line){
    getLineNo(line)
  }
  function getStyle(style){
    getStyleNo(style)
  }

  const machineDataSet = {
    "SingleNeedle" : SNQuantity + LASNQuantity + VSNQuantity + CHSNQuantity,
    "FlatLock" : CYBFLQuantity + FBFLQuantity,
    "OverLock" : T4OLQuantity + T3OLQuantity + ROLQuantity + BHOLEQuantity,
    "DoubleNeedle" : DNQuantity + CHDNQuantity,
    "FOA" : FOAQuantity + FOAVQuantity,
    "Button" : BHOLEQuantity + BATTQuantity + SNAPBQuantity,
    "BarTack" : BTACKQuantity,
    "ZigZag" : ZIGZAGQuantity,
    "KANSAI" : KANSAIQuantity,
    "Others" : RIBCQuantity + EYELETHQuantity + SMOKEQuantity + SSQuantity,
    "AutoMation" : ACSQuantity + BMOONAQuantity + ALABELQuantity,
    "Total" : totalMachine
  }

  // console.log(machineDataSet)
  
  

  useEffect(() => {
    setTotalMachine(() => SNQuantity + LASNQuantity + VSNQuantity + CHSNQuantity + DNQuantity + CHDNQuantity + CYBFLQuantity + FBFLQuantity + T4OLQuantity + T3OLQuantity + ROLQuantity + BHOLQuantity + FOAQuantity + FOAVQuantity + BATTQuantity + BHOLEQuantity + SNAPBQuantity + BTACKQuantity + ZIGZAGQuantity + KANSAIQuantity + RIBCQuantity + EYELETHQuantity + SMOKEQuantity + SSQuantity + ACSQuantity + BMOONAQuantity + ALABELQuantity);
  }, [SNQuantity, LASNQuantity, VSNQuantity, CHSNQuantity, DNQuantity, CHDNQuantity, CYBFLQuantity, FBFLQuantity, T4OLQuantity, T3OLQuantity, ROLQuantity, BHOLQuantity, FOAQuantity, FOAVQuantity, BATTQuantity, BHOLEQuantity, SNAPBQuantity, BTACKQuantity, ZIGZAGQuantity, KANSAIQuantity, RIBCQuantity, EYELETHQuantity, SMOKEQuantity, SSQuantity, ACSQuantity, BMOONAQuantity, ALABELQuantity]);

  async function data_store(){
    if(lineNo){
      setIsSubmitting(true)
      let errormsg = 'success'
      errormsg = await store_line_machine(lineNo, machineDataSet)

      if(errormsg === 'success'){
        setTimeout(() => {setIsSubmitting(false)}, 3000)
        getLineNo()
      }
      else{
        Alert.alert('A Network Error Occured, Please try Again')
        setTimeout(() => {setIsSubmitting(false)}, 1000)
      }
    }
    else{
      Alert.alert("Please Enter Line and Try AGAIN")
    }
  }

  if(isSubmitting){
    return <LoadingOverlay/>
}

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.lineNoContainer}>
          <TextInput style={styles.textinput} placeholder="Line No" keyboardType="numeric" onChangeText={getLine}></TextInput>
        </View>
        <View style={styles.styleContainer}>
          <TextInput style={styles.textinput} placeholder="STYLE" onChangeText={getStyle}></TextInput>
        </View>
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
            modalTitle="Select Your Block"
            modalProps={{ animationType: "fade" }}
            placeholder="BUYER"
          />
        </View>
      </View>
      <View style={styles.totalMachineContainer}>
        <Text style={styles.totalMachineText}>
          TOTAL MACHINE: <Text style={{ color: "green" }}>{totalMachine}</Text>
        </Text>
      </View>
      <ScrollView style={styles.scrolloption}>
        {/* /////////////// Row - 1 (Single Needle) ////////////////// */}
        <Text style={styles.machineNameText}>Single Needle Machine</Text>
        <View style={styles.mainContainer}>
          <View style={styles.machineContainer1}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>S/N</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setSNQuantity((SN) => SN - 1)}
              />
              <Text style={styles.numberFontSize}>{SNQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setSNQuantity((SN) => SN + 1)}
              />
            </View>
          </View>

          <View style={styles.machineContainer2}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>LA S/N</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setLASNQuantity((LASN) => LASN - 1)}
              />
              <Text style={styles.numberFontSize}>{LASNQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setLASNQuantity((LASN) => LASN + 1)}
              />
            </View>
          </View>

          <View style={styles.machineContainer2}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>522</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setVSNQuantity((VSN) => VSN - 1)}
              />
              <Text style={styles.numberFontSize}>{VSNQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setVSNQuantity((VSN) => VSN + 1)}
              />
            </View>
          </View>

          <View style={styles.machineContainer2}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>380</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setCHSNQuantity((CHSN) => CHSN - 1)}
              />
              <Text style={styles.numberFontSize}>{CHSNQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setCHSNQuantity((CHSN) => CHSN + 1)}
              />
            </View>
          </View>
        </View>
        {/* /////////////// Row - 3 (Flat Lock) ////////////////// */}
        <Text style={styles.machineNameText}>Flat Lock Machine</Text>
        <View style={styles.mainContainer}>
          <View style={styles.machineContainer1}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>Cyl. B F/L</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setCYBFLQuantity((CYBFL) => CYBFL - 1)}
              />
              <Text style={styles.numberFontSize}>{CYBFLQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setCYBFLQuantity((CYBFL) => CYBFL + 1)}
              />
            </View>
          </View>

          <View style={styles.machineContainer2}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>Flat B F/L</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setFBFLQuantity((FBFL) => FBFL - 1)}
              />
              <Text style={styles.numberFontSize}>{FBFLQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setFBFLQuantity((FBFL) => FBFL + 1)}
              />
            </View>
          </View>
        </View>
        {/* /////////////// Row - 4 (Over Lock) ////////////////// */}
        <Text style={styles.machineNameText}>Over Lock Machine</Text>
        <View style={styles.mainContainer}>
          <View style={styles.machineContainer1}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>4T O/L</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => set4TOLQuantity((T4OL) => T4OL - 1)}
              />
              <Text style={styles.numberFontSize}>{T4OLQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => set4TOLQuantity((T4OL) => T4OL + 1)}
              />
            </View>
          </View>

          <View style={styles.machineContainer2}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>3T O/L</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => set3TOLQuantity((T3OL) => T3OL - 1)}
              />
              <Text style={styles.numberFontSize}>{T3OLQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => set3TOLQuantity((T3OL) => T3OL + 1)}
              />
            </View>
          </View>

          <View style={styles.machineContainer2}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>Roller O/L</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setROLQuantity((ROL) => ROL - 1)}
              />
              <Text style={styles.numberFontSize}>{ROLQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setROLQuantity((ROL) => ROL + 1)}
              />
            </View>
          </View>

          <View style={styles.machineContainer2}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>Blind H O/L</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setBHOLQuantity((BHOL) => BHOL - 1)}
              />
              <Text style={styles.numberFontSize}>{BHOLQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setBHOLQuantity((BHOL) => BHOL + 1)}
              />
            </View>
          </View>
        </View>
        {/* /////////////// Row - 5 (BUTTON MACHINE) ////////////////// */}
        <Text style={styles.machineNameText}>Button Machine</Text>
        <View style={styles.mainContainer}>
          <View style={styles.machineContainer1}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>B. HOLE</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setBHOLEQuantity((BHOLE) => BHOLE - 1)}
              />
              <Text style={styles.numberFontSize}>{BHOLEQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setBHOLEQuantity((BHOLE) => BHOLE + 1)}
              />
            </View>
          </View>

          <View style={styles.machineContainer2}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>B. ATTACH</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setBATTQuantity((BATT) => BATT - 1)}
              />
              <Text style={styles.numberFontSize}>{BATTQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setBATTQuantity((BATT) => BATT + 1)}
              />
            </View>
          </View>

          <View style={styles.machineContainer2}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>SNAP B.</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setSNAPBQuantity((SNAPB) => SNAPB - 1)}
              />
              <Text style={styles.numberFontSize}>{SNAPBQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setSNAPBQuantity((SNAPB) => SNAPB + 1)}
              />
            </View>
          </View>
        </View>
        {/* /////////////// Row - 7 (BAR TACK, ZIGZAG, KANSAI) ////////////////// */}
        <Text style={styles.machineNameText}>Multi Stitch/Needle</Text>
        <View style={styles.mainContainer}>
          <View style={styles.machineContainer1}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>B. TACK</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setBTACKQuantity((BTACK) => BTACK - 1)}
              />
              <Text style={styles.numberFontSize}>{BTACKQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setBTACKQuantity((BTACK) => BTACK + 1)}
              />
            </View>
          </View>

          <View style={styles.machineContainer2}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>ZIGZAG</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setZIGZAGQuantity((ZIGZAG) => ZIGZAG - 1)}
              />
              <Text style={styles.numberFontSize}>{ZIGZAGQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setZIGZAGQuantity((ZIGZAG) => ZIGZAG + 1)}
              />
            </View>
          </View>

          <View style={styles.machineContainer2}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>KANSAI</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setKANSAIQuantity((KANSAI) => KANSAI - 1)}
              />
              <Text style={styles.numberFontSize}>{KANSAIQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setKANSAIQuantity((KANSAI) => KANSAI + 1)}
              />
            </View>
          </View>
        </View>
        {/* /////////////// Row - 8 (RIB Cutter, EYELET H, Smoke, Shuttle S.) ////////////////// */}
        <Text style={styles.machineNameText}>Others</Text>
        <View style={styles.mainContainer}>
          <View style={styles.machineContainer1}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>RIB C.</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setRIBCQuantity((RIBC) => RIBC - 1)}
              />
              <Text style={styles.numberFontSize}>{RIBCQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setRIBCQuantity((RIBC) => RIBC + 1)}
              />
            </View>
          </View>

          <View style={styles.machineContainer2}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>EYELET H.</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setEYELETHQuantity((EYELETH) => EYELETH - 1)}
              />
              <Text style={styles.numberFontSize}>{EYELETHQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setEYELETHQuantity((EYELETH) => EYELETH + 1)}
              />
            </View>
          </View>

          <View style={styles.machineContainer2}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>SMOKE</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setSMOKEQuantity((SMOKE) => SMOKE - 1)}
              />
              <Text style={styles.numberFontSize}>{SMOKEQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setSMOKEQuantity((SMOKE) => SMOKE + 1)}
              />
            </View>
          </View>

          <View style={styles.machineContainer2}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>Shuttle S.</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setSSQuantity((SS) => SS - 1)}
              />
              <Text style={styles.numberFontSize}>{SSQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setSSQuantity((SS) => SS + 1)}
              />
            </View>
          </View>
        </View>
        {/* /////////////// Row - 9 (Automated Cycle stitch (ACS), Back Moon Attach (B. Moon Set), Automated Label Attach (A. Label Att.)) ////////////////// */}
        <Text style={styles.machineNameText}>Automation</Text>
        <View style={styles.mainContainer}>
          <View style={styles.machineContainer1}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>ACS</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setACSQuantity((ACS) => ACS - 1)}
              />
              <Text style={styles.numberFontSize}>{ACSQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setACSQuantity((ACS) => ACS + 1)}
              />
            </View>
          </View>

          <View style={styles.machineContainer2}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>B. Moon Set</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setBMOONAQuantity((BMOONA) => BMOONA - 1)}
              />
              <Text style={styles.numberFontSize}>{BMOONAQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setBMOONAQuantity((BMOONA) => BMOONA + 1)}
              />
            </View>
          </View>

          <View style={styles.machineContainer2}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>A. LABEL ATT.</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setALABELQuantity((ALABEL) => ALABEL - 1)}
              />
              <Text style={styles.numberFontSize}>{ALABELQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setALABELQuantity((ALABEL) => ALABEL + 1)}
              />
            </View>
          </View>
        </View>
        {/* /////////////// Row - 2 (Double Needle) ////////////////// */}
        <Text style={styles.machineNameText}>Double Needle Machine</Text>
        <View style={styles.mainContainer}>
          <View style={styles.machineContainer1}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>D/N</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setDNQuantity((DN) => DN - 1)}
              />
              <Text style={styles.numberFontSize}>{DNQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setDNQuantity((DN) => DN + 1)}
              />
            </View>
          </View>

          <View style={styles.machineContainer2}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>CH D/N</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setCHDNQuantity((CHDN) => CHDN - 1)}
              />
              <Text style={styles.numberFontSize}>{CHDNQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setCHDNQuantity((CHDN) => CHDN + 1)}
              />
            </View>
          </View>
        </View>
        {/* /////////////// Row - 6 (Feed of the ARM) ////////////////// */}
        <Text style={styles.machineNameText}>Feed Of The Arm</Text>
        <View style={styles.mainContainer}>
          <View style={styles.machineContainer1}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>FOA</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setFOAQuantity((FOA) => FOA - 1)}
              />
              <Text style={styles.numberFontSize}>{FOAQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setFOAQuantity((FOA) => FOA + 1)}
              />
            </View>
          </View>

          <View style={styles.machineContainer2}>
            <View style={styles.machineName}>
              <Text style={styles.generalFontSize}>FOA Vertical</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <Ionicons
                name="remove-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setFOAVQuantity((FOAV) => FOAV - 1)}
              />
              <Text style={styles.numberFontSize}>{FOAVQuantity}</Text>
              <Ionicons
                name="add-circle-outline"
                color={"black"}
                size={26}
                onPress={() => setFOAVQuantity((FOAV) => FOAV + 1)}
              />
            </View>
          </View>
        </View>
        

        <TouchableOpacity style={styles.pressButton} onPress={data_store}>
          <View>
            <Text style={styles.pressButtonText}>SUBMIT</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default MachineOptz;

screen_width = Dimensions.get("window").width;
screen_height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginHorizontal: screen_width * 0.02,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "green",
  },
  lineNoContainer: {
    width: screen_width * 0.15,
    marginRight: screen_width * 0.02,
    marginBottom: 10,
  },
  styleContainer: {
    width: screen_width * 0.35,
    marginRight: screen_width * 0.02,
  },
  textinput: {
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 10,
    height: 50,
    textAlign: "center",
    fontSize: 16,
  },
  dropdown: {
    width: screen_width * 0.42,
    backgroundColor: "#f8f9fa",
  },
  ///////// Total Machine Container ///////////
  scrolloption:{
    marginBottom: screen_height * 0.17,
  },
  totalMachineContainer: {
    marginLeft: screen_width * 0.02,
    marginTop: 5,
  },
  totalMachineText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  /////////// Button Input Section ////////////

  machineQtyContainer:{
    flexDirection:'row',
  },
  generalFontSize:{
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal:5,
  },
  numberFontSize:{
    fontSize: 18,
    paddingHorizontal: 7,
  },
  machineNameText:{
    // marginTop:10,
    marginLeft: screen_width * 0.03,
    fontSize: 16,
  },
  mainContainer:{
    flexDirection: 'row',
    marginLeft: screen_width * 0.03,
    // marginTop: 5,
  },
  machineContainer1:{
  },
  machineContainer2:{
    marginLeft: screen_width * 0.03,
    borderLeftWidth:1,
    borderLeftColor: 'green',
  },
  pressButton:{
    marginVertical: screen_height * 0.05,
    marginLeft: screen_width * 0.25,
    width: screen_width * 0.5,
    height: screen_height * 0.06,
    backgroundColor: 'green',
    borderRadius:15,
    elevation: 5,
    overflow: 'hidden',
  },
  pressButtonText:{
    height: '100%',
    textAlign: "center",
    paddingTop: screen_height * 0.015,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
});
