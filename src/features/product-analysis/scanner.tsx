import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';

import { ENDPOINTS } from '@/constants/ApiConfig';
import { Colors } from '@/constants/theme';
import { useFeedback } from '@/contextapis/FeedbackContext';
import { apiClient } from '@/services/ApiClient';
import { isProductAnalysisResponse } from './types';

export default function ProductBarcodeScanner() {
  const [permission, requestCameraPermission] = useCameraPermissions();
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [barcode, setBarcode] = useState('');
  const [hasScanned, setHasScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const permissionRequested = useRef(false);
  const hasScannedRef = useRef(false);
  const searchInProgress = useRef(false);
  const { hideAlert, showAlert, showToast } = useFeedback();

  const requestPermission = useCallback(async () => {
    setPermissionError(null);
    try {
      const result = await requestCameraPermission();
      if (!result.granted) {
        setPermissionError(
          result.canAskAgain
            ? 'Kamera izni verilmedi. Barkod numarasını elle girebilir veya tekrar deneyebilirsiniz.'
            : 'Kamera izni kapalı. Devam etmek için cihaz ayarlarından kamera erişimini açın.',
        );
      }
    } catch (error) {
      setPermissionError(
        error instanceof Error ? error.message : 'Kamera izni istenirken bir hata oluştu.',
      );
    }
  }, [requestCameraPermission]);

  useEffect(() => {
    if (permission && !permission.granted && !permissionRequested.current) {
      permissionRequested.current = true;
      void requestPermission();
    }
  }, [permission, requestPermission]);

  const handleBarcodeScanned = useCallback(({ data }: { data: string }) => {
    if (hasScannedRef.current) {
      return;
    }

    hasScannedRef.current = true;
    setBarcode(data);
    setHasScanned(true);
  }, []);

  const showSearchFailure = useCallback((isNetworkError: boolean) => {
    const title = isNetworkError ? 'Sunucuya ulaşılamadı' : 'Ürün bulunamadı';
    const message = isNetworkError
      ? 'İstek tamamlanamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.'
      : 'Barkod numarası hatalı olabilir veya ürün sistemimizde kayıtlı olmayabilir.';

    showAlert(title, message, [
      {
        text: 'Kapat',
        style: 'danger',
        action: () => {
          hideAlert();
          showToast(title, message, 'danger');
        },
      },
    ]);
  }, [hideAlert, showAlert, showToast]);

  const handleSearch = useCallback(async () => {
    const submittedBarcode = barcode.trim();
    if (!submittedBarcode || searchInProgress.current) {
      return;
    }

    searchInProgress.current = true;
    setIsLoading(true);

    try {
      const response = await apiClient.post(ENDPOINTS.barcode, { barcode: submittedBarcode });
      if (!response.ok || !isProductAnalysisResponse(response.data)) {
        showSearchFailure(response.status === 0 || response.status === 408 || response.status >= 500);
        return;
      }

      hideAlert();
      router.push({
        pathname: '/barcode/result',
        params: { result: JSON.stringify(response.data) },
      });
    } finally {
      searchInProgress.current = false;
      setIsLoading(false);
    }
  }, [barcode, hideAlert, showSearchFailure]);

  const handleRescan = useCallback(() => {
    hasScannedRef.current = false;
    setBarcode('');
    setHasScanned(false);
  }, []);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Barkod</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Barkodu okutun</Text>
        <Text style={styles.subtitle}>
          Ürünün barkodunu çerçevenin içine yerleştirin. Okunan numarayı isterseniz
          düzenleyebilirsiniz.
        </Text>

        <View style={styles.scannerFrame}>
          {!permission ? (
            <View style={styles.permissionPanel}>
              <Text style={styles.permissionTitle}>Kamera izni kontrol ediliyor</Text>
            </View>
          ) : permission.granted && !hasScanned ? (
            <View style={styles.cameraContainer}>
              <CameraView
                style={styles.camera}
                facing="back"
                barcodeScannerSettings={{
                  barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e'],
                }}
                onBarcodeScanned={handleBarcodeScanned}
              />
              <View pointerEvents="none" style={styles.scanGuide} />
            </View>
          ) : permission.granted ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Yeniden taramak için dokunun"
              onPress={handleRescan}
              style={({ pressed }) => [
                styles.scannedPanel,
                pressed && styles.scannedPanelPressed,
              ]}>
              <View style={styles.scannedIcon}>
                <SymbolView
                  name={{ ios: 'checkmark', android: 'check', web: 'check' }}
                  size={28}
                  tintColor={Colors.modules.productAnalysis.accent}
                />
              </View>
              <Text style={styles.scannedTitle}>Barkod algılandı</Text>
              <Text style={styles.scannedDescription}>
                Kamera durduruldu. Yeniden taramak için buraya dokunun.
              </Text>
            </Pressable>
          ) : (
            <View style={styles.permissionPanel}>
              <SymbolView
                name={{ ios: 'camera', android: 'photo_camera', web: 'photo_camera' }}
                size={30}
                tintColor={Colors.inactive}
              />
              <Text style={styles.permissionTitle}>Kamera erişimi gerekli</Text>
              <Text style={styles.permissionDescription}>
                Kamera izni olmadan barkod taranamaz. Barkod numarasını aşağıya elle de
                girebilirsiniz.
              </Text>
              {permission.canAskAgain && (
                <Pressable
                  accessibilityRole="button"
                  onPress={() => void requestPermission()}
                  style={styles.permissionButton}>
                  <Text style={styles.permissionButtonLabel}>Tekrar izin iste</Text>
                </Pressable>
              )}
              {permissionError && <Text style={styles.errorText}>{permissionError}</Text>}
            </View>
          )}
        </View>

        <Text style={styles.inputLabel}>Barkod numarası</Text>
        <TextInput
          accessibilityLabel="Barkod numarası"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          maxLength={14}
          onChangeText={(value) => {
            setBarcode(value);
          }}
          placeholder="Barkod numarasını girin"
          placeholderTextColor={Colors.inactive}
          editable={!isLoading}
          style={styles.input}
          value={barcode}
        />

        <Pressable
          accessibilityRole="button"
          disabled={!barcode.trim() || isLoading}
          onPress={() => void handleSearch()}
          style={({ pressed }) => [
            styles.searchButton,
            (!barcode.trim() || isLoading) && styles.searchButtonDisabled,
            pressed && styles.searchButtonPressed,
          ]}>
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.background} />
          ) : (
            <Text style={styles.searchLabel}>Barkodu ara</Text>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    color: Colors.active,
    fontSize: 16,
    fontWeight: '700',
  },
  scrollContent: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 28,
  },
  title: {
    color: Colors.active,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700',
  },
  subtitle: {
    color: Colors.secondaryText,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 20,
  },
  scannerFrame: {
    height: 250,
    overflow: 'hidden',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: Colors.softSurface,
    marginBottom: 22,
  },
  camera: {
    ...StyleSheet.absoluteFill,
  },
  cameraContainer: {
    flex: 1,
  },
  scanGuide: {
    position: 'absolute',
    top: '36%',
    right: '10%',
    left: '10%',
    height: 70,
    borderWidth: 2,
    borderColor: Colors.surface,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  permissionPanel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
  },
  permissionTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 12,
  },
  permissionDescription: {
    color: Colors.secondaryText,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
  },
  permissionButton: {
    marginTop: 16,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: Colors.active,
  },
  permissionButtonLabel: {
    color: Colors.background,
    fontSize: 14,
    fontWeight: '700',
  },
  errorText: {
    color: Colors.scannerError,
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  scannedPanel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  scannedPanelPressed: {
    opacity: 0.75,
  },
  scannedIcon: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 26,
    backgroundColor: Colors.scannerSuccess,
  },
  scannedTitle: {
    color: Colors.text,
    fontSize: 17,
    fontWeight: '700',
    marginTop: 12,
  },
  scannedDescription: {
    color: Colors.secondaryText,
    fontSize: 14,
    marginTop: 8,
    textAlign:"center"
  },
  inputLabel: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    backgroundColor: Colors.surface,
    color: Colors.text,
    fontSize: 16,
    paddingHorizontal: 15,
  },
  searchButton: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: Colors.active,
    marginTop: 16,
  },
  searchButtonDisabled: {
    backgroundColor: Colors.inactive,
  },
  searchButtonPressed: {
    opacity: 0.8,
  },
  searchLabel: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '700',
  },
});
