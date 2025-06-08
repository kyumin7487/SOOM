"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { Clock, Star } from "lucide-react"
import type { Menu } from "@/lib/types"
import { t } from "@/lib/translations"
import styles from "./quick-order.module.scss"

interface QuickOrderProps {
    popularMenus: Menu[]
    recentOrders: Menu[]
}

export default function QuickOrder({ popularMenus, recentOrders }: QuickOrderProps) {
    const { state, dispatch } = useCart()
    const [activeTab, setActiveTab] = useState<"popular" | "recent">("popular")

    const handleQuickAdd = (menu: Menu) => {
        const cartItem = {
            menu,
            quantity: 1,
            selectedOptions: {},
            totalPrice: menu.price,
        }
        dispatch({ type: "ADD_ITEM", payload: cartItem })
    }

    const formatPrice = (price: number) => {
        return `${price.toLocaleString()}${t("won", state.language)}`
    }

    return (
        <div className={styles.quickOrder}>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === "popular" ? styles.active : ""}`}
                    onClick={() => setActiveTab("popular")}
                >
                    <Star className={styles.tabIcon} />
                    <span>{state.language === "ko" ? "인기 메뉴" : "Popular"}</span>
                </button>

                <button
                    className={`${styles.tab} ${activeTab === "recent" ? styles.active : ""}`}
                    onClick={() => setActiveTab("recent")}
                >
                    <Clock className={styles.tabIcon} />
                    <span>{state.language === "ko" ? "최근 주문" : "Recent"}</span>
                </button>
            </div>

            <div className={styles.menuList}>
                {(activeTab === "popular" ? popularMenus : recentOrders).map((menu) => (
                    <div key={menu.id} className={styles.quickMenuItem}>
                        <img
                            src={menu.image || "/placeholder.svg?height=60&width=60"}
                            alt={state.language === "ko" ? menu.name_ko : menu.name_en}
                            className={styles.menuImage}
                        />

                        <div className={styles.menuInfo}>
                            <h4 className={styles.menuName}>{state.language === "ko" ? menu.name_ko : menu.name_en}</h4>
                            <span className={styles.menuPrice}>{formatPrice(menu.price)}</span>
                        </div>

                        <button
                            className={styles.quickAddBtn}
                            onClick={() => handleQuickAdd(menu)}
                            aria-label={`${state.language === "ko" ? menu.name_ko : menu.name_en} ${t("addToCart", state.language)}`}
                        >
                            +
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
