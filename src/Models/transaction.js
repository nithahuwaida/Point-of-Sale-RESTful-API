const connection = require('../Configs/connect');
module.exports= {
    postTransaction: data =>{
		return new Promise((resolve, reject)=>{
			const sql = `INSERT INTO transactions SET total_transaction= ?`;

            connection.query(sql, data.total_transaction,
                (err, result) =>{
                if(!err){
                    resolve(result);
                } else{
                    reject(err);
                }
            });
		});
    },
    postProductTransaction: (data,result) =>{
		return new Promise((resolve, reject)=>{
			const sql = `INSERT INTO products_transactions SET id_product=? , price_product =? , subtotal_product =?, order_qty = ?, id_transaction=?`;

            connection.query(sql, [data.id_product,data.price_product, data.subtotal_product, data.order_qty, data.id_transaction],
                (err, response) =>{
                if(!err){
                    resolve(response);
                } else{
                    reject(err);
                }
            });
		});
	},
}