import { useState, useEffect } from 'react';

import parseCSV from '../utils/parse-csv.util';

export default function useParsedCSV<T extends string[]>(
  csvFile: File | undefined,
  columns: T,
): object[] {
  const [parsedCSV, setParsedCSV] = useState();

  useEffect(() => {
    if (csvFile) {
      const fileReader = new FileReader();
      fileReader.readAsText(csvFile);
      fileReader.onload = () => {
        setParsedCSV(parseCSV(fileReader.result as string, columns));
      };
    }
  }, [csvFile]);

  return parsedCSV;
}
