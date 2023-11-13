import { Inter } from 'next/font/google'

import "../assets/home.page.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Learn English',
    description: 'Learn English',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                />
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    )
}
