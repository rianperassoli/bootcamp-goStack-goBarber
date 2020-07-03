import React from 'react'
import { useTransition } from 'react-spring'

import { ToastMessage } from '../../hooks/toast'
import { Container } from './styles'
import Toast from './Toast'

interface ToastContainerProps {
  messages: ToastMessage[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id, // deve ser o valor da key do componente Controlado(Toast)
    {
      // pode ser adicionada qlquer css
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  )

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  )
}

export default ToastContainer
