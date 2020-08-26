import React, { useCallback, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import DateTimePicker from '@react-native-community/datetimepicker'

import { useRoute, useNavigation } from '@react-navigation/native'
import { Platform } from 'react-native'
import api from '../../services/api'
import { useAuth } from '../../hooks/auth'

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProviderListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
} from './styles'

export interface Provider {
  id: string
  name: string
  avatar_url: string
}

interface RouteParams {
  providerId: string
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth()
  const { goBack } = useNavigation()
  const route = useRoute()
  const routeParams = route.params as RouteParams

  const [providers, setProviders] = useState<Provider[]>([])
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  )
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data)
    })
  }, [])

  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack])

  const handleSelectProvider = useCallback(providerId => {
    setSelectedProvider(providerId)
  }, [])

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state)
  }, [])

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false)
      }

      if (date) {
        setSelectedDate(date)
      }
    },
    [],
  )

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProviderListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={provider => provider.id}
          data={providers}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              selected={provider.id === selectedProvider}
              onPress={() => handleSelectProvider(provider.id)}
            >
              <ProviderAvatar source={{ uri: provider.avatar_url }} />
              <ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProviderListContainer>
      <Calendar>
        <Title>Escolha a data</Title>

        <OpenDatePickerButton onPress={handleToggleDatePicker}>
          <OpenDatePickerButtonText>
            Selecionar outra data
          </OpenDatePickerButtonText>
        </OpenDatePickerButton>

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display="calendar"
            value={selectedDate}
            onChange={handleDateChanged}
          />
        )}
      </Calendar>
    </Container>
  )
}

export default CreateAppointment
