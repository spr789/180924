"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  material: string
}

interface WishlistContextType {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const { toast } = useToast()

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      setItems(JSON.parse(savedWishlist))
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items))
  }, [items])

  const addItem = (newItem: WishlistItem) => {
    setItems(currentItems => {
      if (currentItems.some(item => item.id === newItem.id)) {
        return currentItems
      }
      return [...currentItems, newItem]
    })

    toast({
      title: "Added to Wishlist",
      description: `${newItem.name} has been added to your wishlist.`,
    })
  }

  const removeItem = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id))
    
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist.",
    })
  }

  const isInWishlist = (id: string) => {
    return items.some(item => item.id === id)
  }

  const clearWishlist = () => {
    setItems([])
    toast({
      title: "Wishlist Cleared",
      description: "All items have been removed from your wishlist.",
    })
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}