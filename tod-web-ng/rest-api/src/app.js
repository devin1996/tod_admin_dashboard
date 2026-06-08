require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const busRoutes = require('./routes/buses.routes');
const routeRoutes = require('./routes/routes.routes');
const timeslotRoutes = require('./routes/timeslots.routes');
const companyRoutes = require('./routes/companies.routes');
const driverRoutes = require('./routes/drivers.routes');
const conductorRoutes = require('./routes/conductors.routes');
const promotionRoutes = require('./routes/promotions.routes');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:4200' }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/bus-routes', routeRoutes);
app.use('/api/timeslots', timeslotRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/conductors', conductorRoutes);
app.use('/api/promotions', promotionRoutes);

module.exports = app;
