import { Flights } from './../../../../data/types'

export enum TYPE_SORTING {
  UP = 'up',
  DOWN = 'down',
  TIME = 'time'
}

export enum TYPE_FILTER {
  STOP = 'stop',
  NO_STOP = 'no_stop',
}

export interface Price {
  start: number,
  end: number
}

export interface Labels {
  title: string
  value: TYPE_SORTING | TYPE_FILTER | string
}

export interface FilterProps {
  flights: Flights[]
  flightsFilter: Flights[]
  handleFilterFlights: (filterFlights: Flights[]) => void
}
