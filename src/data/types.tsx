export interface FlightsInfotmation {
  result: {
    flights: Flights[]
  }
}

export interface Flights {
  [k: string]: any
}