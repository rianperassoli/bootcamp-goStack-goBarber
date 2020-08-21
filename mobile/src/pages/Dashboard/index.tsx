import React, { useCallback, useState, useEffect } from 'react'
import { Button } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'
import { useAuth } from '../../hooks/auth'

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
} from './styles'

export interface Provider {
  id: string
  name: string
  avatar_url: string
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()
  const { navigate } = useNavigation()

  const [providers, setProviders] = useState<Provider[]>([])

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data)
    })
  }, [])

  const navigateToProfile = useCallback(() => {
    navigate('Profile')
  }, [navigate])

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo,
          {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      <ProvidersList
        keyExtractor={provider => provider.id}
        data={providers}
        renderItem={({ item }) => <UserName>{item.name}</UserName>}
      />

      <Button title="Sair" onPress={signOut} />
    </Container>
  )
}

export default Dashboard
