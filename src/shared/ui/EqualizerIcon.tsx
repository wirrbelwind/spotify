export const EqualizerIcon = () => {
  return (
    <div className="flex gap-[1px] w-6 h-6 items-end">
      <div
        className="bg-green-600 w-1/2 animate-equalizer"
        style={{
          animationDelay: '300ms',
        }}
      ></div>
      <div
        className="bg-green-600 w-1/2 animate-equalizer delay-100"
        style={{
          animationDelay: '0ms',
        }}
      ></div>
      <div
        className="bg-green-600 w-1/2 animate-equalizer delay-1000"
        style={{
          animationDelay: '700ms',
        }}
      ></div>
      <div
        className="bg-green-600 w-1/2 animate-equalizer delay-700"
        style={{
          animationDelay: '500ms',
        }}
      ></div>
      <div
        className="bg-green-600 w-1/2 animate-equalizer delay-700"
        style={{
          animationDelay: '400ms',
        }}
      ></div>
    </div>
  )
}
