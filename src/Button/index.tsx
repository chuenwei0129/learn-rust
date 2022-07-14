import classNames from 'classnames';
import React, { FC } from 'react';
import './index.css';
import { ButtonProps } from './type';

const Button: FC<ButtonProps> = ({
  type,
  disabled,
  size,
  children,
  href,
  htmlType,
  className,
  ...rest
}) => {
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

Button.defaultProps = {
  size: 'md',
  type: 'default',
  htmlType: 'button',
  href: '#',
};

export default Button;
