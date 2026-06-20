@echo off
echo Cleaning project build...
cd android
gradlew.bat clean
gradlew.bat cleanBuildCache
cd ..

echo Cleaning Gradle caches...
rd /s /q "%USERPROFILE%\.gradle\caches"

echo Cleaning Temp...
rd /s /q "%TEMP%\metro-*" 2>nul
del /q /f /s "%TEMP%\*" 2>nul

echo Done!
pause
