"use client"

import { useCart } from "@/contexts/cart-context"
import type { CartItem as CartItemType } from "@/lib/types"
import { t } from "@/lib/translations"
import { Plus, Minus, Trash2 } from "lucide-react"
import styles from "@/styles/cart-item.module.scss"

interface CartItemProps {
    item: CartItemType
    index: number
}

export default function CartItem({ item, index }: CartItemProps) {
    const { state, dispatch } = useCart()

    const formatPrice = (price: number) => {
        return `${price.toLocaleString()}${t("won", state.language)}`
    }

    const handleQuantityChange = (newQuantity: number) => {
        dispatch({
            type: "UPDATE_QUANTITY",
            payload: { index, quantity: newQuantity },
        })
    }

    const handleRemove = () => {
        dispatch({ type: "REMOVE_ITEM", payload: index })
    }

    const getOptionsText = () => {
        if (!item.selectedOptions || Object.keys(item.selectedOptions).length === 0) {
            return null
        }

        const optionsArray = Object.entries(item.selectedOptions).map(([key, value]) => {
            const optionNames: Record<string, { ko: string; en: string }> = {
                temperature: { ko: "온도", en: "Temperature" },
                size: { ko: "사이즈", en: "Size" },
                sweetness: { ko: "당도", en: "Sweetness" },
                ice: { ko: "얼음", en: "Ice" },
            }

            const valueNames: Record<string, { ko: string; en: string }> = {
                hot: { ko: "뜨거움", en: "Hot" },
                ice: { ko: "차가움", en: "Iced" },
                regular: { ko: "레귤러", en: "Regular" },
                large: { ko: "라지", en: "Large" },
                less: { ko: "덜 달게", en: "Less Sweet" },
                normal: { ko: "보통", en: "Normal" },
                more: { ko: "더 달게", en: "More Sweet" },
            }

            const optionName = optionNames[key]?.[state.language] || key
            const valueName = valueNames[value]?.[state.language] || value

            return `${optionName}: ${valueName}`
        })

        return optionsArray.join(", ")
    }

    return (
        <div className={styles.cartItem}>
            <div className={styles.imageContainer}>
                <img
                    src={item.menu.image || "/placeholder.svg?height=80&width=80"}
                    alt={state.language === "ko" ? item.menu.name_ko : item.menu.name_en}
                    className={styles.image}
                />
            </div>

            <div className={styles.content}>
                <div className={styles.info}>
                    <h3 className={styles.name}>{state.language === "ko" ? item.menu.name_ko : item.menu.name_en}</h3>

                    {getOptionsText() && <p className={styles.options}>{getOptionsText()}</p>}

                    <div className={styles.priceInfo}>
                        <span className={styles.unitPrice}>{formatPrice(item.totalPrice / item.quantity)}</span>
                        <span className={styles.totalPrice}>{formatPrice(item.totalPrice)}</span>
                    </div>
                </div>

                <div className={styles.controls}>
                    <div className={styles.quantityControls}>
                        <button
                            className={styles.quantityBtn}
                            onClick={() => handleQuantityChange(item.quantity - 1)}
                            disabled={item.quantity <= 1}
                        >
                            <Minus />
                        </button>

                        <span className={styles.quantity}>{item.quantity}</span>

                        <button className={styles.quantityBtn} onClick={() => handleQuantityChange(item.quantity + 1)}>
                            <Plus />
                        </button>
                    </div>

                    <button className={styles.removeBtn} onClick={handleRemove} aria-label="Remove item">
                        <Trash2 />
                    </button>
                </div>
            </div>
        </div>
    )
}
