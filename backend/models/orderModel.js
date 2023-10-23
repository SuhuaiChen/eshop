import mongoose from "mongoose"

const OrderSchemma = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    orderItems: [
        {
            name: {type: String, required: true},
            qty: {type: number, required: true},
            image: {type: String, required: true},
            price: {type: number, required: true},
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product",
            },
        }
    ],
    shippingAdress: {
        address: {type: String, required: true},
        city: {type: String, required: true},
        postalCode: {type: String, required: true},
        country: {type: String, required: true},
    },
    paymentMethod:{
        type: String, 
        required: true
    },
    paymentResult: {
        id: {type: String},
        status: {type: String},
        update_time: {type: String},
        email_address: {type: String},
    },
    itemsPrice: {
        type: Number,
        required: true,
        default : 0.0,
    },
    taxPrice:{
        type: Number,
        required: true,
        default : 0.0,
    },
    shippingPrice:{
        type: Number,
        required: true,
        default : 0.0,
    },
    totalPrice:{
        type: Number,
        required: true,
        default : 0.0,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    DeliveredAt: {
        type: Date,
    },
},{
    timestamps: true,
});

const Order = mongoose.model("Order", OrderSchemma);

export default Order;