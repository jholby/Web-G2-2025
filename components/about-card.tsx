
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AboutCardProps {
  onClose: () => void
}

export default function AboutCard({ onClose }: AboutCardProps) {
  return (
    <div className="db-about-overlay">
      <div className="db-about-card">
        <div className="db-about-header">
          <h2 className="db-about-title">Acerca de... </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-orange-600">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="db-about-content">
          <div className="prose max-w-none">
            <p className="text-lg mb-4">
              Jholby Molano
            </p>

            <h3 className="text-lg font-bold text-orange-600 mt-4">Estudiante de Ing. de Sistemas</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>jh.molano@udla.edu.co</li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  )
}
