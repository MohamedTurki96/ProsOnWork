@echo off
set SCRIPT_DIR=%~dp0
cd /d %SCRIPT_DIR%\..
set PROJECT_DIR=%cd%
set DELAY=3

start "gateway"      cmd /k "cd /d %PROJECT_DIR% && nx serve gateway"
timeout /t %DELAY% /nobreak
start "user"         cmd /k "cd /d %PROJECT_DIR% && nx serve user"
timeout /t %DELAY% /nobreak
start "file"         cmd /k "cd /d %PROJECT_DIR% && nx serve file"
timeout /t %DELAY% /nobreak
start "catalog"      cmd /k "cd /d %PROJECT_DIR% && nx serve catalog"
timeout /t %DELAY% /nobreak
start "booking"      cmd /k "cd /d %PROJECT_DIR% && nx serve booking"
timeout /t %DELAY% /nobreak
start "feedback"     cmd /k "cd /d %PROJECT_DIR% && nx serve feedback"
timeout /t %DELAY% /nobreak
start "chat"         cmd /k "cd /d %PROJECT_DIR% && nx serve chat"
timeout /t %DELAY% /nobreak
start "notification" cmd /k "cd /d %PROJECT_DIR% && nx serve notification"
timeout /t %DELAY% /nobreak
start "payment"      cmd /k "cd /d %PROJECT_DIR% && nx serve payment"
timeout /t %DELAY% /nobreak
start "front"        cmd /k "cd /d %PROJECT_DIR% && nx serve front"
