const transactionModel = require('../Models/transaction');

module.exports = {
	postTransaction:(req, res)=>{
		const data = {
            total_transaction : req.body.total_transaction,
		}
		transactionModel.postTransaction(data)
        .then(response => res.json({
            status: 200,
            message: "Id Transaction has successfully added!",
            data
        }))
        .catch(err => {
            console.log(err)
        })
    },
    postProductTransaction:(req, res)=>{
		const data = {
			order_qty : req.body.order_qty,
            id_product : req.body.id_product,
            price_product : req.body.price_product,
            subtotal_product : req.body.subtotal_product,
            id_transaction : req.body.id_transaction
		}
		transactionModel.postProductTransaction(data)
        .then(response => res.json({
            status: 200,
            message: "Transaction has successfully added!",
            data
        }))
        .catch(err => {
            console.log(err)
        })
	},
}