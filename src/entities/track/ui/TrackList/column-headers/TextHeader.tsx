export const TextHeader: React.FC<{
  column: {
    key: ColumnType
    label: string
  }
}> = ({ column }) => {
  return (
    <p>{column.label}</p>
  )
