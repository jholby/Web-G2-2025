"use client"

import { ArrowLeft } from "lucide-react"
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

interface CharacterDetailsProps {
  character: Character
}

export default function CharacterDetails({ character }: CharacterDetailsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-blue-50">
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
                  className="object-cover"
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
                            ? "Hombre"
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
