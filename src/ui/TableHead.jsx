function TableHead({ headData }) {
  return (
    <thead className="bg-gray-50">
      <tr>
        {headData.map(head => {
          <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
            {head}
          </th>;
        })}
      </tr>
    </thead>
  );
}

export default TableHead;
