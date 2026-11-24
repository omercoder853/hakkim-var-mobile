import { ModuleCard } from '@/features/modules/module-card';
import { Colors } from '@/constants/colors';

export default function LegalAnalysis() {
  return (
    <ModuleCard
      title="Hak ve Mevzuat Analizi"
      description="Yaşadığınız mağduriyeti analiz edin, ilgili tüketici haklarını ve yasal dayanakları öğrenin."
      icon={{ ios: 'scalemass', android: 'gavel', web: 'gavel' }}
      accent={Colors.modules.legalAnalysis.accent}
      tint={Colors.modules.legalAnalysis.tint}
    />
  );
}
