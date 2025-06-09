"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import { t } from "@/lib/translations"
import { CreditCard, Check } from "lucide-react"
import styles from "./page.module.scss"
import ProgressIndicator from "@/components/progress-indicator"
import AccessibilityToolbar from "@/components/accessibility-toolbar"
import { useToast } from "@/hook/use-toast"

export default function OrderPage() {
    const { state, totalPrice, dispatch } = useCart()
    const router = useRouter()
    const [isProcessing, setIsProcessing] = useState(false)
    const [orderComplete, setOrderComplete] = useState(false)
    const [orderNumber, setOrderNumber] = useState("")
    const { success, error } = useToast()

    const formatPrice = (price: number) => {
        return `${price.toLocaleString()}${t("won", state.language)}`
    }

    const generateOrderNumber = () => {
        const now = new Date()
        const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "")
        const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, "")
        const randomStr = Math.random().toString(36).substr(2, 4).toUpperCase()
        return `${dateStr}${timeStr}${randomStr}`
    }

    const handlePayment = async () => {
        setIsProcessing(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            const newOrderNumber = generateOrderNumber()
            setOrderNumber(newOrderNumber)
            setOrderComplete(true)
            success("결제가 완료되었습니다!")
        } catch (err) {
            error("결제 중 오류가 발생했습니다.")
        } finally {
            setIsProcessing(false)
        }
    }

    const handleBackToMain = () => {
        dispatch({ type: "CLEAR_CART" })
        router.push("/")
    }

    if (orderComplete) {
        return (
            <div className={styles.orderPage}>
                <AccessibilityToolbar />
                <Header title={t("orderComplete", state.language)} showBack={false} showCart={false} />

                <div className={styles.successContainer}>
                    <div className={styles.successIcon}>
                        <Check />
                    </div>

                    <h2 className={styles.successTitle}>{t("orderComplete", state.language)}</h2>

                    <div className={styles.orderInfo}>
                        <div className={styles.orderNumberSection}>
                            <span className={styles.orderNumberLabel}>{t("orderNumber", state.language)}</span>
                            <span className={styles.orderNumberValue}>{orderNumber}</span>
                        </div>

                        <div className={styles.orderTypeInfo}>
                            {state.orderType === "dine_in" ? t("dineIn", state.language) : t("takeout", state.language)}
                        </div>
                    </div>

                    <button className={`btn btn-primary btn-large ${styles.backBtn}`} onClick={handleBackToMain}>
                        {t("backToMain", state.language)}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.orderPage}>
            <AccessibilityToolbar />
            <Header title={t("orderSummary", state.language)} showBack={true} showCart={false} />

            <div className={styles.container}>
                <ProgressIndicator currentStep={4} />
                <div className={styles.orderType}>
          <span className={styles.orderTypeLabel}>
            {state.orderType === "dine_in" ? t("dineIn", state.language) : t("takeout", state.language)}
          </span>
                </div>

                <div className={styles.orderItems}>
                    <h3 className={styles.sectionTitle}>주문 내역</h3>

                    {state.items.map((item, index) => (
                        <div key={index} className={styles.orderItem}>
                            <div className={styles.itemInfo}>
                <span className={styles.itemName}>
                  {state.language === "ko" ? item.menu.name_ko : item.menu.name_en}
                </span>

                                {Object.keys(item.selectedOptions).length > 0 && (
                                    <span className={styles.itemOptions}>
                    {Object.entries(item.selectedOptions)
                        .map(([key, value]) => value)
                        .join(", ")}
                  </span>
                                )}
                            </div>

                            <div className={styles.itemQuantity}>x{item.quantity}</div>

                            <div className={styles.itemPrice}>{formatPrice(item.totalPrice)}</div>
                        </div>
                    ))}
                </div>

                <div className={styles.summary}>
                    <div className={styles.totalSection}>
                        <span className={styles.totalLabel}>{t("total", state.language)}</span>
                        <span className={styles.totalPrice}>{formatPrice(totalPrice)}</span>
                    </div>

                    <button
                        className={`btn btn-primary btn-large ${styles.paymentBtn}`}
                        onClick={handlePayment}
                        disabled={isProcessing}
                    >
                        <CreditCard />
                        {isProcessing ? "결제 중..." : t("payment", state.language)}
                    </button>
                </div>
            </div>
        </div>
    )
}
