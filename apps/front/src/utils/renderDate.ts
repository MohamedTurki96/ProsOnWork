export function renderDate(date: string | Date) {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  return parsedDate.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
