import {
  Question,
  MockTest,
  LeaderboardUser,
  Testimonial,
  FAQItem,
  UserStats,
} from "./types";

export const MOCK_QUESTIONS: Question[] = [
  {
    id: "sp-1",
    questionEn: "Which is the headquarters of Uttar Pradesh Police?",
    questionHi: "उत्तर प्रदेश पुलिस का मुख्यालय कहाँ स्थित है?",
    optionsEn: ["Kanpur", "Lucknow", "Prayagraj", "Agra"],
    optionsHi: ["कानपुर", "लखनऊ", "प्रयागराज", "आगरा"],
    correctAnswer: "B",
    explanationEn:
      "The headquarters of the Uttar Pradesh Police, known as the Signature Building, is located in Lucknow.",
    explanationHi:
      "उत्तर प्रदेश पुलिस का मुख्यालय, जिसे सिग्नेचर बिल्डिंग के रूप में जाना जाता है, लखनऊ में स्थित है।",
    subject: "Static GK",
    topic: "UP GK",
    examTags: ["up-police", "UP Police Constable", "UPSI"],
    year: "UP Police 2020",
    likes: 120,
    dislikes: 1,
  },
  {
    id: "sp-2",
    questionEn: "When was the Bihar Police established?",
    questionHi: "बिहार पुलिस की स्थापना कब हुई थी?",
    optionsEn: ["1862", "1905", "1947", "1950"],
    optionsHi: ["1862", "1905", "1947", "1950"],
    correctAnswer: "A",
    explanationEn:
      "Bihar Police traces its historical roots back to the Indian Police Act of 1861, becoming operational around 1862.",
    explanationHi:
      "बिहार पुलिस की ऐतिहासिक जड़ें 1861 के भारतीय पुलिस अधिनियम से जुड़ी हैं, और यह 1862 के आसपास चालू हुई थी।",
    subject: "Static GK",
    topic: "Bihar GK",
    examTags: ["bihar-police", "Bihar Constable", "BPSC"],
    year: "Bihar Police 2021",
    likes: 90,
    dislikes: 0,
  },
  {
    id: "sp-3",
    questionEn: "What is the motto of Rajasthan Police?",
    questionHi: "राजस्थान पुलिस का आदर्श वाक्य (Motto) क्या है?",
    optionsEn: [
      "Seva, Suraksha, Shanti",
      "Satyameva Jayate",
      "Sevarth Katibaddhta",
      "Shorya Dridhata Karmnishtha",
    ],
    optionsHi: [
      "सेवा, सुरक्षा, शांति",
      "सत्यमेव जयते",
      "सेवार्थ कटिबद्धता",
      "शौर्य दृढ़ता कर्मनिष्ठा",
    ],
    correctAnswer: "A",
    explanationEn:
      "The motto of Rajasthan Police is 'Seva, Suraksha, Shanti' (Service, Security, Peace).",
    explanationHi: "राजस्थान पुलिस का आदर्श वाक्य 'सेवा, सुरक्षा, शांति' है।",
    subject: "Static GK",
    topic: "Rajasthan GK",
    examTags: ["rajasthan-police", "Rajasthan Constable"],
    year: "Rajasthan Police 2022",
    likes: 85,
    dislikes: 2,
  },

  {
    id: "q-1",
    questionEn: "Who among the following was the founder of the Maurya Empire?",
    questionHi: "निम्नलिखित में से मौर्य साम्राज्य के संस्थापक कौन थे?",
    optionsEn: [
      "Chandragupta Maurya",
      "Ashoka the Great",
      "Samudragupta",
      "Bindusara",
    ],
    optionsHi: ["चन्द्रगुप्त मौर्य", "सम्राट अशोक", "समुद्रगुप्त", "बिन्दुसार"],
    correctAnswer: "A",
    explanationEn:
      "Chandragupta Maurya founded the Maurya Empire in 322 BCE after defeating Dhana Nanda of the Nanda dynasty, guided by his mentor Chanakya (Kautilya).",
    explanationHi:
      "चन्द्रगुप्त मौर्य ने अपने गुरु चाणक्य (कौटिल्य) के मार्गदर्शन में नंद वंश के धनानंद को पराजित करने के बाद 322 ईसा पूर्व में मौर्य साम्राज्य की स्थापना की थी।",
    subject: "History",
    topic: "Ancient Indian History (प्राचीन भारत)",
    examTags: ["SSC CGL", "SSC MTS", "UPSC", "Railway", "Bihar Exams"],
    year: "SSC CGL 2022",
    likes: 245,
    dislikes: 3,
  },
  {
    id: "q-2",
    questionEn:
      "Under which Article of the Indian Constitution can the President declare a Financial Emergency?",
    questionHi:
      "भारतीय संविधान के किस अनुच्छेद के तहत राष्ट्रपति वित्तीय वित्तीय आपातकाल की घोषणा कर सकते हैं?",
    optionsEn: ["Article 352", "Article 356", "Article 360", "Article 368"],
    optionsHi: ["अनुच्छेद 352", "अनुच्छेद 356", "अनुच्छेद 360", "अनुच्छेद 368"],
    correctAnswer: "C",
    explanationEn:
      "Article 360 of the Constitution provides for a Financial Emergency. To date, a Financial Emergency has never been declared in India.",
    explanationHi:
      "संविधान का अनुच्छेद 360 वित्तीय आपातकाल का प्रावधान करता है। आज तक, भारत में कभी भी वित्तीय आपातकाल की घोषणा नहीं की गई है।",
    subject: "Polity",
    topic: "Indian Constitution & Articles (संविधान एवं अनुच्छेद)",
    examTags: ["SSC CHSL", "SSC GD", "UPSC", "State PCS", "Police"],
    year: "UPSC Pre 2021",
    likes: 412,
    dislikes: 5,
  },
  {
    id: "q-3",
    questionEn: "Which of the following passes connects Srinagar with Leh?",
    questionHi: "निम्नलिखित में से कौन सा दर्रा श्रीनगर को लेह से जोड़ता है?",
    optionsEn: [
      "Nathu La Pass",
      "Zoji La Pass",
      "Shipki La Pass",
      "Rohtang Pass",
    ],
    optionsHi: [
      "नाथू ला दर्रा",
      "ज़ोजिला दर्रा",
      "शिपकी ला दर्रा",
      "रोहतांग दर्रा",
    ],
    correctAnswer: "B",
    explanationEn:
      "Zoji La is a high mountain pass in Jammu & Kashmir, located on National Highway 1 (NH 1) between Srinagar and Leh.",
    explanationHi:
      "ज़ोजिला दर्रा जम्मू और कश्मीर में एक उच्च हिमालयी पर्वतीय दर्रा है, जो श्रीनगर और लेह के बीच राष्ट्रीय राजमार्ग 1 (NH 1) पर स्थित है।",
    subject: "Geography",
    topic: "Indian Mountain Passes (भारतीय दर्रे)",
    examTags: ["RRB NTPC", "SSC", "Railway", "Defence"],
    year: "RRB NTPC 2021",
    likes: 189,
    dislikes: 2,
  },
  {
    id: "q-4",
    questionEn: "What is the chemical name of common salt?",
    questionHi: "साधारण नमक का रासायनिक नाम क्या है?",
    optionsEn: [
      "Sodium Chloride",
      "Sodium Bicarbonate",
      "Calcium Carbonate",
      "Potassium Hydroxide",
    ],
    optionsHi: [
      "सोडियम क्लोराइड (NaCl)",
      "सोडियम बाईकार्बोनेट",
      "कैल्शियम कार्बोनेट",
      "पोटेशियम हाइड्रोक्साइड",
    ],
    correctAnswer: "A",
    explanationEn:
      "The chemical name of common household salt is Sodium Chloride, represented by the chemical formula NaCl.",
    explanationHi:
      "साधारण नमक का रासायनिक नाम सोडियम क्लोराइड है, जिसे रासायनिक सूत्र NaCl द्वारा दर्शाया जाता है।",
    subject: "Science",
    topic: "Chemistry in Everyday Life (दैनिक जीवन में रसायन विज्ञान)",
    examTags: [
      "Delhi Police",
      "CTET",
      "SSC GD",
      "Railway",
      "Police",
      "Teaching",
    ],
    year: "Delhi Police GD 2023",
    likes: 310,
    dislikes: 1,
  },
  {
    id: "q-5",
    questionEn: "Who was the first Indian woman to win an Olympic medal?",
    questionHi: "ओलंपिक पदक जीतने वाली पहली भारतीय महिला कौन थीं?",
    optionsEn: [
      "Karnam Malleswari",
      "Saina Nehwal",
      "Mary Kom",
      "P. V. Sindhu",
    ],
    optionsHi: [
      "कर्णम मल्लेश्वरी",
      "सायना नेहवाल",
      "मैरी कॉम",
      "पी. वी. सिंधु",
    ],
    correctAnswer: "A",
    explanationEn:
      "Karnam Malleswari won a bronze medal in Weightlifting (69 kg category) at the Sydney 2000 Olympics, becoming the first Indian woman to win an Olympic medal.",
    explanationHi:
      "कर्णम मल्लेश्वरी ने सिडनी 2000 ओलंपिक में भारोत्तोलन (69 किग्रा वर्ग) में कांस्य पदक जीता था, जिससे वह ओलंपिक पदक जीतने वाली देश की पहली भारतीय महिला बनीं।",
    subject: "Static GK",
    topic: "Sports & Honors (खेल और सम्मान)",
    examTags: ["State Police", "RRB Group D", "SSC CHSL", "Railway", "Police"],
    year: "SSC CHSL 2020",
    likes: 295,
    dislikes: 4,
  },
  {
    id: "q-6",
    questionEn: "Find the missing number in the sequence: 5, 11, 23, 47, 95, ?",
    questionHi:
      "दी गई श्रृंखला में लुप्त संख्या ज्ञात करें: 5, 11, 23, 47, 95, ?",
    optionsEn: ["189", "191", "195", "201"],
    optionsHi: ["189", "191", "195", "201"],
    correctAnswer: "B",
    explanationEn:
      "The pattern in the sequence is (number * 2) + 1. Thus, 5 * 2 + 1 = 11; 11 * 2 + 1 = 23; 23 * 2 + 1 = 47; 47 * 2 + 1 = 95; 95 * 2 + 1 = 191.",
    explanationHi:
      "श्रृंखला का नियम है (संख्या * 2) + 1। तदनुसार, 5 * 2 + 1 = 11; 11 * 2 + 1 = 23; 23 * 2 + 1 = 47; 47 * 2 + 1 = 95; उसी प्रकार 95 * 2 + 1 = 191 होगा।",
    subject: "Reasoning",
    topic: "Number Series (संख्या श्रृंखला)",
    examTags: ["SSC", "Banking", "Railway"],
    year: "SSC CGL 2023",
    likes: 540,
    dislikes: 12,
  },
  {
    id: "q-7",
    questionEn:
      "If log 2 = 0.3010 and log 3 = 0.4771, what is the value of log 5?",
    questionHi:
      "यदि log 2 = 0.3010 और log 3 = 0.4771 है, तो log 5 का मान क्या होगा?",
    optionsEn: ["0.6990", "0.7781", "0.8451", "0.5229"],
    optionsHi: ["0.6990", "0.7781", "0.8451", "0.5229"],
    correctAnswer: "A",
    explanationEn:
      "log 5 = log(10 / 2) = log 10 - log 2 = 1 - 0.3010 = 0.6990.",
    explanationHi:
      "log 5 = log(10 / 2) = log 10 - log 2 = 1 - 0.3010 = 0.6990।",
    subject: "Mathematics",
    topic: "Logarithm (लघुगणक)",
    examTags: ["SSC", "Banking", "Teaching"],
    year: "NDA Exam 2022",
    likes: 167,
    dislikes: 11,
  },
  {
    id: "q-8",
    questionEn: "Which component of the computer is also known as its 'Brain'?",
    questionHi: "कंप्यूटर के किस भाग को उसका 'मस्तिष्क' भी कहा जाता है?",
    optionsEn: [
      "RAM",
      "Hard Disk",
      "CPU (Central Processing Unit)",
      "Motherboard",
    ],
    optionsHi: [
      "रैम (RAM)",
      "हार्ड डिस्क (Hard Disk)",
      "सीपीयू (CPU)",
      "मदरबोर्ड",
    ],
    correctAnswer: "C",
    explanationEn:
      "The Central Processing Unit (CPU) is considered the brain of the computer as it performs all data processing operations and executes instructions.",
    explanationHi:
      "सेंट्रल प्रोसेसिंग यूनिट (CPU) को कंप्यूटर का मस्तिष्क माना जाता है क्योंकि यह सभी डेटा प्रोसेसिंग कार्यों को करता है और निर्देशों को निष्पादित करता है।",
    subject: "Computer",
    topic: "Computer Architecture (कंप्यूटर संरचना)",
    examTags: ["SSC", "Railway", "Bihar Exams"],
    year: "BSSC CGL 2023",
    likes: 450,
    dislikes: 3,
  },
  {
    id: "q-ncert-12",
    questionEn:
      "Under NCERT Class 12 History, which of the following sites was the first discovered city of the Indus Valley Civilization?",
    questionHi:
      "एनसीईआरटी कक्षा 12 इतिहास के अनुसार, निम्नलिखित स्थलों में से सिंधु घाटी सभ्यता का सबसे पहला खोजा गया शहर कौन सा था?",
    optionsEn: ["Mohenjo-daro", "Harappa", "Lothal", "Kalibangan"],
    optionsHi: ["मोहनजोदड़ो", "हड़प्पा", "लोथल", "कालीबंगन"],
    correctAnswer: "B",
    explanationEn:
      "Harappa was the first Indus Valley civilization site discovered in 1921 by Daya Ram Sahni. This is why the civilization is also called the Harappan civilization, featured in Class 12 History Part 1.",
    explanationHi:
      "हड़प्पा 1921 में दयाराम साहनी द्वारा खोजा गया पहला सिंधु घाटी सभ्यता स्थल था। यही कारण है कि इस सभ्यता को हड़प्पा सभ्यता भी कहा जाता है, जिसका विस्तृत विवरण कक्षा 12 इतिहास भाग 1 में है।",
    subject: "History",
    topic: "NCERT Class 12 - Indus Civilization",
    examTags: ["NCERT Class 12", "UPSC", "State PCS"],
    year: "NCERT Chapter 1",
    likes: 185,
    dislikes: 1,
  },
  {
    id: "q-ncert-10",
    questionEn:
      "As per NCERT Class 10 Science Chapter 1, which gas is released when dilute hydrochloric acid is added to iron filings?",
    questionHi:
      "एनसीईआरटी कक्षा 10 विज्ञान अध्याय 1 के अनुसार, लोहे की छीलन पर तनु हाइड्रोक्लोरिक अम्ल के डालने से कौन सी गैस उत्पन्न होती है?",
    optionsEn: [
      "Hydrogen gas and iron chloride are produced",
      "Chlorine gas and iron hydroxide are produced",
      "No reaction takes place",
      "Oxygen gas and iron oxide are produced",
    ],
    optionsHi: [
      "हाइड्रोजन गैस और आयरन क्लोराइड बनता है",
      "क्लोरीन गैस और आयरन हाइड्रोक्साइड बनता है",
      "कोई अभिक्रिया नहीं होती है",
      "ऑक्सीजन गैस और आयरन ऑक्साइड बनता है",
    ],
    correctAnswer: "A",
    explanationEn:
      "Fe + 2HCl -> FeCl2 + H2. Adding dilute HCl to iron filings releases Hydrogen gas (H2) and forms Iron(II) chloride (FeCl2).",
    explanationHi:
      "Fe + 2HCl -> FeCl2 + H2. लोहे की छीलन पर तनु HCl डालने से एक विस्थापन अभिक्रिया होती है जिसमें उग्र रूप से हाइड्रोजन गैस (H2) निकलती है और आयरन क्लोराइड बनता है।",
    subject: "Science",
    topic: "NCERT Class 10 - Chemical Reactions",
    examTags: ["NCERT Class 10", "SSC", "Board Prep"],
    year: "NCERT Chapter 1",
    likes: 240,
    dislikes: 2,
  },
  {
    id: "q-ncert-8",
    questionEn:
      "In NCERT Class 8 History 'Our Pasts - III', who was proclaimed as the Emperor of India during the Revolt of 1857?",
    questionHi:
      "एनसीईआरटी कक्षा 8 इतिहास 'हमारे अतीत - III' के अनुसार, 1857 के विद्रोह के समय किसे भारत का सम्राट घोषित किया गया था?",
    optionsEn: [
      "Nana Saheb",
      "Bahadur Shah Zafar",
      "Tatya Tope",
      "Kunwar Singh",
    ],
    optionsHi: ["नाना साहेब", "बहादुर शाह जफ़र", "तात्या टोपे", "कुंवर सिंह"],
    correctAnswer: "B",
    explanationEn:
      "Rebellious sepoys of the 1857 mutiny marched to Delhi and proclaimed the aging Mughal Emperor Bahadur Shah Zafar as the Emperor of Hindustan.",
    explanationHi:
      "1857 के सिपाही विद्रोह के विद्रोहियों ने दिल्ली पहुंचकर मुगल सम्राट बहादुर शाह जफर को भारत का सम्राट घोषित किया था, जिससे उन्होंने विद्रोह की अगुवाई स्वीकार की थी।",
    subject: "History",
    topic: "NCERT Class 8 - 1857 Revolt",
    examTags: ["NCERT Class 8", "UPSC", "SSC"],
    year: "NCERT Chapter 5",
    likes: 198,
    dislikes: 1,
  },
  {
    id: "sci-light-1",
    questionEn:
      "Which mirror is preferred as a rear-view mirror in vehicles to see traffic behind?",
    questionHi:
      "वाहनों में पीछे के ट्रैफिक को देखने के लिए किस दर्पण को मुख्य रूप से पसंद किया जाता है?",
    optionsEn: [
      "Plane mirror",
      "Convex mirror",
      "Concave mirror",
      "Double Concave mirror",
    ],
    optionsHi: ["समतल दर्पण", "उत्तल दर्पण", "अवतल दर्पण", "द्वि-अवतल दर्पण"],
    correctAnswer: "B",
    explanationEn:
      "Convex mirrors are used because they always give an erect though diminished image. Also, they have a wider field of view as they are curved outwards, making them ideal rear-views.",
    explanationHi:
      "उत्तल दर्पण (Convex mirror) हमेशा सीधा लेकिन छोटा प्रतिबिंब बनाते हैं। बाहर की ओर वक्रित होने के कारण इनका दृष्टि-क्षेत्र बहुत व्यापक होता है, जिसके चलते चालक अपनी गाड़ी के पीछे एक बहुत बड़े क्षेत्र की वस्तुओं को देख पाता है।",
    subject: "Science",
    topic: "Light",
    examTags: ["Physics", "Light", "SSC CGL", "Railway"],
    year: "SSC CGL 2023",
    likes: 345,
    dislikes: 2,
  },
  {
    id: "sci-electricity-1",
    questionEn: "What is the SI unit of electric potential difference?",
    questionHi:
      "विद्युत विभवांतर (Potential Difference) का एसआई (SI) मात्रक क्या है?",
    optionsEn: ["Volt", "Ampere", "Ohm", "Watt"],
    optionsHi: ["वोल्ट (Volt)", "एम्पियर (Ampere)", "ओम (Ohm)", "वाट (Watt)"],
    correctAnswer: "A",
    explanationEn:
      "The SI unit of electric potential difference is the Volt (V), named after Alessandro Volta. Ohm is for resistance, Ampere is for current, and Watt is for power.",
    explanationHi:
      "विद्युत विभवांतर का एसआई (SI) मात्रक 'वोल्ट' (V) है, जिसका नाम एलेसेंड्रो वोल्टा के नाम पर रखा गया है। ओम प्रतिरोध का, एम्पियर विद्युत धारा का, और वाट शक्ति का मात्रक है।",
    subject: "Science",
    topic: "Electricity",
    examTags: ["Physics", "Electricity", "RRB NTPC", "Delhi Police"],
    year: "RRB NTPC 2021",
    likes: 420,
    dislikes: 3,
  },
  {
    id: "sci-acid-1",
    questionEn:
      "What is the pH value of pure water at room temperature (25°C)?",
    questionHi:
      "कमरे के तापमान (25°C) पर शुद्ध जल का पीएच (pH) मान कितना होता है?",
    optionsEn: [
      "7 (Neutral)",
      "Less than 7 (Acidic)",
      "Greater than 7 (Basic)",
      "0 (Highly Acidic)",
    ],
    optionsHi: [
      "7 (उदासीन)",
      "7 से कम (अम्लीय)",
      "7 से अधिक (क्षारीय)",
      "0 (अत्यधिक अम्लीय)",
    ],
    correctAnswer: "A",
    explanationEn:
      "Pure water has a pH value of exactly 7 at room temperature, which represents a completely neutral solution. Values below 7 are acidic, while values above 7 are basic/alkaline.",
    explanationHi:
      "शुद्ध जल का पीएच मान कमरे के ताप पर ठीक 7 होता है, जो पूरी तरह से उदासीन (Neutral) विलेय दर्शाता है। 7 से कम मान अम्लीय और 7 से अधिक मान क्षारीय विलेय के लिए होते हैं।",
    subject: "Science",
    topic: "Acid",
    examTags: ["Chemistry", "Acid", "SSC GD", "Railway"],
    year: "SSC GD 2022",
    likes: 290,
    dislikes: 1,
  },
  {
    id: "sci-life-1",
    questionEn:
      "Which of the following is responsible for water and mineral transport in plants?",
    questionHi:
      "पौधों में जल और खनिजों के परिवहन के लिए निम्नलिखित में से कौन जिम्मेदार है?",
    optionsEn: ["Phloem", "Xylem", "Stomata", "Chloroplast"],
    optionsHi: [
      "फ्लोएम (Phloem)",
      "जाइलम (Xylem)",
      "रंध्र (Stomata)",
      "क्लोरोप्लास्ट (Chloroplast)",
    ],
    correctAnswer: "B",
    explanationEn:
      "Xylem tissue is responsible for passive upward transport of water and dissolved minerals from roots to the rest of the plant. Phloem is responsible for food and organic nutrient transport.",
    explanationHi:
      "जाइलम (Xylem) ऊतक जड़ों से पौधों के अन्य भागों तक जल और घुले हुए खनिजों के ऊर्ध्वाधर परिवहन के लिए जिम्मेदार होता है। फ्लोएम (Phloem) भोजन और कार्बनिक पोषक तत्वों के संवहनीय परिवहन के लिए काम करता है।",
    subject: "Science",
    topic: "Life Processes",
    examTags: ["Biology", "Life Processes", "CTET", "UPSC Pre"],
    year: "CTET 2023",
    likes: 388,
    dislikes: 4,
  },
  {
    id: "sci-eye-1",
    questionEn: "Which lens is used to correct short-sightedness or Myopia?",
    questionHi:
      "निकट दृष्टिदोष (Myopia) को ठीक करने के लिए किस लेंस का उपयोग किया जाता है?",
    optionsEn: [
      "Convex lens",
      "Concave lens",
      "Cylindrical lens",
      "Bifocal lens",
    ],
    optionsHi: [
      "उत्तल लेंस (Convex lens)",
      "अवतल लेंस (Concave lens)",
      "बेलनाकार लेंस (Cylindrical lens)",
      "द्वि-फोकसी लेंस (Bifocal lens)",
    ],
    correctAnswer: "B",
    explanationEn:
      "Myopia is corrected using a concave (diverging) lens which diverges the incoming parallel light rays so they precisely focus on the retina rather than in front of it.",
    explanationHi:
      "निकट दृष्टिदोष (Myopia) को अवतल लेंस (Concave lens) का उपयोग करके ठीक किया जाता है। अवतल लेंस प्रकाश की किरणों को अपसारित करता है जिससे कि वे रेटिना के ठीक ऊपर केंद्रित हो सकें, न कि उसके पहले।",
    subject: "Science",
    topic: "Eye",
    examTags: ["Physics", "Eye", "State Police", "SSC MTS"],
    year: "State Police SI 2022",
    likes: 312,
    dislikes: 2,
  },
  {
    id: "q-computer-dca",
    questionEn:
      "In DCA (Diploma in Computer Application), which keyboard shortcut is used to copy selected content in MS Word?",
    questionHi:
      "DCA (डिप्लोमा इन कंप्यूटर एप्लीकेशन) के अनुसार, MS Word में चयनित सामग्री की प्रतिलिपि बनाने (कॉपी करने) के लिए किस शॉर्टकट का उपयोग किया जाता है?",
    optionsEn: ["Ctrl + X", "Ctrl + C", "Ctrl + V", "Ctrl + Z"],
    optionsHi: ["Ctrl + X", "Ctrl + C", "Ctrl + V", "Ctrl + Z"],
    correctAnswer: "B",
    explanationEn:
      "Ctrl + C is used to Copy, Ctrl + X is to Cut, Ctrl + V is to Paste, and Ctrl + Z is to Undo changes in standard word processors.",
    explanationHi:
      "चयनित टेक्स्ट या मीडिया को कॉपी करने के लिए Ctrl + C का उपयोग किया जाता है, जबकि Ctrl + X काटने (कट), Ctrl + V पेस्ट करने और Ctrl + Z पूर्ववत (अंडू) करने के लिए होता है।",
    subject: "Computer",
    topic: "DCA - MS Office Shortcut",
    examTags: ["DCA", "Computer Basics", "CCC"],
    year: "DCA Exam 2024",
    likes: 312,
    dislikes: 3,
  },
  {
    id: "q-computer-adca",
    questionEn:
      "In ADCA, which SQL clause is used to filter records based on group parameters alongside aggregate functions?",
    questionHi:
      "ADCA में, एग्रीगेट फ़ंक्शंस के साथ समूह मापदंडों के आधार पर रिकॉर्ड फ़िल्टर करने के लिए किस SQL क्लॉज का उपयोग किया जाता है?",
    optionsEn: [
      "WHERE clause",
      "HAVING clause",
      "GROUP BY clause",
      "ORDER BY clause",
    ],
    optionsHi: [
      "WHERE क्लॉज",
      "HAVING क्लॉज",
      "GROUP BY क्लॉज",
      "ORDER BY क्लॉज",
    ],
    correctAnswer: "B",
    explanationEn:
      "The HAVING clause was added to SQL because the WHERE keyword could not be used with aggregate functions. GROUP BY aggregates them, and HAVING filters them.",
    explanationHi:
      "HAVING क्लॉज को SQL में इसलिए जोड़ा गया क्योंकि WHERE कीवर्ड का उपयोग एग्रीगेट फ़ंक्शंस (SUM, AVG) के साथ नहीं किया जा सकता था। HAVING समूह डेटा पर फ़िल्टर लागू करता है।",
    subject: "Computer",
    topic: "ADCA - RDBMS & SQL",
    examTags: ["ADCA", "Databases", "Computer Science"],
    year: "ADCA Sem II",
    likes: 145,
    dislikes: 2,
  },
  {
    id: "q-computer-ccc",
    questionEn:
      "In CCC (Course on Computer Concepts) LibreOffice Writer, what is the default file extension for a saved document?",
    questionHi:
      "CCC (कोर्स ऑन कंप्यूटर कॉन्सेप्ट्स) के लिब्रेऑफिस राइटर (LibreOffice Writer) में, सहेजे गए दस्तावेज़ का डिफ़ॉल्ट फ़ाइल एक्सटेंशन क्या होता है?",
    optionsEn: [".odt", ".ods", ".odp", ".docx"],
    optionsHi: [".odt", ".ods", ".odp", ".docx"],
    correctAnswer: "A",
    explanationEn:
      "LibreOffice Writer saves documents as Open Document Text (.odt) by default. Spreadsheets are saved as (.ods) and presentations as (.odp).",
    explanationHi:
      "लिब्रेऑफिस राइटर दस्तावेज़ों को मुख्य रूप से .odt (Open Document Text) प्रारूप में सहेजता है। स्प्रेडशीट .ods और प्रेज़ेंटेशन .odp फ़ाइल प्रारूप में रहती हैं।",
    subject: "Computer",
    topic: "CCC - LibreOffice Concepts",
    examTags: ["CCC", "NIELIT", "Govt Exams"],
    year: "CCC NIELIT 2024",
    likes: 289,
    dislikes: 4,
  },
  {
    id: "q-computer-olevel",
    questionEn:
      "In NIELIT O Level Programming in Python (M3-R5), which of the following is an immutable data type?",
    questionHi:
      "नाइलिट ओ लेवल पाइथन प्रोग्रामिंग (M3-R5) के अनुसार, निम्नलिखित में से कौन सा एक अपरिवर्तनीय (Immutable) डेटा प्रकार है?",
    optionsEn: ["List", "Dictionary", "Tuple", "Set"],
    optionsHi: [
      "सूची (List)",
      "डिक्शनरी (Dictionary)",
      "टुपल (Tuple)",
      "सेट (Set)",
    ],
    correctAnswer: "C",
    explanationEn:
      "Tuples are immutable in Python, meaning once defined, their elements cannot be modified, added, or deleted. Lists, dictionaries, and sets are mutable.",
    explanationHi:
      "पाइथन में टुपल (Tuple) एक अपरिवर्तनीय डेटा स्ट्रक्चर है, यानी इसे परिभाषित करने के बाद इसके मानों को सीधे बदला नहीं जा सकता। सूची और डिक्शनरी परिवर्तनीय (Mutable) होते हैं।",
    subject: "Computer",
    topic: "O Level - Python Programming",
    examTags: ["O Level", "Python", "M3-R5"],
    year: "NIELIT O Level 2023",
    likes: 175,
    dislikes: 1,
  },
  {
    id: "maths-num-1",
    questionEn: "What is the sum of the first 50 natural numbers?",
    questionHi: "प्रथम 50 प्राकृतिक संख्याओं का योग क्या है?",
    optionsEn: ["1250", "1275", "1300", "2550"],
    optionsHi: ["1250", "1275", "1300", "2550"],
    correctAnswer: "B",
    explanationEn:
      "The formula for the sum of first n natural numbers is S = n(n + 1) / 2. For n = 50, S = 50 * 51 / 2 = 25 * 51 = 1275.",
    explanationHi:
      "प्रथम n प्राकृतिक संख्याओं के योग सूत्र S = n(n + 1) / 2 है। यहाँ n = 50 के लिए, S = 50(50 + 1) / 2 = 25 * 51 = 1275।",
    subject: "Mathematics",
    topic: "Number System",
    examTags: ["Maths", "Number System", "SSC GD", "Railway"],
    year: "SSC GD 2023",
    likes: 412,
    dislikes: 2,
  },
  {
    id: "maths-pct-1",
    questionEn:
      "If A's income is 25% more than B's income, then by what percent B's income is less than A's income?",
    questionHi:
      "यदि A की आय B की आय से 25% अधिक है, तो B की आय A की आय से कितनी प्रतिशत कम है?",
    optionsEn: ["15%", "20%", "25%", "33.33%"],
    optionsHi: ["15%", "20%", "25%", "33.33%"],
    correctAnswer: "B",
    explanationEn:
      "Percentage less = [ R / (100 + R) ] * 100. For R = 25, we get: [ 25 / 125 ] * 100 = 1/5 * 100 = 20%.",
    explanationHi:
      "प्रतिशत कमी का सामान्य सूत्र = [ R / (100 + R) ] * 100 है। यहाँ R = 25 रखने पर: [ 25 / (100 + 25) ] * 100 = [ 25 / 125 ] * 100 = 20%।",
    subject: "Mathematics",
    topic: "Percentage",
    examTags: ["Maths", "Percentage", "SSC CGL", "State Exams"],
    year: "SSC CGL 2022",
    likes: 520,
    dislikes: 1,
  },
  {
    id: "maths-prof-1",
    questionEn:
      "An article is sold at a gain of 15%. Had it been sold for Rs. 120 more, the gain would have been 20%. What is the cost price of the article?",
    questionHi:
      "एक वस्तु को 15% के लाभ पर बेचा जाता है। यदि इसे 120 रुपये अधिक में बेचा जाता, तो लाभ 20% होता। वस्तु का क्रय मूल्य क्या है?",
    optionsEn: ["Rs. 2000", "Rs. 2400", "Rs. 2500", "Rs. 3000"],
    optionsHi: ["रुपये 2000", "रुपये 2400", "रुपये 2500", "रुपये 3000"],
    correctAnswer: "B",
    explanationEn:
      "The difference in the two percentage situations is 20% - 15% = 5%. This 5% of Cost Price represents Rs. 120. Therefore, Cost Price = (120 / 5) * 100 = Rs. 2400.",
    explanationHi:
      "दोनों लाभ प्रतिशतों के बीच का अंतर = 20% - 15% = 5% है। क्रय मूल्य का यह 5% भाग 120 रुपये के बराबर है। अतः क्रय मूल्य = (120 / 5) * 100 = 2400 रुपये है।",
    subject: "Mathematics",
    topic: "Profit",
    examTags: ["Maths", "Profit & Loss", "Railway NTPC", "SSC CHSL"],
    year: "RRB NTPC 2021",
    likes: 310,
    dislikes: 4,
  },
  {
    id: "maths-avg-1",
    questionEn:
      "The average of five consecutive consecutive odd numbers is 61. What is the difference between the highest and lowest of these numbers?",
    questionHi:
      "पांच लगातार विषम संख्याओं का औसत 61 है। इनमें से सबसे बड़ी और सबसे छोटी संख्या के बीच का अंतर क्या है?",
    optionsEn: ["4", "6", "8", "10"],
    optionsHi: ["4", "6", "8", "10"],
    correctAnswer: "C",
    explanationEn:
      "Let the 5 consecutive odd numbers be (x-4), (x-2), x, (x+2), and (x+4). Their average is x = 61. The numbers are 57, 59, 61, 63, and 65. The difference between highest and lowest is 65 - 57 = 8.",
    explanationHi:
      "माना कि 5 लगातार विषम संख्याएँ (x-4), (x-2), x, (x+2) और (x+4) हैं। उनका औसत x = 61 है। अतः विषम संख्याएँ 57, 59, 61, 63 और 65 हैं। सबसे बड़ी और सबसे छोटी का अंतर 65 - 57 = 8 होगा।",
    subject: "Mathematics",
    topic: "Average",
    examTags: ["Maths", "Average", "Delhi Police"],
    year: "Delhi Police GD 2023",
    likes: 198,
    dislikes: 3,
  },
  {
    id: "maths-ratio-1",
    questionEn:
      "If A : B = 2 : 3 and B : C = 4 : 5, find the compound ratio of A : B : C.",
    questionHi:
      "यदि A : B = 2 : 3 और B : C = 4 : 5 है, तो संयुक्त अनुपात A : B : C क्या होगा?",
    optionsEn: ["2 : 4 : 5", "8 : 12 : 15", "6 : 8 : 10", "5 : 10 : 15"],
    optionsHi: ["2 : 4 : 5", "8 : 12 : 15", "6 : 8 : 10", "5 : 10 : 15"],
    correctAnswer: "B",
    explanationEn:
      "To balance B, multiply A:B by 4 and B:C by 3. A:B becomes (2*4):(3*4) = 8:12. B:C becomes (4*3):(5*3) = 12:15. Thus, A:B:C = 8:12:15.",
    explanationHi:
      "B को समान करने के लिए, A:B को 4 से और B:C को 3 से गुणा करें। A:B = 8:12 और B:C = 12:15 हो जाता है। अतः संयुक्त अनुपात A:B:C = 8:12:15 है।",
    subject: "Mathematics",
    topic: "Ratio",
    examTags: ["Maths", "Ratio & Proportion", "SSC MTS"],
    year: "SSC MTS 2022",
    likes: 412,
    dislikes: 5,
  },
  {
    id: "maths-work-1",
    questionEn:
      "A can complete a piece of work in 12 days and B can complete it in 18 days. If they work together, in how many days will the work be completed?",
    questionHi:
      "A किसी कार्य को 12 दिनों में पूरा कर सकता है और B उसी कार्य को 18 दिनों में पूरा कर सकता है। यदि वे दोनों एक साथ कार्य करते हैं, तो कार्य कितने दिनों में समाप्त होगा?",
    optionsEn: ["6 days", "7.2 days", "7.5 days", "8 days"],
    optionsHi: ["6 दिन", "7.2 दिन", "7.5 दिन", "8 दिन"],
    correctAnswer: "B",
    explanationEn:
      "One day work of A and B together = 1/12 + 1/18 = (3 + 2) / 36 = 5/36. Therefore, they will complete the work in 36/5 = 7.2 days.",
    explanationHi:
      "A और B का संयुक्त एक दिन का कार्य = 1/12 + 1/18 = (3 + 2) / 36 = 5/36. इसलिए, वे पूरे कार्य को 36/5 = 7.2 दिनों में पूरा करेंगे।",
    subject: "Mathematics",
    topic: "Time & Work",
    examTags: ["Maths", "Time & Work", "SSC CGL", "Railway"],
    year: "SSC CGL 2021",
    likes: 280,
    dislikes: 2,
  },
  {
    id: "maths-speed-1",
    questionEn:
      "A train traveling at a speed of 72 km/h crosses a pole in 15 seconds. What is the length of the train?",
    questionHi:
      "72 किमी/घंटा की गति से यात्रा करने वाली एक ट्रेन 15 सेकंड में एक खंभे को पार करती है। ट्रेन की लंबाई कितनी है?",
    optionsEn: ["250 meters", "300 meters", "350 meters", "400 meters"],
    optionsHi: ["250 मीटर", "300 मीटर", "350 मीटर", "400 मीटर"],
    correctAnswer: "B",
    explanationEn:
      "First convert Speed to m/s: 72 * (5 / 18) = 20 m/s. Since Length = Speed * Time, the length of the train is 20 * 15 = 300 meters.",
    explanationHi:
      "पहले गति को मी/सेकंड में परिवर्तित करें: 72 * (5 / 18) = 20 मी/सेकंड। चूँकि लंबाई = गति * समय, ट्रेन की लंबाई 20 * 15 = 300 मीटर है।",
    subject: "Mathematics",
    topic: "Speed",
    examTags: ["Maths", "Time Distance Speed", "Railway Group D", "SSC GD"],
    year: "RRB Group D 2022",
    likes: 540,
    dislikes: 6,
  },
  {
    id: "maths-int-1",
    questionEn:
      "A sum of money doubles itself in 8 years at simple interest. What is the rate of interest per annum?",
    questionHi:
      "कोई धनराशि साधारण ब्याज पर 8 वर्षों में दोगुनी हो जाती है। प्रति वर्ष ब्याज की दर क्या है?",
    optionsEn: ["10%", "12%", "12.5%", "15%"],
    optionsHi: ["10%", "12%", "12.5%", "15%"],
    correctAnswer: "C",
    explanationEn:
      "At simple interest, if a sum doubles itself, the interest earned equals the principal. Let Principal = P, Interest = P, Time = 8. P = (P * R * 8) / 100 => R = 100 / 8 = 12.5% per annum.",
    explanationHi:
      "साधारण ब्याज पर, यदि कोई मूलधन दोगुना हो जाता है, तो अर्जित ब्याज मूलधन के बराबर होता है। मान लें मूलधन = P, ब्याज = P, समय = 8. P = (P * R * 8) / 100 => R = 100 / 8 = 12.5% प्रति वर्ष।",
    subject: "Mathematics",
    topic: "Interest",
    examTags: ["Maths", "Simple Interest", "Bihar Police SI"],
    year: "Bihar Police SI 2022",
    likes: 311,
    dislikes: 4,
  },
  {
    id: "maths-mens-1",
    questionEn:
      "Find the volume of a sphere whose radius is 21 cm. (Use π = 22/7)",
    questionHi:
      "एक गोले का आयतन ज्ञात कीजिए जिसकी त्रिज्या 21 सेमी है। (π = 22/7 का उपयोग करें)",
    optionsEn: ["18480 cm³", "28480 cm³", "38808 cm³", "48808 cm³"],
    optionsHi: ["18480 सेमी³", "28480 सेमी³", "38808 सेमी³", "48808 सेमी³"],
    correctAnswer: "C",
    explanationEn:
      "Volume of a sphere = (4/3) * π * r³. Replacing the radius (r = 21): V = (4/3) * (22/7) * 21 * 21 * 21 = 4 * 22 * 21 * 21 = 88 * 441 = 38808 cm³.",
    explanationHi:
      "गोले का आयतन = (4/3) * π * r³। त्रिज्या (r = 21) रखने पर: V = (4/3) * (22/7) * 21 * 21 * 21 = 4 * 22 * 21 * 21 = 88 * 441 = 38808 सेमी³।",
    subject: "Mathematics",
    topic: "Mensuration",
    examTags: ["Maths", "Mensuration", "SSC CGL", "State PCS"],
    year: "SSC CGL 2023",
    likes: 215,
    dislikes: 3,
  },
  {
    id: "maths-dec-1",
    questionEn:
      "Express the repeating decimal ratio 0.363636... as a simple fraction in its lowest terms.",
    questionHi:
      "आवर्ती दशमलव संख्या 0.363636... को उसके न्यूनतम रूप में एक साधारण भिन्न के रूप में व्यक्त करें।",
    optionsEn: ["36/100", "4/11", "3/8", "9/25"],
    optionsHi: ["36/100", "4/11", "3/8", "9/25"],
    correctAnswer: "B",
    explanationEn:
      "Let x = 0.363636... Since two digits repeat, multiply by 100: 100x = 36.363636... Subtracting gives: 99x = 36 => x = 36/99. Reduced to lowest terms, 36/99 = 4/11.",
    explanationHi:
      "माना x = 0.363636... चूँकि दो अंकों की आवृत्ति हो रही है, इसलिए 100 से गुणा करें: 100x = 36.363636... घटाने पर: 99x = 36 => x = 36/99। लघुतम रूप में सरल करने पर, 36/99 = 4/11 होगा।",
    subject: "Mathematics",
    topic: "Decimal",
    examTags: ["Maths", "Decimal", "Teaching Exams", "SSC MTS"],
    year: "CTET 2021",
    likes: 195,
    dislikes: 1,
  },
  {
    id: "maths-lcm-1",
    questionEn:
      "The HCF of two numbers is 11 and their LCM is 7700. If one of the numbers is 275, find the other number.",
    questionHi:
      "दो संख्याओं का महत्तम समापवर्तक (HCF) 11 है और उनका लघुत्तम समापवर्त्य (LCM) 7700 है। यदि उनमें से एक संख्या 275 है, तो दूसरी संख्या ज्ञात कीजिए।",
    optionsEn: ["290", "308", "318", "320"],
    optionsHi: ["290", "308", "318", "320"],
    correctAnswer: "B",
    explanationEn:
      "The fundamental relation is: HCF * LCM = Product of the two numbers. Therefore, 11 * 7700 = 275 * Second Number. Second Number = (11 * 7700) / 275 = 7700 / 25 = 308.",
    explanationHi:
      "दो संख्याओं का गुणनफल हमेशा उनके HCF और LCM के गुणनफल के बराबर होता है: HCF * LCM = संख्या 1 * संख्या 2। अतः, 11 * 7700 = 275 * संख्या 2। संख्या 2 = (11 * 7700) / 275 = 308।",
    subject: "Mathematics",
    topic: "LCM",
    examTags: ["Maths", "LCM & HCF", "Railway", "SSC GD"],
    year: "RRB NTPC 2022",
    likes: 289,
    dislikes: 2,
  },
  {
    id: "maths-di-1",
    questionEn:
      "In a pie chart representing family expenditures, the segment for 'Rent' has a central angle of 72°. What percentage of the total budget is spent on Rent?",
    questionHi:
      "एक परिवार के खर्चों को दर्शाने वाले पाई चार्ट में, 'किराया' खंड का केंद्रीय कोण 72° है। कुल बजट का कितना प्रतिशत किराये पर खर्च किया जाता है?",
    optionsEn: ["15%", "20%", "25%", "30%"],
    optionsHi: ["15%", "20%", "25%", "30%"],
    correctAnswer: "B",
    explanationEn:
      "The total angle around the center of a circle is 360°. The percentage represented by 72° is: (72° / 360°) * 100 = 1/5 * 100 = 20%.",
    explanationHi:
      "चूँकि पाई चार्ट में वृत्त का कुल कोण 360° होता है। प्रतिशत में किराये का खर्च = (72° / 360°) * 100 = 1/5 * 100 = 20%।",
    subject: "Mathematics",
    topic: "DI",
    examTags: ["Maths", "Data Interpretation", "SSC CGL", "Banking"],
    year: "SSC CGL 2022",
    likes: 310,
    dislikes: 3,
  },
  {
    id: "r-sim-1",
    questionEn:
      "Three of the following four words are alike in a certain way and one is different. Choose the odd one out.",
    questionHi:
      "निम्नलिखित चार शब्दों में से तीन एक निश्चित तरीके से समान हैं और एक भिन्न है। विषम शब्द को चुनिए।",
    optionsEn: ["Ludo", "Chess", "Carrom", "Football"],
    optionsHi: ["लूडो", "शतरंज", "कैरम", "फुटबॉल"],
    correctAnswer: "D",
    explanationEn:
      "Ludo, Chess, and Carrom are indoor games, while Football is an outdoor game.",
    explanationHi:
      "लूडो, शतरंज और कैरम इनडोर (विद्यमान इंडोर) खेल हैं, जबकि फुटबॉल एक आउटडोर (मैदानी) खेल है।",
    subject: "Reasoning",
    topic: "Similarity",
    examTags: ["Reasoning", "Similarity", "SSC GD", "MTS"],
    year: "SSC MTS 2023",
    likes: 312,
    dislikes: 1,
  },
  {
    id: "r-ana-1",
    questionEn:
      "Select the option that is related to the third term in the same way as the second term is related to the first term.\nDoctor : Stethoscope :: Painter : ?",
    questionHi:
      "उस विकल्प का चयन करें जो तीसरे पद से उसी प्रकार संबंधित है जैसे दूसरा पद पहले पद से संबंधित है।\nडॉक्टर : स्टेथोस्कोप :: चित्रकार : ?",
    optionsEn: ["Chisel", "Brush", "Screwdriver", "Spade"],
    optionsHi: ["छेनी", "ब्रश", "पेचकस", "फावड़ा"],
    correctAnswer: "B",
    explanationEn:
      "A stethoscope is the primary tool used by a doctor. Similarly, a brush is the primary tool used by a painter.",
    explanationHi:
      "स्टेथोस्कोप डॉक्टर द्वारा उपयोग किया जाने वाला मुख्य उपकरण है। उसी प्रकार, ब्रश (कूची) चित्रकार का मुख्य उपकरण होता है।",
    subject: "Reasoning",
    topic: "Analogy",
    examTags: ["Reasoning", "Analogy", "Railway NTPC", "SSC CHSL"],
    year: "RRB NTPC 2022",
    likes: 418,
    dislikes: 2,
  },
  {
    id: "r-cla-1",
    questionEn:
      "In a certain classification pattern, which of the following numbers does NOT belong to the group?",
    questionHi:
      "एक निश्चित वर्गीकरण पैटर्न में, निम्नलिखित में से कौन सी संख्या समूह से संबंधित नहीं है?",
    optionsEn: ["27", "64", "125", "144"],
    optionsHi: ["27", "64", "125", "144"],
    correctAnswer: "D",
    explanationEn:
      "27 (3³), 64 (4³), and 125 (5³) are perfect cubes. 144 is a perfect square (12²) but not a perfect cube.",
    explanationHi:
      "27 (3 का घन), 64 (4 का घन) और 125 (5 का घन) पूर्ण घन संख्याएँ हैं। जबकि 144 एक पूर्ण वर्ग (12 का वर्ग) है, पूर्ण घन नहीं।",
    subject: "Reasoning",
    topic: "Classification",
    examTags: ["Reasoning", "Classification", "SSC CGL"],
    year: "SSC CGL 2023",
    likes: 220,
    dislikes: 3,
  },
  {
    id: "r-cod-1",
    questionEn:
      "If in a certain code language, 'ROSE' is written as 'TQUG', how will 'BISCUIT' be written in that code?",
    questionHi:
      "यदि एक निश्चित कूट भाषा में, 'ROSE' को 'TQUG' लिखा जाता है, तो उसी कूट भाषा में 'BISCUIT' को कैसे लिखा जाएगा?",
    optionsEn: ["DKUEWKV", "DKUEWKV", "DKVEWKV", "DKUEUKV"],
    optionsHi: ["DKUEWKV", "DKUEWKV", "DKVEWKV", "DKUEUKV"],
    correctAnswer: "A",
    explanationEn:
      "The pattern is +2 shifting for each alphabet: R(+2)->T, O(+2)->Q, S(+2)->U, E(+2)->G. Applying this to BISCUIT gives DKUEWKV.",
    explanationHi:
      "प्रत्येक वर्ण में +2 वर्णों की वृद्धि हो रही है: R (+2) = T, O (+2) = Q, S (+2) = U, E (+2) = G। इसी प्रकार BISCUIT में +2 लागू करने से DKUEWKV प्राप्त होगा।",
    subject: "Reasoning",
    topic: "Coding",
    examTags: ["Reasoning", "Coding Decoding", "Delhi Police"],
    year: "Delhi Police GD 2023",
    likes: 340,
    dislikes: 4,
  },
  {
    id: "r-num-1",
    questionEn: "Find the missing term in the series: 4, 9, 19, 39, 79, ?",
    questionHi: "दी गई श्रृंखला में लुप्त पद ज्ञात करें: 4, 9, 19, 39, 79, ?",
    optionsEn: ["119", "139", "159", "169"],
    optionsHi: ["119", "139", "159", "169"],
    correctAnswer: "C",
    explanationEn:
      "The pattern is (previous term * 2) + 1. Thus, 4*2+1=9, 9*2+1=19, 19*2+1=39, 39*2+1=79, 79*2+1=159.",
    explanationHi:
      "प्रतिमान है: (पिछली संख्या * 2) + 1। तदनुसार, 4*2+1=9, 9*2+1=19, 19*2+1=39, 39*2+1=79, और अगला पद 79*2+1 = 159 होगा।",
    subject: "Reasoning",
    topic: "Number Series",
    examTags: ["Reasoning", "Number Series", "Railway Group D"],
    year: "RRB Group D 2022",
    likes: 195,
    dislikes: 2,
  },
  {
    id: "r-spa-1",
    questionEn:
      "Which of the 3D shapes can be formed by folding the given 2D net sheet of paper?",
    questionHi:
      "कागज की दी गई 2D नेट शीट को मोड़कर निम्नलिखित में से कौन सी 3D आकृति बनाई जा सकती है?",
    optionsEn: [
      "Cube with opposite faces matching",
      "Tetrahedron",
      "Cylinder",
      "Cone",
    ],
    optionsHi: [
      "विपरीत फलकों से मेल खाता हुआ पासा (घन)",
      "चतुष्फलक (Tetrahedron)",
      "बेलन (Cylinder)",
      "शंकु (Cone)",
    ],
    correctAnswer: "A",
    explanationEn: "A 6-square T-shaped net can be folded to form a 3D Cube.",
    explanationHi:
      "एक 6-वर्गाकार टी-आकार के समतल जाल को मोड़ने से एक त्रि-आयामी घन (Cube) प्राप्त होता है।",
    subject: "Reasoning",
    topic: "Spatial",
    examTags: ["Reasoning", "Spatial Visualization", "SSC CGL"],
    year: "SSC CGL 2021",
    likes: 112,
    dislikes: 1,
  },
  {
    id: "r-dir-1",
    questionEn:
      "A man starts walking towards West. After walking 40 meters, he turns left and walks 30 meters. How far is he now from his starting point?",
    questionHi:
      "एक व्यक्ति पश्चिम की ओर चलना शुरू करता है। 40 मीटर चलने के बाद, वह बाएं मुड़ता है और 30 मीटर चलता है। वह अब अपने शुरुआती बिंदु से कितनी दूरी पर है?",
    optionsEn: ["10 meters", "50 meters", "70 meters", "80 meters"],
    optionsHi: ["10 मीटर", "50 मीटर", "70 मीटर", "80 मीटर"],
    correctAnswer: "B",
    explanationEn:
      "Using Pythagoras theorem: Distance = √(40² + 30²) = √(1600 + 900) = √2500 = 50 meters.",
    explanationHi:
      "पाइथागोरस प्रमेय का उपयोग करने पर: दूरी = √(40² + 30²) = √(1600 + 900) = √2500 = 50 मीटर।",
    subject: "Reasoning",
    topic: "Direction",
    examTags: ["Reasoning", "Direction Test", "Railway ALP"],
    year: "RRB ALP 2022",
    likes: 280,
    dislikes: 4,
  },
  {
    id: "r-vis-1",
    questionEn:
      "In a visual memory test, which of the following shapes occupies the exact alternate position in an alternating series of Circles and Triangles?",
    questionHi:
      "दृश्य स्मृति परीक्षण में, वृत्तों और त्रिभुजों की एक एकांतर श्रृंखला में निम्नलिखित में से कौन सा आकार वैकल्पिक स्थान ग्रहण करता है?",
    optionsEn: ["Triangle", "Circle", "Square", "Hexagon"],
    optionsHi: ["त्रिभुज", "वृत्त", "वर्ग", "षट्भुज"],
    correctAnswer: "A",
    explanationEn:
      "If the sequence alternates (Circle, Triangle, Circle, Triangle...), the third and alternate positions will be Triangles relative to even indices.",
    explanationHi:
      "यदि श्रृंखला एकांतर (वृत्त, त्रिभुज, वृत्त, त्रिभुज...) है, तो सम पदों के पश्चात वाला वैकल्पिक स्थान हमेशा त्रिभुज का होगा।",
    subject: "Reasoning",
    topic: "Visual Memory",
    examTags: ["Reasoning", "Visual Memory", "SSC MTS"],
    year: "SSC MTS 2021",
    likes: 98,
    dislikes: 1,
  },
  {
    id: "r-rel-1",
    questionEn:
      "Pointing to a man, a woman said, 'His mother is the only daughter of my mother.' How is the woman related to that man?",
    questionHi:
      "एक पुरुष की ओर इशारा करते हुए एक महिला ने कहा, 'इसकी माँ मेरी माँ की इकलौती बेटी है।' महिला का उस पुरुष से क्या संबंध है?",
    optionsEn: ["Aunt", "Sister", "Mother", "Grandmother"],
    optionsHi: ["चाची/मौसी", "बहन", "माता", "दादी/नानी"],
    correctAnswer: "C",
    explanationEn:
      "The woman's mother's only daughter is the woman herself. Since this woman is the man's mother, the woman is the mother of the man.",
    explanationHi:
      "महिला की माँ की इकलौती बेटी स्वयं वह महिला है। चूँकि वह महिला उस पुरुष की माता है, अतः महिला का पुरुष से संबंध 'माता' का है।",
    subject: "Reasoning",
    topic: "Relationship",
    examTags: ["Reasoning", "Blood Relations", "UP Sub Inspector"],
    year: "UP Police SI 2021",
    likes: 490,
    dislikes: 3,
  },
  {
    id: "r-mir-1",
    questionEn:
      "Find the correct mirror image of the word 'REASONING' when a mirror is placed vertically to its right.",
    questionHi:
      "जब दर्पण को 'REASONING' शब्द के दाईं ओर लंबवत रखा जाता है, तो उसका सही दर्पण प्रतिबिम्ब ज्ञात कीजिए।",
    optionsEn: [
      "GNINOSTER (Reversed order with reversed letters)",
      "REASONING",
      "GNINOSAER (Reversed order but vertical)",
      "None of these",
    ],
    optionsHi: [
      "GNINOSTER (उल्टे अक्षरों के साथ उल्टा क्रम)",
      "REASONING",
      "GNINOSAER (उल्टे क्रम में साधारण अक्षर)",
      "इनमें से कोई नहीं",
    ],
    correctAnswer: "A",
    explanationEn:
      "The mirror image of a word reverses both the order of letters (from right to left) and flips each single letter horizontally.",
    explanationHi:
      "एक शब्द का दर्पण प्रतिबिम्ब अक्षरों के क्रम को (दाएं से बाएं) उलट देता है और प्रत्येक व्यक्तिगत अक्षर को क्षैतिज रूप से पलट देता है।",
    subject: "Reasoning",
    topic: "Mirror Image",
    examTags: ["Reasoning", "Mirror Image", "SSC CGL", "GD"],
    year: "SSC CGL 2022",
    likes: 345,
    dislikes: 6,
  },
  {
    id: "r-wat-1",
    questionEn:
      "What will be the water image of the chemical code formula 'H2O'?",
    questionHi: "रासायनिक कोडेड सूत्र 'H2O' का जल प्रतिबिम्ब क्या होगा?",
    optionsEn: [
      "H2O (with 2 flipped vertically)",
      "O2H",
      "H2O (identical standard format)",
      "H5O",
    ],
    optionsHi: [
      "H2O (2 को लंबवत उल्टा करने पर)",
      "O2H",
      "H2O (समान रूप)",
      "H5O",
    ],
    correctAnswer: "A",
    explanationEn:
      "In water reflection, the top and bottom parts flip vertically. 'H' and 'O' remain unchanged, while the number '2' turns upside down.",
    explanationHi:
      "जल प्रतिबिम्ब में, ऊपरी और निचला भाग लंबवत रूप से पलट जाता है। 'H' और 'O' अपरिवर्तित रहते हैं, जबकि संख्या '2' लंबवत उलट जाती है।",
    subject: "Reasoning",
    topic: "Water Image",
    examTags: ["Reasoning", "Water Image", "State Exams", "Railway"],
    year: "State Police 2023",
    likes: 210,
    dislikes: 2,
  },
  {
    id: "r-emb-1",
    questionEn:
      "A complex figure contains a hidden diagonal zigzag. Which of the standard options represents the correct embedded component?",
    questionHi:
      "एक जटिल रेखाचित्र में एक विकर्ण ज़िगज़ैग छिपा हुआ है। मानक विकल्पों में से कौन सा सही सन्निहित (Embedded) घटक का प्रतिनिधित्व करता है?",
    optionsEn: [
      "The zigzag component alone matching original orientation",
      "A straight horizontal line",
      "A pure vertical line",
      "A regular circle",
    ],
    optionsHi: [
      "मूल अभिविन्यास से मेल खाता हुआ केवल ज़िगज़ैग घटक",
      "एक सीधी क्षैतिज रेखा",
      "एक शुद्ध खड़ी रेखा",
      "एक नियमित वृत्त",
    ],
    correctAnswer: "A",
    explanationEn:
      "The correct option must contain the exact same geometric shape without scaling skew or rotation deviations.",
    explanationHi:
      "सही विकल्प में बिना किसी अभिविन्यास या कोणीय बदलाव के बिल्कुल वही ज्यामितीय आकृति समाहित होनी चाहिए।",
    subject: "Reasoning",
    topic: "Embedded Figures",
    examTags: ["Reasoning", "Embedded Figures", "SSC MTS"],
    year: "SSC MTS 2022",
    likes: 198,
    dislikes: 4,
  },
  {
    id: "r-pap-1",
    questionEn:
      "A circular piece of paper is folded twice and then a small semi-circle is cut out from the folded edge. How will it look when unfolded?",
    questionHi:
      "कागज के एक गोलाकार टुकड़े को दो बार मोड़ा जाता है और फिर मुड़े हुए किनारे से एक छोटा अर्धवृत्त काटा जाता है। जब इसे खोला जाएगा तो यह कैसा दिखेगा?",
    optionsEn: [
      "Circle with two symmetrical circular holes near the center",
      "Circle with one hole",
      "Circle with four holes",
      "Plain undivided circle",
    ],
    optionsHi: [
      "केंद्र के पास दो सममितीय गोलाकार छिद्रों वाला वृत्त",
      "एक छिद्र वाला वृत्त",
      "चार छिद्रों वाला वृत्त",
      "बिना कटे सादा वृत्त",
    ],
    correctAnswer: "A",
    explanationEn:
      "Folding twice reduces the paper to a quarter circle. Cutting a semi-circle on the fold unfolds to make two symmetrical circular holes corresponding to the symmetrical mirror planes.",
    explanationHi:
      "दो बार मोड़ने से कागज चौथाई वृत्त में बदल जाता है। मुड़े हुए भाग पर अर्धवृत्ताकार कट लगाने से खुलने पर दो सममित गोलाकार छेद दिखाई देंगे।",
    subject: "Reasoning",
    topic: "Paper Folding",
    examTags: ["Reasoning", "Paper Folding & Cutting", "SSC CGL", "Railway"],
    year: "SSC CGL 2022",
    likes: 412,
    dislikes: 5,
  },
  {
    id: "h-sandhi-1",
    questionEn:
      "Which of the following represents the correct Sandhi Vicchhed of 'Devendra'?",
    questionHi: "'देवेन्द्र' का सही संधि-विच्छेद निम्नलिखित में से कौन सा है?",
    optionsEn: ["Dev + Indra", "Deva + Indra", "Dev + Endra", "Devi + Indra"],
    optionsHi: [
      "देव + इन्द्र",
      "देवा + इन्द्र",
      "देव + ईन्द्र",
      "देवी + इन्द्र",
    ],
    correctAnswer: "A",
    explanationEn:
      "Dev + Indra = Devendra. Here 'a' (अ) of Dev combines with 'i' (इ) of Indra to form 'e' (ए). This is a Guna Swar Sandhi.",
    explanationHi:
      "देव + इन्द्र = देवेन्द्र। यहाँ 'देव' का अंतिम स्वर 'अ' और 'इन्द्र' का प्रथम स्वर 'इ' मिलकर 'ए' बन जाते हैं। यह गुण स्वर संधि का उदाहरण है।",
    subject: "Hindi",
    topic: "Sandhi",
    examTags: ["Hindi", "Sandhi", "UP Police", "RO/ARO"],
    year: "UP Police Cons 2023",
    likes: 312,
    dislikes: 2,
  },
  {
    id: "h-samas-1",
    questionEn: "Which Samas is present in 'Yathashakti'?",
    questionHi: "'यथाशक्ति' शब्द में कौन सा समास है?",
    optionsEn: [
      "Tatpurush Samas",
      "Avyayibhava Samas",
      "Dvigis Samas",
      "Bahuvrihi Samas",
    ],
    optionsHi: [
      "तत्पुरुष समास",
      "अव्ययीभाव समास",
      "द्विगु समास",
      "बहुव्रीहि समास",
    ],
    correctAnswer: "B",
    explanationEn:
      "The word starts with an indeclinable (Avyaya) prefix 'Yatha', and indicates 'Shakti ke anusar' (according to capability). Hence, it is Avyayibhava Samas.",
    explanationHi:
      "'यथाशक्ति' का विग्रह 'शक्ति के अनुसार' होता है। इस शब्द का पूर्व पद 'यथा' एक अव्यय (उपसर्ग) है, इसलिए इसमें अव्ययीभाव समास है।",
    subject: "Hindi",
    topic: "Samas",
    examTags: ["Hindi", "Samas", "VDO", "UPTET"],
    year: "UP VDO 2022",
    likes: 410,
    dislikes: 1,
  },
  {
    id: "h-karak-1",
    questionEn:
      "In the sentence 'Tree leaves fall' (पेड़ से पत्ता गिरा), which Karak is used?",
    questionHi:
      "'पेड़ से पत्ता गिरा' वाक्य में 'से' किस कारक का कारक चिह्न है?",
    optionsEn: [
      "Karan Karak (Instrumental)",
      "Apadaan Karak (Ablative)",
      "Sampradaan Karak (Dative)",
      "Karma Karak (Accusative)",
    ],
    optionsHi: ["करण कारक", "अपादान कारक", "सम्प्रदान कारक", "कर्म कारक"],
    correctAnswer: "B",
    explanationEn:
      "'Apadaan' denotes separation. Since the leaf is separating from the tree, 'se' here acts as the ablative/Apadaan case indicator.",
    explanationHi:
      "अपादान कारक का विभक्ति चिह्न 'से' होता है जो किसी चीज के अलग होने (पृथकता) के भाव को दर्शाता है। चूँकि पत्ता पेड़ से अलग हो रहा है, इसलिए यहाँ अपादान कारक है।",
    subject: "Hindi",
    topic: "Karak",
    examTags: ["Hindi", "Karak", "UP Police SI", "CTET"],
    year: "UP SI 2021",
    likes: 295,
    dislikes: 3,
  },
  {
    id: "h-vachan-1",
    questionEn: "What is the plural form of 'Chidiya' (चिड़िया)?",
    questionHi: "'चिड़िया' शब्द का बहुवचन रूप क्या होगा?",
    optionsEn: [
      "Chidiyaye",
      "Chidiyan (with Chandrabindu)",
      "Chidiyo",
      "Chidiyayein",
    ],
    optionsHi: ["चिड़ियाँये", "चिड़ियाँ", "चिड़ियों", "चिड़ियाएँ"],
    correctAnswer: "B",
    explanationEn:
      "Nouns ending with 'ya' are made plural by placing a Chandrabindu (ँ) over 'ya'. Thus, 'Chidiya' becomes 'Chidiyan'.",
    explanationHi:
      "स्त्रीलिंग संज्ञा शब्द जिनके अंत में 'या' आता है, उनका बहुवचन बनाने के लिए 'या' के ऊपर चन्द्रबिन्दु (ँ) लगाया जाता है। अतः 'चिड़िया' का बहुवचन 'चिड़ियाँ' होगा।",
    subject: "Hindi",
    topic: "Vachan",
    examTags: ["Hindi", "Vachan", "Bihar STET", "REET"],
    year: "REET 2022",
    likes: 185,
    dislikes: 1,
  },
  {
    id: "h-ling-1",
    questionEn:
      "Which of the following is the feminine counterpart of the masculine noun 'Kavi' (कवि)?",
    questionHi: "'कवि' शब्द का सही स्त्रीलिंग रूप निम्नलिखित में से कौन सा है?",
    optionsEn: ["Kavita", "Kaviyitri (कवयित्री)", "Kaviyatri", "Kavinee"],
    optionsHi: ["कविता", "कवयित्री", "कवियित्री", "कविनी"],
    correctAnswer: "B",
    explanationEn:
      "The correct spelling and grammatical feminine form of 'Kavi' is 'Kavayitri'. Note the spelling shifts (कवयित्री).",
    explanationHi:
      "'कवि' का शुद्ध स्त्रीलिंग रूप 'कवयित्री' होता है। इसकी वर्तनी पर विशेष ध्यान देना चाहिए क्योंकि यह अक्सर वर्तनी शुद्धि परीक्षाओं में भी पूछा जाता है।",
    subject: "Hindi",
    topic: "Ling",
    examTags: ["Hindi", "Ling", "MP TET", "Super TET"],
    year: "MP TET 2023",
    likes: 382,
    dislikes: 5,
  },
  {
    id: "h-kaal-1",
    questionEn:
      "Identify the tense/Kaal in: 'Ram wrote a letter' (राम ने पत्र लिखा).",
    questionHi: "'राम ने पत्र लिखा' वाक्य में कौन सा काल है?",
    optionsEn: [
      "Samanya Bhutnaal (Simple Past)",
      "Asanna Bhutkaal (Recent Past)",
      "Purna Bhutkaal (Past Perfect)",
      "Apurna Bhutkaal (Past Continuous)",
    ],
    optionsHi: [
      "सामान्य भूतकाल",
      "आसन्न भूतकाल",
      "पूर्ण भूतकाल",
      "अपूर्ण भूतकाल",
    ],
    correctAnswer: "A",
    explanationEn:
      "Since the action occurred in the past but doesn't specify a precise time indicator relative to other endpoints, it represents Samanya Bhutkaal.",
    explanationHi:
      "जिस क्रिया से भूतकाल में काम के होने का साधारण बोध हो और भूतकाल की निश्चित सीमा न दी हो, उसे सामान्य भूतकाल कहते हैं। अतः 'राम ने पत्र लिखा' सामान्य भूतकाल का उदाहरण है।",
    subject: "Hindi",
    topic: "Kaal",
    examTags: ["Hindi", "Kaal", "UPSSSC", "High Court"],
    year: "UPSSSC Junior Assistant 2021",
    likes: 210,
    dislikes: 2,
  },
  {
    id: "h-vachya-1",
    questionEn:
      "In the sentence 'Ram pulls the cart' (राम द्वारा गाड़ी खींची जाती है), which Vachya is present?",
    questionHi:
      "'राम द्वारा गाड़ी खींची जाती है' वाक्य में किस वाच्य का प्रयोग हुआ है?",
    optionsEn: [
      "Kartrivachya (Active)",
      "Karmavachya (Passive)",
      "Bhavavachya (Impersonal)",
      "None of these",
    ],
    optionsHi: ["कर्तृवाच्य", "कर्मवाच्य", "भाववाच्य", "इनमें से कोई नहीं"],
    correctAnswer: "B",
    explanationEn:
      "Since the sentence has grammatical alignment of the verb with 'Gaadi' (the object/Karman) and uses 'dwara' (by), it is a classic passive/Karmavachya sentence.",
    explanationHi:
      "जहाँ वाक्य में कर्म की प्रधानता हो और क्रिया कर्म के लिंग, वचन के अनुसार बदलती है (जैसे गाड़ी स्त्रीलिंग है तो खींची जाती है) और 'द्वारा' कारक का प्रयोग हो, वहाँ कर्मवाच्य होता है।",
    subject: "Hindi",
    topic: "Vachya",
    examTags: ["Hindi", "Vachya", "UPTET", "RO/ARO"],
    year: "UPTET 2022",
    likes: 195,
    dislikes: 1,
  },
  {
    id: "h-prefix-1",
    questionEn: "Which prefix is used in the word 'Atvacha' (अधपका)?",
    questionHi: "'अधपका' शब्द में किस उपसर्ग का प्रयोग किया गया है?",
    optionsEn: ["A", "Adh", "Adha", "Ap"],
    optionsHi: ["अ", "अध", "आधा", "अप"],
    correctAnswer: "B",
    explanationEn:
      "The prefix 'Adh' meaning half is merged with root 'paka' (cooked) to create 'Adhpaka'.",
    explanationHi:
      "'अधपका' में हिंदी के तद्भव उपसर्ग 'अध' (अर्थात् आधा) का प्रयोग किया गया है, जो मूल शब्द 'पका' के पूर्व जुड़ा है।",
    subject: "Hindi",
    topic: "Prefix Suffix",
    examTags: ["Hindi", "Upsarg", "Pratyay", "SSC GD"],
    year: "SSC GD 2023",
    likes: 271,
    dislikes: 3,
  },
  {
    id: "h-kriya-1",
    questionEn:
      "In 'He sleeps' (वह सोता है), which kind of verb/Kriya is used?",
    questionHi: "'वह सोता है' वाक्य में प्रयुक्त क्रिया किस कोटि की है?",
    optionsEn: [
      "Sakarmak Kriya (Transitive)",
      "Akarmak Kriya (Intransitive)",
      "Dvikarmak Kriya",
      "Preranarthak Kriya",
    ],
    optionsHi: [
      "सकर्मक क्रिया",
      "अकर्मक क्रिया",
      "द्विकर्मक क्रिया",
      "प्रेरणार्थक क्रिया",
    ],
    correctAnswer: "B",
    explanationEn:
      "Sleeping ('Sona') doesn't direct action on a grammatical object, hence it represents an intransitive/Akarmak Kriya.",
    explanationHi:
      "'सोना' (sleep) क्रिया के लिए किसी बाह्य कर्म की आवश्यकता नहीं होती। क्रिया का सीधा फल कर्ता पर पड़ता है, इसलिए यह अकर्मक क्रिया का उदाहरण है।",
    subject: "Hindi",
    topic: "Kriya",
    examTags: ["Hindi", "Kriya", "UP Constable", "Patwari"],
    year: "MP Patwari 2023",
    likes: 310,
    dislikes: 1,
  },
  {
    id: "h-sangya-1",
    questionEn: "What classification of Noun is 'Ganga' (गंगा)?",
    questionHi: "'गंगा' शब्द में संज्ञा का कौन सा भेद है?",
    optionsEn: [
      "Jativachak (Common)",
      "Vyaktivachak (Proper)",
      "Bhavavachak (Abstract)",
      "Samuhvachak (Collective)",
    ],
    optionsHi: [
      "जातिवाचक संज्ञा",
      "व्यक्तिवाचक संज्ञा",
      "भाववाचक संज्ञा",
      "समूहवाचक संज्ञा",
    ],
    correctAnswer: "B",
    explanationEn:
      "'Ganga' represents a specific singular name of a river. Proper nouns are Vyaktivachak Sangya.",
    explanationHi:
      "चूँकि 'गंगा' एक विशेष नदी का निश्चित व्यक्तिगत नाम है, इसलिए यह व्यक्तिवाचक संज्ञा है। यदि केवल 'नदी' लिखा होता तो वह जातिवाचक संज्ञा होती।",
    subject: "Hindi",
    topic: "Sangya",
    examTags: ["Hindi", "Sangya", "State Exams", "UPSSSC"],
    year: "UP Constable 2022",
    likes: 420,
    dislikes: 2,
  },
  {
    id: "h-sarvanam-1",
    questionEn:
      "In the sentence 'I will do it myself' (मैं अपने आप काम कर लूंगा), what subclass is 'Apne Aap'?",
    questionHi:
      "'मैं अपने आप काम कर लूंगा' में 'अपने आप' किस सर्वनाम वर्ग से है?",
    optionsEn: [
      "Purushvachak (Personal)",
      "Nijvachak (Reflexive)",
      "Nischayvachak (Demonstrative)",
      "Sambandhvachak (Relative)",
    ],
    optionsHi: [
      "पुरुषवाचक सर्वनाम",
      "निजवाचक सर्वनाम",
      "निश्चयवाचक सर्वनाम",
      "संबंधवाचक सर्वनाम",
    ],
    correctAnswer: "B",
    explanationEn:
      "'Apne Aap', 'Swayam', 'Khud' represent reflexive pronound indicating Nijvachak Sarvanam.",
    explanationHi:
      "जिन सर्वनाम शब्दों का प्रयोग कर्ता स्वयं अपने (स्वत्व या स्वयं) के लिए करता है, उन्हें निजवाचक सर्वनाम कहते हैं। यहाँ 'अपने आप' निजत्व प्रकट करता है।",
    subject: "Hindi",
    topic: "Sarvanam",
    examTags: ["Hindi", "Sarvanam", "DSSSB", "TGT"],
    year: "DSSSB TGT 2022",
    likes: 231,
    dislikes: 2,
  },
  {
    id: "h-vish-1",
    questionEn:
      "In 'Black Cow' (काली गाय), which word represents the Visheshya (Noun being modified)?",
    questionHi: "'काली गाय अधिक दूध देती है' वाक्य में विशेष्य पद कौन सा है?",
    optionsEn: [
      "Kaali (Black)",
      "Gaay (Cow)",
      "Dudh (Milk)",
      "Deti hai (Gives)",
    ],
    optionsHi: ["काली", "गाय", "दूध", "देती है"],
    correctAnswer: "B",
    explanationEn:
      "The word whose quality is modified/described is 'Visheshya'. Here 'Kaali' is the adjective ('Visheshon') modifying 'Gaay' ('Visheshya').",
    explanationHi:
      "जिस संज्ञा या सर्वनाम शब्द की विशेषता बताई जाती है, उसे विशेष्य कहते हैं। यहाँ 'काली' विशेषण है जो 'गाय' (विशेष्य) की विशेषता बता रहा है।",
    subject: "Hindi",
    topic: "Visheshon",
    examTags: ["Hindi", "Visheshon", "RO/ARO Pre"],
    year: "UP RO/ARO 2021",
    likes: 412,
    dislikes: 4,
  },
  {
    id: "h-avyay-1",
    questionEn:
      "In 'He walks slowly' (वह धीरे-धीरे चलता है), which word represents the Avyay?",
    questionHi: "'वह धीरे-धीरे चलता है' वाक्य में 'धीरे-धीरे' कौन सा अव्यय है?",
    optionsEn: [
      "Kriyavisheshon (Adverbial)",
      "Sambondhabodhak",
      "Samuccayabodhak",
      "Vismayadibodhak",
    ],
    optionsHi: [
      "क्रियाविशेषण अव्यय",
      "संबंधबोधक अव्यय",
      "समुच्चयबोधक अव्यय",
      "विस्मयादिबोधक अव्यय",
    ],
    correctAnswer: "A",
    explanationEn:
      "'Dheere-Dheere' describes how he walks (action modifier). It is a Reetivachak Kriyavisheshon Avyay.",
    explanationHi:
      "'धीरे-धीरे' चलने की रीति/ढंग को स्पष्ट कर रहा है, इसलिए यह रीतिवाचक क्रियाविशेषण अव्यय है, जो रूप-लिंग-वचन के अनुसार कभी नहीं बदलता।",
    subject: "Hindi",
    topic: "Avyay",
    examTags: ["Hindi", "Avyay", "REET", "HSSC"],
    year: "HSSC CET 2023",
    likes: 198,
    dislikes: 3,
  },
  {
    id: "h-sencor-1",
    questionEn:
      "Choose the grammatically correct sentence relative to Hind syntax.",
    questionHi: "निम्नलिखित में से शुद्ध वाक्य का चयन कीजिए:",
    optionsEn: [
      "Here is plenty of cold water here.",
      "Thanda gaay ka dudh lao.",
      "Yahan shuddh gaay ka dudh milta hai.",
      "Kripaya aaj ka avkash dene ki kripa karen.",
    ],
    optionsHi: [
      "गर्म गाय का दूध लाओ।",
      "यहाँ शुद्ध गाय का दूध मिलता है।",
      "यहाँ गाय का शुद्ध दूध मिलता है।",
      "कृपया मुझे आज का अवकाश देने की कृपा करें।",
    ],
    correctAnswer: "C",
    explanationEn:
      "Option C correctly places 'shuddh' modifying 'dudh' as 'Gaay ka shuddh dudh' (Pure milk of cow) rather than modifying the cow itself.",
    explanationHi:
      "'गाय का शुद्ध दूध' सही पदक्रम है। पहले विकल्प में 'गर्म गाय' प्रतीत होता है जो कि अशुद्ध है। चौथे में 'कृपया' और 'कृपा' दोनों एक साथ प्रयुक्त होने से द्विरुक्ति दोष है। अतः सही उत्तर 'यहाँ गाय का शुद्ध दूध मिलता है।' होगा।",
    subject: "Hindi",
    topic: "Sentence Correction",
    examTags: ["Hindi", "Vakya Shuddhi", "RO/ARO Mains"],
    year: "UP RO/ARO 2022",
    likes: 356,
    dislikes: 5,
  },
  {
    id: "h-spel-1",
    questionEn: "Which of the following is written with the correct spelling?",
    questionHi: "निम्नलिखित में से शुद्ध वर्तनी वाले शब्द का चयन कीजिए:",
    optionsEn: ["Ujjwal (उज्वल)", "Ujjwal (उज्ज्वल)", "Ujwal", "Ujjaval"],
    optionsHi: ["उज्वल", "उज्ज्वल", "उजवल", "उज्ववल"],
    correctAnswer: "B",
    explanationEn:
      "In Ut + Jwal = Ujjwal, double half 'ja' (ज्ज्) is used grammatically. 'उज्ज्वल' is the correct spelling.",
    explanationHi:
      "'उत्' + 'ज्वल' मिलकर व्यंजन संधि के नियम से 'उज्ज्वल' बनते हैं, जिसमें दोनों 'ज' अर्ध (आधे) होते हैं। अतः विकल्प 'उज्ज्वल' बिल्कुल शुद्ध है।",
    subject: "Hindi",
    topic: "Spelling Correction",
    examTags: ["Hindi", "Vartani", "State Police", "Patwari"],
    year: "Patwari Exam 2023",
    likes: 512,
    dislikes: 3,
  },
  {
    id: "h-syn-1",
    questionEn: "Which is a synonym of 'Kamal' (Lotus)?",
    questionHi: "निम्नलिखित में से कौन सा शब्द 'कमल' का पर्यायवाची है?",
    optionsEn: [
      "Jalad (Cloud)",
      "Jalaj (Born in water - Lotus)",
      "Jaladhi (Ocean)",
      "Dinar",
    ],
    optionsHi: ["जलद", "जलज", "जलधि", "दीनार"],
    correctAnswer: "B",
    explanationEn:
      "'Jalaj' means 'water born', which refers to Lotus. 'Jalad' means clock/clouds, while 'Jaladhi' refers to Ocean.",
    explanationHi:
      "'जलज' का अर्थ जल में जन्म लेने वाला अर्थात् 'कमल' है। जबकि 'जलद' (जल देने वाला) बादल का और 'जलधि' (जल को धारण करने वाला) समुद्र का पर्यायवाची है।",
    subject: "Hindi",
    topic: "Synonyms",
    examTags: ["Hindi", "Paryayvachi", "UP Sub Inspector"],
    year: "UP SI 2022",
    likes: 490,
    dislikes: 4,
  },
  {
    id: "h-ant-1",
    questionEn: "Find the antonym of the word 'Anurag' (अनुराग).",
    questionHi: "'अनुराग' शब्द का सही विलोम शब्द क्या होगा?",
    optionsEn: ["Virag (विराग)", "Prem (Love)", "Nafrat", "Rag"],
    optionsHi: ["विराग", "प्रेम", "नफ़रत", "राग"],
    correctAnswer: "A",
    explanationEn:
      "The antonym of 'Anurag' (attachment/love) is 'Virag' (detachment/apathy).",
    explanationHi:
      "'अनुराग' का अर्थ प्रेम या लगाव होता है, जिसका विपरीतार्थी/विलोम शब्द 'विराग' (उदासीनता या कोई लगाव न होना) है।",
    subject: "Hindi",
    topic: "Antonyms",
    examTags: ["Hindi", "Vilom", "Railway", "SSC GD"],
    year: "SSC GD 2022",
    likes: 215,
    dislikes: 1,
  },
  {
    id: "h-hom-1",
    questionEn: "Which option explains the meaning of word pair 'Alip - Alep'?",
    questionHi:
      "'अलि - अली' शब्द-युग्म का सही अर्थ-भेद निम्नलिखित में से कौन सा है?",
    optionsEn: [
      "Lotus - Friend",
      "Bumblebee - Friend (भौंरा - सखी)",
      "Friend - Bumblebee",
      "Ruler - Pen",
    ],
    optionsHi: ["कमल - सखी", "भौंरा - सखी", "सखी - भौंरा", "कलम - शासक"],
    correctAnswer: "B",
    explanationEn:
      "In Hindi homonyms, short vowel 'Ali' (अलि) means bumblebee, whereas long vowel 'Alee' (अली) means female friend/sakh.",
    explanationHi:
      "श्रुतिसमभिन्नार्थक शब्दों में छोटी 'इ' वाली 'अलि' का अर्थ 'भौंरा' होता है, तथा बड़ी 'ई' वाली 'अली' का अर्थ 'सखी' या सहेली होता है।",
    subject: "Hindi",
    topic: "Homonyms",
    examTags: ["Hindi", "Anekarthi", "UPPCS"],
    year: "UPPCS CSAT 2021",
    likes: 310,
    dislikes: 2,
  },
  {
    id: "h-oneword-1",
    questionEn:
      "What is the single word for 'One who knows everything' (जो सब कुछ जानता हो)?",
    questionHi: "'जो सब कुछ जानता हो' वाक्यांश के लिए एक शब्द क्या होगा?",
    optionsEn: [
      "Alpaj (Knows little)",
      "Sarvaj (Omniscient)",
      "Bahuaj",
      "Katraj",
    ],
    optionsHi: ["अल्पज्ञ", "सर्वज्ञ", "बहुज्ञ", "विद्वान"],
    correctAnswer: "B",
    explanationEn:
      "'Sarvaj' means knowing everything (omnia/sarva + jna/knowing). 'Alpaj' relates to knowing very little.",
    explanationHi:
      "'सर्व' (सब कुछ) + 'ज्ञ' (जानने वाला) = 'सर्वज्ञ' अर्थात् जो सब कुछ जानता हो। कम जानने वाले को 'अल्पज्ञ' कहते हैं।",
    subject: "Hindi",
    topic: "One Word Substitution",
    examTags: ["Hindi", "One Word", "RO/ARO"],
    year: "UP RO/ARO 2021",
    likes: 412,
    dislikes: 1,
  },
  {
    id: "h-tatsam-1",
    questionEn: "Which of the following is the Tatsam word for 'Ag' (आग)?",
    questionHi: "निम्नलिखित में से 'आग' शब्द का तत्सम रूप क्या है?",
    optionsEn: ["Agnih", "Agni (अग्नि)", "Agan", "Anal"],
    optionsHi: ["अग्निः", "अग्नि", "अगन", "अनल"],
    correctAnswer: "B",
    explanationEn:
      "'Agni' is the original Sanskrit/Tatsam word from which the Prakrit modified Tadbhav word 'Ag' evolved.",
    explanationHi:
      "संस्कृत के शुद्ध मूल शब्द जो हिंदी में हुबहू प्रयुक्त होते हैं वे तत्सम कहलाते हैं। 'आग' का तत्सम रूप 'अग्नि' है। 'अनल' अग्नि का केवल एक अन्य पर्यायवाची है, मूल तत्सम नहीं।",
    subject: "Hindi",
    topic: "Tatsam Tadbhav",
    examTags: ["Hindi", "Tatsam", "UP VDO Exam"],
    year: "UPSSSC VDO 2023",
    likes: 319,
    dislikes: 3,
  },
  {
    id: "h-deshaj-1",
    questionEn:
      "Which of the following is a Deshaj (indigenous local dialect) word?",
    questionHi: "निम्नलिखित में से कौन सा शब्द देशज श्रेणी का है?",
    optionsEn: ["Agni", "Khichdi (खिचड़ी)", "School (Foreign)", "Katora"],
    optionsHi: ["अग्नि", "खिचड़ी", "स्कूल", "कैंची"],
    correctAnswer: "B",
    explanationEn:
      "'Khichdi' is a Deshaj word locally coined without traces from root Sanskrit or foreign borrowings. 'School' is foreign, 'Agni' is Tatsam.",
    explanationHi:
      "वे शब्द जिनकी उत्पत्ति देश के विभिन्न स्थानीय बोलियों से आम बोलचाल के प्रभाव में हुई है और उनके संस्कृत स्रोत नहीं मिलते, उन्हें देशज कहते हैं। 'खिचड़ी' और 'लोटा' देशज शब्द के मुख्य उदाहरण हैं।",
    subject: "Hindi",
    topic: "Deshaj Videshaj",
    examTags: ["Hindi", "Deshaj Videshaj", "UP Police", "Patwari"],
    year: "UP Police 2022",
    likes: 298,
    dislikes: 4,
  },
  {
    id: "e-syn-1",
    questionEn:
      "Select the word which is most similar in meaning to the given word: 'DILIGENT'",
    questionHi:
      "दिए गए शब्द 'DILIGENT' के अर्थ में सबसे समान शब्द का चयन करें:",
    optionsEn: ["Lazy", "Hardworking", "Careless", "Proud"],
    optionsHi: [
      "Lazy (आलसी)",
      "Hardworking (परिश्रमी)",
      "Careless (लापरवाह)",
      "Proud (घमंडी)",
    ],
    correctAnswer: "B",
    explanationEn:
      "'Diligent' means having or showing care and conscientiousness in one's work or duties. Hence, 'Hardworking' is the closest synonym.",
    explanationHi:
      "'Diligent' का अर्थ होता है परिसरमी, मेहनती या लगनशील। इसलिए इसका सही समानार्थी शब्द 'Hardworking' (परिश्रमी) होगा।",
    subject: "English",
    topic: "Eng-Synonyms",
    examTags: ["English", "Synonyms", "SSC CGL", "CHSL"],
    year: "SSC CGL 2023",
    likes: 420,
    dislikes: 2,
  },
  {
    id: "e-ant-1",
    questionEn:
      "Select the word which is most opposite in meaning to the given word: 'EPHEMERAL'",
    questionHi:
      "दिए गए शब्द 'EPHEMERAL' के अर्थ में सबसे विपरीतार्थक शब्द का चयन करें:",
    optionsEn: ["Transient", "Permanent", "Volatile", "Short-lived"],
    optionsHi: [
      "Transient (क्षणिक)",
      "Permanent (स्थायी)",
      "Volatile (अस्थिर)",
      "Short-lived",
    ],
    correctAnswer: "B",
    explanationEn:
      "'Ephemeral' means lasting for a very short time. Therefore, the opposite is 'Permanent' (lasting or intended to last or remain unchanged indefinitely).",
    explanationHi:
      "'Ephemeral' का अर्थ क्षणभंगुर या बहुत कम समय तक चलने वाला होता है। इसका विलोम 'Permanent' (स्थायी या चिरस्थायी) होगा।",
    subject: "English",
    topic: "Eng-Antonyms",
    examTags: ["English", "Antonyms", "CGL", "NDA"],
    year: "SSC CHSL 2022",
    likes: 285,
    dislikes: 1,
  },
  {
    id: "e-blanks-1",
    questionEn:
      "Fill in the blank with the most appropriate preposition: 'She has been suffering from fever ______ Monday.'",
    questionHi:
      "सबसे उपयुक्त प्रीपोज़िशन के साथ रिक्त स्थान भरें: 'She has been suffering from fever ______ Monday.'",
    optionsEn: ["for", "since", "from", "by"],
    optionsHi: ["for", "since", "from", "by"],
    correctAnswer: "B",
    explanationEn:
      "'Since' is used to indicate a precise point in time (Monday) in perfect continuous tenses, whereas 'for' is used for duration.",
    explanationHi:
      "निश्चित समय बिंदु (Point of Time जैसे Monday) के लिए परफेक्ट कंटीन्यूअस टेंस में 'since' का प्रयोग किया जाता है, जबकि समयावधि (Period of Time) के लिए 'for' का प्रयोग होता है।",
    subject: "English",
    topic: "Eng-Blanks",
    examTags: ["English", "Fill in the Blanks", "MTS", "Stenographer"],
    year: "SSC MTS 2023",
    likes: 310,
    dislikes: 3,
  },
  {
    id: "e-error-1",
    questionEn:
      "Identify the segment in the sentence which contains a grammatical error: 'Neither Ram nor his friends is attending the conference.'",
    questionHi:
      "दिए गए वाक्य में व्याकरणिक त्रुटि वाले भाग की पहचान करें: 'Neither Ram nor his friends is attending the conference.'",
    optionsEn: [
      "Neither Ram",
      "nor his friends",
      "is attending",
      "the conference",
    ],
    optionsHi: [
      "Neither Ram",
      "nor his friends",
      "is attending (त्रुटि यहाँ है)",
      "the conference",
    ],
    correctAnswer: "C",
    explanationEn:
      "According to subject-verb agreement rules, when subjects are joined by 'neither... nor', the verb agrees with the subject closest to it. Here 'friends' is plural, so 'is' must be replaced by 'are'.",
    explanationHi:
      "नियम के अनुसार, जब दो वाक्य-विषय 'neither... nor' से जुड़ते हैं, तब सहायक क्रिया (Verb) अपने सबसे पास वाले कर्ता ('friends' जो कि बहुवचन है) के अनुसार बदलती है। इसलिए 'is' के स्थान पर 'are' होना चाहिए।",
    subject: "English",
    topic: "Eng-Error",
    examTags: ["English", "Error Detection", "CGL", "IBPS PO"],
    year: "SSC CGL 2023",
    likes: 485,
    dislikes: 5,
  },
  {
    id: "e-spell-1",
    questionEn:
      "Select the option that represents the correct spelling of the given word:",
    questionHi:
      "दिए गए शब्द की सही वर्तनी (Correct Spelling) दर्शाने वाले विकल्प का चयन करें:",
    optionsEn: ["Accomodate", "Accommodate", "Acomodate", "Accomodatte"],
    optionsHi: [
      "Accomodate",
      "Accommodate (शुद्ध शब्द)",
      "Acomodate",
      "Accomodatte",
    ],
    correctAnswer: "B",
    explanationEn:
      "The correct spelling is 'Accommodate' which has a double 'c' and a double 'm'.",
    explanationHi:
      "सही वर्तनी 'Accommodate' है, जिसका अर्थ अनुकूल बनाना या समायोजित करना होता है। इसमें डबल 'c' और डबल 'm' का प्रयोग होता है।",
    subject: "English",
    topic: "Eng-Spelling",
    examTags: ["English", "Spelling", "Steno", "MTS"],
    year: "SSC MTS 2022",
    likes: 395,
    dislikes: 2,
  },
  {
    id: "e-idiom-1",
    questionEn: "What is the meaning of the idiom: 'Bite the bullet'?",
    questionHi: "दिए गए मुहावरे 'Bite the bullet' का सही अर्थ क्या है?",
    optionsEn: [
      "To be severely defeated",
      "To face a difficult situation with courage",
      "To speak absolute lies",
      "To waste valuable time",
    ],
    optionsHi: [
      "बुरी तरह पराजित होना",
      "कठिन परिस्थिति का साहस से सामना करना",
      "कोरा झूठ बोलना",
      "कीमती समय बर्बाद करना",
    ],
    correctAnswer: "B",
    explanationEn:
      "'Bite the bullet' means to face a painful or difficult situation that is unavoidable with courage and fortitude.",
    explanationHi:
      "'Bite the bullet' का अर्थ किसी अपरिहार्य कठिन या दर्दनाक परिस्थिति को साहस और दृढ़ता के साथ स्वीकारना या झेलना होता है।",
    subject: "English",
    topic: "Eng-Idioms",
    examTags: ["English", "Idioms Phrases", "CGL", "NDA"],
    year: "SSC CGL 2021",
    likes: 520,
    dislikes: 1,
  },
  {
    id: "e-oneword-1",
    questionEn:
      "Select the option that can be used as a one-word substitute for: 'A person who is cent percent self-centered and thinks only of himself'",
    questionHi:
      "दिए गए वाक्यांश के लिए एक शब्द (One Word Substitute) चुनें: 'A person who is cent percent self-centered and thinks only of himself'",
    optionsEn: ["Altruist", "Egoist", "Optimist", "Philanthropist"],
    optionsHi: [
      "Altruist (परोपकारी)",
      "Egoist (अहंवादी)",
      "Optimist (आशावादी)",
      "Philanthropist (लोकोपकारी)",
    ],
    correctAnswer: "B",
    explanationEn:
      "An 'Egoist' is a self-centered, self-interested person. 'Altruist' is the opposite, representing someone who thinks of others.",
    explanationHi:
      "एक व्यक्ति जो केवल स्वयं के हित और स्वार्थ के बारे में सोचता है, उसे 'Egoist' (अहंवादी या स्वार्थी) कहा जाता है।",
    subject: "English",
    topic: "Eng-OneWord",
    examTags: ["English", "One Word Substitution", "CGL", "CHSL"],
    year: "SSC CHSL 2023",
    likes: 290,
    dislikes: 3,
  },
  {
    id: "e-comp-1",
    questionEn:
      "Read the passage snippet and answer: 'Forests are crucial for environmental balance. They hold soil, provide oxygen, and act as absolute carbon sinks. Unchecked deforestation is causing major global warming.' What is the primary focus?",
    questionHi:
      "दिए गए गद्यांश अंश को पढ़ें और उत्तर दें: 'Forests are crucial for environmental balance. They hold soil, provide oxygen, and act as absolute carbon sinks. Unchecked deforestation is causing major global warming.' मुख्य केंद्र क्या है?",
    optionsEn: [
      "The fast industrialization of world cities",
      "The critical importance of forests and threats of deforestation",
      "The deep beauty of forest wildlife sanctuaries",
      "Commercial advantages of wooden timber trade",
    ],
    optionsHi: [
      "शहरी औद्योगिकीकरण का तीव्र विकास",
      "वनों का महत्वपूर्ण स्थान एवं वनों की कटाई का संकट",
      "वन्यजीव अभयारण्यों की गहन सुंदरता",
      "लकड़ी के व्यापार के व्यावसायिक लाभ",
    ],
    correctAnswer: "B",
    explanationEn:
      "The passage snippet directly highlights the ecological values of forests (soil retention, oxygen, carbon sink) and warns about the severe impact of deforestation on global heating.",
    explanationHi:
      "यह संक्षिप्त गद्यांश मुख्य रूप से पर्यावरण संतुलन में वनों के महत्व तथा वनों के अंधाधुंध कटान (Deforestation) से उत्पन्न ग्लोबल वार्मिंग के खतरे को उजागर करता है।",
    subject: "English",
    topic: "Eng-Comprehension",
    examTags: ["English", "Reading Comprehension", "CGL", "Banking"],
    year: "IBPS Clerk 2022",
    likes: 198,
    dislikes: 4,
  },
];

export const POPULAR_MOCK_TESTS: MockTest[] = [
  {
    id: "mock-1",
    titleEn: "SSC CGL Full Syllabus Premium Test - 1",
    titleHi: "एसएससी सीजीएल पूर्ण पाठ्यक्रम प्रीमियम टेस्ट - 1",
    subject: "All Subjects",
    exam: "SSC",
    duration: 60,
    totalQuestions: 100,
    totalMarks: 200,
    isPreviousYear: false,
    questions: [
      MOCK_QUESTIONS[0],
      MOCK_QUESTIONS[1],
      MOCK_QUESTIONS[3],
      MOCK_QUESTIONS[5],
      MOCK_QUESTIONS[6],
      MOCK_QUESTIONS[7],
    ],
  },
  {
    id: "mock-2",
    titleEn: "RRB NTPC Previous Year General Awareness (2021 Shift 1)",
    titleHi: "आरआरबी एनटीपीसी पिछले वर्ष का सामान्य ज्ञान (2021 शिफ्ट 1)",
    subject: "General Studies",
    exam: "Railway",
    duration: 45,
    totalQuestions: 40,
    totalMarks: 40,
    isPreviousYear: true,
    year: "2021",
    questions: [
      MOCK_QUESTIONS[0],
      MOCK_QUESTIONS[2],
      MOCK_QUESTIONS[3],
      MOCK_QUESTIONS[4],
    ],
  },
  {
    id: "mock-3",
    titleEn: "UPSC Civil Services Prelims Mock Test - Polity & History",
    titleHi: "यूपीएससी सिविल सेवा प्रारंभिक मॉक टेस्ट - राजव्यवस्था एवं इतिहास",
    subject: "Humanities",
    exam: "UPSC",
    duration: 120,
    totalQuestions: 100,
    totalMarks: 200,
    isPreviousYear: false,
    questions: [MOCK_QUESTIONS[0], MOCK_QUESTIONS[1], MOCK_QUESTIONS[2]],
  },
  {
    id: "mock-4",
    titleEn: "Bihar Police SI Practice Set - Fast Track",
    titleHi: "बिहार पुलिस दरोगा भर्ती प्रैक्टिस सेट - फ़ास्ट ट्रैक",
    subject: "General Studies",
    exam: "Bihar Exams",
    duration: 90,
    totalQuestions: 100,
    totalMarks: 200,
    isPreviousYear: false,
    questions: [
      MOCK_QUESTIONS[0],
      MOCK_QUESTIONS[1],
      MOCK_QUESTIONS[3],
      MOCK_QUESTIONS[4],
      MOCK_QUESTIONS[7],
    ],
  },
];

export const MOCK_LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    name: "Aman Preet Singh",
    avatar: "👨‍🎓",
    xp: 14520,
    examsCleared: "SSC CGL, IBPS PO",
    streak: 45,
  },
  {
    rank: 2,
    name: "Priya Sharma",
    avatar: "👩‍🎓",
    xp: 13900,
    examsCleared: "UPSC Pre, MPPSC",
    streak: 124,
  },
  {
    rank: 3,
    name: "Rajesh Kumar Yadav",
    avatar: "👨‍💻",
    xp: 12100,
    examsCleared: "RRB NTPC, Bihar Police",
    streak: 30,
  },
  {
    rank: 4,
    name: "Deepika Kumari",
    avatar: "👩‍🌾",
    xp: 11050,
    examsCleared: "CTET, STET",
    streak: 18,
  },
  {
    rank: 5,
    name: "Vikram Rathore",
    avatar: "👨‍✈️",
    xp: 10400,
    examsCleared: "CDS, Delhi Police",
    streak: 56,
  },
  {
    rank: 6,
    name: "Abhishek Mishra",
    avatar: "👨‍⚖️",
    xp: 9800,
    examsCleared: "SSC CHSL",
    streak: 12,
  },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    name: "Sandeep Kumar",
    examCleared: "SSC CGL 2023 (Excise Inspector)",
    quoteEn:
      "StudyFlash's bilingual layout and instant detailed explanations saved me hours on tough reasoning and quantitative topics. The UI is leaps ahead of Testbook!",
    quoteHi:
      "स्टडीफ्लैश की द्विभाषी व्यवस्था और त्वरित विस्तृत व्याख्याओं ने कठिन रीज़निंग और मैथ्स के विषयों में मेरा बहुत समय बचाया। इसका यूआई टेस्टबुक से कहीं अधिक प्रीमियम है!",
    avatarUrl: "👨‍💼",
    rank: "AIR 412",
  },
  {
    name: "Anjali Chaturvedi",
    examCleared: "UP-PCS 2024 (Nayab Tehsildar)",
    quoteEn:
      "The daily streak system and detailed, high-contrast polity flashcards helped me revise critical articles. It's fast, optimized, and incredibly easy to use.",
    quoteHi:
      "दैनिक स्ट्रीक प्रणाली और विस्तृत पॉलिटी फ्लैशकार्ड ने मुझे महत्वपूर्ण अनुच्छेदों को तेजी से दोहराने में मदद की। यह बहुत तेज, मोबाइल-अनुकूल और उपयोग में आसान है।",
    avatarUrl: "👩‍💼",
    rank: "Rank 18",
  },
  {
    name: "Rishi Raj Maurya",
    examCleared: "RRB NTPC (Station Master)",
    quoteEn:
      "Practicing previous year papers in Hindi interface on my phone with zero lag is priceless. The weak topic warnings accurately pointed out exactly where I was losing marks.",
    quoteHi:
      "बिना किसी लैग के अपने मोबाइल पर हिंदी में पिछले वर्ष के पेपर का अभ्यास करना बेजोड़ है। वीक टॉपिक वार्निंग ने बिल्कुल सटीक बताया कि मैं कहाँ अंक खो रहा था।",
    avatarUrl: "👨‍🔧",
    rank: "Secured Post",
  },
];

export const MOCK_FAQS: FAQItem[] = [
  {
    questionEn: "Is StudyFlash free to use?",
    questionHi: "क्या स्टडीफ्लैश का उपयोग करना बिल्कुल मुफ्त है?",
    answerEn:
      "Yes, our daily quizzes, previous year questions, dynamic Leaderboard, and standard explanation features are 100% free. We also offer premium mock tests and PDF subscriptions.",
    answerHi:
      "हाँ, हमारी दैनिक क्विज़, पिछले वर्ष के प्रश्न, गतिशील लीडरबोर्ड और बुनियादी व्याख्या सुविधाएँ बिल्कुल निःशुल्क हैं। हम प्रीमियम मॉक टेस्ट और विस्तृत PDF नोट्स का सब्सक्रिप्शन भी प्रदान करते हैं।",
  },
  {
    questionEn: "How does the Explanation feature work?",
    questionHi: "एक्सप्लेनेशन फीचर कैसे काम करता है?",
    answerEn:
      "Using advanced algorithms, the system generates custom analytical explanations to better summarize the question.",
    answerHi:
      "जब आप 'एक्सप्लेनेशन' पर क्लिक करते हैं, तो सिस्टम उन्नत एल्गोरिदम के माध्यम से प्रश्न का विस्तृत विश्लेषण प्रदान करता है।",
  },
  {
    questionEn: "Are both Hindi and English languages supported?",
    questionHi: "क्या हिंदी और अंग्रेजी दोनों भाषाएँ समर्थित हैं?",
    answerEn:
      "Absolutely! StudyFlash is built with Indian aspirants in mind. You can toggle between Hindi and English languages seamlessly at any moment with a single click.",
    answerHi:
      "बिल्कुल! स्टडीफ्लैश विशेष रूप से भारतीय छात्रों को ध्यान में रखकर बनाया गया है। आप किसी भी समय एक क्लिक द्वारा हिंदी और अंग्रेजी भाषाओं के बीच तुरंत बदलाव कर सकते हैं।",
  },
  {
    questionEn: "Can I use StudyFlash offline?",
    questionHi: "क्या मैं स्टडीफ्लैश का ऑफलाइन उपयोग कर सकता हूँ?",
    answerEn:
      "Yes! StudyFlash caches your customized quizzes, bookmarked questions, and study statistics locally, allowing you to revise and practice with zero internet requirements once loaded.",
    answerHi:
      "हाँ! स्टडीफ्लैश आपके कस्टमाइज़्ड क्विज़, बुकमार्क किए गए प्रश्नों और अध्ययन के आँकड़ों को स्थानीय रूप से सुरक्षित रखता है, जिससे आप बिना इंटरनेट के भी अभ्यास जारी रख सकते हैं।",
  },
];

export const INITIAL_USER_STATS: UserStats = {
  name: "Rajiv Ranjan",
  email: "pvtmida@gmail.com",
  avatarUrl: "👤",
  rank: 247,
  xp: 4150,
  level: 9,
  streak: 8,
  attempted: 135,
  accuracy: 82,
  weeklyRank: 198,
  bookmarks: ["q-1", "q-3"],
  notes: {
    "q-1":
      "Chanakya's other names are Vishnugupta and Kautilya. Wrote Arthashastra.",
    "q-3": "Zoji La links Srinagar and Leh. Nathu La is in Sikkim.",
  },
  history: [
    {
      testId: "mock-2",
      testTitle: "RRB NTPC Previous Year General Awareness (2021 Shift 1)",
      date: "2026-06-15",
      score: 35,
      totalMarks: 40,
      accuracy: 87.5,
      timeSpent: "22m 14s",
    },
    {
      testId: "mock-4",
      testTitle: "Bihar Police SI Practice Set - Fast Track",
      date: "2026-06-14",
      score: 80,
      totalMarks: 200,
      accuracy: 72.0,
      timeSpent: "48m 10s",
    },
  ],
  earnedBadges: [
    {
      id: "badge-1",
      name: "Early Bird",
      description: "Solved first quiz at 6 AM",
      unlockedAt: "2026-06-10",
      iconName: "Sun",
    },
    {
      id: "badge-2",
      name: "Polity Master",
      description: "Answered 10 Polity questions correctly with 90%+ accuracy",
      unlockedAt: "2026-06-12",
      iconName: "ShieldAlert",
    },
    {
      id: "badge-3",
      name: "8-Day Streak",
      description: "Practiced consecutively for 8 days",
      unlockedAt: "2026-06-16",
      iconName: "Flame",
    },
  ],
};

export const EXAM_CATEGORIES = [
  {
    id: "ssc",
    nameEn: "SSC (CGL, CHSL, GD, MTS)",
    nameHi: "एसएससी (CGL, CHSL, GD, MTS)",
    countEn: "12,450+ Qs",
    countHi: "१२,४५०+ प्रश्न",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "railway",
    nameEn: "Railway (NTPC, Group D, ALP)",
    nameHi: "रेलवे (NTPC, Group D, ALP)",
    countEn: "8,920+ Qs",
    countHi: "८,९२०+ प्रश्न",
    color: "from-sky-500 to-blue-600",
  },
  {
    id: "upsc",
    nameEn: "UPSC (IAS civil services)",
    nameHi: "संघ लोक सेवा आयोग (IAS)",
    countEn: "4,600+ Qs",
    countHi: "४,६००+ प्रश्न",
    color: "from-amber-600 to-yellow-700",
  },
  {
    id: "banking",
    nameEn: "Banking (IBPS, SBI PO)",
    nameHi: "बैंकिंग (IBPS, SBI PO)",
    countEn: "9,150+ Qs",
    countHi: "९,१५०+ प्रश्न",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "bihar",
    nameEn: "Bihar Exams (BPSC, SI, Police)",
    nameHi: "बिहार परीक्षाएं (BPSC, दरोगा)",
    countEn: "7,800+ Qs",
    countHi: "७,८००+ प्रश्न",
    color: "from-orange-500 to-red-600",
  },
  {
    id: "police",
    nameEn: "Police Exams (Delhi, State GD)",
    nameHi: "पुलिस आरक्षी एवं एसआई भर्ती",
    countEn: "6,400+ Qs",
    countHi: "६,४००+ प्रश्न",
    color: "from-indigo-600 to-emerald-700",
  },
  {
    id: "defence",
    nameEn: "Defence (NDA, Airforce, Navy)",
    nameHi: "रक्षा सेवाएं (NDA, वायुसेना)",
    countEn: "5,300+ Qs",
    countHi: "५,३००+ प्रश्न",
    color: "from-red-600 to-rose-700",
  },
  {
    id: "teaching",
    nameEn: "Teaching (CTET, State TET)",
    nameHi: "शिक्षक पात्रता परीक्षा (CTET)",
    countEn: "10,200+ Qs",
    countHi: "१०,२००+ प्रश्न",
    color: "from-teal-500 to-emerald-600",
  },
  {
    id: "pcs",
    nameEn: "State PCS (UPPSC, MPPSC, HPSC)",
    nameHi: "राज्य पीसीएस (UPPSC, MPPSC)",
    countEn: "7,100+ Qs",
    countHi: "७,१००+ प्रश्न",
    color: "from-fuchsia-600 to-pink-700",
  },
  {
    id: "ca",
    nameEn: "Daily Current Affairs (बीमा, जीके)",
    nameHi: "दैनिक समसामयिकी (करंट अफेयर्स)",
    countEn: "15,000+ Qs",
    countHi: "१५,०००+ प्रश्न",
    color: "from-cyan-500 to-sky-600",
  },
];

export const POPULAR_SUBJECTS = [
  {
    id: "history",
    nameEn: "History",
    nameHi: "इतिहास",
    icon: "BookOpen",
    count: "3,240 Qs",
  },
  {
    id: "geography",
    nameEn: "Geography",
    nameHi: "भूगोल",
    icon: "Compass",
    count: "2,840 Qs",
  },
  {
    id: "polity",
    nameEn: "Polity",
    nameHi: "राजव्यवस्था",
    icon: "Scale",
    count: "1,980 Qs",
  },
  {
    id: "economics",
    nameEn: "Economics",
    nameHi: "अर्थशास्त्र",
    icon: "TrendingUp",
    count: "1,240 Qs",
  },
  {
    id: "science",
    nameEn: "Science",
    nameHi: "विज्ञान (Physics, Chem, Bio)",
    icon: "Atom",
    count: "4,150 Qs",
  },
  {
    id: "mathematics",
    nameEn: "Mathematics",
    nameHi: "गणित (Quantitative)",
    icon: "Calculator",
    count: "5,600 Qs",
  },
  {
    id: "reasoning",
    nameEn: "Reasoning",
    nameHi: "तार्किक क्षमता (Reasoning)",
    icon: "Brain",
    count: "4,820 Qs",
  },
  {
    id: "computer",
    nameEn: "Computer GK",
    nameHi: "कंप्यूटर ज्ञान",
    icon: "Cpu",
    count: "1,050 Qs",
  },
  {
    id: "hindi",
    nameEn: "Hindi Language",
    nameHi: "हिन्दी व्याकरण",
    icon: "Languages",
    count: "1,600 Qs",
  },
  {
    id: "english",
    nameEn: "English",
    nameHi: "English Grammar",
    icon: "Award",
    count: "2,450 Qs",
  },
];
