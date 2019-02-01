import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,Dimensions
} from "react-native";
import { Icon } from "react-native-elements";
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
const win= Dimensions.get('window');
export default class Note extends Component {
  render() {
    if (this.props.val.url1 == "") {
      return (
    
        <View key={this.props.keyval} style={styles.note}>
         <View>
          <TouchableOpacity onPress={this.props.editMethod}>
          <Text style={styles.noteText}>{this.props.val.date}</Text>
          <Text style={styles.noteText1} >{this.props.val.vtitle}</Text>
          <Text style={styles.noteText2} multiline={false} >{this.props.val.note}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.props.deleteMethod}
            style={styles.noteDeletee}
          >
            <Icon name="delete" color="#a36955" />
          </TouchableOpacity>
        </View>
          <View style={{flexDirection: "row"}}>
          {/* <TouchableOpacity
            onPress={this.props.editMethod}
            style={styles.noteDeletee1}
          >
            <Icon name="edit" />
          </TouchableOpacity> */} 
          
          </View>
        </View>
      );
    } else {
      return (
        <View key={this.props.keyval} style={styles.note}>
        <View>
          <TouchableOpacity onPress={this.props.editMethod}>
          <Text style={styles.noteText} >{this.props.val.date}</Text>
          <Text style={styles.noteText1} >{this.props.val.vtitle}</Text>
          <Text style={styles.noteText2}>{this.props.val.note}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.props.deleteMethod}
             style={styles.noteDelete}
          >
            <Icon name="delete" color="#a36955"/>
          </TouchableOpacity>
        </View>
        <View style={{alignItems:"center"}}>
            <Image
              source={{ uri: this.props.val.url1 }}
              style={{
                
                width: widthPercentageToDP('42%'),
                height: win.height/4.8,
                paddingLeft:20,
                paddingBottom:10,
                paddingTop:10,
                justifyContent: "center",
                alignItems: "center"
              }}
            />
         </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  note: {
    position: "relative",
    padding:0,
    paddingBottom:10,
   
    backgroundColor:"#1f1f1f"
    //borderBottomWidth: 2,
    //borderBottomColor: "#ededed"
  },

  noteText1: {
    paddingTop:10,
    paddingLeft:10,
    paddingRight: 10,
    paddingBottom:10,
    fontWeight:"bold",
    fontSize:14,
    color:"#ededed",
  
    //borderLeftWidth: 5,
    //borderLeftColor: "black"
  },
  noteText2: {
    paddingTop:10,
    paddingLeft:10,
    paddingRight: 10,
    paddingBottom:10,
    //fontWeight:"bold",
    fontSize:14,
    color:"#8b8b8b",
  
    //borderLeftWidth: 5,
    //borderLeftColor: "black"
  },
  noteText: {
    paddingLeft:10,
    paddingLeft:5,
    paddingRight: 30,
    color:"#8b8b8b"
    //borderLeftWidth: 5,
    //borderLeftColor: "black"
  },
  noteDeletee: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    padding:3,
    top:1,
    //bottom: 10,
    right :10
  },
  noteDeletee1: {
    position: "relative",
    //justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "transparent",
    padding:5,
    top: 5,
    //bottom: 10,
    left:5
  },
 
  noteDeletee2: {
    position: "relative",
    //justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "transparent",
    padding:5,
    top:5,
    //bottom: 10,
    left:5
  },

  noteDelete: {
    position: "absolute",
    //justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "transparent",
    padding: 3,
    top:1,
    //bottom: 10,
    right:10
  },
  noteDelete1: {
    position: "relative",
    //justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "transparent",
    padding: 5,
    top: 5,
   // bottom: 10,
    left:5
  },
  noteDelete2: {
    position: "relative",
    //justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "transparent",
    padding: 5,
    top: 5,
    //bottom: 10,
    left: 5
  },
  noteDeleteText: {
    color: "white"
  }
});