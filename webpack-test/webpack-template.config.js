const path = require('node:path')
const LightningCSS = require('lightningcss')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {
  defineReactCompilerLoaderOption,
  reactCompilerLoader,
} = require('react-compiler-webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const browserslist = require('browserslist')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TerserPlugin = require('terser-webpack-plugin')
const { LightningCssMinifyPlugin } = require('lightningcss-loader')

// 我们在 package.json 的 scripts.dev 和 scripts.build 分别指定了不同的环境变量，我们可以在 webpack.config.js 中根据这个环境变量设置 mode
const isDevelopment = process.env.NODE_ENV !== 'production'
const isAnalyze = !!process.env.ANALYZE
const topLevelFrameworkPaths = isDevelopment ? [] : getTopLevelFrameworkPaths()

function getTopLevelFrameworkPaths(
  frameworkPackages = ['react', 'react-dom'],
  dir = path.resolve(__dirname)
) {
  // Only top-level packages are included, e.g. nested copies like
  // 'node_modules/meow/node_modules/react' are not included.
  const topLevelFrameworkPaths = []
  const visitedFrameworkPackages = new Set()

  // Adds package-paths of dependencies recursively
  const addPackagePath = (packageName, relativeToPath) => {
    try {
      if (visitedFrameworkPackages.has(packageName)) return
      visitedFrameworkPackages.add(packageName)

      const packageJsonPath = require.resolve(`${packageName}/package.json`, {
        paths: [relativeToPath],
      })

      // Include a trailing slash so that a `.startsWith(packagePath)` check avoids false positives
      // when one package name starts with the full name of a different package.
      // For example:
      //   "node_modules/react-slider".startsWith("node_modules/react")  // true
      //   "node_modules/react-slider".startsWith("node_modules/react/") // false
      const directory = path.join(packageJsonPath, '../')

      // Returning from the function in case the directory has already been added and traversed
      if (topLevelFrameworkPaths.includes(directory)) return
      topLevelFrameworkPaths.push(directory)

      const dependencies = require(packageJsonPath).dependencies || {}
      for (const name of Object.keys(dependencies)) {
        addPackagePath(name, directory)
      }
    } catch {
      // don't error on failing to resolve framework packages
    }
  }

  for (const packageName of frameworkPackages) {
    addPackagePath(packageName, dir)
  }

  return topLevelFrameworkPaths
}

/**
 * @param {string} [dir]
 */
const getSupportedBrowsers = (dir = __dirname) => {
  try {
    return browserslist.loadConfig({
      path: dir,
      env: isDevelopment ? 'development' : 'production',
    })
  } catch {}
}

/**
 * @param {boolean} useTypeScript
 */
const getSwcOptions = (useTypeScript) => {
  const supportedBrowsers = getSupportedBrowsers()

  return /** @type {import('@swc/core').Options} */ ({
    jsc: {
      parser: useTypeScript
        ? {
            syntax: 'typescript',
            tsx: true,
          }
        : {
            syntax: 'ecmascript',
            jsx: true,
            importAttributes: true,
          },
      externalHelpers: true,
      loose: false,
      transform: {
        react: {
          runtime: 'automatic',
          refresh: isDevelopment,
          development: isDevelopment,
        },
        optimizer: {
          simplify: true,
          globals: {
            typeofs: {
              window: 'object',
            },
            envs: {
              NODE_ENV: isDevelopment ? '"development"' : '"production"',
            },
          },
        },
      },
    },
    env: {
      // swc-loader don't read browserslist config file, manually specify targets
      targets:
        supportedBrowsers?.length > 0
          ? supportedBrowsers
          : 'defaults, chrome > 70, edge >= 79, firefox esr, safari >= 11, not dead, not ie > 0, not ie_mob > 0, not OperaMini all',
      mode: 'usage',
      loose: false,
      // 不论是 SWC 还是 Babel、只简单地指定 coreJs: 3 时编译器只会使用 core-js@3.0.0 提供的特性和 polyfill、无视后续所有新版本，所以在指定 SWC 的 core-js 版本时，一定要指定完整的 semver 版本号，或者直接 require('core-js/package.json').version。
      coreJs: require('core-js/package.json').version,
      shippedProposals: false,
    },
  })
}

module.exports = /** @type {import('webpack').Configuration} */ ({
  // 输入
  entry: 'main.ts',
  output: {
    // 当使用 webpack 构建库而不是应用时，output.library 用来控制你的库的导出，虽然构建 React 应用时不需要考虑导出，但是 output.library 还有别的用途。
    // webpack 的 Runtime 会在全局对象上挂载和存储一些变量和方法（例如 Chunk Map self.webpackChunk）。为了避免页面上同时存在多个 webpack 构建的产物导致全局变量冲突，你可以通过 output.library 设置后缀：
    // 将 output.library 设为 _CEW 时，webpack 在全局对象上挂载的变量名就会使用 _CEW 作为后缀（例如 self.webpackChunk_CEW ）。
    library: '_CEW',
    filename: isDevelopment ? '[name].js' : '[contenthash].js',
    // 控制 webpack 输出 JavaScript 和 CSS 文件的文件名格式（其中 cssFilename 控制的是 webpack 5 中仍处于试验性的 CSS 支持，而 MiniCssExtractPlugin 暂时不会读取这个配置项）。一般我习惯用 [name].[contenthash].js 或者 [contenthash].js、不暴露任何源码的路径、源码中依赖与模块的名称。
    cssFilename: isDevelopment ? '[name].css' : '[contenthash].css',
    hotUpdateChunkFilename: '[id].[fullhash].hot-update.js',
    hotUpdateMainFilename: '[fullhash].[runtime].hot-update.json',
    webassemblyModuleFilename: '[contenthash].wasm',
    // 指定 webpack 的输出目录，必须是绝对路径。建议使用 __dirname 和 node:path 拼接路径：
    path: path.resolve(__dirname, 'dist'),
    // 使 webpack 创建能按需加载的异步模块。
    asyncChunks: true,
    // 当 webpack 打包 Web 应用时会使用 JSONP 加载 Chunk，你可以使用 output.crossOriginLoading 控制 <<script /> 标签的 crossOrigin 属性，在为你的 Web App 启用基于 workbox 的 ServiceWorker + CacheStorage 离线缓存方案时，crossOrigin 属性是必须的
    crossOriginLoading: 'anonymous',
    // 选择 webpack 使用的哈希函数，，默认为 md4。这个配置将会传给 Node.js 的 crypto#createHash 方式。由于 Node.js 17 升级了 OpenSSL 大版本，默认的 md4 会 break 掉 Node.js 17+。而 webpack 5.54.0 新增了性能更好的 xxhash64 哈希函数的支持（并且将会成为 webpack 6 的默认哈希函数），这里推荐显式声明 output.hashFunction 为 xxhash64
    hashFunction: 'xxhash64',
    // 控制哈希前缀长度，webpack 5 默认值取 20、而 webpack 6 的默认值将会改为 16。这里推荐显式声明 output.hashDigestLength 为 16
    hashDigestLength: 16,
  },
  // 控制 webpack 内置的 SourceMapDevToolPlugin 或 EvalSourceMapDevToolPlugin 的行为。在开发中推荐使用 eval-source-map（source map 为原始源码），如果项目非常大（20k+ LOC）可以使用 eval-cheap-module-source-map、尽可能保留原始信息的同时改善性能；在生产中推荐完全关闭 source map 防止源码泄漏
  devtool: isDevelopment ? 'eval-source-map' : false,
  devServer: {
    // webpack-dev-server 启动时监听的端口，推荐设置一个固定值而不是自动选择可用端口：
    port: 4090,
    // 在开发 SPA（单页应用）时，你的源码中可能只有一个 index.html。你可以启用 devServer.historyApiFallback 避免 404：
    historyApiFallback: true,
  },
  // 将源码中导入的一些模块 map 到全局变量或者其他模块上。通过 external 还可以将一些 isomorphic 模块、polyfill（例如 isomorphic-fetch 和 whatwg-url）替换成浏览器原生 API
  externals: {
    'text-encoding': 'TextEncoder',
    'whatwg-url': 'window',
    '@trust/webcrypto': 'crypto',
    'isomorphic-fetch': 'fetch',
    'node-fetch': 'fetch',
    // Add this to bundle @undecaf/zbar.wasm
    module: 'module',
  },
  // 虽然 webpack 支持打包任意文件格式的模块，但是 webpack 只内置了基于 acorn 的 JavaScript parser，因此任何非 JavaScript 的模块（webpack 5 新增了试验性的 CSS 支持、将在 webpack 6 起默认启用）都需要使用 webpack loader 加以处理、转换为 webpack 可以识别的 JavaScript。
  // 推荐使用 lightningcss-loader 代替 postcss-loader、autoprefixer 和 postcss-preset-env。当然如果有使用其他 PostCSS 插件的必要，也可以 postcss-loader 和 lightningcss-loader 一起使用。
  // webpack 5 默认不支持 CSS，可以使用 webpack 内置的试验性的 CSS 支持，或者使用目前常用的 css-loader 和 mini-css-extract-plugin 的组合
  // pnpm i lightningcss lightningcss-loader -D
  // # 如果需要使用 PostCSS 插件
  // pnpm i postcss postcss-loader -D
  // # 如果不使用 webpack 试验性的 CSS 支持
  // pnpm i css-loader mini-css-extract-plugin -D
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 不启用 webpack 内置的试验性 CSS 支持时，需要使用 css-loader 和 MiniCssExtractPlugin.loader
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'lightningcss-loader',
            options: {
              implementation: LightningCSS,
            },
          },
          // 只有需要用 PostCSS 插件时，才添加下面的 postcss-loader
          {
            loader: 'postcss-loader',
            // postcss-loader 可以自动寻找 PostCSS 的配置文件，也可以在 options 中手动指定
          },
        ],
      },
      // 不需要编译转换的二进制文件（图片、字体等）可以标记为 type: asset/resource，webpack 会自动处理。推荐将这些文件放在单独一个目录（如 assets）下方便匹配。
      {
        test: /assets\//,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext][query]',
        },
      },
      // 推荐使用 swc-loader 或者 @swc-node/loader 代替 babel-loader。其中 swc-loader 支持 SWC 的配置，适合单独配置 SWC 编译行为；@swc-node/loader 支持自动寻找和读取 tsconfig.json 文件、并将其中的 compilerOptions 转换成 SWC 的格式配置传给 SWC。
      // 我自己偏向于 TypeScript 只用于类型检查、在 tsconfig.json 中设置了 module: preserve、jsx: preserve 和 moduleResolution: bundler，因此使用 swc-loader、并搭配 browserslist 的 JS API 将本地的 browserslist 配置文件传递给 SWC：
      // pnpm i swc-loader @swc/core @swc/helpers core-js browserslist -D
      {
        test: /\.[cm]?tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'swc-loader',
            options: getSwcOptions(true),
          },
          // swc-loader ...
          {
            loader: reactCompilerLoader,
            options: defineReactCompilerLoaderOption({
              // React Compiler options goes here
            }),
          },
        ],
      },
      {
        test: /\.[cm]?t=jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'swc-loader',
            options: getSwcOptions(false),
          },
          // swc-loader ...
          {
            loader: reactCompilerLoader,
            options: defineReactCompilerLoaderOption({
              // React Compiler options goes here
            }),
          },
        ],
      },
      // React 官方暂时没有提供 React Compiler 的 webpack 插件/loader
      // https://github.com/SukkaW/react-compiler-webpack
    ],
  },
  // 使用 webpack 插件扩展 webpack 的行为。由于 webpack 提供给插件的 API 非常丰富、webpack 插件可以控制所有 webpack 的行为。
  // 如果没有启用 webpack 内置的试验性 CSS 支持，那么就需要使用 MiniCssExtractPlugin 去收集 CSS 并输出 CSS Chunk。注意 MiniCssExtractPlugin 暂时不支持读取output.cssFilename、需要单独配置
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[contenthash].css',
    }),
    // 删除 output.path 目录中的所有文件、以及 webpack 重新构建后不再需要的过时文件。
    !isDevelopment && new CleanWebpackPlugin(),
    // 使用 React Fast Refresh。注意我们不再需要 react-fresh/babel Babel 插件和 babel-loader，因为 SWC 已经内置了 React Fresh 转译支持。
    // pnpm add -D @pmmmwh/react-refresh-webpack-plugin react-refresh
    isDevelopment && new ReactRefreshWebpackPlugin(),
    // 启用 webpack 内置的 DefinePlugin 进行一些编译器替换。除了实现编译条件以外，也可以搭配 dotenv 一起使用、内联公开的环境变量：
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'import.meta.env.DEV': isDevelopment.toString(),
      'import.meta.env.PROD': (!isDevelopment).toString(),
      'typeof window': JSON.stringify('object'),
      // 将所有以 PUBLIC_ 开头的环境变量内联到应用中
      ...Object.entries(process.env).reduce((acc, [key, value]) => {
        if (key.startsWith('PUBLIC_')) {
          acc[`process.env.${key}`] = JSON.stringify(value)
        }
        return acc
      }, /** @type {Record<string, string>} */ ({})),
    }),
    // 在提供的 HTML 模板中自动添加 <script /> 标签引入 webpack 输出的 JS 模块。
    // webpack 内置的 CSS 支持与 MiniCssExtractPlugin 只能自动加载非 Initial Chunk 中 import 的 CSS。对于 Initial Chunk 中 import 的 CSS（例如全局样式）， HtmlWebpackPlugin 也能自动在 HTML 中添加 <link rel="stylesheet" /> 标签。
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // 通过 webpack-bundle-analyzer 直观地分析各个 Chunk 的组成与体积，从而针对性的修改 code split 配置、或使用 dynamic import 实现按需加载。
    isAnalyze &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }),
    // 将 webpack 晦涩难懂的编译日志输出 变成直观的进度条，推荐在构建时开启
    !isDevelopment && new WebpackBar(),
    // 引入插件来修改 webpack 解析模块路径的行为。其中最常用的有 tsconfig-paths-webpack-plugin：
    // new TsconfigPathsPlugin({
    //   // tsconfig-paths-webpack-plugin can't access `resolve.extensions`
    //   // have to provide again
    //   extensions: ['.ts', '.tsx', '.jsx', '.mjs', '.cjs', '.js', '.json'],
    // }),
  ],
  // webpack 自己实现了一套模块路径解析（即 enhanced-resolve），通过 resolve 配置去修改或者扩展解析的行为。
  resolve: {
    // webpack 默认只会寻找 .js、.json 和 .wasm 为扩展名的文件，因此为了打包 TypeScript 或者 JSX/TSX，需要手动指定支持的扩展名和顺序：
    extensions: ['.ts', '.tsx', '.jsx', '.mjs', '.cjs', '.js', '.json'],
    // 顾名思义，让 webpack 在解析模块路径时，将匹配到的模块 map 到指定的路径上。在解决一些编译问题时 alias 选项也非常有用：
    alias: {
      // '@undecaf/zbar-wasm': path.join(path.dirname(require.resolve('@undecaf/zbar-wasm/package.json')), 'dist/index.mjs')
    },
    // 是否让 webpack 缓存模块路径解析的结果以供后续使用，推荐启用 cache 并禁用 unsafeCache（激进缓存）：
    cache: true,
    unsafeCache: false,
    // 在源码中 import 的模块带有文件扩展名时，让 webpack 在源码中去寻找其他后缀名的模块。这个选项在编译 TypeScript 到 ES Modules 非常有用。由于 ES Modules 规范和 TypeScript 推荐，所有的 import 的路径都需要/强烈建议携带 .js 的扩展名，但文件系统上的源码自然有可能是以 .jsx 或者 .ts(x) 的，通过配置 extensionAlias，可以在源码中手写 import 'foo.js' 时让 webpack 寻找文件系统上 foo.ts 的源码文件。
    // 而当编译目标是 Web 应用、CommonJS 模块 等其他绝大部分场景时，extensionAlias 配置就毫无用处了
    // extensionAlias: {
    // }
    // Node.js 12.16.0 起支持在 package.json 中的 exports 字段声明条件导出。如果想要使条件的导出在 webpack 中也生效，则需要配置 conditionNames：
    conditionNames: ['import', 'require', 'default'],
  },
  // 当 mode 为 production 时，webpack 会启用一系列优化、去改善生产环境产物的性能。而 optimizations 配置就可以去修改这些行为。
  // webpack 的 splitChunks 的默认代码分割配置已经足够满足绝大部分应用的需要了，但是我们可以在这基础上添加一些代码分割规则（optmization.splitChunks.cacheGroups）或者修改一些参数，以便一些模块更好的动作，以及更好的和其他基建（例如 CDN）配合起来。
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 例如，Facebook 的 AoT CSS-in-JS 方案依赖生成的 CSS 文件只能有一个，我们可以将所有 StyleX 生成的 CSS 合并进同一个 _stylex_generated Chunk 之中：
        stylex: {
          name: '_stylex_generated',
          test: /stylex\.virtual\.css/,
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        },
        // 再例如，虽然应用不断迭代更新、但是 React 版本并不经常改变，可以单独将 react 和 react-dom 单独打进一个 framework chunk、这个 chunk 的 contenthash 几乎不会改变、可以大幅提升浏览器和 CDN 的缓存命中率：
        framework: {
          chunks: 'all',
          name: 'framework',
          test(module) {
            const resource = module.nameForCondition?.()
            return resource
              ? topLevelFrameworkPaths.some((pkgPath) =>
                  resource.startsWith(pkgPath)
                )
              : false
          },
          priority: 40,
          enforce: true,
        },
      },
    },
    // webpack 包含自己的 runtime 代码、用于加载和缓存模块等。通过 optimization.runtimeChunk 选项可以配置是否将 webpack 的 runtime 拆成独立的 chunk：
    runtimeChunk: {
      name: 'webpack',
    },
    // 替换 webpack 内置的压缩器为你的自定义的压缩器。可以将 TerserPlugin 中的压缩器替换为 SWC、以及用 LightningCssMinifyPlugin 代替 CssMinimizerPlugin 压缩 CSS：
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
        terserOptions: {
          compress: {
            ecma: 5,
            comparisons: false,
            inline: 2, // https://github.com/vercel/next.js/issues/7178#issuecomment-493048965
          },
          mangle: { safari10: true },
          format: {
            // use ecma 2015 to enable minify like shorthand object
            ecma: 2015,
            safari10: true,
            comments: false,
            // Fixes usage of Emoji and certain Regex
            ascii_only: true,
          },
        },
      }),
      new LightningCssMinifyPlugin(),
    ],
  },
  // 启用 webpack 内置的缓存来加速后续构建。当 mode 为 development 时 webpack 会自动启用内存缓存，可以通过 cache 配置指定使用文件系统缓存：
  cache: {
    type: 'filesystem',
    maxMemoryGenerations: dev ? 5 : Infinity,
    cacheDirectory: path.join(__dirname, 'node_modules', '.cache', 'webpack'),
    compression: isDevelopment ? 'gzip' : false,
    // 注意 compression 设置为 compression: isDevelopment ? 'gzip' : false，在开发环境下主动压缩、避免 IO 瓶颈；在 CI 构建环境中、由 CI runner 去压缩。
  },
  // webpack 中包含了一些试验性特性，其中的一些功能会在 webpack 6 中正式推出，其中包括内置 CSS 支持、缓存机制优化、ESM 输出支持等：
  experiments: {
    css: false, // 不能和 css-loader 和 mini-css-extract-plugin 一起启用
    cacheUnaffected: true,
  },
})
