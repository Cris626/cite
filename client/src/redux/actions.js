/* USUARIO */
export const LOGIN_USER = 'LOGIN_USER';

/* CURSO */
export const REGISTER_COURSE = 'REGISTER_COURSE';
export const GET_CURSOS = 'GET_CURSOS';
export const GET_CURSO_BY_AP = 'GET_CURSO_BY_AP';
export const SET_INSTRUCTOR = 'SET_INSTRUCTOR';

/* INSTRUCTORES */

export const GET_INSTRUCTORS = 'GET_INSTRUCTORS';
export const REGISTER_INSTRUCTOR = 'REGISTER_INSTRUCTOR';

/* ALUMNOS */

export const GET_POSTULANTES = 'GET_POSTULANTES';
export const ENABLE_POSTULANTE = 'ENABLE_POSTULANTE';

/* ALL */

export * from './usuario/actions';
export * from './curso/actions';
export * from './instructor/actions';
export * from './alumno/actions';