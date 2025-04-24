"use client"

import { useState, useEffect } from "react"

interface Character {
  id: number
  name: string
  race: string
  gender: string
  ki: string
  maxKi: string
  image: string
  description: string
  affiliation: string
  originPlanet: {
    id: number
    name: string
  }
}

interface UseCharactersReturn {
  characters: Character[]
  loading: boolean
  error: string | null
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedGender: string
  setSelectedGender: (gender: string) => void
  genders: string[]
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
}

export default function useCharacters(): UseCharactersReturn {
  const [allCharacters, setAllCharacters] = useState<Character[]>([])
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGender, setSelectedGender] = useState("")
  const [genders, setGenders] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const charactersPerPage = 12

  // Fetch characters
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://dragonball-api.com/api/characters?limit=100")

        if (!response.ok) {
          throw new Error(`Error ${response.status}: No se pudieron cargar los personajes`)
        }

        const data = await response.json()
        console.log("Fetched characters:", data.items)
        setAllCharacters(data.items)

        // Set gender options
        const genders = ["Male", "Female"]
        setGenders(genders)
      } catch (error) {
        console.error("Error fetching characters:", error)
        setError("No se pudieron cargar los personajes. Por favor, intenta de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [])

  // Filter characters based on search term and gender
  useEffect(() => {
    let result = allCharacters

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter((character) => character.name.toLowerCase().includes(term))
    }

    if (selectedGender) {
      result = result.filter((character) => character.gender === selectedGender)
    }

    setFilteredCharacters(result)
    setTotalPages(Math.max(1, Math.ceil(result.length / charactersPerPage)))
    setCurrentPage(1) // Reset to first page when filters change
  }, [allCharacters, searchTerm, selectedGender])

  // Get current page characters
  const indexOfLastCharacter = currentPage * charactersPerPage
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage
  const currentCharacters = filteredCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter)

  return {
    characters: currentCharacters,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedGender,
    setSelectedGender,
    genders,
    currentPage,
    setCurrentPage,
    totalPages,
  }
}
