import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Pencil, Trash2, PlusCircle, Baby } from 'lucide-react'
import Swal from 'sweetalert2'
import { useShallow } from 'zustand/react/shallow'
import { useAuthStore } from '@/stores/authStore'
import { useChildrenStore } from '@/stores/childrenStore'
import AnimatedJumbotron from '@/components/AnimatedJumbotron'
import LinkButton from '@/components/LinkButton'
import type { Child } from '@/types'
import './game1.css'
import './children.css'

// ── Constants ─────────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  '#f59e0b', '#ef4444', '#8b5cf6', '#10b981',
  '#3b82f6', '#f97316', '#ec4899', '#06b6d4',
]

const jumbotronProps = {
  content: ['Mis', 'Niños'] as [string, string],
  style: 'flex-1 text-center',
  text: 'text-4xl sm:text-5xl',
}

// ── Form schema ────────────────────────────────────────────────────────────────

const childSchema = z.object({
  nombre: z.string().min(1, 'Requerido').max(40),
  apellido: z.string().min(1, 'Requerido').max(40),
  edad: z.preprocess(
    (v) => (v === '' || v === undefined ? undefined : Number(v)),
    z
      .number({ invalid_type_error: 'Debe ser un número' })
      .int()
      .min(1, 'Mínimo 1')
      .max(18, 'Máximo 18')
      .optional()
  ),
})

type ChildFormValues = z.infer<typeof childSchema>

// ── ChildFormModal ─────────────────────────────────────────────────────────────

interface ChildFormModalProps {
  initial: Child | null
  onSave: (data: ChildFormValues) => void
  onClose: () => void
}

function ChildFormModal({ initial, onSave, onClose }: ChildFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChildFormValues>({
    resolver: zodResolver(childSchema),
    defaultValues: {
      nombre: initial?.nombre ?? '',
      apellido: initial?.apellido ?? '',
      edad: initial?.edad,
    },
  })

  useEffect(() => {
    reset({
      nombre: initial?.nombre ?? '',
      apellido: initial?.apellido ?? '',
      edad: initial?.edad,
    })
  }, [initial, reset])

  const title = initial ? 'Editar Niño' : 'Agregar Niño'

  return (
    <div className="child-modal-overlay" role="dialog" aria-modal="true" aria-label={title}>
      <div className="child-modal">
        <h2 className="child-modal__title">{title}</h2>

        <form onSubmit={handleSubmit(onSave)} noValidate>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="child-modal__field">
              <label className="child-modal__label" htmlFor="child-nombre">
                Nombre
              </label>
              <input
                id="child-nombre"
                className={`child-modal__input${errors.nombre ? ' child-modal__input--error' : ''}`}
                placeholder="Ej: María"
                {...register('nombre')}
              />
              {errors.nombre ? (
                <span className="child-modal__error">{errors.nombre.message}</span>
              ) : null}
            </div>

            <div className="child-modal__field">
              <label className="child-modal__label" htmlFor="child-apellido">
                Apellido
              </label>
              <input
                id="child-apellido"
                className={`child-modal__input${errors.apellido ? ' child-modal__input--error' : ''}`}
                placeholder="Ej: González"
                {...register('apellido')}
              />
              {errors.apellido ? (
                <span className="child-modal__error">{errors.apellido.message}</span>
              ) : null}
            </div>

            <div className="child-modal__field">
              <label className="child-modal__label" htmlFor="child-edad">
                Edad{' '}
                <span style={{ fontWeight: 400, color: '#94a3b8' }}>(opcional)</span>
              </label>
              <input
                id="child-edad"
                type="number"
                min={1}
                max={18}
                className={`child-modal__input${errors.edad ? ' child-modal__input--error' : ''}`}
                placeholder="Ej: 8"
                {...register('edad')}
              />
              {errors.edad ? (
                <span className="child-modal__error">{errors.edad.message}</span>
              ) : null}
            </div>

            <div className="child-modal__actions">
              <button
                type="button"
                className="child-modal__btn child-modal__btn--secondary"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button type="submit" className="child-modal__btn child-modal__btn--primary">
                {initial ? 'Guardar' : 'Agregar'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── ChildCard ──────────────────────────────────────────────────────────────────

interface ChildCardProps {
  child: Child
  colorIndex: number
  onPlay: (child: Child) => void
  onEdit: (child: Child) => void
  onDelete: (child: Child) => void
}

function ChildCard({ child, colorIndex, onPlay, onEdit, onDelete }: ChildCardProps) {
  const avatarColor = AVATAR_COLORS[colorIndex % AVATAR_COLORS.length]
  const initial = child.nombre.charAt(0).toUpperCase()
  const fullName = `${child.nombre} ${child.apellido}`.trim()

  return (
    <div className="child-card">
      <div className="child-avatar" style={{ background: avatarColor }}>
        {initial}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem' }}>
        <span className="child-name">{fullName}</span>
        {child.edad !== undefined ? (
          <span className="child-age">{child.edad} años</span>
        ) : null}
      </div>

      <button
        type="button"
        className="child-play-btn"
        onClick={() => onPlay(child)}
        aria-label={`Jugar con ${fullName}`}
      >
        ¡Jugar!
      </button>

      <div className="child-actions">
        <button
          type="button"
          className="child-action-btn child-action-btn--edit"
          onClick={() => onEdit(child)}
          aria-label={`Editar ${fullName}`}
        >
          <Pencil size={16} />
        </button>
        <button
          type="button"
          className="child-action-btn child-action-btn--delete"
          onClick={() => onDelete(child)}
          aria-label={`Eliminar ${fullName}`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}

// ── AddChildCard ───────────────────────────────────────────────────────────────

function AddChildCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="child-add-card"
      onClick={onClick}
      aria-label="Agregar nuevo niño"
    >
      <PlusCircle size={40} style={{ opacity: 0.85 }} />
      <span style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: '1.1rem' }}>
        Agregar niño
      </span>
    </button>
  )
}

// ── Modal state type ───────────────────────────────────────────────────────────

type ModalState = { mode: 'add' } | { mode: 'edit'; child: Child } | null

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Children() {
  const navigate = useNavigate()
  const [modalState, setModalState] = useState<ModalState>(null)

  const userId = useAuthStore((s) => s.user?.id ?? '')
  const setSelectedChild = useAuthStore((s) => s.setSelectedChild)

  const children = useChildrenStore(
    useShallow((s) => s.byUser[userId] ?? [])
  )
  const addChild = useChildrenStore((s) => s.addChild)
  const updateChild = useChildrenStore((s) => s.updateChild)
  const deleteChild = useChildrenStore((s) => s.deleteChild)

  const handlePlay = useCallback(
    (child: Child) => {
      setSelectedChild(child)
      navigate('/games')
    },
    [setSelectedChild, navigate]
  )

  const handleEdit = useCallback((child: Child) => {
    setModalState({ mode: 'edit', child })
  }, [])

  const handleDelete = useCallback(
    async (child: Child) => {
      const result = await Swal.fire({
        title: '¿Eliminar?',
        text: `¿Deseas eliminar a ${child.nombre} ${child.apellido}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
      })
      if (result.isConfirmed) {
        deleteChild(userId, child.id)
      }
    },
    [deleteChild, userId]
  )

  const handleSave = useCallback(
    (data: ChildFormValues) => {
      if (modalState?.mode === 'edit') {
        updateChild(userId, { ...modalState.child, ...data })
      } else {
        addChild(userId, data)
      }
      setModalState(null)
    },
    [modalState, addChild, updateChild, userId]
  )

  const modalInitial = modalState?.mode === 'edit' ? modalState.child : null

  return (
    <div className="children-page g1 min-h-full px-4 pt-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <LinkButton
          to="/main-page"
          icon="back"
          color="bg-blue-500 hover:bg-blue-600"
          fontSize="text-2xl p-3 min-w-[3rem] min-h-[3rem]"
          ariaLabel="Volver al inicio"
        />
        <AnimatedJumbotron features={jumbotronProps} />
        <div className="w-12" aria-hidden />
      </div>

      {/* Children grid or empty state */}
      {children.length === 0 ? (
        <div className="children-empty">
          <Baby size={64} style={{ opacity: 0.7 }} />
          <p style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: '1.4rem' }}>
            Aún no hay niños registrados
          </p>
          <p style={{ fontSize: '1rem', opacity: 0.85 }}>
            Agrega un niño para comenzar a jugar
          </p>
          <button
            type="button"
            className="child-play-btn"
            style={{ maxWidth: '14rem', marginTop: '0.5rem' }}
            onClick={() => setModalState({ mode: 'add' })}
          >
            Agregar primer niño
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {children.map((child, index) => (
            <ChildCard
              key={child.id}
              child={child}
              colorIndex={index}
              onPlay={handlePlay}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
          <AddChildCard onClick={() => setModalState({ mode: 'add' })} />
        </div>
      )}

      {/* Add / Edit modal */}
      {modalState !== null ? (
        <ChildFormModal
          initial={modalInitial}
          onSave={handleSave}
          onClose={() => setModalState(null)}
        />
      ) : null}
    </div>
  )
}
