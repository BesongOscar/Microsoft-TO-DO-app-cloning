# Xcodes
My react native projects

## Expo prebuild advisory
`expo-doctor` may report:
"Check for app config fields that may not be synced in a non-CNG project."

This project keeps native folders (`android/` and/or `ios/`) and uses `app.json` config fields. To keep native projects synced with app config, run prebuild whenever config changes and in CI/build pipelines:

`npx expo prebuild`
