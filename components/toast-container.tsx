"use client"

import ToastNotification from "./toast-notification"
import { useToast } from "@/hook/use-toast"
import styles from "./toast-container.module.scss"

export default function ToastContainer() {
    const { toasts, removeToast } = useToast()

    return (
        <div className={styles.container}>
            {toasts.map((toast) => (
                <ToastNotification
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    duration={toast.duration}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>
    )
}
