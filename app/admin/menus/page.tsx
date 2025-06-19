"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Search, Filter, ImageIcon } from "lucide-react"
import type { Menu, Category } from "@/lib/types"
import styles from "./menus.module.scss"

export default function AdminMenusPage() {
    const [menus, setMenus] = useState<Menu[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentMenu, setCurrentMenu] = useState<Menu | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState<number | "all">("all")
    const [tempImage, setTempImage] = useState<string>("") // 업로드 시 임시 미리보기용

    const [formData, setFormData] = useState({
        name_ko: "",
        name_en: "",
        description_ko: "",
        description_en: "",
        price: 0,
        categoryId: 1,
        isActive: true,
        image: "",
        order: 0,
        allergens: "",
    })

    useEffect(() => {
        // 실제로는 API 호출
        const fetchData = async () => {
            setIsLoading(true)
            // 로딩 시뮬레이션
            await new Promise((resolve) => setTimeout(resolve, 1000))

            setCategories([
                { id: 1, name_ko: "커피", name_en: "Coffee", order: 1, isActive: true },
                { id: 2, name_ko: "음료", name_en: "Beverage", order: 2, isActive: true },
                { id: 3, name_ko: "디저트", name_en: "Dessert", order: 3, isActive: true },
            ])

            setMenus([
                {
                    id: 1,
                    name_ko: "아메리카노",
                    name_en: "Americano",
                    description_ko: "깔끔하고 진한 에스프레소의 맛",
                    description_en: "Clean and rich espresso taste",
                    price: 4500,
                    image: "/Americano.jpeg",
                    isActive: true,
                    order: 1,
                    categoryId: 1,
                },
                {
                    id: 2,
                    name_ko: "카페라떼",
                    name_en: "Cafe Latte",
                    description_ko: "부드러운 우유와 에스프레소의 조화",
                    description_en: "Perfect harmony of smooth milk and espresso",
                    price: 5500,
                    image: "/CafeLatte.jpg",
                    isActive: true,
                    order: 2,
                    categoryId: 1,
                },
                {
                    id: 3,
                    name_ko: "자몽에이드",
                    name_en: "Grapefruit Ade",
                    description_ko: "상큼한 자몽의 새콤달콤한 맛",
                    description_en: "Fresh and tangy grapefruit flavor",
                    price: 6000,
                    image: "/GrapefruitAde.jpg",
                    isActive: true,
                    order: 1,
                    categoryId: 2,
                },
                {
                    id: 4,
                    name_ko: "치즈케이크",
                    name_en: "Cheesecake",
                    description_ko: "진한 크림치즈의 부드러운 케이크",
                    description_en: "Smooth cake with rich cream cheese",
                    price: 7500,
                    image: "/Cheesecake.jpg",
                    isActive: true,
                    order: 1,
                    categoryId: 3,
                    allergens: "유제품, 계란",
                },
            ])

            setIsLoading(false)
        }

        fetchData()
    }, [])

    const handleOpenModal = (menu: Menu | null = null) => {
        if (menu) {
            setCurrentMenu(menu)
            setFormData({
                name_ko: menu.name_ko,
                name_en: menu.name_en,
                description_ko: menu.description_ko || "",
                description_en: menu.description_en || "",
                price: menu.price,
                categoryId: menu.categoryId,
                isActive: menu.isActive,
                image: menu.image || "",
                order: menu.order,
                allergens: menu.allergens || "",
            })
            setTempImage("") // 기존 이미지일 땐 임시 이미지 초기화
        } else {
            setCurrentMenu(null)
            setFormData({
                name_ko: "",
                name_en: "",
                description_ko: "",
                description_en: "",
                price: 0,
                categoryId: categories[0]?.id || 1,
                isActive: true,
                image: "",
                order: 0,
                allergens: "",
            })
            setTempImage("")
        }
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setTempImage("")
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target as HTMLInputElement
        setFormData({
            ...formData,
            [name]:
                type === "checkbox"
                    ? (e.target as HTMLInputElement).checked
                    : type === "number"
                        ? Number.parseInt(value)
                        : value,
        })
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // 임시 미리보기용 URL 생성
            const imageUrl = URL.createObjectURL(file)
            setTempImage(imageUrl)
            // 실제 저장용 formData.image는 업로드 후 서버에서 받아야 함 (여기선 비워둠)
            setFormData({
                ...formData,
                image: "",
            })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // 실제로는 서버에 업로드 후 image URL 받아서 저장해야 함
        // 여기선 임시 이미지 없으면 formData.image 그대로, 아니면 formData.image 대신 임시 이미지 URL 저장(테스트용)
        const imageToSave = tempImage || formData.image

        if (currentMenu) {
            // 수정
            const updatedMenus = menus.map((menu) =>
                menu.id === currentMenu.id ? { ...menu, ...formData, image: imageToSave } : menu
            )
            setMenus(updatedMenus)
        } else {
            // 추가
            const newMenu: Menu = {
                id: Math.max(0, ...menus.map((m) => m.id)) + 1,
                ...formData,
                image: imageToSave,
            }
            setMenus([...menus, newMenu])
        }

        handleCloseModal()
    }

    const handleDelete = async (id: number) => {
        if (window.confirm("정말로 이 메뉴를 삭제하시겠습니까?")) {
            setMenus(menus.filter((menu) => menu.id !== id))
        }
    }

    const filteredMenus = menus.filter((menu) => {
        const matchesSearch =
            menu.name_ko.toLowerCase().includes(searchTerm.toLowerCase()) ||
            menu.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
            menu.description_ko?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            menu.description_en?.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory = categoryFilter === "all" || menu.categoryId === categoryFilter

        return matchesSearch && matchesCategory
    })

    const getCategoryName = (categoryId: number) => {
        const category = categories.find((cat) => cat.id === categoryId)
        return category ? category.name_ko : "알 수 없음"
    }

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>메뉴 로딩 중...</p>
            </div>
        )
    }

    return (
        <div className={styles.menusPage}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>메뉴 관리</h1>
                <button className={styles.addButton} onClick={() => handleOpenModal()}>
                    <Plus size={18} />
                    메뉴 추가
                </button>
            </div>

            <div className={styles.filters}>
                <div className={styles.searchBox}>
                    <Search size={18} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="메뉴 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.categoryFilter}>
                    <Filter size={18} className={styles.filterIcon} />
                    <select
                        value={categoryFilter}
                        onChange={(e) =>
                            setCategoryFilter(e.target.value === "all" ? "all" : Number.parseInt(e.target.value))
                        }
                        className={styles.filterSelect}
                    >
                        <option value="all">모든 카테고리</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name_ko}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles.menusGrid}>
                {filteredMenus.map((menu) => (
                    <div key={menu.id} className={styles.menuCard}>
                        <div className={styles.menuImageContainer}>
                            <img
                                src={menu.image || "/placeholder.svg?height=200&width=200"}
                                alt={menu.name_ko}
                                className={styles.menuImage}
                            />
                            {!menu.isActive && <div className={styles.inactiveOverlay}>비활성화</div>}
                        </div>
                        <div className={styles.menuContent}>
                            <div className={styles.menuHeader}>
                                <h3 className={styles.menuName}>{menu.name_ko}</h3>
                                <span className={styles.menuPrice}>{menu.price.toLocaleString()}원</span>
                            </div>
                            <p className={styles.menuDescription}>{menu.description_ko}</p>
                            <div className={styles.menuMeta}>
                                <span className={styles.menuCategory}>{getCategoryName(menu.categoryId)}</span>
                                {menu.allergens && <span className={styles.menuAllergens}>알레르기: {menu.allergens}</span>}
                            </div>
                            <div className={styles.menuActions}>
                                <button className={`${styles.actionButton} ${styles.editButton}`} onClick={() => handleOpenModal(menu)}>
                                    <Edit size={16} />
                                    수정
                                </button>
                                <button
                                    className={`${styles.actionButton} ${styles.deleteButton}`}
                                    onClick={() => handleDelete(menu.id)}
                                >
                                    <Trash2 size={16} />
                                    삭제
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredMenus.length === 0 && (
                <div className={styles.noResults}>
                    <p>검색 결과가 없습니다.</p>
                </div>
            )}

            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h2 className={styles.modalTitle}>{currentMenu ? "메뉴 수정" : "메뉴 추가"}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name_ko">메뉴명 (한국어)</label>
                                    <input
                                        type="text"
                                        id="name_ko"
                                        name="name_ko"
                                        value={formData.name_ko}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name_en">메뉴명 (영어)</label>
                                    <input
                                        type="text"
                                        id="name_en"
                                        name="name_en"
                                        value={formData.name_en}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="description_ko">설명 (한국어)</label>
                                    <textarea
                                        id="description_ko"
                                        name="description_ko"
                                        value={formData.description_ko}
                                        onChange={handleInputChange}
                                        rows={3}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="description_en">설명 (영어)</label>
                                    <textarea
                                        id="description_en"
                                        name="description_en"
                                        value={formData.description_en}
                                        onChange={handleInputChange}
                                        rows={3}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="price">가격</label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        min="0"
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="categoryId">카테고리</label>
                                    <select
                                        id="categoryId"
                                        name="categoryId"
                                        value={formData.categoryId}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name_ko}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="order">출력 순서</label>
                                    <input
                                        type="number"
                                        id="order"
                                        name="order"
                                        value={formData.order}
                                        onChange={handleInputChange}
                                        min="0"
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="allergens">알레르기 정보</label>
                                    <input
                                        type="text"
                                        id="allergens"
                                        name="allergens"
                                        value={formData.allergens}
                                        onChange={handleInputChange}
                                        placeholder="예: 유제품, 견과류"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            name="isActive"
                                            checked={formData.isActive}
                                            onChange={handleInputChange}
                                        />
                                        활성화
                                    </label>
                                </div>
                            </div>

                            <div className={styles.imageUploadSection}>
                                <label htmlFor="image" className={styles.imageUploadLabel}>
                                    <div className={styles.imagePreview}>
                                        {tempImage || formData.image ? (
                                            <img src={tempImage || formData.image} alt="메뉴 이미지 미리보기" />
                                        ) : (
                                            <div className={styles.uploadPlaceholder}>
                                                <ImageIcon size={32} />
                                                <span>이미지 업로드</span>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        className={styles.imageInput}
                                    />
                                </label>
                            </div>

                            <div className={styles.modalActions}>
                                <button type="button" className={styles.cancelButton} onClick={handleCloseModal}>
                                    취소
                                </button>
                                <button type="submit" className={styles.submitButton}>
                                    {currentMenu ? "수정" : "추가"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
