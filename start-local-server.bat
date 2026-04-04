@echo off
cd /d "%~dp0"
echo Starting local server from: %cd%
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo Node.js is not installed or not in PATH.
  echo Install Node.js, then run this file again.
  pause
  exit /b 1
)
echo Node:
node -v
echo.
node serve-local.js
echo.
echo Local server stopped (or failed to start).
pause
