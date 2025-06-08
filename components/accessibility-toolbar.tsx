"use client"

import { useState } from "react"
import { Volume2, VolumeX, Type, Palette } from "lucide-react"
import { t } from "@/lib/translations"
import { useCart } from "@/contexts/cart-context"
import styles from "./accessibility-toolbar.module.scss"

export default function AccessibilityToolbar() {
    const { state } = useCart()
    const [isLargeText, setIsLargeText] = useState(false)
    const [isHighContrast, setIsHighContrast] = useState(false)
    const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)

    const toggleLargeText = () => {
        setIsLargeText(!isLargeText)
        document.body.classList.toggle("large-text", !isLargeText)
    }

    const toggleHighContrast = () => {
        setIsHighContrast(!isHighContrast)
        document.body.classList.toggle("high-contrast", !isHighContrast)
    }

    const toggleVoice = () => {
        setIsVoiceEnabled(!isVoiceEnabled)
        // TTS 기능 구현
        if (!isVoiceEnabled) {
            speak(t("welcome", state.language))
        }
    }

    const speak = (text: string) => {
        if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(text)
            utterance.lang = state.language === "ko" ? "ko-KR" : "en-US"
            utterance.rate = 0.8
            speechSynthesis.speak(utterance)
        }
    }

    return (
        <div className={styles.accessibilityToolbar}>
            <button
                className={`${styles.toolbarBtn} ${isLargeText ? styles.active : ""}`}
                onClick={toggleLargeText}
                aria-label="큰 글씨 모드"
            >
                <Type />
            </button>

            <button
                className={`${styles.toolbarBtn} ${isHighContrast ? styles.active : ""}`}
                onClick={toggleHighContrast}
                aria-label="고대비 모드"
            >
                <Palette />
            </button>

            <button
                className={`${styles.toolbarBtn} ${isVoiceEnabled ? styles.active : ""}`}
                onClick={toggleVoice}
                aria-label="음성 안내"
            >
                {isVoiceEnabled ? <Volume2 /> : <VolumeX />}
            </button>
        </div>
    )
}
