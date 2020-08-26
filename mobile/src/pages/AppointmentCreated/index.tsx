import React, { useCallback } from 'react'
import Icon from 'react-native-vector-icons/Feather'

import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../hooks/auth'

import { Container, Title, Description, OkButton, OkButtonText } from './styles'

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation()

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    })
  }, [reset])

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />

      <Title>Agendamento Concluido</Title>
      <Description>Agendamento Concluido</Description>

      <OkButton>
        <OkButtonText onPress={handleOkPressed}>Ok</OkButtonText>
      </OkButton>
    </Container>
  )
}

export default AppointmentCreated
