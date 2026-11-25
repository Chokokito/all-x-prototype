'use client'

import React, { useRef, useState } from 'react'
import { useField } from '@payloadcms/ui'

/**
 * Campo interativo de foto de perfil.
 * Redimensiona a imagem no navegador para 160x160 (JPEG compacto) para salvar direto
 * no banco sem depender de disco efêmero.
 */
export default function AvatarField({ path }: { path: string }) {
  const { value, setValue } = useField<string>({ path })
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Escolha um arquivo de imagem (PNG, JPG ou WebP).')
      return
    }
    setError('')
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const size = 160
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        const min = Math.min(img.width, img.height)
        const sx = (img.width - min) / 2
        const sy = (img.height - min) / 2
        ctx.drawImage(img, sx, sy, min, min, 0, 0, size, size)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82)
        setValue(dataUrl)
      }
      img.onerror = () => setError('Não foi possível ler esta imagem.')
      img.src = String(reader.result || '')
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="allx-avatar-field">
      <label className="field-label">Foto de Perfil</label>
      <div className="allx-avatar-field__row">
        <div className="allx-avatar-field__preview">
          {value ? (
            <img src={value} alt="Foto de perfil" />
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          )}
        </div>
        <div className="allx-avatar-field__actions">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFile}
            style={{ display: 'none' }}
          />
          <button
            type="button"
            className="allx-avatar-field__btn"
            onClick={() => inputRef.current?.click()}
          >
            {value ? 'Trocar foto' : 'Enviar foto'}
          </button>
          {value && (
            <button
              type="button"
              className="allx-avatar-field__btn is-ghost"
              onClick={() => setValue('')}
            >
              Remover
            </button>
          )}
          <span className="allx-avatar-field__hint">
            PNG, JPG ou WebP — recortada automaticamente em quadrado. Clique em Salvar para aplicar.
          </span>
          {error && <span className="allx-avatar-field__err">{error}</span>}
        </div>
      </div>
    </div>
  )
}
