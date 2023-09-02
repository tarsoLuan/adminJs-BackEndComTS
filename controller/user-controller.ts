import { User } from '../models/user.entity';

const getAllUsers = async (req:any, res:any) => {
    try {
        console.log('Buscando usuários...')
        const users = await User.findAll();
        console.log('Usuários encontrados:', JSON.stringify(users));
        res.json(users)
        
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error;
    }
}

export default getAllUsers;


