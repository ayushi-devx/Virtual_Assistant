require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/userModel');

const seedAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for seeding...');

    const adminEmail = 'Aayushi@gmail.com';
    
    await User.deleteMany({ email: 'ayushi@gmail.com' });
    console.log('Deleted old admin user');

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    const adminUser = await User.create({
      name: 'Aayushi',
      email: adminEmail,
      password: '123456',
      isAdmin: true,
    });

    console.log('✓ Admin user created successfully!');
    console.log('Email: Aayushi@gmail.com');
    console.log('Password: 123456');
    console.log('Name: Aayushi');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedAdminUser();
