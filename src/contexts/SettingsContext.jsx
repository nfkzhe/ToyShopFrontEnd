import { createContext, useContext, useEffect, useState } from "react"
import { getSettings } from "~/untils/ApiHelper"

const SettingsContext = createContext()

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSettings()
      setSettings(data)
    }
    fetchData()
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)
