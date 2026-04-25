export interface PlantSuggestion {
  scientificName: string;
  commonName: string | null;
  confidence: number;
  family: string | null;
  imageUrl: string | null;
}

export interface IdentifyResponse {
  bestMatch: string;
  results: PlantSuggestion[];
}
