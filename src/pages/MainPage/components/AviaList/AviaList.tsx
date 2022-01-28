import React from 'react';

import { IAviaListProps as IProps } from './types'

import { AviaItemComponent} from '../AviaItem'

import styles from './avialist.module.scss';

export const AviaListComponent: React.FC<IProps> = (props) => {
  const { flights, handleShowMore} = props

  return (
    <section className={styles.Container}>
      {
        flights.length ? (
          <>
            <ul className={styles.List}>
              {
                flights.map(flightInfo => {
                  const { flight, token } = flightInfo
                  return (<AviaItemComponent flight={flight} token={token} />)
                })
              }
            </ul>

            <div className={styles.ButtonContainer}>
              <button className={styles.Button} onClick={handleShowMore}>Показать еще</button>
            </div>
          </>
        ) : (
          <span>По вашему запросу мы ничего не нашли!</span>
        )
      }
    </section>
  );
}
