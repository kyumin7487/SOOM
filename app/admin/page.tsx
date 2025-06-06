"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"
import styles from "./page.module.scss"

export default function AdminLoginPage() {
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()

        // 간단한 비밀번호 체크 (실제로는 더 안전한 인증 필요)
        if (password === "admin123") {
            localStorage.setItem("admin_logged_in", "true")
            router.push("/admin/dashboard")
        } else {
            setError("비밀번호가 올바르지 않습니다.")
        }
    }

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <div className={styles.loginHeader}>
                    <Lock className={styles.lockIcon} />
                    <h1 className={styles.title}>SOOM 관리자</h1>
                    <p className={styles.subtitle}>관리자 로그인</p>
                </div>

                <form className={styles.loginForm} onSubmit={handleLogin}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>
                            비밀번호
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            placeholder="비밀번호를 입력하세요"
                            required
                        />
                    </div>

                    {error && <div className={styles.error}>{error}</div>}

                    <button type="submit" className={`btn btn-primary btn-large ${styles.loginBtn}`}>
                        로그인
                    </button>
                </form>
            </div>
        </div>
    )
}
