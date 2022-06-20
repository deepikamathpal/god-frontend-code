import {CarInterface} from "../models/Car"

export const getCars = async (): Promise<CarInterface[]> => {
	const response = await fetch("/api/cars.json", {
		method: "GET"
	})
	return response.json()
}