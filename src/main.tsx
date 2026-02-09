import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ThemeProvider } from './contexts/ThemeContext'
import { SoundProvider } from './contexts/SoundContext'

const root = createRoot(document.getElementById('root')!)

root.render(
    <StrictMode>
        <ThemeProvider>
            <SoundProvider>
                <App />
            </SoundProvider>
        </ThemeProvider>
    </StrictMode>,
)
