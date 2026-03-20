import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import db from './config/db.js';
import { authroutes } from './routes/auth.routes.js';
import { departmentroutes } from './routes/department.route.js';
import { doctorroutes } from './routes/doctor.routes.js';
import { serviceroutes } from './routes/services.route.js';
import { noticeroutes } from './routes/notice.routes.js';
import { appointmentroutes } from './routes/appointment.routes.js';
import { contactroutes } from './routes/contact.routes.js';
import { globalErrorHandler } from './middleware/globalErrorHandler.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authroutes);
app.use('/api/departments', departmentroutes);
app.use('/api/doctors', doctorroutes);
app.use('/api/services', serviceroutes);
app.use('/api/notices', noticeroutes);
app.use('/api/appointments', appointmentroutes);
app.use('/api/contacts', contactroutes);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
