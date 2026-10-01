export function isTestUnlocked(testId?: string, isAdmin: boolean = false): boolean {
  if (!testId) return true;

  // Admin always has full access
  if (isAdmin) return true;

  // Only check access control for mega tests or all india live tests
  const isMegaTest = testId.startsWith("mega-test-") || testId.includes("mega");
  if (!isMegaTest) return true;

  // Check purchased tests list in localStorage
  try {
    const rawPurchased = localStorage.getItem("studyflash_purchased_tests");
    const purchased: string[] = rawPurchased ? JSON.parse(rawPurchased) : [];
    if (Array.isArray(purchased) && purchased.includes(testId)) {
      return true;
    }
  } catch (e) {}

  // Check payment logs status in localStorage
  try {
    const rawLogs = localStorage.getItem("studyflash_all_india_payments");
    const logs: any[] = rawLogs ? JSON.parse(rawLogs) : [];
    if (Array.isArray(logs)) {
      const isApproved = logs.some(
        (log) => log && log.testId === testId && log.status === "approved"
      );
      if (isApproved) return true;
    }
  } catch (e) {}

  return false;
}
