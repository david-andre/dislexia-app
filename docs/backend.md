# Backend Plan — NestJS

## Stack decision

- **NestJS** (TypeScript, modular architecture)
- **PostgreSQL** as database (recommended: via TypeORM or Prisma)
- **JWT** for auth (supervisor sessions)
- Separate repository from the frontend

The frontend expects the backend at `VITE_API_URL` (default `http://localhost:4000`).

---

## Module structure (suggested)

```
src/
├── auth/           # JWT login/register, guards
├── users/          # Supervisor user entity
├── children/       # Child profiles (scoped to supervisor)
├── results/        # Game level results
├── skills/         # Computed skill profiles (can mirror frontend engine)
└── common/         # Shared pipes, filters, interceptors
```

---

## Data model

### User (Supervisor)

```ts
@Entity()
class User {
  @PrimaryGeneratedColumn('uuid') id: string
  @Column({ unique: true }) email: string
  @Column() passwordHash: string
  @CreateDateColumn() createdAt: Date
  @OneToMany(() => Child, (c) => c.user) children: Child[]
}
```

### Child

```ts
@Entity()
class Child {
  @PrimaryGeneratedColumn('uuid') id: string
  @Column() nombre: string
  @Column({ nullable: true }) apellido: string
  @Column({ nullable: true }) edad: number
  @ManyToOne(() => User, (u) => u.children) user: User
  @CreateDateColumn() createdAt: Date
  @OneToMany(() => GameResult, (r) => r.child) results: GameResult[]
}
```

### GameResult

```ts
@Entity()
class GameResult {
  @PrimaryGeneratedColumn('uuid') id: string
  @ManyToOne(() => Child, (c) => c.results) child: Child
  @Column() game: 'game1' | 'game2' | 'game4'   // game3 when built
  @Column() levelId: string                       // '1' | '2' | '3'
  @Column() correct: number
  @Column() incorrect: number
  @Column() stars: number                         // 1 | 2 | 3
  @CreateDateColumn() playedAt: Date
}
```

**Important**: The backend stores **all attempts**. The "best result per level" logic (currently in frontend stores) moves to a database query:
```sql
SELECT DISTINCT ON (level_id) *
FROM game_results
WHERE child_id = $1 AND game = $2
ORDER BY level_id, stars DESC, played_at DESC
```

---

## API endpoints

### Auth — `/api/auth`

| Method | Path | Body | Response | Notes |
|--------|------|------|----------|-------|
| POST | `/login` | `{ email, password }` | `{ accessToken, user }` | JWT in response body |
| POST | `/register` | `{ email, password }` | `{ accessToken, user }` | |
| GET | `/me` | — | `User` | Requires Bearer token |

### Children — `/api/children`

All endpoints require auth. Children are scoped to the logged-in supervisor.

| Method | Path | Body | Response |
|--------|------|------|----------|
| GET | `/` | — | `Child[]` |
| POST | `/` | `{ nombre, apellido?, edad? }` | `Child` |
| PUT | `/:id` | `{ nombre, apellido?, edad? }` | `Child` |
| DELETE | `/:id` | — | `204 No Content` |

### Game Results — `/api/results`

| Method | Path | Body | Response |
|--------|------|------|----------|
| POST | `/` | see payload below | `GameResult` |
| GET | `/:childId` | — | `GameResult[]` (all attempts) |
| GET | `/:childId/best` | — | Best result per level per game |

**POST `/api/results` payload:**
```json
{
  "childId": "uuid",
  "game": "game1",
  "levelId": "1",
  "correct": 4,
  "incorrect": 2,
  "stars": 2
}
```

### Skills — `/api/skills/:childId`

| Method | Path | Response |
|--------|------|----------|
| GET | `/:childId` | `SkillProfile` |

The backend can compute this by fetching best results per level and running the same formula as `src/skills/engine.ts`. The formula is pure math so it can be ported to TypeScript on the backend without changes.

**SkillProfile response shape:**
```json
{
  "phonologicalAwareness": { "score": 78, "confidence": 0.5 },
  "visualDiscrimination":  { "score": 59, "confidence": 1.0 },
  "sequentialMemory":      { "score": 50, "confidence": 1.0 },
  "auditoryProcessing":    { "score": 66, "confidence": 0.5 },
  "processingSpeed":       { "score": 71, "confidence": 0.71 }
}
```

---

## Frontend migration plan

When the backend is ready, replace localStorage stores one at a time:

| Step | What to replace | Frontend change |
|------|----------------|-----------------|
| 1 | `authStore` | Wire `LoginRegister.tsx` `onSubmit` to `POST /api/auth/login` and `POST /api/auth/register`. Store JWT in `localStorage` or httpOnly cookie. |
| 2 | `childrenStore` | Replace CRUD methods with TanStack Query mutations hitting `/api/children`. |
| 3 | Game progress stores | After each game's `VictoryModal` closes, `POST /api/results`. On level select, fetch `GET /api/results/:childId/best` via TanStack Query. |
| 4 | Skills / Profile | Replace `computeSkillProfile` call with `GET /api/skills/:childId`. Keep the local engine as a fallback while offline. |

---

## Auth notes

- The frontend `LoginRegister.tsx` validates email + password with Zod. The `username` field in the form maps to `email` on the backend.
- The demo mode button (`setUser({ id: 'dev-user', username: 'demo' })`) should be removed or disabled before production.
- The `selectedChild` in `authStore` is session-only (not persisted) — the supervisor picks a child on every session. This is intentional.

---

## Environment variables

Frontend (`.env`):
```
VITE_API_URL=http://localhost:4000
```

Backend (`.env`):
```
DATABASE_URL=postgresql://user:pass@localhost:5432/dislexia
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
PORT=4000
```
