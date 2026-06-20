import { Alert } from 'react-native';
import {
  RESULTS,
  check,
  request,
  openSettings,
  PERMISSIONS,
  Permission,
  checkNotifications,
  requestNotifications,
  PermissionStatus,
} from 'react-native-permissions';
import { getPlatformVersion, isAndroid, isIOS } from '@utils/helper';

type PermissionCheckResult = {
  granted: boolean;
  status: string;
};

function getAndroidReadMediaPermission(): Permission {
  // Android 13+ splits external storage into media-specific permissions
  const apiLevel = getPlatformVersion();
  if (apiLevel >= 33) {
    return PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
  }
  return PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
}

function getIOSPhotoPermission(): Permission {
  // Use PHOTO_LIBRARY for read access; use PHOTO_LIBRARY_ADD_ONLY when only adding.
  return PERMISSIONS.IOS.PHOTO_LIBRARY;
}

async function askForPermission(
  permission: Permission,
  rationaleTitle: string,
  rationaleMessage: string,
): Promise<PermissionCheckResult> {
  const current = await check(permission);
  if (current === RESULTS.GRANTED || current === RESULTS.LIMITED) {
    return { granted: true, status: current };
  }
  if (current === RESULTS.BLOCKED) {
    Alert.alert(rationaleTitle, rationaleMessage, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: () => openSettings() },
    ]);
    return { granted: false, status: current };
  }
  if (current === (RESULTS.DENIED as PermissionStatus)) {
    const next = await request(permission);
    if (next === RESULTS.BLOCKED) {
      Alert.alert(rationaleTitle, rationaleMessage, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => openSettings() },
      ]);
      return { granted: false, status: current };
    } else {
      return {
        granted: next === RESULTS.GRANTED || next === RESULTS.LIMITED,
        status: next,
      };
    }
  }

  const next = await request(permission);
  return {
    granted: next === RESULTS.GRANTED || next === RESULTS.LIMITED,
    status: next,
  };
}

export async function ensureReadExternalStoragePermission(): Promise<boolean> {
  if (isAndroid()) {
    const permission = getAndroidReadMediaPermission();
    const result = await askForPermission(
      permission,
      'Storage permission required',
      'Please allow access to your media so we can read photos and files.',
    );
    return result.granted;
  }

  if (isIOS()) {
    const permission = getIOSPhotoPermission();
    const result = await askForPermission(
      permission,
      'Photos access required',
      'Please allow access to your photo library so we can read photos.',
    );
    return result.granted;
  }
  return true;
}

export async function hasReadExternalStoragePermission(): Promise<boolean> {
  if (isAndroid()) {
    const permission = getAndroidReadMediaPermission();
    const status = await check(permission);
    return status === RESULTS.GRANTED || status === RESULTS.LIMITED;
  }
  if (isIOS()) {
    const permission = getIOSPhotoPermission();
    const status = await check(permission);
    return status === RESULTS.GRANTED || status === RESULTS.LIMITED;
  }
  return false;
}

export async function ensurePushNotificationPermission(): Promise<boolean> {
  const { status } = await checkNotifications();
  if (status === RESULTS.GRANTED) return true;
  if (status === RESULTS.BLOCKED) {
    Alert.alert(
      'Enable notifications',
      'Please enable notifications in Settings to receive alerts.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => openSettings() },
      ],
    );
    return false;
  }
  const { status: next } = await requestNotifications([
    'alert',
    'sound',
    'badge',
  ]);
  return next === RESULTS.GRANTED;
}

export async function hasPushNotificationPermission(): Promise<boolean> {
  const { status } = await checkNotifications();
  return status === RESULTS.GRANTED;
}
