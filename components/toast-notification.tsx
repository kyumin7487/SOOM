"use client"

import { useState, useEffect } from "react"
import { Check, X, AlertTriangle, Info } from "lucide-react"
import styles from "./toast-notification.module.scss"

interface ToastProps {
    message: string
    type: "success" | "error" | "warning" | "info"
    duration?: number
    onClose: () => void
}

export default function ToastNotification({ message, type, duration = 3000, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
            setTimeout(onClose, 300) // 애니메이션 완료 후 제거
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, onClose])

    const getIcon = () => {
        switch (type) {
            case "success":
                return <Check />
            case "error":
                return <X />
            case "warning":
                return <AlertTriangle />
            case "info":
                return <Info />
        }
    }

    return (
        <div className={`${styles.toast} ${styles[type]} ${isVisible ? styles.visible : styles.hidden}`}>
            <div className={styles.icon}>{getIcon()}</div>
            <span className={styles.message}>{message}</span>
            <button className={styles.closeBtn} onClick={() => setIsVisible(false)}>
                <X />
            </button>
        </div>
    )
}
