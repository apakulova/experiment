import { FinancePage } from '@/pages/FinancePage'
import { PaymentPage } from '@/pages/PaymentPage'

const route = window.location.pathname.replace(/\/+$/, '') || '/'

export function App() {
  if (route === '/payment') {
    return <PaymentPage />
  }

  return <FinancePage />
}
