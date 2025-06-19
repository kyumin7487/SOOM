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
            const cartItem: CartItem = {
                menu,
                quantity: 1,
                selectedOptions: {},
                totalPrice: menu.price,
            }
            // 장바구니에 바로 추가하는 로직 추가 필요
        }
    }

    return (
        <>
            <div className={styles.menuCard} onClick={() => setShowModal(true)} role="button" tabIndex={0} onKeyPress={() => setShowModal(true)}>
                <div className={styles.imageContainer}>
                    <img
                        src={menu.image || "/placeholder.svg"}
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
                        <Plus size={20} />
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
