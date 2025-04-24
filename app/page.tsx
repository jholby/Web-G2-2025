"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Search, Info } from "lucide-react"
import CharacterCard from "@/components/character-card"
import useCharacters from "@/hooks/use-characters"
import AboutCard from "@/components/about-card"

export default function Home() {
  const [showAbout, setShowAbout] = useState(false)

  const {
    characters,
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
  } = useCharacters()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 text-orange-500 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <header className="bg-orange-500 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-bold">Dragon Ball Universe</h1>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-orange-600"
              onClick={() => setShowAbout(true)}
            >
              <Info className="mr-2 h-4 w-4" />
              Acerca de
            </Button>
          </div>
          <p className="mt-2 text-orange-100">Explora el universo de Dragon Ball</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {showAbout && <AboutCard onClose={() => setShowAbout(false)} />}

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-orange-600">Filtrar personajes</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div>
              <Select value={selectedGender} onValueChange={setSelectedGender}>
                <SelectTrigger className="border-orange-300">
                  <SelectValue placeholder="Filtrar por género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los géneros</SelectItem>
                  {genders.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender === "Male" ? "Masculino" : "Femenino"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedGender("")
                }}
                variant="outline"
                className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
              >
                Limpiar filtros
              </Button>
            </div>
          </div>
        </div>

        {characters.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No se encontraron personajes con los filtros seleccionados.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              <Button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
                className="border-orange-300"
              >
                Anterior
              </Button>

              <div className="flex items-center px-4 font-medium">
                Página {currentPage} de {totalPages}
              </div>

              <Button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
                className="border-orange-300"
              >
                Siguiente
              </Button>
            </div>
          </>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>Dragon Ball Universe &copy; {new Date().getFullYear()}</p>
          <p className="text-gray-400 text-sm mt-2">Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  )
}
