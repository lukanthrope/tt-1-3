import { Router } from 'express';
import { CustomerController } from '../controllers/customer.controller.js';
import { container } from '../di.js';

const customerController = container.get(CustomerController);

const customerRouter = Router();

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *       400:
 *         description: Invalid input data
 */
customerRouter.post('/', (req, res) => {
  customerController.createCustomer(req, res);
});

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: List all customers with basic fields with optional filters
 *     tags: [Customer]
 *     parameters:
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: Filter by first name
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         description: Filter by last name
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filter by email
 *     responses:
 *       200:
 *         description: List of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 */
customerRouter.get('/', (req, res) => {
  customerController.listCustomers(req, res);
});

/**
 * @swagger
 * /customers/{customerId}:
 *   get:
 *     summary: Get customer details by ID
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The customer ID
 *     responses:
 *       200:
 *         description: Customer details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *       404:
 *         description: Customer not found
 */
customerRouter.get('/:customerId', (req, res) => {
  customerController.getCustomer(req, res);
});

/**
 * @swagger
 * /customers/{customerId}:
 *   patch:
 *     summary: Update an existing customer
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *       404:
 *         description: Customer not found
 *       400:
 *         description: Invalid input data
 */
customerRouter.patch('/:customerId', (req, res) => {
  customerController.updateCustomer(req, res);
});

/**
 * @swagger
 * /customers/{customerId}:
 *   delete:
 *     summary: Delete a customer
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The customer ID
 *     responses:
 *       204:
 *         description: Customer deleted successfully
 */
customerRouter.delete('/:customerId', (req, res) => {
  customerController.deleteCustomer(req, res);
});

export { customerRouter };
