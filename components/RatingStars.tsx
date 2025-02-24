import { Star } from "lucide-react"

interface RatingStarsProps {
  rating: number
  maxRating?: number
}

export default function RatingStars({ rating, maxRating = 5 }: RatingStarsProps) {
  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  )
}

