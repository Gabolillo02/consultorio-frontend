import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Select, SelectItem } from "@nextui-org/react";
import { MailIcon } from '../icons/MailIcon.jsx';
import { Name } from "../icons/Name.jsx";
import { notification, TimePicker } from "antd";
import { gql, useMutation } from "@apollo/client";

const { RangePicker } = TimePicker;
const ADD_DOCTOR = gql`
    mutation Mutation($name: String!, $lastName: String!, $gender: String!, $phone: String!, $email: String!, $specialty: String!, $professionalId: String!, $office: String!, $atentionDays: [String!]!, $atentionHours: String!) {
      addDoctor(name: $name, lastName: $lastName, gender: $gender, phone: $phone, email: $email, specialty: $specialty, professionalID: $professionalId, office: $office, atentionDays: $atentionDays, atentionHours: $atentionHours) {
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
  `

export default function FormRegistro() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [nombre, setNombre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [correo, setCorreo] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [especialidad, setEspecialidad] = React.useState("");
  const [idProfesional, setIdProfesional] = React.useState("");
  const [consultorio, setConsultorio] = React.useState("");
  const [diasAtencion, setDiasAtencion] = React.useState(new Set([]));
  const [horasAtencion, setHorasAtencion] = React.useState(["", ""]);
  const [genero, setGenero] = React.useState("");
  const [addDoctor, { data, error }] = useMutation(ADD_DOCTOR);
  const [api, contextHolder] = notification.useNotification();

  const notifError = (type, content) => {
    api[type]({
      message: content,
    });
  };

  const resetForm = () => {
    // Restablecer todas las variables de estado a su estado inicial
    setNombre("");
    setApellido("");
    setCorreo("");
    setTelefono("");
    setEspecialidad("");
    setIdProfesional("");
    setConsultorio("");
    setDiasAtencion(new Set([]));
    setHorasAtencion(["", ""]);
    setGenero("");
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

  const handleAddDoctor = () => {
    // Verificar que ningún campo sea una cadena vacía
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
      // Mostrar notificación de error si algún campo está vacío
      notifError("error", "Todos los campos son requeridos");
      return;
    }

    // Validar el formato del teléfono
    const phoneRegex = /^[0-9]{10}$/; // número de teléfono de 10 dígitos
    if (!phoneRegex.test(telefono)) {
      notifError('error', 'El número de teléfono no es válido. ');
      return;
    }

    // Validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      notifError('error', 'El formato del correo electrónico no es válido.');
      return;
    }
    try {
      addDoctor({
        variables: {
          name: nombre,
          lastName: apellido,
          gender: genero,
          phone: telefono,
          email: correo,
          specialty: especialidad,
          professionalId: idProfesional,
          office: consultorio,
          atentionDays: Array.from(diasAtencion),
          atentionHours: horasAtencion.join(" - "),
        }
      })
      resetForm();
      console.log('Doctor added');
      onOpenChange(false);
    } catch (e) {
      //console.error('Error adding doctor:', e);
    }
  };

  return (
    <>
      {contextHolder}
      <Button onPress={onOpen} color="primary" variant="flat">Añadir Doctor</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Registrar Dentista</ModalHeader>
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
                  style={{ width: '100%' }}
                />
                <Select
                  label="Género"
                  variant="bordered"
                  isRequired
                  onChange={handleSelectionChange}
                >
                  <SelectItem key='Femenino' value='Femenino'>Femenino</SelectItem>
                  <SelectItem key='Masculino' value='Masculino'>Masculino</SelectItem>
                  <SelectItem key='NA' value='No especificado'>Prefiero no responder</SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={handleAddDoctor}>
                  Registrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}