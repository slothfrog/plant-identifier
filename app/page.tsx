// app/page.tsx
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PlantIdentifier from '@/components/PlantIdentifier'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
        <PlantIdentifier />
      </main>
      <Footer />
    </>
  )
}