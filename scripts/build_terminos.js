const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const contentData = {
  es: {
    pageTitle: "Términos y Condiciones — Step To Santiago",
    heroTitle: "Términos y <span class=\"text-[var(--accent-color)]\">Condiciones</span>",
    heroDesc: "Condiciones aplicables a la contratación de viajes combinados y servicios turísticos.",
    sidebarTitle: "Contenido",
    sections: [
      { id: "definiciones", title: "1. Definiciones", 
        content: `
        <div class="space-y-4">
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">A. Viaje combinado</h4><p class="text-sm text-[var(--gray-text-color)]">Se entiende por viaje combinado aquel servicio que integra dos o más prestaciones turísticas (como transporte, alojamiento u otros servicios relacionados) dentro de un mismo contrato y para una misma experiencia de viaje.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">B. Servicio de viaje</h4><p class="text-sm text-[var(--gray-text-color)]">Cualquier prestación incluida en el itinerario, como el transporte de viajeros, el alojamiento, el alquiler de vehículos u otros servicios turísticos complementarios.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">C. Contrato de viaje</h4><p class="text-sm text-[var(--gray-text-color)]">Acuerdo formal mediante el cual se recogen uno o varios servicios de viaje contratados, incluyendo todas las condiciones aplicables al viaje combinado.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">D. Fecha de inicio</h4><p class="text-sm text-[var(--gray-text-color)]">Día en el que comienzan a ejecutarse los servicios incluidos en el viaje contratado.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">E. Repatriación</h4><p class="text-sm text-[var(--gray-text-color)]">Proceso mediante el cual el viajero es trasladado de vuelta a su lugar de origen o a otro destino previamente acordado entre las partes.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">F. Falta de conformidad</h4><p class="text-sm text-[var(--gray-text-color)]">Situación en la que los servicios prestados no se ejecutan correctamente o no se ajustan a lo acordado en el contrato.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">G. Viajero</h4><p class="text-sm text-[var(--gray-text-color)]">Persona que contrata o tiene derecho a beneficiarse de un viaje en virtud del contrato de servicios turísticos.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">H. Empresa turística</h4><p class="text-sm text-[var(--gray-text-color)]">Entidad responsable de la organización, comercialización o prestación de los servicios de viaje incluidos en el programa contratado.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">I. Organizador del viaje</h4><p class="text-sm text-[var(--gray-text-color)]">Empresa que combina los distintos servicios turísticos y los ofrece como un viaje conjunto, ya sea directamente o a través de terceros.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">J. Agencia minorista</h4><p class="text-sm text-[var(--gray-text-color)]">Entidad que comercializa o vende viajes combinados organizados por un tercero, sin ser la empresa organizadora.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">L. Menor de edad</h4><p class="text-sm text-[var(--gray-text-color)]">Toda persona que no haya alcanzado los 18 años en el momento de la contratación o del viaje.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">M. Circunstancias extraordinarias</h4><p class="text-sm text-[var(--gray-text-color)]">Situaciones excepcionales e imprevisíveis, ajenas al control de la organización, cuyas consecuencias no habrían podido evitarse incluso adoptando todas las medidas razonables.</p></div>
        </div>
        `
      },
      { id: "viajes-combinados", title: "2. Notas importantes de viajes combinados",
        content: `
        <div class="space-y-6">
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.1 Organización del viaje combinado</h3><p class="text-[var(--gray-text-color)] leading-relaxed">La planificación y gestión de los viajes combinados corresponde a TU BUEN CAMINO, como entidad responsable de la coordinación de todos los servicios incluidos.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.2 Contrato de viaje combinado</h3><p class="text-[var(--gray-text-color)] leading-relaxed">Una vez confirmada la reserva, el viajero recibirá una copia del contrato de viaje combinado en un plazo máximo de 24 horas desde su formalización. Este contrato incluirá, como parte esencial, las condiciones generales, la información previa facilitada al viajero y las condiciones específicas acordadas en cada reserva.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.3 Precio, reserva y forma de pago</h3><p class="text-[var(--gray-text-color)] leading-relaxed mb-4">El precio de los viajes combinados se establece en función de los servicios contratados y quedará reflejado en la confirmación de la reserva. Para garantizar la plaza, será necesario realizar el pago según las condiciones indicadas en el momento de la contratación.</p>
          <h4 class="font-bold text-green-600 text-sm mb-2">El precio INCLUYE</h4><ul class="list-disc list-inside text-sm text-[var(--gray-text-color)] mb-4 space-y-1"><li>Todos los servicios turísticos detallados en la documentación del viaje</li><li>Gastos de gestión, comisiones y cargos asociados a la reserva</li><li>Asistencia al viajero en caso de incidencias durante el recorrido</li><li>Apoyo en la tramitación de quejas o reclamaciones relacionadas con el servicio</li></ul>
          <h4 class="font-bold text-red-600 text-sm mb-2">El precio NO INCLUYE</h4><ul class="list-disc list-inside text-sm text-[var(--gray-text-color)] mb-4 space-y-1"><li>Documentación personal necesaria, como visados o certificados sanitarios</li><li>Consumos adicionales no especificados (bebidas, snacks o dietas especiales)</li><li>Servicios opcionales como spa, masajes u otros tratamientos</li><li>Tasas turísticas locales, que deberán abonarse directamente en el alojamiento</li><li>Impuestos o tasas aplicables en aeropuertos u otros puntos de transporte, salvo indicación expresa incluida en el programa</li></ul>
          <h4 class="font-bold text-[var(--dark-text-color)] text-sm mb-2">Proceso de reserva</h4><ol class="list-decimal list-inside text-sm text-[var(--gray-text-color)] mb-4 space-y-1"><li><strong class="text-[var(--dark-text-color)]">Solicitud de reserva:</strong> Rellena y envía el formulario de reserva a través de nuestra web con los datos necesarios para organizar tu viaje.</li><li><strong class="text-[var(--dark-text-color)]">Pago del viaje:</strong> Realiza el pago correspondiente para garantizar tu plaza, según las condiciones indicadas en el proceso de contratación.</li><li><strong class="text-[var(--dark-text-color)]">Confirmación de la reserva:</strong> La reserva quedará confirmada únicamente cuando recibas nuestro correo electrónico de confirmación con todos los detalles.</li><li><strong class="text-[var(--dark-text-color)]">Documentación del viaje:</strong> Unos días antes del inicio del Camino recibirás toda la información necesaria, incluyendo servicios contratados, alojamientos y recomendaciones para tu ruta.</li></ol>
          <h4 class="font-bold text-red-600 text-sm mb-2">Reservas con menos de 7 días de antelación</h4><p class="text-[var(--gray-text-color)] text-sm leading-relaxed">Para aquellas reservas realizadas con una antelación inferior a 7 días antes del inicio del viaje, será necesario efectuar el pago completo mediante tarjeta antes de las 12:00 h del mismo día en que se solicite la confirmación. En caso de que no sea posible confirmar los servicios por parte de la agencia, se procederá a la devolución íntegra del importe abonado en un plazo máximo de 12 horas.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.4 Asistencia</h3><p class="text-[var(--gray-text-color)] leading-relaxed">El viajero podrá dirigirse en cualquier momento al organizador para enviar consultas, solicitudes o reclamaciones relacionadas con su viaje. En caso de que surjan situaciones inevitables o extraordinarias, se prestará asistencia adecuada con la mayor rapidez posible, con el objetivo de minimizar cualquier incidencia durante el recorrido. Si debido a estas circunstancias no fuera posible garantizar el regreso en la fecha prevista, se cubrirán los gastos de alojamiento por un máximo de tres noches, en las condiciones establecidas por la normativa aplicable.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.5 Modificación del contrato</h3><p class="text-[var(--gray-text-color)] leading-relaxed mb-4">La organización podrá introducir cambios en el contrato antes del inicio del viaje, siempre que estos sean de carácter menor y se comuniquen al viajero con la debida antelación.</p><h4 class="font-bold text-[var(--dark-text-color)] text-sm mb-2">Modificaciones superiores al 8%</h4><p class="text-sm text-[var(--gray-text-color)]">En caso de que el aumento del precio supere el 8% o se produzcan cambios sustanciales en los servicios principales del viaje, el viajero tendrá derecho a resolver el contrato sin que ello implique penalización alguna.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.6 Cesión del contrato</h3><p class="text-[var(--gray-text-color)] leading-relaxed">El viajero podrá ceder su plaza a otra persona siempre que esta cumpla con los requisitos necesarios para el viaje. Dicha cesión deberá ser comunicada a la organización con un mínimo de 7 días naturales de antelación al inicio del servicio. Tanto el viajero original como la persona que lo sustituya serán responsables de forma solidaria del pago pendiente y de cualquier gasto adicional que pudiera derivarse de la cesión.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.7 Pagos y reembolsos</h3><p class="text-[var(--gray-text-color)] leading-relaxed">Para poder disfrutar de todos los servicios incluidos en el viaje, este deberá encontrarse abonado en su totalidad antes del inicio del mismo. En caso de que la agencia proceda a la resolución del contrato, el importe correspondiente será reembolsado al viajero en un plazo máximo de 14 días naturales desde la notificación. Si el viajero no se presenta en la fecha y hora acordadas para el inicio de los servicios, no tendrá derecho a devolución alguna. Asimismo, la prima correspondiente al seguro de cancelación, en caso de haber sido contratado, no será reembolsable en ninguna circunstancia.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.8 Resolución del contrato por el viajero</h3>
          <h4 class="font-bold text-[var(--dark-text-color)] text-sm mb-2">Penalización por cancelación</h4><p class="text-[var(--gray-text-color)] text-sm leading-relaxed mb-4">La cancelación del viaje por parte del viajero implicará una penalización del 100% del importe total cuando se realice dentro de los 15 días previos al inicio del viaje. En el caso de grupos de 12 o más personas, este plazo se amplía a 30 días antes del comienzo del viaje.</p>
          <h4 class="font-bold text-[var(--dark-text-color)] text-sm mb-2">Derecho a resolución sin penalización y con reembolso total</h4><p class="text-[var(--gray-text-color)] text-sm leading-relaxed mb-2">El viajero podrá resolver el contrato sin coste alguno y con derecho a la devolución íntegra de las cantidades abonadas en los siguientes supuestos:</p><ul class="list-disc list-inside text-sm text-[var(--gray-text-color)] space-y-1"><li>Cuando concurran circunstancias inevitables y extraordinarias en el destino que afecten de forma significativa al desarrollo del viaje.</li><li>Si se produce una modificación sustancial de elementos esenciales del contrato, excluido el precio.</li><li>En caso de cancelación del viaje por parte de la agencia antes del inicio del mismo.</li><li>Cuando exista una falta de ejecución relevante de los servicios contratados.</li><li>Ante situaciones excepcionales que afecten a la seguridad del viajero o del desarrollo del viaje.</li></ul></div>
        </div>
        `
      },
      { id: "consideraciones", title: "3. Consideraciones generales",
        content: `
        <div class="space-y-6">
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">3.1 Documentación</h3><p class="text-[var(--gray-text-color)] leading-relaxed">Cada viajero es responsable de disponer en vigor de la documentación necesaria para realizar el viaje, incluyendo DNI, pasaporte, visados y cualquier requisito sanitario que pudiera ser exigido. En caso de que la cancelación del viaje se produzca por falta o incorrecta validez de dicha documentación, se aplicarán las condiciones de cancelación establecidas.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">3.2 Servicio de traslado de equipaje</h3><p class="text-[var(--gray-text-color)] leading-relaxed mb-2">El servicio de transporte de equipaje se presta únicamente en etapas realizadas a pie o en bicicleta. Queda excluido el traslado en medios de transporte como autobús, tren o vehículo motorizado.</p>
          <div class="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3"><i class="fa-solid fa-triangle-exclamation text-amber-500 mt-0.5 flex-shrink-0"></i><p class="text-sm text-amber-800 leading-relaxed"><strong class="font-bold">Importante:</strong> La organización se reserva el derecho de suspender el servicio a cualquier usuario que genere incidencias o molestias durante su prestación. Asimismo, no se asume responsabilidad por pérdidas, daños o deterioros del equipaje, salvo en los casos legalmente establecidos.</p></div></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">3.3 Categoría de los alojamientos</h3><p class="text-[var(--gray-text-color)] leading-relaxed mb-2">Los alojamientos incluidos en los viajes pueden corresponder a distintas categorías, entre las que se incluyen:</p><ul class="list-disc list-inside text-sm text-[var(--gray-text-color)] space-y-1"><li>Hoteles de 1 a 5 estrellas</li><li>Pensiones de 1 a 3 estrellas</li><li>Casas rurales</li><li>Apartamentos turísticos de 1 a 4 llaves</li><li>Albergues turísticos</li><li>Viviendas de uso turístico</li></ul></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">3.4 Seguros</h3><p class="text-[var(--gray-text-color)] leading-relaxed mb-2">La agencia ofrecerá información al viajero sobre la contratación de un seguro opcional que podrá incluir coberturas como:</p><ul class="list-disc list-inside text-sm text-[var(--gray-text-color)] space-y-1"><li>Gastos de cancelación por causas imprevistas o de fuerza mayor</li><li>Asistencia en caso de accidente durante el viaje</li><li>Repatriación en situaciones de enfermedad grave o fallecimiento</li></ul></div>
        </div>
        `
      }
    ]
  },
  en: {
    pageTitle: "Terms and Conditions — Step To Santiago",
    heroTitle: "Terms and <span class=\"text-[var(--accent-color)]\">Conditions</span>",
    heroDesc: "Conditions applicable to the contracting of package travel and tourist services.",
    sidebarTitle: "Content",
    sections: [
      { id: "definiciones", title: "1. Definitions", 
        content: `
        <div class="space-y-4">
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">A. Package travel</h4><p class="text-sm text-[var(--gray-text-color)]">Package travel is understood as that service which integrates two or more tourist services (such as transport, accommodation or other related services) within the same contract and for the same travel experience.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">B. Travel service</h4><p class="text-sm text-[var(--gray-text-color)]">Any service included in the itinerary, such as the transport of passengers, accommodation, vehicle rental or other complementary tourist services.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">C. Travel contract</h4><p class="text-sm text-[var(--gray-text-color)]">Formal agreement through which one or more contracted travel services are collected, including all applicable conditions to the package travel.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">D. Start date</h4><p class="text-sm text-[var(--gray-text-color)]">Day on which the services included in the contracted trip begin to be executed.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">E. Repatriation</h4><p class="text-sm text-[var(--gray-text-color)]">Process by which the traveler is transferred back to their place of origin or another destination previously agreed upon between the parties.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">F. Lack of conformity</h4><p class="text-sm text-[var(--gray-text-color)]">Situation in which the services provided are not executed correctly or do not conform to what was agreed in the contract.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">G. Traveler</h4><p class="text-sm text-[var(--gray-text-color)]">Person who contracts or has the right to benefit from a trip under the tourist services contract.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">H. Tourist company</h4><p class="text-sm text-[var(--gray-text-color)]">Entity responsible for the organization, marketing or provision of the travel services included in the contracted program.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">I. Trip organizer</h4><p class="text-sm text-[var(--gray-text-color)]">Company that combines the different tourist services and offers them as a joint trip, either directly or through third parties.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">J. Retail agency</h4><p class="text-sm text-[var(--gray-text-color)]">Entity that markets or sells package tours organized by a third party, without being the organizing company.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">L. Minor</h4><p class="text-sm text-[var(--gray-text-color)]">Any person who has not reached the age of 18 at the time of contracting or travel.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">M. Extraordinary circumstances</h4><p class="text-sm text-[var(--gray-text-color)]">Exceptional and unforeseeable situations, beyond the control of the organization, whose consequences could not have been avoided even by adopting all reasonable measures.</p></div>
        </div>
        `
      },
      { id: "viajes-combinados", title: "2. Important notes on package travel",
        content: `
        <div class="space-y-6">
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.1 Organization of the package travel</h3><p class="text-[var(--gray-text-color)] leading-relaxed">The planning and management of the package travel correspond to TU BUEN CAMINO, as the entity responsible for the coordination of all the services included.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.2 Package travel contract</h3><p class="text-[var(--gray-text-color)] leading-relaxed">Once the reservation is confirmed, the traveler will receive a copy of the package travel contract within a maximum period of 24 hours from its formalization. This contract will include, as an essential part, the general conditions, the prior information provided to the traveler and the specific conditions agreed upon in each reservation.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.3 Price, reservation and payment method</h3><p class="text-[var(--gray-text-color)] leading-relaxed mb-4">The price of the package travel is established based on the contracted services and will be reflected in the reservation confirmation. To guarantee the spot, it will be necessary to make the payment according to the conditions indicated at the time of contracting.</p>
          <h4 class="font-bold text-green-600 text-sm mb-2">The price INCLUDES</h4><ul class="list-disc list-inside text-sm text-[var(--gray-text-color)] mb-4 space-y-1"><li>All tourist services detailed in the travel documentation</li><li>Management expenses, commissions and charges associated with the reservation</li><li>Traveler assistance in case of incidents during the tour</li><li>Support in the processing of complaints or claims related to the service</li></ul>
          <h4 class="font-bold text-red-600 text-sm mb-2">The price DOES NOT INCLUDE</h4><ul class="list-disc list-inside text-sm text-[var(--gray-text-color)] mb-4 space-y-1"><li>Necessary personal documentation, such as visas or health certificates</li><li>Additional unspecified consumptions (drinks, snacks or special diets)</li><li>Optional services such as spa, massages or other treatments</li><li>Local tourist taxes, which must be paid directly at the accommodation</li><li>Taxes or fees applicable in airports or other transport points, unless expressly indicated in the program</li></ul>
          <h4 class="font-bold text-[var(--dark-text-color)] text-sm mb-2">Reservation process</h4><ol class="list-decimal list-inside text-sm text-[var(--gray-text-color)] mb-4 space-y-1"><li><strong class="text-[var(--dark-text-color)]">Reservation request:</strong> Fill out and send the reservation form through our website with the necessary data to organize your trip.</li><li><strong class="text-[var(--dark-text-color)]">Payment of the trip:</strong> Make the corresponding payment to guarantee your spot, according to the conditions indicated in the contracting process.</li><li><strong class="text-[var(--dark-text-color)]">Reservation confirmation:</strong> The reservation will only be confirmed when you receive our confirmation email with all the details.</li><li><strong class="text-[var(--dark-text-color)]">Travel documentation:</strong> A few days before the start of the Camino you will receive all the necessary information, including contracted services, accommodations and recommendations for your route.</li></ol>
          <h4 class="font-bold text-red-600 text-sm mb-2">Reservations with less than 7 days in advance</h4><p class="text-[var(--gray-text-color)] text-sm leading-relaxed">For reservations made less than 7 days before the start of the trip, full payment by credit card will be necessary before 12:00 h on the same day the confirmation is requested. In case it is not possible to confirm the services by the agency, the full amount paid will be refunded within a maximum period of 12 hours.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.4 Assistance</h3><p class="text-[var(--gray-text-color)] leading-relaxed">The traveler may address the organizer at any time to send queries, requests or claims related to their trip. In case of unavoidable or extraordinary situations, appropriate assistance will be provided as quickly as possible, in order to minimize any incident during the tour. If due to these circumstances it is not possible to guarantee the return on the scheduled date, accommodation expenses will be covered for a maximum of three nights, under the conditions established by applicable regulations.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.5 Modification of the contract</h3><p class="text-[var(--gray-text-color)] leading-relaxed mb-4">The organization may introduce changes to the contract before the start of the trip, provided these are minor and communicated to the traveler with due advance notice.</p><h4 class="font-bold text-[var(--dark-text-color)] text-sm mb-2">Modifications exceeding 8%</h4><p class="text-sm text-[var(--gray-text-color)]">In case the price increase exceeds 8% or there are substantial changes in the main services of the trip, the traveler will have the right to terminate the contract without any penalty.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.6 Transfer of the contract</h3><p class="text-[var(--gray-text-color)] leading-relaxed">The traveler may transfer their spot to another person provided they meet the necessary requirements for the trip. This transfer must be communicated to the organization with a minimum of 7 calendar days before the start of the service. Both the original traveler and the person substituting them will be jointly responsible for the pending payment and any additional expense derived from the transfer.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.7 Payments and refunds</h3><p class="text-[var(--gray-text-color)] leading-relaxed">To enjoy all the services included in the trip, it must be fully paid before its start. If the agency proceeds to terminate the contract, the corresponding amount will be refunded to the traveler within a maximum period of 14 calendar days from the notification. If the traveler does not appear on the agreed date and time for the start of the services, they will have no right to any refund. Likewise, the premium corresponding to the cancellation insurance, if contracted, will not be refundable under any circumstances.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.8 Termination of the contract by the traveler</h3>
          <h4 class="font-bold text-[var(--dark-text-color)] text-sm mb-2">Penalty for cancellation</h4><p class="text-[var(--gray-text-color)] text-sm leading-relaxed mb-4">The cancellation of the trip by the traveler will imply a penalty of 100% of the total amount when made within 15 days prior to the start of the trip. In the case of groups of 12 or more people, this period is extended to 30 days before the start of the trip.</p>
          <h4 class="font-bold text-[var(--dark-text-color)] text-sm mb-2">Right to terminate without penalty and full refund</h4><p class="text-[var(--gray-text-color)] text-sm leading-relaxed mb-2">The traveler may terminate the contract without any cost and with the right to a full refund of the amounts paid in the following cases:</p><ul class="list-disc list-inside text-sm text-[var(--gray-text-color)] space-y-1"><li>When unavoidable and extraordinary circumstances occur at the destination that significantly affect the execution of the trip.</li><li>If there is a substantial modification of essential elements of the contract, excluding the price.</li><li>In case of cancellation of the trip by the agency before its start.</li><li>When there is a relevant lack of execution of the contracted services.</li><li>In exceptional situations that affect the safety of the traveler or the development of the trip.</li></ul></div>
        </div>
        `
      },
      { id: "consideraciones", title: "3. General considerations",
        content: `
        <div class="space-y-6">
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">3.1 Documentation</h3><p class="text-[var(--gray-text-color)] leading-relaxed">Each traveler is responsible for having valid documentation necessary to carry out the trip, including ID, passport, visas and any health requirement that may be demanded. If the trip is cancelled due to the lack or incorrect validity of such documentation, the established cancellation conditions will apply.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">3.2 Luggage transfer service</h3><p class="text-[var(--gray-text-color)] leading-relaxed mb-2">The luggage transport service is only provided in stages done on foot or by bicycle. Transfer in means of transport such as bus, train or motorized vehicle is excluded.</p>
          <div class="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3"><i class="fa-solid fa-triangle-exclamation text-amber-500 mt-0.5 flex-shrink-0"></i><p class="text-sm text-amber-800 leading-relaxed"><strong class="font-bold">Important:</strong> The organization reserves the right to suspend the service to any user who causes incidents or disturbances during its provision. Likewise, no responsibility is assumed for loss, damage or deterioration of luggage, except in legally established cases.</p></div></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">3.3 Category of accommodations</h3><p class="text-[var(--gray-text-color)] leading-relaxed mb-2">The accommodations included in the trips may correspond to different categories, including:</p><ul class="list-disc list-inside text-sm text-[var(--gray-text-color)] space-y-1"><li>1 to 5 star hotels</li><li>1 to 3 star pensions</li><li>Rural houses</li><li>1 to 4 key tourist apartments</li><li>Tourist hostels</li><li>Housing for tourist use</li></ul></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">3.4 Insurance</h3><p class="text-[var(--gray-text-color)] leading-relaxed mb-2">The agency will offer information to the traveler about the contracting of optional insurance that may include coverage such as:</p><ul class="list-disc list-inside text-sm text-[var(--gray-text-color)] space-y-1"><li>Cancellation expenses due to unforeseen causes or force majeure</li><li>Assistance in case of accident during the trip</li><li>Repatriation in situations of serious illness or death</li></ul></div>
        </div>
        `
      }
    ]
  },
  por: {
    pageTitle: "Termos e Condições — Step To Santiago",
    heroTitle: "Termos e <span class=\"text-[var(--accent-color)]\">Condições</span>",
    heroDesc: "Condições aplicáveis à contratação de viagens organizadas e serviços turísticos.",
    sidebarTitle: "Conteúdo",
    sections: [
      { id: "definicoes", title: "1. Definições", 
        content: `
        <div class="space-y-4">
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">A. Viagem combinada</h4><p class="text-sm text-[var(--gray-text-color)]">Entende-se por viagem combinada aquele serviço que integra duas ou mais prestações turísticas (como transporte, alojamento ou outros serviços relacionados) dentro do mesmo contrato e para a mesma experiência de viagem.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">B. Serviço de viagem</h4><p class="text-sm text-[var(--gray-text-color)]">Qualquer prestação incluída no itinerário, como o transporte de passageiros, alojamento, aluguel de veículos ou outros serviços turísticos complementares.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">C. Contrato de viagem</h4><p class="text-sm text-[var(--gray-text-color)]">Acordo formal através do qual se reúnem um ou mais serviços de viagem contratados, incluindo todas as condições aplicáveis à viagem combinada.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">D. Data de início</h4><p class="text-sm text-[var(--gray-text-color)]">Dia em que começam a ser executados os serviços incluídos na viagem contratada.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">E. Repatriação</h4><p class="text-sm text-[var(--gray-text-color)]">Processo mediante o qual o viajante é transferido de volta ao seu local de origem ou a outro destino previamente acordado entre as partes.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">F. Falta de conformidade</h4><p class="text-sm text-[var(--gray-text-color)]">Situação em que os serviços prestados não são executados corretamente ou não se ajustam ao acordado no contrato.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">G. Viajante</h4><p class="text-sm text-[var(--gray-text-color)]">Pessoa que contrata ou tem o direito de se beneficiar de uma viagem ao abrigo do contrato de serviços turísticos.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">H. Empresa turística</h4><p class="text-sm text-[var(--gray-text-color)]">Entidade responsável pela organização, comercialização ou prestação dos serviços de viagem incluídos no programa contratado.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">I. Organizador da viagem</h4><p class="text-sm text-[var(--gray-text-color)]">Empresa que combina os diferentes serviços turísticos e os oferece como uma viagem conjunta, seja diretamente ou através de terceiros.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">J. Agência retalhista</h4><p class="text-sm text-[var(--gray-text-color)]">Entidade que comercializa ou vende viagens combinadas organizadas por terceiros, sem ser a empresa organizadora.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">L. Menor de idade</h4><p class="text-sm text-[var(--gray-text-color)]">Toda pessoa que não atingiu a idade de 18 anos no momento da contratação ou da viagem.</p></div>
          <div><h4 class="font-bold text-[var(--dark-text-color)] text-sm">M. Circunstâncias extraordinárias</h4><p class="text-sm text-[var(--gray-text-color)]">Situações excepcionais e imprevisíveis, alheias ao controle da organização, cujas consequências não poderiam ser evitadas mesmo com a adoção de todas as medidas razoáveis.</p></div>
        </div>
        `
      },
      { id: "viagens-combinadas", title: "2. Notas importantes sobre viagens combinadas",
        content: `
        <div class="space-y-6">
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.1 Organização da viagem combinada</h3><p class="text-[var(--gray-text-color)] leading-relaxed">O planejamento e gestão das viagens combinadas correspondem a TU BUEN CAMINO, como entidade responsável pela coordenação de todos os serviços incluídos.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.2 Contrato de viagem combinada</h3><p class="text-[var(--gray-text-color)] leading-relaxed">Uma vez confirmada a reserva, o viajante receberá uma cópia do contrato de viagem combinada num prazo máximo de 24 horas desde a sua formalização. Este contrato incluirá, como parte essencial, as condições gerais, a informação prévia facilitada ao viajante e as condições específicas acordadas em cada reserva.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.3 Preço, reserva e forma de pagamento</h3><p class="text-[var(--gray-text-color)] leading-relaxed mb-4">O preço das viagens combinadas é estabelecido em função dos serviços contratados e ficará refletido na confirmação da reserva. Para garantir o lugar, será necessário realizar o pagamento de acordo com as condições indicadas no momento da contratação.</p>
          <h4 class="font-bold text-green-600 text-sm mb-2">O preço INCLUI</h4><ul class="list-disc list-inside text-sm text-[var(--gray-text-color)] mb-4 space-y-1"><li>Todos os serviços turísticos detalhados na documentação da viagem</li><li>Despesas de gestão, comissões e encargos associados à reserva</li><li>Assistência ao viajante em caso de incidentes durante o percurso</li><li>Apoio no processamento de queixas ou reclamações relacionadas com o serviço</li></ul>
          <h4 class="font-bold text-red-600 text-sm mb-2">O preço NÃO INCLUI</h4><ul class="list-disc list-inside text-sm text-[var(--gray-text-color)] mb-4 space-y-1"><li>Documentação pessoal necessária, como vistos ou certificados sanitários</li><li>Consumos adicionais não especificados (bebidas, snacks ou dietas especiais)</li><li>Serviços opcionais como spa, massagens ou outros tratamentos</li><li>Taxas turísticas locais, que devem ser pagas diretamente no alojamento</li><li>Impostos ou taxas aplicáveis em aeroportos ou outros pontos de transporte, exceto indicação expressa incluída no programa</li></ul>
          <h4 class="font-bold text-[var(--dark-text-color)] text-sm mb-2">Processo de reserva</h4><ol class="list-decimal list-inside text-sm text-[var(--gray-text-color)] mb-4 space-y-1"><li><strong class="text-[var(--dark-text-color)]">Pedido de reserva:</strong> Preencha e envie o formulário de reserva através do nosso site com os dados necessários para organizar a sua viagem.</li><li><strong class="text-[var(--dark-text-color)]">Pagamento da viagem:</strong> Realize o pagamento correspondente para garantir o seu lugar, de acordo com as condições indicadas no processo de contratação.</li><li><strong class="text-[var(--dark-text-color)]">Confirmação da reserva:</strong> A reserva ficará confirmada apenas quando receber o nosso e-mail de confirmação com todos os detalhes.</li><li><strong class="text-[var(--dark-text-color)]">Documentação da viagem:</strong> Alguns dias antes do início do Caminho receberá toda a informação necessária, incluindo serviços contratados, alojamentos e recomendações para a sua rota.</li></ol>
          <h4 class="font-bold text-red-600 text-sm mb-2">Reservas com menos de 7 dias de antecedência</h4><p class="text-[var(--gray-text-color)] text-sm leading-relaxed">Para reservas efetuadas com uma antecedência inferior a 7 dias antes do início da viagem, será necessário efetuar o pagamento integral mediante cartão antes das 12:00 h do mesmo dia em que a confirmação é solicitada. Caso não seja possível confirmar os serviços por parte da agência, será procedida a devolução integral do montante pago num prazo máximo de 12 horas.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.4 Assistência</h3><p class="text-[var(--gray-text-color)] leading-relaxed">O viajante poderá dirigir-se em qualquer momento ao organizador para enviar consultas, solicitações ou reclamações relacionadas com a sua viagem. Caso surjam situações inevitáveis ou extraordinárias, será prestada assistência adequada com a maior rapidez possível, com o objetivo de minimizar qualquer incidência durante o percurso. Se devido a estas circunstâncias não for possível garantir o regresso na data prevista, as despesas de alojamento serão cobertas por um máximo de três noites, nas condições estabelecidas pela normativa aplicável.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.5 Modificação do contrato</h3><p class="text-[var(--gray-text-color)] leading-relaxed mb-4">A organização poderá introduzir alterações no contrato antes do início da viagem, desde que estas sejam de caráter menor e comunicadas ao viajante com a devida antecedência.</p><h4 class="font-bold text-[var(--dark-text-color)] text-sm mb-2">Modificações superiores a 8%</h4><p class="text-sm text-[var(--gray-text-color)]">Caso o aumento do preço supere os 8% ou ocorram mudanças substanciais nos serviços principais da viagem, o viajante terá o direito de resolver o contrato sem que isso implique qualquer penalização.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.6 Cessão do contrato</h3><p class="text-[var(--gray-text-color)] leading-relaxed">O viajante poderá ceder o seu lugar a outra pessoa desde que esta cumpra com os requisitos necessários para a viagem. Esta cessão deverá ser comunicada à organização com um mínimo de 7 dias civis de antecedência em relação ao início do serviço. Tanto o viajante original quanto a pessoa que o substitui serão responsáveis de forma solidária pelo pagamento pendente e de qualquer despesa adicional que pudesse derivar da cessão.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.7 Pagamentos e reembolsos</h3><p class="text-[var(--gray-text-color)] leading-relaxed">Para poder usufruir de todos os serviços incluídos na viagem, esta deverá encontrar-se paga na sua totalidade antes do início da mesma. Caso a agência proceda à resolução do contrato, o valor correspondente será reembolsado ao viajante num prazo máximo de 14 dias civis desde a notificação. Se o viajante não comparecer na data e hora acordadas para o início dos serviços, não terá direito a qualquer devolução. Da mesma forma, o prêmio correspondente ao seguro de cancelamento, caso tenha sido contratado, não será reembolsável sob nenhuma circunstância.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">2.8 Resolução do contrato pelo viajante</h3>
          <h4 class="font-bold text-[var(--dark-text-color)] text-sm mb-2">Penalização por cancelamento</h4><p class="text-[var(--gray-text-color)] text-sm leading-relaxed mb-4">O cancelamento da viagem por parte do viajante implicará uma penalização de 100% do montante total quando realizada dentro dos 15 dias anteriores ao início da viagem. No caso de grupos de 12 ou mais pessoas, este prazo é alargado para 30 dias antes do início da viagem.</p>
          <h4 class="font-bold text-[var(--dark-text-color)] text-sm mb-2">Direito a resolução sem penalização e com reembolso total</h4><p class="text-[var(--gray-text-color)] text-sm leading-relaxed mb-2">O viajante poderá resolver o contrato sem qualquer custo e com direito à devolução integral das quantias pagas nos seguintes casos:</p><ul class="list-disc list-inside text-sm text-[var(--gray-text-color)] space-y-1"><li>Quando ocorram circunstâncias inevitáveis e extraordinárias no destino que afetem de forma significativa o desenvolvimento da viagem.</li><li>Se ocorrer uma modificação substancial de elementos essenciais do contrato, excluindo o preço.</li><li>Em caso de cancelamento da viagem por parte da agência antes do início da mesma.</li><li>Quando houver uma falta de execução relevante dos serviços contratados.</li><li>Em situações excepcionais que afetem a segurança do viajante ou do desenvolvimento da viagem.</li></ul></div>
        </div>
        `
      },
      { id: "consideracoes", title: "3. Considerações gerais",
        content: `
        <div class="space-y-6">
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">3.1 Documentação</h3><p class="text-[var(--gray-text-color)] leading-relaxed">Cada viajante é responsável por dispor em vigor da documentação necessária para realizar a viagem, incluindo cartão de cidadão, passaporte, vistos e qualquer requisito sanitário que possa ser exigido. Caso o cancelamento da viagem se produza por falta ou validade incorreta dessa documentação, aplicar-se-ão as condições de cancelamento estabelecidas.</p></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">3.2 Serviço de transporte de bagagem</h3><p class="text-[var(--gray-text-color)] leading-relaxed mb-2">O serviço de transporte de bagagem é prestado apenas em etapas realizadas a pé ou de bicicleta. Exclui-se o transporte em meios de transporte como autocarro, comboio ou veículo motorizado.</p>
          <div class="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3"><i class="fa-solid fa-triangle-exclamation text-amber-500 mt-0.5 flex-shrink-0"></i><p class="text-sm text-amber-800 leading-relaxed"><strong class="font-bold">Importante:</strong> A organização reserva-se o direito de suspender o serviço a qualquer utilizador que gere incidentes ou distúrbios durante a sua prestação. Da mesma forma, não se assume responsabilidade por perdas, danos ou deterioração da bagagem, exceto nos casos legalmente estabelecidos.</p></div></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">3.3 Categoria dos alojamentos</h3><p class="text-[var(--gray-text-color)] leading-relaxed mb-2">Os alojamentos incluídos nas viagens podem corresponder a diferentes categorias, incluindo:</p><ul class="list-disc list-inside text-sm text-[var(--gray-text-color)] space-y-1"><li>Hotéis de 1 a 5 estrelas</li><li>Pensões de 1 a 3 estrelas</li><li>Casas rurais</li><li>Apartamentos turísticos de 1 a 4 chaves</li><li>Albergues turísticos</li><li>Alojamento local</li></ul></div>
          <div><h3 class="font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">3.4 Seguros</h3><p class="text-[var(--gray-text-color)] leading-relaxed mb-2">A agência oferecerá informação ao viajante sobre a contratação de um seguro opcional que poderá incluir coberturas como:</p><ul class="list-disc list-inside text-sm text-[var(--gray-text-color)] space-y-1"><li>Despesas de cancelamento por causas imprevistas ou de força maior</li><li>Assistência em caso de acidente durante a viagem</li><li>Repatriação em situações de doença grave ou falecimento</li></ul></div>
        </div>
        `
      }
    ]
  }
};

const langs = ['es', 'en', 'por'];

langs.forEach(lang => {
  const templatePath = path.join(rootDir, lang, 'pages', 'legal.html');
  const targetPath = path.join(rootDir, lang, 'pages', 'terminos.html');
  
  if (!fs.existsSync(templatePath)) return;
  
  let html = fs.readFileSync(templatePath, 'utf8');
  
  // Actually, wait, let's make sure we replace content properly.
  
  const data = contentData[lang];
  
  // Replace title
  html = html.replace(/<title>.*?<\/title>/, `<title>${data.pageTitle}</title>`);
  
  // Replace hero title
  html = html.replace(/<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"\s*style="font-family: var\(--font-family-heading\);">\s*.*?\s*<\/h1>/,
  `<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                style="font-family: var(--font-family-heading);">
                ${data.heroTitle}
              </h1>`);
              
  // Replace hero desc
  html = html.replace(/<p class="text-white\/75 text-lg md:text-xl leading-relaxed">\s*.*?\s*<\/p>/,
  `<p class="text-white/75 text-lg md:text-xl leading-relaxed">
                ${data.heroDesc}
              </p>`);

  // Build sidebar
  let sidebarLinks = '';
  data.sections.forEach((sec, idx) => {
    sidebarLinks += `
                    <a href="#${sec.id}"
                      class="flex items-center gap-2 text-sm text-[var(--gray-text-color)] hover:text-[var(--primary-color)] hover:font-semibold transition-all py-1 border-l-2 border-transparent hover:border-[var(--accent-color)] pl-3">
                      <span>${sec.title}</span>
                    </a>`;
  });
  
  const sidebarContent = `
                  <h2 class="text-sm font-bold text-[var(--dark-text-color)] uppercase tracking-wider mb-4"
                    style="font-family: var(--font-family-heading);">
                    <i class="fa-solid fa-list-ul text-[var(--accent-color)] mr-2"></i>${data.sidebarTitle}
                  </h2>
                  <nav class="space-y-2">
${sidebarLinks}
                  </nav>
  `;
  
  html = html.replace(/<h2 class="text-sm font-bold text-\[var\(--dark-text-color\)\] uppercase tracking-wider mb-4"[\s\S]*?<\/nav>/, sidebarContent);
  
  // Build main content
  let mainContentHtml = '';
  const icons = ['fa-file-signature', 'fa-suitcase-rolling', 'fa-book-open'];
  const colors = ['var(--primary-color)', 'var(--accent-color)', 'var(--accent2-color)'];
  
  data.sections.forEach((sec, idx) => {
    const icon = icons[idx % icons.length];
    const color = colors[idx % colors.length];
    
    mainContentHtml += `
                <!-- SECTION ${idx + 1} -->
                <article id="${sec.id}" class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <div class="p-6 md:p-8">
                    <div class="flex items-center gap-4 mb-6">
                      <div class="w-12 h-12 bg-[${color}]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <i class="fa-solid ${icon} text-[${color}] text-xl"></i>
                      </div>
                      <div>
                        <p class="text-xs text-[var(--accent-color)] font-semibold uppercase tracking-wider">Sección ${idx + 1}</p>
                        <h2 class="text-xl md:text-2xl font-bold text-[var(--dark-text-color)]"
                          style="font-family: var(--font-family-heading);">${sec.title.substring(3)}</h2>
                      </div>
                    </div>
                    ${sec.content}
                  </div>
                </article>
    `;
  });
  
  // Replace the <main> block
  html = html.replace(/<main class="lg:col-span-3 space-y-8 mt-8 lg:mt-0">[\s\S]*?<\/main>/, `<main class="lg:col-span-3 space-y-8 mt-8 lg:mt-0">\n${mainContentHtml}\n              </main>`);
  
  // Overwrite file unconditionally with utf8
  fs.writeFileSync(targetPath, html, 'utf8');
});

console.log("Terms and conditions generated for all languages.");
