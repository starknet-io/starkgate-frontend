#!/bin/sh

echo "setting env vars"
sh ./scripts/set-env.sh

echo "starting nginx"
nginx -g "daemon off;"
