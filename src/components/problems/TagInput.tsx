"use client"

import { useState, KeyboardEvent } from "react"

interface TagInputProps {
  tags: string[]
  onChange: (tags: string[]) => void
  suggestions?: string[]
}

export default function TagInput({ tags, onChange, suggestions = [] }: TagInputProps) {
  const [input, setInput] = useState("")

  const filtered = suggestions.filter(
    (s) => s.toLowerCase().includes(input.toLowerCase()) && !tags.includes(s)
  )

  function addTag(tag: string) {
    const clean = tag.trim().toLowerCase()
    if (clean && !tags.includes(clean)) {
      onChange([...tags, clean])
    }
    setInput("")
  }

  function removeTag(tag: string) {
    onChange(tags.filter((t) => t !== tag))
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      if (input.trim()) addTag(input)
    }
    if (e.key === "Backspace" && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1.5 border border-gray-200 focus-within:border-black rounded-sm px-2 py-2 transition-colors min-h-[42px]">
        {tags.map((tag: any) => (
          <span key={tag} className="mono text-xs bg-black text-white px-2 py-0.5 rounded-sm flex items-center gap-1">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="text-gray-400 hover:text-white">
              ×
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={tags.length === 0 ? "type a tag and press enter..." : ""}
          className="mono text-xs outline-none flex-1 min-w-24 bg-transparent"
        />
      </div>

      {input && filtered.length > 0 && (
        <div className="border border-gray-200 rounded-sm overflow-hidden">
          {filtered.slice(0, 5).map((s: any) => (
            <button
              key={s}
              type="button"
              onClick={() => addTag(s)}
              className="w-full text-left mono text-xs px-3 py-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
