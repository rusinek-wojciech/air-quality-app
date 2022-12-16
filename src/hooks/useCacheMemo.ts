import { MutableRefObject, useRef, useMemo } from 'react'

/**
 * Returns values from cache and skip calculation if cache value provided
 * After returning cache is cleared
 */
export const useCacheMemo = <T>(
  calculation: () => T,
  deps?: unknown[]
): [T, MutableRefObject<T | null>] => {
  const cache = useRef<T | null>(null)

  const values = useMemo(() => {
    if (cache.current) {
      const values = cache.current
      cache.current = null
      return values
    }
    return calculation()
  }, [deps])

  return [values, cache]
}
