import { Flights } from './../../../../data/types'


export interface IAviaListProps {
  flights: Flights[]
  handleShowMore: () => void
}