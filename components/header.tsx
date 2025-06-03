"use client"

import { useCart } from "@/contexts/cart-context"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import LanguageSelector from "./language-selector"
import { t } from "@/lib/translations"
import styles from "./header.module.scss"

interface HeaderProps {
    title?: string
    showBack?: boolean
    showCart?: boolean
}

export default function Header({ title, showBack = false, showCart = true }: HeaderProps) {
    const { state, totalItems } = useCart()
    const router = useRouter()

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.left}>
                    {showBack && (
                        <button className={styles.backBtn} onClick={() => router.back()} aria-label={t("back", state.language)}>
                            <ArrowLeft />
                        </button>
                    )}
                    {title && <h1 className={styles.title}>{title}</h1>}
                </div>

                <div className={styles.right}>
                    <LanguageSelector />
                    {showCart && (
                        <button
                            className={styles.cartBtn}
                            onClick={() => router.push("/cart")}
                            aria-label={`${t("cart", state.language)} (${totalItems})`}
                        >
                            <ShoppingCart />
                            {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
                        </button>
                    )}
                </div>
            </div>
        </header>
    )
}
