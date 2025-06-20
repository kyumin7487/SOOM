"use client"

import { useState, useEffect } from "react"
import { Search, Eye, Filter } from "lucide-react"
import Link from "next/link"
import type { Order } from "@/lib/types"
import styles from "./orders.module.scss"

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [dateFilter, setDateFilter] = useState<"today" | "week" | "month">("today")
    const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "pending" | "cancelled">("all")

    useEffect(() => {
        // 실제로는 API 호출
        const fetchOrders = async () => {
            setIsLoading(true)
            // 로딩 시뮬레이션
            await new Promise((resolve) => setTimeout(resolve, 1000))

            const mockOrders: Order[] = [
                {
                    id: 1,
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
                                price: 7500,
                                isActive: true,
                                order: 1,
                                categoryId: 3,
                            },
                        },
                    ],
                },
                {
                    id: 2,
                    orderNumber: "ORD20230615002",
                    orderType: "takeout",
                    totalPrice: 18500,
                    status: "completed",
                    createdAt: new Date("2023-06-15T15:45:00"),
                    orderItems: [
                        {
                            id: 4,
                            menuId: 1,
                            quantity: 3,
                            price: 13500,
                            options: { temperature: "ice", size: "regular" },
                            menu: {
                                id: 1,
                                name_ko: "아메리카노",
                                name_en: "Americano",
                                price: 4500,
                                isActive: true,
                                order: 1,
                                categoryId: 1,
                            },
                        },
                        {
                            id: 5,
                            menuId: 3,
                            quantity: 1,
                            price: 6000,
                            options: { sweetness: "normal" },
                            menu: {
                                id: 3,
                                name_ko: "자몽에이드",
                                name_en: "Grapefruit Ade",
                                price: 6000,
                                isActive: true,
                                order: 1,
                                categoryId: 2,
                            },
                        },
                    ],
                },
                {
                    id: 3,
                    orderNumber: "ORD20230615003",
                    orderType: "dine_in",
                    totalPrice: 32000,
                    status: "completed",
                    createdAt: new Date("2023-06-15T16:20:00"),
                    orderItems: [
                        {
                            id: 6,
                            menuId: 2,
                            quantity: 2,
                            price: 11000,
                            options: { temperature: "hot" },
                            menu: {
                                id: 2,
                                name_ko: "카페라떼",
                                name_en: "Cafe Latte",
                                price: 5500,
                                isActive: true,
                                order: 2,
                                categoryId: 1,
                            },
                        },
                        {
                            id: 7,
                            menuId: 4,
                            quantity: 2,
                            price: 15000,
                            options: {},
                            menu: {
                                id: 4,
                                name_ko: "치즈케이크",
                                name_en: "Cheesecake",
                                price: 7500,
                                isActive: true,
                                order: 1,
                                categoryId: 3,
                            },
                        },
                        {
                            id: 8,
                            menuId: 3,
                            quantity: 1,
                            price: 6000,
                            options: { sweetness: "less" },
                            menu: {
                                id: 3,
                                name_ko: "자몽에이드",
                                name_en: "Grapefruit Ade",
                                price: 6000,
                                isActive: true,
                                order: 1,
                                categoryId: 2,
                            },
                        },
                    ],
                },
                {
                    id: 4,
                    orderNumber: "ORD20230614001",
                    orderType: "takeout",
                    totalPrice: 15000,
                    status: "completed",
                    createdAt: new Date("2023-06-14T17:10:00"),
                    orderItems: [
                        {
                            id: 9,
                            menuId: 1,
                            quantity: 2,
                            price: 9000,
                            options: { temperature: "ice", size: "large" },
                            menu: {
                                id: 1,
                                name_ko: "아메리카노",
                                name_en: "Americano",
                                price: 4500,
                                isActive: true,
                                order: 1,
                                categoryId: 1,
                            },
                        },
                        {
                            id: 10,
                            menuId: 3,
                            quantity: 1,
                            price: 6000,
                            options: { sweetness: "more" },
                            menu: {
                                id: 3,
                                name_ko: "자몽에이드",
                                name_en: "Grapefruit Ade",
                                price: 6000,
                                isActive: true,
                                order: 1,
                                categoryId: 2,
                            },
                        },
                    ],
                },
                {
                    id: 5,
                    orderNumber: "ORD20230613001",
                    orderType: "dine_in",
                    totalPrice: 22500,
                    status: "completed",
                    createdAt: new Date("2023-06-13T18:05:00"),
                    orderItems: [
                        {
                            id: 11,
                            menuId: 2,
                            quantity: 3,
                            price: 16500,
                            options: { temperature: "hot" },
                            menu: {
                                id: 2,
                                name_ko: "카페라떼",
                                name_en: "Cafe Latte",
                                price: 5500,
                                isActive: true,
                                order: 2,
                                categoryId: 1,
                            },
                        },
                        {
                            id: 12,
                            menuId: 3,
                            quantity: 1,
                            price: 6000,
                            options: { sweetness: "normal" },
                            menu: {
                                id: 3,
                                name_ko: "자몽에이드",
                                name_en: "Grapefruit Ade",
                                price: 6000,
                                isActive: true,
                                order: 1,
                                categoryId: 2,
                            },
                        },
                    ],
                },
            ]

            setOrders(mockOrders)
            setIsLoading(false)
        }

        fetchOrders()
    }, [])

    const getFilteredOrders = () => {
        const now = new Date()
        let filteredByDate = orders

        // 날짜 필터링
        switch (dateFilter) {
            case "today":
                filteredByDate = orders.filter((order) => {
                    const orderDate = new Date(order.createdAt)
                    return orderDate.toDateString() === now.toDateString()
                })
                break
            case "week":
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
                filteredByDate = orders.filter((order) => {
                    const orderDate = new Date(order.createdAt)
                    return orderDate >= weekAgo
                })
                break
            case "month":
                const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
                filteredByDate = orders.filter((order) => {
                    const orderDate = new Date(order.createdAt)
                    return orderDate >= monthAgo
                })
                break
        }

        // 상태 필터링
        let filteredByStatus = filteredByDate
        if (statusFilter !== "all") {
            filteredByStatus = filteredByDate.filter((order) => order.status === statusFilter)
        }

        // 검색 필터링
        let filteredBySearch = filteredByStatus
        if (searchTerm) {
            filteredBySearch = filteredByStatus.filter(
                (order) =>
                    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.orderItems.some(
                        (item) =>
                            item.menu.name_ko.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.menu.name_en.toLowerCase().includes(searchTerm.toLowerCase()),
                    ),
            )
        }

        // 최신순 정렬
        return filteredBySearch.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    const filteredOrders = getFilteredOrders()

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

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const getTotalStats = () => {
        const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.totalPrice, 0)
        const totalOrders = filteredOrders.length
        const averageOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0

        return { totalRevenue, totalOrders, averageOrder }
    }

    const stats = getTotalStats()

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>주문 내역 로딩 중...</p>
            </div>
        )
    }

    return (
        <div className={styles.ordersPage}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>주문 내역</h1>
            </div>

            <div className={styles.statsCards}>
                <div className={styles.statCard}>
                    <h3>총 매출</h3>
                    <p className={styles.statValue}>{stats.totalRevenue.toLocaleString()}원</p>
                </div>
                <div className={styles.statCard}>
                    <h3>총 주문 수</h3>
                    <p className={styles.statValue}>{stats.totalOrders}건</p>
                </div>
                <div className={styles.statCard}>
                    <h3>평균 주문 금액</h3>
                    <p className={styles.statValue}>{Math.round(stats.averageOrder).toLocaleString()}원</p>
                </div>
            </div>

            <div className={styles.filters}>
                <div className={styles.dateFilters}>
                    <button
                        className={`${styles.dateFilterBtn} ${dateFilter === "today" ? styles.active : ""}`}
                        onClick={() => setDateFilter("today")}
                    >
                        오늘
                    </button>
                    <button
                        className={`${styles.dateFilterBtn} ${dateFilter === "week" ? styles.active : ""}`}
                        onClick={() => setDateFilter("week")}
                    >
                        이번 주
                    </button>
                    <button
                        className={`${styles.dateFilterBtn} ${dateFilter === "month" ? styles.active : ""}`}
                        onClick={() => setDateFilter("month")}
                    >
                        이번 달
                    </button>
                </div>

                <div className={styles.rightFilters}>
                    <div className={styles.statusFilter}>
                        <Filter size={18} className={styles.filterIcon} />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as any)}
                            className={styles.filterSelect}
                        >
                            <option value="all">모든 상태</option>
                            <option value="completed">완료</option>
                            <option value="pending">진행중</option>
                            <option value="cancelled">취소</option>
                        </select>
                    </div>

                    <div className={styles.searchBox}>
                        <Search size={18} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="주문번호 또는 메뉴 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.ordersTable}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>주문번호</th>
                        <th>주문 유형</th>
                        <th>메뉴 (수량)</th>
                        <th>총 금액</th>
                        <th>상태</th>
                        <th>주문 시간</th>
                        <th>상세</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredOrders.map((order) => (
                        <tr key={order.id}>
                            <td className={styles.orderNumber}>{order.orderNumber}</td>
                            <td>{getOrderTypeText(order.orderType)}</td>
                            <td className={styles.menuItems}>
                                {order.orderItems.slice(0, 2).map((item, index) => (
                                    <div key={index} className={styles.menuItem}>
                                        {item.menu.name_ko} ({item.quantity}개)
                                    </div>
                                ))}
                                {order.orderItems.length > 2 && (
                                    <div className={styles.moreItems}>외 {order.orderItems.length - 2}개</div>
                                )}
                            </td>
                            <td className={styles.totalPrice}>{order.totalPrice.toLocaleString()}원</td>
                            <td>
                                <span className={`${styles.status} ${styles[order.status]}`}>{getStatusText(order.status)}</span>
                            </td>
                            <td>{formatDate(order.createdAt)}</td>
                            <td>
                                <Link href={`/admin/orders/${order.id}`} className={styles.viewButton}>
                                    <Eye size={16} />
                                    상세보기
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {filteredOrders.length === 0 && (
                <div className={styles.noResults}>
                    <p>검색 결과가 없습니다.</p>
                </div>
            )}
        </div>
    )
}
