import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';

import { Flights} from '../../../../data/types';

import ClockIcon from '../../../../assets/image/clock.png';
import PlaneIcon from '../../../../assets/image/plane.png';

import styles from './aviaitem.module.scss';

moment.locale('ru')

export const AviaItemComponent: React.FC<Flights> = (props) => {
  const { flight, token } = props

  return (
    <>
      {
        flight.legs.map((leg) => (
          (
            <li className={styles.Item} key={token}>
              <section className={styles.ItemHeader}>
                <div className={styles.ItemHeader_Left}>
                  <img className={styles.ItemImage} src={PlaneIcon} alt="plane" />
                </div>
                <div className={styles.ItemHeader_Right}>
                  <span className={styles.ItemHeader_RightPrice}>{`${flight.price.total.amount} ${flight.price.total.currency}`}</span>
                  <span>Стоимость для одного взрослого пассажира</span>
                </div>
              </section>
              {
                leg.segments.map((segment, index: number) => (
                  <section className={styles.ItemFlight}>
                    <div className={styles.ItemFlight_Airoport}>
                      <span>{`${segment.departureCity ? segment.departureCity.caption : ''}, ${segment.departureAirport.caption}`} <mark className='blue'>({segment.departureAirport.uid})</mark></span>
                      <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5 8.25L17.25 12M17.25 12L13.5 15.75M17.25 12H6.75" stroke="#3A52EE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <span>{`${segment.arrivalCity ? segment.arrivalCity.caption : ''}, ${segment.arrivalAirport ?segment.arrivalAirport.caption : ''}`} <mark className='blue'>({segment.arrivalAirport.uid})</mark></span>
                    </div>
                    <div className={styles.ItemFlight_Date}>
                      <div className={styles.ItemFlight_DateTime}>
                        <span className={styles.ItemFlight_DateClock}>{moment(segment.departureDate).format('HH:mm')}</span>
                        <span className='blue'>{moment(segment.departureDate).format('DD MMM dd')}</span>
                      </div>
                      <div className={styles.ItemFlight_DateAll}>
                        <img src={ClockIcon} alt="clock" />
                        {`${Math.round(segment.travelDuration / 60) - 1} ч ${(segment.travelDuration % 60) > 10 ? segment.travelDuration % 60 : `0${segment.travelDuration % 60}`} мин`}
                      </div>
                      <div className={styles.ItemFlight_DateTime}>
                        <span className='blue'>{moment(segment.arrivalDate).format('DD MMM dd')}</span>
                        <span className={styles.ItemFlight_DateClock}>{moment(segment.arrivalDate).format('HH:mm')}</span>
                      </div>
                    </div>
                    {
                      segment.stops ? (
                        <div>
                          <div className={styles.ItemFlight_Stop} />
                          <span className={styles.ItemFlight_StopText}>{segment.stops} пересадка</span>
                          <div className={styles.ItemFlight_Stop} />
                        </div>
                      ) : <div className={styles.ItemFlight_Stop} />
                    }
                    <span className={styles.ItemFlight_Company}>Рейс выполняет: {segment.airline.airlineCode} {segment.airline.caption}</span>

                    {leg.segments[index + 1] ? <div className={styles.Line} /> : null}
                  </section>
                ))
              }
              <button className={styles.ItemButton}>Выбрать</button>
            </li>
          )
        ))
      }
    </>
  );
}
