import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FlatList } from "react-native";

import { allFilmes, limpaListaDeFilmes } from "../../services/Db/Filmedb"

const Front = ({navigation}) => {
  const [fetchDados, setFetchDados] = useState([]);

  async function listAll() {
    // await limpaListaDeFilmes();
    // console.log("Limpou a Base toda kk")
    let filmes = await allFilmes();
    console.log(filmes)
    setFetchDados(filmes);
  }

  useEffect(() => {
    listAll()
  }, [])

  const renderItem = props => {
    const {
      id,
      nomeDoFilme
    } = props.item;
    console.log("nomeDoFilme segundo Props",nomeDoFilme, props, fetchDados)
    return <Text>{nomeDoFilme}</Text>
  }

  return (
    fetchDados.length > 0 &&
      <View>
        <FlatList
          data={fetchDados}
          keyExtractor={(item) => item.id}
          renderItem={({ item, navigation }) => renderItem({item, navigation})}
        />
      </View>
  )
}

export default Front;
