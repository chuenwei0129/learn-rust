import classNames from 'classnames';
import React, { FC } from 'react';
import { ContainerProps } from './type';

const Container: FC<ContainerProps> = ({
  children,
  center,
  rounded,
  dark,
  title,
  className,
  ...rest
}) => {
  return (
    <div
      className={classNames('nes-container', className, {
        'is-centered': center,
        'is-rounded': rounded,
        'is-dark': dark,
        'with-title': title,
      })}
      {...rest}
    >
      {title && <h3 className={'title'}>{title}</h3>}
      {children}
    </div>
  );
};

export default Container;
