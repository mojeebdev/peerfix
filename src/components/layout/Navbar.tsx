import { auth, signOut } from "@/lib/auth"
import Link from "next/link"

export default async function Navbar() {
  const session = await auth()
  const user = session?.user

  return (
    <nav className="border-b border-black px-4 py-3 flex items-center justify-between bg-white sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          peer<span className="bg-black text-white px-1.5 py-0.5 rounded-sm ml-0.5">fix</span>
        </Link>
        <div className="hidden md:flex gap-5">
          <Link href="/problems" className="mono text-xs text-gray-500 hover:text-black transition-colors">browse</Link>
          <Link href="/expert/apply" className="mono text-xs text-gray-500 hover:text-black transition-colors">experts</Link>
          {user?.role === "ADMIN" && (
            <Link href="/admin/experts" className="mono text-xs text-gray-500 hover:text-black transition-colors">admin</Link>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Link href="/dashboard" className="mono text-xs text-gray-500 hover:text-black transition-colors">
              {user.name?.split(" ")[0]}
            </Link>
            <Link href="/problems/new" className="mono text-xs bg-black text-white px-3 py-1.5 rounded-sm hover:bg-gray-900 transition-colors">
              + post
            </Link>
            <form action={async () => { "use server"; await signOut({ redirectTo: "/" }) }}>
              <button type="submit" className="mono text-xs text-gray-400 hover:text-black transition-colors">
                sign out
              </button>
            </form>
          </>
        ) : (
          <Link href="/login" className="mono text-xs bg-black text-white px-3 py-1.5 rounded-sm">
            sign in
          </Link>
        )}
      </div>
    </nav>
  )
}
