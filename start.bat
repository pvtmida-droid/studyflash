@echo off
cd /d "%~dp0"
echo ===================================================
echo   Starting StudyFlash Local Development Server
echo ===================================================
echo.
echo Opening browser at http://localhost:3000...
start http://localhost:3000
echo.
npm run dev
pause
