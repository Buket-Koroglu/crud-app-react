import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ trainings, setTrainings, setIsAdding }) => {
  const [education, setEducation] = useState('');
  const [instructor, setInstructor] = useState('');
  const [educationTime, setEducationTime] = useState('');
  const [educationFee, setEducationFee] = useState('');
  const [date, setDate] = useState('');

  const handleAdd = e => {
    e.preventDefault();

    if (!education || !instructor || !educationTime || !educationFee || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const id = trainings.length + 1;
    const newTraining = {
      id,
      education,
      instructor,
      educationTime,
      educationFee,
      date,
    };

    trainings.push(newTraining);
    localStorage.setItem('trainings_data', JSON.stringify(trainings));
    setTrainings(trainings);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${education} ${instructor}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Training</h1>
        <label htmlFor="education">Education</label>
        <input
          id="education"
          type="text"
          name="education"
          value={education}
          onChange={e => setEducation(e.target.value)}
        />
        <label htmlFor="instructor">Instructor</label>
        <input
          id="instructor"
          type="text"
          name="instructor"
          value={instructor}
          onChange={e => setInstructor(e.target.value)}
        />
        <label htmlFor="educationTime">Education Time</label>
        <input
          id="educationTime"
          type="text"
          name="educationTime"
          value={educationTime}
          onChange={e => setEducationTime(e.target.value)}
        />
        <label htmlFor="educationFee">Education Fee ($)</label>
        <input
          id="educationFee"
          type="number"
          name="educationFee"
          value={educationFee}
          onChange={e => setEducationFee(e.target.value)}
        />
        <label htmlFor="date">Release Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
