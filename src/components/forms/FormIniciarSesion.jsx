import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Link } from "@nextui-org/react";
import { MailIcon } from '../icons/MailIcon.jsx';
import { LockIcon } from '../icons/LockIcon.jsx';
import { notification } from "antd";
import { gql, useLazyQuery } from "@apollo/client";
import { useAuth } from "../../AuthContext.jsx"

const VERIFY_USER = gql`
  query VerifyUser($email: String!, $password: String!) {
    verifyUser(email: $email, password: $password) {
      success
      message
    }
  }
`;

export default function FormRegistro() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [correo, setCorreo] = React.useState("");
  const [contra, setContra] = React.useState("");
  const [api, contextHolder] = notification.useNotification();
  const [verifyUser, { data, loading, error }] = useLazyQuery(VERIFY_USER);
  const { login } = useAuth();
  
  const notifError = (type, content) => {
    api[type]({
      message: content,
    });
  };

  const resetForm = () => {
    setCorreo("");
    setContra("");
  };

  const handleLogin = async () => {
    if (!correo.trim() || !contra.trim()) {
      notifError('error', 'Rellena los campos');
      return;
    }

    try {
      const { data } = await verifyUser({ variables: { email: correo, password: contra } });

      if (data.verifyUser.success) {
        // Acción en caso de éxito, por ejemplo redireccionar a otra página
        notifError('success', 'Inicio de sesión exitoso');
        resetForm();
        onOpenChange(false);
        login(correo);
      } else {
        notifError('error', data.verifyUser.message);
      }
    } catch (e) {
      notifError('error', 'Error en el inicio de sesión');
      console.error('Error verifying user:', e);
    }
  };

  return (
    <>
      {contextHolder}
      <Link onPress={onOpen} className="text-stone-900 cursor-pointer">Iniciar Sesión</Link>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Iniciar sesión</ModalHeader>
              <ModalBody>
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
                  type="password"
                  variant="bordered"
                  value={contra}
                  onValueChange={setContra}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={handleLogin}>
                  Iniciar 
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
