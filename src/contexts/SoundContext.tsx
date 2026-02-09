import React, { createContext, useContext, useEffect, useState } from 'react'

type SoundEnabled = boolean

interface SoundContextType {
    soundEnabled: SoundEnabled
    toggleSound: () => void
    setSoundEnabled: (enabled: SoundEnabled) => void
    playSound: (type: SoundType) => void
}

export type SoundType = 'keypress' | 'enter' | 'win' | 'lose' | 'invalid' | 'delete'

const SoundContext = createContext<SoundContextType | undefined>(undefined)

const STORAGE_KEY = 'zborle-sound'

// Sound frequencies for different effects
const SOUNDS: Record<SoundType, { frequency: number; duration: number; type?: OscillatorType }> = {
    keypress: { frequency: 400, duration: 50, type: 'sine' },
    enter: { frequency: 600, duration: 100, type: 'sine' },
    win: { frequency: 523.25, duration: 200, type: 'sine' }, // C5
    lose: { frequency: 220, duration: 300, type: 'sawtooth' }, // A3
    invalid: { frequency: 150, duration: 150, type: 'square' },
    delete: { frequency: 300, duration: 50, type: 'sine' },
}

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [soundEnabled, setSoundEnabledState] = useState<SoundEnabled>(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored !== null ? stored === 'true' : false
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, String(soundEnabled))
    }, [soundEnabled])

    const toggleSound = () => {
        setSoundEnabledState((prev) => !prev)
    }

    const setSoundEnabled = (enabled: SoundEnabled) => {
        setSoundEnabledState(enabled)
    }

    const playSound = (type: SoundType) => {
        if (!soundEnabled) return

        try {
            const audioContext = new (
                window.AudioContext ||
                (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
            )()
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            const sound = SOUNDS[type]
            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            oscillator.frequency.value = sound.frequency
            oscillator.type = sound.type || 'sine'

            // Fade out
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration / 1000)

            oscillator.start(audioContext.currentTime)
            oscillator.stop(audioContext.currentTime + sound.duration / 1000)
        } catch (e) {
            // Audio not supported or failed
            console.log('Audio playback failed:', e)
        }
    }

    return (
        <SoundContext.Provider value={{ soundEnabled, toggleSound, setSoundEnabled, playSound }}>
            {children}
        </SoundContext.Provider>
    )
}

export const useSound = (): SoundContextType => {
    const context = useContext(SoundContext)
    if (context === undefined) {
        throw new Error('useSound must be used within a SoundProvider')
    }
    return context
}
