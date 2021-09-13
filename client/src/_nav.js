const jwt = require('jsonwebtoken');
let token = localStorage.getItem('Authorization');

function authtoken(){
    let jwToken = jwt.verify(token, 'keyPassword', (err, decoded)=>{
        if(err){
            return err;
        }else{
            return decoded.data.rol;
        }
    });
    return jwToken;
}

export default authtoken()==="Administrador"?{
    items: [
        {
            name: 'Inicio',
            url: '/app/main',
            label: 'Inico',
            num: 0,
            icon: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
        },{
            name: 'one',
            label: 'Instructores',
            num: 1,
            icon: "M16.5 13c-1.2 0-3.07.34-4.5 1-1.43-.67-3.3-1-4.5-1C5.33 13 1 14.08 1 16.25V19h22v-2.75c0-2.17-4.33-3.25-6.5-3.25zm-4 4.5h-10v-1.25c0-.54 2.56-1.75 5-1.75s5 1.21 5 1.75v1.25zm9 0H14v-1.25c0-.46-.2-.86-.52-1.22.88-.3 1.96-.53 3.02-.53 2.44 0 5 1.21 5 1.75v1.25zM7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 5.5c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5s1.57 3.5 3.5 3.5zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z",
            expand: {
                one: false
            },
            option:[{
                name: 'Registrar Instructor',
                label: 'Registrar Instructor',
                url: '/app/instructores/crear',
                num: 2
                },{
                name: 'Ver Instructores',
                label: 'Ver Instructores',
                url: '/app/instructores',
                num: 3
            }]
        },{
            name: 'two',
            label: 'Alumnos',
            num: 4,
            icon: "M16.5 13c-1.2 0-3.07.34-4.5 1-1.43-.67-3.3-1-4.5-1C5.33 13 1 14.08 1 16.25V19h22v-2.75c0-2.17-4.33-3.25-6.5-3.25zm-4 4.5h-10v-1.25c0-.54 2.56-1.75 5-1.75s5 1.21 5 1.75v1.25zm9 0H14v-1.25c0-.46-.2-.86-.52-1.22.88-.3 1.96-.53 3.02-.53 2.44 0 5 1.21 5 1.75v1.25zM7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 5.5c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5s1.57 3.5 3.5 3.5zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z",
            expand: {
                two: false
            },
            option:[{
                name: 'Registrar Alumno',
                label: 'Registrar Alumno',
                url: '/app/alumnos/registrar-alumno',
                num: 5
                },{
                name: 'Ver Alumnos',
                label: 'Ver Alumnos',
                url: '/app/alumnos/ver',
                num: 6
            }]
        },{
            name: 'Postulantes',
            url: '/app/alumnos/postulantes',
            label: 'Postulantes',
            num: 7,
            icon: "M16.5 13c-1.2 0-3.07.34-4.5 1-1.43-.67-3.3-1-4.5-1C5.33 13 1 14.08 1 16.25V19h22v-2.75c0-2.17-4.33-3.25-6.5-3.25zm-4 4.5h-10v-1.25c0-.54 2.56-1.75 5-1.75s5 1.21 5 1.75v1.25zm9 0H14v-1.25c0-.46-.2-.86-.52-1.22.88-.3 1.96-.53 3.02-.53 2.44 0 5 1.21 5 1.75v1.25zM7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 5.5c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5s1.57 3.5 3.5 3.5zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z",
        }
    ]
}:authtoken()==="Comandante"||authtoken()==="2do Comandante"?{
    items: [
        {
            name: 'Inicio',
            url: '/app/main',
            label: 'Inico',
            num: 0,
            icon: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
        },{
            name: 'one',
            label: 'Administrar Cursos',
            num: 1,
            icon: "M16.5 13c-1.2 0-3.07.34-4.5 1-1.43-.67-3.3-1-4.5-1C5.33 13 1 14.08 1 16.25V19h22v-2.75c0-2.17-4.33-3.25-6.5-3.25zm-4 4.5h-10v-1.25c0-.54 2.56-1.75 5-1.75s5 1.21 5 1.75v1.25zm9 0H14v-1.25c0-.46-.2-.86-.52-1.22.88-.3 1.96-.53 3.02-.53 2.44 0 5 1.21 5 1.75v1.25zM7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 5.5c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5s1.57 3.5 3.5 3.5zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z",
            expand: {
                one: false
            },
            option:[{
                name: 'Crear Cursos',
                label: 'Crear Cursos',
                url: '/app/cursos/crear',
                num: 2
                },{
                name: 'Ver Cursos',
                label: 'Ver Cursos',
                url: '/app/cursos/ver',
                num: 3
            }]
        }
    ]
}:authtoken()==="Jefe de Curso"?{
    items: [
        {
            name: 'Inicio',
            url: '/app/main',
            label: 'Inico',
            num: 0,
            icon: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
        },{
            name: 'Curso',
            url: '/app/materias',
            label: 'Curso',
            num: 1,
            icon: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
        }
    ]
}:authtoken()==="Instructor"?{
    items: [
        {
            name: 'Inicio',
            url: '/app/main',
            label: 'Inico',
            num: 0,
            icon: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
        },{
            name: 'Cursos',
            url: '/app/instructores/cursos',
            label: 'Cursos',
            num: 1,
            icon: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
        }
    ]
}:{
    items: [
        {
            name: 'Inicio',
            url: '/app/main',
            label: 'Inico',
            num: 0,
            icon: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
        }
    ]
}