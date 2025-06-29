import { Language, LocalizedStringKey } from "@/models/localization"
import ES from '@/assets/localization/es'
import settingsStore from '@/stores/settings'

export const localizedStringInLanguage = (key: LocalizedStringKey, language: Language): string => {
  const element: string | undefined = (() => {
    switch (language) {
      case Language.Spanish: return ES.get(key)
    }
  })()
  
  return element ?? `{LocalizedStringKey: ${key}, Language: ${language}}`
}

export const localizedString = (key: LocalizedStringKey): string => {
  const settings = settingsStore()
  
  return localizedStringInLanguage(key, settings.currentLanguage)
}
