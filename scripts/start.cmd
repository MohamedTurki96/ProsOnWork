set SCRIPT_DIR=%~dp0
cd /d %SCRIPT_DIR%\..
set PROJECT_DIR=%cd%

wt -w 0 ^
  nt --title "gateway"      cmd /k "cd /d %PROJECT_DIR% && nx serve gateway" ^; ^
  nt --title "user"         cmd /k "cd /d %PROJECT_DIR% && nx serve user" ^; ^
  nt --title "file"         cmd /k "cd /d %PROJECT_DIR% && nx serve file" ^; ^
  nt --title "catalog"      cmd /k "cd /d %PROJECT_DIR% && nx serve catalog" ^; ^
  nt --title "booking"      cmd /k "cd /d %PROJECT_DIR% && nx serve booking" ^; ^
  nt --title "feedback"     cmd /k "cd /d %PROJECT_DIR% && nx serve feedback" ^; ^
  nt --title "chat"         cmd /k "cd /d %PROJECT_DIR% && nx serve chat" ^; ^
  nt --title "notification" cmd /k "cd /d %PROJECT_DIR% && nx serve notification" ^; ^
  nt --title "payment"      cmd /k "cd /d %PROJECT_DIR% && nx serve payment" ^; ^
  nt --title "front"        cmd /k "cd /d %PROJECT_DIR% && nx serve front"
