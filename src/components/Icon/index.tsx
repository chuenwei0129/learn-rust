import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';

import './index.css';

export type IconProps = {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
} & FontAwesomeIconProps;

const Icon = ({ variant, className, ...rest }: IconProps) => {
  return (
    <FontAwesomeIcon
      className={classNames(className, {
        [`icon-${variant}`]: variant !== 'default',
      })}
      {...rest}
    />
  );
};

export default Icon;
