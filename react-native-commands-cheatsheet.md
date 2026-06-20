# React Native Developer Command Cheatsheet

Essential commands for day-to-day React Native development — running, building, signing,
and cleaning your project. Commands are written for **Windows PowerShell** unless marked
otherwise (iOS/Xcode/CocoaPods commands require **macOS Terminal**, since Xcode doesn't run on Windows).

> 💡 If you primarily use **Git Bash** instead of PowerShell, swap `.\gradlew.bat` → `./gradlew` and `Remove-Item -Recurse -Force` → `rm -rf`.

---

## 1. `package.json` Scripts Reference

```json
{
  "scripts": {
    "android": "react-native run-android --active-arch-only",
    "ios": "react-native run-ios",
    "lint": "eslint .",
    "start": "react-native start",
    "android-debug-apk": "cd android && gradlew.bat assembleDebug",
    "android-release-apk": "cd android && gradlew.bat assembleRelease",
    "android-release-aab": "cd android && gradlew.bat bundleRelease"
  }
}
```

Run any of these with `npm run <script-name>` (e.g. `npm run android`) or `yarn <script-name>`.

---

## 2. Start Metro Bundler

```powershell
npx react-native start
```

```powershell
# Reset Metro cache (fixes "stuck" bundles, stale code, weird errors)
npx react-native start --reset-cache
```

---

## 3. Run on Android

```powershell
# Run on default/connected device or emulator
npx react-native run-android

# Build only for the device's active architecture (faster builds)
npx react-native run-android --active-arch-only

# Run a specific build variant
npx react-native run-android --variant=release

# List connected devices/emulators
adb devices

# Run on a specific device (when multiple are connected)
npx react-native run-android --deviceId=<device-id>
```

---

## 4. Run on iOS *(macOS Terminal only)*

```bash
# Run on default simulator
npx react-native run-ios

# Run on a specific simulator
npx react-native run-ios --simulator="iPhone 15 Pro"

# Run on a connected physical device
npx react-native run-ios --device "Your iPhone Name"

# Run a release configuration
npx react-native run-ios --configuration Release

# List all available simulators
xcrun simctl list devices

# Boot a specific simulator manually
xcrun simctl boot "iPhone 15 Pro"

# Open the project in Xcode
open ios/YourAppName.xcworkspace
```

---

## 5. Android Build Commands (APK / AAB)

Run from the project root — these `cd` into `/android` first:

```powershell
# Debug APK
cd android
.\gradlew.bat assembleDebug

# Release APK
.\gradlew.bat assembleRelease

# Release AAB (Android App Bundle, for Play Store)
.\gradlew.bat bundleRelease
```

Output locations:
- Debug APK: `android/app/build/outputs/apk/debug/app-debug.apk`
- Release APK: `android/app/build/outputs/apk/release/app-release.apk`
- Release AAB: `android/app/build/outputs/bundle/release/app-release.aab`

### Android Clean Build

```powershell
cd android
.\gradlew.bat clean
```

```powershell
# Nuclear option — wipe Gradle caches too
Remove-Item -Recurse -Force android\.gradle
Remove-Item -Recurse -Force android\app\build
.\gradlew.bat clean
```

---

## 6. Generate a `.jks` Keystore File

```powershell
keytool -genkeypair -v -storetype PKCS12 `
  -keystore my-release-key.jks `
  -alias my-key-alias `
  -keyalg RSA `
  -keysize 2048 `
  -validity 10000
```

You'll be prompted for a keystore password, key password, and certificate details (name, org, country, etc.). Keep the `.jks` file and passwords safe — losing them means you can never update your app on the Play Store under the same listing.

---

## 7. View SHA-1 / SHA-256 Fingerprints

```powershell
# From a specific keystore file
keytool -list -v -keystore my-release-key.jks -alias my-key-alias

# From the default debug keystore (Windows default path)
keytool -list -v -keystore "$env:USERPROFILE\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
```

```powershell
# Or, via Gradle — prints SHA-1/SHA-256 for ALL variants (debug + release)
cd android
.\gradlew.bat signingReport
```

> Useful for Google Sign-In, Firebase, and any service requiring SHA fingerprints registered in their console.

---

## 8. Xcode Build Clean *(macOS Terminal only)*

```bash
# Clean build folder via xcodebuild
xcodebuild clean -workspace ios/YourAppName.xcworkspace -scheme YourAppName

# Clear Xcode's DerivedData (fixes most "weird" build errors)
rm -rf ~/Library/Developer/Xcode/DerivedData

# From inside Xcode itself: Cmd + Shift + K (Clean), Cmd + Shift + Option + K (Clean Build Folder)
```

---

## 9. CocoaPods Commands *(macOS Terminal only)*

```bash
cd ios

# Install pods
pod install

# Update the local pod spec repo, then install
pod install --repo-update

# Fully remove all pods and the Podfile.lock (use before a fresh install when things are broken)
pod deintegrate
rm Podfile.lock
pod install

# Update a single pod
pod update <PodName>
```

---

## 10. Lint & Type Checking

```powershell
# Run ESLint
npm run lint

# Run ESLint with auto-fix
npx eslint . --fix

# TypeScript type-check without emitting files
npx tsc --noEmit
```

---

## 11. Cache & node_modules Cleanup

```powershell
# Clear Metro cache
npx react-native start --reset-cache

# Clear Watchman (if installed) — fixes file-watching issues
watchman watch-del-all

# Clear npm cache
npm cache clean --force

# Full node_modules reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

---

## 12. ADB Essentials (Android Debugging)

```powershell
# List connected devices
adb devices

# View live device logs
adb logcat

# Filter logs by your app's tag
adb logcat *:S ReactNative:V ReactNativeJS:V

# Install an APK manually
adb install android\app\build\outputs\apk\debug\app-debug.apk

# Uninstall the app
adb uninstall com.yourapp.packagename

# Forward Metro port to device (useful for physical device debugging)
adb reverse tcp:8081 tcp:8081

# Restart ADB server (fixes "device not found" issues)
adb kill-server
adb start-server
```

---

## 13. General Project Health Checks

```powershell
# Diagnose common environment/setup issues
npx react-native doctor

# Print environment info (versions of Node, RN, Xcode, Android SDK, etc.) — useful for bug reports
npx react-native info

# Check outdated dependencies
npm outdated
```

---

## Quick Reference Table

| Task                          | Command                                              | Platform |
|-------------------------------|-------------------------------------------------------|----------|
| Start Metro                   | `npx react-native start`                              | Both     |
| Run Android                   | `npx react-native run-android`                        | Windows  |
| Run iOS                       | `npx react-native run-ios`                            | macOS    |
| Run on specific iOS simulator | `npx react-native run-ios --simulator="..."`          | macOS    |
| Debug APK                     | `gradlew.bat assembleDebug`                           | Windows  |
| Release APK                   | `gradlew.bat assembleRelease`                         | Windows  |
| Release AAB                   | `gradlew.bat bundleRelease`                           | Windows  |
| Gradle clean                  | `gradlew.bat clean`                                   | Windows  |
| Generate keystore              | `keytool -genkeypair ...`                             | Both     |
| View SHA-1                    | `gradlew.bat signingReport`                           | Windows  |
| Xcode clean                   | `xcodebuild clean ...`                                | macOS    |
| Clear DerivedData              | `rm -rf ~/Library/Developer/Xcode/DerivedData`        | macOS    |
| Pod install                   | `pod install`                                          | macOS    |
| Lint                           | `npm run lint`                                         | Both     |
| Reset Metro cache               | `npx react-native start --reset-cache`               | Both     |
| ADB devices                   | `adb devices`                                          | Both     |

---

## Notes

- `keytool` ships with the JDK, so it works in plain Windows PowerShell — no macOS needed for keystore/SHA-1 work.
- iOS-specific steps (CocoaPods, Xcode, simulators) require an actual Mac, since Xcode doesn't run on Windows. If you're on Windows full-time, these are typically run via a CI service (e.g. Bitrise, Codemagic, GitHub Actions with a macOS runner) or a teammate's/cloud Mac.
- `gradlew.bat` is the Windows wrapper script; macOS/Linux use `./gradlew` instead (no `.bat`).
