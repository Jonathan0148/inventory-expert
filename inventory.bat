@echo off
rem Desplegar el proyecto

rem Iniciar el servidor de desarrollo de Angular
start cmd /c "cd /d D:\InventoryExpert\code\inventory-expert\front && ng serve --port 4200 --open"

rem Esperar un momento antes de abrir la siguiente pestaña
timeout /t 10 >nul

rem Iniciar el servidor de Laravel
start cmd /c "cd /d D:\InventoryExpert\code\inventory-expert\back && php artisan serve --port 8000"

pause
