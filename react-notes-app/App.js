import * as React from 'react';
import {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, TextInput } from 'react-native';

const Stack = createNativeStackNavigator();

const AddItemButton = (props) =>{
  function addItem(){
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: props.usernameData, password: props.passwordData, 
        title: props.itemTitle, content: props.itemContent})
    };
    fetch('http://localhost:3000/save', requestOptions)
    .then(res => res.json())
    .then(storedData=> {
      //const storedData = z;
      //props.onPressSetData(storedData);

    });
  }

  return(
    <Button title="Add item" onPress={() => addItem()}/>
  )

}

const RefreshButton = (props) => {

  function getNotes(){
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: props.usernameData, password: props.passwordData})
    };
    fetch('http://localhost:3000/getnotes', requestOptions)
    .then(res => res.json())
    .then(storedData=> {
      //const storedData = z;
      props.onPressSetData(storedData);

    });
  }

  return(
    <Button title="Refresh" onPress={() => getNotes()}/>
  )
}

function LoginScreen({navigation}){
  const [usernameValue, setUsernameValue] = useState("Username");
  const [passwordValue, setPasswordValue] = useState("Password");

  return(
    <View style={styles.container}>
      <Text>Enter your credentials. If you do not have credentials yet, the fields will function as a registration form.</Text>
      <TextInput style={styles.credentialsField} value={usernameValue} onChangeText={(usernameValue) => setUsernameValue(usernameValue)}/>
      <TextInput style={styles.credentialsField} value={passwordValue} onChangeText={(passwordValue) => setPasswordValue(passwordValue)}/>
      <Button title="Login" onPress={() => navigation.navigate('Notes',{ 
        screen: 'Notes',
      params: {usernameKey: usernameValue, passwordKey: passwordValue}
      })}/>
    </View>
  );
}

function NoteScreen({route}){
  const items = [];
  const [fetchData, setData] = useState(items);
  const [titleData, setTitleData] = useState("Title");
  const [contentData, setContentData] = useState("Content");

  const fetchUsername = route.params.params.usernameKey;
  const fetchPassword = route.params.params.passwordKey;

  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username: fetchUsername, password: fetchPassword})
  };

  
  useEffect(() => {
      fetch('http://localhost:3000/getnotes', requestOptions)
    .then(res => res.json())
    .then(storedData=> {
      //const storedData = z;
      setData(storedData);

    });
  }, []);
  

  
  return(
    <View style={styles.container}>
              <ScrollView style={styles.ScrollViewStyle}>
                {
                fetchData.map((item, key) => {
                  if(item != null){
                    return(
                      <View key={key}>
                        <Text>{key}. {item.posts[0].title}</Text>
                        <Text>{item.posts[1].content}</Text>
                        <View style={styles.separator}></View>
                      </View>
                    
                    )
                  }
       

                })}
              </ScrollView>
      <Text>Write and store notes.</Text>
      <TextInput multiline style={styles.titleField} value={titleData} onChangeText={(titleData) => setTitleData(titleData)}/>
      <TextInput multiline style={styles.postField} value={contentData} onChangeText={(contentData) => setContentData(contentData)}/>
      <AddItemButton itemTitle={titleData} itemContent={contentData} onChangeTitle={setTitleData} onChangeContent={setContentData} usernameData={fetchUsername} passwordData={fetchPassword}/>
      <RefreshButton  usernameData={fetchUsername} passwordData={fetchPassword} onPressSetData={setData}/>
    </View>
  );
}


export default function App() {

  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Notes" component={NoteScreen}/>
      </Stack.Navigator>
      
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  separator:{
    backgroundColor: 'black',
    width: '100%',
    height: 1
  },
  ScrollViewStyle:{
    width: '50%'
  },
  credentialsField: {
    borderWidth: 1,
    borderColor: 'black',
  },
  postField: {
    borderWidth: 1,
    borderColor: 'black',
    height: '30%',
    width: '30%'
  },
  titleField: {
    borderWidth: 1,
    borderColor: 'black',
    height: '30%',
    width: '30%'
  }
});
