import { ComponentProps } from 'react';

export type TextProps = {
  /**
   * 文本类型
   */
  type?: 'primary' | 'success' | 'warning' | 'error' | 'disabled';
} & ComponentProps<'span'>;
