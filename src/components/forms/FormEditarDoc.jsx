import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem } from "@nextui-org/react";
import { MailIcon } from '../icons/MailIcon.jsx';
import { Name } from "../icons/Name.jsx";
import { notification, TimePicker } from "antd";
import { gql, useMutation } from "@apollo/client";
import dayjs from 'dayjs';

const { RangePicker } = TimePicker;

const UPDATE_DOCTOR = gql`
  mutation UpdateDoctor($id: ID!, $name: String!, $lastName: String!, $gender: String!, $phone: String!, $email: String!, $specialty: String!, $professionalId: String!, $office: String!, $atentionDays: [String!]!, $atentionHours: String!) {
    updateDoctor(id: $id, name: $name, lastName: $lastName, gender: $gender, phone: $phone, email: $email, specialty: $specialty, professionalID: $professionalId, office: $office, atentionDays: $atentionDays, atentionHours: $atentionHours) {
      id
      name
      lastName
      atentionDays
      atentionHours
      email
      gender
      office
      phone
      professionalID
      specialty
    }
  }
`;

export default function FormEditarDoc({ doctor, onClose }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [idProfesional, setIdProfesional] = useState("");
  const [consultorio, setConsultorio] = useState("");
  const [diasAtencion, setDiasAtencion] = useState(new Set([]));
  const [horasAtencion, setHorasAtencion] = useState([]);
  const [genero, setGenero] = useState("");
  const [updateDoctor] = useMutation(UPDATE_DOCTOR);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (doctor) {
      setNombre(doctor.name);
      setApellido(doctor.lastName);
      setCorreo(doctor.email);
      setTelefono(doctor.phone);
      setEspecialidad(doctor.specialty);
      setIdProfesional(doctor.professionalID);
      setConsultorio(doctor.office);
      setDiasAtencion(new Set(doctor.atentionDays));
      setHorasAtencion(doctor.atentionHours.split(" - ").map(time => dayjs(time, 'HH:mm')));
      setGenero(doctor.gender);
      onOpen();
    }
  }, [doctor]);

  const notifError = (type, content) => {
    api[type]({
      message: content,
    });
  };

  const handleSelectionChange = (e) => {
    setGenero(e.target.value);
  };

  const handleSpecialtyChange = (e) => {
    setEspecialidad(e.target.value);
  };

  const handleDiasAtencionChange = (e) => {
    setDiasAtencion(new Set(e.target.value.split(",")));
  };

  const handleTimeChange = (time, timeString) => {
    setHorasAtencion(timeString);
  };

  const handleUpdateDoctor = () => {
    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !correo.trim() ||
      !telefono.trim() ||
      !especialidad.trim() ||
      !idProfesional.trim() ||
      !consultorio.trim() ||
      diasAtencion.size < 1 ||
      !horasAtencion[0] ||
      !horasAtencion[1] ||
      !genero.trim()
    ) {
      notifError("error", "Todos los campos son requeridos");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(telefono)) {
      notifError('error', 'El número de teléfono no es válido.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      notifError('error', 'El formato del correo electrónico no es válido.');
      return;
    }
    try {
      updateDoctor({
        variables: {
          id: doctor.id,
          name: nombre,
          lastName: apellido,
          gender: genero,
          phone: telefono,
          email: correo,
          specialty: especialidad,
          professionalId: idProfesional,
          office: consultorio,
          atentionDays: Array.from(diasAtencion),
          atentionHours: horasAtencion.map(time => time.format('HH:mm')).join(" - "),
        }
      })
      console.log('Doctor updated');
      onClose();
    } catch (e) {
      console.error('Error updating doctor:', e);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        isDismissable={false}
      >
        <ModalContent>
          {(onCloseModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Editar Doctor</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <Name className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Nombre"
                  placeholder="Ingresa tu nombre"
                  variant="bordered"
                  isRequired
                  value={nombre}
                  onValueChange={setNombre}
                />
                <Input
                  label="Apellido"
                  placeholder="Ingresa tu apellido"
                  variant="bordered"
                  isRequired
                  value={apellido}
                  onValueChange={setApellido}
                />
                <Input
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Correo"
                  type="email"
                  isRequired
                  placeholder="Ingresa tu correo"
                  variant="bordered"
                  value={correo}
                  onValueChange={setCorreo}
                />
                <Input
                  label="Teléfono"
                  placeholder="Ingresa tu teléfono"
                  variant="bordered"
                  isRequired
                  value={telefono}
                  onValueChange={setTelefono}
                  maxLength={10}
                />
                <Select
                  label="Especialidad"
                  variant="bordered"
                  isRequired
                  onChange={handleSpecialtyChange}
                  value={especialidad}
                >
                  <SelectItem key='Ortodoncia' value='Ortodoncia'>Ortodoncia</SelectItem>
                  <SelectItem key='Endodoncia' value='Endodoncia'>Endodoncia</SelectItem>
                  <SelectItem key='Periodoncia' value='Periodoncia'>Periodoncia</SelectItem>
                  <SelectItem key='Cirugía Oral y Maxilofacial' value='Cirugía Oral y Maxilofacial'>Cirugía Oral y Maxilofacial</SelectItem>
                  <SelectItem key='Odontopediatría' value='Odontopediatría'>Odontopediatría</SelectItem>
                  <SelectItem key='Prostodoncia' value='Prostodoncia'>Prostodoncia</SelectItem>
                  <SelectItem key='Odontología Estética' value='Odontología Estética'>Odontología Estética</SelectItem>
                  <SelectItem key='Odontología Preventiva y Comunitaria' value='Odontología Preventiva y Comunitaria'>Odontología Preventiva y Comunitaria</SelectItem>
                  <SelectItem key='Patología Bucal y Maxilofacial' value='Patología Bucal y Maxilofacial'>Patología Bucal y Maxilofacial</SelectItem>
                </Select>

                <Input
                  label="ID Profesional"
                  placeholder="Ingresa tu ID profesional"
                  variant="bordered"
                  isRequired
                  value={idProfesional}
                  onValueChange={setIdProfesional}
                />
                <Input
                  label="Consultorio"
                  placeholder="Ingresa tu consultorio"
                  variant="bordered"
                  isRequired
                  value={consultorio}
                  onValueChange={setConsultorio}
                />
                <Select
                  label="Días de atención"
                  variant="bordered"
                  isRequired
                  selectionMode="multiple"
                  selectedKeys={diasAtencion}
                  onChange={handleDiasAtencionChange}
                >
                  <SelectItem key='Lunes' value='Lunes'>Lunes</SelectItem>
                  <SelectItem key='Martes' value='Martes'>Martes</SelectItem>
                  <SelectItem key='Miércoles' value='Miércoles'>Miércoles</SelectItem>
                  <SelectItem key='Jueves' value='Jueves'>Jueves</SelectItem>
                  <SelectItem key='Viernes' value='Viernes'>Viernes</SelectItem>
                  <SelectItem key='Sábado' value='Sábado'>Sábado</SelectItem>
                  <SelectItem key='Domingo' value='Domingo'>Domingo</SelectItem>
                </Select>
                <RangePicker
                  placeholder={['Hora inicio', 'Hora fin']}
                  format="HH:mm"
                  onChange={handleTimeChange}
                  value={horasAtencion}
                  style={{ width: '100%' }}
                />
                <Select
                  label="Género"
                  variant="bordered"
                  isRequired
                  onChange={handleSelectionChange}
                  value={genero}
                >
                  <SelectItem key='Femenino' value='Femenino'>Femenino</SelectItem>
                  <SelectItem key='Masculino' value='Masculino'>Masculino</SelectItem>
                  <SelectItem key='NA' value='No especificado'>Prefiero no responder</SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onCloseModal}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={handleUpdateDoctor}>
                  Actualizar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
