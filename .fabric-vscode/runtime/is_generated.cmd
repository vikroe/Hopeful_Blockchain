@echo off
rem
rem Copyright IBM Corp All Rights Reserved
rem
rem SPDX-License-Identifier: Apache-2.0
rem
setlocal enabledelayedexpansion
for %%v in (fabricvscodelocalfabric_orderer.example.com fabricvscodelocalfabric_ca.org1.example.com fabricvscodelocalfabric_peer0.org1.example.com fabricvscodelocalfabric_couchdb) do (
  docker volume inspect %%v > :NUL 2>&1
  if !ERRORLEVEL! neq 0 ( 
    exit /b 1
  )
)
if not exist generate.complete (
  exit /b 1
)
exit /b 0