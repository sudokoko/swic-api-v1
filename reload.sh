#!/bin/bash

echo "stopping node";
killall node
echo "starting node";
nohup npm run start &