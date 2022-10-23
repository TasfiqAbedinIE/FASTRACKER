import React, { Component } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import moment, { relativeTimeThreshold } from "moment";

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const totalInterval = []

function Timer({ interval, style }) {
  const pad = n => (n < 10 ? "0" + n : n);
  const duration = moment.duration(interval);
//   console.log(duration) //////////////////////////////////////
  const centiseconds = Math.floor(duration.milliseconds() / 10);
  return (
    <View style={styles.timerContainer}>
      {/* <Text style={style}>{pad(duration.hours())}:</Text> */}
      <Text style={style}>{pad(duration.minutes())}:</Text>
      <Text style={style}>{pad(duration.seconds())}: </Text>
      <Text style={style}>{pad(centiseconds)}</Text>
    </View>
  );
}
function RoundButton({ title, color, background, onPress, disabled }) {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress()}
      style={[styles.button, { backgroundColor: background }]}
      activeOpacity={disabled ? 1.0 : 0.7}
    >
      <View style={styles.buttonBorder}>
        <Text style={[styles.buttonTitle, { color }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
function Lap({ number, interval, fastest, slowest }) {
  const lapStyle = [
    styles.lapText,
    fastest && styles.fastest,
    slowest && styles.slowest
  ];
  return (
    <View style={styles.lap}>
      <Text style={lapStyle}>Lap {number}</Text>
      <Timer style={[lapStyle, styles.lapTimer]} interval={interval} />
    </View>
  );
}
function LapsTable({ laps, timer }) {
  const finishedLaps = laps.slice(1);
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  if (finishedLaps.length >= 2) {
    finishedLaps.forEach(lap => {
      if (lap < min) min = lap;
      if (lap > max) max = lap;
    });
  }
  return (
    <ScrollView>
      {laps.map((lap, index) => (
        <Lap
          number={laps.length - index}
          key={laps.length - index}
          interval={index === 0 ? timer + lap : lap}
          fastest={lap === min}
          slowest={lap === max}
        />
      ))}
    </ScrollView>
  );
}
function ButtonsRow({ children }) {
  return <View style={styles.buttonsRow}>{children}</View>;
}
class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      now: 0,
      laps: []
    };
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  start = () => {
    const now = new Date().getTime();

    this.setState({
      start: now,
      now,
      laps: [0]
    });
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime() });
    }, 100);
  };

  lap = () => {
    const timestamp = new Date().getTime();
    const { laps, now, start } = this.state;
    const [firstLap, ...other] = laps;
    // totalInterval.push(laps)
    this.setState({
      laps: [0, firstLap + now - start, ...other],
      start: timestamp,
      now: timestamp
    });
    // console.log(firstLap + now - start)
    this.props.getInterval(firstLap + now - start)
    // totalInterval.push(firstLap + now - start)
  };

  stop = () => {
    clearInterval(this.timer);
    const { laps, now, start } = this.state;
    const [firstLap, ...other] = laps;
    this.setState({
      laps: [firstLap + now - start, ...other],
      start: 0,
      now: 0
    });
  };
  reset = () => {
    this.setState({
      laps: [],
      start: 0,
      now: 0
    });
  };
  resume = () => {
    const now = new Date().getTime();
    this.setState({
      start: now,
      now
    });
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime() });
    }, 100);
  };
  render() {
    const { now, start, laps } = this.state;
    const timer = now - start;
    return (
      <View style={styles.container}>
        <View>
            <Timer
            interval={laps.reduce((total, curr) => total + curr, 0) + timer}
            style={styles.timer}
            />
        </View>
        <ScrollView style={styles.scrollviewContainer}>
            <LapsTable laps={laps} timer={timer} />
        </ScrollView>
        <View>
            {laps.length === 0 && (
            <ButtonsRow>
                <RoundButton
                title="Start"
                color="#000000"
                background="#7bf1a8"
                onPress={this.start}
                />
                <RoundButton
                title="Lap"
                color="#000000"
                background="#e5e5e5"
                disabled
                />
            </ButtonsRow>
            )}
            {start > 0 && (
            <ButtonsRow>
                <RoundButton
                title="Stop"
                color="#000000"
                background="#ef233c"
                onPress={this.stop}
                />
                <RoundButton
                title="Lap"
                color="#000000"
                background="#adb5bd"
                onPress={this.lap}
                />
            </ButtonsRow>
            )}
            {laps.length > 0 && start === 0 && (
            <ButtonsRow>
                <RoundButton
                title="Start"
                color="#000000"
                background="#7bf1a8"
                onPress={this.resume}
                />
                <RoundButton
                title="Reset"
                color="#FFFFFF"
                background="#3D3D3D"
                onPress={this.reset}
                />
            </ButtonsRow>
            )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timerContainer: {
    flexDirection: "row",
    marginHorizontal: screenWidth * 0.3,
  },
  scrollviewContainer:{
    height: screenHeight * 0.15,
    backgroundColor: '#ced4da',
    borderRadius: 10,
    borderWidth:2,
    borderColor: '#f8f9fa',
    marginHorizontal: screenWidth * 0.06,
    marginTop: screenHeight * 0.03,
    alignSelf: 'stretch'
  },
  lap: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#ced4da",
    borderTopWidth: 1,
    paddingVertical: screenHeight * 0.01,
    paddingLeft: screenWidth * 0.18,
    backgroundColor: 'white',
  },
  timer: {
    color: "#000000",
    fontSize: 46,
    fontWeight: "bold",
    textAlign: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsRow: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: screenWidth * 0.25,
  },
  lapText: {
    color: "#000000",
    fontSize: 16,
  },
  scrollView: {
    // alignSelf: "stretch"
  },
  fastest: {
    color: "#4BC05F"
  },
  slowest: {
    color: "#CC3531"
  },
});
export default StopWatch;
