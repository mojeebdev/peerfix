import Image from "next/image"

export default function Avatar({ name, image, size = 28 }: { name?: string | null; image?: string | null; size?: number }) {
  const initials = name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "?"

  if (image) {
    return (
      <Image
        src={image}
        alt={name || "user"}
        width={size}
        height={size}
        className="rounded-full object-cover flex-shrink-0"
      />
    )
  }

  return (
    <div
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      className="rounded-full bg-gray-100 text-gray-700 flex items-center justify-center font-medium flex-shrink-0"
    >
      {initials}
    </div>
  )
}
