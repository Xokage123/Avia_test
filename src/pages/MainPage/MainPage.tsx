import React from 'react';
import cn from 'classnames';

import { FilterComponent } from './components/Filter'
import { AviaListComponent } from './components/AviaList'

import { numberPrewie } from '../../../src/const/const'

import JSON_flights from './../../data/flights.json'
import { Flights, FlightsInfotmation } from './../../data/types'

import styles from './mainpage.module.scss';

const flightsInfotmation = JSON_flights as FlightsInfotmation

export const MainPage = () => {
  const [flightsAll] = React.useState(flightsInfotmation.result.flights)

  const [flightsFilter, setFlightsFilter] = React.useState(flightsAll)

  const [numberShowFlights, setNumberShowFlights] = React.useState(numberPrewie)

  const [featuredFlights, setfeaturedFlights] = React.useState(flightsAll.slice(0, numberShowFlights))

  React.useEffect(() => {
    setNumberShowFlights(numberPrewie)
  }, [flightsAll])

  const handleFilterFlights = React.useCallback((filterFlights: Flights[]) => {
    setFlightsFilter(filterFlights)
  }, [])

  const handleShowMore = React.useCallback(() => {
    setNumberShowFlights((prevValue) => prevValue + numberPrewie)
  }, [])

  React.useEffect(() => {
    setfeaturedFlights(flightsFilter.slice(0, numberShowFlights))
  }, [numberShowFlights, flightsAll, flightsFilter])

  return (
    <div className={cn(styles.container, 'main-container')}>
      <FilterComponent flights={flightsAll} flightsFilter={flightsFilter} handleFilterFlights={handleFilterFlights} />
      <AviaListComponent flights={featuredFlights} handleShowMore={handleShowMore} />
    </div>
  );
}
