"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Bell, Trash2 } from "lucide-react"

interface SavedSearch {
  id: string
  name: string
  filters: any
  createdAt: string
}

export default function SavedSearches() {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([])
  const [searchName, setSearchName] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Load saved searches from localStorage
    const searches = localStorage.getItem("savedSearches")
    if (searches) {
      setSavedSearches(JSON.parse(searches))
    }
  }, [])

  const saveSearch = (currentFilters: any) => {
    if (!searchName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for your search",
        variant: "destructive",
      })
      return
    }

    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      name: searchName,
      filters: currentFilters,
      createdAt: new Date().toISOString(),
    }

    const updatedSearches = [...savedSearches, newSearch]
    setSavedSearches(updatedSearches)
    localStorage.setItem("savedSearches", JSON.stringify(updatedSearches))

    toast({
      title: "Success",
      description: "Search saved successfully",
    })
    setSearchName("")
  }

  const deleteSearch = (id: string) => {
    const updatedSearches = savedSearches.filter((search) => search.id !== id)
    setSavedSearches(updatedSearches)
    localStorage.setItem("savedSearches", JSON.stringify(updatedSearches))

    toast({
      title: "Success",
      description: "Search deleted successfully",
    })
  }

  const enableNotifications = async (searchId: string) => {
    try {
      const permission = await Notification.requestPermission()
      if (permission === "granted") {
        toast({
          title: "Success",
          description: "Notifications enabled for this search",
        })
      } else {
        throw new Error("Notification permission denied")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to enable notifications",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Saved Searches</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Saved Searches</DialogTitle>
          <DialogDescription>Manage your saved searches and notifications</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search-name">Save Current Search</Label>
            <div className="flex gap-2">
              <Input
                id="search-name"
                placeholder="Enter a name for this search"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <Button onClick={() => saveSearch({})}>Save</Button>
            </div>
          </div>

          <div className="space-y-2">
            {savedSearches.map((search) => (
              <div key={search.id} className="flex items-center justify-between p-2 border rounded-lg">
                <div>
                  <h4 className="font-medium">{search.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Saved {new Date(search.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => enableNotifications(search.id)}>
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteSearch(search.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

