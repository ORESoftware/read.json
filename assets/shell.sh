#!/usr/bin/env bash

read_json_get_latest(){
  . "$HOME/.oresoftware/bash/read_json.sh";
}

read.json(){
   read_json "$@"
}


read_json(){

   if [ -z "$(command -v read_json)" ]; then
      npm install -g "@oresoftware/read.json" || {
         return 1;
      }
   fi

   command read_json "$@"
}


export -f read.json;
export -f read_json;
