import React from "react";
import {
  Card, CardHeader, CardBody, Image
} from "@nextui-org/react";
import "../App.css"

export default function Inicio() {
  return (
    <>
      <section id="fondo">
        <div className="w-1/2 p-4 flex flex-col -space-y-80">
          <h1 className="text-8xl py-60 font-bold pl-16">Simplifica el proceso</h1>
          <h2 className="text-2xl py-40 pl-16 w-4/5">Agenda tu cita con el especialista que consideres mas apropiado. Compara tus tiempos y organizate comodamente desde donde estes. Puedes agendar tu cita con nosotros. Somos lideres en lo que hacemos. ¡Ven y Conocenos! Te llevarás una buena experiencia.</h2>
        </div>
      </section>
      <section className="h-screen block">
        <h1 className="text-3xl pt-40 pb-10 font-bold pl-16">Encuentra al mejor especialista que se adapte a tus necesidades</h1>
        <section className="flex space-x-12 p-4 justify-center ">
          <div>
            <Card className="py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Ortodoncia</p>
                <small className="text-default-500">Exp: 12 años</small>
                <h4 className="font-bold text-large">Dra. Alexia Maldonado</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="/2.png"
                  width={270}
                />
              </CardBody>
            </Card>
          </div>
          <div>
            <Card className="py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Endodoncia</p>
                <small className="text-default-500">Exp: 8 años</small>
                <h4 className="font-bold text-large">Dr. Javier Ruiz</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="/4.png"
                  width={270}
                />
              </CardBody>
            </Card>
          </div>
          <div>
            <Card className="py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Periodoncia</p>
                <small className="text-default-500">Exp: 10 años</small>
                <h4 className="font-bold text-large">Dra. Sofía Castillo</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="/3.png"
                  width={270}
                />
              </CardBody>
            </Card>
          </div>
          <div>
            <Card className="py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Odontopediatría</p>
                <small className="text-default-500">Exp: 7 años</small>
                <h4 className="font-bold text-large">Dr. Manuel Gómez</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="/5.png"
                  width={270}
                />
              </CardBody>
            </Card>
          </div>
        </section>
        <div className="footer">
        <p>Contáctanos: info@dentallife.com</p>
        <p>Teléfono: +123 456 7890</p>
        <p>Dirección: Blvrd Riviera Nayarit 69-A, Sur, 63735 Mezcales, Nay.</p>
        <p>© 2024 Dental Life. Todos los derechos reservados. Equipo de Desarrollo Los Tilapios</p>
      </div>
      </section>

    </>
  );
}

