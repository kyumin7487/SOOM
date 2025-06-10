"use client"

import { useState, useEffect } from "react"
import { CreditCard, Users, Coffee, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react"
import styles from "./dashboard.module.scss"

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        totalSales: 0,
        totalOrders: 0,
        totalMenus: 0,
        averageOrder: 0,
    })

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // 실제로는 API 호출
        const fetchStats = async () => {
            setIsLoading(true)
            // 로딩 시뮬레이션
            await new Promise((resolve) => setTimeout(resolve, 1000))

            setStats({
                totalSales: 1250000,
                totalOrders: 156,
                totalMenus: 24,
                averageOrder: 8012,
            })

            setIsLoading(false)
        }

        fetchStats()
    }, [])

    const statCards = [
        {
            title: "총 매출",
            value: `${stats.totalSales.toLocaleString()}원`,
            icon: <CreditCard />,
            change: "+12.5%",
            isPositive: true,
            color: "blue",
        },
        {
            title: "총 주문 수",
            value: stats.totalOrders,
            icon: <Users />,
            change: "+8.2%",
            isPositive: true,
            color: "green",
        },
        {
            title: "총 메뉴 수",
            value: stats.totalMenus,
            icon: <Coffee />,
            change: "+2",
            isPositive: true,
            color: "orange",
        },
        {
            title: "평균 주문 금액",
            value: `${stats.averageOrder.toLocaleString()}원`,
            icon: <TrendingUp />,
            change: "-3.1%",
            isPositive: false,
            color: "purple",
        },
    ]

    const recentOrders = [
        { id: "ORD20230615001", customer: "테이블 5", total: 25000, status: "completed", date: "2023-06-15 14:30" },
        { id: "ORD20230615002", customer: "포장", total: 18500, status: "completed", date: "2023-06-15 15:45" },
        { id: "ORD20230615003", customer: "테이블 3", total: 32000, status: "completed", date: "2023-06-15 16:20" },
        { id: "ORD20230615004", customer: "테이블 1", total: 15000, status: "completed", date: "2023-06-15 17:10" },
        { id: "ORD20230615005", customer: "포장", total: 22500, status: "completed", date: "2023-06-15 18:05" },
    ]

    const popularMenus = [
        { name: "아메리카노", category: "커피", sold: 48, revenue: 216000 },
        { name: "카페라떼", category: "커피", sold: 36, revenue: 198000 },
        { name: "바닐라라떼", category: "커피", sold: 29, revenue: 174000 },
        { name: "치즈케이크", category: "디저트", sold: 25, revenue: 187500 },
        { name: "자몽에이드", category: "음료", sold: 22, revenue: 132000 },
    ]

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>대시보드 로딩 중...</p>
            </div>
        )
    }

    return (
        <div className={styles.dashboard}>
            <div className={styles.dashboardHeader}>
                <h1 className={styles.pageTitle}>대시보드</h1>
                <div className={styles.dateSelector}>
                    <Calendar className={styles.calendarIcon} />
                    <span>오늘: {new Date().toLocaleDateString()}</span>
                </div>
            </div>

            <div className={styles.statsGrid}>
                {statCards.map((stat, index) => (
                    <div key={index} className={`${styles.statCard} ${styles[stat.color]}`}>
                        <div className={styles.statIcon}>{stat.icon}</div>
                        <div className={styles.statInfo}>
                            <h3 className={styles.statTitle}>{stat.title}</h3>
                            <p className={styles.statValue}>{stat.value}</p>
                            <div className={`${styles.statChange} ${stat.isPositive ? styles.positive : styles.negative}`}>
                                {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                <span>{stat.change} 전주 대비</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.dashboardGrid}>
                <div className={styles.gridItem}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>최근 주문</h2>
                        <a href="/admin/orders" className={styles.viewAll}>
                            모두 보기
                        </a>
                    </div>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                            <tr>
                                <th>주문 ID</th>
                                <th>고객</th>
                                <th>금액</th>
                                <th>상태</th>
                                <th>날짜</th>
                            </tr>
                            </thead>
                            <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.customer}</td>
                                    <td>{order.total.toLocaleString()}원</td>
                                    <td>
                      <span className={`${styles.status} ${styles[order.status]}`}>
                        {order.status === "completed" ? "완료" : "진행중"}
                      </span>
                                    </td>
                                    <td>{order.date}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={styles.gridItem}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>인기 메뉴</h2>
                        <a href="/admin/menus" className={styles.viewAll}>
                            모두 보기
                        </a>
                    </div>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                            <tr>
                                <th>메뉴명</th>
                                <th>카테고리</th>
                                <th>판매량</th>
                                <th>매출</th>
                            </tr>
                            </thead>
                            <tbody>
                            {popularMenus.map((menu, index) => (
                                <tr key={index}>
                                    <td>{menu.name}</td>
                                    <td>{menu.category}</td>
                                    <td>{menu.sold}개</td>
                                    <td>{menu.revenue.toLocaleString()}원</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
