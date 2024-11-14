// app/types.ts
export interface PlantData {
  commonName: string;
  scientificName: string;
  care: {
    water: string;
    sunlight: string;
    soil: string;
  };
  facts: string;
  error?: string;
}