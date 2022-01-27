import React from 'react';
import cn from 'classnames';

import { Flights } from './../../../../data/types'

import { TYPE_SORTING, TYPE_FILTER, FilterProps as Props, Price, Labels } from './types'

import { labelsFilter, labelsSorting } from './const'

import styles from './filter.module.scss';

const initialPrice: Price = {
  start: 0,
  end: 0
}

export const FilterComponent: React.FC<Props> = (props) => {
  const { flights, flightsFilter, handleFilterFlights } = props
  const [sorting, setSorting] = React.useState<string>('')
  const [optionsCompany, setOptionsCompany] = React.useState<Labels[]>([])
  const [filter, setFilter] = React.useState<string>('')
  const [price, setPrice] = React.useState<Price>(initialPrice)
  const [company, setCompany] = React.useState<string>('')

  React.useEffect(() => {
    const allCompany = new Set<string>()
    const labelsCompany: Labels[] = []
    flights.forEach((flight) => allCompany.add(flight.flight.carrier.caption))
    allCompany.forEach(company => {
      labelsCompany.push({
        title: company,
        value: company
      })
    })
    setOptionsCompany(labelsCompany)
  }, [])

  React.useEffect(() => {
    const flightsFilterActual = flightsFilter.slice(0)

    if (sorting === TYPE_SORTING.UP) {
      handleFilterFlights(flightsFilterActual.sort((flight_1: Flights, flight_2: Flights) => {
        if (+flight_1.flight.price.total.amount > +flight_2.flight.price.total.amount) return 1
        if (+flight_1.flight.price.total.amount < +flight_2.flight.price.total.amount) return -1
        return 0
      }))
    }
    if (sorting === TYPE_SORTING.DOWN) {
      handleFilterFlights(flightsFilterActual.sort((flight_1: Flights, flight_2: Flights) => {
        if (+flight_1.flight.price.total.amount > +flight_2.flight.price.total.amount) return 1
        if (+flight_1.flight.price.total.amount < +flight_2.flight.price.total.amount) return -1
        return 0
      }))
    }
    if (sorting === TYPE_SORTING.TIME) {
      handleFilterFlights(flightsFilterActual.sort((flight_1: Flights, flight_2: Flights) => {
        if (flight_1.flight.legs.reduce((accumulator: number, leg: any) => accumulator + leg.duration, [0]) > +flight_2.flight.legs.reduce((accumulator: number, leg: any) => accumulator + leg.duration, [0])) return -1
        if (flight_1.flight.legs.reduce((accumulator: number, leg: any) => accumulator + leg.duration, [0]) > +flight_2.flight.legs.reduce((accumulator: number, leg: any) => accumulator + leg.duration, [0])) return 1
        return 0
      }))
    }
  }, [handleFilterFlights, sorting])

  React.useEffect(() => {
    if (filter === TYPE_FILTER.STOP) {
      handleFilterFlights(flights.filter((flight: any) => flight.flight.legs.find((leg: any) => leg.segments.find((segment: any) => segment.stops === 1))))
    }
    if (filter === TYPE_FILTER.NO_STOP) {
      handleFilterFlights(flights.filter((flight: any) => flight.flight.legs.find((leg: any) => leg.segments.find((segment: any) => segment.stops === 0))))
    }
  }, [filter, flights, handleFilterFlights])

  React.useEffect(() => {
    console.log(price)
  }, [price])

  React.useEffect(() => {
    handleFilterFlights(flights.filter((flight: Flights) => flight.flight.carrier.caption === company))
  }, [company])

  return (
    <section className={cn(styles.Container)}>
      <div className={styles.SortingContainer}>
        <h2 className={styles.Title}>Сортировка</h2>
        {
          labelsSorting.map(label => (
            <label className={styles.SortingLabel} key={label.value}>
              <input
                type="radio"
                name='sorting'
                onInput={() => setSorting(label.value)}
                value={label.value} />
              {` - ${label.title}`}
            </label>
          ))
        }
      </div>

      <div className={styles.FilterContainer}>
        <h2 className={styles.Title}>Фильтровать</h2>
        {
          labelsFilter.map(label => (
            <label className={styles.SortingLabel} key={label.value}>
              <input
                type="radio"
                name='sorting'
                onInput={() => setFilter(label.value)}
                value={label.value} />
              {` - ${label.title}`}
            </label>
          ))
        }
      </div>

      <div className={styles.PriceContainer}>
        <h2 className={styles.Title}>Цена</h2>
        <label className={styles.PriceLabel}>
          От
          <input type="string" value={price.start} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            console.log(event.target.value.slice(1))
            const actualValue = event.target.value.startsWith('0') ? +event.target.value.slice(1) : +event.target.value
            setPrice(prevValue => ({
              ...prevValue,
              start: actualValue >= 0 ? actualValue : 0
            }))
          }} />
        </label>
        <label className={styles.PriceLabel}>
          До
          <input type="string" value={price.end} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const actualValue = event.target.value.startsWith('0') ? +event.target.value.slice(1) : +event.target.value

            setPrice(prevValue => ({
              ...prevValue,
              end: actualValue >= 0 ? actualValue : 0
            }))
          }} />
        </label>
      </div>

      <div className={styles.AirlinesContainer}>
        <h2 className={styles.Title}>Авиокомпания</h2>
        {
          optionsCompany.map(label => (
            <label className={styles.SortingLabel} key={label.value}>
              <input
                type="radio"
                name='sorting'
                onInput={() => setCompany(label.value)}
                value={label.value} />
              {` - ${label.title}`}
            </label>
          ))
        }
      </div>
    </section>
  );
}
