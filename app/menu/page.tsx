"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/contexts/cart-context"
import Header from "@/components/header"
import MenuCard from "@/components/menu-card"
import LoadingSkeleton from "@/components/loading-skeleton"
import type { Category, Menu } from "@/lib/types"
import { t } from "@/lib/translations"
import styles from "./page.module.scss"

// 임시 데이터 (실제로는 API에서 가져옴)
const mockCategories: Category[] = [
    { id: 1, name_ko: "커피", name_en: "Coffee", order: 1, isActive: true },
    { id: 2, name_ko: "음료", name_en: "Beverage", order: 2, isActive: true },
    { id: 3, name_ko: "디저트", name_en: "Dessert", order: 3, isActive: true },
]

const mockMenus: Menu[] = [
    {
        id: 1,
        name_ko: "아메리카노",
        name_en: "Americano",
        description_ko: "깔끔하고 진한 에스프레소의 맛",
        description_en: "Clean and rich espresso taste",
        price: 4500,
        image: "/placeholder.svg?height=200&width=200",
        isActive: true,
        order: 1,
        categoryId: 1,
        options: [
            {
                type: "temperature",
                name_ko: "온도",
                name_en: "Temperature",
                options: [
                    { value: "hot", name_ko: "뜨거움", name_en: "Hot", priceChange: 0 },
                    { value: "ice", name_ko: "차가움", name_en: "Iced", priceChange: 0 },
                ],
            },
            {
                type: "size",
                name_ko: "사이즈",
                name_en: "Size",
                options: [
                    { value: "regular", name_ko: "레귤러", name_en: "Regular", priceChange: 0 },
                    { value: "large", name_ko: "라지", name_en: "Large", priceChange: 500 },
                ],
            },
        ],
    },
    {
        id: 2,
        name_ko: "카페라떼",
        name_en: "Cafe Latte",
        description_ko: "부드러운 우유와 에스프레소의 조화",
        description_en: "Perfect harmony of smooth milk and espresso",
        price: 5500,
        image: "/placeholder.svg?height=200&width=200",
        isActive: true,
        order: 2,
        categoryId: 1,
        options: [
            {
                type: "temperature",
                name_ko: "온도",
                name_en: "Temperature",
                options: [
                    { value: "hot", name_ko: "뜨거움", name_en: "Hot", priceChange: 0 },
                    { value: "ice", name_ko: "차가움", name_en: "Iced", priceChange: 0 },
                ],
            },
        ],
    },
    {
        id: 3,
        name_ko: "자몽에이드",
        name_en: "Grapefruit Ade",
        description_ko: "상큼한 자몽의 새콤달콤한 맛",
        description_en: "Fresh and tangy grapefruit flavor",
        price: 6000,
        image: "/placeholder.svg?height=200&width=200",
        isActive: true,
        order: 1,
        categoryId: 2,
        options: [
            {
                type: "sweetness",
                name_ko: "당도",
                name_en: "Sweetness",
                options: [
                    { value: "less", name_ko: "덜 달게", name_en: "Less Sweet", priceChange: 0 },
                    { value: "normal", name_ko: "보통", name_en: "Normal", priceChange: 0 },
                    { value: "more", name_ko: "더 달게", name_en: "More Sweet", priceChange: 0 },
                ],
            },
        ],
    },
    {
        id: 4,
        name_ko: "치즈케이크",
        name_en: "Cheesecake",
        description_ko: "진한 크림치즈의 부드러운 케이크",
        description_en: "Smooth cake with rich cream cheese",
        price: 7500,
        image: "/placeholder.svg?height=200&width=200",
        isActive: true,
        order: 1,
        categoryId: 3,
        allergens: "유제품, 계란",
    },
]

export default function MenuPage() {
    const { state } = useCart()
    const [selectedCategory, setSelectedCategory] = useState<number>(1)
    const [categories, setCategories] = useState<Category[]>([])
    const [menus, setMenus] = useState<Menu[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // 실제로는 API 호출
        const loadData = async () => {
            setLoading(true)
            // 로딩 시뮬레이션
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setCategories(mockCategories)
            setMenus(mockMenus)
            setLoading(false)
        }

        loadData()
    }, [])

    const filteredMenus = menus.filter((menu) => menu.categoryId === selectedCategory && menu.isActive)

    if (loading) {
        return (
            <div className={styles.menuPage}>
                <Header
                    title={state.orderType === "dine_in" ? t("dineIn", state.language) : t("takeout", state.language)}
                    showBack={true}
                />
                <LoadingSkeleton />
            </div>
        )
    }

    return (
        <div className={styles.menuPage}>
            <Header
                title={state.orderType === "dine_in" ? t("dineIn", state.language) : t("takeout", state.language)}
                showBack={true}
            />

            <div className={styles.container}>
                <div className={styles.categories}>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`${styles.categoryBtn} ${selectedCategory === category.id ? styles.active : ""}`}
                            onClick={() => setSelectedCategory(category.id)}
                        >
                            {state.language === "ko" ? category.name_ko : category.name_en}
                        </button>
                    ))}
                </div>

                <div className={styles.menuGrid}>
                    {filteredMenus.map((menu) => (
                        <MenuCard key={menu.id} menu={menu} />
                    ))}
                </div>
            </div>
        </div>
    )
}
