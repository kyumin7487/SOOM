"use client"

import { Menu, Bell } from "lucide-react"
import styles from "./admin-header.module.scss"

interface AdminHeaderProps {
    toggleSidebar: () => void
}

export default function AdminHeader({ toggleSidebar }: AdminHeaderProps) {
    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <button className={styles.menuToggle} onClick={toggleSidebar}>
                    <Menu />
                </button>
            </div>

            <div className={styles.rightSection}>
                <button className={styles.notificationBtn}>
                    <Bell />
                    <span className={styles.badge}>2</span>
                </button>

                <div className={styles.adminInfo}>
                    <div className={styles.adminAvatar}>A</div>
                    <span className={styles.adminName}>관리자</span>
                </div>
            </div>
        </header>
    )
}
