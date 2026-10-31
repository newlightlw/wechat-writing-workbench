#!/bin/zsh
cd "$(dirname "$0")"
if ! command -v node >/dev/null; then
  export NVM_DIR="$HOME/.nvm"
  [[ -s "$NVM_DIR/nvm.sh" ]] && source "$NVM_DIR/nvm.sh"
fi
if ! command -v node >/dev/null; then
  echo '需要先安装 Node.js 20 或更新版本。'; read; exit 1
fi
if [[ ! -d node_modules ]]; then npm ci || exit 1; fi
if curl -fsS http://127.0.0.1:8796/api/initial >/dev/null 2>&1; then
 open http://127.0.0.1:8796
 exit 0
fi
(sleep 2; open http://127.0.0.1:8796) &
node server.mjs "$@"
