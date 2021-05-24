import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Exception } from './utils'
import { Tareas } from './entities/Tareas'

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(Users)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Users already exists with this email")

	const newUser = getRepository(Users).create(req.body);  //Creo un usuario
	const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Users).find();
		return res.json(users);
}

export const getUser = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Users).findOne(req.params.id);
		return res.json(users);
}

export const createTarea = async (req: Request, res: Response): Promise<Response> =>{
        if(!req.body.descripcion_tarea)throw new Exception("Escriba una descripción, por favor")
        const usersTareas = getRepository(Users)
        const userTarea = await usersTareas.findOne(req.params.id)
        if(userTarea) {
            let tarea = new Tareas()
            tarea.descripcion_tarea = req.body.descripcion_tarea
            tarea.estado_tarea = false
            /* Le asignamos el usuario al que le pertenece la tarea   */
            tarea.users = userTarea
            const results = await getRepository(Tareas).save(tarea)
            return res.json(results);
        }
		return res.json("Usuario no encontrado");
}