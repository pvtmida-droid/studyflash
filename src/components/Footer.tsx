import { useState } from "react";
import {
  Sparkles,
  Mail,
  ShieldCheck,
  FileSpreadsheet,
  MapPin,
  Phone,
} from "lucide-react";
import BrandLogo from "./BrandLogo";

interface FooterProps {
  isHindi: boolean;
  setCurrentView: (view: string) => void;
  currentView: string;
}

export default function Footer({
  isHindi,
  setCurrentView,
  currentView,
}: FooterProps) {
  const [newsLetterEmail, setNewsLetterEmail] = useState("");
  const [submittedFeedback, setSubmittedFeedback] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <footer className="mt-12 bg-transparent border-t border-slate-200 dark:border-slate-800/60 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About, contacts and other static panels if clicked */}
        {currentView === "about" && (
          <div className="mb-12 p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl animate-fade-in">
            <h3 className="text-xl font-bold mb-4 font-sans text-emerald-600 dark:text-emerald-400">
              {isHindi
                ? "हमारे बारे में | About StudyFlash.in"
                : "About StudyFlash.in EdTech Platforms"}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              {isHindi
                ? "स्टडीफ्लैश.इन भारत का सबसे उभरता हुआ और आधुनिक द्विभाषी परीक्षा तैयारी मंच है जो ग्रामीण और शहरी दोनों क्षेत्रों के छात्रों को उत्कृष्ट रूप से मार्गदर्शन प्रदान करता है। हमारा ध्येय आपके अभ्यास सत्र को दस गुना तेज व सटीक बनाना है।"
                : "StudyFlash.in is a modern, responsive, ultra-fast MCQ assessment suite tailored specifically for Indian state and national recruitment exams (SSC, Railway, Police, Army, CTET). We target cognitive retention through micro-learning hacks and instant bilingual support."}
            </p>
          </div>
        )}

        {currentView === "contact" && (
          <div className="mb-12 p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl animate-fade-in">
            <h3 className="text-xl font-bold mb-4 font-sans text-emerald-600 dark:text-emerald-400">
              {isHindi ? "हमसे संपर्क करें" : "Contact & Support Desk"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-400">
              <div className="space-y-3">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-500" /> Sonpur saran Bihar - 841101
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-emerald-500" />{" "}
                  bkmix123@gmail.com
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-emerald-500" /> +91 7480801616
                </p>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (isSubmitting) return;
                  setIsSubmitting(true);
                  try {
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        name: contactName,
                        contactInfo: contactInfo,
                        message: contactMessage,
                      }),
                    });
                    if (res.ok) {
                      setSubmittedFeedback(true);
                      setContactName("");
                      setContactInfo("");
                      setContactMessage("");
                      setTimeout(() => setSubmittedFeedback(false), 5000);
                    } else {
                      alert(isHindi ? "संदेश भेजने में विफल। कृपया पुनः प्रयास करें।" : "Failed to send message. Please try again.");
                    }
                  } catch (err) {
                    console.error("Feedback submit error:", err);
                    alert(isHindi ? "नेटवर्क त्रुटि। कृपया बाद में प्रयास करें।" : "Network error. Please try again later.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                className="space-y-3"
              >
                <input
                  type="text"
                  placeholder={isHindi ? "अपना नाम लिखें" : "Full Name"}
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full p-2 text-xs border rounded-xl bg-white dark:bg-slate-800 dark:text-white"
                  disabled={isSubmitting}
                  required
                />
                <input
                  type="text"
                  placeholder={isHindi ? "ईमेल आईडी या फ़ोन नंबर" : "Email ID or Phone Number"}
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full p-2 text-xs border rounded-xl bg-white dark:bg-slate-800 dark:text-white"
                  disabled={isSubmitting}
                  required
                />
                <textarea
                  placeholder={
                    isHindi
                      ? "अपनी समस्या या प्रतिक्रिया विस्तार से लिखें..."
                      : "Brief message explaining your inquiry..."
                  }
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full p-2 text-xs border rounded-xl bg-white dark:bg-slate-800 dark:text-white"
                  rows={3}
                  disabled={isSubmitting}
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow disabled:opacity-50"
                >
                  {isSubmitting
                    ? (isHindi ? "भेजा जा रहा है..." : "Sending...")
                    : submittedFeedback
                      ? (isHindi ? "भेज दिया गया!" : "Sent!")
                      : isHindi
                        ? "संदेश भेजें"
                        : "Send Query"}
                </button>
              </form>
            </div>
          </div>
        )}

        {currentView === "privacy" && (
          <div className="mb-12 p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-sm text-slate-600 dark:text-slate-400 space-y-3 leading-relaxed animate-fade-in">
            <h3 className="text-xl font-bold text-blue-600 dark:text-sky-400">
              Privacy Policy
            </h3>
            <p>
              Your privacy is important to us. StudyFlash.in does not share
              personal user data, progress stats, or search parameters with
              unauthorized third parties. All mock attempts are cached safely on
              local storage to preserve offline compatibility.
            </p>
          </div>
        )}

        {currentView === "terms" && (
          <div className="mb-12 p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-sm text-slate-600 dark:text-slate-400 space-y-3 leading-relaxed animate-fade-in">
            <h3 className="text-xl font-bold text-blue-600 dark:text-sky-400">
              Terms of Service
            </h3>
            <p>
              Aspirants are granted a free, non-exclusive license to utilize
              Daily MCQ Banks, previous year papers, and performance analytics
              estimators for competitive educational purposes. Comply with
              native copyright rules regarding exam memory questions.
            </p>
          </div>
        )}

        {/* Global Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <BrandLogo size="md" />
            <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-sans">
              India's premium bilingually integrated MCQ assessment engine.
              Master SSC, Railways, UPSC, Police and State PSC exams today!
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              {isHindi ? "महत्वपूर्ण लिंक्स" : "IMPORTANT CHANNELS"}
            </h4>
            <div className="space-y-1.5 text-xs text-slate-500 flex flex-col font-sans">
              <button
                onClick={() => setCurrentView("about")}
                className="text-left hover:underline"
              >
                About StudyFlash.in
              </button>
              <button
                onClick={() => setCurrentView("contact")}
                className="text-left hover:underline"
              >
                Contact Support
              </button>
              <button
                onClick={() => setCurrentView("questions")}
                className="text-left hover:underline"
              >
                Bilingual MCQ Bank
              </button>
              <button
                onClick={() => setCurrentView("quizzes")}
                className="text-left hover:underline"
              >
                All India Mock Series
              </button>
              <button
                onClick={() => setCurrentView("admin")}
                className="text-left hover:underline"
              >
                Admin Login
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Legals
            </h4>
            <div className="space-y-1.5 text-xs text-slate-500 flex flex-col font-sans">
              <button
                onClick={() => setCurrentView("privacy")}
                className="text-left hover:underline"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setCurrentView("terms")}
                className="text-left hover:underline"
              >
                Terms of Service
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              {isHindi
                ? "समाचार पत्रिका (Newsletter)"
                : "WEEKLY REVISION HACKS"}
            </h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              {isHindi
                ? "प्रति सप्ताह ५० महत्वपूर्ण करंट अफेयर्स नोट्स ईमेल द्वारा प्राप्त करें।"
                : "Subscribe for top 50 static memory tricks delivered straight to your inbox."}
            </p>
            <div className="flex gap-1.5">
              <input
                type="email"
                placeholder="aspirant@gmail.com"
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs w-full text-slate-800 dark:text-white focus:outline-none"
              />
              <button
                onClick={() =>
                  alert("Successfully joined StudyFlash.in revision circle!")
                }
                className="px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-900 text-center text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>
            © 2026 StudyFlash.in EdTech. All Rights Reserved. Crafted with
            Google Material Design 3 guidelines.
          </p>
          <span className="text-[9px] font-mono tracking-wider text-emerald-500">
            POWERED BY GEMINI 3.5 FLASH
          </span>
        </div>
      </div>
    </footer>
  );
}
