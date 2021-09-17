const SEMANAS = ["SEMANA 1", "SEMANA 2", "SEMANA 3", "PROMEDIO FINAL"];

const EFM = ["N° CASCO", "FLEXIONES", "ABDOMINALES", "AEROBICA", "FINAL"];
const FINAL = ["N° CASCO", "1ra SEMANA", "2da SEMANA", "3ra SEMANA", "NOTA FINAL"]
const TEMAS = {
    tema_1: 2,
    tema_2: 4,
    tema_3: 5,
    tema_4: 10,
    final: 245,
}

module.exports = {
    /* PARACAIDISMO */
    "ACU-112": "ACUATIZAJE",
    "ARA-032": "ARNEZ DE ATERRIZAJE",
    "ARS-042": "ARNEZ SUSPENDIDO",
    "CVT-072": "CONTROL DE VELAMEN EN TIERRA",
    "EFM-012": "ENTRENAMIENTO FISICO MILITAR",
    "FUC-122": "FUSELAJE CERRADO",
    "HIP-102": "HISTORIA DEL PARACAIDISMO",
    "NOT-082": "NOMENCLATURA Y TERMINOLOGIA",
    "PLA-022": "PLATAFORMA DE ATERRIZAJE",
    "PLT-092": "PLANEAMIENTO",
    "RVT-062": "RECUPERACION DE VELAMEN EN TIERRA",
    "TOS-052": "TORRE DE SALTO",

    /* SALTO LIBRE */
    "ENF-013": "ENTRENAMIENTO FISICO MILITAR",
    "HIS-093": "HISTORIA Y TEORIA DE SALTO",
    "NOT-083": "NOMENCLATURA Y TERMINOLOGIA",
    "PLE-053": "FASES DEL PLEGADO",
    "POS-023": "RTV",
    "SAL-033": "SALTO LIBRE",
    "TRA-043": "TRA",

    /* PLEGADOR */
    "EFM-014": {
        "name": "ENTRENAMIENTO FISICO MILITAR",
        "header": SEMANAS,
        "header_nota": EFM,
        "header_nota_final": FINAL
    },
    "NOM-024": {
        "name": "NOMENCLATURA Y TERMINOLOGIA",
        "header": false,
        "header_nota": TEMAS,
    },
    "FAB-034": {
        "name": "FASES DEL PLEGADO",
        "header": true,
        "header_nota": TEMAS,
    },
    "PLE-044": {
        "name": "PLEGADOR",
        "header": false,
        "header_nota": TEMAS,
    },
    "MAN-054": {
        "name":"MANTENIMIENTO",
        "header": false,
        "header_nota": TEMAS,
    }
}