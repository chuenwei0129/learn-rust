import classNames from 'classnames';
import React, { ComponentProps, FC } from 'react';

type ContainerProps = {
  title?: string;
  /**
   * 按钮失效状态
   * @default false
   */
  center?: boolean;
  dark?: boolean;
  rounded?: boolean;
};

const Container: FC<ContainerProps & ComponentProps<'div'>> = (props) => {
  const { children, center, rounded, dark, title, className, ...rest } = props;

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
