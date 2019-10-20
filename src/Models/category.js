const connection = require('../Configs/connect');
module.exports= {
	getCategories: ()=>{
		return new Promise((resolve, reject)=>{
			connection.query(`SELECT id_category, name_category FROM categories`,(err, response) =>{
				if(!err){
					resolve(response);
				} else{
					reject(err);
				}
			});
		});
	},
	getCategory: (id) =>{
		return new Promise((resolve, reject)=>{
			const sql = `SELECT * FROM categories WHERE id_category= ?`;
			
			connection.query(sql, [id],
			(err, response) =>{
				if(!err){
					resolve(response);
				} else{
					reject(err);
				}
			});
		});
	},
	postCategory: data =>{
		return new Promise((resolve, reject)=>{
			const sql = `INSERT INTO categories SET ? `;
			if(data.name_category!=null){
				connection.query( sql, data,
					(err, response) =>{
					if(!err){
						resolve(response);
					} else{
						reject(err);
					}
				});
			}else{
				reject(err);
			}
			
		});
	},
	updateCategory: (data,id) =>{
		return new Promise((resolve, reject)=>{
			const sql = `UPDATE categories SET ? WHERE id_category=?`;

			connection.query(sql, [data, id],
				(err, response) =>{
				if(!err){
					resolve(response);
				} else{
					reject(err);
				}
			});
		});
	},

	deleteCategory: id =>{
		return new Promise((resolve, reject)=>{
			const sql = `DELETE FROM categories WHERE id_category =? `;
			connection.query( sql,[id],
				(err, response) =>{
				if(!err){
					resolve(response);
				} else{
					reject(err);
				}
			});
		});
	},
};