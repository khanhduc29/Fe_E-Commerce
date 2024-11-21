import { Stack, useMediaQuery } from "@mui/material"
import Navs from "./Navs/Navs"
import ShipNav from "./ShipNav/ShipNav"

const Navbar = () => {
	const isBelow1200Screen = useMediaQuery("(max-width:1200px)")

	return (
		<Stack direction="row" borderTop="1px solid #e9e9e9" borderBottom={'1px solid #e9e9e9'} width={"100%"}>
			{isBelow1200Screen ? null : (
				<>
					<Stack
						direction="row"
						margin={"0 auto"}
						paddingTop="15px"
						paddingBottom="15px"
						justifyContent="space-between"
						alignItems="center"
						className="container"
						width={"100%"}
						
					>
						<Navs />
						<ShipNav />
					</Stack>
				</>
			)}
		</Stack>
	)
}

export default Navbar
