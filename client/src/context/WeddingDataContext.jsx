import React, { createContext, useContext } from 'react'
import defaultWeddingData from '../data/weddingData'

const WeddingDataContext = createContext(defaultWeddingData)

export function WeddingDataProvider({ data, children }) {
  const mergedData = data ? { ...defaultWeddingData, ...data } : defaultWeddingData
  return (
    <WeddingDataContext.Provider value={mergedData}>
      {children}
    </WeddingDataContext.Provider>
  )
}

export function useWeddingData() {
  return useContext(WeddingDataContext) || defaultWeddingData
}
