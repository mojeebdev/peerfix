import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import ProblemForm from "@/components/problems/ProblemForm"

export default async function NewProblemPage() {
  const session = await auth()
  if (!session) redirect("/login")

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8 pb-6 border-b border-black">
        <p className="mono text-xs text-gray-400 tracking-widest uppercase mb-2">new problem</p>
        <h1 className="text-3xl font-semibold tracking-tighter">What are you stuck on?</h1>
        <p className="text-sm text-gray-500 mt-2">
          Be specific. The more detail, the faster your fix.
        </p>
      </div>
      <ProblemForm />
    </div>
  )
}
