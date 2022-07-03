import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'link';
export type ButtonSize = 'lg' | 'sm' | 'md';

export type ButtonProps = {
  /**
   * 按钮失效状态
   * @default false
   */
  disabled?: boolean;
  /**
   * 设置按钮大小
   * @default 'md'
   */
  size?: ButtonSize;
  /**
   * 按钮类型
   * @default 'default'
   */
  type?: ButtonType;
  /**
   * 设置 button 原生的 type 值
   * @default 'button'
   */
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> &
  AnchorHTMLAttributes<HTMLAnchorElement>;
