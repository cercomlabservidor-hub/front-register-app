import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const startInteractiveGuide = (currentStep) => {
  const driverObj = driver({
    showProgress: true,
    steps: getStepsForStep(currentStep),
    nextBtnText: 'Siguiente',
    prevBtnText: 'Anterior',
    doneBtnText: 'Entendido',
  });

  driverObj.drive();
};

const getStepsForStep = (step) => {
  const baseSteps = [];

  // Only show the progress indicator help on the first step
  if (step === 0) {
    baseSteps.push({
      element: '#step-indicator',
      popover: {
        title: 'Progreso del registro',
        description: 'Aquí puedes ver en qué etapa del proceso te encuentras. Son 5 pasos en total.',
        side: "bottom",
        align: 'start'
      }
    });
  }

  switch (step) {
    case 0:
      return [
        ...baseSteps,
        {
          element: '#personal-data-section',
          popover: {
            title: 'Datos Personales',
            description: 'Completa tu información básica. Asegúrate de que coincida con tu documento de identidad.',
            side: "top",
            align: 'start'
          }
        },
        {
          element: '#btn-next',
          popover: {
            title: 'Continuar',
            description: 'Cuando termines, haz clic aquí para ir al siguiente paso.',
            side: "top",
            align: 'end'
          }
        }
      ];
    case 1:
      return [
        ...baseSteps,
        {
          element: '#work-profile-section',
          popover: {
            title: 'Perfil Laboral',
            description: 'Indica tu situación laboral actual y tu experiencia relevante.',
            side: "top",
            align: 'start'
          }
        },
        {
          element: '#btn-next',
          popover: {
            title: 'Continuar',
            description: 'Haz clic aquí para avanzar al siguiente paso.',
            side: "top",
            align: 'end'
          }
        }
      ];
    case 2:
      return [
        ...baseSteps,
        {
          element: '#scheme-section',
          popover: {
            title: 'Solicitud y Esquema',
            description: 'Selecciona el tipo de trámite y la norma en la que deseas certificarte.',
            side: "top",
            align: 'start'
          }
        }
      ];
    case 3:
      return [
        ...baseSteps,
        {
          element: '#modality-section',
          popover: {
            title: 'Modalidad y Requisitos',
            description: 'Elige cómo quieres ser evaluado y confirma que tienes los documentos necesarios.',
            side: "top",
            align: 'start'
          }
        }
      ];
    case 4:
      return [
        ...baseSteps,
        {
          element: '#signature-section',
          popover: {
            title: 'Declaración y Firma',
            description: 'Lee las declaraciones finales y firma en el recuadro para terminar.',
            side: "top",
            align: 'start'
          }
        },
        {
          element: '#btn-submit',
          popover: {
            title: 'Finalizar',
            description: 'Haz clic aquí para enviar tu solicitud de certificación.',
            side: "top",
            align: 'end'
          }
        }
      ];
    default:
      return baseSteps;
  }
};
