import React from 'react';

const TableLayout = (props) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>

        {props.monitorItems ? (
          <tbody>
            {props.monitorItems.map((item, idx) => {
              return (
                <tr className="bg-red-200 ">
                  <th key={idx}>{idx + 1}</th>
                  <td>{item.id}</td>
                  <td>{item.value.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <th></th>
              <td>Loading...</td>
              <td></td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default TableLayout;
