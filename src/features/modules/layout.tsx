import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import DefectAnalysis from '@/features/modules/defect-analysis/layout';
import LegalAnalysis from '@/features/modules/legal-analysis/layout';
import EvidencePackage from '@/features/modules/evidence-package/layout';
import CompanyNotice from '@/features/modules/company-notice/layout';
import ApplicationGuide from '@/features/modules/application-guide/layout';
import ProductAnalysis from '@/features/modules/product-analysis/layout';

export default function ModulesLayout() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Modüller</Text>
          <Text style={styles.subtitle}>
            İhtiyacınıza uygun araçları seçerek sürecinizi kolayca yönetin.
          </Text>
          <View style={styles.cards}>
            <DefectAnalysis />
            <LegalAnalysis />
            <EvidencePackage />
            <CompanyNotice />
            <ApplicationGuide />
            <ProductAnalysis />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  content: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    color: Colors.active,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  },
  subtitle: {
    color: Colors.secondaryText,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  cards: {
    gap: 12,
    marginTop: 22,
  },
});
