import { createContext, useState, useContext } from "react"
import marketData from "./data.json"

const DataContext = createContext({})

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data] = useState(marketData)

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
