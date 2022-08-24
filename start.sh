#!/bin/sh

echo "setting env vars"
sh set-env.sh

echo "starting nginx"
nginx -g "daemon off;"
