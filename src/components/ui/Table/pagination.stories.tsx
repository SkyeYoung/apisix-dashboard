/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Group, Table } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';

import { DataTablePagination } from './pagination';

type TableData = {
  id: string;
  name: string;
};
const generateData = (count: number): TableData[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    name: `Item ${i + 1}`,
  }));
};

const DataTablePaginationWrapper = () => {
  const data = useMemo(() => generateData(50), []);
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
    ],
    []
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <>
      <Table.ScrollContainer minWidth="80vw" maxHeight="80vh" type="scrollarea">
        <Table stickyHeader highlightOnHover>
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Th
                    key={header.id}
                    colSpan={header.colSpan}
                    rowSpan={header.rowSpan}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Table.Th>
                ))}
              </Table.Tr>
            ))}
          </Table.Thead>
          <Table.Tbody>
            {table.getRowModel().rows.map((row) => (
              <Table.Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Group justify="flex-end">
        <DataTablePagination
          pageCount={table.getPageCount()}
          pagination={table.getState().pagination}
          setPageSize={table.setPageSize}
          setPageIndex={table.setPageIndex}
        />
      </Group>
      <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>
    </>
  );
};

const meta = {
  component: DataTablePaginationWrapper,
  title: 'Pagination',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DataTablePaginationWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

// Default story with basic pagination
export const Default: Story = {
  args: {},
};
