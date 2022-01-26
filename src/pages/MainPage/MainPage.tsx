import React from 'react';

import { FilterComponent } from './components/Filter'
import { AviaListComponent } from './components/AviaList'

import JSON_flights from './../../data/flights.json'
import { FlightsInfotmation } from './../../data/types'

import styles from './mainpage.module.scss';

const flightsInfotmation = JSON_flights as FlightsInfotmation

export const MainPage = () => {
  const [flights, setFlights] = React.useState(flightsInfotmation.result.flights)

  return (
    <div className={styles.container}>
      <FilterComponent />
      <AviaListComponent flights={flights} />
    </div>
  );
}
