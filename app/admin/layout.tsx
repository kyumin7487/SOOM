"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"
import styles from "./admin-layout.module.scss"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    useEffect(() => {
        // 로그인 페이지가 아니고, 로그인되지 않은 경우 로그인 페이지로 리다이렉트
        const checkAuth = () => {
            const isAuthenticated = localStorage.getItem("admin_logged_in") === "true"
            setIsLoggedIn(isAuthenticated)

            if (!isAuthenticated && pathname !== "/admin") {
                router.push("/admin")
            }
        }

        checkAuth()
    }, [pathname, router])

    // 로그인 페이지에서는 레이아웃을 적용하지 않음
    if (pathname === "/admin") {
        return <>{children}</>
    }

    if (!isLoggedIn) {
        return null // 로그인 체크 중에는 아무것도 렌더링하지 않음
    }

    return (
        <div className={styles.adminLayout}>
            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <div className={`${styles.mainContent} ${isSidebarOpen ? "" : styles.expanded}`}>
                <AdminHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className={styles.content}>{children}</main>
            </div>
        </div>
    )
}
