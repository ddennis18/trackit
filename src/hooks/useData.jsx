//TODO: clear this no longer needed as supabase is now integrated

import { useState } from 'react'

/*A Hook that saves data to a backend every time the data changes */
export function useData (defaultValue = null) {
  const [data, setData] = useState(defaultValue)
  return [
    data,
    d => {
      localStorage.setItem("txn", JSON.stringify(d));
      setData(d)
    }
  ]
}
