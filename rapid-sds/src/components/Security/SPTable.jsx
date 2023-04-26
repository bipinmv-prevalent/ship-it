import { useCallback, useMemo, useState, useEffect } from 'react';
import Table from '../Table';
import { RAPID_API_URL } from '../../config/constants';

const SPTable = ({ client, order }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        accessor: 'ip_address',
        Header: 'IP Address',
      },
      {
        accessor: 'hostname',
        Header: 'Hostname',
      },
      {
        accessor: 'open_ports',
        Header: 'Open Ports',
        Cell: ({ value }) => value?.toString()
      },
      {
        accessor: 'client',
        Header: 'Client',
      },
      {
        accessor: 'security_header',
        Header: 'Security Header',
        style: { width: "20%" },
        Cell: ({ value }) => value?.substring(0, 200)
      },
      {
        accessor: 'extract_ssl_info',
        Header: 'Extract SSL Info',
        style: { width: "35%" },
        Cell: ({ value }) => value?.substring(0, 200)
      }
    ],
    []
  );

  useEffect(() => {
    getData();
  }, [getData, client]);

  const getData = useCallback(async () => {
    const response = await fetch(`${RAPID_API_URL}${order}?client=${client}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setData(data);
    setLoading(false);
  }, [client, order]);

  return (
    <div className="container-fluid mt-3 mb-4">
      <div className="u-font-white u-font-14 fw-bold mb-2 pb-2">External Facing Asset Inventory</div>
      <Table
        columns={columns}
        data={data}
        loading={loading}
        manualSortBy={false}
        pageSizes={[10, 20, 50, 100]}
        totalCount={data?.length}
      />
    </div>
  );
};

export default SPTable;
