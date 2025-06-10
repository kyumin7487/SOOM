"use client"

import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Tag, Coffee, CreditCard, Settings, ChevronLeft, LogOut } from "lucide-react"
import styles from "./admin-sidebar.module.scss"

interface AdminSidebarProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

export default function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
    const router = useRouter()
    const pathname = usePathname()

    const handleLogout = () => {
        localStorage.removeItem("admin_logged_in")
        router.push("/admin")
    }

    const menuItems = [
        { icon: <LayoutDashboard />, label: "대시보드", path: "/admin/dashboard" },
        { icon: <Tag />, label: "카테고리 관리", path: "/admin/categories" },
        { icon: <Coffee />, label: "메뉴 관리", path: "/admin/menus" },
        { icon: <CreditCard />, label: "주문 내역", path: "/admin/orders" },
        { icon: <Settings />, label: "설정", path: "/admin/settings" },
    ]

    if (!isOpen) {
        return (
            <div className={styles.sidebarCollapsed}>
                <button className={styles.expandBtn} onClick={() => setIsOpen(true)}>
                    <ChevronLeft />
                </button>
                <div className={styles.collapsedMenu}>
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`${styles.collapsedMenuItem} ${pathname === item.path ? styles.active : ""}`}
                            title={item.label}
                        >
                            {item.icon}
                        </Link>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <h2 className={styles.sidebarTitle}>SOOM 관리자</h2>
                <button className={styles.collapseBtn} onClick={() => setIsOpen(false)}>
                    <ChevronLeft />
                </button>
            </div>

            <nav className={styles.sidebarNav}>
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`${styles.navItem} ${pathname === item.path ? styles.active : ""}`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className={styles.sidebarFooter}>
                <button className={styles.logoutBtn} onClick={handleLogout}>
                    <LogOut />
                    <span>로그아웃</span>
                </button>
            </div>
        </div>
    )
}
