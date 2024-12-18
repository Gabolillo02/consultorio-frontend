
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { gql, useSubscription, useQuery } from "@apollo/client";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './ListadoEspecialistas.css'; // Asegúrate de crear este archivo para los estilos personalizados

const ALL_DOCTORS = gql`
  query AllDoctors {
    allDoctors {
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
      name
      lastName
      specialty
      atentionHours
      atentionDays
    }
  }
`;

function Doctors() {
  const { data: queryData, loading: queryLoading, error: queryError } = useQuery(ALL_DOCTORS);
  const { data: subscriptionData } = useSubscription(DOCTOR_CREATED);
  const [doctors, setDoctors] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [visible, setVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

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
  
  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error: {queryError.message}</p>;

  const handleCardClick = (doctor) => {
    setSelectedDoctor(doctor);
    setVisible(true);
  };

  const handleConfirm = () => {
    setVisible(false);
    navigate("/agendar-cita");
  };

  const closeHandler = () => {
    setVisible(false);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {doctors.map((doctor, index) => (
          <div key={index} className="doctor-card" onClick={() => handleCardClick(doctor)}>
            <h3>{doctor.fullName}</h3>
            <p>{doctor.specialty}</p>
            <p>{doctor.atentionHours}</p>
            <div className="atention-days">
              {doctor.atentionDays.map((day, idx) => (
                <span key={idx} className="day-chip">{day}</span>
              ))}
            </div>
          </div>
        ))}
      </Slider>
      <Modal
        isOpen={visible}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Confirmación</ModalHeader>
              <ModalBody>
              Agendar cita con {selectedDoctor ? selectedDoctor.fullName : ""}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={closeHandler}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={handleConfirm}>
                  Aceptar 
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="footer">
        <p>Contáctanos: info@dentallife.com</p>
        <p>Teléfono: +123 456 7890</p>
        <p>Dirección: Blvrd Riviera Nayarit 69-A, Sur, 63735 Mezcales, Nay.</p>
        <p>© 2024 Dental Life. Todos los derechos reservados. Equipo de Desarrollo Los Tilapios</p>
      </div>
    </div>
  );
}

export default Doctors;

      