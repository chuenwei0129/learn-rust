import { ComponentProps } from 'react';

export type ContainerProps = {
  /**
   * 标题
   */
  title?: string;
  /**
   * 标题是否居中
   * @default false
   */
  center?: boolean;
  /**
   * 黑暗模式
   * @default false
   */
  dark?: boolean;
  /**
   * 边框，黑暗模式下必填
   * @default false
   */
  rounded?: boolean;
} & ComponentProps<'div'>;
