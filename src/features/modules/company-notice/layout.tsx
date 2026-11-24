import { ModuleCard } from '@/features/modules/module-card';
import { Colors } from '@/constants/colors';

export default function CompanyNotice() {
  return (
    <ModuleCard
      title="Firma Bilgileri ve Ön İhtar"
      description="Fatura veya fişinizden firma bilgilerini çıkarın, firmaya gönderebileceğiniz bir ihtar metni hazırlayın."
      icon={{ ios: 'building.2', android: 'business', web: 'business' }}
      accent={Colors.modules.companyNotice.accent}
      tint={Colors.modules.companyNotice.tint}
    />
  );
}
