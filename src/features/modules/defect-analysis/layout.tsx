import { ModuleCard } from '@/features/modules/module-card';

export default function DefectAnalysis() {
  return (
    <ModuleCard
      title="Görsel Kusur Analizi"
      description="Ürününüzün fotoğrafını yükleyin; çizik, kırık, çatlak ve diğer fiziksel kusurları yapay zekâ ile tespit edin."
      icon={{ ios: 'viewfinder', android: 'image_search', web: 'image_search' }}
      accent="#527083"
      tint="#F0F4F6"
    />
  );
}
