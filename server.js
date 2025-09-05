const express = require('express');
const db = require('./config/db');
const coursesRoutes = require('./routes/coursesRoutes');  
const app = express();
app.use(express.json());  

// Health 
app.get('/api/health', (req, res) => {
  const dbStatus = db && db.threadId ? 'connected' : 'initialized';
  res.json({ status: 'ok', db: dbStatus, time: new Date().toISOString() });
});


app.use('/api/courses', coursesRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
