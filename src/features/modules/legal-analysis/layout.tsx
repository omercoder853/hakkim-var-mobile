import { ModuleCard } from '@/features/modules/module-card';

export default function LegalAnalysis() {
  return (
    <ModuleCard
      title="Hak ve Mevzuat Analizi"
      description="Yaşadığınız mağduriyeti analiz edin, ilgili tüketici haklarını ve yasal dayanakları öğrenin."
      icon={{ ios: 'scalemass', android: 'gavel', web: 'gavel' }}
      accent="#587966"
      tint="#F0F5F1"
    />
  );
}
