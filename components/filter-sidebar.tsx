"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"
import { genres, platforms } from "@/lib/data"

interface FilterSidebarProps {
  applyFilters: (
    genres: string[],
    platforms: string[],
    yearRange: [number, number],
    ratingRange: [number, number],
  ) => void
  showOnMobile: boolean
  onClose: () => void
}

export default function FilterSidebar({ applyFilters, showOnMobile, onClose }: FilterSidebarProps) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [yearRange, setYearRange] = useState<[number, number]>([2000, 2023])
  const [ratingRange, setRatingRange] = useState<[number, number]>([0, 5])

  useEffect(() => {
    // Prevent initial render from triggering filters unnecessarily
    const timer = setTimeout(() => {
      applyFilters(selectedGenres, selectedPlatforms, yearRange, ratingRange)
    }, 0)

    return () => clearTimeout(timer)
  }, [selectedGenres, selectedPlatforms, yearRange, ratingRange, applyFilters])

  const handleGenreChange = (genre: string, checked: boolean) => {
    if (checked) {
      setSelectedGenres([...selectedGenres, genre])
    } else {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre))
    }
  }

  const handlePlatformChange = (platform: string, checked: boolean) => {
    if (checked) {
      setSelectedPlatforms([...selectedPlatforms, platform])
    } else {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform))
    }
  }

  const resetFilters = () => {
    setSelectedGenres([])
    setSelectedPlatforms([])
    setYearRange([2000, 2023])
    setRatingRange([0, 5])
  }

  return (
    <>
      {/* Mobile Filter Overlay */}
      {showOnMobile && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden" onClick={onClose} />
      )}

      {/* Filter Sidebar */}
      <aside
        className={`
          ${showOnMobile ? "fixed inset-y-0 left-0 z-50 w-80 border-r bg-background p-6" : "hidden"} 
          md:sticky md:top-0 md:flex md:w-72 md:flex-col md:self-start md:overflow-y-auto md:border-r md:p-6 md:h-screen
        `}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-xl">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6 overflow-y-auto">
          <Accordion type="multiple" defaultValue={["genres", "platforms", "year", "rating"]}>
            <AccordionItem value="genres">
              <AccordionTrigger>Genres</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {genres.map((genre) => (
                    <div key={genre} className="flex items-center space-x-2">
                      <Checkbox
                        id={`genre-${genre}`}
                        checked={selectedGenres.includes(genre)}
                        onCheckedChange={(checked) => handleGenreChange(genre, checked as boolean)}
                      />
                      <Label htmlFor={`genre-${genre}`}>{genre}</Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="platforms">
              <AccordionTrigger>Platforms</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {platforms.map((platform) => (
                    <div key={platform} className="flex items-center space-x-2">
                      <Checkbox
                        id={`platform-${platform}`}
                        checked={selectedPlatforms.includes(platform)}
                        onCheckedChange={(checked) => handlePlatformChange(platform, checked as boolean)}
                      />
                      <Label htmlFor={`platform-${platform}`}>{platform}</Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="year">
              <AccordionTrigger>Release Year</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Slider
                    defaultValue={yearRange}
                    min={2000}
                    max={2023}
                    step={1}
                    onValueChange={(value) => setYearRange(value as [number, number])}
                  />
                  <div className="flex justify-between">
                    <span className="text-sm">{yearRange[0]}</span>
                    <span className="text-sm">{yearRange[1]}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rating">
              <AccordionTrigger>Rating</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Slider
                    defaultValue={ratingRange}
                    min={0}
                    max={5}
                    step={0.5}
                    onValueChange={(value) => setRatingRange(value as [number, number])}
                  />
                  <div className="flex justify-between">
                    <span className="text-sm">{ratingRange[0]}</span>
                    <span className="text-sm">{ratingRange[1]}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button variant="outline" className="w-full" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      </aside>
    </>
  )
}
