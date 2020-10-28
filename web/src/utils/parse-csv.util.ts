export default function parseCSV(
  csv: string,
  columns: string[],
  separator = ';',
) {
  return csv
    .split('\n')
    .map((row) => row.split(separator))
    .map((row) =>
      columns.reduce(
        (parsedRow, field, i) => ({
          ...parsedRow,
          [field]: row[i],
        }),
        {},
      ),
    );
}
