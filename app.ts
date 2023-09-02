import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import * as AdminJSSequelize from '@adminjs/sequelize';
import { User, Course, Enrollment } from './models';
import { generateresource } from './utils/modeling-models';
import { encryptPassword } from './utils/user-utils';
import bcrypt from 'bcrypt';

// npx tsx ./app.ts

//PARA LOGIN ADMIN
    // EMAIL: admin
    // SENHA: admin
AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database
});

const PORT = 3000;


const start = async () => {
    const app = express();

    const admin = new AdminJS({
        resources : [
            generateresource(User, {
                 password: { 
                    type: 'password',
                    isVisible: {
                        add: true, list: false, edit: true, show: false, filter: false
                    }
                }
            }, {
                new: {
                    before: async (request:any) => {
                        return encryptPassword(request);
                    }
                },
                edit: {
                    before: async (request:any) => {
                        return encryptPassword(request);
                    }
                }
            }),
            generateresource(Course),
            generateresource(Enrollment)
        ],
        rootPath: '/',
        dashboard: {
            component: AdminJS.bundle('./components/dashboard.tsx')
        },
        branding: {
            companyName: 'Cursos etc.',
            favicon: 'https://static-00.iconduck.com/assets.00/open-book-icon-2048x2048-wuklhx59.png',
            logo: 'https://static-00.iconduck.com/assets.00/open-book-icon-2048x2048-wuklhx59.png',
        }
    });

    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
        admin,
        {
            authenticate: async (email, password) => {
                const user = await User.findOne({ where: { email } });
                console.log(JSON.stringify(user));
                if (user) {
                    const matched = await bcrypt.compare(password, user.password ?? '');
                    if (matched) {
                        return user;
                    }
                    return false;
                }
                return false;
            },
            cookieName: 'adminjs',
            cookiePassword: 'pass'
        },
        null);
    app.use(admin.options.rootPath, adminRouter);
    
    const routes = require('./routes/routes-controller');
    app.use(express.json());
    app.use('/api', routes);

    

    // Inicialização do servidor
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
}

start();


