module.exports = {
	success : (res,status, result)=>{
		let formatProduct= result.map(item=>{
			return {
				id:item.id_product,			
				name:item.name_product,
				description:item.desc_product,
				imageURL:item.image_product,
				id_category: item.id_category,
				name_category : item.name_category, 
				price: item.price_product,
				quantity :item.quantity_product,
				date_added : item.date_added,
				date_updated : item.date_updated,
			};
		});
		let formProduct ={
			status,
			result: formatProduct,
		};
		res.json(formProduct);
	},
	format : (result)=>{
		return result.map(item=>{
			return {
				id:item.id_product,			
				name:item.name_product,
				description:item.desc_product,
				imageURL:item.image_product,
				id_category: item.id_category,
				price: item.price_product,
				quantity :item.quantity_product,
				date_added : item.date_added,
				date_updated : item.date_updated,
			};
		});
	},
	count : (result)=>{
		return result.map(item=>{
			return {
				count: item.count,
			};
		});
	},

};