const TYPES = {
      culto: { label: "Culto", color: "var(--culto)" },
      oracion: { label: "Oración", color: "var(--oracion)" },
      vigilia: { label: "Vigilia", color: "var(--vigilia)" },
      ayuno: { label: "Ayuno", color: "var(--ayuno)" },
      especial: { label: "Especial", color: "var(--especial)" }
    };

    const AUTO_EVENT_DESCRIPTIONS = {
      culto: "Un tiempo para adorar juntos, escuchar la Palabra y fortalecer nuestra fe. «Yo soy el pan de vida; el que a mí viene, nunca tendrá hambre» — Juan 6:35.",
      oracion: "Unámonos en oración para buscar la presencia de Dios, interceder y recibir nuevas fuerzas. «Clama a mí, y yo te responderé» — Jeremías 33:3.",
      ayuno: "Apartemos este tiempo para humillarnos delante de Dios, buscar su dirección y renovar nuestro corazón. «Tu Padre que ve en lo secreto te recompensará» — Mateo 6:18.",
      vigilia: "Permanezcamos despiertos en la presencia de Dios, adorando, intercediendo y esperando en sus promesas. «Velad y orad» — Mateo 26:41.",
      especial: "Una ocasión especial para celebrar, servir y crecer como familia de la fe. «¡Mirad cuán bueno y cuán delicioso es habitar los hermanos juntos en armonía!» — Salmos 133:1."
    };

    function eventDescription(event) {
      const description = String(event?.description || "").trim();
      const isGeneric = description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("actividad programada dentro del cronograma anual");
      if (description && !isGeneric) return description;
      const type = String(event?.type || "especial").toLowerCase();
      return AUTO_EVENT_DESCRIPTIONS[type] || AUTO_EVENT_DESCRIPTIONS.especial;
    }

    const PROGRAMMED_EVENTS = [
      { date: "2026-02-09", type: "oracion", title: "Oracion lunes - Junta local, Damas Dorcas y Jovenes", time: "7:00 p. m." },
      { date: "2026-03-09", type: "oracion", title: "Oracion lunes - Escuela dominical, Caballeros y Alabanza", time: "7:00 p. m." },
      { date: "2026-04-06", type: "oracion", title: "Oracion lunes - Edad dorada, Evangelismo y Red de familia", time: "7:00 p. m." },
      { date: "2026-05-11", type: "oracion", title: "Oracion lunes - Obra social, Misiones y Recepcion", time: "7:00 p. m." },
      { date: "2026-06-01", type: "oracion", title: "Oracion lunes - Junta local, Damas Dorcas y Jovenes", time: "7:00 p. m." },
      { date: "2026-07-13", type: "oracion", title: "Oracion lunes - Escuela dominical, Caballeros y Alabanza", time: "7:00 p. m." },
      { date: "2026-08-10", type: "oracion", title: "Oracion lunes - Edad dorada, Evangelismo y Red de familia", time: "7:00 p. m." },
      { date: "2026-09-14", type: "oracion", title: "Oracion lunes - Obra social, Misiones y Recepcion", time: "7:00 p. m." },
      { date: "2026-10-05", type: "oracion", title: "Oracion lunes - Junta local, Damas Dorcas y Jovenes", time: "7:00 p. m." },
      { date: "2026-11-09", type: "oracion", title: "Oracion lunes - Escuela dominical, Caballeros y Alabanza", time: "7:00 p. m." },
      { date: "2026-12-07", type: "oracion", title: "Oracion lunes - Edad dorada, Evangelismo y Red de familia", time: "7:00 p. m." },
      { date: "2026-03-01", type: "ayuno", title: "Ayuno - Todos los comites", time: "8:00 a. m." },
      { date: "2026-05-03", type: "ayuno", title: "Ayuno - Obra social, Misiones y Recepcion", time: "8:00 a. m." },
      { date: "2026-07-05", type: "ayuno", title: "Ayuno - Edad dorada, Evangelismo y Red de familias", time: "8:00 a. m." },
      { date: "2026-09-06", type: "ayuno", title: "Ayuno - Escuela dominical, Caballeros y Alabanza", time: "8:00 a. m." },
      { date: "2026-11-01", type: "ayuno", title: "Ayuno - Junta local, Damas Dorcas y Jovenes", time: "8:00 a. m." },
      { date: "2026-04-17", type: "vigilia", title: "Vigilia - Evangelismo, Red de familias y Edad dorada", time: "9:00 p. m." },
      { date: "2026-06-19", type: "vigilia", title: "Vigilia - Escuela dominical, Caballeros y Alabanza", time: "9:00 p. m." },
      { date: "2026-08-21", type: "vigilia", title: "Vigilia - Obra social, Misiones y Recepcion", time: "9:00 p. m." },
      { date: "2026-10-23", type: "vigilia", title: "Vigilia - Junta local, Damas Dorcas y Jovenes", time: "9:00 p. m." },
      { date: "2026-12-18", type: "vigilia", title: "Vigilia - Evangelismo, Red de familias y Edad dorada", time: "9:00 p. m." },
      { date: "2026-01-17", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-02-07", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-02-21", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-03-07", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-03-21", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-04-04", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-04-18", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-05-02", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-05-16", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-06-06", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-06-13", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-07-04", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-07-18", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-08-01", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-08-15", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-09-05", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-09-19", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-10-03", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-10-17", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-11-07", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-11-21", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-12-05", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-12-19", type: "culto", title: "Culto comite de Jovenes", time: "7:00 p. m." },
      { date: "2026-01-06", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-01-20", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-02-03", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-02-17", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-03-03", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-03-17", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-04-07", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-04-21", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-05-05", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-05-19", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-06-02", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-06-16", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-07-07", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-07-21", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-08-04", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-08-18", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-09-01", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-09-15", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-10-06", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-10-20", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-11-03", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-11-17", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-12-01", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-12-15", type: "culto", title: "Culto de Damas Dorcas", time: "7:00 p. m." },
      { date: "2026-01-08", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-01-22", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-02-12", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-02-26", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-03-12", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-03-26", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-04-09", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-04-23", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-05-14", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-05-28", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-06-11", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-06-25", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-07-09", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-07-23", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-08-13", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-08-27", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-09-10", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-09-24", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-10-08", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-10-22", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-11-12", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-11-26", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-12-10", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-12-24", type: "culto", title: "Culto comite de Evangelismo", time: "7:00 p. m." },
      { date: "2026-01-10", type: "culto", title: "Culto comite de Escuela Dominical", time: "7:00 p. m." },
      { date: "2026-02-14", type: "culto", title: "Culto comite de Escuela Dominical", time: "7:00 p. m." },
      { date: "2026-03-14", type: "culto", title: "Culto comite de Escuela Dominical", time: "7:00 p. m." },
      { date: "2026-04-11", type: "culto", title: "Culto comite de Escuela Dominical", time: "7:00 p. m." },
      { date: "2026-05-09", type: "culto", title: "Culto comite de Escuela Dominical", time: "7:00 p. m." },
      { date: "2026-06-13", type: "culto", title: "Culto comite de Escuela Dominical", time: "7:00 p. m." },
      { date: "2026-07-11", type: "culto", title: "Culto comite de Escuela Dominical", time: "7:00 p. m." },
      { date: "2026-08-08", type: "culto", title: "Culto comite de Escuela Dominical", time: "7:00 p. m." },
      { date: "2026-09-12", type: "culto", title: "Culto comite de Escuela Dominical", time: "7:00 p. m." },
      { date: "2026-10-10", type: "culto", title: "Culto comite de Escuela Dominical", time: "7:00 p. m." },
      { date: "2026-11-14", type: "culto", title: "Culto comite de Escuela Dominical", time: "7:00 p. m." },
      { date: "2026-12-12", type: "culto", title: "Culto comite de Escuela Dominical", time: "7:00 p. m." },
      { date: "2026-01-31", type: "culto", title: "Culto comite de Alabanza", time: "7:00 p. m." },
      { date: "2026-05-30", type: "culto", title: "Culto comite de Alabanza", time: "7:00 p. m." },
      { date: "2026-08-29", type: "culto", title: "Culto comite de Alabanza", time: "7:00 p. m." },
      { date: "2026-10-31", type: "culto", title: "Culto comite de Alabanza", time: "7:00 p. m." },
      { date: "2026-01-27", type: "culto", title: "Culto comite de Obra Social", time: "7:00 p. m." },
      { date: "2026-02-24", type: "culto", title: "Culto comite de Obra Social", time: "7:00 p. m." },
      { date: "2026-03-24", type: "culto", title: "Culto comite de Obra Social", time: "7:00 p. m." },
      { date: "2026-04-28", type: "culto", title: "Culto comite de Obra Social", time: "7:00 p. m." },
      { date: "2026-05-26", type: "culto", title: "Culto comite de Obra Social", time: "7:00 p. m." },
      { date: "2026-06-23", type: "culto", title: "Culto comite de Obra Social", time: "7:00 p. m." },
      { date: "2026-07-28", type: "culto", title: "Culto comite de Obra Social", time: "7:00 p. m." },
      { date: "2026-08-25", type: "culto", title: "Culto comite de Obra Social", time: "7:00 p. m." },
      { date: "2026-09-22", type: "culto", title: "Culto comite de Obra Social", time: "7:00 p. m." },
      { date: "2026-10-27", type: "culto", title: "Culto comite de Obra Social", time: "7:00 p. m." },
      { date: "2026-11-24", type: "culto", title: "Culto comite de Obra Social", time: "7:00 p. m." },
      { date: "2026-12-22", type: "culto", title: "Culto comite de Obra Social", time: "7:00 p. m." },
      { date: "2026-03-31", type: "culto", title: "Culto comite de Edad Dorada", time: "7:00 p. m." },
      { date: "2026-06-30", type: "culto", title: "Culto comite de Edad Dorada", time: "7:00 p. m." },
      { date: "2026-09-29", type: "culto", title: "Culto comite de Edad Dorada", time: "7:00 p. m." },
      { date: "2026-12-29", type: "culto", title: "Culto comite de Edad Dorada", time: "7:00 p. m." },
      { date: "2026-01-13", type: "culto", title: "Culto comite de Caballeros", time: "7:00 p. m." },
      { date: "2026-02-10", type: "culto", title: "Culto comite de Caballeros", time: "7:00 p. m." },
      { date: "2026-03-10", type: "culto", title: "Culto comite de Caballeros", time: "7:00 p. m." },
      { date: "2026-04-14", type: "culto", title: "Culto comite de Caballeros", time: "7:00 p. m." },
      { date: "2026-05-12", type: "culto", title: "Culto comite de Caballeros", time: "7:00 p. m." },
      { date: "2026-06-09", type: "culto", title: "Culto comite de Caballeros", time: "7:00 p. m." },
      { date: "2026-07-14", type: "culto", title: "Culto comite de Caballeros", time: "7:00 p. m." },
      { date: "2026-08-11", type: "culto", title: "Culto comite de Caballeros", time: "7:00 p. m." },
      { date: "2026-09-08", type: "culto", title: "Culto comite de Caballeros", time: "7:00 p. m." },
      { date: "2026-10-13", type: "culto", title: "Culto comite de Caballeros", time: "7:00 p. m." },
      { date: "2026-11-10", type: "culto", title: "Culto comite de Caballeros", time: "7:00 p. m." },
      { date: "2026-12-08", type: "culto", title: "Culto comite de Caballeros", time: "7:00 p. m." },
      { date: "2026-01-24", type: "culto", title: "Culto comite de Red de Familia", time: "7:00 p. m." },
      { date: "2026-02-28", type: "culto", title: "Culto comite de Red de Familia", time: "7:00 p. m." },
      { date: "2026-03-28", type: "culto", title: "Culto comite de Red de Familia", time: "7:00 p. m." },
      { date: "2026-04-25", type: "culto", title: "Culto comite de Red de Familia", time: "7:00 p. m." },
      { date: "2026-05-23", type: "culto", title: "Culto comite de Red de Familia", time: "7:00 p. m." },
      { date: "2026-06-27", type: "culto", title: "Culto comite de Red de Familia", time: "7:00 p. m." },
      { date: "2026-07-25", type: "culto", title: "Culto comite de Red de Familia", time: "7:00 p. m." },
      { date: "2026-08-22", type: "culto", title: "Culto comite de Red de Familia", time: "7:00 p. m." },
      { date: "2026-09-26", type: "culto", title: "Culto comite de Red de Familia", time: "7:00 p. m." },
      { date: "2026-10-24", type: "culto", title: "Culto comite de Red de Familia", time: "7:00 p. m." },
      { date: "2026-11-28", type: "culto", title: "Culto comite de Red de Familia", time: "7:00 p. m." },
      { date: "2026-12-26", type: "culto", title: "Culto comite de Red de Familia", time: "7:00 p. m." },
      { date: "2026-01-25", type: "culto", title: "Culto comite de Misiones", time: "10:00 a. m." },
      { date: "2026-02-22", type: "culto", title: "Culto comite de Misiones", time: "10:00 a. m." },
      { date: "2026-03-29", type: "culto", title: "Culto comite de Misiones", time: "10:00 a. m." },
      { date: "2026-04-26", type: "culto", title: "Culto comite de Misiones", time: "10:00 a. m." },
      { date: "2026-05-31", type: "culto", title: "Culto comite de Misiones", time: "10:00 a. m." },
      { date: "2026-06-28", type: "culto", title: "Culto comite de Misiones", time: "10:00 a. m." },
      { date: "2026-07-26", type: "culto", title: "Culto comite de Misiones", time: "10:00 a. m." },
      { date: "2026-08-30", type: "culto", title: "Culto comite de Misiones", time: "10:00 a. m." },
      { date: "2026-09-27", type: "culto", title: "Culto comite de Misiones", time: "10:00 a. m." },
      { date: "2026-10-25", type: "culto", title: "Culto comite de Misiones", time: "10:00 a. m." },
      { date: "2026-11-29", type: "culto", title: "Culto comite de Misiones", time: "10:00 a. m." },
      { date: "2026-12-27", type: "culto", title: "Culto comite de Misiones", time: "10:00 a. m." }
    ];

    const months = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
    const weekdays = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
    const DAILY_REFLECTIONS = [
      { text: "Unidos en el nombre de Jesus, la iglesia camina con gozo y firmeza.", ref: "Hechos 2:46" },
      { text: "Un Señor, una fe, un bautismo: seguimos adelante en unidad.", ref: "Efesios 4:5" },
      { text: "La oracion abre camino cuando el pueblo se reúne con fe.", ref: "Hechos 4:31" },
      { text: "El nombre de Jesus sigue siendo nuestra esperanza y fortaleza.", ref: "Filipenses 2:10" },
      { text: "La iglesia permanece firme cuando sirve con amor y humildad.", ref: "Colosenses 3:23" },
      { text: "Donde hay unidad, Dios derrama bendicion y vida.", ref: "Salmo 133:1" },
      { text: "Cada dia es una oportunidad para adorar en espiritu y en verdad.", ref: "Juan 4:24" },
      { text: "El Señor añade fuerzas al que espera en El.", ref: "Isaias 40:31" },
      { text: "La luz de Cristo se nota en una vida rendida a su Palabra.", ref: "Mateo 5:16" },
      { text: "Somos un cuerpo llamado a servir, amar y perseverar.", ref: "1 Corintios 12:27" },
      { text: "La fe se aviva cuando recordamos que Dios sigue obrando.", ref: "Hebreos 11:1" },
      { text: "La familia de la fe crece cuando camina en paz.", ref: "Romanos 12:18" },
      { text: "La santidad tambien se vive en lo sencillo de cada dia.", ref: "1 Pedro 1:16" },
      { text: "El gozo del Señor sostiene al pueblo que le busca.", ref: "Nehemias 8:10" },
      { text: "La Palabra guia nuestros pasos y afirma nuestro camino.", ref: "Salmo 119:105" }
    ];
    const STORAGE_KEY = "ipuc-villa-del-rio-event-center-v1";
    const TAGS = ["Jovenes", "Damas", "Caballeros", "Escuela Dominical", "Evangelismo", "Infantil", "Musica", "Multimedia", "Pastoral", "Distrital", "Nacional", "Especial"];
    const PODCAST_CATEGORIES = ["Testimonios", "Milagros", "Predicaciones", "Experiencias de fe", "Especiales IPUC"];
    const DEFAULT_SUNDAY_INVITATION = { type: "image/svg+xml", name: "invitacion-dominical-general.svg", url: "/assets/invitacion-dominical-general.svg", label: "Invitación dominical" };
    const COMMITTEE_ASSET = "https://raw.githubusercontent.com/Esteban7145/Esteban7145.github.io/main/assets/";
    const COMMITTEES = [
      ["ipuc", "IPUC Villa del Río", `${COMMITTEE_ASSET}committee-ipuc-villa-del-rio.png`, ["pastoral", "ipuc"]],
      ["caballeros", "Caballeros", `${COMMITTEE_ASSET}committee-caballeros.png`, ["caballeros"]],
      ["damas", "Damas Dorcas", `${COMMITTEE_ASSET}committee-damas-dorcas.png`, ["damas", "dorcas"]],
      ["decom", "DECOM", `${COMMITTEE_ASSET}committee-decom.png`, ["decom"]],
      ["evangelismo", "Evangelismo", `${COMMITTEE_ASSET}committee-evangelismo.png`, ["evangelismo"]],
      ["jovenes", "Jóvenes", `${COMMITTEE_ASSET}committee-jovenes.png`, ["jovenes"]],
      ["misiones", "Misiones", `${COMMITTEE_ASSET}committee-misiones.png`, ["misiones"]],
      ["musica", "Música", `${COMMITTEE_ASSET}committee-musica.png`, ["musica"]],
      ["familias", "Red de familias", `${COMMITTEE_ASSET}committee-red-de-familias.png`, ["familias", "red de familias"]],
      ["escuela-dominical", "Escuela Dominical", `${COMMITTEE_ASSET}committee-escuela-dominical.png`, ["escuela dominical"]],
      ["edad-dorada", "Edad Dorada", `${COMMITTEE_ASSET}committee-edad-dorada.png`, ["edad dorada"]]
    ];
    const INVITATION_FIELDS = [
      ["main", "Invitacion principal"],
      ["whatsapp", "Invitacion para WhatsApp"],
      ["story", "Historia Instagram/Facebook"],
      ["banner", "Banner para proyeccion"],
      ["video", "Video promocional"]
    ];
    const DEFAULT_ANNOUNCEMENTS = [
      {
        title: "Agenda IPUC disponible",
        description: "Ya puedes consultar los cultos, ayunos, vigilias, oraciones y actividades del año.",
        date: "2026-06-03",
        eventId: ""
      }
    ];
    let APP_STATE = loadState();
    const PENDING_UPLOADS = new Map();
    let uploadProgressTimer = null;
    const uploadProgressState = { active: false, label: "", detail: "", percent: 0, tone: "loading" };
    let activeTags = new Set();
    const today = cleanDate(new Date());
    let active = findOpeningDate(today);

    const grid = document.getElementById("grid");
    const monthName = document.getElementById("monthName");
    const yearName = document.getElementById("yearName");
    const selectedTitle = document.getElementById("selectedTitle");
    const eventsBox = document.getElementById("events");
    const summary = document.getElementById("summary");
    const heroTitle = document.getElementById("heroTitle");
    const heroType = document.getElementById("heroType");
    const heroTime = document.getElementById("heroTime");
    const dailyVerse = document.getElementById("dailyVerse");
    const clockTime = document.getElementById("clockTime");
    const badgeWeekday = document.getElementById("badgeWeekday");
    const badgeDay = document.getElementById("badgeDay");
    const badgeMonth = document.getElementById("badgeMonth");
    const tagFilters = document.getElementById("tagFilters");
    const featuredEvents = document.getElementById("featuredEvents");
    const announcementList = document.getElementById("announcementList");
    const pastEvents = document.getElementById("pastEvents");
    const eventModal = document.getElementById("eventModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalStatus = document.getElementById("modalStatus");
    const modalBody = document.getElementById("modalBody");
    const mediaModal = document.getElementById("mediaModal");
    const mediaTitle = document.getElementById("mediaTitle");
    const mediaBody = document.getElementById("mediaBody");
    const adminEventSelect = document.getElementById("adminEventSelect");
    const announcementEvent = document.getElementById("announcementEvent");
    const backgroundAudio = document.getElementById("backgroundAudio");
    const musicText = document.getElementById("musicText");

    if (document.getElementById("grid")) {
    document.getElementById("prev").onclick = () => {
      active = new Date(active.getFullYear(), active.getMonth() - 1, Math.min(active.getDate(), 28));
      render();
    };
    document.getElementById("next").onclick = () => {
      active = new Date(active.getFullYear(), active.getMonth() + 1, Math.min(active.getDate(), 28));
      render();
    };
    document.getElementById("todayButton").onclick = () => {
      active = new Date(today);
      render();
    };
    document.getElementById("addCalendarButton").onclick = () => {
      addAllEventsToCalendar();
    };
    document.getElementById("saveEventButton").onclick = () => {
      saveAdminEvent();
    };
    document.getElementById("deleteEventButton").onclick = () => {
      deleteAdminEvent();
    };
    document.getElementById("clearLocalButton").onclick = () => {
      if (confirm("Esto borrara los cambios locales de este navegador. ¿Deseas continuar?")) {
        APP_STATE = loadState();
        render();
        loadAdminEvent("__new__");
        renderMusic();
      }
    };
    document.getElementById("saveAnnouncementButton").onclick = () => {
      saveAnnouncement();
    };
    document.getElementById("adminMusic").onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      APP_STATE.music = await fileToAsset(file, "Música ambiente");
      saveState();
      renderMusic();
    };
    adminEventSelect.onchange = () => {
      loadAdminEvent(adminEventSelect.value);
    };
    document.querySelectorAll("[data-close-modal]").forEach(button => {
      button.onclick = () => closeModal(button.closest(".modal-backdrop"));
    });
    [eventModal, mediaModal].forEach(modal => {
      modal.onclick = (event) => {
        if (event.target === modal) closeModal(modal);
      };
    });
    document.querySelectorAll(".chip").forEach(button => {
      button.onclick = () => {
        const event = closestEvent(button.dataset.type);
        if (event) {
          active = parseDate(event.date);
          render();
        }
      };
    });

    renderTagFilters();
    renderAdminTagChecks();
    render();
    populateAdminSelectors();
    loadAdminEvent(adminEventSelect.value);
    renderMusic();
    updateClock();
    setInterval(updateClock, 1000);
    }

    function render() {
      monthName.textContent = months[active.getMonth()];
      yearName.textContent = String(active.getFullYear());
      renderCalendar();
      renderPanel();
      renderFeatured();
      renderAnnouncements();
      renderPastEvents();
      populateAdminSelectors();
    }

    function renderCalendar() {
      grid.innerHTML = "";
      const year = active.getFullYear();
      const month = active.getMonth();
      const first = new Date(year, month, 1);
      const offset = (first.getDay() + 6) % 7;
      const start = new Date(year, month, 1 - offset);

      for (let i = 0; i < 42; i += 1) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        const button = document.createElement("button");
        button.type = "button";
        button.className = "day";
        if (date.getMonth() !== month) button.classList.add("outside");
        if (sameDay(date, today)) button.classList.add("today");
        if (sameDay(date, active)) button.classList.add("selected");
        button.innerHTML = `<span class="num">${date.getDate()}</span>`;

        const dayEvents = visibleEventsForDate(date);
        const types = [...new Set(dayEvents.map(event => event.type))];
        if (types.length) {
          const bars = document.createElement("div");
          bars.className = "bars";
          types.forEach(type => {
            const bar = document.createElement("span");
            bar.className = "bar";
            bar.style.setProperty("--color", TYPES[type].color);
            bars.appendChild(bar);
          });
          button.appendChild(bars);
        }

        if (dayEvents.length) {
          const preview = document.createElement("div");
          preview.className = "day-events-preview";
          dayEvents.slice(0, 2).forEach(event => {
            const mini = document.createElement("button");
            mini.type = "button";
            mini.className = "mini-event";
            mini.innerHTML = `${event.invitations.main && isImage(event.invitations.main) ? `<img src="${event.invitations.main.dataUrl}" alt="">` : ""}<span>${escapeHtml(event.title)}</span>`;
            mini.onclick = (clickEvent) => {
              clickEvent.stopPropagation();
              openEventModal(event.id);
            };
            preview.appendChild(mini);
          });
          button.appendChild(preview);
        }

        button.onclick = () => {
          active = date;
          render();
        };
        grid.appendChild(button);
      }
    }

    function renderPanel() {
      const list = visibleEventsForDate(active);
      const isToday = sameDay(active, today);
      const mainEvent = list[0];
      const reflection = dailyReflection(active);
      badgeWeekday.textContent = isToday ? "Hoy" : weekdays[active.getDay()];
      badgeDay.textContent = String(active.getDate()).padStart(2, "0");
      badgeMonth.textContent = months[active.getMonth()];
      selectedTitle.textContent = `${isToday ? "Hoy, " : ""}${longDate(active)}`;
      heroTitle.textContent = mainEvent ? mainEvent.title : "Reflexion del dia";
      heroType.textContent = mainEvent ? TYPES[mainEvent.type].label : "Unidad";
      heroTime.textContent = mainEvent ? mainEvent.time : "Para meditar";
      summary.textContent = buildHeroSummary(list, active, isToday);
      dailyVerse.textContent = `${reflection.text} (${reflection.ref})`;

      eventsBox.innerHTML = "";
      if (!list.length) {
        eventsBox.innerHTML = `<div class="empty">${reflection.text} (${reflection.ref})</div>`;
        return;
      }
      list.forEach(event => {
        const wrapper = document.createElement("button");
        wrapper.type = "button";
        wrapper.className = "event-card-button";
        wrapper.onclick = () => openEventModal(event.id);
        const card = document.createElement("article");
        card.className = "event";
        card.style.setProperty("--color", TYPES[event.type].color);
        card.innerHTML = `<strong>${escapeHtml(event.title)}</strong><p>${escapeHtml(TYPES[event.type]?.label || event.type)} - ${escapeHtml(event.time)} - ${escapeHtml(event.status)}</p>`;
        wrapper.appendChild(card);
        eventsBox.appendChild(wrapper);
      });
    }

    function closestEvent(type) {
      const key = dateKey(active);
      const list = eventsForYear(active.getFullYear()).filter(event => event.type === type).sort((a, b) => a.date.localeCompare(b.date));
      return list.find(event => event.date >= key) || list[0];
    }
    function findOpeningDate(date) {
      if (eventsFor(date).length) return new Date(date);
      const key = dateKey(date);
      const upcoming = eventsForYear(date.getFullYear())
        .filter(event => event.date >= key)
        .sort((a, b) => a.date.localeCompare(b.date))[0];
      return upcoming ? parseDate(upcoming.date) : new Date(date);
    }
    function eventsFor(date) {
      const key = dateKey(date);
      return eventsForYear(date.getFullYear()).filter(event => event.date === key);
    }
    function eventsForYear(year) {
      const generated = [];
      const programmedCultoDates = new Set(PROGRAMMED_EVENTS.filter(event => event.type === "culto").map(event => event.date));
      const date = new Date(year, 0, 1);
      while (date.getFullYear() === year) {
        const key = dateKey(date);
        if (date.getDay() === 0 && !programmedCultoDates.has(key)) {
          generated.push({ date: key, type: "culto", title: "Culto dominical", time: "10:00 a. m." });
        }
        if (date.getDay() === 4 && !programmedCultoDates.has(key)) {
          generated.push({ date: key, type: "culto", title: "Culto de oracion y enseñanza", time: "7:00 p. m." });
        }
        date.setDate(date.getDate() + 1);
      }
      const customEvents = Object.values(APP_STATE.events || {}).filter(event => event.custom && event.date && parseDate(event.date).getFullYear() === year);
      return mergeEvents([...generated, ...PROGRAMMED_EVENTS], customEvents).map(enrichEvent).filter(event => !event.deleted);
    }
    function mergeEvents(baseEvents, specialEvents) {
      const bySignature = new Map();
      [...baseEvents, ...specialEvents].forEach(event => {
        bySignature.set(`${event.date}|${event.title}`, event);
      });
      return [...bySignature.values()];
    }
    function loadState() {
      return { events: {}, announcements: DEFAULT_ANNOUNCEMENTS, reflections: {}, podcasts: [], music: null, musicPlaylist: [] };
    }
    function saveState() {
      window.dispatchEvent(new CustomEvent("ipuc-state-updated"));
    }
    function eventIdFor(event) {
      return `${event.date}-${slugify(event.title)}`;
    }
    function isRegularSundayWorship(event) {
      if (!event?.date || event.type !== "culto" || parseDate(event.date).getDay() !== 0) return false;
      const text = `${event.title || ""} ${event.department || event.organizer || ""}`.toLocaleLowerCase("es");
      return text.includes("dominical") && !/mision(?:es|era|ero)?/.test(text);
    }
    function slugify(value) {
      return String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    }
    function selectedCommittee(event) {
      const value = slugify(event?.department || event?.organizer || "");
      return COMMITTEES.find(([key, label, image, aliases]) => aliases.includes(value) || slugify(label) === value)?.[0] || "ipuc";
    }
    function committeePickerMarkup(event) {
      const selected = selectedCommittee(event);
      return `<div class="committee-picker full" role="radiogroup" aria-label="Comité responsable">${COMMITTEES.map(([key, label, image]) => `<button type="button" class="committee-option ${selected === key ? "selected" : ""}" data-committee="${key}" data-committee-label="${escapeHtml(label)}" aria-pressed="${selected === key}"><img src="${image}" alt="Logo de ${escapeHtml(label)}"><span>${escapeHtml(label)}</span></button>`).join("")}</div><input id="adminDepartment2" type="hidden" value="${escapeHtml(COMMITTEES.find(([key]) => key === selected)?.[1] || "IPUC Villa del Río")}">`;
    }
    function enrichEvent(event) {
      const id = event.id || eventIdFor(event);
      const saved = (APP_STATE.events || {})[id] || {};
      const base = {
        id,
        title: event.title,
        date: event.date,
        time: event.time || "7:00 p. m.",
        type: event.type || "culto",
        place: "IPUC Villa del Rio",
        organizer: inferOrganizer(event.title),
        responsible: "Por definir",
        description: `Actividad programada dentro del cronograma anual de IPUC Villa del Rio.`,
        status: inferStatus(event.date),
        observations: "",
        featured: isDefaultFeatured(event),
        tags: inferTags(event.title, event.type),
        invitations: {},
        attachments: [],
        gallery: [],
        custom: Boolean(event.custom),
        deleted: false
      };
      return {
        ...base,
        ...saved,
        id,
        invitations: { ...base.invitations, ...(saved.invitations || {}) },
        attachments: saved.attachments || base.attachments,
        gallery: saved.gallery || base.gallery,
        tags: saved.tags || base.tags
      };
    }
    function inferStatus(date) {
      return parseDate(date) < today ? "Finalizado" : "Confirmado";
    }
    function inferOrganizer(title) {
      const lower = title.toLowerCase();
      if (lower.includes("dorcas") || lower.includes("damas")) return "Damas Dorcas";
      if (lower.includes("joven")) return "Jovenes";
      if (lower.includes("caballero")) return "Caballeros";
      if (lower.includes("escuela")) return "Escuela Dominical";
      if (lower.includes("evangelismo")) return "Evangelismo";
      if (lower.includes("alabanza")) return "Musica";
      if (lower.includes("misiones")) return "Misiones";
      if (lower.includes("red de familia")) return "Red de Familia";
      if (lower.includes("obra social")) return "Obra Social";
      if (lower.includes("edad dorada")) return "Edad Dorada";
      return "IPUC Villa del Rio";
    }
    function inferTags(title, type) {
      const lower = title.toLowerCase();
      const tags = [];
      if (lower.includes("joven")) tags.push("Jovenes");
      if (lower.includes("dorcas") || lower.includes("damas")) tags.push("Damas");
      if (lower.includes("caballero")) tags.push("Caballeros");
      if (lower.includes("escuela")) tags.push("Escuela Dominical");
      if (lower.includes("evangelismo")) tags.push("Evangelismo");
      if (lower.includes("alabanza")) tags.push("Musica");
      if (lower.includes("multimedia")) tags.push("Multimedia");
      if (lower.includes("distrital")) tags.push("Distrital");
      if (lower.includes("nacional")) tags.push("Nacional");
      if (type === "vigilia" || type === "ayuno" || lower.includes("especial")) tags.push("Especial");
      return tags.length ? [...new Set(tags)] : ["Pastoral"];
    }
    function isDefaultFeatured(event) {
      return ["vigilia", "ayuno", "especial"].includes(event.type);
    }
    function eventMatchesTags(event) {
      if (!activeTags.size) return true;
      return event.tags.some(tag => activeTags.has(tag));
    }
    function visibleEventsForDate(date) {
      return eventsFor(date).filter(eventMatchesTags);
    }
    function allEvents2026() {
      return eventsForYear(2026).sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
    }
    function eventById(id) {
      return allEvents2026().find(event => event.id === id);
    }
    function renderTagFilters() {
      tagFilters.innerHTML = `<button class="tag-button ${activeTags.size ? "" : "active"}" type="button" data-tag="">Todos</button>`;
      TAGS.forEach(tag => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `tag-button ${activeTags.has(tag) ? "active" : ""}`;
        button.dataset.tag = tag;
        button.textContent = tag;
        tagFilters.appendChild(button);
      });
      tagFilters.querySelectorAll(".tag-button").forEach(button => {
        button.onclick = () => {
          const tag = button.dataset.tag;
          if (!tag) activeTags.clear();
          else if (activeTags.has(tag)) activeTags.delete(tag);
          else activeTags.add(tag);
          renderTagFilters();
          render();
        };
      });
    }
    function renderFeatured() {
      const events = allEvents2026().filter(event => event.featured && parseDate(event.date) >= today && eventMatchesTags(event)).slice(0, 6);
      featuredEvents.innerHTML = events.length ? "" : `<div class="empty">No hay eventos destacados con este filtro.</div>`;
      events.forEach(event => featuredEvents.appendChild(eventSummaryCard(event, "feature-card")));
    }
    function renderPastEvents() {
      const events = allEvents2026().filter(event => parseDate(event.date) < today && eventMatchesTags(event)).slice(-6).reverse();
      pastEvents.innerHTML = events.length ? "" : `<div class="empty">Todavia no hay eventos realizados en este filtro.</div>`;
      events.forEach(event => pastEvents.appendChild(eventSummaryCard(event, "history-card")));
    }
    function eventSummaryCard(event, className) {
      const card = document.createElement("article");
      card.className = className;
      const typeLabel = TYPES[event.type]?.label || event.type;
      const image = event.invitations.main && isImage(event.invitations.main) ? `<img src="${event.invitations.main.dataUrl}" alt="">` : `<span>${escapeHtml(typeLabel)}</span>`;
      card.innerHTML = `
        <div class="${className === "feature-card" ? "feature-media" : "history-media"}">${image}</div>
        <div class="${className === "feature-card" ? "feature-body" : "history-body"}">
          <h3>${escapeHtml(event.title)}</h3>
          <p>${escapeHtml(formatDateShort(event.date))} - ${escapeHtml(event.time)}<br>${escapeHtml(event.place)}</p>
          <button class="open-event primary" type="button">Ver evento</button>
        </div>
      `;
      card.querySelector("button").onclick = () => openEventModal(event.id);
      return card;
    }
    function renderAnnouncements() {
      const announcements = APP_STATE.announcements || DEFAULT_ANNOUNCEMENTS;
      announcementList.innerHTML = announcements.length ? "" : `<div class="empty">No hay anuncios publicados.</div>`;
      announcements.slice().reverse().slice(0, 5).forEach(item => {
        const linked = item.eventId ? eventById(item.eventId) : null;
        const card = document.createElement("article");
        card.className = "announcement-card";
        card.innerHTML = `<h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p><p>${escapeHtml(formatDateShort(item.date))}${linked ? ` - ${escapeHtml(linked.title)}` : ""}</p>${linked ? `<button class="small-action" type="button">Ver evento</button>` : ""}`;
        const button = card.querySelector("button");
        if (button) button.onclick = () => openEventModal(linked.id);
        announcementList.appendChild(card);
      });
    }
    function renderMusic() {
      if (APP_STATE.music && APP_STATE.music.dataUrl) {
        backgroundAudio.src = APP_STATE.music.dataUrl;
        musicText.textContent = APP_STATE.music.name;
      } else {
        backgroundAudio.removeAttribute("src");
        musicText.textContent = "El administrador puede cargar musica autorizada para reproducirla manualmente.";
      }
    }
    function openEventModal(id) {
      const event = eventById(id);
      if (!event) return;
      modalTitle.textContent = event.title;
      modalStatus.textContent = `${event.status} - ${TYPES[event.type]?.label || event.type}`;
      modalBody.innerHTML = "";

      const detailGrid = document.createElement("div");
      detailGrid.className = "detail-grid";
      [
        ["Fecha", formatDateShort(event.date)],
        ["Hora", event.time],
        ["Lugar", event.place],
        ["Departamento", event.organizer],
        ["Responsable", event.responsible],
        ["Estado", event.status],
        ["Tipo", TYPES[event.type]?.label || event.type],
        ["Etiquetas", event.tags.join(", ") || "Sin etiquetas"],
        ["Descripcion", eventDescription(event), true],
        ["Observaciones", event.observations || "Sin observaciones adicionales.", true]
      ].forEach(([label, value, full]) => {
        const item = document.createElement("div");
        item.className = `detail-item ${full ? "full" : ""}`;
        item.innerHTML = `<span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong>`;
        detailGrid.appendChild(item);
      });
      modalBody.appendChild(detailGrid);

      const invitationAssets = INVITATION_FIELDS
        .map(([key, label]) => event.invitations[key] ? { ...event.invitations[key], label } : null)
        .filter(Boolean);
      modalBody.appendChild(renderAssetSection("Invitaciones del evento", invitationAssets, "Aun no hay invitaciones subidas para este evento."));
      modalBody.appendChild(renderFileSection("Archivos adjuntos", event.attachments || [], "Aun no hay documentos adjuntos."));
      modalBody.appendChild(renderAssetSection("Galeria del evento", event.gallery || [], "La galeria se puede llenar despues de realizado el evento."));

      eventModal.classList.add("open");
    }
    function renderAssetSection(title, assets, emptyText) {
      const section = document.createElement("section");
      section.className = "asset-section";
      const heading = document.createElement("h3");
      heading.textContent = title;
      section.appendChild(heading);

      if (!assets.length) {
        const empty = document.createElement("div");
        empty.className = "empty";
        empty.textContent = emptyText;
        section.appendChild(empty);
        return section;
      }

      const grid = document.createElement("div");
      grid.className = "asset-grid";
      assets.forEach(asset => {
        const card = document.createElement("article");
        card.className = "asset-card";

        const thumb = document.createElement("button");
        thumb.type = "button";
        thumb.className = "asset-thumb";
        thumb.onclick = () => openMedia(asset);
        if (isImage(asset)) {
          const img = document.createElement("img");
          img.src = asset.dataUrl;
          img.alt = asset.label || asset.name;
          thumb.appendChild(img);
        } else if (isVideo(asset)) {
          const video = document.createElement("video");
          video.src = asset.dataUrl;
          video.muted = true;
          video.playsInline = true;
          thumb.appendChild(video);
        } else {
          thumb.textContent = assetTypeLabel(asset);
        }

        const footer = document.createElement("footer");
        const name = document.createElement("strong");
        name.textContent = asset.label || asset.name;
        const meta = document.createElement("span");
        meta.className = "asset-name";
        meta.textContent = asset.name;
        const actions = document.createElement("div");
        actions.className = "asset-actions";
        actions.appendChild(actionButton("Ver", () => openMedia(asset)));
        actions.appendChild(actionButton("Descargar", () => downloadAsset(asset)));
        footer.append(name, meta, actions);
        card.append(thumb, footer);
        grid.appendChild(card);
      });
      section.appendChild(grid);
      return section;
    }
    function renderFileSection(title, files, emptyText) {
      const section = document.createElement("section");
      section.className = "asset-section";
      const heading = document.createElement("h3");
      heading.textContent = title;
      section.appendChild(heading);

      if (!files.length) {
        const empty = document.createElement("div");
        empty.className = "empty";
        empty.textContent = emptyText;
        section.appendChild(empty);
        return section;
      }

      const list = document.createElement("div");
      list.className = "file-list";
      files.forEach(file => {
        const row = document.createElement("article");
        row.className = "file-row";
        const info = document.createElement("div");
        const name = document.createElement("strong");
        name.textContent = file.name;
        const meta = document.createElement("span");
        meta.className = "file-meta";
        meta.textContent = `${assetTypeLabel(file)} - ${humanFileSize(file.size)} - Subido ${formatDateShort(file.uploadedAt)}`;
        info.append(name, meta);
        const actions = document.createElement("div");
        actions.className = "asset-actions";
        actions.appendChild(actionButton("Ver", () => openMedia(file)));
        actions.appendChild(actionButton("Descargar", () => downloadAsset(file)));
        row.append(info, actions);
        list.appendChild(row);
      });
      section.appendChild(list);
      return section;
    }
    function openMedia(asset) {
      mediaTitle.textContent = asset.label || asset.name;
      mediaBody.innerHTML = "";

      if (isImage(asset)) {
        const img = document.createElement("img");
        img.className = "media-preview";
        img.src = asset.dataUrl;
        img.alt = asset.label || asset.name;
        mediaBody.appendChild(img);
      } else if (isVideo(asset)) {
        const video = document.createElement("video");
        video.className = "media-preview";
        video.src = asset.dataUrl;
        video.controls = true;
        mediaBody.appendChild(video);
      } else if (isAudio(asset)) {
        const audio = document.createElement("audio");
        audio.className = "media-preview";
        audio.src = asset.dataUrl;
        audio.controls = true;
        mediaBody.appendChild(audio);
      } else if (isPdf(asset)) {
        const frame = document.createElement("iframe");
        frame.className = "media-preview";
        frame.src = asset.dataUrl;
        mediaBody.appendChild(frame);
      } else {
        const empty = document.createElement("div");
        empty.className = "empty";
        empty.textContent = "Este archivo no tiene vista previa directa en el navegador, pero se puede descargar.";
        mediaBody.appendChild(empty);
      }

      const actions = document.createElement("div");
      actions.className = "media-actions";
      actions.style.marginTop = "12px";
      actions.appendChild(actionButton("Descargar", () => downloadAsset(asset), true));
      mediaBody.appendChild(actions);
      mediaModal.classList.add("open");
    }
    function closeModals() {
      eventModal.classList.remove("open");
      mediaModal.classList.remove("open");
      mediaBody.innerHTML = "";
    }
    function closeModal(modal) {
      if (!modal) return;
      modal.classList.remove("open");
      if (modal === mediaModal) mediaBody.innerHTML = "";
    }
    function populateAdminSelectors() {
      const previousEvent = adminEventSelect.value || "__new__";
      const previousAnnouncement = announcementEvent.value || "";
      const events = allEvents2026();

      adminEventSelect.innerHTML = `<option value="__new__">Crear evento nuevo</option>`;
      events.forEach(event => {
        const option = document.createElement("option");
        option.value = event.id;
        option.textContent = `${formatDateShort(event.date)} - ${event.title}`;
        adminEventSelect.appendChild(option);
      });
      adminEventSelect.value = [...adminEventSelect.options].some(option => option.value === previousEvent) ? previousEvent : "__new__";

      announcementEvent.innerHTML = `<option value="">Sin evento relacionado</option>`;
      events.forEach(event => {
        const option = document.createElement("option");
        option.value = event.id;
        option.textContent = `${formatDateShort(event.date)} - ${event.title}`;
        announcementEvent.appendChild(option);
      });
      announcementEvent.value = [...announcementEvent.options].some(option => option.value === previousAnnouncement) ? previousAnnouncement : "";
    }
    function renderAdminTagChecks() {
      const box = document.getElementById("adminTags");
      box.innerHTML = "";
      TAGS.forEach(tag => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "checkbox";
        input.value = tag;
        label.append(input, document.createTextNode(tag));
        box.appendChild(label);
      });
    }
    function loadAdminEvent(id) {
      const event = id && id !== "__new__" ? eventById(id) : null;
      document.getElementById("adminTitle").value = event?.title || "";
      document.getElementById("adminDate").value = event?.date || dateKey(active);
      document.getElementById("adminTime").value = event?.time || "7:00 p. m.";
      document.getElementById("adminType").value = event?.type || "culto";
      document.getElementById("adminStatus").value = event?.status || "Pendiente";
      document.getElementById("adminPlace").value = event?.place || "IPUC Villa del Rio";
      document.getElementById("adminOrganizer").value = event?.organizer || "";
      document.getElementById("adminResponsible").value = event?.responsible || "";
      document.getElementById("adminFeatured").checked = Boolean(event?.featured);
      document.getElementById("adminDescription").value = event?.description || "";
      document.getElementById("adminObservations").value = event?.observations || "";
      document.querySelectorAll("#adminTags input").forEach(input => {
        input.checked = Boolean(event?.tags?.includes(input.value));
      });
      clearUploadInputs();
    }
    async function saveAdminEvent() {
      const saveButton = document.getElementById("saveEventButton");
      const originalText = saveButton.textContent;
      saveButton.disabled = true;
      saveButton.textContent = "Guardando...";
      try {
        const selected = adminEventSelect.value;
        const title = document.getElementById("adminTitle").value.trim();
        const date = document.getElementById("adminDate").value;
        if (!title || !date) {
          alert("Escribe al menos el nombre y la fecha del evento.");
          return;
        }

        const base = selected && selected !== "__new__" ? eventById(selected) : null;
        const id = base ? selected : eventIdFor({ date, title });
        const invitations = { ...(base?.invitations || {}) };
        const invitationInputs = {
          main: "adminInviteMain",
          whatsapp: "adminInviteWhatsapp",
          story: "adminInviteStory",
          banner: "adminInviteBanner",
          video: "adminInviteVideo"
        };
        for (const [key, label] of INVITATION_FIELDS) {
          const file = document.getElementById(invitationInputs[key]).files[0];
          if (file) invitations[key] = await fileToAsset(file, label);
        }

        const attachments = [...(base?.attachments || [])];
        for (const file of document.getElementById("adminAttachments").files) {
          attachments.push(await fileToAsset(file, "Archivo adjunto"));
        }

        const gallery = [...(base?.gallery || [])];
        for (const file of document.getElementById("adminGallery").files) {
          gallery.push(await fileToAsset(file, "Galeria"));
        }

        APP_STATE.events[id] = {
          ...(APP_STATE.events[id] || {}),
          id,
          custom: !base || Boolean(base.custom),
          deleted: false,
          title,
          date,
          time: document.getElementById("adminTime").value.trim() || "7:00 p. m.",
          type: document.getElementById("adminType").value,
          place: document.getElementById("adminPlace").value.trim() || "IPUC Villa del Rio",
          organizer: document.getElementById("adminOrganizer").value.trim() || "IPUC Villa del Rio",
          responsible: document.getElementById("adminResponsible").value.trim() || "Por definir",
          description: document.getElementById("adminDescription").value.trim(),
          status: document.getElementById("adminStatus").value,
          observations: document.getElementById("adminObservations").value.trim(),
          featured: document.getElementById("adminFeatured").checked,
          tags: selectedAdminTags().length ? selectedAdminTags() : inferTags(title, document.getElementById("adminType").value),
          invitations,
          attachments,
          gallery
        };

        active = parseDate(date);
        saveState();
        renderTagFilters();
        render();
        adminEventSelect.value = id;
        loadAdminEvent(id);
        alert("Evento guardado.");
      } finally {
        saveButton.disabled = false;
        saveButton.textContent = originalText;
      }
    }
    function deleteAdminEvent() {
      const id = adminEventSelect.value;
      if (!id || id === "__new__") {
        loadAdminEvent("__new__");
        return;
      }
      if (!confirm("Este evento se ocultara del calendario en este navegador. Deseas continuar?")) return;
      const event = eventById(id);
      APP_STATE.events[id] = {
        ...(event || {}),
        ...(APP_STATE.events[id] || {}),
        id,
        deleted: true,
        custom: Boolean(event?.custom || APP_STATE.events[id]?.custom)
      };
      saveState();
      render();
      adminEventSelect.value = "__new__";
      loadAdminEvent("__new__");
    }
    function saveAnnouncement() {
      const title = document.getElementById("announcementTitle").value.trim();
      const description = document.getElementById("announcementDescription").value.trim();
      const eventId = announcementEvent.value;
      if (!title || !description) {
        alert("Escribe titulo y descripcion del anuncio.");
        return;
      }
      APP_STATE.announcements = APP_STATE.announcements || [];
      APP_STATE.announcements.push({
        id: `anuncio-${Date.now()}`,
        title,
        description,
        date: dateKey(today),
        eventId
      });
      saveState();
      document.getElementById("announcementTitle").value = "";
      document.getElementById("announcementDescription").value = "";
      announcementEvent.value = "";
      renderAnnouncements();
    }
    function selectedAdminTags() {
      return [...document.querySelectorAll("#adminTags input:checked")].map(input => input.value);
    }
    function clearUploadInputs() {
      ["adminInviteMain", "adminInviteWhatsapp", "adminInviteStory", "adminInviteBanner", "adminInviteVideo", "adminAttachments", "adminGallery"].forEach(id => {
        document.getElementById(id).value = "";
      });
    }
    function fileToAsset(file, label) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({
          id: `asset-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          label,
          name: file.name,
          type: file.type || "application/octet-stream",
          size: file.size,
          uploadedAt: dateKey(new Date()),
          dataUrl: reader.result
        });
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
    }
    function actionButton(label, handler, primary = false) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `small-action ${primary ? "primary" : ""}`;
      button.textContent = label;
      button.onclick = handler;
      return button;
    }
    async function downloadAsset(asset) {
      const source = assetSource(asset, "download");
      if (!source) return alert("Este archivo no tiene URL disponible.");
      try {
        const downloader = await import("/js/downloads.js?v=20261005-1");
        await downloader.downloadFile({ ...asset, url: source });
      } catch (error) { showToast(error.message || "No se pudo descargar. Intenta nuevamente.", "error"); }
    }

    function showToast(message, tone) {
      const text = String(message || "").trim();
      if (!text) return;
      const lower = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const inferredTone = tone || (/(guardad|actualizad|publicad|autorizad|enviad|eliminad|complet|correctamente|cargad)/.test(lower) ? "success" : /(no se pudo|no hay|falta|debes|solo |obligatori|valido|bloque|permiso|disponible|error|selecciona|todavia|aun no)/.test(lower) ? "error" : "info");
      const titles = { success: "Listo", error: "Revisa esto", info: "Aviso" };
      const icons = { success: "✓", error: "!", info: "i" };
      let stack = document.querySelector(".ipuc-toast-stack");
      if (!stack) {
        stack = document.createElement("div");
        stack.className = "ipuc-toast-stack";
        stack.setAttribute("aria-live", "polite");
        stack.setAttribute("aria-atomic", "false");
        document.body.appendChild(stack);
      }
      const toast = document.createElement("article");
      toast.className = `ipuc-toast ipuc-toast-${inferredTone}`;
      toast.setAttribute("role", inferredTone === "error" ? "alert" : "status");

      const icon = document.createElement("span");
      icon.className = "ipuc-toast-icon";
      icon.textContent = icons[inferredTone];
      icon.setAttribute("aria-hidden", "true");

      const content = document.createElement("div");
      content.className = "ipuc-toast-content";
      const title = document.createElement("strong");
      title.textContent = titles[inferredTone];
      const body = document.createElement("p");
      body.textContent = text;
      content.append(title, body);

      const close = document.createElement("button");
      close.type = "button";
      close.className = "ipuc-toast-close";
      close.setAttribute("aria-label", "Cerrar aviso");
      close.textContent = "×";
      const dismiss = () => {
        toast.classList.add("is-closing");
        setTimeout(() => toast.remove(), 220);
      };
      close.addEventListener("click", dismiss);

      const progress = document.createElement("span");
      progress.className = "ipuc-toast-progress";
      toast.append(icon, content, close, progress);
      stack.appendChild(toast);
      while (stack.children.length > 3) stack.firstElementChild.remove();
      requestAnimationFrame(() => toast.classList.add("is-visible"));
      const timer = setTimeout(dismiss, inferredTone === "error" ? 6500 : 4800);
      toast.addEventListener("mouseenter", () => clearTimeout(timer), { once: true });
    }

    window.alert = showToast;

    function driveFileId(asset) {
      if (asset?.driveFileId) return String(asset.driveFileId);
      const candidates = [asset?.url, asset?.previewUrl, asset?.webViewLink];
      for (const value of candidates) {
        const match = String(value || "").match(/(?:[?&]id=|\/d\/)([a-zA-Z0-9_-]{10,})/);
        if (match) return match[1];
      }
      return "";
    }

    function assetSource(asset, purpose = "download") {
      if (!asset) return "";
      const fallback = asset.url || asset.dataUrl || asset.previewUrl || "";
      if (purpose === "display" && isImage(asset)) {
        const id = driveFileId(asset);
        // Drive puede entregar SVG como application/octet-stream. Su miniatura
        // es una imagen PNG estable para mostrarla en cualquier navegador.
        if (id && (asset.provider === "google-drive" || String(fallback).includes("drive.google.com"))) {
          return `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w2400`;
        }
        return asset.previewUrl || fallback;
      }
      return fallback;
    }
    function isImage(asset) {
      return asset.type && asset.type.startsWith("image/");
    }
    function isVideo(asset) {
      return asset.type && asset.type.startsWith("video/");
    }
    function isAudio(asset) {
      return asset.type && asset.type.startsWith("audio/");
    }
    function isPdf(asset) {
      return asset.type === "application/pdf" || asset.name?.toLowerCase().endsWith(".pdf");
    }
    function assetTypeLabel(asset) {
      if (isImage(asset)) return "Imagen";
      if (isVideo(asset)) return "Video";
      if (isAudio(asset)) return "Audio";
      if (isPdf(asset)) return "PDF";
      return asset.type || "Archivo";
    }
    function humanFileSize(size = 0) {
      if (!size) return "tamano no disponible";
      if (size < 1024) return `${size} B`;
      if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    }
    function formatDateShort(key) {
      if (!key) return "Fecha por confirmar";
      const date = parseDate(key);
      if (Number.isNaN(date.getTime())) return key;
      return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
    }
    function escapeHtml(value) {
      const span = document.createElement("span");
      span.textContent = value ?? "";
      return span.innerHTML;
    }
    function buildHeroSummary(list, date, isToday) {
      const reflection = dailyReflection(date);
      if (!list.length) {
        return `${reflection.text} (${reflection.ref})`;
      }
      const names = list.map(event => event.title);
      const extra = names.length > 1 ? ` Tambien hay: ${names.slice(1).join(", ")}.` : "";
      return `${isToday ? "Hoy" : "Este dia"} hay ${list.length} evento${list.length > 1 ? "s" : ""} programado${list.length > 1 ? "s" : ""}.${extra}`;
    }
    function dailyReflection(date) {
      const start = new Date(date.getFullYear(), 0, 0);
      const dayNumber = Math.floor((date - start) / 86400000);
      return DAILY_REFLECTIONS[dayNumber % DAILY_REFLECTIONS.length];
    }
    function updateClock() {
      const now = new Date();
      clockTime.textContent = now.toLocaleTimeString("es-CO", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit"
      });
    }
    function addAllEventsToCalendar() {
      const events = eventsForYear(2026).sort((a, b) => {
        const byDate = a.date.localeCompare(b.date);
        return byDate || a.title.localeCompare(b.title);
      });
      downloadEventsCalendar(events, "cronograma-ipuc-villa-del-rio-2026.ics");
    }
    function downloadEventsCalendar(events, filename) {
      const ics = buildIcs(events);
      const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename || "cronograma-ipuc-villa-del-rio.ics";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    function buildIcs(events) {
      const stamp = formatUtcIcsDate(new Date());
      const lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//IPUC Villa del Rio//Cronograma Anual 2026//ES",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "X-WR-CALNAME:Cronograma IPUC Villa del Rio",
        "X-WR-TIMEZONE:America/Bogota"
      ];

      events.forEach((event, index) => {
        const start = eventStartDate(event);
        const end = new Date(start.getTime() + eventDurationHours(event) * 60 * 60 * 1000);
        lines.push(
          "BEGIN:VEVENT",
          `UID:${event.date}-${slugify(event.title)}-${index}@ipuc-villa-del-rio`,
          `DTSTAMP:${stamp}`,
          `DTSTART;TZID=America/Bogota:${formatLocalIcsDate(start)}`,
          `DTEND;TZID=America/Bogota:${formatLocalIcsDate(end)}`,
          `SUMMARY:${escapeIcs(event.title)}`,
          `DESCRIPTION:${escapeIcs(`${TYPES[event.type]?.label || event.type} - ${event.time}`)}`,
          `LOCATION:${escapeIcs(event.place || "IPUC Villa del Río")}`,
          "END:VEVENT"
        );
      });

      lines.push("END:VCALENDAR");
      return `${lines.join("\r\n")}\r\n`;
    }
    function eventStartDate(event) {
      const date = parseDate(event.date);
      const time = parseTime(event.time);
      date.setHours(time.hours, time.minutes, 0, 0);
      return date;
    }
    function parseTime(time) {
      const match = time.match(/(\d{1,2}):(\d{2})\s*([ap])\.\s*m\./i);
      if (!match) return { hours: 19, minutes: 0 };
      let hours = Number(match[1]);
      const minutes = Number(match[2]);
      const period = match[3].toLowerCase();
      if (period === "p" && hours < 12) hours += 12;
      if (period === "a" && hours === 12) hours = 0;
      return { hours, minutes };
    }
    function eventDurationHours(event) {
      if (event.type === "vigilia") return 5;
      if (event.type === "ayuno") return 4;
      return 2;
    }
    function formatLocalIcsDate(date) {
      return `${date.getFullYear()}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}T${pad2(date.getHours())}${pad2(date.getMinutes())}00`;
    }
    function formatUtcIcsDate(date) {
      return `${date.getUTCFullYear()}${pad2(date.getUTCMonth() + 1)}${pad2(date.getUTCDate())}T${pad2(date.getUTCHours())}${pad2(date.getUTCMinutes())}${pad2(date.getUTCSeconds())}Z`;
    }
    function escapeIcs(value) {
      return String(value)
        .replace(/\\/g, "\\\\")
        .replace(/;/g, "\\;")
        .replace(/,/g, "\\,")
        .replace(/\r?\n/g, "\\n");
    }
    function pad2(value) {
      return String(value).padStart(2, "0");
    }
    function dateKey(date) {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }
    function parseDate(key) {
      const [y, m, d] = key.split("-").map(Number);
      return new Date(y, m - 1, d);
    }
    function cleanDate(date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    function sameDay(a, b) {
      return dateKey(a) === dateKey(b);
    }
    function longDate(date) {
      return `${weekdays[date.getDay()]} ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
    }
    initIpucPlatform();
    async function initIpucPlatform() {
      await import("/js/member-profile.js?v=20260930-2");
      await import("/js/decom-store.js?v=20260930-1");
      await import("/js/decom-registration.js?v=20260930-1");
      await import("/js/user-account.js?v=20261005-comites-1");
      let accountRecovery = /(?:[#&])type=recovery(?:&|$)/.test(location.hash);
      const accountStyles = document.createElement("link");
      accountStyles.rel = "stylesheet"; accountStyles.href = "/css/user-account.css?v=20261003-1";
      document.head.append(accountStyles);
      const membershipStyles = document.createElement("link");
      membershipStyles.rel = "stylesheet"; membershipStyles.href = "/css/membership-decom.css?v=20260930-2";
      document.head.append(membershipStyles);
      APP_STATE.events = APP_STATE.events || {};
      APP_STATE.announcements = APP_STATE.announcements || DEFAULT_ANNOUNCEMENTS;
      APP_STATE.reflections = APP_STATE.reflections || {};
      APP_STATE.podcasts = Array.isArray(APP_STATE.podcasts) ? APP_STATE.podcasts : [];
      APP_STATE.music = APP_STATE.music || null;
      APP_STATE.musicPlaylist = Array.isArray(APP_STATE.musicPlaylist) ? APP_STATE.musicPlaylist : [];
      APP_STATE.musicPlaylistLoaded = false;
      APP_STATE.musicPlaylistLoading = false;
      APP_STATE.musicPlaylistError = "";
      APP_STATE.musicIndex = 0;
      APP_STATE.weeklySchedule = APP_STATE.weeklySchedule || null;
      APP_STATE.decomTurns = APP_STATE.decomTurns || {};
      APP_STATE.committeeLeaders = APP_STATE.committeeLeaders || [];
      APP_STATE.leaderSubmissions = APP_STATE.leaderSubmissions || [];

      const ADMIN_USER = "DECOMVILLADELRIO";
      const FIREBASE_CLOUD = {
        firebaseConfig: {
          apiKey: "AIzaSyBPUBakK4nZUNchM2S_G5PlGnqdAZq0gVc",
          authDomain: "cronograma-f28f0.firebaseapp.com",
          projectId: "cronograma-f28f0",
          storageBucket: "cronograma-f28f0.firebasestorage.app",
          messagingSenderId: "1089267436832",
          appId: "1:1089267436832:web:dc87e170e1fd1762769b45",
          measurementId: "G-4MGX6X2Q6K"
        },
        adminUsername: ADMIN_USER,
        adminEmail: "decomvilladelrio@gmail.com",
        adminEmails: ["decomvilladelrio@gmail.com", "estebanarango1499@gmail.com"],
        decomEmails: ["decomvilladelrio@gmail.com", "estebanarango1499@gmail.com"],
        sdkVersion: "12.14.0"
      };
      const SUPABASE_CONFIG = {
        url: "https://btgdhddlxqwezdzvngmg.supabase.co",
        publishableKey: "sb_publishable_eDbPEZm-oCqSa73Ap8tAyw_vm1qFIZV",
        storageBucket: "event-media",
        leaderBucket: "leader-submissions",
        driveFunction: "drive-upload"
      };
      const MUSIC_DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1TQTIz_Vi7BN8CMkBIIMp2U98GF7dnbs6";
      // Public playback manifest for the single Música IPUC Villa del Río
      // folder. It keeps the player working while the admin OAuth connection
      // is being reauthorized, without copying audio outside Drive.
      const DIRECT_DRIVE_MUSIC = [
        ["1iCfe4fchn3DY_EVjtUgMf2NFFUYWRICK", "Exaltado — Quién como Él"],
        ["14RmpghYez-Qy51s1har7HGkP415lWy3t", "Linaje — Ministerio"],
        ["1eiPhRhI3zVzR9Gf5VVxH_ZlSQMIZqIG9", "Medley Oh Alma Mía y Acude"],
        ["1GhiVtPJ6A9vWCO16NnGgp2mWlHcGH_9X", "Mokara — Sin Ti Me Muero"],
        ["13QRM2EJ-7o3yjeD9LUdQZJUn45upB8Eb", "Mokara — Padre Mío"],
        ["1PaF_2e15vfZ5bzxAtR5LX8g7TbGheuI7", "Mokara — Te Esperaré"],
        ["1C8Fg4PhUh2lVgs-4SaWzegYfJJ4u-RlC", "Mokara — Tu Nombre"],
        ["1Z2Etm2KTisExNUv1hUbSDJ4dfUKgMoNX", "Te levantaré"],
        ["12DKGpBMpN1B0XNoQr21X2sbfzTxBETd_", "Tu nombre — Coro Distrito Dos"],
        ["1EOGx9z2DDqNr_rhPnmefVA8oxovNM3ja", "Tú Eres Todo"],
        ["1soYAIghsOlxBZpEpqWBiOcv7Yz8nkN1L", "Un Corazón — Otra Vez"]
      ].map(([id, name]) => ({
        id,
        name,
        audioUrl: `https://btgdhddlxqwezdzvngmg.supabase.co/functions/v1/drive-upload/music?id=${encodeURIComponent(id)}`
      }));
      const cloud = {
        enabled: false,
        ready: false,
        storageReady: false,
        driveReady: false,
        driveError: "",
        leaderStorageReady: false,
        storageError: "",
        leaderStorageError: "",
        error: "",
        user: null,
        app: null,
        auth: null,
        db: null,
        storage: null,
        authMod: null,
        supabaseModule: null,
        dbMod: null,
        storageMod: null,
        unsubscribers: [],
        decomUnsubscribe: null,
        privateUnsubscribers: []
      };
      let liveVisitorsChannel = null;
      const BASE_TIMES = {
        culto: "7:00 p. m.",
        oracion: "6:00 p. m.",
        vigilia: "7:00 p. m.",
        ayuno: "7:00 a. m.",
        domingo: "10:00 a. m."
      };
      const DAY_BASE = {
        0: { type: "culto", title: "Culto dominical", department: "Pastoral" },
        2: { type: "culto", title: "Culto congregacional", department: "Pastoral" },
        4: { type: "culto", title: "Culto de oracion y enseñanza", department: "Pastoral" },
        6: { type: "culto", title: "Culto congregacional", department: "Pastoral" }
      };
      const REFLECTIONS = [
        { text: "La unidad se cuida con amor, servicio y una fe encendida en el nombre de Jesus.", ref: "Efesios 4:5", style: "amanecer" },
        { text: "Cada dia es una oportunidad para caminar firmes, sencillos y llenos del Espiritu.", ref: "Hechos 2:46", style: "luz" },
        { text: "La iglesia avanza cuando todos servimos con gozo y un mismo sentir.", ref: "Filipenses 2:2", style: "montanas" },
        { text: "La oracion abre caminos cuando el pueblo se reune con fe y perseverancia.", ref: "Hechos 4:31", style: "noche" },
        { text: "Dios fortalece al que espera en El y renueva su animo para servir.", ref: "Isaias 40:31", style: "naturaleza" }
      ];
      const DAILY_VERSES = [
        { text: "Lámpara es á mis pies tu palabra, y lumbrera á mi camino.", ref: "Salmo 119:105" },
        { text: "Jehová es mi pastor; nada me faltará.", ref: "Salmo 23:1" },
        { text: "La paz os dejo, mi paz os doy: no como el mundo la da, yo os la doy.", ref: "Juan 14:27" },
        { text: "Todo lo puedo en Cristo que me fortalece.", ref: "Filipenses 4:13" },
        { text: "Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.", ref: "Salmo 46:1" },
        { text: "Fíate de Jehová de todo tu corazón, y no estribes en tu prudencia.", ref: "Proverbios 3:5" },
        { text: "Echando toda vuestra solicitud en él, porque él tiene cuidado de vosotros.", ref: "1 Pedro 5:7" },
        { text: "Venid á mí todos los que estáis trabajados y cargados, que yo os haré descansar.", ref: "Mateo 11:28" },
        { text: "Esforzaos y cobrad ánimo; no temáis, ni tengáis miedo de ellos: que Jehová tu Dios es el que va contigo.", ref: "Deuteronomio 31:6" },
        { text: "Encomienda á Jehová tu camino, y espera en él; y él hará.", ref: "Salmo 37:5" },
        { text: "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.", ref: "Mateo 6:33" },
        { text: "Y todo lo que hacéis, hacedlo de ánimo, como al Señor, y no á los hombres.", ref: "Colosenses 3:23" },
        { text: "No temas, que yo soy contigo; no desmayes, que yo soy tu Dios que te esfuerzo.", ref: "Isaías 41:10" },
        { text: "Porque donde están dos ó tres congregados en mi nombre, allí estoy en medio de ellos.", ref: "Mateo 18:20" }
      ];
      const DECOM_YEAR = 2026;
      const DECOM_MONTHS = months.map((_, index) => index);
      const DECOM_STATUSES = ["Pendiente", "Confirmado", "Cubierto", "Sin asignar", "Cambio solicitado"];
      const RESOURCE_BUCKET_URL = "https://elon-file.s3.us-east-1.amazonaws.com";
      const RESOURCE_ROOT_PREFIX = "Elon/descargas/";
      const RESOURCE_LOOSE_FILES_PATH = "__documentos_sueltos__";
      const DRIVE_RESOURCE_FOLDER_URL = "https://drive.google.com/drive/folders/1-0RjZH6aagkQu0t9dys9qY4vbK6pX88P?usp=drive_link";
      const DRIVE_RESOURCE_ITEMS = [
        ["infografías_bíblicasdel_antiguo_y_nuevo_testamento_comprimido.pdf", "Biblias ilustradas/Infografías bíblicas", 59125158, "https://drive.google.com/file/d/1-jzJb_AMazLvIJHu4oinfpn4NBCn2qO2/view?usp=drivesdk"],
        ["Esquemas de la Biblia Nuevo Testamento.pdf", "Esquemas bíblicos/Nuevo Testamento", 19013952, "https://drive.google.com/file/d/1-9ax036FQQQJP7C9c5CKJ_DTFJLD3hu_/view?usp=drivesdk"],
        ["Los_Personajes_de_la_Biblia_en_un_Vistazo_Fichas_Referencia_28_Personajes.pdf", "Biblias ilustradas/Personajes de la Biblia", 23637783, "https://drive.google.com/file/d/1-uGbQoZ-950thfy-nmRIXtSm5fUg41br/view?usp=drivesdk"],
        ["Esquemas de la Biblia Antiguo Testamento.pdf", "Esquemas bíblicos/Antiguo Testamento", 28072582, "https://drive.google.com/file/d/1-5m6coo5mif5Z82oZ0gldvXjqBJ1U7_1/view?usp=drivesdk"],
        ["Esquemas Mentales de la Biblia - Nuevo Testamento.pdf", "Esquemas bíblicos/Nuevo Testamento", 17571709, "https://drive.google.com/file/d/1-AptQIgMN18jdk6w0YYyxajDVDFFwJgp/view?usp=drivesdk"],
        ["Esquemas_Mentales_de_la_Biblia_Antiguo_Testamento2_compressed.pdf", "Esquemas bíblicos/Antiguo Testamento", 12634276, "https://drive.google.com/file/d/1-SCHxyGOHJ_7yIZNpqsvVZDtXO4Sqzpe/view?usp=drivesdk"],
        ["Fichasdelabiblia.pdf", "Biblias ilustradas/Fichas de la Biblia", 5467283, "https://drive.google.com/file/d/1-Sf1KcX2FZAVCce__PRcuPPdvgFWFdDZ/view?usp=drivesdk"],
        ["Libro_por_libro_desglose_de_la_Biblia_Antiguo_Testamento_Teach_Sunday.pdf", "Estudios y guías/Libro por libro · Antiguo Testamento", 17983059, "https://drive.google.com/file/d/1-kksKRJi0GNGdNH8wNaDl_3ihxzqGfTD/view?usp=drivesdk"],
        ["Los libros de la Biblia en un vistazo (p).pdf", "Biblias ilustradas/Los libros de la Biblia", 30351417, "https://drive.google.com/file/d/1-o9QafzeaqCbtyxdMOCDPp1oeunGCdwE/view?usp=drivesdk"],
        ["Libro_por_libro_desglose_de_la_Biblia_Nuevo_Testamento_Teach_Sunday.pdf", "Estudios y guías/Libro por libro · Nuevo Testamento", 14922687, "https://drive.google.com/file/d/1-o6wizeK97zp-vKkg4HJAkxreZGODrK-/view?usp=drivesdk"],
        ["La_Biblia_en_Acción_La_Historia_Redentora_de_Dios_Español.pdf", "Biblias de estudio/La Biblia en Acción", 652345057, "https://drive.google.com/file/d/10I1UOKBK1aLt1t1IxprW6JXer9oTLXA2/view?usp=drivesdk"],
        ["gran_diccionario_enciclopédico_de_imágenes_símbolos_de_la_biblia.pdf", "Biblias ilustradas/Diccionario visual de la Biblia", 12291537, "https://drive.google.com/file/d/10Hgu7sF6b0jmj58_sJO-IpLGH72SHxh5/view?usp=drivesdk"],
        ["Los_libros_de_la_Biblia_Explicados_en_Gráficos_Antiguo_Testamento.pdf", "Esquemas bíblicos/Antiguo Testamento", 14975387, "https://drive.google.com/file/d/10SZrlZSIGjBOA_TwqOUfzVSD9neGvqBG/view?usp=drivesdk"],
        ["Biblia Completa Ilustrada.pdf", "Biblias ilustradas/Biblia completa ilustrada", 65677150, "https://drive.google.com/file/d/10DbDGyqjkpJ_bVLQ1u7kkKbkreoeQAim/view?usp=drivesdk"],
        ["LOS LIBROS DE LA BIBLIA EXPLICADOS EN GRAFICOS NUEVO TESTAMENTO.pdf", "Esquemas bíblicos/Nuevo Testamento", 16210520, "https://drive.google.com/file/d/10PQCEeeg3TUT14Uu3UMN2sALjMQbkM5I/view?usp=drivesdk"],
        ["Manual_para_entender_versículos_difíciles_de_la_Biblia_Josh_y_Sean.pdf", "Estudios y guías/Versículos difíciles", 7982261, "https://drive.google.com/file/d/10TGVBubMLLFeG4QpuqbKLGU-QyjGqFqW/view?usp=drivesdk"],
        ["La biblia en su contexto.pdf", "Estudios y guías/La Biblia en su contexto", 1381347, "https://drive.google.com/file/d/10H_CJCbzv4vN21ZNSeWKLpCWrmcMeVtB/view?usp=drivesdk"],
        ["Vol.01 - Los Siete sellos de Apocalipsis.pdf", "Apocalipsis y material especial/Siete sellos de Apocalipsis", 6722521, "https://drive.google.com/file/d/10ZCildvmWk3LQIvJTa13aoUJs081QxdN/view?usp=drivesdk"],
        ["Vol.02- Los Siete sellos de Apocalipsis 1.pdf", "Apocalipsis y material especial/Siete sellos de Apocalipsis", 6359373, "https://drive.google.com/file/d/10YwUvhcuNeug-HcXkmu8DX3qTDnYgYXX/view?usp=drivesdk"],
        ["Atlas de la biblia selecciones de Reader_s Digest.pdf", "Biblias ilustradas/Atlas bíblico", 63591043, "https://drive.google.com/file/d/10at4KJbswiWNc8nPfobzh_GTRqZFykJ9/view?usp=drivesdk"],
        ["Biblia de Estudio Esquematizada Reina Valera .pdf", "Biblias de estudio/Biblia de estudio esquematizada", 51828845, "https://drive.google.com/file/d/10fTDg2xnCGxRsyywX5TFMnmFO56hdGoF/view?usp=drivesdk"],
        ["Guía_esencial_de_la_Biblia_Caminando_a_través_de_los_66_libros_1.pdf", "Estudios y guías/Guía esencial de la Biblia", 41009955, "https://drive.google.com/file/d/10fvHlUMVSzEtDRva3v1KJvP4xllVnUC9/view?usp=drivesdk"],
        ["LBEA Parte 1.pdf", "Biblias de estudio/La Biblia en Acción", 101274373, "https://drive.google.com/file/d/10jJa-uKonhNpy1TcJmz63Uhd_ZnZmnF_/view?usp=drivesdk"],
        ["LBEA Parte 2.pdf", "Biblias de estudio/La Biblia en Acción", 102360795, "https://drive.google.com/file/d/10jz_3BWqywsjs8nfpCQ7UVV5xXXA6cfQ/view?usp=drivesdk"],
        ["LBEA Parte 3.pdf", "Biblias de estudio/La Biblia en Acción", 98425337, "https://drive.google.com/file/d/10rQMstdiwcslG2FJGZAywXtyiJ9FyI10/view?usp=drivesdk"],
        ["LBEA Parte 4.pdf", "Biblias de estudio/La Biblia en Acción", 100144899, "https://drive.google.com/file/d/10vCvnlKHm0M6IFKpGcuFkcQU1JTDxreA/view?usp=drivesdk"],
        ["LBEA Parte 5.pdf", "Biblias de estudio/La Biblia en Acción", 100305502, "https://drive.google.com/file/d/10vuzs4WYgR23ezHeP_go2hLX9w-KDHPm/view?usp=drivesdk"],
        ["LBEA Parte 6.pdf", "Biblias de estudio/La Biblia en Acción", 101206870, "https://drive.google.com/file/d/117Ys9cg56vt5bJMV1ni53CMNsDmfUP5e/view?usp=drivesdk"],
        ["LBEA Parte 7.pdf", "Biblias de estudio/La Biblia en Acción", 12276727, "https://drive.google.com/file/d/11B1Yxxd_yso4Rg1vJGeIC4CbOEgywO_F/view?usp=drivesdk"]
      ];
      const DECOM_MEMBERS = [
        {
          name: "Esteban Arango",
          specificDates: [
            "2026-07-21", "2026-07-28", "2026-07-30",
            "2026-08-06", "2026-08-08", "2026-08-15", "2026-08-16", "2026-08-25",
            "2026-09-03", "2026-09-12", "2026-09-13", "2026-09-20", "2026-09-22", "2026-09-29",
            "2026-10-01", "2026-10-08", "2026-10-10", "2026-10-17", "2026-10-18", "2026-10-27",
            "2026-11-05", "2026-11-14", "2026-11-15", "2026-11-22", "2026-11-24",
            "2026-12-01", "2026-12-03", "2026-12-10", "2026-12-12", "2026-12-19", "2026-12-20", "2026-12-29"
          ]
        },
        { name: "Francisca Coderque", weekdays: [4, 6, 0] },
        { name: "Sara Arango", weekdays: [2, 6] },
        { name: "Sofía Henao", weekdays: [6, 0] },
        { name: "Angelo Pérez", weekdays: [4, 6, 0] },
        { name: "Ángel Fragozo", weekdays: [2, 4] },
        { name: "Ana Sofía", weekdays: [0] },
        { name: "Sebastián Sepúlveda", weekdays: [2, 4, 6, 0] }
      ];

      const platform = {
        calendarDate: cleanDate(new Date()),
        agendaMonth: cleanDate(new Date()).getMonth(),
        decomMonth: cleanDate(new Date()).getMonth(),
        decomSelectedDate: dateKey(cleanDate(new Date())),
        calendarView: "mes",
        tag: "todos",
        search: "",
        resourceSearch: "",
        resourcePath: "",
        podcastCategory: "Todos",
        podcastSearch: "",
        memberSearch: "",
        memberStatusFilter: "todos",
        memberSkillFilter: "todos",
        resourceItems: [],
        resourcesLoaded: false,
        resourcesLoading: false,
        resourcesError: "",
        selectedAdminEvent: "__new__",
        selectedPodcast: null,
        adminSection: "eventos",
        members: [],
        memberAttendance: [],
        memberCard: null
      };

      const MEMBERSHIP_COMMITTEES = ["Junta Local", "Red de Familia", "Caballeros", "Damas Dorcas", "DECOM", "Jóvenes", "Recepción", "Música", "Sonido", "Misiones", "Evangelismo", "Escuela Dominical", "Edad Dorada"];

      installPlatformStyles();
      document.body.classList.add("platform-body");
      const shell = document.querySelector("main.app");
      shell.className = "platform-shell";
      shell.innerHTML = `
        <div class="site-loader" data-site-loader role="status" aria-live="polite">
          <div class="site-loader-scene" aria-hidden="true">
            <div class="site-loader-book">
              <div class="site-loader-cover site-loader-cover-back"></div>
              <div class="site-loader-pages site-loader-pages-left"><i></i><i></i><i></i></div>
              <div class="site-loader-pages site-loader-pages-right"><i></i><i></i><i></i></div>
              <div class="site-loader-page-flip site-loader-page-flip-one"></div>
              <div class="site-loader-page-flip site-loader-page-flip-two"></div>
              <div class="site-loader-page-flip site-loader-page-flip-three"></div>
              <div class="site-loader-binding"></div>
              <div class="site-loader-cover site-loader-cover-front"><span class="site-loader-cover-rule"></span><strong>BIBLIA</strong><small>IPUC</small></div>
            </div>
            <span class="site-loader-light"></span>
          </div>
          <div class="site-loader-copy"><strong>IPUC Villa del Río</strong><span>Abriendo un espacio para crecer juntos</span></div>
        </div>
        <div class="site-video-backdrop" aria-hidden="true"><span></span></div>
        <a class="skip-link" href="#routeView">Saltar al contenido</a>
        <button class="nav-backdrop" type="button" data-nav-backdrop aria-label="Cerrar menú" tabindex="-1" hidden></button>
        <header class="platform-top glass">
          <a class="platform-brand" href="/" aria-label="Inicio IPUC Villa del Río">
            <img src="/assets/ipuc-villa-del-rio-brand.png" alt="IPUC Villa del Río · Distrito 4">
          </a>
          <button class="nav-toggle" type="button" data-toggle-nav aria-expanded="false" aria-controls="platformNav" aria-label="Abrir menú">Menú</button>
          <nav class="platform-nav" id="platformNav" aria-label="Navegación principal">
            <a href="/" data-route-link="inicio">Inicio</a>
            <a href="/anuncios" data-route-link="anuncios">Anuncios</a>
            <a href="/podcast" data-route-link="podcast">Historias que Edifican</a>
            <a href="/recursos" data-route-link="recursos">Recursos</a>
            <a href="/membresia" data-route-link="membresia">Membresía</a>
            <a href="/ubicacion" data-route-link="ubicacion">Ubicación</a>
            <a href="/admin" data-login-link hidden aria-hidden="true">Administración</a>
          </nav>
          <a class="platform-account-link" href="/cuenta/" data-account-nav aria-label="Abrir mi cuenta">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.4"></circle><path d="M5.5 19c.8-3 3-4.5 6.5-4.5s5.7 1.5 6.5 4.5"></path></svg>
            <span data-account-label>Iniciar sesión</span>
          </a>
          <a class="platform-schedule-link" href="/calendario" data-route-link="calendario" aria-label="Abrir Cronograma">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4.5" width="18" height="16" rx="2"></rect><path d="M8 3v4M16 3v4M3 9h18M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01"></path></svg>
            <span>Cronograma</span>
          </a>
        </header>
        <section id="routeView" class="route-view" tabindex="-1"></section>
        <footer class="platform-footer glass">
          <span><strong>IPUC Villa del Río</strong><small>Un lugar para mantenernos conectados.</small></span>
          <a href="/calendario">Ver calendario</a>
          <a href="/instalar/" target="_self">Instalar app</a>
        </footer>
        <div class="media-layer" id="platformMedia" aria-hidden="true"></div>
        <div class="upload-progress" id="uploadProgress" hidden role="status" aria-live="polite"><div class="upload-progress-head"><strong data-upload-progress-label>Preparando archivo…</strong><b data-upload-progress-percent>0%</b></div><div class="upload-progress-track"><span data-upload-progress-bar></span></div><small data-upload-progress-detail></small></div>
        <aside class="music-widget" aria-label="Control de música">
          <span class="music-wave music-wave-one" aria-hidden="true"></span>
          <span class="music-wave music-wave-two" aria-hidden="true"></span>
          <span class="music-wave music-wave-three" aria-hidden="true"></span>
          <button id="musicToggle" class="music-toggle" type="button" aria-label="Reproducir música">▶</button>
          <span class="music-sr-status" aria-live="polite"><i id="musicStatusDot"></i><span id="musicStatus">Cargando lista…</span><span id="musicTrackTitle">Preparando música</span><span id="musicTrackCounter">—</span></span>
          <audio id="churchMusicAudio" preload="metadata" playsinline></audio>
        </aside>
      `;

      const nav = document.getElementById("platformNav");
      const navToggle = document.querySelector("[data-toggle-nav]");
      const navBackdrop = document.querySelector("[data-nav-backdrop]");
      const platformHeader = document.querySelector(".platform-top");
      const navInertRegions = [view(), document.querySelector(".platform-footer"), document.querySelector(".music-widget")].filter(Boolean);
      const setNavOpen = (open, { focusFirst = false, restoreFocus = false } = {}) => {
        nav?.classList.toggle("open", open);
        platformHeader?.classList.toggle("menu-open", open);
        navToggle?.setAttribute("aria-expanded", String(open));
        navToggle?.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
        if (navBackdrop) { navBackdrop.classList.remove("is-visible"); navBackdrop.hidden = true; }
        navInertRegions.forEach(region => { region.inert = open; });
        document.body.classList.toggle("nav-open", open);
        if (focusFirst && open) requestAnimationFrame(() => (nav?.querySelector('[aria-current="page"]') || nav?.querySelector("a"))?.focus({ preventScroll: true }));
        if (restoreFocus && !open) navToggle?.focus({ preventScroll: true });
      };
      navToggle?.addEventListener("click", () => { const opening = !nav?.classList.contains("open"); setNavOpen(opening, { focusFirst: opening, restoreFocus: !opening }); });
      nav?.addEventListener("click", event => { if (event.target.closest("a")) setNavOpen(false); });
      document.addEventListener("pointerdown", event => {
        if (!nav?.classList.contains("open") || platformHeader?.contains(event.target)) return;
        setNavOpen(false);
      });
      document.addEventListener("keydown", event => { if (event.key === "Escape" && nav?.classList.contains("open")) setNavOpen(false, { restoreFocus: true }); });
      window.addEventListener("hashchange", renderRoute);
      window.addEventListener("popstate", renderRoute);
      document.addEventListener("click", event => {
        const link = event.target.closest("a[href]");
        if (!link || link.target || link.origin !== location.origin) return;
        const href = link.getAttribute("href");
        if (href?.startsWith("#/")) {
          event.preventDefault();
          history.pushState({}, "", href.slice(1) || "/");
          window.scrollTo({ top: 0, left: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
          renderRoute();
          focusRouteHeading();
        } else if (href?.startsWith("/")) {
          event.preventDefault();
          history.pushState({}, "", href);
          window.scrollTo({ top: 0, left: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
          renderRoute();
          focusRouteHeading();
        }
      });
      window.addEventListener("ipuc-state-updated", renderRoute);
      if ("serviceWorker" in navigator) navigator.serviceWorker.register("/service-worker.js?v=20261003-mobile-1").catch(() => {});
      setupSiteLoader();
      setupChurchMusic();
      loadDriveMusic();
      const resumeMusicAfterInteraction = () => {
        if (parseRoute().name !== "inicio" || !getChurchMusicPlaylist().length) return;
        if (parseRoute().name === "inicio" && getChurchMusicPlaylist().length && document.getElementById("churchMusicAudio")?.paused) {
          startChurchMusic();
        }
        ["pointerdown", "keydown", "touchstart"].forEach(type => document.removeEventListener(type, resumeMusicAfterInteraction));
      };
      ["pointerdown", "keydown", "touchstart"].forEach(type => document.addEventListener(type, resumeMusicAfterInteraction, { passive: true }));
      const WORSHIP_SCHEDULE = [
        { day: 2, label: "Martes", time: "7:00 p. m.", title: "Reunión congregacional", note: "Un espacio para encontrarnos como familia IPUC." },
        { day: 4, label: "Jueves", time: "7:00 p. m.", title: "Reunión congregacional", note: "Un espacio para encontrarnos como familia IPUC." },
        { day: 6, label: "Sábados", time: "7:00 p. m.", title: "Reunión congregacional", note: "Un espacio para encontrarnos como familia IPUC." },
        { day: 0, label: "Domingos", time: "10:00 a. m.", title: "Reunión congregacional", note: "Un espacio para encontrarnos como familia IPUC." }
      ];
      if (location.hash.startsWith("#/")) history.replaceState({}, "", location.hash.replace(/^#\/?/, "/") || "/");
      renderRoute();
      initializeCloud();

      function renderRoute(event) {
        const requestedRoute = parseRoute();
        if (requestedRoute.name === "lideres") {
          view().innerHTML = '<section class="account-panel"><h1>Panel de líderes</h1><p role="status">Comprobando tu sesión…</p></section>';
        }
        window.AccountUI.cancel();
        if (event?.type === "hashchange") window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        refreshAdminNav();
        const accountNav = document.querySelector("[data-account-nav]");
        if (accountNav) {
          const accountLabel = accountNav.querySelector("[data-account-label]");
          if (accountLabel) accountLabel.textContent = cloud.user ? "Mi cuenta" : "Iniciar sesión";
          else accountNav.textContent = cloud.user ? "Mi cuenta" : "Iniciar sesión";
          accountNav.setAttribute("aria-label", cloud.user ? "Abrir mi cuenta" : "Iniciar sesión");
        }
        setNavOpen(false);
        const route = parseRoute();
        document.body.classList.toggle("decom-registration-mode", route.name === "membresia" && route.id === "decom");
        const pageManifest = document.querySelector('link[rel="manifest"]');
        if (pageManifest) pageManifest.href = route.name === "membresia" && route.id === "decom" ? "/membresia/decom/manifest.webmanifest" : "/manifest.webmanifest";
        if (route.name === "podcast") stopChurchMusic();
        document.body.classList.remove("stream-detail-open", "podcast-watching");
        if (route.name !== "podcast") document.querySelector(".stream-intro")?.remove();
        document.body.classList.toggle("public-inner-page", route.name !== "inicio" && !["admin", "login"].includes(route.name));
        document.body.classList.toggle("podcast-mode", route.name === "podcast");
        document.body.classList.toggle("account-mode", route.name === "cuenta");
        const routeTitles = { inicio: "Inicio", calendario: "Cronograma", anuncios: "Anuncios", podcast: "Historias que Edifican", recursos: "Recursos", membresia: "Membresía", cuenta: "Mi cuenta", lideres: "Panel de líderes", ubicacion: "Ubicación", admin: "Administración", login: "Iniciar sesión", eventos: "Eventos", archivo: "Archivo" };
        document.title = `${routeTitles[route.name] || "IPUC Villa del Río"} | IPUC Villa del Río`;
        trackLiveVisitorPage();
        updateActiveNavigation(route.name);
        let renderPage = renderHomePage;
        if (route.name === "calendario") renderPage = renderCalendarPage;
        else if (route.name === "agenda") renderPage = renderAgendaPage;
        else if (route.name === "eventos") renderPage = renderEventsPage;
        else if (route.name === "anuncios") renderPage = renderAnnouncementsPage;
        else if (route.name === "podcast") renderPage = renderPodcastPage;
        else if (route.name === "archivo") renderPage = renderArchivePage;
        else if (route.name === "recursos") renderPage = renderResourcesPage;
        else if (route.name === "ubicacion") renderPage = renderLocationPage;
        else if (route.name === "membresia") renderPage = route.id === "decom" ? renderDecomRegistration : renderMembershipPage;
        else if (route.name === "cuenta") renderPage = renderUserAccountPage;
        else if (route.name === "evento") renderPage = () => renderEventDetail(route.id);
        if (route.name === "admin") {
          if (isAdmin()) renderPage = renderAdminPage;
          else renderPage = cloud.user ? renderRestrictedAdminPage : renderLoginPage;
        }
        else if (route.name === "login") renderPage = renderLoginPage;
        else if (route.name === "lideres") renderPage = renderCommitteePage;
        try { renderPage(); }
        catch (error) {
          if (route.name !== "lideres") throw error;
          console.error("No se pudo renderizar el panel de líderes", error);
          view().innerHTML = '<section class="account-panel"><h1>Panel de líderes</h1><p role="alert">No se pudo abrir el panel. Comprueba tu conexión y vuelve a cargar la página.</p><a class="primary-link" href="/cuenta/">Volver a mi cuenta</a></section>';
        }
        // Membership entrypoints defer the existing Earth module until Home is opened.
        if (route.name === "inicio" && navigator.onLine && !document.querySelector('script[src*="earth-hero.js"]')) {
          void import("/js/earth-hero.js?v=20260913-earth-43").catch(() => {});
        }
        animateRouteView();
      }

      function focusRouteHeading() {
        const heading = view()?.querySelector("h1");
        if (!heading) return;
        if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }

      function animateRouteView() {
        const routeView = view();
        if (!routeView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          routeView?.classList.remove("is-route-entering");
          return;
        }
        routeView.classList.remove("is-route-entering");
        window.requestAnimationFrame(() => routeView.classList.add("is-route-entering"));
      }

      function renderAnnouncementsPage() {
        const items = (APP_STATE.announcements || []).filter(item => item.published !== false && (!item.expiresAt || String(item.expiresAt) >= dateKey(today))).slice().reverse();
        view().innerHTML = `<section class="page-head glass"><div><p class="eyebrow">Comunicaciones</p><h1>Anuncios</h1><p>Información importante y novedades de IPUC Villa del Río.</p></div></section><section class="announcement-page-grid">${items.map(item => `<article class="content-card glass announcement-public"><span class="status-chip">${escapeHtml(item.type || "Información")}</span><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.description || "")}</p><small>${escapeHtml(formatDateShort(item.date || item.startsAt || ""))}</small></article>`).join("") || emptyText("No hay anuncios publicados.")}</section>`;
      }

      function podcastMediaMarkup(item) {
        const media = item?.media;
        if (!media) return `<div class="podcast-empty-media"><span>🎙️</span><small>Próximamente</small></div>`;
        if (media.type === "youtube") {
          const source = youtubeEmbedUrl(media.url, { autoplay: true, mute: false });
          return source ? `<iframe src="${source}" title="${escapeHtml(item.title || "Historias que Edifican")}" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>` : "";
        }
        // Drive entrega los videos con Content-Disposition: attachment. Ese
        // enlace sirve para descargar, pero no para que un elemento <video>
        // lo reproduzca dentro de la página. El visor de Drive sí soporta
        // streaming, controles y rangos para archivos grandes.
        if (isVideo(media) && driveFileId(media)) {
          const source = `https://drive.google.com/file/d/${encodeURIComponent(driveFileId(media))}/preview?autoplay=1`;
          return `<iframe src="${source}" title="${escapeHtml(item.title || "Historias que Edifican")}" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
        }
        if (isVideo(media)) return `<video controls playsinline preload="metadata" ${item.cover && assetSource(item.cover, "display") ? `poster="${escapeHtml(assetSource(item.cover, "display"))}"` : ""} src="${escapeHtml(assetSource(media))}"></video>`;
        if (isAudio(media)) return `<div class="podcast-audio-box"><span>▶</span><audio controls preload="metadata" src="${escapeHtml(assetSource(media))}"></audio></div>`;
        return `<div class="podcast-empty-media"><span>📁</span><small>Archivo disponible</small></div>`;
      }

      function renderPodcastPage() {
        const localPreview = Array.isArray(window.IPUC_LOCAL_PODCAST_PREVIEW) ? window.IPUC_LOCAL_PODCAST_PREVIEW : [];
        const existingPodcastIds = new Set((APP_STATE.podcasts || []).map(item => String(item.id)));
        const all = [...(APP_STATE.podcasts || []), ...localPreview.filter(item => !existingPodcastIds.has(String(item.id)))]
          .filter(item => item.published !== false)
          .sort((a, b) => Number(Boolean(b.localPreview)) - Number(Boolean(a.localPreview)) || String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
        const featured = all.find(item => item.localPreviewFeatured) || all.find(item => item.featured) || all[0];
        const categories = [...new Set(all.map(item => String(item.category || "").trim()).filter(Boolean))];
        const localTestimonials = all.filter(item => item.localPreview);
        const documentary = item => /documental|pel[ií]cula|largometraje/i.test([item?.title, item?.description, item?.media?.name].filter(Boolean).join(" "));
        const attr = value => escapeHtml(value).replace(/"/g, "&quot;").replace(/'/g, "&#39;");
        const imageFor = item => {
          const cover = item?.cover && assetSource(item.cover, "display");
          const driveId = item?.media && driveFileId(item.media);
          return cover || (driveId ? `https://drive.google.com/thumbnail?id=${encodeURIComponent(driveId)}&sz=w1600` : "");
        };
        const dateFor = item => item.createdAt ? formatDateShort(String(item.createdAt).slice(0, 10)) : "";
        const card = item => {
          const image = imageFor(item);
          return `<button class="stream-card" type="button" data-podcast-open="${attr(item.id)}" data-autoplay="${item.media ? "true" : "false"}" aria-label="${item.media ? "Reproducir" : "Ver"} ${attr(item.title || "historia")}">
            <span class="stream-card-art">${image ? `<img src="${attr(image)}" alt="" loading="lazy" decoding="async">` : `<img class="stream-card-logo" src="/assets/historias-que-edifican.png" alt="" loading="lazy" decoding="async">`}${item.duration ? `<span class="stream-card-duration">${escapeHtml(item.duration)}</span>` : ""}<span class="stream-card-play" aria-hidden="true">▶</span></span>
            <span class="stream-card-title">${escapeHtml(item.title || "Historias que Edifican")}</span>
            <span class="stream-card-meta">${[item.category, dateFor(item)].filter(Boolean).map(escapeHtml).join(" · ")}</span>
          </button>`;
        };
        const row = (title, items, id) => !items.length ? "" : `<section class="stream-row" id="${id}" aria-labelledby="${id}-title"><div class="stream-row-head"><h2 id="${id}-title">${title}</h2>${items.length > 4 ? `<div class="stream-row-actions"><button type="button" data-rail="${id}" data-direction="-1" aria-label="Desplazar ${title} a la izquierda">‹</button><button type="button" data-rail="${id}" data-direction="1" aria-label="Desplazar ${title} a la derecha">›</button></div>` : ""}</div><div class="stream-rail" data-rail-id="${id}">${items.map(card).join("")}</div></section>`;
        const heroImage = imageFor(featured);
        view().innerHTML = `<div class="podcast-stream">
          <header class="stream-nav" data-stream-nav><a class="stream-brand" href="#stream-top" aria-label="Historias que Edifican, inicio"><img src="/assets/historias-que-edifican.png" alt="Historias que Edifican"></a>
            <nav class="stream-links" aria-label="Navegación de Historias que Edifican"><a href="#stream-top" aria-current="page">Inicio</a><a href="#stream-all">Catálogo</a></nav>
            <button class="stream-search-toggle" type="button" data-stream-search-toggle aria-label="Buscar historias" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg><span>Buscar</span></button>
            <a class="stream-back" href="/">Volver a IPUC <span aria-hidden="true">↗</span></a>
            <details class="stream-mobile-menu"><summary aria-label="Abrir menú de historias">☰</summary><nav aria-label="Navegación móvil"><a href="#stream-top">Inicio</a><a href="#stream-all">Catálogo</a><a href="/">Volver a IPUC</a></nav></details>
          </header>
          <div class="stream-search-panel" data-stream-search-panel hidden><label for="streamSearch">Buscar historias</label><input id="streamSearch" type="search" data-podcast-search placeholder="Título, tema o descripción" value="${attr(platform.podcastSearch || "")}" autocomplete="off"><span data-stream-count aria-live="polite"></span></div>
          <section class="stream-hero" id="stream-top" aria-labelledby="stream-title">${heroImage ? `<div class="stream-hero-backdrop" style="background-image:url('${attr(heroImage)}')"></div><img class="stream-hero-image" src="${attr(heroImage)}" alt="" decoding="async">` : ""}
            <div class="stream-hero-content"><p class="stream-kicker">${featured ? (documentary(featured) ? "DOCUMENTAL DESTACADO" : /testimonio/i.test(featured.category || "") ? "TESTIMONIO DESTACADO" : "HISTORIA DESTACADA") : "IPUC VILLA DEL RÍO"}</p><h1 id="stream-title">${escapeHtml(featured?.title || "Historias que Edifican")}</h1><p class="stream-hero-description">${escapeHtml(featured?.description || "Historias de fe para ver, escuchar y compartir.")}</p>
              ${featured ? `<p class="stream-hero-meta">${[featured.category, dateFor(featured), featured.duration].filter(Boolean).map(escapeHtml).join(" <span aria-hidden=\"true\">·</span> ")}</p><div class="stream-hero-actions">${featured.media ? `<button class="stream-primary" type="button" data-podcast-open="${attr(featured.id)}" data-autoplay="true"><span aria-hidden="true">▶</span> Reproducir</button>` : ""}<button class="stream-secondary" type="button" data-podcast-open="${attr(featured.id)}">Más información</button></div>` : ""}
            </div><div class="stream-watch" data-stream-watch hidden><button class="stream-watch-back" type="button" data-stream-stop aria-label="Volver al catálogo">← <span>Volver</span></button><div class="stream-watch-media" data-stream-watch-media></div></div></section>
          <section class="stream-catalog" id="stream-catalog" aria-label="Catálogo de historias">${all.length ? `${localTestimonials.length ? row("Testimonios", localTestimonials, "stream-testimonials") : all.length > 1 ? row("Últimos estrenos", all.slice(0, 12), "stream-latest") : ""}${all.some(item => item.featured) && all.length > 1 ? row("Historias destacadas", all.filter(item => item.featured), "stream-featured") : ""}${row(all.length === 1 ? (documentary(all[0]) ? "Documentales" : "Historias") : "Todo el contenido", all, "stream-all")}${categories.length > 1 ? `<div class="stream-categories" aria-label="Filtrar por categoría"><button type="button" class="active" data-podcast-category="Todos">Todos</button>${categories.map(category => `<button type="button" data-podcast-category="${attr(category)}">${escapeHtml(category)}</button>`).join("")}</div>` : ""}` : `<div class="stream-empty"><img src="/assets/historias-que-edifican.png" alt=""><h2>Próximamente</h2><p>Las historias publicadas aparecerán aquí.</p></div>`}<p class="stream-no-results" data-stream-no-results hidden>No encontramos historias con esa búsqueda.</p></section>
          <dialog class="stream-dialog" data-stream-dialog aria-label="Información de la historia"><button class="stream-dialog-close" type="button" data-stream-close aria-label="Cerrar información">×</button><div data-stream-detail></div></dialog>
        </div>`;
        const root = view().querySelector(".podcast-stream");
        const dialog = root.querySelector("[data-stream-dialog]");
        const detail = root.querySelector("[data-stream-detail]");
        const hero = root.querySelector(".stream-hero");
        const watch = root.querySelector("[data-stream-watch]");
        const stopPlayback = () => {
          watch.querySelector("[data-stream-watch-media]").replaceChildren();
          watch.hidden = true;
          hero.classList.remove("is-playing");
          document.body.classList.remove("podcast-watching");
          root.querySelector(".stream-hero-actions [data-autoplay]")?.focus({ preventScroll: true });
        };
        const playEpisode = item => {
          if (!item.media) return;
          if (dialog.open) dialog.close();
          watch.querySelector("[data-stream-watch-media]").innerHTML = podcastMediaMarkup(item);
          watch.setAttribute("aria-label", `Reproduciendo ${item.title || "Historia que Edifica"}`);
          watch.hidden = false;
          hero.classList.add("is-playing");
          document.body.classList.add("podcast-watching");
          window.scrollTo({ top: 0, behavior: "instant" });
          watch.querySelector("audio,video")?.play().catch(() => {});
          watch.querySelector("[data-stream-stop]").focus({ preventScroll: true });
        };
        const openEpisode = item => {
          const image = imageFor(item);
          const related = all.filter(entry => String(entry.id) !== String(item.id)).slice(0, 8);
          detail.innerHTML = `<div class="stream-detail-art">${image ? `<img src="${attr(image)}" alt="">` : `<img class="stream-detail-logo" src="/assets/historias-que-edifican.png" alt="">`}</div><div class="stream-detail-copy"><p class="stream-kicker">${documentary(item) ? "DOCUMENTAL" : "HISTORIAS QUE EDIFICAN"}</p><h2>${escapeHtml(item.title || "Historias que Edifican")}</h2><p class="stream-detail-meta">${[item.category, dateFor(item), item.duration, item.guest].filter(Boolean).map(escapeHtml).join(" · ")}</p><p>${escapeHtml(item.description || "")}</p>${item.media ? `<button class="stream-primary" type="button" data-stream-play>▶ Reproducir</button>` : ""}</div>${related.length ? `<div class="stream-related">${row("También puedes ver", related, "stream-related")}</div>` : ""}`;
          if (!dialog.open) dialog.showModal();
          document.body.classList.add("stream-detail-open");
          const playButton = detail.querySelector("[data-stream-play]");
          if (playButton) playButton.onclick = () => playEpisode(item);
        };
        root.addEventListener("click", event => {
          const opener = event.target.closest("[data-podcast-open]");
          if (opener) { const item = all.find(entry => String(entry.id) === opener.dataset.podcastOpen); if (item) opener.dataset.autoplay === "true" ? playEpisode(item) : openEpisode(item); return; }
          if (event.target.closest("[data-stream-stop]")) { stopPlayback(); return; }
          if (event.target.closest("[data-stream-close]")) dialog.close();
          const railButton = event.target.closest("[data-rail]");
          if (railButton) root.querySelector(`[data-rail-id="${railButton.dataset.rail}"]`)?.scrollBy({ left: Number(railButton.dataset.direction) * 620, behavior: "smooth" });
          const searchButton = event.target.closest("[data-stream-search-toggle]");
          if (searchButton) { const panel = root.querySelector("[data-stream-search-panel]"); panel.hidden = !panel.hidden; searchButton.setAttribute("aria-expanded", String(!panel.hidden)); if (!panel.hidden) panel.querySelector("input")?.focus(); }
          const categoryButton = event.target.closest("[data-podcast-category]");
          if (categoryButton) { platform.podcastCategory = categoryButton.dataset.podcastCategory; root.querySelectorAll("[data-podcast-category]").forEach(button => button.classList.toggle("active", button === categoryButton)); filterCards(); }
          if (event.target.closest(".stream-mobile-menu a")) root.querySelector(".stream-mobile-menu").open = false;
        });
        dialog.addEventListener("close", () => { detail.innerHTML = ""; document.body.classList.remove("stream-detail-open"); });
        dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
        root.addEventListener("keydown", event => { if (event.key === "Escape") { root.querySelector(".stream-mobile-menu").open = false; if (!watch.hidden) stopPlayback(); } });
        const filterCards = () => {
          const term = String(platform.podcastSearch || "").trim().toLocaleLowerCase("es");
          const category = platform.podcastCategory || "Todos";
          let visible = 0;
          root.querySelectorAll(".stream-rail .stream-card").forEach(button => {
            const item = all.find(entry => String(entry.id) === button.dataset.podcastOpen);
            const text = `${item?.title || ""} ${item?.description || ""} ${item?.category || ""} ${item?.guest || ""}`.toLocaleLowerCase("es");
            button.hidden = (category !== "Todos" && item?.category !== category) || (term && !text.includes(term));
            if (!button.hidden) visible++;
          });
          root.querySelectorAll(".stream-row").forEach(section => { section.hidden = !section.querySelector(".stream-card:not([hidden])"); });
          root.querySelector("[data-stream-no-results]").hidden = visible > 0 || !all.length;
          root.querySelector("[data-stream-count]").textContent = `${new Set([...root.querySelectorAll('.stream-card:not([hidden])')].map(card => card.dataset.podcastOpen)).size} resultados`;
        };
        root.querySelector("[data-podcast-search]").addEventListener("input", event => { platform.podcastSearch = event.target.value; filterCards(); });
        filterCards();
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && !sessionStorage.getItem("ipuc-podcast-intro-seen")) {
          sessionStorage.setItem("ipuc-podcast-intro-seen", "1");
          const intro = document.createElement("div");
          intro.className = "stream-intro";
          intro.innerHTML = `<img src="/assets/historias-que-edifican.png" alt="Historias que Edifican"><button type="button" aria-label="Saltar introducción">Saltar intro</button>`;
          document.body.append(intro);
          let timer = window.setTimeout(() => { intro.classList.add("is-done"); window.setTimeout(() => intro.remove(), 550); }, 2300);
          intro.querySelector("button").onclick = () => { clearTimeout(timer); intro.remove(); };
        }
      }

      function renderArchivePage() {
        const items = platformEventsForYear(today.getFullYear()).filter(event => platformStatus(event) === "Realizado" || event.date < dateKey(today)).sort((a, b) => b.date.localeCompare(a.date));
        view().innerHTML = `<section class="page-head glass"><div><p class="eyebrow">Memoria</p><h1>Archivo de eventos</h1><p>Consulta invitaciones, galerías y documentos de actividades anteriores.</p></div></section><section class="event-grid archive-grid">${items.map(eventCard).join("") || emptyText("Todavía no hay eventos archivados.")}</section>`;
      }

      function renderResourcesPage() {
        const params = new URLSearchParams(location.search);
        platform.resourceSearch = params.get("buscar") ?? platform.resourceSearch ?? "";
        platform.resourceCategory = params.get("categoria") ?? platform.resourceCategory ?? "Todos";
        platform.resourceType = params.get("tipo") ?? platform.resourceType ?? "Todos";
        platform.resourceSort = params.get("orden") ?? platform.resourceSort ?? "recientes";
        platform.resourceLimit = platform.resourceLimit || 24;
        const items = platform.resourceItems || [];
        const categories = [...new Set(items.map(item => item.category || "Otros"))]
          .map(name => ({ name, count: items.filter(item => (item.category || "Otros") === name).length }))
          .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "es"));
        const formats = [...new Set(items.map(item => item.kind?.extension).filter(Boolean))].sort();
        const latest = items.filter(item => item.updatedAt).slice().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 8);
        const activeFilters = platform.resourceSearch || platform.resourceCategory !== "Todos" || platform.resourceType !== "Todos";
        const heroImage = items.find(resourceIsImage);
        const categoryIcon = name => {
          const value = String(name || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");
          const paths = value.includes("biblia") || value.includes("estudio") ? `<path d="M3 5.5c3-1 6-.5 9 1.2v13c-3-1.7-6-2.2-9-1.2zM21 5.5c-3-1-6-.5-9 1.2v13c3-1.7 6-2.2 9-1.2z"/>` : value.includes("video") ? `<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m10 9 5 3-5 3z"/>` : value.includes("audio") || value.includes("musica") ? `<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>` : value.includes("disen") || value.includes("imagen") ? `<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m21 15-5-5L5 20"/>` : value.includes("present") || value.includes("plant") ? `<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4M8 9h8m-8 4h5"/>` : `<path d="M6 3h9l4 4v14H6zM14 3v5h5M9 13h7m-7 4h7"/>`;
          return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths}</svg>`;
        };
        const categoryCard = category => `<button class="resource-category-card${platform.resourceCategory === category.name ? " is-active" : ""}" type="button" data-resource-category="${escapeHtml(category.name)}"><span class="resource-category-icon">${categoryIcon(category.name)}</span><span><strong>${escapeHtml(resourceCategoryLabel(category.name))}</strong><small>${category.count} ${category.count === 1 ? "recurso" : "recursos"}</small></span><span class="resource-category-arrow" aria-hidden="true">→</span></button>`;
        const categoryCards = categories.slice(0, 8).map(categoryCard).join("");
        const moreCategoryCards = categories.slice(8).map(categoryCard).join("");
        view().innerHTML = `<div class="resource-library">
          <header class="resource-library-hero">${heroImage ? `<img class="resource-hero-image" src="${escapeHtml(resourceDisplayUrl(heroImage))}" alt="" aria-hidden="true" fetchpriority="high">` : ""}<div class="resource-library-inner"><p class="resource-library-kicker">IPUC VILLA DEL RÍO · BIBLIOTECA DIGITAL</p><h1>Recursos</h1><p class="resource-library-intro">Material para servir, aprender y compartir</p><label class="resource-searchbox"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg><input id="resourceSearch" type="search" placeholder="Buscar recursos, estudios, plantillas, diseños…" autocomplete="off" value="${escapeHtml(platform.resourceSearch)}"><kbd>⌕</kbd></label><div class="resource-library-links"><a href="https://ipuc.org.co/descargas-ipuc#graficos-ipuc" target="_blank" rel="noopener">Banco oficial IPUC <span aria-hidden="true">↗</span></a><a href="${DRIVE_RESOURCE_FOLDER_URL}" target="_blank" rel="noopener">Material bíblico en Drive <span aria-hidden="true">↗</span></a></div></div>${platform.resourcesLoaded && !platform.resourcesError ? `<section class="resource-category-section" aria-labelledby="resourceCategoriesTitle"><div class="resource-section-head"><div><p class="resource-eyebrow">EXPLORA POR TEMA</p><h2 id="resourceCategoriesTitle">Categorías</h2></div><span>${categories.length} categorías · ${items.length} recursos</span></div><div class="resource-category-grid">${categoryCards}</div>${moreCategoryCards ? `<div class="resource-category-more" hidden>${moreCategoryCards}</div><button class="resource-show-categories" type="button" data-resource-categories-toggle aria-expanded="false">Ver ${categories.length - 8} categorías más</button>` : ""}</section>` : ""}</header>
          <div class="resource-library-main">
            ${platform.resourcesError ? `<div class="resource-error">No se pudo cargar el banco ahora. <button type="button" data-resource-retry>Reintentar</button></div>` : platform.resourcesLoading || !platform.resourcesLoaded ? `<section class="resource-skeleton" aria-label="Cargando recursos">${Array.from({ length: 6 }, () => `<span></span>`).join("")}</section>` : `
              ${latest.length ? `<section class="resource-recent-section"><div class="resource-section-head"><div><p class="resource-eyebrow">ACTUALIZADOS EN EL BANCO</p><h2>Agregados recientemente</h2></div></div><div class="resource-featured-grid">${latest.slice(0, 5).map(resourceCard).join("")}</div></section>` : ""}
              <section class="resource-library-results" aria-labelledby="resourceResultsTitle"><div class="resource-section-head"><div><p class="resource-eyebrow">BIBLIOTECA</p><h2 id="resourceResultsTitle">Todos los recursos</h2></div><span data-resource-count>${items.length} recursos</span></div><div class="resource-filters"><label><span>Categoría</span><select id="resourceCategory"><option value="Todos">Todas las categorías</option>${categories.map(category => `<option value="${escapeHtml(category.name)}"${platform.resourceCategory === category.name ? " selected" : ""}>${escapeHtml(resourceCategoryLabel(category.name))} (${category.count})</option>`).join("")}</select></label><label><span>Formato</span><select id="resourceType"><option value="Todos">Todos los formatos</option>${formats.map(format => `<option value="${escapeHtml(format)}"${platform.resourceType === format ? " selected" : ""}>${escapeHtml(format.toUpperCase())}</option>`).join("")}</select></label><label><span>Ordenar</span><select id="resourceSort"><option value="recientes"${platform.resourceSort === "recientes" ? " selected" : ""}>Más recientes</option><option value="antiguos"${platform.resourceSort === "antiguos" ? " selected" : ""}>Más antiguos</option><option value="nombre"${platform.resourceSort === "nombre" ? " selected" : ""}>Nombre A–Z</option></select></label><button type="button" class="resource-clear-filters" data-resource-clear${activeFilters ? "" : " hidden"}>Limpiar filtros</button></div><div class="resource-library-grid" id="resourceGrid"></div><p class="resource-empty" id="resourceEmpty" hidden>No encontramos recursos con esa búsqueda o filtros.</p><button class="resource-load-more" id="resourceLoadMore" type="button" hidden>Cargar más</button></section>`}
          </div><dialog class="resource-detail-dialog" aria-labelledby="resourceDetailTitle"><button class="resource-detail-close" type="button" aria-label="Cerrar detalle">×</button><div class="resource-detail-content"></div></dialog>
        </div>`;
        const root = view().querySelector(".resource-library");
        const dialog = root.querySelector(".resource-detail-dialog");
        const normalize = value => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es").replace(/[^a-z0-9]+/g, " ").trim();
        const filteredItems = () => {
          const term = normalize(platform.resourceSearch);
          return items.filter(item => {
            const haystack = normalize([item.name, item.description, item.category, item.folder, item.relativePath, item.kind?.label, item.kind?.extension, ...(item.tags || [])].join(" "));
            return (!term || term.split(/\s+/).every(word => haystack.includes(word))) && (platform.resourceCategory === "Todos" || item.category === platform.resourceCategory) && (platform.resourceType === "Todos" || item.kind?.extension === platform.resourceType);
          }).sort((a, b) => {
            if (platform.resourceSort === "nombre") return a.name.localeCompare(b.name, "es");
            const dateA = String(a.updatedAt || "");
            const dateB = String(b.updatedAt || "");
            if (platform.resourceSort === "antiguos") return (dateA ? 0 : 1) - (dateB ? 0 : 1) || dateA.localeCompare(dateB) || a.name.localeCompare(b.name, "es");
            return dateB.localeCompare(dateA) || a.name.localeCompare(b.name, "es");
          });
        };
        const syncUrl = () => {
          const url = new URL(location.href);
          [["buscar", platform.resourceSearch], ["categoria", platform.resourceCategory !== "Todos" ? platform.resourceCategory : ""], ["tipo", platform.resourceType !== "Todos" ? platform.resourceType : ""], ["orden", platform.resourceSort !== "recientes" ? platform.resourceSort : ""]].forEach(([key, value]) => value ? url.searchParams.set(key, value) : url.searchParams.delete(key));
          history.replaceState(history.state, "", url.pathname + (url.search ? url.search : "") + url.hash);
        };
        const updateGrid = () => {
          const grid = root.querySelector("#resourceGrid");
          if (!grid) return;
          const filtered = filteredItems();
          const shown = filtered.slice(0, platform.resourceLimit);
          grid.innerHTML = shown.map(resourceCard).join("");
          grid.querySelectorAll("img").forEach(image => image.addEventListener("error", () => { image.hidden = true; const fallback = image.closest(".resource-preview")?.querySelector(".resource-image-fallback"); if (fallback) fallback.hidden = false; }, { once: true }));
          root.querySelector("[data-resource-count]").textContent = `${filtered.length} ${filtered.length === 1 ? "recurso" : "recursos"}`;
          root.querySelector("#resourceResultsTitle").textContent = platform.resourceCategory !== "Todos" ? resourceCategoryLabel(platform.resourceCategory) : platform.resourceSearch ? "Resultados de búsqueda" : "Todos los recursos";
          root.querySelector("#resourceEmpty").hidden = filtered.length !== 0;
          const more = root.querySelector("#resourceLoadMore");
          more.hidden = shown.length >= filtered.length;
          more.textContent = `Cargar más (${filtered.length - shown.length})`;
          root.querySelector("[data-resource-clear]")?.toggleAttribute("hidden", !(platform.resourceSearch || platform.resourceCategory !== "Todos" || platform.resourceType !== "Todos"));
        };
        const showDetail = item => {
          const related = items.filter(other => other.key !== item.key && (other.category === item.category || other.folderPath === item.folderPath || other.kind.extension === item.kind.extension)).slice(0, 4);
          const media = resourceDetailPreviewMarkup(item);
          const openUrl = item.url || resourceDisplayUrl(item);
          dialog.querySelector(".resource-detail-content").innerHTML = `<div class="resource-detail-preview">${media}</div><div class="resource-detail-info"><p class="resource-eyebrow">${escapeHtml(resourceCategoryLabel(item.category))} · ${escapeHtml(item.kind.label)}</p><h2 id="resourceDetailTitle">${escapeHtml(resourceNameLabel(item.name))}</h2><p>${escapeHtml(resourceFolderLabel(item.folder || "Biblioteca IPUC"))}</p><dl><div><dt>Formato</dt><dd>${escapeHtml(item.kind.extension.toUpperCase())}</dd></div>${item.size ? `<div><dt>Tamaño</dt><dd>${escapeHtml(humanFileSize(item.size))}</dd></div>` : ""}${item.updatedAt ? `<div><dt>Actualizado</dt><dd>${escapeHtml(formatDateShort(item.updatedAt.slice(0, 10)))}</dd></div>` : ""}<div><dt>Origen</dt><dd>${escapeHtml(item.source || "Banco oficial IPUC")}</dd></div></dl><div class="resource-detail-actions"><a class="resource-detail-primary" href="${escapeHtml(resourceDownloadUrl(item))}" data-resource-download="${escapeHtml(item.key)}" download>Descargar</a>${openUrl ? `<a class="resource-detail-secondary" href="${escapeHtml(openUrl)}" target="_blank" rel="noopener">Abrir recurso ↗</a>` : ""}</div>${related.length ? `<section class="resource-related"><h3>También puede servirte</h3>${related.map(other => `<button type="button" data-resource-detail="${escapeHtml(other.key)}"><span class="resource-kind resource-kind-${escapeHtml(other.kind.extension)}">${escapeHtml(other.kind.icon)}</span><span><strong>${escapeHtml(resourceNameLabel(other.name))}</strong><small>${escapeHtml(resourceCategoryLabel(other.category))} · ${escapeHtml(other.kind.label)}</small></span></button>`).join("")}</section>` : ""}</div>`;
          if (!dialog.open) dialog.showModal();
        };
        root.addEventListener("input", event => {
          if (event.target.id !== "resourceSearch") return;
          platform.resourceSearch = event.target.value;
          platform.resourceLimit = 24;
          syncUrl();
          updateGrid();
        });
        root.addEventListener("change", event => {
          if (event.target.id === "resourceCategory") platform.resourceCategory = event.target.value;
          else if (event.target.id === "resourceType") platform.resourceType = event.target.value;
          else if (event.target.id === "resourceSort") platform.resourceSort = event.target.value;
          else return;
          platform.resourceLimit = 24;
          syncUrl();
          updateGrid();
        });
        root.addEventListener("click", event => {
          const categoriesToggle = event.target.closest("[data-resource-categories-toggle]");
          if (categoriesToggle) { const more = root.querySelector(".resource-category-more"); const expanded = more.hidden; more.hidden = !expanded; categoriesToggle.setAttribute("aria-expanded", String(expanded)); categoriesToggle.textContent = expanded ? "Mostrar menos" : `Ver ${categories.length - 8} categorías más`; return; }
          const category = event.target.closest("[data-resource-category]");
          if (category) { platform.resourceCategory = platform.resourceCategory === category.dataset.resourceCategory ? "Todos" : category.dataset.resourceCategory; root.querySelector("#resourceCategory").value = platform.resourceCategory; platform.resourceLimit = 24; syncUrl(); updateGrid(); root.querySelector("#resourceResultsTitle").scrollIntoView({ behavior: "smooth", block: "start" }); return; }
          if (event.target.closest("[data-resource-clear]")) { platform.resourceSearch = ""; platform.resourceCategory = "Todos"; platform.resourceType = "Todos"; root.querySelector("#resourceSearch").value = ""; root.querySelector("#resourceCategory").value = "Todos"; root.querySelector("#resourceType").value = "Todos"; syncUrl(); updateGrid(); return; }
          if (event.target.closest("#resourceLoadMore")) { platform.resourceLimit += 24; updateGrid(); return; }
          if (event.target.closest("[data-resource-retry]")) { loadResourceCatalog(); return; }
          const detailButton = event.target.closest("[data-resource-detail]");
          if (detailButton) { const item = items.find(resource => resource.key === detailButton.dataset.resourceDetail); if (item) showDetail(item); return; }
          if (event.target.closest(".resource-detail-close")) dialog.close();
          const download = event.target.closest("[data-resource-download]");
          if (download) { event.preventDefault(); const item = items.find(resource => resource.key === download.dataset.resourceDownload); if (item) downloadResource(item, download); }
        });
        updateGrid();
        if (!platform.resourcesLoaded && !platform.resourcesLoading) loadResourceCatalog();
      }

      async function loadResourceCatalog() {
        if (platform.resourcesLoading) return;
        platform.resourcesLoading = true;
        platform.resourcesError = "";
        if (parseRoute().name === "recursos") renderResourcesPage();
        try {
          const response = await fetch(`${RESOURCE_BUCKET_URL}/?list-type=2&prefix=${encodeURIComponent(RESOURCE_ROOT_PREFIX)}&max-keys=1000`);
          if (!response.ok) throw new Error("No se pudo consultar el repositorio");
          const xml = new DOMParser().parseFromString(await response.text(), "application/xml");
          const nodes = [...xml.getElementsByTagNameNS("*", "Contents")];
          const nodeByKey = new Map(nodes.map(node => [node.getElementsByTagNameNS("*", "Key")[0]?.textContent || "", node]));
          const officialItems = nodes.map(node => node.getElementsByTagNameNS("*", "Key")[0]?.textContent || "").filter(key => key && !key.endsWith("/.folder") && !key.endsWith("/")).map(key => {
            const relative = key.slice(RESOURCE_ROOT_PREFIX.length);
            const parts = relative.split("/");
            const name = parts.pop() || relative;
            const objectNode = nodeByKey.get(key);
            const sizeNode = objectNode?.getElementsByTagNameNS("*", "Size")[0];
            const updatedAt = objectNode?.getElementsByTagNameNS("*", "LastModified")[0]?.textContent || "";
            const folderPath = parts.join("/");
            return { key, name, relativePath: relative, folderPath, folder: parts.join(" / "), category: parts[0] || "Otros", tags: parts, size: Number(sizeNode?.textContent || 0), updatedAt, kind: resourceKind(name), url: resourceUrl(key) };
          });
          const driveItems = DRIVE_RESOURCE_ITEMS.map(([name, folderPath, size, url]) => ({ key: `drive:${url}`, name, relativePath: `Material bíblico/${folderPath}/${name}`, folderPath: `Material bíblico/${folderPath}`, folder: `Material bíblico / ${folderPath.replace(/\//g, " / ")}`, category: "Material bíblico", size, kind: resourceKind(name), url, source: "Google Drive" }));
          platform.resourceItems = [...officialItems, ...driveItems].sort((a, b) => a.folderPath.localeCompare(b.folderPath, "es") || a.name.localeCompare(b.name, "es"));
          platform.resourcesLoaded = true;
        } catch (error) {
          platform.resourcesError = error.message || "No se pudo cargar el banco";
        } finally {
          platform.resourcesLoading = false;
          if (parseRoute().name === "recursos") renderResourcesPage();
        }
      }

      function resourceUrl(key) {
        return `${RESOURCE_BUCKET_URL}/${key.split("/").map(encodeURIComponent).join("/")}`;
      }

      function resourceKind(name) {
        const extension = String(name).split(".").pop()?.toLowerCase() || "archivo";
        if (["png", "jpg", "jpeg", "webp", "svg"].includes(extension)) return { extension, label: "Imagen", icon: "IMG" };
        if (["mp4", "mov", "webm"].includes(extension)) return { extension, label: "Video", icon: "VID" };
        if (["mp3", "wav", "m4a"].includes(extension)) return { extension, label: "Audio", icon: "AUD" };
        if (extension === "pdf") return { extension, label: "PDF", icon: "PDF" };
        if (["ai", "eps", "psd"].includes(extension)) return { extension, label: "Editable", icon: extension.toUpperCase() };
        if (["zip", "rar"].includes(extension)) return { extension, label: "Paquete", icon: "ZIP" };
        return { extension, label: "Archivo", icon: extension.toUpperCase().slice(0, 4) };
      }

      function resourceCategoryLabel(category) {
        const acronymMap = { ipuc: "IPUC", decom: "DECOM", lbea: "LBEA", pdf: "PDF", png: "PNG", svg: "SVG", jpg: "JPG", jpeg: "JPEG", webp: "WEBP", mp4: "MP4", nt: "NT", at: "AT" };
        const lowerWords = new Set(["a", "al", "de", "del", "el", "en", "la", "las", "los", "para", "por", "y"]);
        const words = String(category || "").replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim().toLocaleLowerCase("es").split(" ").filter(Boolean);
        return words.map((word, index) => {
          if (acronymMap[word]) return acronymMap[word];
          if (index > 0 && lowerWords.has(word)) return word;
          return word.charAt(0).toLocaleUpperCase("es") + word.slice(1);
        }).join(" ");
      }

      function resourceNameLabel(name) {
        const raw = String(name || "").replace(/[_]+/g, " ").replace(/\s+/g, " ").trim();
        const match = raw.match(/^(.+?)(\.[a-z0-9]{2,5})$/i);
        const base = match ? match[1].trim() : raw;
        const extension = match ? match[2].toUpperCase() : "";
        return `${resourceCategoryLabel(base)}${extension}`;
      }

      function resourceFolderLabel(folder) {
        return String(folder || "").split(" / ").map(resourceCategoryLabel).join(" / ");
      }

      function resourcePathParts(path) {
        return String(path || "").split("/").filter(Boolean);
      }

      function resourceParentPath(path) {
        return resourcePathParts(path).slice(0, -1).join("/");
      }

      function resourceEntriesAtPath(path) {
        const normalizedPath = resourcePathParts(path).join("/");
        if (normalizedPath === RESOURCE_LOOSE_FILES_PATH) {
          return { folders: [], files: platform.resourceItems.filter(item => item.folderPath === "").sort((a, b) => a.name.localeCompare(b.name, "es")) };
        }
        const prefix = normalizedPath ? `${normalizedPath}/` : "";
        const folders = new Map();
        platform.resourceItems.forEach(item => {
          if (!item.folderPath.startsWith(prefix) || item.folderPath === normalizedPath) return;
          const child = item.folderPath.slice(prefix.length).split("/")[0];
          if (!child) return;
          const childPath = `${prefix}${child}`;
          folders.set(childPath, { path: childPath, name: child, ...resourceFolderStats(childPath) });
        });
        const looseFiles = platform.resourceItems.filter(item => item.folderPath === "");
        if (!normalizedPath && looseFiles.length) folders.set(RESOURCE_LOOSE_FILES_PATH, { path: RESOURCE_LOOSE_FILES_PATH, name: "Documentos sueltos", files: looseFiles.length, subfolders: 0 });
        return {
          folders: [...folders.values()].sort((a, b) => {
            const priorityA = a.path === "Material bíblico" ? -1 : 0;
            const priorityB = b.path === "Material bíblico" ? -1 : 0;
            return priorityA - priorityB || a.name.localeCompare(b.name, "es");
          }),
          files: platform.resourceItems.filter(item => item.folderPath === normalizedPath && normalizedPath !== "").sort((a, b) => a.name.localeCompare(b.name, "es"))
        };
      }

      function resourceFolderStats(path) {
        const prefix = `${path}/`;
        const descendants = platform.resourceItems.filter(item => item.folderPath === path || item.folderPath.startsWith(prefix));
        const subfolders = new Set();
        platform.resourceItems.forEach(item => {
          if (!item.folderPath.startsWith(prefix)) return;
          const child = item.folderPath.slice(prefix.length).split("/")[0];
          if (child) subfolders.add(child);
        });
        return { files: descendants.length, subfolders: subfolders.size };
      }

      function resourceBreadcrumb(path) {
        const parts = resourcePathParts(path);
        let current = "";
        const crumbs = [`<button type="button" data-resource-path="">Banco de recursos</button>`];
        parts.forEach((part, index) => {
          current = current ? `${current}/${part}` : part;
          crumbs.push(`<span aria-hidden="true">›</span>${index === parts.length - 1 ? `<strong>${escapeHtml(resourceCategoryLabel(part))}</strong>` : `<button type="button" data-resource-path="${escapeHtml(current)}">${escapeHtml(resourceCategoryLabel(part))}</button>`}`);
        });
        return `<nav class="resource-breadcrumb" aria-label="Ubicación de la carpeta">${crumbs.join("")}</nav>`;
      }

      function resourceFolderCard(folder) {
        const fileLabel = `${folder.files} ${folder.files === 1 ? "archivo" : "archivos"}`;
        const subfolderLabel = folder.subfolders ? ` · ${folder.subfolders} ${folder.subfolders === 1 ? "subcarpeta" : "subcarpetas"}` : "";
        const featured = folder.path === "Material bíblico";
        return `<article class="resource-folder-card glass${featured ? " resource-folder-featured" : ""}"><button class="resource-folder-open" type="button" data-resource-path="${escapeHtml(folder.path)}"><span class="resource-folder-icon" aria-hidden="true">CARPETA</span><span class="resource-folder-copy"><small>${featured ? "Biblioteca destacada" : "Carpeta"}</small><h3>${escapeHtml(resourceCategoryLabel(folder.name))}</h3><span>${fileLabel}${subfolderLabel}</span></span><span class="resource-folder-arrow" aria-hidden="true">›</span></button></article>`;
      }

      function resourceCard(item) {
        const preview = resourcePreviewMarkup(item);
        return `<article class="resource-card"><button class="resource-card-preview" type="button" data-resource-detail="${escapeHtml(item.key)}" aria-label="Ver ${escapeHtml(resourceNameLabel(item.name))}"><span class="resource-preview">${preview}<span class="resource-image-fallback" hidden><span class="resource-kind resource-kind-${escapeHtml(item.kind.extension)}">${escapeHtml(item.kind.icon)}</span><strong>Vista previa no disponible</strong></span></span><span class="resource-card-view">Ver recurso <span aria-hidden="true">↗</span></span></button><div class="resource-card-body"><span class="resource-category-label">${escapeHtml(resourceCategoryLabel(item.category))}</span><h3 title="${escapeHtml(item.name)}">${escapeHtml(resourceNameLabel(item.name))}</h3><p>${escapeHtml(resourceFolderLabel(item.folder || "Carpeta principal"))}</p><small>${escapeHtml(item.kind.label)} · ${escapeHtml(humanFileSize(item.size))}${item.updatedAt ? ` · ${escapeHtml(formatDateShort(item.updatedAt.slice(0, 10)))}` : ""}</small></div><div class="resource-actions"><button type="button" class="resource-open" data-resource-detail="${escapeHtml(item.key)}">Información</button><a class="resource-download" href="${escapeHtml(resourceDownloadUrl(item))}" data-resource-download="${escapeHtml(item.key)}" download>Descargar <span aria-hidden="true">↓</span></a></div></article>`;
      }

      function resourceIsImage(item) {
        return ["png", "jpg", "jpeg", "webp", "svg"].includes(item?.kind?.extension);
      }

      function resourceIsVideo(item) {
        return ["mp4", "mov", "webm"].includes(item?.kind?.extension);
      }

      function resourceIsAudio(item) {
        return ["mp3", "wav", "m4a"].includes(item?.kind?.extension);
      }

      function resourceIsPdf(item) {
        return item?.kind?.extension === "pdf";
      }

      function resourceDisplayUrl(item) {
        const id = driveFileId(item);
        if (id && item?.source === "Google Drive" && resourceIsImage(item)) {
          return `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1600`;
        }
        if (id && item?.source === "Google Drive" && resourceIsPdf(item)) {
          return `https://drive.google.com/file/d/${encodeURIComponent(id)}/preview`;
        }
        return item?.url || "";
      }

      function resourceDownloadUrl(item) {
        const id = driveFileId(item);
        if (id && item?.source === "Google Drive") return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(id)}`;
        return item?.url || "";
      }

      function resourcePreviewMarkup(item) {
        const label = escapeHtml(resourceNameLabel(item?.name || "Recurso"));
        const driveId = driveFileId(item);
        if (resourceIsImage(item)) return `<img src="${escapeHtml(resourceDisplayUrl(item))}" alt="Vista previa de ${label}" loading="lazy" decoding="async">`;
        if (resourceIsPdf(item) && driveId) return `<img src="https://drive.google.com/thumbnail?id=${encodeURIComponent(driveId)}&sz=w800" alt="Portada de ${label}" loading="lazy" decoding="async">`;
        const labelText = resourceIsPdf(item) ? "Documento PDF" : resourceIsVideo(item) ? "Video" : resourceIsAudio(item) ? "Audio" : item?.kind?.label || "Archivo";
        return `<span class="resource-preview-file"><span class="resource-kind resource-kind-${escapeHtml(item?.kind?.extension || "file")}">${escapeHtml(item?.kind?.icon || "FILE")}</span><strong>${escapeHtml(labelText)}</strong><small>${escapeHtml(item?.kind?.extension?.toUpperCase() || "")}</small></span>`;
      }

      function resourceDetailPreviewMarkup(item) {
        const source = resourceDisplayUrl(item);
        const label = escapeHtml(resourceNameLabel(item.name));
        const id = driveFileId(item);
        if (resourceIsImage(item)) return `<img src="${escapeHtml(source)}" alt="${label}" loading="lazy">`;
        if (resourceIsPdf(item)) return `<iframe src="${id ? `https://drive.google.com/file/d/${encodeURIComponent(id)}/preview` : escapeHtml(source)}" title="Vista previa de ${label}" loading="lazy"></iframe>`;
        if (resourceIsVideo(item)) return id && item.source === "Google Drive" ? `<iframe src="https://drive.google.com/file/d/${encodeURIComponent(id)}/preview" title="Reproductor de ${label}" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>` : `<video src="${escapeHtml(source)}" controls playsinline preload="metadata"></video>`;
        if (resourceIsAudio(item)) return id && item.source === "Google Drive" ? `<iframe src="https://drive.google.com/file/d/${encodeURIComponent(id)}/preview" title="Reproductor de ${label}" loading="lazy" allow="autoplay; encrypted-media"></iframe>` : `<audio src="${escapeHtml(source)}" controls preload="metadata"></audio>`;
        return `<div class="resource-detail-file"><span class="resource-kind resource-kind-${escapeHtml(item.kind.extension)}">${escapeHtml(item.kind.icon)}</span><strong>Vista previa no disponible para ${escapeHtml(item.kind.label.toLowerCase())}</strong></div>`;
      }

      async function downloadResource(item, trigger) {
        const source = resourceDownloadUrl(item);
        if (!source) return showToast("Este recurso no tiene una descarga disponible.", "error");
        try {
          const downloader = await import("/js/downloads.js?v=20261005-1");
          await downloader.downloadFile({ ...item, url: source }, trigger);
        } catch (error) {
          showToast(error.message || "No se pudo descargar el recurso.", "error");
        }
      }

      function renderLocationPage() {
        view().innerHTML = `<section class="page-head glass"><div><p class="eyebrow">Encuéntranos</p><h1>IPUC Villa del Río</h1><p>Consulta la ubicación de la congregación y planea tu llegada.</p></div></section><section class="location-card glass"><div class="location-info"><p class="eyebrow">Ubicación</p><h2>Estamos aquí para recibirte</h2><p>Villa del Río · Colombia</p><div class="location-actions"><a class="map-button primary" href="https://www.google.com/maps/dir/?api=1&destination=5.065963,-75.491681" target="_blank" rel="noopener">Cómo llegar</a><a class="map-button" href="https://www.google.com/maps?q=5.065963,-75.491681" target="_blank" rel="noopener">Abrir mapa</a></div><div class="visit-note"><span class="visit-note-mark" aria-hidden="true">01</span><div><strong>¿Nos visitas por primera vez?</strong><p>Consulta los horarios habituales y elige el momento que mejor te convenga.</p><a href="/calendario" data-route-link="calendario">Ver cronograma <span aria-hidden="true">→</span></a></div></div></div><iframe class="map-frame" title="Mapa de IPUC Villa del Río" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=5.065963,-75.491681&z=17&output=embed"></iframe></section>${worshipScheduleMarkup()}`;
        bindWorshipSchedule();
      }

      async function prepareMemberCardPhoto(file) {
        let bitmap;
        let objectUrl = "";
        try {
          if (window.createImageBitmap) {
            try { bitmap = await createImageBitmap(file); } catch { /* usa el decodificador nativo del navegador */ }
          }
          if (!bitmap) {
            objectUrl = URL.createObjectURL(file);
            bitmap = await new Promise((resolve, reject) => {
              const image = new Image();
              image.onload = () => resolve(image);
              image.onerror = () => reject(new Error("El navegador no pudo leer esta foto. Prueba guardarla como JPG o PNG."));
              image.src = objectUrl;
            });
          }
          const scale = Math.min(1, 1400 / Math.max(bitmap.width, bitmap.height));
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(bitmap.width * scale));
          canvas.height = Math.max(1, Math.round(bitmap.height * scale));
          const context = canvas.getContext("2d");
          if (context) {
            context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
            const resized = canvas.toDataURL("image/jpeg", .86);
            if (resized && resized !== "data:,") return resized;
          }
        } catch (error) {
          console.warn("Se usará la foto original para el carnet.", error);
        } finally {
          if (bitmap?.close) bitmap.close();
          if (objectUrl) URL.revokeObjectURL(objectUrl);
        }
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("El dispositivo no pudo leer la foto seleccionada."));
          reader.onerror = () => reject(new Error("El dispositivo no pudo leer la foto seleccionada."));
          reader.onabort = () => reject(new Error("Se interrumpió la lectura de la foto."));
          reader.readAsDataURL(file);
        });
      }

      async function membershipCardSvg(member) {
        if (!member.photoDataUrl && member.photoFile) {
          member.photoDataUrl = await prepareMemberCardPhoto(member.photoFile);
          member.photoPreparationWarning = "";
        }
        const response = await fetch("/assets/member-card-template.svg", { cache: "no-cache" });
        if (!response.ok) throw new Error("No se pudo cargar la plantilla del carnet.");
        const xml = new DOMParser().parseFromString(await response.text(), "image/svg+xml");
        if (xml.querySelector("parsererror")) throw new Error("La plantilla editable del carnet no se pudo leer.");
        const ns = "http://www.w3.org/2000/svg";
        const svgRoot = xml.documentElement;
        const [, , cardWidth, cardHeight] = (svgRoot.getAttribute("viewBox") || "0 0 155.91 240.94").trim().split(/\s+/);
        const whiteBackground = xml.createElementNS(ns, "rect");
        whiteBackground.setAttribute("x", "0"); whiteBackground.setAttribute("y", "0");
        whiteBackground.setAttribute("width", cardWidth); whiteBackground.setAttribute("height", cardHeight);
        whiteBackground.setAttribute("fill", "#ffffff");
        svgRoot.insertBefore(whiteBackground, svgRoot.firstChild);
        const textField = className => [...xml.getElementsByTagName("text")].find(node => node.classList.contains(className));
        const name = textField("st10");
        const code = textField("st11");
        const role = textField("st2");
        if (!name || !code || !role) throw new Error("La plantilla del carnet no contiene los espacios para nombre, documento y cargo.");
        if (!member.photoDataUrl) throw new Error("No se pudo leer la foto para el carnet. Vuelve a seleccionarla e inténtalo de nuevo.");

        const documentLabels = { CC: "C.C.", TI: "T.I.", CE: "C.E.", PA: "Pasaporte", RC: "R.C.", PPT: "P.P.T." };
        const documentText = `${documentLabels[member.documentType] || member.documentType} ${member.documentNumber}`;
        const roles = String(member.churchRole || "").split("|").map(value => value.trim());
        const committees = String(member.churchCommittee || "").split("|").map(value => value.trim());
        const assignments = member.churchAssignments?.length ? member.churchAssignments : roles.map((value, index) => ({ role: value, committee: committees[index] || (committees.length === 1 ? committees[0] : "") }));
        const assignmentLabels = assignments.map(item => [item.role, item.committee].filter(Boolean).join(" · ")).filter(Boolean);
        [[name, member.fullName, 162.06, 10], [code, documentText, 173.56, 8]].forEach(([node, value, y, baseSize]) => {
          node.textContent = value;
          node.removeAttribute("transform");
          node.setAttribute("x", "77.955");
          node.setAttribute("y", String(y));
          node.setAttribute("text-anchor", "middle");
          node.style.fontSize = `${Math.min(baseSize, Math.max(6, 145 / (String(value).length * .58)))}px`;
        });

        // Keep each role with its committee; wrap long names inside the card.
        let assignmentSize = 9, assignmentLines;
        do {
          const maxChars = Math.max(12, Math.floor(137 / (assignmentSize * .6)));
          assignmentLines = assignmentLabels.flatMap(label => {
            const lines = []; let line = "";
            for (const word of label.match(/\S+/g) || []) {
              if (line && (line + " " + word).length > maxChars) { lines.push(line); line = ""; }
              let rest = word;
              while (rest.length > maxChars) { if (line) { lines.push(line); line = ""; } lines.push(rest.slice(0, maxChars)); rest = rest.slice(maxChars); }
              line = line ? line + " " + rest : rest;
            }
            if (line) lines.push(line);
            return lines;
          });
          if (assignmentLines.length * assignmentSize * 1.2 <= 32 || assignmentSize <= 3) break;
          assignmentSize -= .5;
        } while (true);
        assignmentSize = Math.min(assignmentSize, 32 / Math.max(1, assignmentLines.length) / 1.2);
        role.textContent = ""; role.removeAttribute("transform");
        role.setAttribute("text-anchor", "middle"); role.style.fontSize = `${assignmentSize}px`;
        assignmentLines.forEach((label, index) => {
          const line = xml.createElementNS(ns, "tspan");
          line.setAttribute("x", "77.955"); line.setAttribute("y", String(190 + index * assignmentSize * 1.2));
          line.textContent = label; role.append(line);
        });

        const defs = xml.querySelector("defs");
        const clip = xml.createElementNS(ns, "clipPath");
        clip.setAttribute("id", "memberPhotoClip");
        clip.setAttribute("clipPathUnits", "userSpaceOnUse");
        const clipRect = xml.createElementNS(ns, "rect");
        ["x", "y", "width", "height", "rx"].forEach((key, index) => clipRect.setAttribute(key, ["51.63", "78.05", "52.92", "71.07", "5.35"][index]));
        clip.append(clipRect); defs.append(clip);

        const photo = xml.createElementNS(ns, "image");
        photo.setAttribute("x", "51.63"); photo.setAttribute("y", "78.05");
        photo.setAttribute("width", "52.92"); photo.setAttribute("height", "71.07");
        photo.setAttribute("preserveAspectRatio", "xMidYMid slice");
        photo.setAttribute("clip-path", "url(#memberPhotoClip)");
        photo.setAttribute("href", member.photoDataUrl);
        photo.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", member.photoDataUrl);
        const frame = xml.createElementNS(ns, "rect");
        frame.setAttribute("x", "51.63"); frame.setAttribute("y", "78.05");
        frame.setAttribute("width", "52.92"); frame.setAttribute("height", "71.07");
        frame.setAttribute("rx", "5.35"); frame.setAttribute("fill", "none");
        frame.setAttribute("stroke", "#1d1d1b"); frame.setAttribute("stroke-width", ".8");
        const firstText = xml.querySelector("text");
        if (!firstText) throw new Error("La plantilla del carnet no tiene campos de texto.");
        firstText.before(photo, frame);
        return new XMLSerializer().serializeToString(xml.documentElement);
      }

      async function membershipCardBlob(member, format = "png", ownPhotoUrl = "") {
        if ((!member?.photo_path && !ownPhotoUrl) || !member.has_church_role) throw new Error("El carnet requiere foto y un cargo registrado.");
        let photoUrl = ownPhotoUrl;
        if (!photoUrl) {
          const { data, error } = await cloud.storage.from("membership-photos").createSignedUrl(member.photo_path, 600);
          if (error) throw error;
          photoUrl = data.signedUrl;
        }
        const response = await fetch(photoUrl, { cache: "no-store" });
        if (!response.ok) throw new Error("No se pudo leer la foto privada del miembro.");
        const card = {
          fullName: member.full_name, memberNumber: member.member_number,
          churchRole: member.church_role, churchCommittee: member.church_committee,
          churchAssignments: member.church_assignments, documentType: member.document_type,
          documentNumber: member.document_number, photoDataUrl: await prepareMemberCardPhoto(await response.blob())
        };
        const svg = await membershipCardSvg(card);
        if (format === "svg") return new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
        try {
          const image = new Image(); image.src = url; await image.decode();
          const canvas = document.createElement("canvas"); canvas.width = 624; canvas.height = 964;
          const context = canvas.getContext("2d");
          if (!context) throw new Error("El navegador no pudo preparar el carnet para impresión.");
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
          if (!blob) throw new Error("No se pudo exportar el carnet como imagen.");
          return blob;
        } finally { URL.revokeObjectURL(url); }
      }

      async function prepareMemberCardPreview(member) {
        const svg = await membershipCardSvg(member);
        member.svgUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
      }

      function renderDecomRegistration() {
        window.DecomRegistration.render({ root: view(), config: SUPABASE_CONFIG,
          client: () => cloud.app, renderForm: () => { platform.memberCard = null; renderMembershipPage(true); },
          navigate: path => { history.pushState({}, "", path); renderRoute(); },
          showTalent: () => { platform.adminSection = "membresia"; history.pushState({}, "", "/admin"); renderRoute(); loadMembershipAdmin(); }
        }).catch(() => { view().textContent = "No se pudo abrir el registro local. Recarga para reintentar; no se borraron los pendientes."; });
      }

      function renderMembershipPage(decomMode = false, accountContext = null) {
        const registration = platform.memberCard;
        const card = registration?.hasChurchRole && !registration?.changeRequest ? registration : null;
        view().innerHTML = `${decomMode ? "" : `<section class="page-head"><div><p class="eyebrow">Familia IPUC</p><h1>Registro de membresía</h1><p>Comparte tus datos con la administración de la iglesia para mantener actualizado el registro de membresía.</p></div></section>`}
          ${registration ? `<section class="membership-success"><p class="eyebrow">${registration.changeRequest ? "Actualización pendiente" : "Registro recibido"}</p><h2>${registration.changeRequest ? "Solicitud enviada" : `Gracias, ${escapeHtml(registration.fullName)}`}</h2><p>${registration.changeRequest ? "Tus datos no se han modificado todavía. Un administrador debe revisar y aprobar los cambios para actualizar el registro oficial." : "Tu solicitud quedó pendiente de validación por la iglesia."}</p>${registration.changeRequest ? `<div class="membership-no-card"><strong>Esperando revisión administrativa</strong><p>La iglesia revisará la información antes de aplicarla al registro y al carnet.</p></div>` : card ? `<article class="member-card-preview" aria-label="Vista previa del carnet IPUC">${card.svgUrl ? `<img src="${escapeHtml(card.svgUrl)}" alt="Carnet de ${escapeHtml(card.fullName)} con cargo ${escapeHtml(card.churchRole)}">` : `<div class="member-card-placeholder">Carnet listo para descargar</div>`}</article><p class="member-card-note">El carnet se genera solo para quien declaró un cargo. Tu carnet se prepara en este dispositivo; los datos y la foto no se descargan desde el registro administrativo.</p><div class="member-card-downloads"><button class="primary-link" type="button" data-download-member-card="png">Descargar carnet</button><button class="small-action" type="button" data-download-member-card="svg">Descargar editable (SVG)</button></div><p class="member-form-status" data-member-status role="status" aria-live="polite"></p>` : `<div class="membership-no-card"><strong>Registro guardado</strong><p>Como indicaste que no tienes un cargo, no se generó un carnet.</p></div>`}</section>` : `<form class="membership-form" id="membershipForm" novalidate><div class="membership-form-heading"><span>01</span><div><h2>Tus datos</h2><p>La información de este registro solo la consultará el equipo administrativo autorizado.</p></div></div><div class="membership-fields"><label>Nombre completo<input name="fullName" autocomplete="name" required maxlength="140"></label><label>Dirección de residencia<input name="address" autocomplete="street-address" required maxlength="240"></label><label>Correo electrónico<input name="email" type="email" autocomplete="email" required maxlength="254"></label><label>Teléfono<input name="phone" type="tel" autocomplete="tel" required maxlength="32"></label><label class="member-photo-field">Foto de rostro para identificación y control de membresía<input name="photo" type="file" accept="image/jpeg,image/png,image/webp" required><small>JPG, PNG o WebP · máximo 5 MB. Se guarda de forma privada. La foto no se publica.</small><img data-member-photo-preview alt="Vista previa de tu foto" hidden></label><fieldset class="member-role-question"><legend>¿Tienes un cargo en la iglesia?</legend><div class="member-role-options"><label><input name="hasChurchRole" type="radio" value="si" required> Sí</label><label><input name="hasChurchRole" type="radio" value="no" required> No</label></div></fieldset><label class="member-role-field" data-member-role-field hidden>¿Cuál es tu cargo?<input name="churchRole" maxlength="120" placeholder="Ej. Presidente DECOM" disabled></label><label class="member-committee-field" data-member-committee-field hidden>¿A qué comité perteneces?<select name="churchCommittee" disabled><option value="">Selecciona tu comité</option>${MEMBERSHIP_COMMITTEES.map(name => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("")}<option value="__otro__">Otro comité</option></select></label><label class="member-custom-committee-field" data-member-custom-committee-field hidden>Nombre del comité<input name="customChurchCommittee" maxlength="80" placeholder="Escribe el nombre del comité" disabled></label></div><label class="member-consent"><input name="sensitiveDataConsent" type="checkbox" required><span>Autorizo de forma previa, expresa e informada a IPUC Villa del Río a tratar mis datos identificativos, fecha de nacimiento, información sobre bautismo y llenura del Espíritu Santo y mi vinculación como miembro, para gestionar esta solicitud y mi membresía. Estos datos religiosos son sensibles y solo serán consultados por administración autorizada. Esta autorización no es necesaria para asistir a los cultos. Podré conocer, actualizar, rectificar o solicitar la supresión de mis datos o revocar esta autorización escribiendo a <a href="mailto:decomvilladelrio@gmail.com">decomvilladelrio@gmail.com</a>.</span></label><label class="member-consent"><input name="photoConsent" type="checkbox" required><span>Autorizo expresamente el almacenamiento privado de mi fotografía para identificarme y elaborar el carnet de membresía. Esta autorización no permite publicar la foto en anuncios o material promocional; para eso se solicitará permiso aparte.</span></label><label class="member-consent"><input name="attendanceConsent" type="checkbox"><span>Opcional: autorizo registrar mi asistencia a eventos de la iglesia para control interno. Puedo registrarme sin activar esta función.</span></label><p class="member-form-status" data-member-status role="status" aria-live="polite"></p><button class="primary-link" type="submit">Enviar registro</button></form>`}`;
        const form = document.getElementById("membershipForm");
        if (!decomMode && !accountContext) view().querySelector(".page-head")?.insertAdjacentHTML("beforeend", '<a class="small-action" href="/cuenta/">Iniciar sesión · Mi membresía</a>');
        const memberCardPlaceholder = view().querySelector(".member-card-placeholder");
        if (memberCardPlaceholder && card && !card.photoDataUrl) memberCardPlaceholder.textContent = "Carnet sin vista previa en este dispositivo";
        if (card?.photoPreparationWarning) {
          const cardStatus = view().querySelector("[data-member-status]");
          if (cardStatus) cardStatus.textContent = card.photoPreparationWarning;
        }
        if (form) {
          form.querySelector(".member-photo-field small").textContent = "JPG, PNG o WebP · máximo 5 MB. Se guarda de forma privada. La foto no se publica.";
          const roleField = form.querySelector("[data-member-role-field]");
          const committeeField = form.querySelector("[data-member-committee-field]");
          const customCommitteeField = form.querySelector("[data-member-custom-committee-field]");
          const assignmentFields = document.createElement("div");
          assignmentFields.className = "member-assignment-fields";
          assignmentFields.hidden = true;
          assignmentFields.innerHTML = `<div class="member-assignment-list" data-member-assignment-list></div><button class="small-action" type="button" data-add-member-assignment>Agregar otro cargo o comité</button><p class="member-assignment-limit" hidden>Máximo 20 cargos o comités.</p>`;
          const assignmentList = assignmentFields.querySelector("[data-member-assignment-list]");
          const assignmentMarkup = removable => `<div class="member-assignment-row" data-member-assignment><label>Cargo en la iglesia<input data-assignment-role maxlength="120" placeholder="Ej. Secretario" disabled required></label><label>Comité<select data-assignment-committee disabled required><option value="">Selecciona tu comité</option>${MEMBERSHIP_COMMITTEES.map(name => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("")}<option value="__otro__">Otro comité</option></select></label><label data-assignment-custom hidden>Nombre del comité<input data-assignment-custom-name maxlength="80" placeholder="Escribe el nombre del comité" disabled required></label>${removable ? '<button class="small-action danger-action" type="button" data-remove-member-assignment>Quitar</button>' : ""}</div>`;
          assignmentList.innerHTML = assignmentMarkup(false);
          roleField.remove(); committeeField.remove(); customCommitteeField.remove();
          form.querySelector('[name="hasChurchRole"]').closest("fieldset").insertAdjacentElement("afterend", assignmentFields);
          const profileFields = document.createElement("div");
          profileFields.className = "member-profile-fields";
          profileFields.innerHTML = `<label>Fecha de nacimiento<input name="birthDate" type="date" required></label><fieldset class="member-role-question"><legend>¿Estás bautizado?</legend><div class="member-role-options"><label><input name="isBaptized" type="radio" value="true" required> Sí</label><label><input name="isBaptized" type="radio" value="false" required> No</label></div></fieldset><fieldset class="member-role-question"><legend>¿Eres lleno del Espíritu Santo?</legend><div class="member-role-options"><label><input name="filledWithHolySpirit" type="radio" value="true" required> Sí</label><label><input name="filledWithHolySpirit" type="radio" value="false" required> No</label></div></fieldset><section class="member-guardian-fields" data-member-guardian-fields hidden><h3>Autorización para menores de edad</h3><p>Al registrar a una persona menor de 18 años, debe completar esta sección su padre, madre o representante legal.</p><label>Nombre completo del padre, madre o representante<input name="guardianFullName" maxlength="140" autocomplete="name" disabled></label><label class="member-consent"><input name="guardianConsent" type="checkbox" disabled><span>Como padre, madre o representante legal, autorizo el tratamiento de los datos personales y sensibles del menor para gestionar su registro de membresía.</span></label><label class="member-consent"><input name="minorInformedConsent" type="checkbox" disabled><span>He informado al menor sobre este registro y he tenido en cuenta su opinión.</span></label></section>`;
          form.querySelector(".member-role-question").insertAdjacentElement("beforebegin", profileFields);
          const birthDateInput = profileFields.querySelector('[name="birthDate"]');
          if (accountContext) profileFields.insertAdjacentHTML("beforeend", '<label>Fecha de bautismo (si la conoces)<input name="baptismDate" type="date"></label>');
          const todayInBogota = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(new Date());
          birthDateInput.max = todayInBogota();
          const guardianFields = profileFields.querySelector("[data-member-guardian-fields]");
          const guardianNameInput = guardianFields.querySelector('[name="guardianFullName"]');
          const guardianConsentInput = guardianFields.querySelector('[name="guardianConsent"]');
          const minorConsentInput = guardianFields.querySelector('[name="minorInformedConsent"]');
          const isMinor = value => {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
            const [year, month, day] = value.split("-").map(Number);
            const [nowYear, nowMonth, nowDay] = todayInBogota().split("-").map(Number);
            return nowYear - year < 18 || (nowYear - year === 18 && (nowMonth < month || (nowMonth === month && nowDay < day)));
          };
          const syncGuardianFields = () => {
            const minor = isMinor(birthDateInput.value);
            guardianFields.hidden = !minor;
            [guardianNameInput, guardianConsentInput, minorConsentInput].forEach(input => {
              input.disabled = !minor;
              input.required = minor;
              if (!minor) input.type === "checkbox" ? input.checked = false : input.value = "";
            });
          };
          birthDateInput.addEventListener("change", syncGuardianFields);
          syncGuardianFields();
          const documentFields = document.createElement("div");
          documentFields.className = "member-document-fields";
          documentFields.innerHTML = `<label>Tipo de documento<select name="documentType" required><option value="">Selecciona el tipo</option><option value="CC">Cédula de ciudadanía (C.C.)</option><option value="TI">Tarjeta de identidad (T.I.)</option><option value="CE">Cédula de extranjería (C.E.)</option><option value="PA">Pasaporte</option><option value="RC">Registro civil (R.C.)</option><option value="PPT">Permiso por Protección Temporal (P.P.T.)</option></select></label><label>Número de documento<input name="documentNumber" type="text" inputmode="text" autocomplete="off" minlength="3" maxlength="32" pattern="[A-Za-z0-9][A-Za-z0-9.-]{2,31}" placeholder="Número sin espacios" required></label>`;
          documentFields.hidden = true;
          documentFields.querySelectorAll("select, input").forEach(input => { input.disabled = true; });
          assignmentFields.insertAdjacentElement("afterend", documentFields);
          const capabilityFields = document.createElement("section");
          capabilityFields.className = "member-capability-fields";
          window.MemberProfile.mount(capabilityFields);
          documentFields.insertAdjacentElement("afterend", capabilityFields);
          form.querySelector('[name="sensitiveDataConsent"]').nextElementSibling.innerHTML = `Autorizo de forma previa, expresa e informada a IPUC Villa del Río a tratar mis datos identificativos, fecha de nacimiento, información sobre bautismo y llenura del Espíritu Santo, mi vinculación como miembro y, si los proporciono, mi oficio, habilidades y áreas de interés, para gestionar mi membresía y orientar oportunidades de servicio. Estos datos solo serán consultados por administración autorizada. Esta autorización no es necesaria para asistir a los cultos. Podré conocer, actualizar, rectificar o solicitar la supresión de mis datos o revocar esta autorización escribiendo a <a href="mailto:decomvilladelrio@gmail.com">decomvilladelrio@gmail.com</a>.`;
          const syncRoleField = () => {
            const hasRole = form.querySelector('[name="hasChurchRole"]:checked')?.value === "si";
            if (!hasRole) assignmentList.querySelectorAll("[data-member-assignment]:not(:first-child)").forEach(row => row.remove());
            assignmentFields.hidden = !hasRole;
            assignmentList.querySelectorAll("[data-member-assignment]").forEach((row, index) => {
              const role = row.querySelector("[data-assignment-role]");
              const committee = row.querySelector("[data-assignment-committee]");
              const custom = row.querySelector("[data-assignment-custom-name]");
              role.disabled = committee.disabled = !hasRole;
              role.required = committee.required = hasRole;
              if (!hasRole) { role.value = ""; committee.value = ""; }
              const isCustom = hasRole && committee.value === "__otro__";
              row.querySelector("[data-assignment-custom]").hidden = !isCustom;
              custom.disabled = !isCustom; custom.required = isCustom;
              if (!isCustom) custom.value = "";
              const remove = row.querySelector("[data-remove-member-assignment]");
              if (remove) remove.setAttribute("aria-label", `Quitar cargo o comité ${index + 1}`);
            });
            documentFields.hidden = false;
            documentFields.querySelectorAll("select, input").forEach(input => {
              input.disabled = false;
              input.required = hasRole || decomMode || Boolean(accountContext);
            });
            assignmentFields.querySelector("[data-add-member-assignment]").disabled = !hasRole || assignmentList.children.length >= 20;
            assignmentFields.querySelector("[data-member-assignment-list]").querySelectorAll("[data-remove-member-assignment]").forEach(button => { button.disabled = !hasRole; });
            assignmentFields.querySelector(".member-assignment-limit").hidden = assignmentList.children.length < 8;
          };
          assignmentFields.addEventListener("change", event => {
            if (event.target.matches("[data-assignment-committee]")) syncRoleField();
          });
          assignmentFields.addEventListener("click", event => {
            if (event.target.closest("[data-add-member-assignment]")) {
              if (assignmentList.children.length < 20) { assignmentList.insertAdjacentHTML("beforeend", assignmentMarkup(true)); syncRoleField(); assignmentList.lastElementChild.querySelector("[data-assignment-role]").focus(); }
            }
            if (event.target.closest("[data-remove-member-assignment]")) { event.target.closest("[data-member-assignment]").remove(); syncRoleField(); }
          });
          form.querySelectorAll('[name="hasChurchRole"]').forEach(input => input.addEventListener("change", syncRoleField));
          const photoInput = form.elements.namedItem("photo");
          const preview = form.querySelector("[data-member-photo-preview]");
          photoInput.addEventListener("change", () => { const file = photoInput.files?.[0]; if (preview.dataset.url) URL.revokeObjectURL(preview.dataset.url); preview.hidden = !file; if (file) { preview.dataset.url = URL.createObjectURL(file); preview.src = preview.dataset.url; } });
          form.addEventListener("submit", async event => {
            event.preventDefault();
            const status = form.querySelector("[data-member-status]");
            if (!form.reportValidity()) {
              const invalid = form.querySelector(":invalid:not(:disabled)");
              const label = invalid?.type === "radio"
                ? invalid.closest("fieldset")?.querySelector("legend")?.textContent.trim()
                : invalid?.closest("label")?.childNodes[0]?.textContent.trim();
              status.textContent = `Revisa el formulario${label ? `: ${label}` : ""}. Completa los campos obligatorios y vuelve a intentarlo.`;
              invalid?.scrollIntoView({ behavior: "smooth", block: "center" });
              invalid?.focus({ preventScroll: true });
              return;
            }
            const submit = form.querySelector("button[type=submit]"); submit.disabled = true; status.textContent = "Enviando de forma segura…";
            const data = new FormData(form);
            const selectedPhoto = photoInput.files?.[0];
            const hasRole = form.querySelector('[name="hasChurchRole"]:checked')?.value === "si";
            const photoConsent = form.elements.namedItem("photoConsent").checked;
            const keepExistingPhoto = Boolean(accountContext?.member?.photo_url || accountContext?.member?.photo_path || accountContext?.member?.photo_preview_url);
            if ((!selectedPhoto || !selectedPhoto.size) && !keepExistingPhoto) { status.textContent = "Selecciona una foto para completar el registro."; submit.disabled = false; return; }
            if (!photoConsent) { status.textContent = "Debes autorizar el almacenamiento privado de la foto."; submit.disabled = false; return; }
            if (selectedPhoto?.size && !["image/jpeg", "image/png", "image/webp"].includes(selectedPhoto.type)) { status.textContent = "Elige una foto JPG, PNG o WebP."; submit.disabled = false; return; }
            if (selectedPhoto?.size > 5 * 1024 * 1024) { status.textContent = "La foto supera el máximo permitido de 5 MB."; submit.disabled = false; return; }
            data.set("consent", String(form.elements.namedItem("sensitiveDataConsent").checked));
            data.set("sensitiveDataConsent", String(form.elements.namedItem("sensitiveDataConsent").checked));
            data.set("photoConsent", String(photoConsent));
            data.set("attendanceConsent", String(form.elements.namedItem("attendanceConsent").checked));
            data.set("hasChurchRole", String(hasRole)); data.set("consentVersion", "2026-09-v5");
            const assignments = hasRole ? [...assignmentList.querySelectorAll("[data-member-assignment]")].map(row => ({
              role: row.querySelector("[data-assignment-role]").value.trim(),
              committee: row.querySelector("[data-assignment-committee]").value === "__otro__" ? row.querySelector("[data-assignment-custom-name]").value.trim() : row.querySelector("[data-assignment-committee]").value,
              custom: row.querySelector("[data-assignment-committee]").value === "__otro__",
            })) : [];
            data.set("churchAssignments", JSON.stringify(assignments));
            data.set("churchRole", assignments.map(item => item.role).join(" | "));
            data.set("churchCommittee", assignments.map(item => item.committee).join(" | "));
            data.set("churchCommitteeIsCustom", "false");
            const selectedSkills = [...capabilityFields.querySelectorAll('[name="skills"]:checked')].map(input => input.value);
            const customSkill = capabilityFields.querySelector('[name="skillsOther"]').value.trim();
            const selectedInterests = [...capabilityFields.querySelectorAll('[name="supportInterests"]:checked')].map(input => input.value);
            data.set("skills", JSON.stringify(selectedSkills));
            data.set("skillsOther", customSkill);
            data.set("occupation", capabilityFields.querySelector('[name="occupation"]').value.trim());
            data.set("supportInterests", JSON.stringify(selectedInterests));
            window.MemberProfile.serialize(form, data);
            data.set("guardianConsent", String(form.elements.namedItem("guardianConsent").checked));
            data.set("minorInformedConsent", String(form.elements.namedItem("minorInformedConsent").checked));
            data.set("isBaptized", String(form.querySelector('[name="isBaptized"]:checked')?.value === "true"));
            data.set("filledWithHolySpirit", String(form.querySelector('[name="filledWithHolySpirit"]:checked')?.value === "true"));
            if (decomMode) {
              try { await window.DecomRegistration.save(data, form); }
              catch (error) { status.textContent = error.message || "No se pudo guardar. Conserva el formulario e intenta de nuevo."; submit.disabled = false; }
              return;
            }
            let photoDataUrl = "";
            let photoPreparationWarning = "";
            if (hasRole && !accountContext) {
              try { photoDataUrl = await prepareMemberCardPhoto(selectedPhoto); }
              catch (error) {
                photoPreparationWarning = "La foto se enviará y guardará, pero este dispositivo no pudo preparar la vista del carnet. La iglesia podrá generarlo desde administración.";
                console.warn("No se pudo preparar la vista local del carnet.", error);
              }
            }
            try {
              let verifiedAccessToken = "";
              if (accountContext) {
                const { data: sessionData, error: sessionError } = await cloud.app.auth.getSession();
                if (sessionError || !sessionData.session) throw new Error("Inicia sesión nuevamente para guardar los cambios.");
                verifiedAccessToken = sessionData.session.access_token;
                data.set("accountMode", "true");
                if (accountContext.adminMemberId) data.set("adminMemberId", accountContext.adminMemberId);
              }
              const sendRegistration = () => fetch(`${SUPABASE_CONFIG.url}/functions/v1/member-registration`, { method: "POST", headers: { apikey: SUPABASE_CONFIG.publishableKey, ...(verifiedAccessToken ? { Authorization: `Bearer ${verifiedAccessToken}` } : {}) }, body: data });
              let response = await sendRegistration();
              let result = await response.json();
              if (!accountContext && response.status === 409 && result.code === "existing_member") {
                const wantsChanges = window.confirm("Ya existe un registro de membresía con este documento. ¿Deseas enviar una solicitud para actualizar tus datos? Los cambios solo se aplicarán después de que administración los revise y apruebe.");
                if (!wantsChanges) { status.textContent = "No se hicieron cambios en tu registro."; submit.disabled = false; return; }
                if (!cloud.supabaseModule) throw new Error("La verificación por correo no está disponible en este momento. Inténtalo más tarde.");
                const email = String(data.get("email") || "").trim().toLowerCase();
                const verificationClient = cloud.supabaseModule.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.publishableKey, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
                status.textContent = "Enviando código al correo registrado…";
                const { error: sendCodeError } = await verificationClient.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
                if (sendCodeError) throw new Error("No se pudo enviar el código al correo. Revisa que sea el correo registrado e inténtalo más tarde.");
                const token = window.prompt("Ingresa el código enviado al correo registrado:");
                if (token === null) { status.textContent = "Solicitud cancelada; no se enviaron cambios."; submit.disabled = false; return; }
                const { data: verified, error: verifyCodeError } = await verificationClient.auth.verifyOtp({ email, token: token.trim(), type: "email" });
                if (verifyCodeError || !verified.session?.access_token || verified.user?.email?.toLowerCase() !== email) throw new Error("El código no es válido o ya venció. Inicia de nuevo la solicitud.");
                verifiedAccessToken = verified.session.access_token;
                data.set("requestChanges", "true");
                status.textContent = "Enviando solicitud verificada para revisión…";
                response = await sendRegistration();
                result = await response.json();
              }
              if (!response.ok || !result.ok) throw new Error(result.error || "No se pudo completar el registro.");
              if (accountContext) {
                platform.memberCard = null;
                view().innerHTML = `<section class="account-panel"><h1>${result.changeRequest ? "Actualización enviada" : "Membresía guardada"}</h1><p>${result.changeRequest ? "Administración revisará los cambios antes de actualizar el registro y el carnet oficiales." : "La información quedó guardada correctamente."}</p><a class="primary-link" href="${accountContext.adminMemberId ? "/admin" : "/cuenta/membresia"}">Volver a ${accountContext.adminMemberId ? "administración" : "mi cuenta"}</a></section>`;
                if (accountContext.adminMemberId) void loadMembershipAdmin();
                return;
              }
              if (result.changeRequest) {
                platform.memberCard = { fullName: String(data.get("fullName")).trim(), changeRequest: true };
                renderMembershipPage();
                return;
              }
              platform.memberCard = { fullName: String(data.get("fullName")).trim(), memberNumber: result.memberNumber, hasChurchRole: hasRole, churchRole: hasRole ? String(data.get("churchRole")).trim() : "", churchCommittee: hasRole ? String(data.get("churchCommittee")).trim() : "", churchAssignments: assignments, documentType: hasRole ? String(data.get("documentType")) : "", documentNumber: hasRole ? String(data.get("documentNumber")).trim().toUpperCase() : "", photoDataUrl, photoFile: hasRole ? selectedPhoto : null, photoPreparationWarning, svgUrl: "" };
              if (hasRole && photoDataUrl) { try { await prepareMemberCardPreview(platform.memberCard); } catch (error) { platform.memberCard.photoPreparationWarning = "Tu registro sí se guardó. No se pudo mostrar el carnet aquí; la foto quedó almacenada para administración."; console.warn("El carnet se podrá volver a generar desde el botón de descarga.", error); } }
              renderMembershipPage();
            } catch (error) { status.textContent = error.message || "No se pudo enviar el formulario. Inténtalo de nuevo."; submit.disabled = false; }
          });
          syncRoleField();
          window.MemberProfile.wizard(form);
          if (accountContext) {
            window.AccountUI.fill(form, accountContext.member || accountContext.initial || {});
            view().querySelector(".page-head h1").textContent = accountContext.member ? "Actualizar membresía" : "Completar mi membresía";
            view().querySelector(".page-head p:last-child").textContent = accountContext.adminMemberId ? "Cambios administrativos sobre el registro oficial." : "Tu registro queda asociado a tu cuenta. Los cambios se revisarán antes de aplicarse.";
            view().querySelector(".page-head").insertAdjacentHTML("beforeend", `<a class="small-action" href="${accountContext.adminMemberId ? "/admin" : "/cuenta/"}">Volver</a>`);
            form.querySelector('[type="submit"]').textContent = accountContext.adminMemberId ? "Guardar cambios" : accountContext.member ? "Enviar actualización" : "Guardar mi membresía";
            const documentInputs = form.querySelector(".member-document-fields");
            documentInputs.hidden = false;
            documentInputs.querySelectorAll("input,select").forEach(input => { input.disabled = false; input.required = true; });
          }
          if (decomMode) window.DecomRegistration.bindForm(form);
        }
        view().querySelectorAll("[data-download-member-card]").forEach(download => {
          if (!card) return;
          download.onclick = async () => {
            const status = view().querySelector("[data-member-status]");
            download.disabled = true;
            let temporaryUrl = "";
            try {
              if (!card.svgUrl) await prepareMemberCardPreview(card);
              const format = download.dataset.downloadMemberCard;
              let url = card.svgUrl;
              if (format === "png") {
                const image = new Image(); image.src = card.svgUrl; await image.decode();
                const canvas = document.createElement("canvas"); canvas.width = 624; canvas.height = 964;
                const context = canvas.getContext("2d"); context.drawImage(image, 0, 0, canvas.width, canvas.height);
                const png = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
                if (!png) throw new Error("No se pudo exportar el carnet como imagen.");
                temporaryUrl = URL.createObjectURL(png); url = temporaryUrl;
              }
              const link = document.createElement("a");
              link.href = url; link.download = `Carnet-IPUC-${safeFileName(card.fullName)}.${format}`;
              document.body.appendChild(link); link.click(); link.remove();
              if (temporaryUrl) URL.revokeObjectURL(temporaryUrl);
              renderMembershipPage();
            } catch (error) {
              if (temporaryUrl) URL.revokeObjectURL(temporaryUrl);
              if (status) status.textContent = error.message || "No se pudo generar el carnet.";
              download.disabled = false;
            }
          };
        });
      }

      function parseRoute() {
        const raw = location.pathname.replace(/^\//, "") || (location.hash.startsWith("#/") ? location.hash.replace(/^#\/?/, "") : "inicio");
        const parts = raw.split("/").filter(Boolean);
        const requestedName = parts[0] || "inicio";
        const name = requestedName === "inicioquiero" ? "inicio" : requestedName;
        return { name, id: decodeURIComponent(parts[1] || "") };
      }

      function updateActiveNavigation(routeName) {
        const activeRoute = routeName === "evento" ? "eventos" : routeName;
        document.querySelectorAll("[data-route-link]").forEach(link => {
          const active = link.dataset.routeLink === activeRoute;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "page");
          else link.removeAttribute("aria-current");
        });
      }

      function view() {
        return document.getElementById("routeView");
      }

      async function initializeCloud() {
        try {
          await import("/js/vendor/supabase-2.57.4.js");
          const supabase = window.supabase;
          cloud.supabaseModule = supabase;
          cloud.app = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.publishableKey, { auth: { storage: window.AccountUI.storage } });
          cloud.auth = cloud.app;
          cloud.db = cloud.app;
          cloud.storage = cloud.app.storage;
          cloud.authMod = supabaseAuthAdapter;
          cloud.dbMod = supabaseDbAdapter;
          cloud.storageMod = supabaseStorageAdapter;
          cloud.enabled = true;
          cloud.ready = true;
          cloud.driveReady = false;
          cloud.error = "";
          if (!navigator.onLine && parseRoute().name === "membresia" && parseRoute().id === "decom") {
            // The local vault does not need public feeds, realtime, or API retries.
            cloud.app.auth.stopAutoRefresh();
            window.addEventListener("online", () => initializeCloud(), { once: true });
            return;
          }
          cloud.storageReady = false;
          void checkSupabaseStorageAvailability(SUPABASE_CONFIG.storageBucket, "event-media").then(ready => {
            cloud.storageReady = ready;
            if (parseRoute().name === "admin") scheduleRouteRender();
          });
          // El bucket privado requiere sesión para consultar su contenido. Su existencia
          // queda garantizada por la migración; el permiso real se valida al cargar.
          cloud.leaderStorageReady = true;
          setupLiveVisitors();
          supabaseAuthAdapter.onAuthStateChanged(cloud.auth, user => {
            cloud.user = user;
            checkDriveConnection(user);
            setupDecomListener();
            setupPrivateCloudListeners();
            refreshAdminNav();
            const route = parseRoute();
            if (route.name === "cuenta" || route.name === "login" || route.name === "lideres") setTimeout(renderRoute, 0);
            else if (route.name === "admin") scheduleRouteRender();
          });
          ["events", "announcements", "reflections", "podcasts", "settings"].forEach(collectionName => {
            cloud.unsubscribers.push(supabaseDbAdapter.onSnapshot(collectionName, snapshot => {
              if (collectionName === "events") {
                const events = {};
                snapshot.forEach(item => { events[item.id] = normalizeCloudDoc(item.id, item.data()); });
                APP_STATE.events = events;
              } else if (collectionName === "announcements") {
                APP_STATE.announcements = snapshot.docs.map(item => normalizeCloudDoc(item.id, item.data())).sort((a, b) => (a.date || a.startsAt || "").localeCompare(b.date || b.startsAt || ""));
              } else if (collectionName === "reflections") {
                const reflections = {};
                snapshot.forEach(item => { reflections[item.id] = normalizeCloudDoc(item.id, item.data()); });
                APP_STATE.reflections = reflections;
              } else if (collectionName === "podcasts") {
                APP_STATE.podcasts = snapshot.docs.map(item => normalizeCloudDoc(item.id, item.data())).sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
              } else if (collectionName === "settings") {
                const data = snapshot.docs.find(item => item.id === "site")?.data() || {};
                APP_STATE.music = data.music || null;
                APP_STATE.weeklySchedule = data.weeklySchedule || null;
                setupChurchMusic();
              }
              scheduleRouteRender();
            }, error => { cloud.error = error.message; scheduleRouteRender(); }));
          });
        } catch (error) {
          cloud.error = `No se pudo iniciar Supabase: ${error.message}`;
          if (["cuenta", "login"].includes(parseRoute().name)) view().innerHTML = '<section class="account-panel"><h1>Mi cuenta</h1><p role="alert">No se pudo conectar. Comprueba tu conexión y vuelve a cargar la página.</p><button class="primary-link" onclick="location.reload()">Volver a intentar</button></section>';
          else scheduleRouteRender();
        }
      }

      const supabaseAuthAdapter = {
        onAuthStateChanged(client, callback) {
          let lastUserId = "__unknown__";
          const emit = session => {
            const user = session?.user || null;
            const userId = user?.id || "__signed_out__";
            if (userId === lastUserId) return;
            lastUserId = userId;
            callback(user);
          };
          client.auth.getSession()
            .then(({ data }) => emit(data.session))
            .catch(() => emit(null));
          const { data } = client.auth.onAuthStateChange((_event, session) => {
            if (_event === "PASSWORD_RECOVERY") { accountRecovery = true; setTimeout(renderRoute, 0); }
            emit(session);
          });
          return () => data.subscription.unsubscribe();
        },
        async signInWithEmailAndPassword(client, email, password) {
          return client.auth.signInWithPassword({ email, password });
        },
        async signOut(client) { return client.auth.signOut(); }
      };

      const supabaseDbAdapter = {
        collection: (_client, name) => name,
        doc: (_client, collectionName, id) => ({ collectionName, id }),
        async setDoc(ref, data) {
          const payload = cleanSupabasePayload(toSupabaseRow(data));
          const result = await cloud.db.from(tableName(ref.collectionName)).upsert({ id: ref.id, ...payload });
          if (result.error) throw result.error;
          return result;
        },
        async updateDoc(ref, data) {
          const result = await cloud.db.from(tableName(ref.collectionName)).update(toSupabaseRow(cleanSupabasePayload(data))).eq("id", ref.id);
          if (result.error) throw result.error;
          return result;
        },
        async deleteDoc(ref) {
          const result = await cloud.db.from(tableName(ref.collectionName)).delete().eq("id", ref.id);
          if (result.error) throw result.error;
          return result;
        },
        deleteField: () => undefined,
        serverTimestamp: () => new Date().toISOString(),
        onSnapshot(collectionName, callback, onError) {
          let active = true;
          let inFlight = null;
          let queued = false;
          const table = tableName(collectionName);
          const load = async () => {
            queued = true;
            if (inFlight) return inFlight;
            inFlight = (async () => {
              while (active && queued) {
                queued = false;
                const query = collectionName === "settings" ? cloud.db.from("settings").select("*").eq("id", "site") : cloud.db.from(table).select("*");
                const { data, error } = await query;
                if (!active) return;
                if (error) {
                  onError(error);
                  continue;
                }
                const docs = (data || []).map(row => ({ id: row.id, data: () => fromSupabaseRow(row) }));
                callback({ docs, forEach(fn) { docs.forEach(fn); } });
              }
            })().finally(() => { inFlight = null; });
            return inFlight;
          };
          load();
          const channel = cloud.app?.channel?.(`data-${table}`)
            ?.on("postgres_changes", { event: "*", schema: "public", table }, load)
            ?.subscribe(status => {
              if (active && (status === "CHANNEL_ERROR" || status === "TIMED_OUT")) onError(new Error(`La actualización en tiempo real no está disponible (${status}).`));
            });
          return () => {
            active = false;
            if (channel && cloud.app?.removeChannel) cloud.app.removeChannel(channel);
          };
        }
      };

      function cleanSupabasePayload(data) {
        return Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined));
      }

      function tableName(collectionName) {
        return { decomTurns: "decom_turns", committeeLeaders: "committee_leaders", leaderSubmissions: "leader_submissions" }[collectionName] || collectionName;
      }

      function syncLocalCloudDoc(collectionName, id, data) {
        const next = { ...(data || {}), id };
        if (collectionName === "events") APP_STATE.events[id] = { ...(APP_STATE.events[id] || {}), ...next };
        if (collectionName === "reflections") APP_STATE.reflections[id] = { ...(APP_STATE.reflections[id] || {}), ...next };
        if (collectionName === "podcasts") {
          const existing = APP_STATE.podcasts.findIndex(item => item.id === id);
          if (existing >= 0) APP_STATE.podcasts[existing] = { ...APP_STATE.podcasts[existing], ...next };
          else APP_STATE.podcasts.unshift(next);
        }
        if (collectionName === "decomTurns") APP_STATE.decomTurns[id] = { ...(APP_STATE.decomTurns[id] || {}), ...next };
        if (collectionName === "committeeLeaders") {
          const existing = APP_STATE.committeeLeaders.findIndex(item => item.id === id);
          if (existing >= 0) APP_STATE.committeeLeaders[existing] = { ...APP_STATE.committeeLeaders[existing], ...next };
          else APP_STATE.committeeLeaders.push(next);
        }
        if (collectionName === "leaderSubmissions") {
          const existing = APP_STATE.leaderSubmissions.findIndex(item => item.id === id);
          if (existing >= 0) APP_STATE.leaderSubmissions[existing] = { ...APP_STATE.leaderSubmissions[existing], ...next };
          else APP_STATE.leaderSubmissions.push(next);
        }
        if (collectionName === "announcements") {
          const existing = APP_STATE.announcements.findIndex(item => item.id === id);
          if (existing >= 0) APP_STATE.announcements[existing] = { ...APP_STATE.announcements[existing], ...next };
          else APP_STATE.announcements.push(next);
        }
        if (collectionName === "settings") {
          if (Object.prototype.hasOwnProperty.call(data || {}, "music")) APP_STATE.music = data.music || null;
          if (Object.prototype.hasOwnProperty.call(data || {}, "weeklySchedule")) APP_STATE.weeklySchedule = data.weeklySchedule || null;
        }
      }

      function cloudActionMessage(error) {
        const code = `${error?.code || ""} ${error?.message || ""}`.toLowerCase();
        if (code.includes("bucket not found") || code.includes("nosuchbucket")) {
          return "Supabase todavía no tiene creado el almacenamiento de archivos. Crea el bucket público «event-media» en Supabase y vuelve a intentarlo.";
        }
        if (code.includes("invalid refresh token") || code.includes("refresh token not found")) {
          return "La sesión administrativa venció. Recarga la página e inicia sesión nuevamente.";
        }
        if (code.includes("row-level security") || code.includes("new row violates") || code.includes("permission denied") || code.includes("not authorized")) {
          return "Supabase rechazó la operación por permisos. Revisa las políticas de la tabla o inicia sesión con una cuenta administradora.";
        }
        return error?.message || "No se pudo completar la acción. Inténtalo de nuevo.";
      }

      function toSupabaseRow(data) {
        const aliases = { startTime: "start_time", endTime: "end_time", place: "location", organizer: "department", eventId: "related_event_id", submissionEventId: "event_id", eventLabel: "event_label", leaderEmail: "leader_email", submissionTitle: "request_title", startsAt: "starts_at", expiresAt: "expires_at", createdAt: "created_at", updatedAt: "updated_at", createdBy: "created_by", specialEventIds: "special_event_ids", weeklySchedule: "weekly_schedule", autoStyle: "auto_style" };
        const row = {};
        const allowedColumns = { id: 1, title: 1, description: 1, category: 1, date: 1, email: 1, start_time: 1, end_time: 1, type: 1, status: 1, location: 1, department: 1, responsible: 1, featured: 1, published: 1, tags: 1, observations: 1, media: 1, cover: 1, gallery: 1, invitations: 1, image: 1, attachments: 1, custom: 1, deleted: 1, auto_style: 1, created_at: 1, updated_at: 1, created_by: 1, related_event_id: 1, priority: 1, starts_at: 1, expires_at: 1, time: 1, assigned: 1, support: 1, special_event_ids: 1, music: 1, weekly_schedule: 1, leader_email: 1, event_id: 1, event_label: 1, request_title: 1, message: 1, files: 1, committee: 1, active: 1 };
        Object.entries(data || {}).forEach(([key, value]) => { const target = aliases[key] || key; if (target in allowedColumns) row[target] = value; });
        return row;
      }

      function fromSupabaseRow(row) {
        const aliases = { start_time: "startTime", end_time: "endTime", location: "place", department: "organizer", related_event_id: "eventId", event_id: "submissionEventId", event_label: "eventLabel", leader_email: "leaderEmail", request_title: "submissionTitle", starts_at: "startsAt", expires_at: "expiresAt", created_at: "createdAt", updated_at: "updatedAt", created_by: "createdBy", special_event_ids: "specialEventIds", weekly_schedule: "weeklySchedule", auto_style: "autoStyle" };
        return Object.fromEntries(Object.entries(row || {}).map(([key, value]) => [aliases[key] || key, value]));
      }

      const supabaseStorageAdapter = {
        ref: (_storage, path, bucket = SUPABASE_CONFIG.storageBucket) => ({ path, bucket }),
        async uploadBytes(ref, file, options) {
          const authClient = cloud.app?.auth;
          if (!authClient?.getSession) throw new Error("No se pudo acceder a la sesión administrativa. Recarga la página e inicia sesión nuevamente.");
          const { data, error } = await authClient.getSession();
          if (error) throw error;
          const accessToken = data?.session?.access_token;
          if (!accessToken) throw new Error("La sesión administrativa expiró. Vuelve a iniciar sesión.");
          const endpoint = `${SUPABASE_CONFIG.url}/storage/v1/object/${encodeURIComponent(ref.bucket || SUPABASE_CONFIG.storageBucket)}/${ref.path.split("/").map(encodeURIComponent).join("/")}`;
          return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open("POST", endpoint);
            request.setRequestHeader("Authorization", `Bearer ${accessToken}`);
            request.setRequestHeader("apikey", SUPABASE_CONFIG.publishableKey);
            request.setRequestHeader("Content-Type", options?.contentType || file.type || "application/octet-stream");
            request.setRequestHeader("x-upsert", "true");
            request.upload.addEventListener("progress", event => {
              if (event.lengthComputable) options?.onProgress?.(event.loaded, event.total);
            });
            request.addEventListener("load", () => {
              let body = null;
              try { body = request.responseText ? JSON.parse(request.responseText) : null; } catch (error) { body = null; }
              if (request.status >= 200 && request.status < 300) return resolve({ data: body });
              reject(new Error(body?.message || body?.error || `No se pudo subir el archivo (${request.status}).`));
            });
            request.addEventListener("error", () => reject(new Error("No se pudo conectar con el almacenamiento. Revisa tu conexión e inténtalo de nuevo.")));
            request.addEventListener("timeout", () => reject(new Error("La carga tardó demasiado. Revisa tu conexión e inténtalo de nuevo.")));
            request.timeout = 10 * 60 * 1000;
            request.send(file);
          });
        },
        async getDownloadURL(ref) { const { data } = cloud.storage.from(ref.bucket || SUPABASE_CONFIG.storageBucket).getPublicUrl(ref.path); return data.publicUrl; },
        async getSignedDownloadURL(ref, expiresIn = 3600) { const { data, error } = await cloud.storage.from(ref.bucket || SUPABASE_CONFIG.storageBucket).createSignedUrl(ref.path, expiresIn); if (error) throw error; return data.signedUrl; },
        async deleteObject(ref) { return cloud.storage.from(ref.bucket || SUPABASE_CONFIG.storageBucket).remove([ref.path]); }
      };

      async function checkDriveConnection(user) {
        cloud.driveReady = false;
        cloud.driveError = "";
        if (!user || !SUPABASE_CONFIG.driveFunction || !cloud.app?.functions) return;
        try {
          const form = new FormData();
          form.append("action", "status");
          const { data, error } = await cloud.app.functions.invoke(SUPABASE_CONFIG.driveFunction, { body: form });
          if (error || data?.error || !data?.configured) throw new Error(data?.error || error?.message || "Google Drive todavía no está configurado.");
          cloud.driveReady = true;
        } catch (error) {
          cloud.driveError = error.message || "Google Drive todavía no está configurado.";
        }
        const route = parseRoute();
        if (route.name === "admin" || route.name === "login") renderRoute();
      }

      async function checkSupabaseStorageAvailability(bucket = SUPABASE_CONFIG.storageBucket, label = bucket) {
        try {
          const headers = { apikey: SUPABASE_CONFIG.publishableKey, "Content-Type": "application/json" };
          const sessionResult = await Promise.resolve(cloud.app?.auth?.getSession?.()).catch(() => null);
          const accessToken = sessionResult?.data?.session?.access_token;
          if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
          const response = await fetch(`${SUPABASE_CONFIG.url}/storage/v1/object/list/${encodeURIComponent(bucket)}`, {
            method: "POST",
            headers,
            body: JSON.stringify({ prefix: "", limit: 1, offset: 0 })
          });
          const body = await response.json().catch(() => null);
          const description = `${body?.code || ""} ${body?.message || ""} ${body?.error || ""}`.toLowerCase();
          if (response.status === 404 || description.includes("nosuchbucket") || description.includes("bucket not found")) {
            if (bucket === SUPABASE_CONFIG.storageBucket) cloud.storageError = `No existe el almacenamiento «${label}» en Supabase.`;
            if (bucket === SUPABASE_CONFIG.leaderBucket) cloud.leaderStorageError = `No existe el almacenamiento «${label}» en Supabase.`;
            return false;
          }
          if (response.status >= 500) {
            if (bucket === SUPABASE_CONFIG.storageBucket) cloud.storageError = "No se pudo comprobar el almacenamiento de Supabase. Inténtalo de nuevo en unos minutos.";
            if (bucket === SUPABASE_CONFIG.leaderBucket) cloud.leaderStorageError = "No se pudo comprobar el almacenamiento privado. Inténtalo de nuevo en unos minutos.";
            return false;
          }
          if (bucket === SUPABASE_CONFIG.storageBucket) cloud.storageError = "";
          if (bucket === SUPABASE_CONFIG.leaderBucket) cloud.leaderStorageError = "";
          return true;
        } catch (error) {
          if (bucket === SUPABASE_CONFIG.storageBucket) cloud.storageError = "No se pudo comprobar el almacenamiento de Supabase. Revisa tu conexión e inténtalo de nuevo.";
          if (bucket === SUPABASE_CONFIG.leaderBucket) cloud.leaderStorageError = "No se pudo comprobar el almacenamiento privado. Revisa tu conexión e inténtalo de nuevo.";
          return false;
        }
      }

      function normalizeCloudDoc(id, data) {
        return {
          id,
          ...data,
          createdAt: normalizeCloudDate(data.createdAt),
          updatedAt: normalizeCloudDate(data.updatedAt)
        };
      }

      function normalizeCloudDate(value) {
        if (!value) return "";
        if (typeof value === "string") return value;
        if (typeof value.toDate === "function") return value.toDate().toISOString();
        return "";
      }

      function requireCloudAdmin() {
        if (!cloud.enabled || !cloud.ready) {
          alert("Supabase todavía no está disponible. Recarga la página e inténtalo nuevamente.");
          return false;
        }
        if (!isAdmin()) {
          alert("Debes iniciar sesion como administrador para guardar cambios.");
          history.pushState({}, "", "/admin/login");
          renderRoute();
          return false;
        }
        return true;
      }

      function glassHeroTitleMarkup(text) {
        return Array.from(text).map((character, index) => {
          if (/\s/.test(character)) return `<span class="hero-letter hero-space" aria-hidden="true">&nbsp;</span>`;
          const tilt = index % 2 === 0 ? -4 : 4;
          return `<span class="hero-letter" style="--letter-tilt:${tilt}deg" aria-hidden="true">${escapeHtml(character)}</span>`;
        }).join("");
      }

      function worshipScheduleMarkup() {
        const selected = WORSHIP_SCHEDULE.find(item => item.day === today.getDay()) || WORSHIP_SCHEDULE[0];
        return `<section class="worship-schedule glass" aria-labelledby="worshipScheduleTitle">
          <div class="worship-schedule-head"><div><p class="eyebrow">Horarios de reuniones</p><h2 id="worshipScheduleTitle">Un tiempo para encontrarnos con Dios</h2><p>Consulta los días y horarios habituales de nuestra iglesia.</p></div><div class="worship-clock" aria-live="polite"><span class="worship-clock-face" aria-hidden="true">◷</span><strong data-worship-clock>--:--:--</strong><small>hora local</small></div></div>
          <div class="worship-day-list" role="tablist" aria-label="Días de reunión">${WORSHIP_SCHEDULE.map(item => `<button class="worship-day${item.day === selected.day ? " is-active" : ""}" type="button" role="tab" aria-selected="${item.day === selected.day}" data-worship-day="${item.day}"><span>${item.label}</span><strong>${item.time}</strong></button>`).join("")}</div>
          <div class="worship-detail" data-worship-detail><span class="worship-detail-kicker">Próxima reunión</span><strong>${selected.title}</strong><span>${selected.note}</span><b>${selected.label} · ${selected.time}</b></div>
        </section>`;
      }

      function bindWorshipSchedule() {
        const schedule = view().querySelector(".worship-schedule");
        if (!schedule) return;
        const detail = schedule.querySelector("[data-worship-detail]");
        const clock = schedule.querySelector("[data-worship-clock]");
        const updateClock = () => { if (clock) clock.textContent = new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", second: "2-digit" }); };
        updateClock();
        if (window.__ipucWorshipClock) clearInterval(window.__ipucWorshipClock);
        window.__ipucWorshipClock = window.setInterval(updateClock, 1000);
        schedule.querySelectorAll("[data-worship-day]").forEach(button => button.addEventListener("click", () => {
          const item = WORSHIP_SCHEDULE.find(entry => String(entry.day) === button.dataset.worshipDay);
          if (!item || !detail) return;
          schedule.querySelectorAll("[data-worship-day]").forEach(dayButton => { const active = dayButton === button; dayButton.classList.toggle("is-active", active); dayButton.setAttribute("aria-selected", String(active)); });
          detail.innerHTML = `<span class="worship-detail-kicker">Horario seleccionado</span><strong>${item.title}</strong><span>${item.note}</span><b>${item.label} · ${item.time}</b>`;
        }));
      }

      function podcastHasLocalMedia(item) {
        const media = item?.media;
        return Boolean(media && media.type !== "youtube" && (isAudio(media) || isVideo(media)));
      }

      function homePodcastForToday() {
        const items = (APP_STATE.podcasts || [])
          .filter(item => item.published !== false && podcastHasLocalMedia(item))
          .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
        if (!items.length) return null;
        const firstDay = new Date(today.getFullYear(), 0, 1);
        const dayOfYear = Math.max(0, Math.floor((cleanDate(today) - firstDay) / 86400000));
        return items[dayOfYear % items.length];
      }

      function homePodcastMarkup(item) {
        if (!item) return `<article class="home-story-card home-story-empty"><div><span class="home-story-kicker">Historias que Edifican</span><h2>Muy pronto encontrarás una nueva historia</h2><p>Testimonios, predicaciones y experiencias de fe publicados por nuestra iglesia.</p><a class="small-action" href="#/podcast">Ver Historias que Edifican</a></div></article>`;
        const cover = item.cover && assetSource(item.cover, "display");
        const coverStyle = cover ? ` style="background-image:linear-gradient(145deg,rgba(0,51,141,.28),rgba(8,123,136,.18)),url('${escapeHtml(cover)}')"` : "";
        return `<article class="home-story-card" aria-label="${escapeHtml(item.title || "Historia que Edifica")}"><div class="home-story-media${cover ? " has-cover" : ""}"${coverStyle}>${podcastMediaMarkup(item)}</div></article>`;
      }

      function bindHomeStoryPlayback() {
        const media = view().querySelector(".home-story-card audio, .home-story-card video");
        if (!media) return;
        media.addEventListener("play", () => {
          const churchAudio = document.getElementById("churchMusicAudio");
          if (churchAudio && !churchAudio.paused) {
            churchAudio.pause();
            setupChurchMusic();
          }
        });
      }

      function dailyVerseForDate(date = today) {
        const day = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
        return DAILY_VERSES[(day - 1) % DAILY_VERSES.length];
      }

      function renderHomePage() {
        view().innerHTML = `
          <section class="earth-hero" data-earth-hero aria-labelledby="earthHeroTitle">
            <div class="earth-hero-stage" data-earth-stage>
              <img class="earth-hero-preview" data-earth-preview src="/assets/earth/Tierra_Hero_preview.png" alt="" aria-hidden="true" decoding="async" fetchpriority="high">
              <canvas class="earth-hero-canvas" data-earth-canvas aria-hidden="true"></canvas>
              <div class="earth-hero-copy">
                <h1 id="earthHeroTitle" class="earth-hero-title">
                  <span class="sr-only">IGLESIA PENTECOSTAL UNIDA DE COLOMBIA</span>
                  <svg class="earth-hero-curve" viewBox="0 0 1000 520" preserveAspectRatio="xMidYMin meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" aria-label="IGLESIA PENTECOSTAL UNIDA DE COLOMBIA">
                    <defs><path id="earthHeroCurvePath" d="M -100 465 Q 500 170 1100 465"></path></defs>
                    <text class="earth-hero-curve-text"><textPath xlink:href="#earthHeroCurvePath" startOffset="50%" text-anchor="middle" textLength="1180" lengthAdjust="spacingAndGlyphs">IGLESIA PENTECOSTAL UNIDA DE COLOMBIA</textPath></text>
                  </svg>
                </h1>
              </div>
            </div>
          </section>
          <section class="home-verse" aria-labelledby="homeVerseTitle">
            <div class="home-verse-rule" aria-hidden="true"></div>
            <p class="home-verse-label" id="homeVerseTitle">Palabra para hoy · Reina-Valera 1909</p>
            <blockquote>“${escapeHtml(dailyVerseForDate().text)}”</blockquote>
            <cite>${escapeHtml(dailyVerseForDate().ref)}</cite>
          </section>
        `;
      }

      function setupReflectionPlaybackMemory() {
        if (window.__ipucReflectionPlaybackMemory) return;
        window.__ipucReflectionPlaybackMemory = true;
        window.addEventListener("message", event => {
          let message = event.data;
          if (typeof message === "string") {
            try { message = JSON.parse(message); } catch { return; }
          }
          const seconds = Number(message?.info?.currentTime);
          const frame = document.querySelector(".youtube-reflection iframe[data-reflection-url]");
          if (message?.event !== "infoDelivery" || !frame || !Number.isFinite(seconds) || seconds < 0) return;
          rememberReflectionPosition(frame.dataset.reflectionUrl, seconds);
        });
        window.setInterval(requestReflectionPlaybackPosition, 800);
      }

      function requestReflectionPlaybackPosition() {
        const frame = document.querySelector(".youtube-reflection iframe[data-reflection-url]");
        if (!frame?.contentWindow) return;
        const message = JSON.stringify({ event: "command", func: "getCurrentTime", args: [] });
        frame.contentWindow.postMessage(JSON.stringify({ event: "listening", id: "ipuc-reflection", channel: "ipuc-villa-del-rio" }), "*");
        frame.contentWindow.postMessage(message, "*");
      }

      function rememberReflectionPosition(url, seconds) {
        if (!url || !Number.isFinite(seconds)) return;
        const payload = { url, seconds: Math.max(0, Math.floor(seconds)) };
        try { sessionStorage.setItem("ipuc-reflection-position", JSON.stringify(payload)); } catch {}
      }

      function reflectionResumeSeconds(url) {
        if (!url) return 0;
        try {
          const payload = JSON.parse(sessionStorage.getItem("ipuc-reflection-position") || "null");
          return payload?.url === url ? Math.max(0, Number(payload.seconds) || 0) : 0;
        } catch { return 0; }
      }

      function bindLocalReflectionPlayback() {
        const media = view().querySelector(".reflection-media video[data-reflection-url], .reflection-media audio[data-reflection-url]");
        if (!media) return;
        const restore = () => {
          const seconds = reflectionResumeSeconds(media.dataset.reflectionUrl);
          if (seconds > 0 && Number.isFinite(media.duration) && seconds < media.duration) media.currentTime = seconds;
        };
        if (media.readyState >= 1) restore();
        else media.addEventListener("loadedmetadata", restore, { once: true });
        media.addEventListener("timeupdate", () => rememberReflectionPosition(media.dataset.reflectionUrl, media.currentTime), { passive: true });
      }

      function bindReflectionAutoplayUnlock() {
        document.addEventListener("click", () => {
          view().querySelectorAll(".reflection-media video, .reflection-media audio").forEach(media => {
            media.muted = false;
            media.play().catch(() => {});
          });
          view().querySelectorAll(".youtube-reflection iframe").forEach(frame => frame.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "unMute", args: [] }), "*"));
        }, { once: true });
      }

      function bindHomeMotion() {
        const sections = view().querySelectorAll(".home-hero, .home-welcome, .home-community, .type-shortcuts, .split-grid > article");
        sections.forEach((section, index) => section.style.setProperty("--reveal-delay", `${index * 80}ms`));
        if (!window.IntersectionObserver) {
          sections.forEach(section => section.classList.add("is-visible"));
          return;
        }
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: .12 });
        sections.forEach(section => observer.observe(section));
      }

      function renderCalendarPage() {
        const events = platformEventsForYear(platform.calendarDate.getFullYear());
        view().innerHTML = `
          <section class="page-head glass">
            <div><p class="eyebrow">Calendario</p><h1>${calendarTitle()}</h1><p>Consulta la programación por año, mes, semana o día.</p></div>
            <div class="head-actions">
              <button class="small-action" data-cal-prev type="button">Anterior</button>
              <button class="small-action" data-cal-today type="button">Hoy</button>
              <button class="small-action" data-cal-next type="button">Siguiente</button>
              <button class="primary-link" data-download-calendar type="button">Descargar calendario</button>
            </div>
          </section>
          <section class="calendar-legend glass">
            <span>Colores del calendario</span>
            ${typeLegendMarkup()}
          </section>
          <section class="view-switch glass">
            ${["anio", "mes", "semana", "dia"].map(item => `<button class="${platform.calendarView === item ? "active" : ""}" data-view="${item}" type="button">${viewLabel(item)}</button>`).join("")}
          </section>
          <section class="calendar-page glass">${calendarMarkup(events)}</section>
        `;
        bindCalendarControls();
        bindTypeShortcuts();
      }

      function renderAgendaPage() {
        const monthEvents = platformEventsForYear(today.getFullYear()).filter(event => parseDate(event.date).getMonth() === platform.agendaMonth);
        const upcoming = monthEvents.filter(event => platformStatus(event) !== "Realizado");
        const past = monthEvents.filter(event => platformStatus(event) === "Realizado");
        view().innerHTML = `
          <section class="page-head glass">
            <div><p class="eyebrow">Agenda</p><h1>Agenda mensual</h1><p>Selecciona un mes para ver cultos proximos y cultos realizados.</p></div>
          </section>
          <section class="month-strip glass">
            ${months.map((month, index) => `<button class="${platform.agendaMonth === index ? "active" : ""}" data-agenda-month="${index}" type="button">${capitalize(month)}</button>`).join("")}
          </section>
          <section class="agenda-grid">
            <article class="content-card glass"><div class="section-title"><p class="eyebrow">${capitalize(months[platform.agendaMonth])}</p><h2>Cultos proximos</h2></div>${agendaList(upcoming)}</article>
            <article class="content-card glass"><div class="section-title"><p class="eyebrow">${capitalize(months[platform.agendaMonth])}</p><h2>Cultos ya realizados</h2></div>${agendaList(past)}</article>
          </section>
        `;
        view().querySelectorAll("[data-agenda-month]").forEach(button => {
          button.onclick = () => {
            platform.agendaMonth = Number(button.dataset.agendaMonth);
            renderAgendaPage();
          };
        });
      }

      function renderEventsPage() {
        const filtered = filteredPlatformEvents();
        view().innerHTML = `
          <section class="page-head glass">
            <div><p class="eyebrow">Eventos</p><h1>Eventos de IPUC Villa del Río</h1><p>Invitaciones, archivos, fotos y detalles de cada actividad.</p></div>
          </section>
          <section class="filters glass">
            <input id="eventSearch" type="search" placeholder="Buscar evento o departamento" value="${escapeHtml(platform.search)}">
            <select id="eventTag"><option value="todos">Todas las etiquetas</option>${TAGS.map(tag => `<option value="${tag}" ${platform.tag === tag ? "selected" : ""}>${tag}</option>`).join("")}</select>
          </section>
          <section class="event-grid">${filtered.map(eventCard).join("") || emptyText("No hay eventos con ese filtro.")}</section>
        `;
        document.getElementById("eventSearch").oninput = event => {
          platform.search = event.target.value;
          refreshEventResults();
        };
        document.getElementById("eventTag").onchange = event => {
          platform.tag = event.target.value;
          renderEventsPage();
        };
      }

      function filteredPlatformEvents() {
        const needle = platform.search.trim().toLocaleLowerCase("es");
        return platformEventsForYear(today.getFullYear()).filter(event => {
          const byTag = platform.tag === "todos" || event.tags.includes(platform.tag);
          const haystack = `${event.title} ${event.department} ${event.place}`.toLocaleLowerCase("es");
          return byTag && (!needle || haystack.includes(needle));
        });
      }

      function refreshEventResults() {
        const grid = view().querySelector(".event-grid");
        if (!grid) return;
        const filtered = filteredPlatformEvents();
        grid.innerHTML = filtered.map(eventCard).join("") || emptyText("No hay eventos con ese filtro.");
      }

      function renderEventDetail(id) {
        const event = platformEventById(id);
        if (!event) {
          view().innerHTML = `<section class="content-card glass">${emptyText("No encontramos este evento.")}<a class="primary-link" href="#/eventos">Volver a eventos</a></section>`;
          return;
        }
        view().innerHTML = `
          <section class="detail-hero glass">
            <img src="${eventImage(event)}" alt="Imagen de ${escapeHtml(event.title)}">
            <div>
              <p class="eyebrow">${escapeHtml(platformStatus(event))}</p>
              <h1>${escapeHtml(event.title)}</h1>
              <p>${escapeHtml(eventDescription(event))}</p>
              ${eventInfoList(event)}
              <div class="detail-actions">
                <button class="primary-link" type="button" data-share-whatsapp>Compartir por WhatsApp</button>
                <button class="small-action" type="button" data-add-event="${escapeHtml(event.id)}">Agregar a mi calendario</button>
                <a class="small-action" href="#/calendario">Ver calendario</a>
              </div>
            </div>
          </section>
          ${isAdmin() ? inlineAdminEventEditor(event) : ""}
          <section class="detail-grid-page">
            <article class="content-card glass"><div class="section-title"><p class="eyebrow">Material</p><h2>Invitaciones disponibles</h2></div>${assetGrid(invitationAssets(event))}</article>
            <article class="content-card glass"><div class="section-title"><p class="eyebrow">Galería</p><h2>Fotos relacionadas</h2></div>${assetGrid(event.gallery || [])}</article>
            <article class="content-card glass wide"><div class="section-title"><p class="eyebrow">Documentos</p><h2>Archivos descargables</h2></div>${fileList(event.attachments || [])}</article>
            <article class="content-card glass wide"><div class="section-title"><p class="eyebrow">Observaciones</p><h2>Información adicional</h2></div><p>${escapeHtml(event.observations || "Sin observaciones adicionales.")}</p></article>
          </section>
        `;
        bindAssetButtons();
        view().querySelector("[data-share-whatsapp]").onclick = () => shareEventOnWhatsApp(event);
        view().querySelector("[data-add-event]").onclick = () => downloadEventsCalendar([event], `${slugify(event.title)}.ics`);
        bindInlineAdminEditor();
      }

      function inlineAdminEventEditor(event) {
        const department = event.department || event.organizer || "Pastoral";
        return `<details class="inline-admin-editor glass"><summary><span><b>Modo administrador</b><strong>Editar este evento</strong><small>Actualiza los datos o cambia la imagen que se muestra en el cronograma.</small></span><em>Solo visible para administradores</em></summary><div class="inline-admin-form"><div class="form-grid"><label>Nombre<input id="inlineTitle" value="${escapeHtml(event.title)}"></label><label>Fecha<input id="inlineDate" type="date" value="${escapeHtml(event.date)}"></label><label>Hora<input id="inlineTime" value="${escapeHtml(event.time || "")}"></label><label>Tipo<select id="inlineType">${Object.keys(TYPES).map(type => `<option value="${type}" ${event.type === type ? "selected" : ""}>${TYPES[type].label}</option>`).join("")}</select></label><label>Estado<select id="inlineStatus">${["Proximo","Pendiente","Realizado","Cancelado"].map(status => `<option ${platformStatus(event) === status ? "selected" : ""}>${status}</option>`).join("")}</select></label><label>Lugar<input id="inlinePlace" value="${escapeHtml(event.place || "IPUC Villa del Rio")}"></label><label>Comité<input id="inlineDepartment" value="${escapeHtml(department)}"></label><label>Responsable<input id="inlineResponsible" value="${escapeHtml(event.responsible || "")}"></label><label class="full file-dropzone inline-event-image-drop">Imagen del cronograma<input id="inlineEventImage" data-event-id="${escapeHtml(event.id)}" type="file" accept="image/*"><small>Arrástrala aquí o haz clic para reemplazar la imagen del día.</small></label><label class="full">Descripción<textarea id="inlineDescription">${escapeHtml(event.description || "")}</textarea></label><label class="full">Observaciones<textarea id="inlineObservations">${escapeHtml(event.observations || "")}</textarea></label><div class="button-row full"><button class="primary-link" type="button" data-inline-save>Guardar cambios</button><button class="small-action" type="button" data-inline-cancel>Cancelar</button></div></div></div></details>`;
      }

      function bindInlineAdminEditor() {
        const editor = view().querySelector(".inline-admin-editor");
        if (!editor) return;
        editor.querySelector("[data-inline-save]").onclick = runAdminAction(saveInlineEvent);
        editor.querySelector("[data-inline-cancel]").onclick = () => { editor.open = false; };
        bindFileDropzones();
      }

      async function saveInlineEvent() {
        if (!requireCloudAdmin()) return;
        const input = document.getElementById("inlineEventImage");
        const eventId = input?.dataset.eventId;
        const current = platformEventById(eventId);
        if (!current) return alert("No encontramos este evento.");
        const title = document.getElementById("inlineTitle").value.trim();
        const date = document.getElementById("inlineDate").value;
        if (!title || !date) return alert("Nombre y fecha son obligatorios.");
        const payload = { ...(APP_STATE.events[eventId] || {}), id: eventId, custom: Boolean(current.custom), deleted: false, title, date, time: document.getElementById("inlineTime").value.trim() || autoTime({ date, type: document.getElementById("inlineType").value }), type: document.getElementById("inlineType").value, status: document.getElementById("inlineStatus").value, place: document.getElementById("inlinePlace").value.trim() || "IPUC Villa del Rio", department: document.getElementById("inlineDepartment").value.trim() || "Pastoral", organizer: document.getElementById("inlineDepartment").value.trim() || "Pastoral", responsible: document.getElementById("inlineResponsible").value.trim() || "Por definir", description: document.getElementById("inlineDescription").value.trim(), observations: document.getElementById("inlineObservations").value.trim(), autoStyle: current.autoStyle || "automatico", featured: Boolean(current.featured), tags: current.tags || inferTags(title, document.getElementById("inlineType").value) };
        const image = pendingUploadFiles("inlineEventImage")[0];
        if (image) payload.image = await uploadCloudFile(image, eventId, "principal", "Imagen del evento");
        await saveCloudDoc("events", eventId, payload);
        clearPendingUpload("inlineEventImage");
        completeUploadProgress("Evento actualizado correctamente.");
        alert("Evento actualizado.");
        renderRoute();
      }

      function renderLoginPage() {
        renderUserAccountPage({ name: "cuenta", id: "" });
      }

      function renderRestrictedAdminPage() {
        view().innerHTML = '<section class="account-panel"><h1>Administración restringida</h1><p>Esta sección está disponible únicamente para las cuentas administrativas autorizadas.</p><div class="account-actions"><a class="primary-link" href="/cuenta/">Volver a mi cuenta</a><button class="small-action" type="button" data-signout-restricted>Cerrar sesión</button></div></section>';
        view().querySelector("[data-signout-restricted]")?.addEventListener("click", async () => {
          await cloud.app?.auth?.signOut();
          cloud.user = null;
          renderRoute();
        });
      }

      function renderUserAccountPage(accountRoute = parseRoute()) {
        window.AccountUI.render({root:view(), client:cloud.app, config:SUPABASE_CONFIG, route:accountRoute,
          recovery:accountRecovery, clearRecovery:()=>{accountRecovery=false;}, lock:()=>window.DecomStore?.lock(),
          navigate:path=>{history.pushState({},"",path);renderRoute();}, cardBlob:membershipCardBlob,
          editForm:(member,initial)=>{platform.memberCard=null;renderMembershipPage(false,{member,initial});}
        }).catch(()=>{view().innerHTML='<section class="account-panel"><h1>Mi cuenta</h1><p>No se pudo abrir tu cuenta. Revisa la conexión y vuelve a intentarlo.</p><a href="/cuenta/">Volver a intentar</a></section>';});
      }

      async function signInAdmin(user, pass) {
        const message = document.getElementById("loginMessage");
        const submit = document.getElementById("loginSubmit");
        message.textContent = "";
        if (!user || !pass) {
          message.textContent = "Escribe tu correo y contraseña para continuar.";
          return;
        }
          const normalizedUser = String(user || "").trim().toLowerCase();
          const email = resolveAdminEmail(user) || (normalizedUser.includes("@") ? normalizedUser : "");
          if (!email) {
           message.textContent = "Escribe un correo autorizado de administrador o líder de comité.";
          return;
        }
      function renderCommitteePage() {
        stopChurchMusic();
        const host = document.createElement("div");
        view().replaceChildren(host);
        if (!cloud.ready) { host.innerHTML = '<section class="account-panel"><h1>Panel de líderes</h1><p role="status">Comprobando tu sesión…</p></section>'; return; }
        if (!cloud.user) { host.innerHTML = '<section class="account-panel"><h1>Panel de líderes</h1><p>Inicia sesión con tu cuenta habitual.</p><a class="primary-link" href="/cuenta/">Iniciar sesión</a></section>'; return; }
        import("/js/committee-panel.js?v=20261005-1").then(module => {
          if (host.isConnected) return module.mount(host, { client: cloud.app, user: cloud.user,
            events: () => platformEventsForYear(today.getFullYear()), normalizeCommittee: normalizeCommitteeKey });
        }).catch(() => { if (host.isConnected) host.innerHTML = '<section class="account-panel"><h1>Panel de líderes</h1><p role="alert">No se pudo abrir el panel. Revisa la conexión y vuelve a intentarlo.</p></section>'; });
      }

        if (!cloud.enabled || !cloud.ready) {
          message.textContent = cloud.error || "Supabase no está configurado todavía.";
          return;
        }
        try {
          submit.disabled = true;
          submit.textContent = "Verificando…";
          const result = await cloud.authMod.signInWithEmailAndPassword(cloud.auth, email, pass);
          if (result?.error) throw result.error;
          if (!result?.data?.session || !result?.data?.user) throw new Error("No se creó una sesión válida.");
          cloud.user = result.data.user;
          setupDecomListener();
          refreshAdminNav();
          history.pushState({}, "", "/admin");
          renderRoute();
        } catch (error) {
          message.textContent = firebaseAuthMessage(error);
          console.warn(error);
          submit.disabled = false;
          submit.textContent = "Iniciar sesión";
        }
      }

      function resolveAdminEmail(user) {
        const normalized = String(user || "").trim().toLowerCase();
        const adminEmails = FIREBASE_CLOUD.adminEmails || [FIREBASE_CLOUD.adminEmail].filter(Boolean);
        if (normalized === ADMIN_USER.toLowerCase() || normalized === "decomvilladelrio") {
          return adminEmails.find(email => email === "decomvilladelrio@gmail.com") || FIREBASE_CLOUD.adminEmail;
        }
        if (normalized === "estebanarango1499") {
          return adminEmails.find(email => email === "estebanarango1499@gmail.com") || "";
        }
        return adminEmails.find(email => email.toLowerCase() === normalized) || "";
      }

      function firebaseAuthMessage(error) {
        const code = `${error?.code || ""} ${error?.message || ""}`.toLowerCase();
        if (code.includes("invalid login credentials") || code.includes("invalid-credential") || code.includes("user not found")) {
          return "Revisa que el usuario exista en Supabase Auth y que la contraseña sea correcta.";
        }
        if (code.includes("email not confirmed")) {
          return "Confirma el correo del usuario en Supabase Auth antes de iniciar sesión.";
        }
        if (code.includes("too-many-requests")) {
          return "Supabase bloqueó temporalmente los intentos. Espera unos minutos y vuelve a intentar.";
        }
        return "No se pudo iniciar sesión con Supabase Auth. Revisa el usuario administrador y la clave.";
      }

      function cloudNotice() {
        if (cloud.enabled && cloud.ready) {
          const storageNotice = cloud.driveReady ? `<div class="cloud-ok">Archivos públicos: Google Drive conectado. Los envíos privados de líderes permanecen protegidos.</div>` : cloud.storageReady ? `<div class="cloud-ok">Archivos públicos: almacenamiento de respaldo activo. Los envíos privados de líderes permanecen protegidos.</div>` : `<div class="cloud-warning"><strong>Archivos desactivados:</strong> ${escapeHtml(cloud.driveError || cloud.storageError || "El almacenamiento de archivos todavía no está disponible.")}</div>`;
          return `<div class="cloud-ok">Base de datos conectada. Eventos, anuncios, reflexiones y turnos se guardan en la nube.</div>${storageNotice}`;
        }
        return `<div class="cloud-warning"><strong>Supabase pendiente:</strong> ${escapeHtml(cloud.error || "No se pudo conectar con la nube.")}</div>`;
      }

      function adminEmailAllowed() {
        const adminEmails = (FIREBASE_CLOUD.adminEmails || [FIREBASE_CLOUD.adminEmail]).map(email => email.toLowerCase());
        return Boolean(cloud.user && cloud.user.email && adminEmails.includes(cloud.user.email.toLowerCase()));
      }

      function decomEmailAllowed() {
        const decomEmails = (FIREBASE_CLOUD.decomEmails || FIREBASE_CLOUD.adminEmails || []).map(email => email.toLowerCase());
        return Boolean(cloud.user && cloud.user.email && (adminEmailAllowed() || decomEmails.includes(cloud.user.email.toLowerCase())));
      }

      function setupDecomListener() {
        if (cloud.decomUnsubscribe) {
          cloud.decomUnsubscribe();
          cloud.decomUnsubscribe = null;
        }
        if (!cloud.db || !cloud.dbMod || !decomEmailAllowed()) {
          APP_STATE.decomTurns = {};
          return;
        }
        cloud.decomUnsubscribe = cloud.dbMod.onSnapshot(cloud.dbMod.collection(cloud.db, "decomTurns"), snapshot => {
          const decomTurns = {};
          snapshot.forEach(documentSnapshot => {
            decomTurns[documentSnapshot.id] = normalizeCloudDoc(documentSnapshot.id, documentSnapshot.data());
          });
          APP_STATE.decomTurns = decomTurns;
          const route = parseRoute();
          if (route.name === "admin") renderRoute();
        }, error => {
          cloud.error = error.message;
          renderRoute();
        });
      }

      function setupPrivateCloudListeners() {
        cloud.privateUnsubscribers.forEach(unsubscribe => unsubscribe?.());
        cloud.privateUnsubscribers = [];
        APP_STATE.committeeLeaders = [];
        APP_STATE.leaderSubmissions = [];
        if (!cloud.user || !cloud.db || !cloud.dbMod) return;
        ["committeeLeaders", "leaderSubmissions"].forEach(collectionName => {
          cloud.privateUnsubscribers.push(cloud.dbMod.onSnapshot(cloud.dbMod.collection(cloud.db, collectionName), snapshot => {
            const items = snapshot.docs.map(item => normalizeCloudDoc(item.id, item.data()));
            if (collectionName === "committeeLeaders") APP_STATE.committeeLeaders = items;
            if (collectionName === "leaderSubmissions") APP_STATE.leaderSubmissions = items.sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
            const route = parseRoute();
            if (route.name === "admin" || route.name === "login") renderRoute();
          }, error => {
            cloud.error = error.message;
            const route = parseRoute();
            if (route.name === "admin" || route.name === "login") renderRoute();
          }));
        });
      }

      async function signOutAdmin() {
        window.DecomStore?.lock();
        if (cloud.auth && cloud.authMod) {
          await cloud.authMod.signOut(cloud.auth);
        }
        history.pushState({}, "", "/");
        renderRoute();
      }

      function renderLeaderProfilesModule() {
        const leaders = (APP_STATE.committeeLeaders || []).slice().sort((a, b) => committeeDisplay(a.committee).localeCompare(committeeDisplay(b.committee)));
        return `<section class="admin-module" data-admin-module="lideres" ${platform.adminSection === "lideres" ? "" : "hidden"}>
          <article class="content-card glass admin-card-wide leader-admin-module">
            <div class="section-title"><p class="eyebrow">Accesos privados</p><h2>Líderes por comité</h2><p>Autoriza el correo verificado del líder. Accederá con su cuenta habitual.</p><a class="primary-link" href="/lideres/">Comités, cargos y permisos</a></div>
            <div class="leader-admin-form form-grid">
              <label class="full">Correo del líder<input id="leaderEmail" type="email" placeholder="ejemplo@correo.com" autocomplete="off"></label>
              <label>Comité<select id="leaderCommittee">${COMMITTEES.filter(([key]) => key !== "ipuc").map(([key, label]) => `<option value="${key}">${escapeHtml(label)}</option>`).join("")}</select></label>
              <button class="primary-link" id="saveLeaderProfile" type="button">Autorizar líder</button>
            </div>
            <div class="leader-directory"><h3>Correos autorizados</h3>${leaders.length ? leaders.map(leader => `<article class="leader-directory-row"><div><strong>${escapeHtml(leader.email)}</strong><span>${escapeHtml(committeeDisplay(leader.committee))}</span></div><button class="small-action danger-action" type="button" data-delete-leader="${escapeHtml(leader.id)}">Quitar acceso</button></article>`).join("") : emptyText("Todavía no hay líderes registrados.")}</div>
          </article>
        </section>`;
      }

      function renderLeaderSubmissionsModule() {
        const submissions = (APP_STATE.leaderSubmissions || []).slice().sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
        return `<section class="admin-module" data-admin-module="solicitudes" ${platform.adminSection === "solicitudes" ? "" : "hidden"}>
          <article class="content-card glass admin-card-wide leader-admin-module">
            <div class="section-title"><p class="eyebrow">Comunicación del equipo</p><h2>Solicitudes de líderes</h2><p>Lee lo que necesita cada comité y abre sus archivos privados con un enlace temporal.</p></div>
            <div class="leader-submission-list">${submissions.length ? submissions.map(submission => {
              const files = Array.isArray(submission.files) ? submission.files : [];
              return `<article class="leader-submission-card"><div class="leader-submission-head"><div><span class="eyebrow">${escapeHtml(committeeDisplay(submission.committee))}</span><h3>${escapeHtml(submission.submissionTitle || "Solicitud de material")}</h3><p>${escapeHtml(submission.leaderEmail || "Líder autorizado")} · ${escapeHtml(formatDateShort(String(submission.createdAt || dateKey(today)).slice(0, 10)))}</p></div><span class="submission-status status-${escapeHtml(submission.status || "pendiente")}">${escapeHtml(capitalize(submission.status || "pendiente"))}</span></div>${submission.eventLabel ? `<p><strong>Evento:</strong> ${escapeHtml(submission.eventLabel)}</p>` : submission.submissionEventId ? `<p><strong>Evento:</strong> ${escapeHtml(platformEventById(submission.submissionEventId)?.title || submission.submissionEventId)}</p>` : ""}${submission.message ? `<p class="leader-message">${escapeHtml(submission.message)}</p>` : ""}${files.length ? `<div class="private-assets"><strong>Material privado</strong><div>${files.map((file, index) => `<button class="small-action" type="button" data-open-private-asset data-submission-id="${escapeHtml(submission.id)}" data-file-index="${index}">Abrir ${escapeHtml(file.name || `archivo ${index + 1}`)}</button>`).join("")}</div></div>` : `<p class="file-meta">No adjuntó archivos.</p>`}<div class="button-row submission-actions"><button class="small-action" type="button" data-submission-status="pendiente" data-submission-id="${escapeHtml(submission.id)}">Pendiente</button><button class="small-action" type="button" data-submission-status="atendida" data-submission-id="${escapeHtml(submission.id)}">Marcar atendida</button><button class="small-action" type="button" data-submission-status="rechazada" data-submission-id="${escapeHtml(submission.id)}">Cerrar solicitud</button></div></article>`;
            }).join("") : emptyText("Todavía no hay solicitudes de líderes.")}</div>
          </article>
        </section>`;
      }

      function renderPodcastModule() {
        const selected = (APP_STATE.podcasts || []).find(item => item.id === platform.selectedPodcast) || null;
        return `<section class="admin-module" data-admin-module="podcast" ${platform.adminSection === "podcast" ? "" : "hidden"}>
          <article class="content-card glass admin-card-wide podcast-admin-module">
            <div class="section-title"><p class="eyebrow">Historias de fe</p><h2>Historias que Edifican</h2><p>Publica testimonios, milagros, predicaciones especiales y experiencias de fe en audio o video.</p></div>
            <div class="form-grid">
              <label class="full">Episodio a editar<select id="podcastSelect"><option value="__new__">+ Crear episodio nuevo</option>${(APP_STATE.podcasts || []).map(item => `<option value="${escapeHtml(item.id)}" ${selected?.id === item.id ? "selected" : ""}>${escapeHtml(item.title || "Sin título")}</option>`).join("")}</select></label>
              <label class="full">Título del episodio<input id="podcastTitle" value="${escapeHtml(selected?.title || "")}" placeholder="Ej. Dios obró un milagro en mi familia"></label>
              <label>Categoría<select id="podcastCategory">${PODCAST_CATEGORIES.map(category => `<option ${selected?.category === category ? "selected" : ""}>${escapeHtml(category)}</option>`).join("")}</select></label>
              <label>Tipo de contenido<select id="podcastMediaType"><option value="youtube" ${selected?.media?.type === "youtube" ? "selected" : ""}>Video de YouTube</option><option value="upload" ${selected?.media?.type !== "youtube" ? "selected" : ""}>Audio o video de la iglesia</option></select></label>
              <label class="full">Enlace de YouTube<input id="podcastYoutube" type="url" value="${escapeHtml(selected?.media?.type === "youtube" ? selected.media.url : "")}" placeholder="https://www.youtube.com/watch?v=..."></label>
              <label class="full file-dropzone">Audio o video de Historias que Edifican<input id="podcastMediaFile" type="file" accept="audio/*,video/*"><small>El archivo se guardará en la carpeta de multimedia de Drive cuando la conexión esté activa.</small></label>
              <label class="full file-dropzone">Imagen de portada<input id="podcastCoverFile" type="file" accept="image/*"><small>Opcional. Se mostrará como portada del episodio y miniatura del video.</small></label>
              <label class="full">Descripción<textarea id="podcastDescription" placeholder="Cuenta brevemente qué encontrará la iglesia en este episodio.">${escapeHtml(selected?.description || "")}</textarea></label>
              <label class="checkbox-line"><input id="podcastPublished" type="checkbox" ${selected?.published !== false ? "checked" : ""}> Publicar en la web</label>
              <label class="checkbox-line"><input id="podcastFeatured" type="checkbox" ${selected?.featured ? "checked" : ""}> Marcar como destacado</label>
              <div class="button-row full"><button class="primary-link" id="savePodcast" type="button">Guardar episodio</button>${selected ? `<button class="small-action danger-action" id="deletePodcast" type="button">Eliminar episodio</button>` : ""}</div>
              ${selected ? `<div class="podcast-current-media full"><strong>Contenido actual:</strong> ${escapeHtml(selected.media?.name || selected.media?.url || "Sin archivo")}</div>` : ""}
            </div>
          </article>
        </section>`;
      }

      function renderAdminPage() {
        const selected = platform.selectedAdminEvent === "__new__" ? null : platformEventById(platform.selectedAdminEvent);
        const adminEvents = platformEventsForYear(today.getFullYear());
        const pendingEvents = adminEvents.filter(event => parseDate(event.date) >= today && platformStatus(event) !== "Realizado" && platformStatus(event) !== "Cancelado").sort(sortByDate);
        const allowedAdminSections = new Set(["eventos", "material", "invitaciones", "podcast", "anuncios", "reflexiones", "solicitudes", "lideres", "decom", "membresia"]);
        const activeAdminSection = allowedAdminSections.has(platform.adminSection) ? platform.adminSection : "eventos";
        const moduleVisibility = name => activeAdminSection === name ? "" : "hidden";
        const upcoming = adminEvents.filter(event => parseDate(event.date) >= today).sort((a, b) => parseDate(a.date) - parseDate(b.date))[0];
        view().innerHTML = `
          <section class="page-head glass">
            <div><p class="eyebrow">Administracion privada</p><h1>Panel de control</h1><p>Administra el cronograma desde un solo lugar. Elige una tarea y completa solo lo necesario.</p>${cloudNotice()}</div>
            <button class="small-action" data-logout type="button">Salir</button>
          </section>
          <section class="admin-summary">
            <article><strong>${adminEvents.length}</strong><span>Eventos registrados</span></article>
            <article><strong>${upcoming ? formatDateShort(upcoming.date) : "—"}</strong><span>Próximo evento</span></article>
            <article><strong>${APP_STATE.announcements?.length || 0}</strong><span>Anuncios publicados</span></article>
          </section>
          <nav class="admin-tabs glass" aria-label="Módulos de administración">
            ${[["eventos", "Eventos", "Crear o editar"], ["material", "Material", "Subir archivos"], ["invitaciones", "Invitaciones y banners", "Descargas por semana"], ["podcast", "Historias que Edifican", "Testimonios y predicas"], ["anuncios", "Anuncios", "Publicar aviso"], ["reflexiones", "Reflexiones", "Mensaje diario"], ["membresia", "Membresía", "Personas y asistencia"], ["solicitudes", "Solicitudes", "Mensajes de líderes"], ["lideres", "Líderes", "Comités y permisos"], ["decom", "DECOM", "Turnos internos"]].map(([key, label, hint]) => `<button type="button" class="admin-tab ${activeAdminSection === key ? "active" : ""}" data-admin-section="${key}"><strong>${label}</strong><span>${hint}</span></button>`).join("")}
          </nav>
          <section class="admin-layout admin-workspace">
            <section class="admin-module" data-admin-module="eventos" ${moduleVisibility("eventos")}>
            <article class="content-card glass admin-card-wide">
              <div class="section-title"><p class="eyebrow">Eventos</p><h2>Crear o editar evento</h2></div>
              <div class="event-editor-form">
                <section class="admin-form-section"><p class="eyebrow">Paso 1</p><h3>Información principal</h3><div class="form-grid"><label class="full">Evento a editar<select id="adminSelect"><option value="__new__">+ Crear evento nuevo</option>${adminEvents.map(event => `<option value="${event.id}" ${selected?.id === event.id ? "selected" : ""}>${formatDateShort(event.date)} - ${escapeHtml(event.title)}</option>`).join("")}</select></label><label class="full">Nombre del evento<input id="adminTitle2" value="${escapeHtml(selected?.title || "")}" placeholder="Ej. Culto de oración"></label><label>Fecha<input id="adminDate2" type="date" value="${escapeHtml(selected?.date || dateKey(platform.calendarDate))}"></label><label>Tipo<select id="adminType2">${Object.keys(TYPES).map(type => `<option value="${type}" ${selected?.type === type ? "selected" : ""}>${TYPES[type].label}</option>`).join("")}</select></label></div></section>
                <section class="admin-form-section"><p class="eyebrow">Paso 2</p><h3>Cuándo, dónde y quién organiza</h3><div class="form-grid"><label>Hora de inicio<input id="adminTime2" value="${escapeHtml(selected?.time || BASE_TIMES.culto)}"></label><label>Estado<select id="adminStatus2">${["Proximo","Pendiente","Realizado","Cancelado"].map(status => `<option ${platformStatus(selected || {}) === status ? "selected" : ""}>${status}</option>`).join("")}</select></label><label>Lugar<input id="adminPlace2" value="${escapeHtml(selected?.place || "IPUC Villa del Rio")}"></label><label>Responsable<input id="adminResponsible2" value="${escapeHtml(selected?.responsible || "")}" placeholder="Nombre del responsable"></label><div class="full"><span class="field-caption">Selecciona el comité</span>${committeePickerMarkup(selected)}</div></div></section>
                <details class="admin-form-section" open><summary><span><p class="eyebrow">Paso 3</p><h3>Presentación y detalles</h3></span><span class="details-hint">Opcional</span></summary><div class="form-grid"><label class="full file-dropzone event-image-drop">Imagen del evento<input id="adminEventImage" type="file" accept="image/*"><small>Esta imagen aparecerá en el calendario y en la página del evento.</small></label><label>Estilo imagen automática<select id="adminAutoStyle">${["automatico","luz","amanecer","noche","naturaleza","congregacional","sobrio"].map(style => `<option value="${style}" ${selected?.autoStyle === style ? "selected" : ""}>${style}</option>`).join("")}</select></label><label class="checkbox-line"><input id="adminFeatured2" type="checkbox" ${selected?.featured ? "checked" : ""}> Marcar como destacado</label><label class="full">Descripción<textarea id="adminDescription2" placeholder="Cuenta brevemente de qué trata la actividad.">${escapeHtml(selected?.description || "")}</textarea></label><label class="full">Observaciones<textarea id="adminObservations2" placeholder="Información adicional para la iglesia.">${escapeHtml(selected?.observations || "")}</textarea></label><div class="full tag-admin"><span class="field-caption">Categorías para encontrarlo</span>${TAGS.map(tag => `<label><input type="checkbox" value="${tag}" ${selected?.tags?.includes(tag) ? "checked" : ""}>${tag}</label>`).join("")}</div></div></details>
                <div class="button-row full">
                  <button class="primary-link" id="adminSaveEvent" type="button">Guardar evento</button>
                  <button class="small-action" id="adminDeleteEvent" type="button">Eliminar evento</button>
                </div>
              </div>
            </article>
            </section>
            <section class="admin-module" data-admin-module="material" ${moduleVisibility("material")}>
            <article class="content-card glass admin-card-wide">
              <div class="section-title"><p class="eyebrow">Material</p><h2>Subir invitaciones y archivos</h2></div>
              <div class="form-grid">
                <label class="full">1. Elige el evento<select id="materialSelect"><option value="__new__">Selecciona un evento pendiente o próximo</option>${pendingEvents.map(event => `<option value="${event.id}" ${selected?.id === event.id ? "selected" : ""}>${formatDateShort(event.date)} - ${escapeHtml(event.title)}</option>`).join("")}</select></label>
                <div class="upload-guide full"><strong>2. Agrega solo lo que tengas</strong><span>Puedes seleccionar varios archivos en cada grupo y guardar todo una sola vez.</span></div>
                <details class="upload-group full" open><summary>Imágenes principales e invitaciones</summary><div class="form-grid"><label>Imagen del evento<input id="uploadMainImage" type="file" accept="image/*"></label><label>Invitación principal<input id="uploadInviteMain" type="file" accept="image/*"></label><label>WhatsApp<input id="uploadInviteWhatsapp" type="file" accept="image/*"></label><label>Historia redes<input id="uploadInviteStory" type="file" accept="image/*"></label><label>Banner proyección<input id="uploadInviteBanner" type="file" accept="image/*"></label></div></details>
                <details class="upload-group full"><summary>Video, galería y documentos</summary><div class="form-grid"><label>Video promocional<input id="uploadInviteVideo" type="file" accept="video/*"></label><label>Fotos o videos<input id="uploadGallery" type="file" accept="image/*,video/*" multiple></label><label>PDF o archivos<input id="uploadFiles" type="file" multiple></label></div></details>
                <details class="upload-group full"><summary>Música de la iglesia</summary><div class="music-drive-guide"><strong>Lista de reproducción desde Drive</strong><span>Sube allí las canciones en MP3, M4A u otro formato de audio. La web las ordenará por nombre y pasará automáticamente a la siguiente.</span><a class="small-action" href="${MUSIC_DRIVE_FOLDER_URL}" target="_blank" rel="noopener">Abrir carpeta Música IPUC Villa del Río</a></div></details>
                <button class="primary-link full" id="adminSaveMaterial" type="button">Guardar todo el material</button>
                <div class="full admin-existing-material">${adminMaterialList(selected)}</div>
                <div class="upload-group full weekly-upload"><strong>Cronograma semanal</strong><p>Sube la imagen oficial que resume los cultos de la semana. Se mostrará directamente en la vista semanal.</p><label>Imagen de esta semana<input id="uploadWeeklySchedule" type="file" accept="image/*"></label><div class="button-row"><button class="small-action" id="saveWeeklySchedule" type="button">Guardar imagen semanal</button>${APP_STATE.weeklySchedule ? `<button class="small-action danger-action" id="deleteWeeklySchedule" type="button">Eliminar imagen actual</button>` : ""}</div>${APP_STATE.weeklySchedule ? `<small>Archivo actual: ${escapeHtml(APP_STATE.weeklySchedule.name || "Cronograma semanal")}</small>` : ""}</div>
              </div>
            </article>
            </section>
            <section class="admin-module" data-admin-module="reflexiones" ${moduleVisibility("reflexiones")}>
            <article class="content-card glass admin-card-narrow">
              <div class="section-title"><p class="eyebrow">Reflexiones</p><h2>Crear reflexión diaria</h2></div>
              <div class="form-grid">
                <label>Fecha<input id="reflectionDate" type="date" value="${dateKey(today)}"></label>
                <label>Estilo<select id="reflectionStyle"><option>amanecer</option><option>luz</option><option>noche</option><option>naturaleza</option><option>montanas</option></select></label>
                <label>Tipo de reflexión<select id="reflectionMediaType"><option value="youtube">Video de YouTube</option><option value="upload">Audio o video de la iglesia</option></select></label>
                <label>Enlace de YouTube<input id="reflectionYoutube" type="url" placeholder="https://www.youtube.com/watch?v=..."></label>
                <label class="full file-dropzone">Audio o video grabado<input id="reflectionMediaFile" type="file" accept="audio/*,video/*"></label>
                <details class="full upload-group"><summary>Texto opcional de respaldo</summary><div class="form-grid"><label class="full">Texto<textarea id="reflectionText" placeholder="Se mostrará si no hay audio o video."></textarea></label><label>Referencia<input id="reflectionRef" placeholder="Hechos 2:46"></label></div></details>
                <button class="primary-link full" id="saveReflection" type="button">Guardar reflexión multimedia</button>
              </div>
            </article>
            </section>
            ${renderPodcastModule()}
            <section class="admin-module" data-admin-module="anuncios" ${moduleVisibility("anuncios")}>
            <article class="content-card glass admin-card-narrow">
              <div class="section-title"><p class="eyebrow">Anuncios</p><h2>Últimos anuncios</h2></div>
              <div class="form-grid">
                <label>Titulo<input id="announceTitle2"></label>
                <label>Evento relacionado<select id="announceEvent2"><option value="">Sin evento</option>${platformEventsForYear(today.getFullYear()).map(event => `<option value="${event.id}">${formatDateShort(event.date)} - ${escapeHtml(event.title)}</option>`).join("")}</select></label>
                <label class="full">Descripcion<textarea id="announceDescription2"></textarea></label>
                <button class="primary-link full" id="saveAnnouncement2" type="button">Publicar anuncio</button>
              </div>
            </article>
            </section>
            <section class="admin-module" data-admin-module="decom" ${moduleVisibility("decom")}>
            ${renderDecomPanel()}
            </section>
            ${renderLeaderSubmissionsModule()}
            ${renderLeaderProfilesModule()}
            ${renderMembershipAdminModule()}
          </section>
        `;
        bindAdmin();
      }

      function renderDecomOnlyPage() {
        view().innerHTML = `
          <section class="page-head glass">
            <div><p class="eyebrow">Privado DECOM</p><h1>Cronograma interno DECOM</h1><p>Turnos internos para computador, proyeccion y multimedia. Este espacio no aparece en la parte publica.</p>${cloudNotice()}</div>
            <button class="small-action" data-logout type="button">Salir</button>
          </section>
          <section class="admin-layout">
            ${renderDecomPanel(false)}
          </section>
            <section class="admin-module" data-admin-module="invitaciones" ${moduleVisibility("invitaciones")}><div data-invitation-library></div></section>
        `;
        const logout = view().querySelector("[data-logout]");
        if (logout) logout.onclick = () => signOutAdmin();
        const library = view().querySelector("[data-invitation-library]");
        if (activeAdminSection === "invitaciones") import("/js/committee-panel.js?v=20261005-1").then(module => {
          if (library.isConnected) module.materialLibrary(library, { events: adminEvents, weekly: APP_STATE.weeklySchedule });
        }).catch(() => { if (library.isConnected) library.textContent = "No se pudo cargar la biblioteca. Vuelve a intentarlo."; });
        bindDecomControls();
      }

      function renderLeaderPage() {
        const profile = leaderProfile();
        const events = leaderEvents();
        const email = profile?.email || cloud.user?.email || "";
        const ownSubmissions = (APP_STATE.leaderSubmissions || []).filter(item => item.createdBy === cloud.user?.id || String(item.leaderEmail || "").toLowerCase() === email.toLowerCase());
        view().innerHTML = `<section class="page-head glass leader-welcome"><div><p class="eyebrow">Espacio privado de líderes</p><h1>${escapeHtml(committeeDisplay(profile?.committee))}</h1><p>Envía a DECOM las imágenes, videos y solicitudes que necesita tu comité.</p><div class="cloud-ok">Tus archivos son privados: solo tú y el equipo de administración pueden verlos.</div></div><button class="small-action" data-logout type="button">Salir</button></section>
          <section class="admin-summary leader-summary"><article><strong>${events.length}</strong><span>Eventos disponibles</span></article><article><strong>${ownSubmissions.length}</strong><span>Solicitudes enviadas</span></article><article><strong>${escapeHtml(committeeDisplay(profile?.committee))}</strong><span>Comité autorizado</span></article></section>
          <section class="admin-layout leader-workspace"><article class="content-card glass leader-form-card"><div class="section-title"><p class="eyebrow">Comunicación con DECOM</p><h2>Enviar material o solicitud</h2><p>Elige el evento, explica lo que necesitas y adjunta imágenes o videos.</p></div><div class="form-grid"><label class="full">Evento relacionado<select id="leaderEventSelect"><option value="">Selecciona un evento</option>${events.map(event => `<option value="${escapeHtml(event.id)}">${escapeHtml(formatDateShort(event.date))} · ${escapeHtml(event.title)}</option>`).join("")}</select></label><label class="full">¿Qué necesitas?<input id="leaderRequestTitle" placeholder="Ej. Invitación para proyectar el domingo"></label><label class="full">Mensaje para DECOM<textarea id="leaderRequestMessage" placeholder="Describe el material o la ayuda que necesitas."></textarea></label><label class="full file-dropzone leader-file-drop">Imágenes o videos<input id="leaderSubmissionFiles" type="file" accept="image/*,video/*,audio/*" multiple><small>Estos archivos quedarán privados hasta que Administración decida publicarlos.</small></label><button class="primary-link full" id="saveLeaderSubmission" type="button">Enviar a DECOM</button></div></article><article class="content-card glass leader-history-card"><div class="section-title"><p class="eyebrow">Seguimiento</p><h2>Mis solicitudes</h2></div><div class="leader-submission-list">${ownSubmissions.length ? ownSubmissions.map(submission => `<article class="leader-submission-card"><div class="leader-submission-head"><div><span class="eyebrow">${escapeHtml(committeeDisplay(submission.committee))}</span><h3>${escapeHtml(submission.submissionTitle || "Solicitud de material")}</h3><p>${escapeHtml(String(submission.createdAt || "").slice(0, 10) || "Enviada recientemente")}</p></div><span class="submission-status status-${escapeHtml(submission.status || "pendiente")}">${escapeHtml(capitalize(submission.status || "pendiente"))}</span></div>${submission.message ? `<p class="leader-message">${escapeHtml(submission.message)}</p>` : ""}${Array.isArray(submission.files) && submission.files.length ? `<div class="private-assets"><strong>Mis archivos</strong><div>${submission.files.map((file, index) => `<button class="small-action" type="button" data-open-private-asset data-submission-id="${escapeHtml(submission.id)}" data-file-index="${index}">Abrir ${escapeHtml(file.name || `archivo ${index + 1}`)}</button>`).join("")}</div></div>` : ""}</article>`).join("") : emptyText("Aún no has enviado solicitudes.")}</div></article></section>`;
        const logout = view().querySelector("[data-logout]");
        if (logout) logout.onclick = () => signOutAdmin();
        bindLeaderPage();
      }

      function bindLeaderPage() {
        bindFileDropzones();
        const saveButton = document.getElementById("saveLeaderSubmission");
        if (saveButton) saveButton.onclick = runAdminAction(saveLeaderSubmission);
        view().querySelectorAll("[data-open-private-asset]").forEach(button => {
          button.onclick = runAdminAction(() => openPrivateSubmissionAsset(button.dataset.submissionId, Number(button.dataset.fileIndex || 0)));
        });
      }

      function bindCalendarControls() {
        view().querySelectorAll("[data-cal-prev]").forEach(button => { button.onclick = () => moveCalendar(-1); });
        view().querySelectorAll("[data-cal-next]").forEach(button => { button.onclick = () => moveCalendar(1); });
        view().querySelector("[data-cal-today]").onclick = () => {
          platform.calendarDate = cleanDate(new Date());
          renderCalendarPage();
        };
        view().querySelectorAll("[data-view]").forEach(button => {
          button.onclick = () => {
            platform.calendarView = button.dataset.view;
            renderCalendarPage();
          };
        });
        view().querySelector("[data-download-calendar]").onclick = () => {
          const year = platform.calendarDate.getFullYear();
          downloadEventsCalendar(platformEventsForYear(year), `cronograma-ipuc-villa-del-rio-${year}.ics`);
        };
        view().querySelectorAll("[data-calendar-date]").forEach(button => {
          button.onclick = () => {
            platform.calendarDate = parseDate(button.dataset.calendarDate);
            platform.calendarView = "dia";
            renderCalendarPage();
          };
        });
      }

      function typeLegendMarkup() {
        return `<div class="type-legend">${Object.entries(TYPES).map(([type, config]) => `
          <button type="button" class="type-chip type-${type}" data-jump-type="${type}">
            <span aria-hidden="true"></span>${escapeHtml(config.label)}
          </button>`).join("")}</div>`;
      }

      function committeeHomeMarkup() {
        const tagByCommittee = { caballeros: "Caballeros", damas: "Damas", evangelismo: "Evangelismo", jovenes: "Jovenes", misiones: "Misiones", musica: "Musica", "escuela-dominical": "Escuela Dominical", "edad-dorada": "todos", familias: "todos", decom: "todos", ipuc: "todos" };
        return COMMITTEES.filter(([key]) => key !== "ipuc").map(([key, label, image]) => `<a class="home-committee-card" href="#/eventos" title="Ver actividades de ${escapeHtml(label)}" aria-label="Ver actividades de ${escapeHtml(label)}" data-home-committee="${escapeHtml(tagByCommittee[key] || "todos")}"><img src="${image}" alt="Logo de ${escapeHtml(label)}"></a>`).join("");
      }

      function bindHomeCommitteeShortcuts() {
        view().querySelectorAll("[data-home-committee]").forEach(card => {
          card.onclick = () => {
            platform.tag = card.dataset.homeCommittee || "todos";
          };
        });
      }

      function bindTypeShortcuts() {
        view().querySelectorAll("[data-jump-type]").forEach(button => {
          button.onclick = () => {
            const event = closestPlatformEvent(button.dataset.jumpType);
            if (event) { history.pushState({}, "", `/evento/${encodeURIComponent(event.id)}`); renderRoute(); }
          };
        });
      }

      function closestPlatformEvent(type) {
        const events = platformEventsForYear(today.getFullYear()).filter(event => event.type === type);
        return events.find(event => parseDate(event.date) >= today) || events[0] || null;
      }

      function moveCalendar(amount) {
        const d = platform.calendarDate;
        if (platform.calendarView === "anio") platform.calendarDate = new Date(d.getFullYear() + amount, d.getMonth(), 1);
        if (platform.calendarView === "mes") platform.calendarDate = new Date(d.getFullYear(), d.getMonth() + amount, 1);
        if (platform.calendarView === "semana") platform.calendarDate = new Date(d.getFullYear(), d.getMonth(), d.getDate() + amount * 7);
        if (platform.calendarView === "dia") platform.calendarDate = new Date(d.getFullYear(), d.getMonth(), d.getDate() + amount);
        renderCalendarPage();
      }

      function calendarMarkup(events) {
        if (platform.calendarView === "anio") return `<div class="year-view"><div class="year-period-nav">${calendarPeriodNav(calendarTitle(), "Vista anual")}</div>${months.map((month, index) => monthBlock(month, index, events)).join("")}</div>`;
        if (platform.calendarView === "semana") return weekView(events);
        if (platform.calendarView === "dia") return dayView(eventsForPlatformDate(platform.calendarDate));
        return monthView(events);
      }

      function calendarPeriodNav(label, eyebrow) {
        return `<div class="calendar-period-nav"><button class="calendar-period-arrow" data-cal-prev type="button" aria-label="Periodo anterior" title="Periodo anterior"><span aria-hidden="true">←</span></button><div><p class="eyebrow">${escapeHtml(eyebrow)}</p><h2>${escapeHtml(label)}</h2></div><button class="calendar-period-arrow" data-cal-next type="button" aria-label="Periodo siguiente" title="Periodo siguiente"><span aria-hidden="true">→</span></button></div>`;
      }

      function monthView(events) {
        const year = platform.calendarDate.getFullYear();
        const month = platform.calendarDate.getMonth();
        const first = new Date(year, month, 1);
        const offset = (first.getDay() + 6) % 7;
        const start = new Date(year, month, 1 - offset);
        const eventsByDate = new Map();
        events.forEach(event => {
          const key = String(event.date || "");
          if (!eventsByDate.has(key)) eventsByDate.set(key, []);
          eventsByDate.get(key).push(event);
        });
        const monthEvents = events.filter(event => {
          const eventDate = parseDate(event.date);
          return eventDate.getFullYear() === year && eventDate.getMonth() === month;
        });
        let html = `<div class="month-calendar-view"><div class="month-calendar-bar">${calendarPeriodNav(`${capitalize(months[month])} ${year}`, "Vista mensual")}<span class="month-summary">${monthEvents.length} ${monthEvents.length === 1 ? "actividad programada" : "actividades programadas"}</span></div><div class="week-head">${["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"].map(day => `<span>${day}</span>`).join("")}</div><div class="month-grid">`;
        for (let i = 0; i < 42; i += 1) {
          const date = new Date(start);
          date.setDate(start.getDate() + i);
          const dayEvents = eventsByDate.get(dateKey(date)) || [];
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          html += `<article class="month-day ${date.getMonth() !== month ? "muted-day" : ""} ${isWeekend ? "weekend-day" : ""} ${dayEvents.length ? "has-events" : ""} ${sameDay(date, today) ? "today-day" : ""}">
            <div class="month-day-top"><button class="day-number" type="button" data-calendar-date="${dateKey(date)}" aria-label="Ver ${longPlatformDate(date)}">${date.getDate()}</button>${dayEvents.length ? `<span class="month-event-count">${dayEvents.length}</span>` : ""}</div>
            ${eventColorBars(dayEvents)}
            <div class="month-day-events">${dayEvents.slice(0, 2).map(eventPill).join("")}${dayEvents.length > 2 ? `<button class="month-more" type="button" data-calendar-date="${dateKey(date)}">+${dayEvents.length - 2} más</button>` : ""}</div>
          </article>`;
        }
        return html + "</div></div>";
      }

      function weekView() {
        const start = startOfWeek(platform.calendarDate);
        const daysWithEvents = [];
        for (let i = 0; i < 7; i += 1) {
          const date = new Date(start);
          date.setDate(start.getDate() + i);
          const dayEvents = eventsForPlatformDate(date);
          if (!dayEvents.length) continue;
          daysWithEvents.push(`<article class="week-list-day ${sameDay(date, today) ? "is-today" : ""}"><header><div><h3>${capitalize(weekdays[date.getDay()])}</h3><span>${date.getDate()} de ${months[date.getMonth()]}</span></div>${sameDay(date, today) ? `<b>Hoy</b>` : ""}</header><div class="week-card-events">${dayEvents.map(weekEventCard).join("")}</div></article>`);
        }
        return `<div class="week-agenda-list">${calendarPeriodNav(calendarTitle(), "Vista semanal")}${weeklyScheduleMarkup()}<div class="week-compact-grid">${daysWithEvents.length ? daysWithEvents.join("") : emptyText("No hay eventos programados en esta semana.")}</div></div>`;
      }

      function weeklyScheduleMarkup() {
        const asset = APP_STATE.weeklySchedule;
        if (!assetSource(asset)) return "";
        const source = assetSource(asset, "display");
        const isPdf = String(asset.type || asset.name || "").toLowerCase().includes("pdf");
        if (isPdf) return `<section class="weekly-schedule-card is-pdf"><div><p class="eyebrow">Cronograma para compartir</p><h2>Programación semanal</h2><p>El archivo actual es PDF. Sube una imagen desde Administración para mostrarla aquí.</p></div></section>`;
        return `<section class="weekly-schedule-card is-image" aria-label="Cronograma semanal"><img src="${escapeHtml(source)}" alt="Cronograma semanal de cultos" loading="lazy" decoding="async"></section>`;
      }

      function weekEventCard(event) {
        return `<a class="week-event-card" href="#/evento/${encodeURIComponent(event.id)}" title="${escapeHtml(event.title)}" aria-label="Ver detalles de ${escapeHtml(event.title)}"><img src="${eventImage(event)}" alt="" loading="lazy" decoding="async"><span class="week-event-card-copy"><strong>${escapeHtml(event.title)}</strong><small>${escapeHtml(event.time)}</small></span></a>`;
      }

      function dayView(events) {
        const detailCards = events.length ? `<div class="day-events-detail">${events.slice().sort(sortByDate).map(dayEventDetail).join("")}</div>` : emptyText("No hay eventos programados para este día.");
        return `<div class="day-view">${calendarPeriodNav(longPlatformDate(platform.calendarDate), "Vista diaria")}${detailCards}</div>`;
      }

      function dayEventDetail(event) {
        return `<article class="day-event-detail detail-hero glass"><img src="${eventImage(event)}" alt="Imagen de ${escapeHtml(event.title)}" loading="lazy" decoding="async"><div><p class="eyebrow">${escapeHtml(platformStatus(event))}</p><h2>${escapeHtml(event.title)}</h2><p>${escapeHtml(eventDescription(event))}</p>${eventInfoList(event)}<a class="primary-link" href="#/evento/${encodeURIComponent(event.id)}">Ver detalles completos</a></div></article>`;
      }

      function monthBlock(month, index) {
        const year = platform.calendarDate.getFullYear();
        const first = new Date(year, index, 1);
        const offset = (first.getDay() + 6) % 7;
        const days = new Date(year, index + 1, 0).getDate();
        const cells = Array.from({ length: offset }, () => `<span class="year-empty" aria-hidden="true"></span>`);
        for (let day = 1; day <= days; day += 1) {
          const date = new Date(year, index, day);
          const dayEvents = eventsForPlatformDate(date);
          cells.push(`<button class="year-day ${sameDay(date, today) ? "today-day" : ""} ${dayEvents.length ? "has-events" : ""}" type="button" data-calendar-date="${dateKey(date)}" aria-label="${escapeHtml(longPlatformDate(date))}: ${dayEvents.length} evento${dayEvents.length === 1 ? "" : "s"}">
            <span>${day}</span>${eventColorBars(dayEvents)}
          </button>`);
        }
        return `<article class="year-month"><h3>${capitalize(month)}</h3><div class="year-week">${["L","M","M","J","V","S","D"].map(day => `<span>${day}</span>`).join("")}</div><div class="year-days">${cells.join("")}</div></article>`;
      }

      function eventColorBars(events) {
        const types = [...new Set(events.map(event => event.type))];
        if (!types.length) return "";
        return `<span class="event-colors" aria-hidden="true">${types.map(type => `<i class="color-${type}"></i>`).join("")}</span>`;
      }

      function eventPill(event) {
        const image = eventCalendarImage(event);
        return `<a class="event-pill event-type-${escapeHtml(event.type)}${image ? " has-thumbnail" : ""}" href="#/evento/${encodeURIComponent(event.id)}" title="${escapeHtml(event.title)}" aria-label="Ver detalles de ${escapeHtml(event.title)}">${image ? `<img class="event-pill-thumb" src="${escapeHtml(image)}" alt="">` : `<span class="event-pill-mark" aria-hidden="true"></span>`}<span class="event-pill-copy"><strong>${escapeHtml(event.title)}</strong><small>${escapeHtml(event.time)}</small></span></a>`;
      }

      function eventCalendarImage(event) {
        const source = eventImage(event);
        if (!source || source.startsWith("data:image/")) return "";
        return source;
      }

      function agendaList(events, compact = false) {
        if (!events.length) return emptyText("No hay eventos en esta seccion.");
        return `<div class="agenda-list ${compact ? "agenda-list-compact" : ""}">${events.sort(sortByDate).map(event => `
          <article class="agenda-item ${compact ? "week-event-item" : ""}">
            <img src="${eventImage(event)}" alt="Imagen de ${escapeHtml(event.title)}">
            <div><strong>${parseDate(event.date).getDate()}</strong><span>${escapeHtml(event.title)}</span><small>${escapeHtml(event.time)} - ${escapeHtml(platformStatus(event))}</small></div>
            <a class="small-action" href="#/evento/${encodeURIComponent(event.id)}">Ver detalles</a>
          </article>`).join("")}</div>`;
      }

      function eventCard(event) {
        return `<article class="event-card-public glass">
          <img src="${eventImage(event)}" alt="Imagen de ${escapeHtml(event.title)}">
          <div><p class="eyebrow">${escapeHtml(platformStatus(event))}</p><h3>${escapeHtml(event.title)}</h3><p>${escapeHtml(formatDateShort(event.date))} - ${escapeHtml(event.time)}<br>${escapeHtml(event.place)}</p><a class="primary-link" href="#/evento/${encodeURIComponent(event.id)}">Ver detalles</a></div>
        </article>`;
      }

      function eventMiniCard(event) {
        return `<a class="mini-card" href="#/evento/${encodeURIComponent(event.id)}"><img src="${eventImage(event)}" alt="Imagen de ${escapeHtml(event.title)}"><span><strong>${escapeHtml(event.title)}</strong><small>${escapeHtml(formatDateShort(event.date))} - ${escapeHtml(event.time)}</small></span></a>`;
      }

      function renderDecomPanel(editable = true) {
        const suggestions = decomSuggestionsForMonth(platform.decomMonth);
        const shifts = decomCultDates(DECOM_YEAR, platform.decomMonth);
        const selectedDate = ensureDecomSelectedDate(shifts);
        const selectedSuggestion = suggestions[dateKey(selectedDate)] || "";
        return `
          <article class="content-card glass admin-wide decom-panel">
            <div class="section-title">
              <p class="eyebrow">Privado</p>
              <h2>Cronograma DECOM</h2>
              <p>Vista interna anual para computador, proyección, multimedia y apoyo durante los cultos.</p>
            </div>
            <div class="decom-toolbar">
              <div class="decom-months">
                ${DECOM_MONTHS.map(month => `<button class="${platform.decomMonth === month ? "active" : ""}" data-decom-month="${month}" type="button">${capitalize(months[month])}</button>`).join("")}
              </div>
              <div class="decom-actions">
                <button class="small-action" id="downloadDecomPng" type="button">Descargar PNG</button>
                <button class="small-action" id="downloadDecomJpg" type="button">Descargar JPG</button>
                <button class="small-action" id="downloadDecomPdf" type="button">Guardar PDF</button>
              </div>
            </div>
            <div class="decom-board">
              <div class="decom-calendar-shell">
                <div class="decom-month-title">
                  <strong>${capitalize(months[platform.decomMonth])} ${DECOM_YEAR}</strong>
                  <span>${shifts.length} turnos de culto</span>
                </div>
                ${renderDecomMonthCalendar(platform.decomMonth, suggestions)}
              </div>
              ${renderDecomTurnEditor(selectedDate, selectedSuggestion, editable)}
            </div>
          </article>
        `;
      }

      function ensureDecomSelectedDate(shifts) {
        const selected = parseDate(platform.decomSelectedDate || dateKey(cleanDate(new Date())));
        const selectedKey = dateKey(selected);
        const inMonth = selected.getFullYear() === DECOM_YEAR && selected.getMonth() === platform.decomMonth;
        const isCult = shifts.some(date => dateKey(date) === selectedKey);
        if (inMonth && isCult) return selected;
        const todayClean = cleanDate(new Date());
        const todayIsCult = todayClean.getFullYear() === DECOM_YEAR
          && todayClean.getMonth() === platform.decomMonth
          && shifts.some(date => sameDay(date, todayClean));
        const nextInMonth = shifts.find(date => date >= todayClean);
        const fallback = todayIsCult ? todayClean : nextInMonth || shifts[0] || new Date(DECOM_YEAR, platform.decomMonth, 1);
        platform.decomSelectedDate = dateKey(fallback);
        return fallback;
      }

      function renderDecomMonthCalendar(month, suggestions) {
        const first = new Date(DECOM_YEAR, month, 1);
        const offset = (first.getDay() + 6) % 7;
        const start = new Date(DECOM_YEAR, month, 1 - offset);
        let html = `<div class="decom-week-head">${["Lun","Mar","Mie","Jue","Vie","Sab","Dom"].map(day => `<span>${day}</span>`).join("")}</div><div class="decom-calendar-grid">`;
        for (let i = 0; i < 42; i += 1) {
          const date = new Date(start);
          date.setDate(start.getDate() + i);
          const key = dateKey(date);
          const isCurrentMonth = date.getMonth() === month;
          const isCult = isCurrentMonth && [0, 2, 4, 6].includes(date.getDay());
          const turn = isCult ? decomTurnFor(date, suggestions[key]) : null;
          const assigned = turn ? (turn.assigned || turn.suggestedAssigned || "Sin asignar") : "";
          const special = isCult ? decomSpecialEvents(date) : [];
          html += `
            <button class="decom-day ${isCurrentMonth ? "" : "muted"} ${isCult ? "cult-day" : ""} ${sameDay(date, today) ? "today" : ""} ${platform.decomSelectedDate === key ? "selected" : ""} ${turn ? `status-${slugify(turn.status || "Pendiente")}` : ""}" type="button" ${isCult ? `data-decom-date="${key}"` : "disabled"}>
              <span class="decom-day-number">${date.getDate()}</span>
              ${isCult ? `
                <small>${escapeHtml(decomTime(date))}</small>
                <strong>${escapeHtml(shortDecomName(assigned))}</strong>
                <em>${escapeHtml(turn.status || "Pendiente")}</em>
                ${special.length ? `<b>Especial</b>` : ""}
              ` : ""}
            </button>
          `;
        }
        return html + "</div>";
      }

      function renderDecomTurnEditor(date, suggested, editable = true) {
        const key = dateKey(date);
        const turn = decomTurnFor(date, suggested);
        const special = decomSpecialEvents(date);
        const status = turn.status || "Pendiente";
        const assigned = turn.assigned || suggested || "";
        const support = turn.support || "";
        return `
          <aside class="decom-editor status-${slugify(status)}">
            <header>
              <p class="eyebrow">Turno seleccionado</p>
              <h3>${capitalize(weekdays[date.getDay()])} ${date.getDate()} de ${months[date.getMonth()]}</h3>
              <span>${escapeHtml(decomTime(date))} · ${escapeHtml(status)}</span>
            </header>
            ${special.length ? `<div class="decom-alert"><strong>Actividad especial este día.</strong><span>Quien pueda asistir y apoyar en la iglesia, por favor confirmar disponibilidad.</span><small>${special.map(event => escapeHtml(event.title)).join(" / ")}</small></div>` : ""}
            ${editable ? `
              <div class="decom-form">
                <label>Responsable
                  <select data-decom-field="assigned" data-date="${key}">
                    ${decomMemberOptions(assigned)}
                  </select>
                </label>
                <label>Segundo apoyo
                  <select data-decom-field="support" data-date="${key}">
                    ${decomMemberOptions(support)}
                  </select>
                </label>
                <label>Estado
                  <select data-decom-field="status" data-date="${key}">
                    ${DECOM_STATUSES.map(item => `<option ${item === status ? "selected" : ""}>${item}</option>`).join("")}
                  </select>
                </label>
                <label class="full">Observaciones
                  <textarea data-decom-field="observations" data-date="${key}" placeholder="Notas internas, cambios o confirmaciones">${escapeHtml(turn.observations || "")}</textarea>
                </label>
              </div>
            ` : `
              <div class="decom-readonly">
                <span><strong>Responsable</strong>${escapeHtml(assigned || "Sin asignar")}</span>
                <span><strong>Segundo apoyo</strong>${escapeHtml(support || "Por definir")}</span>
                <span class="full"><strong>Observaciones</strong>${escapeHtml(turn.observations || "Sin observaciones")}</span>
              </div>
            `}
            <footer>
              ${editable ? `<button class="primary-link" type="button" data-save-decom="${key}">Guardar turno</button><button class="small-action" type="button" data-clear-decom="${key}">Eliminar asignación</button>` : ""}
              <button class="small-action" type="button" data-ics-decom="${key}">Agregar a mi calendario</button>
              ${assigned ? `<a class="small-action" href="${googleCalendarTurnUrl(date, assigned, support, turn.observations || "")}" target="_blank" rel="noopener">Google Calendar</a>` : ""}
            </footer>
          </aside>
        `;
      }

      function shortDecomName(name) {
        if (!name || name === "Sin asignar") return name || "Sin asignar";
        const parts = name.split(/\s+/).filter(Boolean);
        return parts.length > 1 ? `${parts[0]} ${parts[1][0]}.` : parts[0];
      }

      function renderDecomTurnCard(date, suggested, editable = true) {
        const key = dateKey(date);
        const turn = decomTurnFor(date, suggested);
        const special = decomSpecialEvents(date);
        const status = turn.status || "Pendiente";
        const assigned = turn.assigned || suggested || "";
        const support = turn.support || "";
        return `
          <article class="decom-turn status-${slugify(status)}">
            <header>
              <div>
                <strong>${capitalize(weekdays[date.getDay()])} ${date.getDate()}</strong>
                <span>${escapeHtml(decomTime(date))}</span>
              </div>
              <mark>${escapeHtml(status)}</mark>
            </header>
            ${special.length ? `<div class="decom-alert"><strong>Actividad especial este día.</strong><span>Quien pueda asistir y apoyar en la iglesia, por favor confirmar disponibilidad.</span><small>${special.map(event => escapeHtml(event.title)).join(" / ")}</small></div>` : ""}
            ${editable ? `
              <div class="decom-form">
                <label>Responsable
                  <select data-decom-field="assigned" data-date="${key}">
                    ${decomMemberOptions(assigned)}
                  </select>
                </label>
                <label>Segundo apoyo
                  <select data-decom-field="support" data-date="${key}">
                    ${decomMemberOptions(support)}
                  </select>
                </label>
                <label>Estado
                  <select data-decom-field="status" data-date="${key}">
                    ${DECOM_STATUSES.map(item => `<option ${item === status ? "selected" : ""}>${item}</option>`).join("")}
                  </select>
                </label>
                <label class="full">Observaciones
                  <textarea data-decom-field="observations" data-date="${key}" placeholder="Notas internas, cambios o confirmaciones">${escapeHtml(turn.observations || "")}</textarea>
                </label>
              </div>
            ` : `
              <div class="decom-readonly">
                <span><strong>Responsable</strong>${escapeHtml(assigned || "Sin asignar")}</span>
                <span><strong>Segundo apoyo</strong>${escapeHtml(support || "Por definir")}</span>
                <span class="full"><strong>Observaciones</strong>${escapeHtml(turn.observations || "Sin observaciones")}</span>
              </div>
            `}
            <footer>
              ${editable ? `<button class="primary-link" type="button" data-save-decom="${key}">Guardar turno</button><button class="small-action" type="button" data-clear-decom="${key}">Eliminar asignación</button>` : ""}
              <button class="small-action" type="button" data-ics-decom="${key}">Agregar a mi calendario</button>
              ${assigned ? `<a class="small-action" href="${googleCalendarTurnUrl(date, assigned, support, turn.observations || "")}" target="_blank" rel="noopener">Google Calendar</a>` : ""}
            </footer>
          </article>
        `;
      }

      function decomMemberOptions(selected) {
        return `<option value="">Sin asignar</option>${DECOM_MEMBERS.map(member => `<option value="${member.name}" ${member.name === selected ? "selected" : ""}>${member.name}</option>`).join("")}`;
      }

      function decomCultDates(year, month) {
        const dates = [];
        const date = new Date(year, month, 1);
        while (date.getMonth() === month) {
          if ([0, 2, 4, 6].includes(date.getDay())) dates.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
        return dates;
      }

      function decomTurnFor(date, suggested) {
        const key = dateKey(date);
        const saved = APP_STATE.decomTurns?.[key] || {};
        return {
          id: key,
          date: key,
          time: decomTime(date),
          assigned: saved.assigned || "",
          support: saved.support || "",
          status: saved.status || (saved.assigned ? "Pendiente" : suggested ? "Pendiente" : "Sin asignar"),
          observations: saved.observations || "",
          suggestedAssigned: suggested || "",
          ...saved
        };
      }

      function decomTime(date) {
        return date.getDay() === 0 ? BASE_TIMES.domingo : BASE_TIMES.culto;
      }

      function decomAvailableMembers(date) {
        const key = dateKey(date);
        const day = date.getDay();
        return DECOM_MEMBERS.filter(member => {
          if (member.specificDates) return member.specificDates.includes(key);
          return member.weekdays?.includes(day);
        });
      }

      function decomSuggestionsForMonth(month) {
        const suggestions = {};
        const counts = Object.fromEntries(DECOM_MEMBERS.map(member => [member.name, 0]));
        let lastAssigned = "";
        decomCultDates(DECOM_YEAR, month).forEach(date => {
          const key = dateKey(date);
          const saved = APP_STATE.decomTurns?.[key];
          if (saved?.assigned) {
            suggestions[key] = saved.assigned;
            counts[saved.assigned] = (counts[saved.assigned] || 0) + 1;
            lastAssigned = saved.assigned;
            return;
          }
          const available = decomAvailableMembers(date);
          const candidate = available
            .map(member => ({
              name: member.name,
              score: (counts[member.name] || 0) * 10 + (member.name === lastAssigned ? 6 : 0) + DECOM_MEMBERS.findIndex(item => item.name === member.name)
            }))
            .sort((a, b) => a.score - b.score)[0];
          suggestions[key] = candidate?.name || "";
          if (candidate?.name) {
            counts[candidate.name] = (counts[candidate.name] || 0) + 1;
            lastAssigned = candidate.name;
          }
        });
        return suggestions;
      }

      function decomSpecialEvents(date) {
        return eventsForPlatformDate(date).filter(event => ["vigilia", "oracion", "ayuno", "especial"].includes(event.type));
      }

      async function saveDecomTurn(key) {
        if (!requireCloudAdmin()) return;
        const date = parseDate(key);
        const getField = field => view().querySelector(`[data-decom-field="${field}"][data-date="${key}"]`);
        const assigned = getField("assigned").value;
        const support = getField("support").value;
        const status = getField("status").value;
        const observations = getField("observations").value.trim();
        await saveCloudDoc("decomTurns", key, {
          id: key,
          date: key,
          time: decomTime(date),
          assigned,
          support,
          status,
          observations,
          specialEventIds: decomSpecialEvents(date).map(event => event.id)
        });
        alert("Turno DECOM guardado en Supabase.");
      }

      async function clearDecomTurn(key) {
        if (!requireCloudAdmin()) return;
        if (!confirm("Deseas eliminar esta asignacion DECOM?")) return;
        await cloud.dbMod.deleteDoc(cloud.dbMod.doc(cloud.db, "decomTurns", key));
      }

      function downloadDecomIcs(key) {
        const date = parseDate(key);
        const turn = decomTurnFor(date, decomSuggestionsForMonth(date.getMonth())[key]);
        const assigned = turn.assigned || turn.suggestedAssigned || "Sin asignar";
        const start = eventStartDate({ date: key, time: decomTime(date) });
        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
        const ics = [
          "BEGIN:VCALENDAR",
          "VERSION:2.0",
          "PRODID:-//DECOM IPUC Villa del Rio//Turnos//ES",
          "BEGIN:VEVENT",
          `UID:decom-${key}@ipuc-villa-del-rio`,
          `DTSTAMP:${formatUtcIcsDate(new Date())}`,
          `DTSTART:${formatLocalIcsDate(start)}`,
          `DTEND:${formatLocalIcsDate(end)}`,
          "SUMMARY:Turno DECOM - IPUC Villa del Rio",
          `DESCRIPTION:${escapeIcs(`Responsable: ${assigned}${turn.support ? `\\nApoyo: ${turn.support}` : ""}${turn.observations ? `\\nObservaciones: ${turn.observations}` : ""}`)}`,
          "LOCATION:IPUC Villa del Rio",
          "END:VEVENT",
          "END:VCALENDAR"
        ].join("\r\n");
        downloadTextFile(`turno-decom-${key}.ics`, ics, "text/calendar;charset=utf-8");
      }

      function googleCalendarTurnUrl(date, assigned, support, observations) {
        const key = dateKey(date);
        const start = eventStartDate({ date: key, time: decomTime(date) });
        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
        const params = new URLSearchParams({
          action: "TEMPLATE",
          text: "Turno DECOM - IPUC Villa del Rio",
          dates: `${formatGoogleDate(start)}/${formatGoogleDate(end)}`,
          location: "IPUC Villa del Rio",
          details: `Responsable: ${assigned}${support ? `\nApoyo: ${support}` : ""}${observations ? `\nObservaciones: ${observations}` : ""}`
        });
        return `https://calendar.google.com/calendar/render?${params.toString()}`;
      }

      function formatGoogleDate(date) {
        return `${date.getFullYear()}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}T${pad2(date.getHours())}${pad2(date.getMinutes())}00`;
      }

      function downloadTextFile(name, content, type) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }

      function buildDecomRowsForMonth(month) {
        const suggestions = decomSuggestionsForMonth(month);
        return decomCultDates(DECOM_YEAR, month).map(date => {
          const key = dateKey(date);
          const turn = decomTurnFor(date, suggestions[key]);
          return {
            key,
            day: `${capitalize(weekdays[date.getDay()])} ${date.getDate()}`,
            time: decomTime(date),
            assigned: turn.assigned || turn.suggestedAssigned || "Sin asignar",
            support: turn.support || "",
            status: turn.status || "Pendiente",
            observations: turn.observations || "",
            special: decomSpecialEvents(date).map(event => event.title).join(" / ")
          };
        });
      }

      function buildDecomSvg(month) {
        const rows = buildDecomRowsForMonth(month);
        const rowHeight = 94;
        const width = 1200;
        const height = 220 + rows.length * rowHeight;
        const title = `Cronograma DECOM - ${capitalize(months[month])} ${DECOM_YEAR}`;
        const rowMarkup = rows.map((row, index) => {
          const y = 170 + index * rowHeight;
          const fill = index % 2 === 0 ? "#f7fbfa" : "#eef6f4";
          const note = row.special ? `Especial: ${row.special}` : row.observations;
          return `
            <rect x="42" y="${y}" width="1116" height="78" rx="18" fill="${fill}" stroke="#d8e6e3"/>
            <text x="70" y="${y + 31}" font-size="24" font-weight="800" fill="#123348">${escapeXml(row.day)}</text>
            <text x="70" y="${y + 58}" font-size="19" fill="#506675">${escapeXml(row.time)}</text>
            <text x="275" y="${y + 33}" font-size="24" font-weight="800" fill="#182430">${escapeXml(row.assigned)}</text>
            <text x="275" y="${y + 60}" font-size="18" fill="#506675">${escapeXml(row.support ? `Apoyo: ${row.support}` : "Apoyo: por definir")}</text>
            <text x="665" y="${y + 33}" font-size="20" font-weight="800" fill="#1c8b78">${escapeXml(row.status)}</text>
            <text x="665" y="${y + 60}" font-size="16" fill="#506675">${escapeXml(note || "Sin observaciones").slice(0, 70)}</text>
          `;
        }).join("");
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
          <defs><linearGradient id="bg" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#eff8f5"/><stop offset="1" stop-color="#f8efe5"/></linearGradient></defs>
          <rect width="1200" height="${height}" fill="url(#bg)"/>
          <rect x="28" y="28" width="1144" height="${height - 56}" rx="34" fill="rgba(255,255,255,.82)" stroke="#d9e8e4"/>
          <text x="58" y="84" font-family="Segoe UI, Arial" font-size="24" font-weight="900" fill="#4f6b78">DECOM IPUC VILLA DEL RIO</text>
          <text x="58" y="128" font-family="Segoe UI, Arial" font-size="42" font-weight="900" fill="#182430">${escapeXml(title)}</text>
          <text x="58" y="${height - 52}" font-family="Segoe UI, Arial" font-size="18" fill="#506675">Turnos internos para computador, proyeccion y multimedia.</text>
          ${rowMarkup}
        </svg>`;
      }

      function downloadDecomImage(format) {
        const svg = buildDecomSvg(platform.decomMonth);
        const image = new Image();
        const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = image.naturalWidth;
          canvas.height = image.naturalHeight;
          const context = canvas.getContext("2d");
          context.fillStyle = "#ffffff";
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0);
          const mime = format === "jpg" ? "image/jpeg" : "image/png";
          const link = document.createElement("a");
          link.href = canvas.toDataURL(mime, .94);
          link.download = `cronograma-decom-${months[platform.decomMonth]}-${DECOM_YEAR}.${format === "jpg" ? "jpg" : "png"}`;
          link.click();
        };
        image.src = url;
      }

      function printDecomPdf() {
        const svg = buildDecomSvg(platform.decomMonth);
        const win = window.open("", "_blank");
        if (!win) return alert("El navegador bloqueo la ventana para PDF.");
        win.document.write(`<html><head><title>Cronograma DECOM</title><style>body{margin:0;background:#fff}svg{width:100%;height:auto}</style></head><body>${svg}<script>window.onload=()=>window.print()<\/script></body></html>`);
        win.document.close();
      }

      function escapeXml(value) {
        return String(value ?? "").replace(/[<>&"']/g, char => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" }[char]));
      }

      function runAdminAction(action) {
        return (...args) => Promise.resolve(action(...args)).catch(error => {
          console.warn(error);
          alert(cloudActionMessage(error));
        });
      }

      function bindAdmin() {
        view().querySelector("[data-logout]").onclick = () => {
          signOutAdmin();
        };
        view().querySelectorAll("[data-admin-section]").forEach(button => {
          button.onclick = () => {
            platform.adminSection = button.dataset.adminSection;
            renderAdminPage();
            if (platform.adminSection === "membresia") loadMembershipAdmin();
          };
        });
        const memberSearch = view().querySelector("[data-member-search]");
        const memberStatusFilter = view().querySelector("[data-member-filter-status]");
        const memberResultCount = view().querySelector("[data-member-result-count]");
        const memberFilterEmpty = view().querySelector("[data-member-filter-empty]");
        const memberTools = memberSearch?.closest(".member-directory-tools");
        let memberSkillFilter = view().querySelector("[data-member-filter-skill]");
        if (memberTools && !memberSkillFilter) {
          const options = [...new Set((platform.members || []).flatMap(member => [...(Array.isArray(member.skills) ? member.skills : []), ...(Array.isArray(member.support_interests) ? member.support_interests : [])]))].sort((a, b) => a.localeCompare(b, "es"));
          const label = document.createElement("label");
          label.textContent = "Habilidad o área";
          memberSkillFilter = document.createElement("select");
          memberSkillFilter.dataset.memberFilterSkill = "";
          memberSkillFilter.innerHTML = `<option value="todos">Todas las áreas</option>${options.map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}`;
          memberSkillFilter.value = options.includes(platform.memberSkillFilter) ? platform.memberSkillFilter : "todos";
          label.append(memberSkillFilter);
          memberTools.insertBefore(label, memberResultCount || null);
        }
        const talentFilters = [["Área de interés", "support_interests"], ["Disponibilidad", "availability"], ["Comité actual", "church_committee"], ["Cargo actual", "church_role"], ["Estudios", "education_level"]];
        if (isAdmin()) {
          view().querySelectorAll(".member-admin-row[data-member-id]").forEach(row => {
            const member = platform.members.find(item => item.id === row.dataset.memberId);
            const account = (platform.memberAccounts || []).find(item => item.id === member?.auth_user_id);
            const accountFact = document.createElement("span");
            accountFact.innerHTML = `<small>Cuenta vinculada</small><strong>${escapeHtml(account?.email || (member?.auth_user_id ? member.auth_user_id : "Sin vincular"))}</strong>${account ? `<small>Acceso: ${escapeHtml(account.providers.join(" · "))} · último ingreso: ${escapeHtml(account.last_sign_in_at ? new Date(account.last_sign_in_at).toLocaleString("es-CO") : "Sin ingreso")}</small>` : ""}`;
            row.querySelector(".member-profile-facts")?.append(accountFact);
            const edit = document.createElement("button"); edit.type = "button"; edit.className = "small-action"; edit.textContent = "Editar ficha completa";
            edit.onclick = () => {platform.memberCard=null;renderMembershipPage(false,{member,adminMemberId:member.id});};
            row.querySelector(".member-admin-actions")?.prepend(edit);
          });
          view().querySelectorAll("[data-account-admin-link]").forEach(button => {
            button.onclick = runAdminAction(async () => {
              const row=button.closest("[data-account-id]"),memberId=row.querySelector("select").value;
              if(!memberId)throw new Error("Selecciona la membresía revisada por administración.");
              if(!confirm("¿Vincular esta cuenta verificada con la membresía seleccionada? Confirma que ambas pertenecen a la misma persona."))return;
              await window.AccountUI.api({client:cloud.app,config:SUPABASE_CONFIG},{action:"admin-link",userId:row.dataset.accountId,memberId});
              await loadMembershipAdmin();
            });
          });
        }
        if (memberTools) {
          memberSearch.placeholder = "Buscar habilidad, profesión o persona…";
          memberTools.insertAdjacentHTML("beforebegin", '<h3>Talento y servicio</h3><p>Los intereses declarados no asignan cargos automáticamente.</p><a class="small-action" href="/membresia/decom/">Registro DECOM sin conexión</a>');
          talentFilters.forEach(([title, key]) => {
            const values = [...new Set(platform.members.flatMap(m => Array.isArray(m[key]) ? m[key] : String(m[key] || "").split(" | ")).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"es"));
            const label = document.createElement("label"); label.innerHTML = `${title}<select data-talent-filter="${key}"><option value="">Todas las opciones</option>${values.map(v=>`<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join("")}</select>`;
            memberTools.insertBefore(label, memberResultCount || null);
            label.querySelector("select").addEventListener("change", () => filterMembers());
          });
        }
        const filterMembers = () => {
          if (!memberSearch || !memberStatusFilter) return;
          const term = memberSearch.value.trim().toLocaleLowerCase("es");
          const status = memberStatusFilter.value;
          const skill = memberSkillFilter?.value || "todos";
          const visibleMembers = new Set();
          view().querySelectorAll(".member-admin-row").forEach(row => {
            const text = row.textContent.toLocaleLowerCase("es");
            const member = platform.members.find(m => m.id === row.dataset.memberId);
            const profileMatches = [...view().querySelectorAll("[data-talent-filter]")].every(select => !select.value || (Array.isArray(member?.[select.dataset.talentFilter]) ? member[select.dataset.talentFilter] : String(member?.[select.dataset.talentFilter] || "").split(" | ")).includes(select.value));
            const matches = (!term || text.includes(term)) && (status === "todos" || row.querySelector(".member-status-chip")?.textContent.trim() === status) && (skill === "todos" || [...(member?.skills || []), ...(member?.support_interests || [])].includes(skill)) && profileMatches;
            row.hidden = !matches;
            if (matches) visibleMembers.add(row.dataset.memberId);
          });
          view().querySelectorAll("[data-member-folder], [data-member-group]").forEach(folder => {
            const count = folder.querySelectorAll(".member-admin-row:not([hidden])").length;
            const badge = folder.querySelector(":scope > summary [data-folder-count]");
            if (badge) badge.textContent = String(count);
            folder.hidden = count === 0;
          });
          const visible = visibleMembers.size;
          if (memberResultCount) memberResultCount.textContent = `${visible} ${visible === 1 ? "persona" : "personas"}`;
          if (memberFilterEmpty) memberFilterEmpty.hidden = visible !== 0;
        };
        memberSearch?.addEventListener("input", () => { platform.memberSearch = memberSearch.value; filterMembers(); });
        memberStatusFilter?.addEventListener("change", () => { platform.memberStatusFilter = memberStatusFilter.value; filterMembers(); });
        memberSkillFilter?.addEventListener("change", () => { platform.memberSkillFilter = memberSkillFilter.value; filterMembers(); });
        filterMembers();
        view().querySelectorAll("[data-member-save-status]").forEach(button => {
          button.onclick = runAdminAction(async () => {
            const row = button.closest("[data-member-id]");
            const member = platform.members.find(item => item.id === row.dataset.memberId);
            const nextStatus = row.querySelector("[data-member-status]").value;
            button.disabled = true;
            try {
              const { error } = await cloud.db.from("church_members").update({ status: nextStatus, updated_at: new Date().toISOString() }).eq("id", row.dataset.memberId);
              if (error) throw error;
              await loadMembershipAdmin();
            } finally { button.disabled = false; }
          });
        });
        view().querySelectorAll("[data-member-edit-assignments]").forEach(button => {
          button.onclick = () => {
            const editor = button.closest("[data-member-id]")?.querySelector("[data-member-assignment-editor]");
            if (!editor) return;
            editor.hidden = !editor.hidden;
            button.setAttribute("aria-expanded", String(!editor.hidden));
            if (!editor.hidden) editor.querySelector("input")?.focus();
          };
        });
        view().querySelectorAll("[data-member-save-assignments]").forEach(button => {
          button.onclick = runAdminAction(async () => {
            const row = button.closest("[data-member-id]");
            const committees = row.querySelector("[data-member-committees]").value.split("|").map(value => value.trim().replace(/\s+/g, " "));
            const roles = row.querySelector("[data-member-roles]").value.split("|").map(value => value.trim().replace(/\s+/g, " "));
            if (!committees.length || committees.some(value => !value) || !roles.length || roles.some(value => !value)) throw new Error("Escribe un comité y un cargo por cada asignación. Para varios, sepáralos con | y conserva el mismo orden.");
            if (committees.length !== roles.length) throw new Error("La cantidad de comités y cargos debe coincidir; cada cargo se guarda con su comité en el mismo orden.");
            if (committees.some(value => value.length > 80) || roles.some(value => value.length > 120)) throw new Error("Cada comité admite hasta 80 caracteres y cada cargo hasta 120.");
            const { error } = await cloud.db.from("church_members").update({ church_committee: committees.join(" | "), church_role: roles.join(" | "), church_assignments:roles.map((role,i)=>({role,committee:committees[i]})), updated_at: new Date().toISOString() }).eq("id", row.dataset.memberId);
            if (error) throw error;
            await loadMembershipAdmin();
          });
        });
        view().querySelectorAll("[data-member-attendance]").forEach(button => {
          button.onclick = runAdminAction(async () => {
            const eventId = view().querySelector("[data-member-event]")?.value;
            if (!eventId) throw new Error("Selecciona primero el evento para registrar la asistencia.");
            const event = APP_STATE.events[eventId];
            if (!event) throw new Error("El evento seleccionado ya no está disponible.");
            const { error } = await cloud.db.from("member_attendance").upsert({ member_id: button.closest("[data-member-id]").dataset.memberId, event_id: eventId, event_title: event.title, recorded_by: cloud.user?.id || null }, { onConflict: "member_id,event_id" });
            if (error) throw error;
            await loadMembershipAdmin();
          });
        });
        view().querySelectorAll("[data-member-photo], [data-change-photo]").forEach(button => {
          button.onclick = runAdminAction(async () => {
            const photoPath = button.dataset.memberPhoto || button.dataset.changePhoto;
            const { data, error } = await cloud.storage.from("membership-photos").createSignedUrl(photoPath, 600);
            if (error) throw error;
            const dialog = document.createElement("dialog");
            dialog.className = "member-photo-dialog";
            dialog.innerHTML = `<form method="dialog"><button class="small-action" aria-label="Cerrar">Cerrar</button></form><img alt="Fotografía privada de miembro">`;
            dialog.querySelector("img").src = data.signedUrl;
            dialog.addEventListener("close", () => dialog.remove(), { once: true });
            document.body.append(dialog); dialog.showModal();
          });
        });
        view().querySelectorAll("[data-member-card]").forEach(button => {
          button.onclick = runAdminAction(async () => {
            const member = platform.members.find(item => item.id === button.closest("[data-member-id]")?.dataset.memberId);
            if (!member?.photo_path || !member.has_church_role) throw new Error("El carnet requiere foto y un cargo registrado.");
            button.disabled = true;
            try {
              const format = button.dataset.memberCard;
              const blob = await membershipCardBlob(member, format);
              downloadPrivateFile(blob, blob.type, `Carnet-IPUC-${safeFileName(member.full_name)}.${format}`);
            } finally { button.disabled = false; }
          });
        });
        view().querySelector("[data-export-members-csv]")?.addEventListener("click", runAdminAction(event => exportMemberDirectoryCsv(event.currentTarget)));
        view().querySelector("[data-export-members-photos]")?.addEventListener("click", runAdminAction(event => exportMemberDirectoryWithPhotos(event.currentTarget)));
        view().querySelectorAll("[data-approve-member-change], [data-reject-member-change]").forEach(button => {
          button.onclick = runAdminAction(async () => {
            const row = button.closest("[data-change-request-id]");
            const request = platform.memberChangeRequests.find(item => item.id === row?.dataset.changeRequestId);
            if (!request) throw new Error("La solicitud ya no está disponible.");
            const approve = button.hasAttribute("data-approve-member-change");
            const { error } = await cloud.db.rpc("review_member_change_request", { p_request_id: request.id, p_approve: approve });
            if (error) throw error;
            if (!approve && request.photo_path) {
              const removed = await cloud.storage.from("membership-photos").remove([request.photo_path]);
              if (removed.error) console.warn("No se pudo eliminar la foto privada de la solicitud rechazada.", removed.error);
            }
            await loadMembershipAdmin();
          });
        });
        view().querySelectorAll("[data-member-delete]").forEach(button => {
          button.onclick = runAdminAction(async () => {
            const member = platform.members.find(item => item.id === button.closest("[data-member-id]").dataset.memberId);
            if (!member || !window.confirm(`¿Eliminar el registro y las asistencias de ${member.full_name}? Esta acción no se puede deshacer.`)) return;
            const { error } = await cloud.db.from("church_members").delete().eq("id", member.id);
            if (error) throw error;
            if (member.photo_path) {
              const removed = await cloud.storage.from("membership-photos").remove([member.photo_path]);
              if (removed.error) console.warn("No se pudo retirar la foto privada del registro eliminado.", removed.error);
            }
            await loadMembershipAdmin();
          });
        });
        document.getElementById("adminSelect").onchange = event => {
          platform.selectedAdminEvent = event.target.value;
          renderAdminPage();
        };
        view().querySelectorAll("[data-committee]").forEach(button => {
          button.onclick = () => {
            const hidden = document.getElementById("adminDepartment2");
            if (hidden) hidden.value = button.dataset.committeeLabel;
            view().querySelectorAll("[data-committee]").forEach(option => {
              const isSelected = option === button;
              option.classList.toggle("selected", isSelected);
              option.setAttribute("aria-pressed", String(isSelected));
            });
          };
        });
        document.getElementById("materialSelect").onchange = event => {
          platform.selectedAdminEvent = event.target.value;
          renderAdminPage();
        };
        document.getElementById("adminSaveEvent").onclick = runAdminAction(savePlatformEvent);
        document.getElementById("adminDeleteEvent").onclick = runAdminAction(deletePlatformEvent);
        document.getElementById("adminSaveMaterial").onclick = runAdminAction(savePlatformMaterial);
        const podcastSelect = document.getElementById("podcastSelect");
        if (podcastSelect) podcastSelect.onchange = event => {
          platform.selectedPodcast = event.target.value === "__new__" ? null : event.target.value;
          renderAdminPage();
        };
        const savePodcast = document.getElementById("savePodcast");
        if (savePodcast) savePodcast.onclick = runAdminAction(savePlatformPodcast);
        const deletePodcast = document.getElementById("deletePodcast");
        if (deletePodcast) deletePodcast.onclick = runAdminAction(deletePlatformPodcast);
        document.getElementById("saveWeeklySchedule").onclick = runAdminAction(saveWeeklySchedule);
        const deleteWeeklyButton = document.getElementById("deleteWeeklySchedule");
        if (deleteWeeklyButton) deleteWeeklyButton.onclick = runAdminAction(deleteWeeklySchedule);
        if (!cloud.driveReady && !cloud.storageReady) {
          ["uploadMainImage", "uploadInviteMain", "uploadInviteWhatsapp", "uploadInviteStory", "uploadInviteBanner", "uploadInviteVideo", "uploadGallery", "uploadFiles", "adminSaveMaterial", "uploadWeeklySchedule", "saveWeeklySchedule"].forEach(id => {
            const control = document.getElementById(id);
            if (control) control.disabled = true;
          });
          view().querySelectorAll("[data-remove-asset]").forEach(button => button.disabled = true);
        }
        document.getElementById("saveReflection").onclick = runAdminAction(savePlatformReflection);
        document.getElementById("saveAnnouncement2").onclick = runAdminAction(savePlatformAnnouncement);
        const saveLeaderButton = document.getElementById("saveLeaderProfile");
        if (saveLeaderButton) saveLeaderButton.onclick = runAdminAction(saveLeaderProfile);
        view().querySelectorAll("[data-delete-leader]").forEach(button => {
          button.onclick = runAdminAction(() => deleteLeaderProfile(button.dataset.deleteLeader));
        });
        view().querySelectorAll("[data-submission-status]").forEach(button => {
          button.onclick = runAdminAction(() => updateLeaderSubmissionStatus(button.dataset.submissionId, button.dataset.submissionStatus));
        });
        view().querySelectorAll("[data-open-private-asset]").forEach(button => {
          button.onclick = runAdminAction(() => openPrivateSubmissionAsset(button.dataset.submissionId, Number(button.dataset.fileIndex || 0)));
        });
        view().querySelectorAll("[data-remove-asset]").forEach(button => {
          button.onclick = runAdminAction(() => removePlatformAsset(button.dataset.kind, button.dataset.key || "", Number(button.dataset.index || -1)));
        });
        bindFileDropzones();
        bindDecomControls();
      }

      function bindFileDropzones() {
        view().querySelectorAll('input[type="file"]').forEach(input => {
          const zone = input.closest("label") || input.parentElement;
          if (!zone) return;
          zone.classList.add("file-dropzone");
          if (!zone.querySelector(".file-drop-copy")) {
            const copy = document.createElement("span");
            copy.className = "file-drop-copy";
            copy.innerHTML = `<strong>Arrastra y suelta aquí</strong><small>o haz clic para buscar en tu dispositivo</small>`;
            input.insertAdjacentElement("beforebegin", copy);
          }
          if (!zone.querySelector(".file-name-list")) {
            const names = document.createElement("span");
            names.className = "file-name-list";
            input.insertAdjacentElement("afterend", names);
          }
          const draftFiles = PENDING_UPLOADS.get(pendingUploadKey(input.id)) || [];
          if (draftFiles.length && !input.files?.length) {
            try {
              const transfer = new DataTransfer();
              draftFiles.forEach(file => transfer.items.add(file));
              input.files = transfer.files;
            } catch (error) { /* El navegador puede impedir restaurar archivos en algunos dispositivos. */ }
          }
          ["dragenter", "dragover"].forEach(eventName => zone.addEventListener(eventName, event => {
            event.preventDefault();
            event.stopPropagation();
            zone.classList.add("is-dragging");
          }));
          ["dragleave", "drop"].forEach(eventName => zone.addEventListener(eventName, event => {
            event.preventDefault();
            event.stopPropagation();
            zone.classList.remove("is-dragging");
          }));
          zone.addEventListener("drop", event => {
            if (input.disabled || !event.dataTransfer?.files?.length) return;
            try {
              const transfer = new DataTransfer();
              [...event.dataTransfer.files].forEach(file => transfer.items.add(file));
              input.files = transfer.files;
            } catch (error) {
              return alert("No se pudo leer el archivo arrastrado. Intenta hacer clic en la zona para seleccionarlo.");
            }
            input.dispatchEvent(new Event("change", { bubbles: true }));
          });
          input.addEventListener("change", () => {
            const files = [...(input.files || [])];
            if (files.length) PENDING_UPLOADS.set(pendingUploadKey(input.id), files);
            zone.classList.toggle("has-file", Boolean(files.length));
            const names = zone.querySelector(".file-name-list");
            if (names) names.textContent = files.length ? files.map(file => file.name).join(" · ") : "";
          });
          if (draftFiles.length) {
            zone.classList.add("has-file");
            const names = zone.querySelector(".file-name-list");
            if (names) names.textContent = draftFiles.map(file => file.name).join(" · ");
          }
        });
      }

      function pendingUploadKey(inputId) {
        const input = document.getElementById(inputId);
        if (inputId === "adminEventImage" || inputId === "inlineEventImage") return `event:${input?.dataset.eventId || platform.selectedAdminEvent || "__new__"}:${inputId}`;
        if (inputId === "leaderSubmissionFiles") return `leader:${cloud.user?.id || "anon"}:${inputId}`;
        const materialId = document.getElementById("materialSelect")?.value || "__new__";
        return `material:${materialId}:${inputId}`;
      }

      function pendingUploadFiles(inputId) {
        const pending = PENDING_UPLOADS.get(pendingUploadKey(inputId));
        return pending || [...(document.getElementById(inputId)?.files || [])];
      }

      function clearPendingUpload(inputId) {
        PENDING_UPLOADS.delete(pendingUploadKey(inputId));
      }

      function bindDecomControls() {
        view().querySelectorAll("[data-decom-month]").forEach(button => {
          button.onclick = () => {
            platform.decomMonth = Number(button.dataset.decomMonth);
            platform.decomSelectedDate = "";
            renderRoute();
          };
        });
        view().querySelectorAll("[data-decom-date]").forEach(button => {
          button.onclick = () => {
            platform.decomSelectedDate = button.dataset.decomDate;
            renderRoute();
          };
        });
        view().querySelectorAll("[data-save-decom]").forEach(button => {
          button.onclick = runAdminAction(() => saveDecomTurn(button.dataset.saveDecom));
        });
        view().querySelectorAll("[data-clear-decom]").forEach(button => {
          button.onclick = runAdminAction(() => clearDecomTurn(button.dataset.clearDecom));
        });
        view().querySelectorAll("[data-ics-decom]").forEach(button => {
          button.onclick = () => downloadDecomIcs(button.dataset.icsDecom);
        });
        const pngButton = document.getElementById("downloadDecomPng");
        if (pngButton) pngButton.onclick = () => downloadDecomImage("png");
        const jpgButton = document.getElementById("downloadDecomJpg");
        if (jpgButton) jpgButton.onclick = () => downloadDecomImage("jpg");
        const pdfButton = document.getElementById("downloadDecomPdf");
        if (pdfButton) pdfButton.onclick = () => printDecomPdf();
      }

      async function savePlatformEvent() {
        if (!requireCloudAdmin()) return;
        const title = document.getElementById("adminTitle2").value.trim();
        const date = document.getElementById("adminDate2").value;
        if (!title || !date) return alert("Nombre y fecha son obligatorios.");
        const selected = platform.selectedAdminEvent === "__new__" ? null : platformEventById(platform.selectedAdminEvent);
        const id = selected ? selected.id : eventIdFor({ date, title });
        const tags = [...view().querySelectorAll(".tag-admin input:checked")].map(input => input.value);
        const payload = {
          ...(APP_STATE.events[id] || {}),
          id,
          custom: !selected || Boolean(selected.custom),
          deleted: false,
          title,
          date,
          time: document.getElementById("adminTime2").value.trim() || autoTime({ date, type: document.getElementById("adminType2").value }),
          type: document.getElementById("adminType2").value,
          place: document.getElementById("adminPlace2").value.trim() || "IPUC Villa del Rio",
          department: document.getElementById("adminDepartment2").value.trim() || "Pastoral",
          organizer: document.getElementById("adminDepartment2").value.trim() || "Pastoral",
          responsible: document.getElementById("adminResponsible2").value.trim() || "Por definir",
          status: document.getElementById("adminStatus2").value,
          description: document.getElementById("adminDescription2").value.trim(),
          observations: document.getElementById("adminObservations2").value.trim(),
          autoStyle: document.getElementById("adminAutoStyle").value,
          featured: document.getElementById("adminFeatured2").checked,
          tags: tags.length ? tags : inferTags(title, document.getElementById("adminType2").value)
        };
        const eventImageFile = pendingUploadFiles("adminEventImage")[0];
        if (eventImageFile) {
          if (!cloud.driveReady && !cloud.storageReady) return alert(cloud.storageError || "El almacenamiento de archivos no está disponible.");
          payload.image = await uploadCloudFile(eventImageFile, id, "principal", "Imagen del evento");
        }
        await saveCloudDoc("events", id, payload);
        clearPendingUpload("adminEventImage");
        platform.selectedAdminEvent = id;
        completeUploadProgress("Evento guardado correctamente.");
        alert("Evento guardado correctamente.");
        renderAdminPage();
      }

      async function deletePlatformEvent() {
        if (!requireCloudAdmin()) return;
        const id = platform.selectedAdminEvent;
        if (id === "__new__") return;
        if (!confirm("Deseas eliminar este evento del cronograma?")) return;
        const current = platformEventById(id);
        if (!current) return alert("No encontramos el evento seleccionado.");
        const eventTitle = String(current.title || APP_STATE.events[id]?.title || "").trim();
        const eventDate = String(current.date || APP_STATE.events[id]?.date || "").trim();
        if (!eventTitle || !eventDate) return alert("El evento seleccionado no tiene nombre o fecha válidos y no se puede eliminar de forma segura.");
        await saveCloudDoc("events", id, {
          ...(current || {}),
          ...(APP_STATE.events[id] || {}),
          id,
          title: eventTitle,
          date: eventDate,
          time: current.time,
          type: current.type,
          deleted: true
        });
        platform.selectedAdminEvent = "__new__";
        renderAdminPage();
      }

      async function savePlatformMaterial() {
        if (!requireCloudAdmin()) return;
        if (!cloud.driveReady && !cloud.storageReady) return alert(cloud.storageError || "El almacenamiento de archivos no está disponible.");
        const id = document.getElementById("materialSelect").value;
        const event = platformEventById(id);
        if (!event) return alert("Selecciona primero un evento.");
        // Scheduled events may exist only in the calendar, not yet in Supabase.
        // Validate their metadata before uploading and include it in the first save.
        const title = String(event.title || "").trim();
        const date = String(event.date || "").trim();
        if (!title || !date) return alert("El evento seleccionado no tiene nombre o fecha válidos. Revisa el evento antes de subir archivos.");
        const saved = { ...(APP_STATE.events[id] || {}), id, title, date, type: event.type, custom: Boolean(event.custom) };
        saved.invitations = { ...(event.invitations || {}), ...(saved.invitations || {}) };
        saved.gallery = [...(event.gallery || [])];
        saved.attachments = [...(event.attachments || [])];
        const mainImage = pendingUploadFiles("uploadMainImage")[0];
        if (mainImage) saved.image = await uploadCloudFile(mainImage, id, "principal", "Imagen principal");
        for (const [key, inputId, label] of [
          ["main", "uploadInviteMain", "Invitacion principal"],
          ["whatsapp", "uploadInviteWhatsapp", "Invitacion WhatsApp"],
          ["story", "uploadInviteStory", "Historia redes"],
          ["banner", "uploadInviteBanner", "Banner proyeccion"],
          ["video", "uploadInviteVideo", "Video promocional"]
        ]) {
          const file = pendingUploadFiles(inputId)[0];
          if (file) saved.invitations[key] = await uploadCloudFile(file, id, `invitaciones/${key}`, label);
        }
        for (const file of pendingUploadFiles("uploadGallery")) saved.gallery.push(await uploadCloudFile(file, id, "galeria", "Galeria"));
        for (const file of pendingUploadFiles("uploadFiles")) saved.attachments.push(await uploadCloudFile(file, id, "archivos", "Archivo"));
        await saveCloudDoc("events", id, saved);
        ["uploadMainImage", "uploadInviteMain", "uploadInviteWhatsapp", "uploadInviteStory", "uploadInviteBanner", "uploadInviteVideo", "uploadGallery", "uploadFiles"].forEach(clearPendingUpload);
                setupChurchMusic();
        completeUploadProgress("Todo el material quedó guardado correctamente.");
        alert("Material guardado correctamente en la biblioteca.");
        renderAdminPage();
      }

      async function saveWeeklySchedule() {
        if (!requireCloudAdmin()) return;
        if (!cloud.driveReady && !cloud.storageReady) return alert("El almacenamiento no está disponible.");
        const file = document.getElementById("uploadWeeklySchedule")?.files[0];
        if (!file) return alert("Selecciona primero una imagen.");
        if (!file.type.startsWith("image/")) return alert("El cronograma semanal debe subirse como imagen (PNG, JPG o WEBP).");
        setUploadProgressState({ active: true, label: "Preparando la imagen…", detail: "Optimizando el cronograma semanal.", percent: 0, tone: "loading" });
        let optimizedFile;
        try {
          optimizedFile = await optimizeScheduleImage(file);
        } catch (error) {
          setUploadProgressState({ label: "No se pudo preparar la imagen", detail: error.message || "Inténtalo de nuevo.", percent: 0, tone: "error" });
          window.clearTimeout(uploadProgressTimer);
          uploadProgressTimer = window.setTimeout(() => setUploadProgressState({ active: false }), 4500);
          return alert(error.message || "No se pudo preparar la imagen. Usa una imagen más liviana.");
        }
        const asset = await uploadCloudFile(optimizedFile, "site", "cronograma-semanal", "Cronograma semanal");
        await saveCloudDoc("settings", "site", { weeklySchedule: asset });
        APP_STATE.weeklySchedule = asset;
        completeUploadProgress("Cronograma semanal guardado correctamente.");
        alert("Cronograma semanal guardado.");
        renderAdminPage();
      }

      async function optimizeScheduleImage(file) {
        if (!window.createImageBitmap || file.size < 4 * 1024 * 1024) return file;
        try {
          const bitmap = await createImageBitmap(file);
          const maxWidth = 3000;
          const scale = Math.min(1, maxWidth / bitmap.width);
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(bitmap.width * scale);
          canvas.height = Math.round(bitmap.height * scale);
          canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
          const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg", .9));
          bitmap.close();
          if (!blob) return file;
          return new File([blob], `${file.name.replace(/\.[^.]+$/, "")}.jpg`, { type: "image/jpeg", lastModified: Date.now() });
        } catch (error) {
          if (file.size > 12 * 1024 * 1024) throw new Error("La imagen es demasiado pesada. Usa una imagen menor de 12 MB o conviértela a JPG antes de subirla.");
          console.warn("No se pudo optimizar el cronograma; se intentará subir el original", error);
          return file;
        }
      }

      async function deleteWeeklySchedule() {
        if (!requireCloudAdmin()) return;
        if (!APP_STATE.weeklySchedule) return;
        if (!confirm("¿Eliminar la imagen actual del cronograma semanal?")) return;
        await deleteCloudAsset(APP_STATE.weeklySchedule);
        await saveCloudDoc("settings", "site", { weeklySchedule: null });
        APP_STATE.weeklySchedule = null;
        alert("Imagen del cronograma eliminada.");
        renderAdminPage();
      }

      function adminMaterialList(event) {
        if (!event) return emptyText("Selecciona o guarda un evento para administrar su material.");
        const rows = [];
        if (event.image) rows.push(adminMaterialRow("Imagen principal", event.image, "image", "", -1));
        INVITATION_FIELDS.forEach(([key, label]) => {
          if (event.invitations?.[key]) rows.push(adminMaterialRow(label, event.invitations[key], "invitation", key, -1));
        });
        (event.gallery || []).forEach((asset, index) => rows.push(adminMaterialRow(asset.label || "Galeria", asset, "gallery", "", index)));
        (event.attachments || []).forEach((asset, index) => rows.push(adminMaterialRow(asset.label || "Archivo", asset, "attachment", "", index)));
        if (!rows.length) return emptyText("Este evento aun no tiene material subido.");
        return `<div class="existing-list"><h3>Material subido</h3>${rows.join("")}</div>`;
      }

      function adminMaterialRow(label, asset, kind, key, index) {
        return `<article><span><strong>${escapeHtml(label)}</strong><small>${escapeHtml(asset.name || asset.url || "Archivo")}</small></span><button class="small-action" type="button" data-remove-asset data-kind="${kind}" data-key="${key}" data-index="${index}">Eliminar</button></article>`;
      }

      async function removePlatformAsset(kind, key, index) {
        if (!requireCloudAdmin()) return;
        const event = platformEventById(platform.selectedAdminEvent);
        if (!event) return alert("Selecciona primero un evento.");
        if (!confirm("Deseas eliminar este archivo de la nube y de la parte publica?")) return;

        const docRef = cloud.dbMod.doc(cloud.db, "events", event.id);
        if (kind === "image") {
          await deleteCloudAsset(event.image);
          await cloud.dbMod.updateDoc(docRef, { image: null, updatedAt: cloud.dbMod.serverTimestamp() });
          APP_STATE.events[event.id] = { ...(APP_STATE.events[event.id] || {}), image: null };
        }
        if (kind === "invitation") {
          await deleteCloudAsset(event.invitations?.[key]);
          const invitations = { ...(event.invitations || {}) };
          delete invitations[key];
          await cloud.dbMod.updateDoc(docRef, { invitations, updatedAt: cloud.dbMod.serverTimestamp() });
          APP_STATE.events[event.id] = { ...(APP_STATE.events[event.id] || {}), invitations };
        }
        if (kind === "gallery") {
          const gallery = [...(event.gallery || [])];
          const [asset] = gallery.splice(index, 1);
          await deleteCloudAsset(asset);
          await cloud.dbMod.updateDoc(docRef, { gallery, updatedAt: cloud.dbMod.serverTimestamp() });
          APP_STATE.events[event.id] = { ...(APP_STATE.events[event.id] || {}), gallery };
        }
        if (kind === "attachment") {
          const attachments = [...(event.attachments || [])];
          const [asset] = attachments.splice(index, 1);
          await deleteCloudAsset(asset);
          await cloud.dbMod.updateDoc(docRef, { attachments, updatedAt: cloud.dbMod.serverTimestamp() });
          APP_STATE.events[event.id] = { ...(APP_STATE.events[event.id] || {}), attachments };
        }
        alert("Material eliminado.");
        renderAdminPage();
      }

      async function deleteCloudAsset(asset) {
        if (!asset) return;
        if (asset.provider === "google-drive" && asset.driveFileId) {
          try {
            const form = new FormData();
            form.append("action", "delete");
            form.append("driveFileId", asset.driveFileId);
            const { data, error } = await cloud.app.functions.invoke(SUPABASE_CONFIG.driveFunction, { body: form });
            if (error || data?.error) throw new Error(data?.error || error?.message || "No se pudo eliminar el archivo de Drive.");
          } catch (error) {
            console.warn("No se pudo eliminar el archivo de Google Drive", error);
          }
          return;
        }
        if (!asset.path) return;
        try {
          await cloud.storageMod.deleteObject(cloud.storageMod.ref(cloud.storage, asset.path));
        } catch (error) {
          console.warn("No se pudo eliminar el archivo de Storage", error);
        }
      }

      async function savePlatformReflection() {
        if (!requireCloudAdmin()) return;
        const date = document.getElementById("reflectionDate").value;
        const text = document.getElementById("reflectionText").value.trim();
        const mediaType = document.getElementById("reflectionMediaType").value;
        const youtube = document.getElementById("reflectionYoutube").value.trim();
        const mediaFile = document.getElementById("reflectionMediaFile").files[0];
        if (!date) return alert("La fecha es obligatoria.");
        if (mediaType === "youtube" && !youtube && !text) return alert("Pega un enlace de YouTube o agrega un texto de respaldo.");
        if (mediaType === "upload" && !mediaFile && !text) return alert("Selecciona un audio/video o agrega un texto de respaldo.");
        let media = null;
        if (mediaType === "youtube" && youtube) {
          if (!youtubeEmbedUrl(youtube)) return alert("Ese enlace de YouTube no parece válido.");
          media = { type: "youtube", url: youtube };
        }
        if (mediaType === "upload" && mediaFile) {
          if (!isAudio(mediaFile) && !isVideo(mediaFile)) return alert("Solo se permiten archivos de audio o video.");
          const previous = APP_STATE.reflections[date]?.media;
          if (previous?.path) await deleteCloudAsset(previous);
          media = await uploadCloudFile(mediaFile, date, "reflexiones", "Reflexión multimedia");
        }
        await saveCloudDoc("reflections", date, {
          text,
          ref: document.getElementById("reflectionRef").value.trim(),
          style: document.getElementById("reflectionStyle").value,
          media
        });
        completeUploadProgress("Reflexión guardada correctamente.");
        alert("Reflexión multimedia guardada.");
        renderAdminPage();
      }

      async function savePlatformPodcast() {
        if (!requireCloudAdmin()) return;
        const title = document.getElementById("podcastTitle")?.value.trim();
        const category = document.getElementById("podcastCategory")?.value || "Testimonios";
        const mediaType = document.getElementById("podcastMediaType")?.value || "upload";
        const youtube = document.getElementById("podcastYoutube")?.value.trim();
        const mediaFile = pendingUploadFiles("podcastMediaFile")[0];
        const coverFile = pendingUploadFiles("podcastCoverFile")[0];
        if (!title) return alert("El título del episodio es obligatorio.");
        const selected = (APP_STATE.podcasts || []).find(item => item.id === platform.selectedPodcast) || null;
        const id = selected?.id || `podcast-${Date.now()}-${slugify(title)}`;
        let media = selected?.media || null;
        let previousMedia = null;
        if (mediaType === "youtube") {
          if (!youtube || !youtubeEmbedUrl(youtube)) return alert("Pega un enlace válido de YouTube.");
          previousMedia = selected?.media || null;
          media = { type: "youtube", url: youtube };
        } else if (mediaFile) {
          if (!isAudio(mediaFile) && !isVideo(mediaFile)) return alert("El episodio debe ser un archivo de audio o video.");
          previousMedia = selected?.media || null;
          media = await uploadCloudFile(mediaFile, id, "podcasts", "Episodio de Historias que Edifican");
        } else if (!media) {
          return alert("Agrega un enlace de YouTube o un audio/video del episodio.");
        }
        let cover = selected?.cover || null;
        let previousCover = null;
        if (coverFile) {
          if (!isImage(coverFile)) return alert("La portada debe ser una imagen.");
          previousCover = cover || null;
          cover = await uploadCloudFile(coverFile, id, "podcast-cover", "Portada de Historias que Edifican");
        }
        await saveCloudDoc("podcasts", id, {
          id,
          title,
          category,
          description: document.getElementById("podcastDescription")?.value.trim() || "",
          media,
          cover,
          published: document.getElementById("podcastPublished")?.checked !== false,
          featured: Boolean(document.getElementById("podcastFeatured")?.checked),
          createdBy: cloud.user.id,
          createdAt: selected?.createdAt || new Date().toISOString()
        });
        if (previousMedia && previousMedia !== media) await deleteCloudAsset(previousMedia);
        if (previousCover && previousCover !== cover) await deleteCloudAsset(previousCover);
        ["podcastMediaFile", "podcastCoverFile"].forEach(clearPendingUpload);
        platform.selectedPodcast = id;
        completeUploadProgress("Episodio guardado correctamente.");
        alert("Episodio guardado en Historias que Edifican.");
        renderAdminPage();
      }

      async function deletePlatformPodcast() {
        if (!requireCloudAdmin()) return;
        const item = (APP_STATE.podcasts || []).find(podcast => podcast.id === platform.selectedPodcast);
        if (!item || !confirm(`¿Eliminar “${item.title}” de Historias que Edifican?`)) return;
        if (item.media) await deleteCloudAsset(item.media);
        if (item.cover) await deleteCloudAsset(item.cover);
        await cloud.dbMod.deleteDoc(cloud.dbMod.doc(cloud.db, "podcasts", item.id));
        APP_STATE.podcasts = APP_STATE.podcasts.filter(podcast => podcast.id !== item.id);
        platform.selectedPodcast = null;
        alert("Episodio eliminado de Historias que Edifican.");
        renderAdminPage();
      }

      async function savePlatformAnnouncement() {
        if (!requireCloudAdmin()) return;
        const title = document.getElementById("announceTitle2").value.trim();
        const description = document.getElementById("announceDescription2").value.trim();
        if (!title || !description) return alert("Titulo y descripcion son obligatorios.");
        const id = `anuncio-${Date.now()}`;
        await saveCloudDoc("announcements", id, {
          id,
          title,
          description,
          eventId: document.getElementById("announceEvent2").value,
          date: dateKey(today)
        });
        alert("Anuncio publicado en Supabase.");
        renderAdminPage();
      }

      async function saveLeaderProfile() {
        if (!requireCloudAdmin()) return;
        const email = document.getElementById("leaderEmail")?.value.trim().toLowerCase();
        const committee = normalizeCommitteeKey(document.getElementById("leaderCommittee")?.value);
        if (!email || !email.includes("@")) return alert("Escribe un correo válido para el líder.");
        if (!committee || committee === "ipuc") return alert("Selecciona un comité válido.");
        const existing = (APP_STATE.committeeLeaders || []).find(item => String(item.email || "").trim().toLowerCase() === email && item.committee === committee);
        const id = existing?.id || `leader-${crypto.randomUUID()}`;
        await saveCloudDoc("committeeLeaders", id, { id, email, committee, active: true, createdBy: cloud.user.id });
        alert("Cuenta autorizada para este comité. Puede entrar con Google o con su cuenta habitual usando este correo verificado.");
        renderAdminPage();
      }

      async function deleteLeaderProfile(id) {
        if (!requireCloudAdmin()) return;
        const leader = (APP_STATE.committeeLeaders || []).find(item => item.id === id);
        if (!leader || !confirm(`¿Quitar el acceso de ${leader.email}?`)) return;
        await cloud.dbMod.deleteDoc(cloud.dbMod.doc(cloud.db, "committeeLeaders", id));
        APP_STATE.committeeLeaders = APP_STATE.committeeLeaders.filter(item => item.id !== id);
        alert("Acceso de líder eliminado.");
        renderAdminPage();
      }

      async function updateLeaderSubmissionStatus(id, status) {
        if (!requireCloudAdmin()) return;
        if (!["pendiente", "atendida", "rechazada"].includes(status)) return;
        await cloud.dbMod.updateDoc(cloud.dbMod.doc(cloud.db, "leaderSubmissions", id), { status, updatedAt: cloud.dbMod.serverTimestamp() });
        APP_STATE.leaderSubmissions = APP_STATE.leaderSubmissions.map(item => item.id === id ? { ...item, status } : item);
        renderAdminPage();
      }

      async function openPrivateSubmissionAsset(submissionId, fileIndex) {
        const submission = (APP_STATE.leaderSubmissions || []).find(item => item.id === submissionId);
        const asset = submission?.files?.[fileIndex];
        const canOpen = isAdmin() || (isLeader() && submission?.createdBy === cloud.user?.id);
        if (!asset?.path || !canOpen) return alert("No tienes permiso para abrir este archivo privado.");
        const url = await cloud.storageMod.getSignedDownloadURL(cloud.storageMod.ref(cloud.storage, asset.path, asset.bucket || SUPABASE_CONFIG.leaderBucket), 3600);
        window.open(url, "_blank", "noopener");
      }

      async function saveCloudDoc(collectionName, id, data) {
        const payload = stripUndefined({
          ...data,
          updatedAt: cloud.dbMod.serverTimestamp()
        });
        if (collectionName === "events") {
          const title = String(payload.title || "").trim();
          const date = String(payload.date || "").trim();
          if (!title || !date) throw new Error("El evento necesita un nombre y una fecha antes de guardarse.");
          payload.title = title;
          payload.date = date;
        }
        if (uploadProgressState.active) setUploadProgressState({ label: "Guardando cambios…", detail: "El archivo ya se cargó; estamos guardando la información.", percent: 100, tone: "loading" });
        try {
          const result = await cloud.dbMod.setDoc(cloud.dbMod.doc(cloud.db, collectionName, id), payload, { merge: true });
          if (result?.error) throw result.error;
          syncLocalCloudDoc(collectionName, id, payload);
        } catch (error) {
          if (uploadProgressState.active) {
            setUploadProgressState({ label: "No se pudo guardar la información", detail: cloudActionMessage(error), percent: 100, tone: "error" });
            window.clearTimeout(uploadProgressTimer);
            uploadProgressTimer = window.setTimeout(() => setUploadProgressState({ active: false }), 5000);
          }
          throw error;
        }
      }

      async function uploadCloudFile(file, eventId, section, label) {
        if (cloud.driveReady) return uploadDriveFile(file, eventId, section, label);
        const safeName = safeFileName(file.name);
        const path = `events/${eventId}/${section}/${Date.now()}-${safeName}`;
        const fileRef = cloud.storageMod.ref(cloud.storage, path);
        setUploadProgressState({ active: true, label: `Subiendo ${file.name}`, detail: `${label} · ${humanFileSize(file.size)}`, percent: 0, tone: "loading" });
        try {
          await cloud.storageMod.uploadBytes(fileRef, file, { contentType: file.type || "application/octet-stream", onProgress: updateUploadProgress });
          setUploadProgressState({ label: "Archivo cargado", detail: `${label} · preparando el enlace público…`, percent: 100, tone: "loading" });
          const url = await cloud.storageMod.getDownloadURL(fileRef);
          return {
            id: `asset-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            label,
            name: file.name,
            type: file.type || "application/octet-stream",
            size: file.size,
            uploadedAt: dateKey(new Date()),
            path,
            url
          };
        } catch (error) {
          cloud.storageReady = false;
          cloud.storageError = cloudActionMessage(error);
          setUploadProgressState({ label: "No se pudo completar la carga", detail: cloud.storageError, percent: 0, tone: "error" });
          window.clearTimeout(uploadProgressTimer);
          uploadProgressTimer = window.setTimeout(() => setUploadProgressState({ active: false }), 4500);
          throw error;
        }
      }

      async function uploadPrivateLeaderFile(file, submissionId) {
        if (!cloud.leaderStorageReady) throw new Error("El almacenamiento privado de líderes no está disponible todavía.");
        const safeName = safeFileName(file.name);
        const path = `${cloud.user.id}/${submissionId}/${Date.now()}-${safeName}`;
        const fileRef = cloud.storageMod.ref(cloud.storage, path, SUPABASE_CONFIG.leaderBucket);
        setUploadProgressState({ active: true, label: `Subiendo ${file.name}`, detail: `Material privado · ${humanFileSize(file.size)}`, percent: 0, tone: "loading" });
        try {
          await cloud.storageMod.uploadBytes(fileRef, file, { contentType: file.type || "application/octet-stream", onProgress: updateUploadProgress });
        } catch (error) {
          setUploadProgressState({ label: "No se pudo completar la carga", detail: cloudActionMessage(error), percent: 0, tone: "error" });
          window.clearTimeout(uploadProgressTimer);
          uploadProgressTimer = window.setTimeout(() => setUploadProgressState({ active: false }), 4500);
          throw error;
        }
        return { id: `private-${Date.now()}-${Math.random().toString(16).slice(2)}`, name: file.name, type: file.type || "application/octet-stream", size: file.size, uploadedAt: dateKey(new Date()), path, bucket: SUPABASE_CONFIG.leaderBucket, private: true };
      }

      async function saveLeaderSubmission() {
        if (!isLeader()) return alert("Debes entrar con una cuenta de líder autorizada.");
        if (!cloud.leaderStorageReady) return alert("El almacenamiento privado no está disponible. Recarga la página e inténtalo de nuevo.");
        const profile = leaderProfile();
        const eventId = document.getElementById("leaderEventSelect")?.value || null;
        const selectedEvent = eventId ? leaderEvents().find(event => event.id === eventId) : null;
        const title = document.getElementById("leaderRequestTitle")?.value.trim();
        const message = document.getElementById("leaderRequestMessage")?.value.trim();
        const files = pendingUploadFiles("leaderSubmissionFiles");
        if (!title && !message && !files.length) return alert("Escribe la solicitud o adjunta al menos un archivo.");
        const id = `submission-${Date.now()}-${Math.random().toString(16).slice(2)}`;
        const uploaded = [];
        for (const file of files) {
          if (!isImage(file) && !isVideo(file) && !isAudio(file)) return alert("Solo se permiten imágenes, videos o audios.");
          uploaded.push(await uploadPrivateLeaderFile(file, id));
        }
        await saveCloudDoc("leaderSubmissions", id, { id, leaderEmail: profile.email, committee: profile.committee, submissionEventId: eventId && APP_STATE.events[eventId] ? eventId : null, eventLabel: selectedEvent ? `${formatDateShort(selectedEvent.date)} · ${selectedEvent.title}` : "", submissionTitle: title || "Solicitud de material", message, files: uploaded, status: "pendiente", createdBy: cloud.user.id });
        clearPendingUpload("leaderSubmissionFiles");
        completeUploadProgress("Solicitud enviada correctamente.");
        alert("Tu solicitud fue enviada a DECOM.");
        renderLeaderPage();
      }

      function setUploadProgressState(next) {
        Object.assign(uploadProgressState, next);
        const panel = document.getElementById("uploadProgress");
        if (!panel) return;
        panel.hidden = !uploadProgressState.active;
        panel.classList.toggle("is-error", uploadProgressState.tone === "error");
        const label = panel.querySelector("[data-upload-progress-label]");
        const percent = panel.querySelector("[data-upload-progress-percent]");
        const bar = panel.querySelector("[data-upload-progress-bar]");
        const detail = panel.querySelector("[data-upload-progress-detail]");
        if (label) label.textContent = uploadProgressState.label || "Preparando archivo…";
        if (percent) percent.textContent = `${Math.max(0, Math.min(100, Math.round(uploadProgressState.percent || 0)))}%`;
        if (bar) bar.style.width = `${Math.max(0, Math.min(100, uploadProgressState.percent || 0))}%`;
        if (detail) detail.textContent = uploadProgressState.detail || "";
      }

      function updateUploadProgress(loaded, total) {
        const percent = total ? (loaded / total) * 100 : 0;
        setUploadProgressState({ active: true, percent, tone: "loading" });
      }

      function completeUploadProgress(detail = "Todo quedó guardado correctamente.") {
        if (!uploadProgressState.active) return;
        window.clearTimeout(uploadProgressTimer);
        setUploadProgressState({ active: true, label: "Carga completada", detail, percent: 100, tone: "success" });
        uploadProgressTimer = window.setTimeout(() => setUploadProgressState({ active: false }), 1800);
      }

      function safeFileName(name) {
        return String(name).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "archivo";
      }

      function stripUndefined(value) {
        if (Array.isArray(value)) return value.map(stripUndefined).filter(item => item !== undefined);
        if (value && typeof value === "object") {
          return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined).map(([key, item]) => [key, stripUndefined(item)]));
        }
        return value;
      }

      function platformEventsForYear(year) {
        const generated = [];
        const programmedCultos = new Set(PROGRAMMED_EVENTS.filter(event => event.type === "culto").map(event => event.date));
        const date = new Date(year, 0, 1);
        while (date.getFullYear() === year) {
          const key = dateKey(date);
          const base = DAY_BASE[date.getDay()];
          if (base && !programmedCultos.has(key)) generated.push({ date: key, ...base, time: autoTime({ date: key, type: base.type }) });
          // Every other Friday, anchored to the first confirmed devotional.
          const devotionalDays = (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(2026, 9, 9)) / 86400000;
          if (devotionalDays >= 0 && devotionalDays % 14 === 0) generated.push({
            date: key, type: "oracion", title: "Devocionales por sectores", department: "IPUC Villa del Río", time: "7:00 p. m."
          });
          date.setDate(date.getDate() + 1);
        }
        const custom = Object.values(APP_STATE.events || {}).filter(event => event.custom && event.date && parseDate(event.date).getFullYear() === year);
        const merged = mergeEvents([...generated, ...PROGRAMMED_EVENTS], custom);
        return merged.map(platformEnrichEvent).filter(event => !event.deleted).sort(sortByDate);
      }

      function platformEnrichEvent(raw) {
        const base = enrichEvent(raw);
        const saved = APP_STATE.events[base.id] || {};
        const event = {
          ...base,
          ...saved,
          department: saved.department || saved.organizer || raw.department || base.organizer || inferOrganizer(base.title),
          place: saved.place || base.place || "IPUC Villa del Rio",
          time: saved.time || raw.time || autoTime(base),
          status: platformStatus({ ...base, ...saved }),
          image: saved.image || base.image || null,
          autoStyle: saved.autoStyle || "automatico",
          invitations: { ...(base.invitations || {}), ...(saved.invitations || {}) },
          attachments: saved.attachments || base.attachments || [],
          gallery: saved.gallery || base.gallery || []
        };
        event.tags = saved.tags || base.tags || inferTags(event.title, event.type);
        return event;
      }

      function platformEventById(id) {
        return platformEventsForYear(today.getFullYear()).find(event => event.id === id) || platformEventsForYear(platform.calendarDate.getFullYear()).find(event => event.id === id);
      }

      function eventsForPlatformDate(date) {
        return platformEventsForYear(date.getFullYear()).filter(event => event.date === dateKey(date));
      }

      function autoTime(event) {
        if (event.type === "oracion") return BASE_TIMES.oracion;
        if (event.type === "vigilia") return BASE_TIMES.vigilia;
        if (event.type === "ayuno") return BASE_TIMES.ayuno;
        if (parseDate(event.date).getDay() === 0) return BASE_TIMES.domingo;
        return BASE_TIMES.culto;
      }

      function platformStatus(event) {
        if (!event || !event.date) return "Pendiente";
        if (event.status === "Cancelado") return "Cancelado";
        if (parseDate(event.date) < today) return "Realizado";
        if (event.status === "Pendiente") return "Pendiente";
        return "Proximo";
      }

      function eventImage(event) {
        // An administrator's uploaded image takes precedence over committee defaults.
        if (event.image && isImage(event.image)) return assetSource(event.image, "display");
        if (event.invitations?.main && isImage(event.invitations.main)) return assetSource(event.invitations.main, "display");
        if (isJovenesCulto(event)) return "/assets/culto-jovenes.png?v=20260907-1";
        if (isMisionesCulto(event)) return "/assets/culto-misiones.png?v=20260907-1";
        if (isObraSocialCulto(event)) return "/assets/culto-obra-social.png?v=20260907-1";
        if (isEscuelaDominicalCulto(event)) return "/assets/culto-escuela-dominical.png?v=20260907-1";
        if (isOracionEnsenanzaCulto(event)) return "/assets/culto-oracion-ensenanza.png?v=20260907-1";
        if (isRedFamiliasCulto(event)) return "/assets/culto-red-de-familias.png?v=20260907-1";
        if (isEdadDoradaCulto(event)) return "/assets/culto-edad-dorada.png?v=20260907-1";
        if (isMusicaCulto(event)) return "/assets/culto-musica.png?v=20260907-1";
        if (isDamasDorcasEvent(event)) return "/assets/culto-damas-dorcas.png?v=20260907-2";
        if (isCaballerosEvent(event)) return "/assets/culto-caballeros.png";
        if (isEvangelismoEvent(event)) return "/assets/culto-evangelismo.png?v=20260907-1";
        if (isRegularSundayWorship(event)) return DEFAULT_SUNDAY_INVITATION.url;
        return autoImage(event.type, event.autoStyle, event.title);
      }

      function isCultoEvent(event) {
        return String(event?.type || "").trim().toLowerCase() === "culto";
      }

      function isDamasDorcasEvent(event) {
        if (!isCultoEvent(event)) return false;
        const values = [event?.title, event?.department, event?.organizer, event?.committee, ...(Array.isArray(event?.tags) ? event.tags : [])];
        return values.some(value => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("damas dorcas"));
      }

      function isJovenesCulto(event) {
        if (!isCultoEvent(event)) return false;
        const values = [event?.title, event?.department, event?.organizer, event?.committee, ...(Array.isArray(event?.tags) ? event.tags : [])];
        return values.some(value => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("jovenes"));
      }

      function isMisionesCulto(event) {
        if (!isCultoEvent(event)) return false;
        const values = [event?.title, event?.department, event?.organizer, event?.committee, ...(Array.isArray(event?.tags) ? event.tags : [])];
        return values.some(value => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("misiones"));
      }

      function isObraSocialCulto(event) {
        if (!isCultoEvent(event)) return false;
        const values = [event?.title, event?.department, event?.organizer, event?.committee, ...(Array.isArray(event?.tags) ? event.tags : [])];
        return values.some(value => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("obra social"));
      }

      function isEscuelaDominicalCulto(event) {
        if (!isCultoEvent(event)) return false;
        const values = [event?.title, event?.department, event?.organizer, event?.committee, ...(Array.isArray(event?.tags) ? event.tags : [])];
        return values.some(value => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("escuela dominical"));
      }

      function isOracionEnsenanzaCulto(event) {
        if (!isCultoEvent(event)) return false;
        const values = [event?.title, event?.department, event?.organizer, event?.committee, ...(Array.isArray(event?.tags) ? event.tags : [])];
        return values.some(value => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("oracion y ensenanza"));
      }

      function isRedFamiliasCulto(event) {
        if (!isCultoEvent(event)) return false;
        const values = [event?.title, event?.department, event?.organizer, event?.committee, ...(Array.isArray(event?.tags) ? event.tags : [])];
        return values.some(value => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("red de familia"));
      }

      function isEdadDoradaCulto(event) {
        if (!isCultoEvent(event)) return false;
        const values = [event?.title, event?.department, event?.organizer, event?.committee, ...(Array.isArray(event?.tags) ? event.tags : [])];
        return values.some(value => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("edad dorada"));
      }

      function isMusicaCulto(event) {
        if (!isCultoEvent(event)) return false;
        const values = [event?.title, event?.department, event?.organizer, event?.committee, ...(Array.isArray(event?.tags) ? event.tags : [])];
        return values.some(value => {
          const normalized = String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          return normalized.includes("musica") || normalized.includes("alabanza");
        });
      }

      async function loadMembershipAdmin() {
        if (!isAdmin() || !cloud.db) return;
        try {
          const [members, attendance, changes, accounts] = await Promise.all([
            cloud.db.from("church_members").select("*").order("created_at", { ascending: false }),
            cloud.db.from("member_attendance").select("*").order("attended_at", { ascending: false }),
            cloud.db.from("member_change_requests").select("*").eq("status", "pendiente").order("created_at", { ascending: false }),
            cloud.db.from("account_profiles").select("*").order("created_at", { ascending: false })
          ]);
          if (members.error) throw members.error;
          if (attendance.error) throw attendance.error;
          if (changes.error) throw changes.error;
          platform.members = members.data || [];
          platform.memberAttendance = attendance.data || [];
          platform.memberChangeRequests = changes.data || [];
          platform.memberAccounts = accounts.data || [];
          const photoPaths = [...new Set([...platform.members, ...platform.memberChangeRequests].map(member => member.photo_path).filter(Boolean))];
          if (photoPaths.length) {
            const { data: signedPhotos, error: signedPhotoError } = await cloud.storage.from("membership-photos").createSignedUrls(photoPaths, 600);
            if (signedPhotoError) console.warn("No se pudieron cargar algunas fotos privadas.", signedPhotoError);
            const photoUrls = new Map((signedPhotos || []).map(photo => [photo.path, photo.signedUrl]));
            platform.members.forEach(member => { member.photo_preview_url = photoUrls.get(member.photo_path) || ""; });
            platform.memberChangeRequests.forEach(request => { request.photo_preview_url = photoUrls.get(request.photo_path) || ""; });
          }
          if (parseRoute().name === "admin" && platform.adminSection === "membresia") renderAdminPage();
        } catch (error) {
          cloud.storageError = `No se pudo cargar el registro privado: ${error.message}`;
          if (parseRoute().name === "admin") renderAdminPage();
        }
      }

      function renderMemberChangeQueue() {
        const requests = platform.memberChangeRequests || [];
        if (!requests.length) return `<section class="member-change-queue"><div class="section-title"><p class="eyebrow">Revisión administrativa</p><h3>Solicitudes de actualización</h3></div><p class="member-empty">No hay cambios pendientes de aprobación.</p></section>`;
        const labels = { CC: "C.C.", TI: "T.I.", CE: "C.E.", PA: "Pasaporte", RC: "R.C.", PPT: "P.P.T." };
        const renderRequest = request => {
          const baptized = request.is_baptized ? "Sí" : "No";
          const tags = values => (Array.isArray(values) ? values : []).map(value => `<span class="member-capability-tag">${escapeHtml(value)}</span>`).join("");
          return `<article class="member-change-request" data-change-request-id="${escapeHtml(request.id)}"><div class="member-change-request-photo">${request.photo_preview_url ? `<img src="${escapeHtml(request.photo_preview_url)}" alt="Foto enviada por ${escapeHtml(request.full_name)}">` : `<span>${escapeHtml(String(request.full_name || "?").slice(0, 1).toUpperCase())}</span>`}</div><div class="member-change-request-details"><strong>${escapeHtml(request.full_name)}</strong><small>${escapeHtml(labels[request.document_type] || request.document_type || "")} ${escapeHtml(request.document_number || "")} · ${escapeHtml(request.email)} · ${escapeHtml(request.phone)}</small><small>${escapeHtml(request.address)}</small><small>Nacimiento: ${escapeHtml(request.birth_date)} · Bautizado: ${baptized} · Lleno del Espíritu Santo: ${request.filled_with_holy_spirit ? "Sí" : "No"}</small>${request.guardian_consent ? `<small>Representante: ${escapeHtml(request.guardian_full_name || "No indicado")} · autorización confirmada · menor informado: ${request.minor_informed_consent ? "Sí" : "No"}</small>` : ""}<small>${request.has_church_role ? `Cargo: ${escapeHtml(request.church_role || "Por registrar")} · Comité: ${escapeHtml(request.church_committee || "Por clasificar")}` : "Sin cargo"}</small>${request.occupation ? `<small>Oficio o profesión: ${escapeHtml(request.occupation)}</small>` : ""}${request.skills?.length ? `<div class="member-capability-tags"><small>Experiencia</small>${tags(request.skills)}</div>` : ""}${request.support_interests?.length ? `<div class="member-capability-tags"><small>Áreas de apoyo</small>${tags(request.support_interests)}</div>` : ""}${window.MemberProfile.facts(request)}<small>Enviada: ${escapeHtml(new Date(request.created_at).toLocaleString("es-CO"))}</small></div><div class="member-change-request-actions">${request.photo_path ? `<button type="button" class="small-action" data-change-photo="${escapeHtml(request.photo_path)}">Ver foto</button>` : ""}<button type="button" class="primary-link" data-approve-member-change>Aprobar cambios</button><button type="button" class="small-action danger-action" data-reject-member-change>Rechazar</button></div></article>`;
        };
        return `<section class="member-change-queue"><div class="section-title"><p class="eyebrow">Revisión administrativa · ${requests.length} pendiente${requests.length === 1 ? "" : "s"}</p><h3>Solicitudes de actualización</h3><p>Los datos oficiales permanecen iguales hasta que un administrador apruebe cada cambio.</p></div>${requests.map(renderRequest).join("")}</section>`;
      }

      function normalizeMemberLabel(value) {
        return String(value || "").toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
      }

      function isCommitteeLeaderRole(role) {
        return /\b(presidente|presidenta|vicepresidente|vicepresidenta|lider|coordinador|coordinadora|director|directora|encargado|encargada|responsable|jefe|jefa|pastor|pastora)\b/.test(normalizeMemberLabel(role));
      }

      function memberDirectoryAssignments(member) {
        if (!member?.has_church_role) return [];
        const savedCommittees = String(member.church_committee || "").split(/\s*\|\s*/).map(value => value.trim()).filter(Boolean);
        const roles = String(member.church_role || "").split(/\s*\|\s*/).map(value => value.trim()).filter(Boolean);
        const committees = savedCommittees.length ? savedCommittees : ["Por clasificar"];
        return committees.map((value, index) => ({
          committee: MEMBERSHIP_COMMITTEES.find(name => normalizeMemberLabel(name) === normalizeMemberLabel(value)) || value,
          role: roles[index] || roles[0] || "",
        }));
      }

      function memberDirectoryCommittees(member) {
        return [...new Set(memberDirectoryAssignments(member).map(item => item.committee))];
      }

      function memberLeadershipSummary(member) {
        return memberDirectoryAssignments(member).filter(item => isCommitteeLeaderRole(item.role)).map(item => `${item.committee}: ${item.role}`);
      }

      function renderMemberDirectoryRow(member) {
        const attendanceCount = (platform.memberAttendance || []).filter(row => row.member_id === member.id).length;
        const committees = memberDirectoryCommittees(member);
        const committee = committees.join(" · ");
        const leadership = memberLeadershipSummary(member);
        const documentLabel = { CC: "C.C.", TI: "T.I.", CE: "C.E.", PA: "Pasaporte", RC: "R.C.", PPT: "P.P.T." }[member.document_type] || member.document_type || "Documento";
        const initial = escapeHtml(String(member.full_name || "?").trim().slice(0, 1).toLocaleUpperCase("es"));
        const renderCapabilityTags = values => (Array.isArray(values) ? values : []).map(value => `<span class="member-capability-tag">${escapeHtml(value)}</span>`).join("");
        const capabilityFacts = `${member.skills?.length ? `<span><small>Habilidades y conocimientos</small><strong class="member-capability-tags">${renderCapabilityTags(member.skills)}</strong></span>` : ""}${member.occupation ? `<span><small>Oficio o profesión</small><strong>${escapeHtml(member.occupation)}</strong></span>` : ""}${member.support_interests?.length ? `<span><small>Áreas donde desea apoyar</small><strong class="member-capability-tags">${renderCapabilityTags(member.support_interests)}</strong></span>` : ""}${window.MemberProfile.facts(member)}`;
        const roleDetails = member.has_church_role
          ? `<span><small>Comité</small><strong>${escapeHtml(committee)}</strong></span><span><small>Cargo</small><strong>${escapeHtml(member.church_role || "Pendiente de registrar")}</strong></span>${member.document_number ? `<span><small>Documento</small><strong>${escapeHtml(documentLabel)} · ${escapeHtml(member.document_number)}</strong></span>` : ""}${capabilityFacts}`
          : `<span><small>Vinculación</small><strong>Miembro sin cargo</strong></span>${capabilityFacts}`;
        const baptismFact = member.is_baptized === true
          ? "Sí"
          : member.is_baptized === false ? "No" : "";
        return `<article class="member-admin-row member-profile-card" data-member-id="${escapeHtml(member.id)}" data-member-committee="${escapeHtml(committees.join("|"))}">
          <div class="member-profile-main"><div class="member-profile-photo">${member.photo_preview_url ? `<img src="${escapeHtml(member.photo_preview_url)}" alt="Foto de ${escapeHtml(member.full_name)}" loading="lazy" decoding="async">` : `<span aria-hidden="true">${initial}</span>`}</div>
            <div class="member-profile-content"><div class="member-profile-heading"><div><small class="member-profile-kicker">Ficha de miembro · uso administrativo</small><h3>${escapeHtml(member.full_name)}</h3>${leadership.length ? `<span class="member-leader-badge">${leadership.map(escapeHtml).join(" · ")}</span>` : ""}</div><span class="member-status-chip status-${escapeHtml(member.status)}">${escapeHtml(member.status)}</span></div>
              <div class="member-profile-facts"><span><small>Número de miembro</small><strong>${escapeHtml(member.member_number || "Pendiente")}</strong></span><span><small>Correo y teléfono</small><strong>${escapeHtml(member.email || "Sin correo")} · ${escapeHtml(member.phone || "Sin teléfono")}</strong></span>${roleDetails}${member.birth_date ? `<span><small>Fecha de nacimiento</small><strong>${escapeHtml(member.birth_date)}</strong></span>` : ""}${baptismFact ? `<span><small>Bautismo</small><strong>${baptismFact}</strong></span>` : ""}${member.is_baptized !== null && member.is_baptized !== undefined ? `<span><small>Lleno del Espíritu Santo</small><strong>${member.filled_with_holy_spirit ? "Sí" : "No"}</strong></span>` : ""}<span><small>Dirección</small><strong>${escapeHtml(member.address || "Sin dirección")}</strong></span>${member.guardian_consent ? `<span><small>Representante</small><strong>${escapeHtml(member.guardian_full_name || "No indicado")} · consentimiento confirmado</strong></span>` : ""}<span><small>Asistencia registrada</small><strong>${attendanceCount}${member.attendance_consent ? "" : " · sin autorización"}</strong></span></div>
            </div>
          </div>
          <div class="member-admin-actions">${member.photo_path ? `<button type="button" class="small-action" data-member-photo="${escapeHtml(member.photo_path)}">Ver foto</button>${member.has_church_role ? `<button type="button" class="small-action" data-member-card="png">Descargar carnet</button><button type="button" class="small-action" data-member-card="svg">Carnet SVG</button>` : ""}` : ""}${member.has_church_role ? `<button type="button" class="small-action" data-member-edit-assignments aria-expanded="false">${committees.includes("Por clasificar") ? "Clasificar comité" : "Editar comités y cargos"}</button>` : ""}<label class="member-status-control">Estado<select aria-label="Estado de ${escapeHtml(member.full_name)}" data-member-status><option value="pendiente" ${member.status === "pendiente" ? "selected" : ""}>Pendiente</option><option value="activo" ${member.status === "activo" ? "selected" : ""}>Activo</option><option value="inactivo" ${member.status === "inactivo" ? "selected" : ""}>Inactivo</option></select></label><button type="button" class="small-action" data-member-save-status>Guardar estado</button>${member.attendance_consent ? `<button type="button" class="primary-link" data-member-attendance>Registrar asistencia · ${attendanceCount}</button>` : ""}<button type="button" class="small-action danger-action" data-member-delete>Eliminar datos</button></div>
          ${member.has_church_role ? `<div class="member-admin-assignment-editor" data-member-assignment-editor hidden><p>Asocia cada cargo con su comité. Puedes escribir un comité nuevo; se creará su carpeta automáticamente. Para varias asignaciones usa | y mantén el mismo orden.</p><div class="member-admin-assignment-fields"><label>Comité(s)<input type="text" data-member-committees list="membershipCommitteeOptions" value="${escapeHtml(member.church_committee || "")}" placeholder="Ej. DECOM | Música" maxlength="500"></label><label>Cargo(s)<input type="text" data-member-roles value="${escapeHtml(member.church_role || "")}" placeholder="Ej. Presidente | Director" maxlength="500"></label></div><button type="button" class="primary-link" data-member-save-assignments>Guardar clasificación</button></div>` : ""}
        </article>`;
      }

      function membershipCsvValue(value) {
        const normalized = String(value ?? "");
        const safe = /^[\s]*[=+@\-]/.test(normalized) ? `'${normalized}` : normalized;
        return `"${safe.replace(/"/g, '""')}"`;
      }

      function downloadPrivateFile(content, mimeType, filename) {
        const url = URL.createObjectURL(new Blob([content], { type: mimeType }));
        const link = document.createElement("a");
        link.href = url; link.download = filename;
        document.body.appendChild(link); link.click(); link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1500);
      }

      async function memberPhotoThumbnail(blob) {
        let bitmap;
        let objectUrl = "";
        try {
          if (window.createImageBitmap) bitmap = await createImageBitmap(blob);
          else {
            objectUrl = URL.createObjectURL(blob);
            bitmap = await new Promise((resolve, reject) => {
              const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = objectUrl;
            });
          }
          const scale = Math.min(1, 360 / Math.max(bitmap.width, bitmap.height));
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(bitmap.width * scale)); canvas.height = Math.max(1, Math.round(bitmap.height * scale));
          const context = canvas.getContext("2d");
          if (!context) throw new Error("El navegador no pudo preparar una foto del listado.");
          context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
          return canvas.toDataURL("image/jpeg", .68);
        } finally {
          if (bitmap?.close) bitmap.close();
          if (objectUrl) URL.revokeObjectURL(objectUrl);
        }
      }

      async function membershipPhotoUrls(members) {
        const paths = [...new Set(members.map(member => member.photo_path).filter(Boolean))];
        const urls = new Map();
        for (let index = 0; index < paths.length; index += 100) {
          const { data, error } = await cloud.storage.from("membership-photos").createSignedUrls(paths.slice(index, index + 100), 600);
          if (error) throw error;
          (data || []).forEach(item => { if (item.path && item.signedUrl) urls.set(item.path, item.signedUrl); });
        }
        if (paths.some(path => !urls.has(path))) throw new Error("No se pudieron preparar enlaces privados para todas las fotos. Actualiza el panel e inténtalo de nuevo.");
        return urls;
      }

      async function exportMemberDirectoryWithPhotos(button) {
        const members = platform.members || [];
        if (!members.length) throw new Error("Todavía no hay miembros para exportar.");
        const status = view().querySelector("[data-member-export-status]");
        const originalLabel = button.textContent;
        button.disabled = true;
        try {
          const urls = await membershipPhotoUrls(members);
          const photos = new Map();
          let completed = 0;
          for (let index = 0; index < members.length; index += 3) {
            await Promise.all(members.slice(index, index + 3).map(async member => {
              if (member.photo_path && urls.has(member.photo_path)) {
                const response = await fetch(urls.get(member.photo_path));
                if (!response.ok) throw new Error(`No se pudo cargar la foto privada de ${member.full_name}.`);
                photos.set(member.id, await memberPhotoThumbnail(await response.blob()));
              }
              completed += 1;
              if (status) status.textContent = `Preparando listado privado: ${completed} de ${members.length}…`;
            }));
          }
          const labels = { CC: "C.C.", TI: "T.I.", CE: "C.E.", PA: "Pasaporte", RC: "R.C.", PPT: "P.P.T." };
          const rows = members.map(member => {
            const photo = photos.get(member.id);
            const committee = memberDirectoryCommittees(member).join(" · ");
            const leadership = memberLeadershipSummary(member).join(" · ");
            const fields = [member.member_number, member.full_name, member.status, member.has_church_role ? "Sí" : "No", committee, leadership, member.church_role, member.document_number ? `${labels[member.document_type] || member.document_type} ${member.document_number}` : "", member.email, member.phone, member.address, member.birth_date, member.is_baptized === true ? "Sí" : member.is_baptized === false ? "No" : "", member.filled_with_holy_spirit ? "Sí" : "No", member.skills?.join(" · "), member.occupation, member.support_interests?.join(" · "), member.education_level, member.current_situation?.join(" | "), member.experience_level, member.experience_notes, member.availability?.join(" | "), member.availability_notes, member.training_willingness, member.service_notes, member.guardian_full_name, (platform.memberAttendance || []).filter(item => item.member_id === member.id).length, new Date(member.created_at).toLocaleDateString("es-CO")];
            return `<tr><td>${photo ? `<img class="member-photo" src="${photo}" alt="Foto de ${escapeHtml(member.full_name)}">` : "Sin foto"}</td>${fields.map(value => `<td>${escapeHtml(value || "")}</td>`).join("")}</tr>`;
          }).join("");
          const columns = ["Foto", "N.º miembro", "Nombre", "Estado", "Tiene cargo", "Comité(s)", "Liderazgo", "Cargo(s)", "Documento", "Correo", "Teléfono", "Dirección", "Nacimiento", "Bautizado", "Lleno del Espíritu Santo", "Experiencia y habilidades", "Oficio o profesión", "Áreas de apoyo", "Nivel de estudios", "Situación actual", "Experiencia", "Detalle de experiencia", "Disponibilidad", "Horario adicional", "Capacitación", "Observaciones", "Representante", "Asistencias", "Fecha de registro"];
          const html = `<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Directorio privado de membresía · IPUC Villa del Río</title><style>body{font:14px Arial,sans-serif;color:#172638;margin:24px}h1{color:#00338d;margin-bottom:4px}.note{color:#536578;margin:0 0 18px}.table-wrap{overflow:auto}table{width:100%;border-collapse:collapse}th,td{border:1px solid #cbd5df;padding:7px;text-align:left;vertical-align:middle}th{background:#eaf2f8;position:sticky;top:0}.member-photo{width:58px;height:72px;object-fit:cover;border-radius:5px}@media print{body{margin:8mm;font-size:9px}.table-wrap{overflow:visible}th{position:static}tr{break-inside:avoid}}</style><h1>IPUC Villa del Río · Directorio de membresía</h1><p class="note">Documento privado para uso administrativo. Contiene datos personales y fotografías. Generado ${new Date().toLocaleString("es-CO")}.</p><div class="table-wrap"><table><thead><tr>${columns.map(column => `<th>${column}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div></html>`;
          downloadPrivateFile(html, "text/html;charset=utf-8", "Directorio-privado-membresia-IPUC.html");
          if (status) status.textContent = `Listado con fotos descargado (${members.length} miembros). Mantén este archivo en un lugar privado.`;
        } finally {
          button.disabled = false;
          if (status && status.textContent.startsWith("Preparando")) status.textContent = "";
          button.textContent = originalLabel;
        }
      }

      function exportMemberDirectoryCsv(button) {
        const members = platform.members || [];
        if (!members.length) throw new Error("Todavía no hay miembros para exportar.");
        const status = view().querySelector("[data-member-export-status]");
        const columns = ["Número de miembro", "Nombre completo", "Estado", "Tiene cargo", "Comités", "Liderazgo por comité", "Cargos", "Tipo de documento", "Número de documento", "Correo", "Teléfono", "Dirección", "Fecha de nacimiento", "Bautizado", "Lleno del Espíritu Santo", "Experiencia y habilidades", "Oficio o profesión", "Áreas de apoyo", "Nivel de estudios", "Situación actual", "Experiencia", "Detalle de experiencia", "Disponibilidad", "Horario adicional", "Capacitación", "Observaciones", "Representante", "Asistencias", "Fecha de registro", "Foto incluida en el directorio HTML"];
        const rows = members.map(member => [member.member_number, member.full_name, member.status, member.has_church_role ? "Sí" : "No", memberDirectoryCommittees(member).join(" | "), memberLeadershipSummary(member).join(" | "), member.church_role, member.document_type, member.document_number, member.email, member.phone, member.address, member.birth_date, member.is_baptized === true ? "Sí" : member.is_baptized === false ? "No" : "", member.filled_with_holy_spirit ? "Sí" : "No", member.skills?.join(" | "), member.occupation, member.support_interests?.join(" | "), member.education_level, member.current_situation?.join(" | "), member.experience_level, member.experience_notes, member.availability?.join(" | "), member.availability_notes, member.training_willingness, member.service_notes, member.guardian_full_name, (platform.memberAttendance || []).filter(item => item.member_id === member.id).length, new Date(member.created_at).toLocaleDateString("es-CO"), member.photo_path ? "Sí" : "No"]);
        downloadPrivateFile(`\ufeff${[columns, ...rows].map(row => row.map(membershipCsvValue).join(",")).join("\r\n")}`, "text/csv;charset=utf-8", "Directorio-privado-membresia-IPUC.csv");
        if (status) status.textContent = `Listado Excel (CSV) descargado (${members.length} miembros). Para fotos, descarga también el directorio HTML.`;
      }

      function renderAccountAdminDirectory() {
        const users = platform.memberAccounts || [], members = platform.members || [];
        return `<details class="member-directory-folder"><summary>Gestión de usuarios <span>${users.length}</span></summary><p>Una cuenta por persona. Revisa la identidad antes de vincular un registro anterior; los permisos de equipo se administran en las herramientas existentes.</p><div class="account-user-list">${users.map(account=>{
          const member=members.find(item=>item.auth_user_id===account.id);
          return `<article class="account-user-row" data-account-id="${escapeHtml(account.id)}"><strong>${escapeHtml(account.display_name || account.email)}</strong><small>${escapeHtml(account.email)} · ${account.email_verified ? "Correo verificado" : "Sin verificar"}</small><small>ID: ${escapeHtml(account.id)} · accesos: ${escapeHtml(account.providers.join(" · "))}</small><small>Último acceso: ${escapeHtml(account.last_sign_in_at ? new Date(account.last_sign_in_at).toLocaleString("es-CO") : "Sin acceso")}</small>${member?`<small>Membresía: ${escapeHtml(member.full_name)} · ${escapeHtml(member.status)} · ${member.has_church_role ? "Servidor" : "Miembro"}</small><small>Comité: ${escapeHtml(member.church_committee || "Sin comité")} · cargo: ${escapeHtml(member.church_role || "Sin cargo")} · carnet: ${member.has_church_role&&member.photo_path ? (member.status==="activo"?"Disponible":"Pendiente de activación") : "Sin generar"}</small>`:`<div class="account-admin-link"><select aria-label="Membresía para vincular con ${escapeHtml(account.email)}"><option value="">Selecciona una membresía sin cuenta</option>${members.filter(m=>!m.auth_user_id).map(m=>`<option value="${escapeHtml(m.id)}">${escapeHtml(m.full_name)} · ${escapeHtml(m.member_number)}</option>`).join("")}</select><button type="button" class="small-action" data-account-admin-link ${account.email_verified?"":"disabled"}>Vincular tras revisión</button></div>`}</article>`;
        }).join("") || '<p>Todavía no hay cuentas registradas.</p>'}</div></details>`;
      }

      function renderMembershipAdminModule() {
        const members = platform.members || [];
        const counts = { pendiente: 0, activo: 0, inactivo: 0 };
        members.forEach(member => { counts[member.status] = (counts[member.status] || 0) + 1; });
        const events = platformEventsForYear(today.getFullYear()).sort((a, b) => parseDate(a.date) - parseDate(b.date));
        return `<section class="admin-module" data-admin-module="membresia" ${platform.adminSection === "membresia" ? "" : "hidden"}>
          <article class="content-card admin-card-wide member-admin-module"><div class="section-title"><p class="eyebrow">Datos privados · acceso administrativo</p><h2>Membresía y asistencia</h2><p>Revisa solicitudes, aprueba miembros y registra asistencia por evento. Las fotos se consultan mediante enlaces temporales privados.</p></div>
          <div class="member-admin-stats"><span><strong>${members.length}</strong>Total</span><span><strong>${counts.pendiente}</strong>Pendientes</span><span><strong>${counts.activo}</strong>Activos</span><span><strong>${counts.inactivo}</strong>Inactivos</span></div>
          <div class="member-export-actions"><div><strong>Directorio administrativo</strong><small>Se actualiza con los registros guardados. La descarga contiene información privada.</small></div><button type="button" class="small-action" data-export-members-csv>Descargar listado para Excel (CSV)</button><button type="button" class="small-action" data-export-members-photos>Descargar directorio con fotos</button><p data-member-export-status role="status" aria-live="polite"></p></div>
          ${renderMemberChangeQueue()}
          ${renderAccountAdminDirectory()}
          <div class="member-directory-tools"><label>Buscar miembro<input type="search" data-member-search placeholder="Nombre, correo, documento o cargo" value="${escapeHtml(platform.memberSearch || "")}"></label><label>Estado<select data-member-filter-status><option value="todos" ${platform.memberStatusFilter === "todos" ? "selected" : ""}>Todos los estados</option><option value="pendiente" ${platform.memberStatusFilter === "pendiente" ? "selected" : ""}>Pendiente</option><option value="activo" ${platform.memberStatusFilter === "activo" ? "selected" : ""}>Activo</option><option value="inactivo" ${platform.memberStatusFilter === "inactivo" ? "selected" : ""}>Inactivo</option></select></label><span data-member-result-count aria-live="polite">${members.length} ${members.length === 1 ? "persona" : "personas"}</span></div>
          <label class="member-event-select">Evento para registrar asistencia<select data-member-event><option value="">Selecciona un evento</option>${events.map(event => `<option value="${escapeHtml(event.id)}">${escapeHtml(formatDateShort(event.date))} · ${escapeHtml(event.title)}</option>`).join("")}</select></label>
          <datalist id="membershipCommitteeOptions">${MEMBERSHIP_COMMITTEES.map(name => `<option value="${escapeHtml(name)}"></option>`).join("")}</datalist><div class="member-directory-tree">${(() => {
            const servers = members.filter(member => member.has_church_role);
            const nonServers = members.filter(member => !member.has_church_role);
          const folderNames = [...MEMBERSHIP_COMMITTEES, ...Array.from(new Set(servers.flatMap(memberDirectoryCommittees).filter(name => name && !MEMBERSHIP_COMMITTEES.includes(name)))).sort((a, b) => a.localeCompare(b, "es"))];
            const renderFolder = name => {
              const rows = servers.filter(member => memberDirectoryCommittees(member).includes(name));
              const isLeaderForCommittee = member => memberDirectoryAssignments(member).some(item => item.committee === name && isCommitteeLeaderRole(item.role));
              const leaders = rows.filter(isLeaderForCommittee);
              const team = rows.filter(member => !isLeaderForCommittee(member));
              const subgroup = (label, items) => `<details class="member-directory-subgroup" data-member-folder ${items.length ? "open" : ""}><summary>${label}<span data-folder-count>${items.length}</span></summary><div class="member-admin-list">${items.map(renderMemberDirectoryRow).join("") || `<p class="member-empty">Sin personas en este grupo.</p>`}</div></details>`;
              return `<details class="member-directory-subfolder" data-member-folder ${rows.length ? "open" : ""}><summary>${escapeHtml(name)}<span data-folder-count>${rows.length}</span></summary><div class="member-directory-subgroups">${subgroup("Líderes", leaders)}${subgroup("Equipo del comité", team)}</div></details>`;
            };
            return `<details class="member-directory-folder" data-member-group="servers" open><summary>Servidores y líderes <span data-folder-count>${servers.length}</span></summary><p class="member-directory-hint">Organizados por comité. Los registros sin comité reconocido aparecen en “Por clasificar”.</p><div class="member-directory-subfolders">${folderNames.map(renderFolder).join("")}</div></details><details class="member-directory-folder" data-member-group="non-servers" open><summary>Miembros sin cargo <span data-folder-count>${nonServers.length}</span></summary><div class="member-admin-list">${nonServers.map(renderMemberDirectoryRow).join("") || `<p class="member-empty">Sin miembros en esta carpeta.</p>`}</div></details>`;
          })()}<p class="member-filter-empty" data-member-filter-empty hidden>No hay personas que coincidan con esta búsqueda.</p></div></article>
        </section>`;
      }

      function isEvangelismoEvent(event) {
        if (!isCultoEvent(event)) return false;
        const values = [event?.title, event?.department, event?.organizer, event?.committee, ...(Array.isArray(event?.tags) ? event.tags : [])];
        return values.some(value => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("evangelismo"));
      }

      function isCaballerosEvent(event) {
        if (!isCultoEvent(event)) return false;
        const values = [event?.title, event?.department, event?.organizer, event?.committee, ...(Array.isArray(event?.tags) ? event.tags : [])];
        return values.some(value => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("caballeros"));
      }

      function autoImage(type, style, seedText) {
        const palette = imagePalette(type, style);
        const seed = Array.from(seedText || type).reduce((sum, char) => sum + char.charCodeAt(0), 0);
        const orb = (seed % 40) + 20;
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${palette[0]}"/><stop offset=".55" stop-color="${palette[1]}"/><stop offset="1" stop-color="${palette[2]}"/></linearGradient><filter id="b"><feGaussianBlur stdDeviation="18"/></filter></defs><rect width="1200" height="760" fill="url(#g)"/><circle cx="${220 + orb}" cy="160" r="150" fill="rgba(255,255,255,.18)" filter="url(#b)"/><circle cx="${920 - orb}" cy="230" r="190" fill="rgba(255,255,255,.12)" filter="url(#b)"/><path d="M0 590 C180 500 300 650 470 560 C670 450 820 620 1200 500 L1200 760 L0 760Z" fill="rgba(255,255,255,.22)"/><path d="M90 455 C270 360 430 380 580 468 C760 575 910 430 1110 390" fill="none" stroke="rgba(255,255,255,.34)" stroke-width="10" stroke-linecap="round"/><text x="70" y="665" fill="rgba(255,255,255,.78)" font-family="Myriad Pro, Calibri, Arial" font-size="42" font-weight="800">IPUC Villa del Río</text></svg>`;
        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
      }

      function imagePalette(type, style) {
        if (style === "noche" || type === "vigilia") return ["#001F57", "#00338D", "#009FDA"];
        if (style === "amanecer" || type === "reflexion") return ["#F0AB00", "#F7D36B", "#009FDA"];
        if (style === "naturaleza" || style === "montanas") return ["#BCEAF7", "#6CC7D9", "#00338D"];
        if (type === "ayuno") return ["#F4FAFC", "#BCEAF7", "#009FDA"];
        if (type === "oracion") return ["#BCEAF7", "#009FDA", "#00338D"];
        if (type === "especial") return ["#FFF4D6", "#F0AB00", "#00338D"];
        return ["#BCEAF7", "#009FDA", "#00338D"];
      }

      function invitationAssets(event) {
        const assets = INVITATION_FIELDS.map(([key, label]) => event.invitations?.[key] ? { ...event.invitations[key], label } : null).filter(Boolean);
        if (isRegularSundayWorship(event) && !event.invitations?.main) assets.unshift(DEFAULT_SUNDAY_INVITATION);
        return assets;
      }

      function assetGrid(assets) {
        if (!assets.length) return emptyText("Aun no hay material subido.");
        return `<div class="asset-grid-page">${assets.map((asset, index) => `<article class="asset-public"><button type="button" data-asset="${index}" data-assets="${encodeAssetList(assets)}">${assetThumb(asset)}</button><strong>${escapeHtml(asset.label || asset.name)}</strong><small>${escapeHtml(asset.name)}</small><button class="small-action" type="button" data-download="${index}" data-assets="${encodeAssetList(assets)}">Descargar</button></article>`).join("")}</div>`;
      }

      function fileList(files) {
        if (!files.length) return emptyText("No hay archivos adjuntos.");
        return `<div class="file-public-list">${files.map((file, index) => `<article><span><strong>${escapeHtml(file.name)}</strong><small>${escapeHtml(assetTypeLabel(file))} - ${escapeHtml(humanFileSize(file.size))}</small></span><button class="small-action" type="button" data-download="${index}" data-assets="${encodeAssetList(files)}">Descargar</button></article>`).join("")}</div>`;
      }

      function bindAssetButtons() {
        view().querySelectorAll("[data-asset]").forEach(button => {
          button.onclick = () => {
            const assets = decodeAssetList(button.dataset.assets);
            platformOpenMedia(assets[Number(button.dataset.asset)]);
          };
        });
        view().querySelectorAll("[data-download]").forEach(button => {
          button.onclick = () => {
            const assets = decodeAssetList(button.dataset.assets);
            downloadAsset(assets[Number(button.dataset.download)]);
          };
        });
      }

      function assetThumb(asset) {
        if (isImage(asset)) return `<img src="${assetSource(asset, "display")}" alt="">`;
        if (isVideo(asset)) return `<video src="${assetSource(asset)}" muted playsinline></video>`;
        return `<span>${escapeHtml(assetTypeLabel(asset))}</span>`;
      }

      function encodeAssetList(assets) {
        return encodeURIComponent(JSON.stringify(assets));
      }

      function decodeAssetList(value) {
        try { return JSON.parse(decodeURIComponent(value)); } catch { return []; }
      }

      function platformOpenMedia(asset) {
        const layer = document.getElementById("platformMedia");
        layer.setAttribute("aria-hidden", "false");
        layer.classList.add("open");
        const body = isImage(asset) ? `<img src="${assetSource(asset, "display")}" alt="">` : isVideo(asset) ? `<video src="${assetSource(asset)}" controls autoplay></video>` : isPdf(asset) ? `<iframe src="${assetSource(asset)}"></iframe>` : `<div class="empty">Este archivo se puede descargar.</div>`;
        layer.innerHTML = `<article><header><h2>${escapeHtml(asset.label || asset.name)}</h2><button type="button" data-close-media>&times;</button></header>${body}<button class="primary-link" type="button" data-download-media>Descargar</button></article>`;
        layer.querySelector("[data-close-media]").onclick = () => {
          layer.classList.remove("open");
          layer.setAttribute("aria-hidden", "true");
          layer.innerHTML = "";
        };
        layer.querySelector("[data-download-media]").onclick = () => downloadAsset(asset);
      }

      function setupSiteLoader() {
        const loader = document.querySelector("[data-site-loader]");
        if (!loader) return;
        if (parseRoute().name === "podcast") { loader.remove(); return; }
        const close = () => {
          if (loader.classList.contains("is-hidden")) return;
          loader.classList.add("is-hidden");
          window.setTimeout(() => loader.remove(), 720);
        };
        const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        const wait = duration => new Promise(resolve => window.setTimeout(resolve, duration));
        const fontsReady = document.fonts?.ready || Promise.resolve();
        const essentialReady = Promise.all([fontsReady.catch?.(() => {}) || fontsReady, wait(reducedMotion ? 90 : 1700)]);
        Promise.race([essentialReady, wait(reducedMotion ? 180 : 2850)]).then(close);
      }

      async function loadDriveMusic() {
        if (APP_STATE.musicPlaylistLoaded || APP_STATE.musicPlaylistLoading) return;
        APP_STATE.musicPlaylistLoading = true;
        setupChurchMusic();
        try {
          const form = new FormData();
          form.append("action", "list-music");
          const response = await fetch(`${SUPABASE_CONFIG.url}/functions/v1/${SUPABASE_CONFIG.driveFunction}`, {
            method: "POST",
            headers: { apikey: SUPABASE_CONFIG.publishableKey },
            body: form
          });
          const data = await response.json().catch(() => ({}));
          if (!response.ok || data?.error) throw new Error(data?.error || "No se pudo cargar la música de Drive.");
          APP_STATE.musicPlaylist = Array.isArray(data.files) ? data.files : [];
          APP_STATE.musicPlaylistLoaded = true;
          APP_STATE.musicPlaylistError = "";
          APP_STATE.musicIndex = 0;
        } catch (error) {
          APP_STATE.musicPlaylist = DIRECT_DRIVE_MUSIC;
          APP_STATE.musicPlaylistLoaded = true;
          APP_STATE.musicPlaylistError = error.message || "No se pudo cargar la música de Drive.";
        } finally {
          APP_STATE.musicPlaylistLoading = false;
          setupChurchMusic();
          if (parseRoute().name === "inicio" && getChurchMusicPlaylist().length) startChurchMusic();
        }
      }

      function getChurchMusicPlaylist() {
        if (APP_STATE.musicPlaylist?.length) return APP_STATE.musicPlaylist;
        return APP_STATE.music?.dataUrl ? [{ id: "saved-music", name: APP_STATE.music.name || "Música de la iglesia", audioUrl: APP_STATE.music.dataUrl }] : [];
      }

      function setupChurchMusic() {
        const audio = document.getElementById("churchMusicAudio");
        const toggle = document.getElementById("musicToggle");
        const widget = document.querySelector(".music-widget");
        if (!audio || !toggle || !widget) return;
        const playlist = getChurchMusicPlaylist();
        const hasMusic = playlist.length > 0;
        const item = playlist[APP_STATE.musicIndex] || playlist[0];
        if (hasMusic) {
          APP_STATE.musicIndex = Math.max(0, playlist.indexOf(item));
          // Drive redirige la URL /uc a otra dirección. Para <audio> resulta
          // más estable usar directamente el endpoint que soporta rangos y
          // devuelve audio/mpeg sin la página intermedia de Drive.
          const source = item.audioUrl || (item.id
            ? `https://drive.usercontent.google.com/download?id=${encodeURIComponent(String(item.id))}&export=media`
            : (item.url || ""));
          if (source && audio.dataset.trackId !== String(item.id || source)) {
            audio.dataset.trackId = String(item.id || source);
            audio.dataset.sourceIndex = "0";
            audio.src = source;
            audio.load();
          }
          document.getElementById("musicTrackTitle").textContent = item.name || "Canción de la iglesia";
          document.getElementById("musicTrackCounter").textContent = `${APP_STATE.musicIndex + 1} de ${playlist.length}`;
          document.getElementById("musicStatus").textContent = `${playlist.length} ${playlist.length === 1 ? "canción" : "canciones"}`;
        } else {
          audio.removeAttribute("src");
          audio.removeAttribute("data-track-id");
          document.getElementById("musicTrackTitle").textContent = APP_STATE.musicPlaylistLoading ? "Cargando canciones…" : "Añade canciones en Drive";
          document.getElementById("musicTrackCounter").textContent = "—";
          document.getElementById("musicStatus").textContent = APP_STATE.musicPlaylistError ? "No disponible" : "Lista de reproducción";
        }
        toggle.disabled = !hasMusic;
        widget.classList.toggle("is-playing", hasMusic && !audio.paused);
        const statusDot = document.getElementById("musicStatusDot");
        if (statusDot) statusDot.style.background = hasMusic && !audio.paused ? "#009FDA" : "#9aa8b2";
        toggle.textContent = hasMusic && !audio.paused ? "Ⅱ" : "▶";
        toggle.setAttribute("aria-label", hasMusic && !audio.paused ? "Pausar música" : "Reproducir música");
        if (!toggle.dataset.musicBound) {
          toggle.addEventListener("click", () => audio.paused ? startChurchMusic() : stopChurchMusic());
          toggle.dataset.musicBound = "1";
        }
        audio.onplay = () => setupChurchMusic();
        audio.onpause = () => setupChurchMusic();
        audio.onerror = () => {
          const currentItem = getChurchMusicPlaylist()[APP_STATE.musicIndex];
          const currentId = currentItem?.id ? String(currentItem.id) : "";
          const candidates = [
            currentItem?.audioUrl,
            currentId ? `https://drive.usercontent.google.com/download?id=${encodeURIComponent(currentId)}&export=media` : "",
            currentId ? `https://drive.google.com/uc?export=media&id=${encodeURIComponent(currentId)}` : "",
          ].filter((value, index, values) => value && values.indexOf(value) === index);
          const nextIndex = Number(audio.dataset.sourceIndex || "0") + 1;
          if (candidates[nextIndex]) {
            audio.dataset.sourceIndex = String(nextIndex);
            audio.src = candidates[nextIndex];
            audio.load();
            return;
          }
          const status = document.getElementById("musicStatus");
          if (status) status.textContent = "No se pudo reproducir esta canción";
        };
        audio.onended = () => changeChurchMusic(1, true);
      }

      function changeChurchMusic(step, autoplay = false) {
        const playlist = getChurchMusicPlaylist();
        const audio = document.getElementById("churchMusicAudio");
        if (!playlist.length || !audio) return;
        const wasPlaying = autoplay || !audio.paused;
        APP_STATE.musicIndex = (APP_STATE.musicIndex + step + playlist.length) % playlist.length;
        setupChurchMusic();
        if (wasPlaying) startChurchMusic();
      }

      function startChurchMusic() {
        const audio = document.getElementById("churchMusicAudio");
        if (!audio || !getChurchMusicPlaylist().length) return;
        audio.play().then(setupChurchMusic).catch((error) => {
          const status = document.getElementById("musicStatus");
          if (status) status.textContent = error?.name === "NotAllowedError"
            ? "Pulsa ▶ para escuchar"
            : "No se pudo reproducir esta canción";
        });
      }

      function stopChurchMusic() {
        const audio = document.getElementById("churchMusicAudio");
        if (!audio) return;
        audio.pause();
        setupChurchMusic();
      }

      function stopReflectionMedia() {
        view().querySelectorAll(".reflection-media video, .reflection-media audio").forEach(media => {
          media.pause();
          media.muted = true;
        });
        view().querySelectorAll(".youtube-reflection iframe").forEach(frame => {
          frame.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "pauseVideo", args: [] }), "*");
          frame.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "mute", args: [] }), "*");
        });
      }

      function setupLiveVisitors() {
        if (!cloud.app || liveVisitorsChannel) return;
        const visitorKey = crypto.randomUUID ? crypto.randomUUID() : `visitor-${Date.now()}-${Math.random().toString(16).slice(2)}`;
        liveVisitorsChannel = cloud.app.channel("ipuc-villa-del-rio-online", { config: { presence: { key: visitorKey } } });
        liveVisitorsChannel.on("presence", { event: "sync" }, updateLiveVisitors).on("presence", { event: "join" }, updateLiveVisitors).on("presence", { event: "leave" }, updateLiveVisitors).subscribe(async status => {
          if (status === "SUBSCRIBED") {
            await liveVisitorsChannel.track({ page: location.pathname, online_at: new Date().toISOString() });
            updateLiveVisitors();
          }
        });
      }

      function trackLiveVisitorPage() {
        if (liveVisitorsChannel) liveVisitorsChannel.track({ page: location.pathname, online_at: new Date().toISOString() }).catch(() => {});
      }

      function updateLiveVisitors() {
        const count = liveVisitorsChannel ? Object.keys(liveVisitorsChannel.presenceState() || {}).length : 1;
        document.querySelectorAll("[data-online-count]").forEach(node => { node.textContent = String(Math.max(1, count)); });
      }

      function refreshAdminNav() {
        const link = document.querySelector("[data-login-link]");
        if (!link) return;
        link.hidden = true;
        link.setAttribute("aria-hidden", "true");
        if (isAdmin()) {
          link.textContent = "Administracion";
          link.href = "/admin";
          link.hidden = false;
          link.removeAttribute("aria-hidden");
          return;
        }
      }

      function isAdmin() {
        return Boolean(cloud.enabled && cloud.ready && adminEmailAllowed());
      }

      function normalizeCommitteeKey(value) {
        const normalized = slugify(value || "");
        return COMMITTEES.find(([key, label, image, aliases]) => key === normalized || slugify(label) === normalized || aliases.some(alias => slugify(alias) === normalized))?.[0] || normalized;
      }

      function committeeDisplay(value) {
        const key = normalizeCommitteeKey(value);
        return COMMITTEES.find(([committeeKey]) => committeeKey === key)?.[1] || value || "Comité";
      }

      function leaderProfile() {
        const email = String(cloud.user?.email || "").trim().toLowerCase();
        if (!email) return null;
        const metadata = cloud.user?.app_metadata || {};
        if (metadata.role === "leader" && metadata.committee) return { email, committee: normalizeCommitteeKey(metadata.committee), source: "metadata" };
        const saved = (APP_STATE.committeeLeaders || []).find(item => item.active !== false && String(item.email || "").trim().toLowerCase() === email);
        return saved ? { ...saved, email, committee: normalizeCommitteeKey(saved.committee), source: "directory" } : null;
      }

      function isLeader() {
        const profile = leaderProfile();
        const validCommittee = COMMITTEES.some(([key]) => key !== "ipuc" && key === profile?.committee);
        return Boolean(cloud.enabled && cloud.ready && !isAdmin() && validCommittee);
      }

      async function uploadDriveFile(file, eventId, section, label) {
        const event = eventId && eventId !== "site" ? APP_STATE.events[eventId] : null;
        const folderKey = section === "cronograma-semanal" ? "weekly" : (["reflexiones", "musica", "podcasts", "podcast-cover"].includes(section) ? "multimedia" : "event");
        const form = new FormData();
        form.append("action", "upload");
        form.append("file", file, file.name);
        form.append("folderKey", folderKey);
        form.append("fileName", file.name);
        if (folderKey === "event" && event) form.append("eventFolder", `${event.date || "evento"} - ${event.title || eventId}`);
        setUploadProgressState({ active: true, label: `Subiendo ${file.name}`, detail: `${label} · Google Drive · ${humanFileSize(file.size)}`, percent: 0, tone: "loading" });
        try {
          if (file.size > 4 * 1024 * 1024 && (isVideo(file) || isAudio(file))) {
            const startForm = new FormData();
            startForm.append("action", "start-resumable");
            startForm.append("fileName", file.name);
            startForm.append("mimeType", file.type || "application/octet-stream");
            startForm.append("size", String(file.size));
            startForm.append("folderKey", folderKey);
            if (folderKey === "event" && event) startForm.append("eventFolder", `${event.date || "evento"} - ${event.title || eventId}`);
            const started = await invokeDriveUpload(startForm, "Drive no inició la carga del video.");
            if (!started?.sessionUrl) throw new Error("Drive no devolvió una sesión válida para cargar el video.");
            const chunkSize = 4 * 1024 * 1024;
            let uploadedBytes = 0;
            while (uploadedBytes < file.size) {
              const end = Math.min(uploadedBytes + chunkSize, file.size);
              const chunkForm = new FormData();
              chunkForm.append("action", "upload-chunk");
              chunkForm.append("sessionUrl", started.sessionUrl);
              chunkForm.append("start", String(uploadedBytes));
              chunkForm.append("total", String(file.size));
              chunkForm.append("chunk", file.slice(uploadedBytes, end, file.type || "application/octet-stream"), file.name);
              let result;
              try {
                result = await invokeDriveUpload(chunkForm, "Drive rechazó un bloque del video.");
              } catch (transferError) {
                const statusForm = new FormData();
                statusForm.append("action", "upload-status");
                statusForm.append("sessionUrl", started.sessionUrl);
                statusForm.append("total", String(file.size));
                try {
                  const status = await invokeDriveUpload(statusForm, "No se pudo verificar el avance de Drive.");
                  if (status.complete && status.asset) {
                    return { ...status.asset, label, name: status.asset.name || file.name, type: status.asset.type || file.type, size: status.asset.size || file.size };
                  }
                  const received = Number(status.received);
                  if (!Number.isSafeInteger(received) || received < uploadedBytes || received > end) throw transferError;
                  if (received === uploadedBytes) result = await invokeDriveUpload(chunkForm, "Drive rechazó el bloque del video.");
                  else result = status;
                } catch (recoveryError) {
                  throw recoveryError instanceof Error && recoveryError !== transferError ? recoveryError : transferError;
                }
              }
              if (result?.complete) return { ...result.asset, label, name: result.asset?.name || file.name, type: result.asset?.type || file.type, size: result.asset?.size || file.size };
              const acknowledgedBytes = Number(result?.received);
              if (!Number.isSafeInteger(acknowledgedBytes) || acknowledgedBytes <= uploadedBytes || acknowledgedBytes > end) throw new Error("Drive no confirmó completamente el bloque enviado. La carga se detuvo para evitar un video incompleto.");
              uploadedBytes = acknowledgedBytes;
              setUploadProgressState({ active: true, label: `Subiendo ${file.name}`, detail: `${label} · Google Drive · ${humanFileSize(uploadedBytes)} de ${humanFileSize(file.size)}`, percent: (uploadedBytes / file.size) * 100, tone: "loading" });
            }
            throw new Error("Drive recibió el video pero no confirmó el archivo terminado. Inténtalo nuevamente.");
          }
          const data = await invokeDriveUpload(form, "No se pudo subir el archivo a Google Drive.");
          setUploadProgressState({ label: "Archivo cargado", detail: `${label} · guardando el enlace`, percent: 100, tone: "loading" });
          return { ...data, label, name: data.name || file.name, type: data.type || file.type || "application/octet-stream", size: data.size || file.size };
        } catch (error) {
          cloud.storageError = error.message || "No se pudo completar la carga en Google Drive.";
          setUploadProgressState({ label: "No se pudo completar la carga", detail: cloud.storageError, percent: 0, tone: "error" });
          window.clearTimeout(uploadProgressTimer);
          uploadProgressTimer = window.setTimeout(() => setUploadProgressState({ active: false }), 6000);
          throw error;
        }
      }

      function leaderCanManageEvent(event) {
        const profile = leaderProfile();
        if (!profile || !event) return false;
        if (["ayuno", "vigilia"].includes(event.type)) return true;
        return selectedCommittee(event) === profile.committee;
      }

      function leaderEvents() {
        return platformEventsForYear(today.getFullYear()).filter(event => parseDate(event.date) >= today && platformStatus(event) !== "Cancelado" && leaderCanManageEvent(event)).sort(sortByDate);
      }

      function isDecomMember() {
        return Boolean(cloud.enabled && cloud.ready && decomEmailAllowed());
      }

      function featuredEvents() {
        return platformEventsForYear(today.getFullYear()).filter(event => event.featured && platformStatus(event) !== "Realizado").slice(0, 4);
      }

      function announcementCards() {
        const items = (APP_STATE.announcements || []).slice().reverse().slice(0, 4);
        if (!items.length) return emptyText("No hay anuncios publicados.");
        return items.map(item => `<article class="announcement-public"><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.description)}</p><small>${escapeHtml(formatDateShort(item.date))}</small></article>`).join("");
      }

      function reflectionForDate(date) {
        const index = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000) % REFLECTIONS.length;
        return APP_STATE.reflections[dateKey(date)] || REFLECTIONS[index];
      }

      async function invokeDriveUpload(body, fallback) {
        const { data, error } = await cloud.app.functions.invoke(SUPABASE_CONFIG.driveFunction, { body });
        if (!error && !data?.error) return data;
        let serverMessage = "";
        try {
          const context = error?.context;
          if (context && typeof context.clone === "function") {
            const payload = await context.clone().json();
            serverMessage = payload?.error || payload?.message || "";
          }
        } catch { /* conserva el mensaje original del SDK */ }
        throw new Error(data?.error || serverMessage || error?.message || fallback);
      }

      function youtubeEmbedUrl(url, options = {}) {
        const match = String(url || "").match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{11})/);
        if (!match) return "";
        const autoplay = options.autoplay === false ? 0 : 1;
        const mute = options.mute === false ? 0 : 1;
        const start = Math.max(0, Math.floor(Number(options.start) || 0));
        return `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=${autoplay}&mute=${mute}&playsinline=1&enablejsapi=1&rel=0${start ? `&start=${start}` : ""}`;
      }

      function reflectionMediaMarkup(reflection, autoplay = false, options = {}) {
        const media = reflection?.media;
        if (!media) return "";
        if (media.type === "youtube") {
          const source = youtubeEmbedUrl(media.url, { autoplay, mute: autoplay, start: options.start });
          return source ? `<div class="reflection-media youtube-reflection"><iframe src="${source}" data-reflection-url="${escapeHtml(media.url)}" title="Reflexión IPUC" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>` : "";
        }
        if (isVideo(media)) return `<div class="reflection-media"><video ${autoplay ? "autoplay muted" : "controls"} controls playsinline preload="metadata" data-reflection-url="${escapeHtml(media.url || assetSource(media))}" src="${escapeHtml(assetSource(media))}"></video></div>`;
        if (isAudio(media)) return `<div class="reflection-media audio-reflection"><audio ${autoplay ? "autoplay" : "controls"} controls preload="metadata" data-reflection-url="${escapeHtml(media.url || assetSource(media))}" src="${escapeHtml(assetSource(media))}"></audio></div>`;
        return "";
      }

      function eventInfoList(event) {
        return `<dl class="info-list"><div><dt>Fecha</dt><dd>${escapeHtml(formatDateShort(event.date))}</dd></div><div><dt>Hora</dt><dd>${escapeHtml(event.time)}</dd></div><div><dt>Lugar</dt><dd>${escapeHtml(event.place)}</dd></div><div><dt>Departamento</dt><dd>${escapeHtml(event.department || event.organizer)}</dd></div></dl>`;
      }

      function shortDescription(event) {
        return eventDescription(event);
      }

      function eventPageUrl(event) {
        return `${location.origin}/evento/${encodeURIComponent(event.id)}`;
      }

      function whatsappMessage(event) {
        const typeMessages = {
          culto: "Te invitamos a compartir un tiempo especial de adoración, Palabra y comunión.",
          oracion: "Te invitamos a unirnos en oración y enseñanza, creyendo juntos por la obra de Dios.",
          ayuno: "Te invitamos a apartar este tiempo de ayuno y búsqueda de Dios junto a la iglesia.",
          vigilia: "Te invitamos a una noche de vigilia, oración y renovación espiritual.",
          especial: "Te invitamos a participar de este encuentro especial de nuestra iglesia."
        };
        const invitation = typeMessages[event.type] || "Te invitamos a participar de esta actividad de nuestra iglesia.";
        return `Dios les bendiga, familia IPUC Villa del Río. 🙏\n\n${invitation}\n\n✨ ${event.title}\n📅 ${formatDateShort(event.date)}\n🕒 ${event.time}\n📍 ${event.place}\n\n${eventDescription(event)}\n\n🔗 Más información e invitación:\n${eventPageUrl(event)}`;
      }

      function whatsappShare(event) {
        return `https://wa.me/?text=${encodeURIComponent(whatsappMessage(event))}`;
      }

      function whatsappImageAsset(event) {
        return event.invitations?.whatsapp || event.invitations?.main || event.image || (isRegularSundayWorship(event) ? DEFAULT_SUNDAY_INVITATION : null);
      }

      async function shareEventOnWhatsApp(event) {
        const message = whatsappMessage(event);
        const asset = whatsappImageAsset(event);
        if (navigator.share && asset && isImage(asset)) {
          try {
            const source = assetSource(asset, "display");
            const response = await fetch(source, { mode: "cors" });
            if (!response.ok) throw new Error("No se pudo preparar la imagen.");
            const blob = await response.blob();
            const extension = blob.type === "image/png" ? "png" : blob.type === "image/webp" ? "webp" : "jpg";
            const file = new File([blob], `invitacion-${slugify(event.title)}.${extension}`, { type: blob.type || "image/jpeg" });
            if (!navigator.canShare || navigator.canShare({ files: [file] })) {
              await navigator.share({ title: event.title, text: message, files: [file] });
              return;
            }
          } catch (error) {
            if (error?.name === "AbortError") return;
          }
        }
        const whatsappUrl = whatsappShare(event);
        const opened = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        if (!opened) window.location.assign(whatsappUrl);
        showToast(asset ? "WhatsApp se abrió con el mensaje. Si tu dispositivo no adjuntó la imagen, puedes abrirla desde el enlace del evento." : "WhatsApp se abrió con el mensaje y el enlace del evento.", "info");
      }

      function sortByDate(a, b) {
        return a.date.localeCompare(b.date) || a.time.localeCompare(b.time) || a.title.localeCompare(b.title);
      }

      function startOfWeek(date) {
        const clone = cleanDate(date);
        clone.setDate(clone.getDate() - ((clone.getDay() + 6) % 7));
        return clone;
      }

      function calendarTitle() {
        if (platform.calendarView === "anio") return `Año ${platform.calendarDate.getFullYear()}`;
        if (platform.calendarView === "semana") return `Semana de ${formatDateShort(dateKey(startOfWeek(platform.calendarDate)))}`;
        if (platform.calendarView === "dia") return longPlatformDate(platform.calendarDate);
        return `${capitalize(months[platform.calendarDate.getMonth()])} ${platform.calendarDate.getFullYear()}`;
      }

      function viewLabel(value) {
        return { anio: "Año completo", mes: "Mes", semana: "Semana", dia: "Día" }[value];
      }

      function longPlatformDate(date) {
        return `${capitalize(weekdays[date.getDay()])} ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
      }

      function capitalize(value) {
        return String(value).charAt(0).toUpperCase() + String(value).slice(1);
      }

      function emptyText(text) {
        return `<div class="empty-state">${escapeHtml(text)}</div>`;
      }

      let routeRenderQueued = false;
      function scheduleRouteRender() {
        if (["membresia", "cuenta", "login"].includes(parseRoute().name)) return;
        if (routeRenderQueued) return;
        routeRenderQueued = true;
        const flush = () => {
          routeRenderQueued = false;
          renderRoute();
        };
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          window.setTimeout(flush, 0);
        } else if (typeof window.requestAnimationFrame === "function") {
          window.requestAnimationFrame(flush);
        } else {
          window.setTimeout(flush, 16);
        }
      }
    }

    function installPlatformStyles() {
      if (!document.querySelector('link[data-platform-runtime]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/css/platform-runtime.css?v=20260909-stability-1";
        link.dataset.platformRuntime = "true";
        // Cargar la capa estructural antes del tema público para que el
        // diseño oscuro global sea la última capa visual aplicable.
        const modernStyles = document.querySelector('link[href*="/css/modern.css"]');
        if (modernStyles) document.head.insertBefore(link, modernStyles);
        else document.head.appendChild(link);
      }
      return;
      if (false) {
      /* Legacy inline styles kept below only as historical reference. */
      const style = document.createElement("style");
      style.id = "platformStyles";
      style.textContent = `
        .platform-body { position: relative; background: #123348; }
        .platform-shell { position: relative; isolation: isolate; }
        .site-video-backdrop { position: fixed; inset: 0; z-index: 0; overflow: hidden; background: #123348; pointer-events: none; }
        .site-video-backdrop video { width: 100%; height: 100%; object-fit: cover; opacity: .68; filter: saturate(.9) contrast(1.04); }
        .site-video-backdrop span { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(7,28,43,.38), rgba(14,71,77,.16) 48%, rgba(6,26,42,.38)); pointer-events: none; }
        .platform-top, .route-view, .platform-footer { position: relative; z-index: 1; }
        @media (max-width: 620px) { .site-video-backdrop video { opacity: .22; } }
        @media (prefers-reduced-motion: reduce) { .site-video-backdrop video { display: none; } }
        @keyframes platformAtmosphere { from { background-position: 0% 0%; } to { background-position: 100% 70%; } }
        @keyframes platformAtmosphere { from { background-position: 0% 0%; } to { background-position: 100% 70%; } }
        .platform-shell { width: min(1180px, calc(100% - 28px)); margin: 0 auto; padding: 18px 0 34px; }
        .platform-top { position: sticky; top: 10px; z-index: 10; display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 12px; border-radius: 24px; box-sizing: border-box; transition: width .24s ease, padding .24s ease, border-radius .24s ease, transform .24s ease, margin-bottom .24s ease; }
        .platform-top.is-compact { position: sticky; top: 12px; width: 48px; height: 48px; margin-bottom: 68px; margin-left: auto; padding: 3px; justify-content: center; border-radius: 14px; background: rgba(248,252,250,.96); box-shadow: 0 14px 30px rgba(13,52,66,.25); }
        .platform-top.is-compact .platform-brand { display: none; }
        .platform-top.is-compact .nav-toggle { display: inline-flex; width: 42px; height: 42px; padding: 0; border-radius: 11px; font-size: 0; }
        .platform-top.is-compact .nav-toggle::before { content: "☰"; font-size: 1.3rem; line-height: 1; }
        .platform-top.is-compact .platform-nav { position: absolute; top: calc(100% + 8px); right: 0; display: none; flex-direction: column; align-items: stretch; width: min(230px, calc(100vw - 28px)); padding: 10px; border: 1px solid rgba(255,255,255,.78); border-radius: 18px; background: rgba(245,250,248,.97); box-shadow: 0 20px 50px rgba(31,55,72,.22); }
        .platform-top.is-compact .platform-nav.open { display: flex; }
        .platform-brand { display: flex; align-items: center; flex: 0 1 260px; min-width: 0; color: var(--ink); text-decoration: none; }
        .platform-brand img { width: 250px; height: 68px; object-fit: contain; border: 0; border-radius: 0; background: transparent; padding: 0; box-shadow: none; }
        .platform-brand span { display: grid; gap: 3px; min-width: 0; }
        .platform-brand strong { font-size: 1rem; line-height: 1.1; }
        .platform-brand small { color: var(--muted); font-weight: 800; }
        .platform-nav { display: flex; align-items: center; justify-content: flex-end; gap: 6px; flex: 1 1 auto; min-width: 0; flex-wrap: nowrap; }
        .platform-nav a, .nav-toggle, .primary-link, .small-action, .view-switch button, .month-strip button { display: inline-flex; align-items: center; justify-content: center; min-height: 40px; padding: 0 10px; border: 1px solid rgba(255,255,255,.75); border-radius: 14px; background: rgba(255,255,255,.55); color: var(--ink); font: inherit; font-size: .84rem; font-weight: 900; text-decoration: none; cursor: pointer; }
        .platform-nav a { white-space: nowrap; }
        .platform-nav a[href="/podcast"] { min-width: 145px; }
        .danger-action { border-color: rgba(180,35,53,.2) !important; background: rgba(232,75,95,.12) !important; color: #8f2130 !important; }
        .primary-link, .view-switch button.active, .month-strip button.active { background: linear-gradient(145deg, #123348, #1c8b78); color: white; box-shadow: 0 14px 34px rgba(20,52,71,.18); }
        .nav-toggle { display: none; }
        .route-view { display: grid; gap: 16px; margin-top: 16px; }
        .home-hero, .page-head, .content-card, .calendar-page, .view-switch, .month-strip, .filters, .login-card { border-radius: 26px; padding: 18px; }
        .home-hero, .detail-hero { display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(300px, .92fr); gap: 18px; align-items: center; }
        .home-hero { grid-template-columns: minmax(0, 1.12fr) minmax(280px, .88fr); min-height: 430px; }
        .home-hero:not(.has-today-invitation) { grid-template-columns: 1fr; }
        .home-hero:not(.has-today-invitation) .hero-copy { width: 100%; }
        .home-hero.has-reflection-focus .hero-copy { max-width: 1120px; margin: 0 auto; }
        .home-hero, .home-welcome, .type-shortcuts, .split-grid > article { opacity: 0; transform: translateY(18px); animation: homeReveal .65s cubic-bezier(.2,.75,.25,1) var(--reveal-delay, 0ms) forwards; }
        .home-hero.is-visible, .home-welcome.is-visible, .type-shortcuts.is-visible, .split-grid > article.is-visible { opacity: 1; transform: translateY(0); }
        @keyframes homeReveal { to { opacity: 1; transform: translateY(0); } }
        .home-kicker { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 26px; color: #4f6b78; font-size: .78rem; font-weight: 900; text-transform: uppercase; letter-spacing: .06em; }
        .home-live-dot { width: 9px; height: 9px; border-radius: 50%; background: #1c8b78; box-shadow: 0 0 0 5px rgba(28,139,120,.12); animation: livePulse 1.8s ease-in-out infinite; }
        .live-visitors { display: inline-flex; align-items: center; gap: 7px; width: fit-content; margin-top: 16px; padding: 7px 10px; border: 1px solid rgba(28,139,120,.18); border-radius: 999px; background: rgba(235,249,245,.58); color: #185f53; font-size: .73rem; font-weight: 850; text-transform: none; }
        .live-visitors-dot { width: 8px; height: 8px; border-radius: 50%; background: #1c8b78; box-shadow: 0 0 0 4px rgba(28,139,120,.12); }
        @keyframes livePulse { 0%, 100% { box-shadow: 0 0 0 4px rgba(28,139,120,.11); } 50% { box-shadow: 0 0 0 9px rgba(28,139,120,0); } }
        .home-lead { max-width: 600px; font-size: 1.03rem; }
        .home-actions { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-top: 18px; }
        .reflection-media { width: min(100%, 1040px); margin: 20px auto 0; overflow: hidden; border: 1px solid rgba(255,255,255,.72); border-radius: 18px; background: rgba(7,28,43,.28); box-shadow: 0 14px 30px rgba(13,52,66,.16); }
        .reflection-media iframe, .reflection-media video { display: block; width: 100%; aspect-ratio: 16 / 9; border: 0; object-fit: cover; }
        .reflection-media audio { display: block; width: 100%; min-height: 48px; }
        .music-home-action { min-height: 44px; padding: 0 15px; border: 1px solid rgba(11,59,76,.12); border-radius: 13px; background: rgba(255,255,255,.7); color: #123348; font: inherit; font-weight: 900; cursor: pointer; transition: transform .18s ease, background .18s ease; }
        .music-home-action:hover { transform: translateY(-2px); background: white; }
        .hero-copy h1, .page-head h1, .detail-hero h1, .login-card h1 { margin: 0; font-size: clamp(2rem, 4vw, 4.2rem); line-height: .96; }
        .hero-copy .home-hero-title { display: block; width: 100%; max-width: none; color: transparent; font-family: "Trebuchet MS", "Segoe UI", Arial, sans-serif; font-size: clamp(2.6rem, 5.6vw, 6.7rem); font-style: normal; font-weight: 950; letter-spacing: -.075em; line-height: .95; white-space: nowrap; text-wrap: nowrap; perspective: 900px; text-shadow: 0 2px 0 rgba(255,255,255,.34), 0 11px 22px rgba(11,52,72,.16); }
        .hero-letter { position: relative; display: inline-block; color: rgba(236,252,255,.56); background: linear-gradient(165deg, rgba(255,255,255,.98) 0%, rgba(189,245,255,.75) 22%, rgba(55,174,214,.56) 53%, rgba(255,255,255,.84) 78%, rgba(124,227,245,.58) 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-stroke: 1px rgba(255,255,255,.64); filter: drop-shadow(0 4px 0 rgba(7,66,91,.12)) drop-shadow(0 14px 16px rgba(7,66,91,.13)); transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) scale(1); transform-origin: 50% 72%; transition: transform .34s cubic-bezier(.2,.85,.22,1), filter .34s ease, color .34s ease; will-change: transform; }
        .hero-letter::after { position: absolute; inset: 12% 16% 50%; border-radius: 999px; background: linear-gradient(110deg, rgba(255,255,255,.52), rgba(255,255,255,0)); content: ""; opacity: .42; pointer-events: none; transform: skewX(-18deg); }
        .hero-letter:hover, .hero-letter:focus-visible { color: rgba(255,255,255,.74); filter: drop-shadow(0 7px 0 rgba(7,66,91,.13)) drop-shadow(0 20px 22px rgba(0,128,171,.25)); transform: translate3d(0, -13px, 25px) rotateX(-8deg) rotateY(var(--letter-tilt, -4deg)) scale(1.08); }
        .hero-space { width: .24em; -webkit-text-stroke: 0; filter: none; }
        .hero-copy p, .page-head p, .detail-hero p, .content-card p { color: var(--muted); line-height: 1.45; }
        .hero-image { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; border-radius: 22px; box-shadow: 0 20px 46px rgba(31,55,72,.18); }
        .home-invitation-card { position: relative; display: grid; align-content: center; gap: 11px; min-width: 0; padding: 14px; border: 1px solid rgba(255,255,255,.78); border-radius: 24px; background: linear-gradient(145deg, rgba(255,255,255,.62), rgba(236,248,246,.48)); box-shadow: 0 18px 38px rgba(31,55,72,.14); overflow: hidden; transition: transform .24s ease, box-shadow .24s ease; }
        .home-invitation-card:hover { transform: translateY(-3px); box-shadow: 0 24px 46px rgba(31,55,72,.18); }
        .home-invitation-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 0 4px; }
        .home-invitation-head .eyebrow { margin: 0; color: #1c8b78; }
        .home-invitation-dot { width: 9px; height: 9px; border-radius: 50%; background: #f0ab00; box-shadow: 0 0 0 5px rgba(240,171,0,.14); }
        .home-invitation-image { display: block; width: 100%; max-height: none; aspect-ratio: 16 / 9; object-fit: cover; object-position: center; border-radius: 17px; background: rgba(18,51,72,.08); box-shadow: 0 12px 26px rgba(31,55,72,.12); transition: transform .28s ease, box-shadow .28s ease; }
        .home-invitation-card:hover .home-invitation-image { transform: scale(1.012); box-shadow: 0 16px 30px rgba(31,55,72,.17); }
        .home-invitation-link { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 9px 4px 3px; color: #123348; font-size: .82rem; font-weight: 900; text-decoration: none; }
        .home-invitation-link span { color: #1c8b78; font-size: 1.2rem; transition: transform .18s ease; }
        .home-invitation-link:hover span { transform: translateX(4px); }
        .event-card-public { overflow: hidden; transition: transform .24s ease, box-shadow .24s ease; }
        .event-card-public:hover { transform: translateY(-3px); box-shadow: 0 25px 50px rgba(31,55,72,.18); }
        .event-card-public > img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: center; border-radius: 22px; background: rgba(18,51,72,.08); box-shadow: 0 20px 46px rgba(31,55,72,.18); transition: transform .28s ease, filter .28s ease; }
        .event-card-public:hover > img { transform: scale(1.018); filter: saturate(1.04); }
        .detail-hero > img { display: block; width: 100%; height: auto; max-height: 680px; min-height: 220px; object-fit: contain; border-radius: 22px; background: rgba(18,51,72,.08); box-shadow: 0 20px 46px rgba(31,55,72,.18); }
        .home-hero .hero-image { animation: heroFloat 7s ease-in-out infinite; }
        @keyframes heroFloat { 0%, 100% { transform: rotate(1.4deg) translateY(0); } 50% { transform: rotate(1.4deg) translateY(-7px); } }
        .home-welcome { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: 18px; align-items: center; padding: 18px 20px; border-radius: 22px; }
        .home-welcome h2 { color: #123348; font-size: 1.35rem; }
        .home-welcome p:not(.eyebrow) { margin: 7px 0 0; color: var(--muted); line-height: 1.45; }
        .home-quick-links { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
        .home-quick-links a { display: grid; gap: 5px; min-height: 76px; padding: 12px; border: 1px solid rgba(11,59,76,.08); border-radius: 15px; background: rgba(255,255,255,.5); color: #123348; text-decoration: none; transition: transform .18s ease, background .18s ease; }
        .home-quick-links a:hover { transform: translateY(-3px); background: rgba(255,255,255,.86); }
        .home-quick-links span { color: var(--muted); font-size: .75rem; font-weight: 750; }
        .today-line { display: inline-flex; margin: 8px 0 14px; padding: 10px 12px; border-radius: 14px; background: rgba(255,255,255,.58); color: #405665; font-weight: 900; }
        .split-grid, .agenda-grid, .admin-layout, .detail-grid-page { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
        .admin-summary { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin: 16px 0; }
        .admin-summary article { display: grid; gap: 3px; padding: 14px 16px; border: 1px solid rgba(255,255,255,.72); border-radius: 18px; background: rgba(255,255,255,.55); box-shadow: 0 10px 24px rgba(31,55,72,.07); }
        .admin-summary strong { color: #123348; font-size: 1.25rem; font-weight: 950; }
        .admin-summary span { color: var(--muted); font-size: .78rem; font-weight: 850; }
        .admin-tabs { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; padding: 8px; margin-bottom: 16px; }
        .admin-tab { display: grid; gap: 3px; padding: 11px 12px; border: 1px solid transparent; border-radius: 14px; background: transparent; color: #123348; font: inherit; text-align: left; cursor: pointer; }
        .admin-tab strong { font-size: .9rem; }
        .admin-tab span { color: var(--muted); font-size: .72rem; }
        .admin-tab:hover, .admin-tab.active { background: #123348; color: white; box-shadow: 0 10px 22px rgba(18,51,72,.16); }
        .admin-tab:hover span, .admin-tab.active span { color: rgba(255,255,255,.75); }
        .admin-module[hidden] { display: none !important; }
        .admin-module { grid-column: 1 / -1; }
        .admin-card-wide { max-width: 980px; margin: 0 auto; }
        .inline-admin-editor { max-width: 980px; margin: 16px auto; padding: 0; border: 1px solid rgba(28,139,120,.28); background: rgba(235,249,245,.62); overflow: hidden; }
        .inline-admin-editor summary { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 15px 18px; cursor: pointer; list-style: none; }
        .inline-admin-editor summary::-webkit-details-marker { display: none; }
        .inline-admin-editor summary > span { display: grid; gap: 3px; }
        .inline-admin-editor summary b { color: #1c8b78; font-size: .7rem; letter-spacing: .08em; text-transform: uppercase; }
        .inline-admin-editor summary strong { color: #123348; font-size: 1.05rem; }
        .inline-admin-editor summary small, .inline-admin-editor summary em { color: var(--muted); font-size: .76rem; font-style: normal; font-weight: 750; }
        .inline-admin-editor summary em { padding: 7px 10px; border-radius: 999px; background: rgba(18,51,72,.08); white-space: nowrap; }
        .inline-admin-editor[open] summary { border-bottom: 1px solid rgba(28,139,120,.18); }
        .inline-admin-form { padding: 15px 18px 18px; }
        .inline-event-image-drop { min-height: 140px; }
        .admin-card-narrow { max-width: 760px; margin: 0 auto; }
        .upload-guide { display: grid; gap: 3px; padding: 12px 14px; border-radius: 14px; background: rgba(28,139,120,.1); color: #185f53; }
        .upload-guide span { color: #4f6b78; font-size: .82rem; font-weight: 700; text-transform: none; }
        .music-drive-guide { display: grid; gap: 7px; padding: 12px 14px; border-radius: 14px; background: rgba(0,51,141,.08); color: #123348; }
        .music-drive-guide span { color: #4f6b78; font-size: .82rem; font-weight: 700; line-height: 1.45; text-transform: none; }
        .music-drive-guide a { width: fit-content; }
        .upload-group { border: 1px solid rgba(83,102,117,.14); border-radius: 16px; background: rgba(255,255,255,.34); padding: 0 12px 12px; }
        .upload-group summary { padding: 12px 2px; color: #123348; font-weight: 950; cursor: pointer; }
        .upload-group .form-grid { padding-top: 2px; }
        .file-dropzone { position: relative; display: grid !important; gap: 7px !important; min-height: 116px; padding: 13px; border: 1px dashed rgba(18,51,72,.28); border-radius: 17px; background: rgba(255,255,255,.38); cursor: pointer; transition: border-color .18s ease, background .18s ease, transform .18s ease, box-shadow .18s ease; }
        .file-dropzone:hover { border-color: rgba(28,139,120,.65); background: rgba(255,255,255,.62); }
        .file-dropzone input[type="file"] { position: absolute; inset: 0; width: 100%; height: 100%; min-height: 0; opacity: 0; cursor: pointer; }
        .file-drop-copy { display: grid; gap: 3px; place-items: center; min-height: 64px; padding: 7px; border-radius: 12px; color: #123348; text-align: center; pointer-events: none; }
        .file-drop-copy::before { content: "↥"; display: grid; place-items: center; width: 30px; height: 30px; border-radius: 50%; background: rgba(28,139,120,.14); color: #1c8b78; font-size: 1.25rem; font-weight: 950; }
        .file-drop-copy strong { font-size: .82rem; font-weight: 950; text-transform: none; }
        .file-drop-copy small { color: var(--muted); font-size: .7rem; font-weight: 750; text-transform: none; }
        .file-name-list { display: block; min-height: 17px; overflow: hidden; color: #185f53; font-size: .72rem; font-weight: 900; text-overflow: ellipsis; white-space: nowrap; pointer-events: none; }
        .file-dropzone.is-dragging { border-color: #1c8b78; background: rgba(28,139,120,.13); transform: translateY(-2px); }
        .file-dropzone.has-file { border-color: rgba(28,139,120,.65); background: rgba(235,249,245,.72); box-shadow: 0 8px 20px rgba(28,139,120,.10); }
        .admin-wide { grid-column: 1 / -1; }
        .detail-grid-page .wide { grid-column: 1 / -1; }
        .section-title { margin-bottom: 12px; }
        .section-title h2 { margin: 0; font-size: 1.45rem; }
        .card-list, .agenda-list, .file-public-list { display: grid; gap: 10px; }
        .mini-card, .agenda-item, .announcement-public, .file-public-list article { display: grid; grid-template-columns: 74px minmax(0, 1fr) auto; gap: 12px; align-items: center; padding: 10px; border: 1px solid rgba(255,255,255,.72); border-radius: 16px; background: rgba(255,255,255,.48); color: var(--ink); text-decoration: none; transition: transform .2s ease, background .2s ease, box-shadow .2s ease; }
        .mini-card:hover, .agenda-item:hover, .file-public-list article:hover { transform: translateY(-2px); background: rgba(255,255,255,.7); box-shadow: 0 12px 24px rgba(31,55,72,.1); }
        .mini-card img, .agenda-item img { width: 74px; height: 58px; object-fit: cover; object-position: center; border-radius: 12px; background: rgba(18,51,72,.08); box-shadow: 0 5px 12px rgba(31,55,72,.1); }
        .mini-card span, .agenda-item div, .file-public-list span { display: grid; gap: 3px; min-width: 0; }
        .mini-card small, .agenda-item small, .file-public-list small { color: var(--muted); }
        .announcement-public { grid-template-columns: 1fr; }
        .info-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin: 16px 0; }
        .info-list div { padding: 10px; border-radius: 14px; background: rgba(255,255,255,.52); border: 1px solid rgba(255,255,255,.7); }
        .info-list dt { color: #4f6b78; font-size: .72rem; font-weight: 900; text-transform: uppercase; }
        .info-list dd { margin: 3px 0 0; font-weight: 900; }
        .head-actions, .view-switch, .month-strip, .filters, .detail-actions, .button-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .page-head { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
        .filters input, .filters select, .form-grid input, .form-grid select, .form-grid textarea { width: 100%; min-height: 42px; border: 1px solid rgba(83,102,117,.18); border-radius: 14px; background: rgba(255,255,255,.7); color: var(--ink); font: inherit; padding: 10px; }
        .filters input { flex: 1 1 280px; }
        .week-head, .month-grid { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 7px; }
        .week-head { margin-bottom: 8px; text-align: center; color: #536675; font-size: .78rem; font-weight: 900; text-transform: uppercase; }
        .month-day { min-height: 120px; padding: 8px; border-radius: 16px; background: rgba(255,255,255,.47); border: 1px solid rgba(255,255,255,.68); overflow: hidden; }
        .muted-day { opacity: .52; }
        .today-day { box-shadow: inset 0 0 0 2px rgba(28,139,120,.32); }
        .event-pill { display: flex; align-items: center; gap: 6px; margin-top: 6px; padding: 5px; border-radius: 10px; background: rgba(255,255,255,.66); color: var(--ink); text-decoration: none; font-size: .75rem; font-weight: 850; }
        .event-pill img { width: 26px; height: 26px; border-radius: 8px; object-fit: contain; background: rgba(18,51,72,.08); flex: 0 0 auto; }
        .event-pill span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .event-pill small { display: block; color: var(--muted); font-size: .66rem; }
        .year-view { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
        .year-month, .week-column, .day-view { padding: 12px; border-radius: 18px; background: rgba(255,255,255,.45); border: 1px solid rgba(255,255,255,.68); }
        .year-month h3, .week-column h3 { margin: 0 0 10px; }
        .week-view { display: grid; grid-template-columns: repeat(7, minmax(150px, 1fr)); gap: 10px; overflow-x: auto; }
        .week-agenda-list { display: grid; gap: 12px; max-width: 920px; margin: 0 auto; }
        .week-list-day { display: grid; grid-template-columns: 170px minmax(0, 1fr); gap: 14px; padding: 14px; border: 1px solid rgba(255,255,255,.72); border-radius: 18px; background: rgba(255,255,255,.46); }
        .week-list-day.is-today { border-color: rgba(28,139,120,.42); box-shadow: inset 5px 0 0 #1c8b78; background: rgba(235,249,245,.7); }
        .week-list-day > header { display: grid; align-content: start; gap: 4px; }
        .week-list-day > header h3 { margin: 0; color: #123348; font-size: 1.15rem; }
        .week-list-day > header span { color: var(--muted); font-weight: 800; }
        .week-list-day > header b { justify-self: start; padding: 4px 8px; border-radius: 999px; background: rgba(28,139,120,.13); color: #185f53; font-size: .7rem; }
        .week-list-day .agenda-list { gap: 8px; }
        .weekly-schedule-card { display: grid; gap: 12px; padding: 16px; border: 1px solid rgba(255,255,255,.78); border-radius: 20px; background: rgba(255,255,255,.58); }
        .weekly-schedule-card h2 { color: #123348; }
        .weekly-schedule-card p:not(.eyebrow) { margin: 5px 0 0; color: var(--muted); }
        .weekly-schedule-card img, .weekly-schedule-card iframe { display: block; width: 100%; max-height: 620px; min-height: 280px; border: 0; border-radius: 15px; object-fit: contain; background: rgba(18,51,72,.06); }
        .weekly-schedule-card iframe { height: 620px; }
        .weekly-upload { display: grid; gap: 9px; }
        .weekly-upload > strong { color: #123348; font-size: 1rem; }
        .weekly-upload p, .weekly-upload small { margin: 0; color: var(--muted); font-size: .82rem; font-weight: 700; text-transform: none; }
        .week-column h3 span { display: block; color: var(--muted); font-size: .75rem; }
        .week-column { min-width: 0; overflow: hidden; }
        .agenda-list-compact { gap: 10px; }
        .week-event-item { display: grid; grid-template-columns: 1fr; gap: 8px; align-items: start; padding: 9px; overflow: hidden; }
        .week-event-item > img { display: block; width: 100%; height: auto; min-height: 0; max-height: none; aspect-ratio: auto; object-fit: contain; border-radius: 11px; background: transparent; }
        .week-event-item div { min-width: 0; }
        .week-event-item div span, .week-event-item div small { display: block; overflow-wrap: anywhere; word-break: break-word; }
        .week-event-item div span { line-height: 1.15; }
        .week-event-item .small-action { width: 100%; min-height: 34px; padding: 0 6px; font-size: .72rem; text-align: center; white-space: normal; }
        .event-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
        .announcement-page-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
        .announcement-page-grid .announcement-public { align-content: start; min-height: 180px; }
        .status-chip { justify-self: start; padding: 5px 9px; border-radius: 999px; background: rgba(28,139,120,.12); color: #185f53; font-size: .72rem; font-weight: 900; }
        .event-card-public { display: grid; gap: 12px; padding: 12px; border-radius: 22px; }
        .detail-hero { border-radius: 26px; padding: 18px; }
        .asset-grid-page { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
        .asset-public { display: grid; gap: 8px; padding: 10px; border: 1px solid rgba(255,255,255,.72); border-radius: 16px; background: rgba(255,255,255,.48); }
        .asset-public button:first-child { width: 100%; border: 0; padding: 0; border-radius: 14px; background: rgba(18,51,72,.08); overflow: hidden; cursor: pointer; }
        .asset-public img, .asset-public video { width: 100%; height: 150px; object-fit: cover; object-position: center; background: rgba(18,51,72,.08); display: block; }
        .asset-public span { display: grid; place-items: center; height: 150px; color: var(--muted); font-weight: 900; }
        .form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        .form-grid label { display: grid; gap: 5px; color: #4f6b78; font-size: .78rem; font-weight: 900; text-transform: uppercase; }
        .form-grid .full, .button-row.full { grid-column: 1 / -1; }
        .form-grid textarea { min-height: 92px; resize: vertical; }
        .event-editor-form { display: grid; gap: 14px; }
        .admin-form-section { margin: 0; padding: 15px; border: 1px solid rgba(255,255,255,.78); border-radius: 20px; background: rgba(255,255,255,.34); }
        .admin-form-section > h3, .admin-form-section summary h3 { margin: 2px 0 12px; color: #123348; font-size: 1.08rem; }
        .admin-form-section > .eyebrow, .admin-form-section summary .eyebrow { margin: 0; }
        .admin-form-section summary { display: flex; align-items: center; justify-content: space-between; gap: 10px; cursor: pointer; list-style: none; }
        .admin-form-section summary::-webkit-details-marker { display: none; }
        .admin-form-section summary h3 { margin-bottom: 0; }
        .details-hint, .field-caption { color: var(--muted); font-size: .75rem; font-weight: 850; text-transform: uppercase; }
        .field-caption { display: block; margin-bottom: 8px; }
        .committee-picker { display: grid; grid-template-columns: repeat(auto-fit, minmax(112px, 1fr)); gap: 9px; }
        .committee-option { display: grid; justify-items: center; gap: 7px; min-height: 112px; padding: 9px 6px; border: 2px solid transparent; border-radius: 16px; background: rgba(255,255,255,.64); color: var(--ink); font: inherit; font-size: .72rem; font-weight: 900; cursor: pointer; transition: .18s ease; }
        .committee-option:hover { transform: translateY(-2px); border-color: rgba(28,139,120,.45); }
        .committee-option.selected { border-color: #1c8b78; background: rgba(224,250,244,.9); box-shadow: 0 8px 18px rgba(18,51,72,.12); }
        .committee-option img { width: 62px; height: 62px; padding: 7px; border-radius: 13px; object-fit: contain; background: linear-gradient(145deg, #123348, #1c8b78); }
        .committee-option span { line-height: 1.1; text-align: center; }
        .checkbox-line { display: flex !important; align-items: center; gap: 8px; text-transform: none !important; color: var(--ink) !important; }
        .tag-admin { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
        .tag-admin .field-caption { width: 100%; margin-bottom: 0; }
        .tag-admin label { display: inline-flex; align-items: center; gap: 7px; padding: 8px 11px; border: 1px solid rgba(83,102,117,.14); border-radius: 999px; background: rgba(255,255,255,.48); color: var(--ink); font-size: .75rem; text-transform: none; cursor: pointer; }
        .tag-admin label:has(input:checked) { border-color: rgba(28,139,120,.54); background: rgba(28,139,120,.14); color: #185f53; }
        .tag-admin input { accent-color: #1c8b78; }
        .event-image-drop { min-height: 145px; }
        .event-image-drop > small { color: var(--muted); font-size: .72rem; font-weight: 750; text-align: center; text-transform: none; }
        .decom-panel .section-title p:not(.eyebrow) { margin: 6px 0 0; color: var(--muted); }
        .decom-panel { scroll-margin-top: 130px; }
        .decom-toolbar { display: grid; gap: 12px; margin-bottom: 14px; }
        .decom-months, .decom-actions { display: flex; flex-wrap: wrap; gap: 8px; }
        .decom-months button { min-height: 38px; padding: 0 12px; border: 1px solid rgba(255,255,255,.75); border-radius: 999px; background: rgba(255,255,255,.55); color: var(--ink); font: inherit; font-weight: 900; cursor: pointer; }
        .decom-months button.active { background: linear-gradient(145deg, #123348, #1c8b78); color: white; }
        .decom-board { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(320px, .65fr); gap: 14px; align-items: start; }
        .decom-calendar-shell, .decom-editor { border: 1px solid rgba(255,255,255,.72); border-radius: 20px; background: rgba(255,255,255,.48); padding: 12px; }
        .decom-calendar-shell { overflow-x: auto; }
        .decom-month-title { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 10px; }
        .decom-month-title strong { font-size: 1.2rem; font-weight: 950; }
        .decom-month-title span { color: var(--muted); font-size: .86rem; font-weight: 850; }
        .decom-week-head, .decom-calendar-grid { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 6px; }
        .decom-week-head { margin-bottom: 6px; color: #4f6b78; font-size: .72rem; font-weight: 950; text-align: center; text-transform: uppercase; }
        .decom-day { position: relative; display: grid; grid-template-rows: auto auto 1fr auto; gap: 3px; min-height: 92px; padding: 8px; border: 1px solid rgba(83,102,117,.13); border-radius: 14px; background: rgba(255,255,255,.55); color: var(--ink); font: inherit; text-align: left; cursor: pointer; overflow: hidden; }
        .decom-day:disabled { cursor: default; opacity: .45; }
        .decom-day.cult-day { opacity: 1; background: rgba(255,255,255,.78); box-shadow: inset 0 -4px 0 #f39c12; }
        .decom-day.selected { outline: 3px solid rgba(28,139,120,.28); border-color: rgba(28,139,120,.55); background: rgba(235,249,245,.95); }
        .decom-day.today .decom-day-number { background: #123348; color: white; }
        .decom-day.status-confirmado { box-shadow: inset 0 -4px 0 #1c8b78; }
        .decom-day.status-cubierto { box-shadow: inset 0 -4px 0 #2f80ed; }
        .decom-day.status-pendiente { box-shadow: inset 0 -4px 0 #f39c12; }
        .decom-day.status-sin-asignar { box-shadow: inset 0 -4px 0 #9aa8b2; }
        .decom-day.status-cambio-solicitado { box-shadow: inset 0 -4px 0 #e84b5f; }
        .decom-day-number { display: inline-grid; place-items: center; width: 26px; height: 26px; border-radius: 9px; background: rgba(18,51,72,.08); font-weight: 950; }
        .decom-day small { color: var(--muted); font-size: .72rem; font-weight: 850; }
        .decom-day strong { min-width: 0; color: #123348; font-size: .82rem; line-height: 1.05; overflow-wrap: anywhere; }
        .decom-day em { color: #4f6b78; font-size: .68rem; font-style: normal; font-weight: 850; }
        .decom-day b { justify-self: start; padding: 3px 6px; border-radius: 999px; background: rgba(232,75,95,.12); color: #8f2130; font-size: .62rem; }
        .decom-editor { position: sticky; top: 12px; display: grid; gap: 12px; }
        .decom-editor header { display: grid; gap: 3px; }
        .decom-editor h3 { margin: 0; font-size: 1.3rem; line-height: 1.05; }
        .decom-editor header span { color: var(--muted); font-weight: 850; }
        .decom-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        .decom-turn { display: grid; gap: 12px; padding: 14px; border-radius: 18px; border: 1px solid rgba(255,255,255,.72); background: rgba(255,255,255,.52); box-shadow: inset 5px 0 0 #9aa8b2; }
        .decom-turn.status-confirmado { box-shadow: inset 5px 0 0 #1c8b78; }
        .decom-turn.status-cubierto { box-shadow: inset 5px 0 0 #2f80ed; }
        .decom-turn.status-pendiente { box-shadow: inset 5px 0 0 #f39c12; }
        .decom-turn.status-sin-asignar { box-shadow: inset 5px 0 0 #9aa8b2; }
        .decom-turn.status-cambio-solicitado { box-shadow: inset 5px 0 0 #e84b5f; }
        .decom-turn header { display: flex; align-items: start; justify-content: space-between; gap: 10px; }
        .decom-turn header div { display: grid; gap: 3px; }
        .decom-turn header strong { font-size: 1.08rem; }
        .decom-turn header span, .decom-turn small { color: var(--muted); }
        .decom-turn mark { padding: 6px 9px; border-radius: 999px; background: rgba(18,51,72,.08); color: #123348; font-size: .78rem; font-weight: 900; }
        .decom-alert { display: grid; gap: 4px; padding: 10px; border-radius: 14px; background: rgba(243,156,18,.14); color: #63450f; border: 1px solid rgba(243,156,18,.24); line-height: 1.35; }
        .decom-form { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; }
        .decom-form label { display: grid; gap: 5px; color: #4f6b78; font-size: .75rem; font-weight: 900; text-transform: uppercase; }
        .decom-form .full { grid-column: 1 / -1; }
        .decom-form select, .decom-form textarea { width: 100%; border: 1px solid rgba(83,102,117,.18); border-radius: 12px; background: rgba(255,255,255,.72); color: var(--ink); font: inherit; padding: 9px; }
        .decom-form textarea { min-height: 74px; resize: vertical; }
        .decom-readonly { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; }
        .decom-readonly span { display: grid; gap: 4px; padding: 10px; border-radius: 12px; background: rgba(255,255,255,.58); color: var(--ink); line-height: 1.25; }
        .decom-readonly strong { color: #4f6b78; font-size: .72rem; font-weight: 900; text-transform: uppercase; }
        .decom-readonly .full { grid-column: 1 / -1; }
        .decom-turn footer, .decom-editor footer { display: flex; flex-wrap: wrap; gap: 8px; }
        .login-card { display: grid; grid-template-columns: minmax(0, .8fr) minmax(280px, .55fr); gap: 18px; align-items: center; max-width: 900px; margin: 0 auto; }
        .form-message { min-height: 20px; color: #b42335; font-weight: 800; }
        .empty-state { padding: 14px; border: 1px dashed rgba(83,102,117,.35); border-radius: 16px; color: var(--muted); background: rgba(255,255,255,.38); }
        .cloud-warning, .cloud-ok { margin-top: 12px; padding: 12px; border-radius: 16px; font-weight: 800; line-height: 1.35; }
        .cloud-warning { background: rgba(232,75,95,.12); color: #8f2130; border: 1px solid rgba(232,75,95,.22); }
        .cloud-ok { background: rgba(28,139,120,.13); color: #185f53; border: 1px solid rgba(28,139,120,.22); }
        .existing-list { display: grid; gap: 8px; margin-top: 6px; padding-top: 8px; border-top: 1px solid rgba(83,102,117,.14); }
        .existing-list h3 { margin: 0 0 4px; font-size: 1rem; }
        .existing-list article { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 10px; align-items: center; padding: 10px; border-radius: 14px; background: rgba(255,255,255,.50); border: 1px solid rgba(255,255,255,.72); }
        .existing-list span { display: grid; min-width: 0; }
        .existing-list small { color: var(--muted); overflow-wrap: anywhere; }
        .leader-admin-module, .leader-form-card, .leader-history-card { max-width: 980px; margin: 0 auto; }
        .leader-admin-form { align-items: end; }
        .leader-directory, .leader-submission-list { display: grid; gap: 10px; margin-top: 18px; }
        .leader-directory h3 { margin: 0; color: #123348; font-size: 1rem; }
        .leader-directory-row, .leader-submission-card { display: grid; gap: 10px; padding: 13px; border: 1px solid rgba(255,255,255,.78); border-radius: 17px; background: rgba(255,255,255,.5); }
        .leader-directory-row { grid-template-columns: minmax(0, 1fr) auto; align-items: center; }
        .leader-directory-row div { display: grid; gap: 3px; min-width: 0; }
        .leader-directory-row span, .leader-submission-card p { color: var(--muted); font-size: .82rem; }
        .leader-submission-head { display: flex; align-items: start; justify-content: space-between; gap: 12px; }
        .leader-submission-head h3 { margin: 3px 0; color: #123348; font-size: 1rem; }
        .leader-submission-head p { margin: 0; }
        .submission-status { flex: 0 0 auto; padding: 6px 9px; border-radius: 999px; font-size: .72rem; font-weight: 900; text-transform: capitalize; }
        .status-pendiente { background: rgba(243,156,18,.14); color: #8a5c05; }
        .status-atendida { background: rgba(28,139,120,.14); color: #185f53; }
        .status-rechazada { background: rgba(232,75,95,.13); color: #8f2130; }
        .leader-message { margin: 0 !important; padding: 10px; border-radius: 12px; background: rgba(255,255,255,.48); white-space: pre-wrap; }
        .private-assets { display: grid; gap: 7px; }
        .private-assets > div { display: flex; flex-wrap: wrap; gap: 7px; }
        .submission-actions { padding-top: 3px; border-top: 1px solid rgba(83,102,117,.12); }
        .leader-file-drop { min-height: 150px; }
        .media-layer { position: fixed; inset: 0; z-index: 40; display: none; align-items: center; justify-content: center; padding: 18px; background: rgba(10,20,30,.52); backdrop-filter: blur(10px); }
        .media-layer.open { display: flex; }
        .media-layer article { width: min(920px, 100%); max-height: 92vh; overflow: auto; padding: 16px; border-radius: 24px; background: rgba(245,250,248,.97); }
        .media-layer header { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
        .media-layer header button { width: 42px; height: 42px; border-radius: 14px; border: 1px solid rgba(83,102,117,.18); background: rgba(255,255,255,.7); font-size: 1.3rem; font-weight: 900; cursor: pointer; }
        .media-layer img, .media-layer video, .media-layer iframe { width: 100%; max-height: 70vh; object-fit: contain; border: 0; border-radius: 18px; background: rgba(255,255,255,.7); }
        .media-layer iframe { min-height: 68vh; }
        .music-widget { position: fixed; right: 18px; bottom: 18px; z-index: 13; display: grid; place-items: center; width: 66px; height: 66px; padding: 0; border: 0; border-radius: 50%; background: transparent; box-shadow: none; backdrop-filter: none; }
        .music-toggle { position: relative; z-index: 2; display: grid; place-items: center; width: 54px; height: 54px; padding: 0 0 0 2px; border: 2px solid rgba(0,51,141,.88); border-radius: 50%; background: rgba(235,249,253,.32); box-shadow: 0 8px 20px rgba(0,51,141,.18), inset 0 0 0 1px rgba(255,255,255,.45); color: #00338D; font: inherit; font-size: 1.05rem; font-weight: 950; line-height: 1; cursor: pointer; transition: transform .2s ease, background .2s ease, box-shadow .2s ease; }
        .music-toggle:hover { transform: scale(1.07); background: rgba(235,249,253,.56); box-shadow: 0 10px 24px rgba(0,51,141,.25), inset 0 0 0 1px rgba(255,255,255,.7); }
        .music-toggle:focus-visible { outline: 3px solid rgba(0,159,218,.55); outline-offset: 4px; }
        .music-toggle:disabled { cursor: wait; opacity: .55; }
        .music-wave { position: absolute; inset: 5px; border: 1px solid rgba(0,159,218,.62); border-radius: 50%; opacity: 0; transform: scale(.75); pointer-events: none; }
        .music-widget.is-playing .music-wave { animation: musicWave 2.4s ease-out infinite; }
        .music-widget.is-playing .music-wave-two { animation-delay: .8s; }
        .music-widget.is-playing .music-wave-three { animation-delay: 1.6s; }
        @keyframes musicWave { 0% { opacity: 0; transform: scale(.78); } 20% { opacity: .7; } 100% { opacity: 0; transform: scale(1.85); } }
        .music-widget.is-playing .music-toggle { background: rgba(188,234,247,.46); box-shadow: 0 0 0 5px rgba(0,159,218,.08), 0 10px 25px rgba(0,159,218,.25), inset 0 0 0 1px rgba(255,255,255,.64); }
        .music-sr-status { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
        @media (max-width: 900px) {
          .home-hero, .detail-hero, .split-grid, .agenda-grid, .admin-layout, .login-card, .decom-grid, .decom-board { grid-template-columns: 1fr; }
          .home-welcome { grid-template-columns: 1fr; }
          .admin-tabs { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .decom-editor { position: static; }
          .week-list-day { grid-template-columns: 130px minmax(0, 1fr); }
          .event-grid, .year-view, .asset-grid-page { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .announcement-page-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .page-head { display: grid; }
        }
        @media (max-width: 620px) {
          .platform-shell { width: calc(100% - 14px); padding-top: 8px; }
          .music-widget { right: 12px; bottom: 12px; width: 58px; height: 58px; }
          .music-toggle { width: 48px; height: 48px; font-size: .95rem; }
          .platform-top { align-items: start; border-radius: 18px; }
          .platform-brand { flex: 1 1 auto; }
          .platform-brand img { width: 220px; height: 58px; border-radius: 0; padding: 0; }
          .nav-toggle { display: inline-flex; }
          .platform-nav { position: absolute; left: 10px; right: 10px; top: calc(100% + 8px); display: none; flex-direction: column; align-items: stretch; padding: 10px; border-radius: 18px; background: rgba(245,250,248,.96); box-shadow: 0 20px 50px rgba(31,55,72,.22); }
          .platform-top.is-compact .platform-nav { position: fixed; top: 68px; left: 10px; right: 10px; width: auto; max-height: calc(100vh - 82px); margin: 0; }
          .platform-nav.open { display: flex; }
          .platform-nav a { justify-content: flex-start; }
          .home-hero, .page-head, .content-card, .calendar-page, .view-switch, .month-strip, .filters, .login-card, .detail-hero { padding: 12px; border-radius: 18px; }
          .home-kicker { margin-bottom: 18px; font-size: .68rem; }
          .home-actions { align-items: stretch; flex-direction: column; }
          .home-actions a, .music-home-action { width: 100%; justify-content: center; text-align: center; }
          .home-welcome { padding: 14px; border-radius: 18px; }
          .home-quick-links { grid-template-columns: 1fr; }
          .week-list-day { grid-template-columns: 1fr; gap: 9px; }
          .leader-submission-head, .leader-directory-row { grid-template-columns: 1fr; display: grid; }
          .submission-status { justify-self: start; }
          .weekly-schedule-card iframe { height: 420px; }
          .hero-copy h1, .page-head h1, .detail-hero h1, .login-card h1 { font-size: 1.9rem; line-height: 1.05; }
          .info-list, .form-grid, .event-grid, .asset-grid-page, .year-view { grid-template-columns: 1fr; }
          .admin-summary { grid-template-columns: 1fr; }
          .admin-tabs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .inline-admin-editor summary { align-items: flex-start; flex-direction: column; }
          .inline-admin-editor summary em { white-space: normal; }
          .announcement-page-grid { grid-template-columns: 1fr; }
          .week-head, .month-grid { gap: 4px; }
          .week-head { font-size: .62rem; }
          .month-day { min-height: 70px; padding: 5px; border-radius: 12px; }
          .platform-top.is-compact { margin-bottom: 34px; }
          .event-pill { grid-template-columns: 28px minmax(0, 1fr); min-height: 38px; font-size: inherit; padding: 3px; }
          .event-pill-thumb { width: 28px; height: 28px; }
          .event-pill-copy { display: block; }
          .event-pill-copy strong { display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2; font-size: .58rem; line-height: 1.1; }
          .event-pill-copy small { display: block; margin-top: 2px; font-size: .52rem; white-space: nowrap; }
          .mini-card, .agenda-item, .file-public-list article { grid-template-columns: 58px minmax(0, 1fr); }
          .mini-card img, .agenda-item img { width: 58px; height: 48px; }
          .agenda-item .small-action { grid-column: 1 / -1; }
          .month-strip { overflow: visible; flex-wrap: wrap; justify-content: stretch; }
          .month-strip button { flex: 1 1 calc(33.333% - 8px); min-width: 0; }
          .decom-months { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); overflow: visible; }
          .decom-months button { min-width: 0; padding: 0 5px; font-size: .72rem; }
          .decom-calendar-shell, .decom-editor { padding: 9px; border-radius: 16px; }
          .decom-week-head, .decom-calendar-grid { gap: 3px; min-width: 0; width: 100%; grid-template-columns: repeat(7, minmax(0, 1fr)); }
          .decom-week-head { font-size: .57rem; }
          .decom-day { min-width: 0; min-height: 72px; padding: 5px 4px; border-radius: 10px; }
          .decom-day-number { width: 22px; height: 22px; border-radius: 7px; font-size: .82rem; }
          .decom-day small { overflow: hidden; font-size: .55rem; text-overflow: ellipsis; white-space: nowrap; }
          .decom-day strong { display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2; font-size: .61rem; line-height: 1.05; overflow-wrap: anywhere; }
          .decom-day em, .decom-day b { display: none; }
          .decom-month-title { display: grid; gap: 2px; }
          .decom-form { grid-template-columns: 1fr; }
          .decom-form .full { grid-column: auto; }
          .decom-readonly { grid-template-columns: 1fr; }
          .decom-readonly .full { grid-column: auto; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { scroll-behavior: auto !important; animation: none !important; transition: none !important; }
        }
        /* Aplicación de la identidad IPUC en la capa dinámica de la plataforma. */
        body.platform-body { color: #102D3B; font-family: "Myriad Pro", Calibri, "Segoe UI", Arial, sans-serif; }
        body.platform-body .platform-top,
        body.platform-body .content-card,
        body.platform-body .page-head,
        body.platform-body .calendar-page,
        body.platform-body .admin-form-section,
        body.platform-body .decom-panel,
        body.platform-body .login-card { border-color: rgba(0, 51, 141, .18); }
        body.platform-body .platform-nav a.active,
        body.platform-body .platform-nav a[aria-current="page"],
        body.platform-body .primary-link,
        body.platform-body .view-switch button.active,
        body.platform-body .month-strip button.active,
        body.platform-body .admin-tab:hover,
        body.platform-body .admin-tab.active,
        body.platform-body .decom-months button.active { background: linear-gradient(135deg, #00338D, #005B9F); }
        body.platform-body .home-live-dot,
        body.platform-body .live-visitors-dot { background: #009FDA; }
        body.platform-body .music-toggle { border-color: #00338D; color: #00338D; }
        body.platform-body .committee-option img { background: linear-gradient(145deg, #00338D, #005B9F); }
        body.platform-body .committee-option.selected { border-color: #009FDA; background: rgba(188, 234, 247, .72); }
        body.platform-body .week-list-day.is-today { border-color: rgba(0, 159, 218, .48); box-shadow: inset 5px 0 0 #009FDA; }
        body.platform-body .today-day { box-shadow: inset 0 0 0 2px rgba(0, 159, 218, .42); }
        body.platform-body .decom-day.today .decom-day-number,
        body.platform-body .day-number { color: #00338D; }
        body.platform-body .decom-day.today .decom-day-number { background: #00338D; color: #fff; }
        body.platform-body .status-chip,
        body.platform-body .live-visitors { border-color: rgba(0, 159, 218, .32); background: rgba(188, 234, 247, .64); color: #00338D; }
        body.platform-body .site-video-backdrop span { background: linear-gradient(135deg, rgba(0, 51, 141, .20), rgba(0, 159, 218, .08) 48%, rgba(0, 25, 67, .24)); }
        @media (max-width: 620px) {
          html, body.platform-body { max-width: 100%; overflow-x: hidden !important; }
          body.platform-body .nav-backdrop {
            z-index: 1290 !important;
            appearance: none !important;
            -webkit-appearance: none !important;
            padding: 0 !important;
            border: 0 !important;
            background: rgba(2, 7, 18, .18) !important;
          }
          body.platform-body .platform-top.is-compact { z-index: 1300 !important; }
          body.platform-body .nav-backdrop.is-visible { background: rgba(2, 7, 18, .18) !important; }
          /* El header crea su propio contexto de apilado; al abrir el menú
             debe quedar por encima de la capa que cierra la navegación. */
          body.platform-body .platform-top:has(.platform-nav.open) { z-index: 1300 !important; }
          body.platform-body .platform-top.is-compact .platform-nav.open {
            background: rgba(3, 14, 30, .97) !important;
            border: 1px solid rgba(245, 189, 55, .28) !important;
            box-shadow: 0 24px 60px rgba(0, 0, 0, .48) !important;
          }
          body.platform-body .platform-top.is-compact .platform-nav.open a,
          body.platform-body .platform-top.is-compact .platform-nav.open a.active,
          body.platform-body .platform-top.is-compact .platform-nav.open a[aria-current="page"] {
            background: rgba(255, 255, 255, .065) !important;
            border-color: rgba(255, 255, 255, .13) !important;
            color: #f7fbff !important;
            box-shadow: none !important;
          }
          body.platform-body .platform-top.is-compact .platform-nav.open a.active,
          body.platform-body .platform-top.is-compact .platform-nav.open a[aria-current="page"] {
            border-color: rgba(245, 189, 55, .72) !important;
            background: rgba(245, 189, 55, .12) !important;
          }
          body.platform-body .platform-top.is-compact .platform-nav.open a.active::after,
          body.platform-body .platform-top.is-compact .platform-nav.open a[aria-current="page"]::after {
            background: #f5bd37 !important;
          }
          body.platform-body .platform-top.is-compact .platform-nav.open { position: fixed !important; top: 70px !important; right: 8px !important; left: 8px !important; width: auto !important; max-height: calc(100vh - 82px) !important; display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 7px; overflow-y: auto; box-sizing: border-box; }
          body.platform-body .platform-top.is-compact .platform-nav.open a { min-width: 0; min-height: 44px; justify-content: center; padding: 0 7px; text-align: center; white-space: normal; }
          body.platform-body .calendar-page, body.platform-body .month-calendar-view, body.platform-body .decom-calendar-shell { width: 100% !important; min-width: 0 !important; max-width: 100% !important; overflow-x: hidden !important; box-sizing: border-box; }
          body.platform-body .week-head, body.platform-body .month-grid, body.platform-body .decom-week-head, body.platform-body .decom-calendar-grid { width: 100% !important; min-width: 0 !important; max-width: 100% !important; grid-template-columns: repeat(7, minmax(0, 1fr)) !important; box-sizing: border-box; }
          body.platform-body .month-day, body.platform-body .decom-day { min-width: 0 !important; }
        }
        /* Corrección definitiva de navegación, calendario y administración. */
        body.platform-body .platform-top.is-compact { position: fixed !important; top: 12px !important; right: 12px !important; left: auto !important; width: 48px !important; height: 48px !important; min-height: 48px !important; margin: 0 !important; padding: 3px !important; z-index: 1001 !important; }
        body.platform-body .platform-top.is-compact .platform-nav.open { position: fixed !important; top: 70px !important; right: 12px !important; left: auto !important; width: min(360px, calc(100vw - 24px)) !important; max-height: calc(100vh - 84px) !important; display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; overflow-y: auto; box-sizing: border-box; }
        body.platform-body .platform-top.is-compact .platform-nav.open a { min-width: 0 !important; min-height: 46px !important; justify-content: center !important; padding: 0 8px !important; text-align: center !important; white-space: normal !important; overflow-wrap: anywhere; }
        body.platform-body .admin-workspace, body.platform-body .admin-module, body.platform-body .admin-card-wide, body.platform-body .admin-card-narrow, body.platform-body .admin-form-section, body.platform-body .form-grid, body.platform-body .admin-grid, body.platform-body .admin-field, body.platform-body .committee-picker { min-width: 0; max-width: 100%; box-sizing: border-box; }
        body.platform-body .admin-workspace { grid-template-columns: minmax(0, 1fr) !important; align-items: start; }
        body.platform-body .admin-tabs { grid-template-columns: repeat(3, minmax(0, 1fr)); align-items: stretch; }
        body.platform-body .admin-tab { min-width: 0; min-height: 64px; align-content: center; overflow-wrap: anywhere; }
        body.platform-body .admin-tab strong, body.platform-body .admin-tab span { min-width: 0; overflow-wrap: anywhere; }
        body.platform-body .admin-field input, body.platform-body .admin-field select, body.platform-body .admin-field textarea, body.platform-body .form-grid input, body.platform-body .form-grid select, body.platform-body .form-grid textarea { box-sizing: border-box; max-width: 100%; }
        body.platform-body .form-grid > *, body.platform-body .admin-grid > * { min-width: 0; }
        body.platform-body .admin-field > button, body.platform-body .button-row > button { min-width: 140px; }
        @media (max-width: 620px) {
          body.platform-body .platform-top.is-compact { top: 8px !important; right: 8px !important; }
          body.platform-body .platform-top.is-compact .platform-nav.open { top: 64px !important; right: 8px !important; left: 8px !important; width: auto !important; max-height: calc(100vh - 76px) !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          body.platform-body .admin-tabs { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 7px; padding: 7px; }
          body.platform-body .admin-tab { min-height: 58px; padding: 9px 7px; text-align: center; }
          body.platform-body .admin-tab strong { font-size: .8rem; }
          body.platform-body .admin-tab span { font-size: .66rem; line-height: 1.15; }
          body.platform-body .admin-summary, body.platform-body .admin-layout, body.platform-body .admin-grid, body.platform-body .form-grid, body.platform-body .leader-admin-form { grid-template-columns: minmax(0, 1fr) !important; }
          body.platform-body .admin-field, body.platform-body .admin-field.full, body.platform-body .form-grid .full, body.platform-body .button-row.full { grid-column: 1 / -1 !important; }
          body.platform-body .admin-field > button, body.platform-body .button-row > button, body.platform-body .admin-form-section button { width: 100%; min-width: 0; }
          body.platform-body .committee-picker { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          body.platform-body .committee-option { min-width: 0; min-height: 104px; }
          body.platform-body .month-calendar-view, body.platform-body .month-grid, body.platform-body .week-head, body.platform-body .decom-calendar-shell, body.platform-body .decom-week-head, body.platform-body .decom-calendar-grid { width: 100% !important; min-width: 0 !important; max-width: 100% !important; box-sizing: border-box; }
          body.platform-body .month-grid, body.platform-body .decom-calendar-grid { grid-template-columns: repeat(7, minmax(0, 1fr)) !important; }
          body.platform-body .month-day, body.platform-body .decom-day { min-width: 0 !important; overflow: hidden; }
        }
        /* Mantener la capa para cerrar detrás del header y de los enlaces del menú. */
        @media (max-width: 900px) {
          body.platform-body .nav-backdrop.is-visible { z-index: 998 !important; }
          body.platform-body .platform-top:has(.platform-nav.open) { z-index: 999 !important; }
          body.platform-body .platform-top .platform-nav.open,
          body.platform-body .platform-top.is-compact .platform-nav.open { z-index: 1000 !important; pointer-events: auto !important; }
          body.platform-body .platform-top .platform-nav.open a { position: relative !important; z-index: 1 !important; pointer-events: auto !important; touch-action: manipulation; }
        }
      `;
      document.head.appendChild(style);
      }
    }
