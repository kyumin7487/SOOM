"use client"

import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import CartItem from "@/components/cart-item"
import { t } from "@/lib/translations"
import { ShoppingBag } from "lucide-react"
import styles from "./page.module.scss"

export default function CartPage() {
    const { state, totalPrice } = useCart()
    const router = useRouter()

    const formatPrice = (price: number) => {
        return `${price.toLocaleString()}${t("won", state.language)}`
    }

    const handleOrder = () => {
        if (state.items.length > 0) {
            router.push("/order")
        }
    }

    if (state.items.length === 0) {
        return (
            <div className={styles.cartPage}>
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
            <Header title={t("cart", state.language)} showBack={true} showCart={false} />

            <div className={styles.container}>
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
            </div>
        </div>
    )
}
