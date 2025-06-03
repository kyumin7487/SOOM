"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import type { Menu, CartItem } from "@/lib/types"
import { t } from "@/lib/translations"
import { Plus, AlertCircle } from "lucide-react"
import MenuModal from "./menu-modal"
import styles from "@/styles/menu-card.module.scss"

interface MenuCardProps {
    menu: Menu
}

export default function MenuCard({ menu }: MenuCardProps) {
    const { state } = useCart()
    const [showModal, setShowModal] = useState(false)

    const formatPrice = (price: number) => {
        return `${price.toLocaleString()}${t("won", state.language)}`
    }

    const handleQuickAdd = () => {
        if (menu.options && menu.options.length > 0) {
            setShowModal(true)
        } else {
            // 옵션이 없는 경우 바로 장바구니에 추가
            const cartItem: CartItem = {
                menu,
                quantity: 1,
                selectedOptions: {},
                totalPrice: menu.price,
            }
            // dispatch({ type: 'ADD_ITEM', payload: cartItem })
        }
    }

    return (
        <>
            <div className={styles.menuCard} onClick={() => setShowModal(true)}>
                <div className={styles.imageContainer}>
                    <img
                        src={menu.image || "/placeholder.svg?height=200&width=200"}
                        alt={state.language === "ko" ? menu.name_ko : menu.name_en}
                        className={styles.image}
                    />
                    <button
                        className={styles.quickAddBtn}
                        onClick={(e) => {
                            e.stopPropagation()
                            handleQuickAdd()
                        }}
                        aria-label={t("addToCart", state.language)}
                    >
                        <Plus />
                    </button>
                </div>

                <div className={styles.content}>
                    <h3 className={styles.name}>{state.language === "ko" ? menu.name_ko : menu.name_en}</h3>

                    <p className={styles.description}>{state.language === "ko" ? menu.description_ko : menu.description_en}</p>

                    <div className={styles.footer}>
                        <span className={styles.price}>{formatPrice(menu.price)}</span>

                        {menu.allergens && (
                            <div className={styles.allergens}>
                                <AlertCircle className={styles.allergenIcon} />
                                <span className={styles.allergenText}>{t("allergens", state.language)}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showModal && <MenuModal menu={menu} onClose={() => setShowModal(false)} />}
        </>
    )
}
