const connection = require('../Configs/connect');
module.exports= {
	getProducts: (queryLimit, sort, order, querySearch) =>{
		return new Promise((resolve, reject)=>{
			sql = 'SELECT * FROM products JOIN categories ON categories.id_category=products.id_category';
			connection.query(`${sql} ${querySearch} ORDER BY ${sort} ${order} ${queryLimit}`,
				(err, response) =>{
				if(!err){
					resolve(response);
				} else{
					reject(err);
				}
			});
		});
	},
	getProduct: (id) =>{
		return new Promise((resolve, reject)=>{
			const sql = `SELECT * FROM products WHERE id_product = ?`;

			connection.query( sql, [id],
				(err, response) =>{
				if(!err){
					resolve(response);
				}else{
					reject(err);
				}
			})
		})
	},
	postProduct: data =>{
		return new Promise((resolve, reject)=>{
			console.log(data)
			const sql = `INSERT INTO products SET ?`;

			if(data.name_product!= null && data.desc_product!= null && data.image_product!= null && data.id_category!= null){
				if(data.price_product!= null && data.price_product!=0 && data.price_product >0){
					if(data.quantity_product!= null && data.quantity_product!=0 && data.quantity_product >0){
						connection.query(sql, data,
							(err, response) =>{
							if(!err){
								resolve(response);
							} else{
								reject(err);
							}
						});
					}else{
					reject(err)
				}
				}else{
					reject(err)
				}
			}else{
					reject(err)
				}
		});
	},
	updateProduct: (data,id) =>{
		return new Promise((resolve, reject)=>{
			const sql = `UPDATE products SET ? WHERE id_product = ?`;
			connection.query(sql ,[data, data.id],
				(err, response) =>{
				if(!err){
					resolve(response);
				} else{
					reject(err);
				}
			});
		});
	},
	deleteProduct: id =>{
		return new Promise((resolve, reject)=>{
			const sql = `DELETE FROM products WHERE id_product = ?`;
			connection.query(sql,[id],
				(err, response) =>{
				if(!err){
					resolve(response);
				} else{
					reject(err);
				}
			});
		});
	},
	postQty: (data,id) =>{
		return new Promise((resolve, reject)=>{
			console.log(data.quantity_product,id)
		
			if(data.quantity_product!=null && data.quantity_product!=0 && data.quantity_product>0){
				connection.query(`UPDATE products SET quantity_product= quantity_product + ${data.quantity_product} WHERE id_product = ${id}`,
					(err, response) =>{
					if(!err){
						resolve(response);
					} else{
						reject(err);
					}
				});
			}
			else{
				reject(err);
			}
		});
	},
	reduceQty: (req, value1) =>{
		return new Promise((resolve, reject)=>{
			let db = value1[0];
			let keyId =req.params.keyId;
			let reduceQty = req.body;

			if(reduceQty.quantity_product!=null && reduceQty.quantity_product!=0 && reduceQty.quantity_product>=0){
				if(reduceQty.quantity_product<db.quantity){
					connection.query(
						`UPDATE products SET quantity_product= quantity_product - "${reduceQty.quantity_product}" WHERE id_product = "${keyId}"`,
						(err, response) =>{
						if(!err){
							resolve(response);
						} else{
							reject(err);
						}
					});
				}else{
					reject(`Cannot reduce more than ${db.quantity} `);
				} 
			}
			else{
				reject("Cannot reduce quantity product!");
			}
		});
	},
	countProducts: () =>{
		return new Promise((resolve, reject)=>{
			connection.query(
				`SELECT count(*) as count FROM products`,
				(err, response) =>{
				if(!err){
					resolve(response);
				} else{
					reject("Data not found!",err);
				}
			});
		});
	},
};