# Game Methodology — Orton-Gillingham Basis

## What is Orton-Gillingham?

Orton-Gillingham (OG) is a structured, multisensory literacy approach designed specifically for dyslexia. Its core principles:

- **Multisensory**: engages visual, auditory, and kinesthetic channels simultaneously
- **Phonological grounding**: builds from phonemes and syllables up to words
- **Sequential & incremental**: each step is mastered before the next
- **Immediate feedback**: the learner knows right away if they are correct

This app implements OG principles in four games, each targeting a specific cognitive area known to be weak in dyslexic readers.

---

## Game 1 — Syllable Identification (Discriminación Auditiva)

**OG area**: Auditory decoding + phonological awareness

**Mechanic**: The child hears a word. The word is displayed with one syllable missing (shown as a blank). The child taps the correct syllable from three options.

**Why this matters in OG**: Dyslexic children often fail to segment spoken words into syllables. This game forces explicit phonological segmentation — the child must hold the full word in memory, identify the missing piece, and match it to a visual symbol.

**Words used (Levels 1 & 2):**

| Word | Syllables | Missing slot |
|------|-----------|--------------|
| camiseta | CA – MI – SE – TA | MI |
| pecera | PE – CE – RA | CE |
| florero | FLO – RE – RO | RE |
| camioneta | CA – MIO – NE – TA | NE |
| teléfono | TE – LÉ – FO – NO | FO |

Level 2 uses the same five words in a different order (reordering prevents rote memorisation).

**Distractors**: Options always include two phonologically similar syllables (e.g. MI vs TI vs NI) to target phonological discrimination specifically.

---

## Game 2 — Syllable Ordering (Conciencia Fonológica)

**OG area**: Sequential memory + phonological awareness

**Mechanic**: The child hears a word. All its syllables are shown as draggable cards in scrambled order. The child must drag (or tap) them into the correct sequence.

**Why this matters in OG**: Syllable sequencing directly tests phonological working memory — the ability to hold a sound sequence in mind and reproduce it. This is a core deficit area for dyslexia. Getting the order wrong (e.g. MI-CA-SE-TA instead of CA-MI-SE-TA) is a classic dyslexic error pattern.

**Words used**: Same five words as Game 1.

**Undo button**: Allows removing the last placed syllable. Counted as an incorrect attempt for scoring.

---

## Game 3 — Letter Drawing (TODO)

**OG area**: Visual-motor integration + letter formation

**Planned mechanic**: A target letter is displayed. The child traces or draws it on a canvas. The app evaluates whether the stroke matches the expected letter shape.

**Why this matters in OG**: The kinesthetic (movement) channel reinforces letter identity. Children who confuse b/d or p/q often lack a strong motor memory for the letter. Drawing forces them to commit to a direction and form.

**Status**: UI placeholder exists. Game logic not yet built.

---

## Game 4 — Visual Letter Discrimination (Identificación Visual)

**OG area**: Visual discrimination of graphemes

**Mechanic**: A target letter is shown in a yellow box. A grid of letter cards is displayed — some matching the target, some showing a visually similar distractor. The child taps all matching cards, then presses "Verificar".

**Why this matters in OG**: Mirror and rotational letter confusions (b/d, p/q, m/n) are the most visible symptom of dyslexia. This game forces the child to distinguish letters that differ only by orientation.

**Levels and letter pairs:**

| Level | Target | Distractor | Grid | Difficulty rationale |
|-------|--------|------------|------|----------------------|
| 1 | p | q | 6 cards (4 correct) | Simple 180° rotation |
| 2 | m | n | 9 cards (5 correct) | Visual similarity in strokes |
| 3 | d | b | 9 cards (5 correct) | Most confusing pair — both mirror AND rotation confusions are possible |

Level 3 is weighted 1.5× in the Visual Discrimination skill score because it covers the hardest confusion type.

---

## Difficulty progression across games

All games share the same star-rating formula:

| Incorrect answers | Stars |
|-------------------|-------|
| 0 | 3 |
| 1–2 | 2 |
| 3+ | 1 |

Stars measure **consistency**, not just correctness. A child who gets all answers right on the first try earns 3 stars. A child who gets them right after multiple retries earns fewer — consistent with OG's emphasis on automaticity (fast, effortless recognition).
