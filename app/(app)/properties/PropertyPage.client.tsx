// PropertyPage.client.tsx

import React, { useEffect, useState } from 'react';
import { DataTable } from "./components/data-table"
import { columns } from "./components/columns"
import { getProperties, Property } from './page';

export default function PropertyPage() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getProperties();
      setProperties(data);
    };

    fetchProperties();
  }, []);

  return (
    <DataTable data={properties} columns={columns} />
  )
}