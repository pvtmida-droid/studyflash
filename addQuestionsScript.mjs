import fs from 'fs';

const mockDataPath = 'src/mockData.ts';
let content = fs.readFileSync(mockDataPath, 'utf8');

const additionalQuestions = `
  {
    id: "sp-1",
    questionEn: "Which is the headquarters of Uttar Pradesh Police?",
    questionHi: "उत्तर प्रदेश पुलिस का मुख्यालय कहाँ स्थित है?",
    optionsEn: ["Kanpur", "Lucknow", "Prayagraj", "Agra"],
    optionsHi: ["कानपुर", "लखनऊ", "प्रयागराज", "आगरा"],
    correctAnswer: "B",
    explanationEn: "The headquarters of the Uttar Pradesh Police, known as the Signature Building, is located in Lucknow.",
    explanationHi: "उत्तर प्रदेश पुलिस का मुख्यालय, जिसे सिग्नेचर बिल्डिंग के रूप में जाना जाता है, लखनऊ में स्थित है।",
    subject: "Static GK",
    topic: "UP GK",
    examTags: ["up-police", "UP Police Constable", "UPSI"],
    year: "UP Police 2020",
    likes: 120,
    dislikes: 1
  },
  {
    id: "sp-2",
    questionEn: "When was the Bihar Police established?",
    questionHi: "बिहार पुलिस की स्थापना कब हुई थी?",
    optionsEn: ["1862", "1905", "1947", "1950"],
    optionsHi: ["1862", "1905", "1947", "1950"],
    correctAnswer: "A",
    explanationEn: "Bihar Police traces its historical roots back to the Indian Police Act of 1861, becoming operational around 1862.",
    explanationHi: "बिहार पुलिस की ऐतिहासिक जड़ें 1861 के भारतीय पुलिस अधिनियम से जुड़ी हैं, और यह 1862 के आसपास चालू हुई थी।",
    subject: "Static GK",
    topic: "Bihar GK",
    examTags: ["bihar-police", "Bihar Constable", "BPSC"],
    year: "Bihar Police 2021",
    likes: 90,
    dislikes: 0
  },
  {
    id: "sp-3",
    questionEn: "What is the motto of Rajasthan Police?",
    questionHi: "राजस्थान पुलिस का आदर्श वाक्य (Motto) क्या है?",
    optionsEn: ["Seva, Suraksha, Shanti", "Satyameva Jayate", "Sevarth Katibaddhta", "Shorya Dridhata Karmnishtha"],
    optionsHi: ["सेवा, सुरक्षा, शांति", "सत्यमेव जयते", "सेवार्थ कटिबद्धता", "शौर्य दृढ़ता कर्मनिष्ठा"],
    correctAnswer: "A",
    explanationEn: "The motto of Rajasthan Police is 'Seva, Suraksha, Shanti' (Service, Security, Peace).",
    explanationHi: "राजस्थान पुलिस का आदर्श वाक्य 'सेवा, सुरक्षा, शांति' है।",
    subject: "Static GK",
    topic: "Rajasthan GK",
    examTags: ["rajasthan-police", "Rajasthan Constable"],
    year: "Rajasthan Police 2022",
    likes: 85,
    dislikes: 2
  },
`;

content = content.replace(
  'export const MOCK_QUESTIONS: Question[] = [',
  'export const MOCK_QUESTIONS: Question[] = [' + additionalQuestions
);

fs.writeFileSync(mockDataPath, content);
console.log('Added State Police Demo Questions');
