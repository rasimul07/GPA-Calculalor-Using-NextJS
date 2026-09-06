/**
 * YGPA for one year from 4 credit values: [obt1, full1, obt2, full2]
 */
export function calculateYgpaFromYearCredits(fourCredits) {
  if (!fourCredits || fourCredits.length < 4) return '0.00';

  let obtained = 0;
  let full = 0;

  fourCredits.forEach((value, index) => {
    const num = parseFloat(value);
    if (Number.isNaN(num)) return;
    if (index % 2 === 0) {
      obtained += num;
    } else {
      full += num;
    }
  });

  if (obtained <= 0) return '0.00';
  return (full / obtained).toFixed(2);
}

/**
 * Number of years that need credit input
 */
export function getActiveYearCount(courseYears, isLateralEntry) {
  if (courseYears === 4 && isLateralEntry) return 3;
  return courseYears;
}

/**
 * Year labels for display (e.g. lateral 4-year → [2, 3, 4])
 */
export function getActiveYearLabels(courseYears, isLateralEntry) {
  const count = getActiveYearCount(courseYears, isLateralEntry);
  const startYear = courseYears === 4 && isLateralEntry ? 2 : 1;
  return Array.from({ length: count }, (_, i) => startYear + i);
}

/**
 * Flat credit array length for active years
 */
export function getCreditArrayLength(courseYears, isLateralEntry) {
  return getActiveYearCount(courseYears, isLateralEntry) * 4;
}

/**
 * Compute YGPAs from flat credit array
 */
export function calculateYgpasFromAllCredits(credits, courseYears, isLateralEntry) {
  const yearCount = getActiveYearCount(courseYears, isLateralEntry);
  const ygpas = [];

  for (let y = 0; y < yearCount; y++) {
    const start = y * 4;
    const yearCredits = credits.slice(start, start + 4);
    ygpas.push(calculateYgpaFromYearCredits(yearCredits));
  }

  return ygpas;
}

/**
 * Human-readable formula for the current course configuration
 */
export function getDgpaFormulaText(courseYears, isLateralEntry) {
  if (courseYears === 4 && isLateralEntry) {
    return 'DGPA = (YGPA2 + 1.5 × YGPA3 + 1.5 × YGPA4) / 4';
  }
  if (courseYears === 1) return 'DGPA = YGPA1';
  if (courseYears === 2) return 'DGPA = (YGPA1 + YGPA2) / 2';
  if (courseYears === 3) return 'DGPA = (YGPA1 + YGPA2 + YGPA3) / 3';
  if (courseYears === 4) return 'DGPA = (YGPA1 + YGPA2 + 1.5 × YGPA3 + 1.5 × YGPA4) / 5';
  if (courseYears === 5) return 'DGPA = (YGPA1 + YGPA2 + YGPA3 + YGPA4 + YGPA5) / 5';
  return '';
}

/**
 * Calculate DGPA from YGPAs using official MAKAUT formulas
 */
export function calculateDgpa(ygpas, courseYears, isLateralEntry = false) {
  if (!ygpas || ygpas.length === 0) return '0.00';

  const values = ygpas.map((y) => parseFloat(y));

  if (courseYears === 4 && isLateralEntry) {
    if (values.length < 3) return '0.00';
    const sum = values[0] + 1.5 * values[1] + 1.5 * values[2];
    return (sum / 4).toFixed(2);
  }

  if (courseYears === 1) {
    return values[0].toFixed(2);
  }

  if (courseYears === 2 || courseYears === 3 || courseYears === 5) {
    const sum = values.reduce((acc, v) => acc + v, 0);
    return (sum / courseYears).toFixed(2);
  }

  if (courseYears === 4) {
    if (values.length < 4) return '0.00';
    const sum = values[0] + values[1] + 1.5 * values[2] + 1.5 * values[3];
    return (sum / 5).toFixed(2);
  }

  return '0.00';
}

/**
 * Validate all credit fields are filled and numeric with obtained > 0 and full > 0
 */
export function validateCredits(credits) {
  if (!credits || credits.length === 0) {
    return { valid: false, message: 'Please fill in all credit fields.' };
  }

  for (let i = 0; i < credits.length; i++) {
    if (credits[i] === '' || credits[i] === null || credits[i] === undefined) {
      return { valid: false, message: 'Please fill in all credit fields.' };
    }
    const num = parseFloat(credits[i]);
    if (Number.isNaN(num) || num < 0) {
      return { valid: false, message: 'Credit values must be valid numbers.' };
    }
    if (i % 2 === 0 && num <= 0) {
      return { valid: false, message: 'Obtained credit must be greater than zero.' };
    }
    if (i % 2 === 1 && num <= 0) {
      return { valid: false, message: 'Full credit must be greater than zero.' };
    }
  }

  return { valid: true, message: '' };
}
