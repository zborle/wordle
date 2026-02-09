import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline'
import { useSound } from '../../contexts/SoundContext'

export const SoundToggle = () => {
    const { soundEnabled, toggleSound } = useSound()

    return (
        <button
            onClick={toggleSound}
            className="p-2 rounded-lg transition-colors duration-200 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
            aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
            title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
        >
            {soundEnabled ? (
                <SpeakerWaveIcon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            ) : (
                <SpeakerXMarkIcon className="w-6 h-6 text-slate-400" />
            )}
        </button>
    )
}
