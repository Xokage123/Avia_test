export interface FlightsInfotmation {
  result: {
    flights: Flights[]
  }
}

export interface Leg {
  segments: Segment[]
  duration: number
}

export interface IField {
  caption: string
  uid: string
}

export interface Segment {
  departureCity: IField
  departureAirport: IField
  arrivalAirport: IField
  arrivalCity: IField
  departureDate: string
  travelDuration: number
  arrivalDate: number | string
  stops: number
  airline: {
    airlineCode: string
    caption: string
  }
}

export interface Flights {
  flight: Flight
  token?: string
}

export interface Flight {
  carrier: IField
  price: {
    total: {
      amount: string
      currency: string
    }
  }
  legs: Leg[]
}