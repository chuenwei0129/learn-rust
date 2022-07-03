import classNames from 'classnames';
import React, { FC } from 'react';
import { TextProps } from './type';

const Text: FC<TextProps> = ({ type, className, children, ...rest }) => {
  return (
    <span
      className={classNames('nes-text', className, {
        [`is-${type}`]: type,
      })}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Text;
