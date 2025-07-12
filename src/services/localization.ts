import { Language } from "@/models/localization"
import useSettingsStore from '@/stores/settings'
import ES from '@/assets/localization/es'

export const localizedStringInLanguage = (key: string, language: Language): string => {
  const element: string | undefined = (() => {
    switch (language) {
      case Language.Spanish: return ES.get(key)
    }
  })()
  
  return element ?? `{LocalizedStringKey: ${key}, Language: ${language}}`
}

export const localizedString = (key: string): string => {
  const settings = useSettingsStore()
  
  return localizedStringInLanguage(key, settings.currentLanguage)
}
