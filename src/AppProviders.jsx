import React from 'react'
import { DGPAProvider } from './context/dgpaContext.jsx'

const AppProviders = ({children}) => {
  return (
    <DGPAProvider>
        {children}
    </DGPAProvider>
  )
}

export default AppProviders