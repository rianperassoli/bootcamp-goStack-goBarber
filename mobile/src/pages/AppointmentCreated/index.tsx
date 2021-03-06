import React, { useCallback, useMemo } from 'react'
import Icon from 'react-native-vector-icons/Feather'
// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns'
// eslint-disable-next-line import/no-duplicates
import ptBR from 'date-fns/locale/pt-BR'

import { useNavigation, useRoute } from '@react-navigation/native'

import { Container, Title, Description, OkButton, OkButtonText } from './styles'

interface RouteParams {
  date: number
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation()
  const { params } = useRoute()

  const routeParams = params as RouteParams

  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
      { locale: ptBR },
    )
  }, [routeParams.date])

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
      <Description>{formattedDate}</Description>

      <OkButton>
        <OkButtonText onPress={handleOkPressed}>Ok</OkButtonText>
      </OkButton>
    </Container>
  )
}

export default AppointmentCreated
