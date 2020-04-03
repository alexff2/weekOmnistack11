import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import api from '../../services/api'

import logo from '../../assets/logo.png'
import styles from './styles';

export default function incidents() {
  const [ incidents, setIncidents ] = useState([])
  const [ total, setTotal ] = useState(0)
  const [ page, setPage ] = useState(1)
  const [ loading, setLoading  ] = useState(false)

  async function loadIncidents(){
    if (loading) {
      return
    }

    if (total > 0 && incidents.length === total) {
      return
    }

    setLoading(true)
    const resp = await api.get('incidents', {
      params: { page }
    })
    setIncidents([...incidents,...resp.data])
    setTotal(resp.headers['x-total-count'])
    setPage(page+1)
    setLoading(false)
  }
  useEffect(()=>{
    loadIncidents()
  },[])

  const navigation = useNavigation()

  function navigateToDetail(incident){
    navigation.navigate('Detail', { incident })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos.</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList
        style={styles.incidentsList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incidents}>
            <Text style={styles.incidentsProperty}>ONG:</Text>
            <Text style={styles.incidentsValue}>{incident.name}</Text>

            <Text style={styles.incidentsProperty}>CASO:</Text>
            <Text style={styles.incidentsValue}>{incident.title}</Text>

            <Text style={styles.incidentsProperty}>VALOR</Text>
            <Text style={styles.incidentsValue}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency', currency: 'BRL'
              }).format(incident.value)}
            </Text>

            <TouchableOpacity 
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>

  );
}
