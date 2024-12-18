import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useMutation, gql } from '@apollo/client';
import { Input, Button } from "@nextui-org/react";

const ADD_APPOINTMENT = gql`
  mutation AddAppointment($date: String!, $time: String!, $treatment: String!, $patient: personInput!, $price: Float, $address: String!, $doctor: String!) {
    addAppointment(date: $date, time: $time, treatment: $treatment, patient: $patient, price: $price, address: $address, doctor: $doctor) {
      id
      date
      time
      treatment
      patient {
        name
        lastName
        phone
        email
      }
      price
      address
      doctor
    }
  }
`;

function AgendarCita() {
  const { isAuthenticated, userEmail } = useAuth();
  const [formState, setFormState] = useState({
    date: '',
    time: '',
    treatment: '',
    patient: {
      name: '',
      lastName: '',
      phone: '',
      email: userEmail
    },
    price: '',
    address: '',
    doctor: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userEmail) {
      setFormState((prevState) => ({
        ...prevState,
        patient: {
          ...prevState.patient,
          email: userEmail
        }
      }));
    }
  }, [userEmail]);

  const [addAppointment, { data, loading, error }] = useMutation(ADD_APPOINTMENT);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formState.patient) {
      setFormState({
        ...formState,
        patient: {
          ...formState.patient,
          [name]: value
        }
      });
    } else {
      setFormState({
        ...formState,
        [name]: value
      });
    }
    // Limpiar el error para el input que está cambiando
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formState.date) newErrors.date = 'La fecha es obligatoria';
    if (!formState.time) newErrors.time = 'La hora es obligatoria';
    if (!formState.treatment) newErrors.treatment = 'El tratamiento es obligatorio';
    if (!formState.patient.name) newErrors.name = 'El nombre del paciente es obligatorio';
    if (!formState.patient.lastName) newErrors.lastName = 'El apellido del paciente es obligatorio';
    if (!formState.address) newErrors.address = 'La dirección es obligatoria';
    if (!formState.doctor) newErrors.doctor = 'El doctor es obligatorio';

    // Convertir precio a float y validar
    const price = parseFloat(formState.price);
    if (isNaN(price) || price < 0) newErrors.price = 'El precio debe ser un número válido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Todos los campos son requeridos")
      return;
    }

    const formData = {
      ...formState,
      price: parseFloat(formState.price),
    };

    try {
      await addAppointment({ variables: formData });
      alert('¡Cita agendada con éxito!');
      setFormState({
        date: '',
        time: '',
        treatment: '',
        patient: {
          name: '',
          lastName: '',
          phone: '',
          email: userEmail
        },
        price: '',
        address: '',
        doctor: ''
      });
      setErrors({});
    } catch (error) {
      setFormState({
        date: '',
        time: '',
        treatment: '',
        patient: {
          name: '',
          lastName: '',
          phone: '',
          email: userEmail
        },
        price: '',
        address: '',
        doctor: ''
      });
      console.error('Error al agendar la cita:', error);
    }
  };

  if (!isAuthenticated) {
    return <h2>Inicia sesión para programar una cita</h2>;
  }

  return (
    <div className='mx-36'>
      <h1 className='text-2xl mt-14'>Agendar Cita</h1>
      <p>Aquí podrás agendar una cita con el especialista seleccionado.</p>
      <form onSubmit={handleSubmit} className='mx-24 mt-5'>
        <div className="mb-4">
          <Input 
            label="Fecha" 
            type="date" 
            name="date" 
            value={formState.date} 
            onChange={handleChange} 
            required 
            status={errors.date && "error"} 
            helperText={errors.date} 
          />
        </div>
        <div className="mb-4">
          <Input 
            label="Hora" 
            type="time" 
            name="time" 
            value={formState.time} 
            onChange={handleChange} 
            required 
            status={errors.time && "error"} 
            helperText={errors.time} 
          />
        </div>
        <div className="mb-4">
          <Input 
            label="Tratamiento" 
            name="treatment" 
            value={formState.treatment} 
            onChange={handleChange} 
            required 
            status={errors.treatment && "error"} 
            helperText={errors.treatment} 
          />
        </div>
        <div className="mb-4">
          <Input 
            label="Nombre del Paciente" 
            name="name" 
            value={formState.patient.name} 
            onChange={handleChange} 
            required 
            status={errors.name && "error"} 
            helperText={errors.name} 
          />
        </div>
        <div className="mb-4">
          <Input 
            label="Apellido del Paciente" 
            name="lastName" 
            value={formState.patient.lastName} 
            onChange={handleChange} 
            required 
            status={errors.lastName && "error"} 
            helperText={errors.lastName} 
          />
        </div>
        <div className="mb-4">
          <Input 
            label="Teléfono" 
            name="phone" 
            value={formState.patient.phone} 
            onChange={handleChange} 
            status={errors.phone && "error"} 
            helperText={errors.phone} 
          />
        </div>
        <div className="mb-4">
          <Input 
            label="Precio" 
            type="number" 
            step="0.01" 
            name="price" 
            value={formState.price} 
            onChange={handleChange} 
            required 
            status={errors.price && "error"} 
            helperText={errors.price} 
          />
        </div>
        <div className="mb-4">
          <Input 
            label="Dirección" 
            name="address" 
            value={formState.address} 
            onChange={handleChange} 
            required 
            status={errors.address && "error"} 
            helperText={errors.address} 
          />
        </div>
        <div className="mb-4">
          <Input 
            label="Doctor" 
            name="doctor" 
            value={formState.doctor} 
            onChange={handleChange} 
            required 
            status={errors.doctor && "error"} 
            helperText={errors.doctor} 
          />
        </div>
        <Button type="submit" disabled={loading}>Agendar</Button>
      </form>
    </div>
  );
}

export default AgendarCita;
