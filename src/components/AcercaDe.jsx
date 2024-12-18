// ventana acerca de

import React from "react";
import { Link } from "react-router-dom";


export default function AcercaDe() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            {/* Sección principal con imagen */}

            <div className="mt-2"> {/* Esta es una separación */}
                {/* Contenido de la sección */}
            </div>

            <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl text-center">

                <div className="mt-12 bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto">
                    <img
                        src="https://www.clinicasonrisasegura.pe/wp-content/uploads/2023/07/Consultorio-dental-Descubre-la-excelencia.webp"
                        alt="Equipo Dental"
                        className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110 mb-8"
                    />

                    <h1 className="text-4xl font-bold text-blue-600 mb-4">Acerca de Nosotros</h1>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Bienvenido a <strong>Dental Life</strong>. Nos especializamos en brindar la mejor atención dental
                        para toda la familia. Nuestra misión es asegurar que cada paciente tenga una experiencia cómoda y obtenga
                        la sonrisa saludable que se merece.
                    </p>


                </div>


                <div className="mt-12 bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto">
                    {/* Sección de Valores */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-12">

                        <div className="p-4 border rounded-lg shadow-sm bg-blue-50">
                            <h2 className="text-xl font-semibold text-blue-600 mb-2 hover:scale-105 transition-transform">
                                Profesionalismo
                            </h2>
                            <p className="text-gray-600">Equipo certificado y altamente capacitado.</p>
                        </div>
                        <div className="p-4 border rounded-lg shadow-sm bg-blue-50">
                            <h2 className="text-xl font-semibold text-blue-600 mb-2 hover:scale-105 transition-transform">
                                Tecnología
                            </h2>
                            <p className="text-gray-600">Equipos modernos para diagnósticos precisos.</p>
                        </div>
                        <div className="p-4 border rounded-lg shadow-sm bg-blue-50">
                            <h2 className="text-xl font-semibold text-blue-600 mb-2 hover:scale-105 transition-transform">
                                Confianza
                            </h2>
                            <p className="text-gray-600">Nuestra prioridad es tu comodidad y bienestar.</p>
                        </div>
                    </div>

                </div>
                <div className="mt-12 bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto">
                    {/* Sección de Ubicación */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Nuestra Ubicación</h2>
                        <div className="flex justify-center">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821078.0356018827!2d-110.16005888749997!3d20.7296458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842147df58e0e67d%3A0x4a6ab6c0c217c39f!2sDental%20Life!5e0!3m2!1ses!2smx!4v1734491740781!5m2!1ses!2smx"
                                width="100%"
                                height="450"
                                style={{ border: "0" }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="rounded-lg shadow-lg max-w-4xl"
                            ></iframe>
                        </div>
                    </div>
                </div>

                <div className="mt-12 bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto">

                    {/* Sección de Testimonios */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-blue-600 mb-6">Testimonios</h2>
                        <div
                            className="flex space-x-4 overflow-x-scroll p-4"
                            style={{ scrollbarWidth: "thin", scrollbarColor: "#4a90e2 #f0f4f8" }}
                        >
                            {/* Testimonio 1 */}
                            <div className="min-w-[300px] bg-white shadow-lg rounded-xl p-6">
                                <p className="italic text-gray-700">
                                    "¡Increíble atención! El equipo es muy profesional y la tecnología de última generación me sorprendió."
                                </p>
                                <p className="text-right font-semibold mt-4">— Laura Martínez</p>
                            </div>
                            {/* Testimonio 2 */}
                            <div className="min-w-[300px] bg-white shadow-lg rounded-xl p-6">
                                <p className="italic text-gray-700">
                                    "Gracias a Dental Life, ahora tengo una sonrisa perfecta. ¡Altamente recomendados!"
                                </p>
                                <p className="text-right font-semibold mt-4">— José Ramírez</p>
                            </div>
                            {/* Testimonio 3 */}
                            <div className="min-w-[300px] bg-white shadow-lg rounded-xl p-6">
                                <p className="italic text-gray-700">
                                    "El ambiente es muy amigable y me sentí muy cómodo durante todo el proceso."
                                </p>
                                <p className="text-right font-semibold mt-4">— Ana López</p>
                            </div>
                            {/* Testimonio 4 */}
                            <div className="min-w-[300px] bg-white shadow-lg rounded-xl p-6">
                                <p className="italic text-gray-700">
                                    "La mejor experiencia dental que he tenido, el personal es amable y profesional."
                                </p>
                                <p className="text-right font-semibold mt-4">— Carlos Rivera</p>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="mt-12 bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto">
                    {/* Sección de Desarrolladores */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Nuestros Desarrolladores</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Desarrollador 1 */}
                            <div className="flex flex-col items-center group transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                                <img
                                    src="/gabo.jpg"
                                    alt="Gabo"
                                    className="w-24 h-24 rounded-full mb-2 object-cover transition-transform duration-300"
                                />
                                <h3 className="text-lg font-semibold text-gray-700 transition-colors duration-300 group-hover:text-blue-600">
                                    Gabriel Garcia
                                </h3>
                                <p className="text-gray-600 text-sm transition-colors duration-300 group-hover:text-gray-800">
                                    Database Administrator
                                </p>
                            </div>
                            {/* Desarrollador 2 */}
                            <div className="flex flex-col items-center group transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                                <img
                                    src="/kary.png"
                                    alt="Kary"
                                    className="w-24 h-24 rounded-full mb-2 object-cover transition-transform duration-300"
                                />
                                <h3 className="text-lg font-semibold text-gray-700 transition-colors duration-300 group-hover:text-blue-600">
                                    Yamilet Macedo
                                </h3>
                                <p className="text-gray-600 text-sm transition-colors duration-300 group-hover:text-gray-800">
                                    Frontend Developer
                                </p>
                            </div>
                            {/* Desarrollador 3 */}
                            <div className="flex flex-col items-center group transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                                <img
                                    src="/luis.png"
                                    alt="Luis"
                                    className="w-24 h-24 rounded-full mb-2 object-cover transition-transform duration-300"
                                />
                                <h3 className="text-lg font-semibold text-gray-700 transition-colors duration-300 group-hover:text-blue-600">
                                    Luis Ortega
                                </h3>
                                <p className="text-gray-600 text-sm transition-colors duration-300 group-hover:text-gray-800">
                                    Backend Developer
                                </p>
                            </div>
                        </div>
                    </div>
                </div>






            </div>
            {/* Botón de llamado a la acción */}
            <div className="mt-10">
    <Link
        to="/especialistas"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
    >
        Agenda tu Cita Ahora
    </Link>
</div>


            <div className="footer">
                <p>Contáctanos: info@dentallife.com</p>
                <p>Teléfono: +123 456 7890</p>
                <p>Dirección: Blvrd Riviera Nayarit 69-A, Sur, 63735 Mezcales, Nay.</p>
                <p>© 2024 Dental Life. Todos los derechos reservados. Equipo de Desarrollo Los Tilapios</p>
            </div>
        </div>


    );
}
