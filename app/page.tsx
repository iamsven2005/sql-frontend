'use client'

import { useState } from 'react'
import axios from 'axios'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
type ResultType = {
  item: any; // Replace `any` with a specific type if known
}

export default function Component() {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ResultType | null>(null);
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post('/api/query', { query })
      setResult(response.data)
      toast({
        title: "Query submitted",
        description: "Response received successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit query. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setQuery('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      {result && (
        <div className="p-4 bg-gray-100 rounded-md">
          <div dangerouslySetInnerHTML={{ __html: result.item }} />
        </div>
      )}
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your query"
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading || !query.trim()}>
        {isLoading ? 'Submitting...' : 'Submit Query'}
      </Button>
    </form>
  )
}
