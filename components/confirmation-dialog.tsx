"use client"

import { X, AlertTriangle } from "lucide-react"
import { t } from "@/lib/translations"
import { useCart } from "@/contexts/cart-context"
import styles from "./confirmation-dialog.module.scss"

interface ConfirmationDialogProps {
    isOpen: boolean
    title: string
    message: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => void
    onCancel: () => void
    type?: "warning" | "danger" | "info"
}

export default function ConfirmationDialog({
                                               isOpen,
                                               title,
                                               message,
                                               confirmText,
                                               cancelText,
                                               onConfirm,
                                               onCancel,
                                               type = "info",
                                           }: ConfirmationDialogProps) {
    const { state } = useCart()

    if (!isOpen) return null

    return (
        <div className={styles.overlay} onClick={onCancel}>
            <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onCancel}>
                    <X />
                </button>

                <div className={`${styles.icon} ${styles[type]}`}>
                    <AlertTriangle />
                </div>

                <h3 className={styles.title}>{title}</h3>
                <p className={styles.message}>{message}</p>

                <div className={styles.actions}>
                    <button className="btn btn-secondary" onClick={onCancel}>
                        {cancelText || t("cancel", state.language)}
                    </button>
                    <button className={`btn btn-primary ${type === "danger" ? styles.dangerBtn : ""}`} onClick={onConfirm}>
                        {confirmText || t("confirm", state.language)}
                    </button>
                </div>
            </div>
        </div>
    )
}
