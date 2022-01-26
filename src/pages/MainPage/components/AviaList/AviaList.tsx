import React from 'react';

import { IAviaListProps as IProps } from './types'

import styles from './avialist.module.scss';

export const AviaListComponent: React.FC<IProps> = (props) => {
  const { flights } = props
  return (
    <ul>Лист</ul>
  );
}
