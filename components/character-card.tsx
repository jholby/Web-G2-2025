"use client"

import Image from "next/image"
import Link from "next/link"

interface Character {
  id: number
  name: string
  race: string
  gender: string
  image: string
}

interface CharacterCardProps {
  character: Character
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link href={`/personaje/${character.id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden border-2 border-orange-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 h-full flex flex-col">
        <div className="relative h-64 bg-blue-50">
          <Image
            src={character.image || "/placeholder.svg?height=300&width=200"}
            alt={character.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white">
          <h3 className="text-xl font-bold mb-1 truncate">{character.name}</h3>
          <p className="text-orange-100">{character.race}</p>
          <p className="text-orange-100 text-sm mt-1">
            {character.gender === "Male" ? "Masculino" : character.gender === "Female" ? "Femenino" : character.gender}
          </p>
        </div>
      </div>
    </Link>
  )
}
