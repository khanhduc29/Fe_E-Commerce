import { Box, Link, Typography, useMediaQuery } from "@mui/material"
import { EnvelopeIcon, GlobeAmericasIcon, GlobeAsiaAustraliaIcon, MapPinIcon } from "@heroicons/react/24/outline"
import { useTranslation } from "react-i18next"
import { locales } from "../../../i18n/i18n"
import { Row, Select } from "antd"

const TopHeader = () => {
	const isAbove1200Screen = useMediaQuery("(min-width:1200px)")
	const { i18n } = useTranslation()

	const topHeaderCss = {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: "#fff",
		backgroundColor: "#1d1d1d",
	}

	const textCss = {
		fontSize: "12px",
		fontWeight: 400,
	}

	// const iconsCss = {
	// 	fontSize: "16px",
	// 	cursor: "pointer",
	// }

	return (
		<Box sx={topHeaderCss}>
			<Box
				sx={{
					display: "flex",
					justifyContent: !isAbove1200Screen ? "center" : "space-between",
					alignItems: "center",
					color: "#fff",
					textAlign: "left",
					width: "100%",
					margin: "0 auto",
					paddingTop: "11px",
					paddingBottom: "11px",
				}}
				className="container"
			>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<MapPinIcon style={{ marginRight: "5px" }} width={'16px'} height={'16px'} />
					<Typography
						variant="subtitle2"
						sx={{
							...textCss,
							borderRight: "1px solid",
							paddingRight: "15px",
						}}
					>
						PTIT
					</Typography>
					<EnvelopeIcon style={{ marginLeft: "15px", marginRight: "5px" }} width={'16px'} height={'16px'} />
					
					<Typography variant="subtitle2" sx={textCss}>
						<Link
							href="mailto:example@gmail.com"
							underline="none"
							sx={{ color: "#fff" }}
						>
							{"example@gmail.com"}
						</Link>
					</Typography>
				</Box>
				{isAbove1200Screen && (
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: "10px",
						}}
					>
						<Select
							value={i18n.language}
							onChange={(e) => i18n.changeLanguage(e)}
							variant="outlined"
							options={[{value: "vi", label: <Row align={'middle'} justify={'start'} style={{ gap: 8 }} wrap={false}><GlobeAsiaAustraliaIcon width={20} height={20} />{locales.vi}</Row>}, {value: "en", label: <Row align={'middle'} justify={'start'} style={{ gap: 8 }} wrap={false}><GlobeAmericasIcon width={20} height={20} />{locales.en}</Row>}]}
							className="select-language"
						>
						</Select>
					</Box>
				)}
			</Box>
		</Box>
	)
}

export default TopHeader
