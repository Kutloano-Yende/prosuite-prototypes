import './globals.css'
import type { Metadata } from 'next'
import SidebarLayout from '@/components/layout/SidebarLayout'

export const metadata: Metadata = {
  title: 'ProSuite - Governance & Compliance Prototypes',
  description: 'Prototype dashboards for Governance and Compliance modules',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SidebarLayout>
          {children}
        </SidebarLayout>
      </body>
    </html>
  )
}