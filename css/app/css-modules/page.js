import styles from './styles.module.scss'

export default function page() {
  return (
    <>
      <div className={styles.appTitle}>hello world</div>
      <div className={styles['appTitle']}>hello css modules</div>
    </>
  )
}
