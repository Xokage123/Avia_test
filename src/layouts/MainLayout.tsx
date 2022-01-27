import React from 'react'

import MainHeader from './Header/MainHeader'
import MainFooter from './Footer/MainHeader'

import styles from './MainLayout.module.scss'

const MainLayout: React.FC = (props) => {
  const { children } = props
  return (
    <>
      <MainHeader />
      <main className={styles.Main}>
        {children}
      </main>
      <MainFooter />
    </>
  )
}

export default MainLayout