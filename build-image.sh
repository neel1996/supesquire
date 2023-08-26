#!/bin/bash

docker build -t supesquire $(
    for i in $(cat .env.local); do out+="--build-arg $i "; done
    echo $out
    unset out
) .
