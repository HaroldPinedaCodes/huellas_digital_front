// components/product-guarantee-tag.tsx
import { Shield } from "lucide-react";

interface GuaranteeType {
  type: string;
  terms: string;
  hasGarantee: boolean; // Nota: está escrito 'Garantee' no 'Guarantee'
  duration_days: string;
}

interface ProductGuaranteeTagProps {
  guarantee?: GuaranteeType;
}

export function ProductGuaranteeTag({ guarantee }: ProductGuaranteeTagProps) {
  if (!guarantee?.hasGarantee) return null;

  return (
    <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md text-sm font-medium">
      <Shield size={16} />
      <span>Garantía Palatibilidad</span>
    </div>
  );
}
