/**
 * Return the local date key (YYYY-MM-DD)
 * Format: "YYYY-MM-DD"
 */
export const getLocalDateKey = (date: Date = new Date()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Return the complete local date with time 00:00:00
 * Useful for comparisons
 */
export const getLocalDateStart = (date: Date = new Date()): Date => {
  return new Date(
    date.getDate(),
    date.getMonth(),
    date.getFullYear(),
    0,
    0,
    0,
    0,
  );
};

/**
 * Check if a date-key is today
 * Useful for comparisons
 */
export const isToday = (dateKey: string): boolean => {
  return dateKey === getLocalDateKey();
};

/**
 * Check if a date-key is yesterday
 * Useful for comparisons
 */
export const isYesterday = (dateKey: string): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateKey === getLocalDateKey(yesterday);
};

/**
 * Format a date-key for display (ex: "Monday, April 7")
 */
export const formatDateKey = (
  dateKey: string,
  locale: string = "pt-PT",
): string => {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
