"use client"

import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import { Coffee, Package } from "lucide-react"
import LanguageSelector from "@/components/language-selector"
import { t } from "@/lib/translations"
import styles from "@/app/page.module.scss"

export default function HomePage() {
  const { state, dispatch } = useCart()
  const router = useRouter()

  const handleOrderTypeSelect = (type: "dine_in" | "takeout") => {
    dispatch({ type: "SET_ORDER_TYPE", payload: type })
    router.push("/menu")
  }

  return (
      <div className={styles.homePage}>
        <div className={styles.header}>
          <LanguageSelector />
        </div>

        <div className={styles.content}>
          <div className={styles.welcome}>
            <div className={styles.logo}>
              <Coffee className={styles.logoIcon} />
              <h1 className={styles.logoText}>SOOM</h1>
            </div>
            <p className={styles.welcomeText}>{t("welcome", state.language)}</p>
          </div>

          <div className={styles.orderTypeSection}>
            <h2 className={styles.sectionTitle}>{t("selectOrderType", state.language)}</h2>

            <div className={styles.orderTypes}>
              <button
                  className={`${styles.orderTypeBtn} ${styles.dineIn}`}
                  onClick={() => handleOrderTypeSelect("dine_in")}
              >
                <Coffee className={styles.orderTypeIcon} />
                <span className={styles.orderTypeText}>{t("dineIn", state.language)}</span>
              </button>

              <button
                  className={`${styles.orderTypeBtn} ${styles.takeout}`}
                  onClick={() => handleOrderTypeSelect("takeout")}
              >
                <Package className={styles.orderTypeIcon} />
                <span className={styles.orderTypeText}>{t("takeout", state.language)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}
