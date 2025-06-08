"use client"

import { Check } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import styles from "./progress-indicator.module.scss"

interface ProgressIndicatorProps {
    currentStep: 1 | 2 | 3 | 4 // 1: 주문방식, 2: 메뉴선택, 3: 장바구니, 4: 결제
}

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
    const { state } = useCart()

    const steps = [
        { id: 1, name_ko: "주문방식", name_en: "Order Type" },
        { id: 2, name_ko: "메뉴선택", name_en: "Menu" },
        { id: 3, name_ko: "장바구니", name_en: "Cart" },
        { id: 4, name_ko: "결제", name_en: "Payment" },
    ]

    return (
        <div className={styles.progressIndicator}>
            {steps.map((step, index) => (
                <div key={step.id} className={styles.stepContainer}>
                    <div
                        className={`${styles.step} ${currentStep >= step.id ? styles.active : ""} ${currentStep > step.id ? styles.completed : ""}`}
                    >
                        {currentStep > step.id ? (
                            <Check className={styles.checkIcon} />
                        ) : (
                            <span className={styles.stepNumber}>{step.id}</span>
                        )}
                    </div>
                    <span className={styles.stepLabel}>{state.language === "ko" ? step.name_ko : step.name_en}</span>
                    {index < steps.length - 1 && (
                        <div className={`${styles.connector} ${currentStep > step.id ? styles.completed : ""}`} />
                    )}
                </div>
            ))}
        </div>
    )
}
