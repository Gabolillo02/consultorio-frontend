import React, { useState, useEffect } from 'react';
import { gql, useSubscription, useQuery, useMutation } from "@apollo/client";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { VerticalDotsIcon } from './icons/VerticalDotsIcon.jsx';
import { PlusIcon } from "./icons/PlusIcon.jsx";
import FormRegistroDoc from './forms/FormRegistroDoc.jsx';
import FormEditarDoc from './forms/FormEditarDoc.jsx';

const ALL_DOCTORS = gql`
  query AllDoctors {
    allDoctors {
      id
      name
      lastName
      specialty
      atentionHours
      atentionDays
    }
  }
`;

const DOCTOR_CREATED = gql`
  subscription DoctorCreated {
    doctorCreated {
      id
      name
      lastName
      specialty
      atentionHours
      atentionDays
    }
  }
`;

const DOCTOR_DELETED = gql`
  subscription DoctorDeleted {
    doctorDeleted {
      id
      name
      lastName
      specialty
      atentionHours
      atentionDays
    }
  }
`;

const DELETE_DOCTOR = gql`
mutation DeleteDoctor($id: ID!) {
  deleteDoctor(id: $id) {
    email
  }
}
`;

const doctorColumns = [
  { key: "fullName", label: "Nombre Completo" },
  { key: "specialty", label: "Especialidad" },
  { key: "atentionHours", label: "Horario de Atención" },
  { key: "atentionDays", label: "Días de Atención" },
  { key: "actions", label: "Acciones" },
];

function Doctors() {
  const { data: queryData, loading: queryLoading, error: queryError } = useQuery(ALL_DOCTORS);
  const { data: subscriptionData } = useSubscription(DOCTOR_CREATED);
  const { data: deleteSubscriptionData } = useSubscription(DOCTOR_DELETED);
  const [deleteDoctor] = useMutation(DELETE_DOCTOR);

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [editDoctor, setEditDoctor] = useState(null);

  useEffect(() => {
    if (queryData) {
      const combinedDoctors = queryData.allDoctors.map(doctor => ({
        ...doctor,
        fullName: `${doctor.name} ${doctor.lastName}`
      }));
      setDoctors(combinedDoctors);
    }
  }, [queryData]);

  useEffect(() => {
    if (subscriptionData) {
      const newDoctor = {
        ...subscriptionData.doctorCreated,
        fullName: `${subscriptionData.doctorCreated.name} ${subscriptionData.doctorCreated.lastName}`
      };
      setDoctors(prevDoctors => [...prevDoctors, newDoctor]);
    }
  }, [subscriptionData]);

  useEffect(() => {
    if (deleteSubscriptionData) {
      const deletedDoctorId = deleteSubscriptionData.doctorDeleted.id;
      setDoctors(prevDoctors => prevDoctors.filter(doctor => doctor.id !== deletedDoctorId));
    }
  }, [deleteSubscriptionData]);

  const handleDeleteDoctor = async (id) => {
    try {
      await deleteDoctor({ variables: { id } });
      setDoctors(doctors.filter(d => d.id !== id));
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error: {queryError.message}</p>;

  return (
    <div>
      <div className='p-9'>
        <Table aria-label="Table of doctors" selectionMode="single" className='mt-20'>
          <TableHeader columns={doctorColumns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={doctors}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => {
                  if (columnKey === "atentionDays") {
                    return (
                      <TableCell>
                        {item[columnKey].map((day, index) => (
                          <Chip key={index} variant='flat' className='mx-1'>{day}</Chip>
                        ))}
                      </TableCell>
                    );
                  } else if (columnKey === "actions") {
                    return (
                      <TableCell>
                        <Dropdown aria-label="Actions for doctor">
                          <DropdownTrigger aria-label="Actions menu">
                            <Button isIconOnly size="sm" variant="light" aria-label="Actions button">
                              <VerticalDotsIcon className="text-default-300" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Actions menu options">
                            <DropdownItem aria-label="Edit doctor" onClick={() => {
                              setEditDoctor(item);
                            }}>Editar</DropdownItem>
                            <DropdownItem aria-label="Delete doctor" color="error" onPress={() => handleDeleteDoctor(item.id)}>Eliminar</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </TableCell>
                    );
                  } else {
                    return <TableCell>{item[columnKey]}</TableCell>;
                  }
                }}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className='mt-12'><FormRegistroDoc /></div>
        {editDoctor && <FormEditarDoc doctor={editDoctor} onClose={() => setEditDoctor(null)} />}
      </div>
    </div>
  );
}

export default Doctors;
