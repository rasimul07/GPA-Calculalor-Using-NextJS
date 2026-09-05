import { calculateDgpa } from './gpaCalculations';

export function calculateSgpa(obtained, full) {
  const ob = parseFloat(obtained);
  const fl = parseFloat(full);
  if (!fl || fl <= 0 || Number.isNaN(ob) || Number.isNaN(fl)) return '0.00';
  return (ob / fl).toFixed(2);
}

export function sgpaToPercentage(sgpa) {
  const value = parseFloat(sgpa);
  if (Number.isNaN(value)) return '0.00';
  return ((value / 10) * 100).toFixed(2);
}

export function getSemesterCount(credits) {
  if (!credits || credits.length === 0) return 0;
  return credits.length / 2;
}

export function getCourseYearsFromCredits(credits) {
  const semesters = getSemesterCount(credits);
  if (semesters === 0) return 4;
  return Math.max(1, Math.ceil(semesters / 2));
}

export function calculateYgpasFromSemesterCredits(credits) {
  const numSem = getSemesterCount(credits);
  const numYears = Math.ceil(numSem / 2);
  const ygpas = [];

  for (let y = 0; y < numYears; y++) {
    let obtained = 0;
    let full = 0;

    for (let s = 0; s < 2; s++) {
      const semIndex = y * 2 + s;
      const base = semIndex * 2;
      if (base + 1 < credits.length) {
        obtained += parseFloat(credits[base] || 0);
        full += parseFloat(credits[base + 1] || 0);
      }
    }

    ygpas.push(full > 0 ? (obtained / full).toFixed(2) : '0.00');
  }

  return ygpas;
}

export function calculateCgpaFromCredits(credits) {
  if (!credits || credits.length === 0) return '0.00';

  let obtained = 0;
  let full = 0;

  for (let i = 0; i < credits.length; i += 2) {
    obtained += parseFloat(credits[i] || 0);
    full += parseFloat(credits[i + 1] || 0);
  }

  if (full <= 0) return '0.00';
  return (obtained / full).toFixed(2);
}

export function calculateOverallPercentageFromCredits(credits) {
  if (!credits || credits.length === 0) return '0.00';

  let obtained = 0;
  let full = 0;

  for (let i = 0; i < credits.length; i += 2) {
    obtained += parseFloat(credits[i] || 0);
    full += parseFloat(credits[i + 1] || 0);
  }

  if (full <= 0) return '0.00';
  return ((obtained / (full * 10)) * 100).toFixed(2);
}

export function validateSemesterCredits(credits) {
  if (!credits || credits.length === 0) {
    return { valid: false, message: 'Please add at least one semester.' };
  }

  if (credits.length % 2 !== 0) {
    return { valid: false, message: 'Invalid credit data format.' };
  }

  for (let i = 0; i < credits.length; i++) {
    const value = credits[i];
    if (value === '' || value === null || value === undefined) {
      return { valid: false, message: 'Please fill in all credit fields.' };
    }
    const num = parseFloat(value);
    if (Number.isNaN(num) || num < 0) {
      return { valid: false, message: 'Credit values must be valid numbers.' };
    }
    if (i % 2 === 1 && num <= 0) {
      return { valid: false, message: 'Full credit must be greater than zero.' };
    }
  }

  return { valid: true, message: '' };
}

export function buildProfileBreakdown(credits, isLateralEntry = false) {
  const safeCredits = credits || [];
  const semesterCount = getSemesterCount(safeCredits);
  const courseYears = getCourseYearsFromCredits(safeCredits);

  const semesters = [];
  for (let s = 0; s < semesterCount; s++) {
    const obtained = safeCredits[s * 2] ?? '';
    const full = safeCredits[s * 2 + 1] ?? '';
    const sgpa = calculateSgpa(obtained, full);
    semesters.push({
      semester: s + 1,
      year: Math.ceil((s + 1) / 2),
      obtained,
      full,
      sgpa,
      percentage: sgpaToPercentage(sgpa),
    });
  }

  const ygpaValues = calculateYgpasFromSemesterCredits(safeCredits);
  const years = ygpaValues.map((ygpa, index) => ({
    year: index + 1,
    ygpa,
    percentage: sgpaToPercentage(ygpa),
  }));

  const dgpa = semesterCount > 0
    ? calculateDgpa(ygpaValues, courseYears, isLateralEntry)
    : '0.00';

  const cgpa = calculateCgpaFromCredits(safeCredits);
  const overallPercentage = calculateOverallPercentageFromCredits(safeCredits);

  return {
    semesters,
    years,
    dgpa,
    cgpa,
    overallPercentage,
    courseYears,
    semesterCount,
  };
}
