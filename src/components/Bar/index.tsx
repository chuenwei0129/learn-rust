import React from 'react';

export interface IHelloProps {
  /**
   * 按钮失效状态
   * @default '1'
   */
  className?: string; // 支持识别 TypeScript 可选类型为非必选属性
}

const Hello: React.FC<IHelloProps> = () => <>Hello World!</>;

export default Hello;
