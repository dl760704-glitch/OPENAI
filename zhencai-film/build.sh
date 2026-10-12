#!/usr/bin/env bash
# 将 src/ 下的分段源码合并为单文件 HTML（无任何外部依赖）
set -e
cd "$(dirname "$0")"
OUT=zhencai_epic_film.html
{ cat src/head.html; cat src/00_core.js src/10_audio.js src/20_scenes_a.js src/30_scenes_b.js src/40_scenes_c.js src/50_main.js; printf '</script>\n</body>\n</html>\n'; } > "$OUT"
echo "built $OUT ($(wc -c < "$OUT") bytes)"
