import { useEffect, useRef } from 'react'

export const useOnVisible = (callback?: () => void) => {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || !callback) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback()
      }
    })

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [callback])

  return ref
}
