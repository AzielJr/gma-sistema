@echo off
echo ========================================
echo    INICIANDO FRONTEND GMA - PORTA 5173
echo ========================================
echo.

echo [1/4] Finalizando processos nas portas...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5173" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| find ":8080" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1

echo [2/4] Aguardando liberacao das portas...
timeout /t 2 /nobreak >nul

echo [3/4] Iniciando servidor na porta 5173...
echo.
echo ========================================
echo     SERVIDOR INICIANDO EM:
echo     http://localhost:5173
echo ========================================
echo.

cd /d "%~dp0frontend"
set PORT=5173
set BROWSER=none

REM Iniciar o servidor em background
start /b npm start

REM Aguardar o servidor inicializar
echo [4/4] Aguardando servidor inicializar...
timeout /t 5 /nobreak >nul

REM Abrir o browser
echo Abrindo browser...
start http://localhost:5173

echo.
echo Servidor rodando! Pressione Ctrl+C para parar.
echo.
pause