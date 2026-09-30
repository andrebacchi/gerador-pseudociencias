import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import Home from './pages/Home';

// Versão independente (GitHub Pages): sem login, tudo roda no navegador.
export default function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Home />
      <Toaster />
    </QueryClientProvider>
  )
}
