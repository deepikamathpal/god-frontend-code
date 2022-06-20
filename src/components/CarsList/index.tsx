import React, {useEffect, useState, useRef} from "react"
import {getCars} from "../../api/Cars"
import {Grid, Row, SelectInput, Col} from "vcc-ui"
import {Car} from "../Car"
import {CarInterface, BodyType} from "../../models/Car"
// Import Swiper React components
import {Navigation,Pagination} from "swiper"
import {Swiper, SwiperSlide} from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import styles from "./button.module.css"

export const CarsList = () => {
	const [products, setProducts] = useState<CarInterface[]>([
		{
			id: "xc90-recharge",
			modelName: "XC90 Recharge",
			bodyType: "suv",
			modelType: "plug-in hybrid",
			imageUrl: "/images/xc90_recharge.jpg"
		}
	])
	const [slides, setSlides] = useState(4)
	const [value, setValue] = useState("default")
	const [isMobile, setIsMobile] = useState(false)

	const fetchProducts = (filter: string) => {
		getCars()
			.then(res => {
				if (filter === "default") {
					setProducts(res)
					setSlides(4)
				} else {
					const results = res.filter(prod => prod.bodyType === filter)
					setProducts(results)
					setSlides(2)
				}
				if (window.innerWidth <= 768) {
					setSlides(1)
					setIsMobile(true)
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	useEffect(() => {
		fetchProducts("default")
	}, [])

	useEffect(() => {
		fetchProducts(value)
	}, [value])

	const swiperRef = useRef(null)
	const prevRef = useRef<HTMLDivElement>(null)
    const nextRef = useRef<HTMLDivElement>(null)
	const types = ["default", BodyType.Suv, BodyType.Sedan, BodyType.Estate]

	return (
		<Grid>
			<Row>
				<SelectInput value={value} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setValue(e.target.value)} className={styles.selectBtn} label={""}>
					{types.map(carType => (
						<option key={carType} value={carType}>
							{carType === "default" ? "Select" : carType}
						</option>
					))}
				</SelectInput>
				<Swiper
					className={styles.swiperStyle}
					modules={[Navigation,Pagination]}
					spaceBetween={10}
					slidesPerView={slides}
					pagination={{clickable: true}}
					navigation={{
						prevEl: prevRef.current!, // Assert non-null
						nextEl: nextRef.current!, // Assert non-null
					  }}
				>
					{products.map((product: CarInterface) => (
						<SwiperSlide key={product.id}>
							<Car car={product} />
						</SwiperSlide>
					))}
				</Swiper>
				{!isMobile && (
					<div className={styles.btnContainer}>
						<div
							id='previousButton'
							className={styles.prevBtn}
							// onClick={() => swiperRef.current.swiper.slidePrev()}
							ref={prevRef}
							>
							<img src='./images/chevron-circled.svg' height={100} width={100} />
						</div>
						<div
							id='nextButton'
							className={styles.nextBtn}
							// onClick={() => swiperRef.current.swiper.slideNext()}
							ref={nextRef}
							>
							<img src='./images/chevron-circled.svg' height={100} width={100} />
						</div>
					</div>
				)}
			</Row>
		</Grid>
	)
}