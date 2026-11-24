import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/colors';
import { parseProductAnalysisResponse } from '@/features/product-analysis/types';

export default function ProductAnalysisResultScreen() {
  const { result: serializedResult } = useLocalSearchParams<{ result?: string }>();
  const result = parseProductAnalysisResponse(serializedResult);

  if (!result) {
    return (
      <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerTitle}>Ürün sonucu</Text>
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Ürün bilgisi açılamadı</Text>
          <Text style={styles.emptyDescription}>
            Sonuç verisi bulunamadı. Barkodu yeniden tarayıp tekrar deneyebilirsiniz.
          </Text>
          <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backAction}>
            <Text style={styles.backActionText}>Barkod taramaya dön</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const { data } = result;
  const grade = data.health_scores?.nutriscore_grade?.trim().toUpperCase();
  const detailImages = [
    { key: 'ingredients', label: 'İçindekiler', uri: data.images?.ingredients_url },
    { key: 'nutrition', label: 'Besin değerleri', uri: data.images?.nutrition_url },
  ].filter((image): image is { key: string; label: string; uri: string } => Boolean(image.uri));

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Ürün sonucu</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.successLabel}>
          <SymbolView
            name={{ ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' }}
            size={18}
            tintColor={Colors.success}
          />
          <Text style={styles.successLabelText}>Analiz tamamlandı</Text>
        </View>

        <View style={styles.productCard}>
          <View style={styles.heroImageContainer}>
            {data.images?.front_url ? (
              <Image
                accessibilityLabel={`${data.product_name} ürün görseli`}
                contentFit="contain"
                source={{ uri: data.images.front_url }}
                style={styles.heroImage}
                transition={200}
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <SymbolView
                  name={{ ios: 'shippingbox', android: 'inventory_2', web: 'inventory_2' }}
                  size={44}
                  tintColor={Colors.inactive}
                />
              </View>
            )}
          </View>

          <View style={styles.productInfo}>
            <Text style={styles.eyebrow}>ÜRÜN BİLGİLERİ</Text>
            <Text style={styles.productName}>{data.product_name}</Text>
            {!!data.brand && <Text style={styles.brand}>{data.brand}</Text>}
            <View style={styles.metadataRow}>
              {!!data.quantity && (
                <View style={styles.metadataPill}>
                  <Text style={styles.metadataText}>{data.quantity}</Text>
                </View>
              )}
              <View style={styles.metadataPill}>
                <Text style={styles.metadataText}>Barkod: {data.barcode}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.scoreCard}>
          <View style={styles.scoreTextContainer}>
            <Text style={styles.sectionEyebrow}>BESİN DEĞERLENDİRMESİ</Text>
            <Text style={styles.scoreDescription}>
              {data.health_scores?.nutriscore_description || 'Besin değerlendirmesi bulunmuyor.'}
            </Text>
            {!!grade && <Text style={styles.scoreCaption}>Nutri-Score</Text>}
          </View>
          <View style={styles.scoreBadge}>
            <Text style={styles.scoreGrade}>{grade || '—'}</Text>
          </View>
        </View>

        {detailImages.length > 0 && (
          <View style={styles.imagesSection}>
            <Text style={styles.sectionTitle}>Ürün etiketleri</Text>
            <View style={styles.detailImagesRow}>
              {detailImages.map((image) => (
                <View key={image.key} style={styles.detailImageCard}>
                  <Text style={styles.detailImageTitle}>{image.label}</Text>
                  <Image
                    accessibilityLabel={`${image.label} görseli`}
                    contentFit="contain"
                    source={{ uri: image.uri }}
                    style={styles.detailImage}
                    transition={200}
                  />
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function BackButton() {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Geri dön"
      hitSlop={12}
      onPress={() => router.back()}
      style={styles.backButton}>
      <SymbolView
        name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }}
        size={21}
        tintColor={Colors.active}
      />
    </Pressable>
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
  backButton: {
    width: 40,
    height: 44,
    justifyContent: 'center',
  },
  headerTitle: {
    marginLeft: 8,
    color: Colors.active,
    fontSize: 16,
    fontWeight: '700',
  },
  scrollContent: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 32,
  },
  successLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 14,
  },
  successLabelText: {
    color: Colors.success,
    fontSize: 14,
    fontWeight: '700',
  },
  productCard: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    backgroundColor: Colors.surface,
  },
  heroImageContainer: {
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    backgroundColor: Colors.softSurface,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: {
    padding: 20,
  },
  eyebrow: {
    marginBottom: 7,
    color: Colors.secondaryText,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  productName: {
    color: Colors.text,
    fontSize: 23,
    lineHeight: 29,
    fontWeight: '700',
  },
  brand: {
    marginTop: 4,
    color: Colors.secondaryText,
    fontSize: 15,
  },
  metadataRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  metadataPill: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: Colors.background,
    borderWidth:1,
    borderColor:Colors.active
  },
  metadataText: {
    color: Colors.active,
    fontSize: 12,
    fontWeight: '600',
  },
  scoreCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 14,
    padding: 18,
    borderRadius: 18,
    backgroundColor: Colors.healthScoreBackground,
  },
  scoreTextContainer: {
    flex: 1,
  },
  sectionEyebrow: {
    marginBottom: 6,
    color: Colors.healthScoreText,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  scoreDescription: {
    color: Colors.text,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '600',
  },
  scoreCaption: {
    marginTop: 5,
    color: Colors.secondaryText,
    fontSize: 12,
  },
  scoreBadge: {
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: Colors.healthScoreBadgeBackground,
  },
  scoreGrade: {
    color: Colors.healthScoreText,
    fontSize: 28,
    fontWeight: '800',
  },
  imagesSection: {
    marginTop: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    color: Colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  detailImagesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  detailImageCard: {
    flex: 1,
    minWidth: 145,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    backgroundColor: Colors.surface,
  },
  detailImageTitle: {
    marginBottom: 8,
    color: Colors.active,
    fontSize: 13,
    fontWeight: '700',
  },
  detailImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    backgroundColor: Colors.softSurface,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  emptyTitle: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyDescription: {
    marginTop: 8,
    color: Colors.secondaryText,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  backAction: {
    marginTop: 20,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.active,
  },
  backActionText: {
    color: Colors.background,
    fontSize: 14,
    fontWeight: '700',
  },
});
