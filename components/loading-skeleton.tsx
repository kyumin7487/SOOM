import styles from "./loading-skeleton.module.scss"

export default function LoadingSkeleton() {
    return (
        <div className={styles.container}>
            <div className={styles.categories}>
                {[1, 2, 3].map((i) => (
                    <div key={i} className={styles.categorySkeleton} />
                ))}
            </div>

            <div className={styles.menuGrid}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className={styles.menuSkeleton}>
                        <div className={styles.imageSkeleton} />
                        <div className={styles.contentSkeleton}>
                            <div className={styles.titleSkeleton} />
                            <div className={styles.descriptionSkeleton} />
                            <div className={styles.priceSkeleton} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
