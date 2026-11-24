import { ModuleCard } from '@/features/modules/module-card';
import { Colors } from '@/constants/colors';

export default function ApplicationGuide() {
  return (
    <ModuleCard
      title="TÜBİS Başvuru Rehberi"
      description="Tüketici Hakem Heyeti başvurusunu, gerekli belgeleri ve başvuru adımlarını takip edin."
      icon={{ ios: 'list.clipboard', android: 'fact_check', web: 'fact_check' }}
      accent={Colors.modules.applicationGuide.accent}
      tint={Colors.modules.applicationGuide.tint}
    />
  );
}
