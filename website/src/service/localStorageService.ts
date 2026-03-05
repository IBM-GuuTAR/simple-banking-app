class LocalStorageService {
  getValue = (key: string): string | null => {
    return localStorage.getItem(key)
  }

  setValue = (key: string, value: string) => {
    localStorage.setItem(key, value)
  }
}

export const localStorageService = new LocalStorageService()
