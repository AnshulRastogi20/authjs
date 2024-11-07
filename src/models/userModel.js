import mongoose from 'mongoose';

// Define the UserSchema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry:Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// // Middleware to update `updatedAt` field before saving
// UserSchema.pre('save', function (next) {
//     this.updatedAt = Date.now();
//     next();
// });

// // Hash the password before saving
// UserSchema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

// Export the User model
export default User = mongoose.modeLs.users ||  mongoose.model('users', UserSchema);

