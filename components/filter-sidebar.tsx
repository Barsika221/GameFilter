"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersChange: (filters: {
    genres: string[];
    platforms: string[];
    yearRange: [number, number];
    ratingRange: [number, number];
  }) => void;
}

export default function FilterSidebar({ isOpen, onClose, onFiltersChange }: FilterSidebarProps) {
  const [genres, setGenres] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<[number, number]>([1990, 2025]);
  const [ratingRange, setRatingRange] = useState<[number, number]>([0, 5]);

  // Fetch genres and platforms from API
  useEffect(() => {
    async function fetchFilterData() {
      try {
        const [genresRes, platformsRes] = await Promise.all([
          fetch('/api/genres'),
          fetch('/api/platforms')
        ]);

        if (genresRes.ok && platformsRes.ok) {
          const genresData = await genresRes.json();
          const platformsData = await platformsRes.json();
          
          setGenres(genresData);
          setPlatforms(platformsData);
        }
      } catch (error) {
        console.error("Failed to fetch filter data:", error);
      }
    }

    fetchFilterData();
  }, []);

  // Apply filters when state changes
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({
        genres: selectedGenres,
        platforms: selectedPlatforms,
        yearRange,
        ratingRange
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedGenres, selectedPlatforms, yearRange, ratingRange, onFiltersChange]);

  const handleGenreChange = (genre: string, checked: boolean) => {
    if (checked) {
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    }
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    if (checked) {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    } else {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    }
  };

  const resetFilters = () => {
    setSelectedGenres([]);
    setSelectedPlatforms([]);
    setYearRange([1990, 2025]);
    setRatingRange([0, 5]);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-background border-r shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 md:shadow-none`}
    >
      <div className="h-full overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Filters</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="md:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Filters */}
        <div className="space-y-6">
          <Accordion type="multiple" defaultValue={["genres", "platforms", "year", "rating"]}>
            {/* Genres */}
            <AccordionItem value="genres">
              <AccordionTrigger>Genres</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {genres.map((genre) => (
                    <div key={genre} className="flex items-center space-x-2">
                      <Checkbox
                        id={`genre-${genre}`}
                        checked={selectedGenres.includes(genre)}
                        onCheckedChange={(checked) =>
                          handleGenreChange(genre, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`genre-${genre}`}
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {genre}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Platforms */}
            <AccordionItem value="platforms">
              <AccordionTrigger>Platforms</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {platforms.map((platform) => (
                    <div key={platform} className="flex items-center space-x-2">
                      <Checkbox
                        id={`platform-${platform}`}
                        checked={selectedPlatforms.includes(platform)}
                        onCheckedChange={(checked) =>
                          handlePlatformChange(platform, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`platform-${platform}`}
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {platform}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Release Year */}
            <AccordionItem value="year">
              <AccordionTrigger>Release Year</AccordionTrigger>
              <AccordionContent>
                <div className="px-2">
                  <Slider
                    value={yearRange}
                    onValueChange={(value) => setYearRange(value as [number, number])}
                    max={2025}
                    min={1990}
                    step={1}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{yearRange[0]}</span>
                    <span>{yearRange[1]}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Rating */}
            <AccordionItem value="rating">
              <AccordionTrigger>Rating</AccordionTrigger>
              <AccordionContent>
                <div className="px-2">
                  <Slider
                    value={ratingRange}
                    onValueChange={(value) => setRatingRange(value as [number, number])}
                    max={5}
                    min={0}
                    step={0.1}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{ratingRange[0].toFixed(1)}</span>
                    <span>{ratingRange[1].toFixed(1)}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Reset Button */}
        <div className="mt-6 pt-6 border-t">
          <Button onClick={resetFilters} variant="outline" className="w-full">
            Reset Filters
          </Button>
        </div>
      </div>
    </aside>
  );
}
