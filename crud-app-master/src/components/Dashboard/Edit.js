import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ trainings, selectedTraining, setTrainings, setIsEditing }) => {
  const id = selectedTraining.id;

  const [education, setEducation] = useState(selectedTraining.education);
  const [instructor, setInstructor] = useState(selectedTraining.instructor);
  const [educationTime, setEducationTime] = useState(selectedTraining.educationTime);
  const [educationFee, setEducationFee] = useState(selectedTraining.educationFee);
  const [date, setDate] = useState(selectedTraining.date);

  const handleUpdate = e => {
    e.preventDefault();

    if (!education || !instructor || !educationTime || !educationFee || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const training = {
      id,
      education,
      instructor,
      educationTime,
      educationFee,
      date,
    };

    for (let i = 0; i < trainings.length; i++) {
      if (trainings[i].id === id) {
        trainings.splice(i, 1, training);
        break;
      }
    }

    localStorage.setItem('trainings_data', JSON.stringify(trainings));
    setTrainings(trainings);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${training.education} ${training.instructor}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Training</h1>
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
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
