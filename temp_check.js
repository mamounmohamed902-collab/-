
/* ============ helpers ============ */
const $ = id => document.getElementById(id);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,7);
const load = (k, def) => JSON.parse(localStorage.getItem(k) || JSON.stringify(def));
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const esc = s => { const d=document.createElement('div'); d.textContent=s||''; return d.innerHTML; };
const fmtSize = b => b < 1024 ? b+' B' : b < 1048576 ? (b/1024).toFixed(1)+' KB' : (b/1048576).toFixed(1)+' MB';
const fileIcon = type => {
  if(type.startsWith('image/')) return '🖼️';
  if(type === 'application/pdf') return '📕';
  if(type.includes('word')) return '📘';
  if(type.includes('presentation')) return '📙';
  if(type.includes('sheet') || type.includes('excel')) return '📗';
  if(type.startsWith('text/')) return '📄';
  return '📎';
};

/* ============ SPECIALIZATIONS & QUOTES DATA ============ */
const SPEC_CATEGORIES = {
  all:     { name: 'الكل 🌐',                              nameEn: 'All 🌐' },
  med:     { name: 'القطاع الطبي 🩺',                     nameEn: 'Medical 🩺' },
  sci:     { name: 'العلوم والأبحاث 🧪',                  nameEn: 'Sciences 🧪' },
  eng:     { name: 'الهندسة والتكنولوجيا 📐',             nameEn: 'Engineering 📐' },
  tech:    { name: 'الحاسبات والذكاء الاصطناعي 💻',      nameEn: 'Computing & AI 💻' },
  bus:     { name: 'الأعمال والاقتصاد 📊',                nameEn: 'Business 📊' },
  law:     { name: 'القانون والسياسة ⚖️',                 nameEn: 'Law & Politics ⚖️' },
  hum:     { name: 'الآداب واللغات والإعلام 📚',          nameEn: 'Arts & Media 📚' },
  applied: { name: 'الزراعة والبيطري والفنون 🎨',         nameEn: 'Agriculture & Arts 🎨' }
};

const SPECIALIZATIONS = {
  "medicine": {
    "category": "med",
    "name": "الطب البشري العام",
    "nameEn": "General Medicine",
    "icon": "🩺",
    "color": "#E1839B",
    "quotes": [
      {
        "q": "أينما كان حب الإنسانية، كان حب الطب أيضاً.",
        "by": "أبقراط — أبو الطب"
      },
      {
        "q": "الطبيب الجيد يعالج المرض، أما الطبيب العظيم فيعالج المريض.",
        "by": "ويليام أوسلر"
      },
      {
        "q": "أول الطب التشخيص، والتشخيص نصف العلاج.",
        "by": "ابن سينا"
      },
      {
        "q": "أعظم هدية يمنحها الطبيب لمريضه هي بعث الأمل في قلبه.",
        "by": "د. مجدي يعقوب"
      }
    ],
    "quotesEn": [
      {
        "q": "Wherever the art of medicine is loved, there is also a love of humanity.",
        "by": "Hippocrates — Father of Medicine"
      },
      {
        "q": "The good physician treats the disease; the great physician treats the patient.",
        "by": "William Osler"
      },
      {
        "q": "Diagnosis is the first half of healing.",
        "by": "Avicenna (Ibn Sina)"
      },
      {
        "q": "The greatest gift a physician can give is hope.",
        "by": "Sir Magdi Yacoub"
      }
    ]
  },
  "cardiology": {
    "category": "med",
    "name": "طب وجراحة القلب",
    "nameEn": "Cardiology & Heart Surgery",
    "icon": "❤️",
    "color": "#E1706E",
    "quotes": [
      {
        "q": "قلب الإنسان أعظم مضخة صُنعت في الكون؛ وإصلاحه إعادة للحياة بإذن الله.",
        "by": "د. مجدي يعقوب"
      },
      {
        "q": "القلب الشجاع واليد الثابتة هما سلاح جراح القلب.",
        "by": "كريستيان برنارد"
      }
    ],
    "quotesEn": [
      {
        "q": "The human heart is a masterpiece pump; repairing it restores life and hope.",
        "by": "Sir Magdi Yacoub"
      },
      {
        "q": "A brave heart and a steady hand are the surgeon's greatest tools.",
        "by": "Christiaan Barnard"
      }
    ]
  },
  "surgery": {
    "category": "med",
    "name": "الجراحة العامة",
    "nameEn": "General Surgery",
    "icon": "🔪",
    "color": "#D97566",
    "quotes": [
      {
        "q": "الجراحة فن قائم على العلم؛ عين الصقر، قلب الأسد، ويد السيدة.",
        "by": "أبو القاسم الزهراوي"
      },
      {
        "q": "الجراح الماهر يعرف متى يجري الجراحة، والأمهر يعرف متى يمتنع عنها.",
        "by": "ويليام هالستيد"
      }
    ],
    "quotesEn": [
      {
        "q": "Surgery is the art of medicine: the eye of an eagle, the heart of a lion, and the hand of a lady.",
        "by": "Al-Zahrawi (Albucasis)"
      },
      {
        "q": "A good surgeon knows how to operate, a better surgeon when, and the best when not to.",
        "by": "William Halsted"
      }
    ]
  },
  "neurosurgery": {
    "category": "med",
    "name": "المخ والأعصاب",
    "nameEn": "Neurology & Neurosurgery",
    "icon": "🧠",
    "color": "#B075C8",
    "quotes": [
      {
        "q": "الدماغ البشري هو أعقد نظام معرفي في الكون المعروف.",
        "by": "بين كارسون"
      },
      {
        "q": "كل ميليمتر في الدماغ يحمل سر ذاكرة أو حركة أو إحساس.",
        "by": "هارفي كوشينغ"
      }
    ],
    "quotesEn": [
      {
        "q": "The human brain is the most intricate and wondrous organ in the known universe.",
        "by": "Ben Carson"
      },
      {
        "q": "Every millimeter in the brain holds the key to memory, motion, or emotion.",
        "by": "Harvey Cushing"
      }
    ]
  },
  "pediatrics": {
    "category": "med",
    "name": "طب الأطفال",
    "nameEn": "Pediatrics",
    "icon": "👶",
    "color": "#FFAAA6",
    "quotes": [
      {
        "q": "الأطفال هم رسائلنا الحية لمستقبل لن نراه.",
        "by": "نيل بوستمان"
      },
      {
        "q": "علاج طفل مريض ورسم الابتسامة على وجهه هو أطهر أشكال الإنسانية.",
        "by": "روبرت بيبولز"
      }
    ],
    "quotesEn": [
      {
        "q": "Children are living messages we send to a time we will not see.",
        "by": "Neil Postman"
      },
      {
        "q": "Healing a sick child and bringing back their smile is the purest form of humanity.",
        "by": "Robert Peoples"
      }
    ]
  },
  "orthopedics": {
    "category": "med",
    "name": "جراحة العظام",
    "nameEn": "Orthopedic Surgery",
    "icon": "🦴",
    "color": "#C29B7F",
    "quotes": [
      {
        "q": "إعادة الحركة لإنسان مقعد هي إعادة لحريته وكرامته.",
        "by": "روبرت جونز"
      },
      {
        "q": "العظام دعائم الجسد؛ وإصلاحها يعيد توازن الحياة.",
        "by": "حكمة جراحية"
      }
    ],
    "quotesEn": [
      {
        "q": "Restoring movement to a patient is restoring their freedom and dignity.",
        "by": "Sir Robert Jones"
      },
      {
        "q": "Bones are the pillars of the body; repairing them restores balance to life.",
        "by": "Surgical Wisdom"
      }
    ]
  },
  "ophthalmology": {
    "category": "med",
    "name": "طب وجراحة العيون",
    "nameEn": "Ophthalmology",
    "icon": "👁️",
    "color": "#74B9FF",
    "quotes": [
      {
        "q": "العين مرآة الروح وبوابة النور إلى العالم.",
        "by": "الحسن بن الهيثم"
      },
      {
        "q": "إعادة الإبصار لإنسان هي إخراجه من الظلمات إلى النور.",
        "by": "ابن النفيس"
      }
    ],
    "quotesEn": [
      {
        "q": "The eye is the lamp of the body and the soul's window to the world.",
        "by": "Alhazen (Ibn al-Haytham)"
      },
      {
        "q": "Restoring vision to a human being is guiding them from darkness into light.",
        "by": "Ibn al-Nafis"
      }
    ]
  },
  "ent": {
    "category": "med",
    "name": "الأنف والأذن والحنجرة",
    "nameEn": "ENT (Otolaryngology)",
    "icon": "👂",
    "color": "#F8B195",
    "quotes": [
      {
        "q": "حواس الإنسان هي الجسور التي تربط روحه بالكون الخارجي.",
        "by": "أرسطو"
      },
      {
        "q": "الصوت والسمع هما جوهر التواصل والتفاهم البشري.",
        "by": "هيلين كيلر"
      }
    ],
    "quotesEn": [
      {
        "q": "The senses are the bridge between the inner human spirit and the outer world.",
        "by": "Aristotle"
      },
      {
        "q": "Blindness separates people from things; deafness separates people from people.",
        "by": "Helen Keller"
      }
    ]
  },
  "dermatology": {
    "category": "med",
    "name": "الجلدية والتجميل",
    "nameEn": "Dermatology",
    "icon": "✨",
    "color": "#FAB1A0",
    "quotes": [
      {
        "q": "الجلد هو الدرع الحامي للجسد والمرآة الأولى لصحته الداخلية.",
        "by": "توماس بيتمان"
      },
      {
        "q": "الجمال الحقيقي يبدأ من صحة وعافية الجسد.",
        "by": "حكمة طبية"
      }
    ],
    "quotesEn": [
      {
        "q": "The skin is the body's protective shield and the ultimate mirror of inner health.",
        "by": "Thomas Bateman"
      },
      {
        "q": "True aesthetic beauty begins with physical health and well-being.",
        "by": "Dermatology Wisdom"
      }
    ]
  },
  "internal_med": {
    "category": "med",
    "name": "الأمراض الباطنية",
    "nameEn": "Internal Medicine",
    "icon": "🫁",
    "color": "#A29BFE",
    "quotes": [
      {
        "q": "الطبيب الباطني هو المحقق الفيلسوف في عالم الطب.",
        "by": "ويليام أوسلر"
      },
      {
        "q": "الأعراض لغة الجسد، والباطني هو المترجم الحكيم لها.",
        "by": "ابن سينا"
      }
    ],
    "quotesEn": [
      {
        "q": "The internist is the philosopher-detective of medical science.",
        "by": "William Osler"
      },
      {
        "q": "Symptoms are the language of the body; the internist is its wise translator.",
        "by": "Avicenna"
      }
    ]
  },
  "dentistry": {
    "category": "med",
    "name": "طب وجراحة الأسنان",
    "nameEn": "Dentistry",
    "icon": "🦷",
    "color": "#8FC1E3",
    "quotes": [
      {
        "q": "الابتسامة هي الباب الذي تفتحه القلوب، وطبيب الأسنان هو حارسها.",
        "by": "بيير فوشار"
      },
      {
        "q": "صحة الفم مرآة لصحة الجسم كله.",
        "by": "سي. في. بلاك"
      }
    ],
    "quotesEn": [
      {
        "q": "A smile is the universal welcome, and the dentist is the guardian of that joy.",
        "by": "Pierre Fauchard"
      },
      {
        "q": "The mouth is the gateway to total health and wellness.",
        "by": "G.V. Black"
      }
    ]
  },
  "pharmacy": {
    "category": "med",
    "name": "الصيدلة الإكلينيكية والدوائية",
    "nameEn": "Pharmacy & Pharmacology",
    "icon": "💊",
    "color": "#FD79A8",
    "quotes": [
      {
        "q": "الدواء سم إذا أخطأ الميزان، وشفاء إذا وافق الحكمة.",
        "by": "ابن البيطار"
      },
      {
        "q": "الصيدلي حارس الأمان بين المرض والشفاء.",
        "by": "ألكسندر فلمنج"
      }
    ],
    "quotesEn": [
      {
        "q": "All substances are poisons; the right dose differentiates a poison from a remedy.",
        "by": "Paracelsus"
      },
      {
        "q": "The pharmacist is the vigilant guardian bridging prescription and healing.",
        "by": "Alexander Fleming"
      }
    ]
  },
  "physical_therapy": {
    "category": "med",
    "name": "العلاج الطبيعي والتأهيل",
    "nameEn": "Physical Therapy & Rehab",
    "icon": "🏃‍♂️",
    "color": "#55EFC4",
    "quotes": [
      {
        "q": "الحركة هي الحياة، والسكون هو الموت البطيء.",
        "by": "بير هنريك لينغ"
      },
      {
        "q": "العلاج الطبيعي يضيف حياة إلى السنوات، لا مجرد سنوات إلى الحياة.",
        "by": "حكمة تأهيلية"
      }
    ],
    "quotesEn": [
      {
        "q": "Movement is life; without motion, the human mechanism deteriorates.",
        "by": "Per Henrik Ling"
      },
      {
        "q": "Physical therapy adds life to years, not just years to life.",
        "by": "Rehabilitation Wisdom"
      }
    ]
  },
  "nursing": {
    "category": "med",
    "name": "التمريض والرعاية الصحية",
    "nameEn": "Nursing & Healthcare",
    "icon": "🩺",
    "color": "#FF7675",
    "quotes": [
      {
        "q": "التمريض فن راقٍ ومسؤولية إنسانية لا تضاهيها مهنة.",
        "by": "فلورنس نايتينجيل"
      },
      {
        "q": "الممرض هو عين الطبيب الساهرة وقلب المستشفى النابض.",
        "by": "فيرجينيا هندرسون"
      }
    ],
    "quotesEn": [
      {
        "q": "Nursing is an art; and if it is to be made an art, it requires devotion.",
        "by": "Florence Nightingale"
      },
      {
        "q": "The nurse is the beating heart of healthcare and the patient's constant advocate.",
        "by": "Virginia Henderson"
      }
    ]
  },
  "chemistry": {
    "category": "sci",
    "name": "الكيمياء والأبحاث",
    "nameEn": "Chemistry",
    "icon": "🧪",
    "color": "#00CEC9",
    "quotes": [
      {
        "q": "الكيمياء هي الموسيقى التي تعزفها الذرات في الكون.",
        "by": "أحمد زويل"
      },
      {
        "q": "لا شيء في الحياة يُخشى منه، بل ينبغي فهمه فقط.",
        "by": "ماري كوري"
      }
    ],
    "quotesEn": [
      {
        "q": "Chemistry is the music played by the atoms of the universe.",
        "by": "Ahmed Zewail"
      },
      {
        "q": "Nothing in life is to be feared, it is only to be understood.",
        "by": "Marie Curie"
      }
    ]
  },
  "physics": {
    "category": "sci",
    "name": "الفيزياء والكونيات",
    "nameEn": "Physics & Astrophysics",
    "icon": "🌌",
    "color": "#6C5CE7",
    "quotes": [
      {
        "q": "الخيال أهم من المعرفة؛ المعرفة محدودة، بينما الخيال يطوف العالم.",
        "by": "ألبرت أينشتاين"
      },
      {
        "q": "الفيزياء هي محاولة فهم كيف يتنفس الكون.",
        "by": "ريتشارد فاينمان"
      }
    ],
    "quotesEn": [
      {
        "q": "Imagination is more important than knowledge. Knowledge is limited, imagination embraces the world.",
        "by": "Albert Einstein"
      },
      {
        "q": "Physics is like sex: sure, it may give some practical results, but that's not why we do it.",
        "by": "Richard Feynman"
      }
    ]
  },
  "biology": {
    "category": "sci",
    "name": "العلوم البيولوجية والوراثة",
    "nameEn": "Biology & Genetics",
    "icon": "🧬",
    "color": "#00B894",
    "quotes": [
      {
        "q": "في كل قطرة ماء وكل خلية حية، يكمن لغز الكون كله.",
        "by": "تشارلز داروين"
      },
      {
        "q": "فهم الشفرة الوراثية هو قراءة كتاب الحياة الحقيقي.",
        "by": "فرانسيس كريك"
      }
    ],
    "quotesEn": [
      {
        "q": "In the distant future, I see open fields for far more important researches.",
        "by": "Charles Darwin"
      },
      {
        "q": "DNA is like a computer program, but far, far more advanced than any software ever created.",
        "by": "Bill Gates"
      }
    ]
  },
  "geology": {
    "category": "sci",
    "name": "الجيولوجيا وعلوم الأرض",
    "nameEn": "Geology & Earth Sciences",
    "icon": "🌋",
    "color": "#D63031",
    "quotes": [
      {
        "q": "الأرض كتاب مفتوح نقرأ في طبقات صخوره تاريخ ملايين السنين.",
        "by": "تشارلز لايل"
      },
      {
        "q": "الحاضر هو المفتاح السحري لفهم أسرار الماضي الجيولوجي.",
        "by": "جيمس هوتون"
      }
    ],
    "quotesEn": [
      {
        "q": "The present is the key to the past.",
        "by": "James Hutton"
      },
      {
        "q": "In rocks and strata lies the dramatic epic of our planet's billions of years.",
        "by": "Charles Lyell"
      }
    ]
  },
  "astronomy": {
    "category": "sci",
    "name": "الفلك والفضاء",
    "nameEn": "Astronomy & Space Sciences",
    "icon": "🔭",
    "color": "#0984E3",
    "quotes": [
      {
        "q": "في مكان ما، ينتظرنا شيء مذهل لكي نكتشفه.",
        "by": "كارل ساجان"
      },
      {
        "q": "الكون لا يسمح بالكمال؛ ولولا النقص لما وُجدنا نحن.",
        "by": "ستيفن هوكينج"
      }
    ],
    "quotesEn": [
      {
        "q": "Somewhere, something incredible is waiting to be known.",
        "by": "Carl Sagan"
      },
      {
        "q": "Look up at the stars and not down at your feet. Be curious.",
        "by": "Stephen Hawking"
      }
    ]
  },
  "mathematics": {
    "category": "sci",
    "name": "الرياضيات والإحصاء",
    "nameEn": "Mathematics & Statistics",
    "icon": "♾️",
    "color": "#E84393",
    "quotes": [
      {
        "q": "الرياضيات هي اللغة التي كتب بها الله هذا الكون.",
        "by": "غاليليو غاليلي"
      },
      {
        "q": "الأرقام لا تكذب، وفي تناغمها تكمن الحقيقة المطلقة.",
        "by": "الخوارزمي"
      }
    ],
    "quotesEn": [
      {
        "q": "Mathematics is the language in which God has written the universe.",
        "by": "Galileo Galilei"
      },
      {
        "q": "Mathematics possesses not only truth, but supreme beauty.",
        "by": "Bertrand Russell"
      }
    ]
  },
  "civil_eng": {
    "category": "eng",
    "name": "الهندسة المدنية والإنشائية",
    "nameEn": "Civil & Structural Engineering",
    "icon": "🏗️",
    "color": "#E17055",
    "quotes": [
      {
        "q": "المهندس المدني يبني العالم الذي تعيش فيه الأجيال.",
        "by": "برونيل"
      },
      {
        "q": "قوة المنشأ تبدأ من عمق الأساسات وثبات الرؤية.",
        "by": "حكمة إنشائية"
      }
    ],
    "quotesEn": [
      {
        "q": "Civil engineers shape the physical world and build legacies for generations.",
        "by": "Isambard Kingdom Brunel"
      },
      {
        "q": "A skyscraper's strength is defined by the integrity of its foundations.",
        "by": "Engineering Wisdom"
      }
    ]
  },
  "arch_eng": {
    "category": "eng",
    "name": "الهندسة المعمارية",
    "nameEn": "Architecture & Design",
    "icon": "🏛️",
    "color": "#B2BEC3",
    "quotes": [
      {
        "q": "هناك 360 درجة، فلماذا نتمسك بزاوية واحدة فقط؟",
        "by": "زها حديد"
      },
      {
        "q": "العمارة هي الموسيقى المتجمدة في المكان.",
        "by": "يوهان غوته"
      }
    ],
    "quotesEn": [
      {
        "q": "There are 360 degrees, so why stick to one?",
        "by": "Zaha Hadid"
      },
      {
        "q": "Architecture is frozen music.",
        "by": "Johann Wolfgang von Goethe"
      }
    ]
  },
  "mech_eng": {
    "category": "eng",
    "name": "الهندسة الميكانيكية والميكاترونكس",
    "nameEn": "Mechanical & Mechatronics",
    "icon": "⚙️",
    "color": "#636E72",
    "quotes": [
      {
        "q": "الحاضر لهم، لكن المستقبل الذي عملت من أجله لي.",
        "by": "نيكولا تسلا"
      },
      {
        "q": "الإبداع الميكانيكي هو تحويل الفكرة الساكنة إلى قوة متحركة.",
        "by": "الجزري — أبو الروبوتات"
      }
    ],
    "quotesEn": [
      {
        "q": "The present is theirs; the future, for which I really worked, is mine.",
        "by": "Nikola Tesla"
      },
      {
        "q": "Mechanical innovation is turning static thoughts into living kinetic power.",
        "by": "Ismail al-Jazari — Father of Robotics"
      }
    ]
  },
  "elec_eng": {
    "category": "eng",
    "name": "الهندسة الكهربائية والإلكترونيات",
    "nameEn": "Electrical & Electronics",
    "icon": "⚡",
    "color": "#FDCB6E",
    "quotes": [
      {
        "q": "إذا أردت معرفة أسرار الكون، ففكر بالطاقة والتردد والاهتزاز.",
        "by": "نيكولا تسلا"
      },
      {
        "q": "الكهرباء هي شريان الحياة في الحضارة الحديثة.",
        "by": "توماس إديسون"
      }
    ],
    "quotesEn": [
      {
        "q": "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.",
        "by": "Nikola Tesla"
      },
      {
        "q": "Electricity is the unseen power that drives modern civilization forward.",
        "by": "Thomas Edison"
      }
    ]
  },
  "biomed_eng": {
    "category": "eng",
    "name": "الهندسة الطبية والحيوية",
    "nameEn": "Biomedical Engineering",
    "icon": "🦾",
    "color": "#E84393",
    "quotes": [
      {
        "q": "حين تلتقي الهندسة بالطب، تولد المعجزات لإنقاذ حياة البشر.",
        "by": "روبرت لانجر"
      },
      {
        "q": "تصميم جهاز ينبض بدلاً من قلب معطوب هو قمة الشرف الإنساني.",
        "by": "ويليم كولف"
      }
    ],
    "quotesEn": [
      {
        "q": "When engineering meets biology, we create miracles that save human lives.",
        "by": "Robert Langer"
      },
      {
        "q": "Designing technologies that restore human function is the ultimate noble engineering.",
        "by": "Willem Kolff"
      }
    ]
  },
  "chem_eng": {
    "category": "eng",
    "name": "الهندسة الكيميائية والبترول",
    "nameEn": "Chemical & Petroleum Eng.",
    "icon": "🛢️",
    "color": "#2D3436",
    "quotes": [
      {
        "q": "المهندس الكيميائي يأخذ فكرة المعمل الصغيرة ويحولها إلى مصنع يخدم الملايين.",
        "by": "جورج ديفيس"
      }
    ],
    "quotesEn": [
      {
        "q": "Chemical engineers take discoveries from the lab bench and scale them up to serve billions.",
        "by": "George E. Davis"
      }
    ]
  },
  "cs": {
    "category": "tech",
    "name": "علوم الحاسب والبرمجة",
    "nameEn": "Computer Science",
    "icon": "💻",
    "color": "#0984E3",
    "quotes": [
      {
        "q": "هل تستطيع الآلات أن تفكر؟ البداية دائماً بسؤال جريء.",
        "by": "ألان تورينج"
      },
      {
        "q": "الكود النظيف هو شعر منطقي يُقرأ بسهولة ويُنفذ بدقة.",
        "by": "لينوس تورفالدس"
      },
      {
        "q": "أفضل طريقة للتنبؤ بالمستقبل هي برمجته واختراعه.",
        "by": "آلان كاي"
      }
    ],
    "quotesEn": [
      {
        "q": "Can machines think? Great revolutions begin with audacious questions.",
        "by": "Alan Turing"
      },
      {
        "q": "Talk is cheap. Show me the code.",
        "by": "Linus Torvalds"
      },
      {
        "q": "The best way to predict the future is to invent it.",
        "by": "Alan Kay"
      }
    ]
  },
  "ai": {
    "category": "tech",
    "name": "الذكاء الاصطناعي وعلم البيانات",
    "nameEn": "Artificial Intelligence & Data",
    "icon": "🤖",
    "color": "#6C5CE7",
    "quotes": [
      {
        "q": "الذكاء الاصطناعي هو الكهرباء الجديدة التي ستغير كل شيء.",
        "by": "أندرو إنج"
      },
      {
        "q": "البيانات هي بترول العصر الرقمي، والذكاء الاصطناعي هو محركها.",
        "by": "جيفري هينتون"
      }
    ],
    "quotesEn": [
      {
        "q": "AI is the new electricity. It will transform every major industry.",
        "by": "Andrew Ng"
      },
      {
        "q": "Deep learning models will be able to do everything a human brain can do.",
        "by": "Geoffrey Hinton"
      }
    ]
  },
  "cybersecurity": {
    "category": "tech",
    "name": "الأمن السيبراني والشبكات",
    "nameEn": "Cybersecurity & Networks",
    "icon": "🛡️",
    "color": "#D63031",
    "quotes": [
      {
        "q": "الأمان ليس منتجاً تشتريه، بل هو أسلوب تفكير وعملية مستمرة.",
        "by": "بروس شناير"
      },
      {
        "q": "الحصن المنيع يحتاج إلى حارس لا ينام.",
        "by": "كيفين ميتنيك"
      }
    ],
    "quotesEn": [
      {
        "q": "Security is not a product, but a process and a continuous mindset.",
        "by": "Bruce Schneier"
      },
      {
        "q": "The only truly secure system is one that is powered off and unplugged.",
        "by": "Kevin Mitnick"
      }
    ]
  },
  "software_eng": {
    "category": "tech",
    "name": "هندسة البرمجيات والويب",
    "nameEn": "Software Engineering & Web",
    "icon": "🌐",
    "color": "#00CEC9",
    "quotes": [
      {
        "q": "أي أحمق يمكنه كتابة كود يفهمه الكمبيوتر؛ المبرمج الجيد يكتب كوداً يفهمه البشر.",
        "by": "مارتن فاولر"
      },
      {
        "q": "البساطة هي الشرط الأساسي للموثوقية البرمجية.",
        "by": "إدسخر ديكسترا"
      }
    ],
    "quotesEn": [
      {
        "q": "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "by": "Martin Fowler"
      },
      {
        "q": "Simplicity is prerequisite for reliability.",
        "by": "Edsger W. Dijkstra"
      }
    ]
  },
  "business_admin": {
    "category": "bus",
    "name": "إدارة الأعمال والقيادة",
    "nameEn": "Business Administration",
    "icon": "📈",
    "color": "#00B894",
    "quotes": [
      {
        "q": "أفضل طريقة للتنبؤ بالمستقبل هي خلقه وصناعته.",
        "by": "بيتر دراكر"
      },
      {
        "q": "الابتكار هو ما يميّز القائد الحقيقي عن التابع.",
        "by": "ستيف جوبز"
      }
    ],
    "quotesEn": [
      {
        "q": "The best way to predict the future is to create it.",
        "by": "Peter Drucker"
      },
      {
        "q": "Innovation distinguishes between a leader and a follower.",
        "by": "Steve Jobs"
      }
    ]
  },
  "accounting": {
    "category": "bus",
    "name": "المحاسبة والتدقيق المالي",
    "nameEn": "Accounting & Finance",
    "icon": "📑",
    "color": "#FDCB6E",
    "quotes": [
      {
        "q": "المحاسبة هي لغة الأعمال؛ ومن أتقنها أدار دفة النجاح.",
        "by": "وارن بافيت"
      },
      {
        "q": "الميزانية الدقيقة تعكس واقع اليوم وتبني أمان الغد.",
        "by": "لوكا باتشولي"
      }
    ],
    "quotesEn": [
      {
        "q": "Accounting is the language of business. You have to learn it like a language to succeed.",
        "by": "Warren Buffett"
      },
      {
        "q": "A balanced ledger reflects truth today and secures prosperity tomorrow.",
        "by": "Luca Pacioli"
      }
    ]
  },
  "economics": {
    "category": "bus",
    "name": "الاقتصاد والمالية",
    "nameEn": "Economics",
    "icon": "🏦",
    "color": "#E17055",
    "quotes": [
      {
        "q": "ليس من كرم الجزار والخباز نتوقع عشاءنا، بل من اهتمامهم بمصالحهم.",
        "by": "آدم سميث"
      },
      {
        "q": "الصعوبة لا تكمن في الأفكار الجديدة، بل في الهروب من القديمة.",
        "by": "جون ماينارد كينز"
      }
    ],
    "quotesEn": [
      {
        "q": "It is not from the benevolence of the butcher or the baker that we expect our dinner, but from their regard to their own interest.",
        "by": "Adam Smith"
      },
      {
        "q": "The difficulty lies not so much in developing new ideas as in escaping from old ones.",
        "by": "John Maynard Keynes"
      }
    ]
  },
  "marketing": {
    "category": "bus",
    "name": "التسويق والإعلان",
    "nameEn": "Marketing & Branding",
    "icon": "📢",
    "color": "#FF7675",
    "quotes": [
      {
        "q": "الناس لا يشترون السلع؛ هم يشترون العلاقات والقصص والسحر.",
        "by": "سيث جودين"
      },
      {
        "q": "التسويق الممتاز يجعل البيع أمراً تلقائياً وزائداً عن الحاجة.",
        "by": "فيليب كوتلر"
      }
    ],
    "quotesEn": [
      {
        "q": "People do not buy goods and services. They buy relations, stories and magic.",
        "by": "Seth Godin"
      },
      {
        "q": "The aim of marketing is to know and understand the customer so well the product fits him and sells itself.",
        "by": "Peter Drucker"
      }
    ]
  },
  "law": {
    "category": "law",
    "name": "القانون والعلوم القضائية",
    "nameEn": "Law & Jurisprudence",
    "icon": "⚖️",
    "color": "#2D3436",
    "quotes": [
      {
        "q": "العدل أساس الملك وحصن الضعفاء وملاذ المظلومين.",
        "by": "عبد الرزاق السنهوري"
      },
      {
        "q": "أن تبرئ مائة متهم خير من أن تظلم بريئاً واحداً.",
        "by": "ويليام بلاكستون"
      }
    ],
    "quotesEn": [
      {
        "q": "Justice is the pillar of civilization and the fortress of the innocent.",
        "by": "Abdel Razzaq Al-Sanhuri"
      },
      {
        "q": "It is better that ten guilty persons escape than that one innocent suffer.",
        "by": "William Blackstone"
      }
    ]
  },
  "intl_relations": {
    "category": "law",
    "name": "العلوم السياسية والدبلوماسية",
    "nameEn": "Political Science & Diplomacy",
    "icon": "🌐",
    "color": "#0984E3",
    "quotes": [
      {
        "q": "الدبلوماسية هي فن جعل الآخرين يعلنون رأيك كأنه رأيهم.",
        "by": "دبلوماسي عريق"
      },
      {
        "q": "الشجاعة ليست غياب الخوف، بل التغلب عليه من أجل السلام.",
        "by": "نيلسون مانديلا"
      }
    ],
    "quotesEn": [
      {
        "q": "Diplomacy is the art of letting someone else have your way.",
        "by": "Diplomatic Wisdom"
      },
      {
        "q": "Courage is not the absence of fear, but the triumph over it for peace and justice.",
        "by": "Nelson Mandela"
      }
    ]
  },
  "media_comm": {
    "category": "hum",
    "name": "الإعلام والصحافة",
    "nameEn": "Media & Journalism",
    "icon": "🎙️",
    "color": "#E84393",
    "quotes": [
      {
        "q": "الصحافة هي السلطة الرابعة وصوت من لا صوت له.",
        "by": "جوزيف بوليتزر"
      },
      {
        "q": "الكلمة الصادقة تبني وعي أمة كاملة.",
        "by": "مصطفى أمين"
      }
    ],
    "quotesEn": [
      {
        "q": "Journalism is what we need to make democracy work and empower the truth.",
        "by": "Joseph Pulitzer"
      },
      {
        "q": "To be persuasive we must be believable; to be believable we must be credible; to be credible we must be truthful.",
        "by": "Edward R. Murrow"
      }
    ]
  },
  "languages": {
    "category": "hum",
    "name": "اللغات والترجمة",
    "nameEn": "Languages & Translation",
    "icon": "🗣️",
    "color": "#6C5CE7",
    "quotes": [
      {
        "q": "إذا تحدثت إلى إنسان بلغة يفهمها ذهبت إلى عقله؛ وإذا تحدثت بلغته ذهبت إلى قلبه.",
        "by": "نيلسون مانديلا"
      },
      {
        "q": "من يتعلم لغة جديدة يكتسب روحاً إضافية.",
        "by": "مثل تشيكي عريق"
      }
    ],
    "quotesEn": [
      {
        "q": "If you talk to a man in a language he understands, that goes to his head. If you talk to him in his language, that goes to his heart.",
        "by": "Nelson Mandela"
      },
      {
        "q": "To have another language is to possess a second soul.",
        "by": "Charlemagne"
      }
    ]
  },
  "arabic_lit": {
    "category": "hum",
    "name": "اللغة العربية وآدابها",
    "nameEn": "Arabic Literature",
    "icon": "📜",
    "color": "#D63031",
    "quotes": [
      {
        "q": "إن الذي ملأ اللغات محاسناً .. جعل الجمال وسره في الضاد.",
        "by": "أحمد شوقي"
      },
      {
        "q": "الأدب الحقيقي يغوص في أعماق النفس البشرية ليضيء عتمتها.",
        "by": "نجيب محفوظ"
      }
    ],
    "quotesEn": [
      {
        "q": "Arabic is a language of profound eloquence, carrying centuries of wisdom and poetry.",
        "by": "Ahmad Shawqi"
      },
      {
        "q": "Literature is the immortal mirror of the human soul across time.",
        "by": "Naguib Mahfouz"
      }
    ]
  },
  "history": {
    "category": "hum",
    "name": "التاريخ والآثار",
    "nameEn": "History & Archaeology",
    "icon": "🏺",
    "color": "#C29B7F",
    "quotes": [
      {
        "q": "التاريخ في ظاهره لا يزيد عن الإخبار، وفي باطنه نظر وتحقيق.",
        "by": "ابن خلدون"
      },
      {
        "q": "أمة لا تعرف تاريخها هي كشجرة بلا جذور.",
        "by": "ويل ديورانت"
      }
    ],
    "quotesEn": [
      {
        "q": "History is a philosophy learned from examples.",
        "by": "Ibn Khaldun"
      },
      {
        "q": "A nation that forgets its past has no future.",
        "by": "Winston Churchill"
      }
    ]
  },
  "psychology": {
    "category": "hum",
    "name": "علم النفس والإرشاد",
    "nameEn": "Psychology & Behavioral Science",
    "icon": "🧠",
    "color": "#A29BFE",
    "quotes": [
      {
        "q": "من يعرف الآخرين حكيم، ومن يعرف نفسه مستنير.",
        "by": "لاوتسو"
      },
      {
        "q": "حين نعجز عن تغيير الموقف، نتحدى أنفسنا لتغيير ذواتنا.",
        "by": "فيكتور فرانكل"
      }
    ],
    "quotesEn": [
      {
        "q": "Who looks outside, dreams; who looks inside, awakes.",
        "by": "Carl Jung"
      },
      {
        "q": "When we are no longer able to change a situation, we are challenged to change ourselves.",
        "by": "Viktor Frankl"
      }
    ]
  },
  "education": {
    "category": "hum",
    "name": "التربية والتعليم",
    "nameEn": "Education & Pedagogy",
    "icon": "📚",
    "color": "#00B894",
    "quotes": [
      {
        "q": "التعليم ليس ملء دلو، بل إيقاد شعلة.",
        "by": "ويليام بتلر ييتس"
      },
      {
        "q": "التعليم هو أقوى سلاح يمكنك استخدامه لتغيير العالم.",
        "by": "نيلسون مانديلا"
      }
    ],
    "quotesEn": [
      {
        "q": "Education is not the filling of a pail, but the lighting of a fire.",
        "by": "William Butler Yeats"
      },
      {
        "q": "Education is the most powerful weapon which you can use to change the world.",
        "by": "Nelson Mandela"
      }
    ]
  },
  "agriculture": {
    "category": "applied",
    "name": "العلوم الزراعية والبيئة",
    "nameEn": "Agricultural Sciences",
    "icon": "🌱",
    "color": "#2ECC71",
    "quotes": [
      {
        "q": "الزراعة هي المهنة الأنبل والأكثر فائدة وصحة للبشرية جمعاء.",
        "by": "جورج واشنطن"
      },
      {
        "q": "من لا يملك قوت يومه بيده لا يملك حريته ولا استقلال قراره.",
        "by": "حكمة تنموية"
      }
    ],
    "quotesEn": [
      {
        "q": "Agriculture is the most healthful, most useful, and most noble employment of man.",
        "by": "George Washington"
      },
      {
        "q": "Food is the moral right of all who are born into this world.",
        "by": "Norman Borlaug"
      }
    ]
  },
  "vet_med": {
    "category": "applied",
    "name": "الطب البيطري",
    "nameEn": "Veterinary Medicine",
    "icon": "🐾",
    "color": "#E67E22",
    "quotes": [
      {
        "q": "طبيب البشر يعالج الإنسان؛ أما الطبيب البيطري فيحمي الإنسانية كلها.",
        "by": "حكمة بيطرية"
      },
      {
        "q": "الرفق بالحيوان وعلاجه وصيانته من صلب رحمة الإسلام ورقي الحضارات.",
        "by": "حكمة بيئية"
      }
    ],
    "quotesEn": [
      {
        "q": "Human doctors save people; veterinary doctors protect humanity and life itself.",
        "by": "Veterinary Wisdom"
      },
      {
        "q": "The greatness of a nation can be judged by the way its animals are treated.",
        "by": "Mahatma Gandhi"
      }
    ]
  },
  "fine_arts": {
    "category": "applied",
    "name": "الفنون الجميلة والتصميم",
    "nameEn": "Fine Arts & Graphic Design",
    "icon": "🎨",
    "color": "#FD79A8",
    "quotes": [
      {
        "q": "الفن يغسل عن الروح غبار الحياة اليومية المرهقة.",
        "by": "بابلو بيكاسو"
      },
      {
        "q": "الرسم شعر يُرى ولا يُنطق، والشعر رسم يُنطق ولا يُرى.",
        "by": "ليوناردو دافينشي"
      }
    ],
    "quotesEn": [
      {
        "q": "Art washes away from the soul the dust of everyday life.",
        "by": "Pablo Picasso"
      },
      {
        "q": "Painting is poetry that is seen rather than felt, and poetry is painting that is felt rather than seen.",
        "by": "Leonardo da Vinci"
      }
    ]
  }
};

const THEME_PALETTES = [
  {name:'كريمي دافئ ☀️',  nameEn:'Warm Cream ☀️',  bg:'#FBF2E9'},
  {name:'أبيض نقي ⬜',    nameEn:'Pure White ⬜',    bg:'#FFFFFF'},
  {name:'رمادي ناعم 🩶',  nameEn:'Soft Gray 🩶',   bg:'#F2F2F4'},
  {name:'أزرق هادئ 🌊',   nameEn:'Calm Blue 🌊',   bg:'#EEF4FC'},
  {name:'أخضر مريح 🌿',   nameEn:'Relaxing Mint 🌿', bg:'#EEF8F4'},
  {name:'بيج راقي 🏺',    nameEn:'Classic Beige 🏺', bg:'#F5F0E8'},
  {name:'داكن مريح 🌙',   nameEn:'Cozy Dark 🌙',   bg:'#1E2228'},
  {name:'أسود كلاسيك ⬛', nameEn:'Classic Black ⬛', bg:'#141416'},
  {name:'كحلي عميق 🌌',   nameEn:'Deep Navy 🌌',   bg:'#1A1F2E'},
  {name:'خضر داكن 🎯',    nameEn:'Forest Dark 🎯', bg:'#1A2320'},
  {name:'بنفسجي داكن 💜', nameEn:'Deep Plum 💜',   bg:'#1E1A24'},
  {name:'ذهبي فاتح ✨',   nameEn:'Soft Gold ✨',   bg:'#FDF8EE'},
];

/* ============ PROFILE & SETTINGS ============ */
let userProfile = load('userProfile_v2', {name:'', spec:'medicine', bg:'#FBF2E9', lang:'ar'});
if(!userProfile.lang) userProfile.lang = 'ar'; // migrate old profiles
let selectedSpecTemp = userProfile.spec;

function applyUserTheme(){
  const spec = SPECIALIZATIONS[userProfile.spec] || SPECIALIZATIONS.medicine;
  const lang = userProfile.lang || 'ar';
  const specName = (lang === 'en' && spec.nameEn) ? spec.nameEn : spec.name;
  // Background
  applyBgColor(userProfile.bg, false);
  // Header badge
  const badge = $('userBadge');
  if(badge) badge.textContent = spec.icon;
  // Title greeting (lang-aware)
  const title = $('siteTitle');
  const displayName = userProfile.name || (lang === 'en' ? 'Student' : 'المستخدم');
  if(title) title.textContent = lang === 'en'
    ? `Hello, ${displayName} 👋`
    : `أهلاً، ${displayName} 👋`;
  // Subtitle
  const sub = $('siteSubtitle');
  if(sub) sub.textContent = lang === 'en'
    ? `${specName} · your cozy corner for studying ✨`
    : `${specName} · مساحتك الخاصة للمذاكرة ✨`;
  // Apply language UI
  applyLang(lang, false);
  // Show first quote
  showNextBannerQuote(true);
}

function applyBgColor(hex, savePref = true){
  document.documentElement.style.setProperty('--cream', hex);
  document.body.style.transition = 'background-color .5s cubic-bezier(.4,0,.2,1)';
  document.body.style.backgroundColor = hex;
  const isDark = isDarkColor(hex);
  if(isDark){
    document.documentElement.style.setProperty('--plum', '#F2EAF8');
    document.documentElement.style.setProperty('--ink', '#D0C4D8');
    document.documentElement.style.setProperty('--paper', '#2A2433');
    document.documentElement.style.setProperty('--line', 'rgba(255,255,255,0.15)');
    // Adaptive modal colors for dark themes
    document.documentElement.style.setProperty('--modal-bg', '#241F2D');
    document.documentElement.style.setProperty('--modal-card-bg', '#2F293A');
    document.documentElement.style.setProperty('--modal-card-active', '#3E344F');
    document.documentElement.style.setProperty('--modal-text', '#FFFFFF');
    document.documentElement.style.setProperty('--modal-sub', '#C7BCD1');
    document.documentElement.style.setProperty('--modal-border', 'rgba(255,255,255,0.14)');
    document.documentElement.style.setProperty('--modal-input-bg', '#1C1824');
    document.documentElement.style.setProperty('--modal-btn-sec', '#362F42');
    // Canvas colors for dark mode
    document.documentElement.style.setProperty('--canvas-bg', '#1D1824');
    document.documentElement.style.setProperty('--canvas-grid', 'rgba(255,255,255,0.06)');
    document.documentElement.style.setProperty('--card-bg', '#2A2433');
    document.documentElement.style.setProperty('--thumb-bg', '#362E42');
  } else {
    document.documentElement.style.setProperty('--plum', '#3F2C45');
    document.documentElement.style.setProperty('--ink', '#6F5E75');
    document.documentElement.style.setProperty('--paper', '#FFFDF8');
    document.documentElement.style.setProperty('--line', '#EADFD2');
    // Adaptive modal colors matching current palette
    document.documentElement.style.setProperty('--modal-bg', '#FFF9F3');
    document.documentElement.style.setProperty('--modal-card-bg', '#F6EFE6');
    document.documentElement.style.setProperty('--modal-card-active', '#EFE4D6');
    document.documentElement.style.setProperty('--modal-text', '#38223E');
    document.documentElement.style.setProperty('--modal-sub', '#6F5C75');
    document.documentElement.style.setProperty('--modal-border', '#E5D6C5');
    document.documentElement.style.setProperty('--modal-input-bg', '#FFFFFF');
    document.documentElement.style.setProperty('--modal-btn-sec', '#EFE5D8');
    // Canvas colors for light mode
    document.documentElement.style.setProperty('--canvas-bg', '#FFFBF6');
    document.documentElement.style.setProperty('--canvas-grid', 'rgba(74,51,80,0.06)');
    document.documentElement.style.setProperty('--card-bg', '#FFFDF8');
    document.documentElement.style.setProperty('--thumb-bg', '#F4ECE3');
  }
  if(savePref){ userProfile.bg = hex; save('userProfile_v2', userProfile); syncStateToCloud('profile', userProfile); }
}

function isDarkColor(hex){
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return (r*299 + g*587 + b*114)/1000 < 128;
}

/* ============ MULTI-LANGUAGE (AR / EN) SYSTEM ============ */
const I18N = {
  ar: {
    langBtn: '🌐 English',
    cloudBtn: '☁️ مزامنة الكلاود',
    profileBtn: '👤 الحساب والتخصص',
    themeBtn: '🎨 لون الخلفية',
    nextQuote: 'اقتباس آخر 🔄',
    quoteLoading: 'جاري تحميل اقتباس اليوم...',
    
    // Tabs
    tabs: {
      summaries: '<span class="ic">📝</span> الملخصات',
      midterm: '<span class="ic">📘</span> الميدتيرم',
      final: '<span class="ic">📗</span> الفاينل',
      quizzes: '<span class="ic">✅</span> الكويزات',
      explanation: '<span class="ic">🎧</span> الشروحات',
      todo: '<span class="ic">🗒️</span> قائمة المهام',
      calendar: '<span class="ic">📅</span> التقويم',
      burnout: '<span class="ic">🧠</span> مساحة الأفكار'
    },
    
    // Panels
    panels: {
      summaries: { title: 'الملخصات ✨', sub: 'ارفع مذكراتك وملخصاتك لكل مادة' },
      midterm: { title: 'الميدتيرم 📘', sub: 'احتفظ بكل مذكرات الميدتيرم في مكان واحد' },
      final: { title: 'الفاينل 📗', sub: 'المحطة الأخيرة — خليك منظم ومستعد' },
      quizzes: { title: 'الكويزات ✅', sub: 'ارفع نماذج وتدريبات الكويزات وأسئلة الامتحانات' },
      explanation: { title: 'الشروحات 🎧', sub: 'ارفع تسجيلات الشرح أو أضف قوائم تشغيل يوتيوب' },
      todo: { title: 'قائمة المهام 🗒️', sub: 'مهامك اليومية، خطوة بخطوة نحو هدفك' },
      calendar: { title: 'التقويم 🎨', sub: 'اضغط على أي يوم ولونه حسب إنجازك حتى نهاية العام' },
      burnout: { title: 'مساحة الأفكار 🧠', sub: 'فرغ كل أفكارك في مربعات، حرّكها واربطها ببعضها' }
    },
    
    // Upload & Explanation
    dropText: '<b>اسحب الملفات هنا</b> أو اضغط للرفع',
    expFilesBtn: '📁 رفع ملفات',
    expYtBtn: '▶️ قائمة يوتيوب',
    ytUrlPlaceholder: 'ضع رابط قائمة التشغيل أو فيديو الشرح من يوتيوب هنا...',
    ytTitlePlaceholder: 'اسم المادة/القائمة (اختياري)',
    ytAddBtn: 'إضافة القائمة ▶️',
    
    // Todo
    todoPlaceholder: 'اكتب مهمة جديدة...',
    prioHigh: 'أولوية عالية',
    prioMed: 'أولوية متوسطة',
    prioLow: 'أولوية منخفضة',
    todoAddBtn: 'إضافة',
    
    // Burnout
    burnNewBox: '+ مربع جديد',
    burnClear: 'مسح اللوحة',
    burnHint: 'اسحب من النقطة على حافة المربع لمربع آخر لربطهما. اضغط على الخط لحذفه.',
    burnBoxDefault: 'اكتب فكرتك هنا...',
    burnClearConfirm: 'هل أنت متأكد من مسح جميع الصناديق والروابط؟',
    
    // Profile Modal
    profTitle: '👤 الحساب والتخصص الأكاديمي',
    profSub: 'اختر اسمك ومجالك وتخصصك لعرض اقتباسات أساطير تخصصك والترحيب بك',
    profNameLabel: '🖊️ اسمك / لقبك:',
    profNamePlaceholder: 'اكتب اسمك هنا (مثال: د. محمود، م. سارة...)',
    profSpecLabel: '🎓 اختر كليتك / تخصصك:',
    profSearchPlaceholder: '🔍 ابحث في التخصصات (مثال: جراحة، باطنة، كيمياء، مدني، برمجة...)',
    profSaveBtn: '✅ حفظ الاختيار',
    profCloseBtn: 'إغلاق',
    majorsCount: count => `${count} تخصص متاح`,
    noMajors: 'لا توجد تخصصات مطابقة للبحث 🔍',
    specSelected: '✓ تم الاختيار',
    
    // Theme Modal
    themeTitle: '🎨 لون خلفية الموقع',
    themeSub: 'اختر لوناً مريحاً للعين أو حدد لونك الخاص',
    themeCustomLabel: 'لون مخصص:',
    themeDoneBtn: '✅ تم',
    
    // Cloud Modal
    cloudTitle: 'إعدادات الكلاود',
    cloudSub: 'الملفات بترفع على Cloudinary وبتتزامن على كل الأجهزة تلقائياً!',
    cloudDbLabel: '🌐 قاعدة البيانات (Firestore):',
    cloudDbStatus: 'متصل تلقائياً 🟢',
    cloudStorageLabel: '☁️ سيرفر التخزين (Cloudinary):',
    cloudStorageStatus: 'شغال 25GB مجاناً 🟢',
    cloudUploadLabel: '📱 رفع الملفات:',
    cloudUploadStatus: 'تلقائي بدون تسجيل ⚡',
    cloudSyncLabel: '🔄 مزامنة بين الأجهزة:',
    cloudSyncStatus: 'فعّالة على كل الأجهزة 🟢',
    cloudGreenBox: '✅ الملفات اللي بترفعها بتتحفظ على Cloudinary وبتظهر على أي جهاز يفتح الموقع فوراً!',
    cloudResetBtn: '🗑️ مسح كل البيانات والبدء من جديد (Clean Reset)',
    cloudCloseBtn: 'إغلاق',
    
    // Folders & Cards
    allFolder: 'الكل',
    newFolderBtn: '+ قسم جديد',
    folderPrompt: 'اسم هذا القسم:',
    folderDeleteConfirm: 'هل أنت متأكد من حذف هذا القسم؟ ستعود ملفاته إلى "الكل".',
    emptyFiles: 'لا توجد ملفات بعد — ارفع أول ملف 🌷',
    emptyTasks: 'لا توجد مهام حالياً — استمتع بالراحة 🌷',
    openBtn: 'فتح',
    delBtn: 'حذف',
    openInYt: '▶️ فتح في يوتيوب',
    markDone: 'تحديد كمكتمل',
    markIncomplete: 'إلغاء الإكمال',
    uploadingText: '⏳ جاري الرفع...',
    profileSaved: 'تم حفظ ملفك الشخصي بنجاح! 🌟',
    welcomeToast: name => `مرحباً ${name}! يلا نذاكر 🚀`,
    doneToast: name => `أحسنت يا ${name}! إنجاز رائع 🎉`,
    
    // Calendar Legends
    calendarDays: ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'],
    calendarMonths: ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
    dayColorLabels: {
      red: 'يوم صعب',
      orange: 'يوم عادي',
      yellow: 'يوم جيد',
      green: 'يوم رائع',
      blue: 'يوم هادئ',
      purple: 'يوم ملهم',
      pink: 'يوم ممتع'
    }
  },
  en: {
    langBtn: '🌐 عربي',
    cloudBtn: '☁️ Cloud Sync',
    profileBtn: '👤 Account & Major',
    themeBtn: '🎨 Background',
    nextQuote: 'Next Quote 🔄',
    quoteLoading: 'Loading today quote...',
    
    // Tabs
    tabs: {
      summaries: '<span class="ic">📝</span> Summaries',
      midterm: '<span class="ic">📘</span> Midterm',
      final: '<span class="ic">📗</span> Final',
      quizzes: '<span class="ic">✅</span> Quizzes',
      explanation: '<span class="ic">🎧</span> Explanation',
      todo: '<span class="ic">🗒️</span> To-Do List',
      calendar: '<span class="ic">📅</span> Calendar',
      burnout: '<span class="ic">🧠</span> Burnout'
    },
    
    // Panels
    panels: {
      summaries: { title: 'Summaries ✨', sub: 'Upload your notes and summary files for each subject' },
      midterm: { title: 'Midterm 📘', sub: 'Keep all your midterm material in one place' },
      final: { title: 'Final 📗', sub: 'The last stretch — keep it organized and ready' },
      quizzes: { title: 'Quizzes ✅', sub: 'Upload quiz sheets, practice files, and past exams' },
      explanation: { title: 'Explanation 🎧', sub: 'Upload lecture explanations, recordings, or add a YouTube playlist' },
      todo: { title: 'To-Do List 🗒️', sub: 'Your daily tasks, one step at a time towards your goals' },
      calendar: { title: 'My Calendar 🎨', sub: 'Tap any day and color it based on your progress through the end of the year' },
      burnout: { title: 'Burnout 🧠', sub: 'Dump every thought into a box. Drag it, resize it, connect it to what it relates to.' }
    },
    
    // Upload & Explanation
    dropText: '<b>Drop files here</b> or click to upload',
    expFilesBtn: '📁 Upload Files',
    expYtBtn: '▶️ YouTube Playlist',
    ytUrlPlaceholder: 'Paste YouTube playlist or video link here...',
    ytTitlePlaceholder: 'Subject / Title (optional)',
    ytAddBtn: 'Add Playlist ▶️',
    
    // Todo
    todoPlaceholder: 'Write a task...',
    prioHigh: 'High priority',
    prioMed: 'Medium priority',
    prioLow: 'Low priority',
    todoAddBtn: 'Add',
    
    // Burnout
    burnNewBox: '+ New box',
    burnClear: 'Clear board',
    burnHint: 'Drag from the small dot on a box edge onto another box to connect them. Click a connection line to remove it.',
    burnBoxDefault: 'Write your thoughts here...',
    burnClearConfirm: 'Clear all burnout notes and connections?',
    
    // Profile Modal
    profTitle: '👤 Account & Academic Major',
    profSub: 'Choose your name and major to see quotes from legends and personalize your space',
    profNameLabel: '🖊️ Your Name / Title:',
    profNamePlaceholder: 'e.g. Dr. Mahmoud, Eng. Sarah...',
    profSpecLabel: '🎓 Select your College / Major:',
    profSearchPlaceholder: '🔍 Search majors (e.g., Surgery, Chemistry, AI, Law...)',
    profSaveBtn: '✅ Save Choice',
    profCloseBtn: 'Close',
    majorsCount: count => `${count} majors available`,
    noMajors: 'No matching majors found 🔍',
    specSelected: '✓ Selected',
    
    // Theme Modal
    themeTitle: '🎨 Site Background Color',
    themeSub: 'Pick an eye-friendly color or choose a custom one',
    themeCustomLabel: 'Custom Color:',
    themeDoneBtn: '✅ Done',
    
    // Cloud Modal
    cloudTitle: 'Cloud Settings',
    cloudSub: 'Files upload to Cloudinary & sync across all devices automatically!',
    cloudDbLabel: '🌐 Database (Firestore):',
    cloudDbStatus: 'Connected automatically 🟢',
    cloudStorageLabel: '☁️ Storage (Cloudinary):',
    cloudStorageStatus: '25GB Free Storage Active 🟢',
    cloudUploadLabel: '📱 File Upload:',
    cloudUploadStatus: 'Direct & Instant ⚡',
    cloudSyncLabel: '🔄 Cross-device Sync:',
    cloudSyncStatus: 'Active across all devices 🟢',
    cloudGreenBox: '✅ Uploaded files are saved to Cloudinary and appear instantly on all devices!',
    cloudResetBtn: '🗑️ Clean Reset (Erase All Data)',
    cloudCloseBtn: 'Close',
    
    // Folders & Cards
    allFolder: 'All',
    newFolderBtn: '+ New section',
    folderPrompt: 'Name this section:',
    folderDeleteConfirm: 'Delete this section? Its files will move back to "All".',
    emptyFiles: 'No files yet — upload your first one 🌷',
    emptyTasks: 'No tasks right now — enjoy the calm 🌷',
    openBtn: 'Open',
    delBtn: 'Delete',
    openInYt: '▶️ Open in YouTube',
    markDone: 'Mark as done',
    markIncomplete: 'Mark incomplete',
    uploadingText: '⏳ Uploading...',
    profileSaved: 'Profile saved successfully! 🌟',
    welcomeToast: name => `Welcome, ${name}! Let's study 🚀`,
    doneToast: name => `Great job, ${name}! Awesome progress 🎉`,
    
    // Calendar Legends
    calendarDays: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    calendarMonths: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    dayColorLabels: {
      red: 'Tough day',
      orange: 'Normal day',
      yellow: 'Good day',
      green: 'Great day',
      blue: 'Calm day',
      purple: 'Inspired day',
      pink: 'Loved day'
    }
  }
};

function applyLang(lang, shouldSave = true){
  if(!lang) lang = userProfile.lang || 'ar';
  userProfile.lang = lang;
  if(shouldSave) save('userProfile_v2', userProfile);

  const t = I18N[lang] || I18N.ar;

  // HTML attributes
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'ar' ? 'rtl' : 'ltr');

  // Header buttons
  if($('langBtn')) $('langBtn').textContent = t.langBtn;
  if($('cloudBtn')) $('cloudBtn').textContent = t.cloudBtn;
  if($('profileBtn')) $('profileBtn').textContent = t.profileBtn;
  if($('themeBtn')) $('themeBtn').textContent = t.themeBtn;
  if(typeof updateAuthUI === 'function') updateAuthUI();
  if($('authLoginTitle')) $('authLoginTitle').textContent = (lang === 'en' ? 'Welcome to Rafeeq 👋' : 'أهلاً بك في رفيق 👋');
  if($('authLoginSub')) $('authLoginSub').textContent = (lang === 'en' ? 'Sign in to access your private space' : 'سجّل دخولك للوصول لمساحتك الخاصة');
  if($('authLoginBtn')) $('authLoginBtn').textContent = (lang === 'en' ? 'Sign In 🚀' : 'دخول 🚀');
  if($('authRegTitle')) $('authRegTitle').textContent = (lang === 'en' ? 'New Account on Rafeeq ✨' : 'حساب جديد في رفيق ✨');
  if($('authRegSub')) $('authRegSub').textContent = (lang === 'en' ? 'Start your journey — your data is saved on your account' : 'ابدأ رحلتك — بياناتك محفوظة على حسابك');
  if($('authRegBtn')) $('authRegBtn').textContent = (lang === 'en' ? 'Create Account 🎉' : 'إنشاء الحساب 🎉');
  if($('todayChip')) {
    const locale = lang === 'ar' ? 'ar-EG' : 'en-US';
    $('todayChip').textContent = new Date().toLocaleDateString(locale, {weekday:'long', year:'numeric', month:'long', day:'numeric'});
  }

  // Quote next button
  const qBtn = document.querySelector('.quote-next-btn');
  if(qBtn) qBtn.textContent = t.nextQuote;

  // Navigation tabs
  document.querySelectorAll('nav.tabs button').forEach(btn => {
    const tabKey = btn.dataset.tab;
    if(tabKey && t.tabs[tabKey]){
      btn.innerHTML = t.tabs[tabKey];
    }
  });

  // Panel Titles & Subs
  Object.entries(t.panels).forEach(([panelKey, data]) => {
    const p = $('panel-' + panelKey);
    if(p){
      const h2 = p.querySelector('h2');
      const sub = p.querySelector('.sub');
      if(h2) h2.textContent = data.title;
      if(sub) sub.textContent = data.sub;
    }
  });

  // Drops
  document.querySelectorAll('.drop').forEach(drop => {
    drop.innerHTML = t.dropText;
  });

  // Explanation toggle buttons
  const expBtns = document.querySelectorAll('#exp-toggle button');
  if(expBtns[0]) expBtns[0].textContent = t.expFilesBtn;
  if(expBtns[1]) expBtns[1].textContent = t.expYtBtn;
  if($('yt-playlist-url')) $('yt-playlist-url').placeholder = t.ytUrlPlaceholder;
  if($('yt-playlist-title')) $('yt-playlist-title').placeholder = t.ytTitlePlaceholder;
  const ytAddBtn = document.querySelector('#exp-playlist-section .btn');
  if(ytAddBtn) ytAddBtn.textContent = t.ytAddBtn;

  // Todo inputs
  if($('td-text')) $('td-text').placeholder = t.todoPlaceholder;
  const prioOpts = document.querySelectorAll('#td-prio option');
  if(prioOpts[0]) prioOpts[0].textContent = t.prioHigh;
  if(prioOpts[1]) prioOpts[1].textContent = t.prioMed;
  if(prioOpts[2]) prioOpts[2].textContent = t.prioLow;
  const tdAddBtn = document.querySelector('#panel-todo .add-row .btn');
  if(tdAddBtn) tdAddBtn.textContent = t.todoAddBtn;

  // Burnout buttons & hints
  const burnBtns = document.querySelectorAll('#panel-burnout .burnout-toolbar button');
  if(burnBtns[0]) burnBtns[0].textContent = t.burnNewBox;
  if(burnBtns[1]) burnBtns[1].textContent = t.burnClear;
  const burnHint = document.querySelector('#panel-burnout .canvas-hint');
  if(burnHint) burnHint.textContent = t.burnHint;

  // Profile Modal
  if($('profModalTitle')) $('profModalTitle').textContent = t.profTitle;
  if($('profModalSub')) $('profModalSub').textContent = t.profSub;
  if($('profNameLabel')) $('profNameLabel').textContent = t.profNameLabel;
  if($('userNameInput')) $('userNameInput').placeholder = t.profNamePlaceholder;
  if($('profSpecLabel')) $('profSpecLabel').textContent = t.profSpecLabel;
  if($('specSearchInput')) $('specSearchInput').placeholder = t.profSearchPlaceholder;
  if($('profSaveBtn')) $('profSaveBtn').textContent = t.profSaveBtn;
  if($('profCloseBtn')) $('profCloseBtn').textContent = t.profCloseBtn;

  // Theme Modal
  if($('themeModalTitle')) $('themeModalTitle').textContent = t.themeTitle;
  if($('themeModalSub')) $('themeModalSub').textContent = t.themeSub;
  if($('themeCustomLabel')) $('themeCustomLabel').textContent = t.themeCustomLabel;
  if($('themeDoneBtn')) $('themeDoneBtn').textContent = t.themeDoneBtn;

  // Cloud Modal
  if($('cloudModalTitle')) $('cloudModalTitle').textContent = t.cloudTitle;
  if($('cloudModalSub')) $('cloudModalSub').textContent = t.cloudSub;
  if($('cloudDbLabel')) $('cloudDbLabel').textContent = t.cloudDbLabel;
  if($('cloudDbStatus')) $('cloudDbStatus').textContent = t.cloudDbStatus;
  if($('cloudStorageLabel')) $('cloudStorageLabel').textContent = t.cloudStorageLabel;
  if($('cloudStorageStatus')) $('cloudStorageStatus').textContent = t.cloudStorageStatus;
  if($('cloudUploadLabel')) $('cloudUploadLabel').textContent = t.cloudUploadLabel;
  if($('cloudUploadStatus')) $('cloudUploadStatus').textContent = t.cloudUploadStatus;
  if($('cloudSyncLabel')) $('cloudSyncLabel').textContent = t.cloudSyncLabel;
  if($('cloudSyncStatus')) $('cloudSyncStatus').textContent = t.cloudSyncStatus;
  if($('cloudGreenBox')) $('cloudGreenBox').textContent = t.cloudGreenBox;
  if($('cloudResetBtn')) $('cloudResetBtn').textContent = t.cloudResetBtn;
  if($('cloudCloseBtn')) $('cloudCloseBtn').textContent = t.cloudCloseBtn;

  // Re-render sub-components that depend on language
  renderSpecCategoryTabs();
  renderSpecGrid();
  renderLegend();
  renderCalendar();
  renderTodos();
  SECTIONS.forEach(renderFolders);
  SECTIONS.forEach(renderFileSection);
  renderYtPlaylists();
  initRafeeqSplash();
}

function toggleLang(){
  const nextLang = (userProfile.lang === 'en' ? 'ar' : 'en');
  userProfile.lang = nextLang;
  save('userProfile_v2', userProfile);
  syncStateToCloud('profile', userProfile);
  applyUserTheme();
  applyLang(nextLang, true);
}

/* ---- Profile Modal ---- */

let currentSpecCategory = 'all';

function openProfileModal(){
  $('userNameInput').value = userProfile.name;
  selectedSpecTemp = userProfile.spec;
  $('specSearchInput').value = '';
  currentSpecCategory = 'all';
  renderSpecCategoryTabs();
  renderSpecGrid();
  $('profileModal').style.display = 'flex';
}

function closeProfileModal(){
  const m = $('profileModal');
  if(m) m.style.display = 'none';
}

function renderSpecCategoryTabs(){
  const tabsContainer = $('specCategoryTabs');
  if(!tabsContainer) return;
  const lang = userProfile.lang || 'ar';
  tabsContainer.innerHTML = Object.entries(SPEC_CATEGORIES).map(([catId, cat]) => {
    const isActive = currentSpecCategory === catId;
    const catName = lang === 'en' ? (cat.nameEn || cat.name) : cat.name;
    return `<button onclick="setSpecCategory('${catId}')" style="
      all:unset; cursor:pointer; padding:5px 12px; border-radius:999px;
      font-size:11.5px; font-weight:700; white-space:nowrap;
      background: ${isActive ? 'var(--pink-deep)' : 'var(--modal-card-bg)'};
      color: ${isActive ? '#fff' : 'var(--modal-text)'};
      border: 1px solid ${isActive ? 'var(--pink-deep)' : 'var(--modal-border)'};
      transition: all .15s ease;">
      ${catName}
    </button>`;
  }).join('');
}

function setSpecCategory(catId){
  currentSpecCategory = catId;
  renderSpecCategoryTabs();
  renderSpecGrid();
}

function filterSpecs(){
  renderSpecGrid();
}

function renderSpecGrid(){
  const g = $('specGrid');
  if(!g) return;
  const lang = userProfile.lang || 'ar';
  const t = I18N[lang] || I18N.ar;
  const search = ($('specSearchInput')?.value || '').trim().toLowerCase();
  
  const filtered = Object.entries(SPECIALIZATIONS).filter(([id, s]) => {
    const matchCategory = (currentSpecCategory === 'all') || (s.category === currentSpecCategory);
    const matchSearch = !search || s.name.toLowerCase().includes(search) || (s.nameEn && s.nameEn.toLowerCase().includes(search)) || id.toLowerCase().includes(search);
    return matchCategory && matchSearch;
  });

  const countChip = $('specCountChip');
  if(countChip) {
    countChip.textContent = t.majorsCount(filtered.length);
  }

  if(!filtered.length){
    g.innerHTML = `<div style="grid-column: 1 / -1; text-align:center; padding:30px 10px; color:var(--modal-sub); font-size:13px; font-weight:700;">
      ${t.noMajors}
    </div>`;
    return;
  }

  g.innerHTML = filtered.map(([id, s]) => {
    const isSelected = selectedSpecTemp === id;
    return `
    <div onclick="selectSpec('${id}')" style="
      border: 2px solid ${isSelected ? s.color : 'var(--modal-border)'};
      background: ${isSelected ? 'var(--modal-card-active)' : 'var(--modal-card-bg)'};
      box-shadow: ${isSelected ? '0 6px 18px -4px rgba(0,0,0,0.25)' : 'none'};
      border-radius: 12px; padding: 10px 6px; cursor: pointer; text-align: center;
      transform: ${isSelected ? 'scale(1.02)' : 'scale(1)'};
      transition: all .18s var(--ease-spring);">
      <div style="font-size:22px; margin-bottom:4px;">${s.icon}</div>
      <div style="font-size:11px; font-weight:800; color:var(--modal-text); line-height:1.3;">${(lang === 'en' && s.nameEn) ? s.nameEn : s.name}</div>
      ${isSelected ? `<div style="font-size:9.5px; font-weight:800; color:${s.color}; margin-top:3px;">${t.specSelected}</div>` : ''}
    </div>`;
  }).join('');
}

function selectSpec(id){
  selectedSpecTemp = id;
  renderSpecGrid();
}

function saveProfile(){
  const n = $('userNameInput').value.trim();
  if(n) userProfile.name = n;
  userProfile.spec = selectedSpecTemp;
  save('userProfile_v2', userProfile);
  syncStateToCloud('profile', userProfile);
  applyUserTheme();
  if(typeof updateAuthUI === 'function') updateAuthUI();
  closeProfileModal();
  const lang = userProfile.lang || 'ar';
  const t = I18N[lang] || I18N.ar;
  showCompletionToast(t.profileSaved, true);
}

/* ---- Theme Modal ---- */
function openThemeModal(){
  renderThemePalette();
  $('customColorPicker').value = userProfile.bg;
  $('themeModal').style.display='flex';
}
function closeThemeModal(){ $('themeModal').style.display='none'; }

function renderThemePalette(){
  const lang = userProfile.lang || 'ar';
  $('themePalette').innerHTML = THEME_PALETTES.map(palette=>{
    const name = lang === 'en' ? (palette.nameEn || palette.name) : palette.name;
    return `
    <div onclick="applyBgColor('${palette.bg}')" title="${name}" style="
      height:58px; border-radius:12px; background:${palette.bg};
      border:2.5px solid ${userProfile.bg===palette.bg ? '#4A8FD4' : 'transparent'};
      cursor:pointer; display:flex; align-items:center; justify-content:center;
      font-size:10.5px; font-weight:700; color:${isDarkColor(palette.bg)?'#fff':'#4A3350'};
      box-shadow:0 3px 10px rgba(0,0,0,0.1);
      transition:transform .15s, border-color .15s;
      text-align:center; padding:0 4px; line-height:1.3;">
      ${name}
    </div>`;
  }).join('');
}

/* ============ QUOTES ENGINE ============ */
const GENERAL_QUOTES_AR = [
  { q: 'النجاح ليس النهاية، والفشل ليس قاتلاً: الشجاعة لمواصلة الطريق هي ما يهم.', by: 'وينستون تشرشل' },
  { q: 'الطريقة الوحيدة لعمل أشياء عظيمة هي أن تحب ما تفعله.', by: 'ستيف جوبز' },
  { q: 'لا تخف من التنازل عن الجيد من أجل العظيم.', by: 'جون روكفلر' },
  { q: 'التعليم هو أقوى سلاح يمكنك استخدامه لتغيير العالم.', by: 'نيلسون مانديلا' },
  { q: 'السر في المضي قدماً هو البدء.', by: 'مارك توين' },
  { q: 'صدق أنك تستطيع، وستكون في منتصف الطريق.', by: 'ثيودور روزفلت' },
  { q: 'لا تتوقف عندما تتعب، توقف عندما تنتهي.', by: 'مارلين مونرو' },
  { q: 'الأشياء العظيمة لا تأتي من مناطق الراحة.', by: 'نيل آرمسترونغ' },
  { q: 'كل خبير كان يوماً مبتدئاً.', by: 'هيلين هايز' },
  { q: 'المستقبل يعتمد على ما تفعله اليوم.', by: 'مهاتما غاندي' },
  { q: 'ليس المهم مدى بطئك طالما أنك لا تتوقف.', by: 'كونفوشيوس' },
  { q: 'الاستثمار في المعرفة يدفع أفضل الفوائد.', by: 'بنجامين فرانكلين' },
  { q: 'قطرة المطر تحفر في الصخر، ليس بالعنف ولكن بالتكرار.', by: 'لوكريتيوس' },
  { q: 'أكبر ضعف لنا يكمن في الاستسلام. أضمن طريقة للنجاح هي المحاولة مرة أخرى.', by: 'توماس إديسون' },
  { q: 'الوقت الذي تستمتع بإضاعته ليس وقتاً ضائعاً، ولكن وقت المذاكرة لا يعوض.', by: 'بيرتراند راسل' },
  { q: 'ابدأ من حيث أنت. استخدم ما لديك. افعل ما تستطيع.', by: 'آرثر آش' },
  { q: 'اجتهد في الصمت، ودع النجاح يصنع الضجيج.', by: 'فرانك أوشن' },
  { q: 'العقل ليس وعاء يجب ملؤه، بل نار يجب إشعالها.', by: 'بلوتارخ' },
  { q: 'كل إنجاز عظيم يبدأ بقرار المحاولة.', by: 'جون كينيدي' },
  { q: 'الصبر مر، ولكن ثماره حلوة.', by: 'أرسطو' },
  { q: 'الفشل هو فرصة للبدء من جديد بذكاء أكبر.', by: 'هنري فورد' },
  { q: 'التعلم لا يرهق العقل أبداً.', by: 'ليوناردو دا فينشي' },
  { q: 'الجهد المتواصل، وليس القوة أو الذكاء، هو مفتاح إطلاق قدراتنا.', by: 'وينستون تشرشل' },
  { q: 'عليك أن تفعل الأشياء التي تعتقد أنك لا تستطيع فعلها.', by: 'إليانور روزفلت' },
  { q: 'الجذور الخاصة بالتعليم مريرة، لكن الثمرة حلوة.', by: 'أرسطو' },
  { q: 'لا تدع الأمس يستهلك الكثير من اليوم.', by: 'ويل روجرز' },
  { q: 'الشخص الذي لا يقرأ ليس لديه ميزة على الشخص الذي لا يستطيع القراءة.', by: 'مارك توين' },
  { q: 'الفرق بين الممكن والمستحيل يكمن في تصميم الشخص.', by: 'تومي لاسوردا' },
  { q: 'نحن ما نفعله مراراً وتكراراً. التميز إذن ليس فعلاً، بل عادة.', by: 'أرسطو' },
  { q: 'الأحلام لا تتحقق بالسحر، بل تحتاج إلى عرق، وتصميم، وعمل جاد.', by: 'كولن باول' },
  { q: 'في كل صعوبة تكمن فرصة.', by: 'ألبرت أينشتاين' },
  { q: 'الطريقة الأفضل للتنبؤ بالمستقبل هي اختراعه.', by: 'آلان كاي' },
  { q: 'كلما زادت قراءتك، زادت الأشياء التي ستعرفها.', by: 'دكتور سوس' },
  { q: 'قليل من التقدم كل يوم يضيف إلى نتائج كبيرة.', by: 'لاو تسو' },
  { q: 'من لم يذق مر التعلم ساعة، تجرع ذل الجهل طوال حياته.', by: 'الإمام الشافعي' },
  { q: 'التعليم جواز السفر إلى المستقبل.', by: 'مالكولم إكس' },
  { q: 'الرجل الحكيم سيبتكر فرصاً أكثر مما يجد.', by: 'فرانسيس بيكون' },
  { q: 'لا توجد طرق مختصرة لأي مكان يستحق الذهاب إليه.', by: 'بيفرلي سيلز' },
  { q: 'رحلة الألف ميل تبدأ بخطوة.', by: 'لاو تسو' },
  { q: 'المعرفة قوة.', by: 'فرانسيس بيكون' },
  { q: 'العمل الشاق يتغلب على الموهبة عندما لا تعمل الموهبة بجد.', by: 'تيم نوتكي' },
  { q: 'من جد وجد، ومن زرع حصد.', by: 'مثل عربي' },
  { q: 'العوائق هي تلك الأشياء المخيفة التي تراها عندما ترفع عينيك عن هدفك.', by: 'هنري فورد' },
  { q: 'اجعل من حياتك رسالة، لا مجرد قصة.', by: 'أوليفر هولمز' },
  { q: 'النجاح يولد من رحم الفشل.', by: 'رالف والدو إمرسون' },
  { q: 'العبقرية هي 1% إلهام و 99% عرق.', by: 'توماس إديسون' },
  { q: 'إذا كان بإمكانك تخيله، يمكنك تحقيقه.', by: 'والت ديزني' },
  { q: 'تذكر أن الفشل هو مجرد حدث، وليس شخصاً.', by: 'زيج زيجلار' },
  { q: 'النجاح هو المضي من فشل إلى فشل دون فقدان الحماس.', by: 'وينستون تشرشل' },
  { q: 'المستحيل كلمة موجودة فقط في قاموس الحمقى.', by: 'نابليون بونابرت' }
];

const GENERAL_QUOTES_EN = [
  { q: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', by: 'Winston Churchill' },
  { q: 'The only way to do great work is to love what you do.', by: 'Steve Jobs' },
  { q: 'Don\'t be afraid to give up the good to go for the great.', by: 'John D. Rockefeller' },
  { q: 'Education is the most powerful weapon which you can use to change the world.', by: 'Nelson Mandela' },
  { q: 'The secret of getting ahead is getting started.', by: 'Mark Twain' },
  { q: 'Believe you can and you\'re halfway there.', by: 'Theodore Roosevelt' },
  { q: 'Don\'t stop when you\'re tired. Stop when you\'re done.', by: 'Marilyn Monroe' },
  { q: 'Great things never come from comfort zones.', by: 'Neil Armstrong' },
  { q: 'Every expert was once a beginner.', by: 'Helen Hayes' },
  { q: 'The future depends on what you do today.', by: 'Mahatma Gandhi' },
  { q: 'It does not matter how slowly you go as long as you do not stop.', by: 'Confucius' },
  { q: 'An investment in knowledge pays the best interest.', by: 'Benjamin Franklin' },
  { q: 'A drop of water hollows out stone, not by force, but by falling often.', by: 'Lucretius' },
  { q: 'Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.', by: 'Thomas A. Edison' },
  { q: 'Time you enjoy wasting is not wasted time, but study time is irreplaceable.', by: 'Bertrand Russell' },
  { q: 'Start where you are. Use what you have. Do what you can.', by: 'Arthur Ashe' },
  { q: 'Work hard in silence, let your success be your noise.', by: 'Frank Ocean' },
  { q: 'The mind is not a vessel to be filled, but a fire to be kindled.', by: 'Plutarch' },
  { q: 'Every great achievement begins with the decision to try.', by: 'John F. Kennedy' },
  { q: 'Patience is bitter, but its fruit is sweet.', by: 'Aristotle' },
  { q: 'Failure is the opportunity to begin again more intelligently.', by: 'Henry Ford' },
  { q: 'Learning never exhausts the mind.', by: 'Leonardo da Vinci' },
  { q: 'Continuous effort, not strength or intelligence, is the key to unlocking our potential.', by: 'Winston Churchill' },
  { q: 'You must do the things you think you cannot do.', by: 'Eleanor Roosevelt' },
  { q: 'The roots of education are bitter, but the fruit is sweet.', by: 'Aristotle' },
  { q: 'Do not let yesterday take up too much of today.', by: 'Will Rogers' },
  { q: 'The man who does not read has no advantage over the man who cannot read.', by: 'Mark Twain' },
  { q: 'The difference between the impossible and the possible lies in a person\'s determination.', by: 'Tommy Lasorda' },
  { q: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', by: 'Aristotle' },
  { q: 'A dream doesn\'t become reality through magic; it takes sweat, determination and hard work.', by: 'Colin Powell' },
  { q: 'In the middle of every difficulty lies opportunity.', by: 'Albert Einstein' },
  { q: 'The best way to predict the future is to invent it.', by: 'Alan Kay' },
  { q: 'The more that you read, the more things you will know.', by: 'Dr. Seuss' },
  { q: 'A little progress each day adds up to big results.', by: 'Lao Tzu' },
  { q: 'Whoever does not taste the bitterness of learning for an hour, will swallow the humiliation of ignorance for a lifetime.', by: "Imam Al-Shafi'i" },
  { q: 'Education is the passport to the future.', by: 'Malcolm X' },
  { q: 'A wise man will make more opportunities than he finds.', by: 'Francis Bacon' },
  { q: 'There are no shortcuts to any place worth going.', by: 'Beverly Sills' },
  { q: 'A journey of a thousand miles begins with a single step.', by: 'Lao Tzu' },
  { q: 'Knowledge is power.', by: 'Francis Bacon' },
  { q: 'Hard work beats talent when talent doesn\'t work hard.', by: 'Tim Notke' },
  { q: 'Whoever strives finds, and whoever sows reaps.', by: 'Arabic Proverb' },
  { q: 'Obstacles are those frightful things you see when you take your eyes off your goal.', by: 'Henry Ford' },
  { q: 'Make your life a mission - not an intermission.', by: 'Oliver Holmes' },
  { q: 'Success is born out of failure.', by: 'Ralph Waldo Emerson' },
  { q: 'Genius is 1% inspiration and 99% perspiration.', by: 'Thomas Edison' },
  { q: 'If you can dream it, you can do it.', by: 'Walt Disney' },
  { q: 'Remember that failure is an event, not a person.', by: 'Zig Ziglar' },
  { q: 'Success is going from failure to failure without losing your enthusiasm.', by: 'Winston Churchill' },
  { q: 'Impossible is a word to be found only in the dictionary of fools.', by: 'Napoleon Bonaparte' }
];

let bannerQuoteIdx = -1;

function showNextBannerQuote(random = false){
  const spec = SPECIALIZATIONS[userProfile.spec] || SPECIALIZATIONS.medicine;
  const lang = userProfile.lang || 'ar';
  let specQuotes = (lang === 'en' && spec.quotesEn && spec.quotesEn.length) ? spec.quotesEn : spec.quotes;
  let generalQuotes = (lang === 'en') ? GENERAL_QUOTES_EN : GENERAL_QUOTES_AR;
  
  // Combine them!
  let allQuotes = [...specQuotes, ...generalQuotes];

  if(random){
    bannerQuoteIdx = Math.floor(Math.random()*allQuotes.length);
  } else {
    bannerQuoteIdx = (bannerQuoteIdx + 1) % allQuotes.length;
  }
  const q = allQuotes[bannerQuoteIdx] || allQuotes[0];
  $('quoteIcon').textContent = spec.icon || '💡';
  $('quoteText').textContent = '"' + q.q + '"';
  $('quoteAuthor').textContent = '— ' + q.by;
}

let toastTimer = null;
function showCompletionToast(headline, isProfile){
  const existing = document.querySelector('.quote-toast');
  if(existing && existing.classList){ existing.classList.add('hiding'); setTimeout(()=>existing.remove(), 350); }
  if(toastTimer) clearTimeout(toastTimer);

  const spec = SPECIALIZATIONS[userProfile.spec] || SPECIALIZATIONS.medicine;
  const lang = userProfile.lang || 'ar';
  const quotes = (lang === 'en' && spec.quotesEn && spec.quotesEn.length) ? spec.quotesEn : spec.quotes;
  const q = quotes[Math.floor(Math.random()*quotes.length)] || quotes[0];

  const toast = document.createElement('div');
  toast.className = 'quote-toast';
  toast.innerHTML = `
    <div class="quote-toast-icon">${isProfile ? '✅' : spec.icon}</div>
    <div class="quote-toast-body">
      <div class="quote-toast-headline">${headline || 'أحسنت! إنجاز رائع 🎯'}</div>
      <div class="quote-toast-quote">"${q.q}"</div>
      <div class="quote-toast-author">— ${q.by}</div>
    </div>
    <button class="quote-toast-close" onclick="this.closest('.quote-toast').classList.add('hiding'); setTimeout(()=>this.closest('.quote-toast').remove(),350)">✕</button>
  `;
  document.body.appendChild(toast);
  toastTimer = setTimeout(()=>{
    toast.classList.add('hiding');
    setTimeout(()=>toast.remove(), 380);
  }, 7000);
}

$('todayChip').textContent = new Date().toLocaleDateString('ar-EG', {weekday:'long', year:'numeric', month:'long', day:'numeric'});

/* ============ Supabase Cloud & Auth Engine ============ */
const SUPABASE_URL = "https://tmuwrsxphiqqxumslxmt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtdXdyc3hwaGlxcXh1bXNseG10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzOTA5OTEsImV4cCI6MjEwNjk2Njk5MX0.mVvakVwxLEUMlZEx79edFjhTS1R-GqTowX8xasHMobA";

var sbClient = null;
let currentUserId = null;
let currentUserEmail = null;

function openCloudModal(){ $('cloudModal').style.display = 'flex'; }
function closeCloudModal(){ $('cloudModal').style.display = 'none'; }

function initSupabase(){
  if(typeof window.supabase === 'undefined' || !window.supabase.createClient){
    setTimeout(initSupabase, 300);
    return;
  }
  if(sbClient) return;
  try {
    sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("🟢 Supabase client connected successfully!");

    // Check active session on load
    sbClient.auth.getSession().then(({ data }) => {
      if(data && data.session) handleSupabaseAuthState('INITIAL_SESSION', data.session);
    }).catch(e => console.warn('Get session notice:', e));

    // Listen to Auth state changes
    sbClient.auth.onAuthStateChange((event, session) => {
      handleSupabaseAuthState(event, session);
    });

    updateCloudUI();
  } catch(err){
    console.warn("Supabase Init notice:", err);
    setTimeout(initSupabase, 1000);
  }
}

function handleSupabaseAuthState(event, session){
  const user = session ? session.user : null;
  if(user){
    currentUserId = user.id;
    currentUserEmail = user.email || '';
    console.log("👤 Supabase user signed in:", currentUserEmail, currentUserId);
    updateAuthUI();
    loadUserDataFromSupabase();
    closeAuthScreen();
  } else {
    currentUserId = null;
    currentUserEmail = null;
    console.log("👤 Supabase user signed out");
    updateAuthUI();
  }
}

function updateAuthUI(){
  const lang = userProfile.lang || 'ar';
  const userBtn = $('userAuthBtn');
  const logoutBtn = $('logoutBtn');
  if(userBtn){
    if(currentUserEmail){
      userBtn.style.display = 'none';
    } else {
      userBtn.style.display = 'inline-block';
      userBtn.innerHTML = (lang === 'en' ? '🔐 Sign In' : '🔐 تسجيل الدخول');
      userBtn.title = '';
    }
  }
  if(logoutBtn){
    logoutBtn.style.display = currentUserId ? 'inline-block' : 'none';
  }
}

/* ---- Auth UI Controllers ---- */
function openAuthScreen(){
  const sc = $('authScreen');
  if(sc) sc.classList.add('active');
  authClearErrors();
}

function closeAuthScreen(){
  const sc = $('authScreen');
  if(sc) sc.classList.remove('active');
  authClearErrors();
}

function authShowLogin(){
  $('authLoginForm').style.display = 'block';
  $('authRegisterForm').style.display = 'none';
  authClearErrors();
}

function authShowRegister(){
  $('authLoginForm').style.display = 'none';
  $('authRegisterForm').style.display = 'block';
  authClearErrors();
}

function authClearErrors(){
  const e1 = $('authLoginError');
  const e2 = $('authRegError');
  if(e1){ e1.style.display = 'none'; e1.textContent = ''; }
  if(e2){ e2.style.display = 'none'; e2.textContent = ''; }
}

function formatAuthError(err){
  const lang = userProfile.lang || 'ar';
  const msg = (err && err.message) ? err.message.toLowerCase() : '';
  const code = (err && err.code) ? String(err.code).toLowerCase() : '';
  if(msg.includes('invalid login credentials') || msg.includes('invalid credentials')) {
    return (lang === 'en' ? 'Incorrect email or password' : 'البريد الإلكتروني أو كلمة المرور غير صحيحة');
  }
  if(msg.includes('user already registered') || msg.includes('already registered')) {
    return (lang === 'en' ? 'This email is already registered. Please sign in.' : 'هذا البريد الإلكتروني مسجل بالفعل، يمكنك تسجيل الدخول به');
  }
  if(msg.includes('password should be at least 6 characters') || msg.includes('weak_password')) {
    return (lang === 'en' ? 'Password should be at least 6 characters' : 'كلمة المرور يجب ألا تقل عن 6 أحرف');
  }
  if(msg.includes('valid email') || msg.includes('invalid format') || msg.includes('email address') || code.includes('email_address_invalid')) {
    return (lang === 'en' ? 'Invalid email format — please check your email address' : 'صيغة البريد الإلكتروني غير صحيحة — تأكد من كتابته صح');
  }
  if(msg.includes('rate limit') || msg.includes('over_email_send') || code.includes('over_email_send_rate_limit') || msg.includes('429')) {
    return (lang === 'en'
      ? '⏳ Too many emails were sent recently. Please wait 1-2 minutes and try again.'
      : '⏳ تم إرسال كثير من رسائل التأكيد مؤخراً. انتظر دقيقة أو دقيقتين ثم حاول مجدداً.');
  }
  if(msg.includes('email not confirmed') || msg.includes('email_not_confirmed')) {
    return (lang === 'en'
      ? '📬 Please confirm your email first — check your inbox (and spam folder).'
      : '📬 يرجى تأكيد بريدك الإلكتروني أولاً — تفقد البريد الوارد وبريد Spam.');
  }
  if(msg.includes('signup disabled') || msg.includes('signup is disabled')) {
    return (lang === 'en' ? 'New sign ups are currently disabled.' : 'إنشاء الحسابات الجديدة معطّل حالياً.');
  }
  return (err && err.message) || (lang === 'en' ? 'Authentication error occurred' : 'حدث خطأ أثناء المصادقة');
}

async function authSignIn(){
  const email = ($('authLoginEmail').value || '').trim();
  const pass = ($('authLoginPassword').value || '');
  const errEl = $('authLoginError');
  const btn = $('authLoginBtn');
  const lang = userProfile.lang || 'ar';

  if(!email || !pass){
    errEl.textContent = (lang === 'en' ? 'Please enter your email and password' : 'يرجى كتابة البريد الإلكتروني وكلمة المرور');
    errEl.style.display = 'block';
    return;
  }

  btn.disabled = true;
  btn.textContent = (lang === 'en' ? 'Signing in...' : 'جاري الدخول...');

  try {
    if(!sbClient) throw new Error("Supabase is not loaded yet");
    const { data, error } = await sbClient.auth.signInWithPassword({
      email: email,
      password: pass
    });
    if(error) throw error;

    closeAuthScreen();
    showCompletionToast(lang === 'en' ? 'Welcome back! Signed in successfully ✨' : 'مرحباً بك! تم تسجيل الدخول بنجاح ✨', true);
  } catch(err){
    errEl.textContent = formatAuthError(err);
    errEl.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.textContent = (lang === 'en' ? 'Sign In 🚀' : 'دخول 🚀');
  }
}

async function authSignUp(){
  const email = ($('authRegEmail').value || '').trim();
  const pass = ($('authRegPassword').value || '');
  const pass2 = ($('authRegPassword2').value || '');
  const errEl = $('authRegError');
  const btn = $('authRegBtn');
  const lang = userProfile.lang || 'ar';

  if(!email || !pass || !pass2){
    errEl.textContent = (lang === 'en' ? 'Please fill in all fields' : 'يرجى ملء جميع الحقول المطلوبة');
    errEl.style.display = 'block';
    return;
  }
  if(pass.length < 6){
    errEl.textContent = (lang === 'en' ? 'Password must be at least 6 characters' : 'كلمة المرور يجب ألا تقل عن 6 أحرف');
    errEl.style.display = 'block';
    return;
  }
  if(pass !== pass2){
    errEl.textContent = (lang === 'en' ? 'Passwords do not match' : 'كلمتا المرور غير متطابقتين');
    errEl.style.display = 'block';
    return;
  }

  btn.disabled = true;
  btn.textContent = (lang === 'en' ? 'Creating account...' : 'جاري إنشاء الحساب...');

  try {
    if(!sbClient) throw new Error("Supabase is not loaded yet");
    const { data, error } = await sbClient.auth.signUp({
      email: email,
      password: pass,
      options: {
        data: { name: userProfile.name || '' }
      }
    });
    if(error) throw error;

    // Check if email confirmation is required
    if(data && data.user && !data.session){
      alert(lang === 'en' 
        ? '🎉 Account created! A confirmation email has been sent. Please check your inbox to sign in.' 
        : '🎉 تم إنشاء الحساب! تم إرسال رابط تأكيد إلى بريدك الإلكتروني. تفقد بريدك لتأكيد الحساب والدخول.');
      closeAuthScreen();
      return;
    }

    closeAuthScreen();
    showCompletionToast(lang === 'en' ? 'Account created! Your data is saved on your account 🎉' : 'تم إنشاء حسابك وحفظ بياناتك عليه بنجاح 🎉', true);
  } catch(err){
    errEl.textContent = formatAuthError(err);
    errEl.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.textContent = (lang === 'en' ? 'Create Account 🎉' : 'إنشاء الحساب 🎉');
  }
}

async function authSignOut(){
  const lang = userProfile.lang || 'ar';
  const confirmMsg = (lang === 'en' ? 'Are you sure you want to sign out?' : 'هل أنت متأكد من تسجيل الخروج؟');
  if(!confirm(confirmMsg)) return;

  try {
    if(sbClient) await sbClient.auth.signOut();
    // Reset active memory data
    todos = [];
    dayColors = {};
    boxes = [];
    connections = [];
    completedItems = {};
    folders = [];
    ytPlaylists = [];
    cloudFiles = [];
    renderTodos();
    renderCalendar();
    renderBurnout();
    renderYtPlaylists();
    SECTIONS.forEach(renderFolders);
    SECTIONS.forEach(renderFileSection);

    showCompletionToast(lang === 'en' ? 'Signed out successfully 👋' : 'تم تسجيل الخروج بنجاح 👋', true);
    openAuthScreen();
  } catch(err){
    console.warn('Sign out error:', err);
  }
}

async function authForgotPassword(){
  const lang = userProfile.lang || 'ar';
  const emailInput = ($('authLoginEmail').value || '').trim();
  const targetEmail = emailInput || prompt(lang === 'en' ? 'Enter your email to receive password reset link:' : 'اكتب بريدك الإلكتروني لإرسال رابط إعادة تعيين كلمة المرور:');
  if(!targetEmail) return;

  try {
    if(!sbClient) throw new Error("Supabase is not initialized");
    const { error } = await sbClient.auth.resetPasswordForEmail(targetEmail.trim());
    if(error) throw error;
    alert(lang === 'en' ? 'Password reset link sent to your email ✉️' : 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني ✉️');
  } catch(err){
    alert(formatAuthError(err));
  }
}

function updateCloudUI(){
  const statusEl = $('cloudDbStatus');
  if(statusEl){
    statusEl.textContent = 'Supabase متصل ومفعل 🟢';
    statusEl.style.color = 'var(--mint)';
  }
}

/* ---- Upload Files via Cloudinary (Central Cloud Storage) ---- */
const CLOUDINARY_CLOUD = 'dzdgc7bc';
const CLOUDINARY_PRESET = 'q5a3pz3j';

function uploadWithXHR(url, form){
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText);
        resolve(data);
      } catch(err){ reject(err); }
    };
    xhr.onerror = () => reject(new Error('CORS / Network Error'));
    xhr.send(form);
  });
}

async function uploadToDrive(file){
  const resourceType = (file.type && file.type.startsWith('image/')) ? 'image' : 'raw';
  const endpoints = [
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/${resourceType}/upload`,
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/auto/upload`
  ];

  window._lastUploadError = '';

  for(const endpoint of endpoints){
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('upload_preset', CLOUDINARY_PRESET);

      let data = null;
      try {
        const res = await fetch(endpoint, { method: 'POST', body: form });
        data = await res.json();
      } catch(fetchErr){
        data = await uploadWithXHR(endpoint, form);
      }

      if(data && data.secure_url){
        console.log('✅ Uploaded to Cloudinary:', data.secure_url);
        return {
          driveId: data.public_id,
          driveUrl: data.secure_url,
          webViewLink: data.secure_url
        };
      } else if(data && data.error && data.error.message){
        window._lastUploadError = data.error.message;
        console.warn('Cloudinary Detail:', data.error.message);
      }
    } catch(e){
      window._lastUploadError = e.message || 'Network error';
      console.warn('Cloudinary fetch error:', endpoint, e);
    }
  }
  return null;
}

/* ---- Clean Reset Engine ---- */
async function resetAllData(){
  const lang = userProfile.lang || 'ar';
  const confirmMsg = lang === 'en' 
    ? "⚠️ Are you sure you want to clear all your tasks, files and notes from this account?" 
    : "⚠️ هل أنت متأكد من مسح جميع بياناتك وملفاتك وقوائمك من هذا الحساب للبدء من جديد؟";
  if(!confirm(confirmMsg)) return;

  if(sbClient && currentUserId){
    try {
      await sbClient.from('user_data').delete().eq('user_id', currentUserId);
      await sbClient.from('user_files').delete().eq('user_id', currentUserId);
    } catch(err){
      console.warn("Supabase reset error:", err);
    }
  }

  // Clear LocalStorage & reload
  localStorage.clear();
  if(indexedDB){
    try { indexedDB.deleteDatabase('petalPlannerDB'); } catch(e){}
  }

  alert("✨ تم مسح بيانات حسابك بنجاح! سيعاد تحميل الصفحة الآن.");
  location.reload();
}

/* ---- Per-User Cloud Realtime Sync (Supabase) ---- */
async function syncStateToCloud(collectionName, data){
  if(!currentUserId) return;
  // 1. Cache in localStorage keyed by user
  try {
    localStorage.setItem(`rafeeq_user_${currentUserId}_${collectionName}`, JSON.stringify(data));
  } catch(e){}

  // 2. Sync to Supabase user_data table
  if(sbClient){
    try {
      await sbClient.from('user_data').upsert({
        user_id: currentUserId,
        collection: collectionName,
        payload: JSON.stringify(data),
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id,collection' });
    } catch(e){
      console.warn("Supabase sync notice:", collectionName, e);
    }
  }
}

async function loadUserDataFromSupabase(){
  if(!currentUserId || !sbClient) return;

  // 1. Load user profile from Supabase user metadata if available
  try {
    const { data: { user } } = await sbClient.auth.getUser();
    if(user && user.user_metadata && user.user_metadata.profile){
      userProfile = { ...userProfile, ...user.user_metadata.profile };
      save('userProfile_v2', userProfile);
      applyUserTheme();
      applyLang(userProfile.lang || 'ar', false);
      updateAuthUI();
    }
  } catch(e){}

  // 2. Fetch from Supabase table
  try {
    const { data, error } = await sbClient
      .from('user_data')
      .select('collection, payload')
      .eq('user_id', currentUserId);

    if(data && data.length){
      data.forEach(row => {
        try {
          const parsed = JSON.parse(row.payload);
          const col = row.collection;
          if(col === 'todos') { todos = parsed; renderTodos(); }
          if(col === 'calendar') { dayColors = parsed; renderCalendar(); }
          if(col === 'burnout') { boxes = parsed.boxes||[]; connections = parsed.conns||[]; renderBurnout(); }
          if(col === 'completedItems') { completedItems = parsed; SECTIONS.forEach(renderFileSection); }
          if(col === 'folders') { folders = parsed; SECTIONS.forEach(renderFolders); SECTIONS.forEach(renderFileSection); }
          if(col === 'ytPlaylists') { ytPlaylists = parsed; renderYtPlaylists(); }
          if(col === 'profile') {
            userProfile = { ...userProfile, ...parsed };
            save('userProfile_v2', userProfile);
            applyUserTheme();
            applyLang(userProfile.lang || 'ar', false);
            updateAuthUI();
          }
        } catch(err){}
      });
    } else {
      migrateLocalDataToAccount();
    }
  } catch(err){
    console.warn("Supabase load notice:", err);
    migrateLocalDataToAccount();
  }

  // 3. Load user files
  loadUserFilesFromSupabase();
}

function migrateLocalDataToAccount(){
  if(!currentUserId) return;
  const cols = ['todos', 'calendar', 'burnout', 'completedItems', 'folders', 'ytPlaylists', 'profile'];
  cols.forEach(col => {
    const cached = localStorage.getItem(`rafeeq_user_${currentUserId}_${col}`);
    if(cached){
      try {
        const parsed = JSON.parse(cached);
        if(col === 'todos') { todos = parsed; renderTodos(); }
        if(col === 'calendar') { dayColors = parsed; renderCalendar(); }
        if(col === 'burnout') { boxes = parsed.boxes||[]; connections = parsed.conns||[]; renderBurnout(); }
        if(col === 'completedItems') { completedItems = parsed; SECTIONS.forEach(renderFileSection); }
        if(col === 'folders') { folders = parsed; SECTIONS.forEach(renderFolders); SECTIONS.forEach(renderFileSection); }
        if(col === 'ytPlaylists') { ytPlaylists = parsed; renderYtPlaylists(); }
      } catch(e){}
    } else {
      let current = null;
      if(col === 'todos') current = todos;
      if(col === 'calendar') current = dayColors;
      if(col === 'burnout') current = {boxes, conns:connections};
      if(col === 'completedItems') current = completedItems;
      if(col === 'folders') current = folders;
      if(col === 'ytPlaylists') current = ytPlaylists;
      if(col === 'profile') current = userProfile;
      if(current && (Array.isArray(current) ? current.length : Object.keys(current).length)){
        syncStateToCloud(col, current);
      }
    }
  });
}

/* ---- User Files Sync (Supabase) ---- */
let cloudFiles = [];
async function loadUserFilesFromSupabase(){
  if(!currentUserId || !sbClient) return;
  try {
    const { data, error } = await sbClient
      .from('user_files')
      .select('*')
      .eq('user_id', currentUserId)
      .order('date', { ascending: false });

    if(data && !error){
      cloudFiles = data.map(f => ({
        id: f.id,
        name: f.name,
        type: f.type,
        size: f.size,
        section: f.section,
        folderId: f.folder_id,
        cloudUrl: f.cloud_url,
        publicId: f.public_id,
        date: f.date
      }));
      loadAllFiles();
    }
  } catch(err){
    console.warn("User files load notice:", err);
  }
}

setTimeout(initSupabase, 200);

/* ============ tabs ============ */
document.querySelectorAll('nav.tabs button').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('nav.tabs button').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('main .panel').forEach(p=>{p.style.display='none'; p.classList.remove('enter');});
    btn.classList.add('active');
    const p = $('panel-'+btn.dataset.tab);
    p.style.display='block';
    requestAnimationFrame(()=>{
      p.classList.add('enter');
      if(btn.dataset.tab === 'burnout'){
        renderBurnout();
        const wrap = $('canvasWrap');
        if(wrap) { wrap.scrollLeft = 0; wrap.scrollTop = 0; }
      }
    });
  });
});


/* ============ IndexedDB (local file storage) ============ */
let db;
const dbReq = indexedDB.open('petalPlannerDB', 2);
dbReq.onupgradeneeded = e => {
  const d = e.target.result;
  if(!d.objectStoreNames.contains('files')){
    const store = d.createObjectStore('files', {keyPath:'id'});
    store.createIndex('section','section',{unique:false});
  }
};
dbReq.onsuccess = e => {
  db = e.target.result;
  try {
    const tx = db.transaction('files', 'readonly');
    const store = tx.objectStore('files');
    const req = store.getAll();
    req.onsuccess = ev => {
      const allFiles = ev.target.result || [];
      allFiles.forEach(item => {
        if(item && item.id && item.blob){
          localFileBlobs.set(item.id, item.blob);
        }
      });
    };
  } catch(err){}
};

/* ---- generic file sections (summaries / midterm / final / quizzes / explanation) ---- */
const SECTIONS = ['summaries','midterm','final','quizzes','explanation'];
const SECTION_PREFIX = {summaries:'sum', midterm:'mid', final:'fin', quizzes:'qz', explanation:'exp'};
let filesBySection = {summaries:[], midterm:[], final:[], quizzes:[], explanation:[]};

/* ---- folders (custom sub-sections inside each section) ---- */
let folders = load('folders', []); // {id, section, name}
let activeFolder = load('activeFolder', {summaries:null, midterm:null, final:null, quizzes:null, explanation:null});

function renderFolders(section){
  const prefix = SECTION_PREFIX[section];
  const container = $(prefix+'-folders');
  if(!container) return;
  const secFolders = folders.filter(f=>f.section===section);
  const active = activeFolder[section];
  const lang = userProfile.lang || 'ar';
  const t = I18N[lang] || I18N.ar;
  container.innerHTML = `
    <div class="folder-chip ${active===null?'active':''}" onclick="setActiveFolder('${section}', null)">${t.allFolder}</div>
    ${secFolders.map(f=>`
      <div class="folder-chip ${active===f.id?'active':''}" onclick="setActiveFolder('${section}','${f.id}')">
        ${esc(f.name)}<span class="folder-del" onclick="event.stopPropagation(); deleteFolder('${f.id}','${section}')">×</span>
      </div>`).join('')}
    <div class="folder-chip add" onclick="promptAddFolder('${section}')">${t.newFolderBtn}</div>
  `;
}
function setActiveFolder(section, id){
  activeFolder[section] = id;
  renderFolders(section);
  renderFileSection(section);
  if(section === 'explanation') renderYtPlaylists();
}
function promptAddFolder(section){
  const lang = userProfile.lang || 'ar';
  const t = I18N[lang] || I18N.ar;
  const name = prompt(t.folderPrompt);
  if(!name || !name.trim()) return;
  folders.push({id:uid(), section, name:name.trim()});
  syncStateToCloud('folders', folders);
  renderFolders(section);
}
function deleteFolder(id, section){
  const lang = userProfile.lang || 'ar';
  const t = I18N[lang] || I18N.ar;
  if(!confirm(t.folderDeleteConfirm)) return;
  folders = folders.filter(f=>f.id!==id);
  syncStateToCloud('folders', folders);
  if(activeFolder[section] === id){ activeFolder[section] = null; }

  // Update cloud files that belonged to this folder
  cloudFiles.forEach(f => {
    if(f.folderId === id) f.folderId = null;
  });
  if(sbClient && currentUserId){
    sbClient.from('user_files').update({ folder_id: null }).eq('folder_id', id).eq('user_id', currentUserId).catch(e=>{});
  }
  loadAllFiles(); renderFolders(section);
}

let savedLocalFiles = load('rafeeq_saved_files_v1', []);
const localFileBlobs = new Map();

function loadAllFiles(){
  filesBySection = {summaries:[], midterm:[], final:[], quizzes:[], explanation:[]};

  const combined = [];
  const seenIds = new Set();

  (savedLocalFiles || []).forEach(f => {
    if(f && f.id && !seenIds.has(f.id)){
      seenIds.add(f.id);
      combined.push(f);
    }
  });

  (cloudFiles || []).forEach(f => {
    if(f && f.id){
      if(!seenIds.has(f.id)){
        seenIds.add(f.id);
        combined.push(f);
      } else {
        const existing = combined.find(x => x.id === f.id);
        if(existing && f.cloudUrl) existing.cloudUrl = f.cloudUrl;
      }
    }
  });

  combined.forEach(f => {
    const fileUrl = f.url || f.cloudUrl || '';
    if(f.section && filesBySection[f.section]){
      filesBySection[f.section].push({ ...f, url: fileUrl });
    }
  });

  SECTIONS.forEach(renderFileSection);
}

function addFiles(section, fileList){
  const folderId = activeFolder[section] || null;
  const filesArray = Array.from(fileList);

  filesArray.forEach(f => {
    const fileId = uid();
    localFileBlobs.set(fileId, f);

    const fileRecord = {
      id: fileId,
      section,
      folderId,
      name: f.name,
      type: f.type || 'application/octet-stream',
      size: f.size,
      cloudUrl: '',
      url: '',
      uploading: true,
      date: Date.now()
    };

    savedLocalFiles.unshift(fileRecord);
    save('rafeeq_saved_files_v1', savedLocalFiles);

    if(db){
      try {
        const tx = db.transaction('files', 'readwrite');
        tx.objectStore('files').put({ id: fileId, name: f.name, type: f.type, size: f.size, blob: f, date: fileRecord.date });
      } catch(e){}
    }

    loadAllFiles();

    // Background upload to Cloudinary then save to Supabase
    uploadToDrive(f).then(driveData => {
      fileRecord.uploading = false;
      if(driveData && driveData.driveUrl){
        fileRecord.cloudUrl = driveData.driveUrl;
        fileRecord.publicId = driveData.driveId || null;
        fileRecord.url = driveData.driveUrl;
        save('rafeeq_saved_files_v1', savedLocalFiles);

        if(sbClient && currentUserId){
          sbClient.from('user_files').upsert({
            id: fileId,
            user_id: currentUserId,
            name: f.name,
            type: f.type || 'application/octet-stream',
            size: f.size,
            section: section,
            folder_id: folderId || null,
            cloud_url: driveData.driveUrl,
            public_id: driveData.driveId || null,
            date: fileRecord.date
          }).catch(e=>{});
        }
      }
      loadAllFiles();
    }).catch(err => {
      console.warn('Upload notice:', err);
      fileRecord.uploading = false;
      loadAllFiles();
    });
  });
}

function deleteFile(id){
  savedLocalFiles = savedLocalFiles.filter(f => f.id !== id);
  save('rafeeq_saved_files_v1', savedLocalFiles);
  cloudFiles = cloudFiles.filter(f => f.id !== id);
  localFileBlobs.delete(id);

  if(db){
    try {
      const tx = db.transaction('files', 'readwrite');
      tx.objectStore('files').delete(id);
    } catch(e){}
  }

  if(sbClient && currentUserId){
    sbClient.from('user_files').delete().eq('id', id).eq('user_id', currentUserId).catch(e=>{});
  }

  loadAllFiles();
}

function closeFilePreviewModal(){
  const m = $('filePreviewModal');
  if(m) m.style.display = 'none';
  const area = $('previewContentArea');
  if(area) area.innerHTML = '';
}

function openFile(id, url, type, name){
  // 1. Check in-memory local blob
  let blob = localFileBlobs.get(id);
  if(blob){
    const blobUrl = URL.createObjectURL(blob);
    showFilePreview(blobUrl, type || blob.type, name || blob.name || '', true);
    return;
  }

  // 2. Check IndexedDB
  if(db){
    try {
      const tx = db.transaction('files', 'readonly');
      const req = tx.objectStore('files').get(id);
      req.onsuccess = e => {
        const item = e.target.result;
        if(item && item.blob){
          localFileBlobs.set(id, item.blob);
          const blobUrl = URL.createObjectURL(item.blob);
          showFilePreview(blobUrl, type || item.type || item.blob.type, name || item.name || (item.blob.name||''), true);
          return;
        }
        fallbackOpenFileUrl(url, type, name);
      };
      req.onerror = () => fallbackOpenFileUrl(url, type, name);
      return;
    } catch(e){}
  }

  fallbackOpenFileUrl(url, type, name);
}

function fallbackOpenFileUrl(url, type, name){
  if(url && !url.startsWith('blob:')){
    showFilePreview(url, type, name, false);
  } else {
    const lang = userProfile.lang || 'ar';
    alert(lang === 'en' ? '⚠️ File content is still uploading or not found. Please try again or re-upload.' : '⚠️ محتوى الملف غير متوفر حالياً أو جاري رفعه. يرجى المحاولة بعد قليل أو إعادة الرفع.');
  }
}

function showFilePreview(fileUrl, type, name, isLocalBlob){
  const modal = $('filePreviewModal');
  const nameEl = $('previewFileName');
  const newTabBtn = $('previewNewTabBtn');
  const dlBtn = $('previewDownloadBtn');
  const area = $('previewContentArea');
  const iconEl = $('previewFileIcon');
  const lang = userProfile.lang || 'ar';

  if(nameEl) nameEl.textContent = name || (lang==='en'?'File':'الملف');
  if(newTabBtn){
    newTabBtn.href = fileUrl;
    newTabBtn.target = '_blank';
    newTabBtn.textContent = (lang==='en'?'New Tab ↗':'نافذة جديدة ↗');
  }
  if(dlBtn){
    dlBtn.href = fileUrl;
    dlBtn.download = name || 'file';
    dlBtn.textContent = (lang==='en'?'Download 📥':'تحميل 📥');
  }

  const isImg = type && type.startsWith('image/');
  const isPdf = (type === 'application/pdf') || (name && name.toLowerCase().endsWith('.pdf')) || (fileUrl && fileUrl.toLowerCase().includes('.pdf'));
  const isVideo = type && type.startsWith('video/');
  const isAudio = type && type.startsWith('audio/');
  const isHtml = (type && type.includes('html')) || (name && name.toLowerCase().endsWith('.html'));
  const isText = (type && (type.startsWith('text/') || type.includes('json') || type.includes('javascript') || type.includes('markdown'))) || (name && /\.(txt|md|js|css|json|py|c|cpp|java)$/i.test(name));

  if(iconEl){
    if(isImg) iconEl.textContent = '🖼️';
    else if(isPdf) iconEl.textContent = '📕';
    else if(isVideo) iconEl.textContent = '🎥';
    else if(isAudio) iconEl.textContent = '🎵';
    else if(isText || isHtml) iconEl.textContent = '📝';
    else iconEl.textContent = '📄';
  }

  function renderFallbackArea(){
    if(!area) return;
    area.innerHTML = `
      <div style="text-align:center; padding:30px 20px;">
        <div style="font-size:52px; margin-bottom:12px;">📄</div>
        <h4 style="margin:0 0 8px; font-size:16px; color:var(--modal-text); font-weight:700;">${esc(name || (lang==='en'?'File':'الملف'))}</h4>
        <p style="margin:0 0 16px; font-size:13px; color:var(--ink);">${lang === 'en' ? 'Click below to open in a new tab or download' : 'انقر على الزر بالأسفل لفتح الملف بنافذة جديدة أو تحميله'}</p>
        <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
          <a href="${fileUrl}" target="_blank" class="btn" style="text-decoration:none;">${lang==='en'?'Open in New Tab ↗':'فتح في نافذة جديدة ↗'}</a>
          <a href="${fileUrl}" download="${esc(name||'file')}" class="btn secondary" style="text-decoration:none;">${lang==='en'?'Download 📥':'تحميل 📥'}</a>
        </div>
      </div>
    `;
  }

  if(area){
    if(isImg){
      area.innerHTML = `<img src="${fileUrl}" alt="${esc(name)}" style="max-width:100%; max-height:68vh; border-radius:10px; object-fit:contain; box-shadow:0 4px 16px rgba(0,0,0,0.1);">`;
    } else if(isPdf || isHtml){
      area.innerHTML = `<iframe src="${fileUrl}" style="width:100%; height:68vh; border:none; border-radius:10px; background:#fff;"></iframe>`;
    } else if(isVideo){
      area.innerHTML = `<video controls autoplay src="${fileUrl}" style="max-width:100%; max-height:68vh; border-radius:10px;"></video>`;
    } else if(isAudio){
      area.innerHTML = `<div style="text-align:center; padding:30px;"><div style="font-size:50px; margin-bottom:12px;">🎵</div><audio controls autoplay src="${fileUrl}" style="width:100%; max-width:400px;"></audio></div>`;
    } else if(isText && isLocalBlob){
      area.innerHTML = `<div style="text-align:center; padding:20px; color:var(--ink);">${lang==='en'?'Reading text...':'جاري قراءة النص...'}</div>`;
      fetch(fileUrl).then(r=>r.text()).then(txt=>{
        area.innerHTML = `<pre style="width:100%; max-height:68vh; overflow:auto; text-align:left; direction:ltr; background:#fff; padding:16px; border-radius:10px; font-size:13px; line-height:1.5; margin:0; white-space:pre-wrap; word-break:break-word;">${esc(txt)}</pre>`;
      }).catch(()=>{
        renderFallbackArea();
      });
    } else {
      renderFallbackArea();
    }
  }

  if(modal) modal.style.display = 'flex';
}

function renderFileSection(section){
  const prefix = SECTION_PREFIX[section];
  renderFolders(section);
  const active = activeFolder[section];
  let list = filesBySection[section];
  if(active) list = list.filter(f=>f.folderId===active);
  const el = $(prefix+'-list');
  const stats = $(prefix+'-stats');
  const lang = userProfile.lang || 'ar';
  const t = I18N[lang] || I18N.ar;
  if(!list.length){
    el.innerHTML = `<div class="empty">${t.emptyFiles}</div>`;
    stats.innerHTML = '';
    return;
  }
  const totalSize = list.reduce((s,f)=>s+f.size, 0);
  const doneCount = list.filter(f=>completedItems[f.id]).length;
  const fileUnit = lang === 'ar' ? (list.length > 2 && list.length < 11 ? 'ملفات' : 'ملف') : (list.length > 1 ? 'files' : 'file');
  const doneUnit = lang === 'ar' ? 'مكتمل' : 'done';
  const totalUnit = lang === 'ar' ? 'الإجمالي' : 'total';
  stats.innerHTML = `<span class="pill">${list.length} ${fileUnit}</span><span class="pill">${fmtSize(totalSize)} ${totalUnit}</span>${doneCount?`<span class="pill">✅ ${doneCount} ${doneUnit}</span>`:''}`;
  el.innerHTML = list.sort((a,b)=>b.date-a.date).map(f => {
    const isDone = !!completedItems[f.id];
    const isUploading = !!f.uploading;
    return `
    <div class="card ${isDone?'completed':''}" style="${isUploading?'opacity:0.75;':''}">
      <div class="thumb">${f.type && f.type.startsWith('image/') && f.url ? `<img src="${f.url}">` : fileIcon(f.type||'')}</div>
      <h4 title="${esc(f.name)}">${esc(f.name)} ${isUploading ? `<span style="font-size:11px;color:#aaa;">${t.uploadingText}</span>` : ''}</h4>
      <div class="meta">${fmtSize(f.size||0)} · ${new Date(f.date).toLocaleDateString(lang==='ar'?'ar-EG':'en-US',{month:'short',day:'numeric'})}</div>
      <div class="actions">
        <button class="done-chk ${isDone?'checked':''}" onclick="event.stopPropagation(); toggleComplete('${f.id}','${section}')" title="${isDone?t.markIncomplete:t.markDone}">${isDone?'✓':''}</button>
        <button class="open" onclick="openFile('${f.id}','${f.url||f.cloudUrl||''}','${f.type||''}','${esc(f.name)}')">${t.openBtn}</button>
        <button class="del" onclick="deleteFile('${f.id}')">${t.delBtn}</button>
      </div>
    </div>`;
  }).join('');
}
SECTIONS.forEach(section=>{
  const prefix = SECTION_PREFIX[section];
  const dropEl = $(prefix+'-drop');
  const inputEl = $(prefix+'-input');
  inputEl.addEventListener('change', e => { addFiles(section, e.target.files); e.target.value=''; });
  dropEl.addEventListener('dragover', e => { e.preventDefault(); dropEl.classList.add('drag'); });
  dropEl.addEventListener('dragleave', () => dropEl.classList.remove('drag'));
  dropEl.addEventListener('drop', e => {
    e.preventDefault(); dropEl.classList.remove('drag');
    if(e.dataTransfer.files.length) addFiles(section, e.dataTransfer.files);
  });
});

/* ============ TODO ============ */
let todos = load('todos', []);
function renderTodos(){
  const el = $('td-list');
  if(!el) return;
  const lang = userProfile.lang || 'ar';
  const t = I18N[lang] || I18N.ar;
  if(!todos.length){ el.innerHTML = `<div class="empty">${t.emptyTasks}</div>`; return; }
  const order = {high:0, med:1, low:2};
  const sorted = [...todos].sort((a,b)=> a.done-b.done || order[a.prio]-order[b.prio]);
  const label = {high: t.prioHigh, med: t.prioMed, low: t.prioLow};
  el.innerHTML = sorted.map(task=>`
    <div class="todo-item ${task.done?'done':''}">
      <div class="chk" onclick="toggleTodo('${task.id}')">${task.done?'✓':''}</div>
      <div class="txt">${esc(task.text)} ${task.date?`<small style="color:var(--ink)">· ${new Date(task.date).toLocaleDateString(lang==='ar'?'ar-EG':'en-US',{day:'numeric',month:'short'})}</small>`:''}</div>
      <span class="prio ${task.prio}">${label[task.prio]}</span>
      <button class="del" onclick="delTodo('${task.id}')">${t.delBtn}</button>
    </div>`).join('');
}
function addTodo(){
  const text = $('td-text').value.trim();
  const prio = $('td-prio').value;
  const date = $('td-date').value;
  if(!text) return;
  todos.push({id:uid(), text, prio, date, done:false});
  syncStateToCloud('todos', todos);
  $('td-text').value=''; $('td-date').value='';
  renderTodos();
}
function toggleTodo(id){
  const t = todos.find(x=>x.id===id); t.done = !t.done;
  syncStateToCloud('todos', todos);
  renderTodos();
}
function delTodo(id){
  todos = todos.filter(x=>x.id!==id);
  syncStateToCloud('todos', todos);
  renderTodos();
}

/* ============ EXPLANATION - YouTube Playlists ============ */
let ytPlaylists = load('ytPlaylists', []); // {id, url, playlistId, title}

function switchExpMode(mode){
  document.querySelectorAll('#exp-toggle button').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('#panel-explanation .upload-section').forEach(s=>s.classList.remove('active'));
  if(mode==='file'){
    document.querySelector('#exp-toggle button:first-child').classList.add('active');
    $('exp-file-section').classList.add('active');
  } else {
    document.querySelector('#exp-toggle button:last-child').classList.add('active');
    $('exp-playlist-section').classList.add('active');
  }
}

function extractYtPlaylistId(url){
  const patterns = [
    /[?&]list=([a-zA-Z0-9_-]+)/,
    /playlist\?list=([a-zA-Z0-9_-]+)/,
  ];
  for(const p of patterns){
    const m = url.match(p);
    if(m) return m[1];
  }
  return null;
}

function addYtPlaylist(){
  const url = $('yt-playlist-url').value.trim();
  const lang = userProfile.lang || 'ar';
  if(!url){ alert(lang==='en'?'Please enter a valid YouTube link':'من فضلك ضع رابط يوتيوب صحيح'); return; }
  if(!url.includes('youtube.com') && !url.includes('youtu.be')){
    alert(lang==='en'?'Please enter a valid YouTube link (containing youtube.com or youtu.be)':'برجاء إدخال رابط يوتيوب صحيح (يحتوي على youtube.com أو youtu.be)'); return;
  }
  let title = $('yt-playlist-title') ? $('yt-playlist-title').value.trim() : '';
  if(!title){
    title = (lang === 'en' ? 'YouTube Lecture Playlist 📺' : 'قائمة شرح يوتيوب 📺');
  }
  const folderId = activeFolder['explanation'] || null;
  ytPlaylists.push({id:uid(), url, title, folderId, date:Date.now()});
  syncStateToCloud('ytPlaylists', ytPlaylists);
  $('yt-playlist-url').value='';
  if($('yt-playlist-title')) $('yt-playlist-title').value='';
  renderYtPlaylists();
}

function deleteYtPlaylist(id){
  ytPlaylists = ytPlaylists.filter(p=>p.id!==id);
  syncStateToCloud('ytPlaylists', ytPlaylists);
  renderYtPlaylists();
}

function renderYtPlaylists(){
  const el = $('yt-playlist-list');
  if(!el) return;
  const lang = userProfile.lang || 'ar';
  const t = I18N[lang] || I18N.ar;
  const active = activeFolder['explanation'];
  let list = ytPlaylists || [];
  if(active){
    list = list.filter(p => p.folderId === active);
  }
  if(!list.length){ el.innerHTML=''; return; }
  el.innerHTML = list.map(p=>`
    <div class="yt-playlist-card" style="padding:14px 18px; display:flex; align-items:center; justify-content:space-between; gap:12px; background:var(--card-bg); border:1px solid var(--line); border-radius:14px; margin-bottom:10px;">
      <div style="display:flex; align-items:center; gap:12px; overflow:hidden;">
        <span style="font-size:26px;">▶️</span>
        <div style="overflow:hidden;">
          <h4 style="margin:0 0 3px; font-size:15px; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:var(--plum);">${esc(p.title)}</h4>
          <a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" style="font-size:12.5px; color:var(--pink-deep); text-decoration:underline;">${esc(p.url)}</a>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:10px; flex:0 0 auto;">
        <a class="btn" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" style="padding:8px 16px; font-size:13px; text-decoration:none; display:inline-flex; align-items:center; gap:6px; background:#FF0000; color:#fff;">${t.openInYt}</a>
        <button class="del" onclick="deleteYtPlaylist('${p.id}')">${t.delBtn}</button>
      </div>
    </div>`).join('');
}

function shuffle(arr){
  const a = [...arr];
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}

/* ============ CALENDAR ============ */
const DAY_COLORS = [
  {key:'red', hex:'#E1706E', label:'Tough day'},
  {key:'orange', hex:'#EFA96A', label:'Normal day'},
  {key:'yellow', hex:'#F0D46A', label:'Good day'},
  {key:'green', hex:'#8FCB9B', label:'Great day'},
  {key:'blue', hex:'#8FC1E3', label:'Calm day'},
  {key:'purple', hex:'#C9B6E6', label:'Inspired day'},
  {key:'pink', hex:'#F3B6C4', label:'Loved day'},
];
let dayColors = load('dayColors', {});

function localDateKey(d){
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}
function renderLegend(){
  const lang = userProfile.lang || 'ar';
  const t = I18N[lang] || I18N.ar;
  $('legend').innerHTML = DAY_COLORS.map(c=>{
    const label = (t.dayColorLabels && t.dayColorLabels[c.key]) ? t.dayColorLabels[c.key] : c.label;
    return `<div class="lg"><span class="dot" style="background:${c.hex}"></span>${label}</div>`;
  }).join('');
}
function renderCalendar(){
  const wrap = $('calendarWrap');
  if(!wrap) return;
  const lang = userProfile.lang || 'ar';
  const t = I18N[lang] || I18N.ar;
  const now = new Date();
  const todayKey = localDateKey(now);
  const yearEnd = new Date(now.getFullYear(), 11, 31);
  let cursor = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthNames = t.calendarMonths;
  const weekHeadHTML = t.calendarDays.map(d=>`<span>${d}</span>`).join('');
  let html = '';
  while(cursor <= yearEnd){
    const y = cursor.getFullYear(), m = cursor.getMonth();
    const firstDay = new Date(y,m,1);
    const daysInMonth = new Date(y,m+1,0).getDate();
    const leading = firstDay.getDay();
    let cells='';
    for(let i=0;i<leading;i++) cells += '<div class="day-cell empty"></div>';
    for(let d=1; d<=daysInMonth; d++){
      const key = y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
      const isToday = key === todayKey;
      const colorKey = dayColors[key];
      const colorHex = colorKey ? (DAY_COLORS.find(c=>c.key===colorKey)||{}).hex : null;
      cells += `<div class="day-cell ${isToday?'today':''} ${colorHex?'colored':''}" data-date="${key}" ${colorHex?`style="background:${colorHex}"`:''} onclick="openColorPopup(event,'${key}')">
        <span class="num">${d}</span>
      </div>`;
    }
    html += `<div class="month-card">
      <h3>${monthNames[m]} ${y}</h3>
      <div class="week-head">${weekHeadHTML}</div>
      <div class="month-grid">${cells}</div>
    </div>`;
    cursor = new Date(y, m+1, 1);
  }
  wrap.innerHTML = html;
}

let activePopup = null;
function closePopup(){
  if(activePopup){ activePopup.remove(); activePopup=null; document.removeEventListener('click', outsideClose); }
}
function outsideClose(e){ if(activePopup && !activePopup.contains(e.target)) closePopup(); }

function openColorPopup(e, key){
  e.stopPropagation();
  closePopup();
  const rect = e.currentTarget.getBoundingClientRect();
  const pop = document.createElement('div');
  pop.className='color-popup';
  let top = rect.bottom+8, left = Math.min(rect.left, window.innerWidth-240);
  if(top > window.innerHeight-140) top = rect.top-150;
  pop.style.top = top+'px';
  pop.style.left = Math.max(10,left)+'px';
  const lang = userProfile.lang || 'ar';
  const t = I18N[lang] || I18N.ar;
  pop.innerHTML = DAY_COLORS.map(c=>{
    const label = (t.dayColorLabels && t.dayColorLabels[c.key]) ? t.dayColorLabels[c.key] : c.label;
    return `<div class="sw" style="background:${c.hex}" title="${label}" onclick="chooseColor(event,'${key}','${c.key}')"></div>`;
  }).join('') +
    `<div class="clear" title="Clear color" onclick="chooseColor(event,'${key}',null)">✕</div>`;
  document.body.appendChild(pop);
  activePopup = pop;
  setTimeout(()=>document.addEventListener('click', outsideClose), 0);
}

function chooseColor(e, key, colorKey){
  e.stopPropagation();
  closePopup();
  if(colorKey===null){
    delete dayColors[key]; syncStateToCloud('calendar', dayColors); renderCalendar(); return;
  }
  dayColors[key] = colorKey;
  syncStateToCloud('calendar', dayColors);
  const cell = document.querySelector(`.day-cell[data-date="${key}"]`);
  const hex = DAY_COLORS.find(c=>c.key===colorKey).hex;
  if(!cell) return;
  cell.classList.add('colored');
  const fill = document.createElement('div');
  fill.className='fill';
  fill.style.setProperty('--clr', hex);
  cell.insertBefore(fill, cell.firstChild);
  cell.classList.add('animating');
  setTimeout(()=>{
    cell.style.background = hex;
    cell.classList.remove('animating');
    cell.classList.add('popIn');
    fill.remove();
    setTimeout(()=>cell.classList.remove('popIn'), 400);
  }, 420);
}

/* ============ BURNOUT BOARD ============ */
const BOX_COLORS = [
  {key:'pink', hex:'#F3B6C4'},
  {key:'lavender', hex:'#CDB8E6'},
  {key:'gold', hex:'#F3C98A'},
  {key:'mint', hex:'#B9E3D3'},
  {key:'blue', hex:'#AED4EC'},
  {key:'cream', hex:'#FFF6EA'},
];
let boxes = load('burnoutBoxes', []);
let connections = load('burnoutConnections', []);

function renderBurnout(){
  const inner = $('canvasInner');
  if(!inner) return;
  inner.querySelectorAll('.think-box').forEach(b=>b.remove());
  boxes.forEach(b=> inner.appendChild(createBoxEl(b)));
  drawConnections();
}

function createBoxEl(b){
  const div = document.createElement('div');
  div.className='think-box';
  div.dataset.id = b.id;
  div.style.left=b.x+'px'; div.style.top=b.y+'px'; div.style.width=b.w+'px'; div.style.height=b.h+'px';
  div.style.background = (BOX_COLORS.find(c=>c.key===b.color)||BOX_COLORS[0]).hex;
  div.innerHTML = `
    <div class="box-head">
      <div class="color-dots">${BOX_COLORS.map(c=>`<span style="background:${c.hex}" data-color="${c.key}"></span>`).join('')}</div>
      <button class="box-del">×</button>
    </div>
    <div class="box-body" contenteditable spellcheck="false">${esc(b.text)}</div>
    <div class="connector top"></div>
    <div class="connector right"></div>
    <div class="connector bottom"></div>
    <div class="connector left"></div>
    <div class="resize-handle"></div>
  `;
  div.querySelector('.box-head').addEventListener('mousedown', e=>{
    if(e.target.closest('.color-dots') || e.target.closest('.box-del')) return;
    startDrag(e, b.id);
  });
  div.querySelectorAll('.color-dots span').forEach(sw=>{
    sw.addEventListener('click', ()=> setBoxColor(b.id, sw.dataset.color));
  });
  div.querySelector('.box-del').addEventListener('click', ()=> deleteBox(b.id));
  div.querySelector('.box-body').addEventListener('blur', function(){ setBoxText(b.id, this.innerText); });
  div.querySelector('.resize-handle').addEventListener('mousedown', e=> startResize(e, b.id));
  div.querySelectorAll('.connector').forEach(c=>{
    c.addEventListener('mousedown', e=>{ e.stopPropagation(); e.preventDefault(); startConnect(b.id); });
  });
  return div;
}

function addBox(){
  const wrap = $('canvasWrap');
  const scrollX = wrap ? wrap.scrollLeft : 0;
  const scrollY = wrap ? wrap.scrollTop : 0;
  const offset = (boxes.length * 28) % 240;
  const lang = userProfile.lang || 'ar';
  const t = I18N[lang] || I18N.ar;
  const box = {
    id: uid(),
    x: Math.max(40, scrollX + 50 + offset),
    y: Math.max(40, scrollY + 40 + offset),
    w: 200,
    h: 140,
    text: t.burnBoxDefault,
    color: BOX_COLORS[boxes.length % BOX_COLORS.length].key
  };
  boxes.push(box);
  save('burnoutBoxes', boxes);
  save('burnoutConnections', connections);
  syncStateToCloud('burnout', {boxes, conns:connections});
  const el = createBoxEl(box);
  $('canvasInner').appendChild(el);
  drawConnections();
  // Focus the box so user can type immediately
  const body = el.querySelector('.box-body');
  if(body) { body.focus(); }
}
function deleteBox(id){
  boxes = boxes.filter(b=>b.id!==id);
  connections = connections.filter(c=>c.from!==id && c.to!==id);
  save('burnoutBoxes', boxes);
  save('burnoutConnections', connections);
  syncStateToCloud('burnout', {boxes, conns:connections});
  renderBurnout();
}
function setBoxColor(id, colorKey){
  const b = boxes.find(x=>x.id===id); if(!b) return;
  b.color = colorKey;
  save('burnoutBoxes', boxes);
  syncStateToCloud('burnout', {boxes, conns:connections});
  const el = document.querySelector(`.think-box[data-id="${id}"]`);
  if(el) el.style.background = BOX_COLORS.find(c=>c.key===colorKey).hex;
}
function saveBurnoutState(){
  save('burnoutBoxes', boxes);
  save('burnoutConnections', connections);
  syncStateToCloud('burnout', {boxes, conns:connections});
}
function setBoxText(id, text){
  const b = boxes.find(x=>x.id===id); if(!b) return;
  b.text = text;
  saveBurnoutState();
}
function clearBurnout(){
  const lang = userProfile.lang || 'ar';
  const t = I18N[lang] || I18N.ar;
  if(!confirm(t.burnClearConfirm)) return;
  boxes=[]; connections=[];
  save('burnoutBoxes', boxes); save('burnoutConnections', connections);
  renderBurnout();
}

function startDrag(e, id){
  e.preventDefault();
  const box = boxes.find(x=>x.id===id);
  const startX = e.clientX, startY = e.clientY;
  const origX = box.x, origY = box.y;
  const el = document.querySelector(`.think-box[data-id="${id}"]`);
  el.classList.add('dragging');
  function onMove(ev){
    box.x = Math.max(0, origX + (ev.clientX-startX));
    box.y = Math.max(0, origY + (ev.clientY-startY));
    el.style.left=box.x+'px'; el.style.top=box.y+'px';
    drawConnections();
  }
  function onUp(){
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    el.classList.remove('dragging');
    save('burnoutBoxes', boxes);
  }
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
}
function startResize(e, id){
  e.preventDefault(); e.stopPropagation();
  const box = boxes.find(x=>x.id===id);
  const startX = e.clientX, startY = e.clientY, origW = box.w, origH = box.h;
  const el = document.querySelector(`.think-box[data-id="${id}"]`);
  function onMove(ev){
    box.w = Math.max(140, origW + (ev.clientX-startX));
    box.h = Math.max(90, origH + (ev.clientY-startY));
    el.style.width=box.w+'px'; el.style.height=box.h+'px';
    drawConnections();
  }
  function onUp(){
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    save('burnoutBoxes', boxes);
  }
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
}

function toCanvasCoords(clientX, clientY){
  const wrap = $('canvasWrap');
  const r = wrap.getBoundingClientRect();
  return {x: clientX - r.left + wrap.scrollLeft, y: clientY - r.top + wrap.scrollTop};
}
function boxCenter(id){
  const b = boxes.find(x=>x.id===id);
  if(!b) return null;
  return {x: b.x + b.w/2, y: b.y + b.h/2};
}

function startConnect(sourceId){
  const svg = $('connLayer');
  const tempLine = document.createElementNS('http://www.w3.org/2000/svg','line');
  tempLine.setAttribute('stroke', '#E1839B');
  tempLine.setAttribute('stroke-width','2');
  tempLine.setAttribute('stroke-dasharray','5,4');
  svg.appendChild(tempLine);

  function onMove(ev){
    const pos = toCanvasCoords(ev.clientX, ev.clientY);
    const src = boxCenter(sourceId);
    if(!src) return;
    tempLine.setAttribute('x1', src.x); tempLine.setAttribute('y1', src.y);
    tempLine.setAttribute('x2', pos.x); tempLine.setAttribute('y2', pos.y);
  }
  function onUp(ev){
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    tempLine.remove();
    const targetEl = document.elementFromPoint(ev.clientX, ev.clientY)?.closest('.think-box');
    if(targetEl && targetEl.dataset.id !== sourceId){
      const targetId = targetEl.dataset.id;
      const exists = connections.some(c => (c.from===sourceId && c.to===targetId) || (c.from===targetId && c.to===sourceId));
      if(!exists){
        connections.push({id:uid(), from:sourceId, to:targetId});
        save('burnoutConnections', connections);
      }
    }
    drawConnections();
  }
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
}

function drawConnections(){
  const svg = $('connLayer');
  if(!svg) return;
  svg.innerHTML = `<defs><marker id="arrow" markerWidth="9" markerHeight="9" refX="8" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#4A3350"/></marker></defs>`;
  connections.forEach(c=>{
    const a = boxCenter(c.from), b = boxCenter(c.to);
    if(!a || !b) return;
    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1',a.x); line.setAttribute('y1',a.y);
    line.setAttribute('x2',b.x); line.setAttribute('y2',b.y);
    line.setAttribute('stroke','#4A3350');
    line.setAttribute('stroke-width','2.5');
    line.setAttribute('opacity','0.5');
    line.setAttribute('marker-end','url(#arrow)');
    line.addEventListener('click', ()=>{
      connections = connections.filter(x=>x.id!==c.id);
      save('burnoutConnections', connections);
      drawConnections();
    });
    svg.appendChild(line);
  });
}

/* ============ COMPLETION TRACKING ============ */
let completedItems = load('completedItems', {}); // {itemId: true}

function toggleComplete(itemId, section){
  const lang = userProfile.lang || 'ar';
  const t = I18N[lang] || I18N.ar;
  if(completedItems[itemId]){
    delete completedItems[itemId];
  } else {
    completedItems[itemId] = true;
    showCompletionToast(t.doneToast(userProfile.name || (lang==='en'?'Student':'المستخدم')));
  }
  syncStateToCloud('completedItems', completedItems);
  if(SECTIONS.includes(section)) renderFileSection(section);
}

/* ============ RAFEEQ SPLASH SCREEN ENGINE ============ */
function initRafeeqSplash(){
  const splash = $('rafeeqSplash');
  if(!splash) return;

  const hasVisited = localStorage.getItem('rafeeq_visited_v1');
  const lang = userProfile.lang || 'ar';
  const name = (userProfile.name || '').trim();

  // Set button text based on first-time or returning
  const btn = $('splashActionBtn');
  const tagline = $('splashTagline');

  if(lang === 'en'){
    if(tagline) tagline.textContent = 'RAFEEQ · YOUR STUDY COMPANION';
    if(btn){
      btn.textContent = (!hasVisited || !name) ? 'Start the Journey 🚀' : 'Continue the Journey 🌟';
    }
  } else {
    if(tagline) tagline.textContent = 'رَفِيق · مساحتك للمذاكرة';
    if(btn){
      btn.textContent = (!hasVisited || !name) ? 'ابدأ رحلتك 🚀' : 'كمّل رحلتك 🌟';
    }
  }

  // Trigger the single-word clip-path reveal animation
  const wordEl = $('splashWordText');
  setTimeout(() => {
    if(wordEl) wordEl.classList.add('visible');
  }, 300);

  // After word has fully revealed (1.4s animation), show glow + tagline
  setTimeout(() => {
    const glowEl = $('splashGlow');
    const taglineEl = $('splashTagline');
    if(glowEl) glowEl.classList.add('show');
    if(taglineEl) taglineEl.classList.add('show');
  }, 1500);

  // Then show button
  setTimeout(() => {
    if(btn) btn.classList.add('show');
  }, 1850);
}

function enterRafeeqApp(){
  const splash = $('rafeeqSplash');
  const isFirstTime = !localStorage.getItem('rafeeq_visited_v1');
  localStorage.setItem('rafeeq_visited_v1', 'true');

  if(splash){
    splash.classList.add('leaving');
    setTimeout(() => {
      splash.style.display = 'none';
    }, 850);
  }

  // If first time and no name set yet, open profile modal to choose major and name
  if(isFirstTime && (!userProfile.name || !userProfile.name.trim())){
    setTimeout(() => {
      openProfileModal();
    }, 600);
  }
}

// Allow Enter or Space key on splash screen to proceed
document.addEventListener('keydown', e => {
  const splash = $('rafeeqSplash');
  if(splash && splash.style.display !== 'none' && !splash.classList.contains('leaving')){
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      enterRafeeqApp();
    }
  }
});

/* ============ INIT ============ */
initRafeeqSplash();
applyUserTheme();
applyLang(userProfile.lang || 'ar', false);
renderTodos();
renderLegend();
renderCalendar();
renderBurnout();
renderYtPlaylists();
loadAllFiles();
SECTIONS.forEach(renderFolders);
SECTIONS.forEach(renderFileSection);

// Show welcome quote on load
setTimeout(()=>{
  const lang = userProfile.lang || 'ar';
  const t = I18N[lang] || I18N.ar;
  const name = userProfile.name || (lang === 'en' ? 'Student' : 'يا صديقي');
  showCompletionToast(t.welcomeToast(name), true);
}, 1000);
