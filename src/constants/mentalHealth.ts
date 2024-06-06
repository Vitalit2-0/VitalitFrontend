export const stages = {
    choosingActivity: 0,
    activityStarted: 1,
    activityFinished: 2,
}

export const activities = [
    {
        id: 0,
        title: "Yoga",
        description: "Disfruta de una sesión de yoga en la comodidad de tu hogar. Perfecta para estirar y relajar tu cuerpo.",
        video: "assets/videos/yoga.mp4",
        image: "",
        active: false,
        time: 15,
    },
    {
        id: 1,
        title: "Meditación",
        description: "Disfruta de una meditación guiada para relajar tu mente y cuerpo.",
        active: false,
        image: "assets/images/meditacion.webp",
        video: undefined,
        time: 10,
    },
    {
        id: 2,
        title: "Imágenes Guíadas",
        description: "Disfruta de una sesión de imágenes guiadas para relajar tu mente y cuerpo. Te mostraremos una ímagen junto con una descripción para que puedas visualizarla. Concentrate en la respiración y trata de relajar tu mente enfocándote en el presente. ¿Estás list@? ¡Busca un lugar cómodo y comencemos!.",
        active: false,
        image: "assets/images/place.jpg",
        video: undefined,
        time: 10,
    },
]

export const yogaPoses = [
    {
        id: 0,
        title: "Postura del niño",
        description: "Esta postura calmante es una buena posición de pausa por defecto. Puedes usar la postura del niño para descansar y volver a enfocarte antes de continuar con la siguiente postura. Estira suavemente la parte baja de la espalda, caderas, muslos, rodillas y tobillos, y relaja la columna vertebral, hombros y cuello.",
        skipIf: "Si tienes lesiones en las rodillas o problemas en los tobillos. Evítala también si tienes presión arterial alta o estás embarazada.",
        modify: "Puedes descansar tu cabeza en un cojín o bloque. Puedes colocar una toalla enrollada bajo tus tobillos si están incómodos.",
        beMindful: "Concéntrate en relajar los músculos de la columna vertebral y la parte baja de la espalda mientras respiras.",
        steps: [
            "Arrodíllate sobre tus manos y rodillas, con las manos delante de los hombros y las rodillas separadas al ancho de las caderas, o más separadas si eso es más cómodo y los dedos gordos de los pies tocándose.",
            "Al exhalar, baja las nalgas hacia los talones mientras tu torso descansa sobre tus muslos, o entre tus muslos, y tu cabeza descansa en el suelo o en un bloque o cojín.",
            "Descansa tus brazos a lo largo de los muslos, con las palmas hacia arriba.",
            "Relaja los músculos alrededor de la columna y las caderas y toma varias respiraciones lentas."
        ],
        video: "assets/videos/child-pose.mp4"
    },
    {
        id: 1,
        title: "Postura del perro mirando hacia abajo",
        description: "La postura del perro mirando hacia abajo fortalece los brazos, hombros y espalda mientras estira los isquiotibiales, las pantorrillas y los arcos de los pies. También puede ayudar a aliviar el dolor de espalda.",
        skipIf: "No se recomienda esta postura si tienes síndrome del túnel carpiano u otros problemas de muñeca, tienes presión arterial alta o estás en las últimas etapas del embarazo.",
        modify: "Puedes hacer la postura con los codos en el suelo, lo que quita peso de las muñecas. También puedes usar bloques bajo las manos, lo que puede ser más cómodo.",
        beMindful: "Concéntrate en distribuir el peso uniformemente a través de tus palmas y en levantar las caderas hacia arriba y atrás, alejándolas de tus hombros.",
        steps: [
            "Comienza en tus manos y rodillas, con las manos a la distancia de los hombros y las rodillas debajo de las caderas, con los dedos de los pies metidos.",
            "Inhala, presiona uniformemente en tus palmas y levanta las rodillas del suelo.",
            "Levanta las caderas hacia arriba y hacia atrás, trabajando para alargar tu columna vertebral.",
            "Exhala mientras comienzas a estirar las piernas tanto como sea posible, con los talones alcanzando el suelo. Si tus piernas están rectas, levanta fuertemente los músculos del muslo mientras presionas en el suelo con tus pies.",
            "Levanta los hombros lejos de las orejas y aplana los omóplatos en tu espalda. Gira tus brazos superiores hacia el suelo. Firma tus caderas exteriores hacia el centro.",
            "Sigue inhalando y exhalando uniformemente mientras mantienes la postura."
        ],
        video: "assets/videos/downward-facing-dog.mp4"
    },
    {
        id: 2,
        title: "Postura de la plancha",
        description: "Un ejercicio comúnmente visto, la postura de la plancha ayuda a fortalecer el núcleo, los hombros, los brazos y las piernas.",
        skipIf: "Evita la postura de la plancha si sufres de síndrome del túnel carpiano, ya que puede ser duro para tus muñecas. También puedes evitarla o modificarla si tienes dolor en la parte baja de la espalda.",
        modify: "Puedes modificarla colocando las rodillas en el suelo.",
        beMindful: "Mientras haces la plancha, imagina la parte posterior de tu cuello y columna alargándose.",
        steps: [
            "Comienza en la postura del perro mirando hacia abajo.",
            "Inhala y avanza hasta que tu cuerpo esté en una línea recta, con los hombros apilados sobre tus muñecas y los talones por encima de las bolas de los pies.",
            "Exhala mientras presionas hacia abajo a través de tus antebrazos y manos, mirando el suelo frente a ti. Imagina la parte posterior de tu cuello y columna alargándose.",
            "Sigue respirando de manera constante mientras mantienes la postura tanto como puedas, activando los músculos del núcleo al atraer tu ombligo hacia el cuerpo y hacia tu columna. Mantén los muslos levantados y las caderas altas, pero no dejes que tu trasero se levante demasiado."
        ],
        video: "assets/videos/plank-pose.mp4"
    },
    {
        id: 3,
        title: "Postura del bastón de cuatro extremidades",
        description: "Esta variación de flexiones sigue a la postura de la plancha en una secuencia común de yoga conocida como la salutación al sol. Es una buena postura para aprender si eventualmente quieres trabajar en posturas más avanzadas, como equilibrios de brazos o inversiones.",
        skipIf: "Evítala si tienes síndrome del túnel carpiano, dolor en la parte baja de la espalda, una lesión en el hombro o si estás embarazada.",
        modify: "Es una buena idea para los principiantes modificar la postura manteniendo las rodillas en el suelo.",
        beMindful: "Presiona tus palmas uniformemente en el suelo y levanta tus hombros del suelo mientras mantienes esta postura.",
        steps: [
            "Desde la postura de la plancha, inhala y avanza, alcanzando tu esternón hacia adelante hasta que tus hombros estén ligeramente por delante de tus muñecas y estés sobre las bolas de tus pies. Aplana tus omóplatos en tu espalda mientras levantas tus muslos y el torso delantero del suelo. Lleva los músculos abdominales hacia la columna.",
            "Exhala y dobla los codos hacia atrás — no hacia los lados — mientras bajas tu cuerpo en línea recta hasta que esté a unos pocos centímetros del suelo. Asegúrate de que tus hombros no bajen por debajo del nivel de tus codos. Si eres principiante, baja tus rodillas al suelo antes de bajar.",
            "Mantén la postura durante algunas respiraciones."
        ],
        video: "assets/videos/four-limbed-staff-pose.mp4",
    },
    {
        id: 4,
        title: "Postura de la cobra",
        description: "Esta postura de flexión hacia atrás puede ayudar a fortalecer los músculos de la espalda, aumentar la flexibilidad de la columna y estirar el pecho, los hombros y el abdomen.",
        skipIf: "Evítala si tienes artritis en la columna o el cuello, una lesión en la parte baja de la espalda o síndrome del túnel carpiano.",
        modify: "Solo levanta unos pocos centímetros y no intentes estirar los brazos.",
        beMindful: "Intenta mantener tu ombligo levantado del suelo mientras mantienes esta postura.",
        steps: [
            "Acuéstate boca abajo con la frente en tu esterilla y las uñas de los pies presionando en la esterilla.",
            "Coloca tus manos debajo de tus hombros, manteniendo los codos cerca de tu torso. Levanta tu ombligo del suelo.",
            "Inhala y presiona tus pies y piernas en la esterilla, soltando tu coxis hacia el pubis mientras comienzas a estirar los brazos para levantar tu cabeza y pecho hacia adelante y hacia arriba del suelo. Exhala.",
            "Inhala mientras ensanchas el pecho y mantén aquí por una o dos respiraciones más.",
            "En una exhalación, baja tu cabeza, cuello y pecho al suelo."
        ],
        video: "assets/videos/cobra-pose.mp4",
    },
    {
        id: 5,
        title: "Postura del árbol",
        description: "Además de ayudar a mejorar tu equilibrio, también puede fortalecer tu núcleo, tobillos, pantorrillas, muslos y columna.",
        skipIf: "Es posible que quieras evitar esta postura si tienes presión arterial baja o cualquier condición médica que afecte tu equilibrio.",
        modify: "Coloca una de tus manos en una pared para obtener apoyo.",
        beMindful: "Concéntrate en tu respiración mientras mantienes esta postura.",
        steps: [
            "Párate en tu esterilla, con los pies juntos o ligeramente separados, si eso es más cómodo. Toma un par de respiraciones.",
            "Desplaza lentamente tu peso hacia tu pierna derecha.",
            "Levanta la pierna izquierda y agarra tu tobillo para guiar la planta del pie izquierdo al muslo interno de la pierna derecha. Intenta mantener tus caderas niveladas.",
            "Presiona tu pie contra tu muslo y tu muslo contra tu pie. Levántate a través de tu pierna de apoyo, núcleo y pecho.",
            "Respira regularmente mientras mantienes la postura durante algunas respiraciones. Puedes juntar tus palmas en tu pecho, o levantar los brazos por encima de tu cabeza si te sientes lo suficientemente estable.",
            "Baja tu pierna izquierda y prueba con el otro lado."
        ],
        video: "assets/videos/tree-pose.mp4",
    },
    {
        id: 6,
        title: "Postura del triángulo",
        description: "El triángulo, que forma parte de muchas secuencias de yoga, ayuda a fortalecer las piernas y estira las caderas, columna, pecho, hombros, ingles, isquiotibiales y pantorrillas. También puede ayudar a aumentar la movilidad en las caderas y el cuello.",
        skipIf: "Evita esta postura si tienes dolor de cabeza o presión arterial baja.",
        modify: "Si tienes presión arterial alta, gira la cabeza para mirar hacia abajo en la postura final. Si tienes problemas de cuello, no gires la cabeza para mirar hacia arriba; mira hacia adelante y mantén ambos lados del cuello largos.",
        beMindful: "Sigue levantando el brazo elevado hacia el techo. Esto ayuda a mantener la postura ligera.",
        steps: [
            "Adopta una postura amplia, con los pies separados de tres y medio a cuatro pies, dependiendo de tu tamaño; las personas más altas pueden adoptar una postura más amplia.",
            "Gira tu pie izquierdo ligeramente hacia la derecha y tu pie derecho hacia afuera a la derecha 90 grados. Tu talón delantero debe estar en línea con el arco de tu pie trasero. Firma tus muslos y asegúrate de que el centro de la rodilla derecha esté en línea con el centro del tobillo derecho.",
            "Inhala y levanta los brazos a los lados, a la altura de los hombros.",
            "Exhala y alcanza tu brazo derecho hacia la derecha, alargando tu torso directamente sobre la pierna derecha mientras mueves tus caderas hacia la izquierda.",
            "Descansa tu mano derecha sobre tu espinilla, tobillo o en el suelo fuera de tu pie derecho. Mantén los lados del torso largos.",
            "Estira tu brazo izquierdo hacia el techo, en línea con la parte superior de tus hombros. Gira tu torso hacia el techo. Mantén tu cabeza en una posición neutral o gírala hacia la izquierda, con los ojos mirando al pulgar izquierdo.",
            "Mantén la postura y respira durante un minuto; luego sube y prueba el otro lado."
        ],
        video: "assets/videos/triangle-pose.mp4",
    },
    {
        id: 7,
        title: "Postura de torsión espinal sentado a la mitad",
        description: "Esta postura de torsión puede aumentar la flexibilidad en tu espalda, mientras estira los hombros, caderas y pecho. También puede ayudar a aliviar la tensión en la parte media de la espalda.",
        skipIf: "Evita esta postura si tienes una lesión en la espalda.",
        modify: "Si doblar la rodilla derecha es incómodo, mantenla estirada frente a ti.",
        beMindful: "Levanta tu torso con cada inhalación y gira al exhalar.",
        steps: [
            "Siéntate en el suelo o sobre una manta doblada, con las manos en el suelo o manta detrás de ti para apoyo. Estira las piernas frente a ti.",
            "Dobla tu rodilla derecha y coloca tu pie derecho en el exterior de tu rodilla izquierda.",
            "Inhala, alarga tu torso, exhala y gira hacia tu derecha, abrazando tu rodilla derecha con tu brazo izquierdo o colocando tu brazo izquierdo en el exterior de tu pierna derecha cerca de la rodilla.",
            "Toma varias respiraciones aquí, elevándote a través del esternón al inhalar y girando un poco más al exhalar, manteniendo la parte superior de la espalda amplia.",
            "Libera la torsión y prueba el otro lado."
        ],
        video: "assets/videos/seated-half-spinal-twist-pose.mp4",
    },
    {
        id: 8,
        title: "Postura del puente",
        description: "Esta postura de flexión hacia atrás estira los músculos del pecho, espalda y cuello. También fortalece los músculos de la espalda y los isquiotibiales.",
        skipIf: "Evita esta postura si tienes una lesión en el cuello.",
        modify: "Coloca un bloque entre tus muslos para ayudar a mantener las piernas y los pies en la alineación adecuada. O puedes colocar un bloque debajo de tu pelvis si te molesta la parte baja de la espalda.",
        beMindful: "Mientras mantienes esta postura, intenta mantener tu pecho elevado y tu esternón hacia tu barbilla.",
        steps: [
            "Acuéstate sobre tu espalda en tu esterilla. Dobla las rodillas y coloca los pies en el suelo, con los talones cerca de tu torso. Coloca los brazos a lo largo de las caderas, con las palmas hacia abajo. Inhala.",
            "Exhala y, presionando los pies internos y las palmas en el suelo, levanta las caderas. Mantén los muslos y los pies internos paralelos.",
            "Junta las manos debajo de ti si puedes y extiende los brazos para ayudarte a mantenerte en la parte superior de los hombros.",
            "Levanta los glúteos hasta que los muslos estén aproximadamente paralelos al suelo. Usa las piernas para apoyar el levantamiento de la pelvis. Alarga el coxis hacia la parte posterior de las rodillas. Levanta el pubis hacia el ombligo.",
            "Levanta ligeramente la barbilla lejos del esternón y, afirmando los omóplatos contra tu espalda, presiona la parte superior del esternón hacia la barbilla.",
            "Mantén la postura durante unas cuantas respiraciones uniformes. Al exhalar, libera y rueda lentamente la columna hacia el suelo."
        ],
        video: "assets/videos/bridge-pose.mp4",
    },
    {
        id: 9,
        title: "Postura del cadáver",
        description: "Al igual que la vida, las clases de yoga suelen terminar con esta postura. Permite un momento de relajación, pero a algunas personas les resulta difícil permanecer quietas en esta postura. Sin embargo, cuanto más practiques esta postura, más fácil será hundirte en un estado meditativo y relajante.",
        skipIf: "Si no quieres tener un momento de paz.",
        modify: "Coloca una manta debajo de tu cabeza si eso te resulta más cómodo. También puedes enrollar una manta y colocarla debajo de tus rodillas si tu espalda baja es sensible o te molesta.",
        beMindful: "Siente el peso de tu cuerpo hundiéndose en tu esterilla, una parte a la vez.",
        steps: [
            "Acuéstate de espaldas.",
            "Estira ambas piernas a lo largo del suelo; los pies pueden girar ligeramente hacia afuera. Si tu espalda baja está incómoda, puedes colocar una manta enrollada debajo de tus rodillas.",
            "Tus brazos pueden descansar a unos pocos centímetros de tu cuerpo, con el dorso de las manos en el suelo. Asegúrate de que los omóplatos estén descansando uniformemente en el suelo.",
            "Libera completamente tu peso en la esterilla y deja que tus músculos se relajen. Respira normalmente."
        ],
        video: "assets/videos/corpse-pose.mp4",
    },
]

export const meditationVideo = 
{
    id: 0,
    video: "assets/videos/meditation2.mp4"
}