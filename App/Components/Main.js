import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
  Keyboard,
  Image,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { Icon, Card, headerText, Header } from "react-native-elements";
import Note from "./Note";
//import firebase from "firebase";
//import * as firebase from '@firebase';
//import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/database";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import ImagePicker from "react-native-image-picker";
import firebase from "@firebase/app";
import "@firebase/storage";
import RNFetchBlob from "react-native-fetch-blob";
import fs from "react-native-fs";
import Spinner from "react-native-loading-spinner-overlay";

const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
const win = Dimensions.get("window");
export default class Main extends Component {
  //static id=1;
  constructor(props) {
    super(props);
    this.state = {
      addStatus: false,
      noteArray: [],
      noteText: "",
      da: "",
      uid: "",
      editStatus: false,
      //  imageStatus: false,
      prevVal: "",
      prevVal1: "",
      uid1: "",
      ImageSource: null,
      uurl: "",
      imageurl: "",
      searchtest: "",
      statearray: [],
      find1: false,
      find2: false,
      loadstatus: false,
      title: ""
    };
  }

  initializeFirebase() {
    var config = {
      apiKey: "AIzaSyA7MqdO0SLEeenMKs6GT-mLOM5Fb2e8POk",
      authDomain: "reactdatabase-909df.firebaseapp.com",
      databaseURL: "https://reactdatabase-909df.firebaseio.com",
      projectId: "reactdatabase-909df",
      storageBucket: "reactdatabase-909df.appspot.com",
      messagingSenderId: "326187643988"
    };
    firebase.initializeApp(config);
  }

  componentWillMount() {
    if (!firebase.apps.length) {
      this.initializeFirebase();
    }
    console.log("will mount");
  }

  getDataFromFirebase() {
    let arr1 = [];

    //console.log("did mount");
    firebase
      .database()
      .ref("user/")
      .on("child_added", data => {
        var result = [];

        var key1 = [];
        key1.push(data.key);
        let arr = data.toJSON();
        // console.log(arr)
        for (var i in arr) {
          result.push([arr[i]]);
        }

        // console.log(result + "result");

        for (var i = 0; i < result.length; i++) {
          var d = new Date();
          key1[i] !== undefined
            ? arr1.push({
                date: result[0].toString(),
                note: result[1].toString(),
                uid: data.key,
                url1: result[2].toString(),
                vtitle: result[3].toString()
              })
            : null;
        }

        this.setState({ noteArray: arr1 });

        ///console.log("notearray"+this.state.noteArray)
        // result.map((data, i) => {
        //   console.log(data.key);
        // });
        //console.log("key1" + key1);
        //console.log("data.key:" + data.key);
        // console.log("data.val().text"+data.val().text);
        // console.log(data.val().Ddate);
      });

    this.setState({ noteText: "" });
  }
  componentDidMount() {
    //this.getDataFromFirebase();
    let arr1 = [];

    //console.log("did mount");
    firebase
      .database()
      .ref("user/")
      .on("child_added", data => {
        var result = [];

        var key1 = [];
        key1.push(data.key);
        let arr = data.toJSON();

        for (var i in arr) {
          result.push([arr[i]]);
        }

        // console.log(result + "result");

        for (var i = 0; i < result.length; i++) {
          //console.log("iiiii-----"+result[2].toString())
          var d = new Date();
          key1[i] !== undefined
            ? arr1.push({
                date: result[0].toString(),
                note: result[1].toString(),
                uid: data.key,
                url1: result[2].toString(),
                vtitle: result[3].toString()
              })
            : null;
        }

        this.setState({ noteArray: arr1 });

        //console.log(this.state.noteArray);

        ///console.log("notearray"+this.state.noteArray)
        // result.map((data, i) => {
        //   console.log(data.key);
        // });
        //console.log("key1" + key1);
        //console.log("data.key:" + data.key);
        // console.log("data.val().text"+data.val().text);
        // console.log(data.val().Ddate);
      });
    //console.log("in did mount"+(this.state.noteArray));

    this.setState({ noteText: "" });
  }

  render() {
    console.log("find2----" + this.state.find2);

    //uconsole.log(this.state.noteArray);
    if (this.state.loadstatus) {
      console.log("loading++++++++++++");
      return (
        <Spinner
          visible={this.state.loadstatus}
          //textContent={""}
          textStyle={styles.spinnerTextStyle}
        />
        // <ActivityIndicator size="large" color="#0000ff" />
      );
    }

    if (this.state.editStatus) {
      if (this.state.imageurl == "") {
        return (
          <ScrollView style={{ paddingBottom: 20, backgroundColor: "#020202" }}>
            <View
              style={{
                paddingBottom: 250,
                backgroundColor: "#020202",
                justifyContent: "space-between"
              }}
            >
              <View
                style={{
                  padding: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1
                }}
              >
                 <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={{ paddingRight: 10 }}
                    title="back"
                    onPress={this.backToMain.bind(this)}
                  >
                    <Icon name="arrow-back" size={40} color="#676261" />
                  </TouchableOpacity>

                  <Text style={styles.headerText1}>Edit Screen </Text>
                </View>
                
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={{ paddingRight: 10 }}
                    title="image"
                    onPress={this.selectPhotoTapped.bind(this)}
                  >
                    <Icon name="image" size={30} color="#676261" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    title="UPDATE"
                    onPress={this.updateButton.bind(this)}
                  >
                    <Icon name="done" size={30} color="#676261" />
                  </TouchableOpacity>
                </View>
              </View>
              <TextInput
                style={{
                  backgroundColor: "#020202",
                  borderBottomColor: "white",
                  borderBottomWidth: 0.2,
                  color: "white",
                  fontWeight:"bold",
                  fontSize:17,
                  opacity: 0.7
                }}
                onChangeText={prevVal1 => this.setState({ prevVal1 })}
                placeholder="Enter title"
                placeholderTextColor="#676261"
                value={this.state.prevVal1}
              />

              <AutoGrowingTextInput
                style={styles.noteinput}
                onChangeText={prevVal => this.setState({ prevVal })}
                placeholder={"Your Message"}
                placeholderTextColor="#676261"
              >
                {this.state.prevVal}
              </AutoGrowingTextInput>
              <View style={styles.addScreen} />
              <TouchableOpacity
                // onPress={this.selectPhotoTapped.bind(this)}
                style={{
                  backgroundColor: "transparent",
                  position: "relative",
                  top: 10,
                  left: win.width / 6,
                  width: (win.width * 2) / 3,
                  height: 250,
                  paddingTop: 10,
                  padding: 0
                }}
              >
                <View style={styles.ImageContainer}>
                  {this.state.imageurl === "" ? (
                    <Text>Select a Photo</Text>
                  ) : (
                    <Image
                      style={styles.ImageContainer}
                      source={{ uri: this.state.imageurl }}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        );
      } else {
        return (
          <ScrollView style={{ paddingBottom: 20, backgroundColor: "#020202" }}>
            <View style={{ paddingBottom: 250, backgroundColor: "#020202" }}>
              <View
                style={{
                  padding: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={{ paddingRight: 10 }}
                    title="back"
                    onPress={this.backToMain.bind(this)}
                  >
                    <Icon name="arrow-back" size={40} color="#676261" />
                  </TouchableOpacity>

                  <Text style={styles.headerText1}>Edit Screen </Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={{ paddingRight: 10 }}
                    title="image"
                    onPress={this.selectPhotoTapped.bind(this)}
                  >
                    <Icon name="image" size={30} color="#676261" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    title="UPDATE"
                    onPress={this.updateButton.bind(this)}
                  >
                    <Icon name="done" size={30} color="#676261" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.addScreen}>
                <TextInput
                  style={{
                    backgroundColor: "#020202",
                    borderBottomColor: "white",
                    borderBottomWidth: 0.2,
                    color: "white",
                    fontWeight:"bold",
                    fontSize:17,
                    opacity: 0.7
                  }}
                  onChangeText={prevVal1 => this.setState({ prevVal1 })}
                  placeholder="Enter title"
                  placeholderTextColor="#676261"
                  value={this.state.prevVal1}
                />
                <AutoGrowingTextInput
                  style={styles.noteinput}
                  onChangeText={prevVal => this.setState({ prevVal })}
                  placeholder={"Your Message"}
                  placeholderTextColor="#676261"
                >
                  {this.state.prevVal}
                </AutoGrowingTextInput>
              </View>
              <TouchableOpacity
                //onPress={this.selectPhotoTapped.bind(this)}
                style={{
                  backgroundColor: "transparent",
                  position: "relative",
                  top: 10,
                  left: win.width / 6,
                  // width: (win.width * 2) / 3,
                  // height: 250,,
                  resizeMode: "contain",
                  paddingTop: 10,
                  padding: 0
                }}
              >
                <View>
                  {this.state.imageurl === "" ? (
                    <Text>Select a Photo</Text>
                  ) : (
                    <Image
                      style={styles.ImageContainer}
                      source={{ uri: this.state.imageurl }}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <View style={styles.savebutton}>
                  <Button
                    title="Remove image"
                    onPress={this.deletephoto.bind(this)}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        );
      }
    }

    // if (this.state.imageStatus) {
    //   return (
    //     <View style={styles.editing}>
    //       <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
    //         <View style={styles.ImageContainer}>
    //           {this.state.imageurl === "" ? (
    //             <Text>Select a Photo</Text>
    //           ) : (
    //             <Image
    //               style={styles.ImageContainer}
    //               source={{ uri: this.state.imageurl }}
    //             />
    //           )}
    //         </View>
    //       </TouchableOpacity>
    //       <View style={{ padding: 10 }}>
    //         <Button
    //           title="Back to main screen"
    //           onPress={this.backToMain.bind(this)}
    //         />
    //       </View>
    //     </View>
    //   );
    // }

    if (this.state.addStatus) {
      return (
        <ScrollView style={styles.scrollContainer}>
          <View style={{ paddingBottom: 150 }}>
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ paddingRight: 10 }}
                  title="back"
                  onPress={this.backToMain.bind(this)}
                >
                  <Icon name="arrow-back" size={35} color="#676261" />
                </TouchableOpacity>

                <Text style={styles.headerText1}>Add screen </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ paddingRight: 10 }}
                  title="image"
                  onPress={this.selectPhotoTapped.bind(this)}
                >
                  <Icon name="image" size={30} color="#676261" />
                </TouchableOpacity>

                <TouchableOpacity
                  title="SAVE"
                  onPress={this.addNote.bind(this)}
                >
                  <Icon name="done" size={30} color="#676261" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.addScreen}>
              <TextInput
                   style={{
                  backgroundColor: "#020202",
                  borderBottomColor: "white",
                  borderBottomWidth:0.2,
                  color: "white",
                  opacity: 0.7,
                  fontSize:17,
                  fontWeight:"bold"
                  
                }}
                autoFocus={true}
                
                onChangeText={title => this.setState({ title })}
                value={this.state.title}
                placeholder="Title"
                placeholderTextColor="#676261"
              />
              <AutoGrowingTextInput
                style={styles.noteinput}
                placeholder="Note"
                placeholderTextColor="#676261"
                onChangeText={noteText => this.setState({ noteText })}
                value={this.state.noteText}
                //autoFocus={true}
              />

              {/* <TextInput
              style={styles.noteinput}
              placeholder="add notes"
              onChangeText={noteText => this.setState({ noteText })}
              value={this.state.noteText}
              autoFocus={true}
            /> */}
            </View>
            <TouchableOpacity
              //onPress={this.selectPhotoTapped.bind(this)}
              style={{
                backgroundColor: "transparent",
                position: "relative",
                top: 10,
                left: win.width / 6,
                //borderRadius: 10,
                width: (win.width * 2) / 3,
                height: 250,
                paddingTop: 10,
                padding: 0
              }}
            >
              <View style={styles.ImageContainer}>
                {this.state.imageurl === "" ? (
                  <Text style={{ color: "transparent" }}>Select a Photo</Text>
                ) : (
                  <Image
                    style={styles.ImageContainer}
                    source={{ uri: this.state.imageurl }}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }
    if (this.state.find1) {
      let notes = this.state.noteArray.map((val, key) => {
        return (
          <View key={key} style={{ padding: 5 }}>
            <View
              style={{
                padding: 1,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "#1f1f1f",
                backgroundColor: "#1f1f1f"
              }}
            >
              <Note
                key={key}
                keyval={key}
                val={val}
                deleteMethod={() => this.deleteNote(val.uid, key)}
                editMethod={() =>
                  this.editNote(val.uid, val.note, val.url1, val.vtitle)
                }
                imageMethod={() => this.imageNote(val.uid, val.url1, key)}
              />
            </View>
          </View>
        );
      });
      let even = [];
      let odd = [];
      for (let i = 0; i < notes.length; i++) {
        if ((i + 1) % 2 === 0) {
          odd.push(notes[i]);
        } else {
          even.push(notes[i]);
        }
      }

      return (
        <ScrollView style={{ backgroundColor: "#020202" }}>
          <View style={{ paddingBottom: 50 }}>
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                backgroundColor: "#020202"
              }}
            >
              <TouchableOpacity
                title="back"
                onPress={this.backToMain.bind(this)}
                style={{ justifyContent: "center" }}
              >
                <Icon name="arrow-back" size={40} color="#676261" />
              </TouchableOpacity>
              <View style={{ padding: 0 }}>
                <TextInput
                  style={{
                    paddingRight: 10,
                    backgroundColor: "#020202",
                    color: "white",
                    alignSelf: "stretch"
                  }}
                  placeholder="enter to search"
                  placeholderTextColor="white"
                  //onFocus={this.function1}
                  onChangeText={this.function1}
                  autoFocus={true}
                  //onKeyPress={this.findelement1.bind(this)}
                  value={this.state.searchtest}
                  //autoFocus={true}
                  returnKeyType="search"
                  // onSubmitEditing={this.findelement1.bind(this)}
                />
              </View>
            </View>
            <ScrollView
              style={{
                backgroundColor: "#020202",
                marginBottom: 10,
                paddingBottom: 10
              }}
            >
              <View
                style={{
                  flexWrap: "wrap",
                  flexDirection: "row",
                  marginBottom: 10,
                  paddingBottom: 10
                }}
              >
                <View
                  style={{
                    width: "50%",
                    flexDirection: "column",
                    padding: 0
                  }}
                >
                  {even}
                </View>
                <View
                  style={{
                    width: "50%",
                    flexDirection: "column",
                    padding: 0
                  }}
                >
                  {odd}
                </View>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      );
    }

    if (this.state.find2) {
      //console.log("hehehheheheh");
      console.log("stateArray" + JSON.stringify(this.state.statearray));

      if (this.state.statearray == "") {
        return (
          <ScrollView style={{ backgroundColor: "#020202" }}>
            <View
              style={{ backgroundColor: "#020202" }}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <ScrollView
                style={{ backgroundColor: "#020202" }}
                containerStyle={{
                  paddingBottom: 10,
                  backgroundColor: "#020202"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    padding: 10,
                    backgroundColor: "#020202"
                  }}
                >
                  <TouchableOpacity
                    title="back"
                    onPress={this.backToMain.bind(this)}
                    style={{ justifyContent: "center" }}
                  >
                    <Icon name="arrow-back" size={40} color="#676261" />
                  </TouchableOpacity>
                  <View style={{ padding: 0 }}>
                    <TextInput
                      style={{
                        paddingRight: 10,
                        backgroundColor: "#020202",
                        color: "white",
                        alignSelf: "stretch"
                      }}
                      placeholder="enter to search"
                      placeholderTextColor="white"
                      //onFocus={this.function1}
                      onChangeText={this.function1}
                      value={this.state.searchtest}
                      autoFocus={true}
                      returnKeyType="search"
                      // onSubmitEditing={this.findelement1.bind(this)}
                    />
                  </View>
                </View>

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                    padding: 20,
                    color: "white"
                  }}
                >
                  no data found
                </Text>
              </ScrollView>
            </View>
          </ScrollView>
        );
      } else {
        {
          let searchval = this.state.statearray.map((item, key) => {
            return (
              <View key={key} style={{ padding: 5 }}>
                <View
                  style={{
                    padding: 1,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: "#1f1f1f",
                    backgroundColor: "#1f1f1f"
                  }}
                >
                  <Note
                    key={key}
                    keyval={key}
                    val={item}
                    deleteMethod={() => this.deleteNote(item.uid, key)}
                    editMethod={() =>
                      this.editNote(item.uid, item.note, item.url1, item.vtitle)
                    }
                    imageMethod={() => this.imageNote(item.uid, item.url1, key)}
                  />
                </View>
              </View>
            );
          });
          //console.log(notes.length)

          let even1 = [];
          let odd1 = [];
          for (let i = 0; i < searchval.length; i++) {
            if ((i + 1) % 2 === 0) {
              odd1.push(searchval[i]);
            } else {
              even1.push(searchval[i]);
            }
          }

          return (
            <ScrollView style={{ backgroundColor: "#020202" }}>
              <View style={{ backgroundColor: "#020202" }}>
                <ScrollView
                  contentContainerStyle={{ flexGrow: 1 }}
                  style={{ backgroundColor: "#020202" }}
                  containerStyle={{ padding: 10, paddingBottom: 10 }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 10,
                      backgroundColor: "#020202"
                    }}
                  >
                    <TouchableOpacity
                      title="back"
                      onPress={this.backToMain.bind(this)}
                      style={{ justifyContent: "center" }}
                    >
                      <Icon name="arrow-back" size={40} color="#676261" />
                    </TouchableOpacity>
                    <View style={{ padding: 0 }}>
                      <TextInput
                        style={{
                          paddingRight: 10,
                          backgroundColor: "#020202",
                          color: "white",
                          alignSelf: "stretch"
                        }}
                        placeholder="enter to search"
                        placeholderTextColor="white"
                        //onFocus={this.function1}
                        onChangeText={this.function1}
                        value={this.state.searchtest}
                        autoFocus={true}
                        returnKeyType="search"
                        // onSubmitEditing={this.findelement1.bind(this)}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexWrap: "wrap",
                      flexDirection: "row",
                      backgroundColor: "transparent"
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        flexDirection: "column",
                        padding: 5,
                        backgroundColor: "transparent"
                      }}
                    >
                      {even1}
                    </View>
                    <View
                      style={{
                        width: "50%",
                        flexDirection: "column",
                        padding: 5,
                        backgroundColor: "transparent"
                      }}
                    >
                      {odd1}
                    </View>
                  </View>
                </ScrollView>
              </View>
            </ScrollView>
          );
        }
      }
    }

    let notes = this.state.noteArray.map((val, key) => {
      return (
        <View key={key} style={{ padding: 5 }}>
          <View
            style={{
              padding: 1,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "#1f1f1f",
              backgroundColor: "#1f1f1f"
            }}
          >
            <Note
              key={key}
              keyval={key}
              val={val}
              deleteMethod={() => this.deleteNote(val.uid, key)}
              editMethod={() =>
                this.editNote(val.uid, val.note, val.url1, val.vtitle)
              }
              imageMethod={() => this.imageNote(val.uid, val.url1, key)}
            />
          </View>
        </View>
      );
    });
    //console.log(notes.length)

    let even = [];
    let odd = [];
    for (let i = 0; i < notes.length; i++) {
      if ((i + 1) % 2 === 0) {
        odd.push(notes[i]);
      } else {
        even.push(notes[i]);
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={this.addNote1.bind(this)}
            onPressOut={Keyboard.dismiss}
            style={styles.addButton}
          >
            <Icon name="add" color="#676261" size={50} />
          </TouchableOpacity>
          <Text style={styles.headerText}>NOTES</Text>

          <TouchableOpacity
            onPress={this.findelement.bind(this)}
            onPressOut={Keyboard.dismiss}
            style={styles.addButton1}
          >
            <Icon name="search" color="#676261" size={40} />
          </TouchableOpacity>
        </View>

        {/* <ScrollView style={styles.scrollContainer}>{notes}</ScrollView> */}

        <ScrollView style={styles.scrollContainer}>
          <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
            <View
              style={{
                width: "50%",
                flexDirection: "column",
                padding: 0
              }}
            >
              {even}
            </View>
            <View
              style={{
                width: "50%",
                flexDirection: "column",
                padding: 0
              }}
            >
              {odd}
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer} />
      </View>
    );
  }

  addNote1() {
    this.setState({ addStatus: true });
    this.setState({ imageurl: "" });
  }
  findelement1() {
    this.setState({ find1: false });
    this.setState({ find2: true });
    console.log("notetext:v  " + this.state.searchtest);
    console.log("qqqqqq" + this.state.find2);
    var arr1 = this.state.noteArray;
    console.log("bbbbbbbbbbbbbbbbbbb" + JSON.stringify(this.state.noteArray));

    //var result = arr1.filter(search => search.note === this.state.searchtest);
    var result = arr1.filter(search => {
      let v1 = search.note.toUpperCase(); //for substring match
      let val1 = this.state.searchtest.toUpperCase();
      let val2 = search.vtitle.toUpperCase();
      let val3 = search.date;
      if (v1.includes(val1) || val2.includes(val1) || val3.includes(val1)) {
        console.log("----" + v1);
        return v1;
      }
    });
    console.log("bbbbbbbbbbbbbbbbbbb" + JSON.stringify(result));
    //console.log("aaaaaaaaaaaaaaaaaaa:" + result);
    this.setState({ statearray: result });
    if (result == "") {
      console.log("iiiiiiiiii no value");
    }
    console.log("qqqqqq" + result);
    //this.setState({searchtest:""})
  }

  findelement() {
    this.setState({ find1: true });
    this.setState({ searchtest: "" });
    //this.findelement1();
  }
  function1 = searchtest1 => {
    {
      this.setState({ searchtest: searchtest1 }, () => this.findelement1());
    }
  };
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        this.setState({ loadstatus: true });
        let source = { uri: response.uri };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.uploadImage(response.uri, "image/png", "hello");
        console.log("response.uri:--" + response.uri);
        this.setState({
          //   loadstatus: false,
          ImageSource: source
        });
      }
    });
  }
  uploadImage = (uri, mime = "image/png") => {
    return new Promise((resolve, reject) => {
      var storage = firebase.storage();
      console.log(storage);
      const uploadUri = uri;
      const sessionId = new Date().getTime();
      //console.log("------"+sessionId);
      let uploadBlob = null;
      const imageRef = storage.ref("images").child(`${sessionId}`);
      fs.readFile(uploadUri, "base64")
        .then(data => {
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then(blob => {
          uploadBlob = blob;
          return imageRef.put(blob, { contentType: mime });
        })
        .then(() => {
          uploadBlob.close();

          //var i=imageRef.getDownloadURL();

          //console.log("iii-----");
          return imageRef.getDownloadURL();
        })
        .then(url => {
          //console.log("----"+url);

          this.setState({ uurl: url });
          console.log(" -------  " + this.state.uurl),
            console.log("uid1:---" + this.state.uid1);
          // firebase
          //   .database()
          //   .ref("user/" + this.state.uid1)
          //   .update({
          //     url1: url
          //   });
          this.setState({ imageurl: url });
          this.setState({ loadstatus: false });
          console.log("ooooooo----" + this.state.imageurl);
          console.log("-----------------");
          resolve(url);
        })
        .then(function() {
          console.log("Document successfully written!");
          //console.log("--------"+(this.state.uurl));
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });

      // resolve(url);
    }).catch(error => {
      reject(error);
    });
    // console.log(" sudid=--------"+imageRef.getDownloadURL());
  };

  // imageNote(mykey3, urld, key) {
  //   console.log("image note-----------");
  //   //this.setState({ imageStatus: true });

  //   //this.setState({ImageSource:uurl1})
  //   console.log("-ssssssssssss--" + urld);
  //   this.setState({ imageurl: urld });
  //   this.setState({ uid1: mykey3 });
  //   console.log("--image url----" + this.state.imageurl);

  // firebase
  //   .database()
  //   .ref("user/" + mykey3)
  //   .on("value", data => {
  //     console.log(data.toJSON()),
  //       console.log(data.val().url1);
  //       //this.setState({ imageurl: data.val().url1 });
  //   });

  // console.log("imageSource-----"+this.state.ImageSource);
  // }
  addNote() {
    console.log("add note------");

    this.setState({ addStatus: false });
    if (this.state.noteText.trim().length==0 &&  this.state.imageurl.trim().length==0 && this.state.title.trim().length==0) {}
    else{
      // var d = new Date();
      // this.state.noteArray.push({
      //   date: d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(),
      //   note: this.state.noteText,
      //   uid: this.state.uid
      // });

      var d1 = new Date();

      this.setState({
        da: d1.getFullYear() + "/" + (d1.getMonth() + 1) + "/" + d1.getDate()
      });

      //console.log('date'+this.state.da);
      const uid = Math.floor(Math.random() * 1000);
      firebase
        .database()
        .ref("user/")
        .push({
          //age :this.date,
          text: this.state.noteText,
          Ddate:
            d1.getFullYear() + "/" + (d1.getMonth() + 1) + "/" + d1.getDate(),
          url1: this.state.imageurl,
          vtitle: this.state.title
        });
      //id=id+1;

      this.getDataFromFirebase();
    }
    console.log("over------");
    this.setState({ imageurl: "" });
    this.setState({title: ""})
  }

  deleteNote(mykey, key) {
    //if (this.state.uid) {
    //console.log("uid" + uid);

    console.log("key:" + mykey);
    firebase
      .database()
      .ref("user/" + mykey)
      .remove();
    //console.log("remove");
    this.state.noteArray.splice(key, 1);
    this.state.statearray.splice(key, 1);
    this.setState({ noteArray: this.state.noteArray });
    this.setState({ statearray: this.state.statearray });
  }

  editNote(mykey1, text, url2, title1) {
    console.log("-----" + text);
    this.setState({ editStatus: true });
    this.setState({ uid1: mykey1 });
    this.setState({ imageurl: url2 });
    this.setState({ prevVal: text });
    this.setState({ prevVal1: title1 });
    // firebase
    //   .database()
    //   .ref("user/" + mykey1)
    //   .on("value", data => {
    //     console.log(data),
    //     this.setState({ prevVal: data.val().text });
    //   });

    //this.setState({prevVal:""})
    console.log("edit clicked");

    // var d1 = new Date();
    // let arr1 = [];
    // firebase
    //   .database()
    //   .ref("user/" + mykey1)
    //   .set({
    //     text: this.state.noteText,
    //     Ddate: d1.getFullYear() + "/" + (d1.getMonth() + 1) + "/" + d1.getDate()
    //   });

    //   this.getDataFromFirebase();
  }
  deletephoto() {
    this.setState({ imageurl: "" });
    this.setState({ editStatus: false });
    var d1 = new Date();
    let arr1 = [];

    firebase
      .database()
      .ref("user/" + this.state.uid1)
      .update({
        text: this.state.prevVal,
        Ddate:
          d1.getFullYear() + "/" + (d1.getMonth() + 1) + "/" + d1.getDate(),
        url1: ""
      });

    this.getDataFromFirebase();
  }

  backToMain() {
    //console.log("-----pressout----");
    this.setState({ find1: false });
    this.setState({ editStatus: false });
    this.setState({ addStatus: false });
    this.setState({ imageStatus: false });
    this.setState({ find2: false });
    this.setState({ noteText: "" });
    this.getDataFromFirebase();
  }
  updateButton() {
    this.setState({ editStatus: false });

    console.log("mykey:" + this.state.uid1);

    var d1 = new Date();
    let arr1 = [];

    firebase
      .database()
      .ref("user/" + this.state.uid1)
      .update({
        text: this.state.prevVal,
        Ddate:
          d1.getFullYear() + "/" + (d1.getMonth() + 1) + "/" + d1.getDate(),
        url1: this.state.imageurl,
        vtitle: this.state.prevVal1
      });

    this.getDataFromFirebase();
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  spinnerTextStyle: {
    color: "#FFF",
    flexWrap: "wrap"
  },

  editing: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: "#CCCCCC",
    fontSize: 40
  },
  header: {
    backgroundColor: "#0d0d0d",
    //alignItems: "center",
    //justifyContent: "center",
    borderBottomWidth: 4,
    borderBottomColor: "#1f1f1f"
  },
  editInput: {
    borderWidth: 1,
    borderColor: "#48BBEC"
  },
  headerText: {
    color: "white",
    fontSize: 24,
    left: win.width / 2.8,
    padding: 15,
    fontWeight: "bold"
  },
  headerText1: {
    color: "white",
    fontSize: 24,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 0,
    fontWeight: "bold"
  },
  headerText2: {
    color: "white",
    fontSize: 24,
    left: win.width / 2.8,
    padding: 15,
    fontWeight: "bold"
  },
  scrollContainer: {
    paddingTop: 10,
    flex: 1,
    marginBottom: 0,
    backgroundColor: "#020202"
  },
  addScreen: {
    /// position:"relative",
    padding: 10
    //top:50
  },
  noteinput: {
    fontSize:16,
    padding: 10,
    position: "relative",
    top: 10,
    color: "#676261",
    paddingBottom: 10,
    backgroundColor: "transparent",

    // borderRadius: 5,
    // borderWidth: 2,

    
  },
  noteinput1: {
    position: "relative",
    top: 10,
    color: "black",
    paddingBottom: 10,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#7e8885"
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10
  },
  textInput: {
    color: "#fff",
    padding: 20,
    backgroundColor: "#2a5eed",
    borderTopWidth: 2,
    borderTopColor: "#ededed"
  },
  searchname: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
  ImageContainer: {
    position: "relative",
    top: 40,
    //left: 70,
    // borderRadius: 10,
    width: (win.width * 2) / 3,
    height: 250,
    // paddingTop: 10,
    padding: 0,
    borderColor: "transparent" /*  */,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
    //color:"white"
  },
  ImageContainer1: {
    position: "relative",
    // top:-40,
    //left: 70,
    // borderRadius: 10,
    width: (win.width * 2) / 3,
    height: 250,
    // paddingTop: 10,
    padding: 0,
    borderColor: "transparent" /*  */,
    borderWidth: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "transparent"
    //color:"white"
  },
  savebutton: {
    position: "relative",
    top: 100,
    //left:90,
    height: 40,
    width: 120
  },
  backbutton: {
    position: "relative",
    top: 120,
    left: win.width / 6 + win.width / 5,
    height: 40,
    width: 120
  },
  deletephoto: {
    position: "relative",
    top: 140,
    left: win.width / 6 + win.width / 5,
    height: 40,
    width: 120
  },

  addButton: {
    position: "absolute",
    zIndex: 11,
    left: 20,
    bottom: 10,
    backgroundColor: "transparent",
    width: 50,
    height: 50,
    //borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8
  },
  addButton1: {
    position: "absolute",
    zIndex: 11,
    right: 20,
    bottom: 10,
    backgroundColor: "transparent",
    width: 50,
    height: 50,
    //borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8
  },
  delButton: {
    position: "absolute",
    zIndex: 11,
    right: 20,
    bottom: 190,
    backgroundColor: "#445566",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24
  }
});
