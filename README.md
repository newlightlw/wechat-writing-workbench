# 实证写作工坊 · WeChat Writing Workbench

一套从真实问题、实践和研究出发的微信公众号写作方案，打包写作步骤、提示词、思考天团、去 AI 味工具与本地排版台。

在 AI 时代，持续分享自己的观点、经验，尤其是个人判断，能让读者通过具体作品逐渐了解你擅长什么、如何思考和做事，积累个人品牌所依赖的理解与信任。

输出也是整理经验与思考的过程：写清问题、选择和依据，发现尚未想明白的地方，再通过反馈与实践修订。这个项目希望帮助你迈出分享的第一步，把手里的经历和想法组织成读者能理解、能使用的内容。

**问题 → 证据 → 大纲 → 思考天团 → 初稿 → 润色 → 标题 → 配图 → 发布包 → 复盘**

## 快速开始

```bash
git clone https://github.com/newlightlw/wechat-writing-workbench.git
cd wechat-writing-workbench
python3 scripts/install_skills.py --target codex --dry-run
python3 scripts/install_skills.py --target codex
# Claude Code 用户改为 --target claude
```

Python 3.10+；skill 安装不依赖额外 Python 包。默认安装本仓库全部 skill，遇到同名目录跳过并报告，不覆盖已有配置。按终端报告处理跳过项；新会话是否能发现 skill 以宿主实际结果为准。
也可以不安装，直接让 Agent 读取 [工作流入口](skills/wechat-writing-workflow/SKILL.md) 或复制 [总控提示词](prompts/workflow.md)。

```text
请按这套方案写作。主题：[主题]；目标读者：[读者]；真实素材：[路径]。
先明确 brief、证据与大纲，再进行审稿、写作和润色。交付目录：[目录]。
```

## 按步骤使用

每个步骤都有输入输出说明、可安装的 skill 和可复制提示词。

| 步骤 | 说明 | Skill | 提示词 |
|---|---|---|---|
| 01-提炼选题 | [步骤](steps/01-提炼选题/README.md) | [wechat-01-topic-selection](skills/wechat-01-topic-selection/SKILL.md) | [复制](skills/wechat-01-topic-selection/references/prompt.md) |
| 02-明确写作目标 | [步骤](steps/02-明确写作目标/README.md) | [wechat-02-writing-brief](skills/wechat-02-writing-brief/SKILL.md) | [复制](skills/wechat-02-writing-brief/references/prompt.md) |
| 03-资料与证据 | [步骤](steps/03-资料与证据/README.md) | [wechat-03-evidence-research](skills/wechat-03-evidence-research/SKILL.md) | [复制](skills/wechat-03-evidence-research/references/prompt.md) |
| 04-主线与大纲 | [步骤](steps/04-主线与大纲/README.md) | [wechat-04-outline](skills/wechat-04-outline/SKILL.md) | [复制](skills/wechat-04-outline/references/prompt.md) |
| 05-思考天团审稿 | [步骤](steps/05-思考天团审稿/README.md) | [wechat-05-review](skills/wechat-05-review/SKILL.md) | [复制](skills/wechat-05-review/references/prompt.md) |
| 06-初稿与迭代 | [步骤](steps/06-初稿与迭代/README.md) | [wechat-06-draft](skills/wechat-06-draft/SKILL.md) | [复制](skills/wechat-06-draft/references/prompt.md) |
| 07-去AI味与声音校准 | [步骤](steps/07-去AI味与声音校准/README.md) | [wechat-07-humanize](skills/wechat-07-humanize/SKILL.md) | [复制](skills/wechat-07-humanize/references/prompt.md) |
| 08-标题与首屏 | [步骤](steps/08-标题与首屏/README.md) | [wechat-08-title-opening](skills/wechat-08-title-opening/SKILL.md) | [复制](skills/wechat-08-title-opening/references/prompt.md) |
| 09-配图与封面 | [步骤](steps/09-配图与封面/README.md) | [wechat-09-illustrations](skills/wechat-09-illustrations/SKILL.md) | [复制](skills/wechat-09-illustrations/references/prompt.md) |
| 10-终审排版与发布包 | [步骤](steps/10-终审排版与发布包/README.md) | [wechat-10-publish](skills/wechat-10-publish/SKILL.md) | [复制](skills/wechat-10-publish/references/prompt.md) |
| 11-发布后复盘 | [步骤](steps/11-发布后复盘/README.md) | [wechat-11-retrospective](skills/wechat-11-retrospective/SKILL.md) | [复制](skills/wechat-11-retrospective/references/prompt.md) |

## 思考天团

包含 **20 个顾问框架、4 个文章审稿角色**，可做问题分析、文章审稿与分歧辩论。

- [思考天团说明](docs/think-tank.md)
- [顾问目录与写作组合](skills/think-tank/references/advisors.md)
- [调用提示词](skills/think-tank/references/prompts.md)

顾问为模拟框架；推演不等于真人观点，多视角共识不替代证据。默认单会话运行，多 Agent 是可选方式。

## 可读性润色与去 AI 味

[步骤 07](skills/wechat-07-humanize/SKILL.md) 先用有依据的故事开头带出读者问题，再提炼少量能由正文支撑的观点金句。素材、改写示例与检查标准见 [可读性参考](skills/wechat-07-humanize/references/readability.md)；故事保持真实或明确标注为假设，金句保留必要条件。

以 [humanizer](skills/humanizer/SKILL.md) 为主，参考作者认可的旧文校准声音；[中文局部编辑](skills/wechat-chinese-edit/SKILL.md) 处理局部中文表达。改写后核对事实，保留判断与必要细节。

## 本地排版

```bash
cd tools/wechat-md
npm ci
npm test
npm start
```

需要 Node.js 20+。打开终端显示的本机地址，导入 Markdown，复制公众号富文本或导出 HTML。[使用说明](tools/wechat-md/README.md)。
工具不自动登录或发布；图片上传、手机预览和封面裁切在公众号后台确认。

## 示例与验证

- [历史配图提示词实例](prompts/historical-image-examples.md)
- [完整脱敏演示](examples/demo/README.md)：使用明确标注的合成任务，展示 brief、证据、大纲、审稿、正文与发布包。
- [新文章模板](templates/README.md)
- [方法论](docs/methodology.md)
- [安装与验证](docs/validation.md)
- [来源与许可证](docs/sources-and-licenses.md)

```bash
python3 scripts/validate.py
node scripts/check_formatter.mjs
python3 scripts/build_release.py
```

最后一条生成 `dist/` 下的 ZIP 和 SHA-256 文件；需要先通过验证。仓库无需模型 API key，运行写作仍依赖用户自己的 Agent 与工具。

## 开源范围

提供可复用方法、工作流、skill、提示词、顾问框架、模板与排版源码。私人原稿和聊天记录不进入发行包。
来源已按 [manifest.json](manifest.json) 区分：本地自用材料、第三方 MIT 内容、适配内容和新编写替代项。
`humanize-chinese` 原来源不可访问且授权未确认，原文未分发；中文编辑能力由重新编写的 skill 提供。

本项目不承诺阅读量、检测器分数或自动发表效果。MIT 工作流与各第三方许可证见 [LICENSE](LICENSE) 和 [来源说明](docs/sources-and-licenses.md)；排版台沿用 ISC。

## 关于文章质量

**决定文章质量的不仅是写法，更重要的是你的观点、经验与判断。**

这套流程、提示词和 skill 帮助你整理材料、追问依据、审阅结构和改善表达。值得分享的内容，来自你对问题的观察、做过的实践，以及能够说明理由、接受验证与修正的判断。

可以从一件具体的小事开始，认真记录自己的选择与依据。持续输出、听取反馈，再回到实践中打磨，让每篇文章成为个人经验和判断的积累。

## v0.1.1 更新

补齐故事性开头与观点金句的润色规则，接入步骤 07、步骤 08 和工作流；skill 总数仍为 39。
已有安装不会被安装器覆盖。升级时先备份并比较同名目录，再手动同步本版改动的 `wechat-07-humanize`、`wechat-08-title-opening`、`wechat-article` 和 `wechat-writing-workflow`；直接读取仓库文件的用法无需重复安装。
