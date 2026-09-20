export interface SubjectCategory {
  id: string;
  nameEn: string;
  nameHi: string;
  topics: { id: string; nameEn: string; nameHi: string }[];
}

export const MAIN_SUBJECTS: SubjectCategory[] = [
  {
    id: "GKGS",
    nameEn: "General Knowledge (GK/GS)",
    nameHi: "सामान्य ज्ञान (GK/GS)",
    topics: [
      { id: "India & Neighboring", nameEn: "India & Neighboring Countries", nameHi: "भारत एवं पड़ोसी देश" },
      { id: "History", nameEn: "History (इतिहास)", nameHi: "इतिहास" },
      { id: "Geography", nameEn: "Geography (भूगोल)", nameHi: "भूगोल" },
      { id: "Constitution", nameEn: "Indian Constitution (भारतीय संविधान)", nameHi: "भारतीय संविधान" },
      { id: "Polity", nameEn: "Polity & Politics (राजनीति)", nameHi: "राजनीति" },
      { id: "Economics", nameEn: "Economics (अर्थव्यवस्था)", nameHi: "अर्थव्यवस्था" },
      { id: "Art & Culture", nameEn: "Art & Culture (कला एवं संस्कृति)", nameHi: "कला एवं संस्कृति" },
      { id: "Sports", nameEn: "Sports & Athletics (खेल)", nameHi: "खेल" },
      { id: "Awards", nameEn: "Awards & Honors (पुरस्कार एवं सम्मान)", nameHi: "पुरस्कार एवं सम्मान" },
      { id: "Important Days", nameEn: "Important Days (महत्वपूर्ण दिवस)", nameHi: "महत्वपूर्ण दिवस" },
      { id: "Scientific Research", nameEn: "Scientific Research (वैज्ञानिक अनुसंधान)", nameHi: "वैज्ञानिक अनुसंधान" },
    ]
  },
  {
    id: "Science",
    nameEn: "General Science",
    nameHi: "सामान्य विज्ञान (Science)",
    topics: [
      { id: "Physics", nameEn: "Physics (भौतिक विज्ञान)", nameHi: "भौतिक विज्ञान" },
      { id: "Light", nameEn: "Light & Optics (प्रकाश)", nameHi: "प्रकाश" },
      { id: "Human Eye", nameEn: "Human Eye & World (मानव नेत्र)", nameHi: "मानव नेत्र" },
      { id: "Electricity", nameEn: "Electricity (विद्युत)", nameHi: "विद्युत" },
      { id: "Magnetic Effects", nameEn: "Magnetic Effects of Current (चुंबकीय प्रभाव)", nameHi: "चुंबकीय प्रभाव" },
      { id: "Sources of Energy", nameEn: "Sources of Energy (ऊर्जा के स्रोत)", nameHi: "ऊर्जा के स्रोत" },
      { id: "Chemistry", nameEn: "Chemistry (रसायन विज्ञान)", nameHi: "रसायन विज्ञान" },
      { id: "Chemical Reactions", nameEn: "Chemical Reactions (रासायनिक अभिक्रियाएँ)", nameHi: "रासायनिक अभिक्रियाएँ एवं समीकरण" },
      { id: "Acids Bases Salts", nameEn: "Acids, Bases & Salts (अम्ल, क्षार एवं लवण)", nameHi: "अम्ल, क्षार एवं लवण" },
      { id: "Metals & Non-metals", nameEn: "Metals & Non-metals (धातु एवं अधातु)", nameHi: "धातु एवं अधातु" },
      { id: "Carbon Compounds", nameEn: "Carbon & Compounds (कार्बन एवं उसके यौगिक)", nameHi: "कार्बन एवं उसके यौगिक" },
      { id: "Periodic Table", nameEn: "Periodic Classification (तत्वों का आवर्त वर्गीकरण)", nameHi: "तत्वों का आवर्त वर्गीकरण" },
      { id: "Biology", nameEn: "Biology (जीव विज्ञान)", nameHi: "जीव विज्ञान" },
      { id: "Life Processes", nameEn: "Life Processes (जीवन प्रक्रियाएँ)", nameHi: "जीवन प्रक्रियाएँ" },
      { id: "Control & Coordination", nameEn: "Control & Coordination (नियंत्रण एवं समन्वय)", nameHi: "नियंत्रण एवं समन्वय" },
      { id: "Reproduction", nameEn: "Reproduction (प्रजनन)", nameHi: "प्रजनन" },
      { id: "Heredity & Evolution", nameEn: "Heredity & Evolution (आनुवंशिकता एवं विकास)", nameHi: "आनुवंशिकता एवं विकास" },
      { id: "Environment", nameEn: "Environment & Ecology (पर्यावरण)", nameHi: "पर्यावरण" }
    ]
  },
  {
    id: "Maths",
    nameEn: "Mathematics",
    nameHi: "गणित (Mathematics)",
    topics: [
      { id: "Arithmetic", nameEn: "Arithmetic & Numbers (अंकगणित)", nameHi: "अंकगणित एवं संख्याएं" },
      { id: "Number System", nameEn: "Number System (संख्या पद्धति)", nameHi: "संख्या पद्धति" },
      { id: "Percentage", nameEn: "Percentage (प्रतिशत)", nameHi: "प्रतिशत" },
      { id: "Profit & Loss", nameEn: "Profit & Loss (लाभ-हानि)", nameHi: "लाभ-हानि" },
      { id: "Average", nameEn: "Average (औसत)", nameHi: "औसत" },
      { id: "Ratio & Proportion", nameEn: "Ratio & Proportion (अनुपात एवं समानुपात)", nameHi: "अनुपात एवं समानुपात" },
      { id: "Time & Work", nameEn: "Time & Work (समय और कार्य)", nameHi: "समय और कार्य" },
      { id: "Speed Distance Time", nameEn: "Speed, Distance & Time (समय, दूरी एवं चाल)", nameHi: "समय, दूरी एवं चाल" },
      { id: "Simple & Compound Interest", nameEn: "Simple & Compound Interest (साधारण एवं चक्रवृद्धि ब्याज)", nameHi: "साधारण एवं चक्रवृद्धि ब्याज" },
      { id: "Mensuration", nameEn: "Mensuration (क्षेत्रमिति)", nameHi: "क्षेत्रमिति (Mensuration)" },
      { id: "Decimals & Fractions", nameEn: "Decimals & Fractions (दशमलव एवं भिन्न)", nameHi: "दशमलव एवं भिन्न" },
      { id: "LCM & HCF", nameEn: "LCM & HCF", nameHi: "LCM, HCF" },
      { id: "Data Interpretation", nameEn: "Basic Data Interpretation (डेटा व्याख्या)", nameHi: "डेटा व्याख्या (Basic DI)" }
    ]
  },
  {
    id: "Reasoning",
    nameEn: "Reasoning Ability",
    nameHi: "तार्किक क्षमता (Reasoning)",
    topics: [
      { id: "General Reasoning", nameEn: "General Reasoning Test (तर्कशक्ति परीक्षण)", nameHi: "तर्कशक्ति परीक्षण" },
      { id: "Similarity & Differences", nameEn: "Similarity & Differences (समानता एवं भिन्नता)", nameHi: "समानता एवं भिन्नता" },
      { id: "Analogy", nameEn: "Analogy (उपमा)", nameHi: "उपमा (Analogy)" },
      { id: "Classification", nameEn: "Classification (वर्गीकरण)", nameHi: "वर्गीकरण" },
      { id: "Coding-Decoding", nameEn: "Coding-Decoding (कोडिंग-डिकोडिंग)", nameHi: "कोडिंग-डिकोडिंग" },
      { id: "Number Series", nameEn: "Number Series (संख्या श्रृंखला)", nameHi: "संख्या श्रृंखला" },
      { id: "Spatial Visualization", nameEn: "Spatial Visualization (स्थानिक दृश्यांकन)", nameHi: "स्थानिक दृश्यांकन" },
      { id: "Direction Sense", nameEn: "Direction Sense Test (दिशा ज्ञान)", nameHi: "दिशा ज्ञान" },
      { id: "Visual Memory", nameEn: "Visual Memory (दृश्य स्मृति)", nameHi: "दृश्य स्मृति" },
      { id: "Blood Relations", nameEn: "Blood Relations (संबंध आधारित प्रश्न)", nameHi: "संबंध आधारित प्रश्न" },
      { id: "Mirror Image", nameEn: "Mirror Image", nameHi: "Mirror Image" },
      { id: "Water Image", nameEn: "Water Image", nameHi: "Water Image" },
      { id: "Embedded Figures", nameEn: "Embedded Figures", nameHi: "Embedded Figures" },
      { id: "Paper Folding", nameEn: "Paper Folding & Cutting", nameHi: "Paper Folding & Cutting" }
    ]
  },
  {
    id: "Hindi",
    nameEn: "General Hindi Language",
    nameHi: "सामान्य हिन्दी (Hindi)",
    topics: [
      { id: "Hindi Grammar", nameEn: "Hindi Grammar (व्याकरण)", nameHi: "व्याकरण (HINDI GRAMMAR)" },
      { id: "Sandhi", nameEn: "Sandhi (संधि)", nameHi: "संधि" },
      { id: "Samas", nameEn: "Samas (समास)", nameHi: "समास" },
      { id: "Karak", nameEn: "Karak (कारक)", nameHi: "कारक" },
      { id: "Vachan", nameEn: "Vachan (वचन)", nameHi: "वचन" },
      { id: "Ling", nameEn: "Ling (लिंग)", nameHi: "लिंग" },
      { id: "Kaal", nameEn: "Kaal (काल)", nameHi: "काल" },
      { id: "Vachya", nameEn: "Vachya (वाच्य)", nameHi: "वाच्य" },
      { id: "Upsarg Pratyay", nameEn: "Prefix & Suffix (उपसर्ग एवं प्रत्यय)", nameHi: "उपसर्ग एवं प्रत्यय" },
      { id: "Kriya", nameEn: "Kriya (क्रिया)", nameHi: "क्रिया" },
      { id: "Sangya", nameEn: "Sangya (संज्ञा)", nameHi: "संज्ञा" },
      { id: "Sarvanam", nameEn: "Sarvanam (सर्वनाम)", nameHi: "सर्वनाम" },
      { id: "Visheshon", nameEn: "Visheshon (विशेषण)", nameHi: "विशेषण" },
      { id: "Avyay", nameEn: "Avyay (अव्यय)", nameHi: "अव्यय" },
      { id: "Sentence Correction", nameEn: "Sentence Correction (वाक्य शुद्धि)", nameHi: "वाक्य शुद्धि" },
      { id: "Spelling Correction", nameEn: "Spelling Correction (वर्तनी शुद्धि)", nameHi: "वर्तनी शुद्धि" },
      { id: "Vocabulary", nameEn: "Vocabulary (शब्दकोश)", nameHi: "शब्दकोश (VOCABULARY)" },
      { id: "Synonyms", nameEn: "Synonyms (पर्यायवाची शब्द)", nameHi: "पर्यायवाची शब्द" },
      { id: "Antonyms", nameEn: "Antonyms (विलोम शब्द)", nameHi: "विलोम शब्द" },
      { id: "Multimeaning Words", nameEn: "Multimeaning Words (अनेकार्थी शब्द)", nameHi: "अनेकार्थी शब्द" },
      { id: "One Word Substitution", nameEn: "One Word Substitution (वाक्यांश के लिए एक शब्द)", nameHi: "एक शब्द के लिए अनेक शब्द / वाक्यांश" },
      { id: "Tatsam Tadbhav", nameEn: "Tatsam-Tadbhav (तत्सम-तद्भव)", nameHi: "तत्सम-तद्भव" },
      { id: "Deshaj Videshaj", nameEn: "Deshaj & Videshaj Words (देशज एवं विदेशी शब्द)", nameHi: "देशज एवं विदेशी शब्द" }
    ]
  },
  {
    id: "English",
    nameEn: "General English Language",
    nameHi: "सामान्य अंग्रेजी (English)",
    topics: [
      { id: "Grammar & Vocab", nameEn: "Grammar & Vocabulary (व्याकरण और शब्दावली)", nameHi: "व्याकरण और शब्दावली (Grammar & Vocab)" },
      { id: "Synonyms", nameEn: "Synonyms (समानार्थी शब्द)", nameHi: "समानार्थी शब्द (Synonyms)" },
      { id: "Antonyms", nameEn: "Antonyms (विपरीतार्थक शब्द)", nameHi: "विपरीतार्थक शब्द (Antonyms)" },
      { id: "Fill in Blanks", nameEn: "Fill in the Blanks (रिक्त स्थान भरें)", nameHi: "रिक्त स्थान भरें (Fill in the Blanks)" },
      { id: "Error Spotting", nameEn: "Error Detection (त्रुटि पहचान)", nameHi: "त्रुटि पहचान (Error Detection)" },
      { id: "Spelling Test", nameEn: "Spelling Test (वर्तनी परीक्षण)", nameHi: "वर्तनी परीक्षण (Spelling)" },
      { id: "Idioms & Phrases", nameEn: "Idioms & Phrases (मुहावरे और लोकोक्तियाँ)", nameHi: "मुहावरे और लोकोक्तियाँ (Idioms & Phrases)" },
      { id: "One Word Substitution", nameEn: "One Word Substitution (वाक्यांश के लिए एक शब्द)", nameHi: "वाक्यांश के लिए एक शब्द (One Word)" },
      { id: "Comprehension", nameEn: "Reading Comprehension (अपठित गद्यांश)", nameHi: "अपठित गद्यांश (Reading Comprehension)" }
    ]
  },
  {
    id: "Computer Knowledge",
    nameEn: "Computer Knowledge",
    nameHi: "कंप्यूटर ज्ञान (Computer)",
    topics: [
      { id: "Fundamentals & OS", nameEn: "Fundamentals & Operating Systems", nameHi: "कंप्यूटर बुनियादी सिद्धांत और ऑपरेटिंग सिस्टम" },
      { id: "MS Office", nameEn: "MS Office (Word, Excel, PPT, Access)", nameHi: "वर्ड, एक्सेल, पॉवरपॉइंट, एक्सेस" },
      { id: "Internet & Networking", nameEn: "Internet, Email, Networking & Security", nameHi: "इंटरनेट, ईमेल, नेटवर्किंग, डेटाबेस और मल्टीमीडिया" },
      { id: "Computer Practice Set", nameEn: "Computer Mixed Questions", nameHi: "परीक्षा उन्मुख कंप्यूटर मिश्रित प्रश्न संग्रह" }
    ]
  },
  {
    id: "Current Affairs",
    nameEn: "Current Affairs",
    nameHi: "करेंट अफेयर्स (Current Affairs)",
    topics: [
      { id: "Current Affairs 2026", nameEn: "Current Affairs 2026", nameHi: "करेंट अफेयर्स 2026" },
      { id: "National News", nameEn: "National & International Events", nameHi: "राष्ट्रीय एवं अंतर्राष्ट्रीय घटनाक्रम" },
      { id: "Sports & Awards", nameEn: "Sports & Awards Current Affairs", nameHi: "खेलकूद एवं पुरस्कार सम्मलेन" },
      { id: "Science & Defence", nameEn: "Science, Tech & Defence News", nameHi: "विज्ञान, प्रौद्योगिकी एवं रक्षा समाचार" }
    ]
  },
  {
    id: "Central Exams",
    nameEn: "Central Exams Special",
    nameHi: "केंद्रीय परीक्षाएं (Central Exams)",
    topics: [
      { id: "SSC CGL", nameEn: "SSC CGL", nameHi: "एसएससी CGL" },
      { id: "SSC CHSL", nameEn: "SSC CHSL", nameHi: "एसएससी CHSL" },
      { id: "SSC GD", nameEn: "SSC GD Constable", nameHi: "एसएससी GD कांस्टेबल" },
      { id: "SSC MTS", nameEn: "SSC MTS", nameHi: "एसएससी MTS" },
      { id: "IBPS PO", nameEn: "IBPS PO", nameHi: "आईबीपीएस PO" },
      { id: "IBPS Clerk", nameEn: "IBPS Clerk", nameHi: "आईबीपीएस क्लर्क" },
      { id: "IBPS SO", nameEn: "IBPS SO", nameHi: "आईबीपीएस SO" },
      { id: "RRB NTPC", nameEn: "RRB NTPC", nameHi: "आरआरबी NTPC" },
      { id: "RRB Group D", nameEn: "RRB Group D", nameHi: "आरआरबी ग्रुप डी" },
      { id: "RRB ALP", nameEn: "RRB ALP", nameHi: "आरआरबी एएलपी" },
      { id: "SSC Exams", nameEn: "SSC Special Mixed", nameHi: "एसएससी परीक्षाएं" },
      { id: "Banking Exams", nameEn: "Banking Special Mixed", nameHi: "बैंकिंग परीक्षाएं" },
      { id: "Railway Exams", nameEn: "Railway Special Mixed", nameHi: "रेलवे परीक्षाएं" }
    ]
  },
  {
    id: "State Police",
    nameEn: "State Police Special",
    nameHi: "राज्य पुलिस भर्ती (State Police)",
    topics: [
      { id: "UP Police", nameEn: "UP Police Exam", nameHi: "यूपी पुलिस" },
      { id: "Bihar Police", nameEn: "Bihar Police Exam", nameHi: "बिहार पुलिस" },
      { id: "Rajasthan Police", nameEn: "Rajasthan Police Exam", nameHi: "राजस्थान पुलिस" },
      { id: "MP Police", nameEn: "MP Police Exam", nameHi: "एमपी पुलिस" },
      { id: "Delhi Police", nameEn: "Delhi Police Exam", nameHi: "दिल्ली पुलिस" },
      { id: "Haryana Police", nameEn: "Haryana Police Exam", nameHi: "हरियाणा पुलिस" }
    ]
  },
  {
    id: "PYQ",
    nameEn: "Previous Year Papers (PYQ)",
    nameHi: "पीवाईक्यू (Previous Year Papers)",
    topics: [
      { id: "SSC CGL PYQ", nameEn: "SSC CGL Previous Papers", nameHi: "एसएससी CGL PYQ" },
      { id: "SSC CHSL PYQ", nameEn: "SSC CHSL Previous Papers", nameHi: "एसएससी CHSL PYQ" },
      { id: "SSC GD PYQ", nameEn: "SSC GD Previous Papers", nameHi: "एसएससी GD PYQ" },
      { id: "SSC MTS PYQ", nameEn: "SSC MTS Previous Papers", nameHi: "एसएससी MTS PYQ" },
      { id: "IBPS PO PYQ", nameEn: "IBPS PO Previous Papers", nameHi: "आईबीपीएस PO PYQ" },
      { id: "SBI Clerk PYQ", nameEn: "SBI Clerk Previous Papers", nameHi: "एसबीआई क्लर्क PYQ" },
      { id: "RRB NTPC PYQ", nameEn: "RRB NTPC Previous Papers", nameHi: "आरआरबी NTPC 2025 PYQ" },
      { id: "RRB Group D PYQ", nameEn: "RRB Group D Previous Papers", nameHi: "आरआरबी ग्रुप डी PYQ" },
      { id: "RRB ALP PYQ", nameEn: "RRB ALP Previous Papers", nameHi: "आरआरबी एएलपी PYQ" },
      { id: "UPSC PYQ", nameEn: "UPSC 10-Year Papers", nameHi: "यूपीएससी (पिछले 10 वर्ष)" },
      { id: "CDS NDA PYQ", nameEn: "CDS / NDA Previous Papers", nameHi: "सीडीएस / एनडीए PYQ" },
      { id: "UP Police PYQ", nameEn: "UP Police Constable PYQ", nameHi: "यूपी पुलिस कांस्टेबल PYQ" },
      { id: "Bihar Police PYQ", nameEn: "Bihar Police PYQ", nameHi: "बिहार पुलिस PYQ" }
    ]
  },
  {
    id: "NCERT",
    nameEn: "NCERT Special (Class 5-12)",
    nameHi: "एनसीईआरटी (NCERT Special)",
    topics: [
      { id: "Class 12", nameEn: "NCERT Class 12 Special", nameHi: "कक्षा 12 (भौतिकी, इतिहास, राजनीति)" },
      { id: "Class 11", nameEn: "NCERT Class 11 Special", nameHi: "कक्षा 11 (भूगोल, रसायन, इतिहास)" },
      { id: "Class 10", nameEn: "NCERT Class 10 Special", nameHi: "कक्षा 10 (विज्ञान, गणित, अर्थशास्त्र)" },
      { id: "Class 9", nameEn: "NCERT Class 9 Special", nameHi: "कक्षा 9 (विज्ञान, क्रांति व राजनीति)" },
      { id: "Class 8", nameEn: "NCERT Class 8 Special", nameHi: "कक्षा 8 (विज्ञान, संविधान)" },
      { id: "Class 7", nameEn: "NCERT Class 7 Special", nameHi: "कक्षा 7 (पर्यावरण, मध्यकालीन भारत)" },
      { id: "Class 6", nameEn: "NCERT Class 6 Special", nameHi: "कक्षा 6 (मूल विज्ञान, हमारे अतीत-I)" },
      { id: "Class 5", nameEn: "NCERT Class 5 EVS", nameHi: "कक्षा 5 (पर्यावरण अध्ययन EVS)" }
    ]
  },
  {
    id: "MockTest",
    nameEn: "All India Mock Tests",
    nameHi: "ऑल इंडिया मॉक टेस्ट (Mock Tests)",
    topics: [
      { id: "Mega Test #1", nameEn: "All India Mega Test #1", nameHi: "ऑल इंडिया मेगा टेस्ट #1" },
      { id: "Mega Test #2", nameEn: "All India Mega Test #2", nameHi: "ऑल इंडिया मेगा टेस्ट #2" },
      { id: "Mega Test #3", nameEn: "All India Mega Test #3", nameHi: "ऑल इंडिया मेगा टेस्ट #3" },
      { id: "Special Test #4", nameEn: "All India Special Test #4", nameHi: "ऑल इंडिया स्पेशल टेस्ट #4" },
      { id: "Practice Test #5", nameEn: "All India Practice Test #5", nameHi: "ऑल इंडिया प्रैक्टिस टेस्ट #5" }
    ]
  }
];
