import React from 'react';

const Table = ({ trainings, handleEdit, handleDelete }) => {
  trainings.forEach((training, i) => {
    training.id = i + 1;
  });

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Education</th>
            <th>Instructor</th>
            <th>Education Time</th>
            <th>Education Fee</th>
            <th>Release Date</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {trainings.length > 0 ? (
            trainings.map((training, i) => (
              <tr key={training.id}>
                <td>{i + 1}</td>
                <td>{training.education}</td>
                <td>{training.instructor}</td>
                <td>{training.educationTime}</td>
                <td>{formatter.format(training.educationFee)}</td>
                <td>{training.date} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(training.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(training.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Training</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
