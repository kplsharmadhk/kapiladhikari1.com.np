import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

const $ = id => document.getElementById(id);
const host = $("three");
const status = $("status");
const MODEL_BASE = "https://cdn.jsdelivr.net/npm/open-anatomy-3d@0.1.0/models/";
const CATALOG_URL = "https://cdn.jsdelivr.net/npm/open-anatomy-3d@0.1.0/catalog.json";
const ATTRIBUTION = "Anatomy: BodyParts3D © The Database Center for Life Science (CC BY 4.0); female organs: Human Reference Atlas 3D Reference Organs, HuBMAP (CC BY 4.0); female body: MakeHuman (CC0). Modified by open-anatomy-3d (https://github.com/MervinR07/open-anatomy-3d), CC BY 4.0.";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(34, 1, 0.01, 100);
camera.position.set(0, 0.98, 3.4);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
host.appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xe7f2f4, 0x26313a, 2.1));
const keyLight = new THREE.DirectionalLight(0xffe6d4, 2.8);
keyLight.position.set(3, 4, 5);
scene.add(keyLight);
const rimLight = new THREE.DirectionalLight(0x6bd6c5, 1.7);
rimLight.position.set(-4, 2, -3);
scene.add(rimLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.88, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.48;
controls.minDistance = 1.7;
controls.maxDistance = 5.5;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let modelRoot = null;
let catalog = [];
let byKey = new Map();
let selected = null;
let currentSex = "male";
let currentCategory = null;
let enabledLayers = new Set(["skin", "skeleton", "muscles", "organs", "vessels", "nerves", "joints"]);
let english = false;
let animateOrgans = true;
let modelReady = false;
let heartMesh = null;
let lungMeshes = [];
let heartBase = null;
let lungBase = [];

const categoryMap = {
  skeletal: "Musculoskeletal", muscular: "Musculoskeletal",
  cardiovascular: "Cardiovascular", respiratory: "Respiratory",
  digestive: "Digestive", nervous: "Neurological",
  urinary: "Renal / Urinary", lymphatic: "Immune / Lymphatic",
  endocrine: "Endocrine", reproductive: "Reproductive",
  integumentary: "Skin", sensory: "Eye / Sensory",
  ent: "Oral / ENT"
};
const categoryNepali = {
  "Cardiovascular": "रक्तसञ्चार प्रणाली",
  "Respiratory": "श्वासप्रश्वास प्रणाली",
  "Digestive": "पाचन प्रणाली",
  "Neurological": "स्नायु प्रणाली",
  "Renal / Urinary": "मूत्र प्रणाली",
  "Musculoskeletal": "अस्थि तथा मांसपेशी प्रणाली",
  "Endocrine": "अन्तःस्रावी प्रणाली",
  "Eye / Sensory": "ज्ञानेन्द्रिय प्रणाली",
  "Reproductive": "प्रजनन प्रणाली",
  "Oral / ENT": "मुख तथा घाँटी प्रणाली",
  "Immune / Lymphatic": "प्रतिरक्षा तथा लसिका प्रणाली",
  "Skin": "छाला प्रणाली"
};
const groupNepali = {
  skin: "छाला", skeleton: "हड्डी", joints: "जोर्नी",
  muscles: "मांसपेशी", organs: "आन्तरिक अङ्ग",
  vessels: "रक्तनली", nerves: "स्नायु"
};
const translations = {
  all: ["सम्पूर्ण शरीर", "Whole body"],
  skeletal: ["हड्डी प्रणाली", "Skeletal system"],
  muscular: ["मांसपेशी प्रणाली", "Muscular system"],
  cardiovascular: ["रक्तसञ्चार प्रणाली", "Cardiovascular system"],
  respiratory: ["श्वासप्रश्वास प्रणाली", "Respiratory system"],
  digestive: ["पाचन प्रणाली", "Digestive system"],
  nervous: ["स्नायु प्रणाली", "Nervous system"],
  urinary: ["मूत्र प्रणाली", "Urinary system"],
  lymphatic: ["लसिका प्रणाली", "Lymphatic system"],
  endocrine: ["अन्तःस्रावी प्रणाली", "Endocrine system"],
  reproductive: ["प्रजनन प्रणाली", "Reproductive system"],
  integumentary: ["छाला प्रणाली", "Integumentary system"],
  sensory: ["ज्ञानेन्द्रिय प्रणाली", "Sensory system"],
  ent: ["मुख तथा घाँटी", "Oral & ENT"]
};

const details = {
  heart: ["मुटु", "रक्तलाई फोक्सो र शरीरका अन्य भागमा पम्प गर्छ।", "छातीको मध्यभागमा, अलि बायाँतर्फ।"],
  lung_l: ["बायाँ फोक्सो", "अक्सिजन र कार्बन डाइअक्साइडको ग्यास आदानप्रदान गर्छ।", "छातीको बायाँ भागमा।"],
  lung_r: ["दायाँ फोक्सो", "अक्सिजन र कार्बन डाइअक्साइडको ग्यास आदानप्रदान गर्छ।", "छातीको दायाँ भागमा।"],
  liver: ["कलेजो", "पोषक तत्त्व प्रशोधन, पित्त उत्पादन र चयापचयमा भूमिका खेल्छ।", "पेटको माथिल्लो दायाँ भागमा।"],
  stomach: ["आमाशय", "खानालाई सञ्चय गरी अम्ल तथा पाचन इन्जाइमसँग मिसाउँछ।", "पेटको माथिल्लो बायाँ भागमा।"],
  brain: ["मस्तिष्क", "सोचाइ, संवेदना, स्मृति र शरीरका धेरै क्रियाकलाप समन्वय गर्छ।", "खप्परभित्र।"],
  kidney_l: ["बायाँ मिर्गौला", "रगत छानेर मूत्र बनाउँछ र तरल तथा इलेक्ट्रोलाइट सन्तुलनमा सहयोग गर्छ।", "ढाडतर्फ, मेरुदण्डको बायाँ भागमा।"],
  kidney_r: ["दायाँ मिर्गौला", "रगत छानेर मूत्र बनाउँछ र तरल तथा इलेक्ट्रोलाइट सन्तुलनमा सहयोग गर्छ।", "ढाडतर्फ, मेरुदण्डको दायाँ भागमा।"],
  uterus: ["गर्भाशय", "गर्भधारण भएमा भ्रूण विकास हुने अङ्ग हो।", "महिला श्रोणीभित्र।"],
  pancreas: ["अग्न्याशय", "पाचन इन्जाइम तथा रगतको ग्लुकोज नियन्त्रण गर्ने हर्मोन उत्पादन गर्छ।", "आमाशयको पछाडि।"],
  spleen: ["प्लीहा", "रक्तकोष छान्न र प्रतिरक्षा प्रणालीमा सहयोग गर्छ।", "पेटको माथिल्लो बायाँ भागमा।"],
  skin: ["छाला", "शरीरलाई बाह्य वातावरणबाट जोगाउँछ र तापक्रम नियन्त्रणमा सहयोग गर्छ।", "सम्पूर्ण शरीरको बाहिरी सतहमा।"]
};

const quiz = [
  {q:"सामान्य वयस्क मानव शरीरमा कति वटा हड्डी हुन्छन्?",a:["२०६","२०१","२१२","२२०"],correct:0,why:"सामान्य वयस्क मानव कंकालमा २०६ वटा हड्डी मानिन्छन्।"},
  {q:"मुटुको मुख्य काम के हो?",a:["रक्त पम्प गर्नु","पित्त बनाउनु","मूत्र बनाउनु","हर्मोन सञ्चय गर्नु"],correct:0,why:"मुटुले रक्तलाई फोक्सो र शरीरका अन्य भागतर्फ पम्प गर्छ।"},
  {q:"फोक्सोमा ग्यास आदानप्रदान मुख्यतः कहाँ हुन्छ?",a:["अल्भिओलाईमा","श्वासनलीमा","स्वरयन्त्रमा","डायाफ्राममा"],correct:0,why:"अल्भिओलाईका पातला भित्ताबाट अक्सिजन र कार्बन डाइअक्साइडको आदानप्रदान हुन्छ।"},
  {q:"पित्त उत्पादन गर्ने अङ्ग कुन हो?",a:["कलेजो","आमाशय","प्लीहा","मिर्गौला"],correct:0,why:"कलेजोले पित्त उत्पादन गर्छ; पित्ताशयले त्यसलाई सञ्चय गर्छ।"},
  {q:"मिर्गौलाको संरचनात्मक तथा कार्यात्मक एकाइ कुन हो?",a:["नेफ्रोन","न्युरोन","अल्भिओलस","ओस्टिओन"],correct:0,why:"नेफ्रोन मिर्गौलाको सूक्ष्म संरचनात्मक तथा कार्यात्मक एकाइ हो।"},
  {q:"केन्द्रीय स्नायु प्रणालीका मुख्य भाग कुन हुन्?",a:["मस्तिष्क र मेरुरज्जु","मुटु र फोक्सो","आँखा र कान","मांसपेशी र हड्डी"],correct:0,why:"केन्द्रीय स्नायु प्रणाली मस्तिष्क र मेरुरज्जुबाट बनेको हुन्छ।"},
  {q:"हड्डी प्रणालीको एउटा प्रमुख काम कुन हो?",a:["आन्तरिक अङ्गको सुरक्षा","इन्सुलिन उत्पादन","अक्सिजनको आदानप्रदान","पित्त सञ्चय"],correct:0,why:"कंकालले शरीरलाई आधार दिनुका साथै मस्तिष्क, मुटु र फोक्सोजस्ता अङ्गको सुरक्षा गर्छ।"},
  {q:"मांसपेशीको संकुचनले मुख्यतः के सम्भव बनाउँछ?",a:["शरीरको गति","रक्तको निर्माण मात्र","पित्तको सञ्चय","मूत्रको छानाइ"],correct:0,why:"मांसपेशी संकुचनले हड्डी र जोर्नीसँग मिलेर शरीरको गति गराउँछ।"},
  {q:"अन्तःस्रावी प्रणालीले मुख्यतः के स्राव गर्छ?",a:["हर्मोन","पित्त","मूत्र","लार मात्र"],correct:0,why:"अन्तःस्रावी ग्रन्थीहरूले हर्मोन रक्तप्रवाहमा स्राव गर्छन्।"},
  {q:"लसिका प्रणालीको एउटा महत्त्वपूर्ण भूमिका कुन हो?",a:["ऊतकबाट अतिरिक्त तरल रक्तप्रवाहमा फर्काउनु","रक्त पम्प गर्नु","खाना चपाउनु","हड्डी लम्ब्याउनु"],correct:0,why:"लसिका प्रणालीले अतिरिक्त ऊतक तरललाई रक्तसञ्चारमा फर्काउन र प्रतिरक्षामा सहयोग गर्छ।"},
  {q:"छालाको एउटा महत्त्वपूर्ण काम कुन हो?",a:["बाह्य सुरक्षा र तापक्रम नियमन","रक्त पम्प गर्नु","इन्सुलिन उत्पादन","मूत्र बनाउनु"],correct:0,why:"छालाले बाह्य सुरक्षा, संवेदना र तापक्रम नियमनमा सहयोग गर्छ।"},
  {q:"महिला प्रजनन प्रणालीमा भ्रूणको विकास सामान्यतः कहाँ हुन्छ?",a:["गर्भाशयमा","अण्डाशयमा","मूत्राशयमा","फलोपियन नलीमा"],correct:0,why:"गर्भाधानपछि भ्रूण गर्भाशयको भित्तामा आरोपित भएर विकास हुन्छ।"}
];
let quizIndex = 0;
let quizAnswered = false;
let quizOrder = [];
let quizScore = 0;
let quizBest = Number(localStorage.getItem("humanAtlasBest") || 0);
let quizDone = Number(localStorage.getItem("humanAtlasDone") || 0);

function setStatus(message, hideAfter = 0) {
  status.textContent = message;
  status.style.opacity = "1";
  if (hideAfter) window.setTimeout(() => status.style.opacity = "0", hideAfter);
}
function getModelGroup(name) {
  return modelRoot?.getObjectByName(name) || null;
}
function applyVisibility() {
  if (!modelRoot) return;
  modelRoot.traverse(obj => {
    if (!obj.isMesh) return;
    const item = byKey.get(obj.name);
    if (!item) return;
    const layerOn = enabledLayers.has(item.system);
    const categoryOn = !currentCategory || item.category === currentCategory;
    obj.visible = layerOn && categoryOn;
  });
  ["skin","skeleton","joints","muscles","organs","vessels","nerves"].forEach(name => {
    const group = getModelGroup(name);
    if (group) group.visible = enabledLayers.has(name);
  });
  if (selected) highlightSelected();
}
function highlightSelected() {
  if (!modelRoot) return;
  modelRoot.traverse(obj => {
    if (!obj.isMesh || !obj.material) return;
    const isSelected = selected && obj.name === selected.key;
    const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
    mats.forEach(mat => {
      if (!mat.emissive) return;
      mat.emissive.set(isSelected ? 0x276b5d : 0x000000);
      mat.emissiveIntensity = isSelected ? 0.72 : 0;
    });
  });
}
function showDetail(item) {
  if (!item) return;
  selected = item;
  $("empty").hidden = true;
  $("detail").hidden = false;
  $("name").textContent = english ? item.label : (details[item.key]?.[0] || item.label);
  $("scientific").textContent = item.label + " · " + item.key;
  $("group").textContent = (english ? item.category : (categoryNepali[item.category] || item.category)).toUpperCase();
  const englishDetails = { heart: "Pumps blood to the lungs and the rest of the body.", lung_l: "Exchanges oxygen and carbon dioxide between air and blood.", lung_r: "Exchanges oxygen and carbon dioxide between air and blood.", liver: "Processes nutrients and produces bile.", stomach: "Stores food and mixes it with acid and digestive enzymes.", brain: "Coordinates thought, sensation, memory and many body functions.", kidney_l: "Filters blood and produces urine.", kidney_r: "Filters blood and produces urine.", uterus: "The organ in which an embryo normally implants and develops.", pancreas: "Produces digestive enzymes and hormones including insulin.", spleen: "Filters blood and supports immune function.", skin: "Protects the body and helps regulate temperature." };
  $("fn").textContent = english ? (englishDetails[item.key] || "This structure is part of the " + item.category + " system.") : (details[item.key]?.[1] || "यो संरचना " + (categoryNepali[item.category] || item.category) + " अन्तर्गत पर्छ।");
  $("location").textContent = english ? "See the highlighted location on the 3D reference model." : (details[item.key]?.[2] || "३D आकृतिमा हाइलाइट गरिएको स्थान हेर्नुहोस्।");
  $("facts").textContent = (english ? "Model group: " + item.system + (item.sex ? " · " + item.sex + " reference" : "") : "मोडेल समूह: " + (groupNepali[item.system] || item.system) + (item.sex ? " · " + item.sex + " नमुना" : ""));
  highlightSelected();
}
function selectStructure(item) {
  if (!item) return;
  selected = item;
  currentCategory = null;
  enabledLayers.add(item.system);
  document.querySelectorAll("[data-layer]").forEach(b => b.classList.toggle("selected", b.dataset.layer === item.system));
  applyVisibility();
  showDetail(item);
}
function renderStructureList(query = "") {
  const list = $("structureList");
  if (!list) return;
  const q = query.trim().toLowerCase();
  const filtered = catalog.filter(item => (!item.sex || item.sex === currentSex) &&
    (!q || item.label.toLowerCase().includes(q) || item.key.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)));
  list.replaceChildren();
  filtered.forEach(item => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "structure-row" + (selected?.key === item.key ? " active" : "");
    const dot = document.createElement("i");
    dot.style.background = item.color || "#8ca3a9";
    const label = document.createElement("span");
    label.textContent = item.label;
    const kind = document.createElement("small");
    kind.textContent = groupNepali[item.system] || item.system;
    button.append(dot, label, kind);
    button.addEventListener("click", () => selectStructure(item));
    list.append(button);
  });
  $("resultCount").textContent = filtered.length + (english ? " structures" : " संरचना");
}
function setCategory(category, system = null) {
  currentCategory = category;
  if (system) {
    enabledLayers = new Set([system]);
  } else {
    enabledLayers = new Set(["skin","skeleton","joints","muscles","organs","vessels","nerves"]);
  }
  applyVisibility();
  document.querySelectorAll("[data-layer]").forEach(b => b.classList.toggle("selected", enabledLayers.has(b.dataset.layer) && enabledLayers.size === 1));
  if (category) {
    const first = catalog.find(item => item.category === category && (!system || item.system === system) && (!item.sex || item.sex === currentSex));
    if (first) showDetail(first);
  }
}
function setLayer(layer, on) {
  if (on) enabledLayers.add(layer); else enabledLayers.delete(layer);
  currentCategory = null;
  applyVisibility();
  document.querySelectorAll("[data-layer]").forEach(b => b.classList.toggle("selected", enabledLayers.has(b.dataset.layer)));
}
function setView(x, y, z) {
  camera.position.set(x, y, z);
  controls.target.set(0, 0.88, 0);
  controls.update();
}
function resize() {
  const width = host.clientWidth;
  const height = host.clientHeight;
  if (!width || !height) return;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}
new ResizeObserver(resize).observe(host);
resize();

async function loadModel(sex) {
  currentSex = sex;
  modelReady = false;
  if (modelRoot) {
    scene.remove(modelRoot);
    modelRoot.traverse(obj => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) (Array.isArray(obj.material) ? obj.material : [obj.material]).forEach(material => material.dispose());
    });
  }
  modelRoot = null;
  selected = null;
  $("empty").hidden = false;
  $("detail").hidden = true;
  setStatus(english ? "Loading anatomical model…" : "वास्तविक Anatomy Model लोड हुँदैछ…");
  $("male").classList.toggle("active", sex === "male");
  $("female").classList.toggle("active", sex === "female");
  try {
    const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
    const file = sex === "male" ? "anatomy-male.glb" : "anatomy-female.glb";
    const gltf = await loader.loadAsync(MODEL_BASE + file);
    modelRoot = gltf.scene;
    scene.add(modelRoot);
    modelRoot.traverse(obj => {
      if (obj.isMesh) {
        obj.castShadow = false;
        obj.receiveShadow = false;
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          obj.material = Array.isArray(obj.material) ? obj.material.map(mat => mat.clone()) : obj.material.clone();
          const cloned = Array.isArray(obj.material) ? obj.material : [obj.material];
          cloned.forEach(mat => { if (mat.roughness !== undefined) mat.roughness = Math.max(mat.roughness, .42); });
        }
      }
    });
    heartMesh = modelRoot.getObjectByName("heart");
    lungMeshes = [modelRoot.getObjectByName("lung_l"), modelRoot.getObjectByName("lung_r")].filter(Boolean);
    heartBase = heartMesh ? heartMesh.scale.clone() : null;
    lungBase = lungMeshes.map(mesh => mesh.scale.clone());
    enabledLayers = new Set(["skin","skeleton","muscles","organs","vessels","nerves","joints"]);
    currentCategory = null;
    applyVisibility();
    modelReady = true;
    renderStructureList($("search").value);
    setStatus((english ? "3D anatomy loaded · " : "३D Anatomy तयार · ") + (sex === "male" ? "Male" : "Female"), 1800);
  } catch (error) {
    console.error("Anatomy model loading failed", error);
    setStatus(english ? "Could not load the 3D model. Check your internet connection and reload." : "३D मोडेल लोड भएन। इन्टरनेट जाँचेर पृष्ठ फेरि खोल्नुहोस्।");
  }
}

function renderQuiz() {
  const item = quiz[quizIndex];
  $("quizQuestion").textContent = item.q;
  $("quizNumber").textContent = (quizIndex + 1) + " / " + quiz.length;
  $("quizChoices").replaceChildren();
  $("quizFeedback").textContent = "";
  $("quizNext").hidden = true;
  quizAnswered = false;
  quizOrder = item.a.map((_, index) => index);
  for (let i = quizOrder.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [quizOrder[i], quizOrder[j]] = [quizOrder[j], quizOrder[i]]; }
  quizOrder.forEach(originalIndex => {
    const answer = item.a[originalIndex];
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-choice";
    button.textContent = answer;
    button.addEventListener("click", () => {
      if (quizAnswered) return;
      quizAnswered = true;
      const correct = originalIndex === item.correct;
      if (correct) quizScore++;
      [...$("quizChoices").children].forEach((choice, i) => {
        choice.disabled = true;
        if (quizOrder[i] === item.correct) choice.classList.add("correct");
        else if (quizOrder[i] === originalIndex) choice.classList.add("wrong");
      });
      $("quizFeedback").textContent = (correct ? "✓ सही उत्तर। " : "✕ सही उत्तर: " + item.a[item.correct] + "। ") + item.why;
      $("quizNext").hidden = false;
    });
    $("quizChoices").append(button);
  });
  $("quizProgress").style.width = ((quizIndex / quiz.length) * 100) + "%";
}
function finishQuiz() {
  quizDone++;
  quizBest = Math.max(quizBest, quizScore);
  localStorage.setItem("humanAtlasBest", String(quizBest));
  localStorage.setItem("humanAtlasDone", String(quizDone));
  $("quizQuestion").textContent = "अभ्यास पूरा भयो!";
  $("quizChoices").replaceChildren();
  $("quizFeedback").textContent = "तपाईंको अंक: " + quizScore + " / " + quiz.length + " · हालसम्मको उत्कृष्ट: " + quizBest + " · अभ्यास सङ्ख्या: " + quizDone;
  $("quizNext").textContent = "फेरि अभ्यास गर्नुहोस्";
  $("quizNext").hidden = false;
  $("quizProgress").style.width = "100%";
  $("bestScore").textContent = quizBest + " / " + quiz.length;
  $("doneCount").textContent = String(quizDone);
}

document.querySelectorAll("[data-system]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-system]").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const key = button.dataset.system;
    $("modelTitle").textContent = translations[key]?.[english ? 1 : 0] || key;
    if (key === "all") {
      currentCategory = null;
      enabledLayers = new Set(["skin","skeleton","joints","muscles","organs","vessels","nerves"]);
      applyVisibility();
    } else if (key === "skeletal") setCategory("Musculoskeletal", "skeleton");
    else if (key === "muscular") setCategory("Musculoskeletal", "muscles");
    else if (key === "integumentary") setCategory("Skin", "skin");
    else if (key === "sensory") setCategory("Eye / Sensory", "organs");
    else if (key === "ent") setCategory("Oral / ENT", "organs");
    else setCategory(categoryMap[key], null);
  });
});
document.querySelectorAll("[data-layer]").forEach(button => {
  button.addEventListener("click", () => setLayer(button.dataset.layer, !enabledLayers.has(button.dataset.layer)));
});
$("search").addEventListener("input", event => renderStructureList(event.target.value));
$("male").addEventListener("click", () => { if (currentSex !== "male") loadModel("male"); });
$("female").addEventListener("click", () => { if (currentSex !== "female") loadModel("female"); });
$("rotate").addEventListener("click", () => {
  controls.autoRotate = !controls.autoRotate;
  $("rotate").classList.toggle("on", controls.autoRotate);
});
$("front").addEventListener("click", () => setView(0, .98, 3.4));
$("side").addEventListener("click", () => setView(3.4, .98, 0));
$("back").addEventListener("click", () => setView(0, .98, -3.4));
$("plus").addEventListener("click", () => camera.position.multiplyScalar(.88));
$("minus").addEventListener("click", () => camera.position.multiplyScalar(1.12));
$("reset").addEventListener("click", () => { setView(0, .98, 3.4); controls.autoRotate = true; $("rotate").classList.add("on"); });
$("animateOrgans").addEventListener("click", () => {
  animateOrgans = !animateOrgans;
  $("animateOrgans").classList.toggle("on", animateOrgans);
  $("animateOrgans").textContent = animateOrgans ? "♥ मुटु / फोक्सो गति (सिमुलेसन): चालु" : "♥ मुटु / फोक्सो गति (सिमुलेसन): बन्द";
});
$("lang").addEventListener("click", () => {
  english = !english;
  $("lang").textContent = english ? "EN / ने" : "ने / EN";
  $("modelTitle").textContent = translations[document.querySelector("[data-system].active")?.dataset.system || "all"]?.[english ? 1 : 0] || "Human body";
  $("search").placeholder = english ? "Search an organ or structure…" : "अङ्ग वा संरचना खोज्नुहोस्…";
  if (selected) showDetail(selected);
  renderStructureList($("search").value);
});
$("quizNext").addEventListener("click", () => {
  if ($("quizNext").textContent === "फेरि अभ्यास गर्नुहोस्") {
    quizIndex = 0; quizScore = 0; $("quizNext").textContent = "अर्को प्रश्न"; renderQuiz(); return;
  }
  if (quizIndex >= quiz.length - 1) { finishQuiz(); return; }
  quizIndex++;
  renderQuiz();
});

let pointerStart = null;
renderer.domElement.addEventListener("pointerdown", event => { pointerStart = { x: event.clientX, y: event.clientY }; });
renderer.domElement.addEventListener("pointerup", event => {
  if (!pointerStart || Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) > 7 || !modelRoot) { pointerStart = null; return; }
  pointerStart = null;
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObject(modelRoot, true).filter(hit => hit.object.isMesh && hit.object.visible && byKey.has(hit.object.name));
  if (hits.length) selectStructure(byKey.get(hits[0].object.name));
});

const savedBest = $("bestScore");
if (savedBest) savedBest.textContent = quizBest + " / " + quiz.length;
$("doneCount").textContent = String(quizDone);
$("attribution").textContent = ATTRIBUTION;
renderQuiz();

let lastFrame = 0;
function animate(time = 0) {
  requestAnimationFrame(animate);
  const t = time / 1000;
  controls.update();
  if (modelReady && animateOrgans && heartMesh && heartBase) {
    const pulse = 1 + 0.045 * Math.max(0, Math.sin(t * 5.2));
    heartMesh.scale.set(heartBase.x * pulse, heartBase.y * pulse, heartBase.z * pulse);
    lungMeshes.forEach((mesh, index) => {
      const base = lungBase[index];
      const breath = 1 + 0.012 * Math.sin(t * 1.25);
      mesh.scale.set(base.x * breath, base.y * breath, base.z * breath);
    });
  }
  renderer.render(scene, camera);
}
requestAnimationFrame(animate);

async function init() {
  try {
    const response = await fetch(CATALOG_URL, { cache: "force-cache" });
    if (!response.ok) throw new Error("Catalog HTTP " + response.status);
    catalog = await response.json();
    byKey = new Map(catalog.map(item => [item.key, item]));
    $("structureList").replaceChildren();
    renderStructureList();
    await loadModel("male");
  } catch (error) {
    console.error("Anatomy atlas initialization failed", error);
    setStatus("Anatomy data लोड हुन सकेन। इन्टरनेट जडान जाँच्नुहोस्।");
  }
}
init();
