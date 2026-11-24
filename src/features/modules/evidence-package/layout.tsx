import { ModuleCard } from '@/features/modules/module-card';
import { Colors } from '@/constants/colors';

export default function EvidencePackage() {
  return (
    <ModuleCard
      title="Dilekçe ve Kanıt Paketi"
      description="Mağduriyetinize ilişkin bilgileri bir araya getirin, başvurunuz için dilekçe ve belgelerinizi PDF olarak hazırlayın."
      icon={{ ios: 'doc.text', android: 'description', web: 'description' }}
      accent={Colors.modules.evidencePackage.accent}
      tint={Colors.modules.evidencePackage.tint}
    />
  );
}
