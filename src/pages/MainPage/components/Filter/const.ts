import { Labels, TYPE_SORTING, TYPE_FILTER} from './types'

export const labelsSorting: Labels[] = [
  {
    title: 'По возрастанию цены',
    value: TYPE_SORTING.UP
  },
  {
    title: 'По убванию цены',
    value: TYPE_SORTING.DOWN
  },
  {
    title: 'По времени в пути',
    value: TYPE_SORTING.TIME
  },
]

export const labelsFilter: Labels[] = [
  {
    title: '1 пересадка',
    value: TYPE_FILTER.STOP
  },
  {
    title: 'Без пересадок',
    value: TYPE_FILTER.NO_STOP
  },
]