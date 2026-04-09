export default function Spinner({ size = 16 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="border-2 border-gray-200 border-t-black rounded-full animate-spin"
    />
  )
}
