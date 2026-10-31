# 2026-11-01 测试复测与失败原因

以下诊断保留的是测试范围调整前的结果。用户随后确认：默认测试验证搜索功能，文案缺陷独立记录；对 PageSpeed 已知异常做精确兼容。当前默认范围及独立检查命令见 [README](../README.md#functional-scope-and-known-findings--1-november-2026)，原始失败证据继续保留。

执行命令：`BROWSER=chrome:headless npm test`。

本次完整运行 `2026-10-31T13-00-58-005Z-all` 于悉尼时间 2026-11-01 开始，目录使用 UTC 时间。结果为 **27 个场景，26 通过、1 失败、0 跳过**，测试耗时 3 分 33 秒，进程退出码为 1。环境为 Chrome 156、TestCafe 3.7.6、Node 26.12.1。此次复测没有修改测试逻辑。

| 功能 | 通过 / 总数 |
| --- | --- |
| 注册、登录、退出 | 9 / 9 |
| 搜索 | 2 / 3 |
| 排序、比较 | 6 / 6 |
| 加入、更新、移除购物车 | 9 / 9 |

## 本次稳定复现：TC01-S02 搜索提示与预期不一致

步骤：打开商店，搜索 `AimeeNoSuchProduct739281`。

1. 搜索页成功打开，标题包含该关键词。
2. `tests/TC01-search.js:17` 的商品数量断言通过，实际结果为 0 个商品。
3. 第 18 行要求搜索内容包含 `There is no product that matches the search criteria.`，但页面实际显示 `Your shopping cart is empty!`，因此产生 `AssertionError`。

失败截图中，错误文字位于页面中部的 Search 结果区域。独立于 TestCafe 的 HTTP 请求也验证了这一点：保存的 [search-response.html](../reports/2026-10-31T13-00-58-005Z-all/search-response.html) 第 172 行开始是 `#content`，第 235 行包含 `<p>Your shopping cart is empty!</p>`。顶部购物车自身的同名提示另在第 80 行。

这说明本次失败的直接原因是网站响应中的搜索反馈与断言不一致。搜索操作与零商品检查均已成功，没有出现找不到元素、超时或页面脚本异常。具体应该修改网站的哪个模板、控制器或语言配置，无法从本仓库确定，因为仓库只有系统测试代码，没有网站服务端源码。

测试中的完整英文句子属于当前测试预期，并非已提供的正式网站需求；但搜索结果使用购物车提示确实存在语义混淆，可记录为内容/可用性缺陷。修复或确认需求后再更新、复测，不能仅凭需要绿色结果就把错误提示改成期望值。

证据：[本次 results.json](../reports/2026-10-31T13-00-58-005Z-all/results.json)、[失败截图](../reports/2026-10-31T13-00-58-005Z-all/screenshots/2026-11-01_00-01-02/test-11/Chrome_156.0.0.0_Golden_Gate_27/errors/1.png)、[运行环境](../reports/2026-10-31T13-00-58-005Z-all/run-info.json)。

## 近期另一次失败：TC07-S1 的间歇性页面 JavaScript 异常

运行 `2026-10-31T12-48-35-992Z-all` 为 25/27 通过。其中 TC07-S1 的错误是：

```text
ReferenceError: pagespeed is not defined
at HTMLImageElement.onload (https://opencart.abstracta.us/:1:1)
```

直接原因是页面图片加载回调访问了当时不存在的 `pagespeed` 全局变量。运行器在 `scripts/run.cjs:32` 设置 `skipJsErrors: false`，所以页面未处理的 JavaScript 异常也会使场景失败，即使购物车断言没有报错。

该报告中 `helpers/cart.js:29` 是 TestCafe 收到页面异常时正在执行的点击位置；这一行没有引用 `pagespeed`，不能将它当成异常的原始代码位置。本次 TC07-S1 及其余八个购物车场景全部通过，未重现此异常，因此应与稳定的搜索提示失败分开记录。

现有证据不足以判定全局变量缺失究竟由脚本加载失败、执行顺序还是浏览器自动化兼容性引起；普通 HTTP 获取的首页 HTML 未包含 `pagespeed`，也不能据此排除浏览器实际加载过程中的问题。后续若需定位这一间歇异常，应在发生时保留浏览器 Console 与 Network 日志，核对图片 `onload` 和相关脚本的加载、执行顺序。此次没有启用忽略 JavaScript 错误或重试来掩盖它。

历史证据：[25/27 的 results.json](../reports/2026-10-31T12-48-35-992Z-all/results.json)。
