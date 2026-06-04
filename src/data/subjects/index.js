import civilLaw from './civilLawData.js'
import criminalLaw from './criminalLawData.js'
import politicalLaw from './politicalLawData.js'
import remedialLaw from './remedialLawData.js'
import commercialLaw from './commercialLawData.js'
import taxationLaw from './taxationLawData.js'
import laborLaw from './laborLawData.js'
import legalEthics from './legalEthicsData.js'
import legalWriting from './legalWritingData.js'

export const SUBJECT_REGISTRY = [
  civilLaw,
  criminalLaw,
  politicalLaw,
  remedialLaw,
  commercialLaw,
  taxationLaw,
  laborLaw,
  legalEthics,
  legalWriting,
]

export const getSubject = (id) => SUBJECT_REGISTRY.find((s) => s.id === id)

export const getSubjectFlashcards = (id) => getSubject(id)?.flashcards ?? []

export const getSubjectBarQuestions = (id) => getSubject(id)?.barQuestions ?? []

export const getSubjectCodals = (id) => getSubject(id)?.codals ?? []

export const getSubjectTopics = (id) => getSubject(id)?.topics ?? []

export const getSubjectMnemonics = (id) => getSubject(id)?.mnemonics ?? []

export const getSubjectRecitations = (id) => getSubject(id)?.recitations ?? []

export const getSubjectIssueSpotting = (id) => getSubject(id)?.issueSpotting ?? []

export const getAllFlashcards = () =>
  SUBJECT_REGISTRY.flatMap((s) =>
    s.flashcards.map((f) => ({ ...f, subject: s.id }))
  )

export const getAllBarQuestions = () =>
  SUBJECT_REGISTRY.flatMap((s) =>
    s.barQuestions.map((q) => ({ ...q, subject: s.id }))
  )

export const getAllCodals = () =>
  SUBJECT_REGISTRY.flatMap((s) =>
    s.codals.map((c) => ({ ...c, subject: s.id, subjectName: s.name }))
  )

export const getTotalFlashcardCount = () =>
  SUBJECT_REGISTRY.reduce((sum, s) => sum + s.flashcards.length, 0)

export const getTotalBarQuestionCount = () =>
  SUBJECT_REGISTRY.reduce((sum, s) => sum + s.barQuestions.length, 0)

export default SUBJECT_REGISTRY
