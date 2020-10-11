import MaterialTable, { MaterialTableProps } from 'material-table';
import React from 'react';

import MTLocalization from '../../localization/material-table.localization';

interface Props<T extends object> extends MaterialTableProps<T> {
  onRefrechClick: () => void;
}

function Table<T extends object>({
  onRefrechClick,
  options,
  actions,
  ...props
}: Props<T>) {
  return (
    <MaterialTable<T>
      {...props}
      actions={[
        {
          icon: 'refresh',
          tooltip: 'Atualizar dados',
          isFreeAction: true,
          onClick: onRefrechClick,
        },
        ...(actions || []),
      ]}
      options={{
        draggable: false,
        search: false,
        actionsColumnIndex: -1,
        ...options,
      }}
      localization={MTLocalization}
    />
  );
}

export default Table;
