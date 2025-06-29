import { defineStore } from "pinia"
import { Language } from "@/models/localization"

export default defineStore('settings', () => {
  return {
    currentLanguage: Language.Spanish
  }
})
