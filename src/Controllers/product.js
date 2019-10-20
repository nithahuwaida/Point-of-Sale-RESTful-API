const productModel = require('../Models/product');
const form = require('../Helpers/formProduct');
module.exports = {
	getProducts:(req, res)=>{
	const numPerPage = parseInt(req.query.limit) || 10
    const activePage = req.query.page || 1
    const beginData = numPerPage * (activePage - 1)
    const sort = req.query.sort || 'id_product'
    const order = req.query.order || 'asc'
    const search = req.query.search || null
    const queryLimit = (numPerPage !== null) ? `LIMIT ${beginData},${numPerPage}` : ''
	const querySearch = (search !== null) ? `AND name_product LIKE '%${search}%'` : ''
	
		productModel
		.getProducts(queryLimit, sort, order, querySearch,)
		.then((response)=>res.json({
			status: 200,
			currentPage : activePage,
			limit : numPerPage,
			sort : sort,
			order : order,
			search : search,
			response
		}))
		.catch((err)=>{
			res.json(err)
		});
	},
	getProduct:(req, res)=>{
		const id= req.params.id
		productModel
		.getProduct(id)
		.then((response)=>{
			if(response[0]===undefined){
				return res.status(400).send({
					status :400,
					id,
					message : 'The product does not exist'
				})
			}
			res.json({
				status: 200,
				id: id,
				message: 'Product successfully retrieved',
				response
			})
		})
		.catch((err)=>{
			console.log(err)
		});
	},
	postProduct:(req, res)=>{
		const data = {
			name_product : req.body.name_product,
			desc_product : req.body.desc_product,
			image_product : req.body.image_product,
			id_category : req.body.id_category,
			price_product : req.body.price_product,
			quantity_product : req.body.quantity_product,
		}
		// console.log(data)
		productModel
		.postProduct(data)
		.then((response)=>res.send({
	        status: 200,
			message: "Product has successfully added!",
			data
	    }))
		.catch((err)=>{
			if(res.status(200)){
				return res.send({
					message : "Product failed to be added"
				})
			}else{
				console.log(err)
			}
		});
	},
	updateProduct:(req, res)=>{
		const data = {
			name_product : req.body.product,
			desc_product : req.body.desc_product,
			image_product : req.body.image_product,
			id_category : req.body.id_category,
			price_product : req.body.price_product,
			quantity_product : req.body.quantity_product,
		}
		const id = req.params.id
		productModel.getProduct(id)
		.then(response=>{
			if(response.length !==0){
				return productModel.updateProduct(data, id)
				.then(response =>res.json({
					status: 200,
					message: "Product has successfully updated!",
					id,
					data
				}))
				.catch(err => console.log(err)) 
			}else{
				return res.status(400).send({
					status: 400,
					id,
					message: "Product does not exist",
				})
			}
		})
	},
	deleteProduct:(req, res)=>{
		const id= req.params.id
		productModel
		.getProduct(id)
		.then((response)=>{
			if(response.length!==0){
				console.log(response.length)
				return productModel.deleteProduct(id)
					.then((response)=>res.send({
					status: 200,
					id,
					message: "Product has been deleted!",
				}))
				.catch((err)=>{
					res.json(err)
				})
			}else{
				return res.status(400).send({
					status :400,
					id,
					message: 'Product does not exist'
				})
			}
		})
	},
	postQty:(req, res)=>{
		const data = {
			quantity_product : req.body.quantity_product,
		}
		const id= req.params.id
		console.log(data,id)
		productModel
		.postQty(data,id)
		.then((response)=>res.send({
	        status: 200,
			message: "Add quantity product succesfully",
			
	    }))
		.catch((err)=>{
			if(res.status(200)){
				return res.send({
					message : "Cannot add quantity product"
				})
			}else{
				console.log(err)
			}
		});
	},
	reduceQty:(req, res)=>{
		productModel
		.getProductsId(req)
		.then(response=>{
			return form.format(response);
		})
		.then(value1 =>{
			productModel
			.reduceQty(req,value1)
			.then((response)=>res.send({
		        status: 200,
		        message: "Reduce quantity product succesfully",
		    }))
			.catch(err=>{
				res.json(err)
			})
		})
		.catch(err=>{
			res.json(err)
		});
	},
};