import React from "react"
import Link from "next/link"
import {Flex, Row, Col, Text, Link as VCCLink, Spacer} from "vcc-ui"
import {CarInterface} from "../../models/Car"

export const Car = ({car, single}: {car: CarInterface; single?: boolean}) => {
	return (
		<Col size={16}>
			<Row>
				<Text
					subStyle='emphasis'
					extend={{color: "#707070", textTransform: "uppercase", fontSize: "14px !important"}}
					variant='hillary'>
					{car.bodyType}
				</Text>
			</Row>
			<Row>
				<Text subStyle='emphasis' variant='hillary'>
					{car.modelName}
				</Text>
				<Text
					extend={{
						marginLeft: "10px",
						marginBottom: "10px",
						color: "#707070",
						"@media (max-width: 768px)": {
							width: "100%",
							marginLeft: 0
						}
					}}
					variant='hillary'>
					{car.modelType}
				</Text>
			</Row>
			<Row>
				<img src={car.imageUrl} style={{width: "100%", paddingBottom: "10px"}} />
			</Row>
			{!single && (
				<Row>
					<Flex
						extend={{flexDirection: "row", justifyContent: "center", width: "100%", marginBottom: "50px"}}>
						<Link href={`/learn/${car.id}`}>
							<VCCLink style={{marginRight: "20px"}} arrow='right'>
								Learn
							</VCCLink>
						</Link>
						<Spacer />
						<Link href={`/shop/${car.id}`} as={`/learn/${car.id}`}>
							<VCCLink arrow='right'>Shop</VCCLink>
						</Link>
					</Flex>
				</Row>
			)}
		</Col>
	)
}