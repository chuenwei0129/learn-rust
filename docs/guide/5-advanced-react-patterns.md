---
# nav: 指南
group:
  title: 基础
  order: 0
order: 0
---

# 组件封装渐进史

> 原文：[5 Advanced React Patterns](https://javascript.plainenglish.io/5-advanced-react-patterns-a6b7624267a6)
>
> 作者：Alexis Regnaud

像每个 React 开发人员一样，您可能已经问过自己以下问题之一：

- 我如何建立一个**可重复使用**的组件以适应不同的使用情况？
- 我如何建立一个具有**简单 API**的组件，使其易于使用？
- 我如何建立一个在用户界面和功能方面**可扩展**的组件？

这些反复出现的问题催生了整个 React 社区的一些高级模式的出现。

在这篇文章中，我们将看到 5 种不同模式的概述。

代码示例（基于简单的 `Counter` 组件）

![](https://miro.medium.com/v2/resize:fit:392/1*_miRfZkNA8YkhIBSCywBdQ.png)

> 该代码可在 github 上访问：[advanced-react-patterns](https://github.com/alexis-regnaud/advanced-react-patterns)

## 1. 复合组件模式（Compound Components Pattern）

This pattern makes possible the creation of expressive and declarative components while avoiding [prop drilling](https://kentcdodds.com/blog/prop-drilling). Consider using this pattern if you want a customizable component, with a better separation of concern and an understandable API.

这种模式允许创建富有表现力和声明性的组件，避免非必要的 [prop drilling](https://kentcdodds.com/blog/prop-drilling)。如果你想让你的组件更有可塑性，有更好的关注点分离和易理解的 API，你应该考虑使用这种模式。

**Example**

> Github: [compound-component](https://github.com/alexis-regnaud/advanced-react-patterns/tree/main/src/patterns/compound-component)

**Pros**

- Reduced API Complexity: Avoid jamming all props in one giant parent component and drilling those down to child UI components. Instead, props are attached to the `Counter`’s child that makes the most sense.

减少了 API 的复杂性：与其把所有的 props 都塞进一个巨大的父组件中，然后再把这些 props 钻到子 UI 组件中，不如在这里把每个 props 都连接到各自最有意义的子组件上。

![](https://miro.medium.com/v2/resize:fit:1400/1*w85jLF0VEja0MAveEg4w1A.png)

- Flexible Markup Structure: Provide great UI flexibility by allowing the creation of various cases.  
   For example, the developers can easily change the order of the `Counter`’s children or define which one should be displayed.

  灵活的标记结构：你的组件有很大的 UI 灵活性，允许从一个单一的组件创建各种情况。例如，用户可以改变子组件的顺序或定义哪个组件应该被显示。

![](https://miro.medium.com/v2/resize:fit:1400/1*2jExoAFGc1T-EhZe1F-3TA.png)

- Separation of Concerns: Most of the logic is centralized in `Counter`. A context (`CounterProvider` + `useCounterContext`) is used to share states (`counter`) and handlers (`handleIncrement()`, `handleDecrement()`) across `Counter`’s children. This gives us a clear distribution of responsibilities.

关注点分离：大部分的逻辑都包含在主 Counter 组件中，然后用 React.Context 来分享所有子组件的状态和事件处理。我们得到了一个明确的责任划分。

![](https://miro.medium.com/v2/resize:fit:1400/1*NMgnhqwbOb6jA_q0rt4kEA.png)

**Cons**

- Too much UI flexibility: Having this level of flexibility can also lead into situations not originally anticipated (examples: Unwanted code, Wrong Counter’s children order, missing mandatory child).  
   Depending on your use case, you might not want to allow that much flexibility.
  太高的 UI 灵活性：拥有灵活性的同时，也有可能引发意想不到的行为（把一个不需要的组件的子组件放进去，把子组件的顺序弄乱，忘记包含一个必须的子组件）

根据你想要用户如何使用你的组件，你可能不希望有那么多的灵活性。

![](https://miro.medium.com/v2/resize:fit:1400/1*ax33uL1Vk8gWTbuVZpPwoQ.png)

- Heavier JSX: This pattern will increase the number of JSX rows, especially if you use a linter (`EsLint`**)** or a code formatted (`Prettier`).
  It doesn’t seem like a big deal at the scale of a single component, but could definitely make a huge difference when you look at the big picture.
  更重的 JSX：应用这种模式会增加 JSX 行的数量，特别是当你使用像 ESLint 这样的代码检测工具或类似 Prettier 这样的代码格式化工具时
  在单个组件的规模上，这似乎不是什么大问题，但当你从全局来看时，肯定会产生巨大的差异。

![](https://miro.medium.com/v2/resize:fit:1400/1*Gl77TWP-Hnp0AmaLx5aS9Q.png)

**Criteria**

- Inversion of control: 1/4
- Implementation complexity: 1/4

**Public libraries using this pattern**

- [React Bootstrap](https://react-bootstrap.github.io/components/dropdowns/)
- [Reach UI](https://reach.tech/accordion)

## 2\. Control Props Pattern

This pattern turns your component into a [controlled component](https://reactjs.org/docs/forms.html#controlled-components). An external state is consumed as a “single source of truth” allowing the developers to insert their own logic to modify the default component behavior.
这种模式将你的组件转变为一个受控组件。外部状态作为 "单一事实源 "被消耗，允许用户插入自定义逻辑，修改默认组件的行为。

**Example**

> Github: [control-props](https://github.com/alexis-regnaud/advanced-react-patterns/tree/main/src/patterns/control-props)

**Pros**

- Give more control: Since the developers control the main state, they can directly influence the `Counter` behavior.
- 给予更多的控制：由于主状态暴露在你的组件之外，用户可以控制它，因此可以直接影响你的组件。

![](https://miro.medium.com/v2/resize:fit:1400/1*luPxit07FeKtThFMAj3fVA.png)

**Cons**

- Implementation complexity: Before, a single integration (`JSX`) was enough to make the component work. Now it’s spread over 3 different places (`JSX` / `useState` / `handleChange`).
- 实施的复杂性: 之前，在一个地方（JSX）的一个集成就足以使你的组件工作。现在，它将分散在 3 个不同的地方（JSX / useState / handleChange）。

![](https://miro.medium.com/v2/resize:fit:1400/1*EjUOV3IsHwnICXTJQDyN8w.png)

**Criteria**

- Inversion of control: 2/4
- Implementation complexity: 1/4

**Public libraries using this pattern**

- [Material UI](https://material-ui.com/components/rating/#rating)

## 3\. Custom Hook Pattern

Let’s go further in “inversion of control”: the main logic is now moved into a custom hook. This hook exposes several internal logics (`States`, `Handlers`), which gives great control to the developers.
让我们在 "控制反转 "中更进一步：主要的逻辑现在被转移到一个自定义的钩子中。这个钩子可以被用户访问，并且暴露了几个内部逻辑（状态、处理程序），允许他对你的组件有更好的控制。

**Example**

> Github: [custom-hooks](https://github.com/alexis-regnaud/advanced-react-patterns/tree/main/src/patterns/custom-hooks)

**Pros**

- Give more control: The developers can insert their own logic between `useCounter` and `Counter`, making it possible for them to modify the default `Counter` behavior.
- 给予更多的控制: 用户可以在钩子和 JSX 元素之间插入自己的逻辑，允许他修改默认组件的行为。

![](https://miro.medium.com/v2/resize:fit:1400/1*CoCzzseCI0A5K-YwZOu3Ig.png)

**Cons**

- Implementation complexity: Since the logical part is separated from the rendered part, it is up to the developers to link both. Therefore, a good understanding of how `Counter` work is necessary to implement it correctly.
  实施的复杂性：由于逻辑部分与渲染部分是分开的，所以必须由用户将两者联系起来。要正确地实现它，需要对你的组件的工作方式有一个很好的理解。

![](https://miro.medium.com/v2/resize:fit:1400/1*a75EVVp0p8u_puLd3aOOMQ.png)

**Criteria**

- Inversion of control: 2/4
- Implementation complexity: 2/4

**Public libraries using this pattern**

- [React table](https://react-table.tanstack.com/docs/examples/basic)
- [React hook form](https://react-hook-form.com/api)

## 4\. Props Getters Pattern

The `Custom Hook Pattern` provides great control, but it also makes the component harder to integrate because the developers have to deal with lots of native hook props and recreate the logic on his side.

The `Props Getters Pattern` pattern attempts to mask this complexity. We provide a shortlist of `props getters` instead of exposing native props.

> A `getter` is a function that returns many props, it has a meaningful name, making it clear to the developers which `getter` corresponds to which JSX element.
> 自定义钩子模式提供了很好的控制，但也使你的组件更难集成，因为用户必须处理大量的组件本地钩子的 props，并在他那边重新创建逻辑。Props Getters 模式试图掩盖这种复杂性。我们不暴露本地 props，而是提供一个 props getters 的短名单。一个 getter 是一个返回许多 props 的函数，它有一个有意义的名字，允许用户自然地将其链接到正确的 JSX 元素。

易用性：提供一种简单的方式来整合你的组件，复杂性被隐藏起来，用户只需将正确的 getter 连接到正确的 JSX 元素。
灵活性： 用户仍然有可能重载 getters 中的 props，以适应他的具体情况。

**Example**

> Github: [props-getters](https://github.com/alexis-regnaud/advanced-react-patterns/tree/main/src/patterns/props-getters)

**Pros:**

- Ease of use: The complexity is hidden. The developers just have to connect the right `getter` given by `useCounter` to the right JSX element.

![](https://miro.medium.com/v2/resize:fit:1400/1*EROrkxs2t83-X_UtFbxkgQ.png)

- Flexibility: Overloading the `getter`’s props is possible to adapt to specific cases.

![](https://miro.medium.com/v2/resize:fit:1400/1*gg5di6lFX4jH0PF0pKqXlQ.png)

**Cons:**

- Lack of visibility: `getters` brought abstractions which make the component easier to integrate, but also more opaque and “magic”. The developers must have a good understanding of the exposed getter props as well as the impacted internal logic to override them properly (`Typescript` should help with this).
  缺少可见性： getters 带来的抽象性使你的组件更容易集成，但也更不透明和 “魔法”。为了正确地覆盖你的组件，用户必须知道 getters 所暴露的 props 列表，以及如果其中一个 props 被改变所带来的内部逻辑影响。

**Criteria**

- Inversion of control: 3/4
- Integration complexity: 3/4

**Public libraries using this pattern**

- [React table](https://react-table.tanstack.com/docs/examples/basic)
- [Downshift](https://github.com/downshift-js/downshift#usage)

## 5\. State reducer pattern

The most advanced pattern in terms of inversion of control. It gives an advanced way for the developers to change how your component operates internally.  
The code is similar to `Custom Hook Pattern`, but with the addition of a `reducer` passed to the hook. This `reducer` can overload any internal action of the component.
在控制的反转方面是最先进的模式。它为用户提供了一种先进的方式来改变你的组件的内部操作方式。

**Example**

> Github: [state-reducer](https://github.com/alexis-regnaud/advanced-react-patterns/tree/main/src/patterns/state-reducer)

> `State reducer pattern` can be associated with other pattern (`Compound components pattern`, `Custom hook pattern` and `Props Getters Pattern`).  
> In this exemple we use it with the `Custom hook pattern`.
> 代码类似于自定义钩子模式，但除此之外，用户还定义了一个被传递给钩子的 reducer。这个 reducer 将重载你的组件的任何内部动作。

**Pros**

- Give more control: In the most complicated cases, using `state reducers` is the best way to leave control to the developers. All the internal `useCounter`’s actions are now accessible from outside and can be overridden.
- 在这个例子中，我们结合了 State reducer 模式和 Custom hook 模式，但是你也可以把它和 Compound components 模式一起使用，直接把 reducer 传递给主组件 Counter。

给予更多的控制：在最复杂的情况下，使用 state reducers 是把控制权留给用户的最好方法。你所有的内部组件的动作现在都可以从外部访问，并且可以被重写。

![](https://miro.medium.com/v2/resize:fit:1400/1*ZQ6uhcFlebsimpDtUMVvbA.png)

**Cons:**

- Implementation complexity: This pattern is probably the most complex to implement, both for you and for the developers.
- Lack of visibility: Since any reducer’s action can be changed, a good understanding of the component’s internal logic is required.
  实施的复杂性：这种模式的实现肯定是最复杂的，无论是对你还是对用户。
  缺少可见性：由于任何 reducer 的动作都可以被改变，因此需要很好地理解组件的内部逻辑。

**Criteria**

- Inversion of control: 4/4
- Integration complexity: 4/4

**Public libraries using this pattern**

- [Downshift](https://github.com/downshift-js/downshift#statereducer)

## Conclusion

Through these 5 advanced React patterns, we have seen different ways to take advantage of the concept of “inversion of control”. They give you a powerful way to create flexible and adaptable Components.

However, we all know that “Great power comes great responsibility”. The more control is given to the developers, the more your component will move away from the “plug and play” mindset. It’s why you have to choose the right pattern corresponding to the right need.

The following diagram could help you in this task. It classifies all these patterns according to “Integration complexity” and “Inversion of control”:

通过这 5 个高级 React 模式，我们看到了利用 "控制反转 "概念的不同方式。它们给你提供了一个强大的方法来创建灵活和适应性强的组件。
然而，我们都知道这句著名的谚语：“能力越大责任越大”，你越是把控制权转移给用户，你的组件就越是远离 "即插即用 "的思维方式。作为一个开发者，你的角色是选择正确的模式来对应正确的需求。
为了帮助你完成这项任务，下面的图表根据 "集成的复杂性 "和 "控制反转 "这两个因素对所有这些模式进行了分类。

![](https://miro.medium.com/v2/resize:fit:1400/1*LVq5PcC09q34j7FExkY5Zg.png)
