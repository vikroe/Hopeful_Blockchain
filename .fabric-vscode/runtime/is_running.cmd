@echo off
rem
rem Copyright IBM Corp All Rights Reserved
rem
rem SPDX-License-Identifier: Apache-2.0
rem

setlocal enabledelayedexpansion

if not [%1] == [] (
  for /f "usebackq delims=" %%i in (`docker inspect -f {{.State.Running}} fabricvscodelocalfabric-peer0.org1.example.com-%1-%2 2^>:NUL`) do set running=%%i
  if not !errorlevel! == 0 (
    exit /b 1
  )
  if not "!running!" == "true" (
    exit /b 1
  )
) else (
  for %%c in (fabricvscodelocalfabric_orderer.example.com fabricvscodelocalfabric_ca.org1.example.com fabricvscodelocalfabric_peer0.org1.example.com fabricvscodelocalfabric_couchdb fabricvscodelocalfabric_logspout) do (
    for /f "usebackq delims=" %%i in (`docker inspect -f {{.State.Running}} %%c 2^>:NUL`) do set running=%%i
    if not !errorlevel! == 0 (
      exit /b 1
    )
    if not "!running!" == "true" (
      exit /b 1
    )
  )
)
exit /b 0
