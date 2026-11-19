import { useEffect, useState } from 'react'
 

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  // Зміна цього числа змушує ефект виконатися ще раз (кнопка «Спробувати ще раз»)
  const [reloadKey, setReloadKey] = useState(0)
 
  useEffect(() => {
    // Якщо url зміниться до відповіді — стару відповідь ігноруємо
    let cancelled = false
 
    async function load() {
      setIsLoading(true)
      setError('')
 
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(response.status === 404 ? 'Нічого не знайдено' : `Помилка сервера: ${response.status}`)
        }
        const json = await response.json()
        if (!cancelled) setData(json)
      } catch (requestError) {
        if (!cancelled) setError(requestError.message)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
 
    load()
 
    return () => {
      cancelled = true
    }
  }, [url, reloadKey])
 
  function reload() {
    setReloadKey((key) => key + 1)
  }
 
  return { data, isLoading, error, reload }
}
