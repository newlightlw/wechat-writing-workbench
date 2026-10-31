# 安装、验证与发布

## 安装

```bash
python3 scripts/install_skills.py --target codex --dry-run
python3 scripts/install_skills.py --target codex
```

Claude Code 使用 `--target claude`；`--dest` 可指定隔离目录。安装器只复制本包 skill，同名目录跳过，不改宿主配置。不要据此认定宿主已经发现了新 skill；在新会话检查。
技能之间使用相邻目录引用，完整安装可保留依赖；手动挑选时按引用一并安装。
`wechat-article` 保留阶段确认要求；新步骤 skill 处理已明确材料，避免重复询问。

## 检查

```bash
python3 scripts/validate.py
python3 scripts/test_installer.py
cd tools/wechat-md
npm ci
npm test
cd ../..
node scripts/check_formatter.mjs
python3 scripts/build_release.py
```

检查范围：本地 Markdown 链接、skill 入口与名称、顾问依赖、常见凭证与个人路径模式、文件校验值；安装 dry-run 与不覆盖；排版渲染、HTML 清理、服务接口、本地图片与跨站请求限制；发行 ZIP 清单。

模式扫描不是完整隐私或安全审计。每个顾问的推理质量、模型效果和所有历史引文没有在此验证。真实公众号编辑器、手机预览与实际发表需要在账号中操作。

## 更新与发行

先审查内容与许可证，再运行 `python3 scripts/update_checksums.py`，通过全部检查后生成 ZIP。发行工具只打包 checksums.json 列出的文件，排除 Git、node_modules、运行输出和私人 work 目录。
来源变更时同步更新 manifest.json 和来源说明。
