import * as Yup from 'yup';
import Order from '../schemas/Order';
import Products from '../models/Category';
import Category from '../models/Category';
import User from '../models/User';
import { request, response } from 'express';

class OrderController {
    async store(request, response) {
        const schema = Yup.object().shape({
           products : Yup.array().required().of(
            Yup.object({
                id: Yup.number().required(),
                quantity: Yup.number().required(),
            }),
           ),
        });

       try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }
       
       const { products } = request.body;

       const productsIds = products.map((products) => products).id;

       const findProducts = await Products.findAll({
        where: {
            id: productsIds,
        },
        include: [
            {
                model: Category,
                as: 'category',
                attributes: ['name'],
            },
        ],
       });

       const formattedProducts = findProducts.map(product => {
        const productIndex = products.findIndex((item) => item.id === product.id);

        const newProduct = {
            id: product.id,
            name: product.name,
            Category: product.category.name,
            price: product.price,
            url: product.url,
            quantity: products[productIndex].quantity,
        };
        
        return newProduct;
       });

        const Order = {
            user: {
                id: request.userId,
                name: request.userName,
            },
            products: formattedProducts,
            status: 'PEDIDO REALIZADO!',
        };

        const createdOrder = await Order.create(Order);

        return response.status(201).json(createdOrder);
    }
    async index(request, response) {
        const orders = await Order.find();
     
        return response.json(orders);
     }
     async update(request, response)   {
        const schema = Yup.object().shape({
            status : Yup.string().required(),
         });
 
        try {
             schema.validateSync(request.body, { abortEarly: false });
         } catch (err) {
             return response.status(400).json({ error: err.errors });
         }

         const { admin: isAdmin } = await User.findByPk(request.userId);

         if(!isAdmin){
             return response.status(401).json();
         }

       const { id } = request.params;
       const { status } = request.body;

       try {
       await Order.updateOne({ _id: id }, { status });
       } catch(err) {
        return response.status(400).json({ error: err.message });
       }

       return response.json({ message: 'Status Update sucessfully'})
     }
}

export default new OrderController();
