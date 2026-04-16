'use client'

import { PayPalScriptProvider } from "@paypal/react-paypal-js"

const paypalOptions = {
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
  currency: "CAD",
  intent: "capture",
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PayPalScriptProvider options={paypalOptions}>
      {children}
    </PayPalScriptProvider>
  )
}
