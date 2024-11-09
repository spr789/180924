"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useSearch } from "@/contexts/search-context"

export function SearchBar({ mobile = false }: { mobile?: boolean }) {
  const { searchQuery, setSearchQuery, handleSearch } = useSearch()
  const [localQuery, setLocalQuery] = useState(searchQuery)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(localQuery)
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full">
      <Search 
        className={`absolute ${mobile ? 'left-4' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400`}
      />
      <Input
        type="search"
        placeholder="Search for Bajubandh"
        value={localQuery}
        onChange={(e) => {
          setLocalQuery(e.target.value)
          setSearchQuery(e.target.value)
        }}
        className={`w-full ${mobile ? 'pl-12' : 'pl-10'}`}
      />
    </form>
  )
}