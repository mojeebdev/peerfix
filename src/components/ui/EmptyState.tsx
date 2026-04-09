export default function EmptyState({ message, action }: { message: string; action?: React.ReactNode }) {
  return (
    <div className="border border-dashed border-gray-200 rounded-sm p-10 text-center">
      <p className="mono text-xs text-gray-400 mb-3">{message}</p>
      {action}
    </div>
  )
}
