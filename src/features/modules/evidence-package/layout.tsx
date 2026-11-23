import { ModuleCard } from '@/features/modules/module-card';

export default function EvidencePackage() {
  return (
    <ModuleCard
      title="Dilekçe ve Kanıt Paketi"
      description="Mağduriyetinize ilişkin bilgileri bir araya getirin, başvurunuz için dilekçe ve belgelerinizi PDF olarak hazırlayın."
      icon={{ ios: 'doc.text', android: 'description', web: 'description' }}
      accent="#96685C"
      tint="#F7F1EF"
    />
  );
}
