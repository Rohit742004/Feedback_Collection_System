const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    return res.status(200).json({
      message: 'Admin verified successfully',
      name: admin.name,
      email: admin.email,
    });
  } catch (err) {
    console.error('❌ Admin login error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
