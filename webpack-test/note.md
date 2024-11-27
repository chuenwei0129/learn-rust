Webpack 的打包过程非常复杂，但大致上可简化为：

![784ef02a144a4b3ebfbcbe13b06ac7bb~tplv-k3u1fbpfcp-zoom-1](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/784ef02a144a4b3ebfbcbe13b06ac7bb%7Etplv-k3u1fbpfcp-zoom-1.png)

从上述打包流程角度，Webpack 配置项大体上可分为两类：

- **流程类**：作用于打包流程某个或若干个环节，直接影响编译打包效果的配置项
- **工具类**：打包主流程之外，提供更多工程化工具的配置项

> 流程类配置项综述

与打包流程强相关的配置项有：

- 输入输出：
  - `entry`：用于定义项目入口文件，Webpack 会从这些入口文件开始按图索骥找出所有项目文件；
  - `context`：项目执行上下文路径；
  - `output`：配置产物输出路径、名称等；
- 模块处理：
  - `resolve`：用于配置模块路径解析规则，可用于帮助 Webpack 更精确、高效地找到指定模块
  - `module`：用于配置模块加载规则，例如针对什么类型的资源需要使用哪些 Loader 进行处理
  - `externals`：用于声明外部资源，Webpack 会直接忽略这部分资源，跳过这些资源的解析、打包操作
- 后处理：
  - `optimization`：用于控制如何优化产物包体积，内置 Dead Code Elimination、Scope Hoisting、代码混淆、代码压缩等功能
  - `target`：用于配置编译产物的目标运行环境，支持 web、node、electron 等值，不同值最终产物会有所差异
  - `mode`：编译模式短语，支持 `development`、`production` 等值，可以理解为一种声明环境的短语

这里的重点是，Webpack **首先**需要根据输入配置\(`entry/context`\) 找到项目入口文件；**之后**根据按模块处理\(`module/resolve/externals` 等\) 所配置的规则逐一处理模块文件，处理过程包括转译、依赖分析等；模块处理完毕后，最后**再根据**后处理相关配置项\(`optimization/target` 等\)合并模块资源、注入运行时依赖、优化产物结构等。

这些配置项与打包流程强相关，建议学习时多关注它们对主流程的影响，例如 `entry` 决定了项目入口，而 `output` 则决定产物最终往哪里输出；`resolve` 决定了怎么找到模块，而 `module` 决定了如何解读模块内容，等等。

> 工具类配置项综述

除了核心的打包功能之外，Webpack 还提供了一系列用于提升研发效率的工具，大体上可划分为：

- 开发效率类：
  - `watch`：用于配置持续监听文件变化，持续构建
  - `devtool`：用于配置产物 Sourcemap 生成规则
  - `devServer`：用于配置与 HMR 强相关的开发服务器功能
- 性能优化类：
  - `cache`：Webpack 5 之后，该项用于控制如何缓存编译过程信息与编译结果
  - `performance`：用于配置当产物大小超过阈值时，如何通知开发者
- 日志类：
  - `stats`：用于精确地控制编译过程的日志内容，在做比较细致的性能调试时非常有用
  - `infrastructureLogging`：用于控制日志输出方式，例如可以通过该配置将日志输出到磁盘文件
- 等等

逻辑上，每一个工具类配置都在主流程之外提供额外的工程化能力，例如 `devtool` 用于配置产物 Sourcemap 生成规则，与 Sourcemap 强相关；`devServer` 用于配置与 HMR 相关的开发服务器功能；`watch` 用于实现持续监听、构建。
