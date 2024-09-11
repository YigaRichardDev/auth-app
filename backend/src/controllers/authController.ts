import { Request, Response } from 'express';
import authService from '../services/authService';

class AuthController {
    async register(req: Request, res: Response): Promise<void>{
        try{
            const {name, email, password} = req.body;
            const token = await authService.register(name, email, password);
            res.status(201).json({token});
        }catch(error){
            res.status(400).json({error: (error as Error).message});
        }
    }

    async login(req: Request, res: Response): Promise<void>{
        try {
            const { email, password } = req.body;
            const token = await authService.login(email, password);
            res.status(200).json({ token });
          } catch (err) {
            res.status(400).json({ error: (err as Error).message });
          }
        }
}

export default new AuthController();