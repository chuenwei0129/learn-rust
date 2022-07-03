import classNames from 'classnames';
import React, { FC } from 'react';
import './index.css';
import { ButtonProps } from './type';

const Button: FC<ButtonProps> = (props) => {
  const {
    type = 'default',
    disabled,
    size = 'md',
    children,
    href = '#',
    htmlType = 'button',
    className,
    ...rest
  } = props;

  // 用户自定义 className
  const classes = classNames('nes-btn', className, {
    [`is-${type}`]: type && type !== 'default' && type !== 'link' && !disabled,
    'is-disabled': disabled,
    [`is-${size}`]: size && size !== 'md',
  });

  if (type === 'link') {
    return (
      <a className={classes} href={href} {...rest}>
        {children}
      </a>
    );
  } else {
    return (
      <button type={htmlType} className={classes} {...rest}>
        {children}
      </button>
    );
  }
};

export default Button;
