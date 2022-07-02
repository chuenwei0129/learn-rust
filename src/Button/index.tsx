import classNames from 'classnames';
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react';

type ButtonType = 'primary' | 'success' | 'warning' | 'error' | 'link';
type ButtonSize = 'lg' | 'sm';

type ButtonProps = {
  disabled?: boolean;
  size?: ButtonSize;
  type?: ButtonType;
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

const Button: FC<ButtonProps> = (props) => {
  const {
    type,
    disabled,
    size,
    children,
    href = '#',
    htmlType = 'button',
    className,
    ...rest
  } = props;

  // 用户自定义 className
  const classes = classNames('nes-btn', className, {
    [`is-${type}`]: type && (!disabled || type !== 'link'),
    'is-disabled': disabled,
    // [`is-${size}`]: size
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
