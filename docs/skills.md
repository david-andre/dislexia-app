# Skills Engine — Scoring Reference

Source: `src/skills/engine.ts` + `src/skills/types.ts`

---

## Input data

Each completed level stores:

```ts
interface LevelResult {
  stars: number      // 1 | 2 | 3
  correct: number    // total correct answers in the level
  incorrect: number  // total wrong attempts in the level
}

// byChild[childId][levelId] = LevelResult | undefined
// undefined means the level has never been played
```

---

## Two primitives

```
accuracy(r)  = r.correct / (r.correct + r.incorrect)   → null if total = 0
precision(r) = r.stars / 3                              → null if r is undefined
```

- **accuracy** measures answer quality (did the child get it right?)
- **precision** measures automaticity (did the child get it right *efficiently*?)

---

## Weighted mean helper

```
wmean(entries: [value | null, weight][])
  → { value: number | null, confidence: number }
```

- Skips null entries when computing the mean
- `confidence` = fraction of non-null entries in the input array
- Returns `{ value: null, confidence: 0 }` if all entries are null

---

## Score conversion

```
toScore(raw) → { score: 0–100, confidence: 0–1 }
  score = round(min(raw.value, 1) * 100)   // capped at 100
  score = 0 if raw.value is null
```

---

## The five skills

### 1. Phonological Awareness (Conciencia Fonológica)

**Source**: Game1 L1+L2, Game2 L1+L2 (4 levels total)
**Metric**: accuracy

```
g1avg = wmean([accuracy(g1['1']), 1], [accuracy(g1['2']), 1])
g2avg = wmean([accuracy(g2['1']), 1], [accuracy(g2['2']), 1])
combined = wmean([g1avg.value, 1], [g2avg.value, 1])
confidence = count of { g1['1'], g1['2'], g2['1'], g2['2'] } that are non-null / 4
```

Note: confidence is computed directly from the 4 level slots, not from wmean's internal confidence.

**Worked example**: Child plays g1 L1 (8/10 correct) and g2 L1 (6/8 correct), nothing else.
```
g1avg.value = 0.8
g2avg.value = 0.75
combined.value = (0.8 + 0.75) / 2 = 0.775
score = round(0.775 × 100) = 78
confidence = 2/4 = 0.5
```

---

### 2. Visual Discrimination (Discriminación Visual)

**Source**: Game4 L1, L2, L3 (3 levels total)
**Metric**: accuracy
**Weights**: L1=1.0, L2=1.2, L3=1.5 (harder letter pairs weigh more)

```
score = wmean([accuracy(g4['1']), 1.0], [accuracy(g4['2']), 1.2], [accuracy(g4['3']), 1.5])
```

**Worked example**: All three levels played. L1=100%, L2=100%, L3=0%
```
weighted_sum = (1.0×1 + 1.2×1 + 1.5×0) = 2.2
total_weight = 1.0 + 1.2 + 1.5 = 3.7
value = 2.2 / 3.7 ≈ 0.595
score = 59
confidence = 1.0 (all 3 levels played)
```

---

### 3. Sequential Memory (Memoria Secuencial)

**Source**: Game2 L1+L2 (2 levels total)
**Metric**: precision (stars/3) — not accuracy

```
score = wmean([precision(g2['1']), 1], [precision(g2['2']), 1])
```

Using precision instead of accuracy here because **working memory failure shows up as needing retries** (lower stars), even when the child eventually gets the answer right.

**Worked example**: g2 L1 = 2 stars, g2 L2 = 1 star
```
precision L1 = 2/3 ≈ 0.667
precision L2 = 1/3 ≈ 0.333
wmean = (0.667 + 0.333) / 2 = 0.5
score = 50
confidence = 1.0
```

---

### 4. Auditory Processing (Procesamiento Auditivo)

**Source**: Game1 L1+L2 (2 levels total)
**Metric**: precision (stars/3)

```
score = wmean([precision(g1['1']), 1], [precision(g1['2']), 1])
```

Using precision because Game1 requires listening to audio — a child who needs multiple attempts is struggling with auditory decoding specifically, not just motor accuracy.

---

### 5. Processing Speed (Velocidad de Respuesta)

**Source**: All 7 levels across all games (g1 L1+L2, g2 L1+L2, g4 L1+L2+L3)
**Metric**: precision (stars/3), equal weight per level

```
score = wmean(
  [precision(g1['1']), 1], [precision(g1['2']), 1],
  [precision(g2['1']), 1], [precision(g2['2']), 1],
  [precision(g4['1']), 1], [precision(g4['2']), 1], [precision(g4['3']), 1]
)
```

Stars are the best proxy for automaticity: 3 stars = first-attempt correct = automatic recognition.

---

## Interpretation thresholds (Profile view)

| Category | Condition |
|----------|-----------|
| Fortaleza (Strength) | score ≥ 75 |
| En desarrollo (Developing) | 45 ≤ score < 75 |
| Necesita práctica (Needs Practice) | score < 45 AND confidence > 0 |
| Sin datos (No Data) | confidence = 0 |

---

## Confidence display (Profile UI)

| Confidence | Badge label |
|-----------|-------------|
| 0 | Sin datos |
| 0 < c < 0.75 | Parcial |
| ≥ 0.75 | Completo |

The progress label shows `levelsPlayed / totalLevels` where:
```
levelsPlayed = round(confidence × SKILL_META[key].totalLevels)
```

---

## Total levels per skill

| Skill | Total levels |
|-------|-------------|
| Phonological Awareness | 4 (G1-L1, G1-L2, G2-L1, G2-L2) |
| Visual Discrimination | 3 (G4-L1, G4-L2, G4-L3) |
| Sequential Memory | 2 (G2-L1, G2-L2) |
| Auditory Processing | 2 (G1-L1, G1-L2) |
| Processing Speed | 7 (all of the above) |
