#!/bin/sh

content="window.__env__ = {"

# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')

    content="${content} $varname: \"$varvalue\","
    echo $varname $varvalue
  fi
done < <(printenv | grep REACT_APP)

content="${content} };"
echo $content > ./usr/share/nginx/html/env-config.js
