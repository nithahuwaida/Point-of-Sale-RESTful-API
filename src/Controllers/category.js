const categoryModel = require('../Models/category');
const form = require('../Helpers/form');
module.exports = {
	getCategories:(req, res)=>{
		categoryModel
		.getCategories()
		.then((response)=>{
			form.success(res, 200, response)
		})
		.catch((err)=>{
			res.json(err)
		});
	},
	getCategory:(req, res)=>{
		const id = req.params.id
		categoryModel
		.getCategory(id)
		.then((response)=>{
			//Checking if category does not exict
			if(response[0]=== undefined){
				return res.status(400).send({
					status :400,
					id,
					message : 'The category does not exist'
				})
			}
			res.json({
				status: 200,
				id: id,
				message: 'Category successfully retrieved',
				response
			});
		})
		.catch((err)=>{
			console.log(err)
		});
	},
	postCategory:(req, res)=>{
		const data = {
			name_category : req.body.name_category
		}
		
		categoryModel
		.postCategory(data)
		.then((response)=>res.send({
	        status: 200,
			message: "Category has successfully added!",
			data
	    }))
		.catch((err)=>{
			if(res.status(200)){
				return res.send({
					message : "Category failed to be added"
				})
			}else{
				console.log(err)
			}
		});
	},
	updateCategory:(req, res)=>{
		const data ={
			name_category : req.body.name_category,
		}
		const id= req.params.id
		categoryModel.getCategory(id)
		.then(response => {
			if(response.length !==0){
				return categoryModel.updateCategory(data,id)
				.then(response =>res.json({
					status: 200,
					message: "Category has successfully updated!",
					id,
					data
				}))
				.catch(err => console.log(err)) 
			}else{
				return res.status(400).send({
					status: 400,
					id,
					message: "Category does not exist",
				})
			}
		})
	},
	deleteCategory:(req, res)=>{
		const id= req.params.id

		categoryModel.getCategory(id)
		.then(response =>{
			if(response.length!==0){
				console.log(response.length)
				return categoryModel.deleteCategory(id)
					.then((response)=>res.send({
					status: 200,
					id,
					message: "Category has been deleted!",
				}))
				.catch((err)=>{
					res.json(err)
				})
			}else{
				return res.status(400).send({
					status :400,
					id,
					message: 'Category does not exist'
				})
			}
		})
	},
};