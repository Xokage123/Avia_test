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

  const getMinPrice = (nameCompany: string) => {
    const flightCompany = flights.filter(flight => flight.flight.carrier.caption === nameCompany)
    let minPrice: null | number = null

    flightCompany.forEach((flight) => {
      const price = +flight.flight.price.total.amount
      if (!minPrice) minPrice = price
      else if (+flight.flight.price.total.amount < minPrice) {
        minPrice = price
      }
    })

    return minPrice
  }

  const handleIsDisabled = (nameCompany: string): boolean => !flights.filter(flight => flight.flight.legs.some((leg) => {
    if (filter === TYPE_FILTER.NO_STOP) return leg.segments.some(segment => segment.stops === 0)
    if (filter === TYPE_FILTER.STOP) return leg.segments.some(segment => segment.stops === 1)
    return true
  })).filter(flight => flight.flight.carrier.caption === nameCompany).length

  React.useEffect(() => {
    const allCompany = new Set<string>()
    const labelsCompany: Labels[] = []
    flights.forEach((flight) => allCompany.add(flight.flight.carrier.caption))
    allCompany.forEach(company => {
      console.log(company)
      labelsCompany.push({
        title: `${company} (от ${getMinPrice(company)} руб.)`,
        value: company,
        disabled: handleIsDisabled(company)
      })
    })
    setOptionsCompany(labelsCompany)
    if (filter) return 
    setFilter(TYPE_FILTER.NO_STOP)
  }, [filter])

  const getSortValue = (flights: Flights[]): Flights[]  => {

    if (sorting === TYPE_SORTING.UP) {
      return flights.sort((flight_1: Flights, flight_2: Flights) => {
        if (+flight_1.flight.price.total.amount > +flight_2.flight.price.total.amount) return 1
        if (+flight_1.flight.price.total.amount < +flight_2.flight.price.total.amount) return -1
        return 0
      })
    }
    if (sorting === TYPE_SORTING.DOWN) {
      return flights.sort((flight_1: Flights, flight_2: Flights) => {
        if (+flight_1.flight.price.total.amount > +flight_2.flight.price.total.amount) return -1
        if (+flight_1.flight.price.total.amount < +flight_2.flight.price.total.amount) return 1
        return 0
      })
    }
    if (sorting === TYPE_SORTING.TIME) {
      return flights.sort((flight_1: Flights, flight_2: Flights) => {
        if (+flight_1.flight.legs.reduce((accumulator: number, leg) => accumulator + leg.duration, 0) > +flight_2.flight.legs.reduce((accumulator: number, leg) => accumulator + leg.duration, 0)) return -1
        if (+flight_1.flight.legs.reduce((accumulator: number, leg) => accumulator + leg.duration, 0) > +flight_2.flight.legs.reduce((accumulator: number, leg) => accumulator + leg.duration, 0)) return 1
        return 0
      })
    } return flights
  }

  React.useEffect(() => {
    let filterArray: Flights[] = flights

    if (filter === TYPE_FILTER.STOP) {
      filterArray = filterArray.filter((flight) => flight.flight.legs.some((leg) => leg.segments.some((segment) => segment.stops === 1)))
    }
    if (filter === TYPE_FILTER.NO_STOP) {
      filterArray = filterArray.filter((flight) => flight.flight.legs.some((leg) => leg.segments.some((segment) => segment.stops === 0)))
      handleFilterFlights(flights.filter((flight) => flight.flight.legs.some((leg) => leg.segments.some((segment) => segment.stops === 0))))
    }

    if (!isNaN(+price.start) && !isNaN(+price.end) && (+price.start < +price.end)) {
      filterArray = filterArray.filter(flight => {
        const totalPrice = +flight.flight.price.total.amount
        return totalPrice >= price.start && totalPrice <= price.end
      })
    }



    if (company) filterArray = filterArray.filter((flight: Flights) => flight.flight.carrier.caption === company)

    if (sorting) filterArray = getSortValue(filterArray)

    handleFilterFlights(filterArray)
  }, [filter, price, flights, company, sorting, handleFilterFlights])

  return (
    <section className={cn(styles.Container)}>
      <div className={styles.SortingContainer}>
        <h2 className={styles.Title}>Сортировка</h2>
        {
          labelsSorting.map(label => (
            <label className={styles.SortingLabel} key={label.value}>
              <input
                checked={label.value === sorting}
                type="radio"
                name='sorting'
                onChange={() => setSorting(label.value)}
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
                checked={label.value === filter}
                type="radio"
                name='filters'
                onChange={() => setFilter(label.value)}
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
                disabled={label.disabled}
                checked={label.value === company}
                name='company'
                onChange={() => setCompany(label.value)}
                value={label.value} />
              {` - ${label.title}`}
            </label>
          ))
        }
      </div>
    </section>
  );
}
