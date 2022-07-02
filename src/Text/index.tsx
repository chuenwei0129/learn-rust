import classNames from 'classnames';
import React, { ComponentProps, FC } from 'react';

type TextProps = {
  type?: 'primary' | 'success' | 'warning' | 'error' | 'disabled';
} & ComponentProps<'span'>;

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
