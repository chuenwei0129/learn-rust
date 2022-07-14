import styled from '@emotion/styled';
import React, { FC } from 'react';
import { FlexItemProps, FlexProps } from './type';

export const StyledFlex = styled.div<FlexProps>`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: ${({ align }) => align ?? 'center'};
  &::after {
    width: 100%;
    max-width: ${({ col, gap = 1 }) => (col && col < 12 ? `${(100 * col) / 12 - gap}%` : '100%')};
    content: '';
    /* @media (max-width: 960px) {
      max-width: ${({ colTablet, gapTablet = 1 }) =>
      colTablet && colTablet < 12 ? `${(100 * colTablet) / 12 - gapTablet}%` : '100%'};
    }
    @media (max-width: 680px) {
      max-width: ${({ colMobile, gapMobile = 1 }) =>
      colMobile && colMobile < 12 ? `${(100 * colMobile) / 12 - gapMobile}%` : '100%'};
    } */
  }
`;

const FlexItem = styled.div<FlexItemProps>`
  width: 100%;
  max-width: ${({ col, gap = 1 }) => (col && col < 12 ? `${(100 * col) / 12 - gap}%` : '100%')};
  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}px;`}
  /* @media (max-width: 960px) {
    max-width: ${({ colTablet, gapTablet = 1 }) =>
    colTablet && colTablet < 12 ? `${(100 * colTablet) / 12 - gapTablet}%` : '100%'};
    margin-bottom: ${({ marginBottom = 10 }) => `${marginBottom}px`};
  }
  @media (max-width: 680px) {
    max-width: ${({ colMobile, gapMobile = 1 }) =>
    colMobile && colMobile < 12 ? `${(100 * colMobile) / 12 - gapMobile}%` : '100%'};
    &:last-child {
      margin-bottom: unset;
    }
  } */
  ${({ stretch }) =>
    stretch &&
    `
    display: flex;
    align-self: stretch;
  `}
`;

const Flex: FC<FlexProps> = ({ children, col, gap, align, className, style }) => (
  <StyledFlex col={col} gap={gap} align={align} className={className} style={style}>
    {children}
    <FlexItem col={col} gap={gap} />
  </StyledFlex>
);

Flex.defaultProps = {
  col: 12,
};

export default Flex;
