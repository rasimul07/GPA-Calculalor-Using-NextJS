"use client";

import { createContext, useContext, useState, useCallback } from "react";
import {
  getCreditArrayLength,
  calculateYgpasFromAllCredits,
  calculateDgpa,
} from "../utils/gpaCalculations";

const DGPAContext = createContext(null);

export function DGPAProvider({ children }) {
  const [courseYears, setCourseYearsState] = useState(4);
  const [isLateralEntry, setIsLateralEntryState] = useState(false);
  const [creditValues, setCreditValues] = useState(
    new Array(getCreditArrayLength(4, false)).fill("")
  );
  const [ygpas, setYgpas] = useState([]);
  const [dgpa, setDgpa] = useState("");

  const resetCreditsForYears = useCallback((years, lateral) => {
    const len = getCreditArrayLength(years, lateral);
    setCreditValues(new Array(len).fill(""));
    setYgpas([]);
    setDgpa("");
  }, []);

  const setCourseYears = useCallback(
    (years) => {
      const lateral = years === 4 && isLateralEntry;
      if (years !== 4) setIsLateralEntryState(false);
      setCourseYearsState(years);
      resetCreditsForYears(years, lateral);
    },
    [isLateralEntry, resetCreditsForYears]
  );

  const setIsLateralEntry = useCallback(
    (lateral) => {
      setIsLateralEntryState(lateral);
      resetCreditsForYears(courseYears, lateral);
    },
    [courseYears, resetCreditsForYears]
  );

  const computeAndStoreYgpas = useCallback(() => {
    const computed = calculateYgpasFromAllCredits(
      creditValues,
      courseYears,
      isLateralEntry
    );
    setYgpas(computed);
    return computed;
  }, [creditValues, courseYears, isLateralEntry]);

  const computeAndStoreDgpa = useCallback(
    (ygpasToUse) => {
      const source = ygpasToUse ?? ygpas;
      const result = calculateDgpa(source, courseYears, isLateralEntry);
      setDgpa(result);
      return result;
    },
    [ygpas, courseYears, isLateralEntry]
  );

  const resetAll = useCallback(() => {
    setCourseYearsState(4);
    setIsLateralEntryState(false);
    setCreditValues(new Array(getCreditArrayLength(4, false)).fill(""));
    setYgpas([]);
    setDgpa("");
  }, []);

  const loadFromProfile = useCallback(({ credits, isLateralEntry: lateral, breakdown }) => {
    const safeCredits = credits || [];
    const courseYears = breakdown?.courseYears ?? Math.max(1, Math.ceil(safeCredits.length / 4));
    const lateralEntry = Boolean(lateral);
    const needed = getCreditArrayLength(courseYears, lateralEntry);

    setCourseYearsState(courseYears);
    setIsLateralEntryState(lateralEntry);

    const padded = [...safeCredits];
    while (padded.length < needed) padded.push("");
    setCreditValues(padded.slice(0, needed));
    setYgpas([]);
    setDgpa("");
  }, []);

  return (
    <DGPAContext.Provider
      value={{
        courseYears,
        setCourseYears,
        isLateralEntry,
        setIsLateralEntry,
        creditValues,
        setCreditValues,
        ygpas,
        setYgpas,
        dgpa,
        setDgpa,
        resetCreditsForYears,
        computeAndStoreYgpas,
        computeAndStoreDgpa,
        resetAll,
        loadFromProfile,
      }}
    >
      {children}
    </DGPAContext.Provider>
  );
}

export function useDGPA() {
  const context = useContext(DGPAContext);
  if (!context) {
    throw new Error("useDGPA must be used within a DGPAProvider");
  }
  return context;
}
