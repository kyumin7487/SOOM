"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import type { Menu, CartItem } from "@/lib/types"
import { t } from "@/lib/translations"
import { X, Plus, Minus, AlertCircle } from "lucide-react"
import styles from "@/styles/menu-modal.module.scss"

interface MenuModalProps {
    menu: Menu
    onClose: () => void
}

export default function MenuModal({ menu, onClose }: MenuModalProps) {
    const { state, dispatch } = useCart()
    const [quantity, setQuantity] = useState(1)
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})

    const formatPrice = (price: number) => {
        return `${price.toLocaleString()}${t("won", state.language)}`
    }

    const calculateTotalPrice = () => {
        let basePrice = menu.price

        // 옵션에 따른 가격 변동 계산
        if (menu.options) {
            menu.options.forEach((optionGroup) => {
                const selectedValue = selectedOptions[optionGroup.type]
                if (selectedValue) {
                    const option = optionGroup.options.find((opt) => opt.value === selectedValue)
                    if (option) {
                        basePrice += option.priceChange
                    }
                }
            })
        }

        return basePrice * quantity
    }

    const handleOptionChange = (optionType: string, value: string) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [optionType]: value,
        }))
    }

    const handleAddToCart = () => {
        const cartItem: CartItem = {
            menu,
            quantity,
            selectedOptions,
            totalPrice: calculateTotalPrice(),
        }

        dispatch({ type: "ADD_ITEM", payload: cartItem })
        onClose()
    }

    const isValidSelection = () => {
        if (!menu.options) return true

        return menu.options.every((optionGroup) => selectedOptions[optionGroup.type] !== undefined)
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>
                    <X />
                </button>

                <div className={styles.imageContainer}>
                    <img
                        src={menu.image || "/placeholder.svg?height=300&width=300"}
                        alt={state.language === "ko" ? menu.name_ko : menu.name_en}
                        className={styles.image}
                    />
                </div>

                <div className={styles.content}>
                    <h2 className={styles.name}>{state.language === "ko" ? menu.name_ko : menu.name_en}</h2>

                    <p className={styles.description}>{state.language === "ko" ? menu.description_ko : menu.description_en}</p>

                    {menu.allergens && (
                        <div className={styles.allergens}>
                            <AlertCircle className={styles.allergenIcon} />
                            <span>
                {t("allergens", state.language)}: {menu.allergens}
              </span>
                        </div>
                    )}

                    {menu.options &&
                        menu.options.map((optionGroup) => (
                            <div key={optionGroup.type} className={styles.optionGroup}>
                                <h3 className={styles.optionTitle}>
                                    {state.language === "ko" ? optionGroup.name_ko : optionGroup.name_en}
                                </h3>

                                <div className={styles.options}>
                                    {optionGroup.options.map((option) => (
                                        <button
                                            key={option.value}
                                            className={`${styles.optionBtn} ${
                                                selectedOptions[optionGroup.type] === option.value ? styles.selected : ""
                                            }`}
                                            onClick={() => handleOptionChange(optionGroup.type, option.value)}
                                        >
                      <span className={styles.optionName}>
                        {state.language === "ko" ? option.name_ko : option.name_en}
                      </span>
                                            {option.priceChange !== 0 && (
                                                <span className={styles.optionPrice}>
                          {option.priceChange > 0 ? "+" : ""}
                                                    {formatPrice(option.priceChange)}
                        </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                    <div className={styles.quantitySection}>
                        <span className={styles.quantityLabel}>{t("quantity", state.language)}</span>

                        <div className={styles.quantityControls}>
                            <button
                                className={styles.quantityBtn}
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                disabled={quantity <= 1}
                            >
                                <Minus />
                            </button>

                            <span className={styles.quantityValue}>{quantity}</span>

                            <button className={styles.quantityBtn} onClick={() => setQuantity(quantity + 1)}>
                                <Plus />
                            </button>
                        </div>
                    </div>

                    <div className={styles.footer}>
                        <div className={styles.totalPrice}>{formatPrice(calculateTotalPrice())}</div>

                        <button
                            className={`btn btn-primary btn-large ${styles.addBtn}`}
                            onClick={handleAddToCart}
                            disabled={!isValidSelection()}
                        >
                            {t("addToCart", state.language)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
