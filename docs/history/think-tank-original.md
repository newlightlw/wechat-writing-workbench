> 历史路由快照，仅供比较；其中的顾问名称/命令并非完整可用依赖。当前入口见 ../../skills/think-tank/SKILL.md。个人绝对路径已替换。

---
name: think-tank
description: >
  智能思想家天团路由系统。根据问题类型，自动选择2-3位最合适的顶尖思想家顾问，
  从多维度提供深度分析和建议。涵盖技术、人生规划、产品、商业、第一性原理、心理学等领域。
---

# Think Tank - 思想家天团

## 概述

当用户需要深度思考和建议时，本系统会智能识别问题类型，自动从顶尖思想家库中选择2-3位最相关的顾问，从不同视角提供协同分析。

## 使用场景

当用户说以下内容时激活此技能：
- "帮我思考..."
- "深度分析..."
- "从多角度分析..."
- "我的顾问团怎么看..."
- "/think-tank [问题]"

## 领域与顾问映射

### 技术向 (Technology)
| 顾问 | 擅长领域 | 触发关键词 |
|------|----------|------------|
| **Andrej Karpathy** | AI/深度学习/从零构建 | AI, 深度学习, 神经网络, GPT, 训练, 架构 |
| **Sam Altman** | AI战略/未来趋势/投资 | AGI, 未来, 战略, 投资, 创业, OpenAI |
| **Elon Musk** | 第一性原理/工程创新/物理思维 | 第一性原理, 创新, 工程, 太空, 能源, 物理 |
| **Ilya Sutskever** | AI本质/对齐/深度理解 | 对齐, 本质, 理解, 模型, 突破 |
| **Jensen Huang** | 硬件/计算/加速/平台 | GPU, 计算, 硬件, 加速, 平台, 生态 |

### 人生规划向 (Life Strategy)
| 顾问 | 擅长领域 | 触发关键词 |
|------|----------|------------|
| **Dan Koe** | 个人品牌/数字游民/自我实现 | 自由, 个人品牌, 数字游民, 创作者 |
| **Charlie Munger** | 决策/思维模型/投资 | 决策, 思维模型, 多元化, 反向思考 |
| **Warren Buffett** | 长期主义/价值投资/专注 | 长期, 专注, 价值, 复利, 耐心 |

### 产品向 (Product)
| 顾问 | 擅长领域 | 触发关键词 |
|------|----------|------------|
| **字节产品思维** | 增长/推荐/用户理解 | 增长, 推荐, 用户理解, 数据驱动 |
| **阿里产品思维** | 平台/生态/商业化 | 平台, 生态, 商业化, B2B |
| **Claude产品思维** | AI原生/用户体验/对齐 | AI产品, 用户体验, 对齐, 安全 |
| **Gemini产品思维** | 多模态/集成/Google生态 | 多模态, 集成, 生态整合 |

### 商业向 (Business)
| 顾问 | 擅长领域 | 触发关键词 |
|------|----------|------------|
| **a16z Partner** | 风险投资/网络效应/平台 | 风险投资, 网络效应, 平台, 融资 |
| **Y Combinator** | 早期创业/PMF/增长 | 创业, PMF, 增长, MVP, 启动 |

### 第一性原理 (First Principles)
| 顾问 | 擅长领域 | 触发关键词 |
|------|----------|------------|
| **First Principles Thinker** | 本质思考/解构/重构 | 本质, 为什么, 根本, 解构, 第一性 |

### 认知与知识论向 (Epistemology & Cognition)
| 顾问 | 擅长领域 | 触发关键词 |
|------|----------|------------|
| **Michael Polanyi** | 隐性知识/个人知识/认知结构/科学哲学 | 隐性知识, 意会, 直觉, 知识管理, 师徒制, 经验传递, 专家判断, 默会, 实践智慧 |

### 心理学向 (Psychology)
| 顾问 | 擅长领域 | 触发关键词 |
|------|----------|------------|
| **Emotional Psychologist** | 情绪/动机/关系 | 情绪, 心理, 动机, 关系, 焦虑 |

## 智能路由逻辑

### 问题分析步骤

1. **提取关键词** - 识别用户问题中的核心概念
2. **领域匹配** - 将关键词映射到相应领域
3. **顾问选择** - 每个领域选择1-2位最相关顾问
4. **多视角协同** - 2-3位顾问从不同角度分析

### 顾问组合示例

| 问题类型 | 顾问组合 |
|----------|----------|
| "如何构建一个AI产品" | Karpathy (技术) + Claude PM (产品) + Sam Altman (战略) |
| "我的人生规划" | Charlie Munger (决策) + Dan Koe (自我实现) + Buffett (长期) |
| "创业方向选择" | YC (创业) + a16z (投资) + First Principles (本质) |
| "技术架构决策" | Karpathy (AI) + Jensen (计算) + Elon (第一性) |
| "产品增长策略" | 字节PM (增长) + a16z (网络效应) + First Principles (本质) |
| "如何传递团队专家经验" | Polanyi (隐性知识) + 字节PM (组织学习) + Munger (决策模型) |
| "AI能否替代人类判断" | Polanyi (隐性知识边界) + Karpathy (AI能力) + First Principles (本质) |
| "如何培养创新文化" | Polanyi (科学共和国) + YC (创业生态) + Sam Altman (战略) |

## 输出格式

```markdown
# 🧠 Think Tank Analysis

## 📋 Problem
[用户问题描述]

## 👥 Advisory Board
[列出选择的2-3位顾问及理由]

---

## [顾问1姓名]'s Perspective
### 核心观点
[从该顾问角度的分析]

### 具体建议
[可操作的建议]

---

## [顾问2姓名]'s Perspective
### 核心观点
[从该顾问角度的分析]

### 具体建议
[可操作的建议]

---

## 🔬 Cross-Disciplinary Insights
[多顾问观点的综合洞察，寻找共识和分歧]

## 🎯 Integrated Action Plan
[综合所有建议的行动计划]

---

*Every expert sees a different facet of the truth. Together, they see the whole.*
```

## 调用子技能

当选择好顾问后，使用以下格式调用对应的子技能：

```
[专家姓名] says:
然后调用对应的 [专家]-mind skill 进行深度分析
```

## 自动归档（必须执行）

每次头脑天团分析完成后，必须将结果保存到本地：

```
目录: ./work/{YYYY-MM-DD}_{主题（10字内）}/
```

文件命名规范：
- `0-综合汇总.md` — 三视角交叉分析 + 综合行动路线（最重要，排在最前）
- `1-{顾问1姓名}视角.md` — 第一位顾问的完整分析
- `2-{顾问2姓名}视角.md` — 第二位顾问的完整分析
- `3-{顾问3姓名}视角.md` — 第三位顾问的完整分析（如有）

格式要求：
- 所有文件使用 Markdown 格式
- 综合汇总中包含指向各顾问视角文件的相对链接
- 文件头注明日期、顾问团、主题

示例：
```
./work/2026-04-07_Harness引擎/
├── 0-综合汇总.md
├── 1-karpathy视角.md
├── 2-第一性原理视角.md
└── 3-Polanyi视角.md
```

## 质量标准

- **相关性** - 选择的顾问必须与问题高度相关
- **多样性** - 不同顾问提供不同视角，避免重复
- **深度** - 每个顾问的分析必须有深度，不是泛泛而谈
- **可操作性** - 最终建议必须具体可执行
- **连贯性** - 多个顾问的观点应该能够整合成一致的方案

## 特殊模式

### 指定顾问模式
```
/think-tank [问题] --with Karpathy,Munger
```
用户可以手动指定要咨询的顾问

### 领域聚焦模式
```
/think-tank [问题] --focus 技术
```
只从特定领域选择顾问

### 冲突分析模式
```
/think-tank [问题] --debate
```
让不同观点的顾问进行辩论，找出核心分歧点

## 示例对话

### Example 1: 技术产品问题
**User:** "帮我思考如何设计一个AI编程助手的产品架构"

**Think Tank Response:**
```
🧠 分析中...
识别领域: 技术 + 产品
选择顾问: Karpathy (AI架构) + Claude PM (AI产品) + Jensen (计算优化)

[然后调用各顾问的深度分析...]
```

### Example 2: 人生决策
**User:** "我在纠结要不要辞职创业"

**Think Tank Response:**
```
🧠 分析中...
识别领域: 人生规划 + 商业
选择顾问: Charlie Munger (决策框架) + YC (创业现实) + Dan Koe (个人路径)

[然后调用各顾问的深度分析...]
```

## 子技能目录

所有子技能位于 `./skills/[advisor-name]-mind/SKILL.md`

当前可用顾问列表：
- `/karpathy-mind` - Andrej Karpathy (技术/AI)
- `/sam-altman-mind` - Sam Altman (战略/未来)
- `/elon-musk-mind` - Elon Musk (第一性原理)
- `/charlie-munger-mind` - Charlie Munger (决策/思维模型)
- `/warren-buffett-mind` - Warren Buffett (长期主义)
- `/dan-koe-mind` - Dan Koe (个人品牌/自由)
- `/first-principles-mind` - 第一性原理思考
- `/byte-pm-mind` - 字节产品思维
- `/alibaba-pm-mind` - 阿里产品思维
- `/claude-pm-mind` - Claude产品思维
- `/a16z-mind` - a16z 投资思维
- `/yc-mind` - Y Combinator 创业思维
- `/emotion-psychologist-mind` - 情感心理学
- `/michael-polanyi-mind` - Michael Polanyi (隐性知识/认知论)

## 注意事项

- 保持客观，不同观点都应该被尊重
- 当顾问观点冲突时，明确指出分歧点
- 最终综合应该是一致的、可执行的
- 不要编造不存在的观点或语录
- 保持谦逊，这是模拟而非真实咨询

---

*"The best way to get a good idea is to get lots of ideas."* — Linus Pauling
