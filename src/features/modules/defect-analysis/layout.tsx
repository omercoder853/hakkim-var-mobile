import { ModuleCard } from '@/features/modules/module-card';
import { Colors } from '@/constants/colors';

export default function DefectAnalysis() {
  return (
    <ModuleCard
      title="Görsel Kusur Analizi"
      description="Ürününüzün fotoğrafını yükleyin; çizik, kırık, çatlak ve diğer fiziksel kusurları yapay zekâ ile tespit edin."
      icon={{ ios: 'viewfinder', android: 'image_search', web: 'image_search' }}
      accent={Colors.modules.defectAnalysis.accent}
      tint={Colors.modules.defectAnalysis.tint}
    />
  );
}
