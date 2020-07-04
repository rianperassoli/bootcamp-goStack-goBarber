import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`

export const Title = styled.Text`
  font-size: 22px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 36px 0 24px;
`

export const BackToSignInButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  padding: 12px 0;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const BackToSignInButtonText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 12px;
`
