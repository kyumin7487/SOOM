"use client"

import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import CartItem from "@/components/cart-item"
import { t } from "@/lib/translations"
import { ShoppingBag } from "lucide-react"
import styles from "./page.module.scss"
import ProgressIndicator from "@/components/progress-indicator"
import ConfirmationDialog from "@/components/confirmation-dialog"
import AccessibilityToolbar from "@/components/accessibility-toolbar"
import { useState } from "react"

export default function CartPage() {
    const { state, totalPrice, dispatch } = useCart()
    const router = useRouter()
    const [showClearDialog, setShowClearDialog] = useState(false)

    const formatPrice = (price: number) => {
        return `${price.toLocaleString()}${t("won", state.language)}`
    }

    const handleOrder = () => {
        if (state.items.length > 0) {
            router.push("/order")
        }
    }

    const handleClearCart = () => {
        dispatch({ type: "CLEAR_CART" })
        setShowClearDialog(false)
    }

    if (state.items.length === 0) {
        return (
            <div className={styles.cartPage}>
                <AccessibilityToolbar />
                <Header title={t("cart", state.language)} showBack={true} showCart={false} />

                <div className={styles.emptyCart}>
                    <ShoppingBag className={styles.emptyIcon} />
                    <h2 className={styles.emptyTitle}>{t("empty", state.language)}</h2>
                    <button className="btn btn-primary btn-large" onClick={() => router.push("/menu")}>
                        메뉴 보러가기
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.cartPage}>
            <AccessibilityToolbar />
            <Header title={t("cart", state.language)} showBack={true} showCart={false} />

            <div className={styles.container}>
                <ProgressIndicator currentStep={3} />
                <div className={styles.orderType}>
          <span className={styles.orderTypeLabel}>
            {state.orderType === "dine_in" ? t("dineIn", state.language) : t("takeout", state.language)}
          </span>
                </div>

                <div className={styles.cartItems}>
                    {state.items.map((item, index) => (
                        <CartItem key={index} item={item} index={index} />
                    ))}
                </div>

                <div className={styles.summary}>
                    <div className={styles.totalSection}>
                        <span className={styles.totalLabel}>{t("total", state.language)}</span>
                        <span className={styles.totalPrice}>{formatPrice(totalPrice)}</span>
                    </div>

                    <button className={`btn btn-primary btn-large ${styles.orderBtn}`} onClick={handleOrder}>
                        {t("order", state.language)}
                    </button>
                </div>
                <ConfirmationDialog
                    isOpen={showClearDialog}
                    title="장바구니 비우기"
                    message="장바구니의 모든 상품이 삭제됩니다. 계속하시겠습니까?"
                    onConfirm={handleClearCart}
                    onCancel={() => setShowClearDialog(false)}
                    type="warning"
                />
            </div>
        </div>
    )
}
