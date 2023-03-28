import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { trainingsData } from '../../data';

const Dashboard = ({ setIsAuthenticated }) => {
  const [trainings, setTrainings] = useState(trainingsData);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('trainings_data'));
    if (data !== null && Object.keys(data).length !== 0) setTrainings(data);
  }, []);

  const handleEdit = id => {
    const [training] = trainings.filter(training => training.id === id);

    setSelectedTraining(training);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [training] = trainings.filter(training => training.id === id);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${training.education} ${training.instructor}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const trainingsCopy = trainings.filter(training => training.id !== id);
        localStorage.setItem('trainings_data', JSON.stringify(trainingsCopy));
        setTrainings(trainingsCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            trainings={trainings}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          trainings={trainings}
          setTrainings={setTrainings}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          trainings={trainings}
          selectedTraining={selectedTraining}
          setTrainings={setTrainings}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
