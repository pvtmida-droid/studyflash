import { useState, useEffect } from "react";
import upiQrCode from "../assets/upi_qr_code.png";
import { db, doc, setDoc, collection, getDocs } from "../lib/firebase";
import {
  ArrowLeft,
  Calendar,
  User,
  Camera,
  Globe,
  Calculator,
  Brain,
  Rocket,
  Eye,
  Key,
  FileText,
  BarChart3,
  ChevronRight,
  ArrowRight,
  Trophy,
  Sparkles,
  Search,
  CheckCircle2,
  Lock,
  QrCode,
  Copy,
  Check,
  X,
  ShieldCheck,
  CreditCard,
  Smartphone,
  AlertCircle,
  Clock,
} from "lucide-react";

interface AllIndiaMockTestsViewProps {
  isHindi: boolean;
  onBack: () => void;
  onAttemptTest: (testId?: string) => void;
  onViewResults: () => void;
}

const DEFAULT_UPI_ID = "blasterking@ybl";
const TEST_PRICE = 50;

const MOCK_TEST_CARDS = [
  {
    id: "mega-test-1",
    titleEn: "All India Mega Test #1",
    titleHi: "ऑल इंडिया मेगा टेस्ट #1",
    price: 50,
    answerKeyPdfUrl: "",
    imageUrl: "https://ibb.co/1GXqn4fy",
    testDate: "15 September 2026",
    totalMarks: 100,
    teacher: "Vikash kumar yadav",
    hindi: 20,
    english: 20,
    gkgs: 20,
    math: 20,
    reasoning: 20,
    badge: "LIVE BATTLE",
    isLive: true,
  },
  {
    id: "mega-test-2",
    titleEn: "All India Mega Test #2",
    titleHi: "ऑल इंडिया मेगा टेस्ट #2",
    price: 30,
    answerKeyPdfUrl: "",
    imageUrl: "https://i.ibb.co/RT60SJpr/munna-sir.jpg",
    testDate: "10 September 2026",
    totalMarks: 100,
    teacher: "Munna Sir",
    hindi: 20,
    english: 20,
    gkgs: 20,
    math: 20,
    reasoning: 20,
    badge: "ACTIVE",
    isLive: false,
  },
  {
    id: "mega-test-3",
    titleEn: "All India Mega Test #3",
    titleHi: "ऑल इंडिया मेगा टेस्ट #3",
    price: 20,
    answerKeyPdfUrl: "",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    testDate: "05 September 2026",
    totalMarks: 100,
    teacher: "Vishwash sir",
    hindi: 20,
    english: 20,
    gkgs: 20,
    math: 20,
    reasoning: 20,
    badge: "ACTIVE",
    isLive: false,
  },
  {
    id: "mega-test-4",
    titleEn: "All India Special Test #4",
    titleHi: "ऑल इंडिया स्पेशल टेस्ट #4",
    price: 20,
    answerKeyPdfUrl: "",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    testDate: "01 September 2026",
    totalMarks: 100,
    teacher: "Ranjan sir",
    hindi: 20,
    english: 20,
    gkgs: 20,
    math: 20,
    reasoning: 20,
    badge: "PRACTICE",
    isLive: false,
  },
  {
    id: "mega-test-5",
    titleEn: "All India Practice Test #5",
    titleHi: "ऑल इंडिया प्रैक्टिस टेस्ट #5",
    price: 10,
    answerKeyPdfUrl: "",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    testDate: "25 August 2026",
    totalMarks: 100,
    teacher: "Guddu singh",
    hindi: 20,
    english: 20,
    gkgs: 20,
    math: 20,
    reasoning: 20,
    badge: "PRACTICE",
    isLive: false,
  },
];

export default function AllIndiaMockTestsView({
  isHindi,
  onBack,
  onAttemptTest,
  onViewResults,
}: AllIndiaMockTestsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTestForPayment, setSelectedTestForPayment] = useState<any | null>(null);
  const [studentName, setStudentName] = useState("");
  const [utrNumber, setUtrNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [activePaymentTab, setActivePaymentTab] = useState<"utr" | "txn">("utr");
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic Payment Settings State
  const [upiId, setUpiId] = useState<string>(() => {
    return localStorage.getItem("studyflash_upi_id") || DEFAULT_UPI_ID;
  });
  const [testPrice, setTestPrice] = useState<number>(() => {
    const saved = localStorage.getItem("studyflash_test_price");
    return saved ? Number(saved) || TEST_PRICE : TEST_PRICE;
  });
  const [customTestPrices, setCustomTestPrices] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("studyflash_test_prices_custom");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [customPdfUrls, setCustomPdfUrls] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem("studyflash_test_pdf_urls_custom");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [customImageUrls, setCustomImageUrls] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem("studyflash_test_image_urls_custom");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const getTestPrice = (testCard: any) => {
    if (!testCard) return testPrice || 20;
    if (customTestPrices && customTestPrices[testCard.id] !== undefined && customTestPrices[testCard.id] !== null) {
      return Number(customTestPrices[testCard.id]);
    }
    return testCard.price !== undefined ? Number(testCard.price) : testPrice;
  };

  const getTestPdfUrl = (testCard: any) => {
    if (!testCard) return "";
    if (customPdfUrls && customPdfUrls[testCard.id]) {
      return customPdfUrls[testCard.id];
    }
    return testCard.answerKeyPdfUrl || "";
  };

  const getTestImage = (testCard: any) => {
    if (!testCard) return "/teacher_avatar.png";
    if (customImageUrls && customImageUrls[testCard.id]) {
      return customImageUrls[testCard.id];
    }
    return testCard.imageUrl || "/teacher_avatar.png";
  };

  // Purchased test IDs & Payment logs stored in localStorage + Firebase
  const [purchasedTests, setPurchasedTests] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("studyflash_purchased_tests");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [paymentLogs, setPaymentLogs] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("studyflash_all_india_payments");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Sync payments from localStorage & Firebase Firestore periodically
  useEffect(() => {
    let isMounted = true;

    const syncPayments = async () => {
      try {
        const rawLogs = localStorage.getItem("studyflash_all_india_payments");
        const parsedLogs = rawLogs ? JSON.parse(rawLogs) : [];
        let logs: any[] = Array.isArray(parsedLogs) ? parsedLogs : [];

        const rawPurchased = localStorage.getItem("studyflash_purchased_tests");
        const parsedPurchased = rawPurchased ? JSON.parse(rawPurchased) : [];
        let purchased: string[] = Array.isArray(parsedPurchased) ? parsedPurchased : [];

        // Try syncing settings & payments from Firebase Firestore
        try {
          // 1. Sync Settings
          const settingsSnap = await getDocs(collection(db, "settings"));
          settingsSnap.forEach((docSnap) => {
            if (docSnap.id === "payment_settings") {
              const data = docSnap.data();
              if (data.upiId && isMounted) {
                setUpiId(data.upiId);
                localStorage.setItem("studyflash_upi_id", data.upiId);
              }
              if (data.testPrice && isMounted) {
                setTestPrice(Number(data.testPrice));
                localStorage.setItem("studyflash_test_price", String(data.testPrice));
              }
              if (data.customTestPrices && isMounted) {
                setCustomTestPrices(data.customTestPrices);
                localStorage.setItem("studyflash_test_prices_custom", JSON.stringify(data.customTestPrices));
              }
              if (data.customPdfUrls && isMounted) {
                setCustomPdfUrls(data.customPdfUrls);
                localStorage.setItem("studyflash_test_pdf_urls_custom", JSON.stringify(data.customPdfUrls));
              }
              if (data.customImageUrls && isMounted) {
                setCustomImageUrls(data.customImageUrls);
                localStorage.setItem("studyflash_test_image_urls_custom", JSON.stringify(data.customImageUrls));
              }
            }
          });

          // 2. Sync Payments
          const snapshot = await getDocs(collection(db, "all_india_payments"));
          if (!snapshot.empty) {
            const firestoreLogs: any[] = [];
            snapshot.forEach((docSnap) => {
              const data = docSnap.data();
              if (data && data.id) firestoreLogs.push(data);
            });

            // Merge local and firestore logs by ID
            const logMap = new Map<string, any>();
            [...logs, ...firestoreLogs].forEach((item) => {
              if (item && item.id) logMap.set(item.id, item);
            });
            logs = Array.from(logMap.values());

            // Sync approved items to purchased
            logs.forEach((item) => {
              if (item.status === "approved" && item.testId && !purchased.includes(item.testId)) {
                purchased.push(item.testId);
              }
            });

            try {
              localStorage.setItem("studyflash_all_india_payments", JSON.stringify(logs));
              localStorage.setItem("studyflash_purchased_tests", JSON.stringify(purchased));
            } catch {}
          }
        } catch (fbErr) {
          // Firebase offline or network issue - fallback to local
        }

        if (isMounted) {
          setPaymentLogs(logs);
          setPurchasedTests(purchased);
        }
      } catch (err) {
        console.error("Payment sync error:", err);
      }
    };

    syncPayments();
    const interval = setInterval(syncPayments, 4000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleUnlockTest = async (testId: string) => {
    const enteredName = studentName.trim();
    const enteredUtr = utrNumber.trim();
    const enteredTxn = transactionId.trim();

    if (!enteredName) {
      alert(isHindi ? "कृपया अपना नाम दर्ज करें।" : "Please enter your full name.");
      return;
    }

    if (!enteredUtr && !enteredTxn) {
      alert(
        isHindi
          ? "कृपया भुगतान सत्यापित करने के लिए UTR नंबर या Transaction ID दर्ज करें।"
          : "Please enter UTR Number or Transaction ID to verify payment."
      );
      return;
    }

    // Capture title before async operation
    const currentTestTitle = selectedTestForPayment
      ? (isHindi ? selectedTestForPayment.titleHi : selectedTestForPayment.titleEn)
      : "All India Test";

    setIsVerifying(true);

    const paymentId = "pay_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
    const newLog = {
      id: paymentId,
      studentName: enteredName,
      testId,
      testTitle: currentTestTitle,
      utrNumber: enteredUtr || "N/A",
      transactionId: enteredTxn || "N/A",
      amount: getTestPrice(selectedTestForPayment),
      status: "pending", // PENDING ADMIN APPROVAL!
      date: new Date().toLocaleString(),
    };

    // 1. Save to LocalStorage safely
    let updatedLogs: any[] = [newLog];
    try {
      const rawLogs = localStorage.getItem("studyflash_all_india_payments");
      const parsed = rawLogs ? JSON.parse(rawLogs) : [];
      const existingLogs = Array.isArray(parsed) ? parsed : [];
      updatedLogs = [newLog, ...existingLogs];
      localStorage.setItem("studyflash_all_india_payments", JSON.stringify(updatedLogs));
      setPaymentLogs(updatedLogs);
    } catch (err) {
      console.error("LocalStorage save error:", err);
    }

    // 2. Save to Firebase Firestore safely
    try {
      await setDoc(doc(db, "all_india_payments", paymentId), newLog);
    } catch (fbErr) {
      console.warn("Firestore payment save warning:", fbErr);
    }

    setTimeout(() => {
      setIsVerifying(false);
      setSelectedTestForPayment(null);
      setStudentName("");
      setUtrNumber("");
      setTransactionId("");
      showToast(
        isHindi
          ? `⏳ भुगतान विवरण सबमिट हो गया! एडमिन (Admin) द्वारा UTR सत्यापित करने के बाद टेस्ट अनलॉक होगा।`
          : `⏳ Payment details submitted! Test will be unlocked after Admin verifies your UTR.`
      );
    }, 800);
  };

  const getCardPaymentStatus = (testId: string) => {
    const safePurchased = Array.isArray(purchasedTests) ? purchasedTests : [];
    const safeLogs = Array.isArray(paymentLogs) ? paymentLogs : [];

    if (safePurchased.includes(testId)) return "approved";
    const testLogs = safeLogs.filter((log: any) => log && log.testId === testId);
    if (testLogs.length === 0) return "none";
    return testLogs[0]?.status || "pending"; // "pending" | "approved" | "rejected" | "none"
  };

  const filteredTests = MOCK_TEST_CARDS.filter(
    (t) =>
      t.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.titleHi.includes(searchTerm) ||
      t.testDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-20 pt-4 px-4 relative">
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-700 text-white font-extrabold px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce border-2 border-emerald-400">
          <CheckCircle2 className="w-6 h-6 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-slate-700 transition-colors shrink-0"
            title="Go Back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-wide uppercase border border-emerald-200 dark:border-emerald-500/20 mb-1">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              {isHindi ? "ऑल इंडिया टेस्ट सीरीज़" : "All India Test Series"}
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              {isHindi
                ? "ऑल इंडिया लाइव & मेगा मॉक टेस्ट्स"
                : "All India Live & Mega Mock Tests"}
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
              {isHindi
                ? "100 प्रश्नों का प्रीमियम लाइव टेस्ट (प्रत्येक विषय के 20 प्रश्न) - मात्र ₹20 में अनलॉक करें।"
                : "Attempt 100 questions premium live test (20 per subject) - Unlock for ₹20 only."}
            </p>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder={isHindi ? "टेस्ट खोजें..." : "Search tests..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-emerald-500 font-medium"
          />
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-bold">{isHindi ? "कुल टेस्ट" : "Total Tests"}</div>
            <div className="text-lg font-extrabold text-slate-900 dark:text-white">5 Active Tests</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-bold">{isHindi ? "कुल प्रश्न" : "Total Questions"}</div>
            <div className="text-lg font-extrabold text-slate-900 dark:text-white">100 MCQs / Test</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-bold">{isHindi ? "टेस्ट शुल्क" : "Test Fee"}</div>
            <div className="text-lg font-extrabold text-emerald-700 dark:text-emerald-400">₹20 / Test</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-bold">{isHindi ? "रैंकिंग" : "Ranking"}</div>
            <div className="text-lg font-extrabold text-slate-900 dark:text-white">All India Rank</div>
          </div>
        </div>
      </div>

      {/* 5 TEST CARDS GRID */}
      <div className="space-y-6">
        {filteredTests.map((testCard) => {
          const cardStatus = getCardPaymentStatus(testCard.id);

          return (
            <div
              key={testCard.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 rounded-[28px] p-5 md:p-7 shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-2xl group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full mix-blend-screen pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />

              <div className="relative z-10 space-y-5">
                {/* CARD TITLE STRIP */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white">
                        {isHindi ? testCard.titleHi : testCard.titleEn}
                      </h3>
                      <div className="text-xs text-slate-400 font-medium">
                        {isHindi ? "फुल लेंथ मॉक टेस्ट • 100 अंक" : "Full Length Mock Test • 100 Marks"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {cardStatus === "approved" ? (
                      <span className="px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-black uppercase tracking-wider flex items-center gap-1 border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" /> UNLOCKED
                      </span>
                    ) : cardStatus === "pending" ? (
                      <span className="px-3.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 text-xs font-black uppercase tracking-wider flex items-center gap-1 border border-amber-300 animate-pulse">
                        <Clock className="w-3.5 h-3.5 text-amber-600" /> PENDING APPROVAL
                      </span>
                    ) : cardStatus === "rejected" ? (
                      <span className="px-3.5 py-1 rounded-full bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-300 text-xs font-black uppercase tracking-wider flex items-center gap-1 border border-red-300">
                        <AlertCircle className="w-3.5 h-3.5" /> PAYMENT REJECTED
                      </span>
                    ) : (
                      <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-black uppercase tracking-wider flex items-center gap-1 border border-emerald-300">
                        <Lock className="w-3.5 h-3.5" /> ₹{getTestPrice(testCard)} ONLY
                      </span>
                    )}
                  </div>
                </div>

                {/* TOP ROW: Profile Pic + 5 Subject Badges */}
                <div className="flex flex-col md:flex-row items-stretch gap-4">
                  {/* Profile Picture with Camera Icon */}
                  <div className="relative shrink-0 flex items-center justify-center">
                    <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md group/pic">
                      <img
                        src={getTestImage(testCard)}
                        alt="Teacher Avatar"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover/pic:scale-105"
                        onError={(e: any) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                        }}
                      />
                      <div className="absolute bottom-1 right-1 bg-emerald-600 text-white rounded-full p-1.5 border-2 border-white dark:border-slate-900 shadow-md flex items-center justify-center">
                        <Camera className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* 5 Subjects Cards Grid */}
                  <div className="flex-1 grid grid-cols-5 gap-2 items-center justify-between">
                    {/* Hindi */}
                    <div className="flex flex-col items-center justify-between p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center h-full space-y-2 hover:border-emerald-200 transition-colors">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 font-extrabold text-base flex items-center justify-center shadow-xs">
                        अ
                      </div>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                        Hindi
                      </span>
                      <div className="w-full py-1 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 font-extrabold text-sm rounded-xl">
                        {testCard.hindi}
                      </div>
                    </div>

                    {/* English */}
                    <div className="flex flex-col items-center justify-between p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center h-full space-y-2 hover:border-blue-200 transition-colors">
                      <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 font-bold text-[10px] flex items-center justify-center shadow-xs leading-tight">
                        A B C
                      </div>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                        English
                      </span>
                      <div className="w-full py-1 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-blue-700 dark:text-blue-400 font-extrabold text-sm rounded-xl">
                        {testCard.english}
                      </div>
                    </div>

                    {/* GK/GS */}
                    <div className="flex flex-col items-center justify-between p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center h-full space-y-2 hover:border-amber-200 transition-colors">
                      <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 font-bold text-sm flex items-center justify-center shadow-xs">
                        <Globe className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                        GK/GS
                      </span>
                      <div className="w-full py-1 bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/60 text-amber-700 dark:text-amber-400 font-extrabold text-sm rounded-xl">
                        {testCard.gkgs}
                      </div>
                    </div>

                    {/* Math */}
                    <div className="flex flex-col items-center justify-between p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center h-full space-y-2 hover:border-purple-200 transition-colors">
                      <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 font-bold text-sm flex items-center justify-center shadow-xs">
                        <Calculator className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                        Math
                      </span>
                      <div className="w-full py-1 bg-purple-50 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800/60 text-purple-700 dark:text-purple-400 font-extrabold text-sm rounded-xl">
                        {testCard.math}
                      </div>
                    </div>

                    {/* Reasoning */}
                    <div className="flex flex-col items-center justify-between p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center h-full space-y-2 hover:border-emerald-200 transition-colors">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 font-bold text-sm flex items-center justify-center shadow-xs">
                        <Brain className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                        Reasoning
                      </span>
                      <div className="w-full py-1 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 font-extrabold text-sm rounded-xl">
                        {testCard.reasoning}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ACTION BUTTONS PANEL */}
                <div className="space-y-3 pt-1">
                  {/* MAIN BIG ACTION BUTTON */}
                  {cardStatus === "approved" ? (
                    <button
                      onClick={() => onAttemptTest(testCard.id)}
                      className="w-full py-4 px-6 font-extrabold rounded-2xl transition-all text-base md:text-lg shadow-lg flex items-center justify-between bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white shadow-emerald-700/20 hover:shadow-emerald-700/40 group/mainbtn"
                    >
                      <div className="flex items-center gap-3">
                        <Rocket className="w-5 h-5 transition-transform group-hover/mainbtn:translate-x-0.5 group-hover/mainbtn:-translate-y-0.5" />
                        <span>{isHindi ? "टेस्ट शुरू करें (Attempt Test)" : "Start Test (Unlocked)"}</span>
                      </div>
                      <ArrowRight className="w-6 h-6 transition-transform group-hover/mainbtn:translate-x-1" />
                    </button>
                  ) : cardStatus === "pending" ? (
                    <button
                      onClick={() => {
                        alert(
                          isHindi
                            ? "⏳ आपका भुगतान विवरण (नाम और UTR) सबमिट हो चुका है। एडमिन द्वारा UTR सत्यापित करने के बाद टेस्ट अनलॉक हो जाएगा।"
                            : "⏳ Your payment details are submitted. Admin is verifying your UTR number."
                        );
                      }}
                      className="w-full py-4 px-6 font-extrabold rounded-2xl transition-all text-base md:text-lg shadow-lg flex items-center justify-between bg-amber-600 hover:bg-amber-700 active:scale-98 text-white shadow-amber-600/20 group/mainbtn"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 animate-spin" />
                        <span>{isHindi ? "स्वीकृति लंबित है (Approval Pending)" : "Approval Pending (Admin Review)"}</span>
                      </div>
                      <ArrowRight className="w-6 h-6 transition-transform group-hover/mainbtn:translate-x-1" />
                    </button>
                  ) : cardStatus === "rejected" ? (
                    <button
                      onClick={() => setSelectedTestForPayment(testCard)}
                      className="w-full py-4 px-6 font-extrabold rounded-2xl transition-all text-base md:text-lg shadow-lg flex items-center justify-between bg-red-600 hover:bg-red-700 active:scale-98 text-white shadow-red-600/20 group/mainbtn"
                    >
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5" />
                        <span>{isHindi ? `पेमेंट अस्वीकृत - पुनः प्रयास करें (₹${getTestPrice(testCard)})` : `Payment Rejected - Retry (₹${getTestPrice(testCard)})`}</span>
                      </div>
                      <ArrowRight className="w-6 h-6 transition-transform group-hover/mainbtn:translate-x-1" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedTestForPayment(testCard)}
                      className="w-full py-4 px-6 font-extrabold rounded-2xl transition-all text-base md:text-lg shadow-lg flex items-center justify-between bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white shadow-emerald-700/20 hover:shadow-emerald-700/40 group/mainbtn"
                    >
                      <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-amber-300" />
                        <span>{isHindi ? `टेस्ट अनलॉक करें (Buy Test – ₹${getTestPrice(testCard)})` : `Buy Test – ₹${getTestPrice(testCard)} (Unlock Now)`}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-emerald-800 px-3 py-1 rounded-full font-bold border border-emerald-500">
                          ₹{getTestPrice(testCard)}
                        </span>
                        <ArrowRight className="w-6 h-6 transition-transform group-hover/mainbtn:translate-x-1" />
                      </div>
                    </button>
                  )}

                  {/* 2x2 Grid of Secondary Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* View Results */}
                    <button
                      type="button"
                      onClick={() => {
                        if (cardStatus === "approved") {
                          onViewResults();
                        } else {
                          alert(
                            isHindi
                              ? "🔒 परिणाम देखने के लिए पहले एडमिन (Admin) द्वारा पेमेंट सत्यापित होना अनिवार्य है।"
                              : "🔒 Payment verification required by Admin before viewing results."
                          );
                        }
                      }}
                      className={`p-3 rounded-2xl border transition-all flex items-center justify-between text-xs md:text-sm font-bold ${
                        cardStatus === "approved"
                          ? "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:bg-blue-50/50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 group/subbtn cursor-pointer"
                          : "border-slate-200/60 dark:border-slate-800/40 bg-slate-100/50 dark:bg-slate-900/40 text-slate-400 dark:text-slate-500 opacity-60 grayscale cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl ${
                          cardStatus === "approved"
                            ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                        }`}>
                          {cardStatus === "approved" ? <Eye className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        </div>
                        <span>{isHindi ? "परिणाम देखें" : "View Results"}</span>
                      </div>
                      {cardStatus === "approved" ? (
                        <ChevronRight className="w-4 h-4 text-blue-500 group-hover/subbtn:translate-x-0.5 transition-transform" />
                      ) : (
                        <span className="text-[10px] font-extrabold uppercase bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-md text-slate-500">Locked</span>
                      )}
                    </button>

                    {/* Buy Button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (cardStatus === "approved") {
                          onAttemptTest(testCard.id);
                        } else {
                          setSelectedTestForPayment(testCard);
                        }
                      }}
                      className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-slate-800 transition-all flex items-center justify-between text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 group/subbtn"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                          <Key className="w-4 h-4" />
                        </div>
                        <span>{cardStatus === "approved" ? "Unlocked ✓" : cardStatus === "pending" ? "Pending..." : `Buy ₹${getTestPrice(testCard)} /-`}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-emerald-500 group-hover/subbtn:translate-x-0.5 transition-transform" />
                    </button>

                    {/* Answer Key */}
                    <button
                      type="button"
                      onClick={() => {
                        if (cardStatus === "approved") {
                          const pdfUrl = getTestPdfUrl(testCard);
                          if (pdfUrl) {
                            window.open(pdfUrl, "_blank");
                          } else {
                            onViewResults();
                          }
                        } else {
                          alert(
                            isHindi
                              ? "🔒 उत्तर कुंजी (Answer Key PDF) देखने के लिए पहले एडमिन द्वारा पेमेंट सत्यापित होना अनिवार्य है।"
                              : "🔒 Payment verification required before accessing answer key PDF."
                          );
                        }
                      }}
                      className={`p-3 rounded-2xl border transition-all flex items-center justify-between text-xs md:text-sm font-bold ${
                        cardStatus === "approved"
                          ? "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:bg-purple-50/50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 group/subbtn cursor-pointer"
                          : "border-slate-200/60 dark:border-slate-800/40 bg-slate-100/50 dark:bg-slate-900/40 text-slate-400 dark:text-slate-500 opacity-60 grayscale cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl ${
                          cardStatus === "approved"
                            ? "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                        }`}>
                          {cardStatus === "approved" ? <FileText className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        </div>
                        <span>{isHindi ? "उत्तर कुंजी" : "Answer Key"}</span>
                      </div>
                      {cardStatus === "approved" ? (
                        <ChevronRight className="w-4 h-4 text-purple-500 group-hover/subbtn:translate-x-0.5 transition-transform" />
                      ) : (
                        <span className="text-[10px] font-extrabold uppercase bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-md text-slate-500">Locked</span>
                      )}
                    </button>

                    {/* How to Attempt This Test */}
                    <button
                      onClick={() => {
                        alert(
                          isHindi
                            ? `ऑल इंडिया टेस्ट गाइड:\n1. 'Buy Test ₹${getTestPrice(testCard)}' बटन पर क्लिक करें\n2. UPI QR Code (PhonePe, Google Pay, Paytm) से ₹${getTestPrice(testCard)} का पेमेंट करें\n3. UTR / Transaction ID डालकर 'Verify & Unlock' करें\n4. टेस्ट स्टार्ट करके 100 प्रश्न हल करें और रैंक देखें!`
                            : `All India Test Guide:\n1. Click 'Buy Test ₹${getTestPrice(testCard)}'\n2. Scan UPI QR Code with Google Pay, PhonePe, Paytm\n3. Enter UTR / Transaction ID & click Verify\n4. Start test, attempt 100 questions and get your rank!`
                        );
                      }}
                      className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-slate-800 transition-all flex items-center justify-between text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 group/subbtn text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 shrink-0">
                          <BarChart3 className="w-4 h-4" />
                        </div>
                        <div className="leading-tight">
                          <div className="text-xs font-bold">How to Attempt This Test</div>
                          <div className="text-[10px] text-slate-400 font-normal">
                            (Step by Step Payment Guide)
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-emerald-500 group-hover/subbtn:translate-x-0.5 transition-transform shrink-0" />
                    </button>
                  </div>
                </div>

                {/* BOTTOM FOOTER STRIP */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {/* Test Date */}
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-normal">Test Date</div>
                      <div className="font-extrabold text-slate-800 dark:text-slate-200">
                        {testCard.testDate}
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-slate-700" />

                  {/* Total Marks */}
                  <div className="flex items-center gap-2.5">
                    <div className="px-3 py-1 bg-emerald-800 text-white rounded-xl font-black text-base">
                      {testCard.totalMarks}
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-normal">Total Marks</div>
                      <div className="font-extrabold text-slate-800 dark:text-slate-200">
                        {testCard.totalMarks}
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-slate-700" />

                  {/* User ID */}
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-normal">User ID</div>
                      <div className="font-extrabold text-slate-800 dark:text-slate-200">
                        {testCard.userId}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* UPI QR CODE PAYMENT MODAL */}
      {selectedTestForPayment && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md md:max-w-3xl w-full p-5 md:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto my-auto">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedTestForPayment(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* LEFT COLUMN: Price Tag + PhonePe QR Code + UPI ID Copy */}
              <div className="space-y-4">
                {/* MODAL HEADER FOR MOBILE */}
                <div className="text-center md:text-left space-y-1 block md:hidden">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold uppercase">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Instant Payment</span>
                  </div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">
                    {isHindi ? "UPI QR कोड द्वारा भुगतान" : "Pay via UPI QR Code"}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {isHindi ? selectedTestForPayment.titleHi : selectedTestForPayment.titleEn}
                  </p>
                </div>

                {/* PRICE TAG */}
                <div className="bg-gradient-to-r from-emerald-50 via-emerald-100/50 to-emerald-50 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-800 p-3.5 rounded-2xl border border-emerald-200/80 dark:border-emerald-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-600 text-white font-black text-base">
                      ₹{getTestPrice(selectedTestForPayment)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {isHindi ? "ऑल इंडिया मॉक टेस्ट फी" : "All India Test Access Fee"}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">
                        100 Questions • Instant Rank
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900 px-3 py-1 rounded-full border border-emerald-200">
                    100% Secure
                  </span>
                </div>

                {/* QR CODE CONTAINER */}
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center space-y-3 text-center">
                  <div className="p-2 bg-slate-950 rounded-2xl shadow-xl border-2 border-emerald-500 relative group flex items-center justify-center">
                    <img
                      src={upiQrCode}
                      alt="PhonePe UPI QR Code"
                      className="w-48 h-48 sm:w-56 sm:h-56 md:w-52 md:h-52 object-contain rounded-xl"
                    />
                  </div>

                  {/* SUPPORTED APPS ICONS BADGES */}
                  <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">Google Pay</span>
                    <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">PhonePe</span>
                    <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200">Paytm</span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">BHIM</span>
                  </div>
                </div>

                {/* COPY UPI ID STRIP */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-between">
                    <span>{isHindi ? "UPI ID द्वारा पे करें:" : "Or Pay via UPI ID:"}</span>
                    {copiedUpi && (
                      <span className="text-[10px] text-emerald-600 font-extrabold animate-pulse">
                        Copied to clipboard!
                      </span>
                    )}
                  </label>
                  <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <code className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400 flex-1 px-2 select-all">
                      {upiId}
                    </code>
                    <button
                      onClick={handleCopyUpi}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-all"
                    >
                      {copiedUpi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedUpi ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Header (Desktop) + Name Input + UTR/Txn Tabs & Unlock Button */}
              <div className="space-y-4">
                {/* MODAL HEADER FOR DESKTOP */}
                <div className="text-left space-y-1 hidden md:block">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold uppercase">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Instant Payment</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    {isHindi ? "UPI QR कोड द्वारा भुगतान" : "Pay via UPI QR Code"}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {isHindi ? selectedTestForPayment.titleHi : selectedTestForPayment.titleEn}
                  </p>
                </div>

                {/* STUDENT NAME & VERIFICATION INPUTS */}
                <div className="space-y-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                  {/* STUDENT NAME FIELD */}
                  <div>
                    <label className="text-xs font-extrabold text-slate-800 dark:text-slate-200 block mb-1">
                      {isHindi ? "आपका नाम (Student Name):" : "Your Full Name:"}
                    </label>
                    <input
                      type="text"
                      placeholder={isHindi ? "उदा. राहुल कुमार" : "e.g. Rahul Kumar"}
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <label className="text-xs font-extrabold text-slate-800 dark:text-slate-200 flex items-center justify-between pt-1">
                    <span>{isHindi ? "पेमेंट विवरण दर्ज करें (UTR / Transaction ID):" : "Enter Payment Details (UTR / Transaction ID):"}</span>
                  </label>

                  {/* TAB SELECTOR BUTTONS */}
                  <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() => setActivePaymentTab("utr")}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                        activePaymentTab === "utr"
                          ? "bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs"
                          : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      {isHindi ? "1. UTR नंबर (12 अंक)" : "1. UTR Number (12 Digits)"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePaymentTab("txn")}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                        activePaymentTab === "txn"
                          ? "bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs"
                          : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      {isHindi ? "2. Transaction ID / Ref No" : "2. Transaction ID / Ref No"}
                    </button>
                  </div>

                  {/* ACTIVE TAB INPUT */}
                  <div className="space-y-3 pt-1">
                    {activePaymentTab === "utr" ? (
                      <div>
                        <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                          {isHindi ? "12-अंकों का UTR नंबर:" : "Enter 12-Digit UTR Number:"}
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 425189012345"
                          value={utrNumber}
                          onChange={(e) => setUtrNumber(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                          {isHindi ? "ट्रांजैक्शन आईडी / रेफरेंस नंबर:" : "Enter Transaction ID / Ref No:"}
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. T26091512345678 or Paytm Ref ID"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => handleUnlockTest(selectedTestForPayment.id)}
                      disabled={isVerifying}
                      className="w-full py-4 px-5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm md:text-base flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 disabled:opacity-50 mt-3"
                    >
                      {isVerifying ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{isHindi ? "सत्यापित हो रहा है..." : "Verifying Payment..."}</span>
                        </div>
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          <span>
                            {isHindi
                              ? "भुगतान सत्यापित करें & टेस्ट अनलॉक करें"
                              : "Verify Payment & Unlock Test"}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
