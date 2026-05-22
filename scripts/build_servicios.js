const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const contentData = {
  es: {
    pageTitle: "Servicios — Step To Santiago",
    heroTitle: 'Nuestros <span class="text-[var(--accent-color)]">Servicios</span>',
    heroDesc: "Descubre todo lo que podemos hacer para que tu Camino de Santiago sea más cómodo, fácil y sin preocupaciones. ¡Nosotros nos encargamos de todo!",
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Servicios",
    expandLabel: "Ver más",
    collapseLabel: "Cerrar detalles",
    services: [
      {
        id: "desayunos",
        title: "Desayunos",
        icon: "fa-mug-hot",
        image: "../../assets/service_breakfast.png",
        tagline: "Empieza cada etapa con energía",
        characteristics: [
          { icon: "fa-bolt", text: "Energía para el camino" },
          { icon: "fa-clock", text: "Disponible muy temprano" },
          { icon: "fa-leaf", text: "Opciones equilibradas" }
        ],
        detail: `
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 class="text-2xl font-bold text-[var(--dark-text-color)] mb-4" style="font-family: var(--font-family-heading);">El mejor inicio para tu jornada</h3>
              <p class="leading-relaxed mb-4">Cada jornada del Camino comienza con un reto, y tu cuerpo necesita la energía adecuada para afrontarlo desde el primer paso. Después de todo, te esperan kilómetros de esfuerzo, por lo que empezar el día bien alimentado marca la diferencia.</p>
              <p class="leading-relaxed mb-4">Sabemos que muchas veces los peregrinos salen muy temprano, incluso antes del amanecer, lo que complica disfrutar de un desayuno completo y tranquilo. Por eso, queremos ponértelo fácil. Con nuestro servicio de desayunos, tendrás cada mañana una opción práctica, equilibrada y pensada para darte la fuerza que necesitas.</p>
            </div>
            <div>
              <div class="p-6 bg-amber-50 border border-amber-200 rounded-2xl shadow-sm relative overflow-hidden">
                <div class="absolute top-0 right-0 w-24 h-24 bg-amber-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
                <i class="fa-solid fa-star text-amber-400 text-3xl mb-4 relative z-10"></i>
                <p class="text-amber-900 font-medium relative z-10 text-lg leading-relaxed">Por un precio asequible, podrás disfrutar de un desayuno de calidad. Te recomendamos reservarlo con antelación junto a tu alojamiento, para ganar tiempo y comodidad durante tu viaje.</p>
              </div>
            </div>
          </div>
        `
      },
      {
        id: "comidas",
        title: "Comidas y Cenas",
        icon: "fa-utensils",
        image: "../../assets/service_meals.png",
        tagline: "Gastronomía gallega en tu ruta",
        characteristics: [
          { icon: "fa-plate-wheat", text: "Cocina gallega local" },
          { icon: "fa-calendar-check", text: "Mesa reservada sin esperas" },
          { icon: "fa-tag", text: "Precio equilibrado" }
        ],
        detail: `
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 class="text-2xl font-bold text-[var(--dark-text-color)] mb-4" style="font-family: var(--font-family-heading);">Recupera fuerzas con sabor</h3>
              <p class="leading-relaxed mb-4">Después de cada etapa, lo más habitual es que llegues con ganas de descansar y sin demasiada energía para buscar dónde comer o cenar. Y durante la jornada, muchas veces tampoco resulta sencillo encontrar un lugar adecuado para hacer una pausa tranquila.</p>
              <p class="leading-relaxed mb-4">Te ofrecemos nuestro servicio de comidas y cenas, pensado para que no tengas que preocuparte por nada. Tendrás tu mesa lista en el momento adecuado, ya sea a mitad de jornada o al finalizar el día, evitando desplazamientos innecesarios.</p>
              <p class="leading-relaxed mb-4">Podrás disfrutar de platos variados y de calidad, incluyendo especialidades de la gastronomía gallega, todo a un precio equilibrado.</p>
            </div>
            <div>
              <div class="p-6 bg-orange-50 border border-orange-200 rounded-2xl shadow-sm relative overflow-hidden">
                <div class="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
                <i class="fa-solid fa-bell-concierge text-orange-400 text-3xl mb-4 relative z-10"></i>
                <p class="text-orange-900 font-medium relative z-10 text-lg leading-relaxed">Te recomendamos reservar este servicio con antelación, ya que es una de las opciones más solicitadas por los peregrinos.</p>
              </div>
            </div>
          </div>
        `
      },
      {
        id: "mochilas",
        title: "Transporte de Mochilas",
        icon: "fa-suitcase-rolling",
        image: "../../assets/service_luggage.png",
        tagline: "Camina ligero, disfruta más",
        characteristics: [
          { icon: "fa-person-walking", text: "Sin dolor de espalda" },
          { icon: "fa-route", text: "4 rutas disponibles" },
          { icon: "fa-map-location-dot", text: "Sarria, Tui, Ferrol, Lugo" }
        ],
        detail: `
          <div class="mb-8 text-center max-w-2xl mx-auto">
            <h3 class="text-2xl font-bold text-[var(--dark-text-color)] mb-4" style="font-family: var(--font-family-heading);">Tu equipaje, en buenas manos</h3>
            <p class="leading-relaxed text-lg">¿Quieres evitar dolores de espalda mientras haces el Camino? En Tu Buen Camino nos preocupamos por tu comodidad. De esta manera irás más rápido y evitarás dolores de espalda innecesarios.</p>
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div class="absolute top-0 left-0 w-1 h-full bg-[var(--accent2-color)]"></div>
              <h4 class="font-bold text-gray-800 mb-2"><i class="fa-solid fa-map-location-dot text-[var(--accent2-color)] mr-2"></i>Camino Portugués</h4>
              <p class="text-sm text-gray-600">Te llevamos la mochila desde Tui hasta el siguiente alojamiento.</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div class="absolute top-0 left-0 w-1 h-full bg-[var(--accent2-color)]"></div>
              <h4 class="font-bold text-gray-800 mb-2"><i class="fa-solid fa-map-location-dot text-[var(--accent2-color)] mr-2"></i>Camino Francés</h4>
              <p class="text-sm text-gray-600">Desde el comienzo de la etapa en Sarria hasta el albergue, pensión u hotel.</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div class="absolute top-0 left-0 w-1 h-full bg-[var(--accent2-color)]"></div>
              <h4 class="font-bold text-gray-800 mb-2"><i class="fa-solid fa-map-location-dot text-[var(--accent2-color)] mr-2"></i>Camino Inglés</h4>
              <p class="text-sm text-gray-600">Llevamos tu mochila desde Ferrol al próximo alojamiento.</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div class="absolute top-0 left-0 w-1 h-full bg-[var(--accent2-color)]"></div>
              <h4 class="font-bold text-gray-800 mb-2"><i class="fa-solid fa-map-location-dot text-[var(--accent2-color)] mr-2"></i>Camino Primitivo</h4>
              <p class="text-sm text-gray-600">Transportamos tu mochila desde Lugo hasta el siguiente alojamiento.</p>
            </div>
          </div>
          <div class="text-center">
            <button class="px-8 py-3 bg-[var(--accent2-color)] text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">¡Contrata AHORA nuestro servicio!</button>
          </div>
        `
      },
      {
        id: "aeropuerto",
        title: "Traslado al Aeropuerto",
        icon: "fa-plane-departure",
        image: "../../assets/service_airport.png",
        tagline: "Cierra tu Camino sin estrés",
        characteristics: [
          { icon: "fa-house-user", text: "Recogida en tu alojamiento" },
          { icon: "fa-users", text: "Individual o en grupo" },
          { icon: "fa-clock-rotate-left", text: "Puntualidad garantizada" }
        ],
        detail: `
          <div class="grid md:grid-cols-5 gap-8 items-center">
            <div class="md:col-span-3">
              <h3 class="text-2xl font-bold text-[var(--dark-text-color)] mb-4" style="font-family: var(--font-family-heading);">Despídete del Camino con tranquilidad</h3>
              <p class="leading-relaxed mb-4">Si al terminar tu Camino tienes previsto regresar en avión, nosotros te facilitamos el último paso del viaje. Nos encargamos de llevarte cómodamente hasta el aeropuerto para que no tengas que preocuparte por nada.</p>
              <p class="leading-relaxed mb-4">Te recogemos directamente en tu alojamiento final y te trasladamos de forma puntual, evitando esperas innecesarias y el estrés de organizar el transporte por tu cuenta. Así podrás despedirte del Camino con tranquilidad y sin prisas.</p>
              <p class="leading-relaxed mb-4">Nuestro servicio está disponible tanto para viajeros individuales como para grupos, adaptándose a tus necesidades en todo momento.</p>
            </div>
            <div class="md:col-span-2">
              <div class="p-6 bg-blue-50 border border-blue-200 rounded-2xl shadow-sm relative overflow-hidden">
                <div class="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
                <i class="fa-solid fa-ticket text-blue-400 text-3xl mb-4 relative z-10"></i>
                <p class="text-blue-900 font-medium relative z-10 text-lg leading-relaxed">Reserva con antelación y asegúrate un traslado cómodo, sin imprevistos ni costes inesperados.</p>
              </div>
            </div>
          </div>
        `
      },
      {
        id: "inicio",
        title: "Transporte al Inicio",
        icon: "fa-van-shuttle",
        image: "../../assets/service_transfer.png",
        tagline: "Empieza tu aventura sin complicaciones",
        characteristics: [
          { icon: "fa-plane-arrival", text: "Desde el aeropuerto" },
          { icon: "fa-map-pin", text: "Sarria, Tui, Ferrol y más" },
          { icon: "fa-people-group", text: "Grupos reducidos" }
        ],
        detail: `
          <div class="grid md:grid-cols-5 gap-8 items-center">
            <div class="md:col-span-2 order-2 md:order-1">
              <div class="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-sm relative overflow-hidden h-full flex flex-col justify-center">
                <div class="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
                <i class="fa-solid fa-location-dot text-emerald-400 text-3xl mb-4 relative z-10"></i>
                <p class="text-emerald-900 font-medium relative z-10 text-lg leading-relaxed">Para disfrutar de este servicio, solo necesitas contar con uno de nuestros planes y añadir el transporte como extra en tu reserva.</p>
              </div>
            </div>
            <div class="md:col-span-3 order-1 md:order-2">
              <h3 class="text-2xl font-bold text-[var(--dark-text-color)] mb-4" style="font-family: var(--font-family-heading);">Comienza con buen pie</h3>
              <p class="leading-relaxed mb-4">Si estás pensando en hacer el Camino de Santiago pero no tienes claro cómo llegar al lugar desde el que comenzarás tu ruta, no te preocupes: nosotros nos ocupamos de todo.</p>
              <p class="leading-relaxed mb-4">Ponemos a tu disposición un servicio pensado para llevarte directamente a tu punto de partida sin complicaciones. Ya sea que inicies el Camino desde Sarria, Tui o Ferrol, nos adaptamos a tu itinerario para que llegues de forma rápida, cómoda y sin gastar de más tiempo ni dinero.</p>
              <p class="leading-relaxed mb-4">Además, ofrecemos traslados desde el aeropuerto o desde otros puntos clave hasta el inicio de tu ruta. Nuestros vehículos están preparados para grupos reducidos.</p>
            </div>
          </div>
        `
      }
    ]
  },
  en: {
    pageTitle: "Services — Step To Santiago",
    heroTitle: 'Our <span class="text-[var(--accent-color)]">Services</span>',
    heroDesc: "Discover everything we can do to make your Camino de Santiago more comfortable, easy, and worry-free. We take care of everything!",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Services",
    expandLabel: "See more",
    collapseLabel: "Close details",
    services: [
      {
        id: "desayunos",
        title: "Breakfasts",
        icon: "fa-mug-hot",
        image: "../../assets/service_breakfast.png",
        tagline: "Start every stage with energy",
        characteristics: [
          { icon: "fa-bolt", text: "Energy for the trail" },
          { icon: "fa-clock", text: "Available very early" },
          { icon: "fa-leaf", text: "Balanced options" }
        ],
        detail: `
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 class="text-2xl font-bold text-[var(--dark-text-color)] mb-4" style="font-family: var(--font-family-heading);">The best start for your day</h3>
              <p class="leading-relaxed mb-4">Every day on the Camino starts with a challenge, and your body needs the right energy to face it from the very first step. Starting the day well-fed makes a real difference.</p>
              <p class="leading-relaxed mb-4">We know that pilgrims often leave very early, even before dawn. With our breakfast service, you will have a practical, balanced option every morning designed to give you the strength you need.</p>
            </div>
            <div>
              <div class="p-6 bg-amber-50 border border-amber-200 rounded-2xl shadow-sm relative overflow-hidden">
                <div class="absolute top-0 right-0 w-24 h-24 bg-amber-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
                <i class="fa-solid fa-star text-amber-400 text-3xl mb-4 relative z-10"></i>
                <p class="text-amber-900 font-medium relative z-10 text-lg leading-relaxed">For an affordable price, you can enjoy a quality breakfast. We recommend booking it in advance along with your accommodation, to save time and add comfort to your trip.</p>
              </div>
            </div>
          </div>
        `
      },
      {
        id: "comidas",
        title: "Lunches & Dinners",
        icon: "fa-utensils",
        image: "../../assets/service_meals.png",
        tagline: "Galician gastronomy on your route",
        characteristics: [
          { icon: "fa-plate-wheat", text: "Local Galician cuisine" },
          { icon: "fa-calendar-check", text: "Table reserved, no waiting" },
          { icon: "fa-tag", text: "Balanced price" }
        ],
        detail: `
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 class="text-2xl font-bold text-[var(--dark-text-color)] mb-4" style="font-family: var(--font-family-heading);">Recover strength with flavor</h3>
              <p class="leading-relaxed mb-4">After each stage, you will most likely arrive wanting to rest and without much energy to look for where to eat. We offer a lunch and dinner service designed so you don't have to worry about anything.</p>
              <p class="leading-relaxed mb-4">You will have your table ready at the right time — whether mid-day or at the end of the day — avoiding unnecessary trips and time wasted.</p>
              <p class="leading-relaxed mb-4">You can enjoy varied and quality dishes, including specialties of Galician gastronomy, all at a balanced price.</p>
            </div>
            <div>
              <div class="p-6 bg-orange-50 border border-orange-200 rounded-2xl shadow-sm relative overflow-hidden">
                <div class="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
                <i class="fa-solid fa-bell-concierge text-orange-400 text-3xl mb-4 relative z-10"></i>
                <p class="text-orange-900 font-medium relative z-10 text-lg leading-relaxed">We recommend booking this service in advance, as it is one of the most requested options by pilgrims.</p>
              </div>
            </div>
          </div>
        `
      },
      {
        id: "mochilas",
        title: "Luggage Transport",
        icon: "fa-suitcase-rolling",
        image: "../../assets/service_luggage.png",
        tagline: "Walk light, enjoy more",
        characteristics: [
          { icon: "fa-person-walking", text: "No back pain" },
          { icon: "fa-route", text: "4 routes available" },
          { icon: "fa-map-location-dot", text: "Sarria, Tui, Ferrol, Lugo" }
        ],
        detail: `
          <div class="mb-8 text-center max-w-2xl mx-auto">
            <h3 class="text-2xl font-bold text-[var(--dark-text-color)] mb-4" style="font-family: var(--font-family-heading);">Your luggage, in good hands</h3>
            <p class="leading-relaxed text-lg">Do you want to avoid back pain while walking the Camino? We offer our backpack transport service so you can focus on the journey, not the weight.</p>
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div class="absolute top-0 left-0 w-1 h-full bg-[var(--accent2-color)]"></div>
              <h4 class="font-bold text-gray-800 mb-2"><i class="fa-solid fa-map-location-dot text-[var(--accent2-color)] mr-2"></i>Portuguese Way</h4>
              <p class="text-sm text-gray-600">We take your backpack from Tui to the next accommodation.</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div class="absolute top-0 left-0 w-1 h-full bg-[var(--accent2-color)]"></div>
              <h4 class="font-bold text-gray-800 mb-2"><i class="fa-solid fa-map-location-dot text-[var(--accent2-color)] mr-2"></i>French Way</h4>
              <p class="text-sm text-gray-600">From the start in Sarria to your next hostel, pension or hotel.</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div class="absolute top-0 left-0 w-1 h-full bg-[var(--accent2-color)]"></div>
              <h4 class="font-bold text-gray-800 mb-2"><i class="fa-solid fa-map-location-dot text-[var(--accent2-color)] mr-2"></i>English Way</h4>
              <p class="text-sm text-gray-600">We carry your backpack from Ferrol to your next accommodation.</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div class="absolute top-0 left-0 w-1 h-full bg-[var(--accent2-color)]"></div>
              <h4 class="font-bold text-gray-800 mb-2"><i class="fa-solid fa-map-location-dot text-[var(--accent2-color)] mr-2"></i>Primitive Way</h4>
              <p class="text-sm text-gray-600">We transport your backpack from Lugo to the next accommodation.</p>
            </div>
          </div>
          <div class="text-center">
            <button class="px-8 py-3 bg-[var(--accent2-color)] text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">Hire our service NOW!</button>
          </div>
        `
      },
      {
        id: "aeropuerto",
        title: "Airport Transfer",
        icon: "fa-plane-departure",
        image: "../../assets/service_airport.png",
        tagline: "End your Camino stress-free",
        characteristics: [
          { icon: "fa-house-user", text: "Pickup at your accommodation" },
          { icon: "fa-users", text: "Individual or group" },
          { icon: "fa-clock-rotate-left", text: "Punctuality guaranteed" }
        ],
        detail: `
          <div class="grid md:grid-cols-5 gap-8 items-center">
            <div class="md:col-span-3">
              <h3 class="text-2xl font-bold text-[var(--dark-text-color)] mb-4" style="font-family: var(--font-family-heading);">Say goodbye with peace of mind</h3>
              <p class="leading-relaxed mb-4">If you plan to return by plane, we make the last step of the trip easy for you. We pick you up directly at your final accommodation and transfer you punctually, avoiding unnecessary waits and stress.</p>
              <p class="leading-relaxed mb-4">Our service is available for both individual travelers and groups, adapting to your needs at all times.</p>
            </div>
            <div class="md:col-span-2">
              <div class="p-6 bg-blue-50 border border-blue-200 rounded-2xl shadow-sm relative overflow-hidden">
                <div class="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
                <i class="fa-solid fa-ticket text-blue-400 text-3xl mb-4 relative z-10"></i>
                <p class="text-blue-900 font-medium relative z-10 text-lg leading-relaxed">Book in advance and ensure a comfortable transfer. End your Camino experience the best way: relaxed and with everything under control.</p>
              </div>
            </div>
          </div>
        `
      },
      {
        id: "inicio",
        title: "Transfer to Starting Point",
        icon: "fa-van-shuttle",
        image: "../../assets/service_transfer.png",
        tagline: "Start your adventure without complications",
        characteristics: [
          { icon: "fa-plane-arrival", text: "From the airport" },
          { icon: "fa-map-pin", text: "Sarria, Tui, Ferrol & more" },
          { icon: "fa-people-group", text: "Small groups" }
        ],
        detail: `
          <div class="grid md:grid-cols-5 gap-8 items-center">
            <div class="md:col-span-2 order-2 md:order-1">
              <div class="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-sm relative overflow-hidden h-full flex flex-col justify-center">
                <div class="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
                <i class="fa-solid fa-location-dot text-emerald-400 text-3xl mb-4 relative z-10"></i>
                <p class="text-emerald-900 font-medium relative z-10 text-lg leading-relaxed">To enjoy this service, just add transport as an extra in your reservation. Start your Camino on the right foot!</p>
              </div>
            </div>
            <div class="md:col-span-3 order-1 md:order-2">
              <h3 class="text-2xl font-bold text-[var(--dark-text-color)] mb-4" style="font-family: var(--font-family-heading);">Start off on the right foot</h3>
              <p class="leading-relaxed mb-4">If you are not sure how to reach your starting point, don't worry — we take care of everything. We offer a service designed to take you directly to your starting point without complications.</p>
              <p class="leading-relaxed mb-4">Whether you start from Sarria, Tui, or Ferrol, we adapt to your itinerary so that you arrive quickly and comfortably. We also offer transfers from the airport or other key points.</p>
            </div>
          </div>
        `
      }
    ]
  },
  por: {
    pageTitle: "Serviços — Step To Santiago",
    heroTitle: 'Nossos <span class="text-[var(--accent-color)]">Serviços</span>',
    heroDesc: "Descubra tudo o que podemos fazer para que o seu Caminho de Santiago seja mais confortável, fácil e sem preocupações. Nós tratamos de tudo!",
    breadcrumbHome: "Início",
    breadcrumbCurrent: "Serviços",
    expandLabel: "Ver mais",
    collapseLabel: "Fechar detalhes",
    services: [
      {
        id: "desayunos",
        title: "Pequenos-almoços",
        icon: "fa-mug-hot",
        image: "../../assets/service_breakfast.png",
        tagline: "Comece cada etapa com energia",
        characteristics: [
          { icon: "fa-bolt", text: "Energia para o caminho" },
          { icon: "fa-clock", text: "Disponível muito cedo" },
          { icon: "fa-leaf", text: "Opções equilibradas" }
        ],
        detail: `
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 class="text-2xl font-bold text-[var(--dark-text-color)] mb-4" style="font-family: var(--font-family-heading);">O melhor início para a sua jornada</h3>
              <p class="leading-relaxed mb-4">Cada jornada do Caminho começa com um desafio, e o seu corpo precisa da energia adequada desde o primeiro passo. Começar o dia bem alimentado faz a diferença.</p>
              <p class="leading-relaxed mb-4">Com o nosso serviço de pequenos-almoços, terá todas as manhãs uma opção prática e equilibrada pensada para lhe dar a força de que precisa.</p>
            </div>
            <div>
              <div class="p-6 bg-amber-50 border border-amber-200 rounded-2xl shadow-sm relative overflow-hidden">
                <div class="absolute top-0 right-0 w-24 h-24 bg-amber-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
                <i class="fa-solid fa-star text-amber-400 text-3xl mb-4 relative z-10"></i>
                <p class="text-amber-900 font-medium relative z-10 text-lg leading-relaxed">Recomendamos que o reserve com antecedência junto ao seu alojamento, para poupar tempo e adicionar conforto à sua viagem.</p>
              </div>
            </div>
          </div>
        `
      },
      {
        id: "comidas",
        title: "Almoços e Jantares",
        icon: "fa-utensils",
        image: "../../assets/service_meals.png",
        tagline: "Gastronomia galega na sua rota",
        characteristics: [
          { icon: "fa-plate-wheat", text: "Cozinha galega local" },
          { icon: "fa-calendar-check", text: "Mesa reservada sem esperas" },
          { icon: "fa-tag", text: "Preço equilibrado" }
        ],
        detail: `
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 class="text-2xl font-bold text-[var(--dark-text-color)] mb-4" style="font-family: var(--font-family-heading);">Recupere forças com sabor</h3>
              <p class="leading-relaxed mb-4">Após cada etapa, é mais comum chegar com vontade de descansar e sem muita energia para procurar onde comer. Oferecemos o nosso serviço de almoços e jantares para que não tenha de se preocupar com nada.</p>
              <p class="leading-relaxed mb-4">Terá a sua mesa pronta na hora certa, seja a meio do dia ou no final da jornada, evitando deslocações desnecessárias.</p>
              <p class="leading-relaxed mb-4">Poderá desfrutar de pratos variados, incluindo especialidades da gastronomia galega, tudo a um preço equilibrado.</p>
            </div>
            <div>
              <div class="p-6 bg-orange-50 border border-orange-200 rounded-2xl shadow-sm relative overflow-hidden">
                <div class="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
                <i class="fa-solid fa-bell-concierge text-orange-400 text-3xl mb-4 relative z-10"></i>
                <p class="text-orange-900 font-medium relative z-10 text-lg leading-relaxed">Recomendamos reservar este serviço com antecedência, pois é uma das opções mais solicitadas pelos peregrinos.</p>
              </div>
            </div>
          </div>
        `
      },
      {
        id: "mochilas",
        title: "Transporte de Mochilas",
        icon: "fa-suitcase-rolling",
        image: "../../assets/service_luggage.png",
        tagline: "Caminhe leve, desfrute mais",
        characteristics: [
          { icon: "fa-person-walking", text: "Sem dores de costas" },
          { icon: "fa-route", text: "4 rotas disponíveis" },
          { icon: "fa-map-location-dot", text: "Sarria, Tui, Ferrol, Lugo" }
        ],
        detail: `
          <div class="mb-8 text-center max-w-2xl mx-auto">
            <h3 class="text-2xl font-bold text-[var(--dark-text-color)] mb-4" style="font-family: var(--font-family-heading);">A sua bagagem, em boas mãos</h3>
            <p class="leading-relaxed text-lg">Quer evitar dores de costas enquanto faz o Caminho? Oferecemos o nosso serviço de transporte de mochilas para que se sinta confortável em cada etapa.</p>
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div class="absolute top-0 left-0 w-1 h-full bg-[var(--accent2-color)]"></div>
              <h4 class="font-bold text-gray-800 mb-2"><i class="fa-solid fa-map-location-dot text-[var(--accent2-color)] mr-2"></i>Caminho Português</h4>
              <p class="text-xs text-gray-600">Levamos a sua mochila de Tui para o alojamento seguinte.</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div class="absolute top-0 left-0 w-1 h-full bg-[var(--accent2-color)]"></div>
              <h4 class="font-bold text-gray-800 mb-2"><i class="fa-solid fa-map-location-dot text-[var(--accent2-color)] mr-2"></i>Caminho Francês</h4>
              <p class="text-xs text-gray-600">Desde o início em Sarria até ao albergue, pensão ou hotel.</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div class="absolute top-0 left-0 w-1 h-full bg-[var(--accent2-color)]"></div>
              <h4 class="font-bold text-gray-800 mb-2"><i class="fa-solid fa-map-location-dot text-[var(--accent2-color)] mr-2"></i>Caminho Inglês</h4>
              <p class="text-xs text-gray-600">Levamos a sua mochila de Ferrol para o alojamento seguinte.</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div class="absolute top-0 left-0 w-1 h-full bg-[var(--accent2-color)]"></div>
              <h4 class="font-bold text-gray-800 mb-2"><i class="fa-solid fa-map-location-dot text-[var(--accent2-color)] mr-2"></i>Caminho Primitivo</h4>
              <p class="text-xs text-gray-600">Transportamos a sua mochila de Lugo para o alojamento seguinte.</p>
            </div>
          </div>
          <div class="text-center">
            <button class="px-8 py-3 bg-[var(--accent2-color)] text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">Contrate AGORA o nosso serviço!</button>
          </div>
        `
      },
      {
        id: "aeropuerto",
        title: "Transfer para o Aeroporto",
        icon: "fa-plane-departure",
        image: "../../assets/service_airport.png",
        tagline: "Termine o seu Caminho sem stress",
        characteristics: [
          { icon: "fa-house-user", text: "Recolha no seu alojamento" },
          { icon: "fa-users", text: "Individual ou em grupo" },
          { icon: "fa-clock-rotate-left", text: "Pontualidade garantida" }
        ],
        detail: `
          <div class="grid md:grid-cols-5 gap-8 items-center">
            <div class="md:col-span-3">
              <h3 class="text-2xl font-bold text-[var(--dark-text-color)] mb-4" style="font-family: var(--font-family-heading);">Despeça-se com tranquilidade</h3>
              <p class="leading-relaxed mb-4">Se planeia regressar de avião, nós facilitamos o último passo da viagem. Vamos buscá-lo diretamente ao seu alojamento final e transferimo-lo pontualmente, sem esperas desnecessárias.</p>
              <p class="leading-relaxed mb-4">O nosso serviço está disponível tanto para viajantes individuais como para grupos, adaptando-se às suas necessidades.</p>
            </div>
            <div class="md:col-span-2">
              <div class="p-6 bg-blue-50 border border-blue-200 rounded-2xl shadow-sm relative overflow-hidden">
                <div class="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
                <i class="fa-solid fa-ticket text-blue-400 text-3xl mb-4 relative z-10"></i>
                <p class="text-blue-900 font-medium relative z-10 text-lg leading-relaxed">Reserve com antecedência e garanta uma transferência confortável. Termine a sua experiência no Caminho da melhor forma!</p>
              </div>
            </div>
          </div>
        `
      },
      {
        id: "inicio",
        title: "Transporte para o Ponto de Partida",
        icon: "fa-van-shuttle",
        image: "../../assets/service_transfer.png",
        tagline: "Comece a aventura sem complicações",
        characteristics: [
          { icon: "fa-plane-arrival", text: "Desde o aeroporto" },
          { icon: "fa-map-pin", text: "Sarria, Tui, Ferrol e mais" },
          { icon: "fa-people-group", text: "Grupos pequenos" }
        ],
        detail: `
          <div class="grid md:grid-cols-5 gap-8 items-center">
            <div class="md:col-span-2 order-2 md:order-1">
              <div class="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-sm relative overflow-hidden h-full flex flex-col justify-center">
                <div class="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
                <i class="fa-solid fa-location-dot text-emerald-400 text-3xl mb-4 relative z-10"></i>
                <p class="text-emerald-900 font-medium relative z-10 text-lg leading-relaxed">Apenas adicione o transporte como extra na sua reserva. Comece o seu Caminho com o pé direito!</p>
              </div>
            </div>
            <div class="md:col-span-3 order-1 md:order-2">
              <h3 class="text-2xl font-bold text-[var(--dark-text-color)] mb-4" style="font-family: var(--font-family-heading);">Comece com o pé direito</h3>
              <p class="leading-relaxed mb-4">Se não sabe como chegar ao ponto de partida da sua rota, não se preocupe — tratamos de tudo. Levamo-lo diretamente ao seu ponto de partida sem complicações.</p>
              <p class="leading-relaxed mb-4">Quer inicie em Sarria, Tui ou Ferrol, adaptamo-nos ao seu itinerário. Também oferecemos transferências do aeroporto e de outros pontos-chave.</p>
            </div>
          </div>
        `
      }
    ]
  }
};

const langs = ['es', 'en', 'por'];

langs.forEach(lang => {
  const data = contentData[lang];
  const targetPath = path.join(rootDir, lang, 'pages', 'servicios.html');

  let cardsHtml = '';
  data.services.forEach((sec, idx) => {
    const characteristicsHtml = sec.characteristics.map(c => `
              <div class="flex items-center gap-2 text-sm text-white/90 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <i class="fa-solid ${c.icon} text-xs text-[var(--accent-color)]"></i>
                <span class="font-medium">${c.text}</span>
              </div>`).join('');

    cardsHtml += `
        <!-- SERVICE CARD: ${sec.title} -->
        <div class="service-card group transition-all duration-700 ease-in-out" id="${sec.id}">
          <!-- CARD HEADER (always visible) -->
          <button
            class="card-toggle w-full text-left focus:outline-none relative block overflow-hidden rounded-3xl shadow-xl border border-white/20"
            aria-expanded="false"
            aria-controls="detail-${sec.id}"
          >
            <div class="card-image-wrapper relative h-[400px] md:h-[450px] overflow-hidden bg-gray-900">
              <!-- Background Image -->
              <img
                src="${sec.image}"
                alt="${sec.title}"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                loading="lazy"
              >
              <!-- Dark overlay gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"></div>

              <!-- Top icon badge -->
              <div class="absolute top-6 left-6 z-10 transition-transform duration-500 group-hover:-translate-y-1">
                <div class="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl">
                  <i class="fa-solid ${sec.icon} text-white text-2xl"></i>
                </div>
              </div>

              <!-- Expand indicator -->
              <div class="absolute top-6 right-6 z-10">
                <div class="expand-icon w-10 h-10 bg-[var(--primary-color)] text-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-500">
                  <i class="fa-solid fa-plus text-lg"></i>
                </div>
              </div>

              <!-- Bottom content -->
              <div class="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10">
                <div class="content-wrapper transition-all duration-500 transform translate-y-0">
                  <p class="text-[var(--accent-color)] text-sm font-bold uppercase tracking-[0.2em] mb-2 drop-shadow-md">${sec.tagline}</p>
                  <h2 class="text-white text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg" style="font-family: var(--font-family-heading);">${sec.title}</h2>
                  <!-- Characteristics pills -->
                  <div class="flex flex-wrap gap-3">
                    ${characteristicsHtml}
                  </div>
                </div>
              </div>
            </div>
          </button>

          <!-- EXPANDABLE DETAIL PANEL -->
          <div
            id="detail-${sec.id}"
            class="detail-panel overflow-hidden bg-white rounded-b-3xl shadow-2xl mx-2 relative -mt-4 z-0"
            style="max-height: 0; transition: max-height 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease; opacity: 0;"
          >
            <div class="px-6 md:px-12 pt-12 pb-10 text-gray-700 text-base md:text-lg">
              ${sec.detail}
              
              <div class="mt-8 flex justify-center border-t border-gray-100 pt-6">
                <button class="card-close inline-flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-600 font-bold rounded-full hover:bg-gray-200 hover:text-gray-900 transition-colors shadow-sm">
                  <i class="fa-solid fa-xmark"></i>
                  ${data.collapseLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
    `;
  });

  const html = `<!DOCTYPE html>
<html class="h-full" lang="${lang}">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com/">
  <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="anonymous">
  <link id="google-fonts-link" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script src="../../scripts/components/sts-header.js"></script>
  <script src="../../scripts/components/sts-footer.js" defer></script>
  <link rel="stylesheet" href="../../fontawesome/css/all.min.css">
  <link rel="stylesheet" href="../../fontawesome/css/brands.min.css">
  <script src="https://cdn.tailwindcss.com/"></script>
  <link rel="stylesheet" href="../../css/styles.css">
  <title>${data.pageTitle}</title>
  <style>
    /* Estilos dinámicos para el acordeón mejorado */
    .services-grid {
      transition: all 0.5s ease;
    }
    
    .service-card {
      will-change: transform, opacity;
      transform-origin: top center;
    }
    
    /* Cuando una card está expandida, las demás se apartan/difuminan ligeramente */
    .services-grid.has-expanded .service-card:not(.expanded) {
      opacity: 0.4;
      transform: scale(0.95) translateY(10px);
      filter: blur(2px) grayscale(50%);
      pointer-events: none; /* Evita clics accidentales en las otras mientras una está abierta */
    }
    
    .service-card.expanded {
      /* La card expandida puede ocupar todo el ancho en pantallas grandes si se desea, o simplemente destacar */
      z-index: 50;
      transform: scale(1.02);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    
    /* Efectos del botón toggle al expandir */
    .card-toggle[aria-expanded="true"] {
      border-radius: 1.5rem 1.5rem 0 0;
      border-bottom-color: transparent;
    }
    
    .card-toggle[aria-expanded="true"] .card-image-wrapper {
      height: 250px; /* Se hace más pequeño el header al abrir para dar espacio al texto */
    }
    
    .card-toggle[aria-expanded="true"] .expand-icon {
      transform: rotate(45deg);
      background-color: var(--accent-color);
    }
    
    .card-toggle[aria-expanded="true"] + .detail-panel {
      opacity: 1 !important;
    }
    
    /* Transiciones fluidas */
    .card-image-wrapper {
      transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
  </style>
</head>
<body class="h-full bg-[var(--light-background-color)] overflow-x-hidden">
  <div class="frame-root">
    <div class="frame-content">
      <div class="[font-family:var(--font-family-body)]">

        <!-- HEADER -->
        <div>
          <sts-header logo="../../assets/ststrasp.png"></sts-header>
        </div>

        <!-- HERO SECTION -->
        <section class="relative py-24 md:py-32 overflow-hidden bg-[#0f172a]">
          <!-- Background image for hero -->
          <div class="absolute inset-0 opacity-40">
            <img src="../../assets/service_luggage.png" alt="Camino Services" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#0f172a]/80 to-[#0f172a]"></div>
          </div>
          
          <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <nav class="flex items-center justify-center gap-3 text-white/60 text-sm mb-10 font-medium tracking-wide uppercase">
              <a href="/${lang}/index.html" class="hover:text-[var(--accent-color)] transition-colors">${data.breadcrumbHome}</a>
              <div class="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]"></div>
              <span class="text-white">${data.breadcrumbCurrent}</span>
            </nav>
            <div class="max-w-4xl mx-auto">
              <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight" style="font-family: var(--font-family-heading);">
                ${data.heroTitle}
              </h1>
              <p class="text-white/80 text-xl md:text-2xl leading-relaxed font-light max-w-3xl mx-auto">
                ${data.heroDesc}
              </p>
            </div>
          </div>
        </section>

        <!-- SERVICES GRID -->
        <section class="py-20 md:py-32 bg-[var(--light-background-color)] relative">
          <!-- Decoración de fondo -->
          <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div class="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[var(--primary-color)]/5 to-transparent blur-[100px]"></div>
            <div class="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-[var(--accent-color)]/5 to-transparent blur-[100px]"></div>
          </div>
          
          <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            <!-- Intro hint -->
            <div class="flex justify-center mb-16">
              <div class="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-md border border-gray-100">
                <div class="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[var(--primary-color)] animate-bounce">
                  <i class="fa-solid fa-arrow-pointer text-sm"></i>
                </div>
                <span class="text-gray-600 font-medium">${lang === 'es' ? 'Descubre más haciendo clic en cada servicio' : lang === 'en' ? 'Discover more by clicking on each service' : 'Descubra mais clicando em cada serviço'}</span>
              </div>
            </div>

            <!-- Cards Grid: se usa flex column con gap para diseño impactante, o grid de 2 columnas pero que al expandirse ocupen 2 -->
            <div class="services-grid flex flex-col gap-10 md:gap-14 max-w-5xl mx-auto">
              ${cardsHtml}
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>

  <!-- ACCORDION SCRIPT -->
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      const toggles = document.querySelectorAll('.card-toggle');
      const grid = document.querySelector('.services-grid');

      toggles.forEach(function (toggle) {
        toggle.addEventListener('click', function () {
          const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
          const panelId = toggle.getAttribute('aria-controls');
          const panel = document.getElementById(panelId);
          const currentCard = toggle.closest('.service-card');

          // Collapse all others
          toggles.forEach(function (t) {
            if (t !== toggle) {
              t.setAttribute('aria-expanded', 'false');
              const otherId = t.getAttribute('aria-controls');
              const otherPanel = document.getElementById(otherId);
              otherPanel.style.maxHeight = '0';
              otherPanel.style.opacity = '0';
              t.closest('.service-card').classList.remove('expanded');
            }
          });

          // Toggle current
          if (isExpanded) {
            toggle.setAttribute('aria-expanded', 'false');
            panel.style.maxHeight = '0';
            panel.style.opacity = '0';
            currentCard.classList.remove('expanded');
            grid.classList.remove('has-expanded');
          } else {
            toggle.setAttribute('aria-expanded', 'true');
            currentCard.classList.add('expanded');
            grid.classList.add('has-expanded');
            
            // Calculate exact height needed
            panel.style.maxHeight = panel.scrollHeight + 100 + 'px';
            panel.style.opacity = '1';
            
            // Smooth scroll to card
            setTimeout(function () {
              const offset = 100; // margin top
              const bodyRect = document.body.getBoundingClientRect().top;
              const elementRect = currentCard.getBoundingClientRect().top;
              const elementPosition = elementRect - bodyRect;
              const offsetPosition = elementPosition - offset;

              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }, 300); // wait for animation to mostly finish
          }
        });
      });

      // Close buttons inside panels
      document.querySelectorAll('.card-close').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          const panel = btn.closest('.detail-panel');
          const panelId = panel.id;
          const toggle = document.querySelector('[aria-controls="' + panelId + '"]');
          const currentCard = toggle.closest('.service-card');
          
          toggle.setAttribute('aria-expanded', 'false');
          panel.style.maxHeight = '0';
          panel.style.opacity = '0';
          currentCard.classList.remove('expanded');
          
          // If no cards are expanded, remove has-expanded from grid
          const anyExpanded = document.querySelector('.service-card.expanded');
          if (!anyExpanded) {
            grid.classList.remove('has-expanded');
          }
          
          // Scroll back up slightly if needed
          setTimeout(function () {
             const offset = 100;
             const bodyRect = document.body.getBoundingClientRect().top;
             const elementRect = currentCard.getBoundingClientRect().top;
             const elementPosition = elementRect - bodyRect;
             const offsetPosition = elementPosition - offset;
             window.scrollTo({
               top: offsetPosition,
               behavior: 'smooth'
             });
          }, 100);
        });
      });
    });
  </script>
</body>
</html>`;

  fs.writeFileSync(targetPath, html, 'utf8');
  console.log('Generated: ' + targetPath);
});

console.log('\\nAll services pages generated successfully!');
