import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import api from "../../services/";

import axios from "axios";
import Front from "../Front/Front";
import {create} from "../../services/Db/Filmedb"

export default function Home({ navigation }) {
  const [value, setValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (item) => {
    const items = selectedItems;
    items.push(item);
    setSelectedItems([item]);
  };

  const handleRemove = (item) => {
    setSelectedItems((prevState) =>
      prevState.filter((sitem) => sitem.id !== item.id)
    );
  };

  const temp = (value) => {
    const options = {
      method: "GET",
      url: "https://online-movie-database.p.rapidapi.com/title/v2/find",
      params: {
        title: value,
        titleType: "movie",
        limit: "1",
        sortArg: "asc",
      },
      headers: {
        "X-RapidAPI-Key": "b4cbef8de4msh78e0966fda7147cp1f039djsn88e311510ff3",
        "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
      },
    };

    return axios.request(options)
      .then((res) => res.data.results)
      .catch(() => "Error");
  };

  const registerToDB = () => {
    temp(value).then(async result => {
      console.log("Result : ",result)
      await create({
        nomeDoFilme: result[0].title,
        ano: result[0].year
      })
        .then(createResult=>{[
          console.log("Result do Banco: ",createResult)
        ]}).catch(err=>{
          console.log(err)
        })
    }).catch(err=>{
      console.log(err)
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.backs}>Procurar o filme!</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="black"
        placeholder="Filme"
        onChangeText={(movie) => setValue(movie)}
        // onBlur={() => console.log('Acho!',temp(value))}
      ></TextInput>
      <TouchableOpacity onPress={() => registerToDB()} style={styles.btn}>
        <Text style={styles.txt}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Front")} style={styles.btt}>
        <Text style={styles.txt}>filmes salvos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ebebeb",
  },
  txt: {
    color: "#FFF",
    textAlign: "center",
    marginTop: 5 + "%",
  },
  btt: {
    borderRadius: 10,
    width: 45 + "%",
    height: 7 + "%",
    backgroundColor: "#7b68ee",
    marginTop: 5 + "%",
    textAlign:"center",
  },
  btn: {
    borderRadius: 10,
    width: 45 + "%",
    height: 7 + "%",
    backgroundColor: "#ec2300",
    marginTop: 30 + "%",
    textAlign: "center",
  },
  input: {
    borderRadius: 20,
    width: 50 +"%",
    height: 5 +"%",
    padding: 2 + "%",
    backgroundColor: "#c0c2c9",
    marginTop: 4 + "%",
    textAlign: "center",
  },
    backs: {
      borderRadius: 10,
      backgroundColor: "#5a4fcf",
      width: 45 + "%",
      height: 4 + "%",
      textAlign: "center",
      marginTop: 20,

  }
}
);

