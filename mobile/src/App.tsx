import React from 'react'
import { Text, View, StatusBar } from 'react-native'

const App: React.FC = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />

    <View style={{ flex: 1, backgroundColor: '#312e38' }}>
      <Text>App</Text>
    </View>
  </>
)

export default App
