# Technical Decisions & Pending Improvements

A running log of things that work but should be improved when time allows.

---

## SweetAlert2 → custom ConfirmDialog

**Current state**: SweetAlert2 is used only for the delete child confirmation in `src/views/Children.tsx`.

**Why it should be replaced:**
- ~50kb bundle weight for a single confirm dialog
- Its styles don't match the app's design (blue/amber glassmorphism) — it looks like a foreign element
- A custom replacement would be ~30 lines of Tailwind

**How to replace it:**
1. Create `src/components/ConfirmDialog.tsx` — a simple modal with title, message, confirm, and cancel buttons styled with the app's existing CSS variables
2. Replace the `Swal.fire(...)` call in `Children.tsx` with the new component
3. Remove the `sweetalert2` dependency from `package.json`

**Priority**: Low — not broken, just worth cleaning up during a frontend polish pass.

---
