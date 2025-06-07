"use client"

import { useCart } from "@/contexts/cart-context"
import { Globe } from "lucide-react"
import styles from "./language-selector.module.scss"

export default function LanguageSelector() {
    const { state, dispatch } = useCart()

    return (
        <div className={styles.languageSelector}>
            <Globe className={styles.icon} />
            <button
                className={`${styles.langBtn} ${state.language === "ko" ? styles.active : ""}`}
                onClick={() => dispatch({ type: "SET_LANGUAGE", payload: "ko" })}
            >
                한국어
            </button>
            <button
                className={`${styles.langBtn} ${state.language === "en" ? styles.active : ""}`}
                onClick={() => dispatch({ type: "SET_LANGUAGE", payload: "en" })}
            >
                English
            </button>
        </div>
    )
}
