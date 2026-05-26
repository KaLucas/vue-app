export function formatDate(date?: string, options?: Intl.DateTimeFormatOptions) {
  if (!date) return ''

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    ...options,
  }).format(new Date(date))
}
