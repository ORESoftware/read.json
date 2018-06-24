#!/usr/bin/env bash

get_latest_read_json(){
  . "$HOME/.oresoftware/bash/read_json.sh";
}

read.json(){
   read_json "$@"
}


read_json(){

   if ! type -f read_json &> /dev/null || ! which read_json &> /dev/null; then

      echo "Installing '@oresoftware/read.json' globally.";
      npm i -s -g '@oresoftware/read.json' || {
         echo "Could not install '@oresoftware/read.json' globally.";
         echo "Please check your permissions to install global NPM packages.";
         return 1;
      }
   fi

   command read_json "$@"
}


export -f read.json;
export -f read_json;
export -f get_latest_read_json;
