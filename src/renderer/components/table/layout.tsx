import React from 'react';

const TableLayout = (props) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr className="">
            <th></th>
            <th>Value</th>
            <th>Name</th>
          </tr>
        </thead>

        {props.monitorItems ? (
          <tbody>
            {props.monitorItems.map((item, idx) => {
              return (
                <tr key={idx} className="bg-red-200 ">
                  <th>{idx + 1}</th>
                  <td>{item.value.toString()}</td>
                  <td>{item.id}</td>
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
