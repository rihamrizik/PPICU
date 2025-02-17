// Sample dynamic data for patient info (use your dynamic source or Glide data)
const patientData = {
    name: "S S D",
    id: "4",
    dob: "1 February 2025",
    age: "16 Days",
    weight: "5",
    height: "5",
    uncuffedETT: "4.00",
    cuffedETT: "3.50",
    oralETTDepth: "12.00",
    nasalETTDepth: "5.50",
    bladeSize: "00",
    bladeType: "Miller",
    lmaSize: "1.5"
};

// Sample dynamic drug calculation data (use your actual data source)
const drugCalculations = [
    { drugName: "Adrenaline", doseMg: "0.01", concentrationMl: "1.0", dosageMg: "0.01", dosageMl: "0.01" },
    { drugName: "Adrenaline (x10)", doseMg: "0.10", concentrationMl: "1.0", dosageMg: "0.10", dosageMl: "0.1" },
    { drugName: "Atropine", doseMg: "0.02", concentrationMl: "1.0", dosageMg: "0.02", dosageMl: "0.02" },
    { drugName: "Adenosine", doseMg: "0.10", concentrationMl: "3.0", dosageMg: "0.10", dosageMl: "0.10" },
    { drugName: "Ca Gluconate (10%)", doseMg: "100.00", concentrationMl: "100.0", dosageMg: "100.0", dosageMl: "1.0" },
    { drugName: "Lidocaine (1%)", doseMg: "1.00", concentrationMl: "10.0", dosageMg: "1.0", dosageMl: "0.10" },
    { drugName: "Na Bicarbonate", doseMg: "1.00", concentrationMl: "1.0", dosageMg: "1.0", dosageMl: "1.0" },
    { drugName: "Terlipressin", doseMg: "2.00", concentrationMl: "200.0", dosageMg: "2.0", dosageMl: "0.02" },
    { drugName: "Defibrillation", doseMg: "2.00", concentrationMl: "2.0", dosageMg: "2.0", dosageMl: "2.0" },
    { drugName: "Cardioversion", doseMg: "0.50", concentrationMl: "0.5", dosageMg: "0.5", dosageMl: "0.5" },
    { drugName: "Midazolam", doseMg: "0.10", concentrationMl: "5.0", dosageMg: "0.10", dosageMl: "0.02" },
    { drugName: "Thiopental", doseMg: "5.00", concentrationMl: "25.0", dosageMg: "5.0", dosageMl: "0.20" },
    { drugName: "Ketamine", doseMg: "1.00", concentrationMl: "50.0", dosageMg: "1.0", dosageMl: "0.02" },
    { drugName: "Morphine", doseMg: "0.10", concentrationMl: "10.0", dosageMg: "0.10", dosageMl: "0.01" },
    { drugName: "Fentanyl", doseMg: "1.00", concentrationMl: "50.0", dosageMg: "1.0", dosageMl: "0.02" },
    { drugName: "Vecuronium", doseMg: "0.10", concentrationMl: "4.0", dosageMg: "0.10", dosageMl: "0.025" },
    { drugName: "Vecuronium (Double dose)", doseMg: "0.20", concentrationMl: "4.0", dosageMg: "0.20", dosageMl: "0.05" },
    { drugName: "Rocuronium", doseMg: "1.00", concentrationMl: "10.0", dosageMg: "1.0", dosageMl: "0.10" },
    { drugName: "Atracurium", doseMg: "0.40", concentrationMl: "10.0", dosageMg: "0.40", dosageMl: "0.04" },
    { drugName: "Succinylcholine", doseMg: "1.00", concentrationMl: "50.0", dosageMg: "1.0", dosageMl: "0.02" },
    { drugName: "Atropine", doseMg: "0.02", concentrationMl: "1.0", dosageMg: "0.02", dosageMl: "0.02" },
    { drugName: "Naloxone", doseMg: "0.10", concentrationMl: "0.4", dosageMg: "0.10", dosageMl: "0.25" },
    { drugName: "Flumazenil", doseMg: "0.01", concentrationMl: "0.1", dosageMg: "0.01", dosageMl: "0.10" },
    { drugName: "Glucose (25%)", doseMg: "0.50", concentrationMl: "0.3", dosageMg: "0.50", dosageMl: "0.20" },
    { drugName: "Diazepam", doseMg: "0.20", concentrationMl: "5.0", dosageMg: "0.20", dosageMl: "0.04" },
    { drugName: "Propofol", doseMg: "2.00", concentrationMl: "10.0", dosageMg: "2.00", dosageMl: "0.20" },
    { drugName: "Phenytoin", doseMg: "15.00", concentrationMl: "50.0", dosageMg: "15.00", dosageMl: "0.30" },
    { drugName: "Phenobarbital", doseMg: "15.00", concentrationMl: "200.0", dosageMg: "15.00", dosageMl: "0.07" },
    { drugName: "Hydralazine", doseMg: "0.10", concentrationMl: "20.0", dosageMg: "0.10", dosageMl: "0.005" },
    { drugName: "Pethidine", doseMg: "1.00", concentrationMl: "50.0", dosageMg: "1.00", dosageMl: "0.02" },
    { drugName: "Furosemide", doseMg: "1.00", concentrationMl: "10.0", dosageMg: "1.00", dosageMl: "0.10" },
    { drugName: "Neostigmine", doseMg: "0.05", concentrationMl: "2.5", dosageMg: "0.05", dosageMl: "0.02" }
];

// Function to dynamically populate the patient information
function populatePatientInfo() {
    document.getElementById('Patient Name').textContent = patientData.name;
    document.getElementById('Patient ID').textContent = patientData.id;
    document.getElementById('Date of Birth').textContent = patientData.dob;
    document.getElementById('Age').textContent = patientData.age;
    document.getElementById('Patient Weight').textContent = patientData.weight;
    document.getElementById('Patient Height').textContent = patientData.height;
    document.getElementById('Uncuffed ETT Size').textContent = patientData.uncuffedETT;
    document.getElementById('Cuffed ETT Size').textContent = patientData.cuffedETT;
    document.getElementById('Oral ETT Depth').textContent = patientData.oralETTDepth;
    document.getElementById('Nasal ETT Depth').textContent = patientData.nasalETTDepth;
    document.getElementById('blade Size').textContent = patientData.bladeSize;
    document.getElementById('blade Type').textContent = patientData.bladeType;
    document.getElementById('LMA Size').textContent = patientData.lmaSize;
}

// Function to dynamically populate the drug calculations table
function populateDrugCalculations() {
    const tableBody = document.getElementById('drug-table-body');
    
    drugCalculations.forEach((drug) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${drug.drugName}</td>
            <td>${drug.doseMg}</td>
            <td>${drug.concentrationMl}</td>
            <td>${drug.dosageMg}</td>
            <td>${drug.dosageMl}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Call functions to populate the data on page load
populatePatientInfo();
populateDrugCalculations();