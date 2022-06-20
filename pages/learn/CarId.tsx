import React, {useEffect, useState} from "react"
import {Car} from "../../src/components/Car"
import {getCars} from "../../src/api/Cars"
import {CarInterface} from "../../src/models/Car"

type learnProps = {
	carId: string
}

const Learn = ({carId}: learnProps) => {
	const [product, setProduct] = useState<CarInterface>({
		"id": "xc90-recharge",
		"modelName": "XC90 Recharge",
		"bodyType": "suv",
		"modelType": "plug-in hybrid",
		"imageUrl": "/images/xc90_recharge.jpg"
	})
	console.log(carId)

	useEffect(() => {
		getCars()
			.then(res => {
				const prod = res.find(car => car.id === carId) 
				if(prod)
				setProduct(prod)
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	return <Car car={product} single={true}/>
}

export function getServerSideProps(context: { query: { carId: string } }) {
	return {
		props: {carId: context.query.carId}
	}
}

export default Learn