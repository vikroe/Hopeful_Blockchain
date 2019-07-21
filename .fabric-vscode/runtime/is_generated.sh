#!/bin/sh
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error, print all commands.
set +ev
for volume in fabricvscodelocalfabric_orderer.example.com fabricvscodelocalfabric_ca.org1.example.com fabricvscodelocalfabric_peer0.org1.example.com fabricvscodelocalfabric_couchdb; do
  if ! docker volume inspect $volume > /dev/null 2>&1; then 
    exit 1
  fi
done
if [ ! -f generate.complete ]; then
  exit 1
fi
exit 0