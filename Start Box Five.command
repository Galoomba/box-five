#!/bin/zsh -l
# Double-click to run Box Five on this laptop (with the Hue lights relay). Keep this window open.
cd "$(dirname "$0")"
if curl -s --max-time 1 http://localhost:8801/hue/ping | grep -q box-five-hue-relay; then
  echo "Box Five is already running."; open http://localhost:8801; exit 0
fi
(sleep 1; open http://localhost:8801) &
exec node scripts/serve.js
