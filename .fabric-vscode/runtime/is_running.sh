#!/bin/sh
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error, print all commands.
set +ev

isRunning() {
  running=$(docker inspect -f '{{.State.Running}}' $1 2>/dev/null)
  if [ "$?" != "0" ]; then
    exit 1
  elif [ "${running}" != "true" ]; then
    exit 1
  fi
}

if [ "$#" -gt 0 ]; then
    isRunning fabricvscodelocalfabric-peer0.org1.example.com-$1-$2
else
  for container in fabricvscodelocalfabric_orderer.example.com fabricvscodelocalfabric_ca.org1.example.com fabricvscodelocalfabric_peer0.org1.example.com fabricvscodelocalfabric_couchdb fabricvscodelocalfabric_logspout; do
    isRunning $container;
  done
fi
exit 0
