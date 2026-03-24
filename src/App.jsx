import { useEffect, useRef, useState } from "react";
import "./App.css";

const STEP_TITLES = [
  "Datos personales",
  "Perfil laboral",
  "Solicitud y esquema",
  "Requisitos y modalidad",
  "Declaración y firma",
];

const DOCUMENT_TYPES = ["CC", "CE", "OTRO"];
const GENDERS = ["MASCULINO", "FEMENINO"];
const EDUCATION_LEVELS = [
  "BÁSICO",
  "SECUNDARIA",
  "TÉCNICO",
  "TECNOLÓGICO",
  "SUPERIOR",
];
const EMPLOYMENT_STATUSES = ["EMPLEADO", "DESEMPLEADO", "INDEPENDIENTE"];
const REQUEST_TYPES = ["CERTIFICACIÓN", "MANTENIMIENTO", "RENOVACIÓN"];
const EVALUATION_MODALITIES = ["EVALUACIÓN PRESENCIAL", "EVALUACIÓN REMOTA"];
const EXPERIENCE_UNITS = ["MESES", "AÑOS"];
const FORM_ROUTE = "#/";
const DATA_POLICY_ROUTE = "#/politica-tratamiento-datos";
const ASPECTS_ROUTE = "#/aspectos-a-tener-en-cuenta";
const CONDITIONS_ROUTE = "#/declaracion-y-aceptacion-condiciones";

const CERTIFICATION_SCHEMES = [
  "Agente de tránsito y Seguridad Vial (Caracterizar) - NSCL 280601088",
  "Agente de tránsito y Seguridad Vial (Regular) - NSCL 280601089",
  "Alistamiento de Automotores Livianos - NSCL 280601099",
  "Conductor de Vehículos Livianos Categoría C1 (Conducir) - NSCL 280601100",
  "Conductor de Vehículos Livianos Categoría C1 (Trasladar) - NSCL 280601101",
  "Alistamiento de Vehículos Automotores Pesados - NCL 280601107",
  "Conductor de Vehículos de Transporte Pesado - NCL 280601108",
  "Docente en Formación Presencial - NSCL 240201056",
  "Docente en Formación Virtual (E-learning) - NSCL 240201081",
  "Mantenimiento Redes Energizadas Media Tensión - NSCL 280101164",
  "Monitorear Sistemas de Seguridad - NSCL 260401036",
  "Operador Montacargas Convencional - NSCL 270101114",
  "Supervisor de Servicios de Seguridad - NSCL 260401038",
  "Controlar Accesos en Vigilancia - NCL 260401040",
  "OTRO ESQUEMA",
];

const REQUIREMENTS_BY_REQUEST = {
  CERTIFICACIÓN: [
    "Ser mayor de 18 años.",
    "Adjuntar copia legible del documento de identidad.",
    "Completar la solicitud en su versión vigente.",
    "Presentar cartas laborales relacionadas con el esquema, con mínimo seis meses de experiencia.",
    "Certificado de estudio general o propio con relación al esquema.",
    "Tener foto digital en fondo blanco cuando aplique.",
    "Adjuntar otros certificados según el esquema de certificación.",
    "Presentar comprobante de pago según la oferta aceptada.",
  ],
  MANTENIMIENTO: [
    "Presentar cartas laborales relacionadas con el esquema para la etapa de mantenimiento.",
    "Acreditar experiencia reciente en el área técnica u oficio evaluado.",
    "Presentar comprobante de pago según la oferta aceptada.",
  ],
  RENOVACIÓN: [
    "Actualizar la solicitud de evaluación y certificación.",
    "Demostrar continuidad laboral relacionada con el esquema.",
    "Presentar certificaciones de estudio que evidencien desarrollo profesional.",
    "Adjuntar foto digital en fondo blanco cuando aplique.",
    "Adjuntar certificación de capacidad física cuando aplique.",
    "Presentar comprobante de pago según la oferta aceptada.",
  ],
};

const DECLARATIONS = [
  {
    key: "documentsCommitment",
    label:
      "Me comprometo a entregar los documentos requeridos en cada etapa del proceso de certificación.",
  },
  {
    key: "truthfulnessCommitment",
    label:
      "Declaro que la información suministrada es veraz, completa y fiel a la realidad.",
  },
  {
    key: "fraudCommitment",
    label:
      "Acepto no participar en acciones fraudulentas ni divulgar material de examen.",
  },
  {
    key: "rulesCommitment",
    label:
      "Conozco y acepto las reglas del servicio de certificación y el código de conducta de CERCOMLAB.",
  },
  {
    key: "paymentCommitment",
    label:
      "Me comprometo a pagar los costos asociados al proceso, independientemente del resultado.",
  },
  {
    key: "dataUsageCommitment",
    label:
      "Autorizo el tratamiento de mis datos personales y registros fotográficos o fílmicos con fines del proceso.",
  },
  {
    key: "publicStatusCommitment",
    label:
      "Autorizo el uso de mis datos cuando el certificado presente novedades como suspensión, retiro o anulación.",
  },
  {
    key: "authorityInfoCommitment",
    label:
      "Autorizo a CERCOMLAB a suministrar información requerida por autoridad competente.",
  },
  {
    key: "maintenanceCommitment",
    label:
      "Comprendo mis deberes de mantenimiento de la certificación y el derecho a interponer quejas o apelaciones.",
  },
];

const DATA_POLICY_SECTIONS = [
  {
    title: "Responsable del tratamiento",
    content: [
      "CERCOMLAB S.A.S. actúa como responsable del tratamiento de los datos personales recolectados a través de este formulario web de solicitud de evaluación y certificación.",
      "Canales de contacto informados en el formato: info@cercomlab.com, recepcioncercomlab@gmail.com y atención presencial en Carrera 48 No. 76 D Sur - 52 Oficina 305, Sabaneta, Antioquia.",
    ],
  },
  {
    title: "Datos personales que pueden ser recolectados",
    content: [
      "Datos de identificación y contacto: nombre completo, tipo y número de documento, fecha y lugar de nacimiento, dirección, ciudad, departamento, teléfono, celular y correo electrónico.",
      "Datos académicos y laborales: nivel educativo, título, institución, empresa, ocupación, experiencia y documentos soporte del proceso de certificación.",
      "Datos especiales o sensibles que el titular entregue de manera voluntaria para gestionar el servicio, como necesidades especiales, impedimentos físicos, RH, firma y soportes asociados al proceso.",
    ],
  },
  {
    title: "Finalidades del tratamiento",
    content: [
      "Gestionar la solicitud de evaluación, certificación, mantenimiento o renovación presentada por el titular.",
      "Verificar requisitos, soportes, experiencia, formación y demás condiciones aplicables al esquema de certificación solicitado.",
      "Contactar al solicitante para programación, citaciones, validaciones, novedades, resultados, mantenimiento y renovaciones.",
      "Atender consultas, peticiones, quejas, reclamos, requerimientos judiciales o administrativos y obligaciones legales o contractuales.",
      "Llevar trazabilidad, control documental, seguridad de la información, prevención del fraude y mejora continua del servicio.",
      "Realizar estadísticas, auditorías y registros internos vinculados con la operación del proceso de certificación, respetando los principios de necesidad, proporcionalidad y confidencialidad.",
    ],
  },
  {
    title: "Derechos del titular",
    content: [
      "Conocer, actualizar y rectificar sus datos personales frente al responsable del tratamiento.",
      "Solicitar prueba de la autorización otorgada, salvo cuando legalmente no sea requerida.",
      "Ser informado sobre el uso dado a sus datos personales.",
      "Presentar consultas y reclamos, y acudir ante la Superintendencia de Industria y Comercio cuando considere vulnerados sus derechos.",
      "Revocar la autorización y/o solicitar la supresión del dato cuando sea procedente conforme al marco legal colombiano.",
      "Acceder en forma gratuita a sus datos personales que hayan sido objeto de tratamiento.",
    ],
  },
  {
    title: "Seguridad, confidencialidad y vigencia",
    content: [
      "CERCOMLAB S.A.S. adoptará medidas razonables de seguridad administrativa, técnica y organizacional para proteger los datos personales contra acceso no autorizado, pérdida, uso indebido o alteración.",
      "Los datos se conservarán durante el tiempo necesario para cumplir la finalidad del tratamiento, obligaciones legales, contractuales, probatorias o regulatorias asociadas al servicio de certificación.",
      "Esta política deberá ser leída por el titular antes de autorizar el tratamiento en el formulario y podrá actualizarse cuando cambien las condiciones normativas, operativas o del servicio.",
    ],
  },
];

const LEGAL_FRAMEWORK = [
  "Constitución Política de Colombia, artículo 15: reconoce el derecho fundamental al habeas data, a la intimidad personal y familiar, y a conocer, actualizar y rectificar la información recogida en bases de datos.",
  "Ley Estatutaria 1581 de 2012: establece el régimen general de protección de datos personales en Colombia y define principios, derechos de los titulares y obligaciones de responsables y encargados del tratamiento.",
  "Decreto 1377 de 2013: reglamenta parcialmente la Ley 1581 de 2012, especialmente en materia de autorización, aviso de privacidad y procedimientos para el ejercicio de derechos.",
  "Decreto 1074 de 2015, Libro 2, Parte 2, Título 2, Capítulo 25: compila la reglamentación aplicable sobre tratamiento de datos personales en el sector comercio, industria y turismo.",
  "Circulares e instrucciones de la Superintendencia de Industria y Comercio (SIC): desarrollan lineamientos de cumplimiento, protección de datos y, cuando aplique, obligaciones relacionadas con el Registro Nacional de Bases de Datos.",
  "Ley 1266 de 2008: aplica de forma complementaria cuando el tratamiento involucre información financiera, crediticia, comercial, de servicios o proveniente de terceros países; su referencia se incluye como norma especial de habeas data sectorial.",
];

const getTodayLocalDate = () => {
  const today = new Date();
  const timezoneOffset = today.getTimezoneOffset() * 60000;
  return new Date(today.getTime() - timezoneOffset).toISOString().slice(0, 10);
};

const createInitialForm = () => ({
  createdAt: getTodayLocalDate(),
  fullName: "",
  documentType: "CC",
  otherDocumentType: "",
  documentNumber: "",
  birthDate: "",
  birthPlace: "",
  expeditionDate: "",
  expeditionPlace: "",
  address: "",
  residencePlace: "",
  department: "",
  city: "",
  gender: "",
  rh: "",
  phone: "",
  cellphone: "",
  email: "",
  educationLevel: "",
  degreeTitle: "",
  institutionName: "",
  employmentStatus: "",
  companyName: "",
  profession: "",
  experienceValue: "",
  experienceUnit: "MESES",
  experienceMode: "TOTAL_MONTHS",
  experienceYears: "",
  experienceMonths: "",
  hasSpecialNeeds: "",
  specialNeedsDescription: "",
  requestType: "CERTIFICACIÓN",
  selectedScheme: "",
  otherSchemeName: "",
  certificationStudyType: "",
  modality: "",
  attachmentsAcknowledged: false,
  prerequisitesAccepted: false,
  dataPolicyAccepted: false,
  declarations: DECLARATIONS.reduce((accumulator, declaration) => {
    accumulator[declaration.key] = false;
    return accumulator;
  }, {}),
  aspectsAcknowledged: false,
  declarationAcknowledged: false,
});

function Field({ label, error, hint, required = false, maxLength, currentLength, children }) {
  return (
    <label className="field">
      <div className="field__header">
        <span className="field__label">
          {label}
          {required ? <span className="required-mark">*</span> : null}
        </span>
        {maxLength ? (
          <span className="field__counter">
            {currentLength || 0} / {maxLength}
          </span>
        ) : null}
      </div>
      {children}
      {hint ? <span className="field__hint">{hint}</span> : null}
      {error ? <span className="field__error">{error}</span> : null}
    </label>
  );
}

function InfoPage({ title, pill, description, backRoute, children }) {
  return (
    <main className="app-shell">
      <section className="policy-hero">
        <span className="pill">{pill}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="actions-row actions-row--start">
          <a href={backRoute} className="button button--ghost">
            Volver al registro
          </a>
        </div>
      </section>
      <section className="policy-sections">
        {children}
      </section>
    </main>
  );
}

function DataPolicyPage() {
  useEffect(() => {
    try {
      sessionStorage.setItem('policySeen', '1');
      window.dispatchEvent(new Event('policyVisited'));
    } catch (e) { }
  }, []);

  return (
    <InfoPage
      title={<>Política de tratamiento de datos personales de <span className="hero-card__highlight">CERCOMLAB</span></>}
      pill="CERCOMLAB · Política de datos"
      description="Este documento informa al titular cómo pueden ser recolectados, usados, almacenados y protegidos sus datos personales dentro del proceso de evaluación y certificación."
      backRoute={FORM_ROUTE}
    >
      <section className="policy-grid">
        <article className="policy-card">
          <h2>Resumen de la política</h2>
          <p>
            La información solicitada en este formulario se utiliza para
            gestionar solicitudes de certificación, validar requisitos,
            programar evaluaciones, atender obligaciones legales y mantener la
            trazabilidad del servicio prestado por CERCOMLAB S.A.S.
          </p>
          <ul className="compact-list">
            <li>
              <strong>Responsable:</strong> CERCOMLAB S.A.S.
            </li>
            <li>
              <strong>Correos:</strong> info@cercomlab.com y
              recepcioncercomlab@gmail.com
            </li>
            <li>
              <strong>Dirección:</strong> Carrera 48 No. 76 D Sur - 52 Oficina
              305, Sabaneta, Antioquia
            </li>
          </ul>
        </article>

        <article className="policy-card">
          <h2>Marco normativo colombiano aplicable</h2>
          <ul className="check-list">
            {LEGAL_FRAMEWORK.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      {DATA_POLICY_SECTIONS.map((section) => (
        <article key={section.title} className="policy-card">
          <h2>{section.title}</h2>
          <ul className="check-list">
            {section.content.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </InfoPage>
  );
}

function AspectsPage() {
  useEffect(() => {
    try {
      sessionStorage.setItem('aspectsSeen', '1');
      window.dispatchEvent(new Event('aspectsVisited'));
    } catch (e) { }
  }, []);

  return (
    <InfoPage
      title="Aspectos a tener en cuenta"
      pill="CERCOMLAB · Información importante"
      description="Revisa cuidadosamente los siguientes puntos antes de proceder con tu solicitud."
      backRoute={FORM_ROUTE}
    >
      <article className="policy-card">
        <h2>Recomendaciones generales</h2>
        <ul className="check-list">
          <li>1. Asegúrate de presentarse al proceso de certificación con suficiente disponibilidad de tiempo, de manera que este aspecto no afecte las condiciones para presentar a las pruebas.</li>
          <li>2. El proceso de certificación cuenta con un examen teórico y una prueba práctica, cada uno tiene un puntaje de aprobación (Conocimientos 70% - desempeño 80 %).</li>
          <li>3. Se debe desarrollar y superar todo el proceso de evaluación y certificación para poder obtener el certificado.</li>
          <li>4. Si usa lentes, audífonos o prótesis de algún tipo, debe usarlas durante el desarrollo de las pruebas.</li>
          <li>5. Se encuentra prohibido el uso de celulares, tabletas, cámaras u otros objetos durante el proceso de certificación presencial.</li>
          <li>6. El candidato deberá llevar y utilizar sus propios elementos de protección personal requeridos según el esquema de certificación.</li>
        </ul>
      </article>
    </InfoPage>
  );
}

function ConditionsPage() {
  useEffect(() => {
    try {
      sessionStorage.setItem('conditionsSeen', '1');
      window.dispatchEvent(new Event('conditionsVisited'));
    } catch (e) { }
  }, []);

  return (
    <InfoPage
      title="Declaración del solicitante y aceptación de condiciones"
      pill="CERCOMLAB · Términos y condiciones"
      description="Al completar este proceso, aceptas los siguientes compromisos y declaraciones."
      backRoute={FORM_ROUTE}
    >
      <article className="policy-card">
        <h2>Términos del servicio</h2>
        <p>El proceso de evaluación y certificación se rige por las normas vigentes de CERCOMLAB y la normativa nacional colombiana.</p>
        <ul className="check-list">
          {DECLARATIONS.map(d => <li key={d.key}>{d.label}</li>)}
        </ul>
      </article>
    </InfoPage>
  );
}

function App() {
  const [formData, setFormData] = useState(createInitialForm);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [signatureDataUrl, setSignatureDataUrl] = useState("");
  const [submittedRecord, setSubmittedRecord] = useState(null);
  const [route, setRoute] = useState(() => window.location.hash || FORM_ROUTE);
  const [visited, setVisited] = useState(() => {
    try {
      return {
        policy: sessionStorage.getItem('policySeen') === '1',
        aspects: sessionStorage.getItem('aspectsSeen') === '1',
        conditions: sessionStorage.getItem('conditionsSeen') === '1',
      };
    } catch (e) {
      return { policy: false, aspects: false, conditions: false };
    }
  });

  const canvasRef = useRef(null);
  const drawingRef = useRef(false);

  const prepareCanvas = (savedSignature = "") => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ratio = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth || 720;
    const height = 220;
    canvas.width = width * ratio;
    canvas.height = height * ratio;

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.lineWidth = 2.5;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#000000";

    if (savedSignature) {
      const image = new Image();
      image.onload = () => {
        context.drawImage(image, 0, 0, width, height);
      };
      image.src = savedSignature;
    }
  };

  useEffect(() => {
    const syncRoute = () => {
      setRoute(window.location.hash || FORM_ROUTE);
      try {
        setVisited({
          policy: sessionStorage.getItem('policySeen') === '1',
          aspects: sessionStorage.getItem('aspectsSeen') === '1',
          conditions: sessionStorage.getItem('conditionsSeen') === '1',
        });
      } catch (e) { }
    };

    const onPolicyVisited = () => setVisited(v => ({ ...v, policy: true }));
    const onAspectsVisited = () => setVisited(v => ({ ...v, aspects: true }));
    const onConditionsVisited = () => setVisited(v => ({ ...v, conditions: true }));

    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("policyVisited", onPolicyVisited);
    window.addEventListener("aspectsVisited", onAspectsVisited);
    window.addEventListener("conditionsVisited", onConditionsVisited);
    syncRoute();

    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("policyVisited", onPolicyVisited);
      window.removeEventListener("aspectsVisited", onAspectsVisited);
      window.removeEventListener("conditionsVisited", onConditionsVisited);
    };
  }, []);

  useEffect(() => {
    if (currentStep === STEP_TITLES.length - 1) {
      window.requestAnimationFrame(() => {
        prepareCanvas(signatureDataUrl);
      });
    }
  }, [currentStep, signatureDataUrl]);

  const updateField = (name, value) => {
    // Normalize textual input to uppercase except for email fields and selects that use mixed case
    let normalized = value;
    const skipUppercase = ["email", "selectedScheme"];
    if (typeof value === "string" && !skipUppercase.includes(name)) {
      normalized = value.toUpperCase();
    }

    setFormData((previous) => {
      const next = { ...previous, [name]: normalized };

      if (name === "documentType" && normalized !== "OTRO") {
        next.otherDocumentType = "";
      }

      if (name === "employmentStatus" && normalized !== "EMPLEADO") {
        next.companyName = "";
      }

      if (name === "hasSpecialNeeds" && normalized !== "SI") {
        next.specialNeedsDescription = "";
      }

      if (name === "selectedScheme" && normalized !== "OTRO ESQUEMA") {
        next.otherSchemeName = "";
      }

      return next;
    });

    setErrors((previous) => {
      const next = { ...previous };
      delete next[name];
      return next;
    });
  };

  const updateDeclaration = (name, checked) => {
    setFormData((previous) => ({
      ...previous,
      declarations: {
        ...previous.declarations,
        [name]: checked,
      },
    }));

    setErrors((previous) => {
      const next = { ...previous };
      delete next.declarations;
      return next;
    });
  };

  const getCanvasPoint = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return { x: 0, y: 0 };
    }

    const bounds = canvas.getBoundingClientRect();
    return {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };
  };

  const startDrawing = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    event.preventDefault();
    const point = getCanvasPoint(event);
    drawingRef.current = true;
    context.beginPath();
    context.moveTo(point.x, point.y);
    setErrors((previous) => {
      const next = { ...previous };
      delete next.signature;
      return next;
    });
  };

  const draw = (event) => {
    if (!drawingRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    event.preventDefault();
    const point = getCanvasPoint(event);
    context.lineTo(point.x, point.y);
    context.stroke();
  };

  const finishDrawing = () => {
    if (!drawingRef.current) {
      return;
    }

    drawingRef.current = false;
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (context) {
      context.closePath();
    }

    setSignatureDataUrl(canvas.toDataURL("image/png"));
  };

  const clearSignature = () => {
    setSignatureDataUrl("");
    prepareCanvas("");
  };

  const handleSignatureUpload = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSignatureDataUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const collectStepErrors = (stepIndex) => {
    const nextErrors = {};

    if (stepIndex === 0) {
      const requiredFields = {
        createdAt: "Selecciona la fecha de elaboración.",
        fullName: "Ingresa el nombre completo.",
        documentType: "Selecciona el tipo de documento.",
        documentNumber: "Ingresa el número de documento.",
        birthDate: "Selecciona la fecha de nacimiento.",
        birthPlace: "Ingresa el lugar de nacimiento.",
        expeditionDate: "Selecciona la fecha de expedición.",
        expeditionPlace: "Ingresa el lugar de expedición.",
        address: "Ingresa la dirección de residencia.",
        residencePlace: "Ingresa el lugar de residencia.",
        department: "Ingresa el departamento.",
        city: "Ingresa la ciudad.",
        gender: "Selecciona el género.",
        rh: "Ingresa el RH.",
        cellphone: "Ingresa el celular.",
        email: "Ingresa el correo electrónico.",
        educationLevel: "Selecciona el nivel educativo.",
        degreeTitle: "Ingresa el título obtenido.",
        institutionName: "Ingresa la institución.",
      };

      Object.entries(requiredFields).forEach(([fieldName, message]) => {
        if (!String(formData[fieldName] ?? "").trim()) {
          nextErrors[fieldName] = message;
        }
      });

      if (
        formData.documentType === "OTRO" &&
        !formData.otherDocumentType.trim()
      ) {
        nextErrors.otherDocumentType = "Especifica el tipo de documento.";
      }

      if (
        formData.email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        nextErrors.email = "Ingresa un correo electrónico válido.";
      }

      // Validar teléfonos: entre 7 y 15 dígitos (sin contar caracteres no numéricos)
      ["phone", "cellphone"].forEach((f) => {
        const raw = String(formData[f] ?? "").replace(/\D/g, "");
        if (raw && (raw.length < 7 || raw.length > 15)) {
          nextErrors[f] = "Ingresa un número válido (7-15 dígitos).";
        }
      });
    }

    if (stepIndex === 1) {
      const requiredFields = {
        employmentStatus: "Selecciona tu condición laboral.",
        profession: "Ingresa tu profesión, ocupación u oficio.",
        hasSpecialNeeds:
          "Indica si cuentas con impedimentos físicos o necesidades especiales.",
      };

      Object.entries(requiredFields).forEach(([fieldName, message]) => {
        if (!String(formData[fieldName] ?? "").trim()) {
          nextErrors[fieldName] = message;
        }
      });

      // Experiencia: soporte para modo años+meses o meses totales
      if (formData.experienceMode === "TOTAL_MONTHS") {
        if (!String(formData.experienceValue ?? "").trim()) {
          nextErrors.experienceValue = "Indica el tiempo de experiencia.";
        } else if (!/^\d+$/.test(String(formData.experienceValue))) {
          nextErrors.experienceValue = "Ingresa un número válido.";
        }
        if (!String(formData.experienceUnit ?? "").trim()) {
          nextErrors.experienceUnit = "Selecciona la unidad de experiencia.";
        }
      } else {
        const years = parseInt(formData.experienceYears || "0", 10) || 0;
        const months = parseInt(formData.experienceMonths || "0", 10) || 0;
        if (years < 0) nextErrors.experienceYears = "Ingresa años válidos.";
        if (months < 0) nextErrors.experienceMonths = "Ingresa meses válidos.";
        if (years === 0 && months === 0) {
          nextErrors.experienceYears = "Indica el tiempo de experiencia (años o meses).";
        }
      }

      if (
        formData.employmentStatus === "EMPLEADO" &&
        !formData.companyName.trim()
      ) {
        nextErrors.companyName = "Ingresa la empresa donde laboras.";
      }

      if (
        formData.hasSpecialNeeds === "SI" &&
        !formData.specialNeedsDescription.trim()
      ) {
        nextErrors.specialNeedsDescription =
          "Describe la necesidad o impedimento.";
      }
    }

    if (stepIndex === 2) {
      if (!formData.requestType.trim()) {
        nextErrors.requestType = "Selecciona el tipo de solicitud.";
      }

      if (!formData.selectedScheme.trim()) {
        nextErrors.selectedScheme = "Selecciona el esquema de certificación.";
      }

      if (
        formData.selectedScheme === "OTRO ESQUEMA" &&
        !formData.otherSchemeName.trim()
      ) {
        nextErrors.otherSchemeName = "Describe el esquema solicitado.";
      }

      if (
        formData.requestType === "CERTIFICACIÓN" &&
        !formData.certificationStudyType.trim()
      ) {
        nextErrors.certificationStudyType = "Selecciona el tipo de certificado.";
      }
    }

    if (stepIndex === 3) {
      if (!formData.modality.trim()) {
        nextErrors.modality = "Selecciona la modalidad de evaluación.";
      }

      if (!formData.attachmentsAcknowledged) {
        nextErrors.attachmentsAcknowledged =
          "Confirma que cuentas con los soportes o que los entregarás.";
      }

      if (!formData.prerequisitesAccepted) {
        nextErrors.prerequisitesAccepted =
          "Debes confirmar que conoces los prerrequisitos.";
      }

      if (!formData.dataPolicyAccepted) {
        nextErrors.dataPolicyAccepted =
          "Debes autorizar el tratamiento de datos personales para continuar.";
      } else if (!visited.policy) {
        nextErrors.dataPolicyAccepted =
          "Debes abrir y leer la política de tratamiento de datos antes de aceptarla.";
      }

      if (!formData.aspectsAcknowledged) {
        nextErrors.aspectsAcknowledged = "Debes confirmar que leíste los aspectos a tener en cuenta.";
      } else if (!visited.aspects) {
        nextErrors.aspectsAcknowledged = "Debes abrir y leer los aspectos a tener en cuenta antes de aceptarlos.";
      }
    }

    if (stepIndex === 4) {
      if (!formData.declarationAcknowledged) {
        nextErrors.declarationAcknowledged = "Debes confirmar que leíste la declaración del solicitante.";
      } else if (!visited.conditions) {
        nextErrors.declarationAcknowledged = "Debes abrir y leer la declaración del solicitante antes de aceptarla.";
      }

      const declarationsAccepted = Object.values(formData.declarations).every(
        Boolean,
      );
      if (!declarationsAccepted) {
        nextErrors.declarations =
          "Debes aceptar todas las declaraciones para finalizar.";
      }

      if (!signatureDataUrl) {
        nextErrors.signature =
          "La firma es obligatoria para completar el registro.";
      }
    }

    return nextErrors;
  };

  const validateCurrentStep = (stepIndex = currentStep) => {
    const nextErrors = collectStepErrors(stepIndex);
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }

    setCurrentStep((previous) =>
      Math.min(previous + 1, STEP_TITLES.length - 1),
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentStep((previous) => Math.max(previous - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateCurrentStep(STEP_TITLES.length - 1)) {
      return;
    }

    const payload = { ...formData };
    if (formData.experienceMode === "YEARS_MONTHS") {
      const years = Number(formData.experienceYears) || 0;
      const months = Number(formData.experienceMonths) || 0;
      const totalMonths = years * 12 + months;
      payload.experienceValue = String(totalMonths);
      payload.experienceUnit = "MESES";
    }

    setSubmittedRecord({
      ...payload,
      signatureDataUrl,
      submittedAt: new Date().toISOString(),
    });
  };

  const resetForm = () => {
    setFormData(createInitialForm());
    setCurrentStep(0);
    setErrors({});
    setSignatureDataUrl("");
    setSubmittedRecord(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeRequirements =
    REQUIREMENTS_BY_REQUEST[formData.requestType] ?? [];
  const progress = ((currentStep + 1) / STEP_TITLES.length) * 100;
  const isPolicyPage = route === DATA_POLICY_ROUTE;
  const selectedDocumentLabel =
    formData.documentType === "OTRO" && formData.otherDocumentType
      ? formData.otherDocumentType
      : formData.documentType;
  const selectedSchemeLabel =
    formData.selectedScheme === "OTRO ESQUEMA" && formData.otherSchemeName
      ? formData.otherSchemeName
      : formData.selectedScheme;

  if (isPolicyPage) return <DataPolicyPage />;
  if (route === ASPECTS_ROUTE) return <AspectsPage />;
  if (route === CONDITIONS_ROUTE) return <ConditionsPage />;

  if (submittedRecord) {
    return (
      <main className="app-shell">
        <section className="confirmation-card">
          <span className="pill pill--success">Registro completado</span>
          <h1>La solicitud quedó lista para integrarse con tu backend.</h1>
          <p>
            Capturamos la información del solicitante, las declaraciones y la
            firma digital en un flujo paso a paso.
          </p>

          <div className="confirmation-grid">
            <article className="summary-card">
              <h2>Resumen del solicitante</h2>
              <dl className="summary-list">
                <div>
                  <dt>Nombre</dt>
                  <dd>{submittedRecord.fullName}</dd>
                </div>
                <div>
                  <dt>Documento</dt>
                  <dd>
                    {selectedDocumentLabel} - {submittedRecord.documentNumber}
                  </dd>
                </div>
                <div>
                  <dt>Correo</dt>
                  <dd>{submittedRecord.email}</dd>
                </div>
                <div>
                  <dt>Solicitud</dt>
                  <dd>{submittedRecord.requestType}</dd>
                </div>
                <div>
                  <dt>Esquema</dt>
                  <dd>{selectedSchemeLabel}</dd>
                </div>
                <div>
                  <dt>Modalidad</dt>
                  <dd>{submittedRecord.modality}</dd>
                </div>
              </dl>
            </article>

            <article className="summary-card">
              <h2>Firma registrada</h2>
              <div className="signature-preview">
                <img
                  src={submittedRecord.signatureDataUrl}
                  alt="Firma del solicitante"
                />
              </div>
              <p className="muted">
                Puedes conectar este payload a la base de datos o API
                corporativa cuando lo necesites.
              </p>
            </article>
          </div>

          <div className="actions-row actions-row--start">
            <button
              type="button"
              className="button button--primary"
              onClick={resetForm}
            >
              Crear una nueva solicitud
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <section className="hero-card">
        <div className="hero-card__content">
          <span className="pill">CERCOMLAB · Registro web</span>
          <h1>
            <span className="hero-card__highlight">CERCOMLAB</span> · Evaluación
            y certificación de competencias laborales
          </h1>
          <p>
            Plataforma de registro para procesos de certificación. Diligencia tu
            solicitud paso a paso, valida tus datos y finaliza con tu firma de
            manera clara, confiable e intuitiva.
          </p>

          <div className="hero-card__tags" aria-label="Servicios destacados">
            <span>Certificaciones</span>
            <span>Evaluación</span>
            <span>Registro guiado</span>
          </div>
        </div>

        <div className="hero-card__visual" aria-hidden="true">
          <div className="hero-illustration">
            <div className="hero-illustration__badge">
              <span className="hero-illustration__icon">✓</span>
              <div>
                <strong>CERCOMLAB</strong>
                <span>Organismo de certificación</span>
              </div>
            </div>

            <div className="hero-illustration__seal">
              <span>Certifica</span>
              <strong>Competencias</strong>
            </div>

            <div className="hero-card__meta">
              <div>
                <strong>{currentStep + 1}</strong>
                <span>Paso actual</span>
              </div>
              <div>
                <strong>{STEP_TITLES.length}</strong>
                <span>Pasos guiados</span>
              </div>
              <div>
                <strong>{Math.round(progress)}%</strong>
                <span>Completado</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="progress-card">
        <div className="progress-card__header">
          <div>
            <span className="eyebrow">Progreso</span>
            <h2>
              Paso {currentStep + 1}: {STEP_TITLES[currentStep]}
            </h2>
          </div>
          <span className="progress-card__value">{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar" aria-hidden="true">
          <span style={{ width: `${progress}%` }}></span>
        </div>
      </section>

      <div className="content-grid">
        <aside className="steps-panel">
          <ol className="step-list">
            {STEP_TITLES.map((title, index) => (
              <li
                key={title}
                className={[
                  "step-list__item",
                  index === currentStep ? "is-active" : "",
                  index < currentStep ? "is-complete" : "",
                  index <= currentStep ? "is-clickable" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => {
                  if (index <= currentStep) {
                    setCurrentStep(index);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && index <= currentStep) {
                    setCurrentStep(index);
                  }
                }}
                tabIndex={index <= currentStep ? 0 : -1}
                role="button"
                aria-disabled={index > currentStep}
              >
                <span className="step-list__number">{index + 1}</span>
                <div>
                  <strong>{title}</strong>
                  <small>
                    {index < currentStep
                      ? "Listo"
                      : index === currentStep
                        ? "En curso"
                        : "Pendiente"}
                  </small>
                </div>
              </li>
            ))}
          </ol>

          <article className="info-card">
            <h3>Resumen rápido</h3>
            <ul className="compact-list">
              <li>
                <strong>Solicitante:</strong>{" "}
                {formData.fullName || "Sin diligenciar"}
              </li>
              <li>
                <strong>Documento:</strong>{" "}
                {formData.documentNumber
                  ? `${selectedDocumentLabel} - ${formData.documentNumber}`
                  : "Sin diligenciar"}
              </li>
              <li>
                <strong>Solicitud:</strong>{" "}
                {formData.requestType || "Sin seleccionar"}
              </li>
              <li>
                <strong>Esquema:</strong>{" "}
                {selectedSchemeLabel || "Sin seleccionar"}
              </li>
            </ul>
          </article>
        </aside>

        <form className="form-card" onSubmit={handleSubmit}>
          {currentStep === 0 ? (
            <section className="section-stack">
              <header className="section-header">
                <div>
                  <span className="eyebrow">Paso 1</span>
                  <h2>Datos personales del solicitante</h2>
                </div>
                <p>
                  Empecemos con la información básica para identificar al
                  candidato y sus datos de contacto.
                </p>
              </header>

              <div className="form-grid form-grid--two">
                <Field
                  label="Fecha de elaboración"
                  error={errors.createdAt}
                  required
                >
                  <input
                    type="date"
                    value={formData.createdAt}
                    disabled
                    readOnly
                  />
                </Field>

                <Field
                  label="Nombre completo"
                  error={errors.fullName}
                  hint="Tal como aparece en tu documento de identidad."
                  required
                  maxLength={100}
                  currentLength={formData.fullName.length}
                >
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(event) =>
                      updateField("fullName", event.target.value)
                    }
                    maxLength={100}
                    placeholder="Ej. Ana María Pérez Gómez"
                  />
                </Field>
              </div>

              <div className="form-grid form-grid--three">
                <Field
                  label="Tipo de documento"
                  error={errors.documentType}
                  required
                >
                  <select
                    value={formData.documentType}
                    onChange={(event) =>
                      updateField("documentType", event.target.value)
                    }
                  >
                    {DOCUMENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Número de documento"
                  error={errors.documentNumber}
                  required
                  maxLength={20}
                  currentLength={formData.documentNumber.length}
                >
                  <input
                    type="text"
                    value={formData.documentNumber}
                    onChange={(event) =>
                      updateField("documentNumber", event.target.value)
                    }
                    maxLength={20}
                    placeholder="Ej. 1234567890"
                  />
                </Field>

                <Field
                  label="¿Cuál?"
                  error={errors.otherDocumentType}
                  required={formData.documentType === "OTRO"}
                  maxLength={50}
                  currentLength={formData.otherDocumentType.length}
                >
                  <input
                    type="text"
                    value={formData.otherDocumentType}
                    onChange={(event) =>
                      updateField("otherDocumentType", event.target.value)
                    }
                    maxLength={50}
                    placeholder="Especifica el tipo"
                    disabled={formData.documentType !== "OTRO"}
                  />
                </Field>
              </div>

              <div className="form-grid form-grid--two">
                <Field
                  label="Fecha de nacimiento"
                  error={errors.birthDate}
                  required
                >
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(event) =>
                      updateField("birthDate", event.target.value)
                    }
                  />
                </Field>

                <Field
                  label="Lugar de nacimiento"
                  error={errors.birthPlace}
                  required
                  maxLength={100}
                  currentLength={formData.birthPlace.length}
                >
                  <input
                    type="text"
                    value={formData.birthPlace}
                    onChange={(event) =>
                      updateField("birthPlace", event.target.value)
                    }
                    maxLength={100}
                    placeholder="Ciudad / municipio"
                  />
                </Field>
              </div>

              <div className="form-grid form-grid--two">
                <Field
                  label="Fecha de expedición"
                  error={errors.expeditionDate}
                  required
                >
                  <input
                    type="date"
                    value={formData.expeditionDate}
                    onChange={(event) =>
                      updateField("expeditionDate", event.target.value)
                    }
                  />
                </Field>

                <Field
                  label="Lugar de expedición"
                  error={errors.expeditionPlace}
                  required
                  maxLength={100}
                  currentLength={formData.expeditionPlace.length}
                >
                  <input
                    type="text"
                    value={formData.expeditionPlace}
                    onChange={(event) =>
                      updateField("expeditionPlace", event.target.value)
                    }
                    maxLength={100}
                    placeholder="Ciudad / municipio"
                  />
                </Field>
              </div>

              <Field
                label="Dirección de residencia"
                error={errors.address}
                required
                maxLength={200}
                currentLength={formData.address.length}
              >
                <input
                  type="text"
                  value={formData.address}
                  onChange={(event) =>
                    updateField("address", event.target.value)
                  }
                  maxLength={200}
                  placeholder="Ej. Carrera 00 # 00 - 00"
                />
              </Field>

              <div className="form-grid form-grid--three">
                <Field
                  label="Lugar de residencia"
                  error={errors.residencePlace}
                  required
                  maxLength={100}
                  currentLength={formData.residencePlace.length}
                >
                  <input
                    type="text"
                    value={formData.residencePlace}
                    onChange={(event) =>
                      updateField("residencePlace", event.target.value)
                    }
                    maxLength={100}
                    placeholder="Barrio, vereda o sector"
                  />
                </Field>

                <Field label="Departamento" error={errors.department} required maxLength={50} currentLength={formData.department.length}>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(event) =>
                      updateField("department", event.target.value)
                    }
                    maxLength={50}
                    placeholder="Ej. Antioquia"
                  />
                </Field>

                <Field label="Ciudad" error={errors.city} required maxLength={50} currentLength={formData.city.length}>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(event) =>
                      updateField("city", event.target.value)
                    }
                    maxLength={50}
                    placeholder="Ej. Medellín"
                  />
                </Field>
              </div>

              <div className="form-grid form-grid--three">
                <Field label="Género" error={errors.gender} required>
                  <select
                    value={formData.gender}
                    onChange={(event) =>
                      updateField("gender", event.target.value)
                    }
                  >
                    <option value="">Selecciona</option>
                    {GENDERS.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="RH" error={errors.rh} required maxLength={3} currentLength={formData.rh.length}>
                  <input
                    type="text"
                    value={formData.rh}
                    onChange={(event) =>
                      updateField("rh", event.target.value.toUpperCase())
                    }
                    maxLength={3}
                    placeholder="Ej. O+"
                  />
                </Field>

                <Field label="Teléfono fijo (opcional)" maxLength={10} currentLength={formData.phone.length}>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(event) =>
                      updateField("phone", event.target.value)
                    }
                    maxLength={10}
                    placeholder="Ej. 6040000000"
                  />
                </Field>
              </div>

              <div className="form-grid form-grid--two">
                <Field label="Celular" error={errors.cellphone} required maxLength={10} currentLength={formData.cellphone.length}>
                  <input
                    type="text"
                    value={formData.cellphone}
                    onChange={(event) =>
                      updateField("cellphone", event.target.value)
                    }
                    maxLength={10}
                    placeholder="Ej. 3001234567"
                  />
                </Field>

                <Field label="Correo electrónico" error={errors.email} required maxLength={100} currentLength={formData.email.length}>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    maxLength={100}
                    placeholder="nombre@correo.com"
                  />
                </Field>
              </div>

              <div className="form-grid form-grid--three">
                <Field
                  label="Nivel educativo"
                  error={errors.educationLevel}
                  required
                >
                  <select
                    value={formData.educationLevel}
                    onChange={(event) =>
                      updateField("educationLevel", event.target.value)
                    }
                  >
                    <option value="">Selecciona</option>
                    {EDUCATION_LEVELS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Título obtenido"
                  error={errors.degreeTitle}
                  required
                  maxLength={100}
                  currentLength={formData.degreeTitle.length}
                >
                  <input
                    type="text"
                    value={formData.degreeTitle}
                    onChange={(event) =>
                      updateField("degreeTitle", event.target.value)
                    }
                    maxLength={100}
                    placeholder="Ej. Técnico laboral"
                  />
                </Field>

                <Field
                  label="Institución"
                  error={errors.institutionName}
                  required
                  maxLength={100}
                  currentLength={formData.institutionName.length}
                >
                  <input
                    type="text"
                    value={formData.institutionName}
                    onChange={(event) =>
                      updateField("institutionName", event.target.value)
                    }
                    maxLength={100}
                    placeholder="Nombre de la institución"
                  />
                </Field>
              </div>
            </section>
          ) : null}

          {currentStep === 1 ? (
            <section className="section-stack">
              <header className="section-header">
                <div>
                  <span className="eyebrow">Paso 2</span>
                  <h2>Datos laborales</h2>
                </div>
                <p>
                  Ahora cuéntanos sobre tu situación laboral actual y tu
                  experiencia relacionada con la competencia a certificar.
                </p>
              </header>

              <span className="choice-block__label">
                Condición laboral actual{" "}
                <span className="required-mark">*</span>
              </span>
              <div className="choice-grid">
                {EMPLOYMENT_STATUSES.map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`choice-card ${formData.employmentStatus === status ? "is-selected" : ""}`}
                    onClick={() => updateField("employmentStatus", status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
              {errors.employmentStatus ? (
                <p className="section-error">{errors.employmentStatus}</p>
              ) : null}

              <div className="form-grid form-grid--two">
                <Field
                  label="Empresa donde labora"
                  error={errors.companyName}
                  hint="Obligatorio si tu condición laboral actual es empleado."
                  required={formData.employmentStatus === "EMPLEADO"}
                  maxLength={100}
                  currentLength={formData.companyName.length}
                >
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(event) =>
                      updateField("companyName", event.target.value)
                    }
                    maxLength={100}
                    placeholder="Nombre de la empresa"
                    disabled={formData.employmentStatus !== "EMPLEADO"}
                  />
                </Field>

                <Field
                  label="Profesión, ocupación u oficio"
                  error={errors.profession}
                  required
                  maxLength={100}
                  currentLength={formData.profession.length}
                >
                  <input
                    type="text"
                    value={formData.profession}
                    onChange={(event) =>
                      updateField("profession", event.target.value)
                    }
                    maxLength={100}
                    placeholder="Ej. Operador montacargas"
                  />
                </Field>
              </div>

              <div className="form-grid form-grid--two">
                <div style={{ gridColumn: "1 / -1" }}>
                  <Field label="Formato de experiencia" hint="Puedes ingresar años y meses o meses totales.">
                    <div className="choice-grid choice-grid--small">
                      <label className={`choice-card ${formData.experienceMode === 'TOTAL_MONTHS' ? 'is-selected' : ''}`}>
                        <input type="radio" name="experienceMode" value="TOTAL_MONTHS" checked={formData.experienceMode === 'TOTAL_MONTHS'} onChange={(e) => updateField('experienceMode', e.target.value)} style={{ display: 'none' }} />
                        Años o meses
                      </label>
                      <label className={`choice-card ${formData.experienceMode === 'YEARS_MONTHS' ? 'is-selected' : ''}`}>
                        <input type="radio" name="experienceMode" value="YEARS_MONTHS" checked={formData.experienceMode === 'YEARS_MONTHS'} onChange={(e) => updateField('experienceMode', e.target.value)} style={{ display: 'none' }} />
                        Años y meses
                      </label>
                    </div>
                  </Field>
                </div>

                {formData.experienceMode === 'TOTAL_MONTHS' ? (
                  <>
                    <Field label="Unidad" error={errors.experienceUnit} required>
                      <select
                        value={formData.experienceUnit}
                        onChange={(event) =>
                          updateField("experienceUnit", event.target.value)
                        }
                      >
                        {EXPERIENCE_UNITS.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field
                      label="Tiempo de experiencia"
                      error={errors.experienceValue}
                      hint="Relacionada con la competencia que deseas certificar."
                      required
                    >
                      <input
                        type="number"
                        min="0"
                        value={formData.experienceValue}
                        onChange={(event) =>
                          updateField("experienceValue", event.target.value)
                        }
                        placeholder="Ej. 12"
                      />
                    </Field>
                  </>
                ) : (
                  <>
                    <Field label="Años" error={errors.experienceYears} required>
                      <input
                        type="number"
                        min="0"
                        value={formData.experienceYears}
                        onChange={(event) =>
                          updateField("experienceYears", event.target.value)
                        }
                        placeholder="Ej. 2"
                      />
                    </Field>

                    <Field label="Meses" error={errors.experienceMonths} required>
                      <input
                        type="number"
                        min="0"
                        value={formData.experienceMonths}
                        onChange={(event) =>
                          updateField("experienceMonths", event.target.value)
                        }
                        placeholder="Ej. 6"
                      />
                    </Field>
                  </>
                )}
              </div>

              <div className="choice-block">
                <span className="choice-block__label">
                  ¿Cuentas con impedimentos físicos o necesidades especiales?
                  <span className="required-mark">*</span>
                </span>
                <div className="choice-grid choice-grid--small">
                  {["SI", "NO"].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={`choice-card ${formData.hasSpecialNeeds === value ? "is-selected" : ""}`}
                      onClick={() => updateField("hasSpecialNeeds", value)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                {errors.hasSpecialNeeds ? (
                  <p className="section-error">{errors.hasSpecialNeeds}</p>
                ) : null}
              </div>

              <Field
                label="¿Cuál?"
                error={errors.specialNeedsDescription}
                hint="Indícalo solo si marcaste “Sí”."
                required={formData.hasSpecialNeeds === "SI"}
                maxLength={500}
                currentLength={formData.specialNeedsDescription.length}
              >
                <textarea
                  value={formData.specialNeedsDescription}
                  onChange={(event) =>
                    updateField("specialNeedsDescription", event.target.value)
                  }
                  maxLength={500}
                  placeholder="Describe la necesidad especial o el impedimento físico"
                  disabled={formData.hasSpecialNeeds !== "SI"}
                  rows="4"
                />
              </Field>
            </section>
          ) : null}

          {currentStep === 2 ? (
            <section className="section-stack">
              <header className="section-header">
                <div>
                  <span className="eyebrow">Paso 3</span>
                  <h2>Tipo de solicitud y esquema</h2>
                </div>
                <p>
                  Selecciona el trámite que vas a realizar y el esquema o norma
                  sectorial en la que deseas certificarte.
                </p>
              </header>

              <span className="choice-block__label">
                Tipo de solicitud <span className="required-mark">*</span>
              </span>
              <div className="choice-grid">
                {REQUEST_TYPES.map((requestType) => (
                  <button
                    key={requestType}
                    type="button"
                    className={`choice-card ${formData.requestType === requestType ? "is-selected" : ""}`}
                    onClick={() => updateField("requestType", requestType)}
                  >
                    {requestType}
                  </button>
                ))}
              </div>
              {errors.requestType ? (
                <p className="section-error">{errors.requestType}</p>
              ) : null}

              <Field
                label="Esquema de certificación"
                error={errors.selectedScheme}
                required
              >
                <select
                  value={formData.selectedScheme}
                  onChange={(event) =>
                    updateField("selectedScheme", event.target.value)
                  }
                >
                  <option value="">Selecciona un esquema</option>
                  {CERTIFICATION_SCHEMES.map((scheme) => (
                    <option key={scheme} value={scheme}>
                      {scheme}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Otro esquema"
                error={errors.otherSchemeName}
                required={formData.selectedScheme === "OTRO ESQUEMA"}
                maxLength={200}
                currentLength={formData.otherSchemeName.length}
              >
                <input
                  type="text"
                  value={formData.otherSchemeName}
                  onChange={(event) =>
                    updateField("otherSchemeName", event.target.value)
                  }
                  maxLength={200}
                  placeholder="Describe el esquema solicitado"
                  disabled={formData.selectedScheme !== "OTRO ESQUEMA"}
                />
              </Field>

              <article className="info-card">
                <h3>¿Qué debes preparar para este tipo de solicitud?</h3>
                <ul className="check-list">
                  {activeRequirements.map((requirement, idx) => (
                    <li key={`${requirement}-${idx}`}>{idx + 1}. {requirement}</li>
                  ))}
                </ul>

                <br />

                {formData.requestType === "CERTIFICACIÓN" ? (
                  <div style={{ marginTop: 12 }}>
                    <strong>
                      Tipo de certificado de estudio <span className="required-mark">*</span>
                    </strong>
                    <div className="choice-grid choice-grid--long" style={{ marginTop: 8 }}>
                      <label className={`choice-card ${formData.certificationStudyType === 'GENERAL' ? 'is-selected' : ''}`}>
                        <input type="radio" name="certificationStudyType" value="GENERAL" checked={formData.certificationStudyType === 'GENERAL'} onChange={(e) => updateField('certificationStudyType', e.target.value)} style={{ display: 'none' }} />
                        Certificado de estudio general
                      </label>
                      <label className={`choice-card ${formData.certificationStudyType === 'RELACIONADO' ? 'is-selected' : ''}`}>
                        <input type="radio" name="certificationStudyType" value="RELACIONADO" checked={formData.certificationStudyType === 'RELACIONADO'} onChange={(e) => updateField('certificationStudyType', e.target.value)} style={{ display: 'none' }} />
                        Certificado propio relacionado con el esquema
                      </label>
                    </div>
                    {errors.certificationStudyType ? (
                      <p className="section-error">{errors.certificationStudyType}</p>
                    ) : null}
                  </div>
                ) : null}
              </article>
            </section>
          ) : null}

          {currentStep === 3 ? (
            <section className="section-stack">
              <header className="section-header">
                <div>
                  <span className="eyebrow">Paso 4</span>
                  <h2>Requisitos y modalidad de evaluación</h2>
                </div>
                <p>
                  Antes de firmar, confirma que conoces los soportes del proceso
                  y define la modalidad en la que tomarás la evaluación.
                </p>
              </header>

              <span className="choice-block__label">
                Modalidad de evaluación <span className="required-mark">*</span>
              </span>
              <div className="choice-grid">
                {EVALUATION_MODALITIES.map((modality) => (
                  <button
                    key={modality}
                    type="button"
                    className={`choice-card ${formData.modality === modality ? "is-selected" : ""}`}
                    onClick={() => updateField("modality", modality)}
                  >
                    {modality}
                  </button>
                ))}
              </div>
              {errors.modality ? (
                <p className="section-error">{errors.modality}</p>
              ) : null}

              <article className="info-card">
                <h3>Checklist de soportes</h3>
                <ul className="check-list">
                  <li>1. Copia del documento de identidad.</li>
                  <li>2. Solicitud de registro diligenciada.</li>
                  <li>3. Cartas laborales relacionadas con el esquema.</li>
                  <li>4. Certificados de estudio o formación específica.</li>
                  <li>5. Foto digital fondo blanco cuando aplique.</li>
                  <li>6. Otros certificados o soportes según el esquema.</li>
                </ul>
              </article>

              <div className="checkbox-stack">
                <label className="checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.attachmentsAcknowledged}
                    onChange={(event) =>
                      updateField(
                        "attachmentsAcknowledged",
                        event.target.checked,
                      )
                    }
                  />
                  <span>
                    Confirmo que cuento con estos soportes o que los entregaré
                    conforme al proceso.{" "}
                    <span className="required-mark">*</span>
                  </span>
                </label>
                {errors.attachmentsAcknowledged ? (
                  <p className="section-error">
                    {errors.attachmentsAcknowledged}
                  </p>
                ) : null}

                <label className="checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.prerequisitesAccepted}
                    onChange={(event) =>
                      updateField("prerequisitesAccepted", event.target.checked)
                    }
                  />
                  <span>
                    Entiendo que el proceso puede suspenderse si no cumplo los
                    prerrequisitos mínimos para presentar las pruebas.{" "}
                    <span className="required-mark">*</span>
                  </span>
                </label>
                {errors.prerequisitesAccepted ? (
                  <p className="section-error">
                    {errors.prerequisitesAccepted}
                  </p>
                ) : null}

                <label className="checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.dataPolicyAccepted}
                    disabled={!visited.policy}
                    onChange={(event) =>
                      updateField("dataPolicyAccepted", event.target.checked)
                    }
                  />
                  <span>
                    Autorizo el tratamiento confidencial de mis datos personales
                    según la política de CERCOMLAB.{" "}
                    {!visited.policy && <small>(Abre la política para habilitar)</small>}{" "}
                    <span className="required-mark">*</span>
                  </span>
                </label>
                {errors.dataPolicyAccepted ? (
                  <p className="section-error">{errors.dataPolicyAccepted}</p>
                ) : null}

                <label className="checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.aspectsAcknowledged}
                    disabled={!visited.aspects}
                    onChange={(event) =>
                      updateField("aspectsAcknowledged", event.target.checked)
                    }
                  />
                  <span>
                    He leído y acepto los aspectos a tener en cuenta.{" "}
                    {!visited.aspects && <small>(Abre los aspectos para habilitar)</small>}{" "}
                    <span className="required-mark">*</span>
                  </span>
                </label>
                {errors.aspectsAcknowledged ? (
                  <p className="section-error">{errors.aspectsAcknowledged}</p>
                ) : null}
              </div>

              <article className="policy-link-card">
                <strong>Información necesaria</strong>
                <p>
                  Antes de continuar, es obligatorio que leas los aspectos a
                  tener en cuenta y la política de tratamiento de datos.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                  <a href={ASPECTS_ROUTE} rel="noopener noreferrer" className="policy-link">
                    Abrir Aspectos a tener en cuenta
                  </a>
                  <a href={DATA_POLICY_ROUTE} rel="noopener noreferrer" className="policy-link">
                    Abrir Política de tratamiento de datos
                  </a>
                </div>
              </article>
            </section>
          ) : null}

          {currentStep === 4 ? (
            <section className="section-stack">
              <header className="section-header">
                <div>
                  <span className="eyebrow">Paso 5</span>
                  <h2>Declaración del solicitante y firma</h2>
                </div>
                <p>
                  Revisa las condiciones finales, acepta las declaraciones y
                  firma en el recuadro para completar la solicitud.
                </p>
              </header>

              <div className="checkbox-stack">
                <label className="checkbox-card">
                  <input
                    type="checkbox"
                    checked={formData.declarationAcknowledged}
                    disabled={!visited.conditions}
                    onChange={(event) =>
                      updateField("declarationAcknowledged", event.target.checked)
                    }
                  />
                  <span>
                    He leído y acepto la declaración del solicitante y aceptación de condiciones.{" "}
                    {!visited.conditions && <small>(Abre la declaración para habilitar)</small>}{" "}
                    <span className="required-mark">*</span>
                  </span>
                </label>
                {errors.declarationAcknowledged ? (
                  <p className="section-error">{errors.declarationAcknowledged}</p>
                ) : null}

                <article className="policy-link-card" style={{ marginBottom: 16 }}>
                  <strong>Lectura obligatoria</strong>
                  <p>Es necesario que abras y leas la declaración antes de marcar la aceptación.</p>
                  <a href={CONDITIONS_ROUTE} className="policy-link">
                    Abrir declaración del solicitante
                  </a>
                </article>

                {DECLARATIONS.map((declaration) => (
                  <label key={declaration.key} className="checkbox-card">
                    <input
                      type="checkbox"
                      checked={formData.declarations[declaration.key]}
                      disabled={!visited.conditions}
                      onChange={(event) =>
                        updateDeclaration(declaration.key, event.target.checked)
                      }
                    />
                    <span>
                      {declaration.label}{" "}
                      {!visited.conditions && <small>(Abre la declaración para habilitar)</small>}{" "}
                      <span className="required-mark">*</span>
                    </span>
                  </label>
                ))}
              </div>
              {errors.declarations ? (
                <p className="section-error">{errors.declarations}</p>
              ) : null}

              <article className="signature-card">
                <div className="signature-card__header">
                  <div>
                    <h3>
                      Firma del solicitante{" "}
                      <span className="required-mark">*</span>
                    </h3>
                    <p>
                      Firma con mouse, lápiz digital o toque sobre la pantalla.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <label className="button button--ghost" style={{ position: 'relative', overflow: 'hidden' }}>
                      Adjuntar firma
                      <input type="file" accept="image/*" onChange={handleSignatureUpload} style={{ position: 'absolute', left: 0, top: 0, opacity: 0, width: '100%', height: '100%' }} />
                    </label>
                    <button
                      type="button"
                      className="button button--ghost"
                      onClick={clearSignature}
                    >
                      Limpiar
                    </button>
                  </div>
                </div>

                <div className="signature-box">
                  <canvas
                    ref={canvasRef}
                    className="signature-canvas"
                    onPointerDown={startDrawing}
                    onPointerMove={draw}
                    onPointerUp={finishDrawing}
                    onPointerLeave={finishDrawing}
                    onPointerCancel={finishDrawing}
                  />
                </div>
                {errors.signature ? (
                  <p className="section-error">{errors.signature}</p>
                ) : null}
              </article>

              <article className="info-card">
                <h3>Datos que quedarán asociados a la firma</h3>
                <ul className="compact-list">
                  <li>
                    <strong>Nombre:</strong>{" "}
                    {formData.fullName || "Sin diligenciar"}
                  </li>
                  <li>
                    <strong>Documento:</strong>{" "}
                    {formData.documentNumber
                      ? `${selectedDocumentLabel} - ${formData.documentNumber}`
                      : "Sin diligenciar"}
                  </li>
                  <li>
                    <strong>Modalidad:</strong>{" "}
                    {formData.modality || "Sin seleccionar"}
                  </li>
                </ul>
              </article>
            </section>
          ) : null}

          <footer className="actions-row">
            <button
              type="button"
              className="button button--ghost"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Anterior
            </button>

            {currentStep < STEP_TITLES.length - 1 ? (
              <button
                type="button"
                className="button button--primary"
                onClick={handleNext}
              >
                Continuar
              </button>
            ) : (
              <button type="submit" className="button button--primary">
                Finalizar registro
              </button>
            )}
          </footer>
        </form>
      </div>
    </main>
  );
}

export default App;

