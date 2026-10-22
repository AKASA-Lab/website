import overview from "../docs/overview.md?raw";
import motivation from "../docs/motivation.md?raw";
import problemStatement from "../docs/problem-statement.md?raw";
import projectObjectives from "../docs/project-objectives.md?raw";
import experimentalSetup from "../docs/experimental-setup.md?raw";
import methodology from "../docs/methodology.md?raw";
import fertilizerTreatments from "../docs/fertilizer-treatments.md?raw";
import imageDataset from "../docs/image-dataset.md?raw";
import datasetPreparation from "../docs/dataset-preparation.md?raw";
import modelDevelopment from "../docs/model-development.md?raw";
import projectProgress from "../docs/project-progress.md?raw";
import team from "../docs/team.md?raw";
import demonstrations from "../docs/demonstrations.md?raw";
import references from "../docs/references.md?raw";
import testbedOverview from "../data/WhatsApp Image 2026-10-02 at 6.01.10 PM.jpeg";
import testbedSecondView from "../data/WhatsApp Image 2026-10-02 at 6.01.10 PM (1).jpeg";
import testbedDetail from "../data/WhatsApp Image 2026-10-02 at 6.01.11 PM.jpeg";
import testbedDemo from "../data/WhatsApp Video 2026-10-07 at 3.49.05 PM.mp4";
import testbedDemoAdditional from "../data/WhatsApp Video 2026-10-22 at 3.16.29 PM.mp4";
import projectPresentation from "../data/2_presentation.pdf";
import openFieldFarming from "../data/openfarming.avif";
import backyardFarming from "../data/backyard.avif";
import rooftopFarming from "../data/rooftop.jpg";
import indoorFarming from "../data/indoor.webp";
import soilFarming from "../data/soilfarming.jpg";
import hydroponics from "../data/hydroponics.webp";
import aquaponics from "../data/aquaponics.jpg";
import aeroponicsSetup from "../data/aeroponics_setup.jpg";
import systemArchitecture from "../data/aeroponic_block_diagram_colored_boxes.png";
import visionConcept from "../data/vision.png";
import hardwareConnections from "../data/hardware_1.jpeg";
import mistingHardware from "../data/hardware_3.jpeg";
import nasaAeroponicsArchive from "../data/NASA.png";
import nasaZinnia from "../data/NASA2.png";
import nasaVeggie from "../data/NASA3.png";
import nasaPlantHabitat from "../data/NASA4.png";

export const documentation = [
  { slug: "overview", title: "Overview", content: overview },
  { slug: "motivation", title: "Motivation", content: motivation },
  { slug: "problem-statement", title: "Problem Statement", content: problemStatement },
  { slug: "project-objectives", title: "Project Objectives", content: projectObjectives },
  { slug: "experimental-setup", title: "Experimental Setup", content: experimentalSetup },
  { slug: "methodology", title: "Methodology", content: methodology },
  { slug: "fertilizer-treatments", title: "Fertilizer Treatments", content: fertilizerTreatments },
  { slug: "image-dataset", title: "Image Dataset", content: imageDataset },
  { slug: "dataset-preparation", title: "Dataset Preparation", content: datasetPreparation },
  { slug: "model-development", title: "Model Development", content: modelDevelopment },
  { slug: "project-progress", title: "Project Progress", content: projectProgress },
  { slug: "team", title: "Team", content: team },
  { slug: "demonstrations", title: "Demonstrations", content: demonstrations },
  { slug: "references", title: "References", content: references },
];

export const repositories = [
  { name: "Experiments", url: "https://github.com/AKASA-Lab/experiments", description: "Project experiment records" },
  { name: "Datasets", url: "https://github.com/AKASA-Lab/datasets", description: "Project datasets" },
  { name: "Firmware", url: "https://github.com/AKASA-Lab/firmware", description: "ESP32 firmware" },
  { name: "Documentation", url: "https://github.com/AKASA-Lab/documentation", description: "Project documentation repository" },
];

export const milestones = [
  { title: "Testbed creation", status: "Completed" },
  { title: "Collect and prepare the image dataset", status: "In Progress" },
  { title: "Develop a deficiency-identification model", status: "Yet to do" },
];

export const projectMedia = {
  presentation: projectPresentation,
  nasaExamples: [
    { src: nasaZinnia, alt: "Zinnia plants from the Veggie ground-control system being harvested in a space-station processing laboratory", caption: "Zinnia plants grown with the Veggie ground-control system. Photo credit: NASA/Bill White." },
    { src: nasaVeggie, alt: "Astronaut Serena Auñón-Chancellor tending red Russian kale and dragon lettuce in the Veggie plant-growth system", caption: "Astronaut Serena Auñón-Chancellor tending plants in Veggie. Photo credit: ESA/Alexander Gerst." },
    { src: nasaPlantHabitat, alt: "An engineer opens the growth chamber of an Advanced Plant Habitat flight unit", caption: "Advanced Plant Habitat flight-unit growth chamber. Photo credit: NASA/Leif Heimbold." },
  ],
  nasaAeroponicsArchive: {
    src: nasaAeroponicsArchive,
    alt: "NASA Innovative Partnership Program success-story clipping about the Aeroponics International inflatable aeroponic system",
    caption: "A NASA Innovative Partnership Program success-story clipping describes Aeroponics International's inflatable aeroponic system.",
  },
  problemContext: [
    {
      spaces: [
        { src: openFieldFarming, alt: "Illustration of open-field farming", label: "Open fields" },
        { src: backyardFarming, alt: "Illustration of a backyard garden", label: "Backyards" },
        { src: rooftopFarming, alt: "Illustration of rooftop vegetable growing", label: "Rooftops" },
        { src: indoorFarming, alt: "Illustration of a person growing plants indoors", label: "Indoor spaces" },
      ],
      methods: [
        { src: soilFarming, alt: "Illustration of plants growing in soil", label: "Soil-based" },
        { src: hydroponics, alt: "Illustration of plants growing in a circulating water system", label: "Hydroponics" },
        { src: aquaponics, alt: "Illustration of plants growing above a fish tank", label: "Aquaponics" },
        { src: aeroponicsSetup, alt: "Illustration of an aeroponic growing setup", label: "Aeroponics" },
      ],
    },
  ],
  systemArchitecture: { src: systemArchitecture, alt: "Aeroponic control-system block diagram connecting the ESP32, relay module, power supply, pumps, and buckets", caption: "System architecture: ESP32 control, relay switching, pumps, and mist-sprayer buckets" },
  visionConcept: { src: visionConcept, alt: "Concept diagram showing a camera capturing crops for deep-learning-based computer vision", caption: "Concept for future image-based analysis; model development has not yet begun" },
  videos: [
    { src: testbedDemo, title: "Testbed demonstration", date: "7 October 2026" },
    { src: testbedDemoAdditional, title: "Testbed demonstration", date: "22 October 2026" },
  ],
  setupPhotos: [
    { src: testbedOverview, alt: "Aeroponic testbed with growing containers, tubing, and nutrient reservoirs", caption: "Aeroponic testbed overview" },
    { src: testbedSecondView, alt: "Aeroponic growing containers arranged beneath the setup lighting", caption: "Growing containers and lighting" },
    { src: testbedDetail, alt: "Close view of the aeroponic container lids and connected tubing", caption: "Container and tubing detail" },
    { src: hardwareConnections, alt: "ESP32, relay board, diaphragm pump, and DC adapter connected on a work surface", caption: "Controller, switching, pump, and power hardware" },
    { src: mistingHardware, alt: "Mist-sprayer manifold operating inside an aeroponic growing bucket", caption: "Mist-sprayer manifold inside a growing bucket" },
  ],
};
