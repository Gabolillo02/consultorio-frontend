import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Select, SelectItem } from "@nextui-org/react";
import { MailIcon } from '../icons/MailIcon.jsx';
import { LockIcon } from '../icons/LockIcon.jsx';
import { Name } from "../icons/Name.jsx";
import { notification } from "antd";
import { gql, useMutation } from "@apollo/client";


const ADD_USER = gql`
    mutation AddUser($name: String!, $email: String!, $password: String!, $age: Int!, $gender: String!) {
      addUser(name: $name, email: $email, password: $password, age: $age, gender: $gender) {
        age
        email
        gender
        name
        password
      }
    }
  `

export default function FormRegistroUser() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [nombre, setNombre] = React.useState("");
  const [correo, setCorreo] = React.useState("");
  const [contra, setContra] = React.useState("");
  const [edad, setEdad] = React.useState("");
  const [genero, setGenero] = React.useState("");
  const [api, contextHolder] = notification.useNotification();
  const notifError = (type, content) => {
    api[type]({
      message: content,
    });
  };
  const [addUser, { data }] = useMutation(ADD_USER);

  const handleSelectionChange = (e) => {
    setGenero(e.target.value);
  };

  const resetForm = () => {
    // Restablecer todas las variables de estado a su estado inicial
    setNombre("");
    setCorreo("");
    setContra("");
    setEdad("");
    setGenero("");
  };

  const handleAddUser = () => {
    // Verificar que ningún campo sea una cadena vacía
    if (!nombre.trim() || !correo.trim() || !contra.trim() || !edad.trim() || !genero.trim()) {
      // Mostrar notificación de error si algún campo está vacío
      notifError('error', 'Todos los campos son requeridos');
      return;
    }
    // Validar que la contraseña tenga al menos 6 caracteres
    if (contra.length < 6) {
      notifError('error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Validar que la edad esté dentro del rango válido
    const edadNum = parseInt(edad);
    if (isNaN(edadNum) || edadNum < 18 || edadNum > 100) {
      notifError('error', 'La edad debe estar entre un rango válido');
      return;
    }

    try {
      addUser({
        variables: {
          name: nombre,
          email: correo,
          password: contra,
          age: parseInt(edad),
          gender: genero
        }
      })
      console.log('User added');
      resetForm();
      onOpenChange(false);
    } catch (error) {
      //console.error('Error adding user:', error);
    }
  };

  return (
    <>
      {contextHolder}
      <Button onPress={onOpen} color="primary" variant="flat">Registrarse</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Regístrate</ModalHeader>
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
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Contraseña"
                  placeholder="Ingresa tu contraseña"
                  isRequired
                  description="Mínimo 6 caracteres"
                  type="password"
                  variant="bordered"
                  value={contra}
                  onValueChange={setContra}
                />
                <Input
                  isClearable
                  label="Edad"
                  isRequired
                  type="number"
                  placeholder="Ingresa tu edad"
                  variant="bordered"
                  value={edad}
                  onValueChange={setEdad}
                />
                <Select
                  label="Género"
                  variant="bordered"
                  isRequired
                  onChange={handleSelectionChange}
                >
                  <SelectItem key='Femenino' value='Femenino'>
                    Femenino
                  </SelectItem>
                  <SelectItem key='Masculino' value='Masculino'>
                    Masculino
                  </SelectItem>
                  <SelectItem key='NA' value='No especificado'>
                    Prefiero no responder
                  </SelectItem>

                </Select>
                {/* <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div> */}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={handleAddUser}>
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
