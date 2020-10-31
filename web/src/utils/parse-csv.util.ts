export default async function parseCSV(
  csvFile: File,
  columns: string[],
  separator = ';',
) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsText(csvFile);

    fileReader.onload = () => {
      const csv = fileReader.result as string;

      const parsedCSV = csv
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

      resolve(parsedCSV);
    };

    fileReader.onerror = reject;
  });
}
