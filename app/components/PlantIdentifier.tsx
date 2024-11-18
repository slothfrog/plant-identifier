// components/PlantIdentifier.tsx
'use client'

import { useState } from 'react'
import { Upload, Camera, Leaf, Info, Droplet, Sun } from 'lucide-react'
import Image from 'next/image'
import { PlantData } from '@/types'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY as string)

export default function PlantIdentifier() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<PlantData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
      identifyPlant(file)
    }
  }

  const identifyPlant = async (file: File) => {
    try {
      setLoading(true)
      
      const imageData = await file.arrayBuffer()
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
      
      const prompt = `Analyze this plant image and return a JSON object with the following properties:
      {
        "commonName": "plant common name",
        "scientificName": "plant scientific name",
        "care": {
          "water": "watering instructions",
          "sunlight": "sunlight requirements",
          "soil": "soil preferences"
        },
        "facts": "interesting facts about the plant"
      }
      Respond only with the JSON object, no additional text or formatting.`;
      
      const base64Data = Buffer.from(imageData).toString('base64')
      
      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64Data,
            mimeType: file.type
          }
        }
      ])
      const response = await result.response
      const text = response.text()
      
      const cleanedText = text.replace(/```json|```/g, '').trim()
      
      try {
        const plantData: PlantData = JSON.parse(cleanedText)
        setResult(plantData)
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError)
        throw new Error('Invalid response format from API')
      }
      
    } catch (error) {
      console.error('Error identifying plant:', error)
      setResult({ 
        commonName: '',
        scientificName: '',
        care: { water: '', sunlight: '', soil: '' },
        facts: '',
        error: 'Failed to identify plant. Please try again.' 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 text-emerald-800">Plant Identifier</h1>
      
      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex flex-col items-center justify-center">
          <label 
            className="w-full max-w-md h-64 flex flex-col items-center justify-center border-2 border-dashed border-emerald-300 rounded-lg cursor-pointer hover:bg-emerald-50 transition-colors"
          >
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <Upload className="w-12 h-12 text-emerald-500 mb-2" />
            <p className="text-sm text-gray-600">Upload a plant image to identify</p>
          </label>
        </div>
      </div>

      {/* Preview and Results Section */}
      {preview && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Preview */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-emerald-800">Uploaded Image</h2>
              <Image
                src={preview}
                alt="Plant preview"
                width={400}
                height={300}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            {/* Results */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-emerald-800">Plant Information</h2>
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                </div>
              ) : result ? (
                <div className="space-y-4">
                  {result.error ? (
                    <div className="text-red-500">{result.error}</div>
                  ) : (
                    <>
                      <div>
                        <h3 className="font-medium text-emerald-700">Common Name</h3>
                        <p>{result.commonName}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-emerald-700">Scientific Name</h3>
                        <p className="italic">{result.scientificName}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-emerald-700">Care Instructions</h3>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Water: {result.care.water}</li>
                          <li>Sunlight: {result.care.sunlight}</li>
                          <li>Soil: {result.care.soil}</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium text-emerald-700">Interesting Facts</h3>
                        <p>{result.facts}</p>
                      </div>
                    </>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      
      {/* How It Works Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8 text-emerald-800">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-emerald-900 rounded-xl p-6 text-white hover:transform hover:scale-105 transition-transform">
            <div className="flex justify-center mb-4">
              <Camera className="w-8 h-8 text-lime-300" />
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Take a Photo</h3>
            <p className="text-sm text-center text-emerald-200">
              Upload a clear photo of your plant. Best results come from well-lit images showing leaves and flowers.
            </p>
          </div>

          <div className="bg-emerald-900 rounded-xl p-6 text-white hover:transform hover:scale-105 transition-transform">
            <div className="flex justify-center mb-4">
              <Leaf className="w-8 h-8 text-lime-300" />
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Get Identification</h3>
            <p className="text-sm text-center text-emerald-200">
              Our AI instantly identifies your plant and provides its common and scientific names.
            </p>
          </div>

          <div className="bg-emerald-900 rounded-xl p-6 text-white hover:transform hover:scale-105 transition-transform">
            <div className="flex justify-center mb-4">
              <Info className="w-8 h-8 text-lime-300" />
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Learn Care Tips</h3>
            <p className="text-sm text-center text-emerald-200">
              Receive detailed care instructions and interesting facts about your plant.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-emerald-900 rounded-xl p-6 text-white hover:transform hover:scale-105 transition-transform">
            <div className="flex justify-center mb-4">
              <Droplet className="w-8 h-8 text-lime-300" />
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Watering Guide</h3>
            <p className="text-sm text-center text-emerald-200">
              Get specific watering instructions tailored to your plant&apos;s needs.
            </p>
          </div>

          <div className="bg-emerald-900 rounded-xl p-6 text-white hover:transform hover:scale-105 transition-transform">
            <div className="flex justify-center mb-4">
              <Sun className="w-8 h-8 text-lime-300" />
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Light Requirements</h3>
            <p className="text-sm text-center text-emerald-200">
              Learn about optimal light conditions for healthy growth.
            </p>
          </div>

          <div className="bg-emerald-900 rounded-xl p-6 text-white hover:transform hover:scale-105 transition-transform">
            <div className="flex justify-center mb-4">
              <Info className="w-8 h-8 text-lime-300" />
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Fun Facts</h3>
            <p className="text-sm text-center text-emerald-200">
              Discover interesting facts and history about your plant.
            </p>
          </div>
        </div>
      </div>
      
    </div>
  )
}