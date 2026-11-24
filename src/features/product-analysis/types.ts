export type ProductAnalysisResponse = {
  success: true;
  message?: string;
  barcode: string;
  data: {
    barcode: string;
    product_name: string;
    brand?: string | null;
    quantity?: string | null;
    images?: {
      front_url?: string | null;
      ingredients_url?: string | null;
      nutrition_url?: string | null;
    } | null;
    health_scores?: {
      nutriscore_grade?: string | null;
      nutriscore_description?: string | null;
    } | null;
  };
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function hasOptionalString(record: Record<string, unknown>, key: string) {
  return !(key in record) || record[key] === null || typeof record[key] === 'string';
}

export function isProductAnalysisResponse(value: unknown): value is ProductAnalysisResponse {
  if (
    !isRecord(value) ||
    value.success !== true ||
    typeof value.barcode !== 'string' ||
    !isRecord(value.data)
  ) {
    return false;
  }

  const { data } = value;
  if (
    typeof data.barcode !== 'string' ||
    typeof data.product_name !== 'string' ||
    !hasOptionalString(value, 'message') ||
    !hasOptionalString(data, 'brand') ||
    !hasOptionalString(data, 'quantity')
  ) {
    return false;
  }

  if (data.images !== undefined && data.images !== null) {
    if (
      !isRecord(data.images) ||
      !hasOptionalString(data.images, 'front_url') ||
      !hasOptionalString(data.images, 'ingredients_url') ||
      !hasOptionalString(data.images, 'nutrition_url')
    ) {
      return false;
    }
  }

  if (data.health_scores !== undefined && data.health_scores !== null) {
    if (
      !isRecord(data.health_scores) ||
      !hasOptionalString(data.health_scores, 'nutriscore_grade') ||
      !hasOptionalString(data.health_scores, 'nutriscore_description')
    ) {
      return false;
    }
  }

  return true;
}

export function parseProductAnalysisResponse(
  serialized: string | string[] | undefined,
): ProductAnalysisResponse | null {
  if (typeof serialized !== 'string') {
    return null;
  }

  try {
    const value: unknown = JSON.parse(serialized);
    return isProductAnalysisResponse(value) ? value : null;
  } catch (error) {
    if (error instanceof SyntaxError) {
      return null;
    }
    throw error;
  }
}
