"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, MoveUp, MoveDown } from "lucide-react"
import type { Category } from "@/lib/types"
import styles from "./categories.module.scss"

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null)
    const [formData, setFormData] = useState({
        name_ko: "",
        name_en: "",
        isActive: true,
    })

    useEffect(() => {
        // 실제로는 API 호출
        const fetchCategories = async () => {
            setIsLoading(true)
            // 로딩 시뮬레이션
            await new Promise((resolve) => setTimeout(resolve, 1000))

            setCategories([
                { id: 1, name_ko: "커피", name_en: "Coffee", order: 1, isActive: true },
                { id: 2, name_ko: "음료", name_en: "Beverage", order: 2, isActive: true },
                { id: 3, name_ko: "디저트", name_en: "Dessert", order: 3, isActive: true },
                { id: 4, name_ko: "시즌 메뉴", name_en: "Seasonal", order: 4, isActive: false },
            ])

            setIsLoading(false)
        }

        fetchCategories()
    }, [])

    const handleOpenModal = (category: Category | null = null) => {
        if (category) {
            setCurrentCategory(category)
            setFormData({
                name_ko: category.name_ko,
                name_en: category.name_en,
                isActive: category.isActive,
            })
        } else {
            setCurrentCategory(null)
            setFormData({
                name_ko: "",
                name_en: "",
                isActive: true,
            })
        }
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // 실제로는 API 호출
        if (currentCategory) {
            // 수정
            const updatedCategories = categories.map((cat) => (cat.id === currentCategory.id ? { ...cat, ...formData } : cat))
            setCategories(updatedCategories)
        } else {
            // 추가
            const newCategory: Category = {
                id: Math.max(0, ...categories.map((c) => c.id)) + 1,
                order: categories.length + 1,
                ...formData,
            }
            setCategories([...categories, newCategory])
        }

        handleCloseModal()
    }

    const handleDelete = async (id: number) => {
        if (window.confirm("정말로 이 카테고리를 삭제하시겠습니까?")) {
            // 실제로는 API 호출
            setCategories(categories.filter((cat) => cat.id !== id))
        }
    }

    const handleMoveUp = (index: number) => {
        if (index <= 0) return

        const newCategories = [...categories]
        const temp = newCategories[index].order
        newCategories[index].order = newCategories[index - 1].order
        newCategories[index - 1].order = temp

        // 순서에 따라 정렬
        newCategories.sort((a, b) => a.order - b.order)
        setCategories(newCategories)
    }

    const handleMoveDown = (index: number) => {
        if (index >= categories.length - 1) return

        const newCategories = [...categories]
        const temp = newCategories[index].order
        newCategories[index].order = newCategories[index + 1].order
        newCategories[index + 1].order = temp

        // 순서에 따라 정렬
        newCategories.sort((a, b) => a.order - b.order)
        setCategories(newCategories)
    }

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>카테고리 로딩 중...</p>
            </div>
        )
    }

    return (
        <div className={styles.categoriesPage}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>카테고리 관리</h1>
                <button className={styles.addButton} onClick={() => handleOpenModal()}>
                    <Plus size={18} />
                    카테고리 추가
                </button>
            </div>

            <div className={styles.categoriesTable}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>순서</th>
                        <th>카테고리명 (한국어)</th>
                        <th>카테고리명 (영어)</th>
                        <th>상태</th>
                        <th>순서 변경</th>
                        <th>작업</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((category, index) => (
                        <tr key={category.id}>
                            <td>{category.order}</td>
                            <td>{category.name_ko}</td>
                            <td>{category.name_en}</td>
                            <td>
                  <span className={`${styles.status} ${category.isActive ? styles.active : styles.inactive}`}>
                    {category.isActive ? "활성화" : "비활성화"}
                  </span>
                            </td>
                            <td>
                                <div className={styles.orderButtons}>
                                    <button className={styles.orderButton} onClick={() => handleMoveUp(index)} disabled={index === 0}>
                                        <MoveUp size={16} />
                                    </button>
                                    <button
                                        className={styles.orderButton}
                                        onClick={() => handleMoveDown(index)}
                                        disabled={index === categories.length - 1}
                                    >
                                        <MoveDown size={16} />
                                    </button>
                                </div>
                            </td>
                            <td>
                                <div className={styles.actions}>
                                    <button
                                        className={`${styles.actionButton} ${styles.editButton}`}
                                        onClick={() => handleOpenModal(category)}
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        className={`${styles.actionButton} ${styles.deleteButton}`}
                                        onClick={() => handleDelete(category.id)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h2 className={styles.modalTitle}>{currentCategory ? "카테고리 수정" : "카테고리 추가"}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name_ko">카테고리명 (한국어)</label>
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
                                <label htmlFor="name_en">카테고리명 (영어)</label>
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
                                <label className={styles.checkboxLabel}>
                                    <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} />
                                    활성화
                                </label>
                            </div>
                            <div className={styles.modalActions}>
                                <button type="button" className={styles.cancelButton} onClick={handleCloseModal}>
                                    취소
                                </button>
                                <button type="submit" className={styles.submitButton}>
                                    {currentCategory ? "수정" : "추가"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
