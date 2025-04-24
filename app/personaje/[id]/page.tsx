"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Loader2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

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
  originPlanet: string
}

export default function CharacterPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id
  const [character, setCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true)
        console.log("Fetching character with ID:", id)
        const response = await fetch(`https://dragonball-api.com/api/characters/${id}`)

        if (!response.ok) {
          throw new Error(`Error ${response.status}: No se pudo cargar el personaje`)
        }

        const data = await response.json()
        console.log("Character data:", data)
        setCharacter({
          id: data.id,
          name: data.name,
          race: data.race,
          gender: data.gender,
          ki: data.ki,
          maxKi: data.maxKi,
          image: data.image,
          description: data.description,
          affiliation: data.affiliation,
          originPlanet: data.originPlanet?.name || "Desconocido",
        })
      } catch (error) {
        console.error("Error fetching character:", error)
        setError("No se pudo cargar la información del personaje. Por favor, intenta de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchCharacter()
    }
  }, [id])

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
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Volver al inicio
        </button>
      </div>
    )
  }

  if (!character) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-orange-50 border border-orange-200 text-orange-700 px-4 py-3 rounded-lg">
          <p>Personaje no encontrado</p>
        </div>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Volver al inicio
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <header className="bg-orange-500 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Dragon Ball Universe</h1>
          <p className="text-center mt-2 text-orange-100">Detalles del personaje</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="border-orange-300 hover:bg-orange-100">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-xl max-w-4xl mx-auto">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-2xl font-bold text-orange-600">{character.name}</h2>
          </div>

          <div className="md:flex p-6">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <div className="relative h-80 w-full bg-blue-100 rounded-lg overflow-hidden">
                <Image
                  src={character.image || "/placeholder.svg?height=320&width=240"}
                  alt={character.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>

            <div className="md:w-2/3 md:pl-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">{character.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Información Básica</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="font-medium">Raza:</span>
                        <span>{character.race}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="font-medium">Género:</span>
                        <span>
                          {character.gender === "Male"
                            ? "Masculino"
                            : character.gender === "Female"
                              ? "Mujer"
                              : character.gender}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="font-medium">Planeta de origen:</span>
                        <span>{character.originPlanet}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="font-medium">Afiliación:</span>
                        <span>{character.affiliation}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">Poder</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="font-medium">Ki:</span>
                        <span>{character.ki}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="font-medium">Ki Máximo:</span>
                        <span>{character.maxKi}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
