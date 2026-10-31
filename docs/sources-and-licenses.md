# 来源、许可证与覆盖范围

项目工作流、按步骤整理的提示词、安装与检查脚本采用根目录 MIT 许可证。第三方内容保留各自署名和许可证，不归为本项目原创。机器可读清单见 [manifest.json](../manifest.json)。

| 内容 | 来源 | 处理 |
|---|---|---|
| humanizer | [blader/humanizer](https://github.com/blader/humanizer) | 本地版本，MIT，保留 Siqi Chen 署名 |
| bigpeng-hot-gzh | [BigPengSays/bigpeng-hot-gzh](https://github.com/BigPengSays/bigpeng-hot-gzh) | MIT，保留 BigPeng 署名；包含参考文件与上游提示词示例 |
| wechat-official-account-strategist | [demo112/yunqu-ai-skills](https://github.com/demo112/yunqu-ai-skills) | 上游 LICENSE 经 GitHub API 读取，MIT；规则与营销经验为历史参考 |
| avoid-ai-writing | [conorbronsdon/avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing) | 上游许可证 MIT；本地归档文本作为可选审校参考 |
| 顾问框架与 Nuwa | [alchaincyf/nuwa-skill](https://github.com/alchaincyf/nuwa-skill) | 保留本地 Nuwa MIT 通知；17 个本地顾问快照与 3 个本地 Nuwa 示例按清单标明，未声称全部为可定位的上游原文件 |
| wechat-article、think-tank | 本地自用写作与路由材料 | 按作者本次公开授权整理；metadata、路径与可用路由做适配 |
| humanize-chinese | [原登记来源](https://github.com/voidborne-d/humanize-chinese) | 2026-10-31 查询返回 404，未确认授权，因此未复制原文；提供本项目重新编写的 wechat-chinese-edit |
| wechat-md | 本地写作排版工具 | 保留 ISC 许可证；npm 依赖及其许可证由锁文件和 npm 安装保留 |

`licenses/` 保存对应通知；部分 skill 内也附就近许可证以支持单独安装。供应内容的本地 SHA-256 校验值记录于 `checksums.json`。

## 与自用版本的区别

额外的宿主字段统一收进 metadata；小写入口统一为大写；Markdown 行尾空白做了规范化，显式换行保留为 HTML 换行。公开文件不包含作者私人路径、历史文章全文、私人团队材料、访问凭证或生成图片。所有修改都在独立发行目录内完成。

`humanize-chinese` 是唯一因授权未确认而只登记来源的已发现核心写作 skill；替代 skill 是新编写内容，不能称为该上游工具的原版。图片阶段提供可跨宿主使用的提示词，不复制宿主内置系统 skill。

历史材料与研究笔记的技术陈述、调研数量、人物背景和平台规则未在此次打包中全部重新验证。用于文章发布时，按证据步骤核对。
