import { ModuleCard } from '@/features/modules/module-card';

export default function CompanyNotice() {
  return (
    <ModuleCard
      title="Firma Bilgileri ve Ön İhtar"
      description="Fatura veya fişinizden firma bilgilerini çıkarın, firmaya gönderebileceğiniz bir ihtar metni hazırlayın."
      icon={{ ios: 'building.2', android: 'business', web: 'business' }}
      accent="#79678A"
      tint="#F4F1F6"
    />
  );
}
