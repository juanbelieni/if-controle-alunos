export default function createCSV(
  data: Record<string, any>[],
  columns: string[],
  separator = ';',
) {
  const csv = data
    .map((row) => columns.map((column) => row[column]).join(separator))
    .join('\n');

  return csv;
}
