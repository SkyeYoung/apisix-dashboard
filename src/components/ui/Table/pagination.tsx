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

import { Pagination, Select } from '@mantine/core';
import type {
  PaginationInstance,
  PaginationState,
} from '@tanstack/react-table';

const defaultPageSizeOptions = ['10', '20', '30', '40', '50'];

type PageSizeSelectProps<T> = Pick<PaginationInstance<T>, 'setPageSize'> & {
  pagination: PaginationState;
  pageSizeOptions?: string[];
};
const PageSizeSelect = <T,>(props: PageSizeSelectProps<T>) => {
  const {
    pagination,
    setPageSize,
    pageSizeOptions = defaultPageSizeOptions,
  } = props;
  return (
    <Select
      size="xs"
      value={pagination.pageSize.toString()}
      onChange={(value) => setPageSize(Number(value))}
      styles={{ wrapper: { width: '100px' }, root: { margin: 0 } }}
      data={pageSizeOptions.map((d) => ({
        value: d,
        label: `${d} / page`,
      }))}
      allowDeselect={false}
      rightSectionWidth={0}
    />
  );
};

type DataTablePaginationProps<T> = PageSizeSelectProps<T> & {
  pageCount: number;
} & Pick<PaginationInstance<T>, 'setPageIndex'>;

export const DataTablePagination = <T,>(props: DataTablePaginationProps<T>) => {
  const { pagination, pageCount, pageSizeOptions, setPageSize, setPageIndex } =
    props;
  return (
    <>
      <Pagination
        total={pageCount}
        value={pagination.pageIndex + 1}
        onChange={(v) => setPageIndex(v - 1)}
        size="sm"
      />
      <PageSizeSelect
        pagination={pagination}
        setPageSize={setPageSize}
        pageSizeOptions={pageSizeOptions}
      />
    </>
  );
};
