const firestore = require('../middlewares/firebase');
const materias = require('../constants/materias');
const express = require('express');

const ruta = express.Router();

ruta.post('/', (req, res)=>{
    let resul = cursos();
    resul.then(data=>res.json({
        cursos: data
    })).catch(err=>err.status(400).json({err}))
})

ruta.post('/registrar', (req, res)=>{
    let body = req.body;
    let resul = createCourse(body);
    resul.then(data=>res.json({
        status: 200
    })).catch(err=>err.status(400).json({
        error: err
    }))
});

ruta.post('/instructores', (req, res)=>{
    let resul = instructores();
    resul.then(data=>res.json({
        data
    })).catch(err=>err.status(400).json({err}))
});

ruta.post('/:id', (req, res)=>{
    let resul = getCurso(req.params.id);
    resul.then(data=>res.json({
        curso: data
    })).catch(err=>err.status(400).json({err}))
})

ruta.post('/materia/:codigo', (req, res)=>{
    let resul = getMateriaId(req.params.codigo);
    let updateCurso = updateCursoId(req.params.codigo);
    resul.then(data=>res.json({
        idCurso: data
    })).catch(err=>err.status(400).json({err}))
})

ruta.post('/update/:id/:tipo', (req, res)=>{
    let resul = updateDocument(req.params.id, req.body, req.params.tipo);
    resul.then(data=>res.json({
        status: 200
    })).catch(err=>err.status(400).json({
        error: err
    }))
})

ruta.post('/instructores/materias/:apellido', (req, res)=>{
    let resul = idCursoInstructores(req.params.apellido);
    resul.then(data=>res.json({
        curso_materia: data
    })).catch(err=>err.status(400).json({
        error: err
    }));
});

ruta.post('/materias/:curso/:ids', (req, res)=>{
    let resul = getMaterias(req.params.ids, req.params.curso);
    resul.then(data=>res.json({
        materias_instructor: data
    })).catch(err=>res.json({err}))
});

ruta.post('/materias/calificacion/:curso/:code', (req, res)=>{
    let values = req.body;
    const resul = updateMateria(values, req.params.code, req.params.curso);
    resul.then(data=>res.json({
        data
    })).catch(err=>res.json({err}))
})

ruta.post('/notas/:num_curso', (req, res)=>{
    const data = getNotas(req.params.num_curso);
    data.then(materiasNotas=>{
        res.json({
            materiasNotas
        })
    }).catch(err=>res.json({err}));
})

ruta.post('/id/:numCurso', (req, res)=>{
    const data = getCursoByNum(req.params.numCurso);
    data.then(num_curso=>{
        res.json({
            num_curso
        })
    }).catch(err=>res.json({err}));
})

ruta.put('/edit/curso', (req, res)=>{
    const data = updateCurso(req.body);
    // console.log(req.body)
    data.then(data=>res.json(200)).catch(err=>err.status(400).json({err}))
})

async function updateCurso(body){

    const curso = await firestore.collection('cursos').where('curso_numero','==',`${body.curso_numero}`).get();
    const idCurso = curso.docs.map(doc=>doc.id);
    const edit = await firestore.collection('cursos').doc(idCurso[0]).update({
        ...body
    }).then(resul=> resul).catch(err=>err);

    const materias = await firestore.collection('materias').where('curso_numero', '==', `${body.curso_numero}`).get();
    const idMaterias = materias.docs.map(doc=>doc.id);
    await firestore.collection('materias').doc(idMaterias[0]).update({
        tipo: body.tipo,
        curso_numero: body.curso_numero,
        jefe_curso: body.jefe_curso,
    });

    const idUser = await firestore.collection('usuarios').where('apellido','==',`${body.jefe_curso}`).get();
    let idDocument = idUser.docs.map(doc=>doc.id);
    await firestore.collection('usuarios').doc(`${idDocument}`).update({
        rol: 'Jefe de Curso'
    }).then(resul=>resul).catch(err=>err);
    return edit;
}

async function getCursoByNum(numCurso) {
    const doc = await firestore.collection('cursos').where('curso_numero','==',`${numCurso}`).get();
    let curso = doc.docs.map(doc=>doc.data());
    return curso;
}

async function getNotas(curso_numero) {
    const docCurso = await firestore.collection('materias').where("curso_numero", "==", `${curso_numero}`).get();
    const docCursoId = docCurso.docs.map(doc=>doc.id)[0];
    const curso = getTipoCurso(curso_numero);
    let data = [];
    for (const property in materias[curso]) {
        if (Object.hasOwnProperty.call(materias[curso], property)) {
            const element = materias[curso][property];
            const snapshot = await firestore.collection('materias').doc(`${docCursoId}`).collection(`${element}`).get();
            snapshot.docs.map(async doc=>{
                const docPostulante = await firestore.collection('materias').doc(`${docCursoId}`).collection(`${element}`).doc(`${doc.id}`).get();
                let temp={}
                if(typeof(docPostulante.data().final)==='object'){
                    temp[element]= docPostulante.data().final.final
                    data.push({casco: doc.id, ...temp})
                }else{
                    temp[element]= docPostulante.data().final
                    data.push({casco: doc.id, ...temp})
                }
            })
        }
    };

    let cascos = [];
    let tempOne = [];
    let tempTwo = [];
    data.map(x=>cascos.push(x.casco))
    const unicos = [... new Set(cascos)];
    data.map(x=>{tempOne.push(data.filter(y=>x.casco===y.casco))});
    for (let i = 0; i < unicos.length; i++) {
        tempTwo.push(tempOne[i])
    }
    return tempTwo;
}


function getTipoCurso(curso) {
    return curso.split(0)[0];
}


async function updateMateria(values, code, curso) {
    const data = Object.values(values);
    const dataMateria = Object.values(data);
    let keys = dataMateria.map(x=>Object.keys(x));
    const dataTotal = Object.values(dataMateria[0]);
    const docMaterias = await firestore.collection('materias').where("status", "==", true).where("curso_numero", "==", `${curso}`).get();
    const docId = docMaterias.docs.map(doc=>doc.id);
    let codeStatus;
    try {
        for (let i = 0; i < dataTotal.length; i++) {
            const element = dataTotal[i];
            await firestore.collection('materias').doc(`${docId[0]}`).collection(`${code}`).doc(`${keys[0][i]}`).update({
                ...element
            })
        }
        codeStatus = 200;

    } catch (error) {
        codeStatus = 400;
    }
    return codeStatus;
}

async function getMaterias(materias, curso){
    let array = materias.split(",");
    let dataMaterias = [];
    const docMaterias = await firestore.collection('materias').where("status", "==", true).get();
    const docId = docMaterias.docs.map(doc=>doc.id);
    for await (let element of array) {
        await firestore.collection('materias').doc(`${docId[0]}`).collection(`${element}`).get();
        let data = await getMateriasforId(docId[0], element);
        dataMaterias.push(data);
    }
    let jsonData = {...dataMaterias}
    return jsonData;
}

async function getMateriasforId(idDoc, idCollection){
    let dataMateria = [];
    const snapshot  = await firestore.collection('materias').doc(`${idDoc}`).collection(`${idCollection}`).get();
    snapshot.docs.map(async doc=>{
        let id = doc.id;
        const data = await firestore.collection('materias').doc(`${idDoc}`).collection(`${idCollection}`).doc(`${id}`).get();
        dataMateria.push({...data.data(), id})
    })
    return dataMateria;
}

function getKeyByValue(object, value) {
    let array = [];
    Object.keys(object).find(key => {
        if(object[key]===value)array.push(key);
    });
    return array;
}

async function idCursoInstructores(apellido){
    let id = apellido;
    let materias;
    const docMaterias = await firestore.collection('materias').where("status", "==", true).get();
    const document = docMaterias.docs.map(doc=>doc.data());
    materias = getKeyByValue(document[0], id);
    if(materias){
        return {...document[0], materias};
    }else{
        return false;
    }
}

async function updateDocument(id, data, tipo){
    const doc = await firestore.collection('materias').doc(`${id}`).update(data).then(resul=> resul).catch(err=>err);
    // let key = Object.keys(data)
    // for (let i = 0; i < key.length; i++) {
    //     await firestore.collection('materias').doc(`${id}`).collection(`${key[i]}`).then(resul=> resul).catch(err=>err);
    // }
    return doc;
}

async function getMateriaId(codigo){
    const doc = await firestore.collection('materias').where('curso_numero','==',`${codigo}`).get();
    let idDocument = doc.docs.map(doc=>doc.id);
    return idDocument[0];
}

async function updateCursoId(codigo){
    const id = await firestore.collection('cursos').where('curso_numero', '==', `${codigo}`).get();
    let idDocument = id.docs.map(doc=>doc.id);
    const updateData = await firestore.collection('cursos').doc(`${idDocument[0]}`).update({
        instructores: false
    })
    return updateData;
}

async function getCurso(apellido){
    const doc = await firestore.collection('cursos').where('jefe_curso','==',`${apellido}`).get();
    let curso = doc.docs.map(doc=>doc.data());
    return curso;
}

async function course(tipo){
    const fullYear = new Date().getFullYear();
    const cursos = await firestore.collection('cursos').where('tipo', '==', `${tipo}`).get();
    let tipoCurso = cursos.docs.map(doc=>doc.data());
    let version = `${tipo.toUpperCase()}0${tipoCurso.length+1}${fullYear}`
    return version;
}

async function instructores(){
    const doc = await firestore.collection('instructores').get();
    let instructores = doc.docs.map(doc=>doc.data());
    return instructores;
}

async function cursos(){
    const doc = await firestore.collection('cursos').get();
    let cursos = doc.docs.map(doc=>doc.data());
    return cursos;
}

async function createCourse(body){
    const num = await course(body.tipo);
    const register = await firestore.collection('cursos').doc().set({
        tipo: body.tipo,
        apertura_curso: body.apertura_curso,
        cierre_curso: body.cierre_curso,
        fecha_preinscripcion: body.fecha_preinscripcion,
        apertura_psicol: body.apertura_psicol,
        cierre_psicol: body.cierre_psicol,
        apertura_medico: body.apertura_medico,
        cierre_medico: body.cierre_medico,
        apertura_fisico: body.apertura_fisico,
        cierre_fisico: body.cierre_fisico,
        inauguracion: body.inauguracion,
        apertura_tierra: body.apertura_tierra,
        cierre_tierra: body.cierre_tierra,
        apertura_saltos: body.apertura_saltos,
        cierre_saltos: body.cierre_saltos,
        jefe_curso: body.jefe_curso,
        curso_numero: num,
        stado: true,
        instructores: false
    }).then(resul=> resul).catch(err=>err);
    await firestore.collection('materias').doc().set({
        tipo: body.tipo,
        curso_numero: num,
        jefe_curso: body.jefe_curso,
        status: true,
    })
    const idUser = await firestore.collection('usuarios').where('apellido','==',`${body.jefe_curso}`).get();
    let idDocument = idUser.docs.map(doc=>doc.id);
    await firestore.collection('usuarios').doc(`${idDocument}`).update({
        rol: 'Jefe de Curso'
    }).then(resul=>resul).catch(err=>err);
    return register;
};

module.exports = ruta;