'use client'

export default function Error({
  { error, reset }:
        {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      error
      <p>{error.name}</p>
      <p>{error.message}</p>
    </div>
  )
}
