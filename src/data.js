export const TOPICS = [
  {
    id: 'animals',
    label: 'Animals',
    icon: '🐾',
    description: 'Common animal words with related meanings.',
    accent: 'var(--animals)',
    words: ['atim', 'minos', 'mistatim', 'kinosew', 'acimosis', 'minosis', 'elephant'],
    semanticGapExamples: [
      {
        query: 'elephant',
        label: 'elephant',
        description: 'A semantic-gap example used to show that some English concepts do not map cleanly to a direct Cree word in this prototype.',
      },
    ],
    prototypeReady: true,
  },
  {
    id: 'kinship',
    label: 'Kinship',
    icon: '👪',
    description: 'Family terms with simple possessor views.',
    accent: 'var(--kinship)',
    words: ['nohkom', 'nimosom', 'nikawiy', 'nohtawiy'],
    prototypeReady: true,
  },
  {
    id: 'weather',
    label: 'Weather',
    icon: '☁️',
    description: 'Simple weather words to explore.',
    accent: 'var(--weather)',
    words: ['kimiwan', 'mispon', 'pisim', 'kiwetin', 'kisastew'],
    prototypeReady: true,
  },
  {
    id: 'body',
    label: 'Body',
    icon: '🖐️',
    description: 'Body-part words with quick examples.',
    accent: 'var(--body)',
    words: ['mistikwan', 'micihciy', 'misit', 'miskisik', 'miton'],
    prototypeReady: true,
  },
]

export const WORDS = {
  elephant: {
    id: 'elephant',
    cree: 'No direct translation.',
    syllabics: '',
    english: 'elephant',
    topicIds: ['animals'],
    shortDefinition: 'large grey mammal',
    description:
      'This is a semantic-gap example. Some English concepts do not have a direct one-to-one Cree translation, but can still be explored through related words.',
    example: '',
    pronunciation: '',
    audioLabel: '',
    grammar: {
      learner: 'Concept (no direct equivalent)',
      expert: 'Semantic gap example used for exploration',
    },
    relations: [
      { id: 'mistatim', type: 'related', label: 'Similar large animal concept' },
      { id: 'atim', type: 'topic-neighbour', label: 'Same topic' },
      { id: 'kinosew', type: 'topic-neighbour', label: 'Same topic' },
    ],
    synonyms: [],
    antonyms: [],
    forms: [],
    isSemanticGap: true,
  },
  atim: {
    id: 'atim',
    cree: 'atim',
    syllabics: 'ᐊᑎᒼ',
    english: 'dog',
    topicIds: ['animals'],
    shortDefinition: 'A dog.',
    description:
      'A common animal term. In this prototype, it acts as a starting point for exploring nearby animal words.',
    example: 'atim awa — This is a dog.',
    pronunciation: 'ah-tim',
    audioLabel: 'Play pronunciation for atim',
    grammar: {
      learner: 'Animate noun',
      expert: 'NA · singular stem used in the Animals topic',
    },
    relations: [
      { id: 'minos', type: 'related', label: 'Related animal' },
      { id: 'mistatim', type: 'broader-neighbour', label: 'Another common animal term' },
      { id: 'acimosis', type: 'narrower', label: 'Younger / smaller related animal word' },
      { id: 'kinosew', type: 'topic-neighbour', label: 'Same topic' },
    ],
    synonyms: [],
    antonyms: [],
    forms: [],
  },
  minos: {
    id: 'minos',
    cree: 'minos',
    syllabics: 'ᒥᓄᐢ',
    english: 'cat',
    topicIds: ['animals'],
    shortDefinition: 'A cat.',
    description: 'An animal word that can be compared with other familiar animal terms.',
    example: 'minos awa — This is a cat.',
    pronunciation: 'mee-nos',
    audioLabel: 'Play pronunciation for minos',
    grammar: {
      learner: 'Noun',
      expert: 'N · plural often shown as minosak',
    },
    relations: [
      { id: 'atim', type: 'related', label: 'Another familiar animal' },
      { id: 'minosis', type: 'narrower', label: 'Younger cat-related word' },
    ],
    synonyms: [],
    antonyms: [],
    forms: [],
  },
  mistatim: {
    id: 'mistatim',
    cree: 'mistatim',
    syllabics: 'ᒥᐢᑕᑎᒼ',
    english: 'horse',
    topicIds: ['animals'],
    shortDefinition: 'A horse.',
    description: 'A larger animal term in the same browsing topic as dog and cat.',
    example: 'mistatim awa — This is a horse.',
    pronunciation: 'mis-ta-tim',
    audioLabel: 'Play pronunciation for mistatim',
    grammar: {
      learner: 'Animate noun',
      expert: 'NA · cf. related horse terms in the full dictionary',
    },
    relations: [
      { id: 'atim', type: 'related', label: 'Often compared in learning examples' },
      { id: 'minos', type: 'same-topic', label: 'Same topic' },
      { id: 'kinosew', type: 'same-topic', label: 'Same topic' },
      { id: 'mistatimosis', type: 'narrower', label: 'Young horse-related word' },
    ],
    synonyms: [],
    antonyms: [],
    forms: [],
  },
  kinosew: {
    id: 'kinosew',
    cree: 'kinosēw',
    syllabics: 'ᑭᓄᓭᐤ',
    english: 'fish',
    topicIds: ['animals'],
    shortDefinition: 'A fish.',
    description: 'A topic neighbour used to show that the network can branch beyond pets and land animals.',
    example: 'kinosēw awa — This is a fish.',
    pronunciation: 'kee-no-seh-w',
    audioLabel: 'Play pronunciation for kinosēw',
    grammar: {
      learner: 'Animate noun',
      expert: 'Animate noun shown here as a topic neighbour',
    },
    relations: [
      { id: 'atim', type: 'same-topic', label: 'Same topic' },
      { id: 'minos', type: 'same-topic', label: 'Same topic' },
      { id: 'mistatim', type: 'same-topic', label: 'Same topic' },
      { id: 'wapos', type: 'same-topic', label: 'Same topic' },
    ],
    synonyms: [],
    antonyms: [],
    forms: [],
  },
  acimosis: {
    id: 'acimosis',
    cree: 'acimosis',
    syllabics: 'ᐊᒋᒧᓯᐢ',
    english: 'puppy',
    topicIds: ['animals'],
    shortDefinition: 'A puppy.',
    description: 'Used here as a more specific animal term connected to dog.',
    example: 'acimosis awa — This is a puppy.',
    pronunciation: 'ah-chee-mo-sis',
    audioLabel: 'Play pronunciation for acimosis',
    grammar: {
      learner: 'Noun',
      expert: 'Diminutive animal term used as a narrower relation in this prototype',
    },
    relations: [
      { id: 'atim', type: 'broader', label: 'Broader word' },
    ],
    synonyms: [],
    antonyms: [],
    forms: [],
  },
  minosis: {
    id: 'minosis',
    cree: 'minosis',
    syllabics: 'ᒥᓄᓯᐢ',
    english: 'kitten',
    topicIds: ['animals'],
    shortDefinition: 'A kitten.',
    description: 'A more specific cat-related term shown when the network expands.',
    example: 'minosis awa — This is a kitten.',
    pronunciation: 'mee-no-sis',
    audioLabel: 'Play pronunciation for minosis',
    grammar: {
      learner: 'Noun',
      expert: 'Specific younger-animal example linked from cat',
    },
    relations: [
      { id: 'minos', type: 'broader', label: 'Broader word' },
    ],
    synonyms: [],
    antonyms: [],
    forms: [],
  },
  nitisan: {
    id: 'nitisan',
    cree: 'nîtisân',
    syllabics: 'ᓃᑎᓵᐣ',
    english: 'my sibling',
    topicIds: ['kinship'],
    shortDefinition: 'My sibling (brother or sister).',
    description: 'Added as a simple kinship expansion node in the topic map.',
    example: 'nîtisân êkwa nimosôm — My sibling and my grandfather.',
    pronunciation: 'nee-ti-saan',
    audioLabel: 'Play pronunciation for nîtisân',
    grammar: {
      learner: 'Kinship term',
      expert: 'NA (dependent kinship usage shown in dictionaries)',
    },
    relations: [
      { id: 'nikawiy', type: 'family-neighbour', label: 'Same family cluster' },
      { id: 'nohtawiy', type: 'family-neighbour', label: 'Same family cluster' },
    ],
    synonyms: [],
    antonyms: [],
    forms: [],
  },
  nikosis: {
    id: 'nikosis',
    cree: 'nikosis',
    syllabics: 'ᓂᑯᓯᐢ',
    english: 'my son',
    topicIds: ['kinship'],
    shortDefinition: 'My son.',
    description: 'Added as a simple kinship expansion node in the topic map.',
    example: 'nikosis nika-wâpamâw — I will see my son.',
    pronunciation: 'nih-ko-sis',
    audioLabel: 'Play pronunciation for nikosis',
    grammar: {
      learner: 'Kinship term',
      expert: 'NA / NDA kinship usage varies by source',
    },
    relations: [
      { id: 'nohtawiy', type: 'family-neighbour', label: 'Same family cluster' },
      { id: 'nikawiy', type: 'family-neighbour', label: 'Same family cluster' },
    ],
    synonyms: [],
    antonyms: [],
    forms: [],
  },
  kimiwan: {
    id: 'kimiwan',
    cree: 'kimiwan',
    syllabics: 'ᑭᒥᐊᐧᐣ',
    english: 'it rains',
    topicIds: ['weather'],
    shortDefinition: 'It rains / it is raining.',
    description: 'A simple weather example word for the Weather topic.',
    example: 'māci-kimiwan ēkwa. — It is starting to rain now.',
    pronunciation: 'kih-mee-wun',
    audioLabel: 'Play pronunciation for kimiwan',
    grammar: {
      learner: 'Verb',
      expert: 'VII weather verb',
    },
    relations: [],
    synonyms: [],
    antonyms: [],
    forms: [],
  },
  mispon: {
    id: 'mispon',
    cree: 'mispon',
    syllabics: 'ᒥᐢᐳᐣ',
    english: 'it snows',
    topicIds: ['weather'],
    shortDefinition: 'It snows / it is snowing.',
    description: 'A simple weather example word for the Weather topic.',
    example: 'mispon. — It is snowing.',
    pronunciation: 'mis-pon',
    audioLabel: 'Play pronunciation for mispon',
    grammar: {
      learner: 'Verb',
      expert: 'VII weather verb',
    },
    relations: [],
    synonyms: [],
    antonyms: [],
    forms: [],
  },
  pisim: {
    id: 'pisim',
    cree: 'pîsim',
    syllabics: 'ᐲᓯᒼ',
    english: 'sun',
    topicIds: ['weather'],
    shortDefinition: 'The sun (also used for “month” in some contexts).',
    description: 'A simple weather/sky example word for the Weather topic.',
    example: 'pîsim — the sun.',
    pronunciation: 'pee-sim',
    audioLabel: 'Play pronunciation for pîsim',
    grammar: {
      learner: 'Noun',
      expert: 'NA',
    },
    relations: [],
    synonyms: [],
    antonyms: [],
    forms: [],
  },
  mistikwan: {
    id: 'mistikwan',
    cree: 'mistikwân',
    syllabics: 'ᒥᐢᑎᑳᐧᐣ',
    english: 'head',
    topicIds: ['body'],
    shortDefinition: 'A head.',
    description: 'A basic body-part example for the Body topic.',
    example: 'mistikwân — head.',
    pronunciation: 'mis-ti-kwaan',
    audioLabel: 'Play pronunciation for mistikwân',
    grammar: {
      learner: 'Noun',
      expert: 'NI',
    },
    relations: [],
    synonyms: [],
    antonyms: [],
    forms: [],
  },
  micihciy: {
    id: 'micihciy',
    cree: 'micihciy',
    syllabics: 'ᒥᒋᐦᒋᕀ',
    english: 'hand',
    topicIds: ['body'],
    shortDefinition: 'A hand.',
    description: 'A basic body-part example for the Body topic.',
    example: 'micihciy — hand.',
    pronunciation: 'mih-chih-chiy',
    audioLabel: 'Play pronunciation for micihciy',
    grammar: {
      learner: 'Noun',
      expert: 'NDI (possessed noun in many sources)',
    },
    relations: [],
    synonyms: [],
    antonyms: [],
    forms: [],
  },
  misit: {
    id: 'misit',
    cree: 'misit',
    syllabics: 'ᒥᓯᐟ',
    english: 'foot',
    topicIds: ['body'],
    shortDefinition: 'A foot.',
    description: 'A basic body-part example for the Body topic.',
    example: 'misit — foot.',
    pronunciation: 'mih-sit',
    audioLabel: 'Play pronunciation for misit',
    grammar: {
      learner: 'Noun',
      expert: 'NI',
    },
    relations: [],
    synonyms: [],
    antonyms: [],
    forms: [],
  },
  kiwetin: {
    id: 'kiwetin',
    cree: 'kîwêtin',
    syllabics: 'ᑮᐁᐧᑎᐣ',
    english: 'north wind',
    topicIds: ['weather'],
    shortDefinition: 'North wind; the north.',
    description: 'Added as an expandable Weather node in the topic map.',
    example: 'kîwêtin — north wind.',
    pronunciation: 'kee-way-tin',
    audioLabel: 'Play pronunciation for kîwêtin',
    grammar: {
      learner: 'Noun',
      expert: 'NI',
    },
    relations: [],
    synonyms: [],
    antonyms: [],
    forms: [],
  },
  kisastew: {
    id: 'kisastew',
    cree: 'kisâstêw',
    syllabics: 'ᑭᓵᐢᑌᐤ',
    english: 'it is hot',
    topicIds: ['weather'],
    shortDefinition: 'It is hot weather.',
    description: 'Added as an expandable Weather node in the topic map.',
    example: 'kisâstêw — it is hot and sunny.',
    pronunciation: 'kih-saas-tayw',
    audioLabel: 'Play pronunciation for kisâstêw',
    grammar: {
      learner: 'Verb',
      expert: 'VII',
    },
    relations: [],
    synonyms: [],
    antonyms: [],
    forms: [],
  },
  miskisik: {
    id: 'miskisik',
    cree: 'miskîsik',
    syllabics: 'ᒥᐢᑮᓯᐠ',
    english: 'eye',
    topicIds: ['body'],
    shortDefinition: 'An eye.',
    description: 'Added as an expandable Body node in the topic map.',
    example: 'miskîsik — eye.',
    pronunciation: 'mis-kee-sik',
    audioLabel: 'Play pronunciation for miskîsik',
    grammar: {
      learner: 'Noun',
      expert: 'NI',
    },
    relations: [],
    synonyms: [],
    antonyms: [],
    forms: [],
  },
  miton: {
    id: 'miton',
    cree: 'mitôn',
    syllabics: 'ᒥᑑᐣ',
    english: 'mouth',
    topicIds: ['body'],
    shortDefinition: 'A mouth.',
    description: 'Added as an expandable Body node in the topic map.',
    example: 'mitôn — mouth.',
    pronunciation: 'mih-toon',
    audioLabel: 'Play pronunciation for mitôn',
    grammar: {
      learner: 'Noun',
      expert: 'NI',
    },
    relations: [],
    synonyms: [],
    antonyms: [],
    forms: [],
  },
  nohkom: {
    id: 'nohkom',
    cree: 'nôhkom',
    syllabics: 'ᓄᐦᑯᒼ',
    english: 'my grandmother',
    topicIds: ['kinship'],
    shortDefinition: 'My grandmother; also used for a respected elder woman.',
    description: 'A kinship term with different possessor forms that matter to learners and teachers.',
    example: 'nôhkom nitisân — My grandmother is coming.',
    pronunciation: 'nooh-gom',
    audioLabel: 'Play pronunciation for nôhkom',
    grammar: {
      learner: 'Kinship term',
      expert: 'NDA · person-marked kinship form',
    },
    relations: [
      { id: 'nimosom', type: 'same-generation', label: 'Grandparent generation' },
      { id: 'nikawiy', type: 'family-neighbour', label: 'Immediate family neighbour' },
      { id: 'nohtawiy', type: 'family-neighbour', label: 'Immediate family neighbour' },
    ],
    synonyms: [],
    antonyms: [],
    forms: [
      { key: 'mine', label: 'my', value: 'nôhkom' },
      { key: 'yours', label: 'your', value: 'kôhkom' },
      { key: 'theirs', label: 'his / her', value: 'ôhkoma' },
    ],
  },
  nimosom: {
    id: 'nimosom',
    cree: 'nimosôm',
    syllabics: 'ᓂᒧᓲᒼ',
    english: 'my grandfather',
    topicIds: ['kinship'],
    shortDefinition: 'My grandfather.',
    description: 'A kinship term shown alongside grandmother, mother, and father.',
    example: 'nimosôm ê-pimohtêt — My grandfather is walking.',
    pronunciation: 'nih-mo-soom',
    audioLabel: 'Play pronunciation for nimosôm',
    grammar: {
      learner: 'Kinship term',
      expert: 'NDA · person-marked kinship form',
    },
    relations: [
      { id: 'nohkom', type: 'same-generation', label: 'Grandparent generation' },
      { id: 'nikawiy', type: 'family-neighbour', label: 'Immediate family neighbour' },
      { id: 'nohtawiy', type: 'family-neighbour', label: 'Immediate family neighbour' },
    ],
    synonyms: [],
    antonyms: [],
    forms: [
      { key: 'mine', label: 'my', value: 'nimosôm' },
      { key: 'yours', label: 'your', value: 'kimosôm' },
      { key: 'theirs', label: 'his / her', value: 'omosoma' },
    ],
  },
  nikawiy: {
    id: 'nikawiy',
    cree: 'nikâwiy',
    syllabics: 'ᓂᑳᐏᐩ',
    english: 'my mother',
    topicIds: ['kinship'],
    shortDefinition: 'My mother.',
    description: 'A close-family term used to show that related words can be grouped by topic and family role.',
    example: 'nikâwiy nika-wâpamâw — I will see my mother.',
    pronunciation: 'nih-gah-wee',
    audioLabel: 'Play pronunciation for nikâwiy',
    grammar: {
      learner: 'Kinship term',
      expert: 'NDA · person-marked kinship form',
    },
    relations: [
      { id: 'nohtawiy', type: 'same-generation', label: 'Parent generation' },
      { id: 'nohkom', type: 'older-generation', label: 'Grandparent generation' },
      { id: 'nimosom', type: 'older-generation', label: 'Grandparent generation' },
    ],
    synonyms: [],
    antonyms: [],
    forms: [
      { key: 'mine', label: 'my', value: 'nikâwiy' },
      { key: 'yours', label: 'your', value: 'kikâwiy' },
      { key: 'theirs', label: 'his / her', value: 'okâwiya' },
    ],
  },
  nohtawiy: {
    id: 'nohtawiy',
    cree: 'nôhtâwiy',
    syllabics: 'ᓅᐦᑖᐏᐩ',
    english: 'my father',
    topicIds: ['kinship'],
    shortDefinition: 'My father.',
    description: 'A close-family term paired with mother and linked back to the larger kinship cluster.',
    example: 'nôhtâwiy kî-itohtêw — My father went there.',
    pronunciation: 'nooh-tah-wee',
    audioLabel: 'Play pronunciation for nôhtâwiy',
    grammar: {
      learner: 'Kinship term',
      expert: 'NDA · person-marked kinship form',
    },
    relations: [
      { id: 'nikawiy', type: 'same-generation', label: 'Parent generation' },
      { id: 'nohkom', type: 'older-generation', label: 'Grandparent generation' },
      { id: 'nimosom', type: 'older-generation', label: 'Grandparent generation' },
    ],
    synonyms: [],
    antonyms: [],
    forms: [
      { key: 'mine', label: 'my', value: 'nôhtâwiy' },
      { key: 'yours', label: 'your', value: 'kôhtâwiy' },
      { key: 'theirs', label: 'his / her', value: 'ohtâwiya' },
    ],
  },
}

export const SEMANTIC_GAP_EXAMPLES = {
  elephant: {
    query: 'elephant',
    label: 'elephant',
    description:
      'This prototype uses “elephant” to show a semantic gap: the closest ideas can still be explored, even when there is no direct one-to-one translation result.',
    explanation:
      'A learner or lexicographer may need nearby words or browsing paths instead of a single direct match. That is why the app keeps recovery options visible.',
  },
}

export const HELP_BY_ROUTE = {
  home: {
    title: 'Home help',
    tips: [
      'Search in English or Cree.',
      'Start with a topic card if you do not know a word yet.',
      'Open Categories to browse more topics and sample nodes.',
    ],
  },
  search: {
    title: 'Search help',
    tips: [
      'Try dog, family, elephant, or nôhkom.',
      'Suggestions help with spelling and nearby matches.',
      'If there is no direct match, browse a topic or check the closest matches.',
    ],
  },
  topic: {
    title: 'Topic help',
    tips: [
      'Tap a node to explore that word.',
      'Use Show more to reveal extra nodes.',
      'Words that do not have a translation are shown with a “No direct translation” label and a dashed circular outline.',
    ],
  },
  categories: {
    title: 'Categories help',
    tips: [
      'Search by topic name or by a sample word.',
      'Open topic to view the full network.',
      'Preview cards show example nodes before you open the topic.',
    ],
  },
  related: {
    title: 'Related words help',
    tips: [
      'This page is for exploration only.',
      'Use Details when you want meaning, examples, or saving.',
      'Show all reveals more nearby words in the list.',
    ],
  },
  details: {
    title: 'Details help',
    tips: [
      'Use Save to Topic to add this word to a list.',
      'You can add the word to an existing topic or create a new one.',
      'Kinship terms include a quick my / your / his-her form toggle.',
    ],
  },
  saved: {
    title: 'Saved help',
    tips: [
      'Use search to find a topic or a saved word quickly.',
      'Create Topic makes a new empty list.',
      'Open a saved topic to view or remove words.',
    ],
  },
}

export function getWord(id) {
  return WORDS[id]
}

export function getTopic(id) {
  return TOPICS.find((topic) => topic.id === id)
}

export function getWordsForTopic(topicId) {
  const topic = getTopic(topicId)
  if (!topic) return []
  return topic.words.map((id) => WORDS[id]).filter(Boolean)
}

export function searchWords(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const directMatches = Object.values(WORDS).filter((word) => {
    const haystack = [
      word.cree,
      word.english,
      word.shortDefinition,
      ...word.topicIds,
      ...word.topicIds.map((topicId) => getTopic(topicId)?.label || ''),
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(q)
  })

  if (q === 'family') {
    return ['nohkom', 'nimosom', 'nikawiy', 'nohtawiy'].map((id) => WORDS[id])
  }

  return directMatches
}

export function getAutocompleteSuggestions(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const entries = [
    ...Object.values(WORDS).map((word) => ({
      id: word.id,
      kind: 'word',
      label: `${word.english} · ${word.cree}`,
      query: word.english,
    })),
    ...TOPICS.filter((topic) => topic.prototypeReady).map((topic) => ({
      id: topic.id,
      kind: 'topic',
      label: `${topic.label} topic`,
      query: topic.label,
    })),
  ]

  return entries
    .filter((entry) => entry.label.toLowerCase().includes(q) || entry.query.toLowerCase().includes(q))
    .slice(0, 6)
}

export function getClosestMatches(query) {
  const q = query.trim().toLowerCase()
  if (q.includes('pet')) {
    return [WORDS.atim, WORDS.minos, WORDS.acimosis]
  }
  if (q.includes('elephant')) {
    return [WORDS.mistatim, WORDS.atim, WORDS.kinosew]
  }
  if (q.includes('grandma') || q.includes('kokum')) {
    return [WORDS.nohkom, WORDS.nimosom]
  }
  if (q.includes('fam')) {
    return [WORDS.nikawiy, WORDS.nohtawiy, WORDS.nohkom]
  }
  return [WORDS.atim, WORDS.nohkom, WORDS.mistatim]
}

export function getSemanticGapExample(query) {
  const q = query.trim().toLowerCase()
  if (!q) return null
  if (q.includes('elephant')) return SEMANTIC_GAP_EXAMPLES.elephant
  return null
}

export function getInitialSavedTopics() {
  return [
    {
      id: 'topic-animals-basics',
      name: 'Animals Basics',
      words: ['atim', 'minos'],
      note: 'Starter list for common animal words',
    },
    {
      id: 'topic-family-review',
      name: 'Family Review',
      words: ['nohkom', 'nikawiy'],
      note: 'Example list for kinship terms',
    },
  ]
}
