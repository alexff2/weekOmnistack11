import React from 'react';
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'

import logo from '../../assets/logo.png'

import styles from './styles';

export default function Detail() {
  const navigation = useNavigation()
  const route = useRoute()
  const incident = route.params.incident
  console.log(incident)

  const msg = `Olá ${incident.name}, estou entrando em contado pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}`
  
  function navigateBack(){
    navigation.goBack()
  }

  function sendMail(){
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: msg
    })
  }

  function sendWhatsapp(){
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${msg}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incidents}>
        <Text style={[styles.incidentsProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentsValue}>{incident.name} de {incident.city}/{incident.uf} </Text>

        <Text style={styles.incidentsProperty}>CASO:</Text>
        <Text style={styles.incidentsValue}>{incident.title}</Text>

        <Text style={styles.incidentsProperty}>VALOR</Text>
        <Text style={styles.incidentsValue}>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency', currency: 'BRL'
          }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o heroi dessa caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato.</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionsText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionsText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
