export enum BodyType {
	Suv = "suv",
	Sedan = "sedan",
	Estate = "estate",
	types = "types"
}

export enum ModelType {
	PlugInHybrid = "plug-in hybrid",
	PureElectric = "pure electric"
}

export interface CarInterface {
	id: string
	modelName: string
	bodyType: string 
	modelType: string
	imageUrl: string
}
export interface IFilterList {
	id?: string;
	itemList: CarInterface[];
	setFilteredList: Function;
  }