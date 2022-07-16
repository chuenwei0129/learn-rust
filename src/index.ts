export { default as Foo } from './components/Foo';
export { default as Icon } from './components/Icon';
export { CommonCounter } from './patterns/common';
export { CompoundCounter } from './patterns/compound';
export { ControlCounter } from './patterns/control-props';
export { CustomHookCounter, useCounter } from './patterns/custom-hooks';
export { PropsGetterCounter, useCounter as useGetterCounter } from './patterns/props-getter';
export {
  DECREMENT,
  INCREMENT,
  ReducerCounter,
  useCounter as useReducerCounter,
} from './patterns/state-reducer';
export type { CounterAction, CounterState } from './patterns/state-reducer';
