/* USUARIO */
export const LOGIN_USER = 'LOGIN_USER';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const SEND_CODE = 'SEND_CODE';
export const SEND_PASSWORD = 'SEND_PASSWORD';

/* CURSO */
export const REGISTER_COURSE = 'REGISTER_COURSE';
export const GET_CURSOS = 'GET_CURSOS';
export const GET_CURSO_BY_AP = 'GET_CURSO_BY_AP';
export const SET_INSTRUCTOR = 'SET_INSTRUCTOR';
export const GET_CURSO_MATERIAS = 'GET_CURSO_MATERIAS';
// export const GET_MATERIA_INSTRUCTOR = 'GET_MATERIA_INSTRUCTOR';
export const GET_MATERIAS = 'GET_MATERIAS';
export const POST_DATA_ALUMNOS = 'POST_DATA_ALUMNOS';
export const POST_NOTES_MATERIA = 'POST_NOTES_MATERIA';
export const GET_NOTAS = 'GET_NOTAS';
export const GET_CURSO_BY_NUM = 'GET_CURSO_BY_NUM';

/* INSTRUCTORES */

export const GET_INSTRUCTORS = 'GET_INSTRUCTORS';
export const REGISTER_INSTRUCTOR = 'REGISTER_INSTRUCTOR';
export const DATA_INSTRUCTOR = 'DATA_INSTRUCTOR';
export const EDIT_INSTRUCTOR = 'EDIT_INSTRUCTOR';

/* ALUMNOS */

export const GET_POSTULANTES = 'GET_POSTULANTES';
export const ENABLE_POSTULANTE = 'ENABLE_POSTULANTE';
export const REGISTER_POSTULANTE = 'REGISTER_POSTULANTE';
export const GET_ALUMNOS = 'GET_ALUMNOS';

/* ALL */

export const RESET_ACTION = 'RESET_ACTION';

export * from './usuario/actions';
export * from './curso/actions';
export * from './instructor/actions';
export * from './alumno/actions';