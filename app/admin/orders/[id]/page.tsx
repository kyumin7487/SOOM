"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Clock, MapPin, CreditCard } from "lucide-react"
import type { Order } from "@/lib/types"
import styles from "./order-detail.module.scss"

interface OrderDetailPageProps {
    params: { id: string }
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
    const router = useRouter()
    const [order, setOrder] = useState<Order | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // 실제로는 API 호출
        const fetchOrder = async () => {
            setIsLoading(true)
            // 로딩 시뮬레이션
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Mock 데이터 - 실제로는 params.id로 특정 주문 조회
            const mockOrder: Order = {
                id: Number.parseInt(params.id),
                orderNumber: "ORD20230615001",
                orderType: "dine_in",
                totalPrice: 25000,
                status: "completed",
                createdAt: new Date("2023-06-15T14:30:00"),
                orderItems: [
                    {
                        id: 1,
                        menuId: 1,
                        quantity: 2,
                        price: 9000,
                        options: { temperature: "hot", size: "regular" },
                        menu: {
                            id: 1,
                            name_ko: "아메리카노",
                            name_en: "Americano",
                            description_ko: "깔끔하고 진한 에스프레소의 맛",
                            price: 4500,
                            isActive: true,
                            order: 1,
                            categoryId: 1,
                        },
                    },
                    {
                        id: 2,
                        menuId: 2,
                        quantity: 1,
                        price: 5500,
                        options: { temperature: "hot" },
                        menu: {
                            id: 2,
                            name_ko: "카페라떼",
                            name_en: "Cafe Latte",
                            description_ko: "부드러운 우유와 에스프레소의 조화",
                            price: 5500,
                            isActive: true,
                            order: 2,
                            categoryId: 1,
                        },
                    },
                    {
                        id: 3,
                        menuId: 4,
                        quantity: 1,
                        price: 7500,
                        options: {},
                        menu: {
                            id: 4,
                            name_ko: "치즈케이크",
                            name_en: "Cheesecake",
                            description_ko: "진한 크림치즈의 부드러운 케이크",
                            price: 7500,
                            isActive: true,
                            order: 1,
                            categoryId: 3,
                            allergens: "유제품, 계란",
                        },
                    },
                ],
            }

            setOrder(mockOrder)
            setIsLoading(false)
        }

        fetchOrder()
    }, [params.id])

    const getStatusText = (status: string) => {
        switch (status) {
            case "completed":
                return "완료"
            case "pending":
                return "진행중"
            case "cancelled":
                return "취소"
            default:
                return status
        }
    }

    const getOrderTypeText = (orderType: string) => {
        return orderType === "dine_in" ? "매장 이용" : "포장 주문"
    }

    const getTableInfo = (orderType: string) => {
        if (orderType === "dine_in") {
            // 실제로는 주문에 테이블 정보가 포함되어야 함
            return "테이블 5"
        }
        return "포장"
    }

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        })
    }

    const getOptionsText = (options: Record<string, string>) => {
        if (!options || Object.keys(options).length === 0) {
            return "기본"
        }

        const optionNames: Record<string, string> = {
            temperature: "온도",
            size: "사이즈",
            sweetness: "당도",
            ice: "얼음",
        }

        const valueNames: Record<string, string> = {
            hot: "뜨거움",
            ice: "차가움",
            regular: "레귤러",
            large: "라지",
            less: "덜 달게",
            normal: "보통",
            more: "더 달게",
        }

        return Object.entries(options)
            .map(([key, value]) => {
                const optionName = optionNames[key] || key
                const valueName = valueNames[value] || value
                return `${optionName}: ${valueName}`
            })
            .join(", ")
    }

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>주문 상세 정보 로딩 중...</p>
            </div>
        )
    }

    if (!order) {
        return (
            <div className={styles.errorContainer}>
                <h2>주문을 찾을 수 없습니다</h2>
                <button className={styles.backButton} onClick={() => router.back()}>
                    <ArrowLeft size={18} />
                    돌아가기
                </button>
            </div>
        )
    }

    return (
        <div className={styles.orderDetailPage}>
            <div className={styles.pageHeader}>
                <button className={styles.backButton} onClick={() => router.back()}>
                    <ArrowLeft size={18} />
                    돌아가기
                </button>
                <h1 className={styles.pageTitle}>주문 상세 정보</h1>
            </div>

            <div className={styles.orderInfo}>
                <div className={styles.orderHeader}>
                    <div className={styles.orderNumber}>
                        <h2>{order.orderNumber}</h2>
                        <span className={`${styles.status} ${styles[order.status]}`}>{getStatusText(order.status)}</span>
                    </div>
                </div>

                <div className={styles.orderMeta}>
                    <div className={styles.metaItem}>
                        <MapPin className={styles.metaIcon} />
                        <div className={styles.metaContent}>
                            <span className={styles.metaLabel}>주문 유형</span>
                            <span className={styles.metaValue}>
                {getOrderTypeText(order.orderType)} - {getTableInfo(order.orderType)}
              </span>
                        </div>
                    </div>

                    <div className={styles.metaItem}>
                        <Clock className={styles.metaIcon} />
                        <div className={styles.metaContent}>
                            <span className={styles.metaLabel}>주문 시간</span>
                            <span className={styles.metaValue}>{formatDate(order.createdAt)}</span>
                        </div>
                    </div>

                    <div className={styles.metaItem}>
                        <CreditCard className={styles.metaIcon} />
                        <div className={styles.metaContent}>
                            <span className={styles.metaLabel}>총 금액</span>
                            <span className={styles.metaValue}>{order.totalPrice.toLocaleString()}원</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.orderItems}>
                <h3 className={styles.sectionTitle}>주문 메뉴</h3>
                <div className={styles.itemsList}>
                    {order.orderItems.map((item) => (
                        <div key={item.id} className={styles.orderItem}>
                            <div className={styles.itemImage}>
                                <img src={item.menu.image || "/placeholder.svg?height=80&width=80"} alt={item.menu.name_ko} />
                            </div>

                            <div className={styles.itemInfo}>
                                <h4 className={styles.itemName}>{item.menu.name_ko}</h4>
                                <p className={styles.itemDescription}>{item.menu.description_ko}</p>
                                <div className={styles.itemOptions}>
                                    <span className={styles.optionsLabel}>옵션:</span>
                                    <span className={styles.optionsValue}>{getOptionsText(item.options || {})}</span>
                                </div>
                                {item.menu.allergens && (
                                    <div className={styles.itemAllergens}>
                                        <span className={styles.allergensLabel}>알레르기:</span>
                                        <span className={styles.allergensValue}>{item.menu.allergens}</span>
                                    </div>
                                )}
                            </div>

                            <div className={styles.itemQuantity}>
                                <span className={styles.quantityLabel}>수량</span>
                                <span className={styles.quantityValue}>×{item.quantity}</span>
                            </div>

                            <div className={styles.itemPrice}>
                                <span className={styles.unitPrice}>{(item.price / item.quantity).toLocaleString()}원</span>
                                <span className={styles.totalPrice}>{item.price.toLocaleString()}원</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.orderSummary}>
                <h3 className={styles.sectionTitle}>결제 정보</h3>
                <div className={styles.summaryContent}>
                    <div className={styles.summaryRow}>
                        <span className={styles.summaryLabel}>메뉴 금액</span>
                        <span className={styles.summaryValue}>
              {order.orderItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}원
            </span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span className={styles.summaryLabel}>할인</span>
                        <span className={styles.summaryValue}>0원</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span className={styles.summaryLabel}>부가세</span>
                        <span className={styles.summaryValue}>포함</span>
                    </div>
                    <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                        <span className={styles.summaryLabel}>총 결제 금액</span>
                        <span className={styles.summaryValue}>{order.totalPrice.toLocaleString()}원</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
