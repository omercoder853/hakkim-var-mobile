import { ModuleCard } from '@/features/modules/module-card';

export default function ProductAnalysis() {
  return (
    <ModuleCard
      title="Ürün ve İçerik Analizi"
      description="Ürün barkodunu tarayarak içeriğini, alerjenlerini, besin değerlerini, güvenlik uyarılarını ve ürün bilgilerini inceleyin."
      icon={{ ios: 'barcode.viewfinder', android: 'qr_code_scanner', web: 'qr_code_scanner' }}
      accent="#527C79"
      tint="#EFF5F4"
    />
  );
}
