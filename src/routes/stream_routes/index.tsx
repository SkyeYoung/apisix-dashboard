import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import type { A6Type } from '@/types/schema/apisix';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { useEffect, useMemo } from 'react';
import { streamRoutesQueryOptions } from '@/apis/streamRoutes';
import { pageSearchSchema } from '@/types/schema/pageSearch';
import { queryClient } from '@/config/global';
import { usePagination } from '@/utils/usePagination';
import ToAddPageBtn from '@/components/page/ToAddPageBtn';

function RouteComponent() {
  const { pagination, handlePageChange, updateTotal } = usePagination({
    queryKey: 'stream_routes',
  });

  const streamRoutesReq = useSuspenseQuery(
    streamRoutesQueryOptions(pagination)
  );
  const { data, isLoading } = streamRoutesReq;
  const { t } = useTranslation();

  useEffect(() => {
    if (data?.total) {
      updateTotal(data.total);
    }
  }, [data?.total, updateTotal]);

  const columns = useMemo<ProColumns<A6Type['RespStreamRouteItem']>[]>(() => {
    return [
      {
        dataIndex: 'id',
        title: 'ID',
        key: 'id',
        valueType: 'text',
      },
      {
        dataIndex: 'name',
        title: t('form.basic.name'),
        key: 'name',
        valueType: 'text',
      },
      {
        dataIndex: 'desc',
        title: t('form.basic.desc'),
        key: 'desc',
        valueType: 'text',
      },
      {
        dataIndex: 'remote_addr',
        title: t('form.stream_routes.remoteAddr'),
        key: 'remote_addr',
        valueType: 'text',
      },
    ];
  }, [t]);

  return (
    <ProTable
      columns={columns}
      dataSource={data.list}
      rowKey="id"
      loading={isLoading}
      search={false}
      options={false}
      pagination={{
        current: pagination.page,
        pageSize: pagination.pageSize,
        total: pagination.total,
        showSizeChanger: true,
        onChange: handlePageChange,
      }}
      toolBarRender={() => [
        <ToAddPageBtn
          key="add"
          to="/stream_routes/add"
          label={t('route.add.title')}
        />,
      ]}
    />
  );
}
export const Route = createFileRoute('/stream_routes/')({
  component: RouteComponent,
  validateSearch: pageSearchSchema,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) =>
    queryClient.ensureQueryData(streamRoutesQueryOptions(deps)),
});
